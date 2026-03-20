/**
 * Jenga API (Equity Bank) — Shared utilities
 * Handles authentication, signature generation, and API calls
 */

const JENGA_BASE_URL = 'https://api.finserve.africa';

const JENGA_MERCHANT_CODE = process.env.JENGA_MERCHANT_CODE!;
const JENGA_API_KEY = process.env.JENGA_API_KEY!;
const JENGA_CONSUMER_SECRET = process.env.JENGA_CONSUMER_SECRET!;

/**
 * Step 1: Get Bearer Access Token from Jenga OAuth2
 */
export async function getJengaToken(): Promise<string> {
    const response = await fetch(
        `${JENGA_BASE_URL}/v3-apis/authentication-api/v3.0/authenticate`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                merchantCode: JENGA_MERCHANT_CODE,
                consumerSecret: JENGA_CONSUMER_SECRET,
            }),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Jenga auth failed (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data.accessToken || data.access_token;
}

/**
 * Step 2: Generate Base64 signature for API requests
 * For Account Full Statement: accountNumber + countryCode + toDate
 */
export function generateSignature(
    accountNumber: string,
    countryCode: string,
    toDate: string
): string {
    // The Jenga API Key IS the signature for v3 when using consumer secret auth
    // For merchant-level API key auth, the API key itself serves as the signature
    const plaintext = `${accountNumber}${countryCode}${toDate}`;
    // Use base64 encoding of the plaintext as signature
    const signature = Buffer.from(plaintext).toString('base64');
    return signature;
}

/**
 * Step 3: Fetch Account Full Statement from Jenga
 */
export async function getAccountStatement(
    token: string,
    accountNumber: string,
    countryCode: string,
    fromDate: string,
    toDate: string
) {
    const signature = generateSignature(accountNumber, countryCode, toDate);

    const response = await fetch(
        `${JENGA_BASE_URL}/v3-apis/account-api/v3.0/accounts/fullStatement`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'signature': signature,
            },
            body: JSON.stringify({
                countryCode,
                accountNumber,
                fromDate,
                toDate,
            }),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Jenga statement failed (${response.status}): ${errorText}`);
    }

    return response.json();
}

/**
 * Format a Date to YYYY-MM-DD for Jenga API
 */
export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}
