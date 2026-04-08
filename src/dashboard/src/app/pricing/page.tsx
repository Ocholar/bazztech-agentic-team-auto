"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-card';
import { Check, Info, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PayPalButton from '@/components/paypal-button';

const PRODUCT_LABELS: Record<string, string> = {
    BAZZ_CONNECT: 'Bazz-Connect (WhatsApp AI)',
    BAZZ_FLOW: 'Bazz-Flow (M-Pesa ERP)',
    BAZZ_DOC: 'Bazz-Doc (AI Documents)',
    BAZZ_LEAD: 'Bazz-Lead (CRM Agent)',
};

function PricingContent() {
    const [currency, setCurrency] = useState<'KES' | 'USD'>('KES');
    const searchParams = useSearchParams();
    const productParam = searchParams.get('product') || '';
    const productLabel = PRODUCT_LABELS[productParam] || 'BazzAI';

    const [quantity, setQuantity] = useState(1);

    const pricing = {
        KES: { price: 4999, maintenance: 1249, label: 'Kenyan Shilling' },
        USD: { price: 49.99, maintenance: 12.49, label: 'US Dollar', paypalId: 'LA2KMANSS6H86' },
    };

    const totalPrice = (pricing.USD.price * quantity).toFixed(2);
    const clientId = "Ac_knSPsvEXZOg5rutYAGm5gY91z5pbdb6ayhQKe8E1fJkq1tqYDpKCOhtDH5slgZzZN0FNHkezcBSaz";

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-white">
            <div className="max-w-4xl w-full text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
                    {productLabel} — <span className="text-red-600">Global Flat-Rate.</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Simple, transparent pricing for global enterprise automation. No tiers, no complexity—just results.
                </p>
            </div>

            <div className="flex flex-col gap-8 max-w-4xl w-full">
                {/* Currency Toggle */}
                <div className="bg-slate-100 p-1.5 rounded-2xl flex self-center shadow-inner">
                    {(['KES', 'USD'] as const).map((c) => (
                        <button
                            key={c}
                            onClick={() => setCurrency(c)}
                            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${currency === c
                                ? "bg-white text-slate-900 shadow-md scale-100"
                                : "text-slate-500 hover:text-slate-700 scale-95"
                                }`}
                        >
                            {c === 'KES' ? 'Kenya (KES)' : 'Global (USD)'}
                        </button>
                    ))}
                </div>

                {/* Unified Pricing Card */}
                <Card className="border-red-600 border-2 shadow-2xl relative overflow-hidden bg-white">
                    <div className="absolute top-6 right-6 bg-red-50 text-red-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-red-100">
                        Enterprise Access
                    </div>

                    <CardHeader className="text-center pt-16 pb-10 border-b border-slate-50">
                        <CardTitle className="text-3xl font-black text-slate-900">Your {productLabel} Bundle</CardTitle>
                        <CardDescription className="text-slate-500 font-medium">Flat-rate setup with 25% autonomous maintenance</CardDescription>
                    </CardHeader>

                    <CardContent className="p-0">
                        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                            {/* Setup Fee */}
                            <div className="p-12 text-center flex flex-col items-center gap-2">
                                <span className="text-xs font-black text-red-600 uppercase tracking-widest mb-2">One-Time Setup</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-slate-900">
                                        {currency === 'KES' ? 'KES' : '$'}{pricing[currency].price.toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-xs font-bold mt-2">Full Deployment & Integration</p>
                            </div>

                            {/* Maintenance Fee */}
                            <div className="p-12 text-center flex flex-col items-center gap-2 bg-slate-50/50">
                                <span className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Monthly Maintenance</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-slate-900">
                                        {currency === 'KES' ? 'KES' : '$'}{pricing[currency].maintenance.toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-xs font-bold mt-2">25% Continuous Optimization</p>
                            </div>
                        </div>

                        <div className="p-12 space-y-8 bg-white">
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    'Global n8n Workflow Synchronization',
                                    'Cloud Hosting & Token Management',
                                    'Multi-Tenant AI Memory (RAG)',
                                    'API Security & Handshake Monitoring',
                                    'Priority Lead Routing',
                                    'Autonomous Reconciliation Sync'
                                ].map((f, i) => (
                                    <div key={i} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                                        <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        {f}
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-slate-100">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Setup Units (Quantity)</span>
                                        <select
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            title="Number of agent slots to purchase"
                                            className="bg-white border border-slate-300 rounded-lg px-3 py-1 font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                                        >
                                            {[1, 2, 3, 4].map(n => (
                                                <option key={n} value={n}>{n} Agent Slot{n > 1 ? 's' : ''}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <Link href={`/register?product=${productParam || ''}&currency=${currency}&qty=${quantity}`} className="w-full inline-flex justify-center items-center gap-3 rounded-2xl bg-slate-900 px-8 py-5 text-xl font-black text-white hover:bg-red-600 shadow-xl transition-all hover:scale-[1.02] active:scale-95 group text-center">
                                        Start Your Global Onboarding <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                        Total: {currency === 'KES' ? 'KES' : '$'}{((currency === 'KES' ? pricing.KES.price : pricing.USD.price) * quantity).toLocaleString()} {currency} — Instant activation after payment verification
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Comparison / Global Context */}
                <div className="grid md:grid-cols-3 gap-6 text-center">
                    {[
                        { title: 'Zero Complexity', desc: 'One flat rate regardless of your business size. Scale without worrying about billable hours.' },
                        { title: 'Global Standards', desc: 'Secure, enterprise-grade AI infrastructure deployed to your preferred region.' },
                        { title: 'Fixed Maintenance', desc: 'Continuous updates and monitoring fixed at 25% of your initial setup.' }
                    ].map((item, i) => (
                        <div key={i} className="p-6">
                            <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-wide">{item.title}</h4>
                            <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
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
