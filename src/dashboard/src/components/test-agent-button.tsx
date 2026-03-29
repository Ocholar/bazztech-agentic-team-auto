"use client";

import { useState } from 'react';
import { Zap, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { triggerTestWorkflow } from '../app/portal/config/actions';

export function TestAgentButton() {
    const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [message, setMessage] = useState('');

    async function handleTest() {
        setStatus('LOADING');
        try {
            const res = await triggerTestWorkflow();
            if (res.success) {
                setStatus('SUCCESS');
                setMessage(res.message || "Test message sent! Check your WhatsApp.");
            } else {
                setStatus('ERROR');
                setMessage(res.error || "Failed to trigger AI agent.");
            }
        } catch (err) {
            setStatus('ERROR');
            setMessage("Network error. Please try again.");
        }
    }

    return (
        <div className="space-y-4">
            <button
                onClick={handleTest}
                disabled={status === 'LOADING'}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50"
            >
                {status === 'LOADING' ? (
                    <Loader2 className="animate-spin" size={18} />
                ) : (
                    <Zap size={18} className="text-red-600" />
                )}
                Test AI Agent Connection
            </button>

            {status === 'SUCCESS' && (
                <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex gap-3 text-green-800 animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                    <p className="text-xs font-medium">{message}</p>
                </div>
            )}

            {status === 'ERROR' && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 text-red-800 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <p className="text-xs font-bold">Automation Failure</p>
                        <p className="text-[10px] leading-relaxed opacity-80">{message}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
