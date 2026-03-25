import { auth } from '../../../../../auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui-card";
import { Database, Webhook, Smartphone, AlertCircle, FileText, Upload } from "lucide-react";

export default async function BazzDocConfig() {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const sub = await db.subscription.findFirst({
        where: { userId: session.user.id, productType: 'BAZZ_DOC' }
    });

    const isActive = sub?.status === 'ACTIVE';
    const amount = sub?.oneTimeFee || 2500;
    const refCode = sub?.paymentReference || `BAZ-PENDING`;

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
                                    Unlock Bazz-Doc AI.
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
                                        <span className="font-bold text-purple-400">{refCode}</span>
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
                                3. Once detected by our Jenga Integration, Bazz-Doc will be unlocked instantly.
                            </p>
                        </div>
                    </div>
                )}

                {/* --- CONFIGURATION PORTAL --- */}
                {isActive && (
                    <div className="md:col-span-2 lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>1. Document Extraction Schema</CardTitle>
                                <CardDescription>Define exactly what fields the AI should extract from uploaded files (PDFs/Images)</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Expected JSON Output Schema</label>
                                    <textarea
                                        rows={8}
                                        className="flex w-full rounded-md border border-slate-300 p-4 font-mono text-sm focus:ring-2 focus:ring-purple-600 bg-slate-50"
                                        defaultValue={`{\n  "vendorName": "string",\n  "invoiceTotal": "number",\n  "taxAmount": "number",\n  "dateUploaded": "ISO-8601"\n}`}
                                    />
                                    <p className="text-[11px] text-gray-500 mt-2">Define exactly what keys the AI should extract. Learn more about <a href="https://json-schema.org/learn/getting-started-step-by-step" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline font-medium">Writing JSON Schemas</a>.</p>
                                </div>
                                <div className="flex justify-end pt-4 border-t">
                                    <button className="bg-purple-600 text-white px-8 py-2 rounded-md font-bold hover:bg-purple-700 transition flex items-center gap-2">
                                        <FileText size={16} /> Save Extraction Schema
                                    </button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>2. Destination Routing</CardTitle>
                                    <CardDescription>Where should the structured JSON be sent?</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">CRM / DB Webhook URL</label>
                                        <input type="text" placeholder="https://your-crm.com/webhook/incoming" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600" />
                                    </div>
                                    <button className="w-full bg-slate-900 text-white px-8 py-2 rounded-md font-bold hover:bg-slate-800 transition">Save Route</button>
                                </CardContent>
                            </Card>

                            <Card className="bg-purple-50 border-purple-200 border-dashed">
                                <CardHeader>
                                    <CardTitle className="text-purple-900">3. Test Document OCR</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                        <Upload size={24} />
                                    </div>
                                    <p className="text-sm text-purple-800 text-center font-medium">Upload a sample Invoice/Receipt to verify your extraction schema.</p>
                                    <button className="w-full bg-white text-purple-600 border border-purple-200 px-8 py-2 rounded-md font-bold hover:bg-purple-100 transition shadow-sm">Select File</button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* --- ACTIVE WEBHOOK CONNECTION CARD ---  */}
                {isActive && (
                    <div className="md:col-span-2 lg:col-span-3">
                        <Card className="bg-slate-900 border-none text-white shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Webhook size={20} className="text-purple-400" />
                                    Bazz-Doc Master Ingress Webhook
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Post raw documents (PDF/JPG) to this endpoint natively from anywhere.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Production Ingress URL</p>
                                    <code className="block w-full bg-slate-950 text-purple-400 p-3 rounded font-mono text-sm break-all">
                                        https://n8n.bazztech.co.ke/webhook-test/doc-ingest-{session.user.id.substring(0, 8)}
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
