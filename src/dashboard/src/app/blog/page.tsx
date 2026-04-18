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

            {/* Subscribe CTA */}
            <section className="w-full max-w-4xl mx-auto px-8 pb-32">
                <div className="bg-[#0f172a] rounded-[32px] p-12 md:p-16 text-center text-white relative shadow-xl">
                    <h2 className="text-3xl md:text-4xl font-black mb-4">Get the Automation Edge</h2>
                    <p className="text-slate-400 max-w-lg mx-auto mb-8 font-medium text-sm md:text-base">Monthly deep-dives on enterprise AI, RAG architecture, and operational ROI frameworks — directly to your inbox.</p>
                    <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                        <input type="email" placeholder="your@company.com" required className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500 transition-colors text-white font-medium placeholder:text-white/30" />
                        <button className="bg-red-600 hover:bg-red-500 text-white font-black px-8 py-3 rounded-xl transition-colors">Subscribe</button>
                    </form>
                </div>
            </section>

            <Footer />
        </main>
    );
}
