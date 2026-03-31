import { describe, it, expect, vi } from 'vitest';
import { requireApproval } from '../hitl-gate';
import { ToolContext } from '../../tools/types';

describe('HITL Gate', () => {
    it('should create an AuditLog record and return pending status', async () => {
        const mockDb = {
            auditLog: {
                create: vi.fn().mockResolvedValue({ id: 'log-123' }),
            },
        };

        const ctx = {
            userId: 'user-1',
            db: mockDb as any,
        } as ToolContext;

        const result = await requireApproval('sensitive-tool', { arg: 1 }, ctx);

        expect(result.success).toBe(false);
        expect(result.pendingApproval).toBe(true);
        expect(result.auditLogId).toBe('log-123');
        expect(mockDb.auditLog.create).toHaveBeenCalledWith({
            data: expect.objectContaining({
                event: 'PENDING_APPROVAL',
                toolName: 'sensitive-tool',
                pendingApproval: true,
                userId: 'user-1',
            }),
        });
    });
});
