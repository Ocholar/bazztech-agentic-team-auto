"use client";
import { Check, ArrowRight, MessageSquare, Factory, Shield, BarChart3, Zap, Clock, Cpu, Target, Database, LineChart } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const reasons = [
    {
        icon: <Database size={24} />,
        title: 'Equipment-Telemetry',
        body: 'Real-time OEE tracking across every production line. BazzAI ingests SCADA, PLC, and sensor data to detect micro-anomalies 72 hours before they cause unplanned downtime.',
    },
    {
        icon: <Clock size={24} />,
        title: 'Live in 14 Days, Not 14 Months',
        body: 'Enterprise ERPs take months. BazzAI connects to your existing factory systems in under 48 hours and delivers a working pilot with measurable ROI within 2 weeks.',
    },
    {
        icon: <Factory size={24} />,
        title: 'Built for African Manufacturing',
        body: 'Native M-Pesa settlement, KRA iTax filing, KEBS batch compliance, and FIRS VAT automation — the exact regulatory and payment infrastructure your factory depends on.',
    },
    {
        icon: <BarChart3 size={24} />,
        title: 'Production-Comms Dashboard',
        body: 'Replace 4 WhatsApp groups and 6 spreadsheets with one screen. See live order status, supplier ETAs, shift performance, and payment reconciliation in real time.',
    },
    {
        icon: <Shield size={24} />,
        title: 'Audit-Vision Compliance',
        body: 'Quality assurance records, KRA invoices, and KEBS batch certificates are generated automatically as production flows through the system. Always audit-ready.',
    },
    {
        icon: <Zap size={24} />,
        title: 'Zero Risk to Start',
        body: 'The 14-day pilot is completely free. If BazzAI doesn\'t measurably improve your OEE and reduce scrap rates, you walk away with no invoice and no obligation.',
    },
];

const comparisons = [
    { feature: 'Deployment time', bazzai: '14 days', others: '3–12 months' },
    { feature: 'Setup cost', bazzai: 'KES 0 (free pilot)', others: '$15K–$100K' },
    { feature: 'OEE tracking', bazzai: 'Real-time AI', others: 'Manual spreadsheets' },
    { feature: 'Predictive maintenance', bazzai: '72h advance alerts', others: 'Reactive (break-fix)' },
    { feature: 'M-Pesa integration', bazzai: 'Native', others: 'Custom build' },
    { feature: 'KRA/KEBS compliance', bazzai: 'Automatic', others: 'Manual or N/A' },
    { feature: 'Factory AI querying', bazzai: 'Natural language', others: 'Not available' },
    { feature: 'Data isolation', bazzai: 'Dedicated tenant silo', others: 'Shared database' },
];

const metrics = [
    { value: '35%', label: 'Avg. Downtime Reduction', color: '#E07A5F' },
    { value: '22%', label: 'OEE Improvement', color: '#81B29A' },
    { value: '4.2x', label: 'ROI Within 90 Days', color: '#F2CC8F' },
    { value: '60%', label: 'Faster Compliance Reporting', color: '#4299E1' },
];

export default function WhyBazzAI() {
    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#0F1419', color: '#A0AEC0', fontFamily: 'Inter, sans-serif' }}>
            <Header />

            {/* Hero */}
            <section className="pt-36 pb-24 px-6 relative overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#E07A5F 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-900 text-xs font-bold mb-7 text-slate-300">
                        <Factory size={14} className="text-[#E07A5F]" /> Why Choose BazzAI
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-[#F4F1DE] mb-6 leading-tight"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        The Only Operations Platform<br />
                        <span style={{ color: '#E07A5F' }}>Built for African Manufacturers.</span>
                    </h1>
                    <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                        ERPs are too slow. Spreadsheets are too fragile. WhatsApp groups are too chaotic.
                        BazzAI sits in the middle — giving you structured visibility without software complexity.
                    </p>

                    <div className="flex items-center gap-3 mb-8 px-4 py-2 rounded-xl bg-[#F2CC8F]/10 border border-[#F2CC8F]/20 w-fit mx-auto">
                        <LineChart size={14} className="text-[#F2CC8F] animate-pulse" />
                        <span className="text-xs font-bold text-[#F4F1DE]">
                            Join 15+ factories live. <span className="text-[#F2CC8F]">Only 4 pilot slots remaining for May.</span>
                        </span>
                    </div>

                    <Link href="/register"
                        className="px-8 py-4 rounded-full font-bold text-[#F4F1DE] inline-flex items-center gap-2 transition-all hover:scale-105 shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}>
                        Start Free 14-Day Pilot <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* Manufacturing Impact Metrics */}
            <section className="py-16 px-6 border-b border-slate-800 bg-[#141A23]">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {metrics.map((m, i) => (
                            <div key={i} className="text-center p-6 rounded-2xl border border-slate-800 bg-[#0F1419]">
                                <div className="text-3xl md:text-4xl font-black mb-2" style={{ color: m.color, fontFamily: 'Space Grotesk, sans-serif' }}>
                                    {m.value}
                                </div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{m.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6 Reasons */}
            <section className="py-24 px-6 border-b border-slate-800" style={{ background: '#0F1419' }}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 text-[#F4F1DE]"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Six Reasons Factory Managers Choose BazzAI
                        </h2>
                        <p className="text-lg max-w-2xl mx-auto text-slate-400">
                            Purpose-built for the operational realities of African manufacturing — from power instability to compliance complexity.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reasons.map((r, i) => (
                            <div key={i} className="rounded-2xl p-7 border border-slate-800 bg-[#141A23] hover:border-slate-600 transition-all">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-[#0F1419]"
                                    style={{ background: '#E07A5F' }}>
                                    {r.icon}
                                </div>
                                <h3 className="font-black text-base mb-3 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{r.title}</h3>
                                <p className="text-sm leading-relaxed text-slate-400">{r.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-24 px-6 border-b border-slate-800 bg-[#141A23]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 text-[#F4F1DE]"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            BazzAI vs. Traditional Software
                        </h2>
                        <p className="text-lg text-slate-400">Side-by-side comparison against ERPs, custom builds, and manual processes.</p>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-slate-700">
                        <div className="grid grid-cols-3 text-xs font-black uppercase tracking-widest py-4 px-6 bg-[#E07A5F] text-[#F4F1DE]">
                            <span>Feature</span>
                            <span className="text-center">BazzAI</span>
                            <span className="text-center">Others</span>
                        </div>
                        {comparisons.map((c, i) => (
                            <div key={i} className={`grid grid-cols-3 py-4 px-6 text-sm border-b border-slate-800 ${i % 2 === 0 ? 'bg-[#0F1419]' : 'bg-[#141A23]'}`}>
                                <span className="font-bold text-[#F4F1DE]">{c.feature}</span>
                                <span className="text-center font-semibold text-[#81B29A] flex items-center justify-center gap-1.5">
                                    <Check size={14} className="flex-shrink-0" /> {c.bazzai}
                                </span>
                                <span className="text-center text-slate-500">{c.others}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center border-t border-slate-800">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black text-[#F4F1DE] mb-6"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        See the Difference on<br /><span style={{ color: '#E07A5F' }}>Your Factory Floor.</span>
                    </h2>
                    <p className="text-lg mb-10 text-slate-400">
                        Start a 14-Day Pilot and watch the AI Brain analyze your operations in real time.
                    </p>
                    <Link href="/register"
                        className="px-10 py-4 rounded-full font-black text-lg text-[#F4F1DE] hover:scale-105 transition-all inline-flex items-center gap-2 shadow-lg mx-auto"
                        style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}>
                        Start Free 14-Day Pilot <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
