"use client";

import { useState, useEffect } from "react";

export default function KenyaGrantBanner() {
    const [currency, setCurrency] = useState("USD");

    useEffect(() => {
        const stored = localStorage.getItem("preferredCurrency");
        if (stored) setCurrency(stored);

        const handleCurrencyChange = (e: any) => setCurrency(e.detail);
        window.addEventListener("currencyChange", handleCurrencyChange);
        return () => window.removeEventListener("currencyChange", handleCurrencyChange);
    }, []);

    if (currency !== "KES") return null;

    return (
        <div className="bg-blue-600/10 border border-blue-500/30 text-blue-200 p-4 rounded-xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500 backdrop-blur-sm">
            <div className="bg-blue-600/20 p-2 rounded-lg text-2xl">🇰🇪</div>
            <div className="text-sm leading-relaxed">
                <span className="font-bold text-blue-400 block mb-1">Supporting Local Innovation</span>
                Kenyan businesses qualify for a <span className="text-white font-bold">30% Regional Growth Subsidy</span> (Fixed at <span className="bg-blue-600/30 px-1.5 py-0.5 rounded text-white">1 USD = 100 KES</span>).
            </div>
        </div>
    );
}
