import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Fetch leads that are "QUALIFIED" but not yet submitted
        const qualifiedLeads = await db.lead.findMany({
            where: {
                status: 'QUALIFIED',
            },
            orderBy: {
                createdAt: 'asc',
            },
            take: 10, // Process max 10 leads per batch
        });

        return NextResponse.json({
            success: true,
            count: qualifiedLeads.length,
            leads: qualifiedLeads
        });
    } catch (error) {
        console.error('Error fetching qualified leads:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { leadId, status } = body;

        // Update lead status (called manually to mark as qualified)
        const lead = await db.lead.update({
            where: { id: leadId },
            data: { status: status || 'QUALIFIED' },
        });

        return NextResponse.json({ success: true, lead });
    } catch (error) {
        console.error('Error updating lead status:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
