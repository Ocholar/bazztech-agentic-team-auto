"use client";
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
    ArrowRight, MessageSquare, Truck, FileText, CreditCard,
    BarChart3, Check, ChevronDown, Clock, Factory, Shield,
    Zap, Phone, Layers
} from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_URL = 'https://wa.me/15558219787';

/* ─── 4-phase onboarding ─── */
const phases = [
    {
        phase: 'Phase 1',
        title: 'Factory Workflow Audit',
        duration: 'Week 1 — Free',
        icon: <Layers size={22} />,
        color: '#ff6b35',
        points: [
            'We map your current order-to-cash flow via WhatsApp interview (30 min).',
            'Identify your top 3 operational bottlenecks — orders, suppliers, invoicing.',
            'Quantify time + money lost per month on each bottleneck.',
            'Deliver a custom BazzAI configuration blueprint for your factory.',
        ],
    },
    {
        phase: 'Phase 2',
        title: 'WhatsApp & System Setup',
        duration: 'Days 2–5',
        icon: <MessageSquare size={22} />,
        color: '#2c5aa0',
        points: [
            'Connect your WhatsApp Business number to BazzAI in under 2 hours.',
            'Configure order capture workflows, supplier portal, and payment reconciliation.',
            'Import your existing customer and supplier contacts.',
            'Train your team on the dashboard — no prior software experience needed.',
        ],
    },
    {
        phase: 'Phase 3',
        title: 'Pilot Run — First 14 Days',
        duration: 'Days 6–20 — Free',
        icon: <Factory size={22} />,
        color: '#2ecc71',
        points: [
            'BazzAI runs live alongside your normal operations.',
            'Real orders, real suppliers, real payments — all tracked automatically.',
            'Your team gets WhatsApp alerts for every status change — no chasing.',
            'M-Pesa payments auto-reconciled. KRA invoices auto-generated.',
        ],
    },
    {
        phase: 'Phase 4',
        title: 'Full Production + ROI Review',
        duration: 'Day 21 Onwards',
        icon: <BarChart3 size={22} />,
        color: '#1a3a52',
        points: [
            'We run a joint ROI review — hours saved, orders recovered, invoices filed.',
            'If it\'s working: subscribe at KES 15,000/mo and keep going.',
            'If it\'s not: cancel, no questions asked, no invoice.',
            'Most factories see positive ROI within the first 14 days.',
        ],
    },
];

/* ─── How each module works ─── */
const modules = [
    {
        icon: <MessageSquare size={24} />,
        title: 'Order Capture via WhatsApp',
        how: 'Customer sends an order via WhatsApp. BazzAI reads it, extracts product, quantity, and delivery details, logs it in the system, and returns a confirmation to the customer — automatically.',
        result: 'Zero lost orders. Instant confirmation. No manual data entry.',
        color: '#ff6b35',
    },
    {
        icon: <Truck size={24} />,
        title: 'Supplier Delivery Tracking',
        how: 'BazzAI pings your suppliers via WhatsApp every morning for delivery ETAs. Responses are parsed and logged. Late deliveries trigger alerts to your production manager.',
        result: 'No more call-and-wait. Supplier status at a glance all day.',
        color: '#2c5aa0',
    },
    {
        icon: <FileText size={24} />,
        title: 'KRA Invoice Generation',
        how: 'When an order is dispatched, BazzAI auto-generates an ETR-compliant invoice with correct VAT, customer details, and item breakdown — ready to send to the customer and file with KRA.',
        result: '3× faster invoicing. Zero manual iTax data entry.',
        color: '#8b5cf6',
    },
    {
        icon: <CreditCard size={24} />,
        title: 'M-Pesa Payment Reconciliation',
        how: 'BazzAI reads incoming M-Pesa notifications and matches them to open invoices in real time. Unmatched payments are flagged. Overdue accounts trigger automated WhatsApp payment reminders.',
        result: 'Zero lost payments. End-of-day reconciliation in minutes not hours.',
        color: '#2ecc71',
    },
    {
        icon: <BarChart3 size={24} />,
        title: 'Production Intelligence Dashboard',
        how: 'All data — orders, deliveries, invoices, payments — flows into a single dashboard. View today\'s order queue, supplier status, cash collected, and outstanding debt in one screen.',
        result: 'From 4 WhatsApp groups and a spreadsheet to one real-time screen.',
        color: '#f39c12',
    },
    {
        icon: <Shield size={24} />,
        title: 'KEBS Batch & Compliance Records',
        how: 'For regulated food products, BazzAI maintains batch records linking each production run to its raw material lot, production date, and dispatch destination — audit-ready at any time.',
        result: 'KEBS compliance without a dedicated QA administrator.',
        color: '#1a3a52',
    },
];

/* ─── FAQ ─── */
const faqs = [
    {
        q: 'Do we need to change how we work or install any software?',
        a: 'No. Your team keeps using WhatsApp exactly as they do now — BazzAI structures the conversations in the background. No app download, no training on new software, no disruption to existing workflows.',
    },
    {
        q: 'How do we connect our WhatsApp number?',
        a: 'We use the official WhatsApp Business API. The connection takes under 2 hours and requires your existing WhatsApp Business number or we can provision a new one. Your customers see the same number they always contacted.',
    },
    {
        q: 'Does BazzAI work with our existing suppliers and customers?',
        a: 'Yes. BazzAI works with whoever contacts you on WhatsApp. Existing suppliers don\'t need to change anything — they just respond to a BazzAI-structured message instead of an informal one.',
    },
    {
        q: 'What if we already use QuickBooks or another accounting system?',
        a: 'BazzAI can export invoices and payment data in standard CSV/JSON formats compatible with QuickBooks, Sage, and most other accounting platforms. We can also build a direct API integration on request.',
    },
    {
        q: 'What happens to our data?',
        a: 'All your operational data is stored in an isolated, encrypted database dedicated to your account. We do not share data between clients and we sign a Data Processing Agreement at onboarding. For Kenya-based manufacturers, data can be stored on servers in the AWS Africa (Cape Town) region.',
    },
    {
        q: 'We operate in Nigeria/Uganda/Ghana — does BazzAI work there?',
        a: 'Yes. BazzAI supports multiple currencies and integrates with local payment infrastructure including FIRS (Nigeria) and GRA (Ghana) for VAT compliance. WhatsApp works across all African markets.',
    },
];

export default function HowItWorksPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'var(--font-body)' }}>
            <Header />

            {/* ─── HERO ─── */}
            <section style={{ paddingTop: '5rem', background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}
                className="relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 80% 50%, #ff6b35, transparent 60%)' }} />
                <div className="max-w-5xl mx-auto px-6 py-24 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold mb-7"
                        style={{ borderColor: 'rgba(255,107,53,0.4)', background: 'rgba(255,107,53,0.12)', color: '#ff6b35' }}>
                        <Clock size={12} /> Live in 14 Days. Zero Disruption.
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
                        style={{ fontFamily: 'var(--font-headline)' }}>
                        How BazzAI Works<br />
                        <span style={{ color: '#ff6b35' }}>For Your Factory</span>
                    </h1>
                    <p className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        BazzAI plugs into how your team already works — WhatsApp — and gives you order tracking,
                        supplier management, KRA invoicing, and M-Pesa reconciliation on autopilot.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="px-8 py-4 rounded-xl font-bold text-white flex items-center gap-2 justify-center transition-all hover:scale-105"
                            style={{ background: 'var(--color-action)' }}
                            onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                            Book a Free Factory Demo <ArrowRight size={18} />
                        </button>
                        <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="px-8 py-4 rounded-xl font-bold flex items-center gap-2 justify-center transition-all"
                            style={{ border: '2px solid rgba(255,255,255,0.25)', color: 'white' }}>
                            <MessageSquare size={18} /> Chat on WhatsApp
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── ONBOARDING PHASES ─── */}
            <section className="py-24 px-6" style={{ background: 'var(--color-bg-light)' }}>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-5"
                            style={{ background: 'rgba(26,58,82,0.08)', color: 'var(--color-primary)' }}>
                            Your Onboarding Journey
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4"
                            style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-primary)' }}>
                            From WhatsApp Chaos to<br />
                            <span style={{ color: 'var(--color-action)' }}>Connected Operations in 20 Days</span>
                        </h2>
                        <p className="text-slate-500 text-lg max-w-xl mx-auto">
                            No long contracts. No upfront fees. Start with a free audit and pilot.
                        </p>
                    </div>

                    {/* Vertical timeline */}
                    <div className="relative">
                        <div className="hidden md:block absolute left-8 top-10 bottom-10 w-0.5"
                            style={{ background: 'linear-gradient(to bottom, var(--color-action), var(--color-primary))' }} />

                        <div className="space-y-10">
                            {phases.map((p, i) => (
                                <div key={i} className="flex gap-8 items-start relative z-10">
                                    {/* Icon bubble */}
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-lg"
                                        style={{ background: p.color }}>
                                        {p.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 bg-white rounded-2xl p-7 border shadow-sm hover:shadow-md transition-all"
                                        style={{ borderColor: '#e8eef4' }}>
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
                                                style={{ background: `${p.color}15`, color: p.color }}>
                                                {p.phase}
                                            </span>
                                            <h3 className="text-lg font-black" style={{ color: 'var(--color-primary)' }}>
                                                {p.title}
                                            </h3>
                                            <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-500">
                                                {p.duration}
                                            </span>
                                        </div>
                                        <ul className="space-y-2.5">
                                            {p.points.map((pt, j) => (
                                                <li key={j} className="flex items-start gap-2.5 text-sm"
                                                    style={{ color: 'var(--color-text-primary)' }}>
                                                    <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#2ecc71' }} />
                                                    {pt}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── MODULE DEEP DIVE ─── */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-5"
                            style={{ background: 'rgba(255,107,53,0.1)', color: 'var(--color-action)', border: '1px solid rgba(255,107,53,0.25)' }}>
                            Under the Hood
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4"
                            style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-primary)' }}>
                            What Each Module Does
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            Six interconnected workflows that turn your factory from reactive to proactive.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {modules.map((m, i) => (
                            <div key={i} className="rounded-2xl p-7 border-2 hover:shadow-lg transition-all group"
                                style={{ borderColor: '#e8eef4', background: '#fafcff' }}>
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white"
                                    style={{ background: m.color }}>
                                    {m.icon}
                                </div>
                                <h3 className="text-base font-black mb-3" style={{ color: 'var(--color-primary)' }}>{m.title}</h3>
                                <p className="text-sm leading-relaxed mb-4" style={{ color: '#7f8c8d' }}>{m.how}</p>
                                <div className="pt-3 border-t" style={{ borderColor: '#e8eef4' }}>
                                    <p className="text-xs font-bold" style={{ color: '#2ecc71' }}>✓ {m.result}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── INTEGRATION LOGOS ─── */}
            <section className="py-16 px-6 border-y" style={{ background: 'var(--color-primary)', borderColor: 'rgba(255,255,255,0.06)' }}>
                <p className="text-center text-[10px] font-black uppercase tracking-widest mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Connects to your existing stack
                </p>
                <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
                    {[
                        { name: 'WhatsApp Business', emoji: '💬' },
                        { name: 'M-Pesa / Mpesa B2B', emoji: '📲' },
                        { name: 'KRA iTax', emoji: '🧾' },
                        { name: 'KEBS', emoji: '🏭' },
                        { name: 'QuickBooks', emoji: '📊' },
                        { name: 'Google Sheets', emoji: '📋' },
                        { name: 'Safaricom Daraja', emoji: '🔗' },
                        { name: 'FIRS Nigeria', emoji: '🗂️' },
                    ].map((p, i) => (
                        <div key={i} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)' }}>
                            <span>{p.emoji}</span> {p.name}
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black mb-4"
                            style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-primary)' }}>
                            Frequently Asked Questions
                        </h2>
                        <p className="text-slate-500">Every question a factory manager asks before starting.</p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="rounded-2xl overflow-hidden border" style={{ borderColor: '#e8eef4', background: '#fafcff' }}>
                                <button
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    <span className="font-bold pr-8" style={{ color: 'var(--color-primary)' }}>{faq.q}</span>
                                    <ChevronDown size={18} className="flex-shrink-0 transition-transform duration-300"
                                        style={{
                                            color: 'var(--color-action)',
                                            transform: openFaq === i ? 'rotate(180deg)' : 'none'
                                        }} />
                                </button>
                                <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-sm leading-relaxed border-t pt-5" style={{ color: '#7f8c8d', borderColor: '#e8eef4' }}>
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section className="py-24 px-6" style={{ background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}>
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-5"
                        style={{ fontFamily: 'var(--font-headline)' }}>
                        Ready to See It on<br />
                        <span style={{ color: '#ff6b35' }}>Your Factory Floor?</span>
                    </h2>
                    <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Book a 30-minute factory demo. We use your actual workflow — no generic slides.
                    </p>
                    <button
                        className="px-10 py-4 rounded-xl font-black text-lg text-white transition-all hover:scale-105 shadow-2xl flex items-center gap-2 mx-auto"
                        style={{ background: 'var(--color-action)', boxShadow: '0 8px 32px rgba(255,107,53,0.4)' }}
                        onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                        Book Factory Demo <ArrowRight size={20} />
                    </button>
                    <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        No commitment. No sales pitch. Just 30 minutes with a real workflow.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
