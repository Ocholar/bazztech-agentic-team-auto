/**
 * CheckMpesaBalanceTool
 * Fetches the M-Pesa account balance for the tenant's Daraja shortcode
 * using the Safaricom Daraja API.
 */

import { z } from 'zod';
import { BazzTool, ToolContext, ToolResult } from './types';

export const CheckMpesaBalanceInput = z.object({
    partyA: z.string().optional().describe('Shortcode or MSISDN to check. Defaults to tenant shortcode.'),
});

export type CheckMpesaBalanceInputType = z.infer<typeof CheckMpesaBalanceInput>;

export interface CheckMpesaBalanceOutput {
    resultCode: number;
    resultDesc: string;
    balance?: string;
}

const DARAJA_BASE = 'https://api.safaricom.co.ke';

async function getDarajaToken(consumerKey: string, consumerSecret: string): Promise<string> {
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const res = await fetch(`${DARAJA_BASE}/oauth/v1/generate?grant_type=client_credentials`, {
        method: 'GET',
        headers: { Authorization: `Basic ${credentials}` },
    });
    if (!res.ok) throw new Error(`Daraja OAuth failed (${res.status})`);
    const data = await res.json();
    return data.access_token;
}

export const CheckMpesaBalanceTool: BazzTool<CheckMpesaBalanceInputType, CheckMpesaBalanceOutput> = {
    name: 'check-mpesa-balance',
    description: 'Checks the M-Pesa Daraja account balance for the tenant\'s registered shortcode.',
    inputSchema: CheckMpesaBalanceInput,
    sensitive: true,

    async execute(input, ctx: ToolContext): Promise<ToolResult<CheckMpesaBalanceOutput>> {
        const { darajaConsumerKey, darajaConsumerSecret, darajaShortcode, darajaPasskey, darajaCallbackUrl } =
            ctx.productConfig ?? {};

        if (!darajaConsumerKey || !darajaConsumerSecret || !darajaShortcode) {
            return { success: false, error: 'M-Pesa (Daraja) not fully configured for this tenant.' };
        }

        try {
            const token = await getDarajaToken(darajaConsumerKey, darajaConsumerSecret);
            const partyA = input.partyA ?? darajaShortcode;

            const timestamp = new Date()
                .toISOString()
                .replace(/[^0-9]/g, '')
                .slice(0, 14);
            const password = Buffer.from(`${darajaShortcode}${darajaPasskey ?? ''}${timestamp}`).toString('base64');

            const res = await fetch(`${DARAJA_BASE}/mpesa/accountbalance/v1/query`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Initiator: partyA,
                    SecurityCredential: password,
                    CommandID: 'AccountBalance',
                    PartyA: partyA,
                    IdentifierType: '4',
                    Remarks: 'BazzAI Balance Check',
                    QueueTimeOutURL: darajaCallbackUrl ?? '',
                    ResultURL: darajaCallbackUrl ?? '',
                }),
            });

            const data = await res.json();

            await ctx.db.auditLog.create({
                data: {
                    event: 'MPESA_BALANCE_CHECKED',
                    userId: ctx.userId,
                    toolName: 'check-mpesa-balance',
                    detail: JSON.stringify({ resultCode: data.ResultCode, resultDesc: data.ResultDesc }),
                },
            });

            return {
                success: data.ResultCode === 0,
                data: {
                    resultCode: data.ResultCode,
                    resultDesc: data.ResultDesc,
                    balance: data.Balance,
                },
            };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    },
};
