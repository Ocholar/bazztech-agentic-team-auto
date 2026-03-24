"use client";

import { useState } from 'react';
import { Zap, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { triggerTestWorkflow } from './actions';

export function TestWorkflowButton() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    async function handleTest() {
        setStatus('loading');
        try {
            const result = await triggerTestWorkflow();
            setStatus('success');
            setMessage(result.message);
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || "Failed to trigger test.");
            setTimeout(() => setStatus('idle'), 5000);
        }
    }

    return (
        <div className="space-y-4">
            <button 
                onClick={handleTest}
                disabled={status === 'loading'}
                className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {status === 'loading' ? (
                    <Loader2 className="animate-spin" size={16} />
                ) : (
                    <Zap size={16} className="text-red-500" />
                )}
                {status === 'loading' ? 'Triggering...' : 'Trigger Test Flow'}
            </button>

            {status === 'success' && (
                <div className="flex items-center gap-2 p-2 bg-green-500/20 text-green-400 rounded text-xs border border-green-500/30">
                    <CheckCircle size={14} />
                    {message}
                </div>
            )}

            {status === 'error' && (
                <div className="flex items-center gap-2 p-2 bg-red-500/20 text-red-400 rounded text-xs border border-red-500/30">
                    <AlertCircle size={14} />
                    {message}
                </div>
            )}
        </div>
    );
}
