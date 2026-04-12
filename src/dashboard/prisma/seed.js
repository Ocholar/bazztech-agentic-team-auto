const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding data...');

    // 1. Currency & Pricing
    await prisma.pricingFigure.deleteMany();
    await prisma.exchangeRate.deleteMany();

    await prisma.exchangeRate.create({
        data: {
            fromCurrency: 'USD',
            toCurrency: 'KES',
            rate: 100.0000, // Fixed subsidy rate
            effectiveDate: new Date(),
        }
    });

    await prisma.pricingFigure.createMany({
        data: [
            { featureId: 'starter_plan', usdAmount: 5000, description: 'Starter AI Transformation (Single Workflow)' },
            { featureId: 'growth_plan', usdAmount: 25000, description: 'Growth AI Suite (Cross-Departmental)' },
            { featureId: 'enterprise_plan', usdAmount: 75000, description: 'Enterprise AI Ecosystem (Fully Autonomous)' },
        ]
    });

    // 2. Insurance & HITL
    await prisma.complianceAuditLog.deleteMany();
    await prisma.hITLGuarantee.deleteMany();
    await prisma.insurancePolicy.deleteMany();

    await prisma.insurancePolicy.create({
        data: {
            policyName: 'AI Errors & Omissions Insurance',
            provider: 'Global Tech Assurance Co.',
            policyNumber: 'EO-2024-88392-BZ',
            coverageAmount: 5000000,
            coverageType: 'Professional Indemnity / AI Liability',
            effectiveDate: new Date('2024-01-01'),
            expiryDate: new Date('2025-12-31'),
            certificateUrl: '/docs/insurance-certificate.pdf',
            verified: true,
            verifiedAt: new Date()
        }
    });

    await prisma.hITLGuarantee.createMany({
        data: [
            {
                agentLevel: 2,
                guaranteeText: 'Humans-in-the-Loop review and approve all Level 2 agent actions before execution.',
                humanApprovalRequired: true
            },
            {
                agentLevel: 3,
                guaranteeText: 'Supervised agents where humans remain the final authority and can override AI decisions in real-time.',
                humanApprovalRequired: true
            }
        ]
    });

    // 3. User & Leas (matching current schema)
    await prisma.lead.deleteMany();
    await prisma.user.deleteMany();

    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@bazztech.co.ke',
            name: 'BazzAI Admin',
            role: 'ADMIN',
            companyName: 'Bazztech Solutions',
            currencyPreferred: 'USD'
        }
    });

    const clientUser = await prisma.user.create({
        data: {
            email: 'reagan@bazztech.co.ke',
            name: 'Reagan',
            role: 'CLIENT',
            companyName: 'Acme Corp',
            currencyPreferred: 'KES'
        }
    });

    await prisma.lead.createMany({
        data: [
            {
                userId: clientUser.id,
                name: 'John Doe',
                phone: '254712345678',
                email: 'john@example.com',
                source: 'LinkedIn',
                stage: 'PROSPECTIVE',
                lastMessage: 'Interested in the $100k manufacturing solution.'
            },
            {
                userId: clientUser.id,
                name: 'Jane Smith',
                phone: '254723456789',
                source: 'WhatsApp',
                stage: 'LEAD',
                lastMessage: 'Need a demo for the Bazz-Flow integration.'
            }
        ]
    });

    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
