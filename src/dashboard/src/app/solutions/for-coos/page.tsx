"use client";
import { ArrowRight, Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const frictions = [
    { before: "Stockouts discovered after production halts", after: "Predictive inventory signals 2 weeks in advance" },
    { before: "3+ hours/day pulling manual shift reports", after: "Natural language queries answered in 60 seconds" },
    { before: "Exceptions escalated to humans after damage", after: "Anomaly alerts fired before line stoppages occur" },
    { before: "Reconciliation takes 2-3 days per month", after: "Ledger sync is continuous and fully automated" },
];

export default function ForCOOs() {
    return (
        <div className="flex min-h-screen flex-col bg-white overflow-x-hidden text-slate-900">
            <Header />
            <main className="flex-1 flex flex-col items-center pb-24 pt-16">

                {/* Hero */}
                <div className="w-full bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 text-white pt-32 pb-20 px-8 relative overflow-hidden">
                    <div className="absolute bottom-0 left-1/4 w-96 h-64 bg-red-600/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="max-w-5xl mx-auto relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-400/30 text-red-300 text-[10px] font-black uppercase tracking-widest mb-6">
                            For COOs & Operations Leaders
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight max-w-3xl">
                            Stop Firefighting. Start Forecasting.
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 font-medium mb-10 leading-relaxed max-w-2xl">
                            Every manual bottleneck costs you 15–30% of operational capacity. BazzAI replaces reactive decision-making with real-time, autonomous intelligence pipelines.
                        </p>
                        <button className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl transition-all shadow-lg flex items-center gap-2 w-max" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            <Clock size={20} /> Book an Operations Audit
                        </button>
                    </div>
                </div>

                {/* Before / After Grid */}
                <section className="w-full max-w-5xl px-8 py-20">
                    <h2 className="text-3xl font-black mb-4 text-center">Before BazzAI vs. After BazzAI</h2>
                    <p className="text-slate-500 text-center mb-12 font-medium">Every row below represents a week of unrecaptured time. See what happens when you remove each one.</p>
                    <div className="space-y-4">
                        {frictions.map((f, i) => (
                            <div key={i} className="grid md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl p-5">
                                    <AlertTriangle size={18} className="text-red-500 mt-0.5 shrink-0" />
                                    <p className="text-slate-700 font-medium text-sm">{f.before}</p>
                                </div>
                                <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                                    <CheckCircle size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                                    <p className="text-slate-700 font-medium text-sm">{f.after}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Validated Outcome */}
                <section className="w-full max-w-5xl px-8 pb-20">
                    <div className="bg-slate-900 text-white rounded-[32px] p-10 md:p-14 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-12 opacity-5"><TrendingUp size={150} /></div>
                        <h2 className="text-3xl md:text-4xl font-black mb-6 relative z-10">Proven at Dakri Cartons (Mauritius)</h2>
                        <div className="grid grid-cols-3 gap-6 mb-10 relative z-10">
                            {[
                                { val: "40%", label: "Reduction in Stockouts" },
                                { val: "15%", label: "OEE Improvement in 90 days" },
                                { val: "35 days", label: "Payback Period" },
                            ].map((m, i) => (
                                <div key={i} className="text-center">
                                    <p className="text-3xl md:text-4xl font-black text-emerald-400">{m.val}</p>
                                    <p className="text-xs text-slate-400 mt-1 font-medium">{m.label}</p>
                                </div>
                            ))}
                        </div>
                        <button className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl transition-all relative z-10" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            Get an ROI Projection for Your Operations <ArrowRight size={18} />
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
