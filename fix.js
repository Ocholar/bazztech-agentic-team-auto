const fs = require('fs');

const files = [
    'src/dashboard/src/app/solutions/for-ctos/page.tsx',
    'src/dashboard/src/app/security/page.tsx',
    'src/dashboard/src/app/case-studies/dakri-cartons/page.tsx',
    'src/dashboard/src/app/roadmap/page.tsx',
    'src/dashboard/src/app/case-studies/page.tsx',
    'src/dashboard/src/app/blog/page.tsx',
    'src/dashboard/src/app/integrations/page.tsx'
];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('use client')) {
        fs.writeFileSync(file, '\"use client\";\n' + content);
        console.log('Added use client to ' + file);
    }
}

const apiFiles = [
    'src/dashboard/src/app/api/cli/doctor/route.ts',
    'src/dashboard/src/app/api/insurance/verify/route.ts'
];
for (const file of apiFiles) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('force-dynamic')) {
        fs.writeFileSync(file, "export const dynamic = 'force-dynamic';\n" + content);
        console.log('Added force-dynamic to ' + file);
    }
}
