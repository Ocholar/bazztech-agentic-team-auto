"use client";
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Award, ArrowRight, MessageSquare, TrendingUp, Filter } from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_URL = 'https://wa.me/15558219787';

/* ─── Case Studies ─── */
const studies = [
    {
        country: '🇲🇺',
        industry: 'Packaging & Manufacturing',
        client: 'Leading Carton Manufacturer',
        subtitle: 'Leading Carton Manufacturing Case Study',
        title: 'How Leading Carton Manufacturer Achieved a 1,295% Year 1 ROI with Predictive Operations',
        challenge: 'Factory managers were spending 3–4 hours per day manually pulling shift reports and reacting to stockouts. HR processes were manual, and sales tracking lacked real-time visibility, leading to operational friction across all departments.',
        solution: 'BazzAI deployed a secure, predictive intelligence layer across the factory’s data. This included automated inventory signals, AI-driven HR onboarding workflows, and centralized sales intelligence that allowed natural language queries.',
        results: [
            { metric: '1,295%', label: 'Year 1 ROI' },
            { metric: '40%', label: 'Reduction in Stockouts' },
            { metric: '15%', label: 'OEE Improvement' },
            { metric: '1.2 mos', label: 'Payback Period' },
        ],
        quote: '"BazzAI gave us unprecedented visibility into our production lines and business operations. We stopped reacting to anomalies and started predicting them. The cross-departmental impact has been profound."',
        role: 'Chief Operating Officer',
        tags: ['Predictive Maintenance', 'HR Automation', 'Sales Intelligence'],
        featured: true,
        slug: '/case-studies/carton-manufacturer'
    },
    {
        country: '🇰🇪',
        industry: 'Agro-Processing',
        client: 'Nairobi Export Processor',
        subtitle: '60 employees · Export to 4 regional markets',
        title: 'Customer Inbound Calls Drop 70% with Automated Status AI',
        challenge: 'The sales team was receiving 80+ inbound calls daily from customers asking "Is my order ready?" Each call took 5–10 minutes to resolve, effectively destroying sales time.',
        solution: 'BazzAI integrated automated status notification pipelines linked directly to dispatch data. Customers received proactive updates without asking, and the AI managed preliminary inquiries instantly.',
        results: [
            { metric: '70%', label: 'Fewer Customer Calls' },
            { metric: '2hrs', label: 'Freed Per Sales Rep Daily' },
            { metric: '22%', label: 'Increase in Sales' },
            { metric: 'Instant', label: 'Data Retrieval' },
        ],
        quote: '"Our customers used to call constantly for order updates. BazzAI handles all standard tracking automatically. My team can finally focus exclusively on selling and expanding our client base."',
        role: 'Head of Sales',
        tags: ['Customer Intelligence', 'Sales Productivity', 'Order Autopilot'],
        featured: false,
        slug: '#'
    },
    {
        country: '🇳🇬',
        industry: 'Consumer Goods',
        client: 'Lagos FMCG Enterprise',
        subtitle: '150 employees · Supplying 200+ retail points',
        title: 'Instant Financial Reconciliation & Cross-Department Visibility',
        challenge: 'Reconciliation of thousands of daily payments was taking 6 hours. Administrative reporting was weeks behind, creating massive cash flow uncertainty.',
        solution: 'BazzAI connected directly to banking data streams, matching invoices to payments in milliseconds. Admin tasks were automated via AI summarization, bringing reporting back to real-time.',
        results: [
            { metric: 'Real-time', label: 'Financial Matching' },
            { metric: '6hrs', label: 'Daily Time Eliminated' },
            { metric: '100%', label: 'Invoice Accuracy' },
            { metric: '3×', label: 'Faster Month-End' },
        ],
        quote: '"Reconciliation was a nightmare. BazzAI does it in real time, with zero errors. It has completely transformed our administrative and financial efficiency across the board."',
        role: 'Managing Director',
        tags: ['Financial Intelligence', 'Admin Automation'],
        featured: false,
        slug: '#'
    }
];

const metrics = [
    { value: '1,295%', label: 'Record ROI (Mauritius)' },
    { value: '20hrs', label: 'Saved per Week Avg' },
    { value: '14 days', label: 'Avg Payback Period' },
    { value: '3M+', label: 'Operations Automated' },
];

export default function CaseStudiesPage() {
    const [expanded, setExpanded] = useState<number | null>(0);

    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#0F1419', color: '#A0AEC0', fontFamily: 'Inter, sans-serif' }}>
            <Header />

            {/* ─── HERO ─── */}
            <section className="relative overflow-hidden pt-36 pb-24 px-6 border-b border-slate-800" style={{ background: 'linear-gradient(135deg, #1A202C 0%, #0F1419 100%)' }}>
                <div className="absolute inset-0 pointer-events-none opacity-20"
                    style={{ background: 'radial-gradient(circle at 70% 50%, #81B29A, transparent 60%)' }} />
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-900 text-xs font-bold mb-7"
                        style={{ color: '#81B29A' }}>
                        <Award size={12} /> Live Deployed Intelligence
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-[#F4F1DE] mb-6 leading-tight"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Transforming Factories<br />
                        <span style={{ color: '#81B29A' }}>Into Smart Enterprises</span>
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-slate-400">
                        Operational intelligence deployed across Africa’s leading manufacturers. From the Mauritius coast to Lagos, see how AI is turning raw data into extreme business value.
                    </p>
                </div>

                {/* Stats */}
                <div className="mt-8 border-t border-slate-800 pt-8 max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {metrics.map((m, i) => (
                            <div key={i}>
                                <p className="text-3xl font-black" style={{ color: '#E07A5F', fontFamily: 'Space Grotesk, sans-serif' }}>{m.value}</p>
                                <p className="text-xs font-semibold mt-1 text-slate-500 uppercase tracking-widest">{m.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CASE STUDY CARDS ─── */}
            <section className="py-24 px-6 bg-[#141A23]">
                <div className="max-w-5xl mx-auto space-y-8">
                    {studies.map((s, i) => (
                        <div key={i} className="bg-[#0F1419] rounded-2xl border transition-all hover:shadow-2xl overflow-hidden"
                            style={{ borderColor: s.featured ? '#E07A5F' : '#2D3748' }}>
                            {/* Card top bar */}
                            <div className="flex flex-wrap items-center justify-between px-7 py-5 border-b border-slate-800"
                                style={{ background: s.featured ? 'rgba(224, 122, 95, 0.05)' : '#1A202C' }}>
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl">{s.country}</span>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: s.featured ? '#E07A5F' : '#81B29A' }}>{s.industry}</p>
                                        <p className="font-black text-base text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.client}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {s.featured && (
                                        <span className="px-3 py-1 rounded-full text-[10px] font-black text-[#0F1419]"
                                            style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}>Flagship</span>
                                    )}
                                    <span className="text-xs text-slate-500 font-medium hidden md:block">{s.subtitle}</span>
                                </div>
                            </div>

                            {/* Card body */}
                            <div className="p-8">
                                <h3 className="text-2xl font-black mb-6 leading-snug text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    {s.title}
                                </h3>

                                {/* Result pills */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    {s.results.map((r, j) => (
                                        <div key={j} className="rounded-xl p-4 text-center border border-slate-800 bg-[#1A202C]">
                                            <p className="text-2xl font-black text-[#4299E1]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{r.metric}</p>
                                            <p className="text-[11px] font-bold mt-1 text-slate-400 uppercase tracking-wide">{r.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="rounded-2xl p-6 mb-6 border-l-4"
                                    style={{ borderColor: '#81B29A', background: 'rgba(129, 178, 154, 0.05)' }}>
                                    <p className="font-medium italic leading-relaxed mb-3 text-slate-300">
                                        {s.quote}
                                    </p>
                                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#81B29A' }}>
                                        — {s.role}, {s.client}
                                    </p>
                                </blockquote>

                                {/* Expandable detail */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-6 border-t border-slate-800 pt-5">
                                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
                                        {s.tags.map((t, j) => (
                                            <span key={j} className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-700 bg-[#141A23] text-slate-400">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    {s.featured ? (
                                        <Link href={s.slug} className="text-sm font-bold flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ color: '#E07A5F' }}>
                                            Read Full Case Study <ArrowRight size={16} />
                                        </Link>
                                    ) : (
                                        <button
                                            className="text-sm font-bold flex items-center gap-1 hover:opacity-80 transition-opacity text-slate-400"
                                            onClick={() => setExpanded(expanded === i ? null : i)}>
                                            {expanded === i ? 'Hide details' : 'See summary'}
                                        </button>
                                    )}
                                </div>

                                {expanded === i && !s.featured && (
                                    <div className="mt-6 pt-6 grid md:grid-cols-2 gap-8 border-t border-slate-800">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest mb-3 text-slate-500">The Challenge</p>
                                            <p className="text-sm leading-relaxed text-slate-400">{s.challenge}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest mb-3 text-slate-500">The Solution</p>
                                            <p className="text-sm leading-relaxed text-[#F4F1DE]">{s.solution}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section className="py-24 px-6 border-t border-slate-800 text-center" style={{ background: '#0F1419' }}>
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black text-[#F4F1DE] mb-6"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Ready For These Results<br />
                        <span style={{ color: '#E07A5F' }}>At Your Operations?</span>
                    </h2>
                    <p className="text-lg mb-10 text-slate-400">
                        Start with a free 14-day production pilot. We deploy operational intelligence over your data streams with zero disruption risk.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="px-10 py-5 rounded-2xl font-black text-lg text-[#0F1419] flex items-center gap-2 justify-center hover:scale-105 transition-all shadow-2xl"
                            style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}
                            onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                            Request Technical Audit <ArrowRight size={20} />
                        </button>
                        <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-2 justify-center border border-slate-700 hover:bg-[#1A202C] transition-colors"
                            style={{ color: '#F4F1DE' }}>
                            <MessageSquare size={20} /> Discuss Your Use Case
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
