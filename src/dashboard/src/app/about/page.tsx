"use client";
import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { Shield, Target, Users, Zap, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white text-slate-900 pb-24">
            <Header />

            {/* Hero Section */}
            <section className="w-full bg-slate-900 text-white pt-32 pb-24 px-8 relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-96 h-64 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-widest mb-6 fade-up" style={{ animationDelay: '0.1s' }}>
                        Our Story
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 fade-up" style={{ animationDelay: '0.2s' }}>
                        The Engineers Behind the Automation.
                    </h1>
                    <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto fade-up" style={{ animationDelay: '0.3s' }}>
                        Built by operators who understand enterprise scale. We don't sell hype—we deploy measurable operational efficiency frameworks.
                    </p>
                </div>
            </section>

            {/* Social Proof Strip */}
            <section className="w-full bg-slate-50 border-y border-slate-200 py-8 px-8">
                <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-12 text-center">
                    <div>
                        <div className="text-3xl font-black text-slate-900">100+</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">Workflows Deployed</div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-slate-900">3M+</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">API Calls Processed</div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-slate-900">1</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">Flagship Mft Client</div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-slate-900">SOC 2</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">Ready Architecture</div>
                    </div>
                </div>
            </section>

            {/* Engineering Philosophy */}
            <section className="w-full max-w-5xl px-8 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-slate-900">Our Engineering Philosophy</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">We build systems that are secure by design, functionally transparent, and ruthlessly focused on real business ROI.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                            <Target size={24} />
                        </div>
                        <h3 className="text-xl font-black mb-3">No Fluff, Just ROI</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            We ignore vanity metrics. If an AI workflow doesn't demonstrably reduce operational costs, increase conversions, or eliminate manual bottlenecks within 90 days, we don't build it.
                        </p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-black mb-3">Radical Transparency</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            Vendor lock-in is the enemy of innovation. Our automation layers are built on open architectures and clearly documented orchestration frameworks like n8n and Postgres.
                        </p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                            <Shield size={24} />
                        </div>
                        <h3 className="text-xl font-black mb-3">Bank-Grade Security</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            As a baseline, every pipeline is SOC 2 compliant in design. We enforce strict multi-tenant isolation, TLS in transit, AES-256 at rest, and zero-retention policies with LLM providers.
                        </p>
                    </div>
                </div>
            </section>

            {/* Leadership/Team Section */}
            <section className="w-full max-w-5xl px-8 pb-24">
                <div className="bg-slate-900 rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row gap-12 shadow-xl items-center text-white">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-black mb-6">Meet The Solopreneur</h2>
                        <h3 className="text-xl font-bold text-red-500 mb-2">Reagan Ochola</h3>
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-6">Founder & Lead ML Architect</p>
                        <p className="text-slate-300 leading-relaxed mb-6 font-medium text-sm">
                            With an extensive background in Machine Learning, Data Analytics, and Data Science honed at One Acre Fund, Reagan single-handedly engineers high-availability AI pipelines. He founded BazzAI to bridge the gap between bleeding-edge ML models and legacy business operations.
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 size={16} className="text-red-500" /> Specialist in RAG Architecture & Vector DBs</li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 size={16} className="text-red-500" /> Cloud Infra & Automation Engineering Ops</li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 size={16} className="text-red-500" /> B2B FinTech & Manufacturing Workflows</li>
                        </ul>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <div className="w-64 h-64 md:w-80 md:h-80 bg-slate-800 rounded-full border-4 border-slate-700/50 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
                            <img src="/reagan.jpg" alt="Reagan Ochola" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="w-full max-w-4xl px-8">
                <div className="bg-red-600 rounded-[32px] p-12 text-center shadow-lg text-white mb-20">
                    <h2 className="text-3xl font-black mb-4">Partner with the Experts</h2>
                    <p className="text-red-100 mb-8 max-w-lg mx-auto font-medium">
                        Stop buying AI software. Start buying automated business outcomes.
                    </p>
                    <button className="px-8 py-4 bg-white hover:bg-slate-50 text-red-600 font-black rounded-xl transition-all shadow-md" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                        Let's Discuss Architecture
                    </button>
                </div>
            </section>
        </main>
    );
}
