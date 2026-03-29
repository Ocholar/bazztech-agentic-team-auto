import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: [
        /*
         * Match all paths except:
         * 1. /api (API routes)
         * 2. /_next (Next.js internals)
         * 3. /static (if used)
         * 4. /favicon.ico, /sitemap.xml (static files)
         * 5. /.well-known (SSL verification)
         */
        '/((?!api|_next|static|\\.well-known|[\\w-]+\\.\\w+).*)',
    ],
};

/**
 * BazzAI Production Middleware
 * 
 * Simplified to handle standard path-based routing.
 * Vercel handles domain-level redirects (e.g. non-www to www).
 */
export default function middleware(req: NextRequest) {
    // Current application logic uses path-based routing:
    // /portal -> Client Dashboard
    // /admin  -> Admin Oversight
    // /       -> Public Landing Page

    return NextResponse.next();
}
