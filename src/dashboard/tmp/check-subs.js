const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const email = 'reaochola@gmail.com';
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: { subscriptions: true }
        });
        console.log(JSON.stringify(user, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
