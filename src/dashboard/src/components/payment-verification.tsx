"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, AlertCircle, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui-card";
import PayPalButton from '@/components/paypal-button';
import { verifyAndActivateGrowthPackage } from '@/app/portal/config/actions';

interface PaymentVerificationProps {
    subscriptionId?: string;
    productName: string;
    amount?: number;
    status: 'INACTIVE' | 'ACTIVE' | 'SUSPENDED' | 'PAST_DUE' | 'CANCELLED';
    expiresAt?: string | null;
}

export function PaymentVerification({
    status,
    expiresAt,
}: PaymentVerificationProps) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    // Hardcode amounts for the new Growth Package Model
    const expectedAmount = 250;
    const amountInUSD = "250.00";
    const displayAmount = `KES 35,000 / month`;

    const isRenewal = status === 'ACTIVE' || status === 'SUSPENDED' || status === 'PAST_DUE';

    const clientId = "Ac_knSPsvEXZOg5rutYAGm5gY91z5pbdb6ayhQKe8E1fJkq1tqYDpKCOhtDH5slgZzZN0FNHkezcBSaz";
    const paypalId = "LA2KMANSS6H86";

    const handlePayPalSuccess = async (order: any) => {
        setLoading(true);
        setResult(null);
        try {
            // Enhanced Validation: Server securely verifies order.id with PayPal API before activating
            await verifyAndActivateGrowthPackage(order.id);
            setResult({ success: true, message: "Payment validated securely! All Floor Connectors unlocked." });
            setTimeout(() => window.location.reload(), 2000);
        } catch (e: any) {
            setResult({ success: false, message: e.message || "Error validating payment. Please contact support." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-slate-200 shadow-sm overflow-hidden border-2">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
                <CardTitle className="flex items-center gap-2 text-slate-800 text-base">
                    <CreditCard size={18} className="text-blue-600" />
                    {isRenewal ? "Renew Growth Package" : "Activate Growth Package"}
                </CardTitle>
                <CardDescription className="text-sm text-slate-500">
                    {isRenewal
                        ? `Renew your all-inclusive monthly subscription.`
                        : `Unlock all 4 Floor Connectors instantly for 30 days.`}
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-5 space-y-5">
                <div className="bg-slate-900 rounded-lg p-4 text-white font-mono text-sm space-y-2.5">
                    <div className="flex justify-between border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Total Amount:</span>
                        <span className="font-bold text-green-400">{displayAmount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">PayPal Equivalent:</span>
                        <span className="font-bold text-blue-300">${amountInUSD} USD</span>
                    </div>
                </div>

                <p className="text-[11px] text-slate-500 text-center">
                    Billed securely via PayPal every 30 days. No hidden fees.
                </p>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-8 gap-4 bg-slate-50 rounded-xl">
                        <Loader2 className="animate-spin text-blue-500" size={32} />
                        <p className="text-sm text-slate-600 font-bold">Verifying Order Securely...</p>
                    </div>
                ) : (
                    <PayPalButton
                        hostedButtonId={paypalId}
                        clientId={clientId}
                        amount={amountInUSD}
                        quantity={1}
                        onSuccess={handlePayPalSuccess}
                    />
                )}

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
