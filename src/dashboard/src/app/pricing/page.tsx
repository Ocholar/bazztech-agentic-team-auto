"use client";
import { Suspense, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
    Bot, FileText, Shield, HelpCircle, ArrowRight, Check, RefreshCw,
    Settings, AlertCircle, Users, ChevronDown, ChevronRight,
    Zap, Cpu, Database, Lock, Clock, Network, Layers, CheckCircle,
    ClipboardCheck, Activity, TrendingUp, X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-card';

// Phase 1 & 2 Foundation Components
import CurrencyToggle from '@/components/CurrencyToggle';
import KenyaGrantBanner from '@/components/KenyaGrantBanner';
import ROICalculator from '@/components/ROICalculator';
import { logAnalyticsEvent } from '@/lib/analytics';

const AUDIT_URL = 'https://calendly.com/reagan-bazztech/30min';

const smbProducts = [
    { name: "Bazz-Connect", desc: "WhatsApp Sales AI", price: "$499 One-off", useCase: "Automated Lead Nurturing & Sales" },
    { name: "Bazz-Flow", desc: "Finance Automation", price: "$499 One-off", useCase: "Ledger Reconciliation & Invoicing" },
    { name: "Bazz-Doc", desc: "Document Processing", price: "$499 One-off", useCase: "OCR & Automated Data Extraction" },
    { name: "Bazz-Lead", desc: "Lead Nurturing", price: "$499 One-off", useCase: "CRM Intelligence & Routing" }
];

const faqs = [
    {
        q: 'Do you offer fixed-price contracts or T&M?',
        a: 'We offer both models. Most standalone pipeline deployments ($5k–$60k) are fixed-price SOW engagements. Larger enterprise retainers are structured as monthly T&M with a cap. We provide a detailed SOW before any work begins.',
    },
    {
        q: 'What does your SLA cover?',
        a: 'Our standard SLA covers uptime (99.5% for hosted workflows), incident response (P1: 2hr, P2: 8hr), and monthly performance reporting. Enterprise SLAs include custom uptime targets, dedicated support channels, and quarterly business reviews.',
    },
    {
        q: 'What happens if an AI agent makes an error?',
        a: 'All agents have human escalation paths built in. For financial data, agents flag anomalies for human review rather than auto-correcting. Our SLA includes error correction SLAs, and all agent actions are logged for full auditability.',
    },
    {
        q: 'How do we handle data sovereignty requirements?',
        a: 'For Kenya-based clients, all data processing can be routed through servers located in-region. For clients with strict data residency requirements, we support private cloud deployments on AWS Africa (Cape Town) or any client-specified region.',
    },
    {
        q: 'Can we start with one workflow and expand later?',
        a: 'Yes — our modular architecture is specifically designed for phased rollouts. Most enterprise clients start with one high-ROI workflow, validate the results, then expand to 3–5 workflows over 6–12 months.',
    },
];

function PricingEnterpriseContent() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [emailModalOpen, setEmailModalOpen] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/leads/capture', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: emailValue,
                    type: 'enterprise_playbook_request',
                    metadata: { page: 'merged_pricing_enterprise' }
                })
            });
            if (res.ok) {
                logAnalyticsEvent('lead_captured', { type: 'enterprise_playbook_request', page: 'merged_pricing' });
                setEmailSent(true);
                setTimeout(() => {
                    setEmailModalOpen(false);
                    setEmailSent(false);
                    setEmailValue('');
                    setLoading(false);
                }, 3000);
            }
        } catch (err) {
            console.error('Submission failed', err);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-100">
            <style>{`
                @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .slide-up { animation: slideUp 0.4s ease both; }
                .sticky-mobile-cta { position: fixed; bottom: 0; left: 0; right: 0; z-index: 60; display: none; }
                @media (max-width: 767px) { .sticky-mobile-cta { display: block; } }
            `}</style>

            <Header />

            <main className="pt-16 pb-20 md:pb-0">
                {/* HERO */}
                <section className="py-24 px-6 bg-slate-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#dc262615,transparent)]" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Enterprise Procurement Playbook
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                            Infrastructure for the<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Autonomous Enterprise.</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
                            Standardized SOWs, verified insurance, and a 14-day path to ROI. We build the agentic workflows that power $100M+ operations.
                        </p>

                        <div className="flex flex-col items-center gap-6 mb-12">
                            <CurrencyToggle />
                            <div className="max-w-md w-full">
                                <KenyaGrantBanner />
                            </div>
                        </div>

                        <button onClick={() => setEmailModalOpen(true)}
                            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-red-600 text-white font-black hover:bg-red-700 transition-all hover:scale-105 shadow-2xl shadow-red-900/40">
                            Download Enterprise Playbook (PDF) <ArrowRight size={22} />
                        </button>
                    </div>
                </section>

                {/* SOW & PRICING */}
                <section className="py-24 px-6 border-b border-slate-100 bg-slate-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="bg-red-600/10 p-3 rounded-2xl text-red-600"><FileText size={24} /></div>
                            <h2 className="text-3xl font-black tracking-tight">Enterprise Standardized Procurement</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            {[
                                { tier: 'Starter', range: '$5k – $20k', items: ['Single AI pipeline', 'Fixed scope SOW', '3-month support', 'Standard SLA'] },
                                { tier: 'Growth', range: '$25k – $60k', items: ['2–4 pipelines', 'Integration SOW', '6-month SLA', 'Monthly reviews'], fx: true },
                                { tier: 'Enterprise', range: '$75k – $200k+', items: ['Custom scope SOW', 'Private LLM option', '12-month retainer', 'Dedicated CSM'] },
                            ].map((t, i) => (
                                <div key={i} className={`rounded-[32px] p-8 border-2 transition-all hover:shadow-lg ${t.fx ? 'border-red-200 bg-white' : 'border-slate-200 bg-white/50'}`}>
                                    {t.fx && <p className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2">Most Popular</p>}
                                    <p className="font-black text-xl mb-1">{t.tier}</p>
                                    <p className="text-3xl font-black text-slate-800 mb-6">{t.range}</p>
                                    <ul className="space-y-4">
                                        {t.items.map((it, j) => (
                                            <li key={j} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                                <Check size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" /> {it}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="bg-slate-900 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
                            <div className="flex gap-6 items-center">
                                <div className="hidden sm:flex w-16 h-16 bg-white/5 rounded-2xl items-center justify-center text-white"><FileText size={28} /></div>
                                <div className="text-left">
                                    <p className="text-white font-black text-lg mb-1">Request Sample SOW Template</p>
                                    <p className="text-slate-400 text-sm font-medium">Standard legal framework for AI safety and IP ownership.</p>
                                </div>
                            </div>
                            <button onClick={() => setEmailModalOpen(true)}
                                className="w-full md:w-auto px-8 py-4 rounded-xl bg-white text-slate-900 font-black text-sm hover:bg-slate-100 transition-all text-center">
                                Get SOW Package
                            </button>
                        </div>
                    </div>
                </section>

                {/* ARCHITECTURE & SECURITY */}
                <section className="py-24 px-6 bg-white border-b border-slate-100 overflow-hidden">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-200">
                                    <Cpu size={12} /> System Architecture
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">Decentralized Intelligence. <br />Centralized Control.</h2>
                                <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
                                    Our architecture is designed for the high-compliance environment. We separate the <strong>Reasoning Layer</strong> from the <strong>Data Layer</strong>, ensuring your sensitive records never touch public model training sets.
                                </p>
                                <div className="space-y-8">
                                    {[
                                        { title: 'Isolated Intelligence', desc: 'Private LLM instances with zero data retention policies on OpenAI Azure or AWS Bedrock.', icon: <Lock className="text-blue-600" /> },
                                        { title: 'Deterministic Tooling', desc: 'AI agents operate within strict n8n-orchestrated sandboxes with code execution restricted to authorized scripts.', icon: <Settings className="text-emerald-600" /> },
                                        { title: 'Crypto-Audit Trails', desc: 'Every model decision is logged with non-repudiable timestamps for full regulatory compliance.', icon: <ClipboardCheck className="text-purple-600" /> }
                                    ].map((f, i) => (
                                        <div key={i} className="flex gap-5 group">
                                            <div className="flex-shrink-0 bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">{f.icon}</div>
                                            <div>
                                                <p className="font-black text-sm mb-1">{f.title}</p>
                                                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="bg-slate-900 rounded-[48px] p-10 border border-white/10 shadow-2xl relative overflow-hidden aspect-square flex flex-col items-center justify-center gap-8">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b,transparent)] opacity-50" />

                                    <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-[0_0_60px_rgba(37,99,235,0.4)] z-10 relative">
                                        <Bot size={40} />
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse border-4 border-slate-900" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 z-10 w-full px-4">
                                        {[
                                            { label: 'Private LLM', icon: <Cpu />, color: 'bg-emerald-500/20 text-emerald-400' },
                                            { label: 'Client ERP', icon: <Database />, color: 'bg-blue-500/20 text-blue-400' },
                                            { label: 'Audit Log', icon: <ClipboardCheck />, color: 'bg-purple-500/20 text-purple-400' },
                                            { label: 'HITL Gate', icon: <Users />, color: 'bg-amber-500/20 text-amber-400' }
                                        ].map((n, i) => (
                                            <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-3xl text-center flex flex-col items-center gap-3 hover:bg-white/10 transition-colors backdrop-blur-md">
                                                <div className={`p-3 rounded-xl ${n.color}`}>{n.icon}</div>
                                                <p className="text-[10px] font-black tracking-widest uppercase text-white/70">{n.label}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/20 rounded-full animate-[spin_25s_linear_infinite]" />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 14-DAY TRANSFORM ROADMAP */}
                <section className="py-24 px-6 bg-slate-50 border-b border-slate-100 overflow-hidden text-slate-900 text-center">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-20">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-red-100">
                                <Clock size={12} /> Velocity Standard
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">14 Days to First ROI.</h2>
                            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                                Enterprises move slow. BazzAI implementation doesn't. We benchmark success in days, not quarters.
                            </p>
                        </div>

                        <div className="relative mb-20 text-left">
                            <div className="hidden lg:block absolute top-[60px] left-0 w-full h-1 bg-slate-200 z-0" />

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                                {[
                                    { day: '02', title: 'Audit & Map', desc: 'On-site/Remote workshop to map technical bottlenecks and rank high-ROI agents.', icon: <Network />, color: 'bg-red-600' },
                                    { day: '05', title: 'Architect', desc: 'Design of the private pipeline, API integration mapping, and HITL gate setup.', icon: <Layers />, color: 'bg-slate-900' },
                                    { day: '10', title: 'Verify', desc: 'Secure pilot deployment in sandbox with real historical data. Security sign-off.', icon: <CheckCircle />, color: 'bg-blue-600' },
                                    { day: '14', title: 'Scale', desc: 'Live production release. Team training. Initial ROI capturing begins.', icon: <Zap />, color: 'bg-emerald-500' }
                                ].map((step, i) => (
                                    <div key={i} className="group bg-white border border-slate-200 p-8 rounded-[32px] hover:shadow-xl transition-all">
                                        <div className={`w-14 h-14 rounded-2xl ${step.color} text-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg`}>
                                            {step.icon}
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Day {step.day}</p>
                                        <h4 className="text-xl font-black mb-4">{step.title}</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ROI CALCULATOR SECTION */}
                <section className="py-24 px-6 bg-white border-b border-slate-100 relative overflow-hidden">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Quantify the Opportunity.</h2>
                            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                                Every manual bottleneck has a measurable price. Use our evaluator to see how much capital BazzAI can reclaim for your operations.
                            </p>
                        </div>
                        <ROICalculator />
                    </div>
                </section>

                {/* SMALLER BUSINESSES - STANDARD MODULES */}
                <section className="py-24 px-6 bg-slate-100 border-b border-slate-200 overflow-hidden">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-200">
                                For Smaller Businesses
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Standard SaaS Modules</h2>
                            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                                Not an enterprise yet? Deploy our individual zero-setup SaaS products to automate your core functions today.
                            </p>
                        </div>

                        <div className="flex bg-white border border-slate-200 rounded-[32px] p-8 md:p-12 shadow-sm flex-col">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {smbProducts.map((p, idx) => (
                                    <Card key={idx} className="border-slate-200 border shadow-sm bg-slate-50 relative hover:-translate-y-1 transition-transform duration-300">
                                        <CardHeader className="text-center pt-6 pb-4 border-b border-slate-200/60 bg-white rounded-t-[14px]">
                                            <CardTitle className="text-lg font-black text-slate-900">{p.name}</CardTitle>
                                            <CardDescription className="text-slate-500 font-bold text-xs">{p.desc}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-6 flex flex-col items-center">
                                            <span className="text-2xl font-black text-slate-900 mb-1">{p.price}</span>
                                            <p className="text-[11px] font-medium text-slate-500 text-center mb-6 h-8 flex items-center justify-center">
                                                {p.useCase}
                                            </p>
                                            <Link href={`/register?product=${p.name}`} className="w-full text-center py-3 bg-slate-900 text-white hover:bg-slate-800 font-bold text-sm rounded-xl transition-colors">
                                                Get Started
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            {/* Bundle Savings Mini-Banner */}
                            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center">
                                <p className="text-blue-900 font-medium text-sm">
                                    Unlock a <strong className="text-blue-700">15% Multi-Product Discount</strong> when you bundle 2+ modules. Own your automation with a single payment.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 px-6 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 mb-12 text-center justify-center">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Procurement FAQ.</h2>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-slate-50 border border-slate-200 rounded-[24px] overflow-hidden group">
                                    <button
                                        className="w-full text-left px-8 py-6 flex items-center justify-between gap-4 font-bold text-base hover:bg-slate-100 transition-colors"
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                        {faq.q}
                                        {openFaq === i ? <ChevronDown size={20} className="flex-shrink-0 text-red-600" /> : <ChevronRight size={20} className="flex-shrink-0 text-slate-400 group-hover:text-slate-600 transition-colors" />}
                                    </button>
                                    {openFaq === i && (
                                        <div className="px-8 pb-8 text-slate-500 text-sm leading-relaxed border-t border-slate-200 pt-6 font-medium bg-white">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FOOTER CTA */}
                <section className="py-32 px-6 bg-slate-950 text-white text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tight leading-tight">Ready for Infrastructure <br />Grade Intelligence?</h2>
                        <button className="inline-flex items-center gap-3 px-12 py-6 rounded-2xl bg-red-600 text-white font-black hover:bg-red-700 transition-all hover:scale-105 shadow-2xl shadow-red-900/40 text-lg" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            Schedule Technical Briefing <ArrowRight size={24} />
                        </button>
                    </div>
                </section>
            </main>

            <Footer />

            {/* ─── STICKY MOBILE CTA BAR ─── */}
            <div className="sticky-mobile-cta slide-up border-t border-slate-200 bg-white shadow-2xl">
                <div className="flex gap-2 p-3">
                    <button className="flex-1 py-3.5 rounded-xl bg-red-600 text-white font-black text-xs text-center flex items-center justify-center gap-1 shadow-lg shadow-red-900/10" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                        📅 Book Briefing
                    </button>
                    <button onClick={() => setEmailModalOpen(true)}
                        className="flex-1 py-3.5 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center gap-1">
                        🏢 SOW Package
                    </button>
                </div>
            </div>

            {/* ─── LEAD CAPTURE MODAL ─── */}
            {emailModalOpen && (
                <div className="fixed inset-0 bg-black/80 z-[999] backdrop-blur-sm flex items-end sm:items-center justify-center p-4" onClick={() => setEmailModalOpen(false)}>
                    <div className="relative bg-white rounded-[32px] p-8 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button aria-label="Close modal" onClick={() => setEmailModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors">
                            <X size={24} />
                        </button>
                        {emailSent ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check size={32} />
                                </div>
                                <p className="font-black text-2xl mb-2">Request Received</p>
                                <p className="text-slate-500 font-medium leading-relaxed">The Enterprise Playbook and SOW package are being prepared for your inbox.</p>
                            </div>
                        ) : (
                            <>
                                <div className="bg-red-600/10 w-12 h-12 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                                    <FileText size={24} />
                                </div>
                                <p className="font-black text-2xl mb-2 tracking-tight">Enterprise Playbook</p>
                                <p className="text-slate-500 text-sm mb-8 font-medium leading-relaxed">Get our full architecture whitepaper, sample SOW templates, and SLA documentation.</p>
                                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Work Email</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="you@company.com"
                                            value={emailValue}
                                            onChange={e => setEmailValue(e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-bold"
                                        />
                                    </div>
                                    <button type="submit" disabled={loading}
                                        className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                                        {loading ? <RefreshCw size={18} className="animate-spin" /> : "Request Access →"}
                                    </button>
                                </form>
                                <p className="text-[9px] text-slate-400 text-center mt-5 font-bold uppercase tracking-widest">Enterprise Data Residency Compliant</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function PricingPage() {
    return (
        <Suspense fallback={null}>
            <PricingEnterpriseContent />
        </Suspense>
    );
}
