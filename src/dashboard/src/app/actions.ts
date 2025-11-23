'use server';

import { db } from '@/lib/db';

export async function getDashboardStats() {
    const totalLeads = await db.lead.count();
    const qualifiedLeads = await db.lead.count({ where: { status: 'QUALIFIED' } });
    const submittedLeads = await db.lead.count({ where: { status: 'SUBMITTED' } });
    const grossAdds = await db.analytics.aggregate({
        where: { metric: 'gross_adds' },
        _sum: { value: true },
    });

    return {
        totalLeads,
        qualifiedLeads,
        submittedLeads,
        grossAdds: grossAdds._sum.value || 0,
    };
}

export async function getRecentLeads() {
    return await db.lead.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
    });
}

export async function getAnalyticsHistory() {
    const history = await db.analytics.findMany({
        where: { metric: 'gross_adds' },
        orderBy: { date: 'asc' },
        take: 30,
    });

    // Format dates for chart
    return history.map(h => ({
        date: h.date.toISOString().split('T')[0],
        value: h.value
    }));
}

export async function getSubmissions() {
    return await db.submission.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
        include: {
            lead: {
                select: { name: true, phone: true }
            }
        }
    });
}

export async function getConfig() {
    const config = await db.config.findMany();
    return config.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);
}

export async function updateConfig(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());

    for (const [key, value] of Object.entries(rawData)) {
        if (typeof value === 'string') {
            await db.config.upsert({
                where: { key },
                update: { value },
                create: { key, value },
            });
        }
    }

    return { success: true };
}
