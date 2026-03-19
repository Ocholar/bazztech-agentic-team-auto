import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Public routes — always accessible
    const publicPaths = ['/login', '/register', '/api/auth', '/api/mpesa/webhook'];
    const isPublic = publicPaths.some((p) => pathname.startsWith(p));

    // Internal API routes — protected by shared secret, not session
    const isInternalApi =
        pathname.startsWith('/api/client-config') ||
        pathname.startsWith('/api/webhook') ||
        pathname.startsWith('/api/leads');

    if (isPublic || isInternalApi) return NextResponse.next();

    // Check for a NextAuth session cookie (works for both v4 and v5 beta)
    const sessionCookie =
        req.cookies.get('authjs.session-token') ||
        req.cookies.get('__Secure-authjs.session-token') ||
        req.cookies.get('next-auth.session-token') ||
        req.cookies.get('__Secure-next-auth.session-token');

    if (!sessionCookie) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
