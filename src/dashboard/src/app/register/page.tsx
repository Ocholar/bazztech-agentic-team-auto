'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Loader2, AlertCircle } from 'lucide-react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { z } from 'zod';

const registerSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    companyName: z.string().min(2, 'Company name is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const product = searchParams.get('product') || '';

    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
    const [loading, setLoading] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setFormErrors({});

        const result = registerSchema.safeParse(formData);
        if (!result.success) {
            const errors: any = {};
            result.error.issues.forEach((issue) => {
                errors[issue.path[0]] = issue.message;
            });
            setFormErrors(errors);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    product: product,
                    currency: searchParams.get('currency') || 'KES',
                    qty: parseInt(searchParams.get('qty') || '1'),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Registration failed. Please try again.');
            }

            router.push(data.redirectUrl || '/login?registered=true');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f2439 0%, #1a3a52 60%, #0f2439 100%)' }}>
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-headline)' }}>
                        Bazz<span style={{ color: 'var(--color-action)' }}>AI</span>
                    </h1>
                    <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Create your Manufacturing Portal account</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center gap-2 mb-6 text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        <span style={{ color: 'var(--color-action)' }}>Step 1:</span> Account Configuration
                    </div>

                    <button
                        onClick={() => signIn('google', { callbackUrl: '/portal' })}
                        className="w-full flex items-center justify-center gap-3 rounded-lg bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-4 py-2.5 text-sm font-semibold transition-colors shadow-sm mb-6"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-2 uppercase tracking-widest font-bold" style={{ background: '#0f2439', color: 'rgba(255,255,255,0.35)' }}>Or register via email</span>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 rounded-lg px-4 py-3 text-sm" style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', color: '#ff6b35' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label htmlFor="name" className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Full Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    aria-label="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg px-3 py-2.5 text-white placeholder:text-slate-500 focus:outline-none text-sm"
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                                />
                                {formErrors.name && <p className="text-xs text-red-400">{formErrors.name}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="companyName" className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Factory Name</label>
                                <input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    aria-label="Factory Name"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="w-full rounded-lg px-3 py-2.5 text-white placeholder:text-slate-500 focus:outline-none text-sm"
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                                />
                                {formErrors.companyName && <p className="text-xs text-red-400">{formErrors.companyName}</p>}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="phone" className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Phone Number</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                aria-label="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none text-sm"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                            />
                            {formErrors.phone && <p className="text-xs text-red-400">{formErrors.phone}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="email" className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                aria-label="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none text-sm"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                            />
                            {formErrors.email && <p className="text-xs text-red-400">{formErrors.email}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="password" className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                aria-label="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none text-sm"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                            />
                            {formErrors.password && <p className="text-xs text-red-400">{formErrors.password}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="confirmPassword" className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                aria-label="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none text-sm"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                            />
                            {formErrors.confirmPassword && <p className="text-xs text-red-400">{formErrors.confirmPassword}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all shadow-lg mt-2 hover:opacity-90 disabled:opacity-60"
                            style={{ background: 'var(--color-action)' }}
                        >
                            {loading ? (
                                <><Loader2 className="animate-spin h-4 w-4" /> Creating account...</>
                            ) : (
                                <>Create Account</>
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium hover:opacity-80 transition-opacity" style={{ color: 'var(--color-action)' }}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    const errorFallback = (
        <div className="min-h-screen bg-[#0F1117] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#1A1D25] border border-red-500/30 rounded-2xl p-8 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
                <p className="text-gray-400 mb-6">We encountered an unexpected error. Please try again.</p>
            </div>
        </div>
    );

    return (
        <ErrorBoundary fallback={errorFallback}>
            <Suspense fallback={<div className="flex min-h-screen items-center justify-center" style={{ background: '#0f2439' }}><Loader2 className="animate-spin h-8 w-8" style={{ color: 'var(--color-action)' }} /></div>}>
                <RegisterForm />
            </Suspense>
        </ErrorBoundary>
    );
}
