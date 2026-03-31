/**
 * POST /api/admin/approve-action
 * 
 * Admin/Portal endpoint to approve a PENDING_APPROVAL AuditLog entry.
 * Once approved, the flagged tool is re-dispatched immediately.
 * 
 * v2 note: WhatsApp "APPROVE" reply will route here via the whatsapp webhook.
 */

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { runTool } from '@/lib/tools/tool-orchestrator';
import { logger } from '@/lib/logger';

export async function POST(req: Request) {
    try {
        // Internal API key guard — must match INTERNAL_API_KEY env var
        const apiKey = req.headers.get('x-api-key');
        if (apiKey !== process.env.INTERNAL_API_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { auditLogId } = await req.json();
        if (!auditLogId) {
            return NextResponse.json({ error: 'Missing auditLogId' }, { status: 400 });
        }

        // Fetch the pending record
        const auditLog = await db.auditLog.findUnique({ where: { id: auditLogId } });

        if (!auditLog) {
            return NextResponse.json({ error: 'AuditLog record not found' }, { status: 404 });
        }
        if (!auditLog.pendingApproval) {
            return NextResponse.json({ error: 'This action is not pending approval or has already been processed.' }, { status: 409 });
        }
        if (!auditLog.toolName || !auditLog.userId) {
            return NextResponse.json({ error: 'Incomplete HITL record — missing toolName or userId' }, { status: 422 });
        }

        // Mark as approved immediately
        await db.auditLog.update({
            where: { id: auditLogId },
            data: { pendingApproval: false, approvedAt: new Date() },
        });

        // Fetch the tenant's ProductConfig for the tool context
        const productConfig = await db.productConfig.findFirst({
            where: { userId: auditLog.userId },
            select: {
                openaiApiKey: true,
                darajaConsumerKey: true,
                darajaConsumerSecret: true,
                darajaShortcode: true,
                darajaPasskey: true,
                darajaCallbackUrl: true,
                whatsappPhoneId: true,
                whatsappUrl: true,
                whatsappToken: true,
                docOutputWebhook: true,
                systemPrompt: true,
            },
        });

        // Parse the saved tool input
        let toolInput: unknown = {};
        try {
            toolInput = JSON.parse(auditLog.toolInput ?? '{}');
        } catch {
            toolInput = {};
        }

        // Re-dispatch the tool — HITL gate will NOT intercept because we call the tool directly
        // bypassing isSensitiveTool (approval already granted above)
        const tool = (await import('@/lib/tools/tool-orchestrator')).getTool(auditLog.toolName);
        if (!tool) {
            return NextResponse.json({ error: `Tool "${auditLog.toolName}" no longer registered.` }, { status: 404 });
        }

        const ctx = {
            userId: auditLog.userId,
            db,
            productConfig: productConfig ?? undefined,
        };

        const parsed = tool.inputSchema.safeParse(toolInput);
        if (!parsed.success) {
            return NextResponse.json({ error: `Saved tool input is invalid: ${parsed.error.message}` }, { status: 422 });
        }

        const result = await tool.execute(parsed.data, ctx);

        logger.info('[approve-action] Tool re-dispatched after HITL approval', {
            auditLogId,
            toolName: auditLog.toolName,
            success: result.success,
        });

        await db.auditLog.create({
            data: {
                event: 'HITL_APPROVAL_DISPATCHED',
                userId: auditLog.userId,
                toolName: auditLog.toolName,
                detail: JSON.stringify({ auditLogId, result }),
            },
        });

        return NextResponse.json({ approved: true, result });
    } catch (error: any) {
        logger.error('[approve-action] Error', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
