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
    const [onboardingStep, setOnboardingStep] = useState(1);
    const [agreedToCompliance, setAgreedToCompliance] = useState(false);

    // Note: In a real app we'd fetch this from a protected route
    // Simulate initial load
    useState(() => {
        setTimeout(() => {
            setIsLoadingData(false);
            // setIsActive(true); // Toggle this to test the "Active" view locally
        }, 1000);
    });

    const handleSaveConfig = () => {
        alert("Configuration saved! Step " + onboardingStep + " complete.");
        if (onboardingStep < 3) setOnboardingStep(onboardingStep + 1);
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
            <div className="mb-8 flex items-center justify-between border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-3">
                        <MessageSquare className="text-red-600" size={32} />
                        {isActive ? `Onboarding: Step ${onboardingStep} of 3` : "Bazz-Connect Subscription"}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {isActive
                            ? (onboardingStep === 1 ? "Fine-tune your AI Agent's persona and knowledge" : onboardingStep === 2 ? "Connect your business WhatsApp number" : "Review compliance and go live")
                            : "Activate your autonomous WhatsApp FrontDesk Agent"}
                    </p>
                </div>
                {isActive && (
                    <div className="flex gap-2">
                        {[1, 2, 3].map(step => (
                            <div key={step} className={`h-2 w-12 rounded-full ${onboardingStep >= step ? "bg-red-600" : "bg-slate-200"}`} />
                        ))}
                    </div>
                )}
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
                                        <span className="font-bold text-green-400">{paymentReference}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">KES Amount:</span>
                                        <span className="font-bold">1,500 - 5,000</span>
                                    </div>
                                </div>

                                <div className="text-center py-2 space-y-3">
                                    <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                        Checking Payment...
                                    </div>

                                    <button
                                        onClick={async () => {
                                            const subId = "sub-101"; // Would be dynamic
                                            const res = await fetch("/api/jenga/check-status", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({ subscriptionId: subId })
                                            });
                                            const data = await res.json();
                                            if (data.success && data.status === 'ACTIVE') {
                                                setIsActive(true);
                                            } else {
                                                alert(data.message || "No payment found. Tip: Check the reference code.");
                                            }
                                        }}
                                        className="block w-full text-xs font-semibold text-red-600 hover:text-red-700 underline underline-offset-4"
                                    >
                                        I have paid, unlock now
                                    </button>
                                </div>
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

                {/* --- ONBOARDING STEPS --- */}
                {isActive && (
                    <div className="md:col-span-2 lg:col-span-2 space-y-6">

                        {/* STEP 1: BRAIN CONFIG */}
                        {onboardingStep === 1 && (
                            <>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>1. Persona & Memory</CardTitle>
                                        <CardDescription>How should your AI represent your company?</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">System Prompt</label>
                                            <textarea rows={4} className="flex w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-600" placeholder="e.g. You are the digital receptionist for Bazztech..." />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Knowledge Base (Vector Memory)</label>
                                            <textarea rows={4} className="flex w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-600" placeholder="Upload FAQs, pricing sheets, and company details here..." />
                                        </div>
                                    </CardContent>
                                </Card>
                                <div className="flex justify-end">
                                    <button onClick={handleSaveConfig} className="bg-red-600 text-white px-8 py-2 rounded-md font-bold hover:bg-red-700">Next Step: WhatsApp Setup</button>
                                </div>
                            </>
                        )}

                        {/* STEP 2: WHATSAPP SETUP */}
                        {onboardingStep === 2 && (
                            <>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>2. WhatsApp Connectivity</CardTitle>
                                        <CardDescription>Connect your Meta WhatsApp Business API</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Meta Phone Number ID</label>
                                            <input type="text" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="e.g. 1029384756..." />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Permanent Access Token</label>
                                            <input type="password" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="EAAGm..." />
                                        </div>
                                    </CardContent>
                                </Card>
                                <div className="flex justify-between">
                                    <button onClick={() => setOnboardingStep(1)} className="text-slate-600 font-medium">Back</button>
                                    <button onClick={handleSaveConfig} className="bg-red-600 text-white px-8 py-2 rounded-md font-bold hover:bg-red-700">Next Step: Compliance</button>
                                </div>
                            </>
                        )}

                        {/* STEP 3: COMPLIANCE & LAUNCH */}
                        {onboardingStep === 3 && (
                            <>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>3. Compliance Guidelines</CardTitle>
                                        <CardDescription>Ensure a healthy WhatsApp number status</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-sm space-y-3">
                                            <p className="font-bold text-red-700">To avoid WhatsApp bans (Spam Policy):</p>
                                            <ul className="list-disc pl-5 space-y-2 text-slate-700">
                                                <li><b>Opt-In:</b> Only message customers who have explicitly messaged you or opted in.</li>
                                                <li><b>Standard Response:</b> The bot should only handle inbound queries within the 24-hour window.</li>
                                                <li><b>Direct Marketing:</b> Do not use the bot for unsolicited broadcast messages.</li>
                                                <li><b>Clear Opt-Out:</b> Allow customers to end the chat by typing "Stop" or "Unsubscribe".</li>
                                            </ul>
                                        </div>
                                        <div className="flex items-center space-x-2 pt-4">
                                            <input
                                                type="checkbox"
                                                id="compliance"
                                                checked={agreedToCompliance}
                                                onChange={(e) => setAgreedToCompliance(e.target.checked)}
                                                className="h-4 w-4 text-red-600 border-gray-300 rounded"
                                            />
                                            <label htmlFor="compliance" className="text-sm font-medium text-gray-700 leading-none">
                                                I acknowledge that I am responsible for WhatsApp compliance and usage behavior.
                                            </label>
                                        </div>
                                    </CardContent>
                                </Card>
                                <div className="flex justify-between">
                                    <button onClick={() => setOnboardingStep(2)} className="text-slate-600 font-medium">Back</button>
                                    <button
                                        disabled={!agreedToCompliance}
                                        onClick={() => alert("Congratulations! Your Bazz-Connect Agent is now LIVE across Kenya.")}
                                        className={`px-8 py-2 rounded-md font-bold text-white shadow-lg ${agreedToCompliance ? "bg-green-600 hover:bg-green-700 translate-y-0 shadow-green-200" : "bg-slate-300 cursor-not-allowed"}`}
                                    >
                                        Deploy My AI Brain
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}

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
