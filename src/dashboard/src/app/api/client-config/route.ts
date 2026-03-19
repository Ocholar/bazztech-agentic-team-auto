import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

/**
 * GET /api/client-config?webhookId=XXX
 *
 * This is THE key endpoint for the multi-tenant architecture.
 * The central n8n Master Workflow calls this endpoint at the start of
 * every request, passing the unique webhookId for the incoming client channel.
 *
 * Returns the dynamic "AI Brain" for that specific client:
 *   - systemPrompt: The custom instructions defining the agent's persona.
 *   - knowledgeBase: Specific business facts, pricing, FAQs, etc.
 *   - businessName: The client's business name.
 *   - whatsapp: The client's specific Meta API connection credentials.
 */
export async function GET(req: Request) {
    try {
        const apiKey = req.headers.get('x-api-key');
        if (apiKey !== process.env.INTERNAL_API_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const webhookId = searchParams.get('webhookId');

        if (!webhookId) {
            return NextResponse.json({ error: 'webhookId is required' }, { status: 400 });
        }

        const config = await db.productConfig.findUnique({
            where: { webhookId },
            include: {
                user: { select: { name: true, companyName: true } },
                subscription: { select: { productType: true, status: true } },
            },
        });

        if (!config) {
            return NextResponse.json({ error: 'Client configuration not found.' }, { status: 404 });
        }

        // Only serve config for active subscriptions
        if (config.subscription.status !== 'ACTIVE') {
            return NextResponse.json({ error: 'Subscription is not active.' }, { status: 403 });
        }

        return NextResponse.json({
            webhookId: config.webhookId,
            product: config.subscription.productType,
            businessName: config.user.companyName || config.user.name,
            systemPrompt: config.systemPrompt || 'You are a helpful AI assistant.',
            knowledgeBase: config.knowledgeBase || '',
            whatsapp: {
                phoneId: config.whatsappPhoneId || null,
                url: config.whatsappUrl || 'https://graph.facebook.com/v17.0', // Default Meta URL
                token: config.whatsappToken || null,
            }
        });
    } catch (error) {
        console.error('[client-config] Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
