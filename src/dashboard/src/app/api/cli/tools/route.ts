/**
 * GET /api/cli/tools
 * Lists all registered BazzAI tools — name, description, inputSchema, sensitive flag.
 * Protected by INTERNAL_CLI_SECRET.
 */

import { NextResponse } from 'next/server';
import { listTools } from '@/lib/tools/tool-orchestrator';

export async function GET(req: Request) {
    const cliSecret = req.headers.get('x-cli-secret');
    if (cliSecret !== process.env.INTERNAL_CLI_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ tools: listTools() });
}
