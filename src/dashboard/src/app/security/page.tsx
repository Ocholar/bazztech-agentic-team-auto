import { Shield, Lock, Award, AlertOctagon, Server, Eye } from 'lucide-react';
import Link from 'next/link';

const controls = [
    {
        icon: <Lock size={24} />,
        color: 'text-blue-500',
        bg: 'bg-blue-50',
        title: 'Data Encrypted at Rest & In Transit',
        body: 'All data is encrypted using AES-256 at rest and TLS 1.3 in transit. No unencrypted channels are permitted at any layer of the stack.',
    },
    {
        icon: <Shield size={24} />,
        color: 'text-emerald-500',
        bg: 'bg-emerald-50',
        title: 'GDPR & Kenya DPA Compliant',
        body: 'We maintain full compliance with the EU GDPR and Kenya's Data Protection Act(2019).Data subject rights are honoured within 72 hours.',
    },
    {
        icon: <Eye size={24} />,
        color: 'text-purple-500',
        bg: 'bg-purple-50',
        title: 'Zero-Retention LLM Policy',
        body: 'Prompts and completions sent to third-party LLMs (OpenAI, Anthropic) are processed under zero-retention agreements — your data never trains public models.',
    },
    {
        icon: <Server size={24} />,
        color: 'text-amber-500',
        bg: 'bg-amber-50',
        title: 'Private Deployment Available',
        body: 'For highly regulated sectors (healthcare, legal, finance), we offer self-hosted LLM deployment on your own VPC using open-source models (Llama 3, Mistral).',
    },
    {
        icon: <Award size={24} />,
        color: 'text-red-500',
        bg: 'bg-red-50',
        title: 'SOC 2 Ready Architecture',
        body: 'All platform controls are designed to meet SOC 2 Type II criteria: Security, Availability, Confidentiality, and Processing Integrity. Full audit trail via structured logs.',
    },
    {
        icon: <AlertOctagon size={24} />,
        color: 'text-slate-500',
        bg: 'bg-slate-100',
        title: 'Multi-Tenant Isolation',
        body: 'Each client environment is strictly isolated at the database and vector store level. No cross-tenant data access is architecturally possible.',
    },
];

const faqs = [
    {
        q: 'Does BazzAI access our internal documents or databases?',
        a: 'Only the data you explicitly connect to the pipeline — typically via read-only API credentials or secure SFTP. We never require write access unless the workflow demands it, and even then, scoped to specific collections.',
    },
    {
        q: 'Where is our data stored geographically?',
        a: 'By default, compute runs in your preferred region (EU, US, or Africa/Nairobi). We can enforce data residency requirements and provide a written Data Processing Agreement (DPA) for regulated workloads.',
    },
    {
        q: 'What happens to our data if we terminate?',
        a: 'Upon termination, all client data is purged from our systems within 30 days. You receive a signed data deletion confirmation and full export of your workflow configurations.',
    },
    {
        q: 'Can we conduct a security audit before signing?',
        a: 'Yes. Enterprise clients may request a security questionnaire, architecture review, and penetration test evidence as part of the sales process at no additional cost.',
    },
];

export default function SecurityPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white text-slate-900 pb-24">

            {/* Hero */}
            <div className="w-full bg-slate-900 text-white pt-32 pb-20 px-8 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-96 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                        Security & Compliance
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        Your Data is a First-Class Asset. We Treat It That Way.
                    </h1>
                    <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                        BazzAI is built with enterprise-grade security controls at every layer — from data ingestion to LLM inference.
                    </p>
                </div>
            </div>

            {/* Controls Grid */}
            <section className="w-full max-w-5xl px-8 py-20">
                <h2 className="text-3xl font-black mb-12 text-center">Security Controls</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {controls.map((c, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-3xl p-7 shadow-sm">
                            <div className={`w-12 h-12 rounded-2xl ${c.bg} ${c.color} flex items-center justify-center mb-5`}>
                                {c.icon}
                            </div>
                            <h3 className="text-lg font-black mb-3">{c.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{c.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Architecture Diagram */}
            <section className="w-full max-w-5xl px-8 pb-20">
                <div className="bg-slate-900 text-white rounded-[32px] p-10 md:p-14 shadow-2xl">
                    <h2 className="text-3xl font-black mb-8 text-center">Data Flow Architecture</h2>
                    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10">
                        {[
                            { label: 'Your Data Sources', sub: 'APIs, DBs, Files', color: 'bg-blue-500/20 border-blue-500/40 text-blue-300' },
                            { label: '→', sub: '', color: 'bg-transparent border-transparent text-slate-500' },
                            { label: 'Encrypted Ingestion', sub: 'TLS 1.3 in transit', color: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' },
                            { label: '→', sub: '', color: 'bg-transparent border-transparent text-slate-500' },
                            { label: 'Isolated Pipeline', sub: 'Per-client environment', color: 'bg-purple-500/20 border-purple-500/40 text-purple-300' },
                            { label: '→', sub: '', color: 'bg-transparent border-transparent text-slate-500' },
                            { label: 'Zero-Retention LLM', sub: 'No training on your data', color: 'bg-red-500/20 border-red-500/40 text-red-300' },
                            { label: '→', sub: '', color: 'bg-transparent border-transparent text-slate-500' },
                            { label: 'Your Outputs', sub: 'Alerts, Reports, Actions', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
                        ].map((node, i) => (
                            node.sub === '' ? (
                                <span key={i} className="text-slate-600 font-black text-xl hidden md:block">→</span>
                            ) : (
                                <div key={i} className={`flex flex-col items-center px-5 py-4 rounded-2xl border ${node.color} text-center min-w-[120px]`}>
                                    <p className="text-sm font-black">{node.label}</p>
                                    <p className="text-[10px] opacity-60 mt-1">{node.sub}</p>
                                </div>
                            )
                        ))}
                    </div>
                    <p className="text-center text-slate-400 text-sm font-medium">All data is processed in your designated region. AES-256 encryption at rest.</p>
                </div>
            </section>

            {/* Security FAQ */}
            <section className="w-full max-w-3xl px-8 pb-20">
                <h2 className="text-3xl font-black mb-10 text-center">Security Questions, Answered</h2>
                <div className="space-y-5">
                    {faqs.map((f, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-7">
                            <h4 className="font-black text-slate-900 mb-3">{f.q}</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{f.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="w-full max-w-4xl px-8">
                <div className="bg-slate-900 text-white rounded-[32px] p-12 text-center shadow-xl">
                    <h2 className="text-3xl font-black mb-4">Request a Security Questionnaire</h2>
                    <p className="text-slate-400 mb-8 max-w-lg mx-auto font-medium">
                        Enterprise clients can request our full security package — architecture diagrams, DPA template, and penetration test evidence.
                    </p>
                    <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all shadow-lg" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                        Contact Enterprise Security Team
                    </button>
                </div>
            </section>
        </main>
    );
}
