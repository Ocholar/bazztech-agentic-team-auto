import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { name, companyName, email, phone, password, product, currency, qty } = await req.json();

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
                    phone: phone || null,
                    passwordHash,
                    role: 'CLIENT',
                },
            });

            let redirectUrl = '/login?registered=true';

            // Determine if a valid product was passed
            if (product && ['BAZZ_CONNECT', 'BAZZ_FLOW', 'BAZZ_DOC', 'BAZZ_LEAD'].includes(product)) {

                const refCode = `BAZ-${user.id.substring(0, 5).toUpperCase()}-${product.split('_')[1]}`;

                // --- AGGRESSIVE IP GEOLOCATION PRICING ENFORCEMENT ---
                let isUSD = currency === 'USD'; // Local dev fallback
                const countryHeader = req.headers.get('x-vercel-ip-country') || req.headers.get('cf-ipcountry');

                if (countryHeader) {
                    // CDN explicitly provided the country code
                    isUSD = countryHeader.toUpperCase() !== 'KE';
                } else {
                    // Raw IP check via fallback API
                    const forwardedFor = req.headers.get('x-forwarded-for');
                    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : null;

                    if (clientIp && clientIp !== '::1' && clientIp !== '127.0.0.1') {
                        try {
                            const geoRes = await fetch(`https://ipapi.co/${clientIp}/country/`);
                            if (geoRes.ok) {
                                const geoCountry = (await geoRes.text()).trim();
                                if (geoCountry.length === 2) {
                                    isUSD = geoCountry.toUpperCase() !== 'KE';
                                }
                            }
                        } catch (e) {
                            console.error("[register] IP fallback failed:", e);
                        }
                    }
                }

                const baseFee = isUSD ? 49.99 : 4999;
                const finalQuantity = qty && qty > 0 ? Number(qty) : 1;
                const totalFee = baseFee * finalQuantity;

                await db.subscription.create({
                    data: {
                        userId: user.id,
                        productType: product as any,
                        status: 'INACTIVE',
                        businessSizeTier: 'MICRO',
                        oneTimeFee: totalFee,
                        amountExpected: totalFee,
                        paymentReference: refCode,
                    }
                });

                const configPaths: Record<string, string> = {
                    'BAZZ_CONNECT': '/portal/config/bazz-connect',
                    'BAZZ_FLOW': '/portal/config/bazz-flow',
                    'BAZZ_DOC': '/portal/config/bazz-doc',
                    'BAZZ_LEAD': '/portal/config/bazz-lead',
                };

                redirectUrl = `/login?registered=true&callbackUrl=${encodeURIComponent(configPaths[product])}`;
            }

            return NextResponse.json({ success: true, userId: user.id, redirectUrl }, { status: 201 });
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

