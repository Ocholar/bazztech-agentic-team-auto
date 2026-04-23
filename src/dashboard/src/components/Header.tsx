"use client";

import { useState } from 'react';
import { Factory, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_NUMBER = '15558219787';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const navLinks = [
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'About', href: '/about' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <style>{`
                .nav-dropdown { position: relative; }
                .nav-dropdown-menu {
                    display: none;
                    position: absolute;
                    top: calc(100% + 8px);
                    left: -24px;
                    background: white;
                    border: 1px solid #e8eef4;
                    border-radius: 16px;
                    padding: 8px;
                    min-width: 260px;
                    box-shadow: 0 20px 40px rgba(26,58,82,0.12);
                    z-index: 100;
                }
                .nav-dropdown:hover .nav-dropdown-menu { display: block; }
                .nav-dropdown-menu a {
                    display: block;
                    padding: 10px 14px;
                    border-radius: 10px;
                    font-size: 13px;
                    font-weight: 600;
                    color: #34495e;
                    transition: background 0.15s;
                    text-decoration: none;
                }
                .nav-dropdown-menu a:hover {
                    background: #f0f4f8;
                    color: #1a3a52;
                }
            `}</style>

            <header className="fixed top-0 w-full z-50 bg-white/96 backdrop-blur-sm border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                            style={{ background: 'var(--color-primary)' }}>
                            <Factory size={20} />
                        </div>
                        <span className="text-2xl font-black tracking-tight" style={{ fontFamily: 'var(--font-headline)' }}>
                            Bazz<span style={{ color: 'var(--color-action)' }}>AI</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
                        {/* Industries dropdown */}
                        <div className="nav-dropdown">
                            <button className="flex items-center gap-1 hover:text-[--color-primary] transition-colors" style={{ color: '#34495e' }}>
                                Industries <ChevronDown size={14} />
                            </button>
                            <div className="nav-dropdown-menu">
                                <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Manufacturing</div>
                                <a href="/industries/food-and-beverage">🥩 Food & Beverage</a>
                                <a href="/industries/fmcg-distribution">📦 FMCG & Packaging</a>
                                <a href="/industries/agro-processing">🌾 Agro-Processing</a>
                            </div>
                        </div>

                        {navLinks.map((l) => (
                            <Link key={l.href} href={l.href}
                                className="hover:transition-colors"
                                style={{ color: '#34495e' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                                onMouseLeave={e => (e.currentTarget.style.color = '#34495e')}>
                                {l.label}
                            </Link>
                        ))}

                        {/* Secondary CTA — WhatsApp */}
                        <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-full border-2 border-green-500 text-green-700 font-bold hover:bg-green-500 hover:text-white transition-all text-sm">
                            💬 WhatsApp Us
                        </Link>

                        {/* Primary CTA */}
                        <button
                            className="px-6 py-2.5 rounded-full text-white font-bold transition-all shadow-md text-sm hover:scale-105 active:scale-95"
                            style={{ background: 'var(--color-action)' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-action-dark)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-action)')}
                            onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                            Start 14-Day Pilot
                        </button>
                    </nav>

                    {/* Mobile hamburger */}
                    <button className="md:hidden p-2" style={{ color: 'var(--color-primary)' }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-b border-slate-100 p-6 flex flex-col gap-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Industries</p>
                        <Link href="/industries/food-and-beverage" onClick={() => setIsMenuOpen(false)}
                            className="font-semibold" style={{ color: '#34495e' }}>🥩 Food & Beverage</Link>
                        <Link href="/industries/fmcg-distribution" onClick={() => setIsMenuOpen(false)}
                            className="font-semibold" style={{ color: '#34495e' }}>📦 FMCG & Packaging</Link>
                        <Link href="/industries/agro-processing" onClick={() => setIsMenuOpen(false)}
                            className="font-semibold" style={{ color: '#34495e' }}>🌾 Agro-Processing</Link>

                        <div className="border-t border-slate-100" />

                        {navLinks.map((l) => (
                            <Link key={l.href} href={l.href} onClick={() => setIsMenuOpen(false)}
                                className="font-semibold" style={{ color: '#34495e' }}>
                                {l.label}
                            </Link>
                        ))}

                        <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="font-bold text-green-600">💬 Chat on WhatsApp</Link>

                        <button
                            onClick={() => { setIsMenuOpen(false); window.dispatchEvent(new Event('openBookingModal')); }}
                            className="w-full py-3 rounded-xl text-white font-bold text-center transition-all"
                            style={{ background: 'var(--color-action)' }}>
                            Start 14-Day Pilot
                        </button>
                    </div>
                )}
            </header>
        </>
    );
}
