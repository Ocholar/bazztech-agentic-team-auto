import { Check, ArrowRight, Zap, Target, BarChart3, Database } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function WhyBazzAI() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white text-slate-900 pb-24">
            <Header />
            {/* Hero Section */}
            <div className="w-full bg-slate-900 text-white pt-24 pb-20 px-8 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        Deploy Enterprise AI Automation <span className="text-emerald-400">Without Building It Yourself</span>
                    </h1>
                    <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto mb-10">
                        We use machine learning to reduce operational friction. We aren't just selling software; we are selling automated decision-making. Speed of a platform. Customization of in-house. Cost of neither.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="#compare" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25">
                            See How It Compares
                        </Link>
                    </div>
                </div>
            </div>

            {/* Section 1: For CTOs */}
            <section className="w-full max-w-6xl px-8 py-20 border-b border-slate-100">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-slate-100 text-slate-800 rounded-xl"><Database size={28} /></div>
                    <h2 className="text-3xl font-black tracking-tight">Why RAG + n8n for Enterprise Workflows <span className="text-slate-400 text-xl font-bold">(For CTOs)</span></h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-xl font-bold mb-4">The Problem With Alternatives</h3>
                        <div className="space-y-6">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h4 className="font-black text-slate-800 mb-2">1. Fine-Tuning LLMs</h4>
                                <p className="text-sm text-slate-600">It's tempting to think fine-tuning Claude on factory data is the answer. But it costs $100k-$500k, requires constant re-training on stale data, and carries a huge maintenance burden.</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h4 className="font-black text-slate-800 mb-2">2. Prompt Engineering (In-Context)</h4>
                                <p className="text-sm text-slate-600">Simple prompt injection is fragile. You hit token limits quickly (8k-16k context max), naive retrieval fails on complex data, and latency spirals out of control.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-2xl">
                        <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                            <Zap className="text-emerald-400" /> Our Approach: RAG + n8n
                        </h3>
                        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                            We handle the orchestration you'd otherwise have to build internally. We combine Semantic search (Chroma vector DB), Real-time retrieval (n8n), and Streaming inference (Claude API) to deliver precision analytics in 60ms.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-sm font-medium"><Check className="text-emerald-400 shrink-0" size={18} /> No expensive model training or fine-tuning lag</li>
                            <li className="flex gap-3 text-sm font-medium"><Check className="text-emerald-400 shrink-0" size={18} /> Cost scales with usage, not infrastructure</li>
                            <li className="flex gap-3 text-sm font-medium"><Check className="text-emerald-400 shrink-0" size={18} /> You keep the IP (your data trains no public models)</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Section 2: For CFOs */}
            <section className="w-full max-w-6xl px-8 py-20 border-b border-slate-100">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><BarChart3 size={28} /></div>
                    <h2 className="text-3xl font-black tracking-tight">The Financial Justification <span className="text-slate-400 text-xl font-bold">(For CFOs)</span></h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <p className="text-lg text-slate-600 font-medium">
                            Why deal with 8-12 month payback periods when you could see ROI in 3-6 months? BazzAI shifts your automation from a CapEx nightmare into an efficient OpEx acceleration.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex gap-4 p-4 rounded-xl border border-slate-100 shadow-sm">
                                <span className="font-black text-slate-900 w-24">Year 1 Cost</span>
                                <span className="text-slate-600"><strong>BazzAI:</strong> $49k-$85k vs <strong>In-House:</strong> $300k+</span>
                            </li>
                            <li className="flex gap-4 p-4 rounded-xl border border-slate-100 shadow-sm">
                                <span className="font-black text-slate-900 w-24">Risk</span>
                                <span className="text-slate-600"><strong>BazzAI:</strong> Low vs <strong>Consulting:</strong> Medium</span>
                            </li>
                        </ul>
                        <Link href="/pricing" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700">
                            View the Interactive ROI Calculator <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                        <h4 className="font-black text-slate-900 mb-4">Why Consulting Can't Match This</h4>
                        <p className="text-sm text-slate-600 mb-4">
                            Traditional consulting firms charging $150k rely on maintaining a 3-4 month timeline to justify their billable hours. If the consultant leaves, the institutional knowledge walks out the door.
                        </p>
                        <p className="text-sm text-slate-600">
                            <strong>BazzAI is your long-term automated ops partner, not a transient project team.</strong>
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: For COOs */}
            <section className="w-full max-w-6xl px-8 py-20 border-b border-slate-100">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Target size={28} /></div>
                    <h2 className="text-3xl font-black tracking-tight">Time-to-Value & Speed <span className="text-slate-400 text-xl font-bold">(For COOs)</span></h2>
                </div>

                <div className="bg-slate-900 rounded-3xl text-white overflow-hidden shadow-xl">
                    <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                        <div className="p-8 text-center">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">BazzAI Platform</h4>
                            <p className="text-4xl font-black text-emerald-400">4-8 wks</p>
                            <p className="text-xs text-slate-500 mt-2">From decision to production.</p>
                        </div>
                        <div className="p-8 text-center bg-slate-800/20">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Traditional Consulting</h4>
                            <p className="text-4xl font-black text-white">12-20 wks</p>
                            <p className="text-xs text-slate-500 mt-2">Scoping, design, implementation.</p>
                        </div>
                        <div className="p-8 text-center bg-slate-800/20">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">In-House Build</h4>
                            <p className="text-4xl font-black text-white">16-24 wks</p>
                            <p className="text-xs text-slate-500 mt-2">Hiring, onboarding, building.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section id="compare" className="w-full max-w-6xl px-8 py-20 pb-16">
                <h2 className="text-3xl font-black tracking-tight text-center mb-12">The Definitive Comparison</h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-slate-900">
                                <th className="p-4 font-black text-slate-900 bg-slate-50">Feature</th>
                                <th className="p-4 font-black text-emerald-600 bg-emerald-50">BazzAI</th>
                                <th className="p-4 font-bold text-slate-600 bg-slate-50">In-House Build</th>
                                <th className="p-4 font-bold text-slate-600 bg-slate-50">Consultancy</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr>
                                <td className="p-4 font-bold text-slate-900 whitespace-nowrap">Speed to Production</td>
                                <td className="p-4 font-black text-emerald-600 bg-emerald-50/50">4-8 wks</td>
                                <td className="p-4 text-slate-600">16-24 wks</td>
                                <td className="p-4 text-slate-600">12-20 wks</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-slate-900 whitespace-nowrap">Data Privacy</td>
                                <td className="p-4 font-black text-slate-900 bg-emerald-50/50">Your data, no LLM training</td>
                                <td className="p-4 text-slate-600">Full control</td>
                                <td className="p-4 text-slate-600">Depends on contract</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-slate-900 whitespace-nowrap">Year 1 Total Cost</td>
                                <td className="p-4 font-black text-slate-900 bg-emerald-50/50">$49k-$85k</td>
                                <td className="p-4 text-slate-600">$300k-$550k</td>
                                <td className="p-4 text-slate-600">$160k-$480k</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-slate-900 whitespace-nowrap">Ongoing Ops Burden</td>
                                <td className="p-4 font-black text-slate-900 bg-emerald-50/50">Low (BazzAI manages it)</td>
                                <td className="p-4 text-slate-600">High (You manage it)</td>
                                <td className="p-4 text-slate-600">Medium (Retainers)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* CTA */}
            <section className="w-full max-w-4xl px-8 py-12">
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center shadow-lg">
                    <h2 className="text-3xl font-black tracking-tight mb-4 text-slate-900">Ready to automate decision-making?</h2>
                    <p className="text-slate-600 mb-8 font-medium max-w-xl mx-auto">
                        Stop treating AI like an experiment. Start treating it like your most capable operational employee.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/portal?book=true" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black rounded-xl transition-all">
                            Book a Free ROI Assessment
                        </Link>
                        <Link href="https://wa.me/254712345678" className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-800 font-bold rounded-xl transition-all">
                            Chat with Our CTO
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
