"use server";

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { LeadStage } from '@prisma/client';

export async function addLead(formData: FormData) {
    const session = await auth();
    if (!session || !session.user) throw new Error("Unauthorized");

    const userId = session.user.id;
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const source = formData.get('source') as string || 'Manual Entry';

    await db.lead.create({
        data: {
            userId,
            name,
            phone,
            email,
            source,
            stage: 'LEAD'
        }
    });

    revalidatePath('/portal/crm');
    return { success: true };
}

export async function updateLeadStage(leadId: string, stage: LeadStage) {
    const session = await auth();
    if (!session || !session.user) throw new Error("Unauthorized");

    await db.lead.update({
        where: { id: leadId, userId: session.user.id },
        data: { stage }
    });

    revalidatePath('/portal/crm');
    return { success: true };
}
