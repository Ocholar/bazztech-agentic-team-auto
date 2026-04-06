const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = 'reaochola@gmail.com';
    const sheetId = '1d_lRrjDphnYOKnoH508ytD6FP7F7AU1hq8rEsItKJ3g';
    const webhookUrl = 'https://tentacled-goldfish.pikapod.net/webhook/bazz-lead-sync';

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) { console.log('User not found'); return; }

        // 1. Ensure BAZZ_LEAD Subscription exists
        let sub = await prisma.subscription.findFirst({
            where: { userId: user.id, productType: 'BAZZ_LEAD' }
        });

        if (!sub) {
            sub = await prisma.subscription.create({
                data: {
                    userId: user.id,
                    productType: 'BAZZ_LEAD',
                    status: 'ACTIVE',
                    businessSizeTier: 'MEDIUM',
                    oneTimeFee: 4999,
                    paymentReference: 'ADMIN-MASTER-OVERRIDE',
                }
            });
            console.log(`Created MASTER subscription for BAZZ_LEAD (ID: ${sub.id})`);
        } else {
            if (sub.status !== 'ACTIVE') {
                await prisma.subscription.update({
                    where: { id: sub.id },
                    data: { status: 'ACTIVE' }
                });
                console.log(`Activated existing BAZZ_LEAD subscription.`);
            }
        }

        // 2. Ensure ProductConfig exists and is linked to the Sub
        const config = await prisma.productConfig.findFirst({
            where: { subscriptionId: sub.id }
        });

        if (config) {
            await prisma.productConfig.update({
                where: { id: config.id },
                data: {
                    crmWebhookUrl: webhookUrl,
                    isConfigured: true,
                    productType: 'BAZZ_LEAD' // Ensure it's correct
                }
            });
            console.log(`Updated existing ProductConfig with CRM Webhook: ${webhookUrl}`);
        } else {
            await prisma.productConfig.create({
                data: {
                    userId: user.id,
                    subscriptionId: sub.id,
                    productType: 'BAZZ_LEAD',
                    crmWebhookUrl: webhookUrl,
                    isConfigured: true,
                    systemPrompt: 'You are the BazzAI Sales Representative. Target: CEOs/CTOs. Closed via WhatsApp.',
                }
            });
            console.log(`Created new ProductConfig for BAZZ_LEAD with CRM Webhook: ${webhookUrl}`);
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
