import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const date = new Date();

        // Store scalar metrics
        const metrics = [
            'totalLeads',
            'newLeads',
            'qualifiedLeads',
            'submittedLeads',
            'conversionRate'
        ];

        for (const metric of metrics) {
            if (typeof body[metric] === 'number') {
                await db.analytics.create({
                    data: {
                        metric: metric,
                        value: body[metric],
                        date: date
                    }
                });
            }
        }

        // Store breakdown metrics if possible (flattened)
        // For now, we just store the main KPIs to avoid schema changes

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Analytics error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
