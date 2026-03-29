import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

/**
 * Meta WhatsApp Webhook Gateway
 * 
 * 1. GET:  Verification handshake with Meta (hub.challenge)
 * 2. POST: Ingress for incoming WhatsApp messages, flattens them, 
 *          and forwards to the n8n Master Workflow.
 */

// Meta Verification logic (GET)
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    // Use a dedicated verify token from env
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'bazz_auth_verify_2026';

    if (mode === 'subscribe' && token === verifyToken) {
        console.log('[whatsapp-webhook] Verification SUCCESS');
        return new Response(challenge, { status: 200 });
    }

    console.warn('[whatsapp-webhook] Verification FAILED');
    return new Response('Forbidden', { status: 403 });
}

// Message Ingress logic (POST)
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Meta's payload structure is deeply nested
        // entry[0].changes[0].value.messages[0]
        const entry = body.entry?.[0];
        const change = entry?.changes?.[0];
        const value = change?.value;
        const messageObj = value?.messages?.[0];
        const metadata = value?.metadata;

        if (!messageObj) {
            // It might be a status update (read/sent/delivered) which we ignore for now
            return NextResponse.json({ success: true, ignored: true });
        }

        const from = messageObj.from; // Sender phone
        const messageText = messageObj.text?.body || ''; // Message content
        const waPhoneId = metadata?.phone_number_id; // The Meta Phone ID that received it

        if (!waPhoneId) {
            return NextResponse.json({ error: 'Missing metadata.phone_number_id' }, { status: 400 });
        }

        // 1. Identify the client by their whatsappPhoneId
        const config = await db.productConfig.findFirst({
            where: { whatsappPhoneId: waPhoneId },
            select: { webhookId: true, userId: true },
        });

        if (!config || !config.webhookId) {
            console.error(`[whatsapp-webhook] No client found for Phone ID: ${waPhoneId}`);
            return NextResponse.json({ error: 'Client not found' }, { status: 404 });
        }

        // 2. Forward to the n8n Master Workflow
        // We use the simplified format that Bazz_Connect_Master expects
        const n8nWebhookUrl = process.env.N8N_CONNECT_MASTER_URL || 'https://n8n.bazztech.co.ke/webhook/bazz-connect-master';

        const n8nRes = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.INTERNAL_API_KEY || ''
            },
            body: JSON.stringify({
                webhookId: config.webhookId,
                from: from,
                message: messageText,
                timestamp: new Date().toISOString()
            })
        });

        if (!n8nRes.ok) {
            const errorText = await n8nRes.text();
            console.error(`[whatsapp-webhook] n8n forward failed: ${errorText}`);
            return NextResponse.json({ error: 'Failed to forward to automation' }, { status: 502 });
        }

        return NextResponse.json({ success: true, forwarded: true });

    } catch (error: any) {
        console.error('[whatsapp-webhook] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
