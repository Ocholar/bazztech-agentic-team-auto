const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
    console.log("Testing DIRECT_URL:", process.env.DIRECT_URL);
    const client = new Client({
        connectionString: process.env.DIRECT_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log("SUCCESS: Connected to database!");
        const res = await client.query('SELECT NOW()');
        console.log("Server time:", res.rows[0].now);
        await client.end();
    } catch (err) {
        console.error("FAILURE: Could not connect to database.");
        console.error(err);
    }
}

testConnection();
