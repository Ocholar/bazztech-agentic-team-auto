import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateEmbedding, retrieveMemories, saveMemory } from '../memory-service';

// Mock fetch for OpenAI API
global.fetch = vi.fn();

describe('Memory Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should generate an embedding from OpenAI', async () => {
        (fetch as any).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                data: [{ embedding: new Array(1536).fill(0.1) }]
            })
        });

        const embedding = await generateEmbedding('test text', 'mock-key');
        expect(embedding).toHaveLength(1536);
        expect(embedding[0]).toBe(0.1);
        expect(fetch).toHaveBeenCalledWith('https://api.openai.com/v1/embeddings', expect.any(Object));
    });

    it('should throw error if OpenAI returns non-ok response', async () => {
        (fetch as any).mockResolvedValue({
            ok: false,
            text: () => Promise.resolve('Rate limit exceeded')
        });

        await expect(generateEmbedding('test', 'key')).rejects.toThrow('OpenAI Embedding API error');
    });
});
