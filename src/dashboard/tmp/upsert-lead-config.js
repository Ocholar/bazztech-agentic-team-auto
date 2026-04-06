const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = 'reaochola@gmail.com';
    const webhookUrl = 'https://tentacled-goldfish.pikapod.net/webhook/bazz-lead-sync';

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) { console.log('User not found'); return; }

        // Find existing or create new
        const existing = await prisma.productConfig.findFirst({
            where: { userId: user.id, productType: 'BAZZ_LEAD' }
        });

        if (existing) {
            await prisma.productConfig.update({
                where: { id: existing.id },
                data: {
                    crmWebhookUrl: webhookUrl,
                    isConfigured: true
                }
            });
            console.log(`Updated existing BAZZ_LEAD config with URL: ${webhookUrl}`);
        } else {
            await prisma.productConfig.create({
                data: {
                    userId: user.id,
                    productType: 'BAZZ_LEAD',
                    crmWebhookUrl: webhookUrl,
                    isConfigured: true,
                    systemPrompt: 'You are the BazzAI Sales Representative. Bridge to WhatsApp for closing.',
                }
            });
            console.log(`Created new BAZZ_LEAD config with URL: ${webhookUrl}`);
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
