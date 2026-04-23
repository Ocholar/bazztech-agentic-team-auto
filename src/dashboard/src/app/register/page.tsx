'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Loader2, UserPlus } from 'lucide-react';

function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const product = searchParams.get('product') || '';

    const [form, setForm] = useState({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (form.password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        setLoading(true);

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: form.name,
                companyName: form.companyName,
                email: form.email,
                phone: form.phone,
                password: form.password,
                product: product,
                currency: searchParams.get('currency') || 'KES',
                qty: parseInt(searchParams.get('qty') || '1'),
            }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(data.error || 'Registration failed. Please try again.');
        } else {
            router.push(data.redirectUrl || '/login?registered=true');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f2439 0%, #1a3a52 60%, #0f2439 100%)' }}>
            <div className="w-full max-w-md">
                {/* Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-headline)' }}>
                        Bazz<span style={{ color: 'var(--color-action)' }}>AI</span>
                    </h1>
                    <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Create your Manufacturing Portal account</p>
                </div>

                {/* Card */}
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
                                <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Your Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Reagan"
                                    className="w-full rounded-lg px-3 py-2.5 text-white placeholder:text-slate-500 focus:outline-none text-sm"
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Factory / Business Name</label>
                                <input
                                    name="companyName"
                                    type="text"
                                    required
                                    value={form.companyName}
                                    onChange={handleChange}
                                    placeholder="Acme Foods Ltd"
                                    className="w-full rounded-lg px-3 py-2.5 text-white placeholder:text-slate-500 focus:outline-none text-sm"
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>WhatsApp Phone Number</label>
                            <input
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+254712345678"
                                className="w-full rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none text-sm"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                            />
                            <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>Used for automated renewal reminders via WhatsApp.</p>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Email address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@factory.com"
                                className="w-full rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none text-sm"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Min. 8 characters"
                                className="w-full rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none text-sm"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                required
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none text-sm"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                            />
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
                                <><UserPlus className="h-4 w-4" /> Create Account</>
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
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center" style={{ background: '#0f2439' }}><Loader2 className="animate-spin h-8 w-8" style={{ color: 'var(--color-action)' }} /></div>}>
            <RegisterForm />
        </Suspense>
    );
}
