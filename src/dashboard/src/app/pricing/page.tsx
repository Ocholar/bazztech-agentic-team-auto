"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Check, CheckCircle2, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_URL = 'https://wa.me/15558219787';

const tiers = [
    {
        name: 'SME Manufacturer',
        description: 'For growing factories (10-30 employees) needing structured order management and basic compliance.',
        priceKES: 'KES 15,000',
        priceUSD: '$110',
        period: '/ month',
        btnText: 'Start 14-Day Free Pilot',
        popular: false,
        features: [
            'WhatsApp Order Capture',
            'Automated Delivery Notes',
            'Daily Production Dashboard',
            'Up to 3 WhatsApp Numbers',
            'Basic Email Support'
        ]
    },
    {
        name: 'Growth Manufacturer',
        description: 'For scaled operations (30-100 employees) requiring full KRA integration, supplier tracking, and M-Pesa matching.',
        priceKES: 'KES 35,000',
        priceUSD: '$250',
        period: '/ month',
        btnText: 'Book Architecture Audit',
        popular: true,
        features: [
            'Everything in SME, plus:',
            'KRA iTax Automated Invoicing',
            'Supplier Status Portal & Tracking',
            'M-Pesa Auto-Reconciliation',
            'KEBS Batch Tracking Ready',
            'Unlimited WhatsApp Numbers',
            'Dedicated Account Manager'
        ]
    }
];

const faqs = [
    {
        q: "What happens after the 14-day free pilot?",
        a: "If BazzAI has reduced your manual workload, you simply subscribe to the SME or Growth plan. If it hasn't worked for your factory, we shut down the connection. There is no invoice, no lock-in, and you retain all your WhatsApp data."
    },
    {
        q: "Do I need to pay per user or per device?",
        a: "No. Pricing is flat based on the tier. The SME plan covers up to 3 WhatsApp numbers (e.g., Sales, Production, Finance), while the Growth plan supports unlimited numbers."
    },
    {
        q: "Are there any setup or integration fees?",
        a: "Standard setups (connecting your WhatsApp, setting up the order board, basic invoice configuration) are completely free. Custom integrations to legacy ERPs, SAP, or Sage will require a separate technical audit and may incur an architecture fee."
    },
    {
        q: "We are based outside Kenya. Can we use BazzAI?",
        a: "Yes. Our standard USD pricing ($110/mo for SME, $250/mo for Growth) applies across Nigeria, Uganda, Ghana, Tanzania, and other African markets. We integrate with local WhatsApp Business APIs and can build out custom tax integrations (e.g., FIRS in Nigeria) upon request."
    }
];

export default function PricingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'var(--font-body)' }}>
            <Header />

            {/* ─── HERO ─── */}
            <section style={{ paddingTop: '5rem', background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}
                className="relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-8"
                    style={{ background: 'radial-gradient(circle at 50% 100%, #ff6b35, transparent 60%)' }} />
                <div className="max-w-4xl mx-auto px-6 py-20 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
                        style={{ fontFamily: 'var(--font-headline)' }}>
                        No Hidden Hardware Fees.<br />
                        <span style={{ color: '#ff6b35' }}>Just ROI.</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto mb-0 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Start with a full production setup for 14 days free. Zero implementation costs, no hardware to buy, and no long-term contracts.
                    </p>
                </div>
            </section>

            {/* ─── PRICING TIERS ─── */}
            <section className="py-16 px-6 -mt-10 relative z-20">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                    {tiers.map((tier, i) => (
                        <div key={i} className="bg-white rounded-[2rem] p-8 md:p-10 border transition-all hover:-translate-y-1 shadow-xl relative"
                            style={{
                                borderColor: tier.popular ? 'var(--color-action)' : '#e8eef4',
                                background: tier.popular ? '#fafcff' : '#ffffff'
                            }}>

                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg"
                                    style={{ background: 'var(--color-action)' }}>
                                    Most Popular for Factories
                                </div>
                            )}

                            <h3 className="text-2xl font-black mb-3" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-headline)' }}>
                                {tier.name}
                            </h3>
                            <p className="text-sm leading-relaxed mb-6 h-10" style={{ color: '#7f8c8d' }}>
                                {tier.description}
                            </p>

                            <div className="flex items-baseline gap-2 mb-8 pb-8 border-b" style={{ borderColor: '#e8eef4' }}>
                                <span className="text-4xl font-black tracking-tight" style={{ color: 'var(--color-primary)' }}>{tier.priceKES}</span>
                                <span className="text-xl font-bold" style={{ color: 'var(--color-secondary)' }}>/ {tier.priceUSD}</span>
                                <span className="text-sm font-semibold" style={{ color: '#7f8c8d' }}>{tier.period}</span>
                            </div>

                            <ul className="space-y-4 mb-10 h-64">
                                {tier.features.map((f, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                                        <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" style={{ color: tier.popular ? 'var(--color-action)' : '#2ecc71' }} />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className="w-full py-4 rounded-xl font-black text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                style={{ background: tier.popular ? 'var(--color-action)' : 'var(--color-primary)' }}
                                onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                                {tier.btnText} <ArrowRight size={18} />
                            </button>

                            {!tier.popular && (
                                <p className="text-center text-[10px] font-bold mt-4" style={{ color: '#2ecc71' }}>
                                    ✓ 14-day free pilot included
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── ENTERPRISE CALLOUT ─── */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-2xl relative overflow-hidden"
                    style={{ background: 'var(--color-primary)' }}>
                    <div className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl rounded-full" style={{ background: '#ff6b35' }}></div>
                    <div className="relative z-10 md:mr-8 text-center md:text-left">
                        <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border"
                            style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}>
                            Factory Scale
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-3 leading-tight" style={{ fontFamily: 'var(--font-headline)' }}>
                            Full-Scale Corporate Architecture
                        </h3>
                        <p className="text-sm font-medium leading-relaxed max-w-lg mb-0" style={{ color: 'rgba(255,255,255,0.8)' }}>
                            Have 100+ employees? We build custom, isolated LLM pipelines that tie into legacy ERPs (SAP, Oracle) on dedicated cloud instances. Contact us for a custom Scope of Work.
                        </p>
                    </div>
                    <button
                        className="flex-shrink-0 px-8 py-4 bg-white font-black rounded-xl transition-transform hover:scale-105"
                        style={{ color: 'var(--color-primary)' }}
                        onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                        Request Custom SOW
                    </button>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="py-24 px-6" style={{ background: 'var(--color-bg-light)' }}>
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-4"
                            style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-primary)' }}>
                            Pricing & Deployment FAQ
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <p className="font-black text-sm mb-3" style={{ color: 'var(--color-primary)' }}>{faq.q}</p>
                                <p className="text-sm leading-relaxed" style={{ color: '#7f8c8d' }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="py-24 px-6 text-center border-t border-slate-100 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-headline)' }}>
                        Ready to digitize your factory?
                    </h2>
                    <p className="text-lg mb-8 text-slate-500 font-medium">
                        Speak to a specialist to book your audit and launch your 14-day pilot.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="px-10 py-4 rounded-xl font-black text-lg text-white hover:scale-105 transition-transform flex items-center justify-center gap-2"
                            style={{ background: '#25D366', boxShadow: '0 8px 24px rgba(37,211,102,0.3)' }}>
                            <MessageSquare size={20} /> Chat on WhatsApp
                        </Link>
                        <button
                            className="px-10 py-4 rounded-xl font-bold text-lg border-2 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                            style={{ borderColor: 'var(--color-action)', color: 'var(--color-action)' }}
                            onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                            Book an Audit Call <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
