export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getJengaToken, getAccountStatement, formatDate } from '@/lib/jenga';

const ACCOUNT_NUMBER = process.env.EQUITY_ACCOUNT_NUMBER || '0714929790';
const COUNTRY_CODE = process.env.EQUITY_COUNTRY_CODE || 'KE';

/**
 * POST /api/jenga/poll
 * Core polling engine — called every 15 min by n8n Schedule trigger.
 * 
 * Logic:
 *  1. Authenticate with Jenga → get Bearer token
 *  2. Fetch full account statement for the last 24h
 *  3. For each transaction with status=SUCCESS:
 *     a. Skip if transactionId already in ProcessedTransaction (dedup)
 *     b. Match amount + reference against pending Subscriptions
 *     c. On match: activate subscription, write audit log
 *     d. Always write ProcessedTransaction record
 *  4. Return summary to n8n
 */
export async function POST(req: Request) {
    try {
        // Auth check
        const apiKey = req.headers.get('x-api-key');
        if (apiKey !== process.env.INTERNAL_API_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Step 1: Get Jenga Bearer token
        const token = await getJengaToken();

        // Step 2: Query last 24h of bank statement
        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const fromDate = formatDate(yesterday);
        const toDate = formatDate(now);

        let statementData;
        try {
            statementData = await getAccountStatement(
                token,
                ACCOUNT_NUMBER,
                COUNTRY_CODE,
                fromDate,
                toDate
            );
        } catch (err: any) {
            // Log the failed poll attempt
            await db.auditLog.create({
                data: {
                    event: 'JENGA_POLL_FAILED',
                    detail: `Statement fetch failed: ${err.message}`,
                },
            });
            return NextResponse.json({
                success: false,
                error: err.message,
                retriedAt: now.toISOString(),
            }, { status: 502 });
        }

        // Step 3: Process each transaction
        const transactions = statementData?.data || statementData?.transactions || [];
        let matched = 0;
        let skipped = 0;
        let newRecords = 0;
        const matchDetails: { subId: string, userId: string, type: 'SETUP' | 'MAINTENANCE' }[] = [];

        for (const tx of transactions) {
            const txId = tx.transactionId || tx.chequeNumber || tx.reference;
            const txAmount = parseFloat(tx.amount || tx.credit || '0');
            const txRef = tx.reference || tx.narration || '';
            const txStatus = tx.status || 'SUCCESS';

            // Only process successful credit transactions
            if (txStatus !== 'SUCCESS' || txAmount <= 0) continue;

            // Step 3a: Deduplication check
            const alreadyProcessed = await db.processedTransaction.findUnique({
                where: { transactionId: String(txId) },
            });

            if (alreadyProcessed) {
                skipped++;
                continue;
            }

            // Step 3b: Write ProcessedTransaction record (dedup)
            await db.processedTransaction.create({
                data: {
                    transactionId: String(txId),
                    amount: txAmount,
                    reference: txRef,
                    narration: tx.narration || null,
                },
            });
            newRecords++;

            // Step 3c: Match against pending subscriptions
            // Find a subscription where paymentReference matches the txRef
            // AND the expected amount matches
            const pendingSubs = await db.subscription.findMany({
                where: {
                    status: { in: ['INACTIVE', 'ACTIVE', 'PAST_DUE'] },
                    paymentReference: { not: null },
                },
            });

            for (const sub of pendingSubs) {
                const refMatch =
                    txRef.toLowerCase().includes(sub.paymentReference!.toLowerCase()) ||
                    sub.paymentReference!.toLowerCase().includes(txRef.toLowerCase());

                if (!refMatch) continue;

                // Determine if this is a SETUP fee or MAINTENANCE fee
                const isSetup = Math.abs(txAmount - (sub.oneTimeFee || sub.amountExpected || 0)) < 1;
                const expectedMaintenance = (sub.oneTimeFee || 0) * (sub.monthlyMaintenanceRate || 0.2);
                const isMaintenance = Math.abs(txAmount - expectedMaintenance) < 1;

                if (isSetup) {
                    // ACTIVATE: Setup fee received
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
                            lastMaintenanceBillDate: new Date(),
                        },
                    });

                    await db.auditLog.create({
                        data: {
                            event: 'PAYMENT_MATCHED_SETUP',
                            detail: JSON.stringify({
                                subId: sub.id,
                                amount: txAmount,
                                tier: sub.businessSizeTier,
                            }),
                        },
                    });
                    matchDetails.push({
                        subId: sub.id,
                        userId: sub.userId,
                        type: 'SETUP'
                    });
                    matched++;
                    break;
                } else if (isMaintenance) {
                    // EXTEND: Maintenance fee received
                    const currentExpiry = sub.expiresAt || new Date();
                    const newExpiry = new Date(currentExpiry.getTime());
                    newExpiry.setMonth(newExpiry.getMonth() + 1);

                    await db.subscription.update({
                        where: { id: sub.id },
                        data: {
                            status: 'ACTIVE',
                            equityTransactionId: String(txId),
                            amountPaid: txAmount,
                            expiresAt: newExpiry,
                            lastMaintenanceBillDate: new Date(),
                        },
                    });

                    await db.auditLog.create({
                        data: {
                            event: 'PAYMENT_MATCHED_MAINTENANCE',
                            detail: JSON.stringify({
                                subId: sub.id,
                                amount: txAmount,
                                newExpiry,
                            }),
                        },
                    });
                    matchDetails.push({ subId: sub.id, userId: sub.userId, type: 'MAINTENANCE' });
                    matched++;
                    break;
                }
            }
        }

        // Log the poll
        await db.auditLog.create({
            data: {
                event: 'JENGA_POLL',
                detail: JSON.stringify({
                    fromDate,
                    toDate,
                    totalTransactions: transactions.length,
                    newRecords,
                    matched,
                    skipped,
                }),
            },
        });

        // Step 4: Return summary to n8n
        return NextResponse.json({
            success: true,
            summary: {
                polledAt: now.toISOString(),
                totalTransactions: transactions.length,
                newRecords,
                matched,
                skipped,
                details: matchDetails
            },
        });
    } catch (error: any) {
        console.error('[jenga/poll] Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Error' }, { status: 500 });
    }
}
