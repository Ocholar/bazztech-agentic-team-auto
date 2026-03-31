/**
 * BazzAgent — Abstract Base Class
 * All specialized agents (BillingAgent, LeadQualifyingAgent, etc.) 
 * must extend this class.
 */

import { ToolContext } from '../tools/types';

export interface AgentResult {
    success: boolean;
    summary: string;
    details?: unknown;
    error?: string;
}

export interface AgentContext extends ToolContext {
    /** Free-text task description for the agent to execute */
    task: string;
}

export abstract class BazzAgent {
    abstract readonly name: string;
    abstract readonly description: string;

    /** 
     * Execute the agent's logic for a given task.
     * All agents must implement tenant-scoped access via ctx.userId.
     */
    abstract run(ctx: AgentContext): Promise<AgentResult>;

    /** Helper: create a structured audit log entry scoped to this agent's run */
    protected async logEvent(
        event: string,
        detail: unknown,
        ctx: ToolContext
    ): Promise<void> {
        await ctx.db.auditLog.create({
            data: {
                event,
                userId: ctx.userId,
                toolName: this.name,
                detail: typeof detail === 'string' ? detail : JSON.stringify(detail),
            },
        });
    }
}
