"use client";
import { ArrowRight, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const phases = [
    {
        week: 'Day 1',
        color: 'var(--color-action)',
        title: 'Factory Workflow Audit',
        desc: 'We deeply map your current order → production → dispatch → payment flow via a 30-minute WhatsApp call.',
        steps: [
            'Operations manager discovery interview',
            'Order flow and supplier dependency mapping',
            'Top 3 bottleneck scoring and quantification',
            'Custom BazzAI configuration blueprint delivered',
        ],
    },
    {
        week: 'Days 2–5',
        color: 'var(--color-secondary)',
        title: 'WhatsApp & System Setup',
        desc: 'We connect your infrastructure and configure your dashboard — no IT team required.',
        steps: [
            'WhatsApp Business API connection (under 2 hours)',
            'Order capture, supplier portal, and payment tracking configured',
            'Customer and supplier contacts imported',
            'Dashboard walkthrough with your team (15 min)',
        ],
    },
    {
        week: 'Days 6–20',
        color: '#2ecc71',
        title: 'Live Production Pilot',
        desc: 'BazzAI runs alongside your existing operations — real orders, real payments, real suppliers.',
        steps: [
            'Production go-live on your WhatsApp number',
            'M-Pesa auto-reconciliation active',
            'KRA invoices generated on dispatch',
            'Customer WhatsApp status notifications enabled',
            'Weekly sync with your operations team',
        ],
    },
    {
        week: 'Day 21+',
        color: 'var(--color-primary)',
        title: 'ROI Review & Subscription',
        desc: 'We review the pilot data, calculate your ROI, and you decide whether to continue.',
        steps: [
            'Joint ROI review — hours saved, payments recovered, orders captured',
            'Subscribe to SME (KES 15,000/mo) or Growth (KES 35,000/mo)',
            'Or cancel — zero invoice, zero obligation',
            'Ongoing account reviews and feature rollouts',
        ],
    },
];

export default function RoadmapPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'var(--font-body)' }}>
            <Header />

            <section className="pt-32 pb-20 px-6 text-center" style={{ background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}>
                <div className="max-w-4xl mx-auto text-white relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest mb-6"
                        style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}>
                        Implementation Roadmap
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
                        From Audit to Production<br /><span style={{ color: '#ff6b35' }}>in 20 Days.</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        No vague consulting timelines. Here is exactly what happens after you book an audit, day by day.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6" style={{ background: 'var(--color-bg-light)' }}>
                <div className="max-w-4xl mx-auto relative">
                    <div className="hidden md:block absolute left-5 top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(to bottom, var(--color-action), var(--color-primary))' }} />
                    <div className="space-y-12">
                        {phases.map((phase, i) => (
                            <div key={i} className="relative flex flex-col md:flex-row gap-8">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg z-10 shrink-0"
                                    style={{ background: phase.color }}>{i + 1}</div>
                                <div className="flex-1 bg-white rounded-2xl border p-8 shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: '#e8eef4' }}>
                                    <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                                        <h3 className="text-xl font-black" style={{ color: 'var(--color-primary)' }}>{phase.title}</h3>
                                        <span className="px-4 py-1.5 rounded-full text-white text-xs font-black shadow-sm" style={{ background: phase.color }}>{phase.week}</span>
                                    </div>
                                    <p className="text-slate-500 mb-6 font-medium leading-relaxed text-sm">{phase.desc}</p>
                                    <ul className="space-y-2.5">
                                        {phase.steps.map((step, j) => (
                                            <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600">
                                                <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" /> {step}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-6 bg-white text-center border-t" style={{ borderColor: '#e8eef4' }}>
                <button className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-black text-white hover:scale-105 transition-all"
                    style={{ background: 'var(--color-action)' }}
                    onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                    Start Step 1 — Free Audit <ArrowRight size={18} />
                </button>
                <p className="text-slate-400 text-xs mt-4">No commitment. Clarity within 30 minutes.</p>
            </section>

            <Footer />
        </div>
    );
}
