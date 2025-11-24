const https = require('https');

const leads = [
    {
        type: 'NEW_LEAD',
        data: {
            name: 'John Doe',
            phone: '+254712345678',
            alternativePhone: '+254722345678',
            email: 'john.doe@example.com',
            source: 'MANUAL_TEST',
            preferredPackage: '5G_30Mbps',
            installationTown: 'Nairobi',
            deliveryLocation: 'Westlands',
            preferredTime: 'Morning'
        }
    },
    {
        type: 'NEW_LEAD',
        data: {
            name: 'Jane Smith',
            phone: '+254733345678',
            alternativePhone: '+254744345678',
            email: 'jane.smith@example.com',
            source: 'MANUAL_TEST',
            preferredPackage: '5G_15Mbps',
            installationTown: 'Mombasa',
            deliveryLocation: 'Nyali',
            preferredTime: 'Afternoon'
        }
    }
];

const url = 'https://bazztech-agentic-team-auto.up.railway.app/api/webhook'; // Best guess URL

leads.forEach((lead, index) => {
    const data = JSON.stringify(lead);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(url, options, (res) => {
        console.log(`Lead ${index + 1} Status: ${res.statusCode}`);
        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.on('error', (e) => {
        console.error(`Lead ${index + 1} Error: ${e.message}`);
    });

    req.write(data);
    req.end();
});
