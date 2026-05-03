"use client";
import { Shield, Lock, Award, Server, Eye, Database } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

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
        title: 'Zero-Retention Query Policy',
        body: 'Natural language queries processed by BazzAI are executed directly against your private vector database. We never use your proprietary factory data to train public models.',
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
        <div className="min-h-screen flex flex-col" style={{ background: '#0F1419', color: '#A0AEC0', fontFamily: 'Inter, sans-serif' }}>
            <Header />

            <section className="pt-32 pb-20 px-6 text-center border-b border-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, #E07A5F, transparent 60%)' }} />
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest mb-6"
                        style={{ border: '1px solid rgba(224,122,95,0.3)', background: 'rgba(224,122,95,0.1)', color: '#E07A5F' }}>
                        <Shield size={14} /> Security & Compliance
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Your Factory Data is a<br />
                        <span style={{ color: '#E07A5F' }}>First-Class Asset.</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        BazzAI is built with enterprise-grade security controls at every layer — from real-time data ingestion to high-performance predictive intelligence.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-black mb-4 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Security Controls</h2>
                </div>
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {controls.map((c, i) => (
                        <div key={i} className="p-7 rounded-2xl border shadow-sm transition-all hover:-translate-y-1" style={{ background: '#1A202C', borderColor: '#2D3748' }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-[#0F1419]" style={{ background: '#81B29A' }}>
                                {c.icon}
                            </div>
                            <h3 className="font-black text-lg mb-3 text-[#F4F1DE]">{c.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{c.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 px-6 border-t text-center border-slate-800" style={{ background: '#141A23' }}>
                <h2 className="text-2xl font-black mb-4 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Questions about data handling?</h2>
                <p className="text-slate-400 mb-6">We are happy to share our Data Processing Agreement and complete a security questionnaire.</p>
                <Link href="/register"
                    className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 inline-flex items-center gap-2 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}>
                    Start Your Security Review Pilot
                </Link>
            </section>

            <Footer />
        </div>
    );
}
