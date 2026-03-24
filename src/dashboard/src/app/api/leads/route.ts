export const dynamic = 'force-dynamic';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

/**
 * GET /api/leads?stage=LEAD&limit=20
 *
 * This endpoint is used by the Autonomous Sales Agent (n8n workflow)
 * to fetch a list of leads that need to be contacted.
 * It is protected by a simple API key (in a real app, use a strong shared secret).
 */
export async function GET(req: Request) {
    try {
        const apiKey = req.headers.get('x-api-key');
        if (apiKey !== process.env.INTERNAL_API_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const stage = searchParams.get('stage') || 'LEAD';
        const limit = parseInt(searchParams.get('limit') || '20', 10);

        // Ensure stage is a valid enum value to prevent malicious queries
        const validStages = ['LEAD', 'CONTACTED', 'PROSPECTIVE', 'SALE'];
        if (!validStages.includes(stage)) {
            return NextResponse.json({ error: 'Invalid stage parameter.' }, { status: 400 });
        }

        const leads = await db.lead.findMany({
            where: {
                stage: stage as any, // Cast to any to satisfy Prisma enum matching
            },
            take: limit,
            orderBy: {
                createdAt: 'asc', // Process oldest uncontacted leads first
            },
        });

        return NextResponse.json(leads);

    } catch (error) {
        console.error('[leads-api] GET Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
