export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getJengaToken, getAccountStatement, formatDate } from '@/lib/jenga';
import { apiRateLimiter } from '@/lib/rate-limiter';
import { logger } from '@/lib/logger';

const ACCOUNT_NUMBER = process.env.EQUITY_ACCOUNT_NUMBER || '0290170458002';
const COUNTRY_CODE = process.env.EQUITY_COUNTRY_CODE || 'KE';

/**
 * POST /api/jenga/check-status
 * Transaction ID-based payment verification.
 * Works for both first-time activation AND monthly renewals.
 * The system auto-detects which type based on subscription state.
 *
 * Body: { subscriptionId: string, transactionId: string }
 *
 * Auto-detection logic:
 *   - INACTIVE sub                → expecting SETUP fee (oneTimeFee)
 *   - ACTIVE sub, expiresAt < now → expecting MAINTENANCE fee (oneTimeFee * 0.20)
 *   - ACTIVE sub, expiresAt good  → early renewal, also MAINTENANCE fee
 *   - SUSPENDED sub               → expecting MAINTENANCE fee to reactivate
 *
 * Amount tolerance: ±1 KES to allow for minor rounding differences.
 */
export async function POST(req: Request) {
    try {
        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        try {
            await apiRateLimiter.consume(ip);
        } catch (rateLimitError) {
            logger.warn('Rate limit exceeded for Jenga check-status API', { ip });
            return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });
        }

        const body = await req.json();
        const { subscriptionId, transactionId } = body as {
            subscriptionId: string;
            transactionId: string;
        };

        if (!subscriptionId || !transactionId) {
            return NextResponse.json(
                { error: 'Missing required fields: subscriptionId, transactionId' },
                { status: 400 }
            );
        }

        const cleanTxId = String(transactionId).trim();

        // Load subscription
        const sub = await db.subscription.findUnique({
            where: { id: subscriptionId },
            include: { user: true },
        });

        if (!sub) {
            return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
        }

        // Already active and already recorded this transaction
        if (sub.status === 'ACTIVE' && sub.equityTransactionId === cleanTxId) {
            return NextResponse.json({
                success: true,
                alreadyProcessed: true,
                status: 'ACTIVE',
                message: 'This transaction has already been applied to your subscription.',
            });
        }

        // Determine payment type and expected amount
        const now = new Date();
        const isFirstActivation = sub.status === 'INACTIVE';
        const maintenanceFee = (sub.oneTimeFee || 0) * (sub.monthlyMaintenanceRate || 0.2);

        const expectedAmount = isFirstActivation
            ? (sub.oneTimeFee || sub.amountExpected || 0)
            : maintenanceFee;

        const paymentType = isFirstActivation ? 'SETUP' : 'MAINTENANCE';

        // Deduplication: has another subscription already consumed this transaction?
        const duplicate = await db.processedTransaction.findUnique({
            where: { transactionId: cleanTxId },
        });
        if (duplicate) {
            return NextResponse.json({
                success: false,
                error: 'This Transaction ID has already been used on another subscription.',
            }, { status: 409 });
        }

        // Authenticate with Jenga
        let token: string;
        try {
            token = await getJengaToken();
        } catch (err: any) {
            await db.auditLog.create({
                data: {
                    event: 'JENGA_AUTH_FAILED',
                    detail: `Token fetch failed during check-status: ${err.message}`,
                },
            });
            return NextResponse.json({
                success: false,
                error: 'Could not authenticate with Equity Bank API. Please try again in a moment.',
            }, { status: 502 });
        }

        // Fetch 7-day statement (wider window for late verifications)
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const fromDate = formatDate(sevenDaysAgo);
        const toDate = formatDate(now);

        let statementData: any;
        try {
            statementData = await getAccountStatement(token, ACCOUNT_NUMBER, COUNTRY_CODE, fromDate, toDate);
        } catch (err: any) {
            await db.auditLog.create({
                data: {
                    event: 'JENGA_STATEMENT_FAILED',
                    detail: `Statement fetch failed: ${err.message}`,
                },
            });
            return NextResponse.json({
                success: false,
                error: 'Could not fetch bank statement. Please try again.',
            }, { status: 502 });
        }

        const transactions: any[] = statementData?.data || statementData?.transactions || [];

        // Find the specific transaction by ID — no narration matching needed
        const matchedTx = transactions.find((tx: any) => {
            const id = String(tx.transactionId || tx.chequeNumber || tx.reference || '').trim();
            return id === cleanTxId;
        });

        if (!matchedTx) {
            await db.auditLog.create({
                data: {
                    event: 'JENGA_TX_NOT_FOUND',
                    detail: JSON.stringify({ transactionId: cleanTxId, subscriptionId }),
                },
            });
            return NextResponse.json({
                success: false,
                status: sub.status,
                message: `Transaction ID ${cleanTxId} was not found on the Equity Bank account statement within the last 7 days. Please verify your Transaction ID and try again.`,
            });
        }

        // Verify the transaction was a credit (incoming) and to our account
        const txAmount = parseFloat(matchedTx.amount || matchedTx.credit || '0');
        const txType = String(matchedTx.type || matchedTx.transactionType || '').toUpperCase();

        // Reject debits
        if (txType === 'DEBIT' || txAmount <= 0) {
            return NextResponse.json({
                success: false,
                message: 'This transaction appears to be a debit (outgoing payment), not a credit to our account.',
            });
        }

        // Amount check — allow ±1 KES tolerance for rounding
        const amountOk = expectedAmount <= 0 || Math.abs(txAmount - expectedAmount) <= 1;

        if (!amountOk) {
            return NextResponse.json({
                success: false,
                message: `Amount mismatch. Expected KES ${expectedAmount.toFixed(0)}, received KES ${txAmount.toFixed(0)}. Please contact support at +254 781 751 937.`,
            });
        }

        // ✅ All checks passed — record and activate/extend
        await db.processedTransaction.create({
            data: {
                transactionId: cleanTxId,
                amount: txAmount,
                reference: matchedTx.reference || '',
                narration: matchedTx.narration || null,
            },
        });

        if (isFirstActivation) {
            // First-time setup: ACTIVATE subscription
            const expiresAt = new Date();
            expiresAt.setMonth(expiresAt.getMonth() + 1);

            await db.subscription.update({
                where: { id: sub.id },
                data: {
                    status: 'ACTIVE',
                    equityTransactionId: cleanTxId,
                    amountPaid: txAmount,
                    paidPhone: matchedTx.senderPhone || matchedTx.narration || null,
                    startDate: now,
                    expiresAt,
                    lastMaintenanceBillDate: now,
                },
            });

            await db.auditLog.create({
                data: {
                    event: 'PAYMENT_VERIFIED_SETUP',
                    detail: JSON.stringify({
                        subscriptionId: sub.id,
                        userId: sub.userId,
                        transactionId: cleanTxId,
                        amount: txAmount,
                        productType: sub.productType,
                    }),
                },
            });

            return NextResponse.json({
                success: true,
                status: 'ACTIVE',
                paymentType: 'SETUP',
                message: '✅ Payment confirmed! Your subscription is now ACTIVE. Configure your product to get started.',
            });
        } else {
            // Monthly renewal: EXTEND expiry by 30 days
            const currentExpiry = sub.expiresAt || now;
            const newExpiry = new Date(
                Math.max(currentExpiry.getTime(), now.getTime()) // start from now if already expired
            );
            newExpiry.setMonth(newExpiry.getMonth() + 1);

            await db.subscription.update({
                where: { id: sub.id },
                data: {
                    status: 'ACTIVE',
                    equityTransactionId: cleanTxId,
                    amountPaid: txAmount,
                    expiresAt: newExpiry,
                    lastMaintenanceBillDate: now,
                },
            });

            await db.auditLog.create({
                data: {
                    event: 'PAYMENT_VERIFIED_RENEWAL',
                    detail: JSON.stringify({
                        subscriptionId: sub.id,
                        userId: sub.userId,
                        transactionId: cleanTxId,
                        amount: txAmount,
                        newExpiry: newExpiry.toISOString(),
                    }),
                },
            });

            return NextResponse.json({
                success: true,
                status: 'ACTIVE',
                paymentType: 'MAINTENANCE',
                newExpiresAt: newExpiry.toISOString(),
                message: `✅ Renewal confirmed! Your subscription has been extended to ${newExpiry.toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}.`,
            });
        }
    } catch (error: any) {
        logger.error('Jenga check-status Error', error);
        return NextResponse.json({ error: error.message || 'Internal Error' }, { status: 500 });
    }
}
