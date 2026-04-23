"use client";
import Link from 'next/link';
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react';

const WHATSAPP_NUMBER = '15558219787';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function Footer() {
    return (
        <footer className="text-white py-20 px-6 border-t w-full"
            style={{ background: 'var(--color-primary)', borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">

                {/* Brand */}
                <div className="col-span-1 border-b pb-10 md:border-0 md:pb-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div className="text-3xl font-black tracking-tight mb-4" style={{ fontFamily: 'var(--font-headline)' }}>
                        Bazz<span style={{ color: 'var(--color-action)' }}>AI</span>
                    </div>
                    <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        Connected Operations Platform for African Manufacturers. Real-time visibility from
                        supplier delivery to customer payment — all via WhatsApp.
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--color-action)' }}>
                        Manufacturing Ops Newsletter
                    </p>
                    <form className="flex flex-col gap-2">
                        <input type="email" placeholder="ops@yourfactory.com"
                            className="w-full px-4 py-3 rounded-lg text-white placeholder:text-slate-500 focus:outline-none text-sm"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                            onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-action)')}
                            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                        <button className="w-full px-4 py-3 font-bold rounded-lg text-sm text-white transition-colors"
                            style={{ background: 'var(--color-action)' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-action-dark)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-action)')}>
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Platform */}
                <div>
                    <h5 className="font-black text-xs uppercase tracking-widest mb-6"
                        style={{ color: 'var(--color-action)' }}>Platform</h5>
                    <ul className="space-y-4 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                        <li><Link href="/solutions/food-beverage" className="hover:text-white transition-colors">Food &amp; Beverage</Link></li>
                        <li><Link href="/solutions/fmcg" className="hover:text-white transition-colors">FMCG &amp; Packaging</Link></li>
                        <li><Link href="/solutions/agro-processing" className="hover:text-white transition-colors">Agro-Processing</Link></li>
                        <li><Link href="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
                        <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h5 className="font-black text-xs uppercase tracking-widest mb-6"
                        style={{ color: 'var(--color-action)' }}>Company</h5>
                    <ul className="space-y-4 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
                        <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                        <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                        <li><Link href="/security" className="hover:text-white transition-colors">Security &amp; Compliance</Link></li>
                        <li><Link href="/why-bazzai" className="hover:text-white transition-colors">Why BazzAI</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h5 className="font-black text-xs uppercase tracking-widest mb-6"
                        style={{ color: 'var(--color-action)' }}>Contact &amp; Socials</h5>
                    <ul className="space-y-4 text-sm mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        <li className="flex items-center gap-3">
                            <Phone size={15} style={{ color: 'var(--color-action)' }} />
                            <a href="tel:+254781751937" className="hover:text-white transition-colors">+254 781 751 937</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={15} style={{ color: 'var(--color-action)' }} />
                            <a href="mailto:info@bazztech.co.ke" className="hover:text-white transition-colors">info@bazztech.co.ke</a>
                        </li>
                        <li className="flex items-start gap-3">
                            <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-action)' }} />
                            <span>Nairobi, Kenya · Serving East &amp; West Africa</span>
                        </li>
                    </ul>
                    <div className="flex items-center gap-3">
                        {[
                            { href: 'https://www.linkedin.com/company/bazztech-networks/', icon: <Linkedin size={16} />, label: 'LinkedIn' },
                            { href: 'https://www.facebook.com/bazztechnetworks', icon: <Facebook size={16} />, label: 'Facebook' },
                            { href: 'https://www.instagram.com/bazztechnetworks/', icon: <Instagram size={16} />, label: 'Instagram' },
                        ].map((s) => (
                            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                aria-label={s.label}
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,107,53,0.2)'; (e.currentTarget as HTMLElement).style.color = '#ff6b35'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}>
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
                style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}>
                <p>© 2026 Bazztech Networks. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
