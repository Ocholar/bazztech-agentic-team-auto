import Link from 'next/link';
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react';

const WHATSAPP_NUMBER = '15558219787';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white py-20 px-6 border-t border-white/5 w-full">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
                <div className="col-span-1 border-b border-white/10 pb-10 md:border-0 md:pb-0">
                    <div className="text-3xl font-black tracking-tight mb-4">
                        Bazz<span className="text-red-500">AI</span>
                    </div>
                    <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                        Bazztech Networks helps businesses replace manual, repetitive work with intelligent AI workflows. Based in Nairobi. Serving the world.
                    </p>
                    <form className="flex flex-col gap-2 relative">
                        <label className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2 block">Enterprise AI Newsletter</label>
                        <input type="email" placeholder="CTO@company.com" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-red-500 focus:outline-none text-sm mb-3" />
                        <button className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm transition-colors">Subscribe</button>
                    </form>
                </div>

                <div>
                    <h5 className="text-red-500 font-black text-xs uppercase tracking-widest mb-6">Solutions</h5>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        <li><Link href="/solutions/for-coos" className="hover:text-white transition-colors">For COOs</Link></li>
                        <li><Link href="/solutions/for-ctos" className="hover:text-white transition-colors">For CTOs</Link></li>
                        <li><Link href="/solutions/for-cfos" className="hover:text-white transition-colors">For CFOs</Link></li>
                        <li><Link href="/#products" className="hover:text-white transition-colors">Bazz-Connect &amp; CRM</Link></li>
                        <li><Link href="/#products" className="hover:text-white transition-colors">Bazz-Flow Integrations</Link></li>
                    </ul>
                </div>

                <div>
                    <h5 className="text-red-500 font-black text-xs uppercase tracking-widest mb-6">Company</h5>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                        <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
                        <li><Link href="/pricing" className="hover:text-white transition-colors">SaaS Pricing & Modules</Link></li>
                        <li><Link href="/pricing" className="hover:text-white transition-colors">Enterprise Solutions</Link></li>
                        <li><Link href="/security" className="hover:text-white transition-colors">Security & Compliance</Link></li>
                    </ul>
                </div>

                <div>
                    <h5 className="text-red-500 font-black text-xs uppercase tracking-widest mb-6">Contact & Socials</h5>
                    <ul className="space-y-4 text-slate-400 text-sm mb-8">
                        <li className="flex items-center gap-3">
                            <Phone size={15} className="text-red-500" />
                            <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-white transition-colors">+254 781 751 937</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={15} className="text-red-500" /> info@bazztech.co.ke
                        </li>
                        <li className="flex items-center gap-3">
                            <MapPin size={15} className="text-red-500" /> Nairobi, Kenya
                        </li>
                    </ul>
                    <div className="flex items-center gap-4">
                        <a href="https://www.linkedin.com/company/bazztech-networks/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-all"><Linkedin size={18} /></a>
                        <a href="https://www.facebook.com/bazztechnetworks" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-all"><Facebook size={18} /></a>
                        <a href="https://www.instagram.com/bazztechnetworks/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-all"><Instagram size={18} /></a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
                <p>© 2026 Bazztech Networks. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
