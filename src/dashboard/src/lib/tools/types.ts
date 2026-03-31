/**
 * BazzAI Modular Tool System — Core Types
 * Inspired by Claude Code's Tool.ts architecture
 */

import { z, ZodSchema } from 'zod';
import { PrismaClient } from '@prisma/client';

// -------------------------------------------------------
// Context passed to every tool execution (tenant-scoped)
// -------------------------------------------------------
export interface ToolContext {
    userId: string;
    subscriptionId?: string;
    db: PrismaClient;
    /** The tenant's ProductConfig — fetched once and passed down */
    productConfig?: {
        openaiApiKey?: string | null;
        darajaConsumerKey?: string | null;
        darajaConsumerSecret?: string | null;
        darajaShortcode?: string | null;
        darajaPasskey?: string | null;
        whatsappPhoneId?: string | null;
        whatsappUrl?: string | null;
        whatsappToken?: string | null;
        openaiVisionKey?: string | null;
        docOutputWebhook?: string | null;
        systemPrompt?: string | null;
    };
}

// -------------------------------------------------------
// Unified result envelope
// -------------------------------------------------------
export interface ToolResult<TOutput = unknown> {
    success: boolean;
    data?: TOutput;
    error?: string;
    /** Set to true when HITL gate has intercepted the call */
    pendingApproval?: boolean;
    /** AuditLog ID returned when pendingApproval = true */
    auditLogId?: string;
}

// -------------------------------------------------------
// The BazzTool contract every tool must satisfy
// -------------------------------------------------------
export interface BazzTool<TInput = unknown, TOutput = unknown> {
    /** Unique kebab-case identifier used in CLI and registry */
    name: string;
    /** Human-readable description for LLM function calling */
    description: string;
    /** Zod input schema — used for validation AND LLM JSON schema generation */
    inputSchema: ZodSchema<TInput>;
    /** If true, the HITL gate will intercept before execute() is called */
    sensitive: boolean;
    /** Core logic — only called after any HITL gate has cleared */
    execute(input: TInput, ctx: ToolContext): Promise<ToolResult<TOutput>>;
}

// -------------------------------------------------------
// Helper: convert a Zod schema to a JSON Schema object
// suitable for OpenAI function-calling tool definitions
// -------------------------------------------------------
export function zodToOpenAIParameters(schema: ZodSchema): Record<string, unknown> {
    // Minimal inline converter for object schemas
    if (schema instanceof z.ZodObject) {
        const shape = schema.shape as Record<string, ZodSchema>;
        const properties: Record<string, unknown> = {};
        const required: string[] = [];
        for (const [key, val] of Object.entries(shape)) {
            properties[key] = zodFieldToJsonSchema(val);
            if (!(val instanceof z.ZodOptional)) required.push(key);
        }
        return { type: 'object', properties, required };
    }
    return { type: 'object', properties: {} };
}

function zodFieldToJsonSchema(field: ZodSchema): Record<string, unknown> {
    const unwrapped = field instanceof z.ZodOptional ? field.unwrap() : field;
    if (unwrapped instanceof z.ZodString) return { type: 'string' };
    if (unwrapped instanceof z.ZodNumber) return { type: 'number' };
    if (unwrapped instanceof z.ZodBoolean) return { type: 'boolean' };
    if (unwrapped instanceof z.ZodArray) return { type: 'array', items: zodFieldToJsonSchema(unwrapped.element) };
    if (unwrapped instanceof z.ZodObject) return zodToOpenAIParameters(unwrapped);
    return { type: 'string' };
}
