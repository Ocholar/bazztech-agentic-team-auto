/**
 * SalesAgent
 * Handles proactive lead qualification, CRM lifecycle management,
 * and high-intent sales conversations.
 */

import { BazzAgent, AgentContext, AgentResult } from './base-agent';
import { runTool } from '../tools/tool-orchestrator';

export class SalesAgent extends BazzAgent {
    readonly name = 'sales-agent';
    readonly description =
        'Proactively qualifies leads, updates CRM stages, and closes sales by coordinating with the billing agent.';

    async run(ctx: AgentContext): Promise<AgentResult> {
        await this.logEvent('SALES_START', { task: ctx.task }, ctx);

        const openaiApiKey = ctx.productConfig?.openaiApiKey;
        if (!openaiApiKey) {
            return { success: false, summary: 'OpenAI API key not configured.', error: 'MISSING_API_KEY' };
        }

        // 1. Identify Lead details via LLM classification
        let leadInfo = { phone: '', name: '', intent: 'unknown', stage: 'LEAD' };
        try {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${openaiApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        {
                            role: 'system',
                            content: `Extract lead info from the task. Stages: LEAD (general), CONTACTED (agent replied), PROSPECTIVE (asking for price/buy), SALE (ready to pay). 
                            Return JSON: { "phone": "...", "name": "...", "intent": "...", "stage": "..." }`,
                        },
                        { role: 'user', content: ctx.task },
                    ],
                    response_format: { type: 'json_object' },
                }),
            });

            const data = await res.json();
            leadInfo = JSON.parse(data.choices?.[0]?.message?.content || '{}');
        } catch (e) {
            console.error('[sales-agent] extraction error', e);
        }

        if (!leadInfo.phone) {
            return { success: false, summary: 'Could not identify a valid phone number for this lead.', error: 'PHONE_MISSING' };
        }

        // 2. Proactive Response Generation
        const responseTask = `Generate a short, persuasive WhatsApp message for this lead: ${JSON.stringify(leadInfo)}. Goal: Move to next stage.`;
        let message = 'Hello! How can we help you today?';

        try {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: { Authorization: `Bearer ${openaiApiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [{ role: 'user', content: responseTask }],
                }),
            });
            const data = await res.json();
            message = data.choices?.[0]?.message?.content || message;
        } catch (e) { }

        // 3. Dispatch WhatsApp Tool
        const result = await runTool('send-whatsapp', { to: leadInfo.phone, message }, ctx);

        if (result.success) {
            // 4. Persistence: Update CRM
            try {
                // Upsert lead
                await ctx.db.lead.upsert({
                    where: { id: `WA-${leadInfo.phone}` }, // Simple deterministic ID for demo
                    create: {
                        id: `WA-${leadInfo.phone}`,
                        userId: ctx.userId,
                        phone: leadInfo.phone,
                        name: leadInfo.name,
                        stage: (leadInfo.stage as any) || 'CONTACTED',
                        lastMessage: message,
                    },
                    update: {
                        stage: (leadInfo.stage as any) || 'CONTACTED',
                        lastMessage: message,
                        updatedAt: new Date(),
                    }
                });
            } catch (err: any) {
                console.error('[sales-agent] db error', err.message);
            }
        }

        await this.logEvent('SALES_COMPLETE', { leadInfo, result }, ctx);

        return {
            success: result.success,
            summary: result.success
                ? `Sales response sent to ${leadInfo.phone}. CRM updated to ${leadInfo.stage || 'CONTACTED'}.`
                : `Lead outreach failed: ${result.error}`,
            details: leadInfo,
        };
    }
}
