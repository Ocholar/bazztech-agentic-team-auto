import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const configId = '90052e41-964e-44ed-831a-bc26c383dad7';

    console.log(`Updating config: ${configId}`);

    await prisma.productConfig.update({
        where: { id: configId },
        data: { webhookId: 'bazz-connect-master' }
    });

    console.log('Successfully updated webhookId to bazz-connect-master');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
