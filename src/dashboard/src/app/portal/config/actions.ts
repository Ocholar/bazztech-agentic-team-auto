"use server";

import { auth } from '../../../../auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const saveConfigSchema = z.object({
    configId: z.string().optional(),
    systemPrompt: z.string().max(10000).optional(),
    knowledgeBase: z.string().max(50000).optional(),
    leadNotifyEmail: z.string().email().optional().or(z.literal('')),
});

const saveApiKeysSchema = z.object({
    configId: z.string().min(1, "Configuration required"),
    whatsappPhoneId: z.string().optional(),
    whatsappToken: z.string().optional(),
    whatsappUrl: z.string().optional(),
    darajaConsumerKey: z.string().optional(),
    darajaConsumerSecret: z.string().optional(),
    darajaShortcode: z.string().optional(),
    darajaPasskey: z.string().optional(),
    darajaCallbackUrl: z.string().optional(),
    erpWebhookUrl: z.string().url().optional().or(z.literal('')),
    openaiApiKey: z.string().optional(),
    docOutputWebhook: z.string().url().optional().or(z.literal('')),
    metaPageAccessToken: z.string().optional(),
    metaPageId: z.string().optional(),
    crmWebhookUrl: z.string().url().optional().or(z.literal('')),
});

export async function saveProductConfig(formData: FormData) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) throw new Error("Unauthorized");
    const userId = session.user.id;

    try {
        const rawData = Object.fromEntries(formData.entries());
        const validated = saveConfigSchema.parse(rawData);

        const hasCore = !!validated.systemPrompt;

        if (validated.configId) {
            // Verify ownership to prevent IDOR
            const existingConfig = await db.productConfig.findFirst({
                where: { id: validated.configId, userId },
                select: { id: true }
            });

            if (!existingConfig) {
                console.warn(`[SECURITY] User ${userId} attempted to modify config ${validated.configId} without ownership`);
                throw new Error("Configuration not found or access denied");
            }

            await db.productConfig.update({
                where: { id: validated.configId },
                data: {
                    systemPrompt: validated.systemPrompt,
                    knowledgeBase: validated.knowledgeBase,
                    ...(validated.leadNotifyEmail ? { leadNotifyEmail: validated.leadNotifyEmail } : {}),
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
                    systemPrompt: validated.systemPrompt,
                    knowledgeBase: validated.knowledgeBase,
                    ...((hasCore ? { isConfigured: true } : {}) as any),
                }
            });
        }

        revalidatePath('/portal/config');
        return { success: true, message: "Configuration saved successfully" };
    } catch (e: any) {
        if (e instanceof z.ZodError) {
            return { success: false, error: (e as any).errors[0].message };
        }
        return { success: false, error: e.message || "Failed to save configuration" };
    }
}

export async function saveApiKeys(formData: FormData) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) throw new Error("Unauthorized");

    const userId = session.user.id;

    try {
        const rawData = Object.fromEntries(formData.entries());
        const validated = saveApiKeysSchema.parse(rawData);

        // Explicit IDOR check: ensure user owns this configId
        const existingConfig = await db.productConfig.findFirst({
            where: { id: validated.configId, userId },
            select: { id: true }
        });

        if (!existingConfig) {
            console.warn(`[SECURITY] User ${userId} attempted to modify keys for config ${validated.configId}`);
            throw new Error("Configuration not found or access denied");
        }

        const isNowConfigured = !!(validated.whatsappToken || validated.darajaConsumerKey || validated.openaiApiKey || validated.metaPageAccessToken);

        const updateData: Record<string, any> = { ...(isNowConfigured ? { isConfigured: true } : {}) };

        // Only append explicitly provided values
        const fields = ['whatsappPhoneId', 'whatsappToken', 'whatsappUrl', 'darajaConsumerKey', 'darajaConsumerSecret', 'darajaShortcode', 'darajaPasskey', 'darajaCallbackUrl', 'erpWebhookUrl', 'openaiApiKey', 'docOutputWebhook', 'metaPageAccessToken', 'metaPageId', 'crmWebhookUrl'] as const;

        for (const field of fields) {
            if (validated[field]) updateData[field] = validated[field];
        }

        await db.productConfig.update({
            where: { id: validated.configId },
            data: updateData,
        });

        revalidatePath('/portal/config');
        return { success: true };
    } catch (e: any) {
        if (e instanceof z.ZodError) {
            return { success: false, error: "Validation failed: " + (e as any).errors[0].message };
        }
        return { success: false, error: e.message || "Failed to save API keys" };
    }
}

export async function triggerTestWorkflow() {
    const session = await auth();
    if (!session || !session.user || !session.user.id) throw new Error("Unauthorized");

    const config = await db.productConfig.findFirst({
        where: { userId: session.user.id }
    });

    if (!config || !config.webhookId) throw new Error("No configuration found to trigger.");

    // This typically calls the n8n webhook
    // NOTE: For the "Fetch Client AI Config" node to work, we need to send data in the BODY.
    // This requires n8n to be set to POST mode.
    const baseUrl = process.env.N8N_WEBHOOK_URL || 'https://tentacled-goldfish.pikapod.net/webhook';
    const isTestMode = true;
    const n8nUrl = isTestMode ? baseUrl.replace('/webhook', '/webhook-test') : baseUrl;

    const webhookPath = config.webhookId || 'bazz-connect-master';

    try {
        const queryParams = new URLSearchParams({
            webhookId: webhookPath, // Included in query as fallback
            event: 'TEST_TRIGGER'
        });

        const response = await fetch(`${n8nUrl}/${webhookPath}?${queryParams.toString()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                webhookId: webhookPath,
                event: 'TEST_TRIGGER',
                userMessage: 'Hello BazzAI! This is a test message from my dashboard.',
                message: 'Hello BazzAI! This is a test message from my dashboard.', // Redundant key
                text: 'Hello BazzAI! This is a test message from my dashboard.', // Redundant key
                body: 'Hello BazzAI! This is a test message from my dashboard.', // Redundant key
                client: session.user.id,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`n8n responded with ${response.status}: ${errorText}`);
        }

        console.log(`Successfully triggered n8n for path: ${webhookPath} via GET`);
        return { success: true, message: "AI Agent Test triggered! Check your WhatsApp/n8n." };
    } catch (e: any) {
        console.error("Failed to trigger n8n:", e);
        return { success: false, error: `Automation Error: ${e.message}` };
    }
}

const productTypeSchema = z.enum(['BAZZ_CONNECT', 'BAZZ_FLOW', 'BAZZ_DOC', 'BAZZ_LEAD']);

export async function createPendingSubscription(productTypeRaw: any) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) throw new Error("Unauthorized");

    const userId = session.user.id;
    let productType;
    try {
        productType = productTypeSchema.parse(productTypeRaw);
    } catch (e: any) {
        throw new Error("Invalid product type");
    }

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
