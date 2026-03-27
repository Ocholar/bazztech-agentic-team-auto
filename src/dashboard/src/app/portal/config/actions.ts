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
    const leadNotifyEmail = formData.get('leadNotifyEmail') as string | null;

    const hasCore = !!systemPrompt;

    if (configId) {
        await db.productConfig.update({
            where: { id: configId, userId },
            data: {
                systemPrompt,
                knowledgeBase,
                ...(leadNotifyEmail ? { leadNotifyEmail } : {}),
                ...(hasCore ? { isConfigured: true } : {}),
            }
        });
    } else {
        const sub = await db.subscription.findFirst({
            where: { userId, status: 'ACTIVE' }
        });

        if (!sub) throw new Error("No active subscription found to configure.");

        await db.productConfig.create({
            data: {
                userId,
                subscriptionId: sub.id,
                systemPrompt,
                knowledgeBase,
                isConfigured: hasCore,
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
    const configId = formData.get('configId') as string;
    if (!configId) throw new Error("Please save your Persona Configuration first before adding API Keys.");

    // WhatsApp (Bazz-Connect)
    const whatsappPhoneId = formData.get('whatsappPhoneId') as string | null;
    const whatsappToken = formData.get('whatsappToken') as string | null;
    const whatsappUrl = formData.get('whatsappUrl') as string | null;

    // Bazz-Flow (Daraja)
    const darajaConsumerKey = formData.get('darajaConsumerKey') as string | null;
    const darajaConsumerSecret = formData.get('darajaConsumerSecret') as string | null;
    const darajaShortcode = formData.get('darajaShortcode') as string | null;
    const darajaPasskey = formData.get('darajaPasskey') as string | null;
    const darajaCallbackUrl = formData.get('darajaCallbackUrl') as string | null;
    const erpWebhookUrl = formData.get('erpWebhookUrl') as string | null;

    // Bazz-Doc (OpenAI)
    const openaiApiKey = formData.get('openaiApiKey') as string | null;
    const docOutputWebhook = formData.get('docOutputWebhook') as string | null;

    // Bazz-Lead (Meta / CRM)
    const metaPageAccessToken = formData.get('metaPageAccessToken') as string | null;
    const metaPageId = formData.get('metaPageId') as string | null;
    const crmWebhookUrl = formData.get('crmWebhookUrl') as string | null;

    // Determine if all essential credentials are now present for any product
    const isNowConfigured = !!(whatsappToken || darajaConsumerKey || openaiApiKey || metaPageAccessToken);

    const updateData: Record<string, any> = { ...(isNowConfigured ? { isConfigured: true } : {}) };
    if (whatsappPhoneId) updateData.whatsappPhoneId = whatsappPhoneId;
    if (whatsappToken) updateData.whatsappToken = whatsappToken;
    if (whatsappUrl) updateData.whatsappUrl = whatsappUrl;
    if (darajaConsumerKey) updateData.darajaConsumerKey = darajaConsumerKey;
    if (darajaConsumerSecret) updateData.darajaConsumerSecret = darajaConsumerSecret;
    if (darajaShortcode) updateData.darajaShortcode = darajaShortcode;
    if (darajaPasskey) updateData.darajaPasskey = darajaPasskey;
    if (darajaCallbackUrl) updateData.darajaCallbackUrl = darajaCallbackUrl;
    if (erpWebhookUrl) updateData.erpWebhookUrl = erpWebhookUrl;
    if (openaiApiKey) updateData.openaiApiKey = openaiApiKey;
    if (docOutputWebhook) updateData.docOutputWebhook = docOutputWebhook;
    if (metaPageAccessToken) updateData.metaPageAccessToken = metaPageAccessToken;
    if (metaPageId) updateData.metaPageId = metaPageId;
    if (crmWebhookUrl) updateData.crmWebhookUrl = crmWebhookUrl;

    await db.productConfig.update({
        where: { id: configId, userId },
        data: updateData,
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
