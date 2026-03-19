import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Temporarily pass all requests through for debugging
export function middleware(req: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
