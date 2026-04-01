import { db } from '@/lib/db';
import { logger } from '@/lib/logger';
import { Prisma } from '@prisma/client';

export async function generateEmbedding(text: string, openaiApiKey: string): Promise<number[]> {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            input: text,
            model: 'text-embedding-3-small'
        })
    });

    if (!res.ok) {
        throw new Error(`OpenAI Embedding API error: ${await res.text()}`);
    }

    const data = await res.json();
    return data.data[0].embedding;
}

export async function saveMemory(userId: string, content: string, openaiApiKey: string, metadata: any = null) {
    try {
        const embedding = await generateEmbedding(content, openaiApiKey);
        const vectorString = `[${embedding.join(',')}]`;

        await db.$executeRaw`
            INSERT INTO "AgentMemory" ("id", "userId", "content", "embedding", "metadata", "createdAt")
            VALUES (
                gen_random_uuid(), 
                ${userId}, 
                ${content}, 
                ${vectorString}::vector, 
                ${metadata ? JSON.stringify(metadata) : Prisma.DbNull}::jsonb, 
                now()
            )
        `;
        logger.info(`Saved vector memory for user ${userId}`);
    } catch (e) {
        logger.error(`Failed to save memory: ${e}`);
    }
}

export interface MemoryResult {
    id: string;
    content: string;
    metadata: any;
    similarity: number;
}

export async function retrieveMemories(userId: string, query: string, openaiApiKey: string, limit = 5): Promise<MemoryResult[]> {
    try {
        const embedding = await generateEmbedding(query, openaiApiKey);
        const vectorString = `[${embedding.join(',')}]`;

        // Retrieve closest semantic matches using the <=> (cosine distance) operator
        const results = await db.$queryRaw<MemoryResult[]>`
            SELECT "id", "content", "metadata", 1 - ("embedding" <=> ${vectorString}::vector) as similarity
            FROM "AgentMemory"
            WHERE "userId" = ${userId}
            ORDER BY "embedding" <=> ${vectorString}::vector ASC
            LIMIT ${limit}
        `;

        return results;
    } catch (e) {
        logger.error(`Failed to retrieve memories: ${e}`);
        return [];
    }
}
