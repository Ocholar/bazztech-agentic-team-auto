"use client";

import { useState } from "react";
import { Calculator, Download, TrendingUp, ArrowRight } from "lucide-react";

export default function ROICalculator() {
    const [hours, setHours] = useState(20);
    const [salary, setSalary] = useState(25); // Hourly

    const monthlySavings = (hours * salary * 4);
    const annualSavings = monthlySavings * 12;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 md:p-10 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <TrendingUp size={200} className="text-emerald-500" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-emerald-600/20 p-3.5 rounded-2xl text-emerald-400">
                        <Calculator size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white tracking-tight">AI Opportunity Estimator</h3>
                        <p className="text-slate-400 text-sm font-medium">BazzAI Core Efficiency Projected ROI</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Manual Work Hours / Week</label>
                                <span className="text-3xl font-black text-white">{hours}h</span>
                            </div>
                            <input
                                type="range" min="10" max="150" step="5" value={hours} onChange={(e) => setHours(Number(e.target.value))}
                                aria-label="Manual Work Hours per Week"
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                            <div className="flex justify-between text-[10px] text-slate-600 font-bold uppercase tracking-tighter">
                                <span>10 hours</span>
                                <span>Team Capacity</span>
                                <span>150 hours</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Avg. Operational Hourly Rate (USD)</label>
                            <div className="relative group">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-black text-lg">$</span>
                                <input
                                    type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))}
                                    aria-label="Average Operational Hourly Rate in USD"
                                    className="w-full pl-10 pr-6 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl focus:outline-none focus:border-emerald-500 transition-all text-white text-xl font-black placeholder:text-slate-700"
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-800/50">
                            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                * Benchmarked against 5,000+ automated workflows. Total ROI typically includes error reduction (avg. $4,000/mo) and accelerated revenue collection factors not shown here.
                            </p>
                        </div>
                    </div>

                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[40px] p-10 flex flex-col justify-between backdrop-blur-sm relative group/result overflow-hidden">
                        <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover/result:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="mb-10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">Monthly Capital Reclaimed</p>
                                <p className="text-5xl font-black text-white tabular-nums">${monthlySavings.toLocaleString()}</p>
                            </div>

                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">Projected Annual Transformation Value</p>
                                <p className="text-7xl font-black text-emerald-400 tracking-tighter tabular-nums">${annualSavings.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="mt-12 relative z-10">
                            <button className="w-full py-5 rounded-2xl bg-emerald-600 text-white font-black hover:bg-emerald-500 shadow-2xl shadow-emerald-900/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                                <Download size={22} strokeWidth={3} /> Get Detailed ROI Report (PDF)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
