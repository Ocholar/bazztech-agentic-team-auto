"use client";
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Database, MessageSquare, Briefcase } from 'lucide-react';

const integrations = [
    {
        category: "Data & Architecture",
        items: [
            { name: "PostgreSQL Data Lake", desc: "Native data lake integration. Synthesizes millions of structured factory logs in real-time." },
            { name: "Pinecone Vector DBs", desc: "High-dimensional embedding storage for instantaneous natural language RAG intelligence." },
            { name: "Proprietary Repos", desc: "Directly syncs with your proprietary machine diagnostic manuals and PDF documentation." }
        ]
    },
    {
        category: "Automation & Workflows",
        items: [
            { name: "n8n Orchestration", desc: "Trigger fully automated factory alerts and equipment maintenance schedules based on predictive thresholds." },
            { name: "IoT Sensor APIs", desc: "Direct webhook endpoints to ingest high-frequency telemetry from SCADA or PLC sensors." },
            { name: "Automated Reporting", desc: "Push AI-generated insights via SMS, Slack, Teams, or automated PDF reports to shift managers." }
        ]
    },
    {
        category: "Forecasting & Operations",
        items: [
            { name: "Holt-Winters Models", desc: "Built-in statistical algorithms for highly accurate seasonal inventory forecasting." },
            { name: "Enterprise ERP Sync", desc: "Native bridges for pushing AI-predicted demand directly to your ERP's production queue." }
        ]
    }
];

export default function IntegrationsPage() {
    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#0F1419', color: '#A0AEC0', fontFamily: 'Inter, sans-serif' }}>
            <Header />

            <section className="pt-32 pb-20 px-6 text-center border-b border-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, #81B29A, transparent 60%)' }} />
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-6 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Connect to Your Factory's<br />
                        <span style={{ color: '#E07A5F' }}>Nervous System.</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        BazzAI ingests your existing machine logs, document libraries, and data lakes to build a singular AI intelligence layer.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                    {integrations.map((group, i) => (
                        <div key={i} className="p-8 rounded-[2rem] border shadow-sm transition-all hover:-translate-y-1" style={{ background: '#1A202C', borderColor: '#2D3748' }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-[#0F1419]" style={{ background: '#81B29A' }}>
                                {i === 0 ? <Database /> : i === 1 ? <MessageSquare /> : <Briefcase />}
                            </div>
                            <h2 className="text-2xl font-black mb-6 text-[#F4F1DE]">{group.category}</h2>
                            <div className="space-y-6">
                                {group.items.map((item, j) => (
                                    <div key={j} className="border-b pb-4 last:border-0 last:pb-0" style={{ borderColor: '#2D3748' }}>
                                        <h3 className="font-bold text-sm mb-1 text-[#E07A5F]">{item.name}</h3>
                                        <p className="text-xs leading-relaxed text-slate-400">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-24 px-6 text-center border-t border-slate-800" style={{ background: '#141A23' }}>
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black mb-6 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Need a custom SCADA/ERP integration?</h2>
                    <p className="text-slate-400 mb-8">We construct custom data pipelines for legacy Oracle, SAP, and Siemens systems.</p>
                    <button
                        className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 inline-flex items-center gap-2 shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}
                        onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                        Discuss Custom Architecture <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
