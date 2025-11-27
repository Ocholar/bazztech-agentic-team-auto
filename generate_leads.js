const https = require('https');

const data = JSON.stringify({
    type: "NEW_LEAD",
    data: {
        name: "Sarp Tecimer",
        phone: "+254700000000",
        email: "contact@sarptecimer.com",
        source: "APIFY_LINKEDIN",
        tags: "DEBUG_INFO_KEYS, fullname, first_name, last_name, headline, public_identifier, profile_url, profile_picture_url, about, location, creator_hashtags, is_creator, is_influencer, is_premium, open_to_work, created_timestamp",
        preferredPackage: "5G_30Mbps",
        installationTown: "Nairobi",
        deliveryLocation: "Unknown Company",
        preferredDate: null,
        preferredTime: "Morning"
    }
});

const options = {
    hostname: 'bazztech-agentic-team-auto-production-047d.up.railway.app',
    port: 443,
    path: '/api/webhook',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
