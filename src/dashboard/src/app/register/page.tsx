'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
                password: form.password,
                product: product,
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-red-950">
            <div className="w-full max-w-md">
                {/* Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">
                        Bazz<span className="text-red-500">AI</span>
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">Create your Client Portal account</p>
                </div>

                {/* Card */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-xl font-bold text-white mb-6">Get started free</h2>

                    {error && (
                        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-300">Your Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Reagan"
                                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-300">Business Name</label>
                                <input
                                    name="companyName"
                                    type="text"
                                    required
                                    value={form.companyName}
                                    onChange={handleChange}
                                    placeholder="Acme Ltd"
                                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300">Email address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@business.com"
                                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Min. 8 characters"
                                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                required
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors shadow-lg shadow-red-900/30 mt-2"
                        >
                            {loading ? (
                                <><Loader2 className="animate-spin h-4 w-4" /> Creating account...</>
                            ) : (
                                <><UserPlus className="h-4 w-4" /> Create Account</>
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link href="/login" className="text-red-400 hover:text-red-300 font-medium">
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
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-900"><Loader2 className="animate-spin h-8 w-8 text-red-500" /></div>}>
            <RegisterForm />
        </Suspense>
    );
}
