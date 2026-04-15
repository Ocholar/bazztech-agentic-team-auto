"use client";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';

const posts = [
    {
        tag: 'RAG Architecture',
        date: 'April 2026',
        title: 'Why Most Enterprise RAG Pipelines Fail After 90 Days — and How to Fix It',
        excerpt: 'The hidden issue is not the model — it\'s data drift. When your internal documents update, your vector index doesn\'t. Here\'s how we solve it at BazzAI using continuous re-embedding pipelines.',
        slug: 'enterprise-rag-failure-modes',
        readTime: '8 min read',
    },
    {
        tag: 'Operational Efficiency',
        date: 'March 2026',
        title: 'The Real Cost of Manual Reconciliation: A CFO\'s Hidden $100k Problem',
        excerpt: 'Most CFOs underestimate how much manual ledger reconciliation actually costs when you factor in error correction, delayed closes, and the opportunity cost of finance staff time.',
        slug: 'manual-reconciliation-true-cost',
        readTime: '6 min read',
    },
    {
        tag: 'Manufacturing AI',
        date: 'March 2026',
        title: 'How Holt-Winters Forecasting Eliminated 16 Stockouts Per Month at Dakri Cartons',
        excerpt: 'A technical walkthrough of the Triple Exponential Smoothing model we deployed over real factory inventory data — and the n8n orchestration layer that made it autonomous.',
        slug: 'holt-winters-manufacturing-forecasting',
        readTime: '10 min read',
    },
    {
        tag: 'AI Strategy',
        date: 'February 2026',
        title: 'Build vs Buy vs BazzAI: The 2026 Enterprise Decision Framework',
        excerpt: 'Hiring 3 ML engineers or buying a $200k SaaS license are not your only options. Here\'s how we position against both in an honest, data-driven way.',
        slug: 'build-vs-buy-vs-bazzai',
        readTime: '7 min read',
    },
    {
        tag: 'n8n Workflows',
        date: 'February 2026',
        title: 'Why We Chose n8n Over Apache Airflow for Our Enterprise Orchestration Layer',
        excerpt: 'Airflow is powerful — but it\'s also operationally heavy. For event-driven, API-heavy enterprise automation at scale, n8n edges it out on every metric that matters in 2026.',
        slug: 'n8n-vs-airflow-enterprise',
        readTime: '9 min read',
    },
    {
        tag: 'Computer Vision',
        date: 'January 2026',
        title: 'From Camera Feed to WhatsApp Alert in 400ms: Our Defect Detection Architecture',
        excerpt: 'A technical deep-dive into the real-time computer vision pipeline we built for production line quality control — OpenCV, FastAPI, and WhatsApp Business API working in concert.',
        slug: 'defect-detection-pipeline-deep-dive',
        readTime: '12 min read',
    },
];

const tagColors: Record<string, string> = {
    'RAG Architecture': 'bg-blue-50 text-blue-700 border-blue-200',
    'Operational Efficiency': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Manufacturing AI': 'bg-orange-50 text-orange-700 border-orange-200',
    'AI Strategy': 'bg-purple-50 text-purple-700 border-purple-200',
    'n8n Workflows': 'bg-pink-50 text-pink-700 border-pink-200',
    'Computer Vision': 'bg-red-50 text-red-700 border-red-200',
};

export default function BlogIndex() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-slate-50 text-slate-900 pb-24">
            <Header />

            {/* Hero */}
            <div className="w-full bg-slate-900 text-white pt-32 pb-20 px-8 relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-96 h-64 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-slate-300 text-[10px] font-black uppercase tracking-widest mb-6">
                        Thought Leadership
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Insights From the Automation Frontier</h1>
                    <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                        Technical depth. Practical ROI frameworks. No fluff. Written by the engineers and strategists building enterprise AI for Africa and beyond.
                    </p>
                </div>
            </div>

            {/* Featured Post */}
            <section className="w-full max-w-5xl px-8 py-16">
                <div className="bg-white border-2 border-red-100 rounded-[32px] p-10 md:p-14 shadow-lg flex flex-col md:flex-row gap-10 items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-black border ${tagColors[posts[2].tag]}`}>{posts[2].tag}</span>
                            <span className="text-slate-400 text-xs font-medium">{posts[2].date} · {posts[2].readTime}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">{posts[2].title}</h2>
                        <p className="text-slate-600 leading-relaxed mb-8">{posts[2].excerpt}</p>
                        <Link href={`/blog/${posts[2].slug}`} className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl text-sm transition-colors">
                            Read Article <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="md:w-48 shrink-0">
                        <div className="w-full aspect-square bg-gradient-to-br from-orange-600 to-red-700 rounded-3xl shadow-xl flex items-center justify-center text-6xl select-none">
                            🏭
                        </div>
                    </div>
                </div>
            </section>

            {/* All Posts */}
            <section className="w-full max-w-5xl px-8 pb-20">
                <h2 className="text-2xl font-black mb-8">All Articles</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {posts.map((p, i) => i !== 2 && (
                        <Link key={i} href={`/blog/${p.slug}`} className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all block">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-black border ${tagColors[p.tag]}`}>{p.tag}</span>
                                <span className="text-slate-400 text-xs font-medium">{p.readTime}</span>
                            </div>
                            <h3 className="text-lg font-black mb-3 tracking-tight">{p.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">{p.excerpt}</p>
                            <span className="text-red-600 text-sm font-black flex items-center gap-1">Read More <ArrowRight size={14} /></span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="w-full max-w-4xl px-8">
                <div className="bg-slate-900 text-white rounded-[32px] p-12 text-center shadow-xl">
                    <h2 className="text-2xl font-black mb-3">Get the Automation Edge</h2>
                    <p className="text-slate-400 mb-6 max-w-lg mx-auto text-sm font-medium">
                        Monthly deep-dives on enterprise AI, RAG architecture, and operational ROI frameworks — directly to your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="your@company.com" className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-500 text-sm outline-none focus:border-red-500 transition-colors" />
                        <button type="submit" className="px-6 py-3 bg-red-600 hover:bg-red-500 font-black text-white rounded-xl text-sm transition-colors whitespace-nowrap">Subscribe</button>
                    </form>
                </div>
            </section>
        </main>
    );
}
