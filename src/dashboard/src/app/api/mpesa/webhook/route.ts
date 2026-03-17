import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

/**
 * POST /api/mpesa/webhook
 * 
 * Safaricom hits this endpoint asynchronously after the user enters their PIN.
 * If the payment is successful, we find the pending Subscription using the CheckoutRequestID
 * and flip it to "ACTIVE", recording their M-Pesa receipt number.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const payload = body.Body.stkCallback;

        // Safaricom ResultCode 0 means SUCCESS
        if (payload.ResultCode === 0) {
            const checkoutRequestId = payload.CheckoutRequestID;

            // Extract the M-Pesa Receipt Number from the Item array Safaricom sends
            const metadataItems = payload.CallbackMetadata.Item;
            const mpesaReceiptObj = metadataItems.find((item: any) => item.Name === 'MpesaReceiptNumber');
            const receipt = mpesaReceiptObj?.Value || 'UNKNOWN';

            // Find the pending subscription created during the STK Push
            const pendingSub = await db.subscription.findUnique({
                where: { checkoutRequestId }
            });

            if (pendingSub) {
                // Activate the user's subscription!
                await db.subscription.update({
                    where: { checkoutRequestId },
                    data: {
                        status: 'ACTIVE',
                        mpesaReceipt: receipt
                    }
                });

                // Automatically generate an empty product configuration "brain" for their new AI
                const existingConfig = await db.productConfig.findUnique({
                    where: { subscriptionId: pendingSub.id }
                });

                if (!existingConfig) {
                    await db.productConfig.create({
                        data: {
                            userId: pendingSub.userId,
                            subscriptionId: pendingSub.id,
                            systemPrompt: 'You are a helpful AI assistant.',
                            knowledgeBase: ''
                        }
                    });
                }
            } else {
                console.warn(`[webhook] Ignoring successful payment for unknown CheckoutRequestID: ${checkoutRequestId}`);
            }
        } else {
            // Safaricom ResultCode != 0 means FAILURE (e.g. user cancelled, insufficient funds)
            console.log(`[webhook] Payment Failed. Code: ${payload.ResultCode}. Desc: ${payload.ResultDesc}`);
            const checkoutRequestId = payload.CheckoutRequestID;

            // Delete the pending subscription since the payment failed
            await db.subscription.deleteMany({
                where: {
                    checkoutRequestId: checkoutRequestId,
                    status: 'INACTIVE' // Ensure we only delete unactivated ones
                }
            });
        }

        // Safaricom expects a success response regardless, or they will keep retrying the webhook
        return NextResponse.json({ success: true, message: 'Webhook processed' });

    } catch (error) {
        console.error('[mpesa-webhook] Error processing callback:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
