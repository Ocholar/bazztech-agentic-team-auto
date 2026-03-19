import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { name, companyName, email, password } = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
        }

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
    } catch (error) {
        console.error('[register] Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
