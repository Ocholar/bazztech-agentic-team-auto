import fetch from 'node-fetch';
import { loadSession } from './auth';

/**
 * Standard HTTP client for Bazz-CLI to hit the Dashboard API.
 * Injects x-user-id and x-cli-secret headers.
 */
export async function bazzRequest(endpoint: string, method = 'GET', body?: unknown) {
    const session = loadSession();
    const cliSecret = process.env.INTERNAL_CLI_SECRET || 'bazz_internal_dev_secret_2026';

    const res = await fetch(`${session.apiUrl}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.token}`,
            'x-cli-secret': cliSecret,
            'x-user-id': session.userId,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        let errText = await res.text();
        try {
            const json = JSON.parse(errText);
            if (json.error) errText = json.error;
        } catch { }
        throw new Error(`API Error (${res.status}): ${errText}`);
    }

    return res;
}
