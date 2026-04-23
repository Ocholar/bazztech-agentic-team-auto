"use client";
import { useState } from 'react';
import { CheckCircle, ArrowRight, Clock, ChevronDown, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const phases = [
    {
        num: '01', title: 'Factory Workflow Audit', timeline: 'Day 1 — Free',
        color: '#ff6b35',
        desc: 'We map your current order-to-cash flow via a 30-minute WhatsApp interview. No site visit required.',
        steps: [
            'Operations manager kickoff (30 min WhatsApp call)',
            'Order flow, supplier, and payment discovery',
            'Top 3 bottleneck identification and quantification',
            'Custom BazzAI configuration blueprint delivered',
        ],
    },
    {
        num: '02', title: 'WhatsApp & System Setup', timeline: 'Days 2–5',
        color: '#2c5aa0',
        desc: 'We connect your WhatsApp Business number, build your order capture workflow, and configure your dashboard.',
        steps: [
            'WhatsApp Business API connection (< 2 hours)',
            'Order capture workflow configured and tested',
            'Supplier portal and delivery tracking setup',
            'Team contacts imported, dashboard configured',
        ],
    },
    {
        num: '03', title: '14-Day Free Pilot', timeline: 'Days 6–20',
        color: '#2ecc71',
        desc: 'BazzAI runs live alongside your normal operations. Real orders, real suppliers, real M-Pesa payments.',
        steps: [
            'Live production environment — real orders tracked',
            'M-Pesa auto-reconciliation active',
            'KRA invoice auto-generation tested',
            'WhatsApp alerts for order status and supplier delays',
            'Weekly check-in with your operations team',
        ],
    },
    {
        num: '04', title: 'ROI Review & Go-Live', timeline: 'Day 21+',
        color: '#1a3a52',
        desc: 'We run a joint ROI review. If it worked, subscribe. If not, walk away — no invoice.',
        steps: [
            'Joint ROI review — hours saved, payments recovered',
            'Subscribe to SME (KES 15,000) or Growth (KES 35,000)',
            'Or cancel — no invoice, no lock-in',
            'Ongoing support and monthly account reviews',
        ],
    },
];

const faqs = [
    { q: "How much involvement does our team need?", a: "Minimal. We need 30 minutes for the initial audit and periodic check-ins during your pilot. Your team keeps using WhatsApp as they already do." },
    { q: "What if an order is misunderstood by BazzAI?", a: "Any order below our confidence threshold is flagged to your team for manual review on the dashboard. You always have the final say." },
    { q: "How do you handle team training?", a: "There is no training needed — your team uses WhatsApp. For the dashboard, we provide a 15-minute walkthrough and a written guide." },
];

export default function ImplementationPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'var(--font-body)' }}>
            <Header />

            <section className="pt-32 pb-20 px-6 text-center" style={{ background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}>
                <div className="max-w-4xl mx-auto text-white relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest mb-6"
                        style={{ border: '1px solid rgba(255,107,53,0.3)', background: 'rgba(255,107,53,0.1)', color: '#ff6b35' }}>
                        <Clock size={14} /> Implementation Guide
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
                        From WhatsApp Chaos to<br /><span style={{ color: '#ff6b35' }}>Connected Factory in 20 Days.</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        No vague consulting timelines. Here is exactly what happens after you reach out.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6" style={{ background: 'var(--color-bg-light)' }}>
                <div className="max-w-4xl mx-auto relative">
                    <div className="hidden md:block absolute left-5 top-0 bottom-0 w-0.5"
                        style={{ background: 'linear-gradient(to bottom, var(--color-action), var(--color-primary))' }} />
                    <div className="space-y-12">
                        {phases.map((p, i) => (
                            <div key={i} className="relative flex flex-col md:flex-row gap-8">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg z-10 shrink-0"
                                    style={{ background: p.color }}>{p.num}</div>
                                <div className="flex-1 bg-white rounded-2xl border p-8 shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: '#e8eef4' }}>
                                    <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                                        <h3 className="text-xl font-black" style={{ color: 'var(--color-primary)' }}>{p.title}</h3>
                                        <span className="px-4 py-1.5 rounded-full text-white text-xs font-black shadow-sm" style={{ background: p.color }}>{p.timeline}</span>
                                    </div>
                                    <p className="text-slate-500 mb-6 font-medium leading-relaxed text-sm">{p.desc}</p>
                                    <ul className="space-y-2.5">
                                        {p.steps.map((step, j) => (
                                            <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600">
                                                <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" /> {step}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black mb-12 text-center" style={{ color: 'var(--color-primary)' }}>Implementation FAQ</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border rounded-2xl overflow-hidden" style={{ borderColor: '#e8eef4' }}>
                                <button className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{faq.q}</span>
                                    <ChevronDown size={18} style={{ color: 'var(--color-action)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                                </button>
                                <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-sm leading-relaxed border-t pt-5" style={{ color: '#7f8c8d', borderColor: '#e8eef4' }}>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-6 text-center border-t" style={{ borderColor: '#e8eef4' }}>
                <button className="px-10 py-4 rounded-xl font-black text-white hover:scale-105 transition-all inline-flex items-center gap-2"
                    style={{ background: 'var(--color-action)' }}
                    onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                    Start Step 1 — Free Audit <ArrowRight size={18} />
                </button>
            </section>

            <Footer />
        </div>
    );
}
