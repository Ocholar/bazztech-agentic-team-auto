"use client";

import { useState, useEffect, useRef } from 'react';
import {
    MessageSquare, Check, ArrowRight, Phone, Mail, MapPin,
    TrendingUp, Clock, ClipboardList, Truck, FileText,
    CreditCard, Factory, Shield, Award, ChevronRight, X,
    Star, Package, AlertTriangle, BarChart3, Zap
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

const WHATSAPP_NUMBER = '15558219787';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const CALENDLY_URL = 'https://calendly.com/reagan-bazztech/30min';

/* ─── Pain Points ─── */
const painPoints = [
    {
        icon: <MessageSquare size={28} />,
        stat: '73%',
        headline: 'Orders Lost to WhatsApp Chaos',
        desc: 'Orders come in via WhatsApp, SMS, and phone calls — then get lost, duplicated, or mis-priced before they even reach production.',
        color: '#ff6b35',
    },
    {
        icon: <Truck size={28} />,
        stat: '2–3 days',
        headline: 'Supplier Delivery Status Unknown',
        desc: 'You call the supplier at 8am, again at noon — still no ETA. Your production line sits idle while raw materials are "on the way."',
        color: '#2c5aa0',
    },
    {
        icon: <FileText size={28} />,
        stat: 'KES 180K',
        headline: 'Invoices Lost & Mismatched',
        desc: 'Invoices go missing, delivery notes don\'t match what was ordered, and payment status lives in someone\'s email inbox.',
        color: '#2ecc71',
    },
];

/* ─── Day in the Life Timeline ─── */
const timeline = [
    {
        time: '7:00 AM',
        event: 'Production Kickoff',
        before: { label: 'Without BazzAI', text: 'Check 4 WhatsApp groups, 2 email threads, and a spreadsheet to figure out what orders to run today. 45 minutes wasted.' },
        after: { label: 'With BazzAI', text: 'Open one dashboard. All confirmed orders auto-sequenced by priority, materials verified against stock. Ready in 3 minutes.' },
    },
    {
        time: '9:30 AM',
        event: 'Supplier Delivery Due',
        before: { label: 'Without BazzAI', text: 'Call supplier. No answer. WhatsApp. Waiting. Production manager asks every 20 mins — still no answer.' },
        after: { label: 'With BazzAI', text: 'BazzAI auto-pings supplier at 7am. ETA confirmed via WhatsApp bot, logged in your system. You see it on your phone.' },
    },
    {
        time: '12:00 PM',
        event: 'Customer Order Update',
        before: { label: 'Without BazzAI', text: 'Customer calls asking "is my order ready?" You ask production. They don\'t know. You call back 30 mins later.' },
        after: { label: 'With BazzAI', text: 'Customer gets a WhatsApp update automatically when order hits dispatch. Zero calls. Zero chasing.' },
    },
    {
        time: '4:00 PM',
        event: 'KRA Invoice Filing',
        before: { label: 'Without BazzAI', text: 'Accountant manually enters 40 delivery notes into iTax. Errors. KRA audit risk. 3 hours of tedious work.' },
        after: { label: 'With BazzAI', text: 'Invoices auto-generated from confirmed orders. ETR/VAT calculated. iCloud-synced to accountant. Done in minutes.' },
    },
    {
        time: '5:30 PM',
        event: 'Payment Collection',
        before: { label: 'Without BazzAI', text: 'Chase M-Pesa confirmations. WhatsApp back statements. Mark Excel spreadsheet. Pray nothing was missed.' },
        after: { label: 'With BazzAI', text: 'M-Pesa payments auto-reconciled. Outstanding balances flagged. Ageing report ready with one tap.' },
    },
];

/* ─── Food & Bev Features ─── */
const foodBevFeatures = [
    { icon: <ClipboardList size={22} />, title: 'Order-to-Dispatch Tracking', desc: 'Every order — WhatsApp, phone, email — captured in one workflow. Production knows what to make. Dispatch knows when it\'s ready.' },
    { icon: <Shield size={22} />, title: 'KRA & KEBS Compliance', desc: 'Auto-generate iTax-ready invoices and KEBS batch records. Compliance docs filed, archived, and auditable in one click.' },
    { icon: <Truck size={22} />, title: 'Supplier Delivery Portal', desc: 'Suppliers confirm delivery via WhatsApp. You see confirmed, pending, and late deliveries at a glance — no calls needed.' },
    { icon: <CreditCard size={22} />, title: 'M-Pesa Payment Reconciliation', desc: 'Payments matched to invoices automatically. Overdue accounts flagged with WhatsApp reminders sent on your behalf.' },
    { icon: <BarChart3 size={22} />, title: 'Production Intelligence', desc: 'Which SKU generates the most margin? Which customer pays on time? Real data, not gut feel — on your phone.' },
    { icon: <Zap size={22} />, title: 'WhatsApp-First Interface', desc: 'No app download. No training. Your team uses WhatsApp. BazzAI meets them there — structured workflows via chat.' },
];

/* ─── Testimonials ─── */
const testimonials = [
    {
        initials: 'SM',
        role: 'Operations Manager',
        company: 'Nairobi Food Processing Plant',
        country: '🇰🇪',
        quote: '"We used to have 3 people chasing WhatsApp orders daily. BazzAI consolidated everything. Our order accuracy went from 71% to 98% in the first month. The ROI was immediate."',
        dark: true,
    },
    {
        initials: 'AO',
        role: 'Finance Director',
        company: 'Lagos Snack Manufacturer',
        country: '🇳🇬',
        quote: '"KRA filing used to take my accountant a full day every week. Now it takes 20 minutes. BazzAI pulls everything from the orders automatically. I don\'t know how we survived before."',
        dark: false,
    },
    {
        initials: 'FN',
        role: 'General Manager',
        company: 'Kampala Dairy Producer',
        country: '🇺🇬',
        quote: '"Supplier delivery chaos was killing us. With BazzAI\'s supplier WhatsApp portal, our on-time delivery rate jumped from 58% to 91%. Production stops dropped by 80%."',
        dark: false,
    },
    {
        initials: 'BK',
        role: 'Managing Director',
        company: 'Accra Beverage Company',
        country: '🇬🇭',
        quote: '"M-Pesa reconciliation was 4 hours every evening. BazzAI does it in real time. We found KES 320,000 in unmatched payments our old process was missing every month."',
        dark: true,
    },
    {
        initials: 'RM',
        role: 'Head of Sales',
        company: 'Mombasa Export Processor',
        country: '🇰🇪',
        quote: '"Our customers used to call constantly for order updates. Since BazzAI sends WhatsApp status updates automatically, inbound customer calls dropped 70%. My team can focus on selling."',
        dark: false,
    },
    // duplicated for marquee
    {
        initials: 'SM', role: 'Operations Manager', company: 'Nairobi Food Processing Plant', country: '🇰🇪',
        quote: '"We used to have 3 people chasing WhatsApp orders daily. BazzAI consolidated everything. Our order accuracy went from 71% to 98% in the first month."',
        dark: true,
    },
    {
        initials: 'AO', role: 'Finance Director', company: 'Lagos Snack Manufacturer', country: '🇳🇬',
        quote: '"KRA filing used to take my accountant a full day every week. Now it takes 20 minutes. BazzAI pulls everything from the orders automatically."',
        dark: false,
    },
];

/* ─── Pricing ─── */
const pricingTiers = [
    {
        name: 'SME Pilot',
        tagline: 'For manufacturers with 10–50 staff',
        priceKES: 'KES 15,000',
        priceUSD: '$110',
        period: '/month',
        pilotNote: '14-day free pilot — no credit card needed',
        cta: 'Start Free Pilot',
        featured: false,
        features: [
            'WhatsApp order capture (unlimited)',
            'Supplier delivery portal',
            'M-Pesa payment reconciliation',
            'KRA invoice generation (ETR-ready)',
            'Customer WhatsApp notifications',
            'Basic production dashboard',
            'Email & WhatsApp support',
            'Up to 3 team users',
        ],
    },
    {
        name: 'Growth',
        tagline: 'For manufacturers scaling operations',
        priceKES: 'KES 35,000',
        priceUSD: '$250',
        period: '/month',
        pilotNote: 'Includes onboarding & workflow setup',
        cta: 'Schedule Factory Call',
        featured: true,
        features: [
            'Everything in SME Pilot',
            'Multi-SKU production scheduling',
            'KEBS batch compliance records',
            'Supplier performance analytics',
            'Customer payment ageing reports',
            'Advanced margin & sales intel',
            'Priority WhatsApp support',
            'Up to 10 team users',
            'Custom workflow automation',
        ],
    },
];

export default function ManufacturingPage() {
    const [activeTimeline, setActiveTimeline] = useState(0);
    const [emailModalOpen, setEmailModalOpen] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const revealRefs = useRef<(HTMLElement | null)[]>([]);

    // Scroll-reveal
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.12 }
        );
        revealRefs.current.forEach(el => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const addReveal = (el: HTMLElement | null, index: number) => {
        revealRefs.current[index] = el;
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/leads/capture', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailValue, type: 'manufacturing_case_study', metadata: { page: 'homepage' } }),
            });
            if (res.ok) {
                setEmailSent(true);
                setTimeout(() => { setEmailModalOpen(false); setEmailSent(false); setEmailValue(''); setLoading(false); }, 3000);
            }
        } catch { setLoading(false); }
    };

    return (
        <div className="flex min-h-screen flex-col bg-white text-slate-900 overflow-x-hidden" style={{ fontFamily: 'var(--font-body)' }}>

            {/* ═══════ HEADER ═══════ */}
            <Header />

            {/* ═══════════════════════════════════════════════════════════
                HERO
            ═══════════════════════════════════════════════════════════ */}
            <section style={{ paddingTop: '5rem', background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 60%, #1a3a52 100%)' }}
                className="relative pt-20 overflow-hidden min-h-[620px] flex items-center">

                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #ff6b35 0%, transparent 50%), radial-gradient(circle at 75% 75%, #2c5aa0 0%, transparent 50%)' }} />

                {/* Factory floor silhouette */}
                <div className="absolute bottom-0 left-0 right-0 h-24 opacity-10 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, #ff6b35, transparent)' }} />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28 grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left copy */}
                    <div className="fade-up">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold mb-7"
                            style={{ borderColor: 'rgba(255,107,53,0.4)', background: 'rgba(255,107,53,0.12)', color: '#ff6b35' }}>
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#ff6b35' }} />
                            Connected Operations Platform · Made for African Manufacturers
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white"
                            style={{ fontFamily: 'var(--font-headline)', letterSpacing: '-0.01em' }}>
                            Stop Losing Orders<br />
                            <span style={{ color: '#ff6b35' }}>to WhatsApp Chaos</span>
                        </h1>

                        <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-lg"
                            style={{ color: 'rgba(255,255,255,0.75)' }}>
                            BazzAI gives food manufacturers in Kenya, Nigeria, and Uganda real-time visibility
                            from supplier delivery to customer payment — all through WhatsApp.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                className="px-8 py-4 rounded-xl font-bold text-base text-white transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
                                style={{ background: 'var(--color-action)', boxShadow: '0 8px 24px rgba(255,107,53,0.35)' }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-action-dark)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-action)')}
                                onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                                Start Free 14-Day Pilot <ArrowRight size={18} />
                            </button>
                            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                                className="px-8 py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2"
                                style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                                <MessageSquare size={18} /> Chat with a Specialist
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                            {['No app to install', 'Works on WhatsApp', 'KRA & M-Pesa ready'].map((item) => (
                                <span key={item} className="flex items-center gap-1.5">
                                    <Check size={13} style={{ color: '#2ecc71' }} /> {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right: Live ops dashboard visual */}
                    <div className="hidden lg:flex justify-center fade-up" style={{ animationDelay: '0.2s' }}>
                        <div className="float w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border"
                            style={{ background: '#0f2439', borderColor: 'rgba(255,255,255,0.08)' }}>
                            {/* Chrome */}
                            <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: '#2ecc71' }} />
                                <span className="ml-3 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>
                                    BazzAI Ops Centre · Live
                                </span>
                            </div>

                            <div className="p-5 space-y-3">
                                {/* Status row */}
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { label: 'Orders Today', value: '47', color: '#ff6b35' },
                                        { label: 'Dispatched', value: '31', color: '#2ecc71' },
                                        { label: 'Pending', value: '16', color: '#2c5aa0' },
                                    ].map((m, i) => (
                                        <div key={i} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                            <p className="text-[10px] font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{m.label}</p>
                                            <p className="text-2xl font-black" style={{ color: m.color }}>{m.value}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Live order feed */}
                                <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.25)' }}>Live Order Feed</p>
                                    {[
                                        { id: '#ORD-421', customer: 'Naivas Supermarket', status: 'Dispatched', statusColor: '#2ecc71' },
                                        { id: '#ORD-422', customer: 'Carrefour Kenya', status: 'In Production', statusColor: '#ff6b35' },
                                        { id: '#ORD-423', customer: 'QuickMart', status: 'Awaiting Material', statusColor: '#2c5aa0' },
                                    ].map((o, i) => (
                                        <div key={i} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                                            <div>
                                                <p className="text-xs font-bold text-white">{o.customer}</p>
                                                <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{o.id}</p>
                                            </div>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${o.statusColor}20`, color: o.statusColor }}>
                                                {o.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Supplier & payment pills */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                        <p className="text-[10px] mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>M-Pesa Today</p>
                                        <p className="text-sm font-black" style={{ color: '#2ecc71' }}>KES 284,500</p>
                                        <p className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>Auto-reconciled ✓</p>
                                    </div>
                                    <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                        <p className="text-[10px] mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Suppliers</p>
                                        <p className="text-sm font-black" style={{ color: '#ff6b35' }}>2 Early · 1 Late</p>
                                        <p className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>WhatsApp pinged ✓</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                TRUST BAR — local context
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-5 border-y border-slate-100" style={{ background: '#f0f4f8' }}>
                <p className="text-center text-[10px] font-black uppercase tracking-widest mb-4 px-6" style={{ color: '#2c5aa0' }}>
                    Built for the African manufacturing stack
                </p>
                <div className="overflow-hidden">
                    <div className="marquee-track">
                        {[
                            { name: 'WhatsApp Business API', emoji: '💬' },
                            { name: 'M-Pesa / Mpesa B2B', emoji: '📲' },
                            { name: 'KRA iTax', emoji: '🧾' },
                            { name: 'KEBS Compliance', emoji: '🏭' },
                            { name: 'Nairobi Retailers', emoji: '🛒' },
                            { name: 'Lagos Supply Chains', emoji: '🚛' },
                            { name: 'FIRS Nigeria', emoji: '🗂️' },
                            { name: 'Ghana GRA', emoji: '📋' },
                            { name: 'WhatsApp Business API', emoji: '💬' },
                            { name: 'M-Pesa / Mpesa B2B', emoji: '📲' },
                            { name: 'KRA iTax', emoji: '🧾' },
                            { name: 'KEBS Compliance', emoji: '🏭' },
                            { name: 'Nairobi Retailers', emoji: '🛒' },
                            { name: 'Lagos Supply Chains', emoji: '🚛' },
                        ].map((p, i) => (
                            <div key={i} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-semibold flex-shrink-0"
                                style={{ color: 'var(--color-primary)' }}>
                                <span>{p.emoji}</span> {p.name}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                STATS ROW
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-16 px-6" style={{ background: 'var(--color-primary)' }}>
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { value: '98%', label: 'Order Accuracy (avg)' },
                        { value: '20+', label: 'Hours Saved / Month' },
                        { value: '14', label: 'Day Free Pilot' },
                        { value: '3×', label: 'Faster Invoice Filing' },
                    ].map((s, i) => (
                        <div key={i}>
                            <p className="text-4xl md:text-5xl font-black text-white mb-2"
                                style={{ fontFamily: 'var(--font-headline)', color: i % 2 === 0 ? '#ff6b35' : 'white' }}>
                                {s.value}
                            </p>
                            <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                PROBLEM STATEMENT — 3 pain points
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 bg-white" ref={el => addReveal(el as HTMLElement, 0)}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 reveal" ref={el => addReveal(el as HTMLElement, 1)}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5"
                            style={{ background: 'rgba(255,107,53,0.1)', color: 'var(--color-action)', border: '1px solid rgba(255,107,53,0.25)' }}>
                            <AlertTriangle size={12} /> The Manufacturing Reality
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-primary)' }}>
                            Every Day You Operate Like This,<br />
                            <span style={{ color: 'var(--color-action)' }}>You're Leaving Money Behind</span>
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            These aren't edge cases. They're the Tuesday reality for food manufacturers across East and West Africa.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {painPoints.map((p, i) => (
                            <div key={i} className="reveal rounded-2xl p-8 border-2 hover:shadow-xl transition-all duration-300 group"
                                style={{ borderColor: 'rgba(26,58,82,0.08)', background: '#fafcff' }}
                                ref={el => addReveal(el as HTMLElement, i + 2)}>
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:-translate-y-1 duration-300"
                                    style={{ background: `${p.color}15`, color: p.color }}>
                                    {p.icon}
                                </div>
                                <p className="text-4xl font-black mb-2" style={{ fontFamily: 'var(--font-headline)', color: p.color }}>{p.stat}</p>
                                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--color-primary)' }}>{p.headline}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                DAY IN THE LIFE — Timeline
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 px-6" style={{ background: 'var(--color-bg-light)' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-5"
                            style={{ background: 'rgba(26,58,82,0.08)', color: 'var(--color-primary)' }}>
                            A Day in the Life
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-primary)' }}>
                            See What BazzAI Changes
                        </h2>
                        <p className="text-slate-500 text-lg max-w-xl mx-auto">
                            A typical factory manager's day — before and after BazzAI.
                        </p>
                    </div>

                    {/* Timeline tabs */}
                    <div className="flex gap-2 flex-wrap justify-center mb-10">
                        {timeline.map((t, i) => (
                            <button key={i}
                                onClick={() => setActiveTimeline(i)}
                                className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                                style={{
                                    background: activeTimeline === i ? 'var(--color-primary)' : 'white',
                                    color: activeTimeline === i ? 'white' : 'var(--color-text-primary)',
                                    border: `1px solid ${activeTimeline === i ? 'var(--color-primary)' : '#d1dbe6'}`,
                                }}>
                                {t.time}
                            </button>
                        ))}
                    </div>

                    {/* Active timeline card */}
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-6">
                            <span className="text-sm font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                                style={{ background: 'rgba(255,107,53,0.1)', color: 'var(--color-action)' }}>
                                {timeline[activeTimeline].time}
                            </span>
                            <h3 className="text-2xl font-black mt-3" style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-primary)' }}>
                                {timeline[activeTimeline].event}
                            </h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Before */}
                            <div className="rounded-2xl p-6 border-2" style={{ borderColor: '#fde8e8', background: '#fff8f8' }}>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: '#e74c3c' }}>✕</div>
                                    <p className="font-bold text-sm" style={{ color: '#c0392b' }}>Without BazzAI</p>
                                </div>
                                <p className="text-sm leading-relaxed" style={{ color: '#7f8c8d' }}>
                                    {timeline[activeTimeline].before.text}
                                </p>
                            </div>
                            {/* After */}
                            <div className="rounded-2xl p-6 border-2" style={{ borderColor: '#d5f5e3', background: '#f0fff6' }}>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: '#2ecc71' }}>✓</div>
                                    <p className="font-bold text-sm" style={{ color: '#27ae60' }}>With BazzAI</p>
                                </div>
                                <p className="text-sm leading-relaxed" style={{ color: '#34495e' }}>
                                    {timeline[activeTimeline].after.text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                FOOD & BEVERAGE DEEP DIVE
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5"
                            style={{ background: 'rgba(26,58,82,0.06)', color: 'var(--color-secondary)' }}>
                            <Factory size={12} /> Food &amp; Beverage Manufacturing
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-primary)' }}>
                            Built Specifically for<br />
                            <span style={{ color: 'var(--color-action)' }}>How You Actually Operate</span>
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            Not generic ERP. Not imported software designed for US factories. BazzAI is built around
                            the WhatsApp-first, M-Pesa, KRA reality of African food manufacturing.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {foodBevFeatures.map((f, i) => (
                            <div key={i}
                                className="reveal rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                                style={{ borderColor: '#e8eef4', background: '#fafcff' }}
                                ref={el => addReveal(el as HTMLElement, i + 10)}>
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                                    style={{ background: 'rgba(26,58,82,0.07)', color: 'var(--color-primary)' }}>
                                    {f.icon}
                                </div>
                                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-primary)' }}>{f.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-14 text-center">
                        <button
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
                            style={{ background: 'var(--color-action)', boxShadow: '0 8px 24px rgba(255,107,53,0.3)' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-action-dark)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-action)')}
                            onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                            Schedule a Factory Demo <ArrowRight size={18} />
                        </button>
                        <p className="text-xs mt-3" style={{ color: '#7f8c8d' }}>We'll show you the platform using your actual order workflow — 30 minutes.</p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                PRICING
            ═══════════════════════════════════════════════════════════ */}
            <section id="pricing" className="py-24 px-6" style={{ background: 'var(--color-bg-light)' }}>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-5"
                            style={{ background: 'rgba(26,58,82,0.08)', color: 'var(--color-primary)' }}>
                            Simple, Transparent Pricing
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-primary)' }}>
                            Start Free. Pay Only If It Works.
                        </h2>
                        <p className="text-slate-500 text-lg max-w-xl mx-auto">
                            14-day pilot at zero cost. If you don't see a measurable improvement, cancel without penalty.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        {pricingTiers.map((tier, i) => (
                            <div key={i}
                                className="rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl relative flex flex-col"
                                style={{
                                    borderColor: tier.featured ? 'var(--color-action)' : '#d5e3ef',
                                    background: tier.featured ? 'var(--color-primary)' : 'white',
                                }}>
                                {tier.featured && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black text-white"
                                        style={{ background: 'var(--color-action)' }}>
                                        Most Popular
                                    </div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-xl font-black mb-1"
                                        style={{ color: tier.featured ? 'white' : 'var(--color-primary)', fontFamily: 'var(--font-headline)' }}>
                                        {tier.name}
                                    </h3>
                                    <p className="text-sm mb-4" style={{ color: tier.featured ? 'rgba(255,255,255,0.6)' : '#7f8c8d' }}>
                                        {tier.tagline}
                                    </p>
                                    <div className="flex items-baseline gap-3 flex-wrap">
                                        <span className="text-4xl font-black" style={{ color: tier.featured ? 'white' : 'var(--color-primary)', fontFamily: 'var(--font-headline)' }}>
                                            {tier.priceKES}
                                        </span>
                                        <span className="text-lg font-bold" style={{ color: tier.featured ? 'rgba(255,255,255,0.7)' : 'var(--color-secondary)' }}>
                                            / {tier.priceUSD}
                                        </span>
                                        <span className="text-sm" style={{ color: tier.featured ? 'rgba(255,255,255,0.5)' : '#7f8c8d' }}>
                                            {tier.period}
                                        </span>
                                    </div>
                                    <p className="text-xs mt-2 font-semibold" style={{ color: tier.featured ? '#ff6b35' : '#2ecc71' }}>
                                        ✓ {tier.pilotNote}
                                    </p>
                                </div>

                                <ul className="space-y-3 mb-8 flex-grow">
                                    {tier.features.map((f, j) => (
                                        <li key={j} className="flex items-start gap-2.5 text-sm">
                                            <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#2ecc71' }} />
                                            <span style={{ color: tier.featured ? 'rgba(255,255,255,0.8)' : 'var(--color-text-primary)' }}>{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className="w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
                                    style={{
                                        background: tier.featured ? 'var(--color-action)' : 'var(--color-primary)',
                                        color: 'white',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                                    onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                                    {tier.cta} <ArrowRight size={14} className="inline ml-1" />
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                TESTIMONIALS — manufacturing only
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white border-t border-slate-100 pb-32">
                <div className="max-w-7xl mx-auto px-6 mb-16">
                    <div className="text-center">
                        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-5"
                            style={{ background: 'rgba(255,184,0,0.1)', color: '#c27d00', border: '1px solid rgba(255,184,0,0.3)' }}>
                            From the Factory Floor
                        </div>
                        <h2 className="text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-primary)' }}>
                            Manufacturers Across Africa Trust BazzAI
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            Real results from real factories — not generic tech testimonials.
                        </p>
                    </div>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <div className="marquee-track px-4 py-6">
                        {testimonials.map((t, i) => (
                            <div key={i}
                                className="w-[340px] md:w-[440px] flex-shrink-0 whitespace-normal p-7 rounded-2xl flex flex-col border"
                                style={{
                                    background: t.dark ? 'var(--color-primary)' : '#fafcff',
                                    borderColor: t.dark ? 'rgba(255,107,53,0.3)' : '#e8eef4',
                                }}>
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} fill="currentColor" className="w-4 h-4" style={{ color: '#f39c12' }} />
                                    ))}
                                    <span className="ml-2 text-lg">{t.country}</span>
                                </div>
                                <p className="text-sm leading-relaxed mb-6 flex-grow"
                                    style={{ color: t.dark ? 'rgba(255,255,255,0.8)' : 'var(--color-text-primary)' }}>
                                    {t.quote}
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white flex-shrink-0"
                                        style={{ background: t.dark ? 'var(--color-action)' : 'var(--color-secondary)' }}>
                                        {t.initials}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold" style={{ color: t.dark ? 'white' : 'var(--color-primary)' }}>{t.role}</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest"
                                            style={{ color: t.dark ? 'rgba(255,107,53,0.8)' : 'var(--color-secondary)' }}>
                                            {t.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                FINAL CTA
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}>
                <div className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #ff6b35, transparent 60%)' }} />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-5"
                        style={{ fontFamily: 'var(--font-headline)' }}>
                        14 Days to See the Difference.<br />
                        <span style={{ color: '#ff6b35' }}>Zero Risk.</span>
                    </h2>
                    <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Start your free pilot today. We'll configure BazzAI around your actual workflow — orders, suppliers, invoices, payments.
                        No commitment. No setup fee. Cancel anytime.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="px-10 py-4 rounded-xl font-black text-lg text-white transition-all hover:scale-105 shadow-2xl flex items-center gap-2 justify-center"
                            style={{ background: 'var(--color-action)', boxShadow: '0 8px 32px rgba(255,107,53,0.4)' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-action-dark)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-action)')}
                            onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                            Start My Free 14-Day Pilot <ArrowRight size={20} />
                        </button>
                        <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="px-10 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 justify-center"
                            style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                            <MessageSquare size={20} /> Chat with a Specialist
                        </Link>
                    </div>
                    <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        Serving manufacturers in Kenya · Nigeria · Uganda · Ghana · Tanzania
                    </p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                FOOTER
            ═══════════════════════════════════════════════════════════ */}
            <Footer />

            {/* ─── STICKY MOBILE CTA ─── */}
            <div className="sticky-mobile-cta slide-up border-t border-slate-200 bg-white shadow-2xl">
                <div className="flex gap-2 p-3">
                    <button
                        className="flex-1 py-3 rounded-xl text-white font-black text-xs text-center flex items-center justify-center gap-1"
                        style={{ background: 'var(--color-action)' }}
                        onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                        🚀 Start Free Pilot
                    </button>
                    <button
                        onClick={() => setEmailModalOpen(true)}
                        className="flex-1 py-3 rounded-xl text-white font-black text-xs flex items-center justify-center gap-1"
                        style={{ background: 'var(--color-primary)' }}>
                        📩 Get Case Study
                    </button>
                </div>
            </div>

            {/* ─── EMAIL MODAL ─── */}
            {emailModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-[999] flex items-end sm:items-center justify-center p-4"
                    onClick={() => setEmailModalOpen(false)}>
                    <div className="relative bg-white rounded-2xl p-7 w-full max-w-sm shadow-2xl"
                        onClick={e => e.stopPropagation()}>
                        <button onClick={() => setEmailModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
                            <X size={18} />
                        </button>
                        {emailSent ? (
                            <div className="text-center py-4">
                                <p className="text-4xl mb-3">🎉</p>
                                <p className="font-black text-lg">On its way!</p>
                                <p className="text-slate-500 text-sm mt-2">Check your inbox in a few minutes.</p>
                            </div>
                        ) : (
                            <>
                                <p className="font-black text-xl mb-1" style={{ color: 'var(--color-primary)' }}>Get the Case Study</p>
                                <p className="text-slate-500 text-sm mb-5">We'll email you our Food Manufacturing Operations case study with full ROI metrics.</p>
                                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
                                    <input
                                        type="email" required placeholder="your@factory.com"
                                        value={emailValue} onChange={e => setEmailValue(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none text-sm"
                                        style={{ borderColor: '#d5e3ef' }}
                                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-action)')}
                                        onBlur={e => (e.currentTarget.style.borderColor = '#d5e3ef')}
                                    />
                                    <button type="submit"
                                        className="w-full py-3 rounded-xl text-white font-black text-sm transition-all"
                                        style={{ background: 'var(--color-action)' }}
                                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-action-dark)')}
                                        onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-action)')}>
                                        {loading ? 'Sending...' : 'Send Me the Case Study →'}
                                    </button>
                                </form>
                                <p className="text-[10px] text-slate-400 text-center mt-3">No spam. One email, one case study.</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
