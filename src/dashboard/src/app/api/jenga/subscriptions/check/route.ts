export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/jenga/subscriptions/check
 * Daily subscription lifecycle check called by Bazz-Flow n8n workflow.
 * Returns:
 *   { renewalReminders: [{ userId, subscriptionId }], suspended: [userId] }
 *
 * Protected by: x-api-key header = INTERNAL_API_KEY
 */
export async function GET(req: Request) {
    const apiKey = req.headers.get('x-api-key');
    if (apiKey !== process.env.INTERNAL_API_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const now = new Date();
        const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

        // Find ACTIVE subscriptions expiring in the next 3 days
        const expiringSoon = await db.subscription.findMany({
            where: {
                status: 'ACTIVE',
                expiresAt: {
                    lte: threeDaysFromNow,
                    gte: now,
                },
            },
            select: { id: true, userId: true, productType: true, expiresAt: true },
        });

        // Find ACTIVE subscriptions that have already expired (should be suspended)
        const expired = await db.subscription.findMany({
            where: {
                status: 'ACTIVE',
                expiresAt: {
                    lt: now,
                },
            },
            select: { id: true, userId: true },
        });

        // Auto-suspend expired subscriptions
        if (expired.length > 0) {
            const expiredIds = expired.map((s: any) => s.id);
            await db.subscription.updateMany({
                where: { id: { in: expiredIds } },
                data: { status: 'SUSPENDED' },
            });

            // Audit log the batch suspension
            await db.auditLog.create({
                data: {
                    event: 'BATCH_SUSPEND',
                    detail: JSON.stringify({
                        count: expired.length,
                        ids: expiredIds,
                        reason: 'expiresAt passed with no renewal payment',
                    }),
                },
            });
        }

        return NextResponse.json({
            success: true,
            renewalReminders: expiringSoon.map((s: any) => ({
                userId: s.userId,
                subscriptionId: s.id,
                productType: s.productType,
                expiresAt: s.expiresAt,
            })),
            suspended: expired.map((s: any) => s.userId),
            processedAt: new Date().toISOString(),
        });
    } catch (error: any) {
        console.error('[jenga/subscriptions/check] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
