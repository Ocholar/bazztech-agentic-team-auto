import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { logger } from '@/lib/logger';
import { getJengaToken } from '@/lib/jenga';

// Shared Daraja helper from check-mpesa-balance.tool.ts logic
async function getDarajaTokenStatus(consumerKey: string, consumerSecret: string): Promise<{ ok: boolean; error?: string }> {
    try {
        const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
        const res = await fetch('https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
            method: 'GET',
            headers: { Authorization: `Basic ${credentials}` },
        });
        return { ok: res.ok, error: res.ok ? undefined : `Status ${res.status}` };
    } catch (e: any) {
        return { ok: false, error: e.message };
    }
}

async function getOpenAIStatus(apiKey: string): Promise<{ ok: boolean; error?: string }> {
    try {
        const res = await fetch('https://api.openai.com/v1/models', {
            method: 'GET',
            headers: { Authorization: `Bearer ${apiKey}` },
        });
        return { ok: res.ok, error: res.ok ? undefined : `Status ${res.status}` };
    } catch (e: any) {
        return { ok: false, error: e.message };
    }
}

export async function GET(req: NextRequest) {
    try {
        // 1. Authenticate CLI Secret
        const cliSecret = req.headers.get('x-cli-secret');
        if (cliSecret !== process.env.INTERNAL_CLI_SECRET) {
            return NextResponse.json({ error: 'Unauthorized: Invalid CLI Secret' }, { status: 401 });
        }

        const userId = req.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized: Missing User ID' }, { status: 401 });
        }

        const config = await db.productConfig.findFirst({ where: { userId } });
        if (!config) {
            return NextResponse.json({ error: 'Configuration not found for this tenant' }, { status: 404 });
        }

        // 2. Parallel Health Checks
        const [openai, jenga, daraja, n8n] = await Promise.all([
            config.openaiApiKey ? getOpenAIStatus(config.openaiApiKey) : { ok: false, error: 'Not configured' },
            getJengaToken().then(() => ({ ok: true })).catch((e) => ({ ok: false, error: e.message })),
            (config.darajaConsumerKey && config.darajaConsumerSecret)
                ? getDarajaTokenStatus(config.darajaConsumerKey, config.darajaConsumerSecret)
                : { ok: false, error: 'Not configured' },
            fetch(process.env.N8N_CONNECT_MASTER_URL || '', { method: 'HEAD' })
                .then(r => ({ ok: r.ok }))
                .catch(e => ({ ok: false, error: e.message }))
        ]);

        const results = {
            openai: { status: openai.ok ? 'pass' : 'fail', message: openai.error },
            jenga: { status: jenga.ok ? 'pass' : 'fail', message: jenga.error },
            daraja: { status: daraja.ok ? 'pass' : 'fail', message: daraja.error },
            n8n: { status: n8n.ok ? 'pass' : 'fail', message: n8n.error },
            database: { status: 'pass' }
        };

        return NextResponse.json(results);
    } catch (error: any) {
        logger.error('[api/cli/doctor] Global Error', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
