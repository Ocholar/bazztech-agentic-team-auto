import { db } from './src/lib/db';

async function testConnection() {
    console.log('--- BazzAI CI/CD Gate: Verifying Database Connection ---');
    try {
        await db.$connect();
        console.log('✅ Database connection successful.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
}

testConnection();
