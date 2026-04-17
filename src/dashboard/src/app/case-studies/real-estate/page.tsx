"use client";

import {
    CheckCircle, ArrowRight, TrendingUp, Clock, Users, Shield,
    BarChart3, Zap, MapPin, Building2, ExternalLink, Download,
    FileText, Check, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RealEstateCaseStudy() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-slate-900 font-sans overflow-x-hidden">
            <Header />

            {/* Hero Section */}
            <section className="pt-36 pb-20 px-6 bg-slate-900 text-white relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <Link href="/resources" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold mb-8 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                        Real Estate Vertical
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-8 max-w-4xl">
                        How a Nairobi Reality Firm Saved 15 Hours/Week and Accelerated Onboarding by 70%.
                    </h1>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Challenge</p>
                            <p className="text-sm font-medium text-slate-300">Manual lead intake and document processing creating 3-day bottlenecks.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Solution</p>
                            <p className="text-sm font-medium text-slate-300">Implemented BazzAI Document Automation + Lead Onboarding pipelines.</p>
                        </div>
                        <div className="bg-red-600/10 border border-red-600/20 rounded-2xl p-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-1">Result</p>
                            <p className="text-sm font-black text-white">$28,000 Annual Savings + 6-Week Payback Period.</p>
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
                                CFO-Ready Analysis
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">The Financial Impact.</h2>
                            <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
                                We don't measure success by "efficiency"—we measure it by dollars saved and revenue unlocked.
                            </p>

                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Cost Savings</p>
                                        <p className="text-4xl font-black text-slate-900">$2,300<span className="text-slate-400 text-sm">/mo</span></p>
                                        <p className="text-xs text-slate-500 mt-2 font-medium">Saved on manual document processing and data entry.</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Revenue Enabled</p>
                                        <p className="text-4xl font-black text-slate-900">25<span className="text-slate-400 text-sm">%</span></p>
                                        <p className="text-xs text-slate-500 mt-2 font-medium">Increase in lead capacity without adding new staff.</p>
                                    </div>
                                </div>

                                <div className="bg-red-600 text-white rounded-[32px] p-8 shadow-2xl shadow-red-900/10">
                                    <h4 className="font-black text-xl mb-6">3-Year Projected Value</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-4 border-b border-white/20">
                                            <span className="text-sm font-medium">Year 1 Net Benefit</span>
                                            <span className="font-black">$12,000</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-4 border-b border-white/20">
                                            <span className="text-sm font-medium">Year 2 Net Benefit</span>
                                            <span className="font-black">$34,000</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Year 3 Net Benefit</span>
                                            <span className="font-black">$46,000</span>
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-white/30 flex justify-between items-center">
                                        <p className="text-xs font-bold uppercase tracking-tight">Total 3-Year ROI</p>
                                        <p className="text-3xl font-black">2.4x</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-slate-100 rounded-[48px] -z-10" />
                            <div className="bg-white rounded-[40px] border border-slate-200 p-8 md:p-12 shadow-sm">
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">Before vs After BazzAI</p>
                                <div className="space-y-10">
                                    <div>
                                        <div className="flex justify-between items-end mb-3">
                                            <p className="font-bold">Manual Onboarding Time</p>
                                            <p className="text-sm text-slate-500">3 Days</p>
                                        </div>
                                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="bg-slate-400 h-full w-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-end mb-3 text-red-600">
                                            <p className="font-bold">AI Autopilot Time</p>
                                            <p className="text-sm font-bold">2 Hours</p>
                                        </div>
                                        <div className="w-full h-3 bg-red-100 rounded-full overflow-hidden text-red-600">
                                            <div className="bg-red-600 h-full w-[5%]" />
                                        </div>
                                    </div>

                                    <div className="pt-10 space-y-4">
                                        <div className="flex items-start gap-4 p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                                            <Zap className="text-emerald-500 shrink-0" size={24} />
                                            <div>
                                                <p className="font-bold text-emerald-900 mb-0.5">Payback Achieved in Week 6</p>
                                                <p className="text-xs text-emerald-700">The monthly savings on manual labor exceeded the implementation cost within 45 days.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                                            <BarChart3 className="text-blue-500 shrink-0" size={24} />
                                            <div>
                                                <p className="font-bold text-blue-900 mb-0.5">90% Reduction in Errors</p>
                                                <p className="text-xs text-blue-700">Automated classification eliminated misfiled property documents entirely.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Implementation Timeline */}
            <section className="py-24 px-6 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Real-World Implementation.</h2>
                        <p className="text-slate-400 text-lg font-medium">8 weeks from first call to production deployment.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 relative">
                        {[
                            { week: 'W1', title: 'Audit', desc: 'Mapped 14 manual bottlenecks.' },
                            { week: 'W3', title: 'Design', desc: 'Architected n8n + Document Logic.' },
                            { week: 'W5', title: 'Pilot', desc: 'Parallel testing with 95%+ accuracy.' },
                            { week: 'W8', title: 'Live', desc: 'Full cutover. $0 downtime.' }
                        ].map((s, i) => (
                            <div key={i} className="flex-1 bg-white/5 border border-white/10 rounded-[32px] p-8 relative group hover:bg-white/10 transition-all">
                                <div className="text-4xl font-black text-red-500 mb-4">{s.week}</div>
                                <h4 className="font-bold text-xl mb-2">{s.title}</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-50 rounded-[48px] p-10 md:p-16 border border-slate-200 relative overflow-hidden">
                        <div className="absolute top-10 right-10 text-slate-100">
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => <Check key={i} size={16} className="text-emerald-500" />)}
                            </div>
                            <blockquote className="text-2xl md:text-3xl font-bold leading-tight mb-10 text-slate-900">
                                "BazzAI transformed how we handle document intake. What used to take our team 3 days now takes 2 hours. We've been able to take on 40% more clients without hiring additional staff."
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white font-black">JS</div>
                                <div>
                                    <p className="font-bold text-lg">Jane Smith</p>
                                    <p className="text-sm text-slate-500">Operations Director, Nairobi Luxury Estates</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Deep Dive */}
            <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-black mb-8 underline decoration-red-500 decoration-4 underline-offset-8">Technical Deep Dive.</h2>
                        <div className="space-y-12">
                            <div>
                                <h4 className="font-bold flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600"><Zap size={18} /></div>
                                    Integration Stack
                                </h4>
                                <ul className="grid grid-cols-2 gap-3 text-sm font-medium text-slate-600">
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-red-500" /> Salesforce CRM</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-red-500" /> WhatsApp Cloud API</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-red-500" /> n8n Self-Hosted</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-red-500" /> Bazz-Doc OCR Engine</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600"><Users size={18} /></div>
                                    Workflow Logic
                                </h4>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Captures incoming property documents via email/WhatsApp → AI classification for compliance → automated data extraction via custom RAG pipeline → secondary human-in-the-loop verification for low-confidence fields → automatic sync to Salesforce property profiles.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-[32px] border border-slate-200 p-10 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-8">
                            <h5 className="font-bold uppercase tracking-widest text-[10px] text-slate-400">Monthly Processing Volume</h5>
                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black tracking-widest">LIVE DATA</span>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Documents Extracted</span>
                                <span className="font-black">1,842</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-red-500 h-full w-[85%]" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Extraction Accuracy</span>
                                <span className="font-black">99.2%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-red-500 h-full w-[99%]" />
                            </div>
                        </div>
                        <div className="mt-12 text-center">
                            <a href="/api/downloads/case-study-real-estate" download className="block w-full py-4 rounded-xl border-2 border-slate-900 font-black text-sm hover:bg-slate-900 hover:text-white transition-all text-center">
                                Download Full Technical PDF
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 bg-red-600 text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black mb-6">See What BazzAI Can Do for Your Firm.</h2>
                    <p className="text-red-100 text-lg mb-10">We build custom industry-specific pipelines that pay for themselves in months, not years.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-10 py-4 rounded-2xl bg-white text-red-600 font-black text-lg hover:bg-red-50 shadow-2xl transition-all"
                            onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            Book Your Free Audit
                        </button>
                        <Link href="/implementation" className="px-10 py-4 rounded-2xl border-2 border-white/50 font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                            View Implementation Roadmap <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
