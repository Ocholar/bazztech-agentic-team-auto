"use client";
import Link from 'next/link';
import { Bot, DollarSign, TrendingUp, ArrowRight, AlertTriangle, Calculator } from 'lucide-react';

// Phase 1 Foundation Components
import CurrencyToggle from '@/components/CurrencyToggle';
import KenyaGrantBanner from '@/components/KenyaGrantBanner';
import TrustBadges from '@/components/TrustBadges';

const AUDIT_URL = 'https://calendly.com/reagan-bazztech/30min';

export default function ForCFOsPage() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            <header className="fixed top-0 w-full z-50 bg-white/96 backdrop-blur-sm border-b border-slate-100 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-white"><Bot size={18} /></div>
                        <span className="text-xl font-black">Bazz<span className="text-red-600">AI</span></span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/solutions/for-ctos" className="text-sm font-semibold text-slate-500 hover:text-slate-900">For CTOs</Link>
                        <Link href="/solutions/for-coos" className="text-sm font-semibold text-slate-500 hover:text-slate-900">For COOs</Link>
                        <button className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>Book Call</button>
                    </div>
                </div>
            </header>

            <main className="pt-24">
                {/* HERO */}
                <section className="py-20 px-6 bg-gradient-to-b from-emerald-950 to-slate-900 text-white">
                    <div className="max-w-5xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-6">
                            📊 For CFOs &amp; Finance Leaders
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                            Every Manual Process<br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">Has a Price Tag.</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mb-10">
                            Manual operations carry a hidden tax: errors, delays, overtime, and missed revenue windows. BazzAI quantifies and eliminates that cost — with a payback period measured in weeks, not years.
                        </p>
                        <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-600 text-white font-black hover:bg-emerald-700 transition-all hover:scale-105" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            Get My ROI Projection <ArrowRight size={18} />
                        </button>
                    </div>
                </section>

                {/* COST OF INACTION */}
                <section className="py-20 px-6 bg-amber-50 border-b border-amber-100">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <AlertTriangle size={24} className="text-amber-600" />
                            <h2 className="text-3xl font-black">The Cost of Inaction</h2>
                        </div>
                        <p className="text-slate-600 mb-10 max-w-2xl">Every month your operations remain manual, these costs compound silently in your P&amp;L:</p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { label: 'Labour cost for repetitive tasks', est: '$1,150–$3,000 / month per department', desc: 'Salary allocated to manual data entry, report generation, and follow-ups that AI can handle.' },
                                { label: 'Error correction & dispute resolution', est: '$400–$1,500 / month', desc: 'Billing errors, invoice disputes, and reconciliation corrections from manual data handling.' },
                                { label: 'Delayed revenue collection', est: '15–25 day average delay', desc: 'Manual invoice processing and follow-up cycles extend receivable collection timelines.' },
                                { label: 'Missed leads from slow response', est: '30–60% lead decay rate', desc: 'Leads that don\'t receive a response within 1 hour convert at 7x lower rates.' },
                            ].map((c, i) => (
                                <div key={i} className="bg-white border border-amber-200 rounded-[20px] p-6">
                                    <p className="font-black mb-1">{c.label}</p>
                                    <p className="text-amber-700 text-sm font-bold mb-3">{c.est}</p>
                                    <p className="text-slate-500 text-sm">{c.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ROI MODEL */}
                <section className="py-20 px-6 border-b border-slate-100">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-black mb-3 text-center">Indicative ROI Model</h2>
                        <p className="text-slate-500 text-center mb-8 max-w-xl mx-auto">Based on a mid-sized company (50–200 employees) deploying 2–3 BazzAI automation pipelines.</p>

                        <div className="flex flex-col items-center gap-6 mb-12">
                            <CurrencyToggle />
                            <div className="max-w-md w-full">
                                <KenyaGrantBanner />
                            </div>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-[24px] overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-900 text-white">
                                        <th className="p-4 text-left font-black">Metric</th>
                                        <th className="p-4 text-right font-black">Before</th>
                                        <th className="p-4 text-right font-black">After BazzAI</th>
                                        <th className="p-4 text-right font-black text-green-400">Saving</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Monthly reconciliation labour', '$1,400', '$150', '$1,250'],
                                        ['Invoice error cost', '$600', '$30', '$570'],
                                        ['Lead response labour', '$900', '$115', '$785'],
                                        ['Report generation', '$450', '$40', '$410'],
                                        ['Total monthly operational cost', '$3,400', '$340', '$3,060/mo'],
                                    ].map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                            <td className="p-4 font-semibold text-slate-700">{row[0]}</td>
                                            <td className="p-4 text-right text-red-600">{row[1]}</td>
                                            <td className="p-4 text-right text-slate-600">{row[2]}</td>
                                            <td className="p-4 text-right text-green-600 font-black">{row[3]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-3 text-center">* Estimates based on client benchmarks. Actual results vary. Your ROI projection will be calculated during your assessment call.</p>
                    </div>
                </section>

                {/* PRICING TIERS */}
                <section className="py-20 px-6 bg-slate-50 border-b border-slate-100">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-black mb-3 text-center">Pricing Tiers (Indicative Ranges)</h2>
                        <p className="text-slate-500 text-center mb-12 max-w-xl mx-auto">Exact pricing is scoped per engagement. These ranges reflect typical project sizes.</p>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { tier: 'Starter', range: '$5k – $20k', sub: 'Single pipeline deployment', points: ['1 AI agent / workflow', '14-day deployment', '3-month support included', 'Best for: 1 process automation'] },
                                { tier: 'Growth', range: '$25k – $60k', sub: 'Multi-pipeline integration', points: ['2–4 AI agents', 'CRM + payment integration', '6-month SLA support', 'Best for: dept-wide automation'], featured: true },
                                { tier: 'Enterprise', range: '$75k – $200k+', sub: 'Full-stack AI transformation', points: ['5+ agents across departments', 'Custom LLM deployment', '12-month retainer', 'Best for: org-wide rollout'] },
                            ].map((t, i) => (
                                <div key={i} className={`rounded-[24px] p-7 border-2 ${t.featured ? 'border-red-200 bg-red-50 shadow-lg' : 'border-slate-200 bg-white'}`}>
                                    {t.featured && <p className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2">Most Popular</p>}
                                    <p className="font-black text-lg mb-1">{t.tier}</p>
                                    <p className="text-3xl font-black mb-1">{t.range}</p>
                                    <p className="text-slate-500 text-xs mb-5">{t.sub}</p>
                                    <ul className="space-y-2">
                                        {t.points.map((pt, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                                                <TrendingUp size={12} className="text-green-500 mt-1 flex-shrink-0" /> {pt}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 px-6 bg-emerald-900 text-white text-center">
                    <h2 className="text-3xl font-black mb-4">Get a Custom ROI Projection for Your Business</h2>
                    <p className="text-emerald-200 mb-8">In 15 minutes, we'll calculate the exact cost of your current manual processes and project your first-year savings.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-white text-emerald-900 font-black hover:bg-emerald-50 transition-all hover:scale-105" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            <Calculator size={18} /> Book My ROI Assessment
                        </button>
                        <Link href="/enterprise"
                            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl border border-white/30 text-white font-bold hover:bg-white/10 transition-all">
                            View Enterprise Playbook
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
