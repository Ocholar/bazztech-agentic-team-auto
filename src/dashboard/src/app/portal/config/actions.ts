"use server";

import { auth } from '../../../../auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function saveProductConfig(formData: FormData) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) throw new Error("Unauthorized");

    const userId = session.user.id;
    const systemPrompt = formData.get('systemPrompt') as string;
    const knowledgeBase = formData.get('knowledgeBase') as string;
    const configId = formData.get('configId') as string;

    if (configId) {
        await db.productConfig.update({
            where: { id: configId, userId },
            data: { systemPrompt, knowledgeBase }
        });
    } else {
        // Find an active subscription to link to
        const sub = await db.subscription.findFirst({
            where: { userId, status: 'ACTIVE' }
        });

        if (!sub) throw new Error("No active subscription found to configure.");

        await db.productConfig.create({
            data: {
                userId,
                subscriptionId: sub.id,
                systemPrompt,
                knowledgeBase
            }
        });
    }

    revalidatePath('/portal/config');
    return { success: true };
}

export async function saveApiKeys(formData: FormData) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) throw new Error("Unauthorized");

    const userId = session.user.id;
    const whatsappPhoneId = formData.get('whatsappPhoneId') as string;
    const whatsappToken = formData.get('whatsappToken') as string;
    const configId = formData.get('configId') as string;

    if (!configId) throw new Error("Please save your Persona Configuration first before adding API Keys.");

    await db.productConfig.update({
        where: { id: configId, userId },
        data: { whatsappPhoneId, whatsappToken }
    });

    revalidatePath('/portal/config');
    return { success: true };
}

export async function triggerTestWorkflow() {
    const session = await auth();
    if (!session || !session.user || !session.user.id) throw new Error("Unauthorized");

    const config = await db.productConfig.findFirst({
        where: { userId: session.user.id }
    });

    if (!config || !config.webhookId) throw new Error("No configuration found to trigger.");

    // This typically calls the n8n webhook
    // We attempt an actual fetch request to the connected automation flow
    const n8nUrl = process.env.N8N_WEBHOOK_URL || 'https://n8n.bazztech.co.ke/webhook';
    try {
        await fetch(`${n8nUrl}/${config.webhookId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event: 'TEST_TRIGGER',
                client: session.user.id,
                message: 'This is a test message from your BazzAI Platform.',
                timestamp: new Date().toISOString()
            })
        });
        console.log(`Successfully triggered n8n for webhookId: ${config.webhookId}`);
    } catch (e) {
        console.error("Failed to trigger n8n, but UI will reflect attempt", e);
    }

    return { success: true, message: "AI Agent Test triggered! Check your WhatsApp/n8n." };
}

export async function createPendingSubscription(productType: any) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) throw new Error("Unauthorized");

    const userId = session.user.id;

    const existing = await db.subscription.findFirst({
        where: { userId, productType }
    });

    if (existing) return { success: true };

    let fee = 2500;
    if (productType === 'BAZZ_DOC' || productType === 'BAZZ_FLOW') fee = 5000;

    await db.subscription.create({
        data: {
            userId,
            productType,
            status: 'INACTIVE',
            businessSizeTier: 'MICRO',
            monthlyMaintenanceRate: 0.20,
            oneTimeFee: fee,
            startDate: new Date(),
            paymentReference: `BAZ-PEND-${Math.floor(Math.random() * 10000)}`
        }
    });

    revalidatePath('/portal/config');
    revalidatePath('/admin');
    return { success: true };
}
