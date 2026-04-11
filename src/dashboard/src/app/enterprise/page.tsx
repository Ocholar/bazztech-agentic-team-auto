"use client";
import Link from 'next/link';
import { Bot, FileText, Shield, HelpCircle, ArrowRight, Check, RefreshCw, Settings, AlertCircle, Users, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const AUDIT_URL = 'https://calendly.com/reagan-bazztech/30min';

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

export default function EnterprisePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            <header className="fixed top-0 w-full z-50 bg-white/96 backdrop-blur-sm border-b border-slate-100 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-white"><Bot size={18} /></div>
                        <span className="text-xl font-black">Bazz<span className="text-red-600">AI</span></span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/solutions/for-cfos" className="text-sm font-semibold text-slate-500 hover:text-slate-900">CFO View</Link>
                        <Link href="/security" className="text-sm font-semibold text-slate-500 hover:text-slate-900">Security</Link>
                        <Link href={AUDIT_URL} target="_blank" rel="noopener noreferrer"
                            className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700">Contact Enterprise Sales</Link>
                    </div>
                </div>
            </header>

            <main className="pt-24">
                {/* HERO */}
                <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold mb-6">
                            🏢 Enterprise Procurement Playbook
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                            Everything Your Procurement<br />
                            Team Needs to<br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-400">Move Fast.</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
                            SOW templates, SLA details, pricing tiers, and FAQ — all in one place. Designed to compress your procurement cycle from months to weeks.
                        </p>
                        <Link href={AUDIT_URL} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-red-600 text-white font-black hover:bg-red-700 transition-all hover:scale-105">
                            Contact Enterprise Sales <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>

                {/* SOW TEMPLATES */}
                <section className="py-20 px-6 border-b border-slate-100">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <FileText size={24} className="text-red-600" />
                            <h2 className="text-3xl font-black">SOW Templates & Pricing Tiers</h2>
                        </div>
                        <p className="text-slate-500 mb-10 max-w-2xl">Our Statement of Work covers scope, deliverables, timelines, payment milestones, and IP ownership. Pricing tiers reflect typical engagement sizes:</p>
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {[
                                { tier: 'Starter', range: '$5k – $20k', items: ['Single AI pipeline', 'Fixed scope SOW', '3-month support', 'Standard SLA'] },
                                { tier: 'Growth', range: '$25k – $60k', items: ['2–4 pipelines', 'Integration SOW', '6-month SLA', 'Monthly reviews'], fx: true },
                                { tier: 'Enterprise', range: '$75k – $200k+', items: ['Custom scope SOW', 'Private LLM option', '12-month retainer', 'Dedicated CSM'] },
                            ].map((t, i) => (
                                <div key={i} className={`rounded-[20px] p-6 border-2 ${t.fx ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-slate-50'}`}>
                                    {t.fx && <p className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Most Common</p>}
                                    <p className="font-black text-lg mb-1">{t.tier}</p>
                                    <p className="text-2xl font-black text-slate-800 mb-4">{t.range}</p>
                                    <ul className="space-y-2">
                                        {t.items.map((it, j) => (
                                            <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                                                <Check size={13} className="text-green-500" /> {it}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="bg-slate-900 rounded-[20px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <p className="text-white font-black mb-1">📄 Download Sample SOW Template</p>
                                <p className="text-slate-400 text-sm">A non-binding sample SOW structure used in our standard engagements.</p>
                            </div>
                            <Link href={AUDIT_URL} target="_blank" rel="noopener noreferrer"
                                className="flex-shrink-0 px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700">
                                Request SOW Template
                            </Link>
                        </div>
                    </div>
                </section>

                {/* SLA */}
                <section className="py-20 px-6 bg-slate-50 border-b border-slate-100">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <Shield size={24} className="text-red-600" />
                            <h2 className="text-3xl font-black">Service Level Agreements</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-5">
                            {[
                                { label: 'Uptime', value: '99.5%', desc: 'Monthly uptime guarantee for all hosted automation workflows.' },
                                { label: 'P1 Incident Response', value: '2 hours', desc: 'Critical production issues — acknowledged and triaged within 2 hours.' },
                                { label: 'P2 Incident Response', value: '8 hours', desc: 'Non-critical issues affecting workflow performance or reporting.' },
                                { label: 'Data Breach Notification', value: '24 hours', desc: 'We notify affected clients within 24 hours of a confirmed breach.' },
                                { label: 'Scheduled Maintenance', value: '48hr notice', desc: 'All planned maintenance windows require 48-hour advance notice.' },
                                { label: 'Performance Reviews', value: 'Monthly', desc: 'Monthly reports on workflow throughput, accuracy, and cost savings.' },
                            ].map((s, i) => (
                                <div key={i} className="bg-white border border-slate-200 rounded-[16px] p-5 flex items-start gap-4">
                                    <div className="flex-shrink-0 bg-red-50 rounded-xl p-2">
                                        <Shield size={16} className="text-red-600" />
                                    </div>
                                    <div>
                                        <p className="font-black text-sm">{s.label}</p>
                                        <p className="text-red-600 font-black text-lg">{s.value}</p>
                                        <p className="text-slate-500 text-xs">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* DAY 2 SUPPORT */}
                <section className="py-20 px-6 border-b border-slate-100">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <Settings size={24} className="text-red-600" />
                            <h2 className="text-3xl font-black">Day 2 Support & Long-Term Optimization</h2>
                        </div>
                        <p className="text-slate-500 mb-12 max-w-2xl">Go-live is just the beginning. Our Day 2 programme covers the full AI lifecycle:</p>

                        {/* Lifecycle Diagram */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
                            {[
                                { icon: '📊', label: 'Monitor', sub: 'Performance tracking & alerting' },
                                { icon: '⚙️', label: 'Optimize', sub: 'Model & prompt tuning' },
                                { icon: '🔄', label: 'Adapt', sub: 'New data & workflow updates' },
                                { icon: '🛟', label: 'Support', sub: 'Incident response & training' },
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="text-center bg-slate-50 border-2 border-slate-200 rounded-[16px] px-6 py-4 min-w-[130px]">
                                        <p className="text-3xl mb-1">{step.icon}</p>
                                        <p className="font-black text-sm">{step.label}</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{step.sub}</p>
                                    </div>
                                    {i < 3 && <ChevronRight size={20} className="text-slate-300 flex-shrink-0" />}
                                </div>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { icon: <AlertCircle size={20} className="text-red-500" />, title: 'Model Performance Monitoring', desc: 'Continuous tracking of model accuracy, hallucination rate, and throughput. Automated alerts on drift or degradation.' },
                                { icon: <RefreshCw size={20} className="text-blue-500" />, title: 'Pipeline Maintenance', desc: 'Regular updates to system prompts, retrieval configs, and integration endpoints. Proactive, not reactive.' },
                                { icon: <Shield size={20} className="text-green-500" />, title: 'Incident Response', desc: 'Dedicated Slack/WhatsApp channel. P1 issues triaged within 2 hours. Full RCA report within 5 business days.' },
                                { icon: <Users size={20} className="text-purple-500" />, title: 'Staff Training & Enablement', desc: 'Quarterly training sessions for your team. SOPs updated with every workflow change. Your team always knows what the AI is doing.' },
                            ].map((s, i) => (
                                <div key={i} className="flex gap-4 bg-slate-50 border border-slate-100 rounded-[20px] p-6">
                                    <div className="flex-shrink-0 mt-0.5">{s.icon}</div>
                                    <div>
                                        <p className="font-black mb-2">{s.title}</p>
                                        <p className="text-sm text-slate-500">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 px-6 bg-slate-50 border-b border-slate-100">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-10">
                            <HelpCircle size={24} className="text-red-600" />
                            <h2 className="text-3xl font-black">Procurement FAQ</h2>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-white border border-slate-200 rounded-[16px] overflow-hidden">
                                    <button
                                        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-sm hover:bg-slate-50 transition-colors"
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                        {faq.q}
                                        {openFaq === i ? <ChevronDown size={16} className="flex-shrink-0 text-red-600" /> : <ChevronRight size={16} className="flex-shrink-0 text-slate-400" />}
                                    </button>
                                    {openFaq === i && (
                                        <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ENTERPRISE CONTACT */}
                <section className="py-20 px-6 bg-slate-900 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-black mb-4">Enterprise Procurement Contact</h2>
                        <p className="text-slate-400 mb-8">For RFP responses, custom SOW requests, security questionnaires, or executive briefings — contact our enterprise sales team directly.</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                            <div className="text-center">
                                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Email</p>
                                <a href="mailto:enterprise@bazztech.co.ke" className="text-red-400 font-bold hover:text-red-300">enterprise@bazztech.co.ke</a>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Phone / WhatsApp</p>
                                <a href="tel:+254781751937" className="text-red-400 font-bold hover:text-red-300">+254 781 751 937</a>
                            </div>
                        </div>
                        <Link href={AUDIT_URL} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-red-600 text-white font-black hover:bg-red-700 transition-all hover:scale-105">
                            Schedule Enterprise Call <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
