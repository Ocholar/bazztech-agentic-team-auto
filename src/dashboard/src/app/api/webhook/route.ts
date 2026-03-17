import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

/**
 * POST /api/webhook
 *
 * Central webhook called by n8n workflows to update lead/CRM data.
 * Supports three event types:
 *   - NEW_LEAD:     Create a new lead in the CRM.
 *   - UPDATE_STAGE: Progress a lead through the funnel (LEAD -> SALE).
 */
export async function POST(req: Request) {
    try {
        const apiKey = req.headers.get('x-api-key');
        if (apiKey !== process.env.INTERNAL_API_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { type, data } = body;

        if (type === 'NEW_LEAD') {
            // Find the client's userId via the webhookId so leads are attributed correctly
            const config = await db.productConfig.findUnique({
                where: { webhookId: data.webhookId },
                select: { userId: true },
            });

            if (!config) {
                return NextResponse.json({ error: 'Invalid webhookId' }, { status: 404 });
            }

            const lead = await db.lead.create({
                data: {
                    userId: config.userId,
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    source: data.source || 'WhatsApp',
                    stage: 'LEAD',
                    lastMessage: data.lastMessage,
                },
            });
            return NextResponse.json({ success: true, leadId: lead.id });
        }

        if (type === 'UPDATE_STAGE') {
            // Valid stages defined in the Prisma schema: LEAD, CONTACTED, PROSPECTIVE, SALE
            const allowedStages = ['LEAD', 'CONTACTED', 'PROSPECTIVE', 'SALE'];
            if (!allowedStages.includes(data.stage)) {
                return NextResponse.json({ error: `Invalid stage: ${data.stage}` }, { status: 400 });
            }

            const lead = await db.lead.update({
                where: { id: data.leadId },
                data: {
                    stage: data.stage,
                    lastMessage: data.lastMessage,
                },
            });
            return NextResponse.json({ success: true, leadId: lead.id, newStage: lead.stage });
        }

        return NextResponse.json({ error: 'Unknown event type. Use NEW_LEAD or UPDATE_STAGE.' }, { status: 400 });

    } catch (error) {
        console.error('[webhook] Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
