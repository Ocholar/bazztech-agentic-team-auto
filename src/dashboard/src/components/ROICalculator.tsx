"use client";

import { useState } from "react";
import { Calculator, Download, TrendingUp } from "lucide-react";

export default function ROICalculator() {
    const [hours, setHours] = useState(20);
    const [salary, setSalary] = useState(25); // Hourly
    const [processes, setProcesses] = useState(1);
    const [complexity, setComplexity] = useState<'Simple' | 'Medium' | 'Complex'>('Medium');

    const monthlyCost = 499 * processes; // Simplified: 1 product equivalent per process
    const implementationCost = complexity === 'Simple' ? 15000 : complexity === 'Medium' ? 20000 : 30000;

    const monthlySavings = (hours * 4 * salary);
    const annualSavings = monthlySavings * 12;

    // payback_months = (implementation_cost + (monthly_cost * 12)) / monthly_savings (simplified)
    const paybackMonths = monthlySavings > 0 ? (implementationCost + (monthlyCost * 12)) / monthlySavings : 0;
    const npv3Yr = (annualSavings * 3) - (implementationCost + (monthlyCost * 36));

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
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Manual Work Hours Saved / Week</label>
                                <span className="text-3xl font-black text-white">{hours}h</span>
                            </div>
                            <input
                                type="range" min="1" max="150" step="1" value={hours} onChange={(e) => setHours(Number(e.target.value))}
                                aria-label="Manual Work Hours per Week"
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
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

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Number of Processes to Automate</label>
                                <span className="text-xl font-black text-white">{processes}</span>
                            </div>
                            <input
                                type="range" min="1" max="10" step="1" value={processes} onChange={(e) => setProcesses(Number(e.target.value))}
                                aria-label="Processes to automate"
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Automation Complexity</label>
                            <div className="flex gap-2">
                                {(['Simple', 'Medium', 'Complex'] as const).map(level => (
                                    <button
                                        key={level}
                                        onClick={() => setComplexity(level)}
                                        className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold transition-all border ${complexity === level ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg' : 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-800'}`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[40px] p-8 flex flex-col justify-between backdrop-blur-sm relative group/result overflow-hidden">
                        <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover/result:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="relative z-10 space-y-6">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Monthly Savings</p>
                                <p className="text-4xl font-black text-white tabular-nums">${monthlySavings.toLocaleString()}</p>
                            </div>

                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Annual Savings</p>
                                <p className="text-3xl font-black text-emerald-400 tabular-nums">${annualSavings.toLocaleString()}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Implementation Cost</p>
                                    <p className="text-xl font-bold text-white tabular-nums">${implementationCost.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Payback Period</p>
                                    <p className="text-xl font-bold text-white tabular-nums">{paybackMonths.toFixed(1)} months</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-800/50">
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">3-Year Net Benefit (NPV)</p>
                                <p className="text-5xl font-black text-emerald-400 tracking-tighter tabular-nums">${npv3Yr.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="mt-8 relative z-10">
                            <button className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-black hover:bg-emerald-500 shadow-2xl shadow-emerald-900/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                                <Download size={20} strokeWidth={3} /> Download ROI Analysis
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
