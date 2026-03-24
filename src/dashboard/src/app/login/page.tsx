'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, LogIn } from 'lucide-react';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setLoading(false);
            setError('Invalid email or password. Please try again.');
        } else {
            // Fetch session to determine role-based redirect
            const response = await fetch('/api/auth/session');
            const session = await response.json();
            
            setLoading(false);
            
            if (session?.user) {
                const role = (session.user as any).role;
                const target = role === 'ADMIN' ? '/admin' : '/portal';
                // If there's a callbackUrl that isn't just '/', prioritize it
                const finalTarget = (callbackUrl && callbackUrl !== '/') ? callbackUrl : target;
                router.push(finalTarget);
                router.refresh();
            } else {
                router.push(callbackUrl);
                router.refresh();
            }
        }
    }

    return (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Welcome back</h2>

            {error && (
                <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Email address</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@business.com"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors shadow-lg shadow-red-900/30"
                >
                    {loading ? (
                        <><Loader2 className="animate-spin h-4 w-4" /> Signing in...</>
                    ) : (
                        <><LogIn className="h-4 w-4" /> Sign In</>
                    )}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-red-400 hover:text-red-300 font-medium">
                    Register here
                </Link>
            </p>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 px-4">
            <div className="w-full max-w-md">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">
                        Bazz<span className="text-red-500">AI</span>
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">Sign in to your Client Portal</p>
                </div>

                {/* Card */}
                <Suspense fallback={<div className="text-white text-center"><Loader2 className="animate-spin h-6 w-6 mx-auto mb-2" />Loading...</div>}>
                    <LoginForm />
                </Suspense>

                <p className="text-center text-xs text-slate-600 mt-6">
                    &copy; {new Date().getFullYear()} Bazztech Networks. All rights reserved.
                </p>
            </div>
        </div>
    );
}
