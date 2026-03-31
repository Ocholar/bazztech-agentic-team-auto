/**
 * ProcessInvoiceVisionTool
 * Sends an image URL to OpenAI Vision to extract structured invoice fields,
 * then posts the JSON payload to the tenant's configured docOutputWebhook.
 *
 * Uses the tenant's own openaiApiKey from ProductConfig (per multi-tenancy policy).
 */

import { z } from 'zod';
import { BazzTool, ToolContext, ToolResult } from './types';

export const ProcessInvoiceVisionInput = z.object({
    imageUrl: z.string().describe('Publicly accessible URL of the invoice image or PDF-rendered image'),
    currency: z.string().optional().describe('Expected currency code e.g. KES, USD (default: KES)'),
});

export type ProcessInvoiceVisionInputType = z.infer<typeof ProcessInvoiceVisionInput>;

export interface InvoiceFields {
    vendor?: string;
    invoiceNumber?: string;
    date?: string;
    dueDate?: string;
    totalAmount?: number;
    currency?: string;
    lineItems?: { description: string; quantity?: number; unitPrice?: number; total?: number }[];
    raw: string;
}

export interface ProcessInvoiceVisionOutput {
    invoice: InvoiceFields;
    webhookPosted: boolean;
}

const VISION_SYSTEM_PROMPT = `You are an invoice parsing assistant. 
Extract the following fields from the invoice image in strict JSON format:
{ vendor, invoiceNumber, date (YYYY-MM-DD), dueDate (YYYY-MM-DD), totalAmount (number), currency, lineItems (array of { description, quantity, unitPrice, total }) }
Do NOT include any markdown fences. Return pure JSON only.`;

export const ProcessInvoiceVisionTool: BazzTool<ProcessInvoiceVisionInputType, ProcessInvoiceVisionOutput> = {
    name: 'process-invoice-vision',
    description: 'Uses OpenAI Vision to extract structured data from an invoice image and posts it to the tenant\'s ERP webhook.',
    inputSchema: ProcessInvoiceVisionInput,
    sensitive: false,

    async execute(input, ctx: ToolContext): Promise<ToolResult<ProcessInvoiceVisionOutput>> {
        const { openaiApiKey, docOutputWebhook } = ctx.productConfig ?? {};

        if (!openaiApiKey) {
            return { success: false, error: 'OpenAI API key not configured for this tenant.' };
        }

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${openaiApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    messages: [
                        { role: 'system', content: VISION_SYSTEM_PROMPT },
                        {
                            role: 'user',
                            content: [
                                { type: 'text', text: `Parse this invoice. Expected currency: ${input.currency ?? 'KES'}` },
                                { type: 'image_url', image_url: { url: input.imageUrl, detail: 'high' } },
                            ],
                        },
                    ],
                    max_tokens: 1024,
                }),
            });

            if (!response.ok) {
                const err = await response.text();
                return { success: false, error: `OpenAI API error (${response.status}): ${err}` };
            }

            const openAiData = await response.json();
            const rawText: string = openAiData.choices?.[0]?.message?.content ?? '{}';

            let invoice: InvoiceFields;
            try {
                invoice = { ...JSON.parse(rawText), raw: rawText };
            } catch {
                invoice = { raw: rawText };
            }

            // Post to tenant's ERP webhook if configured
            let webhookPosted = false;
            if (docOutputWebhook) {
                try {
                    const webhookRes = await fetch(docOutputWebhook, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId: ctx.userId, invoice }),
                    });
                    webhookPosted = webhookRes.ok;
                } catch {
                    // Non-fatal — we still return the extracted data
                }
            }

            await ctx.db.auditLog.create({
                data: {
                    event: 'INVOICE_VISION_PROCESSED',
                    userId: ctx.userId,
                    toolName: 'process-invoice-vision',
                    detail: JSON.stringify({ invoiceNumber: invoice.invoiceNumber, total: invoice.totalAmount, webhookPosted }),
                },
            });

            return { success: true, data: { invoice, webhookPosted } };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    },
};
