/**
 * GET /api/cli/monitor
 * Server-Sent Events (SSE) stream of AuditLog events scoped to the authenticated tenant.
 * Polls the DB every 5 seconds and pushes new events to the CLI monitor command.
 *
 * Protected by INTERNAL_CLI_SECRET + x-user-id headers.
 */

import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request) {
    const cliSecret = req.headers.get('x-cli-secret');
    if (cliSecret !== process.env.INTERNAL_CLI_SECRET) {
        return new Response('Unauthorized', { status: 401 });
    }

    const userId = req.headers.get('x-user-id');
    if (!userId) {
        return new Response('Missing x-user-id header', { status: 400 });
    }

    let lastSeenId: string | null = null;

    // Seed with the most recent event (so we don't replay history on connect)
    const latestEvent = await db.auditLog.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: { id: true },
    });
    lastSeenId = latestEvent?.id ?? null;

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            const send = (data: string) => {
                controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            };

            // Send initial connected event
            send(JSON.stringify({ event: 'CONNECTED', userId, timestamp: new Date().toISOString() }));

            const POLL_INTERVAL_MS = 5000;
            let closed = false;

            req.signal.addEventListener('abort', () => {
                closed = true;
                controller.close();
            });

            while (!closed) {
                await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
                if (closed) break;

                try {
                    const newEvents = await db.auditLog.findMany({
                        where: {
                            userId,
                            ...(lastSeenId ? { id: { gt: lastSeenId } } : {}),
                        },
                        orderBy: { createdAt: 'asc' },
                        take: 20,
                    });

                    for (const ev of newEvents) {
                        send(
                            JSON.stringify({
                                id: ev.id,
                                event: ev.event,
                                toolName: ev.toolName ?? undefined,
                                pendingApproval: ev.pendingApproval,
                                detail: ev.detail,
                                createdAt: ev.createdAt.toISOString(),
                            })
                        );
                        lastSeenId = ev.id;
                    }
                } catch {
                    // DB connection blip — keep polling
                }
            }
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
            'X-Accel-Buffering': 'no',
        },
    });
}
