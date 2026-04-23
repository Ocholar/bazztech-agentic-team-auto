"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Truck, PackageCheck, Map, ShieldAlert } from 'lucide-react';

const features = [
    { icon: <Map />, title: 'Driver WhatsApp Check-ins', desc: 'Delivery drivers confirm drop-offs via WhatsApp, instantly updating your central view.' },
    { icon: <PackageCheck />, title: 'Automatic Inventory Outflow', desc: 'Invoices instantly reduce inventory counts, preventing backorders.' },
    { icon: <ShieldAlert />, title: 'Credit Limit Enforcement', desc: 'Automatically reject or flag orders from distributors who have exceeded their rolling credit limits.' }
];

export default function FMCGPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'var(--font-body)' }}>
            <Header />
            <section className="pt-32 pb-20 px-6 relative overflow-hidden" style={{ background: 'var(--color-primary)' }}>
                <div className="max-w-5xl mx-auto text-center relative z-10 text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest mb-6"
                        style={{ border: '1px solid rgba(255,107,53,0.3)', background: 'rgba(255,107,53,0.1)', color: '#ff6b35' }}>
                        <Truck size={14} /> FMCG Distribution
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight" style={{ fontFamily: 'var(--font-headline)' }}>
                        Supply 500+ Retailers.<br />
                        <span style={{ color: '#ff6b35' }}>Without the Chaos.</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Manage hundreds of regional distributors, track dispatch trucks in real time, and reconcile hundreds of daily M-Pesa payments without lifting a finger.
                    </p>
                    <button className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 inline-flex items-center gap-2"
                        style={{ background: 'var(--color-action)' }}
                        onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                        Book Distribution Audit <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-5xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--color-primary)' }}>High Volume. Zero Delay.</h2>
                    <p className="text-slate-600">The more you distribute, the more cash gets lost in reconciliation. We fix that.</p>
                </div>
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl border shadow-sm text-center" style={{ borderColor: '#e8eef4' }}>
                            <div className="mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white" style={{ background: 'var(--color-action)' }}>{f.icon}</div>
                            <h3 className="font-black text-lg mb-3" style={{ color: 'var(--color-primary)' }}>{f.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
}
