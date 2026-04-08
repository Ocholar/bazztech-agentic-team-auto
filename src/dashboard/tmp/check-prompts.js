const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const userId = '9ebd9542-77b7-4974-8a58-6d8dbed1e577';
    try {
        const connect = await prisma.productConfig.findFirst({
            where: { userId, productType: 'BAZZ_CONNECT' }
        });
        console.log("=== BAZZ_CONNECT ===");
        console.log(connect?.systemPrompt);

        const lead = await prisma.productConfig.findFirst({
            where: { userId, productType: 'BAZZ_LEAD' }
        });
        console.log("=== BAZZ_LEAD ===");
        console.log(lead?.systemPrompt);

    } catch (e) { console.error(e); }
    finally { await prisma.$disconnect(); }
}
check();
