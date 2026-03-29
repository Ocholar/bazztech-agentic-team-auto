"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, AlertCircle, Smartphone, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui-card";

interface PaymentVerificationProps {
    subscriptionId: string;
    productName: string;
    amount: number;
    status: 'INACTIVE' | 'ACTIVE' | 'SUSPENDED' | 'PAST_DUE' | 'CANCELLED';
    expiresAt?: string | null;
}

export function PaymentVerification({
    subscriptionId,
    productName,
    amount,
    status,
    expiresAt,
}: PaymentVerificationProps) {
    const [txId, setTxId] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string; paymentType?: string } | null>(null);

    // Determine if this is a renewal or first activation
    const isRenewal = status === 'ACTIVE' || status === 'SUSPENDED' || status === 'PAST_DUE';
    const maintenanceFee = Math.round(amount * 0.2);
    const expectedAmount = isRenewal ? maintenanceFee : amount;

    const handleVerify = async () => {
        if (!txId.trim()) return;
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("/api/jenga/check-status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subscriptionId, transactionId: txId.trim() }),
            });
            const data = await res.json();

            if (data.success) {
                setResult({ success: true, message: data.message, paymentType: data.paymentType });
                // Reload after 3 seconds to reflect new subscription status
                setTimeout(() => window.location.reload(), 3000);
            } else {
                setResult({ success: false, message: data.message || data.error });
            }
        } catch {
            setResult({ success: false, message: "Network error. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-red-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-red-50 border-b border-red-100">
                <CardTitle className="flex items-center gap-2 text-red-800 text-base">
                    <Smartphone size={18} />
                    {isRenewal ? "Renew Subscription" : "Activate Subscription"}
                </CardTitle>
                <CardDescription className="text-sm text-red-700">
                    {isRenewal
                        ? `Pay your monthly maintenance to extend ${productName}.`
                        : `Complete payment to unlock ${productName}.`}
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-5 space-y-5">
                {/* Payment Instructions */}
                <div className="bg-slate-900 rounded-lg p-4 text-white font-mono text-sm space-y-2.5">
                    <div className="flex justify-between border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Bank:</span>
                        <span className="font-bold">Equity Bank</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Account:</span>
                        <span className="font-bold text-red-400">0290170458002</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Amount (KES):</span>
                        <span className="font-bold text-green-400">{expectedAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Accepted via:</span>
                        <span className="font-bold text-blue-300">M-Pesa · Airtel · Equity</span>
                    </div>
                </div>

                <p className="text-[11px] text-slate-500 text-center">
                    {isRenewal
                        ? "Pay via M-Pesa, Airtel Money, or Equity Mobile to the account above."
                        : `Pay via any mobile money platform. No custom reference needed.`}
                </p>

                {/* Transaction ID Input */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                        Enter your Transaction ID after payment:
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={txId}
                            onChange={(e) => setTxId(e.target.value)}
                            placeholder="e.g. 21389933793"
                            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                        />
                        <button
                            onClick={handleVerify}
                            disabled={loading || !txId.trim()}
                            className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                        >
                            {loading ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : (
                                <RefreshCw size={14} />
                            )}
                            Verify
                        </button>
                    </div>
                    <p className="text-[10px] text-slate-400">
                        The Transaction ID is shown in your payment confirmation SMS (e.g. &quot;21389933793&quot;)
                    </p>
                </div>

                {/* Result Banner */}
                {result && (
                    <div className={`flex items-start gap-3 rounded-lg p-3 text-sm ${result.success
                            ? "bg-green-50 border border-green-200 text-green-800"
                            : "bg-red-50 border border-red-200 text-red-800"
                        }`}>
                        {result.success
                            ? <CheckCircle2 size={18} className="shrink-0 text-green-600 mt-0.5" />
                            : <AlertCircle size={18} className="shrink-0 text-red-600 mt-0.5" />
                        }
                        <span>{result.message}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
