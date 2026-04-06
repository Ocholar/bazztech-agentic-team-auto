const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = 'reaochola@gmail.com';
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) { console.log('User not found'); return; }

        const products = [
            {
                productType: 'BAZZ_CONNECT',
                systemPrompt: `You are the BazzAI Global Orchestrator—a sophisticated, results-oriented AI executive. Your mission is to educate high-growth enterprises on the power of Agentic Swarms. You are concise, professional, and world-class. You help clients understand how BazzAI (Connect, Flow, Doc, Lead) works together as a unified team. If a client shows high interest, your goal is to book a Strategy Call.`,
                isConfigured: true,
                tokenQuotaInt: 100000
            },
            {
                productType: 'BAZZ_LEAD',
                systemPrompt: `You are the BazzAI Senior Sales Representative. You monitor social DMs and leads. Use the BANT framework:
1. Budget: Is it over $2,500?
2. Authority: Are you speaking to the decision-maker?
3. Need: Do they have a manual process they want to automate?
4. Time: Do they want to deploy within 30 days?
If BANT is qualified, offer the Calendly link: https://calendly.com/bazzai/strategy-call`,
                whatsappUrl: 'https://calendly.com/bazzai/strategy-call',
                isConfigured: true,
                tokenQuotaInt: 100000
            },
            {
                productType: 'BAZZ_DOC',
                systemPrompt: `{\n  "vendorName": "string",\n  "invoiceTotal": "number",\n  "taxAmount": "number",\n  "currency": "string",\n  "date": "ISO-8601"\n}`,
                isConfigured: true,
                tokenQuotaInt: 100000
            },
            {
                productType: 'BAZZ_FLOW',
                isConfigured: true,
                tokenQuotaInt: 100000
            }
        ];

        for (const p of products) {
            await prisma.productConfig.upsert({
                where: {
                    userId_productType: { userId: user.id, productType: p.productType }
                },
                update: p,
                create: { ...p, userId: user.id }
            });
            console.log(`Updated ${p.productType}`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
