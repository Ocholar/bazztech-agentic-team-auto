"use server";

import { auth } from '../../../auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { SubStatus } from '@prisma/client';

export async function setSubscriptionStatus(subId: string, newStatus: SubStatus) {
    const session = await auth();
    // Double check admin role
    if (!session || !session.user || (session.user as any)?.role !== 'ADMIN') {
        throw new Error("Unauthorized Admin Action");
    }

    const sub = await db.subscription.findUnique({ where: { id: subId } });
    if (!sub) throw new Error("Subscription not found");

    // Update the DB
    await db.subscription.update({
        where: { id: subId },
        data: { status: newStatus }
    });

    // Log the override
    await db.auditLog.create({
        data: {
            event: 'ADMIN_OVERRIDE',
            detail: `Admin ${session.user.email} forcefully set Subscription ${subId} to ${newStatus}`
        }
    });

    revalidatePath('/admin');
    revalidatePath('/portal/config');

    return { success: true };
}
