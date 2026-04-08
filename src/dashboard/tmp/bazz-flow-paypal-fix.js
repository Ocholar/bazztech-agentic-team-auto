const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const userId = '9ebd9542-77b7-4974-8a58-6d8dbed1e577';
    const clientId = 'Ac1ZXZUytxqiE15uumtd8G9Cbjh1dMmcyq9Nq71gIi06QlXq4TwxsIomIPV1qhgfCjw5o4909OQfz9Xn';
    const clientSecret = 'EAox3Xk_Wg_DSl1FR-H5S_6d_KfERq-8lzjVTvfSWkGuOV75QL0_2CXivE5v6eGEt5x0V30uVKq4V5md';
    const erpWebhook = 'https://tentacled-goldfish.pikapod.net/webhook/bazz-flow-paypal';

    try {
        let sub = await prisma.subscription.findFirst({
            where: { userId: userId, productType: 'BAZZ_FLOW' }
        });

        if (!sub) {
            sub = await prisma.subscription.create({
                data: {
                    userId: userId,
                    productType: 'BAZZ_FLOW',
                    status: 'ACTIVE',
                    businessSizeTier: 'MEDIUM',
                    oneTimeFee: 4999,
                    paymentReference: 'ADMIN-MASTER-FLOW',
                }
            });
            console.log(`Created MASTER subscription for BAZZ_FLOW.`);
        } else if (sub.status !== 'ACTIVE') {
            await prisma.subscription.update({
                where: { id: sub.id },
                data: { status: 'ACTIVE' }
            });
            console.log(`Activated existing BAZZ_FLOW subscription.`);
        }

        const config = await prisma.productConfig.findFirst({
            where: { userId: userId, productType: 'BAZZ_FLOW' }
        });

        if (config) {
            await prisma.productConfig.update({
                where: { id: config.id },
                data: {
                    darajaConsumerKey: clientId,
                    darajaConsumerSecret: clientSecret,
                    darajaShortcode: 'PayPal',
                    erpWebhookUrl: erpWebhook,
                    isConfigured: true
                }
            });
            console.log(`Updated existing BAZZ_FLOW config with PayPal credentials.`);
        } else {
            await prisma.productConfig.create({
                data: {
                    userId: userId,
                    subscriptionId: sub.id,
                    productType: 'BAZZ_FLOW',
                    darajaConsumerKey: clientId,
                    darajaConsumerSecret: clientSecret,
                    darajaShortcode: 'PayPal',
                    erpWebhookUrl: erpWebhook,
                    isConfigured: true,
                    systemPrompt: 'You are Bazz-Flow, the financial reconciliation engine.',
                }
            });
            console.log(`Created new BAZZ_FLOW config with PayPal credentials.`);
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
