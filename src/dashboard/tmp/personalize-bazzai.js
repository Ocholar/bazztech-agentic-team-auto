const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = 'reaochola@gmail.com';
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) { console.log('User not found'); return; }

        const productTypes = ['BAZZ_CONNECT', 'BAZZ_FLOW', 'BAZZ_DOC', 'BAZZ_LEAD'];

        for (const pt of productTypes) {
            // 1. Ensure Subscription exists
            const sub = await prisma.subscription.upsert({
                where: {
                    userId_productType: { userId: user.id, productType: pt }
                },
                update: { status: 'ACTIVE' },
                create: {
                    userId: user.id,
                    productType: pt,
                    status: 'ACTIVE',
                    oneTimeFee: 0,
                    monthlyFee: 0
                }
            });

            // 2. Define personalized config
            let configData = {
                subscriptionId: sub.id,
                isConfigured: true,
                tokenQuotaInt: 100000
            };

            if (pt === 'BAZZ_CONNECT') {
                configData.systemPrompt = "You are the BazzAI Global Orchestrator—a sophisticated, results-oriented AI executive. Your mission is to educate high-growth enterprises on the power of Agentic Swarms. You are concise, professional, and world-class. You help clients understand how BazzAI (Connect, Flow, Doc, Lead) works together as a unified team. If a client shows high interest, your goal is to book a Strategy Call.";
            } else if (pt === 'BAZZ_LEAD') {
                configData.systemPrompt = "You are the BazzAI Senior Sales Representative. You monitor social DMs and leads. Use the BANT framework:\n1. Budget: Is it over $2,500?\n2. Authority: Are you speaking to the decision-maker?\n3. Need: Do they have a manual process they want to automate?\n4. Time: Do they want to deploy within 30 days?\nIf BANT is qualified, offer the Calendly link: https://calendly.com/bazzai/strategy-call";
                configData.whatsappUrl = "https://calendly.com/bazzai/strategy-call";
            } else if (pt === 'BAZZ_DOC') {
                configData.systemPrompt = '{\n  "vendorName": "string",\n  "invoiceTotal": "number",\n  "taxAmount": "number",\n  "currency": "string",\n  "date": "ISO-8601"\n}';
            }

            // 3. Upsert ProductConfig
            await prisma.productConfig.upsert({
                where: { subscriptionId: sub.id },
                update: configData,
                create: { ...configData, userId: user.id, productType: pt }
            });

            console.log(`Successfully personalized ${pt}`);
        }
    } catch (e) {
        console.error('Error during personalization:', e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
