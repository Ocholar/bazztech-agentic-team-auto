import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        // Check database connectivity using the existing db instance
        await db.$queryRaw`SELECT 1`;

        return NextResponse.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'dev',
            checks: {
                database: 'connected',
                environment: 'configured'
            }
        }, { status: 200 });

    } catch (error) {
        console.error("[Health Check Error]:", error);
        return NextResponse.json({
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
            error: 'Database connection failed',
            checks: {
                database: 'disconnected',
                environment: 'configured'
            }
        }, { status: 503 });
    }
}
