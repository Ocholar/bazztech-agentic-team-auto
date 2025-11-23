import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { type, data } = body;

        if (type === 'NEW_LEAD') {
            const lead = await db.lead.create({
                data: {
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    source: data.source,
                    status: 'NEW',
                    tags: data.tags,
                },
            });
            return NextResponse.json({ success: true, id: lead.id });
        }

        if (type === 'UPDATE_STATUS') {
            const lead = await db.lead.update({
                where: { id: data.id },
                data: { status: data.status },
            });
            return NextResponse.json({ success: true, id: lead.id });
        }

        if (type === 'SUBMISSION_RESULT') {
            await db.submission.create({
                data: {
                    leadId: data.leadId,
                    status: data.success ? 'SUCCESS' : 'FAILURE',
                    response: JSON.stringify(data.response),
                },
            });

            // Also update lead status
            await db.lead.update({
                where: { id: data.leadId },
                data: { status: data.success ? 'SUBMITTED' : 'FAILED' },
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Unknown event type' }, { status: 400 });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
