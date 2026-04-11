"use client";
import Link from 'next/link';
import { Shield, Lock, Award, FileText, AlertTriangle, CheckCircle, ArrowRight, Bot } from 'lucide-react';

const AUDIT_URL = 'https://calendly.com/reagan-bazztech/30min';

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans">
            {/* NAV */}
            <header className="bg-slate-900 border-b border-white/10 py-5 px-6">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center">
                            <Bot size={18} />
                        </div>
                        <span className="text-xl font-black">Bazz<span className="text-red-500">AI</span></span>
                    </Link>
                    <Link href={AUDIT_URL} target="_blank" rel="noopener noreferrer"
                        className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors">
                        Book Assessment
                    </Link>
                </div>
            </header>

            {/* HERO */}
            <section className="py-24 px-6 border-b border-white/10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-bold mb-6">
                        <Shield size={12} /> Enterprise Security & Data Governance
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                        Your Data Stays <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Yours.</span><br />
                        Always.
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        BazzAI is built from the ground up for enterprise security requirements. Every pipeline, every model interaction, every integration — governed by strict data controls.
                    </p>
                </div>
            </section>

            {/* COMPLIANCE BADGES */}
            <section className="py-20 px-6 border-b border-white/10">
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-10 text-center">Compliance & Certifications</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {[
                            { icon: <Shield size={32} />, title: 'GDPR Compliant', sub: 'Full EU data protection regulation compliance', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
                            { icon: <Award size={32} />, title: 'Kenya DPA 2019', sub: 'Kenya Data Protection Act compliant', color: 'text-green-400 bg-green-500/10 border-green-500/20' },
                            { icon: <Lock size={32} />, title: 'AES-256 Encryption', sub: 'Data encrypted at rest and in transit', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
                            { icon: <FileText size={32} />, title: 'SOC 2 Architecture', sub: 'Full audit trail and access logging', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
                        ].map((b, i) => (
                            <div key={i} className={`border rounded-[20px] p-6 text-center ${b.color}`}>
                                <div className="flex justify-center mb-3">{b.icon}</div>
                                <p className="font-black text-sm mb-1">{b.title}</p>
                                <p className="text-[11px] opacity-70 leading-snug">{b.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DETAIL SECTIONS */}
            <section className="py-20 px-6 border-b border-white/10">
                <div className="max-w-5xl mx-auto space-y-12">
                    {[
                        {
                            icon: <Award size={24} className="text-purple-400" />,
                            title: 'Private LLM Options — Your Data Never Trains Public Models',
                            body: 'By default, BazzAI pipelines route only to opt-out API endpoints (OpenAI zero-data-retention policy). For clients with stricter requirements, we offer fully private LLM deployments on your own cloud infrastructure (AWS, GCP, Azure, or on-premise). No inference data is logged, stored, or used for model training.',
                            points: ['OpenAI Zero Data Retention mode enabled by default', 'Private Azure OpenAI deployment available', 'On-premise Ollama/LLaMA deployment for air-gapped environments', 'No data used for model fine-tuning'],
                        },
                        {
                            icon: <Lock size={24} className="text-green-400" />,
                            title: 'Data Encryption at Rest & in Transit',
                            body: 'All data processed through BazzAI pipelines is encrypted using AES-256 at rest and TLS 1.3 in transit. Vector embeddings stored in Pinecone are namespace-isolated per client with role-based access controls.',
                            points: ['AES-256 encryption at rest', 'TLS 1.3 for all API communications', 'Pinecone namespace isolation per client', 'Secrets managed via environment-level vaults (no hardcoded credentials)'],
                        },
                        {
                            icon: <AlertTriangle size={24} className="text-red-400" />,
                            title: 'Incident Response & Business Continuity',
                            body: 'BazzAI maintains a formal Incident Response Plan (IRP) covering detection, containment, eradication, and recovery. All clients have a designated point of contact for security incidents with defined SLAs for response.',
                            points: ['P1 incidents: 2-hour response SLA', 'P2 incidents: 8-hour response SLA', 'Automatic workflow suspension on anomaly detection', 'Post-incident root cause analysis and report'],
                        },
                    ].map((s, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-[24px] p-8">
                            <div className="flex items-center gap-3 mb-4">
                                {s.icon}
                                <h2 className="text-xl font-black">{s.title}</h2>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">{s.body}</p>
                            <ul className="grid sm:grid-cols-2 gap-3">
                                {s.points.map((pt, j) => (
                                    <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                                        <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" /> {pt}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-black mb-4">Need a Security Brief for Your Procurement Team?</h2>
                    <p className="text-slate-400 mb-8">Book a security-focused call with our team. We'll walk through our data governance posture and prepare a custom security brief for your CISO or Legal team.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={AUDIT_URL} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-red-600 text-white font-black hover:bg-red-700 transition-all hover:scale-105">
                            Book Security Briefing <ArrowRight size={18} />
                        </Link>
                        <Link href="/enterprise"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white font-bold hover:bg-white/10 transition-all">
                            View Enterprise Playbook
                        </Link>
                    </div>
                    <p className="text-slate-500 text-xs mt-6">📄 A downloadable PDF security brief is available on request during your assessment call.</p>
                </div>
            </section>
        </div>
    );
}
