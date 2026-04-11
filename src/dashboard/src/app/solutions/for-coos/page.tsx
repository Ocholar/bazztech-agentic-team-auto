"use client";
import Link from 'next/link';
import { Bot, Users, TrendingUp, ArrowRight, Check, Clock, BarChart2, Layers } from 'lucide-react';

const AUDIT_URL = 'https://calendly.com/reagan-bazztech/30min';

export default function ForCOOsPage() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            <header className="fixed top-0 w-full z-50 bg-white/96 backdrop-blur-sm border-b border-slate-100 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-white"><Bot size={18} /></div>
                        <span className="text-xl font-black">Bazz<span className="text-red-600">AI</span></span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/solutions/for-ctos" className="text-sm font-semibold text-slate-500 hover:text-slate-900">For CTOs</Link>
                        <Link href="/solutions/for-cfos" className="text-sm font-semibold text-slate-500 hover:text-slate-900">For CFOs</Link>
                        <Link href={AUDIT_URL} target="_blank" rel="noopener noreferrer"
                            className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700">Book Call</Link>
                    </div>
                </div>
            </header>

            <main className="pt-24">
                {/* HERO */}
                <section className="py-20 px-6 bg-gradient-to-b from-slate-800 to-slate-700 text-white">
                    <div className="max-w-5xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/20 border border-orange-500/30 text-orange-400 text-xs font-bold mb-6">
                            ⚙️ For COOs &amp; Operations Leaders
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                            Augment Your Team.<br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-400">Not Replace Them.</span>
                        </h1>
                        <p className="text-slate-300 text-lg max-w-2xl mb-10">
                            BazzAI agents handle the repetitive, rules-based work so your operations team can focus on judgment-heavy decisions, client relationships, and strategic execution.
                        </p>
                        <Link href={AUDIT_URL} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-red-600 text-white font-black hover:bg-red-700 transition-all hover:scale-105">
                            Book Operational Assessment <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>

                {/* AUGMENTATION VS REPLACEMENT */}
                <section className="py-20 px-6 border-b border-slate-100">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-black mb-3 text-center">Augmentation, Not Replacement</h2>
                        <p className="text-slate-500 text-center max-w-xl mx-auto mb-12">Every BazzAI agent is designed to amplify your existing team's capacity — not eliminate roles.</p>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-red-50 border-2 border-red-100 rounded-[24px] p-7">
                                <p className="text-xs font-black uppercase tracking-widest text-red-400 mb-4">Without BazzAI</p>
                                {['Your team spends 40% of time on data entry and report generation', 'Lead follow-up falls through the cracks during busy periods', 'Month-end close takes 3–5 days due to manual reconciliation', 'Onboarding new clients requires 2+ weeks of manual work', 'Anomalies are found reactively — after the damage is done'].map((item, i) => (
                                    <p key={i} className="flex items-start gap-2 text-sm text-slate-600 mb-2">
                                        <span className="text-red-400 font-bold mt-0.5">✕</span> {item}
                                    </p>
                                ))}
                            </div>
                            <div className="bg-green-50 border-2 border-green-100 rounded-[24px] p-7">
                                <p className="text-xs font-black uppercase tracking-widest text-green-600 mb-4">With BazzAI</p>
                                {['Your team focuses on decisions and relationships — AI handles data', 'Every lead is followed up automatically, 24/7, across all channels', 'Month-end close completes in hours with automated ledger sync', 'Clients onboarded via automated workflows with zero manual lift', 'Anomalies flagged in real-time before they become incidents'].map((item, i) => (
                                    <p key={i} className="flex items-start gap-2 text-sm text-slate-600 mb-2">
                                        <Check size={13} className="text-green-500 mt-0.5" /> {item}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* OPERATIONAL KPIs */}
                <section className="py-20 px-6 bg-slate-50 border-b border-slate-100">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-black mb-12 text-center">Operational KPIs That Move</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                            {[
                                { icon: <Clock size={24} />, value: '20+', label: 'Hours Saved Per Week', sub: 'per department' },
                                { icon: <TrendingUp size={24} />, value: '40%', label: 'Faster Process Cycle', sub: 'from intake to completion' },
                                { icon: <BarChart2 size={24} />, value: '99%', label: 'Data Accuracy', sub: 'vs. 85–90% manual' },
                                { icon: <Layers size={24} />, value: '14 days', label: 'Time to Deployment', sub: 'from kickoff to live' },
                            ].map((m, i) => (
                                <div key={i} className="bg-white border border-slate-200 rounded-[20px] p-5 text-center">
                                    <div className="text-red-600 flex justify-center mb-2">{m.icon}</div>
                                    <p className="text-3xl font-black mb-1">{m.value}</p>
                                    <p className="text-xs font-bold text-slate-700">{m.label}</p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">{m.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CHANGE MANAGEMENT */}
                <section className="py-20 px-6 border-b border-slate-100">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-black mb-6">Change Management Built In</h2>
                        <p className="text-slate-500 mb-12 max-w-2xl mx-auto">We know that the hardest part of automation isn't the technology — it's the people. BazzAI's deployment methodology includes team onboarding, SOP documentation, and ongoing performance reviews.</p>
                        <div className="grid md:grid-cols-3 gap-6 text-left">
                            {[
                                { step: '01', title: 'Discovery & Process Mapping', desc: 'We interview your operations team to map existing workflows, identify pain points, and rank automation ROI before writing a single line of code.' },
                                { step: '02', title: 'Team Onboarding & Training', desc: 'Every deployment includes a training session for the team who will work alongside the agents, with SOPs and escalation playbooks.' },
                                { step: '03', title: 'Ongoing Optimization', desc: 'Monthly performance reviews with your ops lead to tune agent behaviour, adjust parameters, and continuously improve output quality.' },
                            ].map((s, i) => (
                                <div key={i} className="bg-slate-50 border border-slate-100 rounded-[20px] p-6">
                                    <p className="text-4xl font-black text-slate-100 mb-3">{s.step}</p>
                                    <p className="font-black mb-2">{s.title}</p>
                                    <p className="text-sm text-slate-500">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 px-6 bg-gradient-to-r from-slate-800 to-slate-700 text-white text-center">
                    <h2 className="text-3xl font-black mb-4">Ready to Free Your Team from Repetitive Work?</h2>
                    <p className="text-slate-400 mb-8">Book a 15-minute call. We'll identify the top 3 manual processes slowing your operations and show you exactly how we'd automate them.</p>
                    <Link href={AUDIT_URL} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-red-600 text-white font-black hover:bg-red-700 transition-all hover:scale-105">
                        Book Operational Deep Dive <ArrowRight size={18} />
                    </Link>
                </section>
            </main>
        </div>
    );
}
