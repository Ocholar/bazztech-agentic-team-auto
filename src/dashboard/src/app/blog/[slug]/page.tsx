import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPostBySlug, getPostSlugs } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
    const slugs = getPostSlugs();
    return slugs.map((slug) => ({
        slug: slug.replace(/\.md$/, ''),
    }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);
    if (!post) return { title: 'Not Found' };
    return {
        title: `${post.meta.title} | BazzAI Blog`,
        description: post.meta.description,
        keywords: post.meta.keywords,
    };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white font-sans text-slate-900">
            <Header />
            
            <article className="pt-32 pb-24 px-6 md:px-8 w-full max-w-3xl mx-auto">
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-red-600 transition-colors mb-10">
                    <ArrowLeft size={16} /> Back to Blog
                </Link>
                
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
                        {post.meta.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-8">
                        <span>By {post.meta.author || "Reagan Ochola"}</span>
                    </div>
                </header>
                
                <div className="prose prose-lg prose-slate prose-headings:font-black prose-a:text-red-600 prose-a:font-bold hover:prose-a:underline max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.content}
                    </ReactMarkdown>
                </div>
                
                <div className="mt-16 pt-12 border-t border-slate-100 bg-slate-50 -mx-6 md:-mx-8 px-6 md:px-8 pb-12 text-center rounded-3xl">
                    <h2 className="text-2xl font-black mb-4">Ready to automate your operations?</h2>
                    <p className="text-slate-500 font-medium mb-8">Stop paying for manual data entry. Let BazzAI map a custom RAG workflow for your business today.</p>
                    <Link href="/pricing" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl transition-colors shadow-lg shadow-red-600/20">
                        Book a Free Assessment
                    </Link>
                </div>
            </article>

            <Footer />
        </main>
    );
}
