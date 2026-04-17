"use client";

import {
    CheckCircle, ArrowRight, Clock, FileText, Users, AlertCircle,
    Shield, Search, HelpCircle, Download, ExternalLink, Play,
    Activity, Zap, Target, BarChart3, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const phases = [
    {
        num: '01',
        title: 'Discovery & Architecture',
        timeline: 'Weeks 1-2',
        color: 'blue',
        overview: 'We map every manual bottleneck and repetitive task in your operations. This isn\'t just a technical audit; it\'s a business impact assessment to identify where AI will deliver the fastest ROI.',
        activities: [
            'Workshop: Current state process mapping (half-day)',
            'Data audit: Examine data sources, quality, and structure',
            'Stakeholder interviews: Understand pain points and desired outcomes',
            'Technical architecture: Assess existing stack compatibility'
        ],
        deliverables: [
            'Detailed Implementation Roadmap',
            'Full Technical Specification',
            'Risk Assessment Matrix',
            'Fixed-Price SOW'
        ],
        effort: {
            hours: '6-8 hours',
            roles: 'Ops Lead, Technical Lead'
        },
        successCriteria: [
            'Client sign-off on 90-day roadmap',
            'All data sources identified and validated',
            'Technical team understands scope and timeline'
        ],
        risks: [
            { risk: 'Data Quality Issues', mitigation: 'We provide automated cleaning scripts during Phase 2.' },
            { risk: 'Scope Creep', mitigation: 'Strict change management process documented in SOW.' }
        ]
    },
    {
        num: '02',
        title: 'Design & Integration',
        timeline: 'Weeks 3-4',
        color: 'purple',
        overview: 'We architect your custom AI workflows and connect them to your existing systems. We build in the background—your team continues their work with zero disruption.',
        activities: [
            'Workflow design: Define AI decision logic and thresholds',
            'Integration development: Connect to Salesforce, ERP, or custom APIs',
            'Security hardening: Multi-tenant isolation and encryption',
            'Testing plan: Define test cases and acceptance criteria'
        ],
        deliverables: [
            'Integration Specification',
            'Acceptance Testing Plan',
            'Security & Compliance Documentation',
            'Initial Training Materials'
        ],
        effort: {
            hours: '4-6 hours',
            roles: 'Ops Manager, System Admin'
        },
        successCriteria: [
            'All integrations verified in staging',
            'Test cases cover 100% of automation scenarios',
            'Security review completed'
        ],
        risks: [
            { risk: 'Integration Complexity', mitigation: 'Phased rollout starting with the most critical integrations.' },
            { risk: 'API Rate Limits', mitigation: 'Implementation of smart batching and caching strategies.' }
        ]
    },
    {
        num: '03',
        title: 'Deployment & Pilot',
        timeline: 'Weeks 5-8',
        color: 'red',
        overview: 'Go live with safety nets. We run your AI workflows in parallel with manual processes for two weeks to ensure 95%+ accuracy before full cutover.',
        activities: [
            'Staging deployment: Run identical setup in testing environment',
            'Parallel testing: Compare AI output to manual processes',
            'Production deployment: Controlled cutover with rollback readiness',
            'Team training: Live sessions on monitoring and escalation'
        ],
        deliverables: [
            'Production Deployment Checklist',
            'Real-time Monitoring Dashboard',
            'Final Training Pack',
            'Post-Launch Support SLA'
        ],
        effort: {
            hours: '8-12 hours',
            roles: 'Full Support Team, End Users'
        },
        successCriteria: [
            'Parallel test shows 95%+ accuracy match',
            'Zero critical issues during first 14 days',
            'Operational team is trained and confident'
        ],
        risks: [
            { risk: 'Accuracy Threshold Not Met', mitigation: 'Immediate tuning window with extended parallel testing.' },
            { risk: 'User Adoption', mitigation: 'Dedicated training sessions and on-call support during transition.' }
        ]
    },
    {
        num: '04',
        title: 'Optimization',
        timeline: 'Week 9+ (Ongoing)',
        color: 'orange',
        overview: 'AI isn\'t "set and forget." We monitor performance, tune thresholds, and identify new automation opportunities to maximize your long-term ROI.',
        activities: [
            'Weekly performance reviews: Focus on accuracy and speed',
            'Threshold tuning: Adjust AI confidence levels based on real data',
            'Business impact reporting: Monthly ROI dashboards',
            'Expansion planning: Identify the next 3 workflows to automate'
        ],
        deliverables: [
            'Monthly Performance Report',
            'Quarterly Business Review',
            'Optimization Recommendations',
            'Updated ROI Forecast'
        ],
        effort: {
            hours: '2-4 hours/mo',
            roles: 'Ops Lead, BazzAI Analyst'
        },
        successCriteria: [
            'ROI targets met (3-6 month payback)',
            'System uptime > 99.9%',
            'Net Promoter Score (NPS) > 8'
        ],
        risks: [
            { risk: 'System Drift', mitigation: 'Monthly retraining on new data edge cases.' },
            { risk: 'ROI Plateaus', mitigation: 'Proactive roadmap reviews for new automation targets.' }
        ]
    }
];

const faqs = [
    {
        q: "How much involvement does our team actually need?",
        a: "Expect to invest approximately 20-30 hours total across the first 8 weeks. This is mostly concentrated in Phase 1 (Discovery) and Phase 3 (Training). Once live, effort drops to 2-4 hours per month for review."
    },
    {
        q: "What if we need to pivot mid-implementation?",
        a: "Our agile framework is designed for flexibility. If requirements change during Phase 1 or 2, we update the technical specification and Roadmap. Major shifts are handled through a formal change request process to ensure timeline transparency."
    },
    {
        q: "Can we do a phased rollout for just one department?",
        a: "Yes. In fact, we recommend it. Starting with one high-impact department (e.g., Finance or Sales) allows your team to get comfortable with AI workflows before scaling company-wide."
    },
    {
        q: "What happens if the live system makes an error?",
        a: "We implement 'Human-in-the-Loop' safeguards. Any AI output below a 95% confidence threshold is automatically escalated to your team for review. We also have a documented 15-minute rollback procedure for critical issues."
    },
    {
        q: "How do you handle team training?",
        a: "We provide recorded video training, written runbooks, and 2 live sessions for your operators. Our goal is to make your team the 'orchestrators' of the AI, not just users."
    }
];

export default function ImplementationPage() {
    const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

    return (
        <div className="flex min-h-screen flex-col bg-white text-slate-900 font-sans overflow-x-hidden">
            <Header />

            {/* Hero Section */}
            <section className="pt-36 pb-20 px-6 relative overflow-hidden bg-slate-900 text-white">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600/5 blur-[120px] pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-red-400 text-xs font-bold mb-7">
                        <Activity size={14} className="animate-pulse" />
                        Predictable Implementation Framework
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-7">
                        Enterprise Implementation.<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">Precision Executed.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
                        From technical audit to measurable operational ROI. Every phase, every deliverable, every risk mitigated. No jargon, just results in 8 weeks.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-10 py-4 rounded-2xl bg-red-600 text-white font-black text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-900/20"
                            onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            Book Implementation Assessment
                        </button>
                        <Link href="/pricing" className="px-10 py-4 rounded-2xl border-2 border-slate-700 text-white font-bold text-lg hover:bg-slate-800 transition-all">
                            View Pricing Tiers
                        </Link>
                    </div>
                </div>
            </section>

            {/* Implementation Timeline */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-6">The 8-Week Roadmap</h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                            We follow a battle-tested process designed to minimize client effort and maximize system accuracy.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-8">
                        {phases.map((phase, i) => (
                            <div key={i} className="flex flex-col h-full bg-slate-50 rounded-[32px] border border-slate-200 p-8 hover:shadow-xl transition-all duration-300 group">
                                <div className="flex items-center justify-between mb-6">
                                    <span className={`text-4xl font-black opacity-20 group-hover:opacity-100 transition-opacity text-${phase.color}-600`}>
                                        {phase.num}
                                    </span>
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-${phase.color}-100 text-${phase.color}-700 border border-${phase.color}-200 shadow-sm`}>
                                        {phase.timeline}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black mb-4">{phase.title}</h3>
                                <p className="text-sm text-slate-500 mb-6 flex-grow leading-relaxed font-medium">{phase.overview}</p>

                                <div className="space-y-6 pt-6 border-t border-slate-200">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Deliverables</p>
                                        <ul className="space-y-2">
                                            {phase.deliverables.map((d, j) => (
                                                <li key={j} className="flex items-center gap-2 text-xs text-slate-700 font-bold">
                                                    <CheckCircle size={14} className="text-emerald-500 shrink-0" /> {d}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Client Effort</p>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-xs font-black flex items-center gap-2">
                                                <Clock size={14} className="text-red-500" /> {phase.effort.hours}
                                            </p>
                                            <p className="text-[10px] text-slate-500 font-medium ml-5">{phase.effort.roles}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Risk Mitigation Section */}
            <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider mb-6 border border-emerald-200">
                                <Shield size={12} /> Safety & Governance
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Risk Mitigation is Built into Every Step.</h2>
                            <p className="text-slate-500 text-lg mb-8 leading-relaxed font-medium">
                                We don't just hope the AI works. We architect for failure scenarios so your production environment remains stable, no matter what.
                            </p>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                                        <Zap size={24} className="text-red-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">2-Week Parallel Pilot</h4>
                                        <p className="text-sm text-slate-500">We run AI + manual in parallel. Only when confidence hits 95%+ do we cut over to production.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                                        <Download size={24} className="text-red-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">15-Minute Rollback</h4>
                                        <p className="text-sm text-slate-500">Every deployment includes a pre-tested rollback plan to revert to legacy processes instantly.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                                        <Target size={24} className="text-red-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Human-in-the-Loop</h4>
                                        <p className="text-sm text-slate-500">AI never takes autonomous action on low-confidence outputs. It flags for human review instead.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-900 rounded-[40px] p-10 shadow-2xl relative overflow-hidden text-white">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-500" />
                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                                <BarChart3 className="text-red-500" /> ROI Tracking Dashboard
                            </h3>
                            <div className="space-y-8">
                                <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Current Implementation Status</p>
                                    <div className="flex items-center justify-between mb-3 text-sm font-bold">
                                        <span>Phase 3: Deployment</span>
                                        <span className="text-red-400">75% Complete</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                                        <div className="bg-red-500 h-full w-3/4" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">AI Accuracy</p>
                                        <p className="text-3xl font-black">98.4<span className="text-red-500 text-sm ml-1">%</span></p>
                                    </div>
                                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Hours Saved</p>
                                        <p className="text-3xl font-black">142<span className="text-red-500 text-sm ml-1">h</span></p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-4">You get full access to this dashboard on Day 1</p>
                                    <Link href="/login" className="w-full py-4 rounded-xl bg-white text-slate-900 font-black text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                                        View Live Dashboard Demo <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Implementation FAQs</h2>
                        <p className="text-slate-500 text-lg font-medium">Clear answers to the most common enterprise onboarding questions.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                                <button
                                    onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                                >
                                    <span className="font-bold text-lg pr-8">{faq.q}</span>
                                    <ChevronDown className={`shrink-0 transition-transform ${activeFAQ === i ? 'rotate-180' : ''}`} />
                                </button>
                                {activeFAQ === i && (
                                    <div className="px-6 pb-6 text-slate-500 leading-relaxed font-medium">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Asset Downloads */}
            <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black mb-6">Standard Procurement.</h2>
                            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                                We provide standardized legal and technical documentation to speed up your internal approval process. No hidden clauses, no vendor lock-in.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="/api/downloads/sow-template" download className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-sm font-bold hover:bg-white/20 transition-all cursor-pointer">
                                    <Download size={18} className="text-red-500" /> SOW Template (PDF)
                                </a>
                                <a href="/api/downloads/implementation-checklist" download className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-sm font-bold hover:bg-white/20 transition-all cursor-pointer">
                                    <Download size={18} className="text-red-500" /> Implementation Checklist
                                </a>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-red-600 to-pink-700 p-1 rounded-[40px] shadow-2xl shadow-red-900/40">
                            <div className="bg-slate-900 rounded-[38px] p-10 text-center">
                                <div className="w-20 h-20 bg-red-600/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner shadow-red-500/10">
                                    <HelpCircle size={40} className="text-red-500" />
                                </div>
                                <h3 className="text-2xl font-black mb-4">Still have questions?</h3>
                                <p className="text-slate-400 mb-8 font-medium">Our implementation architects are available for a direct technical review.</p>
                                <div className="flex flex-col gap-3">
                                    <button className="w-full py-4 rounded-xl bg-red-600 text-white font-black text-lg hover:bg-red-700 transition-all mb-2"
                                        onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                                        Book Technical Review
                                    </button>
                                    <Link href="mailto:support@bazztech.co.ke" className="text-red-400 font-bold hover:text-red-300 transition-colors">
                                        Email Support →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
