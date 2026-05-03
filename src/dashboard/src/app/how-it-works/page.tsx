"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
    ArrowRight, Cpu, Network, LineChart, Target,
    ChevronDown, ShieldCheck, Database, Zap, Clock, Check
} from 'lucide-react';
import Link from 'next/link';

/* ─── 4-Step Process ─── */
const steps = [
    {
        phase: '01',
        title: 'Secure Path to Ingestion',
        duration: '24h Connectivity',
        icon: <Database size={22} />,
        color: '#81B29A',
        points: [
            'We establish secure API bridges to your SCADA, PLC, and ERP systems (SAP, Sage, Oracle).',
            'Data is isolated into a dedicated tenant silo—never mixed with other manufacturers.',
            'Zero disruption to factory lines. We read existing logs without needing new hardware sensors.',
        ],
    },
    {
        phase: '02',
        title: 'The Manufacturing Blueprint',
        duration: 'Historical Profiling',
        icon: <Network size={22} />,
        color: '#F2CC8F',
        points: [
            'BazzAI analyzes up to 24 months of historical production and downtime data.',
            'It maps the unique thermal and mechanical "fingerprint" of your specific production lines.',
            'Normal operating variances are identified so the AI can spot true anomalies with 99% accuracy.',
        ],
    },
    {
        phase: '03',
        title: 'Hybrid RAG Intelligence',
        duration: 'Instant Querying',
        icon: <Target size={22} />,
        color: '#E07A5F',
        points: [
            'Machine manuals (PDF), shift logs, and inventory records are embedded into your Factory Brain.',
            'Query your data in plain English: "Why did the Corrugator stop 3 times during Shift B?"',
            'Predictive alerts (72h prior) prevent failures before they halt your production run.',
        ],
    },
    {
        phase: '04',
        title: 'Operational Reinforcement',
        duration: 'Self-Optimizing',
        icon: <LineChart size={22} />,
        color: '#4299E1',
        points: [
            'Your engineering team’s feedback fine-tunes the AI models directly from the factory floor.',
            'Production forecasts automatically adapt to supply chain shifts and seasonal demand.',
            'Shift from reactive firefighting to a data-driven, strategic manufacturing expansion.',
        ],
    },
];

/* ─── Business Outcomes ─── */
const outcomes = [
    {
        icon: <Clock size={24} />,
        title: 'Equipment-Telemetry',
        how: 'Catch micro-anomalies early. Our telemetry engine alerts maintenance teams days before a part fails, moving your factory from reactive break-fix to predictive care.',
        color: '#E07A5F',
    },
    {
        icon: <Target size={24} />,
        title: 'ERP-Bridge',
        how: 'Precision forecasting integrated with your supply chain. We anticipate seasonal demand shifts and suggest exact reorder quantities with zero-stock buffers.',
        color: '#F2CC8F',
    },
    {
        icon: <Cpu size={24} />,
        title: 'Production-Comms',
        how: 'The central dashboard for factory intelligence. No more manual spreadsheets—analyze manufacturing logs instantly for faster, data-driven decisions.',
        color: '#81B29A',
    },
    {
        icon: <ShieldCheck size={24} />,
        title: 'Audit-Vision',
        how: 'Quality assurance and compliance reports automatically generated. Ensure your factory is audit-ready at all times with verified, structured documentation.',
        color: '#4299E1',
    },
];


/* ─── FAQ ─── */
const faqs = [
    {
        q: 'Do we need data scientists to use BazzAI?',
        a: 'Absolutely not. BazzAI is designed for factory managers, COOs, and maintenance leads. If you know how to ask a question in plain English, you can use BazzAI.',
    },
    {
        q: 'Will this disrupt our current manufacturing lines?',
        a: 'Zero disruption. BazzAI connects to your existing data streams. We do not require you to halt production to install new hardware or sensors.',
    },
    {
        q: 'How secure is our factory data?',
        a: 'We use bank-grade encryption. Your data remains in an isolated container that is strictly partitioned. BazzAI never shares your proprietary production data points across other clients.',
    },
    {
        q: 'Can BazzAI integrate with our old ERP?',
        a: 'Yes. BazzAI is built to ingest data from diverse sources including modern APIs, CSV dumps, databases, and even legacy ERP exports. Our system handles the hard work of making sense of it.',
    },
    {
        q: 'How quickly does the AI start providing value?',
        a: 'Typically, BazzAI provides baseline insights within the first few days of data ingestion. Predictive value peaks rapidly as it learns your specific factory patterns during the 14-Day Pilot.',
    },
];

export default function HowItWorksPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#0F1419', color: '#A0AEC0', fontFamily: 'Inter, sans-serif' }}>
            <Header />

            {/* ─── HERO ─── */}
            <section className="relative overflow-hidden pt-36 pb-24 px-6 border-b border-slate-800">
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#E07A5F 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-900 text-xs font-bold mb-7 text-slate-300">
                        <Zap size={14} className="text-[#E07A5F]" /> Seamless Integration. Immediate Value.
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-[#F4F1DE] mb-6 leading-tight"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        From Raw Data to<br />
                        <span style={{ color: '#E07A5F' }}>Competitive Intelligence</span>
                    </h1>
                    <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                        BazzAI connects silently to your operations, learning your specific factory rhythms to predict issues before they cost you money.
                    </p>

                    <div className="flex items-center gap-3 mb-6 px-4 py-2 rounded-xl bg-[#F2CC8F]/10 border border-[#F2CC8F]/20 w-fit mx-auto">
                        <LineChart size={14} className="text-[#F2CC8F] animate-pulse" />
                        <span className="text-xs font-bold text-[#F4F1DE]">
                            Join 15+ factories live. <span className="text-[#F2CC8F]">Only 4 pilot slots remaining for May.</span>
                        </span>
                    </div>
                </div>
            </section>

            {/* ─── THE 4-STEP PROCESS ─── */}
            <section className="py-24 px-6 border-b border-slate-800 bg-[#141A23]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 text-[#F4F1DE]"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            How The AI Brain Works
                        </h2>
                        <p className="text-lg max-w-xl mx-auto text-slate-400">
                            A clear, proven path to modernizing your factory without the risk of heavy IT projects.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="hidden md:block absolute left-8 top-10 bottom-10 w-px bg-slate-700" />

                        <div className="space-y-12">
                            {steps.map((p, i) => (
                                <div key={i} className="flex gap-8 items-start relative z-10">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-lg border border-slate-700"
                                        style={{ background: '#1A202C' }}>
                                        {p.icon}
                                    </div>

                                    <div className="flex-1 bg-[#1A202C] rounded-2xl p-7 border border-slate-800 transition-all hover:border-slate-600">
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
                                                style={{ background: `${p.color}15`, color: p.color }}>
                                                Step {p.phase}
                                            </span>
                                            <h3 className="text-xl font-black text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                                {p.title}
                                            </h3>
                                            <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-400">
                                                {p.duration}
                                            </span>
                                        </div>
                                        <ul className="space-y-3">
                                            {p.points.map((pt, j) => (
                                                <li key={j} className="flex items-start gap-3">
                                                    <Check size={16} className="flex-shrink-0 mt-0.5" style={{ color: p.color }} />
                                                    <span className="leading-relaxed">{pt}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── BUSINESS OUTCOMES ─── */}
            <section className="py-24 px-6 border-b border-slate-800" style={{ background: '#0F1419' }}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 text-[#F4F1DE]"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Built For Business Outcomes
                        </h2>
                        <p className="text-lg max-w-2xl mx-auto text-slate-400">
                            Technology is just the enabler. BazzAI focuses entirely on driving measurable ROI for your manufacturing operations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {outcomes.map((m, i) => (
                            <div key={i} className="rounded-2xl p-8 border border-slate-800 bg-[#141A23] hover:border-slate-600 transition-colors">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-[#0F1419]"
                                    style={{ background: m.color }}>
                                    {m.icon}
                                </div>
                                <h3 className="text-xl font-black mb-3 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{m.title}</h3>
                                <p className="leading-relaxed text-slate-400">{m.how}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="py-24 px-6 bg-[#141A23]">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black mb-4 text-[#F4F1DE]"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Common Questions
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0F1419]">
                                <button
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-900 transition-colors"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    <span className="font-bold pr-8 text-[#F4F1DE]">{faq.q}</span>
                                    <ChevronDown size={18} className="flex-shrink-0 transition-transform duration-300 text-[#E07A5F]"
                                        style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none' }} />
                                </button>
                                <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="leading-relaxed border-t border-slate-800 pt-5 text-slate-400">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section className="py-24 px-6 text-center border-t border-slate-800">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black text-[#F4F1DE] mb-6"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Unleash Your Factory's Potential
                    </h2>
                    <p className="text-lg mb-10 text-slate-400">
                        Start a 14-Day Pilot and watch the AI Brain analyze your operations in real time.
                    </p>
                    <Link href="/register"
                        className="px-8 py-4 rounded-full font-bold text-[#F4F1DE] flex items-center gap-2 justify-center transition-all hover:scale-105 shadow-lg mx-auto"
                        style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}>
                        Start Free 14-Day Pilot <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
