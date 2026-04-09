import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        // Secure the cron endpoint. In production, provide CRON_SECRET in Vercel.
        const authHeader = req.headers.get('authorization');
        if (process.env.NODE_ENV === 'production') {
            if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
                return new NextResponse('Unauthorized', { status: 401 });
            }
        }

        const now = new Date();

        // Target windows:
        // 1. Due in 3 days (Warning)
        // 2. Due in 1 day (Urgent)
        // 3. Due today (Final Notice)

        const startOfToday = new Date(now.setHours(0, 0, 0, 0));

        // +1 day window
        const target1DayStart = new Date(startOfToday.getTime() + 1 * 24 * 60 * 60 * 1000);
        const target1DayEnd = new Date(startOfToday.getTime() + 2 * 24 * 60 * 60 * 1000);

        // +3 day window
        const target3DayStart = new Date(startOfToday.getTime() + 3 * 24 * 60 * 60 * 1000);
        const target3DayEnd = new Date(startOfToday.getTime() + 4 * 24 * 60 * 60 * 1000);

        // Fetch subscriptions that are ACTIVE but expiring in the windows
        const subscriptions = await db.subscription.findMany({
            where: {
                status: 'ACTIVE',
                expiresAt: {
                    not: null,
                },
                OR: [
                    {
                        // Expiring in exactly 3 days
                        expiresAt: {
                            gte: target3DayStart,
                            lt: target3DayEnd
                        }
                    },
                    {
                        // Expiring in exactly 1 day
                        expiresAt: {
                            gte: target1DayStart,
                            lt: target1DayEnd
                        }
                    },
                    {
                        // Expiring today / past due
                        expiresAt: {
                            lt: target1DayStart
                        }
                    }
                ]
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                        companyName: true
                    }
                }
            }
        });

        if (subscriptions.length === 0) {
            return NextResponse.json({ success: true, message: 'No reminders to send today.' });
        }

        const reminders = subscriptions.map(sub => {
            let urgency = 'PAST_DUE';
            const exp = sub.expiresAt!.getTime();

            if (exp >= target3DayStart.getTime() && exp < target3DayEnd.getTime()) urgency = '3_DAYS';
            else if (exp >= target1DayStart.getTime() && exp < target1DayEnd.getTime()) urgency = '1_DAY';

            const maintenanceFee = Math.round((sub.oneTimeFee || 4999) * 0.2);

            return {
                subscriptionId: sub.id,
                productType: sub.productType,
                urgency,
                expiresAt: sub.expiresAt,
                maintenanceFee,
                client: {
                    id: sub.userId,
                    name: sub.user.name,
                    email: sub.user.email,
                    phone: sub.user.phone,
                    companyName: sub.user.companyName
                }
            };
        });

        // Fire and forget to the internal BazzAI n8n Webhook
        const n8nWebhookUrl = 'https://tentacled-goldfish.pikapod.net/webhook/bazzai-reminders';

        const n8nRes = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ updates: reminders, count: reminders.length, timestamp: new Date() })
        });

        if (!n8nRes.ok) {
            console.error('[cron] n8n webhook failed with status:', n8nRes.status);
            throw new Error('Failed to dispatch to n8n webhook');
        }

        // Technically, if they are PAST_DUE, we should flip their DB status here to suspend them!
        const pastDueIds = reminders.filter(r => r.urgency === 'PAST_DUE').map(r => r.subscriptionId);
        if (pastDueIds.length > 0) {
            await db.subscription.updateMany({
                where: { id: { in: pastDueIds } },
                data: { status: 'PAST_DUE' }
            });
        }

        return NextResponse.json({
            success: true,
            dispatched: reminders.length,
            suspended: pastDueIds.length
        });

    } catch (error: any) {
        console.error('[cron] Reminder dispatch failed:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
