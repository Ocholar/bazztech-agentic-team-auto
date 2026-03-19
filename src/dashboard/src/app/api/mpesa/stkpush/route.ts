import { auth } from '../../../../../auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// Safaricom Daraja API configuration
const DARAJA_CONSUMER_KEY = process.env.DARAJA_CONSUMER_KEY!;
const DARAJA_CONSUMER_SECRET = process.env.DARAJA_CONSUMER_SECRET!;
const DARAJA_PASSKEY = process.env.DARAJA_PASSKEY!;
const DARAJA_BUSINESS_SHORTCODE = process.env.DARAJA_BUSINESS_SHORTCODE!;
// Test API URL vs Prod URL
const DARAJA_API_URL = process.env.NODE_ENV === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';

/**
 * Generate an OAuth Access Token from Daraja
 */
async function generateAccessToken() {
    const authString = Buffer.from(`${DARAJA_CONSUMER_KEY}:${DARAJA_CONSUMER_SECRET}`).toString('base64');
    const req = await fetch(`${DARAJA_API_URL}/oauth/v1/generate?grant_type=client_credentials`, {
        headers: { 'Authorization': `Basic ${authString}` }
    });
    const res = await req.json();
    return res.access_token;
}

/**
 * POST /api/mpesa/stkpush
 * Called by the Dashboard Checkout UI to prompt the client's phone for payment via M-Pesa.
 */
export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { phoneNumber, amount, productType } = body;

        // Clean phone number (e.g., convert 0722123456 to 254722123456)
        let formattedPhone = phoneNumber.replace(/[^0-9]/g, '');
        if (formattedPhone.startsWith('0')) {
            formattedPhone = `254${formattedPhone.substring(1)}`;
        }
        if (formattedPhone.startsWith('+')) {
            formattedPhone = formattedPhone.substring(1);
        }

        // Generate Daraja token and password
        const accessToken = await generateAccessToken();
        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').substring(0, 14);
        const password = Buffer.from(
            `${DARAJA_BUSINESS_SHORTCODE}${DARAJA_PASSKEY}${timestamp}`
        ).toString('base64');

        // Formulate STK Push Request
        const stkPayload = {
            BusinessShortCode: DARAJA_BUSINESS_SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline', // or CustomerBuyGoodsOnline depending on shortcode
            Amount: amount,
            PartyA: formattedPhone,
            PartyB: DARAJA_BUSINESS_SHORTCODE,
            PhoneNumber: formattedPhone,
            CallBackURL: `${process.env.NEXTAUTH_URL}/api/mpesa/webhook`,
            AccountReference: `Bazztech ${productType}`,
            TransactionDesc: `Subscription for ${productType}`
        };

        const pushReq = await fetch(`${DARAJA_API_URL}/mpesa/stkpush/v1/processrequest`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stkPayload)
        });

        const pushRes = await pushReq.json();

        // If Safaricom accepts the request, they return a CheckoutRequestID
        if (pushRes.ResponseCode === '0' && pushRes.CheckoutRequestID) {
            // Save a pending subscription to the DB so the webhook has something to activate
            await db.subscription.create({
                data: {
                    userId: session.user.id,
                    productType: productType,
                    status: 'INACTIVE', // Waiting for webhook to mark ACTIVE
                    checkoutRequestId: pushRes.CheckoutRequestID,
                    mpesaPhone: formattedPhone,
                    amountPaid: parseFloat(amount)
                }
            });

            return NextResponse.json({
                success: true,
                message: 'STK Push sent to phone',
                checkoutRequestId: pushRes.CheckoutRequestID
            });
        }

        // Safaricom rejected the STK Push payload
        return NextResponse.json({
            error: 'Failed to initiate M-Pesa prompt',
            safaricomError: pushRes
        }, { status: 400 });

    } catch (error) {
        console.error('[stkpush] Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
