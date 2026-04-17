"use client";

import {
    CheckCircle, ArrowRight, TrendingUp, Clock, Users, Shield,
    BarChart3, Zap, MapPin, Heart, ExternalLink, Download,
    FileText, Check, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HealthcareCaseStudy() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-slate-900 font-sans overflow-x-hidden">
            <Header />

            {/* Hero Section */}
            <section className="pt-36 pb-20 px-6 bg-slate-900 text-white relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-rose-600/10 blur-[120px] pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <Link href="/resources" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold mb-8 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-widest mb-6">
                        Healthcare Vertical
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-8 max-w-4xl text-rose-50">
                        Eliminating 90% of Appointment No-Shows via WhatsApp AI Orchestration.
                    </h1>

                    <div className="grid md:grid-cols-3 gap-8 text-white/90">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mb-1">Challenge</p>
                            <p className="text-sm font-medium">30% no-show rate for specialist consultations causing revenue leakage and scheduling chaos.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mb-1">Solution</p>
                            <p className="text-sm font-medium">BazzAI WhatsApp Reminders + Lead Nurturing + EHR Integration.</p>
                        </div>
                        <div className="bg-rose-600/20 border border-rose-500/30 rounded-2xl p-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mb-1">Impact</p>
                            <p className="text-sm font-black text-rose-50">90% Reduction in No-Shows in the first 60 days of deployment.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider mb-6">
                                Patient-First Automation
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">The Retention Engine.</h2>
                            <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
                                Coastal Health Clinic needed a way to ensure patients attended critical consultations without drowning their staff in phone calls.
                            </p>

                            <div className="space-y-6">
                                <div className="p-8 bg-rose-50 rounded-3xl border border-rose-100 relative overflow-hidden group">
                                    <div className="relative z-10 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-2">Primary Metric</p>
                                            <p className="text-5xl font-black text-slate-900">90<span className="text-rose-500 text-2xl">%</span></p>
                                            <p className="text-sm text-slate-600 font-bold mt-2">Reduction in Appointment No-Shows</p>
                                        </div>
                                        <TrendingUp size={64} className="text-rose-200 group-hover:text-rose-300 transition-colors" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 text-center">
                                        <p className="text-3xl font-black text-slate-900">$14k</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Monthly Revenue Reclaimed</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 text-center">
                                        <p className="text-3xl font-black text-slate-900">200+</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Hours Reclaimed/Mo</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-[48px] p-8 md:p-12 shadow-2xl relative overflow-hidden text-white">
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-rose-500/10 to-transparent" />
                            <h3 className="text-2xl font-black mb-10 flex items-center gap-3">
                                <Zap className="text-rose-500" /> Patient Engagement Lifecycle
                            </h3>
                            <div className="space-y-10 border-l-2 border-white/10 pl-8 relative">
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-rose-500" />
                                    <h5 className="font-bold text-sm mb-1">Booking Confirmation</h5>
                                    <p className="text-xs text-slate-400">Instant WhatsApp confirmation with calendar sync link.</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
                                    <h5 className="font-bold text-sm mb-1">Smart Reminders</h5>
                                    <p className="text-xs text-slate-400">24-hour and 2-hour reminders with interactive "Confirm/Reschedule" buttons.</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-white/20" />
                                    <h5 className="font-bold text-sm mb-1">Post-Visit Follow-up</h5>
                                    <p className="text-xs text-slate-400">Automated satisfaction surveys and prescription refill alerts.</p>
                                </div>

                                <div className="pt-6">
                                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                                        <div className="flex items-center gap-3 text-sm font-bold text-rose-100 mb-2">
                                            <Shield size={16} /> Privacy-First Architecture
                                        </div>
                                        <p className="text-[10px] text-slate-400 font-medium">HIPAA-ready data handling ensure patient data stays secure and private throughout the automation cycle.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Implementation Section */}
            <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-6">60 Days to Positive ROI.</h2>
                        <p className="text-slate-500 text-lg font-medium">No downtime. No disruption. Just a smarter clinic.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-sm">
                            <Clock className="text-rose-500 mx-auto mb-6" size={40} />
                            <h4 className="font-bold text-lg mb-2">Fast Setup</h4>
                            <p className="text-sm text-slate-500">Live within 3 weeks of architectural sign-off.</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-sm">
                            <Users className="text-rose-500 mx-auto mb-6" size={40} />
                            <h4 className="font-bold text-lg mb-2">Zero Staff Training</h4>
                            <p className="text-sm text-slate-500">System runs in the background. Staff continues using EHR as usual.</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-sm">
                            <Download className="text-rose-500 mx-auto mb-6" size={40} />
                            <h4 className="font-bold text-lg mb-2">Fully Managed</h4>
                            <p className="text-sm text-slate-500">BazzAI handles the n8n hosting, scaling, and WhatsApp API maintenance.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-900 text-white rounded-[48px] p-12 md:p-16 relative overflow-hidden text-center shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-pink-500" />
                        <div className="relative z-10">
                            <blockquote className="text-2xl md:text-4xl font-black leading-tight mb-12 italic">
                                "The difference was immediate. Our specialists no longer have empty gaps in their schedule due to forgotten appointments. BazzAI paid for itself in the first two months."
                            </blockquote>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-rose-600 flex items-center justify-center font-black text-xl mb-4">DR</div>
                                <p className="font-black text-xl">Dr. David Robert</p>
                                <p className="text-rose-400 font-bold text-sm uppercase tracking-widest">Medical Director, Coastal Health Clinic</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Context */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-black mb-8 underline decoration-rose-500 decoration-4 underline-offset-8 font-sans">Technical Context.</h2>
                        <div className="space-y-12">
                            <div>
                                <h4 className="font-bold flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600"><Zap size={18} /></div>
                                    The Stack
                                </h4>
                                <ul className="grid grid-cols-2 gap-3 text-sm font-medium text-slate-600">
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-rose-600" /> Meta Cloud API (WhatsApp)</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-rose-600" /> n8n Orchestration</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-rose-600" /> ELK EHR Integration</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-rose-600" /> Redis State Mgmt</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600"><FileText size={18} /></div>
                                    Workflow Design
                                </h4>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                    Webhook-triggered orchestration from EHR appointment events. Dynamic message template selection based on specialist type. Asynchronous reminder scheduling with automatic retries on delivery failure.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-[32px] border-2 border-slate-200 p-10 flex flex-col justify-center text-slate-900 shadow-inner">
                        <div className="flex items-center justify-between mb-8">
                            <h5 className="font-black uppercase tracking-widest text-[10px] text-slate-400">Monthly Notification Volume</h5>
                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black tracking-widest uppercase">Target Hit</span>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between text-sm mb-2 font-bold">
                                    <span>Messages Delivered (99.9% Success)</span>
                                    <span className="text-rose-600">3,490</span>
                                </div>
                                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                                    <div className="bg-rose-500 h-full w-[99%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2 font-bold">
                                    <span>Patient Opt-in Rate</span>
                                    <span className="text-rose-600">92%</span>
                                </div>
                                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                                    <div className="bg-rose-500 h-full w-[92%]" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-12">
                            <button className="w-full py-4 rounded-xl bg-slate-900 text-white font-black text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 mb-3"
                                onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                                Book Your ROI Audit <ArrowRight size={16} />
                            </button>
                            <a href="/api/downloads/case-study-healthcare" download className="block w-full py-4 rounded-xl border-2 border-slate-900 text-slate-900 font-black text-sm hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2">
                                Download Technical PDF <Download size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
