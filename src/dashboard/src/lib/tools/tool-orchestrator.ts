/**
 * BazzAI Tool Orchestrator
 * Central registry and dispatcher for all BazzAI tools.
 * Integrates with OpenAI function-calling to let an LLM select and invoke tools,
 * and gates sensitive tools through the HITL permission system.
 *
 * All operations are scoped to a specific tenant via ToolContext.
 */

import { BazzTool, ToolContext, ToolResult, zodToOpenAIParameters } from './types';
import { isSensitiveTool } from '../permissions/sensitive-tools';
import { requireApproval } from '../permissions/hitl-gate';
import { JengaPollTool } from './jenga-poll.tool';
import { SendWhatsAppTool } from './send-whatsapp.tool';
import { CheckMpesaBalanceTool } from './check-mpesa-balance.tool';
import { ProcessInvoiceVisionTool } from './process-invoice-vision.tool';

// -------------------------------------------------------
// Build the registry
// -------------------------------------------------------
const ALL_TOOLS: BazzTool[] = [
    JengaPollTool,
    SendWhatsAppTool,
    CheckMpesaBalanceTool,
    ProcessInvoiceVisionTool,
];

const toolRegistry = new Map<string, BazzTool>(
    ALL_TOOLS.map((t) => [t.name, t])
);

// -------------------------------------------------------
// Public API
// -------------------------------------------------------

/** Returns all registered tools (for CLI listing and LLM function definitions) */
export function listTools(): { name: string; description: string; sensitive: boolean; inputSchema: Record<string, unknown> }[] {
    return ALL_TOOLS.map((t) => ({
        name: t.name,
        description: t.description,
        sensitive: t.sensitive,
        inputSchema: zodToOpenAIParameters(t.inputSchema),
    }));
}

/** Look up a single tool by name */
export function getTool(name: string): BazzTool | undefined {
    return toolRegistry.get(name);
}

/**
 * Directly invoke a named tool with parsed input.
 * Applies the HITL gate for sensitive tools before calling execute().
 */
export async function runTool(
    toolName: string,
    rawInput: unknown,
    ctx: ToolContext
): Promise<ToolResult> {
    const tool = toolRegistry.get(toolName);
    if (!tool) {
        return { success: false, error: `Unknown tool: "${toolName}"` };
    }

    // Validate input against the tool's Zod schema
    const parsed = tool.inputSchema.safeParse(rawInput);
    if (!parsed.success) {
        return {
            success: false,
            error: `Invalid input for tool "${toolName}": ${parsed.error.message}`,
        };
    }

    // HITL gate — intercept sensitive tools
    if (isSensitiveTool(toolName)) {
        return requireApproval(toolName, parsed.data, ctx);
    }

    return tool.execute(parsed.data, ctx);
}

/**
 * LLM-driven dispatch: given a free-text user intent string, call OpenAI
 * with all tool definitions as function-calling options, then run the chosen tool.
 *
 * Uses the tenant's own openaiApiKey (from ctx.productConfig).
 */
export async function dispatch(intent: string, ctx: ToolContext): Promise<ToolResult> {
    const openaiApiKey = ctx.productConfig?.openaiApiKey;
    if (!openaiApiKey) {
        return { success: false, error: 'No OpenAI API key configured for this tenant.' };
    }

    const tools = listTools().map((t) => ({
        type: 'function' as const,
        function: {
            name: t.name,
            description: t.description,
            parameters: t.inputSchema,
        },
    }));

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
                        'You are the BazzAI orchestrator. Select the best tool to fulfil the user\'s request and provide the required arguments. Only call one tool per request.',
                },
                { role: 'user', content: intent },
            ],
            tools,
            tool_choice: 'auto',
        }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        return { success: false, error: `OpenAI orchestration failed (${res.status}): ${errorText}` };
    }

    const data = await res.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall) {
        // Model chose not to call a tool — return its text response
        const textResponse = data.choices?.[0]?.message?.content ?? 'No tool selected.';
        return { success: true, data: { response: textResponse } };
    }

    let toolArgs: unknown;
    try {
        toolArgs = JSON.parse(toolCall.function.arguments ?? '{}');
    } catch {
        return { success: false, error: 'Failed to parse tool arguments from LLM.' };
    }

    return runTool(toolCall.function.name, toolArgs, ctx);
}
