"use client";

import {
    CheckCircle, ArrowRight, TrendingUp, Clock, Users, Shield,
    BarChart3, Zap, MapPin, Scale, ExternalLink, Download,
    FileText, Check, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LegalCaseStudy() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-slate-900 font-sans overflow-x-hidden">
            <Header />

            {/* Hero Section */}
            <section className="pt-36 pb-20 px-6 bg-slate-900 text-white relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-600/10 blur-[120px] pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <Link href="/resources" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold mb-8 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">
                        Legal Services Vertical
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-8 max-w-4xl">
                        85% Faster Client Onboarding for Nairobi Legal Labs via AI Workflow Orchestration.
                    </h1>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Challenge</p>
                            <p className="text-sm font-medium text-slate-300">Tedious document intake and manual billing reconciliation causing high overhead.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Solution</p>
                            <p className="text-sm font-medium text-slate-300">End-to-end LegalFlow pipeline for document classification, data extraction, and billing sync.</p>
                        </div>
                        <div className="bg-red-600/10 border border-red-600/20 rounded-2xl p-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-1">Result</p>
                            <p className="text-sm font-black text-white">$32,000 Annual Savings + 4-Month Payback Period.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Financial ROI Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider mb-6">
                                Procurement-Ready ROI
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Measurable Impact.</h2>
                            <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
                                For law firms, time is revenue. BazzAI returns that time to your elite legal staff.
                            </p>

                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Efficiency Gain</p>
                                        <p className="text-4xl font-black text-slate-900">85<span className="text-slate-400 text-sm">%</span></p>
                                        <p className="text-xs text-slate-500 mt-2 font-medium">Faster intake processing from first contact to dossier completion.</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Admin Overhead</p>
                                        <p className="text-4xl font-black text-slate-900">12<span className="text-slate-400 text-sm">h</span></p>
                                        <p className="text-xs text-slate-500 mt-2 font-medium">Reclaimed per week from manual data input and billing checks.</p>
                                    </div>
                                </div>

                                <div className="bg-slate-900 text-white rounded-[32px] p-8 shadow-2xl shadow-slate-900/10">
                                    <h4 className="font-black text-xl mb-6">Net Financial Benefit</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-4 border-b border-white/20">
                                            <span className="text-sm font-medium">Year 1 Net Savings</span>
                                            <span className="font-black">$18,400</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-4 border-b border-white/20">
                                            <span className="text-sm font-medium">FTE Salary Avoidance</span>
                                            <span className="font-black">$24,000</span>
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-white/30 flex justify-between items-center text-red-500">
                                        <p className="text-xs font-bold uppercase tracking-tight">Annual Recurring ROI</p>
                                        <p className="text-3xl font-black">$32k+</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-slate-50 rounded-[40px] border border-slate-200 p-8 md:p-12 shadow-sm">
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">Case Lifecycle Improvement</p>
                                <div className="space-y-12">
                                    <div className="relative pl-8 border-l-2 border-slate-200">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300" />
                                        <h5 className="font-black text-sm mb-1 uppercase tracking-tight">Manual Era</h5>
                                        <p className="text-sm text-slate-500">Onboarding took 5 days. High error rate in document indexing. Staff burnt out on paperwork.</p>
                                    </div>
                                    <div className="relative pl-8 border-l-2 border-red-500 bg-red-50/50 p-4 rounded-r-2xl">
                                        <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-red-600 animate-pulse outline outline-4 outline-red-100" />
                                        <h5 className="font-black text-sm mb-1 text-red-600 uppercase tracking-tight">BazzAI Era</h5>
                                        <p className="text-sm text-slate-600 font-medium">Onboarding in 45 minutes. 99.9% indexing accuracy. Partners focus on high-value litigation.</p>
                                    </div>

                                    <div className="pt-6 grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Implementation</p>
                                            <p className="text-xl font-black italic">Rapid</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Maintenance</p>
                                            <p className="text-xl font-black italic">Zero-Touch</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-[48px] p-10 md:p-16 border border-slate-200 shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => <Check key={i} size={16} className="text-red-500" />)}
                            </div>
                            <blockquote className="text-2xl md:text-3xl font-black leading-tight mb-10 text-slate-900">
                                "Our billable efficiency skyrocketed. By removing the clerical weight of document indexing and intake, our associates are spending 20% more time on actual legal strategy. It's the most high-impact tech investment we've made this decade."
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center text-white font-black">OM</div>
                                <div>
                                    <p className="font-bold text-lg">Otieno Mwangi</p>
                                    <p className="text-sm text-slate-500">Managing Partner, Nairobi Legal Labs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Deep Dive */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-black mb-8 underline decoration-slate-900 decoration-4 underline-offset-8">Technical Deep Dive.</h2>
                        <div className="space-y-12">
                            <div>
                                <h4 className="font-bold flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900"><Zap size={18} /></div>
                                    Integration Stack
                                </h4>
                                <ul className="grid grid-cols-2 gap-3 text-sm font-medium text-slate-600">
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-slate-900" /> Clio Legal CRM</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-slate-900" /> Stripe Invoicing</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-slate-900" /> n8n Self-Hosted</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-slate-900" /> Custom Doc AI</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900"><FileText size={18} /></div>
                                    Security & Compliance
                                </h4>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                    End-to-end encryption for all privileged communications. SOC 2 compliant architecture ensuring client data never trains public LLMs. Zero-retention policy on sensitive document metadata.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-900 rounded-[32px] p-10 flex flex-col justify-center text-white">
                        <div className="flex items-center justify-between mb-8">
                            <h5 className="font-bold uppercase tracking-widest text-[10px] text-slate-400">Processing Accuracy (Legal Docs)</h5>
                            <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black tracking-widest">VERIFIED</span>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium">Named Entity Recognition</span>
                                    <span className="font-black text-red-500">99.7%</span>
                                </div>
                                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div className="bg-red-500 h-full w-[99%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium">Invoice Total Extraction</span>
                                    <span className="font-black text-red-500">100%</span>
                                </div>
                                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div className="bg-red-500 h-full w-full" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-12">
                            <button className="w-full py-4 rounded-xl bg-white text-slate-900 font-black text-sm hover:bg-slate-100 transition-all">
                                Request Security Whitepaper
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 bg-slate-900 text-white text-center border-t border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black mb-6">Scale Your Practice, Not Your Paperwork.</h2>
                    <p className="text-slate-400 text-lg mb-10">Join elite Nairobi law firms using BazzAI to automate high-volume legal operations.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-10 py-4 rounded-2xl bg-red-600 text-white font-black text-lg hover:bg-red-700 shadow-2xl transition-all"
                            onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            Book Technical Audit
                        </button>
                        <Link href="/implementation" className="px-10 py-4 rounded-2xl border-2 border-white/20 font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                            Implementation Roadmap <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
