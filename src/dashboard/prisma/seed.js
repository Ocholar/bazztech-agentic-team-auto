const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.submission.deleteMany();
    await prisma.lead.deleteMany();
    await prisma.analytics.deleteMany();
    await prisma.config.deleteMany();

    console.log('Seeding data...');

    // Seed Leads
    const lead1 = await prisma.lead.create({
        data: {
            name: 'John Doe',
            phone: '254712345678',
            email: 'john@example.com',
            source: 'LinkedIn',
            status: 'QUALIFIED',
            tags: 'high_value',
        },
    });

    const lead2 = await prisma.lead.create({
        data: {
            name: 'Jane Smith',
            phone: '254723456789',
            source: 'WhatsApp',
            status: 'NEW',
            tags: 'high_volume',
        },
    });

    const lead3 = await prisma.lead.create({
        data: {
            name: 'Alice Johnson',
            phone: '254734567890',
            email: 'alice@business.com',
            source: 'Google Maps',
            status: 'SUBMITTED',
            tags: 'high_value',
        },
    });

    // Seed Submissions
    await prisma.submission.create({
        data: {
            leadId: lead3.id,
            status: 'SUCCESS',
            response: '{"id": "123", "message": "Form submitted successfully"}',
        },
    });

    // Seed Analytics
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        await prisma.analytics.create({
            data: {
                date: date,
                metric: 'gross_adds',
                value: Math.floor(Math.random() * 5),
            },
        });

        await prisma.analytics.create({
            data: {
                date: date,
                metric: 'leads',
                value: Math.floor(Math.random() * 20) + 10,
            },
        });
    }

    // Seed Config
    await prisma.config.create({
        data: {
            key: 'lead_gen_allocation_high_value',
            value: '60',
        },
    });

    await prisma.config.create({
        data: {
            key: 'upsell_30mbps_priority',
            value: 'true',
        },
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
