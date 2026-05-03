import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Point to the local content folder inside the Next.js project
const CONTENT_DIR = path.join(process.cwd(), 'src/content');

export interface PostMeta {
    title?: string;
    description?: string;
    keywords?: string;
    author?: string;
    date?: string;
    client?: string;
    location?: string;
    industry?: string;
    hero_image?: string;
    roi?: string;
    summary?: string;
}

export interface Post {
    slug: string;
    meta: PostMeta;
    content: string;
}

export function getSlugs(subDir: string) {
    const dir = path.join(CONTENT_DIR, subDir);
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(file => file.endsWith('.md'));
}

export function getBySlug(subDir: string, slug: string): Post | null {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(CONTENT_DIR, subDir, `${realSlug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        meta: data as PostMeta,
        content
    };
}

export function getAll(subDir: string): Post[] {
    const slugs = getSlugs(subDir);
    const items = slugs
        .map((slug) => getBySlug(subDir, slug))
        .filter((item): item is Post => item !== null);

    return items;
}
