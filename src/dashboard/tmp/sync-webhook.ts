import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const userId = '8ebd8542-77b7-4874-8a58-6d8edadfe572'; // Extracted from error msg whk_pending_ID_...

    console.log(`Syncing Webhook ID for user: ${userId}`);

    const config = await prisma.productConfig.findFirst({
        where: { userId, productType: 'BAZZ_CONNECT' }
    });

    if (config) {
        await prisma.productConfig.update({
            where: { id: config.id },
            data: { webhookId: 'bazz-connect-master' }
        });
        console.log('Successfully updated BAZZ_CONNECT webhookId to bazz-connect-master');
    } else {
        console.error('Config not found for user');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
