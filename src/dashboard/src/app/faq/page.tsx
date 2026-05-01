"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const faqs = [
    {
        category: "Deployment & Setup",
        questions: [
            {
                q: "How long does it take to deploy BazzAI to my factory?",
                a: "If you subscribe to our standard tiers, we can have your vector database connected, data lakes syncing, and dashboards running within 24–48 hours. Our 14-day free pilot aims to get you from zero to full visibility immediately."
            },
            {
                q: "Do my workers need to install new applications?",
                a: "No. BazzAI ingests existing machine data and connects to your current systems. Your shift managers and engineers interact via simple web interfaces without needing specialized IT training."
            },
            {
                q: "Is any specialized hardware required?",
                a: "No new hardware is necessary. We utilize your existing SCADA, PLC, and ERP data logs using lightweight API bridges."
            }
        ]
    },
    {
        category: "Architecture & Integrations",
        questions: [
            {
                q: "How do you handle unstructured data like PDF manuals?",
                a: "Through Hybrid RAG architecture, we embed your unstructured machine manuals into high-dimensional Pinecone vector databases, enabling instant natural language querying."
            },
            {
                q: "Can BazzAI integrate with our existing ERP?",
                a: "Yes. We deploy custom integration pipelines for legacy ERPs such as SAP, Oracle, and Sage, automatically pushing AI demand forecasts to your production queues."
            },
            {
                q: "How does the n8n orchestration work?",
                a: "We configure n8n to listen for predictive AI failure models. When an anomaly is detected, it triggers automated alerts to Slack, SMS, or email, dispatching maintenance crews before downtime occurs."
            }
        ]
    },
    {
        category: "Security & Pricing",
        questions: [
            {
                q: "Where is our proprietary data hosted?",
                a: "BazzAI allocates a fully isolated database instance per client. We offer hosting on AWS Africa (Cape Town) for continental proximity, ensuring your data never touches public LLM training sets."
            },
            {
                q: "What happens after the 14-day free pilot?",
                a: "We present a joint ROI review. If our AI models have measurably improved your OEE or prevented failures, you subscribe to our Enterprise tier. If not, you walk away with zero lock-in."
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
        <div className="min-h-screen flex flex-col" style={{ background: '#0F1419', color: '#A0AEC0', fontFamily: 'Inter, sans-serif' }}>
            <Header />

            <section className="pt-32 pb-16 px-6 text-center border-b border-slate-800" style={{ background: '#141A23' }}>
                <h1 className="text-4xl md:text-5xl font-black mb-6 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Frequently Asked Questions
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to know about setting up BazzAI on your factory floor.</p>
            </section>

            <section className="py-16 px-6 relative overflow-hidden">
                <div className="max-w-3xl mx-auto space-y-12 relative z-10">
                    {faqs.map((cat, catIdx) => (
                        <div key={catIdx}>
                            <h2 className="text-xl font-black mb-6 text-[#E07A5F]">{cat.category}</h2>
                            <div className="space-y-4">
                                {cat.questions.map((faq, qIdx) => {
                                    const id = `${catIdx}-${qIdx}`;
                                    return (
                                        <div key={qIdx} className="border rounded-2xl overflow-hidden transition-all" style={{ background: '#1A202C', borderColor: '#2D3748' }}>
                                            <button
                                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-800 transition-colors"
                                                onClick={() => toggleOpen(id)}>
                                                <span className="font-bold text-[#F4F1DE]">{faq.q}</span>
                                                <ChevronDown size={18} className="flex-shrink-0 transition-transform duration-300 text-[#E07A5F]"
                                                    style={{ transform: openIndex === id ? 'rotate(180deg)' : 'none' }} />
                                            </button>
                                            <div className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === id ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <p className="text-sm leading-relaxed border-t pt-5 border-slate-700 text-slate-400">
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

            <section className="py-16 px-6 border-t text-center border-slate-800" style={{ background: '#141A23' }}>
                <h2 className="text-2xl font-black mb-4 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Ready for intelligent operations?</h2>
                <button
                    className="inline-flex px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 items-center gap-2 shadow-lg mt-2"
                    style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}
                    onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
                    Start Free Pilot <MessageSquare size={18} />
                </button>
            </section>

            <Footer />
        </div>
    );
}
