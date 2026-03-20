export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getJengaToken } from '@/lib/jenga';

/**
 * POST /api/jenga/token
 * Internal route: Gets a fresh Jenga Bearer token.
 * Protected by INTERNAL_API_KEY.
 */
export async function POST(req: Request) {
    try {
        const apiKey = req.headers.get('x-api-key');
        if (apiKey !== process.env.INTERNAL_API_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const token = await getJengaToken();
        return NextResponse.json({ success: true, token });
    } catch (error: any) {
        console.error('[jenga/token] Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
