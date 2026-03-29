import { RateLimiterMemory } from 'rate-limiter-flexible';

// Production apps should use RateLimiterRedis for multi-instance scaling
// We are defaulting to Memory for deployment simplicity via Vercel edge/serverless

export const webhookRateLimiter = new RateLimiterMemory({
    keyPrefix: 'webhook_limit',
    points: 100, // 100 requests max
    duration: 60, // per 60 seconds (1 minute)
});

export const apiRateLimiter = new RateLimiterMemory({
    keyPrefix: 'api_limit',
    points: 30, // 30 requests max
    duration: 60, // per 60 seconds
});
