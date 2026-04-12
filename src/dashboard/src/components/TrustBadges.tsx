"use client";

import { Shield, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function TrustBadges() {
    return (
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="group relative flex items-center gap-3 bg-slate-900/50 border border-slate-700/50 p-3 pr-5 rounded-2xl hover:bg-slate-800/80 transition-all cursor-help backdrop-blur-md">
                <div className="bg-blue-600/20 p-2 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
                    <Shield className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-[10px] font-black text-white tracking-widest uppercase">Professional Liability</div>
                    <div className="text-[11px] text-slate-300 font-medium">BazzAI E&O Insured</div>
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-0 mb-4 w-72 p-4 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-50">
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Every deployment is backed by <span className="text-white font-bold">$5,000,000</span> in AI Errors & Omissions insurance, protecting your operations from model failure and data incidents.
                    </p>
                    <Link href="/safety-oversight" className="mt-3 inline-block text-[10px] text-blue-400 font-black uppercase tracking-widest hover:text-blue-300 transition-colors">
                        Verify Coverage →
                    </Link>
                    <div className="absolute -bottom-1.5 left-8 w-3 h-3 bg-slate-950 border-r border-b border-slate-800 rotate-45"></div>
                </div>
            </div>

            <div className="group relative flex items-center gap-3 bg-slate-900/50 border border-slate-700/50 p-3 pr-5 rounded-2xl hover:bg-slate-800/80 transition-all cursor-help backdrop-blur-md">
                <div className="bg-emerald-600/20 p-2 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-[10px] font-black text-white tracking-widest uppercase">Operational Safety</div>
                    <div className="text-[11px] text-slate-300 font-medium">Human-in-the-Loop</div>
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-0 mb-4 w-72 p-4 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-50">
                    <p className="text-xs text-slate-400 leading-relaxed">
                        We guarantee that humans remain the final authority for all Level 2 and Level 3 agents. No critical AI decision is final without human sign-off.
                    </p>
                    <Link href="/safety-oversight" className="mt-3 inline-block text-[10px] text-emerald-400 font-black uppercase tracking-widest hover:text-emerald-300 transition-colors">
                        Safety Framework →
                    </Link>
                    <div className="absolute -bottom-1.5 left-8 w-3 h-3 bg-slate-950 border-r border-b border-slate-800 rotate-45"></div>
                </div>
            </div>
        </div>
    );
}
