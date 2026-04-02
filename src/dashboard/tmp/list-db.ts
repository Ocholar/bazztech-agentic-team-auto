import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany({
        select: { id: true, email: true }
    });
    console.log('Users found:', JSON.stringify(users, null, 2));

    const configs = await prisma.productConfig.findMany({
        select: { id: true, userId: true, productType: true, webhookId: true }
    });
    console.log('Configs found:', JSON.stringify(configs, null, 2));
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
