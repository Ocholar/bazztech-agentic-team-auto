import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    // Basic protection: Only allow in development or with a secret key
    const url = new URL(req.url);
    const key = url.searchParams.get('key');

    if (key !== 'BAZZ-MASTER-INIT-99') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const masterEmail = 'admin@bazztech.co.ke';
        
        let user = await db.user.findUnique({ where: { email: masterEmail } });

        if (!user) {
            const passwordHash = await bcrypt.hash('BazztechAdmin@2026', 12);
            user = await db.user.create({
                data: {
                    name: 'Bazztech Networks',
                    companyName: 'Bazztech',
                    email: masterEmail,
                    passwordHash,
                    role: 'ADMIN',
                }
            });
        }

        // Ensure subscriptions
        const products: any[] = ['BAZZ_CONNECT', 'BAZZ_LEAD', 'BAZZ_FLOW', 'BAZZ_DOC'];
        
        for (const pt of products) {
            const existingSub = await db.subscription.findFirst({
                where: { userId: user.id, productType: pt }
            });

            if (!existingSub) {
                await db.subscription.create({
                    data: {
                        userId: user.id,
                        productType: pt,
                        status: 'ACTIVE',
                        businessSizeTier: 'MEDIUM',
                        oneTimeFee: 0,
                        amountExpected: 0,
                        amountPaid: 0,
                        paymentReference: `COMP-${pt}`,
                        equityTransactionId: `INT-${Date.now()}`,
                        startDate: new Date(),
                    }
                });
            } else if (existingSub.status !== 'ACTIVE') {
                 await db.subscription.update({
                    where: { id: existingSub.id },
                    data: { status: 'ACTIVE' }
                 });
            }
        }

        // Ensure config exists for the Master Tenant's main WhatsApp connection (Bazz-Connect)
        let config = await db.productConfig.findFirst({
            where: { userId: user.id }
        });

        const connectSub = await db.subscription.findFirst({
            where: { userId: user.id, productType: 'BAZZ_CONNECT' }
        });

        if (!config && connectSub) {
            config = await db.productConfig.create({
                data: {
                    userId: user.id,
                    subscriptionId: connectSub.id,
                    systemPrompt: 'You are the digital concierge for Bazztech Networks. You sell AI Automation tools to Kenyan businesses.',
                    knowledgeBase: 'Products include Bazz-Connect (WhatsApp), Bazz-Flow (M-Pesa ERP), Bazz-Doc (OCR), and Bazz-Lead (CRM). Phone: +254 781 751 937',
                    webhookId: `whk_master_bazztech_${user.id.substring(0,8)}`
                }
            });
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Bazztech Master Tenant Initialized.',
            email: user.email,
            password: 'BazztechAdmin@2026',
            warning: 'Store these credentials securely.'
        });

    } catch (error: any) {
        console.error('[seed-bazztech] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
