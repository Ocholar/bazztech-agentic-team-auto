/**
 * JengaPollTool
 * Wraps the Jenga account poll logic as a modular BazzTool.
 * Reads the Equity Bank statement for the last N hours and matches
 * incoming transactions against pending subscriptions for the tenant.
 */

import { z } from 'zod';
import { BazzTool, ToolContext, ToolResult } from './types';
import { getJengaToken, getAccountStatement, formatDate } from '../jenga';
import { db as globalDb } from '../db';

// Input schema
export const JengaPollInput = z.object({
    fromDate: z.string().optional().describe('YYYY-MM-DD start date (defaults to yesterday)'),
    toDate: z.string().optional().describe('YYYY-MM-DD end date (defaults to today)'),
});

export type JengaPollInputType = z.infer<typeof JengaPollInput>;

export interface JengaPollOutput {
    polledAt: string;
    totalTransactions: number;
    newRecords: number;
    matched: number;
    skipped: number;
}

const ACCOUNT_NUMBER = process.env.EQUITY_ACCOUNT_NUMBER || '0290170458002';
const COUNTRY_CODE = process.env.EQUITY_COUNTRY_CODE || 'KE';

export const JengaPollTool: BazzTool<JengaPollInputType, JengaPollOutput> = {
    name: 'jenga-poll',
    description:
        'Polls the Equity Bank (Jenga API) account statement for the last 24 hours and matches transactions to pending BazzAI subscriptions.',
    inputSchema: JengaPollInput,
    sensitive: true,

    async execute(input, ctx: ToolContext): Promise<ToolResult<JengaPollOutput>> {
        const db = ctx.db ?? globalDb;
        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const fromDate = input.fromDate ?? formatDate(yesterday);
        const toDate = input.toDate ?? formatDate(now);

        try {
            const token = await getJengaToken();
            const statementData = await getAccountStatement(
                token,
                ACCOUNT_NUMBER,
                COUNTRY_CODE,
                fromDate,
                toDate
            );

            const transactions: any[] = statementData?.data ?? statementData?.transactions ?? [];
            let matched = 0;
            let skipped = 0;
            let newRecords = 0;

            for (const tx of transactions) {
                const txId = tx.transactionId ?? tx.chequeNumber ?? tx.reference;
                const txAmount = parseFloat(tx.amount ?? tx.credit ?? '0');
                const txRef = tx.reference ?? tx.narration ?? '';
                const txStatus = tx.status ?? 'SUCCESS';

                if (txStatus !== 'SUCCESS' || txAmount <= 0) continue;

                const alreadyProcessed = await db.processedTransaction.findUnique({
                    where: { transactionId: String(txId) },
                });
                if (alreadyProcessed) { skipped++; continue; }

                await db.processedTransaction.create({
                    data: {
                        transactionId: String(txId),
                        amount: txAmount,
                        reference: txRef,
                        narration: tx.narration ?? null,
                    },
                });
                newRecords++;

                // Only match subscriptions owned by this tenant
                const pendingSubs = await db.subscription.findMany({
                    where: {
                        userId: ctx.userId,
                        status: { in: ['INACTIVE', 'ACTIVE', 'PAST_DUE'] },
                        paymentReference: { not: null },
                    },
                });

                for (const sub of pendingSubs) {
                    const refMatch =
                        txRef.toLowerCase().includes(sub.paymentReference!.toLowerCase()) ||
                        sub.paymentReference!.toLowerCase().includes(txRef.toLowerCase());
                    if (!refMatch) continue;

                    const isSetup = Math.abs(txAmount - (sub.oneTimeFee ?? sub.amountExpected ?? 0)) < 1;
                    const expectedMaintenance = (sub.oneTimeFee ?? 0) * (sub.monthlyMaintenanceRate ?? 0.2);
                    const isMaintenance = Math.abs(txAmount - expectedMaintenance) < 1;

                    if (isSetup || isMaintenance) {
                        const newExpiry = new Date(sub.expiresAt ?? now);
                        if (isMaintenance) newExpiry.setMonth(newExpiry.getMonth() + 1);
                        else { newExpiry.setFullYear(now.getFullYear()); newExpiry.setMonth(now.getMonth() + 1); }

                        await db.subscription.update({
                            where: { id: sub.id },
                            data: {
                                status: 'ACTIVE',
                                equityTransactionId: String(txId),
                                amountPaid: txAmount,
                                expiresAt: newExpiry,
                                ...(isSetup ? { startDate: now, lastMaintenanceBillDate: now } : { lastMaintenanceBillDate: now }),
                            },
                        });

                        await db.auditLog.create({
                            data: {
                                event: isSetup ? 'PAYMENT_MATCHED_SETUP' : 'PAYMENT_MATCHED_MAINTENANCE',
                                userId: ctx.userId,
                                toolName: 'jenga-poll',
                                detail: JSON.stringify({ subId: sub.id, amount: txAmount, txId }),
                            },
                        });
                        matched++;
                        break;
                    }
                }
            }

            await db.auditLog.create({
                data: {
                    event: 'JENGA_POLL',
                    userId: ctx.userId,
                    toolName: 'jenga-poll',
                    detail: JSON.stringify({ fromDate, toDate, totalTransactions: transactions.length, newRecords, matched, skipped }),
                },
            });

            return {
                success: true,
                data: { polledAt: now.toISOString(), totalTransactions: transactions.length, newRecords, matched, skipped },
            };
        } catch (err: any) {
            await db.auditLog.create({
                data: {
                    event: 'JENGA_POLL_FAILED',
                    userId: ctx.userId,
                    toolName: 'jenga-poll',
                    detail: err.message,
                },
            });
            return { success: false, error: err.message };
        }
    },
};
