import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { name, companyName, email, password } = await req.json();

        if (!process.env.DATABASE_URL) {
            console.error('[register] CRITICAL: DATABASE_URL is not defined in environment variables.');
            return NextResponse.json({ error: 'Database configuration missing. Please check Vercel environment variables.' }, { status: 500 });
        }

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
        }

        try {
            // Check if email is already taken
            const existing = await db.user.findUnique({ where: { email } });
            if (existing) {
                return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
            }

            // Hash password
            const passwordHash = await bcrypt.hash(password, 12);

            // Create user
            const user = await db.user.create({
                data: {
                    name,
                    companyName,
                    email,
                    passwordHash,
                    role: 'CLIENT',
                },
            });

            return NextResponse.json({ success: true, userId: user.id }, { status: 201 });
        } catch (dbError) {
            console.error('[register] Database Error:', dbError);
            return NextResponse.json({ 
                error: 'Database connection failed. Ensure your DATABASE_URL is correct and Supabase project is active.',
                details: process.env.NODE_ENV === 'development' ? String(dbError) : undefined
            }, { status: 500 });
        }
    } catch (error) {
        console.error('[register] Request Error:', error);
        return NextResponse.json({ error: 'Failed to process registration request.' }, { status: 500 });
    }
}

