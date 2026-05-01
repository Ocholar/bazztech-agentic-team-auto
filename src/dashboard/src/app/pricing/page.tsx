"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const WHATSAPP_URL = 'https://wa.me/15558219787';

const tiers = [
    {
        name: '14-Day Free Pilot',
        description: 'A two-week intensive to prove the AI\'s value on your raw factory data.',
        priceKES: 'FREE',
        priceUSD: '$0',
        period: 'for 14 days',
        btnText: 'Start Your Pilot',
        popular: false,
        features: [
            'Full connection to existing data',
            'Initial factory baseline profiling',
            'Real-time anomaly alerts',
            'Daily operational insights',
            'Risk-free trial period'
        ]
    },
    {
        name: 'Growth Manufacturer',
        description: 'For scaled operations seeking predictive maintenance and precise inventory forecasting.',
        priceKES: 'KES 35,000',
        priceUSD: '$250',
        period: '/ month',
        btnText: 'Unlock Predictive Power',
        popular: true,
        features: [
            'Continuous machine learning models',
            '72h predictive failure warnings',
            'Advanced inventory forecasting',
            'Unlimited factory queries',
            'Automated compliance reporting',
            'Dedicated operations strategist'
        ]
    }
];

const faqs = [
    {
        q: "What happens after the 14-day free pilot?",
        a: "The pilot is strictly limited to 14 days. We then conduct an ROI review with your team. If the system has provided measurable value, you upgrade to the Growth tier. If not, the pilot gracefully expires with no lock-in."
    },
    {
        q: "Are there any disruptive setup fees?",
        a: "Absolutely not. Connection and baseline ingestion are completely free during the pilot. We do not charge separate implementation caps because BazzAI plugs seamlessly into your existing workflows without any new hardware."
    },
    {
        q: "We run a multi-site operation. How is pricing handled?",
        a: "For large conglomerates running multiple factory floors requiring completely siloed data lakes, our Enterprise Tier allows for a fully custom scope of work that scales predictably with your corporate footprint."
    },
    {
        q: "Do I need to hire an IT person to use this?",
        a: "No. The system is managed seamlessly. The value is delivered directly to your production managers via natural language answers, mobile alerts, and a clear executive dashboard."
    }
];

export default function PricingPage() {
    const [currency, setCurrency] = useState<'KES' | 'USD'>('KES');

    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#0F1419', color: '#A0AEC0', fontFamily: 'Inter, sans-serif' }}>
            <Header />

            {/* ─── HERO ─── */}
            <section className="relative overflow-hidden pt-36 pb-20 px-6 border-b border-slate-800">
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 50% 100%, #E07A5F, transparent 60%)' }} />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black text-[#F4F1DE] mb-6 leading-tight"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Zero Capex.<br />
                        <span style={{ color: '#E07A5F' }}>Instant ROI.</span>
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-slate-400">
                        Start with a full production pilot free for 14 days. No expensive hardware, no hidden deployment fees. Just measurable operational savings.
                    </p>
                </div>
            </section>

            {/* ─── PRICING TIERS ─── */}
            <section className="py-16 px-6 -mt-10 relative z-20">
                <div className="max-w-5xl mx-auto flex justify-center mb-8 relative z-30">
                    <div className="bg-[#1A202C] p-1.5 rounded-xl border border-slate-700 flex gap-1 shadow-2xl">
                        <button onClick={() => setCurrency('KES')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${currency === 'KES' ? 'bg-[#E07A5F] text-white' : 'text-slate-400 hover:text-white'}`}>KES (Kenya)</button>
                        <button onClick={() => setCurrency('USD')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${currency === 'USD' ? 'bg-[#E07A5F] text-white' : 'text-slate-400 hover:text-white'}`}>USD (Global)</button>
                    </div>
                </div>
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                    {tiers.map((tier, i) => (
                        <div key={i} className="rounded-3xl p-8 md:p-10 border transition-all hover:-translate-y-1 shadow-2xl relative"
                            style={{
                                borderColor: tier.popular ? '#E07A5F' : '#2D3748',
                                background: tier.popular ? '#1A202C' : '#141A23'
                            }}>

                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#0F1419] shadow-lg"
                                    style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}>
                                    Most Popular For Factories
                                </div>
                            )}

                            <h3 className="text-3xl font-black mb-3 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                {tier.name}
                            </h3>
                            <p className="text-sm leading-relaxed mb-6 h-12 text-slate-400">
                                {tier.description}
                            </p>

                            <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-slate-700">
                                <span className="text-5xl font-black text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    {currency === 'KES' ? tier.priceKES : tier.priceUSD}
                                </span>
                                {tier.priceKES !== 'FREE' && currency === 'KES' && (
                                    <span className="text-xl font-bold" style={{ color: '#E07A5F' }}>/ {tier.priceUSD}</span>
                                )}
                                <span className="text-sm font-semibold text-slate-500">{tier.period}</span>
                            </div>

                            <ul className="space-y-4 mb-10 h-72">
                                {tier.features.map((f, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm font-medium text-slate-300">
                                        <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" style={{ color: tier.popular ? '#E07A5F' : '#81B29A' }} />
                                        <span className="leading-relaxed">{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className="w-full py-4 rounded-xl font-black text-[#F4F1DE] hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                style={{ background: tier.popular ? 'linear-gradient(135deg, #E07A5F, #C5654A)' : '#2D3748' }}
                                onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                                {tier.btnText} <ArrowRight size={18} />
                            </button>

                        </div>
                    ))}
                </div>
            </section>

            {/* ─── ENTERPRISE CALLOUT ─── */}
            <section className="py-20 px-6 border-b border-slate-800">
                <div className="max-w-5xl mx-auto rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-[#F4F1DE] shadow-2xl relative overflow-hidden"
                    style={{ background: '#1A202C', border: '1px solid #2D3748' }}>
                    <div className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl rounded-full" style={{ background: '#E07A5F' }}></div>
                    <div className="relative z-10 md:mr-8 text-center md:text-left">
                        <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-slate-600 text-slate-400">
                            Custom Solutions
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-3 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Enterprise Custom Architecture
                        </h3>
                        <p className="text-base leading-relaxed max-w-xl mb-0 text-slate-400">
                            Beyond the factory floor. We customize AI agents to automate customer care, synthesize sales intelligence, and handle HR admin functions to instantly multiply your operational value.
                        </p>
                    </div>
                    <button
                        className="flex-shrink-0 px-8 py-4 bg-[#0F1419] border border-slate-700 font-black rounded-xl transition-transform hover:scale-105"
                        style={{ color: '#F4F1DE' }}
                        onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                        Request Strategic Audit
                    </button>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="py-24 px-6 bg-[#0F1419]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 text-[#F4F1DE]"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Pricing & Deployment FAQ
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-[#141A23] p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                                <p className="font-black text-lg mb-4 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{faq.q}</p>
                                <p className="leading-relaxed text-slate-400">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="py-24 px-6 text-center border-t border-slate-800">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Transform your factory floor today.
                    </h2>
                    <p className="text-lg mb-10 text-slate-400 font-medium">
                        Discover unprecedented operations visibility within 14 days. Zero risk.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                            style={{ border: '1px solid #81B29A', color: '#81B29A' }}>
                            <MessageSquare size={20} /> Ask a Question
                        </Link>
                        <button
                            className="px-10 py-4 rounded-xl font-bold text-lg text-[#F4F1DE] transition-transform flex items-center justify-center gap-2 hover:scale-105 shadow-xl"
                            style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}
                            onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                            Book Your Free Pilot <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
