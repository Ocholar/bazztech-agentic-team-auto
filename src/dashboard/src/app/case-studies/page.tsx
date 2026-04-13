import { ArrowRight, ExternalLink, Factory, DollarSign, Eye, GraduationCap } from 'lucide-react';
import Link from 'next/link';

const studies = [
    {
        icon: <Factory size={28} />,
        color: 'from-red-600 to-orange-500',
        bg: 'bg-red-50',
        status: 'deployed',
        industry: 'Manufacturing',
        client: 'Dakri Cartons (Mauritius)',
        title: 'Real-Time RAG & Predictive Forecasting',
        summary: 'Deployed a domain-aware RAG pipeline over factory telemetry and Holt-Winters inventory forecasting, achieving 40% fewer stockouts, 15% OEE improvement, and a 35-day payback period.',
        roi: '1,295% Year 1 ROI',
        tags: ['RAG', 'n8n', 'Holt-Winters', 'GPT-4o-mini', 'Pinecone'],
        link: '/case-studies/dakri-cartons',
        github: null,
    },
    {
        icon: <DollarSign size={28} />,
        color: 'from-blue-600 to-cyan-500',
        bg: 'bg-blue-50',
        status: 'architecture',
        industry: 'FinTech / Accounting',
        client: 'Redwood Finance — Available Now',
        title: 'Automated Finance Reconciliation Pipeline',
        summary: 'End-to-end fintech reconciliation engine syncing Stripe and M-Pesa ledgers. Auto-detects anomalies, generates monthly financial reports, and eliminates 2–3 days of manual reconciliation per month.',
        roi: 'Replaces $40k/year in bookkeeping costs',
        tags: ['Stripe API', 'M-Pesa', 'n8n', 'PostgreSQL', 'Anomaly Detection'],
        link: null,
        github: 'https://github.com/Ocholar/redwood-finance-automation',
    },
    {
        icon: <Eye size={28} />,
        color: 'from-purple-600 to-pink-500',
        bg: 'bg-purple-50',
        status: 'architecture',
        industry: 'Manufacturing / Quality Control',
        client: 'Defect Detection Pipeline — Available Now',
        title: 'CV-Powered Defect Detection & Alerting',
        summary: 'Computer Vision pipeline for real-time quality control on manufacturing lines. Detects product defects, classifies severity, and fires WhatsApp alerts to operations managers before defective batches ship.',
        roi: 'Eliminates 80%+ of manual QC inspection time',
        tags: ['Computer Vision', 'OpenCV', 'WhatsApp API', 'n8n', 'Python FastAPI'],
        link: null,
        github: 'https://github.com/Ocholar/defect-detection-pipeline',
    },
    {
        icon: <GraduationCap size={28} />,
        color: 'from-emerald-600 to-teal-500',
        bg: 'bg-emerald-50',
        status: 'architecture',
        industry: 'EdTech / E-Learning',
        client: 'EduFlow — Available Now',
        title: 'Adaptive Learning & Student Engagement Engine',
        summary: 'AI-powered e-learning orchestration that personalises curriculum delivery, tracks student engagement analytics, and automates progress report generation for institutions and corporate L&D teams.',
        roi: 'Reduces L&D admin overhead by 60%',
        tags: ['AI Personalization', 'LMS Integration', 'n8n', 'GPT-4o', 'Analytics'],
        link: null,
        github: 'https://github.com/Ocholar/EduFlow',
    },
];

export default function CaseStudiesIndex() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-slate-50 text-slate-900 pb-24">

            {/* Hero */}
            <div className="w-full bg-slate-900 text-white pt-32 pb-20 px-8 relative overflow-hidden">
                <div className="absolute top-1/3 left-0 w-96 h-64 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-slate-300 text-[10px] font-black uppercase tracking-widest mb-6">
                        Proven Architecture
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Our Deployments &amp; Architecture Templates</h1>
                    <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                        From live production deployments to open-source blueprints — every BazzAI architecture is built to be measurable, deployable, and enterprise-ready out of the box.
                    </p>
                </div>
            </div>

            {/* Case Study Cards */}
            <section className="w-full max-w-6xl px-8 py-20">
                <div className="grid md:grid-cols-2 gap-8">
                    {studies.map((s, i) => (
                        <div key={i} className={`bg-white rounded-3xl border-2 shadow-md overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl ${s.status === 'deployed' ? 'border-red-200' : 'border-slate-200'} flex flex-col`}>
                            {s.status === 'deployed' && (
                                <div className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest text-center py-2">
                                    ★ Live Production Deployment
                                </div>
                            )}
                            {s.status === 'architecture' && (
                                <div className="bg-slate-800 text-slate-300 text-[10px] font-black uppercase tracking-widest text-center py-2">
                                    Open Architecture Template — Available to Deploy
                                </div>
                            )}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center mb-5`}>
                                    {s.icon}
                                </div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{s.industry}</p>
                                <p className="text-sm font-black text-slate-700 mb-2">{s.client}</p>
                                <h3 className="text-xl font-black mb-4 tracking-tight">{s.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{s.summary}</p>

                                {/* ROI Chip */}
                                <div className="mb-6 inline-flex px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-xs font-black w-max">
                                    {s.roi}
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {s.tags.map((t, j) => (
                                        <span key={j} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">{t}</span>
                                    ))}
                                </div>

                                <div className="flex gap-3 mt-auto">
                                    {s.link && (
                                        <Link href={s.link} className="flex-1 text-center py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                                            Read Case Study <ArrowRight size={14} />
                                        </Link>
                                    )}
                                    {s.github && (
                                        <a href={s.github} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-3 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                                            View on GitHub <ExternalLink size={14} />
                                        </a>
                                    )}
                                    {!s.link && !s.github && (
                                        <button className="flex-1 text-center py-3 bg-slate-100 text-slate-600 font-black rounded-xl text-sm cursor-not-allowed opacity-60">
                                            Coming Soon
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="w-full max-w-4xl px-8">
                <div className="bg-slate-900 rounded-[32px] p-12 text-center shadow-xl text-white">
                    <h2 className="text-3xl font-black mb-4">Want This Deployed for Your Business?</h2>
                    <p className="text-slate-400 mb-8 max-w-lg mx-auto font-medium">
                        Every template above is deployable in 4–8 weeks. Book a free audit and we will map the exact architecture to your workflow.
                    </p>
                    <button className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl transition-all shadow-lg" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                        Book a Free Technical Audit
                    </button>
                </div>
            </section>
        </main>
    );
}
