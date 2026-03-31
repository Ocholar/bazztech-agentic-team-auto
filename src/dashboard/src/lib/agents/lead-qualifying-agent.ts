/**
 * LeadQualifyingAgent
 * Handles lead outreach and qualification tasks.
 * Has access to SendWhatsAppTool.
 */

import { BazzAgent, AgentContext, AgentResult } from './base-agent';
import { runTool } from '../tools/tool-orchestrator';

export class LeadQualifyingAgent extends BazzAgent {
    readonly name = 'lead-qualifying-agent';
    readonly description =
        'Sends WhatsApp follow-ups, qualifies leads, and updates lead stage in the CRM.';

    async run(ctx: AgentContext): Promise<AgentResult> {
        await this.logEvent('LEAD_AGENT_START', { task: ctx.task }, ctx);

        // Parse phone and message from task (basic extraction — production would use LLM)
        const phoneMatch = ctx.task.match(/(\+?254\d{9}|\d{10,12})/);
        const phone = phoneMatch?.[1] ?? '';

        if (!phone) {
            return {
                success: false,
                summary: 'LeadQualifyingAgent could not extract a phone number from the task.',
                error: 'No phone number found in task description.',
            };
        }

        // Extract message from task or use a default follow-up template
        const message =
            ctx.task.includes('message:')
                ? ctx.task.split('message:')[1].trim()
                : 'Hello! Following up on behalf of our team. How can we assist you today?';

        const result = await runTool('send-whatsapp', { to: phone, message }, ctx);

        if (result.success) {
            // Update lead stage to CONTACTED
            try {
                await ctx.db.lead.updateMany({
                    where: { userId: ctx.userId, phone },
                    data: { stage: 'CONTACTED', lastMessage: message, updatedAt: new Date() },
                });
            } catch {
                // Non-fatal: lead may not exist yet
            }
        }

        await this.logEvent('LEAD_AGENT_COMPLETE', result, ctx);

        return {
            success: result.success,
            summary: result.success
                ? `Lead outreach sent to ${phone}. Lead stage updated to CONTACTED.`
                : `Failed to send WhatsApp to ${phone}: ${result.error}`,
            details: result.data,
            error: result.error,
        };
    }
}
