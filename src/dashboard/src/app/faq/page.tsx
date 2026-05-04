"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, MessageSquare, Search, Filter, ThumbsUp, ThumbsDown } from 'lucide-react';
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
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | 'All'>('All');
    const [feedback, setFeedback] = useState<Record<string, 'up' | 'down'>>({});

    const handleFeedback = (id: string, type: 'up' | 'down') => {
        setFeedback(prev => ({ ...prev, [id]: type }));
    };

    const toggleOpen = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    const categories = ['All', ...faqs.map(f => f.category)];

    const filteredFaqs = faqs.map((cat, catIdx) => {
        const matchesCategory = activeCategory === 'All' || activeCategory === cat.category;
        if (!matchesCategory) return null;

        const filteredQuestions = cat.questions.filter(q =>
            q.q.toLowerCase().includes(search.toLowerCase()) ||
            q.a.toLowerCase().includes(search.toLowerCase())
        );

        if (filteredQuestions.length === 0) return null;

        return {
            ...cat,
            id: catIdx,
            questions: filteredQuestions
        };
    }).filter(Boolean);

    const hasResults = filteredFaqs.length > 0;

    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#0F1419', color: '#A0AEC0', fontFamily: 'Inter, sans-serif' }}>
            <Header />

            <section className="pt-32 pb-16 px-6 text-center border-b border-slate-800" style={{ background: '#141A23' }}>
                <h1 className="text-4xl md:text-5xl font-black mb-6 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Frequently Asked Questions
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto mb-10">Everything you need to know about setting up BazzAI on your factory floor.</p>

                {/* SEARCH & FILTER */}
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="relative group">
                        <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#E07A5F] transition-colors" />
                        <input
                            type="text"
                            placeholder="Search keywords (e.g. 'ERP', 'Pilot', 'Security')..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-[#0F1419] border border-slate-800 rounded-2xl focus:outline-none focus:border-[#E07A5F] transition-all text-white font-medium"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${activeCategory === cat ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-lg shadow-[#E07A5F]/20' : 'bg-[#1A202C] text-slate-400 border-slate-700 hover:border-slate-500'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-6 relative overflow-hidden min-h-[400px]">
                <div className="max-w-3xl mx-auto space-y-12 relative z-10">
                    {hasResults ? filteredFaqs.map((cat, catIdx) => (
                        <div key={cat!.id}>
                            <h2 className="text-xl font-black mb-6 text-[#E07A5F]">{cat!.category}</h2>
                            <div className="space-y-4">
                                {cat!.questions.map((faq, qIdx) => {
                                    const id = `${cat!.id}-${qIdx}`;
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
                                                <div className="mt-6 flex items-center justify-between border-t border-slate-700 pt-4">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Was this helpful?</span>
                                                    <div className="flex gap-4">
                                                        <button
                                                            onClick={() => handleFeedback(id, 'up')}
                                                            className={`flex items-center gap-2 transition-all hover:scale-110 ${feedback[id] === 'up' ? 'text-[#81B29A]' : 'text-slate-600 hover:text-slate-400'}`}
                                                            aria-label="Thumbs Up"
                                                        >
                                                            <ThumbsUp size={14} className={feedback[id] === 'up' ? 'fill-[#81B29A]' : ''} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleFeedback(id, 'down')}
                                                            className={`flex items-center gap-2 transition-all hover:scale-110 ${feedback[id] === 'down' ? 'text-[#E07A5F]' : 'text-slate-600 hover:text-slate-400'}`}
                                                            aria-label="Thumbs Down"
                                                        >
                                                            <ThumbsDown size={14} className={feedback[id] === 'down' ? 'fill-[#E07A5F]' : ''} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-20">
                            <Filter size={48} className="mx-auto text-slate-700 mb-4 opacity-20" />
                            <p className="text-lg font-bold text-slate-500">No matching questions found.</p>
                            <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="text-[#E07A5F] text-sm font-bold mt-2 hover:underline">Clear all filters</button>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-16 px-6 border-t text-center border-slate-800" style={{ background: '#141A23' }}>
                <h2 className="text-2xl font-black mb-4 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Ready for intelligent operations?</h2>
                <Link href="/register"
                    className="inline-flex px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 items-center gap-2 shadow-lg mt-2"
                    style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}>
                    Start Free Pilot <MessageSquare size={18} />
                </Link>
            </section>

            <Footer />
        </div>
    );
}
