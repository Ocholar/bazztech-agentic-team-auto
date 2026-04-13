import { ArrowRight, CheckCircle } from 'lucide-react';

const phases = [
    {
        week: 'Weeks 1–2',
        color: 'bg-blue-500',
        title: 'Discovery & Architecture',
        desc: 'We deeply map your current workflows, identify the highest-impact automation targets, and architect the technical pipeline.',
        steps: [
            'Stakeholder kickoff — ops, finance, and engineering leads',
            'Workflow mapping & pain point scoring matrix',
            'Tech stack audit (current tools, data sources, APIs)',
            'Vector DB strategy — document volume, query patterns',
            'Architecture signoff and SOW agreed',
        ],
    },
    {
        week: 'Weeks 3–4',
        color: 'bg-purple-500',
        title: 'Design & Integration',
        desc: 'We build and connect the automation pipeline to your existing infrastructure — zero downtime, no data migration required.',
        steps: [
            'n8n workflow scaffolding mapped to your SLAs',
            'Data ingestion pipelines to Vector DB (Pinecone or Chroma)',
            'LLM integration and prompt engineering for your domain',
            'Staging deployment on your cloud environment (AWS, GCP, or Azure)',
            'Internal QA testing with your team',
        ],
    },
    {
        week: 'Weeks 5–8',
        color: 'bg-red-500',
        title: 'Deployment & Pilot',
        desc: 'Live rollout with full monitoring. We track every KPI from day one and tune the system in real-time.',
        steps: [
            'Production go-live with feature flags for safe rollout',
            'Real-time OEE/KPI dashboards connected to your BI tools',
            'Alert routing configured (WhatsApp, Slack, or email)',
            'Team training sessions and runbook handoff',
            'Weekly performance reviews against agreed benchmarks',
        ],
    },
    {
        week: 'Month 2+',
        color: 'bg-emerald-500',
        title: 'Continuous Optimisation',
        desc: 'Covered under your monthly retainer. We own the ongoing performance of the pipeline — you focus on your business.',
        steps: [
            'Data drift monitoring and re-embedding pipelines',
            'LLM model upgrades as newer versions release',
            'API changes and third-party integration maintenance',
            'Monthly ROI reporting and performance summary',
            'Quarterly pipeline expansion reviews',
        ],
    },
];

export default function RoadmapPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white text-slate-900 pb-24">

            {/* Hero */}
            <div className="w-full bg-slate-900 text-white pt-32 pb-20 px-8 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-96 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-slate-300 text-[10px] font-black uppercase tracking-widest mb-6">
                        Implementation Roadmap
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">From Audit to Autonomous in 8 Weeks.</h1>
                    <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                        No vague consulting timelines. Here is exactly what happens after you book an assessment, week by week.
                    </p>
                </div>
            </div>

            {/* Timeline Steps */}
            <section className="w-full max-w-4xl px-8 py-20">
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block" />

                    <div className="space-y-12">
                        {phases.map((phase, i) => (
                            <div key={i} className="relative flex flex-col md:flex-row gap-8">
                                {/* Step dot */}
                                <div className="relative shrink-0">
                                    <div className={`w-10 h-10 rounded-full ${phase.color} flex items-center justify-center text-white font-black text-sm shadow-lg z-10 relative`}>
                                        {i + 1}
                                    </div>
                                </div>

                                <div className="flex-1 bg-slate-50 rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                                        <h3 className="text-2xl font-black">{phase.title}</h3>
                                        <span className={`px-4 py-1.5 rounded-full text-white text-xs font-black ${phase.color} shadow-sm`}>{phase.week}</span>
                                    </div>
                                    <p className="text-slate-500 mb-6 font-medium leading-relaxed">{phase.desc}</p>
                                    <ul className="space-y-2.5">
                                        {phase.steps.map((step, j) => (
                                            <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600">
                                                <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                                                {step}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Summary */}
            <section className="w-full max-w-4xl px-8 pb-20">
                <div className="bg-slate-900 text-white rounded-[32px] p-10 md:p-14 shadow-2xl">
                    <h2 className="text-3xl font-black mb-10 text-center">What It Costs</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Weeks 1–8 Implementation</p>
                            <p className="text-3xl font-black text-white">Starts at $15,000</p>
                            <p className="text-sm text-slate-400 mt-2">Discovery → Architecture → Deployment</p>
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-2">Month 2+ Managed Retainer</p>
                            <p className="text-3xl font-black text-emerald-400">Starts at $2,500/mo</p>
                            <p className="text-sm text-slate-400 mt-2">Infrastructure + LLM Costs + Optimisation</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl transition-all shadow-lg" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            Start Step 1 — Free Audit <ArrowRight size={18} />
                        </button>
                        <p className="text-slate-500 text-xs mt-4">No commitment. Clarity within 15 minutes.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
