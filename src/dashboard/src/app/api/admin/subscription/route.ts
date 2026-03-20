import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * POST /api/admin/subscription
 * Manual override for activation/suspension.
 * Body: { subscriptionId: string, action: 'ACTIVATE' | 'SUSPEND' }
 */
export async function POST(req: Request) {
    try {
        const { subscriptionId, action } = await req.json();

        if (!subscriptionId || !action) {
            return NextResponse.json({ error: 'Missing subscriptionId or action' }, { status: 400 });
        }

        const status = action === 'ACTIVATE' ? 'ACTIVE' : 'SUSPENDED';

        const updatedSub = await db.subscription.update({
            where: { id: subscriptionId },
            data: { status },
            include: { user: true }
        });

        await db.auditLog.create({
            data: {
                event: `ADMIN_MANUAL_${action}`,
                detail: `Manual override for ${updatedSub.user.email} (${updatedSub.productType})`,
            },
        });

        return NextResponse.json({ success: true, status: updatedSub.status });

    } catch (error: any) {
        console.error('[admin/subscription] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
