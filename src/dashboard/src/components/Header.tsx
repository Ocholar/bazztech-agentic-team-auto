"use client";

import { useState } from 'react';
import { Cpu, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_URL = 'https://wa.me/15558219787';

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
          background: #1A1F2E;
          border: 1px solid #2D3748;
          border-radius: 16px;
          padding: 8px;
          min-width: 240px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          z-index: 100;
        }
        .nav-dropdown:hover .nav-dropdown-menu { display: block; }
        .nav-dropdown-menu a {
          display: block;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          color: #A0AEC0;
          transition: background 0.15s;
          text-decoration: none;
        }
        .nav-dropdown-menu a:hover {
          background: rgba(255,255,255,0.05);
          color: #F4F1DE;
        }
      `}</style>

            <header className="fixed top-0 w-full z-50 backdrop-blur-md border-b"
                style={{ background: 'rgba(15,20,25,0.92)', borderColor: '#2D3748' }}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}>
                            <Cpu size={18} className="text-white" />
                        </div>
                        <div>
                            <span className="text-xl font-black tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F4F1DE' }}>
                                Bazz<span style={{ color: '#E07A5F' }}>AI</span>
                            </span>
                            <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#3D405B', marginTop: -2 }}>
                                AI Manufacturing Intelligence
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
                        {navLinks.map((l) => (
                            <Link key={l.href} href={l.href}
                                className="transition-colors"
                                style={{ color: '#A0AEC0' }}
                                onMouseEnter={e => (e.currentTarget.style.color = '#F4F1DE')}
                                onMouseLeave={e => (e.currentTarget.style.color = '#A0AEC0')}>
                                {l.label}
                            </Link>
                        ))}

                        <Link href="/register"
                            className="px-5 py-2.5 rounded-full text-white font-bold transition-all shadow-lg text-sm hover:scale-105 active:scale-95"
                            style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}>
                            Start Free Pilot
                        </Link>
                    </nav>

                    {/* Mobile hamburger */}
                    <button className="md:hidden p-2" style={{ color: '#A0AEC0' }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t p-6 flex flex-col gap-4"
                        style={{ background: '#0F1419', borderColor: '#2D3748' }}>
                        {navLinks.map((l) => (
                            <Link key={l.href} href={l.href} onClick={() => setIsMenuOpen(false)}
                                className="font-semibold" style={{ color: '#A0AEC0' }}>
                                {l.label}
                            </Link>
                        ))}
                        <Link href="/register" onClick={() => setIsMenuOpen(false)}
                            className="w-full mt-4 py-3 rounded-xl font-bold text-white transition-transform active:scale-95 text-center block"
                            style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}>
                            Start Free Pilot
                        </Link>
                    </div>
                )}
            </header>
        </>
    );
}
