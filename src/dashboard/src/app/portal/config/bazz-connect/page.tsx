import { auth } from '../../../../../auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui-card";
import { MessageSquare, Webhook, CheckCircle2, Zap, AlertCircle, PlusCircle } from "lucide-react";
import { saveProductConfig, createPendingSubscription, saveApiKeys } from '../actions';
import { revalidatePath } from 'next/cache';
import { PaymentVerification } from '@/components/payment-verification';
import { TestAgentButton } from '@/components/test-agent-button';

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
                {/* --- PAYMENT VERIFICATION --- */}
                {!isActive && sub && (
                    <div className="md:col-span-1 lg:col-span-1 space-y-4">
                        <PaymentVerification
                            subscriptionId={sub.id}
                            productName="Bazz-Connect"
                            amount={amount}
                            status={sub.status as any}
                            expiresAt={sub.expiresAt?.toISOString()}
                        />
                    </div>
                )}
                {!isActive && !sub && (
                    <div className="md:col-span-1 lg:col-span-1">
                        <form action={createPendingSubscription.bind(null, 'BAZZ_CONNECT')} className="space-y-3">
                            <div className="bg-slate-900 rounded-lg p-4 text-white font-mono text-sm space-y-2">
                                <div className="flex justify-between border-b border-slate-700 pb-2">
                                    <span className="text-slate-400">Bank:</span>
                                    <span className="font-bold">Equity Bank</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Account:</span>
                                    <span className="font-bold text-red-400">0290170458002</span>
                                </div>
                            </div>
                            <button className="w-full inline-flex justify-center items-center gap-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg shadow-lg transition-colors">
                                <PlusCircle size={16} />
                                Subscribe to Bazz-Connect
                            </button>
                        </form>
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

                {/* --- ACTIVE WEBHOOK CONNECTION CARD --- */}
                {isActive && (
                    <div className="md:col-span-1 lg:col-span-1 space-y-6">
                        <Card className="bg-slate-900 border-none text-white shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Webhook size={20} className="text-green-400" />
                                    1. Webhook Setup
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Incoming WhatsApp Gateway
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Permanent Gateway URL</p>
                                    <code className="block w-full bg-slate-950 text-green-400 p-3 rounded font-mono text-[10px] break-all">
                                        https://www.bazztech.co.ke/api/webhook/whatsapp
                                    </code>
                                    <p className="text-[10px] text-slate-400 mt-2">
                                        Paste this URL into your Meta App's Webhook Configuration.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold">2. Test Connection</CardTitle>
                                <CardDescription>Verify your AI agent is alive.</CardDescription>
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
