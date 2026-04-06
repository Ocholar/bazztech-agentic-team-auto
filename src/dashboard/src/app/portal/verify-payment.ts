"use server";

import { db } from '@/lib/db';
import { getPayPalOrderDetails } from '@/lib/paypal';
import { revalidatePath } from 'next/cache';

export async function verifyAndAllotSlots(orderId: string, userId: string) {
    try {
        // 1. Check if this order has already been processed
        const existingTx = await db.processedTransaction.findUnique({
            where: { transactionId: orderId }
        });

        if (existingTx) return { success: true, message: "Transaction already processed." };

        // 2. Fetch order details from PayPal
        const orderData = await getPayPalOrderDetails(orderId);

        if (orderData.status !== 'COMPLETED' && orderData.status !== 'APPROVED') {
            return { success: false, error: "Order not completed or approved." };
        }

        // 3. Extract quantity (we assume the description contains the slot count or we calculate by total / 49.99)
        const totalAmount = parseFloat(orderData.purchase_units[0].amount.value);
        const quantity = Math.round(totalAmount / 49.99);

        if (quantity < 1) return { success: false, error: "Invalid payment amount." };

        // 4. Update User Slots and record transaction atomically
        await db.$transaction([
            db.user.update({
                where: { id: userId },
                data: {
                    availableSlots: { increment: quantity }
                } as any
            }),
            db.processedTransaction.create({
                data: {
                    transactionId: orderId,
                    amount: totalAmount,
                    reference: `PAYPAL-SLOT-X${quantity}`
                }
            })
        ]);

        revalidatePath('/portal');
        return { success: true, quantity };
    } catch (error: any) {
        console.error("[verifyAndAllotSlots] Error:", error);
        return { success: false, error: error.message };
    }
}
