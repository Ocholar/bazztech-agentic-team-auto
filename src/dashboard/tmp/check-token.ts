import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const configId = '90052e41-964e-44ed-831a-bc26c383dad7';

    console.log(`Checking token for config: ${configId}`);

    const config = await prisma.productConfig.findUnique({
        where: { id: configId },
        select: { whatsappToken: true }
    });

    if (config && config.whatsappToken) {
        const token = config.whatsappToken;
        console.log(`Token Length: ${token.length}`);
        console.log(`Token Start: ${token.substring(0, 10)}...`);
        console.log(`Token End: ...${token.substring(token.length - 5)}`);

        if (token.includes('\n') || token.includes('\r')) {
            console.warn('WARNING: Token contains newlines!');
        }
        if (token.startsWith('"') || token.endsWith('"')) {
            console.warn('WARNING: Token is enclosed in quotes!');
        }
    } else {
        console.error('Token not found or empty');
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
