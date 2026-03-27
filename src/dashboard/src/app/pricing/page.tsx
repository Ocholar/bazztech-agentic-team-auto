"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-card';
import { Check, Info, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const PRODUCT_LABELS: Record<string, string> = {
    BAZZ_CONNECT: 'Bazz-Connect (WhatsApp AI)',
    BAZZ_FLOW: 'Bazz-Flow (M-Pesa ERP)',
    BAZZ_DOC: 'Bazz-Doc (AI Documents)',
    BAZZ_LEAD: 'Bazz-Lead (CRM Agent)',
};

function PricingContent() {
    const [tier, setTier] = useState<'MICRO' | 'SMALL' | 'MEDIUM'>('MICRO');
    const searchParams = useSearchParams();
    const productParam = searchParams.get('product') || '';
    const productLabel = PRODUCT_LABELS[productParam] || 'BazzAI';

    const pricing = {
        MICRO: { size: '1-5 employees', price: 1500, maintenance: 300 },
        SMALL: { size: '6-20 employees', price: 3000, maintenance: 600 },
        MEDIUM: { size: '21-50 employees', price: 5000, maintenance: 1000 },
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-white">
            <div className="max-w-4xl w-full text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 border-b pb-4 mb-4">
                    {productLabel} — <span className="text-red-600">Simple, Tiered Pricing.</span>
                </h1>
                <p className="text-lg text-slate-600">
                    BazzAI scales with your business. Pay a one-time setup fee, then a 20% flat monthly maintenance to keep your AI Brain active.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full">
                {/* Calculator Card */}
                <Card className="md:col-span-1 border-slate-200 shadow-xl lg:col-span-1">
                    <CardHeader className="bg-slate-50 border-b border-slate-100">
                        <CardTitle className="text-slate-900">Select Business Size</CardTitle>
                        <CardDescription>We offer flexible fees for MSMEs.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="space-y-4">
                            {(['MICRO', 'SMALL', 'MEDIUM'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTier(t)}
                                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${tier === t
                                            ? "border-red-600 bg-red-50 ring-2 ring-red-100"
                                            : "border-slate-100 bg-white hover:border-slate-200"
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`font-bold ${tier === t ? "text-red-700" : "text-slate-900"}`}>{t}</span>
                                        {tier === t && <Check className="text-red-600 h-4 w-4" />}
                                    </div>
                                    <div className="text-xs text-slate-500 flex items-center gap-1">
                                        <Users size={12} /> {pricing[t].size}
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="flex items-start gap-2 text-xs text-slate-500 bg-blue-50 p-3 rounded border border-blue-100">
                            <Info size={16} className="text-blue-600 shrink-0" />
                            <span>Monthly maintenance is fixed at 20% of your initial setup fee.</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Result Card */}
                <Card className="md:col-span-1 lg:col-span-2 border-red-600 border-2 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-6 py-1 rotate-45 translate-x-4 translate-y-2 uppercase tracking-widest">
                        Selected
                    </div>
                    <CardHeader className="text-center pt-10">
                        <CardTitle className="text-3xl font-bold">Your {tier} {productLabel} Bundle</CardTitle>
                        <CardDescription className="text-lg">One-time payment + monthly upkeep</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8 px-10">
                        <div className="flex justify-center gap-4">
                            <div className="text-center border-r pr-8">
                                <span className="block text-4xl font-black text-slate-900">KES {pricing[tier].price.toLocaleString()}</span>
                                <span className="text-xs font-bold text-red-600 uppercase tracking-tighter">One-Time Fee</span>
                            </div>
                            <div className="text-center pl-4">
                                <span className="block text-4xl font-black text-slate-900">KES {pricing[tier].maintenance.toLocaleString()}</span>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Monthly (20%)</span>
                            </div>
                        </div>

                        <ul className="space-y-3 pt-6 border-t border-slate-100">
                            <li className="flex items-center gap-2 text-sm text-slate-700">
                                <Check className="text-green-600 h-4 w-4" /> 24/7 Autonomous WhatsApp FrontDesk
                            </li>
                            <li className="flex items-center gap-2 text-sm text-slate-700">
                                <Check className="text-green-600 h-4 w-4" /> Personalized AI "Brain" with long-memory
                            </li>
                            <li className="flex items-center gap-2 text-sm text-slate-700">
                                <Check className="text-green-600 h-4 w-4" /> Dedicated Equity Jenga Payment Ref
                            </li>
                            <li className="flex items-center gap-2 text-sm text-slate-700">
                                <Check className="text-green-600 h-4 w-4" /> CRM Dashboard with Lead Progression
                            </li>
                        </ul>

                        <div className="pt-6">
                            <Link href={`/register${productParam ? `?product=${productParam}` : ''}`} className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-red-600 px-6 py-4 text-lg font-bold text-white hover:bg-red-700 shadow-lg shadow-red-200 transition-transform active:scale-95">
                                Start Your Onboarding <ArrowRight size={20} />
                            </Link>
                        </div>
                    </CardContent>
                </Card>
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
