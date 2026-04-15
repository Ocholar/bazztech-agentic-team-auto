"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Target, Server, Activity, Rocket, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

const timeline = [
    {
        phase: 'Phase 1',
        title: 'Architecture Audit & Data Mapping',
        weeks: 'Weeks 1-2',
        icon: <Target size={24} />,
        color: 'text-blue-500',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        points: [
            'Identify high-impact, low-risk operational bottlenecks.',
            'Map existing data sources, APIs, and legacy databases.',
            'Define strict ROI key performance indicators (KPIs).',
            'Draft SOC 2 compliant architecture blueprint.'
        ]
    },
    {
        phase: 'Phase 2',
        title: 'Pipeline Engineering',
        weeks: 'Weeks 3-5',
        icon: <Server size={24} />,
        color: 'text-purple-500',
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        points: [
            'Provision dedicated cloud instances matching data residency rules.',
            'Build n8n orchestration layer and connect external endpoints.',
            'Train or prompt-engineer isolated LLMs for your specific data context.',
            'Set up zero-retention policies and secure vector stores.'
        ]
    },
    {
        phase: 'Phase 3',
        title: 'Silent Testing & Validation',
        weeks: 'Weeks 6-8',
        icon: <Activity size={24} />,
        color: 'text-amber-500',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        points: [
            'Run the AI pipeline alongside manual human operations.',
            'Compare automated outputs against human baselines for accuracy.',
            'Refine edge cases, hallucinations, and boundary exceptions.',
            'Finalize UI/UX dashboards for operations staff.'
        ]
    },
    {
        phase: 'Phase 4',
        title: 'Live Production Deployment',
        weeks: 'Weeks 9-12',
        icon: <Rocket size={24} />,
        color: 'text-emerald-500',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        points: [
            'Full API switch over and go-live.',
            'Comprehensive handover documentation and staff training.',
            'Transfer workflow ownership or initiate BazzAI managed maintenance.',
            'Begin measuring 90-day ROI against Phase 1 KPIs.'
        ]
    }
];

const faqs = [
    {
        q: "How much of our engineering team's time is required?",
        a: "Very little. BazzAI handles end-to-end engineering. We typically only need a few hours from your IT team to provision secure API keys or database read-access credentials during Phase 1."
    },
    {
        q: "What if we use legacy software without modern APIs?",
        a: "We specialize in bridging legacy systems to modern AI. We can build custom DB adapters, utilize secure SFTP drops, or deploy OCR pipelines to read unstructured PDF outputs from your legacy systems."
    },
    {
        q: "How do you handle sensitive customer or financial data?",
        a: "Every deployment defaults to SOC 2 Type II architectural standards. We enforce strict multi-tenant isolation, utilize TLS 1.3 / AES-256 encryption, and sign zero-retention agreements with LLM providers so your data never trains public models."
    },
    {
        q: "Do you guarantee a return on investment (ROI)?",
        a: "We won't take on an engagement unless the math makes sense. During the free Technical Audit, we build a financial model comparing the cost of manual operations to the cost of our pipeline. If the payback period exceeds 18 months, we don't build it."
    }
];

export default function HowItWorksPage() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    return (
        <main className="flex min-h-screen flex-col items-center bg-slate-50 text-slate-900 pb-24">
            <Header />

            {/* Hero Section */}
            <section className="w-full bg-slate-900 text-white pt-32 pb-24 px-8 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-widest mb-6 fade-up" style={{ animationDelay: '0.1s' }}>
                        Deployment Methodology
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 fade-up" style={{ animationDelay: '0.2s' }}>
                        Zero to Production in 90 Days.
                    </h1>
                    <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto fade-up" style={{ animationDelay: '0.3s' }}>
                        We don't do endless consulting. We execute. Our 4-phase deployment timeline guarantees you go from technical audit to measurable operational ROI in 12 weeks.
                    </p>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="w-full max-w-5xl px-8 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">The 90-Day Execution Timeline</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium">A battle-tested methodology for integrating advanced AI without disrupting your day-to-day operations.</p>
                </div>

                <div className="space-y-12 relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute left-10 top-10 bottom-10 w-1 bg-slate-200 rounded-full"></div>

                    {timeline.map((item, i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-10 relative z-10">
                            {/* Icon Node */}
                            <div className={`w-20 h-20 shrink-0 rounded-3xl ${item.bg} ${item.color} ${item.border} border-2 flex items-center justify-center shadow-lg mx-auto md:mx-0 relative bg-white`}>
                                {item.icon}
                            </div>

                            {/* Content Card */}
                            <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                    <div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${item.color}`}>{item.phase}</p>
                                        <h3 className="text-2xl font-black tracking-tight">{item.title}</h3>
                                    </div>
                                    <div className="inline-flex px-4 py-2 bg-slate-100 rounded-full text-slate-700 text-sm font-black whitespace-nowrap w-max">
                                        {item.weeks}
                                    </div>
                                </div>
                                <ul className="space-y-4">
                                    {item.points.map((point, j) => (
                                        <li key={j} className="flex items-start gap-4">
                                            <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                                            <span className="text-slate-600 font-medium">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="w-full bg-white border-y border-slate-200 py-24 px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tight mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-500 font-medium">Common questions about security, legacy integrations, and internal resource requirements.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                                <button
                                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-slate-100 transition-colors"
                                >
                                    <span className="font-bold text-lg pr-8">{faq.q}</span>
                                    <ChevronDown
                                        size={20}
                                        className={`text-slate-400 transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <div
                                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="text-slate-600 font-medium leading-relaxed border-t border-slate-200 pt-5">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="w-full max-w-4xl px-8 py-24 mx-auto">
                <div className="bg-red-600 rounded-[32px] p-12 text-center shadow-2xl text-white">
                    <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Start Week 1?</h2>
                    <p className="text-red-100 mb-8 max-w-lg mx-auto font-medium text-lg">
                        Book a free technical audit. We'll map out a bespoke 90-day pipeline architecture for your hardest operational workflow.
                    </p>
                    <button className="px-8 py-4 bg-white hover:bg-slate-50 text-red-600 font-black rounded-xl transition-all shadow-md inline-flex items-center gap-2" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                        Book Technical Audit <ArrowRight size={18} />
                    </button>
                </div>
            </section>
        </main>
    );
}
