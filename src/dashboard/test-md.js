const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

function getSlugs(subDir) {
    const dir = path.join(CONTENT_DIR, subDir);
    if (!fs.existsSync(dir)) {
        console.log(`Directory not found: ${dir}`);
        return [];
    }
    return fs.readdirSync(dir).filter(file => file.endsWith('.md'));
}

const slugs = getSlugs('case-studies');
console.log('Slugs found:', slugs);

slugs.forEach(slug => {
    const fullPath = path.join(CONTENT_DIR, 'case-studies', slug);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    console.log(`- ${slug}:`, data.title);
});
