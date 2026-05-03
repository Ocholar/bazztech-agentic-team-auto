import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Upstash Redis for rate limiting
let ratelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, '1 d'),
        analytics: true,
    });
}

const DEMO_ANSWERS: Record<string, any> = {
    'downtime': {
        answer: "Root Cause Analysis — Corrugator Stoppages (Yesterday)\n\nIdentified 3 unplanned stops between 09:14–16:42. AI confidence: 94%\n\n• Stop 1 (09:14, 22 min): Splicer tension fault. Correlated to paper roll batch tension.\n• Stop 2 (13:05, 41 min): Flute temperature drop. Heating element variance detected.\n• Stop 3 (16:42, 18 min): Electrical supply fluctuation — correlated with grid brownout.\n\nRecommendation: Schedule Corrugator bearing inspection within 72h. Avoided downtime value: KES 84,000.",
        citations: [{ source: "Line 2 Sensor Logs", date: "2026-04-29" }],
        confidence: 0.94
    },
    'margin': {
        answer: "Margin Intelligence — April 2026\n\nTop 3 SKUs by gross margin:\n\n• Double Wall Kraft: 45.2%\n• Single Face E-Flute: 32.4%\n• Custom Die-Cut Box: 29.2%\n\nDouble Wall Kraft is outperforming forecast by 18%. AI suggests accelerating next week's production run based on sales pipeline.",
        citations: [{ source: "ERP Reconciler", date: "2026-04-30" }],
        confidence: 0.88,
        chart: 'bar'
    }
};

export async function POST(req: Request) {
    try {
        const session = await auth();
        const { query, sessionId } = await req.json();
        const userId = session?.user?.id;

        // Rate limiting for anonymous users
        if (!userId && ratelimit) {
            const { success } = await ratelimit.limit(sessionId || 'anonymous');
            if (!success) {
                return NextResponse.json({
                    error: 'Demo limit reached. Join 100+ manufacturers to get unlimited factory intelligence.',
                    limitReached: true
                }, { status: 429 });
            }
        }

        // If authenticated, attempt real n8n call
        if (userId && process.env.N8N_RAG_WEBHOOK_URL) {
            try {
                const response = await fetch(process.env.N8N_RAG_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query, tenantId: userId })
                });

                if (response.ok) {
                    const data = await response.json();
                    return NextResponse.json(data);
                }
            } catch (n8nError) {
                console.error('[ai-ask] n8n failed, falling back to demo logic:', n8nError);
            }
        }

        // Demo logic fallback
        const lowerQuery = query.toLowerCase();
        let result = null;

        if (lowerQuery.includes('stop') || lowerQuery.includes('downtime')) {
            result = DEMO_ANSWERS['downtime'];
        } else if (lowerQuery.includes('margin') || lowerQuery.includes('sku')) {
            result = DEMO_ANSWERS['margin'];
        } else if (lowerQuery.includes('kraft') || lowerQuery.includes('run out')) {
            result = {
                answer: "Inventory Forecast — Kraft Paper Roll\n\nCurrent stock: 4,200 tons | Daily consumption rate: 1,850 tons/day\n\nProjected depletion: Thursday 16:00 ⚠️\n\nAI Action Taken: Auto-drafted WhatsApp message to International Paper Suppliers requesting Wednesday delivery. Awaiting confirmation.",
                citations: [{ source: "Inventory Forecaster", date: "Real-time" }],
                confidence: 0.91
            };
        } else {
            result = {
                answer: "I am analyzing your factory data. For the purpose of this demo, I can answer questions about planned downtime, margin intelligence, and inventory forecasts.\n\nTry asking: 'Will we run out of Kraft paper roll before Friday?'",
                citations: [],
                confidence: 1.0
            };
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('[ai-ask] Error:', error);
        return NextResponse.json({ error: 'Failed to process AI query.' }, { status: 500 });
    }
}
