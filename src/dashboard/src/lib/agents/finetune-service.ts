import { db } from '@/lib/db';
import { logger } from '@/lib/logger';

interface FineTuneMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface FineTuneConversation {
    messages: FineTuneMessage[];
}

/**
 * Autonomous Fine-Tuning Service
 * Handles extracting AgentMemory interactions and preparing them for
 * OpenAI fine-tuning jobs (gpt-4o-mini).
 */
export async function exportMemoriesToJSONL(userId: string): Promise<string> {
    const memories = await db.agentMemory.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' },
    });

    const conversations: FineTuneConversation[] = memories.map((m) => {
        // We assume memory content follows: "Task: ... \nOutcome: ..."
        const parts = m.content.split('\nOutcome: ');
        const task = parts[0]?.replace('Task: ', '') || 'Unknown task';
        const outcome = parts[1] || 'No outcome recorded';

        return {
            messages: [
                { role: 'system', content: 'You are a specialized BazzAI agent assistant for an MSME tenant.' },
                { role: 'user', content: task },
                { role: 'assistant', content: outcome },
            ],
        };
    });

    return conversations.map((c) => JSON.stringify(c)).join('\n');
}

/**
 * Submits a JSONL export to OpenAI for fine-tuning.
 * Requires the tenant's OpenAI API Key.
 */
export async function startFineTuningJob(userId: string, jsonlContent: string, openaiApiKey: string) {
    try {
        // 1. Upload File
        const fileContent = new Blob([jsonlContent], { type: 'application/jsonl' });
        const formData = new FormData();
        formData.append('file', fileContent, `tuning-${userId}.jsonl`);
        formData.append('purpose', 'fine-tune');

        const fileRes = await fetch('https://api.openai.com/v1/files', {
            method: 'POST',
            headers: { Authorization: `Bearer ${openaiApiKey}` },
            body: formData,
        });

        if (!fileRes.ok) throw new Error(`File upload failed: ${await fileRes.text()}`);
        const fileData = await fileRes.json();

        // 2. Create Fine-Tuning Job
        const jobRes = await fetch('https://api.openai.com/v1/fine_tuning/jobs', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                training_file: fileData.id,
                model: 'gpt-4o-mini-2024-07-18',
            }),
        });

        if (!jobRes.ok) throw new Error(`Job creation failed: ${await jobRes.text()}`);
        const jobData = await jobRes.json();

        await db.auditLog.create({
            data: {
                event: 'FINETUNE_JOB_STARTED',
                userId,
                detail: JSON.stringify({ jobId: jobData.id, fileId: fileData.id }),
            },
        });

        return jobData;
    } catch (error: any) {
        logger.error('[finetune-service] Job Start Error', error);
        throw error;
    }
}
