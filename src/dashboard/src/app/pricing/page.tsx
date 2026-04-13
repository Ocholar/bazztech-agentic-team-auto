"use client";

import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-card';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ROICalculator from '@/components/ROICalculator';

const products = [
    { name: "Bazz-Connect", desc: "WhatsApp Sales AI", price: "$499/mo", useCase: "Automated Lead Nurturing & Sales" },
    { name: "Bazz-Flow", desc: "Finance Automation", price: "$499/mo", useCase: "Ledger Reconciliation & Invoicing" },
    { name: "Bazz-Doc", desc: "Document Processing", price: "$499/mo", useCase: "OCR & Automated Data Extraction" },
    { name: "Bazz-Lead", desc: "Lead Nurturing", price: "$499/mo", useCase: "CRM Intelligence & Routing" }
];

function PricingContent() {
    return (
        <main className="flex min-h-screen flex-col items-center py-20 px-8 bg-slate-50">
            {/* Hero Section */}
            <div className="max-w-4xl w-full text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
                    Transparent Pricing for <span className="text-blue-600">AI Automation</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 font-medium">
                    Enterprise-grade machine learning to reduce operational friction. Designed for the African market, built for global scale.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/portal?book=true" className="inline-flex justify-center flex-1 sm:flex-none items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-black text-white hover:bg-blue-700 shadow-xl transition-all hover:scale-[1.02] active:scale-95 group">
                        Book Free Assessment <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Pricing Tiers Structure */}
            <div className="w-full max-w-7xl mb-24 flex flex-col lg:flex-row gap-8 items-stretch">

                {/* 1) SMB Tier Block */}
                <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-8 shadow-lg flex flex-col">
                    <div className="mb-8">
                        <h2 className="text-3xl font-black text-slate-900 mb-2">Standard SaaS Tier</h2>
                        <p className="text-slate-500 font-medium text-lg">Deploy modular AI products instantly. Best for SMBs setting up standard automations.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {products.map((p, idx) => (
                            <Card key={idx} className="border-slate-200 border-2 shadow-sm bg-slate-50 relative hover:-translate-y-1 transition-transform duration-300">
                                <CardHeader className="text-center pt-6 pb-4 border-b border-slate-200/60 bg-white rounded-t-xl">
                                    <CardTitle className="text-lg font-black text-slate-900">{p.name}</CardTitle>
                                    <CardDescription className="text-slate-500 font-bold text-xs">{p.desc}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 flex flex-col items-center">
                                    <span className="text-3xl font-black text-slate-900 mb-1">{p.price}</span>
                                    <p className="text-xs font-medium text-slate-500 text-center mb-6 h-8 flex items-center justify-center">
                                        {p.useCase}
                                    </p>
                                    <Link href={`/register?product=${p.name}`} className="w-full text-center py-2.5 bg-slate-900 text-white hover:bg-slate-800 font-bold text-sm rounded-xl transition-colors">
                                        Select
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Bundle Savings Mini-Banner */}
                    <div className="mt-auto bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center">
                        <p className="text-blue-900 font-medium text-sm">
                            Unlock a <strong className="text-blue-700">15% Multi-Product Discount</strong> when you bundle 2+ modules.
                        </p>
                    </div>
                </div>

                {/* 2) Enterprise Tier Block */}
                <div className="lg:w-[450px] bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl text-white relative flex flex-col justify-between overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-1/4 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none" />

                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6 w-max">
                            Validated by Dakri Cartons
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">Enterprise<br />Architecture</h2>
                        <p className="text-slate-400 font-medium mb-10 text-sm leading-relaxed">
                            Full domain-aware intelligence pipelines integrating RAG, logic orchestration, and predictive forecasting.
                        </p>

                        <div className="space-y-4 mb-10 relative z-10">
                            <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-sm">
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Implementation Fee</span>
                                <span className="text-2xl font-black text-white">Starts at $15k</span>
                            </div>
                            <div className="bg-emerald-500/10 rounded-2xl p-5 border border-emerald-500/30 backdrop-blur-sm">
                                <span className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Managed Retainer</span>
                                <span className="text-2xl font-black text-emerald-400">Starts at $2,500/mo</span>
                                <p className="text-[10px] text-slate-300 mt-2 font-medium">Includes dedicated Vector DBs, LLM inference costs, and ongoing optimization.</p>
                            </div>
                        </div>
                    </div>

                    <Link href="/enterprise" className="w-full text-center py-4 bg-emerald-500 text-slate-900 hover:bg-emerald-400 font-black rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95 duration-200 uppercase tracking-wider text-sm relative z-10">
                        View Enterprise Playbook
                    </Link>
                </div>
            </div>

            {/* Section 2: ROI Calculator */}
            <div className="w-full max-w-5xl mb-24">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Prove the ROI Before You Buy.</h2>
                    <p className="text-slate-600 mt-2 font-medium">Use our interactive estimator to calculate your 3-year net benefit.</p>
                </div>
                <ROICalculator />
            </div>

            {/* Section 4: Implementation Cost + Timeline */}
            <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-lg mb-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">The Execution Guarantee</h2>
                    <p className="text-slate-600 mt-2 font-medium">Clear roadmaps. No endless consulting retainers.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                <span className="font-black text-xl">1</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-slate-900">Discovery & Architecture</h4>
                                <p className="text-slate-500 text-sm mt-1">Weeks 1-2 • Validating workflows and data mapping.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                <span className="font-black text-xl">2</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-slate-900">Design & Integration</h4>
                                <p className="text-slate-500 text-sm mt-1">Weeks 3-4 • Building the automated pipelines with your infrastructure.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                <span className="font-black text-xl">3</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-slate-900">Deployment & Pilot</h4>
                                <p className="text-slate-500 text-sm mt-1">Weeks 5-8 • Go-live, real-world data validation, and handoff.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col justify-center">
                        <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4">Typical Setup Framework</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                                <span className="text-slate-600 font-medium">Time to Value</span>
                                <span className="font-black text-slate-900">4-8 Weeks</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                                <span className="text-slate-600 font-medium">Implementation Range</span>
                                <span className="font-black text-slate-900">$15k - $30k</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600 font-medium">Ongoing Ops Burden</span>
                                <span className="font-black text-green-600">Low (BazzAI owns it)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: FAQ */}
            <div className="w-full max-w-3xl mb-24">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight text-center mb-10">Frequently Asked Questions</h2>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-black text-slate-900 text-lg mb-2">Do you charge setup/implementation fees?</h4>
                        <p className="text-slate-600">Yes, typical implementation is $15k–30k depending on complexity. This includes discovery, design, deployment, training, and continuous optimization.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-black text-slate-900 text-lg mb-2">What is the pricing for Enterprise clients?</h4>
                        <p className="text-slate-600">Enterprise clients undergo custom architecture design consisting of an implementation baseline (starting at $15k) followed by a managed retainer ($2,500+/mo) to handle data drift, compute costs, and LLM API fees.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-black text-slate-900 text-lg mb-2">What's the minimum contract term?</h4>
                        <p className="text-slate-600">No lock-in. Month-to-month for standard implementations. Enterprise customers typically sign annual agreements to take advantage of volume discounts and dedicated support.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-black text-slate-900 text-lg mb-2">Can we scale up or down?</h4>
                        <p className="text-slate-600">Yes. Scale up anytime to add more products to your suite. Scale down with 30 days notice.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-black text-slate-900 text-lg mb-2">What if we want to leave?</h4>
                        <p className="text-slate-600">We don't hold your workflows hostage. We will export your automations and training data. No lock-in penalties.</p>
                    </div>
                </div>
            </div>

        </main>
    );
}

export default function PricingPage() {
    return (
        <Suspense fallback={null}>
            <PricingContent />
        </Suspense>
    );
}
