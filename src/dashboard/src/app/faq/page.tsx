"use client";

import { useState, useMemo } from 'react';
import {
    Search, ChevronDown, ChevronUp, Shield, Zap, DollarSign,
    Settings, HelpCircle, MessageCircle, ArrowRight, Home,
    Lock, Activity, Users, Globe, FileText, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const faqCategories = [
    { id: 'security', name: 'Security & Data', icon: <Shield size={18} /> },
    { id: 'implementation', name: 'Implementation & Tech', icon: <Settings size={18} /> },
    { id: 'pricing', name: 'Price & ROI', icon: <DollarSign size={18} /> },
    { id: 'general', name: 'General & Operations', icon: <HelpCircle size={18} /> }
];

const faqs = [
    {
        cat: 'security',
        q: "Where is our data stored?",
        a: "All data is stored in ISO 27001 compliant data centers. We use regional data residency where possible, typically utilizing Supabase (PostgreSQL) hosted on AWS or Azure with VPC isolation."
    },
    {
        cat: 'security',
        q: "Does the AI train on our sensitive company data?",
        a: "No. BazzAI utilizes enterprise-grade APIs (e.g., OpenAI Enterprise, Azure AI) where training on customer data is strictly disabled by default. Your data stays your data."
    },
    {
        cat: 'security',
        q: "How do you handle Multi-Tenancy?",
        a: "We use strict Row Level Security (RLS) and schema isolation. Every client operates in a logically siloed environment, ensuring zero cross-leakage of data or LLM context."
    },
    {
        cat: 'security',
        q: "Are you SOC 2 compliant?",
        a: "Our infrastructure providers (AWS, Supabase, Vercel) are SOC 2 Type II compliant. BazzAI is currently in the audit process for our native orchestration layer, following SOC 2 Type I standards."
    },
    {
        cat: 'security',
        q: "What happens if an API provider (like OpenAI) goes down?",
        a: "We implement an 'Agentic Fallback' architecture. If a primary model fails, our orchestration layer automatically routes to a secondary provider (e.g., Anthropic or local Llama deployments) to ensure zero downtime."
    },
    {
        cat: 'security',
        q: "Who has access to the logs?",
        a: "Access is strictly limited to authorized BazzAI architects via hardware-based MFA. Logs are encrypted at rest and in transit, with automated PII masking in place."
    },
    {
        cat: 'security',
        q: "Do you offer on-premise deployments?",
        a: "Yes. For high-security environments, we offer 'Bazz-Private,' a containerized version of our orchestration engine that can run on your private cloud or air-gapped infrastructure."
    },
    {
        cat: 'security',
        q: "Is the communication encrypted?",
        a: "Yes. All API calls, dashboard interactions, and database connections use TLS 1.3 encryption. We also support end-to-end encryption for specific high-sensitivity workflows."
    },
    {
        cat: 'security',
        q: "Can we delete our data at any time?",
        a: "Absolutely. We provide a 'Right to be Forgotten' tool that allows you to wipe all company-specific LLM context, logs, and database records instantly."
    },
    {
        cat: 'security',
        q: "How do you handle PII in prompts?",
        a: "BazzAI has a built-in scrubbing layer that detects and anonymizes PII (names, emails, SSNs) before sending data to external LLM providers."
    },
    {
        cat: 'implementation',
        q: "How long does a standard implementation take?",
        a: "Most enterprise deployments take 8 weeks from the discovery call to full production scale. We follow a 4-phase framework: Discovery, Design, Pilot, and Optimization."
    },
    {
        cat: 'implementation',
        q: "What systems can you integrate with?",
        a: "We support 400+ native integrations via n8n and custom API connectors, including Salesforce, HubSpot, SAP, Slack, WhatsApp Business, and custom legacy ERPs."
    },
    {
        cat: 'implementation',
        q: "Do we need a dedicated technical team for maintenance?",
        a: "No. BazzAI is a fully managed platform. We handle the orchestration, scaling, and model tuning. Your team simply 'orchestrates' the business logic via our dashboard."
    },
    {
        cat: 'implementation',
        q: "What is your uptime SLA?",
        a: "We guarantee 99.9% uptime for our core orchestration engine. Our Enterprise tier includes a 99.99% 'High Availability' SLA with dedicated compute resources."
    },
    {
        cat: 'implementation',
        q: "Can BazzAI handle unstructured data like PDFs or voice?",
        a: "Yes. Our Bazz-Doc engine uses advanced OCR and RAG techniques to extract high-accuracy data from messy PDFs, images, and এমনকি non-standard handwritten notes."
    },
    {
        cat: 'implementation',
        q: "How do we verify the AI's accuracy?",
        a: "We use 'Human-in-the-Loop' thresholds. Any output with a confidence score below 95% is automatically routed to your staff for verification. This ensures 100% production-ready results."
    },
    {
        cat: 'implementation',
        q: "Does BazzAI support multi-language workflows?",
        a: "Yes. BazzAI is natively multilingual, supporting 90+ languages including Swahili, Arabic, French, and Chinese, both for input processing and output generation."
    },
    {
        cat: 'implementation',
        q: "Can we use our own API keys?",
        a: "Yes. 'Bring Your Own Key' (BYOK) is supported for Enterprise clients who want to leverage their existing committed spend with OpenAI, Anthropic, or Google Cloud."
    },
    {
        cat: 'implementation',
        q: "What coding languages are supported for custom scripts?",
        a: "Custom automation nodes in BazzAI support JavaScript/Node.js and Python. Our architects handle the heavy lifting, but your team can modify logic if desired."
    },
    {
        cat: 'implementation',
        q: "How do you handle version control for workflows?",
        a: "Every workflow has a full version history. You can roll back to any previous state in seconds, and we support staging environments for testing before pushing to production."
    },
    {
        cat: 'pricing',
        q: "Is there an upfront implementation fee?",
        a: "Yes. We charge a one-time 'Discovery & Setup' fee that covers the 8-week implementation process, custom integration development, and staff training."
    },
    {
        cat: 'pricing',
        q: "How is the recurring cost calculated?",
        a: "Pricing is based on two factors: Platform Seat (Users) and Task Volume (number of AI-orchestrated actions). This ensures you only pay for the value you receive."
    },
    {
        cat: 'pricing',
        q: "What defines a 'Task'?",
        a: "A task is a single end-to-end automation cycle—for example, processing one invoice or qualifying one inbound lead via WhatsApp."
    },
    {
        cat: 'pricing',
        q: "Do you offer discounts for non-profits or startups?",
        a: "Yes. We have dedicated programs for early-stage startups and NGOs that offer up to 40% off the standard platform fee for the first 12 months."
    },
    {
        cat: 'pricing',
        q: "What is the typical Payback Period?",
        a: "Most clients achieve full payback (where savings > investment) within 3 to 6 months of going live. Our average Year 1 ROI is 350%."
    },
    {
        cat: 'pricing',
        q: "Are there any hidden costs (like token fees)?",
        a: "Unless you are using BYOK, all LLM token costs and API hosting fees are bundled into your per-task pricing. No surprise monthly bills."
    },
    {
        cat: 'pricing',
        q: "Can we upgrade or downgrade our plan?",
        a: "Yes. You can move between tiers at any time. Volume discounts are automatically applied as your task volume scales."
    },
    {
        cat: 'pricing',
        q: "Is there a free trial?",
        a: "We don't offer a generic trial because every enterprise setup is unique. Instead, we offer a 'Pilot Phase' with a 30-day money-back guarantee if we don't hit agreed-upon KPIs."
    },
    {
        cat: 'pricing',
        q: "How do we pay?",
        a: "We accept all major credit cards, Stripe, M-Pesa Business, and bank transfers (SWIFT/Wire) for Enterprise annual contracts."
    },
    {
        cat: 'pricing',
        q: "What happens if we exceed our task limit?",
        a: "We don't cut off your service. Excess tasks are billed at a flat 'overage' rate, and our team will reach out to help you move to a more cost-effective higher tier."
    },
    {
        cat: 'general',
        q: "Is BazzAI an AI agent or a chatbot?",
        a: "It's both and more. While BazzAI can act as a chatbot, its real power is as an 'Operational Swarm'—it coordinates complex backend tasks across multiple software systems."
    },
    {
        cat: 'general',
        q: "Do you have local support in Nairobi?",
        a: "Yes. Bazztech Networks is headquartered in Nairobi. We offer local on-site support for our East African clients and virtual 24/7 support for global customers."
    },
    {
        cat: 'general',
        q: "Can BazzAI replace our human employees?",
        a: "We focus on 'Augmentation,' not 'Replacement.' BazzAI handles the $15/hour repetitive tasks so your team can focus on $150/hour strategic decision-making."
    },
    {
        cat: 'general',
        q: "Can we white-label the BazzAI dashboard?",
        a: "Yes. Our Enterprise tier includes full white-labeling capabilities, allowing you to use your own branding, domain, and colors for internal or client-facing portals."
    },
    {
        cat: 'general',
        q: "How do I get started?",
        a: "The first step is a 30-minute 'Opportunity Assessment.' We review your current workflows and provide a feasibility report with projected ROI within 48 hours."
    },
    {
        cat: 'general',
        q: "What industries do you specialize in?",
        a: "Our core expertise is in Real Estate, Legal Services, Manufacturing, and FinTech. However, our orchestration logic is industry-agnostic and highly adaptable."
    },
    {
        cat: 'general',
        q: "Can BazzAI work with our custom-built legacy software?",
        a: "Yes. If your software has an API or a database we can reach, BazzAI can integrate with it. We also offer RPA (Robotic Process Automation) for systems without APIs."
    },
    {
        cat: 'general',
        q: "Who owns the custom workflows created for our business?",
        a: "You do. All custom business logic and n8n workflow JSON files created during your implementation are owned by your company."
    },
    {
        cat: 'general',
        q: "How do you handle team training?",
        a: "We provide live Zoom/In-person training, recorded video walkthroughs, and custom-written runbooks for your operators and admins."
    },
    {
        cat: 'general',
        q: "What is BazzAI's long-term vision?",
        a: "To provide every enterprise with an 'Autonomous Ops Department' that handles 100% of clerical and administrative load, enabling human teams to focus on pure creativity and growth."
    }
];

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const filteredFaqs = useMemo(() => {
        return faqs.filter(faq => {
            const matchesSearch = faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
                faq.a.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory ? faq.cat === selectedCategory : true;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <div className="flex min-h-screen flex-col bg-white text-slate-900 font-sans selection:bg-red-500/30 overflow-x-hidden">
            <Header />

            {/* Hero Section */}
            <section className="pt-36 pb-20 px-6 bg-slate-900 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600/5 blur-[120px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-red-400 text-xs font-black uppercase tracking-widest mb-6">
                        <MessageCircle size={14} /> Enterprise Knowledge base
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
                        Got Questions?<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">We Have Answers.</span>
                    </h1>
                    <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
                        Everything you need to know about BazzAI security, implementation, pricing, and operational ROI.
                    </p>

                    <div className="relative max-w-2xl mx-auto">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by topic, feature, or keyword..."
                            className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-lg font-medium shadow-2xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-12">
                    {/* Sidebar / Categories */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-2">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                <Globe size={14} /> Browse Categories
                            </h3>
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-bold transition-all ${selectedCategory === null ? 'bg-red-50 text-red-600 shadow-sm border border-red-100' : 'text-slate-600 hover:bg-slate-50 group'}`}
                            >
                                <span className={`${selectedCategory === null ? 'text-red-500' : 'text-slate-400 group-hover:text-slate-600'}`}>
                                    <Activity size={18} />
                                </span>
                                All Questions
                                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-black">{faqs.length}</span>
                            </button>
                            {faqCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat.id ? 'bg-red-50 text-red-600 shadow-sm border border-red-100' : 'text-slate-600 hover:bg-slate-50 group'}`}
                                >
                                    <span className={`${selectedCategory === cat.id ? 'text-red-500' : 'text-slate-400 group-hover:text-slate-600'}`}>
                                        {cat.icon}
                                    </span>
                                    {cat.name}
                                    <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-black">
                                        {faqs.filter(f => f.cat === cat.id).length}
                                    </span>
                                </button>
                            ))}

                            <div className="mt-12 p-6 bg-slate-900 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 w-20 h-20 bg-red-600/20 rounded-full blur-2xl group-hover:bg-red-600/30 transition-all" />
                                <h4 className="font-black text-lg mb-4 relative z-10">Need a direct answer?</h4>
                                <p className="text-xs text-slate-400 mb-6 leading-relaxed relative z-10">Our solutions architects are available for a 1-on-1 technical briefing.</p>
                                <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-all relative z-10"
                                    onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                                    Book 15-min Call
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* FAQ List */}
                    <div className="lg:col-span-3">
                        <div className="space-y-4">
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map((faq, i) => (
                                    <div
                                        key={i}
                                        className={`border-2 rounded-2xl transition-all duration-300 ${openIndex === i ? 'border-red-100 shadow-lg mb-4' : 'border-slate-100 hover:border-slate-200 shadow-sm'}`}
                                    >
                                        <button
                                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                            className="w-full flex items-center justify-between p-6 text-left group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${openIndex === i ? 'bg-red-100 text-red-600' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'}`}>
                                                    <CheckCircle2 size={16} />
                                                </div>
                                                <span className={`font-bold text-lg leading-tight transition-colors ${openIndex === i ? 'text-slate-900 font-black' : 'text-slate-700'}`}>
                                                    {faq.q}
                                                </span>
                                            </div>
                                            {openIndex === i ? <ChevronUp className="text-red-500" size={20} /> : <ChevronDown className="text-slate-400" size={20} />}
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96' : 'max-h-0'}`}>
                                            <div className="px-6 pb-8 pl-14 pr-12 text-slate-500 font-medium leading-relaxed text-base border-t border-slate-50 pt-6 bg-slate-50/50">
                                                {faq.a}
                                                <div className="mt-6 flex items-center gap-4 text-xs font-black uppercase tracking-widest text-red-500/80">
                                                    <span>Related:</span>
                                                    <Link href="/security" className="hover:underline">Security Hub</Link>
                                                    <Link href="/pricing" className="hover:underline">Pricing Guide</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                    <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                                        <Search size={40} />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-2">No matching questions found.</h3>
                                    <p className="text-slate-500 mb-8 max-w-sm mx-auto">Try searching for broader terms like "security," "cost," or "integration."</p>
                                    <button
                                        onClick={() => { setSearchTerm(''); setSelectedCategory(null); }}
                                        className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-sm"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Pagination or Show More would go here */}
                        <div className="mt-16 bg-red-600 rounded-[32px] p-10 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                                <div className="max-w-xl">
                                    <h2 className="text-3xl font-black mb-4">Still have a specific enterprise objection?</h2>
                                    <p className="text-red-100 font-medium">We've handled complex deployment constraints for law firms, manufacturers, and NGOs. Let's solve yours.</p>
                                </div>
                                <button className="px-10 py-4 bg-white text-red-600 font-black rounded-2xl text-lg hover:shadow-2xl transition-all shadow-xl shadow-red-900/40 whitespace-nowrap"
                                    onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                                    Talk to an Expert
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
