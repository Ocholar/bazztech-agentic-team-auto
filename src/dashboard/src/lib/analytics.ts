import { track } from '@vercel/analytics';

/**
 * Logs a custom event to Vercel Analytics with an optional payload.
 *
 * @param eventName The name of the event to log.
 * @param eventData An optional object of properties to send with the event.
 */
export const logAnalyticsEvent = (eventName: string, eventData?: Record<string, any>) => {
    try {
        if (typeof window !== 'undefined') {
            track(eventName, eventData);
        } else {
            // Optional: logging for server-side if needed (Vercel Analytics track is primarily for client-side)
            console.log(`[Analytics Server-Side] Event: ${eventName}`, eventData);
        }
    } catch (error) {
        console.error('Failed to log analytics event:', error);
    }
};
