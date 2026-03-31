import fs from 'fs';
import path from 'path';
import os from 'os';

export interface BazzSession {
    userId: string;
    token: string;
    apiUrl: string;
}

const CONFIG_PATH = path.join(os.homedir(), '.bazzrc');

export function saveSession(session: BazzSession): void {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(session, null, 2));
}

export function loadSession(): BazzSession {
    if (!fs.existsSync(CONFIG_PATH)) {
        throw new Error('Not authenticated. Please run `bazz init` first.');
    }
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
}

export function clearSession(): void {
    if (fs.existsSync(CONFIG_PATH)) fs.unlinkSync(CONFIG_PATH);
}
