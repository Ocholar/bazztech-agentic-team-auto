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
import { LeadQualifyingAgent } from './lead-qualifying-agent';
import { retrieveMemories, saveMemory } from './memory-service';

// All available sub-agents
const SUB_AGENTS: BazzAgent[] = [
    new BillingAgent(),
    new LeadQualifyingAgent(),
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

        // Retrieving relevant past context (Agent Memory)
        const memories = await retrieveMemories(ctx.userId, ctx.task, openaiApiKey, 3);
        const memoryContext = memories.length > 0
            ? `\n\nRelevant past interactions for context:\n${memories.map(m => `- ${m.content}`).join('\n')}`
            : '';

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
                    model: 'gpt-4o',
                    messages: [
                        {
                            role: 'system',
                            content:
                                'You are the BazzAI Coordinator. Decompose the user\'s request into sub-tasks and assign each to the best available agent. ' +
                                'You may call multiple agent functions in parallel. Always include the original task in the agent\'s task argument.' + memoryContext,
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

        // Step 2: Execute all routing decisions in parallel
        const agentMap = new Map(SUB_AGENTS.map((a) => [a.name, a]));
        const subResults = await Promise.all(
            routingDecisions.map(({ agentName, task }) => {
                const agent = agentMap.get(agentName);
                if (!agent) {
                    return Promise.resolve<AgentResult>({
                        success: false,
                        summary: `Unknown agent: ${agentName}`,
                        error: `No agent registered with name "${agentName}"`,
                    });
                }
                return agent.run({ ...ctx, task });
            })
        );

        // Step 3: Aggregate results
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

        return {
            success: allSucceeded,
            summary: finalSummary,
            details: subResults,
        };
    }
}
