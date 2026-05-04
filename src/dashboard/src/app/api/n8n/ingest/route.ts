import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;
        const userId = session.user.id;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        if (!process.env.N8N_INGEST_WEBHOOK_URL) {
            return NextResponse.json({ error: 'Ingestion backend not configured' }, { status: 503 });
        }

        // Convert file to buffer to send to n8n
        const buffer = Buffer.from(await file.arrayBuffer());

        const n8nFormData = new FormData();
        n8nFormData.append('file', new Blob([buffer]), file.name);
        n8nFormData.append('tenantId', userId as string);

        const response = await fetch(process.env.N8N_INGEST_WEBHOOK_URL, {
            method: 'POST',
            body: n8nFormData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[ingest] n8n error:', errorText);
            throw new Error('Failed to forward data to ingestion engine');
        }

        return NextResponse.json({ success: true, message: 'Data queued for ingestion' });
    } catch (error) {
        console.error('[ingest] Error:', error);
        return NextResponse.json({ error: 'Failed to process ingestion request.' }, { status: 500 });
    }
}
