import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { webhookRateLimiter } from '@/lib/rate-limiter';
import { logger } from '@/lib/logger';

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
        logger.info('WhatsApp Webhook Verification SUCCESS');
        return new Response(challenge, { status: 200 });
    }

    logger.warn('WhatsApp Webhook Verification FAILED', { mode, tokenReceived: !!token });
    return new Response('Forbidden', { status: 403 });
}

// Message Ingress logic (POST)
export async function POST(req: Request) {
    try {
        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        try {
            await webhookRateLimiter.consume(ip);
        } catch (rateLimitError) {
            logger.warn('Rate limit exceeded for WhatsApp webhook endpoint', { ip });
            return new Response('Too Many Requests', { status: 429 });
        }

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
            select: { id: true, webhookId: true, userId: true },
        });

        if (!config || !config.webhookId) {
            logger.error(`No client found for Phone ID: ${waPhoneId}`, new Error("Config search failed"), { waPhoneId });
            return NextResponse.json({ error: 'Client not found' }, { status: 404 });
        }

        // --- NEW: HITL Interceptor ---
        const inputUpper = messageText.trim().toUpperCase();
        if (inputUpper === 'APPROVE' || inputUpper === 'REJECT') {
            // Find the most recent pending action for this tenant
            const pendingLog = await db.auditLog.findFirst({
                where: { userId: config.userId, pendingApproval: true },
                orderBy: { createdAt: 'desc' }
            });

            if (pendingLog) {
                const { executeApprovedAction, rejectPendingAction } = await import('@/lib/permissions/hitl-gate');

                if (inputUpper === 'APPROVE') {
                    logger.info(`WhatsApp HITL: APPROVE received for ${pendingLog.toolName}`);
                    const outcome = await executeApprovedAction(pendingLog.id, db);
                    if ('error' in outcome) {
                        logger.error(`HITL Approval Execution Error: ${outcome.error}`, new Error(outcome.error));
                    }
                } else {
                    logger.info(`WhatsApp HITL: REJECT received for ${pendingLog.toolName}`);
                    await rejectPendingAction(pendingLog.id, db);
                }

                // Do not forward to n8n since this was an infrastructure command
                return NextResponse.json({ success: true, hitlMessageHandled: true });
            }
        }

        // --- NEW: Audio Processor (Bazz-Voice) ---
        const audioObj = messageObj.audio;
        if (audioObj) {
            try {
                const { VoiceService } = await import('@/lib/agents/voice-service');
                const fullConfig = await db.productConfig.findUnique({ where: { id: config.id } });

                // Audio URL retrieval normally requires a second call to Meta Media API
                const audioUrl = `https://graph.facebook.com/v17.0/${audioObj.id}`;

                VoiceService.processVoiceNote(audioUrl, {
                    userId: config.userId,
                    task: '[Audio Input]',
                    db,
                    productConfig: fullConfig as any
                }).catch(err => logger.error(`Voice execution failed for ${from}`, err));

                return NextResponse.json({ success: true, voiceNoteHandled: true });
            } catch (err: any) {
                logger.error(`Failed to initiate VoiceService for ${from}`, err);
            }
        }

        // --- NEW: Coordinator Agent Trigger (Autonomous Sales) ---
        // If it's a HITL command, let the BazzAI Swarm decide how to handle it.
        if (messageText) {
            try {
                const { CoordinatorAgent } = await import('@/lib/agents/coordinator-agent');
                const coordinator = new CoordinatorAgent();

                // We pass the full context including the DB and ProductConfig
                const fullConfig = await db.productConfig.findUnique({
                    where: { id: config.id }
                });

                // Fire-and-forget the swarm run (we don't want to block the webhook response)
                coordinator.run({
                    userId: config.userId,
                    task: messageText,
                    db,
                    productConfig: fullConfig as any
                }).catch(err => logger.error(`Swarm execution failed for ${from}`, err));

            } catch (err: any) {
                logger.error(`Failed to initiate Coordinator for ${from}`, err);
            }
        }
        // ---------------------------------------------------------

        // 2. Forward to the n8n Master Workflow
        // We use the simplified format that Bazz_Connect_Master expects
        const n8nWebhookUrl = process.env.N8N_CONNECT_MASTER_URL || 'https://tentacled-goldfish.pikapod.net/webhook/bazz-connect-master';

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
            logger.error(`n8n forward failed: ${errorText}`, new Error("n8n Network Error"), { webhookId: config.webhookId });
            return NextResponse.json({ error: 'Failed to forward to automation' }, { status: 502 });
        }

        return NextResponse.json({ success: true, forwarded: true });

    } catch (error: any) {
        logger.error('WhatsApp Webhook Error', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
