"use client";

import { useState, useEffect } from "react";
import { logAnalyticsEvent } from "@/lib/analytics";


export default function CurrencyToggle() {
    const [currency, setCurrency] = useState("USD");

    useEffect(() => {
        const stored = localStorage.getItem("preferredCurrency");
        if (stored) {
            setCurrency(stored);
        }
    }, []);

    const handleToggle = (newCurrency: string) => {
        setCurrency(newCurrency);
        localStorage.setItem("preferredCurrency", newCurrency);
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent("currencyChange", { detail: newCurrency }));

        // Log analytics if utility exists
        logAnalyticsEvent("currency_toggle_clicked", { currency: newCurrency });
    };

    return (
        <div className="flex items-center justify-center p-1 bg-slate-900/50 border border-slate-700 rounded-full w-fit backdrop-blur-sm">
            <button
                onClick={() => handleToggle("USD")}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-200 ${currency === "USD"
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    : "text-slate-400 hover:text-slate-200"
                    }`}
            >
                USD
            </button>
            <button
                onClick={() => handleToggle("KES")}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-200 ${currency === "KES"
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    : "text-slate-400 hover:text-slate-200"
                    }`}
            >
                KES
            </button>
        </div>
    );
}
