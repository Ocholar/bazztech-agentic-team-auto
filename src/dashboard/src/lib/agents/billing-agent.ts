/**
 * BillingAgent
 * Handles all payment, subscription, and financial reconciliation tasks
 * for a specific tenant. Has access to JengaPollTool and CheckMpesaBalanceTool.
 */

import { BazzAgent, AgentContext, AgentResult } from './base-agent';
import { runTool } from '../tools/tool-orchestrator';

export class BillingAgent extends BazzAgent {
    readonly name = 'billing-agent';
    readonly description =
        'Handles payment reconciliation, subscription activation, and M-Pesa balance queries for a tenant.';

    private readonly BILLING_TOOLS = ['jenga-poll', 'check-mpesa-balance'];

    async run(ctx: AgentContext): Promise<AgentResult> {
        await this.logEvent('BILLING_AGENT_START', { task: ctx.task }, ctx);

        // Determine which tool to call based on the task string (simple keyword routing)
        const task = ctx.task.toLowerCase();

        if (task.includes('mpesa') || task.includes('balance') || task.includes('daraja')) {
            const result = await runTool('check-mpesa-balance', {}, ctx);
            await this.logEvent('BILLING_AGENT_COMPLETE', result, ctx);
            return {
                success: result.success,
                summary: result.pendingApproval
                    ? `M-Pesa balance check paused — awaiting HITL approval (${result.auditLogId})`
                    : result.success
                        ? `M-Pesa balance retrieved successfully.`
                        : `M-Pesa balance check failed: ${result.error}`,
                details: result.data ?? { auditLogId: result.auditLogId },
                error: result.error,
            };
        }

        if (task.includes('payment') || task.includes('jenga') || task.includes('equity') || task.includes('poll')) {
            const result = await runTool('jenga-poll', {}, ctx);
            await this.logEvent('BILLING_AGENT_COMPLETE', result, ctx);
            return {
                success: result.success,
                summary: result.pendingApproval
                    ? `Jenga poll paused — awaiting HITL approval (${result.auditLogId})`
                    : result.success
                        ? `Payment poll complete: ${(result.data as any)?.matched ?? 0} subscription(s) activated.`
                        : `Jenga poll failed: ${result.error}`,
                details: result.data ?? { auditLogId: result.auditLogId },
                error: result.error,
            };
        }

        await this.logEvent('BILLING_AGENT_UNRECOGNISED', { task: ctx.task }, ctx);
        return {
            success: false,
            summary: `BillingAgent could not match task to a billing tool. Available tools: ${this.BILLING_TOOLS.join(', ')}`,
            error: 'Unrecognised billing task.',
        };
    }
}
