import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Fetch leads that are "PROSPECTIVE" but not yet submitted
        const qualifiedLeads = await db.lead.findMany({
            where: {
                stage: 'PROSPECTIVE',
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
        const { leadId, stage } = body;

        // Update lead stage (called manually to mark as prospective)
        const lead = await db.lead.update({
            where: { id: leadId },
            data: { stage: stage || 'PROSPECTIVE' },
        });

        return NextResponse.json({ success: true, lead });
    } catch (error) {
        console.error('Error updating lead stage:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
