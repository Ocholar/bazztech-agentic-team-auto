/**
 * CoordinatorAgent
 * Decomposes complex user requests into sub-tasks and routes each to the
 * appropriate specialized agent. Uses OpenAI function-calling to classify intent.
 *
 * Architecture mirrors Claude Code's swarm/teamHelpers.ts pattern:
 * one "Lead" coordinator spawns typed "Teammates" per sub-task.
 */

import { BazzAgent, AgentContext, AgentResult } from './base-agent';
import { BillingAgent } from './billing-agent';
import { SalesAgent } from './sales-agent';
import { retrieveMemories, saveMemory } from './memory-service';

// All available sub-agents
const SUB_AGENTS: BazzAgent[] = [
    new BillingAgent(),
    new SalesAgent(),
];

// OpenAI tool definitions for routing
const ROUTING_TOOLS = SUB_AGENTS.map((a) => ({
    type: 'function' as const,
    function: {
        name: a.name,
        description: a.description,
        parameters: {
            type: 'object',
            properties: {
                task: {
                    type: 'string',
                    description: 'The sub-task description that this agent should handle.',
                },
            },
            required: ['task'],
        },
    },
}));

export class CoordinatorAgent extends BazzAgent {
    readonly name = 'coordinator-agent';
    readonly description =
        'Decomposes complex BazzAI requests into sub-tasks and delegates them to specialised agents.';

    async run(ctx: AgentContext): Promise<AgentResult> {
        await this.logEvent('COORDINATOR_START', { task: ctx.task }, ctx);

        const openaiApiKey = ctx.productConfig?.openaiApiKey;
        if (!openaiApiKey) {
            return {
                success: false,
                summary: 'OpenAI API key not configured for this tenant.',
                error: 'Missing openaiApiKey in ProductConfig.',
            };
        }

        // 0. Token Quota Check (Robustness)
        const config = ctx.productConfig;
        const quota = config?.tokenQuotaInt ?? 50000;
        const used = config?.tokensUsed ?? 0;
        if (used >= quota) {
            await this.logEvent('COORDINATOR_QUOTA_EXCEEDED', { used, quota }, ctx);
            return {
                success: false,
                summary: 'Monthly AI token quota exceeded. Please upgrade your BazzAI subscription.',
                error: 'TOKEN_QUOTA_EXCEEDED',
            };
        }

        // 1. Context Preparation (Memories)
        const memories = await retrieveMemories(ctx.userId, ctx.task, openaiApiKey, 3);
        const memoryContext = memories.length > 0
            ? `\n\nRelevant past interactions for context:\n${memories.map(m => `- ${m.content}`).join('\n')}`
            : '';

        const modelId = config?.fineTunedModelId || 'gpt-4o';

        // Step 1: Ask OpenAI to decompose the task and route to agents
        let routingDecisions: Array<{ agentName: string; task: string }> = [];

        try {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${openaiApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: modelId,
                    messages: [
                        {
                            role: 'system',
                            content:
                                'You are the BazzAI Coordinator (Sales Oriented). Decompose the user\'s request into sub-tasks and assign each to the best available agent. ' +
                                'If the customer is asking for prices, product details, or expressed interest, use the SalesAgent. ' +
                                'If they are asking to pay or checking balance, use the BillingAgent. ' +
                                'Always include the original task in the agent\'s task argument.' + memoryContext,
                        },
                        { role: 'user', content: ctx.task },
                    ],
                    tools: ROUTING_TOOLS,
                    tool_choice: 'auto',
                    parallel_tool_calls: true,
                }),
            });

            if (!res.ok) {
                throw new Error(`OpenAI routing failed (${res.status}): ${await res.text()}`);
            }

            const data = await res.json();
            const toolCalls = data.choices?.[0]?.message?.tool_calls ?? [];

            routingDecisions = toolCalls.map((tc: any) => ({
                agentName: tc.function.name,
                task: JSON.parse(tc.function.arguments ?? '{}').task ?? ctx.task,
            }));

            if (routingDecisions.length === 0) {
                // Model returned a text response instead of tool calls
                const textResponse = data.choices?.[0]?.message?.content ?? 'No routing decision made.';
                await this.logEvent('COORDINATOR_NO_ROUTE', { response: textResponse }, ctx);
                return { success: true, summary: textResponse };
            }
        } catch (err: any) {
            await this.logEvent('COORDINATOR_ERROR', err.message, ctx);
            return { success: false, summary: `Coordinator failed: ${err.message}`, error: err.message };
        }

        // Step 2: Execute all routing decisions with Retry Policy (Robustness)
        const agentMap = new Map(SUB_AGENTS.map((a) => [a.name, a]));
        const MAX_RETRIES = 3;

        const subResults = await Promise.all(
            routingDecisions.map(async ({ agentName, task }) => {
                const agent = agentMap.get(agentName);
                if (!agent) {
                    return { success: false, summary: `Unknown agent: ${agentName}`, error: 'AGENT_MISSING' };
                }

                let attempts = 0;
                let lastResult: AgentResult = { success: false, summary: 'Pending' };

                while (attempts < MAX_RETRIES) {
                    try {
                        lastResult = await agent.run({ ...ctx, task });
                        if (lastResult.success) return lastResult;
                    } catch (e: any) {
                        lastResult = { success: false, summary: `Agent ${agentName} failed`, error: e.message };
                    }
                    attempts++;
                    if (attempts < MAX_RETRIES) await new Promise(r => setTimeout(r, 500 * attempts));
                }

                return lastResult;
            })
        );

        // Step 3: Track Cost & Token Usage (Approximate)
        const estTokens = Math.ceil((ctx.task.length + subResults.map(r => r.summary.length).reduce((a, b) => a + b, 0)) / 4);
        await ctx.db.productConfig.update({
            where: { id: config!.id },
            data: { tokensUsed: { increment: estTokens } }
        });

        // Step 4: Aggregate results
        const allSucceeded = subResults.every((r) => r.success);
        const summaries = subResults.map((r, i) =>
            `[${routingDecisions[i]?.agentName ?? i}]: ${r.summary}`
        );
        const finalSummary = summaries.join('\n');

        await this.logEvent('COORDINATOR_COMPLETE', { routingDecisions, subResults }, ctx);

        // Save memory of this interaction for future context
        if (allSucceeded) {
            await saveMemory(
                ctx.userId,
                `Task: ${ctx.task}\nOutcome: ${finalSummary}`,
                openaiApiKey,
                { task: ctx.task }
            );
        }

        if (!allSucceeded) {
            return {
                success: false,
                summary: `Digital Employee is currently fatigued or facing errors. A human team member has been notified to take over manually. \n\nPartial progress:\n${finalSummary}`,
                details: subResults,
            };
        }

        return {
            success: true,
            summary: finalSummary,
            details: subResults,
        };
    }
}
