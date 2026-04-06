import { auth } from '../../../../../auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui-card";
import { Zap, CreditCard, Link as LinkIcon, ShieldCheck, PlusCircle } from "lucide-react";
import { saveProductConfig, createPendingSubscription, saveApiKeys } from '../actions';

export default async function BazzFlowConfig() {
    const session = await auth();
    if (!session || !session.user) redirect('/login');

    const user = await db.user.findUnique({ where: { id: session.user.id } });
    const isAdmin = (session.user as any)?.role === 'ADMIN' || user?.role === 'ADMIN' || session.user.email === 'reaochola@gmail.com';

    const sub = await db.subscription.findFirst({
        where: { userId: session.user.id, productType: 'BAZZ_FLOW' }
    });

    const config = await db.productConfig.findFirst({
        where: { userId: session.user.id, productType: 'BAZZ_FLOW' }
    });

    const isActive = isAdmin || sub?.status === 'ACTIVE';
    const amount = sub?.oneTimeFee || 4999;

    return (
        <main className="flex min-h-screen flex-col p-8 bg-gray-50">
            <div className="mb-8 flex items-center justify-between border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                        <CreditCard className="text-blue-600" size={32} />
                        Bazz-Flow Unified (Fintech Sync)
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {isActive
                            ? "Configure your autonomous fintech reconciliation engine"
                            : "Unlock M-Pesa, Stripe, and PayPal ERP synchronization"}
                    </p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* --- ACTIVATION CARD --- */}
                {!isActive && (
                    <div className="md:col-span-1 lg:col-span-1">
                        <form action={createPendingSubscription.bind(null, 'BAZZ_FLOW')} className="space-y-4">
                            <Card className="border-blue-200 bg-blue-50/50 shadow-sm border-2">
                                <CardHeader>
                                    <CardTitle className="text-blue-900">Activate Bazz-Flow</CardTitle>
                                    <CardDescription>Target: M-Pesa + Stripe + PayPal Sync</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm text-blue-800">
                                    <p>Unlock autonomous ledger reconciliation to your ERP (QuickBooks, Xero, etc.)</p>
                                    <div className="bg-white p-3 rounded border border-blue-200 font-mono text-xs">
                                        Amount: KES {amount.toLocaleString()} / $49.99
                                    </div>
                                    <button className="w-full inline-flex justify-center items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-xl shadow-lg transition-all active:scale-95">
                                        <PlusCircle size={18} />
                                        Unlock Bazz-Flow Slot
                                    </button>
                                </CardContent>
                            </Card>
                        </form>
                    </div>
                )}

                {/* --- CONFIGURATION PORTAL --- */}
                {isActive && (
                    <div className="md:col-span-2 lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShieldCheck className="text-blue-600" size={20} />
                                    1. Fintech API Integration (Stripe, PayPal, Daraja)
                                </CardTitle>
                                <CardDescription>Input your payment gateway credentials for real-time ledger sync.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form action={saveApiKeys} className="space-y-4">
                                    <input type="hidden" name="configId" value={config?.id || ""} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">API Key / Client ID</label>
                                            <input type="text" name="darajaConsumerKey" defaultValue={config?.darajaConsumerKey || ""} className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="e.g. pk_live_..." />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">API Secret / Client Secret</label>
                                            <input type="password" name="darajaConsumerSecret" defaultValue={config?.darajaConsumerSecret || ""} className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="••••••••" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Account / Shortcode</label>
                                            <input type="text" name="darajaShortcode" defaultValue={config?.darajaShortcode || ""} className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Merchant ID or Paybill..." />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Access Passkey (if required)</label>
                                            <input type="text" name="darajaPasskey" defaultValue={config?.darajaPasskey || ""} className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Gateway specific passkey..." />
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t">
                                        <button className="bg-blue-600 text-white px-8 py-2 rounded-md font-bold hover:bg-blue-700 transition">Save Fintech Credentials</button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <LinkIcon className="text-slate-900" size={20} />
                                    2. ERP Webhook Destination
                                </CardTitle>
                                <CardDescription>Where should Bazz-Flow send synchronized ledger entries?</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <form action={saveApiKeys} className="space-y-4">
                                    <input type="hidden" name="configId" value={config?.id || ""} />
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target ERP Webhook URL</label>
                                        <input type="url" name="erpWebhookUrl" defaultValue={config?.erpWebhookUrl || ""} className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="https://quickbooks.api.com/sync..." />
                                        <p className="text-[10px] text-slate-400">Validated JSON payloads will be POSTed here for instant ledger updates.</p>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t">
                                        <button className="bg-slate-900 text-white px-8 py-2 rounded-md font-bold hover:bg-slate-800 transition flex items-center gap-2">
                                            <Zap size={14} /> Enable Autonomous Sync
                                        </button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </main>
    );
}
