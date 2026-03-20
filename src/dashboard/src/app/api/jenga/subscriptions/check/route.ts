export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * POST /api/jenga/subscriptions/check
 * Daily lifecycle management — called by n8n cron once per day.
 *
 * Actions:
 *  1. Find subscriptions expiring in ≤ 3 days → flag for renewal reminder
 *  2. Find subscriptions expired > 24h → suspend
 *
 * Returns summary of actions taken.
 */
export async function POST(req: Request) {
    try {
        const apiKey = req.headers.get('x-api-key');
        if (apiKey !== process.env.INTERNAL_API_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const now = new Date();
        const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        // 1. Find active subs expiring within 3 days (renewal reminders)
        const expiringSubscriptions = await db.subscription.findMany({
            where: {
                status: 'ACTIVE',
                expiresAt: {
                    lte: threeDaysFromNow,
                    gt: now,
                },
            },
            include: { user: true },
        });

        // 2. Find expired subs that should be suspended (expired > 24h ago)
        const expiredSubscriptions = await db.subscription.findMany({
            where: {
                status: 'ACTIVE',
                expiresAt: {
                    lte: oneDayAgo,
                },
            },
            include: { user: true },
        });

        // Suspend expired subscriptions
        const suspendedIds: string[] = [];
        for (const sub of expiredSubscriptions) {
            await db.subscription.update({
                where: { id: sub.id },
                data: { status: 'SUSPENDED' },
            });
            suspendedIds.push(sub.id);

            await db.auditLog.create({
                data: {
                    event: 'SUB_SUSPENDED',
                    detail: JSON.stringify({
                        subscriptionId: sub.id,
                        userId: sub.userId,
                        productType: sub.productType,
                        expiredAt: sub.expiresAt,
                    }),
                },
            });
        }

        // Log the check
        await db.auditLog.create({
            data: {
                event: 'LIFECYCLE_CHECK',
                detail: JSON.stringify({
                    checkedAt: now.toISOString(),
                    expiringCount: expiringSubscriptions.length,
                    suspendedCount: expiredSubscriptions.length,
                }),
            },
        });

        return NextResponse.json({
            success: true,
            renewalReminders: expiringSubscriptions.map((s) => ({
                subscriptionId: s.id,
                userId: s.userId,
                email: s.user.email,
                productType: s.productType,
                expiresAt: s.expiresAt,
            })),
            suspended: suspendedIds,
        });
    } catch (error: any) {
        console.error('[jenga/subscriptions/check] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
