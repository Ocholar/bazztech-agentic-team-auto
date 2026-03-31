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

/**
 * Execute a PENDING_APPROVAL action.
 * Bypasses the HITL gate and directly executes the tool, returning the result.
 */
export async function executeApprovedAction(auditLogId: string, db: any): Promise<{ approved: true; result: ToolResult } | { error: string }> {
    const auditLog = await db.auditLog.findUnique({ where: { id: auditLogId } });

    if (!auditLog) return { error: 'AuditLog record not found' };
    if (!auditLog.pendingApproval) return { error: 'This action is not pending approval or has already been processed.' };
    if (!auditLog.toolName || !auditLog.userId) return { error: 'Incomplete HITL record — missing toolName or userId' };

    await db.auditLog.update({
        where: { id: auditLogId },
        data: { pendingApproval: false, approvedAt: new Date() },
    });

    const productConfig = await db.productConfig.findFirst({ where: { userId: auditLog.userId } });

    let toolInput: unknown = {};
    try {
        toolInput = JSON.parse(auditLog.toolInput ?? '{}');
    } catch {
        // Fallback to empty object
    }

    // Lazy load orchestrator to avoid circular dependencies
    const orchestrator = await import('./../tools/tool-orchestrator');
    const tool = orchestrator.getTool(auditLog.toolName);

    if (!tool) return { error: `Tool "${auditLog.toolName}" no longer registered.` };

    const ctx = {
        userId: auditLog.userId,
        db,
        productConfig: productConfig ?? undefined,
    };

    const parsed = tool.inputSchema.safeParse(toolInput);
    if (!parsed.success) return { error: `Saved tool input is invalid: ${parsed.error.message}` };

    const result = await tool.execute(parsed.data, ctx);

    await db.auditLog.create({
        data: {
            event: 'HITL_APPROVAL_DISPATCHED',
            userId: auditLog.userId,
            toolName: auditLog.toolName,
            detail: JSON.stringify({ auditLogId, result }),
        },
    });

    return { approved: true, result };
}

/**
 * Reject a PENDING_APPROVAL action.
 */
export async function rejectPendingAction(auditLogId: string, db: any): Promise<{ rejected: true } | { error: string }> {
    const auditLog = await db.auditLog.findUnique({ where: { id: auditLogId } });

    if (!auditLog) return { error: 'AuditLog record not found' };
    if (!auditLog.pendingApproval) return { error: 'This action is not pending approval or has already been processed.' };

    await db.auditLog.update({
        where: { id: auditLogId },
        data: { pendingApproval: false },
    });

    await db.auditLog.create({
        data: {
            event: 'HITL_APPROVAL_REJECTED',
            userId: auditLog.userId,
            toolName: auditLog.toolName,
            detail: JSON.stringify({ auditLogId }),
        },
    });

    return { rejected: true };
}
