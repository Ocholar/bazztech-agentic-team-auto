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

        const { executeApprovedAction } = await import('@/lib/permissions/hitl-gate');
        const outcome = await executeApprovedAction(auditLogId, db);

        if ('error' in outcome) {
            // Distinguish 404/409/422 based on the error message if needed, or just return 400
            let status = 400;
            if (outcome.error.includes('not found')) status = 404;
            if (outcome.error.includes('processed')) status = 409;
            return NextResponse.json({ error: outcome.error }, { status });
        }

        return NextResponse.json({ approved: true, result: outcome.result });
    } catch (error: any) {
        logger.error('[approve-action] Error', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
