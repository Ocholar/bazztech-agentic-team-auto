import { CoordinatorAgent } from './coordinator-agent';
import { AgentContext, AgentResult } from './base-agent';
import { logger } from '@/lib/logger';

/**
 * Bazz-Voice Service
 * Handles audio processing, transcription, and real-time voice interactions.
 * Connects WhatsApp voice notes to the BazzAI Agent Swarm.
 */
export class VoiceService {
    /**
     * Entry point for a WhatsApp Voice Note (Audio URL).
     * 1. Transcribes the audio (Whisper/Realtime).
     * 2. Pipelines the transcript to the CoordinatorAgent.
     * 3. (Optional) Synthesizes the result back to audio.
     */
    static async processVoiceNote(audioUrl: string, ctx: AgentContext): Promise<AgentResult & { audioResponseUrl?: string }> {
        try {
            logger.info(`[voice-service] Processing voice note from ${audioUrl}`);

            const openaiApiKey = ctx.productConfig?.openaiApiKey;
            if (!openaiApiKey) throw new Error('MISSING_API_KEY');

            // 1. Transcription (Whisper v1 used for stability in serverless/Node environments)
            // In a production "Realtime" scenario, this would be a persistent WebSocket stream.
            const transcript = await this.transcribeAudio(audioUrl, openaiApiKey);
            logger.info(`[voice-service] Transcript: "${transcript}"`);

            // 2. Invoke the BazzAI Swarm
            const coordinator = new CoordinatorAgent();
            const result = await coordinator.run({
                ...ctx,
                task: transcript,
            });

            // 3. Text-to-Speech (MSME owners often prefer spoken confirmations)
            let audioResponseUrl: string | undefined;
            if (result.success) {
                audioResponseUrl = await this.synthesizeSpeech(result.summary, openaiApiKey);
            }

            return {
                ...result,
                audioResponseUrl,
            };
        } catch (error: any) {
            logger.error('[voice-service] Failed to process voice note', error);
            return {
                success: false,
                summary: 'Voice processing failed. Please try again or type your message.',
                error: error.message,
            };
        }
    }

    private static async transcribeAudio(url: string, apiKey: string): Promise<string> {
        // Mock download + Whisper API call
        // we'll assume the URL pointing to a .ogg or .m4a file from WhatsApp
        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: 'whisper-1',
                // file: url, // In reality, we'd fetch the buffer and append to FormData
            }),
        });

        // Simulating the result for the BazzAI environment
        return `TRANSCRIPT_OF_${url}`;
    }

    private static async synthesizeSpeech(text: string, apiKey: string): Promise<string> {
        const response = await fetch('https://api.openai.com/v1/audio/speech', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'tts-1',
                input: text,
                voice: 'alloy',
            }),
        });

        // Returns an MP3 URL (Mocked for this prototype)
        return `https://bazzai-voice-store.s3.amazonaws.com/res-${Date.now()}.mp3`;
    }
}
