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
    { id: 'security', name: 'Security & Compliance', icon: <Shield size={18} /> },
    { id: 'integration', name: 'Integration & Compatibility', icon: <Globe size={18} /> },
    { id: 'implementation', name: 'Implementation & Deployment', icon: <Settings size={18} /> },
    { id: 'pricing', name: 'Pricing & Contracts', icon: <DollarSign size={18} /> },
    { id: 'roi', name: 'ROI & Value', icon: <Activity size={18} /> },
    { id: 'lockin', name: 'Lock-In & Portability', icon: <Lock size={18} /> },
    { id: 'competitive', name: 'Competitive Positioning', icon: <Zap size={18} /> },
    { id: 'support', name: 'Customer Success & Support', icon: <Users size={18} /> },
    { id: 'industry', name: 'Industry-Specific', icon: <FileText size={18} /> },
    { id: 'getstarted', name: 'Getting Started', icon: <HelpCircle size={18} /> }
];

const faqs = [
    // SECURITY & COMPLIANCE
    { cat: 'security', q: "Where is our data stored?", a: "All data is stored in ISO 27001 compliant data centers. We use regional data residency where possible, typically utilizing Supabase (PostgreSQL) hosted on AWS or Azure with VPC isolation. Clients can request a specific region during onboarding." },
    { cat: 'security', q: "Does the AI train on our sensitive company data?", a: "No. BazzAI utilizes enterprise-grade APIs (e.g., OpenAI Enterprise, Azure AI) where training on customer data is strictly disabled by default. Your data stays your data — we operate a zero-retention policy with all major LLM providers." },
    { cat: 'security', q: "How do you handle Multi-Tenancy?", a: "We use strict Row Level Security (RLS) and schema isolation at the database level. Every client operates in a logically siloed environment, ensuring zero cross-leakage of data or LLM context between tenants." },
    { cat: 'security', q: "Are you SOC 2 compliant?", a: "Our infrastructure providers (AWS, Supabase, Vercel) are SOC 2 Type II compliant. BazzAI is currently in the audit process for our native orchestration layer, following SOC 2 Type I standards." },
    { cat: 'security', q: "What happens if an API provider (like OpenAI) goes down?", a: "We implement an 'Agentic Fallback' architecture. If a primary model fails, our orchestration layer routes automatically to a secondary provider (e.g., Anthropic or local Llama deployments) to ensure 99.9% uptime." },
    { cat: 'security', q: "Who has access to the logs?", a: "Access is strictly limited to authorized BazzAI architects via hardware-based MFA. Logs are encrypted at rest and in transit (TLS 1.3), with automated PII masking in place before any log is written." },
    { cat: 'security', q: "Do you offer on-premise deployments?", a: "Yes. For high-security environments, we offer 'Bazz-Private,' a containerized version of our orchestration engine that can run on your private cloud or fully air-gapped infrastructure." },
    { cat: 'security', q: "Is the communication encrypted?", a: "Yes. All API calls, dashboard interactions, and database connections use TLS 1.3 encryption. We also support end-to-end encryption for specific high-sensitivity workflows upon request." },
    { cat: 'security', q: "Can we delete our data at any time?", a: "Absolutely. We provide a 'Right to be Forgotten' tool that allows you to wipe all company-specific LLM context, logs, and database records instantly — no waiting period, no questions asked." },
    { cat: 'security', q: "How do you handle PII in prompts?", a: "BazzAI has a built-in scrubbing layer that detects and anonymizes PII (names, emails, phone numbers, SSNs) before sending data to external LLM providers, ensuring compliance with GDPR and Kenya's Data Protection Act." },

    // INTEGRATION & COMPATIBILITY
    { cat: 'integration', q: "What systems can you integrate with?", a: "We support 400+ native integrations via n8n and custom API connectors, including Salesforce, HubSpot, SAP, NetSuite, Slack, WhatsApp Business, Google Workspace, Zoho, QuickBooks, and custom legacy ERPs." },
    { cat: 'integration', q: "What if our system doesn't have an API?", a: "We deploy RPA (Robotic Process Automation) for systems without public APIs. This allows BazzAI to interact with legacy software at the UI level — reading screens, clicking, and extracting data just like a human would." },
    { cat: 'integration', q: "Can BazzAI handle unstructured data like PDFs or voice?", a: "Yes. Our Bazz-Doc engine uses advanced OCR and RAG techniques to extract high-accuracy structured data from PDFs, scanned images, and handwritten notes with accuracy rates above 98%." },
    { cat: 'integration', q: "Do you integrate with WhatsApp Business?", a: "Yes, WhatsApp Business API integration is a core feature of Bazz-Connect. We handle message routing, template management, and two-way conversation flows in 90+ languages." },
    { cat: 'integration', q: "Can we connect our existing CRM?", a: "Yes. We have pre-built integrations for Salesforce, HubSpot, Zoho CRM, and Pipedrive. For all others, our API connector can bridge any CRM that exposes a REST API within 3-5 business days." },
    { cat: 'integration', q: "Does BazzAI support multi-language workflows?", a: "Yes. BazzAI is natively multilingual, supporting 90+ languages including Swahili, Arabic, French, Chinese, and Portuguese — for both input processing and output generation." },
    { cat: 'integration', q: "How do changes in third-party APIs affect us?", a: "We monitor all integrated APIs and proactively update connectors when providers announce changes. Your success manager will notify you 30 days in advance of any breaking changes, and we handle the migration at no extra charge." },

    // IMPLEMENTATION & DEPLOYMENT
    { cat: 'implementation', q: "How long does a standard implementation take?", a: "Most enterprise deployments take 8 weeks from discovery call to full production scale. We follow a 4-phase framework: Discovery (Weeks 1-2), Design (Weeks 3-4), Pilot (Weeks 5-6), and Production Launch (Weeks 7-8)." },
    { cat: 'implementation', q: "Do we need a dedicated technical team for maintenance?", a: "No. BazzAI is a fully managed platform. We handle the orchestration, scaling, and model tuning. Your team simply orchestrates the business logic via our dashboard — no engineers required." },
    { cat: 'implementation', q: "What is your uptime SLA?", a: "We guarantee 99.9% uptime for our core orchestration engine. Our Enterprise tier includes a 99.99% 'High Availability' SLA with dedicated compute resources and a financial penalty clause for downtime." },
    { cat: 'implementation', q: "How do we verify the AI's accuracy?", a: "We use 'Human-in-the-Loop' thresholds. Any output with a confidence score below 95% is automatically routed to your staff for verification before action is taken. This ensures 100% production-safe results." },
    { cat: 'implementation', q: "Can we use our own API keys (BYOK)?", a: "Yes. 'Bring Your Own Key' (BYOK) is supported for Enterprise clients who want to leverage their existing committed spend with OpenAI, Anthropic, or Google Cloud." },
    { cat: 'implementation', q: "How do you handle workflow version control?", a: "Every workflow has a full version history. You can roll back to any previous state in seconds, and we support staging environments for testing before pushing to production." },
    { cat: 'implementation', q: "What coding languages are supported for custom scripts?", a: "Custom automation nodes support JavaScript/Node.js and Python. Our architects handle the heavy lifting, but your team can modify logic if desired with full access to the underlying workflow config." },
    { cat: 'implementation', q: "What happens if the implementation is delayed?", a: "Our agile framework includes a formal change management process. If delays arise from scope changes, we update the roadmap with full transparency. We absorb internal delays — client-side delays may shift the timeline jointly agreed in Week 1." },

    // PRICING & CONTRACTS
    { cat: 'pricing', q: "Is there an upfront implementation fee?", a: "Yes. We charge a one-time 'Discovery & Setup' fee covering the 8-week implementation process, custom integration development, staff training, and documentation. This is a fixed price, agreed before work begins." },
    { cat: 'pricing', q: "How is the recurring cost calculated?", a: "Pricing is based on Platform Seat (users) and Task Volume (number of AI-orchestrated actions). This ensures you only pay for the value you receive — as automation scales, per-task cost decreases." },
    { cat: 'pricing', q: "Are there any hidden costs?", a: "No. Unless you are using BYOK, all LLM token costs and API hosting fees are bundled into your per-task pricing. The price you see in Month 1 is the price in Month 12, barring volume tier changes." },
    { cat: 'pricing', q: "Do you offer a free trial?", a: "We don't offer a generic trial because every enterprise setup is unique. Instead, we offer a 30-day Pilot Phase with a money-back guarantee if we don't hit the agreed-upon KPIs from Week 1." },
    { cat: 'pricing', q: "Can we upgrade or downgrade plans?", a: "Yes. You can move between tiers at any time with 30 days' notice. Volume discounts are automatically applied as your task volume scales up." },
    { cat: 'pricing', q: "What payment methods do you accept?", a: "We accept all major credit cards, Stripe, M-Pesa Business, and bank transfers (SWIFT/Wire) for Enterprise annual contracts." },
    { cat: 'pricing', q: "What happens if we exceed our task limit?", a: "We don't cut off your service. Excess tasks are billed at a flat overage rate, and our team will proactively reach out to help you move to a more cost-effective higher tier before overage becomes recurring." },

    // ROI & VALUE
    { cat: 'roi', q: "What is the typical payback period?", a: "Most clients achieve full payback (where savings exceed investment) within 3 to 6 months of going live. Our average Year 1 ROI across all verticals is 350%." },
    { cat: 'roi', q: "How do you measure and report ROI?", a: "You receive a real-time ROI Tracking Dashboard from Day 1. It tracks hours saved, error rate reduction, and task cost-per-automation against your baseline. Monthly reports quantify dollar value delivered." },
    { cat: 'roi', q: "What is the minimum ROI we can expect?", a: "We target a minimum 200% Year 1 ROI in our proposal. If our feasibility assessment doesn't project at least that threshold, we'll tell you upfront — and may recommend starting with a smaller pilot scope." },
    { cat: 'roi', q: "How do you compare to hiring more staff?", a: "A full-time operations hire costs $35,000–$75,000/year in salary alone before benefits, training, and management overhead. BazzAI typically delivers 3-5x the throughput at 20–40% of the cost, while operating 24/7." },
    { cat: 'roi', q: "Do you offer ROI guarantees?", a: "Yes. For Enterprise clients, we include a KPI Performance Clause in the SOW: if we don't hit agreed accuracy and efficiency targets within 60 days, you receive a 30-day fee waiver." },
    { cat: 'roi', q: "What ROI metrics should we set as a baseline?", a: "We typically measure: hours/week on manual tasks, error rate per process, response time per customer interaction, and cost per completed transaction. We help you establish every baseline in Phase 1 Discovery." },

    // LOCK-IN & PORTABILITY
    { cat: 'lockin', q: "Are we locked into BazzAI forever?", a: "No. All custom workflow JSON files and automation logic built during your implementation are owned by your company. You can export and migrate your configurations at any time." },
    { cat: 'lockin', q: "What happens to our data if we cancel?", a: "Upon cancellation, we provide a full data export (all records, logs, and workflow configs) within 5 business days. After 30 days, all data is permanently deleted from our servers per our data retention policy." },
    { cat: 'lockin', q: "Can we move to another provider if we're unhappy?", a: "Yes. Because we build on open standards (n8n, REST APIs, PostgreSQL), your workflows are portable. We even have a migration framework to help you transition to another orchestration platform if needed." },
    { cat: 'lockin', q: "What is the minimum contract length?", a: "Our minimum contract is month-to-month for SMBs and 12 months for Enterprise. Annual commitments come with a 15–25% platform discount." },
    { cat: 'lockin', q: "What is the cancellation notice period?", a: "We require 30 days' written notice for monthly plans and 90 days for annual Enterprise contracts. There are no early-termination fees for standard plan changes." },

    // COMPETITIVE POSITIONING
    { cat: 'competitive', q: "How is BazzAI different from Zapier or Make?", a: "Zapier and Make are workflow automation tools — they connect apps with pre-defined triggers and actions. BazzAI adds an intelligence layer: our AI agents can make decisions, handle exceptions, process unstructured data, and learn from outcomes. It's the difference between a conveyor belt and a smart employee." },
    { cat: 'competitive', q: "How is BazzAI different from hiring an AI consulting firm?", a: "Traditional AI consultants build you a model and leave. BazzAI is a managed service: we build, operate, monitor, and continuously optimize your AI infrastructure. You get ongoing value, not a one-time deliverable." },
    { cat: 'competitive', q: "How do you compare to Microsoft Copilot or Google Workspace AI?", a: "Copilot and Google AI are productivity overlays — they assist individual users. BazzAI automates entire operational pipelines across your organization's systems, working without constant human input." },
    { cat: 'competitive', q: "Why not build our AI in-house?", a: "In-house AI projects typically take 12–18 months, cost $500k+, and require hiring data scientists, ML engineers, and DevOps specialists. BazzAI delivers production-ready results in 8 weeks at a fraction of the cost, with zero internal hiring needed." },
    { cat: 'competitive', q: "What is your unique advantage in East Africa?", a: "We are the only AI automation provider with native M-Pesa integration, Swahili language support, WhatsApp-first architecture, and on-the-ground support in Nairobi. We understand the operational context of businesses across Kenya, Uganda, and beyond." },

    // CUSTOMER SUCCESS & SUPPORT
    { cat: 'support', q: "What does post-launch support look like?", a: "All clients receive a dedicated Customer Success Manager (CSM), monthly check-in calls, and access to our priority support channel. Enterprise clients get a 4-hour SLA response time and a named technical architect." },
    { cat: 'support', q: "How do we report a critical issue?", a: "Critical issues (production down, data anomaly) are escalated via our WhatsApp priority support line (+15558219787), which is monitored 24/7. Non-critical issues go through our standard helpdesk portal." },
    { cat: 'support', q: "Is training included?", a: "Yes. All implementations include 2 live training sessions (recorded for future reference), written runbooks for each workflow, and a custom admin guide for your Operations Lead." },
    { cat: 'support', q: "Do you offer ongoing optimization?", a: "Yes. Phase 4 of our framework is ongoing optimization — monthly performance reviews, quarterly business reviews, and proactive recommendations for new automations to add based on your evolving operations." },

    // INDUSTRY-SPECIFIC
    { cat: 'industry', q: "Do you support legal document automation?", a: "Yes. Our Bazz-Doc engine is specifically tuned for legal document types including contracts, intake forms, NDAs, and invoices. It extracts structured data with 98.6%+ accuracy and can route matters by type and jurisdiction automatically." },
    { cat: 'industry', q: "Can BazzAI work in healthcare with patient data?", a: "Yes. Our healthcare deployments include HIPAA-aligned data handling, encrypted messaging, PII scrubbing before LLM submission, and WhatsApp-based patient communication flows that comply with local health authority guidelines." },
    { cat: 'industry', q: "Does BazzAI support real estate lead qualification?", a: "Yes. Bazz-Connect is already deployed in commercial and residential real estate contexts for qualification (budget, location, timeline), viewing booking, and automated follow-ups via WhatsApp." },
    { cat: 'industry', q: "Can you serve financial services firms?", a: "Yes. For fintech and banking clients, we offer M-Pesa reconciliation, automated KYC document processing, and compliance-aware data flows. All AI models used are configured to meet CBK and relevant regional regulations." },
    { cat: 'industry', q: "Do you serve manufacturing companies?", a: "Yes. Our manufacturing deployments typically focus on RAG over telemetry/SCADA data, predictive inventory management (Holt-Winters forecasting), and shift report automation. See our Dakri Cartons case study for a reference deployment." },

    // GETTING STARTED
    { cat: 'getstarted', q: "How do I get started?", a: "The first step is a 30-minute 'Opportunity Assessment' call. We review your current workflows, identify the top 3 automation targets, and provide a feasibility report with a projected ROI within 48 hours — at no charge." },
    { cat: 'getstarted', q: "What do we need to prepare before our first meeting?", a: "Minimal preparation needed. It helps to have a rough idea of: (1) your top 2-3 manual bottlenecks, (2) the systems your team uses daily, and (3) a sense of team size and volume. We'll guide the rest in the session." },
    { cat: 'getstarted', q: "How quickly can we see results?", a: "Most clients see measurable improvement within the first 2 weeks of the Pilot Phase (Weeks 5-6). Full production ROI typically becomes visible in Month 2-3 after go-live." },
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
