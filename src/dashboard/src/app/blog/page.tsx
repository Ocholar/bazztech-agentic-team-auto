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
        <main className="min-h-screen text-[#A0AEC0]" style={{ background: '#0F1419', fontFamily: 'Inter, sans-serif' }}>
            <Header />

            {/* Hero */}
            <div className="pt-32 pb-20 px-8 w-full max-w-5xl mx-auto text-center border-b border-slate-800 relative z-10">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, #E07A5F, transparent 60%)' }} />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest mb-6" style={{ background: 'rgba(224,122,95,0.1)', color: '#E07A5F', border: '1px solid rgba(224,122,95,0.3)' }}>
                    BazzAI Engineering & Strategy
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>The Autonomous Enterprise</h1>
                <p className="max-w-2xl mx-auto text-lg text-slate-400 font-medium leading-relaxed">
                    Zero-fluff insights on deploying agentic workflows, machine failure predictions, and driving massive ROI with AI augmentation.
                </p>
            </div>

            {/* Grid */}
            <div className="py-24 px-8 w-full max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative border p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-start overflow-hidden" style={{ background: '#1A202C', borderColor: '#2D3748' }}>
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="p-3 rounded-full" style={{ background: 'rgba(129,178,154,0.1)', color: '#81B29A' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </div>
                            </div>

                            <h2 className="text-xl font-black mb-4 text-[#F4F1DE] transition-colors">{post.meta.title || post.slug}</h2>
                            <p className="text-sm text-slate-400 font-medium leading-relaxed mb-6 flex-1">
                                {post.meta.description || "Read this deep-dive into enterprise AI automation."}
                            </p>

                            <div className="mt-auto flex items-center justify-between w-full pt-6 border-t border-slate-800">
                                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E07A5F]">
                                    {post.meta.date ? `${new Date(post.meta.date).toLocaleDateString()} — ` : ''}{post.meta.author || "BazzAI Team"}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Subscribe CTA */}
            <section className="w-full max-w-4xl mx-auto px-8 pb-32">
                <div className="rounded-[32px] p-12 md:p-16 text-center text-white relative shadow-xl border border-slate-700" style={{ background: '#141A23' }}>
                    <h2 className="text-3xl md:text-4xl font-black mb-4 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Get the Automation Edge</h2>
                    <p className="text-slate-400 max-w-lg mx-auto mb-8 font-medium text-sm md:text-base">Monthly deep-dives on predictive maintenance, RAG architecture, and operational ROI frameworks — directly to your inbox.</p>
                    <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                        <input type="email" placeholder="your@company.com" required className="flex-1 bg-[#1A202C] border border-slate-700 rounded-xl px-4 py-3 outline-none transition-colors text-white font-medium placeholder:text-slate-600 focus:border-[#E07A5F]" />
                        <button className="text-white font-black px-8 py-3 rounded-xl transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}>Subscribe</button>
                    </form>
                </div>
            </section>

            <Footer />
        </main>
    );
}
