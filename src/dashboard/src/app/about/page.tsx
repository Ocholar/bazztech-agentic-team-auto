"use client";
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
    ArrowRight, Github, Linkedin, MapPin, Cpu, Database, Layers,
    BarChart2, ShieldCheck, Bot, Code2, Network, Zap, ExternalLink
} from 'lucide-react';

const domains = [
    {
        icon: <Bot size={22} />,
        color: 'bg-red-50 text-red-600 border-red-100',
        title: 'Agentic AI Systems',
        desc: 'LLM-powered agents that execute complex, multi-step decisions autonomously — from customer triage to financial reconciliation — with no human touchpoints required.',
    },
    {
        icon: <Layers size={22} />,
        color: 'bg-purple-50 text-purple-600 border-purple-100',
        title: 'Manufacturing Intelligence & RAG',
        desc: 'Hybrid Retrieval Augmented Generation systems that digitize tribal factory knowledge. SOPs, manuals, and live machine telemetry transformed into a queryable AI brain.',
    },
    {
        icon: <Cpu size={22} />,
        color: 'bg-blue-50 text-blue-600 border-blue-100',
        title: 'Computer Vision & QC',
        desc: 'PyTorch/OpenCV inspection pipelines that detect sub-millisecond packaging defects. Proven to reduce manual QC labor by 80% on live production lines.',
    },
    {
        icon: <Network size={22} />,
        color: 'bg-amber-50 text-amber-600 border-amber-100',
        title: 'Workflow Orchestration (n8n)',
        desc: 'Enterprise-grade multi-step automation layers connecting ERPs, CRMs, payment APIs, and LLMs — replacing brittle Python scripts with resilient, observable pipelines.',
    },
    {
        icon: <BarChart2 size={22} />,
        color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        title: 'Geospatial & Predictive Analytics',
        desc: 'Data science pipelines that turn raw agricultural and operational data into actionable intelligence — rainfall forecasting, yield analysis, and supply chain prediction.',
    },
    {
        icon: <Database size={22} />,
        color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
        title: 'Data Engineering & Pipelines',
        desc: 'SQL, Python, and Power BI data stacks that unify fragmented enterprise data sources into clean, live dashboards with full audit trails and MEL compliance.',
    },
];

const featured = [
    {
        tag: 'Manufacturing · RAG',
        name: 'ForgeIntelligence',
        desc: 'An internal factory AI that processes SOPs, manuals, and live machine telemetry. Reduces unplanned downtime and optimizes inventory via a natural language interface.',
        tech: ['LangChain', 'Pinecone', 'n8n', 'FastAPI'],
    },
    {
        tag: 'Computer Vision · QC',
        name: 'Defect Detection Pipeline',
        desc: 'A PyTorch/OpenCV system detecting sub-millisecond defects in packaging lines on a live production floor. Reduced manual QC labor by 80%.',
        tech: ['PyTorch', 'OpenCV', 'Python', 'REST API'],
    },
    {
        tag: 'Agriculture · Analytics',
        name: 'AgroDashboard',
        desc: 'Spatial rainfall and yield analysis for the smallholder agricultural sector. Built with geospatial Python libraries for predictive resource planning.',
        tech: ['Python', 'GeoPandas', 'Power BI', 'SQL'],
    },
];

const stats = [
    { val: '100+', label: 'Workflows Deployed' },
    { val: '3M+', label: 'API Calls Processed' },
    { val: '1,295%', label: 'Verified Year-1 ROI' },
    { val: 'SOC 2', label: 'Ready Architecture' },
];

const principles = [
    { icon: <Zap size={18} />, title: 'No Fluff. Only ROI.', body: 'If an AI workflow does not demonstrably reduce costs or eliminate bottlenecks within 90 days, we do not build it. Every engagement starts with a financial model.' },
    { icon: <ShieldCheck size={18} />, title: 'Security by Default.', body: 'SOC 2 Type II architecture, AES-256 at rest, TLS 1.3 in transit, and zero-retention LLM policies on every deployment — not as an add-on, but as the baseline.' },
    { icon: <Code2 size={18} />, title: 'Zero Lock-In.', body: 'Built on open-source foundations — Python, FastAPI, n8n, Postgres. If a client wants to take the system fully in-house, the handover is frictionless.' },
];

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-slate-50 text-slate-900 pb-0 overflow-x-hidden">
            <Header />

            {/* ── HERO ── */}
            <section className="w-full bg-slate-900 text-white relative pt-36 pb-28 px-8 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        The Architect Behind BazzAI
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
                                Reagan<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-orange-400">
                                    Ochola.
                                </span>
                            </h1>
                            <p className="text-slate-300 text-lg leading-relaxed font-medium mb-8 max-w-lg">
                                AI Automation Engineer dedicated to building intelligent systems that transform manual industrial processes into <strong className="text-white">self-operating machines</strong>. Based in Nairobi. Deployed to enterprises across Africa and beyond.
                            </p>
                            <div className="flex flex-wrap gap-3 mb-10">
                                {['AI Agents', 'LangChain · RAG', 'n8n Orchestration', 'Computer Vision', 'Data Pipelines', 'LLM Integration'].map((t) => (
                                    <span key={t} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold">{t}</span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4">
                                <a href="https://www.linkedin.com/in/reagan-ochola-aba10927/" target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all text-sm font-bold">
                                    <Linkedin size={16} /> LinkedIn
                                </a>
                                <a href="https://github.com/Ocholar" target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all text-sm font-bold">
                                    <Github size={16} /> GitHub
                                </a>
                                <a href="https://ocholar.github.io/portfolio/" target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all text-sm font-bold">
                                    <ExternalLink size={16} /> Portfolio
                                </a>
                            </div>
                        </div>

                        {/* Photo card */}
                        <div className="flex justify-center md:justify-end">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-red-500/30 to-blue-600/20 blur-2xl scale-110" />
                                <div className="relative w-72 h-80 md:w-80 md:h-[420px] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                                    <img src="/reagan.jpg" alt="Reagan Ochola" className="w-full h-full object-cover object-top" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-5 left-5 right-5">
                                        <p className="font-black text-lg text-white leading-tight">Reagan Ochola</p>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-0.5">Founder & Lead AI Architect</p>
                                        <div className="flex items-center gap-1.5 mt-2">
                                            <MapPin size={11} className="text-red-400" />
                                            <span className="text-slate-400 text-xs font-medium">Nairobi, Kenya</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -top-4 -right-4 bg-slate-800 border border-white/10 rounded-2xl px-4 py-2.5 shadow-xl">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Experience</p>
                                    <p className="text-white font-black text-lg leading-none mt-0.5">10+ Years</p>
                                </div>
                                <div className="absolute -bottom-4 -left-4 bg-red-600 border border-red-500/50 rounded-2xl px-4 py-2.5 shadow-xl">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-red-200">Connections</p>
                                    <p className="text-white font-black text-lg leading-none mt-0.5">2,691+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STAT BAR ── */}
            <section className="w-full border-y border-slate-200 bg-white py-10 px-8">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <div className="text-3xl md:text-4xl font-black text-slate-900">{s.val}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── ORIGIN STORY ── */}
            <section className="w-full max-w-5xl px-8 py-24">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6">
                            Origin
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6 leading-tight text-slate-900">
                            Bridging Industrial Automation<br /> and AI Intelligence.
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-5 font-medium">
                            Reagan's career began deep in the field — building MEL (Monitoring, Evaluation, and Learning) data systems at <strong className="text-slate-900">One Acre Fund</strong>, one of Africa's largest agricultural NGOs, where he designed analytics pipelines that shaped decisions affecting millions of smallholder farmers.
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-5 font-medium">
                            That experience revealed a universal truth: most organizations are drowning in data but starving for intelligence. Legacy systems collect everything and automate nothing.
                        </p>
                        <p className="text-slate-600 leading-relaxed font-medium">
                            BazzAI was founded to close that gap — delivering enterprise-grade Agentic Swarms that turn operational data into autonomous, measurable business outcomes.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {principles.map((p) => (
                            <div key={p.title} className="flex gap-5 bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-md transition-all">
                                <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                                    {p.icon}
                                </div>
                                <div>
                                    <p className="font-black text-slate-900 text-sm mb-1.5">{p.title}</p>
                                    <p className="text-slate-500 text-[13px] leading-relaxed">{p.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── DOMAIN EXPERTISE ── */}
            <section className="w-full border-t border-slate-200 bg-white py-24 px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6">
                            Specialized Domains
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-slate-900">Engineer-Level Depth. Business-Level Output.</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto font-medium">Six specializations built through years of real-world deployments across finance, agriculture, and manufacturing.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {domains.map((d) => (
                            <div key={d.title} className="bg-slate-50 border border-slate-200 rounded-[28px] p-7 hover:shadow-md hover:-translate-y-0.5 transition-all">
                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5 border ${d.color}`}>
                                    {d.icon}
                                </div>
                                <h3 className="font-black text-slate-900 text-sm mb-2.5">{d.title}</h3>
                                <p className="text-slate-500 text-[12px] leading-relaxed">{d.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURED BUILDS ── */}
            <section className="w-full py-24 px-8 bg-slate-50 border-t border-slate-200">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6">
                            Featured Work
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-slate-900">Built. Deployed. Proven.</h2>
                        <p className="text-slate-500 font-medium">Selected projects that demonstrate engineering depth and real-world results.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {featured.map((f) => (
                            <div key={f.name} className="bg-white border border-slate-200 rounded-[28px] p-7 flex flex-col hover:shadow-md transition-all">
                                <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-3">{f.tag}</p>
                                <h3 className="text-slate-900 font-black text-base mb-3">{f.name}</h3>
                                <p className="text-slate-500 text-[12px] leading-relaxed flex-1 mb-5">{f.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {f.tech.map((t) => (
                                        <span key={t} className="px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold">{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <a href="https://github.com/Ocholar" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all text-sm font-bold shadow-sm">
                            <Github size={16} /> View All Projects on GitHub
                        </a>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="w-full py-24 px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-red-600 rounded-[40px] p-12 md:p-16 text-center shadow-2xl text-white">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
                            Ready to Automate<br /> What Others Can't?
                        </h2>
                        <p className="text-red-100 mb-10 max-w-lg mx-auto font-medium text-lg">
                            Stop buying AI software. Commission an AI architecture. Book a free technical audit and walk away with a custom ROI roadmap.
                        </p>
                        <button
                            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-red-600 font-black hover:bg-slate-50 transition-all hover:scale-105 shadow-xl text-base"
                            onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            Book a Free Architecture Audit <ArrowRight size={20} />
                        </button>
                        <p className="text-red-200 text-xs font-bold uppercase tracking-widest mt-6">No commitment. No pitch deck. Just a technical conversation.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
