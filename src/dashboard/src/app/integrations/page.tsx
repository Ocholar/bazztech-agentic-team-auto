"use client";
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Database, MessageSquare, Briefcase } from 'lucide-react';

const integrations = [
    {
        category: "Communication & Orders",
        items: [
            { name: "WhatsApp Business API", desc: "Native integration. Turns chat messages into structured orders and triggers automated supplier updates." },
            { name: "SMS / USSD", desc: "Fallback communication for farmers and suppliers without smartphone access." },
            { name: "Email Parsing", desc: "Automatically extracts PO numbers and item lines from emailed PDF purchase orders." }
        ]
    },
    {
        category: "Payments & Finance",
        items: [
            { name: "Safaricom M-Pesa", desc: "Direct Daraja API integration for real-time B2B and Paybill invoice reconciliation." },
            { name: "Stripe / Flutterwave", desc: "For manufacturers processing pan-African or international card payments." },
            { name: "QuickBooks Online", desc: "Two-way sync. Generated invoices in BazzAI flow directly to your QBO general ledger." }
        ]
    },
    {
        category: "Compliance & Government",
        items: [
            { name: "KRA iTax (Kenya)", desc: "Automated VAT generation formatted for immediate ETR portal submission." },
            { name: "FIRS (Nigeria)", desc: "Taxation data structuring and automated monthly reporting formats." }
        ]
    }
];

export default function IntegrationsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'var(--font-body)' }}>
            <Header />

            <section className="pt-32 pb-20 px-6 text-center" style={{ background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}>
                <div className="max-w-4xl mx-auto text-white relative z-10">
                    <h1 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
                        Connect to the Tools<br />
                        <span style={{ color: '#ff6b35' }}>You Already Use.</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        BazzAI is designed to sit invisibly on top of your existing communication and finance stack. No new apps to download.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                    {integrations.map((group, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2rem] border shadow-sm" style={{ borderColor: '#e8eef4' }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white" style={{ background: 'var(--color-primary)' }}>
                                {i === 0 ? <MessageSquare /> : i === 1 ? <Briefcase /> : <Database />}
                            </div>
                            <h2 className="text-2xl font-black mb-6" style={{ color: 'var(--color-primary)' }}>{group.category}</h2>
                            <div className="space-y-6">
                                {group.items.map((item, j) => (
                                    <div key={j} className="border-b pb-4 last:border-0 last:pb-0" style={{ borderColor: '#e8eef4' }}>
                                        <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--color-action)' }}>{item.name}</h3>
                                        <p className="text-xs leading-relaxed text-slate-500">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-24 px-6 text-center bg-white border-t" style={{ borderColor: '#e8eef4' }}>
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black mb-6" style={{ color: 'var(--color-primary)' }}>Need a custom ERP integration?</h2>
                    <p className="text-slate-500 mb-8">We build custom bridges for SAP, Oracle, and Sage for our Enterprise clients.</p>
                    <button
                        className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 inline-flex items-center gap-2"
                        style={{ background: 'var(--color-action)' }}
                        onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                        Discuss Custom Integration <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
