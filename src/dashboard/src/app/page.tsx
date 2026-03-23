import { Bot, MessageSquare, Zap, FileText, ArrowRight, Check, Users, Globe, Shield } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-slate-900 font-sans selection:bg-red-100 selection:text-red-900">
            {/* Navigation */}
            <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="text-2xl font-black tracking-tighter">
                        Bazz<span className="text-red-600">AI</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <Link href="#features" className="hover:text-red-600 transition-colors">Features</Link>
                        <Link href="/pricing" className="hover:text-red-600 transition-colors">Pricing</Link>
                        <Link href="https://portal.bazztech.co.ke/login" className="px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-all">Client Login</Link>
                        <Link href="/register" className="px-5 py-2 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-all hover:-translate-y-0.5 active:translate-y-0">Get Started</Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-40 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-red-50/50 rounded-full blur-3xl -z-10" />
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold mb-6 animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        NOW LIVE IN KENYA 🇰🇪
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8">
                        Hire Your First <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">AI Digital Employee.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-12">
                        Automate your sales, accounting, and customer service with autonomous AI Agentic workflows built specifically for Kenyan MSMEs.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/register" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-red-600 text-white font-bold text-lg hover:bg-red-700 shadow-xl shadow-red-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                            Start Free Trial <ArrowRight size={20} />
                        </Link>
                        <Link href="https://portal.bazztech.co.ke" className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-200 font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center">
                            Member Portal
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Autonomous AI Power</h2>
                        <p className="text-slate-600">Four specialized agents working together to scale your business.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <MessageSquare />, title: 'Bazz-Connect', desc: 'WhatsApp FrontDesk that manages chats, sales, and long-term memory.' },
                            { icon: <Zap />, title: 'Bazz-Flow', desc: 'Syncs with Equity Jenga API to match bank payments automatically.' },
                            { icon: <FileText />, title: 'Bazz-Doc', desc: 'AI OCR that extracts data from invoices and receipts in seconds.' },
                            { icon: <Users />, title: 'Bazz-Lead', desc: 'Autonomous CRM that qualifies prospects and builds your pipeline.' },
                        ].map((f, i) => (
                            <div key={i} className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2">
                                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-6">
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6 leading-tight">Built for Secure, <br /><span className="text-red-600">Kenya-Native</span> Automation.</h2>
                        <div className="space-y-6">
                            {[
                                { icon: <Globe className="text-blue-500" />, t: 'Local Integration', d: 'Works out-of-the-box with M-Pesa and Equity Bank via Jenga API.' },
                                { icon: <Shield className="text-green-500" />, t: 'Enterprise Security', d: 'Your business data is isolated and secured with multi-tenant encryption.' },
                                { icon: <Bot className="text-red-500" />, t: 'GPT-4o Powered', d: 'Advanced reasoning capabilities for complex customer service tasks.' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="shrink-0 mt-1">{item.icon}</div>
                                    <div>
                                        <h4 className="font-bold">{item.t}</h4>
                                        <p className="text-sm text-slate-500">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-slate-900 rounded-3xl p-8 text-white relative shadow-2xl overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Bot size={200} />
                        </div>
                        <div className="relative z-10">
                            <div className="text-red-500 font-bold mb-2 uppercase tracking-widest text-xs">Live Status</div>
                            <div className="text-2xl font-bold mb-6">Bazztech Cloud Ops</div>
                            <div className="space-y-4">
                                {[
                                    { label: 'Uptime', val: '99.9%' },
                                    { label: 'Latency', val: '124ms' },
                                    { label: 'Active Agents', val: '254' },
                                ].map((s, i) => (
                                    <div key={i} className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-white/60">{s.label}</span>
                                        <span className="font-mono text-green-400">{s.val}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 text-xs text-white/40 italic">
                                "Our Jenga polling engine automatically activated 45 new MSME subscriptions today."
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-slate-400 text-sm">
                        © 2026 Bazztech Solution Ltd. All rights reserved.
                    </div>
                    <div className="flex gap-8 text-sm font-medium text-slate-600">
                        <Link href="/privacy">Privacy</Link>
                        <Link href="/terms">Terms</Link>
                        <Link href="mailto:hello@bazztech.co.ke">hello@bazztech.co.ke</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
