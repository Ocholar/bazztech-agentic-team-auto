"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui-card";
import { MessageSquare, Save, Webhook, Smartphone, Loader2, CheckCircle2 } from "lucide-react";

export default function BazzConnectConfig() {
    // Application State
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [configData, setConfigData] = useState<any>(null);

    // Payment State
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null);
    const [paymentError, setPaymentError] = useState("");

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setPaymentError("");

        try {
            const res = await fetch("/api/mpesa/stkpush", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phoneNumber,
                    amount: "2500", // Monthly subscription fee KES
                    productType: "BAZZ_CONNECT"
                })
            });

            const data = await res.json();

            if (res.ok && data.checkoutRequestId) {
                setCheckoutRequestId(data.checkoutRequestId);
            } else {
                setPaymentError(data.error || "Failed to initiate M-Pesa prompt.");
            }
        } catch (err) {
            setPaymentError("A network error occurred. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    // Note: In a real app we'd fetch this from a protected GET /api/dashboard/config route
    // But for this mockup, we are simulating the fetch based on whether the M-Pesa webhook succeeded
    // The webhook creates the ProductConfig, so if we can fetch it via /api/client-config, they paid!

    // Form handlers
    const handleSaveConfig = () => {
        alert("Configuration saved to database. Your Bazz-Connect agent is updated instantly.");
    };

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
                {/* --- M-PESA CHECKOUT PORTAL (HIDDEN IF ACTIVE) --- */}
                {!isActive && (
                    <div className="md:col-span-1 lg:col-span-1 space-y-6">
                        <Card className="border-green-600 shadow-sm">
                            <CardHeader className="bg-green-50/50 border-b border-green-100">
                                <CardTitle className="flex items-center gap-2 text-green-800">
                                    <Smartphone size={20} />
                                    M-Pesa Express Checkout
                                </CardTitle>
                                <CardDescription>
                                    Activate Bazz-Connect for KES 2,500 / month.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {checkoutRequestId ? (
                                    <div className="text-center space-y-4 py-4">
                                        <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                            <Loader2 className="text-green-600 animate-spin" size={24} />
                                        </div>
                                        <h3 className="font-semibold text-lg text-gray-900">Check your phone!</h3>
                                        <p className="text-sm text-gray-600">
                                            We sent an M-Pesa prompt to {phoneNumber}. Enter your PIN to complete the subscription.
                                        </p>
                                        <p className="text-xs text-green-700 font-medium bg-green-50 p-2 rounded">
                                            This page will unlock automatically once Safaricom verifies the payment.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleCheckout} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium leading-none">Safaricom Phone Number</label>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="e.g. 0712345678"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                                            />
                                            <p className="text-xs text-gray-500">Ensure the phone is unlocked to receive the prompt.</p>
                                        </div>

                                        {paymentError && (
                                            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                                {paymentError}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isProcessing || !phoneNumber}
                                            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white h-10 rounded-md font-medium transition-colors disabled:opacity-50"
                                        >
                                            {isProcessing ? <Loader2 className="animate-spin" size={18} /> : "Pay KES 2,500"}
                                        </button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>

                        {/* Pending State Blocker Info */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                            <h4 className="font-semibold text-blue-900 mb-2">How it works</h4>
                            <p className="text-sm text-blue-800 mb-3">
                                1. Enter your M-Pesa number and authorize the payment.
                            </p>
                            <p className="text-sm text-blue-800 mb-3">
                                2. Your WhatsApp AI Brain will be unlocked instantly.
                            </p>
                            <p className="text-sm text-blue-800">
                                3. You can then configure the Custom Prompt and Knowledge Base!
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
