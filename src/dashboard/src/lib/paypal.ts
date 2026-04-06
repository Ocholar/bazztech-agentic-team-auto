export async function getPayPalAccessToken() {
    const auth = Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch(`${process.env.PAYPAL_API_URL || 'https://api-m.paypal.com'}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    const data = await response.json();
    return data.access_token;
}

export async function capturePayPalOrder(orderId: string) {
    const accessToken = await getPayPalAccessToken();
    const response = await fetch(
        `${process.env.PAYPAL_API_URL || 'https://api-m.paypal.com'}/v2/checkout/orders/${orderId}/capture`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    return await response.json();
}

export async function getPayPalOrderDetails(orderId: string) {
    const accessToken = await getPayPalAccessToken();
    const response = await fetch(
        `${process.env.PAYPAL_API_URL || 'https://api-m.paypal.com'}/v2/checkout/orders/${orderId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    return await response.json();
}
