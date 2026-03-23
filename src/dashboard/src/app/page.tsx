"use client";

import { useState } from 'react';
import { Bot, MessageSquare, Zap, FileText, ArrowRight, Check, Users, Globe, Shield, Phone, Mail, MapPin, Menu, X, Star } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-white text-slate-900 font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden">
            {/* Header / Navigation - Matches Screenshot 1 */}
            <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white">
                            <Bot size={24} />
                        </div>
                        <span className="text-2xl font-black tracking-tighter">
                            Bazz<span className="text-red-600">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-10 text-sm font-bold text-slate-600">
                        <Link href="#products" className="hover:text-red-600 transition-colors">Products</Link>
                        <Link href="#features" className="hover:text-red-600 transition-colors">Features</Link>
                        <Link href="#testimonials" className="hover:text-red-600 transition-colors">Testimonials</Link>
                        <Link href="#contact" className="hover:text-red-600 transition-colors">Contact</Link>
                        <Link href="https://admin.bazztech.co.ke" className="px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md">Agent Login</Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-b border-slate-100 p-6 flex flex-col gap-4 animate-fade-in-down">
                        <Link href="#products" onClick={() => setIsMenuOpen(false)} className="font-bold">Products</Link>
                        <Link href="#features" onClick={() => setIsMenuOpen(false)} className="font-bold">Features</Link>
                        <Link href="https://admin.bazztech.co.ke" onClick={() => setIsMenuOpen(false)} className="font-bold text-red-600">Agent Login</Link>
                    </div>
                )}
            </header>

            {/* Hero Section - Matches Screenshot 1 & 2 - Side-by-Side */}
            <section className="pt-32 md:pt-48 pb-16 md:pb-32 px-6 relative overflow-hidden bg-slate-50/30">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Text Content */}
                    <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] md:text-xs font-bold mb-8">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            Productized AI Services for MSMEs
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-8">
                            Automate <br />
                            Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-pink-500 to-red-400">Growth</span>
                        </h1>
                        
                        <p className="max-w-xl text-lg md:text-xl text-slate-500 mb-12 leading-relaxed">
                            Ready-to-deploy AI solutions for Kenyan businesses. No complexity, just results.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                            <Link href="https://portal.bazztech.co.ke/register" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-red-600 text-white font-black text-lg hover:bg-red-700 shadow-xl shadow-red-100 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                                Get Your Free Assessment <ArrowRight size={22} />
                            </Link>
                            <Link href="#products" className="w-full sm:w-auto px-8 py-4 rounded-2xl border-2 border-slate-200 text-slate-900 font-black text-lg hover:bg-slate-50 transition-all">
                                View AI Bundles
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Mini Mockup (Reduced Dimensions) */}
                    <div className="hidden lg:flex justify-center relative">
                        <div className="w-full max-w-lg aspect-square rounded-[40px] bg-gradient-to-br from-red-50 to-white border border-red-100 shadow-2xl flex items-center justify-center relative overflow-hidden transition-transform hover:scale-[1.02] duration-700">
                            <div className="absolute top-8 right-8 bg-white shadow-xl p-3 rounded-2xl flex items-center gap-2 animate-bounce">
                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                                    <Zap size={14} fill="currentColor" />
                                </div>
                                <div className="text-left">
                                    <div className="text-[8px] font-bold text-slate-400 uppercase">Response</div>
                                    <div className="text-xs font-black">&lt; 1s</div>
                                </div>
                            </div>
                            <div className="p-16 bg-gradient-to-tr from-red-600 to-pink-500 rounded-full blur-[80px] opacity-10 absolute -z-10"></div>
                            <Bot size={100} className="text-red-600" />
                            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                    <span className="text-[8px] font-bold text-slate-500 uppercase">Agents</span>
                                </div>
                                <div className="text-base font-black">Active</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Product Bundles - Matches Screenshot 2 */}
            <section id="products" className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-black mb-4">Our Productized AI Bundles</h2>
                    <p className="text-slate-500 mb-16 text-lg">Ready-to-deploy systems built with precision. Choose the automation that <br className="hidden md:block" /> brings the most impact to your daily operations.</p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { color: 'green', icon: <MessageSquare />, title: 'Bazz-Connect WhatsApp', sub: 'n8n + WhatsApp API + OpenAI', features: ['FAQ Automation', 'Lead Qualification', 'Order Status', 'CRM Backup'] },
                            { color: 'blue', icon: <Zap />, title: 'Bazz-Flow M-Pesa', sub: 'n8n + Daraja 3.0 + ERP Sync', features: ['Payment Matching', 'Instant SMS Alerts', 'Ledger Updates', 'Zero Errors'] },
                            { color: 'purple', icon: <FileText />, title: 'Bazz-Doc AI Processor', sub: 'n8n + OpenAI Vision/OCR', features: ['Invoice Extraction', 'Receipt OCR', 'Data Structuring', 'Database Sync'] },
                            { color: 'orange', icon: <Bot />, title: 'Bazz-Lead Agent', sub: 'n8n + CRM Integration', features: ['Social Media Capture', 'AI Nurturing', 'Meeting Scheduling', 'Pipeline Mgmt.'] },
                        ].map((b, i) => (
                            <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group flex flex-col text-left">
                                <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-transform group-hover:scale-110 ${
                                    b.color === 'green' ? 'bg-green-50 text-green-600' :
                                    b.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                    b.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                    'bg-orange-50 text-orange-600'
                                }`}>
                                    {b.icon}
                                </div>
                                <h3 className="text-xl font-black mb-1">{b.title}</h3>
                                <p className="text-[10px] font-bold text-slate-400 mb-8 uppercase tracking-wider">{b.sub}</p>
                                
                                <h4 className="text-sm font-black mb-4 flex items-center gap-2">Instant Sync</h4>
                                <ul className="space-y-4 mb-10 flex-grow">
                                    {b.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-xs text-slate-500">
                                            <Check size={14} className="text-green-500" /> {f}
                                        </li>
                                    ))}
                                </ul>

                                <Link href="https://portal.bazztech.co.ke/register" className="w-full py-4 rounded-xl bg-slate-900 text-white text-xs font-black text-center hover:bg-red-600 transition-colors">
                                    Get Started
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Productized Advantage - Matches Screenshot 3 */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-black mb-4">The Productized Advantage</h2>
                    <p className="text-slate-500 mb-20">We provide fixed-cost solutions, not open-ended consulting hours. Clear <br /> pricing and defined outcomes.</p>
                    
                    <div className="grid md:grid-cols-3 gap-16">
                        {[
                            { icon: <Zap className="text-red-500" />, title: 'Fixed Cost Deployments', desc: 'Say goodbye to unpredictable hourly billing. You buy a tailored product with defined deliverables and clear outcomes.' },
                            { icon: <Shield className="text-blue-500" />, title: 'Battle-Tested Infrastructure', d: 'Our bundles use reliable open-source frameworks like n8n combined with industry leading APIs like OpenAI and Daraja.' },
                            { icon: <Globe className="text-green-500" />, title: 'Industry Specialized', d: 'Specialized automations tailored explicitly for Real Estate, Legal Services, Healthcare providers, and Retail businesses.' },
                        ].map((a, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8">
                                    {a.icon}
                                </div>
                                <h4 className="text-2xl font-black mb-4">{a.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">{a.desc || a.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer - Updated Branding */}
            <footer className="bg-slate-900 text-white py-20 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="text-3xl font-black tracking-tighter mb-6">
                            Bazz<span className="text-red-600">AI</span>
                        </div>
                        <p className="text-slate-400 max-w-sm mb-10 leading-relaxed">
                            Bazztech Networks is your trusted partner for AI Automation in Kenya. We provide ready-to-deploy, productized automation solutions built on n8n.
                        </p>
                        <div className="flex gap-6">
                            <Link href="https://portal.bazztech.co.ke/register" className="px-6 py-3 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition-all font-bold">Get Started Today</Link>
                        </div>
                    </div>
                    
                    <div>
                        <h5 className="text-red-500 font-black text-xs uppercase tracking-widest mb-8">Contact</h5>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li className="flex items-center gap-3"><Phone size={16} className="text-red-600" /> +254 781 751 937</li>
                            <li className="flex items-center gap-3"><Mail size={16} className="text-red-600" /> info@bazztech.co.ke</li>
                            <li className="flex items-center gap-3"><MapPin size={16} className="text-red-600" /> Nairobi, Kenya</li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-red-500 font-black text-xs uppercase tracking-widest mb-8">Company</h5>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">AI News & Blog</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                
                <div className="max-w-7xl mx-auto border-t border-white/10 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-[10px] md:text-sm font-bold">© 2026 Bazztech Networks. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
