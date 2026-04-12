import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { email, type, metadata } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Potential DB storage (optional for now, as n8n handles the state)
        // db.lead.create(...)

        console.log(`[Lead Capture] Type: ${type}, Email: ${email}`, metadata);

        // n8n trigger URL (would be in .env)
        const N8N_LEAD_WEBHOOK = process.env.N8N_LEAD_WEBHOOK;

        if (N8N_LEAD_WEBHOOK) {
            try {
                await fetch(N8N_LEAD_WEBHOOK, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email,
                        type,
                        metadata,
                        source: 'bazztech_enterprise_portal',
                        timestamp: new Date().toISOString()
                    })
                });
            } catch (fetchError) {
                console.error('n8n webhook trigger failed:', fetchError);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Lead captured successfully. Our team will reach out.'
        });
    } catch (error) {
        console.error('Lead capture error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
