"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const faqs = [
    {
        category: "Onboarding & Setup",
        questions: [
            {
                q: "How long does it take to deploy BazzAI in my factory?",
                a: "If you subscribe to the SME or Growth tiers, we can have your WhatsApp number connected, your supplier portal active, and your dashboard running within 24–48 hours. The entire 14-day free pilot is designed to get you from zero to full visibility immediately."
            },
            {
                q: "Do my workers need to install new software?",
                a: "No. Your sales team and floor managers keep using WhatsApp just as they do now. BazzAI works in the background by structuring WhatsApp messages to update order boards and trigger invoices automatically."
            },
            {
                q: "What do we need to start the 14-day free pilot?",
                a: "We just need 30 minutes with your Operations Manager to map your current workflow, and access to a WhatsApp Business Number (which we can help you set up)."
            }
        ]
    },
    {
        category: "Integrations & Tech",
        questions: [
            {
                q: "Does it connect to M-Pesa?",
                a: "Yes. For Kenyan clients, BazzAI integrates directly with Safaricom's Daraja API (M-Pesa B2B/B2C). Incoming payments automatically mark corresponding invoices as paid in real time."
            },
            {
                q: "Can BazzAI generate KRA-compliant invoices?",
                a: "Yes. Our Growth plan includes automated KRA iTax invoice generation. You simply upload your product details and PIN, and BazzAI structures your invoices correctly for immediate filing."
            },
            {
                q: "We use QuickBooks. Can you integrate with it?",
                a: "Yes. We support standard CSV exports for offline accounting software, and we have direct API integrations for QuickBooks Online and Xero to keep your general ledger updated automatically."
            }
        ]
    },
    {
        category: "Pricing & Contracts",
        questions: [
            {
                q: "What happens after the 14-day free pilot?",
                a: "We present a joint ROI review. If BazzAI has demonstrably saved you time and reduced order errors, you subscribe to our SME (KES 15,000/mo) or Growth (KES 35,000/mo) plan. If you are not satisfied, you simply walk away. No lock-in."
            },
            {
                q: "Do you offer pricing in USD for clients outside Kenya?",
                a: "Yes. We operate across Africa (Nigeria, Uganda, Ghana). The SME plan is $110/mo, and the Growth plan is $250/mo. We process payments via standard cards or bank transfers for international clients."
            }
        ]
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<string | null>("0-0");

    const toggleOpen = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'var(--font-body)' }}>
            <Header />

            <section className="pt-32 pb-16 px-6 text-center bg-slate-50 border-b" style={{ borderColor: '#e8eef4' }}>
                <h1 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-primary)' }}>
                    Frequently Asked Questions
                </h1>
                <p className="text-slate-500 max-w-2xl mx-auto">Everything you need to know about setting up BazzAI on your factory floor.</p>
            </section>

            <section className="py-16 px-6 bg-white">
                <div className="max-w-3xl mx-auto space-y-12">
                    {faqs.map((cat, catIdx) => (
                        <div key={catIdx}>
                            <h2 className="text-xl font-black mb-6" style={{ color: 'var(--color-action)' }}>{cat.category}</h2>
                            <div className="space-y-4">
                                {cat.questions.map((faq, qIdx) => {
                                    const id = `${catIdx}-${qIdx}`;
                                    return (
                                        <div key={qIdx} className="border rounded-2xl overflow-hidden" style={{ borderColor: '#e8eef4' }}>
                                            <button
                                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                                                onClick={() => toggleOpen(id)}>
                                                <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{faq.q}</span>
                                                <ChevronDown size={18} className="flex-shrink-0 transition-transform duration-300"
                                                    style={{
                                                        color: 'var(--color-action)',
                                                        transform: openIndex === id ? 'rotate(180deg)' : 'none'
                                                    }} />
                                            </button>
                                            <div className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === id ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <p className="text-sm leading-relaxed border-t pt-5" style={{ color: '#7f8c8d', borderColor: '#e8eef4' }}>
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 px-6 bg-slate-50 border-t text-center" style={{ borderColor: '#e8eef4' }}>
                <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--color-primary)' }}>Still have questions?</h2>
                <Link href={"https://wa.me/15558219787"} target="_blank" rel="noopener noreferrer"
                    className="inline-flex px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 items-center gap-2"
                    style={{ background: '#25D366' }}>
                    <MessageSquare size={18} /> Ask on WhatsApp
                </Link>
            </section>

            <Footer />
        </div>
    );
}
