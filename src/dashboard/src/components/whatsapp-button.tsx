"use client";

import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export function WhatsAppButton() {
    const [phone, setPhone] = useState('15558219787');

    // In a real app, we might fetch this from an API or pass as prop
    // but for now we'll match the .env BAZZAI_BOT_PHONE

    return (
        <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 group overflow-hidden"
            aria-label="Chat with BazzAI on WhatsApp"
        >
            {/* Pulsing Background effect */}
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity" />

            <MessageCircle size={32} className="relative z-10" fill="currentColor" />

            {/* Tooltip on hover */}
            <div className="absolute right-20 bg-slate-900 text-white text-[10px] font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none tracking-wider uppercase border border-white/10 shadow-xl">
                Chat with BazzAI Connect
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-t border-white/10" />
            </div>
        </a>
    );
}
