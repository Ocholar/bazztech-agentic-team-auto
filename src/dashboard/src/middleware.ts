import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: [
        /*
         * Match all paths except:
         * 1. /api (API routes)
         * 2. /_next (Next.js internals)
         * 3. /static (if used)
         * 4. /favicon.ico, /sitemap.xml (static files)
         */
        '/((?!api|_next|static|[\\w-]+\\.\\w+).*)',
    ],
};

export default function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get('host') || '';

    // Define your custom domains
    // Note: Localhost testing typically uses 'localhost:3000'
    const adminDomain = 'admin.bazztech.co.ke';
    const portalDomain = 'portal.bazztech.co.ke';

    // 1. Admin Subdomain logic (admin.bazztech.co.ke)
    if (hostname.includes(adminDomain)) {
        // Rewrite all requests to the /admin folder
        return NextResponse.rewrite(new URL(`/admin${url.pathname}`, req.url));
    }

    // 2. Portal Subdomain logic (portal.bazztech.co.ke)
    if (hostname.includes(portalDomain)) {
        // Rewrite all requests to the /portal folder
        // If they hit portal.bazztech.co.ke/, they get /portal (mapped to src/app/portal/page.tsx)
        return NextResponse.rewrite(new URL(`/portal${url.pathname}`, req.url));
    }

    // 3. Default/Main domain (bazztech.co.ke)
    // No rewrite needed, serves from root of /app (Landing Page)
    return NextResponse.next();
}
