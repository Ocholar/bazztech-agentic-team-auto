/**
 * BazzAI HITL — Sensitive Tool Registry
 * Any tool whose name appears here will be intercepted by the HITL gate
 * before its execute() method is called.
 */

export const SENSITIVE_TOOL_IDS: ReadonlySet<string> = new Set([
    'jenga-poll',
    'check-mpesa-balance',
]);

export function isSensitiveTool(toolName: string): boolean {
    return SENSITIVE_TOOL_IDS.has(toolName);
}
