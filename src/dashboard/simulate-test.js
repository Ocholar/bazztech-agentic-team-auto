const http = require('http');

const data = JSON.stringify({
    type: 'NEW_LEAD',
    data: {
        name: 'Test Customer',
        phone: '254700000000',
        email: 'test@bazztech.co.ke',
        details: 'End-to-end verification of n8n -> Dashboard flow'
    }
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/webhook',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'x-api-key': 'bz_prod_937_sync_8822'
    }
};

const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
