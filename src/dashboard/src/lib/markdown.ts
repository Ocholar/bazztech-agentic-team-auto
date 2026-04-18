import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Point to the local content folder inside the Next.js project
const BLOGS_DIR = path.join(process.cwd(), 'src/content/blogs');

export interface PostMeta {
    title?: string;
    description?: string;
    keywords?: string;
    author?: string;
    date?: string; // Optional if we haven't added it
}

export interface Post {
    slug: string;
    meta: PostMeta;
    content: string;
}

export function getPostSlugs() {
    if (!fs.existsSync(BLOGS_DIR)) return [];
    return fs.readdirSync(BLOGS_DIR).filter(file => file.endsWith('.md'));
}

export function getPostBySlug(slug: string): Post | null {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(BLOGS_DIR, `${realSlug}.md`);
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return { 
        slug: realSlug, 
        meta: data as PostMeta, 
        content 
    };
}

export function getAllPosts(): Post[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        .filter((post): post is Post => post !== null);
    
    return posts;
}
