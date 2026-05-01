"use client";
import { ArrowRight, BarChart3, TrendingUp, Download, Factory, Users, Target } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CartonManufacturerCaseStudy() {
    return (
        <main className="flex min-h-screen flex-col items-center pb-24" style={{ background: '#0F1419', color: '#A0AEC0', fontFamily: 'Inter, sans-serif' }}>
            <Header />

            {/* ─── Hero Section ─── */}
            <div className="w-full pt-36 pb-20 px-8 text-center relative overflow-hidden border-b border-slate-800" style={{ background: 'linear-gradient(135deg, #1A202C 0%, #0F1419 100%)' }}>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-10" style={{ background: '#81B29A' }} />
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
                        style={{ border: '1px solid #2D3748', background: '#141A23', color: '#81B29A' }}>
                        Flagship Deployment
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Leading Carton Manufacturer (Mauritius)
                    </h1>
                    <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-10 text-slate-400">
                        How <span style={{ color: '#E07A5F' }}>Predictive Intelligence and Cross-Department Automation</span> transformed operational noise into a 1,295% Year 1 ROI.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="px-8 py-5 font-black rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 hover:scale-105 text-[#0F1419]"
                            style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}
                            onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            <ArrowRight size={20} /> Request Your Own Audit
                        </button>
                    </div>
                </div>
            </div>

            {/* ─── Executive Summary ─── */}
            <section className="w-full max-w-5xl px-8 py-24 border-b border-slate-800">
                <div className="grid md:grid-cols-3 gap-12 items-center">
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-3xl font-black tracking-tight text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Executive Summary</h2>
                        <div className="space-y-4 text-lg text-slate-400 leading-relaxed">
                            <p><strong className="text-[#F4F1DE]">The Challenge:</strong> Factory managers were spending hours daily manually querying disparate systems to stay ahead of breakdowns. Critical data for sales, HR, and machine maintenance was fragmented, causing massive delays and costly stockouts.</p>
                            <p><strong className="text-[#F4F1DE]">The Solution:</strong> BazzAI deployed a unified, intelligent data orchestration layer. By connecting to existing factory telemetry and applying proprietary machine learning predictions, stakeholders across the entire company could query the operational state using natural language, receiving instant, automated foresight.</p>
                            <p><strong className="text-[#F4F1DE]">The Result:</strong> The intelligent shift dramatically reduced manual tracking. Stockouts plummeted by 40%, overall equipment effectiveness (OEE) rose by 15%, and HR and sales teams regained thousands of hours. The payback period was achieved in 35 days.</p>
                        </div>
                    </div>

                    <div className="p-8 rounded-[32px] border border-slate-800" style={{ background: '#141A23' }}>
                        <h4 className="font-black mb-6 flex items-center gap-2 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            <BarChart3 size={20} className="text-[#81B29A]" /> Impact Snapshot
                        </h4>
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#81B29A] mb-1">Reduction in Stockouts</p>
                                <p className="text-4xl font-black text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>40%</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#81B29A] mb-1">OEE Improvement</p>
                                <p className="text-4xl font-black text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>15%</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#81B29A] mb-1">Implementation Payback</p>
                                <p className="text-4xl font-black text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>1.2 Months</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Cross-Department Impact ─── */}
            <section className="w-full py-24 px-8 border-b border-slate-800" style={{ background: '#141A23' }}>
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-black tracking-tight mb-12 text-[#F4F1DE] text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Beyond the Factory Floor</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-3xl border border-slate-800 bg-[#0F1419] hover:border-slate-600 transition-colors">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(224, 122, 95, 0.1)', color: '#E07A5F' }}>
                                <Users size={24} />
                            </div>
                            <h4 className="font-black text-xl mb-3 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>HR & Administration</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Automated shift tracking and onboarding pipelines reduced HR administration overhead by 60%. Complex leave tracking and compliance reporting are now generated automatically by BazzAI.
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl border border-slate-800 bg-[#0F1419] hover:border-slate-600 transition-colors">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(129, 178, 154, 0.1)', color: '#81B29A' }}>
                                <Target size={24} />
                            </div>
                            <h4 className="font-black text-xl mb-3 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Sales Intelligence</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Integrated CRM data means sales teams receive predictive alerts on high-value accounts that might require attention. Real-time factory capacity visibility ensures sales never promises impossible delivery dates.
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl border border-slate-800 bg-[#0F1419] hover:border-slate-600 transition-colors">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(66, 153, 225, 0.1)', color: '#4299E1' }}>
                                <Factory size={24} />
                            </div>
                            <h4 className="font-black text-xl mb-3 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Predictive Maintenance</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Algorithms analyze machine output and automatically trigger maintenance tickets precisely when a part reaches its statistical breaking point, preventing unexpected catastrophic failure down the line.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Financial Impact ─── */}
            <section className="w-full max-w-5xl px-8 py-24">
                <h2 className="text-3xl font-black tracking-tight mb-12 text-[#F4F1DE] text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Financial ROI Framework</h2>

                <div className="bg-[#1A202C] text-[#F4F1DE] rounded-[40px] p-8 md:p-14 overflow-hidden relative shadow-2xl border border-slate-700">
                    <div className="absolute -top-12 -right-12 opacity-5 text-[#81B29A]">
                        <TrendingUp size={280} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 relative z-10">
                        <div className="space-y-10 border-b md:border-b-0 md:border-r border-slate-700 pb-10 md:pb-0 md:pr-10">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#E07A5F] mb-4">Before BazzAI</h4>
                                <ul className="space-y-4 text-sm text-slate-400">
                                    <li><strong className="text-[#F4F1DE]">Stockouts:</strong> 40/month (costing ~$2,500 each in lost production)</li>
                                    <li><strong className="text-[#F4F1DE]">OEE (Effectiveness):</strong> 65% utilization</li>
                                    <li><strong className="text-[#F4F1DE]">Manual Reporting:</strong> 15 hours/week ($750/week)</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#81B29A] mb-4">After BazzAI (Month 1)</h4>
                                <ul className="space-y-4 text-sm text-slate-400">
                                    <li><strong className="text-[#F4F1DE]">Stockouts:</strong> 24/month (Savings: $40,000/month)</li>
                                    <li><strong className="text-[#F4F1DE]">OEE:</strong> 75% (Avoided downtime: ~$60,000/month)</li>
                                    <li><strong className="text-[#F4F1DE]">Manual Reporting:</strong> 3 hours/week (12 hours freed)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-8 flex flex-col justify-center">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#81B29A] mb-2">Investment & Returns</h4>

                            <div className="flex justify-between items-center bg-[#0F1419] border border-slate-800 p-5 rounded-2xl">
                                <span className="font-bold text-slate-300 text-sm">Total Implementation Cost</span>
                                <span className="font-black text-xl">$35,000</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#0F1419] border border-slate-800 p-5 rounded-2xl">
                                <span className="font-bold text-slate-300 text-sm">Total Year 1 Cost</span>
                                <span className="font-black text-xl">$83,000</span>
                            </div>

                            <div className="flex justify-between items-center bg-[#0F1419] border border-[#E07A5F] p-5 rounded-2xl">
                                <span className="font-bold text-[#E07A5F]">Year 1 Net Savings</span>
                                <span className="font-black text-2xl text-[#E07A5F]">$1,076,200</span>
                            </div>

                            <div className="text-center mt-6">
                                <p className="font-black text-5xl text-[#F4F1DE] tracking-tighter" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    1,295%
                                </p>
                                <span className="font-bold text-[10px] text-slate-500 uppercase tracking-widest">Year 1 ROI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="w-full max-w-4xl px-8 py-16">
                <div className="bg-[#141A23] border border-slate-800 text-center rounded-[32px] p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, #E07A5F, #81B29A)' }} />
                    <h2 className="text-3xl font-black tracking-tight mb-4 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Operations Intelligence, Deployed.</h2>
                    <p className="text-slate-400 mb-8 font-medium max-w-xl mx-auto leading-relaxed">
                        Your enterprise already possesses the data required to achieve these results. We provide the AI framework to act on it.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 font-black rounded-xl transition-transform flex items-center justify-center text-[#0F1419] hover:scale-105"
                            style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}
                            onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            Request Executive Briefing
                        </button>
                        <a href="#" className="px-8 py-4 border border-slate-600 hover:border-slate-400 text-slate-300 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                            Download PDF Version <Download size={18} />
                        </a>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}
