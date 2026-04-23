"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Leaf, Users, HardDrive, DollarSign } from 'lucide-react';

const features = [
    { icon: <Users />, title: 'Smallholder DB Sync', desc: 'Sync farmer drop-offs at weighing stations directly to your central database via mobile numbers.' },
    { icon: <HardDrive />, title: 'Offline-First Intake', desc: 'Capture intake weights offline; BazzAI syncs them automatically when the network returns.' },
    { icon: <DollarSign />, title: 'Instant Farmer Payments', desc: 'Trigger bulk M-Pesa payouts to thousands of farmers with a single click once quality is verified.' }
];

export default function AgroPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'var(--font-body)' }}>
            <Header />
            <section className="pt-32 pb-20 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}>
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 50%, #ff6b35, transparent 50%)' }} />
                <div className="max-w-5xl mx-auto text-center relative z-10 text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest mb-6"
                        style={{ border: '1px solid rgba(255,107,53,0.3)', background: 'rgba(255,107,53,0.1)', color: '#ff6b35' }}>
                        <Leaf size={14} /> Agro-Processing
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight" style={{ fontFamily: 'var(--font-headline)' }}>
                        Organize the Unorganized.<br />
                        <span style={{ color: '#ff6b35' }}>Scale Faster.</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Agro-processing relies on thousands of smallholder farmers. BazzAI handles the chaotic intake data, weight reconciliations, and bulk farmer payouts so you can focus on processing.
                    </p>
                    <button className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 inline-flex items-center gap-2"
                        style={{ background: 'var(--color-action)' }}
                        onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                        Book Agro Audit <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-5xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--color-primary)' }}>Farm to Factory. Completely Digital.</h2>
                    <p className="text-slate-600">Eliminate the paper chits and Excel sheets holding back your intake speed.</p>
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
