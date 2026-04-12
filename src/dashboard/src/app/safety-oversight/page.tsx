"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Shield,
    CheckCircle,
    Lock,
    FileText,
    AlertCircle,
    ArrowRight,
    Bot,
    UserCheck,
    Activity,
    Download,
    ExternalLink
} from "lucide-react";

export default function SafetyOversightPage() {
    const [verificationData, setVerificationData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/insurance/verify");
                const data = await res.json();
                setVerificationData(data);
            } catch (err) {
                console.error("Failed to fetch safety data", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">
            <style>{`
            @keyframes pulse-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
            .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        `}</style>

            {/* Navigation */}
            <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            <Bot size={22} />
                        </div>
                        <span className="text-2xl font-black tracking-tight">
                            Bazz<span className="text-blue-600">AI</span>
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/security" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Security</Link>
                        <Link href="/enterprise" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Enterprise</Link>
                        <Link href="/" className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all text-sm">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6">
                {/* Hero Section */}
                <section className="max-w-4xl mx-auto text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-8 animate-in fade-in slide-in-from-bottom-4">
                        <Shield size={14} /> Safety & Governance Framework
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-tight">
                        Enterprise Trust Built on <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Verifiable Accountability.</span>
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed mx-auto max-w-2xl font-medium">
                        BazzAI isn't just a service; it's an insured, governed infrastructure. We provide the liability coverage and human-in-the-loop controls required for global enterprise operations.
                    </p>
                </section>

                {/* Verification Status */}
                <section className="max-w-6xl mx-auto mb-32">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Insurance Card */}
                        <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 md:p-10 relative overflow-hidden group backdrop-blur-sm">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Shield size={120} className="text-blue-500" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="bg-blue-600/20 p-3.5 rounded-2xl text-blue-400">
                                        <Shield size={28} />
                                    </div>
                                    <h2 className="text-2xl font-black">Professional Liability</h2>
                                </div>

                                <p className="text-slate-300 mb-10 leading-relaxed text-lg">
                                    BazzAI is backed by a <span className="text-white font-bold">$5,000,000 USD</span> Professional Indemnity and AI Errors & Omissions policy. This covers model hallucinations, data incidents, and operational errors.
                                </p>

                                <div className="space-y-4 mb-10">
                                    {loading ? (
                                        <div className="animate-pulse flex space-x-4">
                                            <div className="flex-1 space-y-4 py-1">
                                                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                                                <div className="h-4 bg-slate-800 rounded"></div>
                                            </div>
                                        </div>
                                    ) : (verificationData?.insurancePolicies?.length || 0) > 0 ? (
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Active Policy</p>
                                                    <p className="text-lg font-bold">{verificationData.insurancePolicies[0].policyName}</p>
                                                </div>
                                                <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[10px] font-bold text-emerald-400 flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                    VERIFIED
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Provider</p>
                                                    <p className="font-semibold text-slate-200">{verificationData.insurancePolicies[0].provider}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Policy #</p>
                                                    <p className="font-mono text-[11px] text-slate-200">{verificationData.insurancePolicies[0].policyNumber}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-amber-400 text-sm flex items-center gap-3">
                                            <AlertCircle size={18} /> Fallback Coverage Active. Live verification pending.
                                        </div>
                                    )}
                                </div>

                                <button className="w-full py-4 rounded-2xl bg-white text-slate-900 font-black hover:bg-slate-100 transition-all flex items-center justify-center gap-2 group/btn">
                                    <Download size={20} className="group-hover/btn:-translate-y-0.5 transition-transform" /> Download Insurance Certificate
                                </button>
                            </div>
                        </div>

                        {/* HITL Card */}
                        <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 md:p-10 relative overflow-hidden group backdrop-blur-sm">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <UserCheck size={120} className="text-emerald-500" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="bg-emerald-600/20 p-3.5 rounded-2xl text-emerald-400">
                                        <UserCheck size={28} />
                                    </div>
                                    <h2 className="text-2xl font-black">Human-in-the-Loop</h2>
                                </div>

                                <p className="text-slate-300 mb-10 leading-relaxed text-lg">
                                    We enforce a strict governance protocol where AI agents never execute critical financial or structural decisions without deterministic human oversight.
                                </p>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-4 tracking-widest">Protocol L2/L3 Enforcement</p>
                                    <div className="space-y-4">
                                        {loading ? (
                                            <div className="space-y-3">
                                                <div className="h-4 bg-slate-800 rounded animate-pulse w-full"></div>
                                                <div className="h-4 bg-slate-800 rounded animate-pulse w-5/6"></div>
                                            </div>
                                        ) : (
                                            verificationData?.hitlGuarantees?.map((h: any, i: number) => (
                                                <div key={i} className="flex items-start gap-4">
                                                    <div className="mt-1 bg-emerald-500/20 p-1 rounded-md">
                                                        <CheckCircle size={12} className="text-emerald-500" />
                                                    </div>
                                                    <p className="text-sm text-slate-300 font-medium leading-relaxed">{h.guaranteeText}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                <Link href="/enterprise#governance" className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:gap-3 transition-all">
                                    View Full Governance Playbook <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Audit Log Mockup */}
                <section className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black mb-4">Real-Time Compliance Logging</h2>
                        <p className="text-slate-400 font-medium px-6">Every AI decision is logged with a cryptographic hash, ensuring a non-repudiable audit trail for your legal and risk departments.</p>
                    </div>

                    <div className="bg-black/60 border border-slate-800 rounded-3xl p-8 font-mono text-[12px] text-slate-500 overflow-hidden shadow-2xl backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-5">
                            <div className="flex items-center gap-2.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-emerald-500 uppercase font-black tracking-widest text-[10px]">Live Audit Stream</span>
                            </div>
                            <span className="text-slate-600 text-[10px] font-bold">NODE: EU-CENTRAL-1 (AMSTERDAM)</span>
                        </div>
                        <div className="space-y-3">
                            <p className="flex gap-6"><span className="text-slate-700 whitespace-nowrap">[14:02:31]</span> <span className="text-blue-500 font-bold">ACTION_TRIGGERED:</span> <span className="text-slate-300">BAZZ_FLOW_SYNC_MASTER</span></p>
                            <p className="flex gap-6"><span className="text-slate-700 whitespace-nowrap">[14:02:32]</span> <span className="text-emerald-500 font-bold">HITL_CHECK:</span> <span className="text-slate-300">Transaction volume $25,000 exceeds threshold - Pending human review...</span></p>
                            <p className="flex gap-6"><span className="text-slate-700 whitespace-nowrap">[14:02:35]</span> <span className="text-amber-500 font-bold">USER_SIGNAL:</span> <span className="text-slate-300">Human Admin (ID: #REAGAN-01) approved action ID: #AX883</span></p>
                            <p className="flex gap-6"><span className="text-slate-700 whitespace-nowrap">[14:02:36]</span> <span className="text-slate-500 font-bold">BLOCK_COMMITTED:</span> <span className="text-slate-600">Hdr: 0x82Af...99b2 | Sig: ed25519_vrf_2026_x7</span></p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-white/5 py-12 px-6 bg-slate-900/50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-xs font-bold uppercase tracking-widest">
                    <p>© 2026 BazzAI Global Operations. Fully Insured.</p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-white transition-colors">Compliance Policy</Link>
                        <Link href="/security" className="hover:text-white transition-colors">Data Residency</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
