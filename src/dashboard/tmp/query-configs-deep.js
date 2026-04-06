const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = 'reaochola@gmail.com';
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) { console.log('User not found'); return; }

        const configs = await prisma.productConfig.findMany({
            where: { userId: user.id }
        });
        console.log(`Found ${configs.length} configs for user.`);
        console.log(JSON.stringify(configs, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
