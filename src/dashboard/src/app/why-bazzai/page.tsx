"use client";
import { Check, ArrowRight, MessageSquare, Factory, Shield, BarChart3, Zap, Clock } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const reasons = [
    {
        icon: <MessageSquare size={24} />,
        title: 'Works Inside WhatsApp',
        body: 'Your team already lives on WhatsApp. BazzAI structures those conversations into real-time operational data — no new apps, no training, no disruption.',
    },
    {
        icon: <Clock size={24} />,
        title: 'Live in 14 Days, Not 14 Months',
        body: 'Enterprise software takes months to deploy. BazzAI connects to your WhatsApp Business number in under 48 hours and delivers a working pilot within 2 weeks.',
    },
    {
        icon: <Factory size={24} />,
        title: 'Built for African Factories',
        body: 'We integrate with M-Pesa, KRA iTax, KEBS, and FIRS — the exact compliance and payment infrastructure that African manufacturers rely on every day.',
    },
    {
        icon: <BarChart3 size={24} />,
        title: 'Visibility You Never Had',
        body: 'See today\'s orders, supplier ETAs, payment status, and production queue in one dashboard. Replace 4 WhatsApp groups and 6 spreadsheets with one screen.',
    },
    {
        icon: <Shield size={24} />,
        title: 'Compliance on Autopilot',
        body: 'KRA invoices, KEBS batch records, and FIRS VAT calculations are generated automatically as orders flow through the system. No dedicated compliance staff required.',
    },
    {
        icon: <Zap size={24} />,
        title: 'Zero Risk to Start',
        body: 'The 14-day pilot is completely free. If BazzAI doesn\'t measurably improve your operations, you walk away with no invoice and no obligation.',
    },
];

const comparisons = [
    { feature: 'Deployment time', bazzai: '14 days', others: '3–12 months' },
    { feature: 'Setup cost', bazzai: 'KES 0 (free pilot)', others: '$15K–$100K' },
    { feature: 'Team training needed', bazzai: 'None (uses WhatsApp)', others: '2–4 weeks' },
    { feature: 'M-Pesa integration', bazzai: 'Native', others: 'Custom build' },
    { feature: 'KRA/FIRS compliance', bazzai: 'Automatic', others: 'Manual or N/A' },
    { feature: 'Supplier tracking', bazzai: 'WhatsApp-native', others: 'Requires portal adoption' },
];

export default function WhyBazzAI() {
    return (
        <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'var(--font-body)' }}>
            <Header />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}>
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 50%, #ff6b35, transparent 60%)' }} />
                <div className="max-w-5xl mx-auto text-center relative z-10 text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest mb-6"
                        style={{ border: '1px solid rgba(255,107,53,0.3)', background: 'rgba(255,107,53,0.1)', color: '#ff6b35' }}>
                        <Factory size={14} /> Why Choose BazzAI
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight" style={{ fontFamily: 'var(--font-headline)' }}>
                        The Only Operations Platform<br />
                        <span style={{ color: '#ff6b35' }}>Built for African Manufacturers.</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        ERPs are too slow. Spreadsheets are too fragile. WhatsApp groups are too chaotic.
                        BazzAI sits in the middle — giving you structured visibility without software complexity.
                    </p>
                    <button
                        className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 inline-flex items-center gap-2"
                        style={{ background: 'var(--color-action)' }}
                        onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                        Start Free 14-Day Pilot <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            {/* 6 Reasons */}
            <section className="py-24 px-6" style={{ background: 'var(--color-bg-light)' }}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-primary)' }}>
                            Six Reasons Factory Managers Choose BazzAI
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reasons.map((r, i) => (
                            <div key={i} className="bg-white rounded-2xl p-7 border shadow-sm hover:shadow-lg transition-all" style={{ borderColor: '#e8eef4' }}>
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white" style={{ background: 'var(--color-action)' }}>
                                    {r.icon}
                                </div>
                                <h3 className="font-black text-base mb-3" style={{ color: 'var(--color-primary)' }}>{r.title}</h3>
                                <p className="text-sm leading-relaxed text-slate-500">{r.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-headline)' }}>
                            BazzAI vs. Traditional Software
                        </h2>
                        <p className="text-slate-500">Side-by-side comparison against ERPs, custom builds, and manual processes.</p>
                    </div>
                    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: '#e8eef4' }}>
                        <div className="grid grid-cols-3 text-xs font-black uppercase tracking-widest py-4 px-6" style={{ background: 'var(--color-primary)', color: 'white' }}>
                            <span>Feature</span>
                            <span className="text-center">BazzAI</span>
                            <span className="text-center">Others</span>
                        </div>
                        {comparisons.map((c, i) => (
                            <div key={i} className={`grid grid-cols-3 py-4 px-6 text-sm border-b ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`} style={{ borderColor: '#e8eef4' }}>
                                <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{c.feature}</span>
                                <span className="text-center font-semibold" style={{ color: '#2ecc71' }}>{c.bazzai}</span>
                                <span className="text-center text-slate-400">{c.others}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6" style={{ background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}>
                <div className="max-w-3xl mx-auto text-center text-white">
                    <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
                        See the Difference on<br /><span style={{ color: '#ff6b35' }}>Your Factory Floor.</span>
                    </h2>
                    <button
                        className="px-10 py-4 rounded-xl font-black text-lg text-white hover:scale-105 transition-all inline-flex items-center gap-2"
                        style={{ background: 'var(--color-action)', boxShadow: '0 8px 32px rgba(255,107,53,0.4)' }}
                        onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                        Book Factory Demo <ArrowRight size={20} />
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
