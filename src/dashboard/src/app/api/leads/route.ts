import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const allLeads = await db.lead.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 50,
        });

        return NextResponse.json({
            success: true,
            count: allLeads.length,
            leads: allLeads
        });
    } catch (error) {
        console.error('Error fetching leads:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
