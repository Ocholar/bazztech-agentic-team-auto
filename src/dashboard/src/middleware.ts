import { NextRequest, NextResponse } from 'next/server';

import { getToken } from 'next-auth/jwt';

export const config = {
    matcher: [
        /*
         * Match all paths except:
         * 1. /api/auth (Auth endpoints)
         * 2. /_next (Next.js internals)
         * 3. /static (if used)
         * 4. /favicon.ico, /sitemap.xml (static files)
         * 5. /.well-known (SSL verification)
         */
        '/((?!api/auth|_next|static|\\.well-known|[\\w-]+\\.\\w+).*)',
    ],
};

/**
 * BazzAI Production Middleware
 * 
 * Enforces defense-in-depth authentication protection at the edge.
 */
export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Protect all portal routes
    if (pathname.startsWith('/portal')) {
        let token;
        try {
            token = await getToken({
                req,
                secret: process.env.AUTH_SECRET,
                secureCookie: process.env.NODE_ENV === 'production'
            });
        } catch (err) {
            console.error("Middleware Auth Crash:", err);
            const loginUrl = new URL('/login', req.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            loginUrl.searchParams.set('error', 'AuthFailure');
            return NextResponse.redirect(loginUrl);
        }

        if (!token) {
            const loginUrl = new URL('/login', req.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Admin boundary reinforcement
        if (pathname.startsWith('/portal/admin') && token.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/portal', req.url));
        }
    }

    return NextResponse.next();
}
