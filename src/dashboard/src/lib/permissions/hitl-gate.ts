/**
 * BazzAI HITL Gate
 * Intercepts sensitive tool calls, writes a PENDING_APPROVAL AuditLog record,
 * and returns without executing the tool. The /api/admin/approve-action endpoint
 * is responsible for re-dispatching the tool once a human approves.
 */

import { ToolContext, ToolResult } from '../tools/types';

export interface HitlPendingRecord {
    auditLogId: string;
    toolName: string;
}

/**
 * Pause execution of a sensitive tool.
 * Writes a PENDING_APPROVAL record and returns immediately.
 * The caller should propagate { pendingApproval: true, auditLogId } to the consumer.
 */
export async function requireApproval<TOutput>(
    toolName: string,
    toolInput: unknown,
    ctx: ToolContext
): Promise<ToolResult<TOutput>> {
    const record = await ctx.db.auditLog.create({
        data: {
            event: 'PENDING_APPROVAL',
            detail: `Tool "${toolName}" requires human approval before execution.`,
            userId: ctx.userId,
            toolName,
            toolInput: JSON.stringify(toolInput),
            pendingApproval: true,
        },
    });

    return {
        success: false,
        pendingApproval: true,
        auditLogId: record.id,
        error: `Tool "${toolName}" paused — awaiting human approval (auditLogId: ${record.id})`,
    };
}
