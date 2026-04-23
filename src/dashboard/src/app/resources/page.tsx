"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ExternalLink, Layers, Factory, Lock, GraduationCap } from 'lucide-react';

const repos = [
    {
        title: "Manufacturing RAG System",
        description: "Real-time RAG Pipeline transforming factory telemetry into production forecasting and order prediction.",
        url: "https://github.com/Ocholar/manufacturing-rag-system",
        icon: <Layers className="w-8 h-8 mb-4" style={{ color: 'var(--color-action)' }} />,
    },
    {
        title: "Redwood Finance Automation",
        description: "Automate ledger reconciliation and dynamic pricing models connected to M-Pesa and local mobile money.",
        url: "https://github.com/Ocholar/redwood-finance-automation",
        icon: <Factory className="w-8 h-8 mb-4" style={{ color: 'var(--color-action)' }} />,
    },
    {
        title: "Defect Detection Pipeline",
        description: "Computer Vision & Edge AI pipeline for automated QC on manufacturing sub-assemblies.",
        url: "https://github.com/Ocholar/defect-detection-pipeline",
        icon: <Lock className="w-8 h-8 mb-4" style={{ color: 'var(--color-action)' }} />,
    },
    {
        title: "NaiCity",
        description: "Smart city governance platform and utility tracking automation for municipal operations.",
        url: "https://github.com/Ocholar/NaiCity",
        icon: <GraduationCap className="w-8 h-8 mb-4" style={{ color: 'var(--color-action)' }} />,
    },
];

export default function ResourcesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'var(--font-body)' }}>
            <Header />

            <section className="pt-32 pb-16 px-6 text-center" style={{ background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}>
                <div className="max-w-4xl mx-auto text-white relative z-10">
                    <h1 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
                        Developer <span style={{ color: '#ff6b35' }}>Resources</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Open-source templates and reference architectures powering BazzAI manufacturing deployments.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6" style={{ background: 'var(--color-bg-light)' }}>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {repos.map((repo, i) => (
                        <a key={i} href={repo.url} target="_blank" rel="noopener noreferrer"
                            className="bg-white border p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group" style={{ borderColor: '#e8eef4' }}>
                            {repo.icon}
                            <h3 className="text-xl font-black mb-2 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                                {repo.title}
                                <ExternalLink size={16} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{repo.description}</p>
                        </a>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
