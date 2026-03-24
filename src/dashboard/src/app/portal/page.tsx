"use client";

import { useState } from 'react';
import { Bot, MessageSquare, Zap, FileText, ArrowRight, Check, Users, Globe, Shield, Phone, Mail, MapPin, Menu, X } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function PortalLanding() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-white text-slate-900 font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden">
            {/* Hero Section */}
            <section className="pt-16 md:pt-24 pb-16 md:pb-24 px-6 relative overflow-hidden bg-slate-50/50">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] md:text-xs font-bold mb-6 animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        NOW LIVE IN KENYA 🇰🇪
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8">
                        Hire Your First <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">AI Digital Employee.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-base md:text-xl text-slate-600 mb-8 md:mb-12 leading-relaxed">
                        Automate your sales, accounting, and customer service with autonomous AI Agentic workflows built specifically for Kenyan MSMEs.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="#assessment" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-red-600 text-white font-bold text-lg hover:bg-red-700 shadow-xl shadow-red-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                            Start Free Trial <ArrowRight size={20} />
                        </Link>
                        <Link href="/login" className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-200 font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center text-slate-900 bg-white">
                            Member Access
                        </Link>
                    </div>
                </div>
            </section>

            {/* Assessment Form Section - Matches Screenshot 5 */}
            <section id="assessment" className="py-16 md:py-24 px-4 md:px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black mb-4">Free AI Automation Readiness Assessment</h2>
                        <p className="text-slate-500 text-sm md:text-lg">Fill out the form and our agentic automations will qualify your request instantly.</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-6 md:p-12 rounded-[30px] md:rounded-[40px] shadow-sm">
                        <form className="grid md:grid-cols-2 gap-4 md:gap-6" action="/register">
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-500">Full Name *</label>
                                <input type="text" placeholder="John Doe" className="w-full px-4 py-4 rounded-xl border border-slate-200 outline-none focus:border-red-500 transition-colors text-sm font-bold" required />
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-500">Phone Number *</label>
                                <input type="tel" placeholder="0712345678" className="w-full px-4 py-4 rounded-xl border border-slate-200 outline-none focus:border-red-500 transition-colors text-sm font-bold" required />
                            </div>
                            <div className="md:col-span-2 space-y-2 text-left">
                                <label className="text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-500">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full px-4 py-4 rounded-xl border border-slate-200 outline-none focus:border-red-500 transition-colors text-sm font-bold" />
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-500">Industry & Location *</label>
                                <input type="text" placeholder="e.g. Real Estate in Nairobi" className="w-full px-4 py-4 rounded-xl border border-slate-200 outline-none focus:border-red-500 transition-colors text-sm font-bold" required />
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-500">Interested Bundle ^</label>
                                <select className="w-full px-4 py-4 rounded-xl border border-slate-200 outline-none focus:border-red-500 transition-colors bg-white text-sm font-bold">
                                    <option>Bazz-Connect (WhatsApp)</option>
                                    <option>Bazz-Flow (M-Pesa / Jenga)</option>
                                    <option>Bazz-Doc (AI OCR)</option>
                                    <option>Full Agentic Suite</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 space-y-2 text-left">
                                <label className="text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-500">Additional Information</label>
                                <textarea placeholder="Tell us about your specific needs..." className="w-full px-4 py-4 rounded-xl border border-slate-200 outline-none focus:border-red-500 transition-colors min-h-[120px] text-sm font-bold"></textarea>
                            </div>
                            <div className="md:col-span-2 mt-6">
                                <button type="submit" className="w-full py-5 bg-red-600 text-white font-black text-xl rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-200">
                                    Submit Request
                                </button>
                                <p className="text-center text-[10px] text-slate-400 mt-6 font-bold">
                                    Submitting this form redirects you to the registration page for account setup.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="py-12 border-t border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-tight">
                        © 2026 Bazztech Networks. All rights reserved.
                    </div>
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <Link href="/privacy" className="hover:text-red-600">Privacy</Link>
                        <Link href="/terms" className="hover:text-red-600">Terms</Link>
                        <Link href="mailto:info@bazztech.co.ke" className="hover:text-red-600">Support</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
