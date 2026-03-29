import { auth } from '../../../../../auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui-card";
import { Zap, Webhook, AlertCircle, Database } from "lucide-react";
import { saveProductConfig, saveApiKeys, createPendingSubscription } from '../actions';
import { PaymentVerification } from '@/components/payment-verification';
import { TestAgentButton } from '@/components/test-agent-button';

export default async function BazzFlowConfig() {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        redirect('/login');
    }
    const sub = await db.subscription.findFirst({
        where: { userId: session.user.id, productType: 'BAZZ_FLOW' }
    });

    const config = await db.productConfig.findFirst({
        where: { userId: session.user.id }
    });

    const isActive = sub?.status === 'ACTIVE';
    const amount = sub?.oneTimeFee || 2500;

    return (
        <main className="flex min-h-screen flex-col p-8 bg-gray-50">
            <div className="mb-8 flex items-center justify-between border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                        <Zap className="text-blue-600" size={32} />
                        Bazz-Flow M-Pesa Integration
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {isActive
                            ? "Configure your Daraja 3.0 API keys and ERP Webhooks"
                            : "Activate your precise M-Pesa automation pipeline via Equity Bank Jenga API"}
                    </p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* --- PAYMENT VERIFICATION --- */}
                {!isActive && sub && (
                    <div className="md:col-span-1 lg:col-span-1 space-y-4">
                        <PaymentVerification
                            subscriptionId={sub.id}
                            productName="Bazz-Flow"
                            amount={amount}
                            status={sub.status as any}
                            expiresAt={sub.expiresAt?.toISOString()}
                        />
                    </div>
                )}
                {!isActive && !sub && (
                    <div className="md:col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-2 text-sm font-medium text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-200">
                            <AlertCircle size={16} />
                            No Subscription Found. Return to Hub to subscribe.
                        </div>
                    </div>
                )}

                {/* --- CONFIGURATION PORTAL --- */}
                {isActive && (
                    <div className="md:col-span-2 lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>1. Daraja API Credentials</CardTitle>
                                <CardDescription>Connect Bazz-Flow to your Safaricom Developer Portal App</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form action={saveApiKeys} className="space-y-4">
                                    <input type="hidden" name="configId" value={config?.id || ""} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2 col-span-2 md:col-span-1">
                                            <label className="text-sm font-medium">Consumer Key</label>
                                            <input type="password" name="darajaConsumerKey" placeholder="Enter Daraja Consumer Key..." className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600" defaultValue={config?.darajaConsumerKey || ""} />
                                            <p className="text-[10px] text-gray-500 leading-tight">From your <a href="https://developer.safaricom.co.ke/MyApps" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Safaricom Developer Portal App</a>.</p>
                                        </div>
                                        <div className="space-y-2 col-span-2 md:col-span-1">
                                            <label className="text-sm font-medium">Consumer Secret</label>
                                            <input type="password" name="darajaConsumerSecret" placeholder="Enter Daraja Consumer Secret..." className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600" defaultValue={config?.darajaConsumerSecret || ""} />
                                        </div>
                                        <div className="space-y-2 col-span-2 md:col-span-1">
                                            <label className="text-sm font-medium">Paybill / Till Shortcode</label>
                                            <input type="text" name="darajaShortcode" placeholder="e.g 400123" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600" defaultValue={config?.darajaShortcode || ""} />
                                        </div>
                                        <div className="space-y-2 col-span-2 md:col-span-1">
                                            <label className="text-sm font-medium">Passkey</label>
                                            <input type="password" name="darajaPasskey" placeholder="Enter Daraja Passkey..." className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600" defaultValue={config?.darajaPasskey || ""} />
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t">
                                        <button className="bg-blue-600 text-white px-8 py-2 rounded-md font-bold hover:bg-blue-700 transition flex items-center gap-2">
                                            <Zap size={16} /> Save Daraja Credentials
                                        </button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>2. ERP Ledger Sync & SMS Alerts</CardTitle>
                                <CardDescription>Where should Bazz-Flow push ledger updates and trigger SMS confirmations?</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Main ERP / Ledger Webhook</label>
                                    <input type="text" placeholder="https://your-crm.com/webhook/mpesa" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600" />
                                    <p className="text-xs text-slate-500">We will instantly sync matched payments to your ledger with zero errors.</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Instant SMS Gateway Key (Optional)</label>
                                    <input type="password" placeholder="e.g. Twilio or Africa's Talking API Key" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600" />
                                    <p className="text-xs text-slate-500">Trigger instantaneous SMS alerts to the payer upon successful matching.</p>
                                </div>
                                <div className="flex justify-end pt-4 border-t">
                                    <button className="bg-slate-900 text-white px-8 py-2 rounded-md font-bold hover:bg-slate-800 transition flex items-center gap-2">
                                        <Database size={16} /> Update Routing
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* --- ACTIVE WEBHOOK CONNECTION CARD --- */}
                {isActive && (
                    <div className="md:col-span-1 lg:col-span-1 space-y-6">
                        <Card className="bg-slate-900 border-none text-white shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Webhook size={20} className="text-blue-400" />
                                    1. Validation Webhook
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Set this URL in your Daraja Portal.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">C2B Confirmation URL</p>
                                    <code className="block w-full bg-slate-950 text-blue-400 p-3 rounded font-mono text-[10px] break-all">
                                        https://n8n.bazztech.co.ke/webhook/bazz-flow-{session.user.id.substring(0, 8)}
                                    </code>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold">2. Test Connection</CardTitle>
                                <CardDescription>Verify your M-Pesa pipeline.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <TestAgentButton />
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </main>
    );
}
