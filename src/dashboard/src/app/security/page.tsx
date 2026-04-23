"use client";
import { Shield, Lock, Award, Server, Eye, Database } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const controls = [
    {
        icon: <Lock size={24} />,
        title: 'Data Encrypted at Rest & In Transit',
        body: 'All factory data is encrypted using AES-256 at rest and TLS 1.3 in transit. No unencrypted channels are permitted between BazzAI services.',
    },
    {
        icon: <Shield size={24} />,
        title: 'Kenya DPA & GDPR Compliant',
        body: 'We maintain full compliance with the EU GDPR and Kenya\'s Data Protection Act (2019). Data subject access requests are processed within 72 hours.',
    },
    {
        icon: <Eye size={24} />,
        title: 'Zero-Retention WhatsApp Policy',
        body: 'WhatsApp messages processed by BazzAI are structured and logged to your private database only. We do not store raw message content on our servers after processing.',
    },
    {
        icon: <Server size={24} />,
        title: 'Isolated Per-Client Database',
        body: 'Each manufacturer gets a fully isolated database instance. No cross-tenant data access is architecturally possible. Your factory data never touches another client\'s environment.',
    },
    {
        icon: <Award size={24} />,
        title: 'SOC 2 Ready Architecture',
        body: 'Our infrastructure follows SOC 2 Type II controls. Enterprise clients can request security questionnaires, architecture reviews, and penetration test evidence.',
    },
    {
        icon: <Database size={24} />,
        title: 'AWS Africa (Cape Town) Region',
        body: 'For Kenyan and East African manufacturers, data can be stored on AWS Africa (Cape Town) servers — keeping your factory data on the continent.',
    },
];

export default function SecurityPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'var(--font-body)' }}>
            <Header />

            <section className="pt-32 pb-20 px-6 text-center" style={{ background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}>
                <div className="max-w-4xl mx-auto text-white relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest mb-6"
                        style={{ border: '1px solid rgba(255,107,53,0.3)', background: 'rgba(255,107,53,0.1)', color: '#ff6b35' }}>
                        <Shield size={14} /> Security & Compliance
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight" style={{ fontFamily: 'var(--font-headline)' }}>
                        Your Factory Data is a<br />
                        <span style={{ color: '#ff6b35' }}>First-Class Asset.</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        BazzAI is built with enterprise-grade security controls at every layer — from WhatsApp message intake to M-Pesa payment reconciliation.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6" style={{ background: 'var(--color-bg-light)' }}>
                <div className="max-w-5xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-black mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-headline)' }}>Security Controls</h2>
                </div>
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {controls.map((c, i) => (
                        <div key={i} className="bg-white p-7 rounded-2xl border shadow-sm" style={{ borderColor: '#e8eef4' }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white" style={{ background: 'var(--color-primary)' }}>
                                {c.icon}
                            </div>
                            <h3 className="font-black text-sm mb-3" style={{ color: 'var(--color-primary)' }}>{c.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{c.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 px-6 bg-white border-t text-center" style={{ borderColor: '#e8eef4' }}>
                <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--color-primary)' }}>Questions about data handling?</h2>
                <p className="text-slate-500 mb-6">We are happy to share our Data Processing Agreement and complete a security questionnaire.</p>
                <button
                    className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 inline-flex items-center gap-2"
                    style={{ background: 'var(--color-action)' }}
                    onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                    Request Security Review
                </button>
            </section>

            <Footer />
        </div>
    );
}
