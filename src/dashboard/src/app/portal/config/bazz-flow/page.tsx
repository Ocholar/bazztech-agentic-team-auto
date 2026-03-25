import { auth } from '../../../../../auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui-card";
import { Zap, Webhook, Smartphone, AlertCircle, Database } from "lucide-react";

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
    const refCode = sub?.paymentReference || `BAZ-PENDING`;

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
                                    Unlock Bazz-Flow M-Pesa.
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
                                        <span className="font-bold text-blue-400">{refCode}</span>
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
                                3. Once detected by our Jenga Integration, Bazz-Flow will be unlocked instantly.
                            </p>
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
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2 col-span-2 md:col-span-1">
                                        <label className="text-sm font-medium">Consumer Key</label>
                                        <input type="password" placeholder="Enter Daraja Consumer Key..." className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600" />
                                        <p className="text-[10px] text-gray-500 leading-tight">From your <a href="https://developer.safaricom.co.ke/MyApps" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Safaricom Developer Portal App</a>.</p>
                                    </div>
                                    <div className="space-y-2 col-span-2 md:col-span-1">
                                        <label className="text-sm font-medium">Consumer Secret</label>
                                        <input type="password" placeholder="Enter Daraja Consumer Secret..." className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600" />
                                        <p className="text-[10px] text-gray-500 leading-tight">From your <a href="https://developer.safaricom.co.ke/MyApps" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Safaricom Developer Portal App</a>.</p>
                                    </div>
                                    <div className="space-y-2 col-span-2 md:col-span-1">
                                        <label className="text-sm font-medium">Paybill / Till Shortcode</label>
                                        <input type="text" placeholder="e.g 400123" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600" />
                                    </div>
                                    <div className="space-y-2 col-span-2 md:col-span-1">
                                        <label className="text-sm font-medium">Passkey</label>
                                        <input type="password" placeholder="Enter Daraja Passkey..." className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600" />
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4 border-t">
                                    <button className="bg-blue-600 text-white px-8 py-2 rounded-md font-bold hover:bg-blue-700 transition flex items-center gap-2">
                                        <Zap size={16} /> Save Daraja Credentials
                                    </button>
                                </div>
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

                {/* --- ACTIVE WEBHOOK CONNECTION CARD ---  */}
                {isActive && (
                    <div className="md:col-span-2 lg:col-span-3">
                        <Card className="bg-slate-900 border-none text-white shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Webhook size={20} className="text-blue-400" />
                                    Bazz-Flow Validation Webhook
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Set this URL in your Daraja Developer Portal for C2B Validation/Confirmation.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">C2B Confirmation URL</p>
                                    <code className="block w-full bg-slate-950 text-blue-400 p-3 rounded font-mono text-sm break-all">
                                        https://n8n.bazztech.co.ke/webhook/bazz-flow-{session.user.id.substring(0, 8)}
                                    </code>
                                    <p className="text-[11px] text-slate-400 mt-2 hover:text-slate-300 transition-colors">
                                        Register this URL at your <a href="https://developer.safaricom.co.ke/test_credentials" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-medium">Daraja Portal API endpoints</a> to receive real-time M-Pesa IPN callbacks.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </main>
    );
}
