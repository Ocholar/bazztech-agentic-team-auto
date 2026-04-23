"use client";
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Factory, Truck, ArrowRight, Check, Star, MessageSquare, BarChart3, TrendingUp, Award } from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_URL = 'https://wa.me/15558219787';

/* ─── Case Studies ─── */
const studies = [
    {
        country: '🇰🇪',
        industry: 'Food & Beverage',
        client: 'Nairobi Food Processing Plant',
        subtitle: '42 employees · Production of 8 SKUs daily',
        title: 'From WhatsApp Chaos to 98% Order Accuracy in 30 Days',
        challenge: 'The company was managing 40+ daily orders across 3 WhatsApp groups, an Excel spreadsheet, and verbal instructions on the factory floor. Orders were duplicated, mis-priced, and frequently lost. The operations manager was spending 3+ hours daily just chasing order status.',
        solution: 'BazzAI centralized all order intake through a structured WhatsApp workflow. Suppliers were connected to an automated delivery confirmation portal. M-Pesa payments were auto-reconciled against invoices in real time.',
        results: [
            { metric: '98%', label: 'Order Accuracy (up from 71%)' },
            { metric: '3hrs', label: 'Saved Daily (ops manager)' },
            { metric: '18 days', label: 'Payback Period' },
            { metric: 'KES 0', label: 'Setup Cost (free pilot)' },
        ],
        quote: '"We used to have 3 people chasing WhatsApp orders daily. BazzAI consolidated everything. Our order accuracy went from 71% to 98% in the first month. The ROI was immediate."',
        role: 'Operations Manager',
        tags: ['WhatsApp Orders', 'M-Pesa Reconciliation', 'KRA Invoicing', 'Supplier Portal'],
        featured: true,
    },
    {
        country: '🇳🇬',
        industry: 'Snack Manufacturing',
        client: 'Lagos Snack Producer',
        subtitle: '28 employees · 5 SKUs supplied to major retailers',
        title: 'KRA-Equivalent Invoice Automation Saves 6hrs/Week',
        challenge: 'The finance team was manually entering invoice data into their tax system every week — a process that took a full day, was error-prone, and created audit risk. Delivery notes often didn\'t match what was ordered.',
        solution: 'BazzAI automatically generates compliant invoices when orders are dispatched. All delivery note mismatches are flagged before dispatch. FIRS-compliant VAT calculations are automatic.',
        results: [
            { metric: '6hrs', label: 'Saved per Week (accounting)' },
            { metric: '100%', label: 'Invoice-Delivery Match Rate' },
            { metric: '3×', label: 'Faster Month-End Close' },
            { metric: '0', label: 'Tax Compliance Errors' },
        ],
        quote: '"FIRS filing used to take my accountant a full day every week. Now it takes 20 minutes. BazzAI pulls everything from the orders automatically. I don\'t know how we survived before."',
        role: 'Finance Director',
        tags: ['Invoice Automation', 'Tax Compliance', 'Delivery Note Matching', 'Month-End Close'],
        featured: false,
    },
    {
        country: '🇺🇬',
        industry: 'Dairy Manufacturing',
        client: 'Kampala Dairy Producer',
        subtitle: '55 employees · Fresh dairy delivered to 80+ outlets daily',
        title: 'Supplier On-Time Delivery Jumps from 58% to 91%',
        challenge: 'The factory was experiencing repeated production line stoppages because raw milk suppliers were delivering late with no advance warning. The production manager was making 20+ calls daily just to track supplier arrival ETAs.',
        solution: 'BazzAI\'s supplier WhatsApp portal sends automated morning check-ins to all suppliers. Confirmed ETAs are logged. Any supplier behind schedule triggers an automatic alert to the production manager.',
        results: [
            { metric: '91%', label: 'On-Time Supplier Delivery (up from 58%)' },
            { metric: '80%', label: 'Reduction in Production Stoppages' },
            { metric: '20+', label: 'Calls Eliminated Daily' },
            { metric: '12 days', label: 'To Full Deployment' },
        ],
        quote: '"Supplier delivery chaos was killing us. With BazzAI\'s supplier WhatsApp portal, our on-time delivery rate jumped from 58% to 91%. Production stops dropped by 80%."',
        role: 'General Manager',
        tags: ['Supplier Tracking', 'Production Planning', 'WhatsApp Portal', 'Alert Automation'],
        featured: false,
    },
    {
        country: '🇬🇭',
        industry: 'Beverage Manufacturing',
        client: 'Accra Beverage Company',
        subtitle: '38 employees · Supplying 150+ retail points',
        title: 'KES 320K/Month in Unmatched Payments Recovered',
        challenge: 'M-Pesa payment reconciliation was taking 4+ hours every evening. The finance team was manually cross-referencing M-Pesa statements with Excel invoices. Unmatched payments were being written off or causing disputes.',
        solution: 'BazzAI auto-matches incoming M-Pesa transactions to open invoices in real time. Unmatched payments are flagged within minutes. An ageing report shows overdue accounts with amounts outstanding.',
        results: [
            { metric: 'KES 320K', label: 'Monthly Payments Previously Missing' },
            { metric: '4hrs', label: 'Daily Reconciliation Time Eliminated' },
            { metric: 'Real-time', label: 'Payment Matching (was end-of-day)' },
            { metric: '23%', label: 'Reduction in Overdue Accounts' },
        ],
        quote: '"M-Pesa reconciliation was 4 hours every evening. BazzAI does it in real time. We found KES 320,000 in unmatched payments our old process was missing every month."',
        role: 'Managing Director',
        tags: ['M-Pesa Reconciliation', 'Payment Matching', 'Ageing Reports', 'Cash Flow'],
        featured: false,
    },
    {
        country: '🇰🇪',
        industry: 'Export Food Processing',
        client: 'Mombasa Export Processor',
        subtitle: '60 employees · Export to 4 regional markets',
        title: 'Customer Inbound Calls Drop 70% with WhatsApp Status Updates',
        challenge: 'The sales team was receiving 80+ inbound calls daily from customers asking "Is my order ready?" Each call took 5–10 minutes to resolve — requiring the rep to call production, wait, then call back. Sales time was effectively destroyed.',
        solution: 'BazzAI sends automatic WhatsApp status updates to customers at each stage: order confirmed, in production, dispatched, delivered. Customers get proactive updates they didn\'t have to ask for.',
        results: [
            { metric: '70%', label: 'Fewer Customer Inbound Calls' },
            { metric: '80+', label: 'Daily Calls Eliminated' },
            { metric: '2hrs', label: 'Freed Per Sales Rep Daily' },
            { metric: '22%', label: 'Increase in New Sales Calls Made' },
        ],
        quote: '"Our customers used to call constantly for order updates. Since BazzAI sends WhatsApp status updates automatically, inbound customer calls dropped 70%. My team can focus on selling."',
        role: 'Head of Sales',
        tags: ['Customer Notifications', 'WhatsApp Updates', 'Order Status', 'Sales Productivity'],
        featured: false,
    },
];

const metrics = [
    { value: '98%', label: 'Avg Order Accuracy' },
    { value: '20hrs', label: 'Saved per Week' },
    { value: '14 days', label: 'Avg Payback Period' },
    { value: 'KES 320K', label: 'Payments Recovered / Month' },
];

export default function CaseStudiesPage() {
    const [expanded, setExpanded] = useState<number | null>(0);

    return (
        <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'var(--font-body)' }}>
            <Header />

            {/* ─── HERO ─── */}
            <section style={{ paddingTop: '5rem', background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}
                className="relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-8"
                    style={{ background: 'radial-gradient(circle at 70% 50%, #ff6b35, transparent 60%)' }} />
                <div className="max-w-5xl mx-auto px-6 py-24 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold mb-7"
                        style={{ borderColor: 'rgba(255,107,53,0.4)', background: 'rgba(255,107,53,0.12)', color: '#ff6b35' }}>
                        <Award size={12} /> Real Results. Real Factories.
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
                        style={{ fontFamily: 'var(--font-headline)' }}>
                        From the Factory Floor<br />
                        <span style={{ color: '#ff6b35' }}>Across Africa</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Five case studies from food, dairy, beverage, and snack manufacturers in Kenya, Nigeria, Uganda, and Ghana.
                        Real metrics, real factory managers, real results.
                    </p>
                </div>

                {/* Stats */}
                <div style={{ background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {metrics.map((m, i) => (
                            <div key={i}>
                                <p className="text-3xl font-black" style={{ color: '#ff6b35', fontFamily: 'var(--font-headline)' }}>{m.value}</p>
                                <p className="text-xs font-semibold mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{m.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CASE STUDY CARDS ─── */}
            <section className="py-24 px-6" style={{ background: 'var(--color-bg-light)' }}>
                <div className="max-w-5xl mx-auto space-y-8">
                    {studies.map((s, i) => (
                        <div key={i} className="bg-white rounded-2xl border-2 overflow-hidden transition-all hover:shadow-xl"
                            style={{ borderColor: s.featured ? 'var(--color-action)' : '#e8eef4' }}>
                            {/* Card top bar */}
                            <div className="flex flex-wrap items-center justify-between px-7 py-4 border-b"
                                style={{ borderColor: '#e8eef4', background: s.featured ? 'rgba(255,107,53,0.04)' : '#fafcff' }}>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{s.country}</span>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--color-action)' }}>{s.industry}</p>
                                        <p className="font-black text-sm" style={{ color: 'var(--color-primary)' }}>{s.client}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {s.featured && (
                                        <span className="px-3 py-1 rounded-full text-[10px] font-black text-white"
                                            style={{ background: 'var(--color-action)' }}>Featured</span>
                                    )}
                                    <span className="text-xs text-slate-400 hidden md:block">{s.subtitle}</span>
                                </div>
                            </div>

                            {/* Card body */}
                            <div className="p-7">
                                <h3 className="text-xl font-black mb-4 leading-snug" style={{ color: 'var(--color-primary)' }}>
                                    {s.title}
                                </h3>

                                {/* Result pills */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                                    {s.results.map((r, j) => (
                                        <div key={j} className="rounded-xl p-3 text-center"
                                            style={{ background: 'var(--color-bg-light)', border: '1px solid #d5e3ef' }}>
                                            <p className="text-xl font-black" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-headline)' }}>{r.metric}</p>
                                            <p className="text-[10px] font-semibold mt-0.5 leading-tight" style={{ color: '#7f8c8d' }}>{r.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="rounded-xl p-5 mb-5 border-l-4"
                                    style={{ borderColor: 'var(--color-action)', background: 'rgba(255,107,53,0.04)' }}>
                                    <p className="text-sm italic leading-relaxed mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                        {s.quote}
                                    </p>
                                    <p className="text-xs font-black" style={{ color: 'var(--color-action)' }}>
                                        — {s.role}, {s.client}
                                    </p>
                                </blockquote>

                                {/* Expandable detail */}
                                <button
                                    className="text-sm font-bold flex items-center gap-1 mb-4 hover:opacity-70 transition-opacity"
                                    style={{ color: 'var(--color-secondary)' }}
                                    onClick={() => setExpanded(expanded === i ? null : i)}>
                                    {expanded === i ? 'Hide details ▲' : 'See full story ▼'}
                                </button>

                                {expanded === i && (
                                    <div className="border-t pt-5 grid md:grid-cols-2 gap-6" style={{ borderColor: '#e8eef4' }}>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#7f8c8d' }}>The Challenge</p>
                                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{s.challenge}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#7f8c8d' }}>The Solution</p>
                                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{s.solution}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {s.tags.map((t, j) => (
                                        <span key={j} className="px-3 py-1 rounded-full text-xs font-semibold"
                                            style={{ background: 'rgba(26,58,82,0.06)', color: 'var(--color-primary)' }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section className="py-24 px-6" style={{ background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}>
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-5"
                        style={{ fontFamily: 'var(--font-headline)' }}>
                        Want These Results<br />
                        <span style={{ color: '#ff6b35' }}>At Your Factory?</span>
                    </h2>
                    <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Start with a free 14-day pilot. We configure BazzAI around your specific workflow — no commitment required.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="px-10 py-4 rounded-xl font-black text-lg text-white flex items-center gap-2 justify-center hover:scale-105 transition-all"
                            style={{ background: 'var(--color-action)', boxShadow: '0 8px 32px rgba(255,107,53,0.4)' }}
                            onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                            Start My Free Pilot <ArrowRight size={20} />
                        </button>
                        <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 justify-center"
                            style={{ border: '2px solid rgba(255,255,255,0.25)', color: 'white' }}>
                            <MessageSquare size={20} /> Chat with a Specialist
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
