import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * PRODUCTION DEBUG ENDPOINT
 * Allows viewing recent audit logs and errors to debug webhook forwarding.
 */
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    if (key !== process.env.INTERNAL_API_KEY) {
        return new Response('Unauthorized', { status: 401 });
    }

    // Fetch the 50 most recent logs/audit events
    const logs = await db.auditLog.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { email: true } } }
    });

    return NextResponse.json(logs);
}
