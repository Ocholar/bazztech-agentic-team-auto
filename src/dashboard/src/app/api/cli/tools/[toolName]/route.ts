/**
 * POST /api/cli/tools/[toolName]
 * Executes a registered BazzAI tool on behalf of the authenticated tenant.
 * Sensitive tools will return { pendingApproval: true } instead of executing.
 */

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { runTool } from '@/lib/tools/tool-orchestrator';
import { logger } from '@/lib/logger';

export async function POST(
    req: Request,
    { params }: { params: { toolName: string } }
) {
    const cliSecret = req.headers.get('x-cli-secret');
    if (cliSecret !== process.env.INTERNAL_CLI_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = req.headers.get('x-user-id');
    if (!userId) {
        return NextResponse.json({ error: 'Missing x-user-id header' }, { status: 400 });
    }

    const { toolName } = params;

    // Fetch tenant ProductConfig for the tool context
    const productConfig = await db.productConfig.findFirst({
        where: { userId },
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

    const ctx = {
        userId,
        db,
        productConfig: productConfig ?? undefined,
    };

    let rawInput: unknown = {};
    try {
        const body = await req.text();
        if (body) rawInput = JSON.parse(body);
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    logger.info(`[cli/tools] Running tool "${toolName}" for user ${userId}`);

    const result = await runTool(toolName, rawInput, ctx);

    const status = result.success ? 200 : result.pendingApproval ? 202 : 400;
    return NextResponse.json(result, { status });
}
