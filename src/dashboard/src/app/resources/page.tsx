import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ExternalLink, Layers, Brain, Lock, Building, GraduationCap } from 'lucide-react';

export const metadata = {
    title: 'Developer Resources | BazzAI',
    description: 'Open-source templates and reference architectures powering BazzAI enterprise deployments.',
}

export default function ResourcesPage() {
    const repos = [
        {
            title: "Redwood Finance Automation",
            description: "Automate ledger reconciliation and dynamic pricing models connected to M-Pesa/Stripe.",
            url: "https://github.com/Ocholar/redwood-finance-automation",
            icon: <Building className="text-red-500 w-8 h-8 mb-4" />
        },
        {
            title: "Manufacturing RAG System",
            description: "Real-time RAG Pipeline transforming factory telemetry into production forecasting.",
            url: "https://github.com/Ocholar/manufacturing-rag-system",
            icon: <Layers className="text-red-500 w-8 h-8 mb-4" />
        },
        {
            title: "NaiCity",
            description: "Smart city governance platform and utility tracking automation.",
            url: "https://github.com/Ocholar/NaiCity",
            icon: <Brain className="text-red-500 w-8 h-8 mb-4" />
        },
        {
            title: "Defect Detection Pipeline",
            description: "Computer Vision & Edge AI pipeline for automated QC on manufacturing sub-assemblies.",
            url: "https://github.com/Ocholar/defect-detection-pipeline",
            icon: <Lock className="text-red-500 w-8 h-8 mb-4" />
        },
        {
            title: "EduFlow",
            description: "Student lifecycle CRM with WhatsApp-based auto-enrollment logic.",
            url: "https://github.com/Ocholar/EduFlow",
            icon: <GraduationCap className="text-red-500 w-8 h-8 mb-4" />
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-red-500/30">
            <Header />

            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-slate-900">
                        Developer <span className="text-red-600">Resources</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Explore our open-source templates, reference architectures, and production-ready examples that power BazzAI enterprise deployments.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {repos.map((repo, i) => (
                        <a
                            key={i}
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-red-200 transition-all group"
                        >
                            {repo.icon}
                            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                                {repo.title}
                                <ExternalLink size={16} className="text-slate-400 group-hover:text-red-500 transition-colors" />
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {repo.description}
                            </p>
                        </a>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
