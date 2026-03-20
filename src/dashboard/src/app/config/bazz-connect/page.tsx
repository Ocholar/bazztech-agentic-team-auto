"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui-card";
import { MessageSquare, Save, Webhook, Smartphone, Loader2, CheckCircle2 } from "lucide-react";

export default function BazzConnectConfig() {
    // Application State
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [configData, setConfigData] = useState<any>(null);
    const [paymentReference, setPaymentReference] = useState("BAZZ-101"); // This would be unique per user

    // Note: In a real app we'd fetch this from a protected route
    // Simulate initial load
    useState(() => {
        setTimeout(() => {
            setIsLoadingData(false);
            // setIsActive(true); // Toggle this to test the "Active" view locally
        }, 1000);
    });

    const handleSaveConfig = () => {
        alert("Configuration saved to database. Your Bazz-Connect agent is updated instantly.");
    };

    if (isLoadingData) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-zinc-900">
                <Loader2 className="h-8 w-8 animate-spin text-red-600" />
            </div>
        );
    }

    return (
        <main className="flex min-h-screen flex-col p-8 bg-gray-50 dark:bg-zinc-900">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-3">
                        <MessageSquare className="text-red-600" size={32} />
                        {isActive ? "Configure Bazz-Connect" : "Bazz-Connect Subscription"}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {isActive ? "Customize your WhatsApp AI FrontDesk Agent" : "Activate your autonomous WhatsApp FrontDesk Agent"}
                    </p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* --- EQUITY BANK PAYMENT INSTRUCTIONS --- */}
                {!isActive && (
                    <div className="md:col-span-1 lg:col-span-1 space-y-6">
                        <Card className="border-red-600 shadow-sm overflow-hidden">
                            <CardHeader className="bg-red-50/50 border-b border-red-100">
                                <CardTitle className="flex items-center gap-2 text-red-800">
                                    <Smartphone size={20} />
                                    Equity Bank / M-Pesa Payment
                                </CardTitle>
                                <CardDescription>
                                    Activate Bazz-Connect for KES 2,500 / month.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="p-4 bg-slate-900 rounded-lg text-white space-y-3 font-mono text-sm">
                                    <div className="flex justify-between border-b border-slate-700 pb-2">
                                        <span className="text-slate-400">Paybill:</span>
                                        <span className="font-bold">247247</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-700 pb-2">
                                        <span className="text-slate-400">Account:</span>
                                        <span className="font-bold text-red-400">0714929790</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-700 pb-2">
                                        <span className="text-slate-400">Reference:</span>
                                        <span className="font-bold text-green-400">{paymentReference}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Amount:</span>
                                        <span className="font-bold">KES 2,500</span>
                                    </div>
                                </div>

                                <div className="text-center py-2">
                                    <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                        Checking for payment...
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 italic text-center">
                                    Our system polls Equity Bank every 15 minutes. Your dashboard will unlock automatically once the transaction is detected.
                                </p>
                            </CardContent>
                        </Card>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                            <h4 className="font-semibold text-blue-900 mb-2">How it works</h4>
                            <p className="text-sm text-blue-800 mb-3">
                                1. Open your M-Pesa or Equity Mobile App.
                            </p>
                            <p className="text-sm text-blue-800 mb-3">
                                2. Pay KES 2,500 to Paybill 247247 and use <b>{paymentReference}</b> as the account name.
                            </p>
                            <p className="text-sm text-blue-800">
                                3. Once detected, your WhatsApp AI Brain will be unlocked instantly.
                            </p>
                        </div>
                    </div>
                )}

                {/* --- AI CONFIGURATION (UNLOCKED IF ACTIVE) --- */}
                <div className={`md:col-span-1 lg:col-span-2 space-y-6 ${!isActive ? "opacity-50 pointer-events-none relative" : ""}`}>
                    {!isActive && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[1px]">
                            <div className="bg-white/90 px-6 py-4 rounded-lg shadow-lg border text-center">
                                <h3 className="font-bold text-gray-900 mb-1">Locked</h3>
                                <p className="text-sm text-gray-600">Complete checkout to configure your AI Brain.</p>
                            </div>
                        </div>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle>Agent Persona & Prompt</CardTitle>
                            <CardDescription>
                                Define exactly how your AI agent should behave, respond, and represent your business.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">System Prompt (The Brain)</label>
                                <textarea
                                    disabled={!isActive}
                                    rows={4}
                                    defaultValue="You are a helpful customer service agent..."
                                    className={`flex w-full rounded-md border border-slate-300 px-3 py-2 text-sm ${!isActive ? "bg-slate-50 text-slate-500" : "bg-white text-gray-900 focus:ring-2 focus:ring-red-600"}`}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Knowledge Base</CardTitle>
                            <CardDescription>
                                Provide the specific facts, pricing details, and FAQs the agent needs to know.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <textarea
                                    disabled={!isActive}
                                    rows={4}
                                    defaultValue="1. Our office is located at..."
                                    className={`flex w-full rounded-md border border-slate-300 px-3 py-2 text-sm ${!isActive ? "bg-slate-50 text-slate-500" : "bg-white text-gray-900 focus:ring-2 focus:ring-red-600"}`}
                                />
                            </div>
                        </CardContent>
                        {isActive && (
                            <CardFooter className="flex justify-end border-t border-slate-100 pt-6">
                                <button onClick={handleSaveConfig} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium transition-colors shadow-sm">
                                    <Save size={18} />
                                    Save AI Configuration
                                </button>
                            </CardFooter>
                        )}
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Smartphone size={20} className="text-green-600" />
                                WhatsApp Phone Connection
                            </CardTitle>
                            <CardDescription>
                                Securely connect your dedicated Meta WhatsApp Business API number so the AI can message your leads.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Meta Phone Number ID</label>
                                <input
                                    type="text"
                                    disabled={!isActive}
                                    placeholder="e.g. 10293847561923"
                                    className={`flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm ${!isActive ? "bg-slate-50 placeholder:text-slate-300 text-slate-500" : "bg-white text-gray-900 placeholder:text-slate-400 focus:ring-2 focus:ring-red-600"}`}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Permanent Access Token</label>
                                <input
                                    type="password"
                                    disabled={!isActive}
                                    placeholder="EAAGm0..."
                                    className={`flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm ${!isActive ? "bg-slate-50 placeholder:text-slate-300 text-slate-500" : "bg-white text-gray-900 placeholder:text-slate-400 focus:ring-2 focus:ring-red-600"}`}
                                />
                            </div>
                        </CardContent>
                        {isActive && (
                            <CardFooter className="flex justify-end border-t border-slate-100 pt-6">
                                <button onClick={handleSaveConfig} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-md font-medium transition-colors shadow-sm">
                                    <Save size={18} />
                                    Save WhatsApp Credentials
                                </button>
                            </CardFooter>
                        )}
                    </Card>
                </div>

                {/* --- ACTIVE WEBHOOK CONNECTION CARD ---  */}
                {isActive && (
                    <div className="md:col-span-2 lg:col-span-3">
                        <Card className="bg-slate-900 border-none text-white shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Webhook size={20} className="text-red-400" />
                                    Webhook Integration
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Connection details for your central Bazz AI Engine.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Your Webhook ID</p>
                                    <code className="block w-full bg-slate-950 text-red-400 p-3 rounded text-xs break-all">
                                        whk_production_secure_id
                                    </code>
                                    <p className="text-xs text-slate-500 mt-2">Connect this ID to your WhatsApp number inside the Bazz AI Master workflow to go live.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </main>
    );
}
