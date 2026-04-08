const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const userId = '9ebd9542-77b7-4974-8a58-6d8dbed1e577';
    try {
        const sub = await prisma.subscription.findFirst({
            where: { userId, productType: 'BAZZ_FLOW' }
        });

        const config = await prisma.productConfig.findFirst({
            where: { userId, productType: 'BAZZ_FLOW' }
        });

        const isAdmin = true;
        const isActive = isAdmin || sub?.status === 'ACTIVE';
        const amount = sub?.oneTimeFee || 4999;

        console.log("sub:", sub);
        console.log("config:", config);
        console.log("amount:", amount);

        const testStr = amount.toLocaleString();
        console.log("testStr:", testStr);

    } catch (e) {
        console.error("error:", e);
    } finally {
        await prisma.$disconnect()
    }
}
check();
