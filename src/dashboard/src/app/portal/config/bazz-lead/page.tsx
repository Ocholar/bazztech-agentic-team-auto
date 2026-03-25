import { auth } from '../../../../../auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui-card";
import { Settings, Webhook, Smartphone, AlertCircle, Calendar, Bot } from "lucide-react";

export default async function BazzLeadConfig() {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const sub = await db.subscription.findFirst({
        where: { userId: session.user.id, productType: 'BAZZ_LEAD' }
    });

    const config = await db.productConfig.findFirst({
        where: { userId: session.user.id }
    });

    const isActive = sub?.status === 'ACTIVE';
    const amount = sub?.oneTimeFee || 2500;
    const refCode = sub?.paymentReference || `BAZ-PENDING`;

    return (
        <main className="flex min-h-screen flex-col p-8 bg-gray-50">
            <div className="mb-8 flex items-center justify-between border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                        <Settings className="text-orange-600" size={32} />
                        Bazz-Lead CRM Agent
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {isActive
                            ? "Configure lead qualification rules and meeting scheduling"
                            : "Activate your AI Sales Rep via Equity Bank Jenga API"}
                    </p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* --- EQUITY BANK PAYMENT INSTRUCTIONS --- */}
                {!isActive && (
                    <div className="md:col-span-1 lg:col-span-1 space-y-6">
                        <Card className="border-red-600 shadow-sm overflow-hidden text-center">
                            <CardHeader className="bg-red-50/50 border-b border-red-100">
                                <CardTitle className="flex items-center justify-center gap-2 text-red-800">
                                    <Smartphone size={20} />
                                    Account Activation
                                </CardTitle>
                                <CardDescription>
                                    Unlock Bazz-Lead Agent.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="p-4 bg-slate-900 rounded-lg text-white space-y-3 font-mono text-sm text-left">
                                    <div className="flex justify-between border-b border-slate-700 pb-2">
                                        <span className="text-slate-400">Paybill:</span>
                                        <span className="font-bold">247247</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-700 pb-2">
                                        <span className="text-slate-400">Account:</span>
                                        <span className="font-bold text-red-400">0290170458002</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-700 pb-2">
                                        <span className="text-slate-400">Ref:</span>
                                        <span className="font-bold text-orange-400">{refCode}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">KES Amount:</span>
                                        <span className="font-bold">{amount.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="text-center py-2 space-y-3">
                                    {sub ? (
                                        <div className="inline-flex items-center gap-2 text-xs font-medium text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200">
                                            <AlertCircle className="h-4 w-4" />
                                            Awaiting Payment Sync
                                        </div>
                                    ) : (
                                        <div className="inline-flex items-center gap-2 text-xs font-medium text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-200">
                                            No Subscription Found. Return to Hub to subscribe.
                                        </div>
                                    )}
                                    <p className="text-[10px] text-slate-500 italic px-4">
                                        This page will automatically unlock once Equity Bank confirms payment for Reference <b>{refCode}</b>.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                            <h4 className="font-semibold text-blue-900 mb-2">How it works</h4>
                            <p className="text-sm text-blue-800 mb-3">
                                1. Open your M-Pesa or Equity Mobile App.
                            </p>
                            <p className="text-sm text-blue-800 mb-3">
                                2. Pay KES {amount.toLocaleString()} to Paybill 247247 and use <b className="font-mono">{refCode}</b> as the account number.
                            </p>
                            <p className="text-sm text-blue-800">
                                3. Once detected by our Jenga Integration, Bazz-Lead will be unlocked instantly.
                            </p>
                        </div>
                    </div>
                )}

                {/* --- CONFIGURATION PORTAL --- */}
                {isActive && (
                    <div className="md:col-span-2 lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>1. AI Nurturing & Qualification Rules</CardTitle>
                                <CardDescription>How should the AI nurture raw prospects into qualified leads?</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">BANT Framework Rules (Budget, Authority, Need, Time)</label>
                                    <textarea
                                        rows={6}
                                        className="flex w-full rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-orange-600"
                                        defaultValue={config?.systemPrompt || "Ask the user about their monthly budget. If it is over 50,000 KES, mark them as HOT. Ensure you capture their email address and phone number before proceeding."}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>2. Meeting Scheduling & Pipeline Mgmt</CardTitle>
                                <CardDescription>How does the AI hand the conversation over to a human closer?</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Calendly / Booking Link</label>
                                    <input type="text" placeholder="https://calendly.com/your-business/30min" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-600" />
                                    <p className="text-[11px] text-gray-500">The AI answers questions and ONLY offers this link to Hot/Qualified leads. (Need one? <a href="https://calendly.com/signup" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-medium">Get a free Calendly account here</a>).</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">CRM Pipeline Sync URL</label>
                                    <input type="text" placeholder="https://api.hubapi.com/crm/v3/objects/contacts" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-600" />
                                    <p className="text-[11px] text-gray-500">Bazz-Lead will instantly structure and post qualified profiles straight to your external pipeline.</p>
                                </div>
                                <div className="flex justify-end pt-4 border-t">
                                    <button className="bg-orange-600 text-white px-8 py-2 rounded-md font-bold hover:bg-orange-700 transition flex items-center gap-2">
                                        <Bot size={16} /> Save CRM Agent Memory
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* --- ACTIVE WEBHOOK CONNECTION CARD ---  */}
                {isActive && (
                    <div className="md:col-span-2 lg:col-span-3">
                        <Card className="bg-slate-900 border-none text-white shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Webhook size={20} className="text-orange-400" />
                                    Bazz-Lead Webhook Destination
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Connect your Instagram or Facebook Lead Forms directly to this endpoint.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Social Media Ingress URL</p>
                                    <code className="block w-full bg-slate-950 text-orange-400 p-3 rounded font-mono text-sm break-all">
                                        https://n8n.bazztech.co.ke/webhook-test/ig-lead-{session.user.id.substring(0, 8)}
                                    </code>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </main>
    );
}
