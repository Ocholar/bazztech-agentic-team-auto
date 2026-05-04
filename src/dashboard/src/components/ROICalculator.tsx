"use client";

import { useState, useEffect } from "react";
import { Calculator, Zap, TrendingUp, Info } from "lucide-react";

export default function ROICalculator({
    currency,
    setCurrency
}: {
    currency: 'KES' | 'USD',
    setCurrency: (c: 'KES' | 'USD') => void
}) {
    const [lines, setLines] = useState(5);
    const [downtime, setDowntime] = useState(15);
    const [hourValue, setHourValue] = useState(15000); // KES per hour
    const [manualHours, setManualHours] = useState(10);

    // Constants for calculation
    const EXCHANGE_RATE = 135; // KES per USD
    const RECOVERY_RATE = 0.15; // 15% improvement in OEE

    // Calculations
    const monthlyLinesDowntimeLoss = lines * downtime * hourValue;
    const manualLaborLoss = manualHours * 4 * (hourValue / 5); // Labor estimated at 20% of output value
    const totalPotentialMonthlyLoss = monthlyLinesDowntimeLoss + manualLaborLoss;

    // BazzAI Impact
    const monthlySavings = totalPotentialMonthlyLoss * RECOVERY_RATE;
    const annualSavings = monthlySavings * 12;
    const subscriptionCost = currency === 'KES' ? 35000 : 250;
    const monthlyROI = ((monthlySavings - subscriptionCost) / subscriptionCost) * 100;
    const paybackDays = (subscriptionCost / (monthlySavings / 30));

    const formatVal = (val: number) => {
        const value = currency === 'USD' ? val / EXCHANGE_RATE : val;
        return (currency === 'USD' ? '$' : 'KES ') + Math.round(value).toLocaleString();
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12">
            <div className="bg-[#141A23] border border-slate-800 rounded-[40px] overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none rotate-12">
                    <TrendingUp size={400} className="text-[#E07A5F]" />
                </div>

                <div className="grid lg:grid-cols-2">
                    {/* ─── INPUTS ─── */}
                    <div className="p-8 md:p-14 border-r border-slate-800">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="bg-[#E07A5F]/20 p-3 rounded-2xl text-[#E07A5F]">
                                <Calculator size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Operational ROI Calculator</h3>
                                <p className="text-slate-500 text-sm">Estimate BazzAI's impact on your bottom line.</p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            {/* PRODUCTION LINES */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#81B29A]">Active Production Lines</label>
                                    <span className="text-2xl font-black text-[#F4F1DE]">{lines}</span>
                                </div>
                                <input
                                    id="lines-slider"
                                    aria-label="Active Production Lines"
                                    type="range" min="1" max="50" step="1" value={lines} onChange={(e) => setLines(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#E07A5F]"
                                />
                            </div>

                            {/* MONTHLY DOWNTIME */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#81B29A]">Avg. Monthly Downtime (Hours/Line)</label>
                                    <span className="text-2xl font-black text-[#F4F1DE]">{downtime}h</span>
                                </div>
                                <input
                                    id="downtime-slider"
                                    aria-label="Monthly Downtime Hours"
                                    type="range" min="1" max="100" step="1" value={downtime} onChange={(e) => setDowntime(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#E07A5F]"
                                />
                            </div>

                            {/* HOURLY VALUE */}
                            <div className="space-y-4">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-[#81B29A]">Value Per Production Hour ({currency})</label>
                                <div className="relative group">
                                    <input
                                        id="hour-value-input"
                                        title="Value Per Production Hour"
                                        type="number"
                                        value={currency === 'KES' ? hourValue : Math.round(hourValue / EXCHANGE_RATE)}
                                        onChange={(e) => setHourValue(currency === 'KES' ? Number(e.target.value) : Number(e.target.value) * EXCHANGE_RATE)}
                                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#E07A5F] transition-all text-white text-xl font-bold"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                                        <button onClick={() => setCurrency('KES')} className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${currency === 'KES' ? 'bg-[#E07A5F] text-white' : 'bg-slate-800 text-slate-500'}`}>KES</button>
                                        <button onClick={() => setCurrency('USD')} className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${currency === 'USD' ? 'bg-[#E07A5F] text-white' : 'bg-slate-800 text-slate-500'}`}>USD</button>
                                    </div>
                                </div>
                            </div>

                            {/* MANUAL HOURS */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#81B29A]">Manual Reporting (Man-Hours/Week)</label>
                                    <span className="text-2xl font-black text-[#F4F1DE]">{manualHours}h</span>
                                </div>
                                <input
                                    id="manual-hours-slider"
                                    aria-label="Manual Reporting Weekly Hours"
                                    type="range" min="0" max="60" step="1" value={manualHours} onChange={(e) => setManualHours(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#E07A5F]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ─── RESULTS ─── */}
                    <div className="p-8 md:p-14 bg-[#E07A5F]/[0.02] flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#E07A5F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <div className="relative z-10 space-y-12">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                                    Projected Monthly Recovery <Info size={12} className="opacity-50" />
                                </p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-5xl md:text-7xl font-black text-[#F4F1DE] tracking-tighter tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                        {formatVal(monthlySavings)}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#81B29A] mb-1">Annual Savings</p>
                                    <p className="text-2xl font-black text-[#F4F1DE] tabular-nums">{formatVal(annualSavings)}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#81B29A] mb-1">Payback Period</p>
                                    <p className="text-2xl font-black text-[#F4F1DE] tabular-nums">{Math.max(1, Math.round(paybackDays))} Days</p>
                                </div>
                            </div>

                            <div className="p-6 rounded-3xl bg-[#81B29A]/10 border border-[#81B29A]/20">
                                <div className="flex items-center gap-3 mb-2">
                                    <Zap size={18} className="text-[#81B29A]" />
                                    <span className="text-xs font-black uppercase tracking-widest text-[#81B29A]">Efficiency Multiplier</span>
                                </div>
                                <p className="text-sm font-medium text-slate-400">
                                    Based on our baseline 15% downtime recovery model, BazzAI pays for its annual cost in <span className="text-[#81B29A] font-black">{Math.round(annualSavings / (subscriptionCost * 12))}x</span> multiples.
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 relative z-10">
                            <div className="text-[10px] font-bold text-slate-600 uppercase mb-4 text-center tracking-normal">
                                Results based on Kenyan SME average of 15% OEE recovery.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
