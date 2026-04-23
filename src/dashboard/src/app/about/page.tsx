"use client";
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowRight, Factory, BarChart2, ShieldCheck, Code2,
    Network, Layers, Activity, MapPin, Users, Briefcase
} from 'lucide-react';

const stats = [
    { val: '14 Days', label: 'Avg Time to ROI' },
    { val: '3M+', label: 'Orders Processed' },
    { val: '98%', label: 'Order Accuracy' },
    { val: '5', label: 'African Countries' },
];

const capabilities = [
    {
        icon: <Factory size={22} />,
        title: 'Factory Workflow Orchestration',
        desc: 'Custom pipelines tying WhatsApp orders, KRA/FIRS invoicing, and M-Pesa payments into a single automated nervous system.',
    },
    {
        icon: <Network size={22} />,
        title: 'Supplier Telemetry & Tracking',
        desc: 'Automated supplier check-ins and delivery tracking via WhatsApp Business API. Chaotic relationships become structured data.',
    },
    {
        icon: <Layers size={22} />,
        title: 'Inventory & Batch Compliance',
        desc: 'Digitizing batch records and raw material traceability for KEBS and regional health standards, without dedicated QA staff.',
    },
    {
        icon: <Activity size={22} />,
        title: 'Real-Time Payment Reconciliation',
        desc: 'Connecting dispatch records to M-Pesa and banking APIs for instant, zero-touch invoice matching.',
    },
];

const values = [
    { icon: <BarChart2 size={18} />, title: 'Visibility Replaces Chaos', body: 'Most factory downtime comes from informal WhatsApp communication. We structure that into visible, measurable data.' },
    { icon: <ShieldCheck size={18} />, title: 'Compliance on Autopilot', body: 'KRA, KEBS, and FIRS compliance becomes an automatic byproduct of doing business — not a manual burden.' },
    { icon: <Code2 size={18} />, title: 'Zero Software Training', body: 'We build directly into WhatsApp so adoption is immediate. No new apps, no onboarding friction.' },
];

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white text-slate-900 pb-0 overflow-x-hidden" style={{ fontFamily: 'var(--font-body)' }}>
            <Header />

            {/* ── HERO — Company Focus ── */}
            <section className="w-full relative pt-36 pb-28 px-8 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}>
                <div className="absolute top-0 right-1/4 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-20" style={{ background: 'var(--color-action)' }} />
                <div className="max-w-5xl mx-auto relative z-10 text-white text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest mb-8"
                        style={{ background: 'rgba(255,107,53,0.1)', borderColor: 'rgba(255,107,53,0.3)', color: '#ff6b35' }}>
                        <Factory size={14} /> About Bazztech
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
                        The Connected Operations<br />
                        <span style={{ color: '#ff6b35' }}>Platform for Africa.</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Bazztech builds BazzAI — the platform that turns WhatsApp chaos, missed M-Pesa payments, and manual spreadsheets into connected, real-time factory operations across the continent.
                    </p>
                </div>
            </section>

            {/* ── STAT BAR ── */}
            <section className="w-full py-10 px-8 border-b" style={{ borderColor: '#e8eef4' }}>
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <div className="text-3xl md:text-4xl font-black" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-headline)' }}>{s.val}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── MISSION ── */}
            <section className="w-full max-w-5xl px-8 py-24">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
                            style={{ background: 'rgba(26,58,82,0.06)', color: 'var(--color-primary)' }}>
                            Our Mission
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6 leading-tight" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-headline)' }}>
                            Why African Manufacturing<br />Needs a New Stack.
                        </h2>
                        <p className="leading-relaxed mb-5 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                            The reality of African manufacturing isn't robotic assembly lines — it's WhatsApp chaos. Orders arrive by text, delivery ETAs are negotiated over phone calls, and payments come via M-Pesa with no reference numbers.
                        </p>
                        <p className="leading-relaxed mb-5 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                            Bazztech was founded to digitize this reality. Not by forcing factory workers and suppliers to download complex apps, but by injecting intelligent automation directly into WhatsApp — the interface they already use every single day.
                        </p>
                        <p className="leading-relaxed font-medium" style={{ color: 'var(--color-text-primary)' }}>
                            We believe that African factories deserve the same real-time visibility that global manufacturers have — but delivered in a way that works for African infrastructure, African payment systems, and African supply chains.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {values.map((p) => (
                            <div key={p.title} className="flex gap-5 border rounded-3xl p-6 hover:shadow-md transition-all" style={{ background: '#fafcff', borderColor: '#e8eef4' }}>
                                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'var(--color-action)', color: 'white' }}>
                                    {p.icon}
                                </div>
                                <div>
                                    <p className="font-black text-sm mb-1.5" style={{ color: 'var(--color-primary)' }}>{p.title}</p>
                                    <p className="text-slate-500 text-[13px] leading-relaxed">{p.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CAPABILITIES ── */}
            <section className="w-full py-24 px-8 border-t" style={{ borderColor: '#e8eef4', background: 'var(--color-bg-light)' }}>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-headline)' }}>What BazzAI Does</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto font-medium">The technical rails for modern African factories.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {capabilities.map((d) => (
                            <div key={d.title} className="bg-white border rounded-[28px] p-7 hover:shadow-md transition-all" style={{ borderColor: '#e8eef4' }}>
                                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 text-white" style={{ background: 'var(--color-action)' }}>
                                    {d.icon}
                                </div>
                                <h3 className="font-black text-sm mb-2.5" style={{ color: 'var(--color-primary)' }}>{d.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{d.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FOUNDER (Compact) ── */}
            <section className="w-full py-24 px-8 border-t" style={{ borderColor: '#e8eef4' }}>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center">
                    <div className="relative w-40 h-40 rounded-3xl overflow-hidden border shadow-lg flex-shrink-0" style={{ borderColor: '#e8eef4' }}>
                        <Image src="/reagan.jpg" alt="Reagan Ochola" width={200} height={200}
                            className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3"
                            style={{ background: 'rgba(26,58,82,0.06)', color: 'var(--color-primary)' }}>
                            Leadership
                        </div>
                        <h3 className="text-2xl font-black mb-1" style={{ color: 'var(--color-primary)' }}>Reagan Ochola</h3>
                        <p className="text-sm font-bold mb-4" style={{ color: 'var(--color-action)' }}>Founder & Lead Architect</p>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
                            Systems architect with deep experience building data infrastructure across East Africa. Reagan founded Bazztech after observing how fragmented supply chains in Kenyan manufacturing created massive inefficiencies that no existing ERP could solve.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── JOIN US / CAREERS BANNER ── */}
            <section className="w-full py-16 px-8 border-t" style={{ borderColor: '#e8eef4', background: 'var(--color-bg-light)' }}>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Briefcase size={20} style={{ color: 'var(--color-action)' }} />
                            <h3 className="text-xl font-black" style={{ color: 'var(--color-primary)' }}>Join Us</h3>
                        </div>
                        <p className="text-slate-500 text-sm max-w-md">
                            We're building the infrastructure layer for African manufacturing. See our open roles and help shape the future of factory operations on the continent.
                        </p>
                    </div>
                    <Link href="/careers"
                        className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 inline-flex items-center gap-2 flex-shrink-0"
                        style={{ background: 'var(--color-action)' }}>
                        View Open Roles <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="w-full py-24 px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-[40px] p-12 md:p-16 text-center shadow-2xl text-white" style={{ background: 'var(--color-primary)' }}>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight" style={{ fontFamily: 'var(--font-headline)' }}>
                            Ready to Orchestrate<br />Your Operations?
                        </h2>
                        <p className="mb-10 max-w-lg mx-auto font-medium text-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
                            Book an audit. We'll map your order-to-cash workflow and design a custom WhatsApp orchestration layer for your factory.
                        </p>
                        <button
                            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black transition-all hover:scale-105 shadow-xl text-base"
                            style={{ background: 'var(--color-action)', color: 'white' }}
                            onClick={() => window.dispatchEvent(new Event("openBookingModal"))}>
                            Book a Factory Audit <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
