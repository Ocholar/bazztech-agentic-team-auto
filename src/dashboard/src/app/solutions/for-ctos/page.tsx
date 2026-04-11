"use client";
import Link from 'next/link';
import { Bot, Shield, Zap, Database, GitBranch, ArrowRight, Check, Info } from 'lucide-react';

const AUDIT_URL = 'https://calendly.com/reagan-bazztech/30min';
const GH_URL = 'https://github.com/Ocholar/manufacturing-rag-system';

export default function ForCTOsPage() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            <header className="fixed top-0 w-full z-50 bg-white/96 backdrop-blur-sm border-b border-slate-100 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-white"><Bot size={18} /></div>
                        <span className="text-xl font-black">Bazz<span className="text-red-600">AI</span></span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/solutions/for-coos" className="text-sm font-semibold text-slate-500 hover:text-slate-900">For COOs</Link>
                        <Link href="/solutions/for-cfos" className="text-sm font-semibold text-slate-500 hover:text-slate-900">For CFOs</Link>
                        <Link href={AUDIT_URL} target="_blank" rel="noopener noreferrer"
                            className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700">Book Call</Link>
                    </div>
                </div>
            </header>

            <main className="pt-24">
                {/* HERO */}
                <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900 text-white">
                    <div className="max-w-5xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold mb-6">
                            🔧 For CTOs &amp; Engineering Leaders
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                            Agentic AI That Passes<br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-400">Your Engineering Review.</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mb-10">
                            Every BazzAI pipeline is production-deployable — with auditable architecture, clear autonomy boundaries, and integration patterns that slot into your existing stack without lock-in.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <Link href={GH_URL} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-slate-900 font-black hover:bg-slate-100 transition-all">
                                <GitBranch size={16} /> View Architecture on GitHub
                            </Link>
                            <Link href={AUDIT_URL} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white font-bold hover:bg-white/10 transition-all">
                                Book Technical Review <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* AUTONOMY LEVELS */}
                <section className="py-20 px-6 border-b border-slate-100">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black mb-3">Autonomy Transparency Framework</h2>
                            <p className="text-slate-500 max-w-xl mx-auto">We define and disclose the autonomy level of every agent we deploy — no vague claims, no agent washing.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-5">
                            {[
                                { level: 'L1', name: 'Human-Assisted', color: 'bg-blue-50 border-blue-200 text-blue-700', desc: 'AI recommends actions. Human reviews and approves each output before any action is taken.', example: 'Invoice review flagging — AI marks anomalies, accountant approves.' },
                                { level: 'L2', name: 'Human-in-the-Loop', color: 'bg-purple-50 border-purple-200 text-purple-700', desc: 'AI performs tasks autonomously in normal flow. Human oversees via dashboard and can intervene at any time.', example: 'Financial reconciliation — runs automatically, manager reviews weekly summary.' },
                                { level: 'L3', name: 'Conditional Autonomy', color: 'bg-orange-50 border-orange-200 text-orange-700', desc: 'AI operates fully within defined parameters. When a condition falls outside parameters, it escalates to a human.', example: 'Lead qualification — AI handles standard leads, routes enterprise inquiries to sales.' },
                                { level: 'L4', name: 'Fully Autonomous', color: 'bg-green-50 border-green-200 text-green-700', desc: 'AI operates independently with self-correction. No human approval needed in normal operation.', example: 'Scheduled reporting — AI pulls data, generates, formats, and sends reports on cron schedule.' },
                            ].map((a, i) => (
                                <div key={i} className={`border-2 rounded-[20px] p-6 ${a.color}`}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-black px-2 py-0.5 rounded-full border border-current">[{a.level}]</span>
                                        <span className="font-black">{a.name}</span>
                                    </div>
                                    <p className="text-sm mb-3 opacity-80">{a.desc}</p>
                                    <p className="text-xs font-semibold opacity-60 italic">Example: {a.example}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* TECH STACK */}
                <section className="py-20 px-6 bg-slate-50 border-b border-slate-100">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-black mb-10 text-center">Production-Ready Stack</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: <Database size={24} />, title: 'Vector & Storage', items: ['Pinecone (vector DB)', 'PostgreSQL + pgvector', 'Redis (caching)'] },
                                { icon: <Zap size={24} />, title: 'Orchestration', items: ['n8n (workflow engine)', 'Python FastAPI (custom nodes)', 'Vercel Cron (scheduling)'] },
                                { icon: <Shield size={24} />, title: 'LLM & Security', items: ['GPT-4o / GPT-4o-mini', 'OpenAI ZDR mode', 'Private Azure OpenAI option'] },
                            ].map((s, i) => (
                                <div key={i} className="bg-white border border-slate-200 rounded-[20px] p-6">
                                    <div className="text-red-600 mb-3">{s.icon}</div>
                                    <p className="font-black mb-3">{s.title}</p>
                                    <ul className="space-y-2">
                                        {s.items.map((it, j) => (
                                            <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                                                <Check size={13} className="text-green-500" /> {it}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECURITY LINK */}
                <section className="py-16 px-6 bg-slate-900 text-white text-center">
                    <p className="text-slate-400 mb-4">Need to review our full security posture before architectural sign-off?</p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/security" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-black hover:bg-slate-100">
                            <Shield size={16} /> View Security & Data Governance
                        </Link>
                        <Link href={AUDIT_URL} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-black hover:bg-red-700">
                            Book Technical Review <ArrowRight size={16} />
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
