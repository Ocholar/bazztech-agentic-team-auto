const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const userId = '9ebd9542-77b7-4974-8a58-6d8dbed1e577';

    try {
        let sub = await prisma.subscription.findFirst({
            where: { userId: userId, productType: 'BAZZ_DOC' }
        });

        if (!sub) {
            sub = await prisma.subscription.create({
                data: {
                    userId: userId,
                    productType: 'BAZZ_DOC',
                    status: 'ACTIVE',
                    businessSizeTier: 'MEDIUM',
                    oneTimeFee: 4999,
                    paymentReference: 'ADMIN-MASTER-DOC',
                }
            });
            console.log(`Created MASTER subscription for BAZZ_DOC.`);
        } else if (sub.status !== 'ACTIVE') {
            await prisma.subscription.update({
                where: { id: sub.id },
                data: { status: 'ACTIVE' }
            });
            console.log(`Activated existing BAZZ_DOC subscription.`);
        }

        const config = await prisma.productConfig.findFirst({
            where: { userId: userId, productType: 'BAZZ_DOC' }
        });

        if (!config) {
            await prisma.productConfig.create({
                data: {
                    userId: userId,
                    subscriptionId: sub.id,
                    productType: 'BAZZ_DOC',
                    isConfigured: true,
                    systemPrompt: `{\n  "vendorName": "string",\n  "invoiceTotal": "number",\n  "taxAmount": "number",\n  "dateUploaded": "ISO-8601"\n}`,
                    docOutputWebhook: "https://tentacled-goldfish.pikapod.net/webhook/bazz-doc-sync"
                }
            });
            console.log(`Created new BAZZ_DOC config.`);
        } else {
            await prisma.productConfig.update({
                where: { id: config.id },
                data: {
                    isConfigured: true,
                    docOutputWebhook: "https://tentacled-goldfish.pikapod.net/webhook/bazz-doc-sync"
                }
            });
            console.log(`Updated existing BAZZ_DOC config.`);
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
