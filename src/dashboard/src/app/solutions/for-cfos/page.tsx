"use client";
import { ArrowRight, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const items = [
    { icon: <DollarSign size={22} className="text-emerald-400" />, title: "Predictable Fixed Retainer", body: "Enterprise intelligence starts at $2,500/mo — replacing 3–5 FTE operations roles and unpredictable consulting day-rates." },
    { icon: <PieChart size={22} className="text-blue-400" />, title: "OpEx Model, Not CapEx", body: "No $500k platform license. BazzAI runs on your existing cloud infrastructure under a fully managed OpEx retainer." },
    { icon: <TrendingUp size={22} className="text-red-400" />, title: "3–6 Month Payback", body: "Based on our Dakri Cartons deployment, the $35k implementation recovered its full cost within the first 35 operating days." },
];

export default function ForCFOs() {
    return (
        <div className="flex min-h-screen flex-col bg-white overflow-x-hidden text-slate-900">
            <Header />
            <main className="flex-1 flex flex-col items-center pb-24 pt-16">

                {/* Hero */}
                <div className="w-full bg-slate-900 text-white pt-32 pb-20 px-8 relative overflow-hidden">
                    <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
                    <div className="max-w-5xl mx-auto relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6">
                            For CFOs & Finance Leaders
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight max-w-3xl">
                            Every Dollar Invested Has a Calculated Return.
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 font-medium mb-10 leading-relaxed max-w-2xl">
                            AI automation is not a cost center. With measurable ROI frameworks, predictable retainer pricing, and zero CapEx overhead, BazzAI is the most defensible OpEx line item on your P&L.
                        </p>
                        <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 w-max" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            <DollarSign size={20} /> Get a Financial ROI Projection
                        </button>
                    </div>
                </div>

                {/* 3 Financial Pillars */}
                <section className="w-full max-w-5xl px-8 py-20">
                    <h2 className="text-3xl font-black mb-12 text-center">The Financial Case for BazzAI</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {items.map((item, i) => (
                            <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm">
                                <div className="w-12 h-12 rounded-2xl bg-slate-200 flex items-center justify-center mb-5">{item.icon}</div>
                                <h3 className="text-xl font-black mb-3">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ROI Breakdown Card */}
                <section className="w-full max-w-4xl px-8 pb-20">
                    <div className="bg-white border-2 border-emerald-100 rounded-[32px] p-10 shadow-xl">
                        <h2 className="text-2xl font-black mb-8 text-slate-900">Dakri Cartons ROI Breakdown</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center py-4 border-b border-slate-100">
                                <span className="text-slate-600 font-medium">Implementation Fee</span>
                                <span className="font-black text-slate-900">$35,000</span>
                            </div>
                            <div className="flex justify-between items-center py-4 border-b border-slate-100">
                                <span className="text-slate-600 font-medium">Monthly Retainer × 12</span>
                                <span className="font-black text-slate-900">$48,000</span>
                            </div>
                            <div className="flex justify-between items-center py-4 border-b border-slate-100">
                                <span className="text-slate-600 font-medium">Total Year 1 Investment</span>
                                <span className="font-black text-slate-900">$83,000</span>
                            </div>
                            <div className="flex justify-between items-center py-4 border-b border-slate-100">
                                <span className="text-slate-600 font-medium">Stockout + Downtime Savings</span>
                                <span className="font-black text-emerald-600">$1,159,200</span>
                            </div>
                            <div className="flex justify-between items-center py-4 bg-emerald-50 rounded-2xl px-4">
                                <span className="text-emerald-800 font-black text-lg">Year 1 Net ROI</span>
                                <span className="font-black text-emerald-600 text-2xl">1,295%</span>
                            </div>
                        </div>
                        <Link href="/case-studies/dakri-cartons" className="inline-flex items-center gap-2 font-black text-red-600 hover:text-red-700 transition-colors">
                            Read Full Case Study <ArrowRight size={16} />
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
