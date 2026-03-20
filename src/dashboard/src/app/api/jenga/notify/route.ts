export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

type NotifyType = 'PAYMENT_RECEIVED' | 'RENEWAL_DUE' | 'SUSPENDED';

/**
 * POST /api/jenga/notify
 * Internal notification router — sends emails to clients.
 * Called by n8n after poll or lifecycle check triggers an event.
 *
 * Body: { type: NotifyType, userId: string, subscriptionId: string, extra?: object }
 *
 * For now: logs the notification event. In production, integrate with
 * SendGrid, Resend, or Gmail SMTP for actual email delivery.
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

        // Build notification message based on type
        let subject = '';
        let message = '';
        const paybillInfo = 'Paybill: 247247 | Account: 0714929790';

        switch (type) {
            case 'PAYMENT_RECEIVED':
                subject = '✅ Payment Received — Your BazzAI Portal is Active';
                message = `Hi ${user.name || user.companyName || 'Client'},\n\nYour payment has been confirmed. Your subscription is now ACTIVE.\n\nThank you for choosing BazzAI!\n\n— Bazztech Networks`;
                break;

            case 'RENEWAL_DUE':
                subject = '⏰ Subscription Renewal Due — BazzAI';
                message = `Hi ${user.name || user.companyName || 'Client'},\n\nYour BazzAI subscription is expiring soon.\n\nTo continue uninterrupted service, please make your renewal payment:\n${paybillInfo}\n\nAmount: KES ${extra?.amount || 'as agreed'}\n\nThank you!\n\n— Bazztech Networks`;
                break;

            case 'SUSPENDED':
                subject = '⚠️ Subscription Suspended — BazzAI';
                message = `Hi ${user.name || user.companyName || 'Client'},\n\nYour BazzAI subscription has been suspended due to non-payment.\n\nTo reactivate, please make your payment:\n${paybillInfo}\n\nYour portal will be reactivated within 15 minutes of payment.\n\n— Bazztech Networks`;
                break;
        }

        // Log the notification
        await db.auditLog.create({
            data: {
                event: `NOTIFY_${type}`,
                detail: JSON.stringify({
                    userId,
                    email: user.email,
                    subscriptionId,
                    subject,
                }),
            },
        });

        // TODO: Integrate SendGrid/Resend/Gmail SMTP here
        // For now, we log and return the message for n8n to handle email sending
        console.log(`[notify] ${type} → ${user.email}: ${subject}`);

        return NextResponse.json({
            success: true,
            notification: {
                type,
                to: user.email,
                subject,
                message,
            },
        });
    } catch (error: any) {
        console.error('[jenga/notify] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
