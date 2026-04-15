'use client';

import { useFormStatus } from 'react-dom';
import { Zap, Loader2, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export function SubmitButton({
    defaultText = "Save",
    savingText = "Saving...",
    className = ""
}: {
    defaultText?: string;
    savingText?: string;
    className?: string;
}) {
    const { pending } = useFormStatus();
    const [justSaved, setJustSaved] = useState(false);

    useEffect(() => {
        if (!pending && justSaved) {
            const t = setTimeout(() => setJustSaved(false), 3000);
            return () => clearTimeout(t);
        }
    }, [pending, justSaved]);

    // When we transition from pending true to pending false, it means we just saved.
    // However, tracking previous state cleanly:
    const [prevPending, setPrevPending] = useState(false);
    useEffect(() => {
        if (prevPending && !pending) {
            setJustSaved(true);
        }
        setPrevPending(pending);
    }, [pending, prevPending]);

    return (
        <button
            type="submit"
            disabled={pending}
            className={`${className} flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed`}
        >
            {pending ? (
                <>
                    <Loader2 size={16} className="animate-spin" />
                    {savingText}
                </>
            ) : justSaved ? (
                <>
                    <CheckCircle2 size={16} className="text-white" />
                    Saved Successfully!
                </>
            ) : (
                <>
                    <Zap size={16} />
                    {defaultText}
                </>
            )}
        </button>
    );
}
