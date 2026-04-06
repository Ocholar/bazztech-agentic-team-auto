const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    try {
        const user = await prisma.user.findUnique({ where: { email: 'reaochola@gmail.com' } });
        if (!user) {
            console.log('User not found');
            return;
        }
        const configs = await prisma.productConfig.findMany({ where: { userId: user.id } });
        console.log(JSON.stringify(configs, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
