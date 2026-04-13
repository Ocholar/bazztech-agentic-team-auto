import { ArrowRight, Code2, Database, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ForCTOs() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-slate-50 text-slate-900 pb-24">

            {/* Hero Section */}
            <div className="w-full bg-slate-900 text-white pt-32 pb-20 px-8 relative overflow-hidden">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                            For CTOs & Engineering Leaders
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
                            Ship AI Workflows Without the Technical Debt.
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 font-medium mb-10 leading-relaxed">
                            Stop wasting engineering sprints building internal tools from scratch. Deploy secure, domain-aware RAG pipelines and logic orchestrations in weeks—not months.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all shadow-lg flex items-center justify-center gap-2" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                                <Code2 size={20} /> Request Technical Audit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Objections/Solutions */}
            <section className="w-full max-w-5xl px-8 py-20">
                <h2 className="text-3xl font-black mb-12 text-center text-slate-900">The Engineering Bottlenecks We Remove</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                        <Database className="text-blue-600 mb-4" size={32} />
                        <h3 className="text-xl font-black mb-3">Pinecone Vector Setup & Tuning</h3>
                        <p className="text-slate-600">You don't need to hire a full-time ML Engineer just to index your internal docs. We handle the semantic chunking, embedding generation, and vector retrieval architecture.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                        <Zap className="text-amber-500 mb-4" size={32} />
                        <h3 className="text-xl font-black mb-3">n8n Logic Orchestration</h3>
                        <p className="text-slate-600">We bypass brittle custom Python scripts by leveraging n8n for enterprise-grade API orchestration, ensuring 99.9% uptime and easy webhook management.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                        <ShieldCheck className="text-emerald-500 mb-4" size={32} />
                        <h3 className="text-xl font-black mb-3">SOC 2 Ready & Data Privacy</h3>
                        <p className="text-slate-600">Your proprietary data never trains public LLMs. We implement strict zero-retention policies on API calls and offer self-hosted LLM pathways for extreme compliance.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                        <ArrowRight className="text-red-500 mb-4" size={32} />
                        <h3 className="text-xl font-black mb-3">Zero Infrastructure Lock-In</h3>
                        <p className="text-slate-600">We build on standard open-source tools (Python, FastAPI, Postgres). If you decide to take the system fully in-house, the transition is frictionless.</p>
                    </div>
                </div>
            </section>

            {/* Architecture Focus */}
            <section className="w-full max-w-4xl px-8 pb-20">
                <div className="bg-slate-900 text-white rounded-[32px] p-10 text-center shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Code2 size={120} />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight mb-4 relative z-10">See Our Code In Action</h2>
                    <p className="text-slate-300 mb-8 max-w-lg mx-auto relative z-10">
                        Explore our Redwood Finance Automation and Defect Detection Pipeline templates directly on GitHub. We write clean, stateless, event-driven integrations.
                    </p>
                    <Link href="/case-studies" className="inline-block px-8 py-4 bg-white text-slate-900 font-black rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95 relative z-10">
                        View Technical Architecture
                    </Link>
                </div>
            </section>
        </main>
    );
}
