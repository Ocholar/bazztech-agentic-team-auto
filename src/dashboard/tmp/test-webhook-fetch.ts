async function testWebhook() {
    console.log('Simulating Meta Webhook POST via Fetch...');

    const payload = {
        object: 'whatsapp_business_account',
        entry: [{
            id: '880774405122197',
            changes: [{
                value: {
                    messaging_product: 'whatsapp',
                    metadata: {
                        display_phone_number: '15558219787',
                        phone_number_id: '880774405122197'
                    },
                    contacts: [{ profile: { name: 'Test' }, wa_id: '254781751937' }],
                    messages: [{
                        from: '254781751937',
                        id: 'wamid.HBgLMjU0NzgxNzUxOTM3FQIAERgSRTIxRDBCQjVGRUM5ODEzN0E0AA==',
                        timestamp: '1712071620',
                        text: { body: 'Ping from Simulation - Fetch' },
                        type: 'text'
                    }]
                },
                field: 'messages'
            }]
        }]
    };

    try {
        const response = await fetch('https://www.bazztech.co.ke/api/webhook/whatsapp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        console.log('Response Status:', response.status);
        const data = await response.json();
        console.log('Response Data:', data);
    } catch (error: any) {
        console.log('Error:', error.message);
    }
}

testWebhook();
