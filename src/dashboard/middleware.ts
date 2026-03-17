import { auth } from './auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
    const session = await auth();
    const { pathname } = req.nextUrl;

    // Public routes — always accessible
    const publicPaths = ['/login', '/register', '/api/auth'];
    const isPublic = publicPaths.some((p) => pathname.startsWith(p));

    // Internal API routes protected by a shared secret, not session
    const isInternalApi = pathname.startsWith('/api/client-config') ||
        pathname.startsWith('/api/webhook');

    if (isPublic || isInternalApi) return NextResponse.next();

    // If not logged in, redirect to login
    if (!session) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
