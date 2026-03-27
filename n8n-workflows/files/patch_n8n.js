const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("=============================================");
console.log(" BazzAI n8n Community Edition Patcher");
console.log("=============================================\n");
console.log("Since n8n Community blocks environment variables, we will hardcode your credentials directly into the workflow files locally.\n");

rl.question('1. Paste your INTERNAL_API_KEY from Vercel: ', (internalApiKey) => {
    rl.question('2. Paste your WHATSAPP_PHONE_ID from Meta: ', (phoneId) => {
        rl.question('3. Paste your WHATSAPP_SYSTEM_TOKEN from Meta: ', (systemToken) => {

            const files = [
                'bazz_flow_fixed.json',
                'bazz_connect_fixed.json',
                'bazz_doc_fixed.json',
                'bazz_lead_fixed.json'
            ];

            let successCount = 0;

            files.forEach(file => {
                const filePath = path.join(__dirname, file);
                if (fs.existsSync(filePath)) {
                    let content = fs.readFileSync(filePath, 'utf-8');

                    // Replace n8n $vars syntax directly with the hardcoded strings
                    content = content.replaceAll("={{ $vars.INTERNAL_API_KEY }}", internalApiKey);
                    content = content.replaceAll("={{ $vars.WHATSAPP_PHONE_ID }}", phoneId);
                    content = content.replaceAll("={{ $vars.WHATSAPP_SYSTEM_TOKEN }}", systemToken);

                    fs.writeFileSync(filePath, content, 'utf-8');
                    console.log(`✅ Patched: ${file}`);
                    successCount++;
                } else {
                    console.error(`❌ Missing file: ${file}`);
                }
            });

            console.log(`\n🎉 Successfully hardcoded your keys into ${successCount} workflow files!`);
            console.log("You can now go to n8n, click 'Import from file', and upload all 4 of these files. They will work flawlessly on the free tier.");

            rl.close();
        });
    });
});
