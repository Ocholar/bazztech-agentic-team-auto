import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { name, email, company, date, useCase } = await request.json();

        if (!email || !date || !name) {
            return NextResponse.json({ error: 'Name, Email, and Date are required' }, { status: 400 });
        }

        console.log(`[Booking Intent] ${name} (${email}) for slot ${date}`);

        // Trigger n8n Booking Workflow
        const N8N_BOOKING_WEBHOOK = process.env.N8N_BOOKING_WEBHOOK;

        if (N8N_BOOKING_WEBHOOK) {
            try {
                await fetch(N8N_BOOKING_WEBHOOK, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        email,
                        company: company || 'Not Provided',
                        date,
                        useCase: useCase || 'Enterprise AI Audit',
                        source: 'bazzai_native_booking',
                        timestamp: new Date().toISOString()
                    })
                });
            } catch (fetchError) {
                console.error('n8n booking webhook trigger failed:', fetchError);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Booking confirmed. A calendar invitation has been sent.'
        });
    } catch (error) {
        console.error('Booking capture error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
