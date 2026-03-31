/**
 * SendWhatsAppTool
 * Dispatches a WhatsApp message via the tenant's configured WhatsApp integration
 * (Meta Cloud API or Evolution API, depending on whatsappUrl in ProductConfig).
 */

import { z } from 'zod';
import { BazzTool, ToolContext, ToolResult } from './types';

export const SendWhatsAppInput = z.object({
    to: z.string().describe('Recipient phone number in E.164 format e.g. 254712345678'),
    message: z.string().describe('Text body to send'),
});

export type SendWhatsAppInputType = z.infer<typeof SendWhatsAppInput>;

export interface SendWhatsAppOutput {
    messageId?: string;
    status: 'sent' | 'failed';
}

export const SendWhatsAppTool: BazzTool<SendWhatsAppInputType, SendWhatsAppOutput> = {
    name: 'send-whatsapp',
    description:
        'Sends a WhatsApp text message to a phone number using the tenant\'s configured WhatsApp integration.',
    inputSchema: SendWhatsAppInput,
    sensitive: false,

    async execute(input, ctx: ToolContext): Promise<ToolResult<SendWhatsAppOutput>> {
        const { whatsappUrl, whatsappToken, whatsappPhoneId } = ctx.productConfig ?? {};

        if (!whatsappUrl || !whatsappToken || !whatsappPhoneId) {
            return { success: false, error: 'WhatsApp not configured for this tenant.' };
        }

        try {
            // Detect Meta Cloud API vs Evolution API by URL pattern
            const isMeta = whatsappUrl.includes('graph.facebook.com');

            let body: Record<string, unknown>;
            let url: string;

            if (isMeta) {
                url = `${whatsappUrl}/${whatsappPhoneId}/messages`;
                body = {
                    messaging_product: 'whatsapp',
                    to: input.to,
                    type: 'text',
                    text: { body: input.message },
                };
            } else {
                // Evolution API format
                url = `${whatsappUrl}/message/sendText/${whatsappPhoneId}`;
                body = {
                    number: input.to,
                    options: { delay: 1200 },
                    textMessage: { text: input.message },
                };
            }

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${whatsappToken}`,
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const errorText = await res.text();
                return { success: false, error: `WhatsApp API error (${res.status}): ${errorText}`, data: { status: 'failed' } };
            }

            const responseData = await res.json();
            const messageId = responseData?.messages?.[0]?.id ?? responseData?.key?.id;

            await ctx.db.auditLog.create({
                data: {
                    event: 'WHATSAPP_MESSAGE_SENT',
                    userId: ctx.userId,
                    toolName: 'send-whatsapp',
                    detail: JSON.stringify({ to: input.to, messageId }),
                },
            });

            return { success: true, data: { messageId, status: 'sent' } };
        } catch (err: any) {
            return { success: false, error: err.message, data: { status: 'failed' } };
        }
    },
};
