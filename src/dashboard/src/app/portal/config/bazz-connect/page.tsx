import { auth } from '../../../../../auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui-card";
import { MessageSquare, Webhook, Smartphone, CheckCircle2, Zap, AlertCircle, PlusCircle } from "lucide-react";
import { saveProductConfig, createPendingSubscription, saveApiKeys } from '../actions';
import { revalidatePath } from 'next/cache';

export default async function BazzConnectConfig() {
    const session = await auth();
    if (!session || !session.user) redirect('/login');

    const sub = await db.subscription.findFirst({
        where: { userId: session.user.id, productType: 'BAZZ_CONNECT' }
    });

    const config = await db.productConfig.findFirst({
        where: { userId: session.user.id } // Ideally tied to the subscription, but we'll use user's first config for now
    });

    const isActive = sub?.status === 'ACTIVE';
    const amount = sub?.oneTimeFee || 2500;
    const refCode = sub?.paymentReference || `BAZ-PENDING`;

    return (
        <main className="flex min-h-screen flex-col p-8 bg-gray-50">
            <div className="mb-8 flex items-center justify-between border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                        <MessageSquare className="text-green-600" size={32} />
                        Bazz-Connect Subscription
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {isActive
                            ? "Fine-tune your autonomous WhatsApp FrontDesk Agent"
                            : "Activate your AI Digital Employee via Equity Bank Jenga API"}
                    </p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* --- EQUITY BANK PAYMENT INSTRUCTIONS (SHOWN IF INACTIVE) --- */}
                {!isActive && (
                    <div className="md:col-span-1 lg:col-span-1 space-y-6">
                        <Card className="border-red-600 shadow-sm overflow-hidden text-center">
                            <CardHeader className="bg-red-50/50 border-b border-red-100">
                                <CardTitle className="flex items-center justify-center gap-2 text-red-800">
                                    <Smartphone size={20} />
                                    Account Activation
                                </CardTitle>
                                <CardDescription>
                                    Unlock your AI Digital Employee.
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
                                        <span className="font-bold text-red-400">0714929790</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-700 pb-2">
                                        <span className="text-slate-400">Ref:</span>
                                        <span className="font-bold text-green-400">{refCode}</span>
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
                                        <form action={createPendingSubscription.bind(null, 'BAZZ_CONNECT')}>
                                            <button className="inline-flex items-center gap-2 text-xs font-medium text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full shadow-lg transition-transform hover:scale-105">
                                                <PlusCircle className="h-4 w-4" />
                                                Subscribe & Generate Invoice
                                            </button>
                                        </form>
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
                                3. Once detected by our Jenga Integration, your WhatsApp AI Brain will be unlocked instantly.
                            </p>
                        </div>
                    </div>
                )}

                {/* --- CONFIGURATION PORTAL --- */}
                {isActive && (
                    <div className="md:col-span-2 lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>1. Persona & Memory</CardTitle>
                                <CardDescription>How should your AI represent your company on WhatsApp?</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form action={saveProductConfig} className="space-y-4">
                                    <input type="hidden" name="configId" value={config?.id || ""} />
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">System Prompt (FAQ Automation & Order Status)</label>
                                        <textarea
                                            name="systemPrompt"
                                            rows={4}
                                            className="flex w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-green-600"
                                            placeholder="e.g. You are the digital receptionist. Answer FAQs, qualify leads, and check Order Status..."
                                            defaultValue={config?.systemPrompt || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Knowledge Base (CRM Backup Data)</label>
                                        <textarea
                                            name="knowledgeBase"
                                            rows={4}
                                            className="flex w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-green-600"
                                            placeholder="Paste FAQs, pricing sheets, and unstructured CRM backup data here..."
                                            defaultValue={config?.knowledgeBase || ""}
                                        />
                                    </div>
                                    <div className="flex justify-end pt-4 border-t">
                                        <button className="bg-green-600 text-white px-8 py-2 rounded-md font-bold hover:bg-green-700 transition flex items-center gap-2">
                                            <Zap size={16} /> Save AI Configuration
                                        </button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>2. WhatsApp Connectivity</CardTitle>
                                <CardDescription>Connect your Meta WhatsApp Business API</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form action={saveApiKeys} className="space-y-4">
                                    <input type="hidden" name="configId" value={config?.id || ""} />
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Meta Phone Number ID</label>
                                        <input type="text" name="whatsappPhoneId" defaultValue={config?.whatsappPhoneId || ""} className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="e.g. 1029384756..." />
                                        <p className="text-[11px] text-gray-500">Find this in your <a href="https://developers.facebook.com/apps/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Meta App Dashboard &rarr; WhatsApp &rarr; API Setup</a>.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Permanent Access Token</label>
                                        <input type="password" name="whatsappToken" defaultValue={config?.whatsappToken || ""} className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="EAAGm..." />
                                        <p className="text-[11px] text-gray-500">Generate a permanent token via <a href="https://business.facebook.com/settings/system-users" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Meta Business Settings &rarr; System Users</a>.</p>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t">
                                        <button className="bg-slate-900 text-white px-8 py-2 rounded-md font-bold hover:bg-slate-800 transition">Save API Keys</button>
                                    </div>
                                </form>
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
                                    <Webhook size={20} className="text-green-400" />
                                    Webhook Integration
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Connection details for your central Bazz AI Engine.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Your Webhook ID</p>
                                    <code className="block w-full bg-slate-950 text-green-400 p-3 rounded font-mono text-sm break-all">
                                        {config?.webhookId ? `https://n8n.bazztech.co.ke/webhook/${config.webhookId}` : "Pending Configuration Save..."}
                                    </code>
                                    <p className="text-[11px] text-slate-400 mt-2 hover:text-slate-300 transition-colors">
                                        Paste this entire URL into your Meta App's <a href="https://developers.facebook.com/apps/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Webhook Configuration</a> to connect your WhatsApp numbers instantly.
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
