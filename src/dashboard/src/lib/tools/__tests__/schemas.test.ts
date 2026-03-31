import { describe, it, expect } from 'vitest';
import { getTool, listTools } from '../tool-orchestrator';
import { JengaPollInput } from '../jenga-poll.tool';

describe('BazzAI Tool Registry & Schemas', () => {
    it('should register all expected tools', () => {
        const tools = listTools();
        const names = tools.map((t) => t.name);

        expect(names).toContain('jenga-poll');
        expect(names).toContain('send-whatsapp');
        expect(names).toContain('check-mpesa-balance');
        expect(names).toContain('process-invoice-vision');
    });

    it('should correctly flag sensitive tools', () => {
        const jenga = getTool('jenga-poll');
        const whatsapp = getTool('send-whatsapp');

        expect(jenga?.sensitive).toBe(true);
        expect(whatsapp?.sensitive).toBe(false);
    });

    it('should validate JengaPollInput dates', () => {
        // Valid partial
        expect(JengaPollInput.safeParse({ fromDate: '2026-03-01' }).success).toBe(true);

        // Invalid types
        expect(JengaPollInput.safeParse({ fromDate: 12345 }).success).toBe(false);
    });
});
