import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { logger } from '@/lib/logger';
import { exportMemoriesToJSONL, startFineTuningJob } from '@/lib/agents/finetune-service';

/**
 * POST /api/admin/finetune
 * Triggers an autonomous fine-tuning job for a specific tenant.
 * Admin or the tenant themselves can call this.
 */
export async function POST(req: NextRequest) {
    try {
        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
        }

        const config = await db.productConfig.findFirst({
            where: { userId },
        });

        if (!config || !config.openaiApiKey) {
            return NextResponse.json({ error: 'ProductConfig or OpenAI API Key missing' }, { status: 404 });
        }

        // 1. Export the data
        const jsonl = await exportMemoriesToJSONL(userId);
        if (!jsonl || jsonl.trim() === '') {
            return NextResponse.json({ error: 'No memories found to train on' }, { status: 422 });
        }

        // 2. Start the job
        const job = await startFineTuningJob(userId, jsonl, config.openaiApiKey);

        return NextResponse.json({
            success: true,
            jobId: job.id,
            status: job.status,
            message: 'Fine-tuning job initiated successfully.',
        });

    } catch (error: any) {
        logger.error('[api/admin/finetune] Error', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
