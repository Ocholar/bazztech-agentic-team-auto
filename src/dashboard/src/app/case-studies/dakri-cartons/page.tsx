import { ArrowRight, BarChart3, Clock, TrendingUp, Download, Factory } from 'lucide-react';
import Link from 'next/link';

export default function DakriCartonsCaseStudy() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white text-slate-900 pb-24">

            {/* Hero Section */}
            <div className="w-full bg-slate-900 text-white pt-32 pb-20 px-8 text-center relative overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/30 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-widest mb-6">
                        Flagship Case Study
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        Dakri Cartons (Mauritius)
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-2xl mx-auto mb-10">
                        How <span className="text-emerald-400">Real-Time RAG &amp; Predictive Forecasting</span> transformed raw intelligence into a 1,295% Year 1 ROI.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            <ArrowRight size={20} /> Request Your Own Audit
                        </button>
                    </div>
                </div>
            </div>

            {/* Executive Summary */}
            <section className="w-full max-w-5xl px-8 py-20 border-b border-slate-100">
                <div className="grid md:grid-cols-3 gap-12 items-center">
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-3xl font-black tracking-tight">Executive Summary</h2>
                        <div className="prose prose-lg text-slate-600">
                            <p><strong>The Challenge:</strong> Factory managers were spending 3–4 hours per day manually pulling shift reports, querying multiple disconnected systems, and chasing anomalies reactively—usually after production losses or stockouts had already occurred.</p>
                            <p><strong>The Solution:</strong> BazzAI deployed a domain-aware RAG pipeline over the factory's telemetry. An n8n orchestration layer coupled with Chroma Vector DB and Claude API allowed natural language querying, paired with Holt-Winters forecasting to automate inventory signals.</p>
                            <p><strong>The Result:</strong> Stockouts dropped 40%, OEE improved by 15%, and the payback period on the BazzAI implementation was achieved in just 35 days.</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-200">
                        <h4 className="font-black text-slate-900 mb-6 flex items-center gap-2">
                            <BarChart3 size={20} className="text-emerald-500" /> Snapshot
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Reduction in Stockouts</p>
                                <p className="text-3xl font-black text-emerald-500">40%</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">OEE Improvement</p>
                                <p className="text-3xl font-black text-emerald-500">15%</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Payback Period</p>
                                <p className="text-3xl font-black text-emerald-500">1.2 months</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Financial Impact */}
            <section className="w-full max-w-5xl px-8 py-20 border-b border-slate-100">
                <h2 className="text-3xl font-black tracking-tight mb-8">Financial ROI Framework</h2>

                <div className="bg-slate-900 text-white rounded-[40px] p-8 md:p-12 overflow-hidden relative shadow-2xl">
                    <div className="absolute -top-12 -right-12 text-emerald-500/10">
                        <TrendingUp size={240} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 relative z-10">
                        <div className="space-y-8 border-b md:border-b-0 md:border-r border-slate-800 pb-8 md:pb-0 md:pr-8">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">Before BazzAI</h4>
                                <ul className="space-y-4 text-sm text-slate-300">
                                    <li><strong className="text-white">Stockouts:</strong> 40/month (costing ~$2,500 each in lost production)</li>
                                    <li><strong className="text-white">OEE (Effectiveness):</strong> 65% utilization</li>
                                    <li><strong className="text-white">Manual Reporting:</strong> 15 hours/week ($750/week)</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">After BazzAI (Month 1)</h4>
                                <ul className="space-y-4 text-sm text-slate-300">
                                    <li><strong className="text-white">Stockouts:</strong> 24/month (Savings: $40,000/month)</li>
                                    <li><strong className="text-white">OEE:</strong> 75% (Avoided downtime: ~$60,000/month)</li>
                                    <li><strong className="text-white">Manual Reporting:</strong> 3 hours/week (12 hours freed)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">Investment & ROI</h4>

                            <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-2xl">
                                <span className="font-bold">Total Implementation Cost</span>
                                <span className="font-black text-xl">$35,000</span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-2xl">
                                <span className="font-bold">Total Year 1 Cost</span>
                                <span className="font-black text-xl text-slate-300">$83,000</span>
                            </div>

                            <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl">
                                <span className="font-bold text-emerald-400">Year 1 Net Savings</span>
                                <span className="font-black text-2xl text-emerald-400">$1,076,200</span>
                            </div>

                            <p className="text-center font-black text-3xl text-white mt-8 tracking-tighter">
                                1,295% <span className="font-bold text-sm text-slate-400 uppercase tracking-widest">Year 1 ROI</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Architecture Details */}
            <section className="w-full max-w-5xl px-8 py-20 pb-0">
                <h2 className="text-3xl font-black tracking-tight mb-8">Intelligence Architecture</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                        <div className="text-blue-600 mb-4"><Factory size={32} /></div>
                        <h4 className="font-black text-slate-900 text-xl mb-3">Domain-Aware RAG</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Instead of rigid SQL queries, operations managers now ask complex questions in plain english: <em>"What caused the Line 3 shutdown?"</em>. The system references live SCADA logs, extracts the specific anomaly via Pinecone Vector DB, and summarizes the actionable response through GPT-4o-mini in 60 milliseconds.
                        </p>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                        <div className="text-red-500 mb-4"><Clock size={32} /></div>
                        <h4 className="font-black text-slate-900 text-xl mb-3">Holt-Winters Forecasting</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Through n8n orchestration, the system continuously analyzes stock flow cycles, identifying seasonal variations and trend logic using Triple Exponential Smoothing. This actively eliminated 16 stockouts per month without requiring a single human intervention prompt.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="w-full max-w-4xl px-8 py-20">
                <div className="bg-emerald-500 rounded-[32px] p-12 text-center shadow-xl">
                    <h2 className="text-3xl font-black tracking-tight mb-4 text-slate-900">Stop Firefighting. Start Forecasting.</h2>
                    <p className="text-slate-800 mb-8 font-bold max-w-xl mx-auto">
                        Your enterprise data already holds the answers. Let BazzAI build the autonomous pipeline to extract them.
                    </p>
                    <button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl transition-all shadow-lg" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                        Explore the Manufacturing RAG
                    </button>
                </div>
            </section>
        </main>
    )
}
