export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getJengaToken, getAccountStatement, formatDate } from '@/lib/jenga';

const ACCOUNT_NUMBER = process.env.EQUITY_ACCOUNT_NUMBER || '0290170458002';
const COUNTRY_CODE = process.env.EQUITY_COUNTRY_CODE || 'KE';

/**
 * POST /api/jenga/check-status
 * Instant polling for a specific subscription.
 * Called when a client clicks "Check Payment Status" on the dashboard.
 * 
 * Body: { subscriptionId: string }
 */
export async function POST(req: Request) {
    try {
        const { subscriptionId } = await req.json();

        if (!subscriptionId) {
            return NextResponse.json({ error: 'Missing subscriptionId' }, { status: 400 });
        }

        const sub = await db.subscription.findUnique({
            where: { id: subscriptionId },
            include: { user: true },
        });

        if (!sub || !sub.paymentReference) {
            return NextResponse.json({ error: 'Subscription or payment reference not found' }, { status: 404 });
        }

        // 1. Get Token
        const token = await getJengaToken();

        // 2. Query last 24h of bank statement
        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const fromDate = formatDate(yesterday);
        const toDate = formatDate(now);

        const statementData = await getAccountStatement(
            token,
            ACCOUNT_NUMBER,
            COUNTRY_CODE,
            fromDate,
            toDate
        );

        const transactions = statementData?.data || statementData?.transactions || [];

        // 3. Look for the specific reference
        const matchedTx = transactions.find((tx: any) => {
            const txRef = tx.reference || tx.narration || '';
            return txRef.toLowerCase().includes(sub.paymentReference!.toLowerCase()) ||
                sub.paymentReference!.toLowerCase().includes(txRef.toLowerCase());
        });

        if (matchedTx) {
            const txId = matchedTx.transactionId || matchedTx.chequeNumber || matchedTx.reference;
            const txAmount = parseFloat(matchedTx.amount || matchedTx.credit || '0');

            // Activate if not already active
            if (sub.status !== 'ACTIVE') {
                const expiresAt = new Date();
                expiresAt.setMonth(expiresAt.getMonth() + 1);

                await db.subscription.update({
                    where: { id: sub.id },
                    data: {
                        status: 'ACTIVE',
                        equityTransactionId: String(txId),
                        amountPaid: txAmount,
                        startDate: new Date(),
                        expiresAt,
                    },
                });

                await db.auditLog.create({
                    data: {
                        event: 'INSTANT_PAYMENT_MATCHED',
                        detail: JSON.stringify({
                            subscriptionId: sub.id,
                            transactionId: txId,
                            amount: txAmount,
                        }),
                    },
                });

                return NextResponse.json({
                    success: true,
                    status: 'ACTIVE',
                    message: 'Payment confirmed! Your portal is now active.',
                });
            }

            return NextResponse.json({
                success: true,
                status: 'ACTIVE',
                message: 'Your subscription is already active.',
            });
        }

        return NextResponse.json({
            success: false,
            status: sub.status,
            message: 'Payment not found yet. Please ensure you used the correct reference and wait a few minutes.',
        });

    } catch (error: any) {
        console.error('[jenga/check-status] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
