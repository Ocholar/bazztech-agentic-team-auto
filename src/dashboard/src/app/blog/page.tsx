import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';

export const metadata = {
    title: "Thought Leadership & AI Automation Blog | BazzAI",
    description: "Read the latest insights on enterprise AI, RAG architecture, and workflow automation from the team at BazzAI."
};

export default function BlogIndex() {
    const posts = getAllPosts();

    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header />
            
            {/* Hero */}
            <div className="pt-32 pb-20 px-8 w-full max-w-5xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full font-black text-[10px] uppercase tracking-widest mb-6">
                    BazzAI Engineering & Strategy
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">The Autonomous Enterprise</h1>
                <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium leading-relaxed">
                    Zero-fluff insights on deploying agentic workflows, removing vendor lock-in, and driving massive ROI with AI automation.
                </p>
            </div>

            {/* Grid */}
            <div className="pb-32 px-8 w-full max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all flex flex-col items-start overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="p-3 bg-red-50 text-red-600 rounded-full">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                </div>
                            </div>
                            
                            <h2 className="text-xl font-black mb-4 group-hover:text-red-600 transition-colors">{post.meta.title || post.slug}</h2>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 flex-1">
                                {post.meta.description || "Read this deep-dive into enterprise AI automation."}
                            </p>
                            
                            <div className="mt-auto flex items-center justify-between w-full pt-6 border-t border-slate-100">
                                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                                    By {post.meta.author || "BazzAI Team"}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
