"use client";

import { useState } from 'react';
import { Bot, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_NUMBER = '15558219787';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <style>{`
                .solutions-dropdown { position: relative; }
                .solutions-dropdown-menu { display: none; position: absolute; top: calc(100% + 8px); left: -24px;
                    background: white; border: 1px solid #f1f5f9; border-radius: 16px; padding: 8px;
                    min-width: 240px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); z-index: 100; }
                .solutions-dropdown:hover .solutions-dropdown-menu { display: block; }
                .solutions-dropdown-menu a { display: block; padding: 10px 14px; border-radius: 10px; font-size: 13px; font-weight: 600;
                    color: #334155; transition: background 0.15s; text-decoration: none; }
                .solutions-dropdown-menu a:hover { background: #f8fafc; color: #dc2626; }
            `}</style>

            <header className="fixed top-0 w-full z-50 bg-white/96 backdrop-blur-sm border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white">
                            <Bot size={22} />
                        </div>
                        <span className="text-2xl font-black tracking-tight">
                            Bazz<span className="text-red-600">AI</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                        <div className="solutions-dropdown">
                            <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                                Solutions <ChevronDown size={14} />
                            </button>
                            <div className="solutions-dropdown-menu">
                                <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">By Role</div>
                                <a href="/solutions/for-ctos">🔧 For CTOs &amp; Engineering Leaders</a>
                                <a href="/solutions/for-coos">⚙️ For COOs &amp; Operations Leaders</a>
                                <a href="/solutions/for-cfos">📊 For CFOs &amp; Finance Leaders</a>
                                <div className="border-t border-slate-100 my-1" />
                                <a href="/#products">All Solutions</a>
                            </div>
                        </div>
                        <Link href="/pricing" className="hover:text-red-600 transition-colors">Pricing</Link>
                        <Link href="/how-it-works" className="hover:text-red-600 transition-colors">How It Works</Link>
                        <Link href="/implementation" className="hover:text-red-600 transition-colors text-red-600">Implementation</Link>
                        <Link href="/why-bazzai" className="hover:text-red-600 transition-colors">Why BazzAI</Link>
                        <Link href="/about" className="hover:text-red-600 transition-colors">About</Link>
                        <Link href="/security" className="hover:text-red-600 transition-colors">Security</Link>
                        <Link href="/resources" className="hover:text-red-600 transition-colors">Resources</Link>
                        <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-full border-2 border-green-500 text-green-700 font-bold hover:bg-green-500 hover:text-white transition-all text-sm">
                            Chat with an Expert
                        </Link>
                        <button className="px-6 py-2.5 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-md shadow-red-100 text-sm" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            Book Assessment
                        </button>
                    </nav>

                    <button className="md:hidden text-slate-900 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden bg-white border-b border-slate-100 p-6 flex flex-col gap-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Solutions by Role</p>
                        <Link href="/solutions/for-ctos" onClick={() => setIsMenuOpen(false)} className="font-semibold text-slate-700 hover:text-red-600">🔧 For CTOs & Engineering Leaders</Link>
                        <Link href="/solutions/for-coos" onClick={() => setIsMenuOpen(false)} className="font-semibold text-slate-700 hover:text-red-600">⚙️ For COOs & Operations Leaders</Link>
                        <Link href="/solutions/for-cfos" onClick={() => setIsMenuOpen(false)} className="font-semibold text-slate-700 hover:text-red-600">📊 For CFOs & Finance Leaders</Link>
                        <div className="border-t border-slate-100" />
                        {[
                            { label: 'Pricing', href: '/pricing' },
                            { label: 'How It Works', href: '/how-it-works' },
                            { label: 'Implementation', href: '/implementation' },
                            { label: 'FAQ', href: '/faq' },
                            { label: 'Why BazzAI', href: '/why-bazzai' },
                            { label: 'About', href: '/about' },
                            { label: 'Security', href: '/security' },
                            { label: 'Resources', href: '/resources' }
                        ].map((item, i) => (
                            <Link key={i} href={item.href} onClick={() => setIsMenuOpen(false)}
                                className="font-semibold text-slate-700 capitalize">{item.label}</Link>
                        ))}
                        <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="font-bold text-green-600">💬 Chat with an Expert</Link>
                        <button onClick={(e) => { setIsMenuOpen(false); e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}
                            className="w-full py-3 rounded-xl bg-red-600 text-white font-bold text-center">
                            Book AI Opportunity Assessment
                        </button>
                    </div>
                )}
            </header>
        </>
    );
}
