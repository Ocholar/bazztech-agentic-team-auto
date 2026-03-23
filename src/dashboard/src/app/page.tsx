"use client";

import { useState } from 'react';
import { Bot, MessageSquare, Zap, FileText, ArrowRight, Check, Users, Globe, Shield, Phone, Mail, MapPin, Menu, X } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-white text-slate-900 font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden">
            {/* Navigation */}
            <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="text-2xl font-black tracking-tighter">
                        Bazz<span className="text-red-600">AI</span>
                    </div>
                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <Link href="#features" className="hover:text-red-600 transition-colors">Features</Link>
                        <Link href="/pricing" className="hover:text-red-600 transition-colors">Pricing</Link>
                        <Link href="https://admin.bazztech.co.ke" className="px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-all font-bold">Admin</Link>
                        <Link href="https://portal.bazztech.co.ke/register" className="px-5 py-2 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-all hover:-translate-y-0.5 active:translate-y-0">Get Started</Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:text-red-600 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-100 shadow-xl animate-fade-in-down p-6 flex flex-col gap-6">
                        <Link href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-900">Features</Link>
                        <Link href="/pricing" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-900">Pricing</Link>
                        <Link href="https://admin.bazztech.co.ke" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-red-600">Admin Control</Link>
                        <Link href="https://portal.bazztech.co.ke/register" onClick={() => setIsMenuOpen(false)} className="w-full py-4 rounded-xl bg-red-600 text-white font-bold text-center shadow-lg shadow-red-200">Get Started</Link>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-red-50/50 rounded-full blur-3xl -z-10" />
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold mb-6 animate-fade-in">
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
                    <p className="max-w-2xl mx-auto text-base md:text-xl text-slate-600 mb-8 md:mb-12">
                        Automate your sales, accounting, and customer service with autonomous AI Agentic workflows built specifically for Kenyan MSMEs.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="https://portal.bazztech.co.ke/register" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-red-600 text-white font-bold text-lg hover:bg-red-700 shadow-xl shadow-red-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                            Start Free Trial <ArrowRight size={20} />
                        </Link>
                        <Link href="https://portal.bazztech.co.ke" className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-200 font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center text-slate-900">
                            Client Portal
                        </Link>
                    </div>
                </div>
            </section>

            {/* Assessment Form Section */}
            <section id="assessment" className="py-16 md:py-24 px-4 md:px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">Free AI Automation Readiness Assessment</h2>
                        <p className="text-slate-600 text-sm md:text-base">Fill out the form and our agentic automations will qualify your request instantly.</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-6 md:p-12 rounded-[30px] md:rounded-[40px] shadow-sm">
                        <form className="grid md:grid-cols-2 gap-4 md:gap-6" action="https://portal.bazztech.co.ke/register">
                            <div className="space-y-2">
                                <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">Full Name *</label>
                                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-red-500 transition-colors text-sm" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">Phone Number *</label>
                                <input type="tel" placeholder="0712345678" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-red-500 transition-colors text-sm" required />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-red-500 transition-colors text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">Industry & Location *</label>
                                <input type="text" placeholder="e.g. Real Estate in Nairobi" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-red-500 transition-colors text-sm" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">Interested Bundle ^</label>
                                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-red-500 transition-colors bg-white text-sm">
                                    <option>Bazz-Connect (WhatsApp)</option>
                                    <option>Bazz-Flow (Jenga Payments)</option>
                                    <option>Bazz-Doc (OCR Automations)</option>
                                    <option>Full Agentic Suite</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">Additional Information</label>
                                <textarea placeholder="Tell us about your specific needs..." className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-red-500 transition-colors min-h-[100px] text-sm"></textarea>
                            </div>
                            <div className="md:col-span-2 mt-4">
                                <button type="submit" className="w-full py-4 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200">
                                    Submit Request
                                </button>
                                <p className="text-center text-[10px] text-slate-400 mt-4">
                                    Submitting this form redirects you to the Client Portal for account setup.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-16 md:py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">Autonomous AI Power</h2>
                        <p className="text-slate-600 text-sm md:text-base">Four specialized agents working together to scale your business.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {[
                            { icon: <MessageSquare />, title: 'Bazz-Connect', desc: 'WhatsApp FrontDesk that manages chats, sales, and long-term memory.' },
                            { icon: <Zap />, title: 'Bazz-Flow', desc: 'Syncs with Equity Jenga API to match bank payments automatically.' },
                            { icon: <FileText />, title: 'Bazz-Doc', desc: 'AI OCR that extracts data from invoices and receipts in seconds.' },
                            { icon: <Users />, title: 'Bazz-Lead', desc: 'Autonomous CRM that qualifies prospects and builds your pipeline.' },
                        ].map((f, i) => (
                            <div key={i} className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-6">
                                    {f.icon}
                                </div>
                                <h3 className="text-lg md:text-xl font-bold mb-3 text-slate-900">{f.title}</h3>
                                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Built for Secure, <br /><span className="text-red-600">Kenya-Native</span> Automation.</h2>
                        <div className="space-y-6">
                            {[
                                { icon: <Globe className="text-blue-500" />, t: 'Local Integration', d: 'Works out-of-the-box with M-Pesa and Equity Bank via Jenga API.' },
                                { icon: <Shield className="text-green-500" />, t: 'Enterprise Security', d: 'Your business data is isolated and secured with multi-tenant encryption.' },
                                { icon: <Bot className="text-red-500" />, t: 'GPT-4o Powered', d: 'Advanced reasoning capabilities for complex customer service tasks.' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="shrink-0 mt-1">{item.icon}</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{item.t}</h4>
                                        <p className="text-xs md:text-sm text-slate-500">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative shadow-2xl overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Bot size={200} />
                        </div>
                        <div className="relative z-10">
                            <div className="text-red-500 font-bold mb-2 uppercase tracking-widest text-xs">Live Status</div>
                            <div className="text-xl md:text-2xl font-bold mb-6">Bazztech Cloud Ops</div>
                            <div className="space-y-4">
                                {[
                                    { label: 'Uptime', val: '99.9%' },
                                    { label: 'Latency', val: '124ms' },
                                    { label: 'Active Agents', val: '254' },
                                ].map((s, i) => (
                                    <div key={i} className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-white/60 text-sm">{s.label}</span>
                                        <span className="font-mono text-green-400 text-sm font-bold">{s.val}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 text-[10px] md:text-xs text-white/40 italic">
                                "Our Jenga polling engine automatically activated 45 new MSME subscriptions today."
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-16 md:py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                    <div className="col-span-1">
                        <div className="text-3xl font-black tracking-tighter mb-6 flex justify-center md:justify-start">
                            Bazz<span className="text-red-600">AI</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8 mx-auto md:mx-0 max-w-xs md:max-w-none">
                            Your trusted partner for AI Automation in Kenya. We provide ready-to-deploy,
                            productized automation solutions built on n8n.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-red-500">Quick Links</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link href="#features" className="hover:text-white transition-colors">Products</Link></li>
                            <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="#assessment" className="hover:text-white transition-colors">Assessment</Link></li>
                            <li><Link href="https://admin.bazztech.co.ke" className="hover:text-white transition-colors font-bold">Admin</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-red-500">Legal</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div id="contact" className="flex flex-col items-center md:items-start">
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-red-500">Contact Us</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="text-red-600" /> +254 781 751 937
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="text-red-600" /> info@bazztech.co.ke
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin size={16} className="text-red-600" /> Nairobi, Kenya
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] md:text-xs text-slate-500 text-center md:text-left">
                    <div>
                        © 2024 Bazztech Networks. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
