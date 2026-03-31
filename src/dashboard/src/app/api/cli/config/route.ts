/**
 * GET /api/cli/config
 * Returns the authenticated tenant's ProductConfig for the CLI agent context.
 * Protected by INTERNAL_CLI_SECRET header.
 */

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
    const cliSecret = req.headers.get('x-cli-secret');
    if (cliSecret !== process.env.INTERNAL_CLI_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = req.headers.get('x-user-id');
    if (!userId) {
        return NextResponse.json({ error: 'Missing x-user-id header' }, { status: 400 });
    }

    const config = await db.productConfig.findFirst({
        where: { userId },
        select: {
            id: true,
            webhookId: true,
            systemPrompt: true,
            knowledgeBase: true,
            productType: true,
            isConfigured: true,
            leadNotifyEmail: true,
            // Omit all raw API keys — CLI only needs functional metadata
        },
    });

    if (!config) {
        return NextResponse.json({ error: 'No ProductConfig found for this user.' }, { status: 404 });
    }

    return NextResponse.json({ config });
}
