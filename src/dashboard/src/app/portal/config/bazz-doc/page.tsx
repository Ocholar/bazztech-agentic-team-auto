import { auth } from '../../../../../auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui-card";
import { Database, Webhook, AlertCircle, FileText, Upload, Bot, CheckCircle2 } from "lucide-react";
import { saveProductConfig, saveApiKeys, createPendingSubscription } from '../actions';
import { PaymentVerification } from '@/components/payment-verification';
import { TestAgentButton } from '@/components/test-agent-button';

export default async function BazzDocConfig() {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const user = await db.user.findUnique({ where: { id: session.user.id } });
    const isAdmin = (session.user as any)?.role === 'ADMIN' || user?.role === 'ADMIN' || session.user.email === 'reaochola@gmail.com';

    const sub = await db.subscription.findFirst({
        where: { userId: session.user.id, productType: 'BAZZ_DOC' }
    });

    const config = await db.productConfig.findFirst({
        where: { userId: session.user.id, productType: 'BAZZ_DOC' }
    });

    const isActive = isAdmin || sub?.status === 'ACTIVE';
    const amount = sub?.oneTimeFee || 4999;

    return (
        <main className="flex min-h-screen flex-col p-8 bg-gray-50">
            <div className="mb-8 flex items-center justify-between border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                        <Database className="text-purple-600" size={32} />
                        Bazz-Doc AI Processor
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {isActive
                            ? "Define your structured extraction JSON schemas and mapping rules"
                            : "Activate your AI document OCR engine via Equity Bank Jenga API"}
                    </p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* --- PAYMENT VERIFICATION --- */}
                {!isActive && sub && (
                    <div className="md:col-span-1 lg:col-span-1 space-y-4">
                        <PaymentVerification
                            subscriptionId={sub.id}
                            productName="Bazz-Doc"
                            amount={amount}
                            status={sub.status as any}
                            expiresAt={sub.expiresAt?.toISOString()}
                        />
                    </div>
                )}

                {/* No subscription yet */}
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
                                <CardTitle>1. Document Extraction & OCR Schema</CardTitle>
                                <CardDescription>Define exactly what Data Structuring the AI should perform on uploaded files (Invoices & Receipts)</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form action={saveProductConfig} className="space-y-4">
                                    <input type="hidden" name="configId" value={config?.id || ""} />
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Expected JSON Output Schema</label>
                                        <textarea
                                            name="systemPrompt"
                                            rows={8}
                                            className="flex w-full rounded-md border border-slate-300 p-4 font-mono text-sm focus:ring-2 focus:ring-purple-600 bg-slate-50"
                                            defaultValue={config?.systemPrompt || `{\n  "vendorName": "string",\n  "invoiceTotal": "number",\n  "taxAmount": "number",\n  "dateUploaded": "ISO-8601"\n}`}
                                        />
                                        <p className="text-[11px] text-gray-500 mt-2">Define exactly what keys the AI should extract. Learn more about <a href="https://json-schema.org/learn/getting-started-step-by-step" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline font-medium">Writing JSON Schemas</a>.</p>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t">
                                        <button className="bg-purple-600 text-white px-8 py-2 rounded-md font-bold hover:bg-purple-700 transition flex items-center gap-2">
                                            <FileText size={16} /> Save Extraction Schema
                                        </button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>2. Complete Database Sync</CardTitle>
                                    <CardDescription>Where should the structured JSON data be sent?</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <form action={saveApiKeys} className="space-y-4">
                                        <input type="hidden" name="configId" value={config?.id || ""} />
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">CRM / DB Webhook URL</label>
                                            <input type="text" name="docOutputWebhook" placeholder="https://your-crm.com/webhook/incoming" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600" defaultValue={config?.docOutputWebhook || ""} />
                                        </div>
                                        <button className="w-full bg-slate-900 text-white px-8 py-2 rounded-md font-bold hover:bg-slate-800 transition">Save Route</button>
                                    </form>
                                </CardContent>
                            </Card>

                            <Card className="bg-purple-50 border-purple-200 border-dashed">
                                <CardHeader>
                                    <CardTitle className="text-purple-900">3. Test Connection</CardTitle>
                                    <CardDescription>Verify your OCR pipeline is alive.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <TestAgentButton />
                                    <p className="text-[10px] text-purple-800 opacity-70 text-center">Trigger a test event to confirm connectivity.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* --- ACTIVE WEBHOOK & SWARM CONNECTION CARD ---  */}
                {isActive && (
                    <div className="md:col-span-1 lg:col-span-1 space-y-6 text-sm">
                        {/* MULTIMODAL INGRESS (WHATSAPP) */}
                        <Card className="border-purple-200 bg-purple-50 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-purple-900">
                                    <Bot size={20} className="text-purple-600" />
                                    1. Multimodal Swarm Ingress
                                </CardTitle>
                                <CardDescription className="text-purple-800/70">
                                    Send images/PDFs directly via WhatsApp.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-green-700 font-bold bg-green-50 p-2 rounded border border-green-100">
                                    <CheckCircle2 size={16} /> Bazz-Connect Link Active
                                </div>
                                <p className="text-[11px] text-purple-900/60 leading-relaxed">
                                    Your <b>Bazz-Connect</b> agent automatically routes multimodal media (receipts, invoices) to this processor for extraction.
                                </p>
                            </CardContent>
                        </Card>

                        {/* TECHNICAL INGRESS (EXTERNAL API) */}
                        <Card className="bg-slate-900 border-none text-white shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Webhook size={20} className="text-purple-400" />
                                    2. API Ingress (Technical)
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Standard Webhook for ERPs or Scanners.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Production Webhook URL</p>
                                    <code className="block w-full bg-slate-950 text-purple-400 p-3 rounded font-mono text-[10px] break-all">
                                        https://tentacled-goldfish.pikapod.net/webhook/doc-ingest-{session.user.id.substring(0, 8)}
                                    </code>
                                    <p className="text-[10px] text-slate-500 mt-2">Use this URL to post raw JSON metadata or binary files from external third-party systems.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </main>
    );
}
