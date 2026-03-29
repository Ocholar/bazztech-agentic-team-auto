export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

type NotifyType = 'PAYMENT_RECEIVED' | 'SETUP_RECEIVED' | 'MAINTENANCE_RECEIVED' | 'RENEWAL_DUE' | 'SUSPENDED';

const BAZZAI_SUPPORT_PHONE = process.env.BAZZAI_WHATSAPP_PHONE_ID;
const BAZZAI_SUPPORT_TOKEN = process.env.BAZZAI_WHATSAPP_TOKEN;
const META_API = 'https://graph.facebook.com/v19.0';

/**
 * POST /api/jenga/notify
 * Sends a WhatsApp message to the client via BazzAI's Meta Business account.
 * Called by n8n after poll or lifecycle check triggers an event.
 *
 * Body: { type: NotifyType, userId: string, subscriptionId: string, extra?: object }
 */
export async function POST(req: Request) {
    try {
        const apiKey = req.headers.get('x-api-key');
        if (apiKey !== process.env.INTERNAL_API_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { type, userId, subscriptionId, extra } = body as {
            type: NotifyType;
            userId: string;
            subscriptionId: string;
            extra?: Record<string, any>;
        };

        if (!type || !userId) {
            return NextResponse.json(
                { error: 'Missing required fields: type, userId' },
                { status: 400 }
            );
        }

        // Fetch user details
        const user = await db.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Fetch the client's phone number from their subscription (Jenga paidPhone)
        let clientPhone: string | null = null;
        if (subscriptionId) {
            const sub = await db.subscription.findUnique({
                where: { id: subscriptionId },
                select: { paidPhone: true },
            });
            clientPhone = sub?.paidPhone || null;
        }

        // Fallback: look up admin BazzAI product config for sending credentials
        // We use the platform's own Bazz-Connect Meta credentials for outbound messages
        let waPhoneId = BAZZAI_SUPPORT_PHONE;
        let waToken = BAZZAI_SUPPORT_TOKEN;

        if (!waPhoneId || !waToken) {
            // Pull from the admin's ProductConfig (Bazz-Connect config for admin@bazztech.co.ke)
            const adminConfig = await db.productConfig.findFirst({
                where: {
                    user: { role: 'ADMIN' },
                    whatsappPhoneId: { not: null },
                    whatsappToken: { not: null },
                    isConfigured: true,
                },
                select: { whatsappPhoneId: true, whatsappToken: true },
            });
            waPhoneId = adminConfig?.whatsappPhoneId || null;
            waToken = adminConfig?.whatsappToken || null;
        }

        // Build WhatsApp message text
        const paybillInfo = `Account: 0290170458002 (Equity Bank)`;
        const supportLine = `\n\n💬 Need help? WhatsApp our support team: +254 781 751 937`;
        let message = '';

        switch (type) {
            case 'PAYMENT_RECEIVED':
                message = `✅ *Welcome to BazzAI!*\n\nHi ${user.name || user.companyName || 'Client'},\n\nYour payment has been confirmed and your subscription is now *ACTIVE*! 🎉\n\n*Get started in 3 minutes:*\n1️⃣  Login: https://www.bazztech.co.ke/login\n2️⃣  Go to Portal → Configure Prompts\n3️⃣  Add your API credentials (WhatsApp Token / Daraja Keys)\n4️⃣  Your AI agent activates automatically!\n\nThank you for choosing Bazztech Networks!${supportLine}`;
                break;

            case 'MAINTENANCE_RECEIVED':
                message = `✅ *Maintenance Confirmed — BazzAI*\n\nHi ${user.name || user.companyName || 'Client'},\n\nYour monthly maintenance payment has been received. Your subscription has been extended by 30 days.\n\nThank you for your continued partnership! 🙏${supportLine}`;
                break;

            case 'RENEWAL_DUE':
                message = `⏰ *Subscription Renewal Due — BazzAI*\n\nHi ${user.name || user.companyName || 'Client'},\n\nYour BazzAI subscription is expiring soon.\n\nTo continue uninterrupted service, please make your renewal payment:\n📌 ${paybillInfo}\n💰 Amount: KES ${extra?.amount || 'as agreed'}${supportLine}`;
                break;

            case 'SUSPENDED':
                message = `⚠️ *Subscription Suspended — BazzAI*\n\nHi ${user.name || user.companyName || 'Client'},\n\nYour subscription has been *suspended* due to non-payment.\n\nTo reactivate within 15 minutes, please pay:\n📌 ${paybillInfo}${supportLine}`;
                break;
        }

        // Log the notification event
        await db.auditLog.create({
            data: {
                event: `NOTIFY_${type}`,
                detail: JSON.stringify({
                    userId,
                    email: user.email,
                    subscriptionId,
                    clientPhone,
                    sentVia: 'WhatsApp',
                }),
            },
        });

        // Send WhatsApp message via BazzAI Meta Business Account
        let whatsappResult: any = { skipped: true, reason: 'No client phone or WA credentials available' };

        if (clientPhone && waPhoneId && waToken) {
            // Normalize phone: strip spaces, ensure no +
            const toPhone = clientPhone.replace(/\s+/g, '').replace(/^\+/, '');

            const waRes = await fetch(`${META_API}/${waPhoneId}/messages`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${waToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messaging_product: 'whatsapp',
                    to: toPhone,
                    type: 'text',
                    text: { body: message },
                }),
            });

            whatsappResult = await waRes.json();
            console.log(`[notify] WhatsApp dispatch → ${toPhone}:`, whatsappResult);
        } else {
            console.warn(`[notify] SKIPPED WhatsApp dispatch — clientPhone: ${clientPhone}, waPhoneId: ${waPhoneId ? 'set' : 'missing'}, waToken: ${waToken ? 'set' : 'missing'}`);
        }

        // 📩 Email Notification Scaffold (GAP H)
        // If we have a verified email service (e.g. Resend), we would send the onboarding email here.
        console.log(`[notify] Email Scaffold → To: ${user.email}, Type: ${type}`);
        // await sendOnboardingEmail(user.email, type, extra);

        return NextResponse.json({
            success: true,
            sentVia: 'WhatsApp',
            clientPhone,
            whatsappResult,
            emailScaffold: true,
        });
    } catch (error: any) {
        console.error('[jenga/notify] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
