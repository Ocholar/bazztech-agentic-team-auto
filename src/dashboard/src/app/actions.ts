'use server';

import { db } from '@/lib/db';

export async function getDashboardStats() {
    const totalLeads = await db.lead.count();
    const prospectiveLeads = await db.lead.count({ where: { stage: 'PROSPECTIVE' } });
    const salesLeads = await db.lead.count({ where: { stage: 'SALE' } });
    const grossAdds = await db.analytics.aggregate({
        where: { metric: 'gross_adds' },
        _sum: { value: true },
    });

    return {
        totalLeads,
        qualifiedLeads: prospectiveLeads,
        submittedLeads: salesLeads,
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
