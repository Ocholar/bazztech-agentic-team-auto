const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DIRECT_URL
        }
    }
});
async function fix() {
    console.log('Fixing orphaned product configs using DIRECT_URL...');
    const res = await prisma.productConfig.updateMany({
        where: { productType: null },
        data: { productType: 'BAZZ_CONNECT' }
    });
    console.log('Fixed count: ', res.count);
}
fix()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
