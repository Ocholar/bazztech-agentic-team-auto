"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Apple, CheckCircle2, Factory } from 'lucide-react';

const features = [
    { title: 'Perishable Order Batching', desc: 'Auto-group incoming WhatsApp orders for fresh goods by delivery route and expiration windows.' },
    { title: 'Raw Material Traceability', desc: 'Link final product batches all the way back to the raw material supplier for instant recall readiness.' },
    { title: 'Retailer Credit Tracking', desc: 'Monitor outstanding balances for local supermarkets and auto-send WhatsApp payment reminders.' },
    { title: 'KEBS Compliance Records', desc: 'Generate daily production logs and hygiene checklist confirmations formatted for immediate KEBS auditing.' }
];

export default function FoodAndBevPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'var(--font-body)' }}>
            <Header />
            <section className="pt-32 pb-20 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}>
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 50%, #ff6b35, transparent 60%)' }} />
                <div className="max-w-5xl mx-auto text-center relative z-10 text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest mb-6"
                        style={{ border: '1px solid rgba(255,107,53,0.3)', background: 'rgba(255,107,53,0.1)', color: '#ff6b35' }}>
                        <Apple size={14} /> Food & Beverage Manufacturing
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight" style={{ fontFamily: 'var(--font-headline)' }}>
                        Perishable Goods Demand<br />
                        <span style={{ color: '#ff6b35' }}>Instant Orchestration.</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        In food manufacturing, a lost WhatsApp order isn't just lost revenue — it's spoiled inventory. BazzAI connects your production line directly to your retail customers in real time.
                    </p>
                    <button className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 inline-flex items-center gap-2"
                        style={{ background: 'var(--color-action)' }}
                        onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                        See a Live F&B Demo <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg" style={{ background: 'var(--color-primary)' }}>
                            <Factory size={28} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-headline)' }}>
                            Stop tracing batches on paper spreadsheets.
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            Food safety compliance and rapid dispatch are the two hardest constraints in F&B. BazzAI structures your raw material intake and links it directly to dispatch invoices without your team writing a single thing down.
                        </p>
                        <ul className="space-y-4">
                            {['Zero-touch delivery notes for fresh goods', 'Instant M-Pesa matching for cash-on-delivery', 'Automated KEBS compliance logs built from chat data'].map((item, i) => (
                                <li key={i} className="flex gap-3 text-slate-800 font-medium">
                                    <CheckCircle2 size={20} style={{ color: 'var(--color-action)' }} className="flex-shrink-0" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {features.map((f, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm" style={{ borderColor: '#e8eef4' }}>
                                <h3 className="font-black text-sm mb-2" style={{ color: 'var(--color-primary)' }}>{f.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 text-center border-t" style={{ borderColor: '#e8eef4' }}>
                <h2 className="text-3xl font-black mb-6" style={{ color: 'var(--color-primary)' }}>Ready to streamline food production?</h2>
                <button className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 inline-flex items-center gap-2"
                    style={{ background: 'var(--color-action)' }}
                    onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                    Start Free 14-Day Pilot <ArrowRight size={18} />
                </button>
            </section>
            <Footer />
        </div>
    );
}
