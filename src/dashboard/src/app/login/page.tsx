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

            <button
                onClick={() => signIn('google', { callbackUrl: callbackUrl })}
                className="w-full flex items-center justify-center gap-3 rounded-lg bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-4 py-2.5 text-sm font-semibold transition-colors shadow-sm mb-6"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign in with Google
            </button>

            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="bg-slate-900 px-2 text-slate-500 uppercase tracking-widest font-bold">Or continue with email</span>
                </div>
            </div>

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
