import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logAnalyticsEvent } from '../analytics';
import * as vercelAnalytics from '@vercel/analytics';

// Mock Vercel Analytics
vi.mock('@vercel/analytics', () => ({
    track: vi.fn(),
}));

describe('logAnalyticsEvent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should call track when window is defined', () => {
        // Mock window object
        vi.stubGlobal('window', {});

        logAnalyticsEvent('test_event', { key: 'value' });

        expect(vercelAnalytics.track).toHaveBeenCalledWith('test_event', { key: 'value' });

        // Cleanup
        vi.unstubAllGlobals();
    });

    it('should fall back to console.log when window is not defined', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

        logAnalyticsEvent('server_event', { server: true });

        expect(vercelAnalytics.track).not.toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith('[Analytics Server-Side] Event: server_event', { server: true });

        consoleSpy.mockRestore();
    });
});
