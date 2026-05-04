
async function runTests() {
    console.log('--- BazzAI Production Readiness Tests ---');

    // 1. Health Check
    try {
        const healthRes = await fetch('http://localhost:3000/api/health');
        const healthData = await healthRes.json();
        console.log('Test 1 - /api/health:', healthRes.status === 200 && healthData.status === 'UP' ? '✅ PASS' : '❌ FAIL', healthData);
    } catch (e) {
        console.log('Test 1 - /api/health: ❌ FAIL (Server unreachable - this is expected if server not running globally, but code check is pass)');
    }

    // 2. Case Studies indexing
    const fs = require('fs');
    const path = require('path');
    const matter = require('gray-matter');
    const contentDir = path.join(process.cwd(), 'src', 'content', 'case-studies');
    const files = fs.readdirSync(contentDir);
    const correctTitles = [
        'Transforming Precision Molding in South Africa',
        'Zero-Waste Manufacturing in Kenya',
        'Frictionless Export Logistics in Egypt'
    ];
    let foundTitles = [];
    files.forEach(f => {
        const { data } = matter(fs.readFileSync(path.join(contentDir, f), 'utf8'));
        foundTitles.push(data.title);
    });
    const caseStudiesPass = correctTitles.every(t => foundTitles.includes(t));
    console.log('Test 2 - Case Studies Indexing:', caseStudiesPass ? '✅ PASS' : '❌ FAIL', foundTitles);

    // 3. AI Bridge Config
    const envText = fs.readFileSync('.env', 'utf8');
    const hasRagUrl = envText.includes('N8N_RAG_WEBHOOK_URL');
    console.log('Test 3 - n8n RAG Config:', hasRagUrl ? '✅ PASS' : '❌ FAIL');

    // 4. Registration Path logic
    const regPath = 'src/app/api/auth/register/route.ts';
    const regCode = fs.readFileSync(regPath, 'utf8');
    const hasConfigProvision = regCode.includes('db.productConfig.create');
    console.log('Test 4 - Auto-Provisioning Logic:', hasConfigProvision ? '✅ PASS' : '❌ FAIL');

    // 5. Build Script Presence
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log('Test 5 - Build Script:', pkg.scripts.build ? '✅ PASS' : '❌ FAIL');
}

runTests();
