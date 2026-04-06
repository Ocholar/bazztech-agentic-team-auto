const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = 'reaochola@gmail.com';
    const sheetId = '1d_lRrjDphnYOKnoH508ytD6FP7F7AU1hq8rEsItKJ3g';
    const webhookUrl = 'https://tentacled-goldfish.pikapod.net/webhook/bazz-lead-sync';

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) { console.log('User not found'); return; }

        // Update the CRM Sync URL for Bazz-Lead
        // We look for the ProductConfig of type BAZZ_LEAD
        // Note: The UI shows it as "CRM Pipeline Sync URL" which maps to 'webhookUrl' or similar field in Config.
        // Let's check the schema again to be sure where it stores it.
        // In the previous steps, we saw Bazz-Lead page uses `config.webhookUrl` for the CRM sync.

        await prisma.productConfig.updateMany({
            where: { userId: user.id, productType: 'BAZZ_LEAD' },
            data: {
                webhookUrl: webhookUrl,
                isConfigured: true
            }
        });

        console.log(`Successfully synced Bazz-Lead to n8n webhook: ${webhookUrl}`);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
