"use client";

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, MessageSquare, Check, X, ChevronRight, Zap, Shield, Globe, Star, Award } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { painPoints, howItWorks, testimonials, demoQueries, WHATSAPP_URL } from './pageData';

export const dynamic = 'force-dynamic';

/* ─── AI Demo Widget ─── */
function AIDemoWidget() {
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string; chart?: string | null }[]>([]);
    const [count, setCount] = useState(0);
    const [typing, setTyping] = useState(false);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [input, setInput] = useState('');
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messages.length > 0 || typing) {
            endRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, typing]);

    const sendQuery = async (q: string, demoIdx?: number) => {
        if (showUpgrade) return;
        const queryText = q.trim();
        if (!queryText) return;
        setMessages(m => [...m, { role: 'user', text: queryText }]);
        setInput('');
        setTyping(true);

        try {
            const res = await fetch('/api/ai/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: queryText,
                    sessionId: 'demo-session-' + count // Simple session tracking for demo
                }),
            });

            const data = await res.json();

            if (res.status === 429) {
                setShowUpgrade(true);
                return;
            }

            setMessages(m => [...m, {
                role: 'ai',
                text: data.answer,
                chart: data.chart || null
            }]);

            const newCount = count + 1;
            setCount(newCount);
            if (newCount >= 5) setShowUpgrade(true);
        } catch (err) {
            console.error('AI Demo Error:', err);
            setMessages(m => [...m, {
                role: 'ai',
                text: "I'm having trouble connecting to the factory brain. Please try again in a moment."
            }]);
        } finally {
            setTyping(false);
        }
    };

    const renderAIText = (text: string) => {
        const lines = text.split('\n');
        return lines.map((line, i) => {
            if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-bold mb-1" style={{ color: '#F2CC8F' }}>{line.replace(/\*\*/g, '')}</p>;
            }
            if (line.startsWith('| ')) {
                return <div key={i} className="font-mono text-xs my-1 opacity-90">{line}</div>;
            }
            if (line.startsWith('• ') || line.startsWith('🔴') || line.startsWith('🟡') || line.startsWith('🟢')) {
                return <p key={i} className="text-sm my-0.5">{line}</p>;
            }
            if (line === '') return <div key={i} className="h-2" />;
            return <p key={i} className="text-sm leading-relaxed">{line.replace(/\*\*/g, '')}</p>;
        });
    };

    const MiniChart = ({ type }: { type: string }) => (
        <div className="mt-2 rounded-lg p-2 overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', height: 64 }}>
            {type === 'bar' ? (
                <div className="flex items-end gap-1 h-full">
                    {[45, 32, 29].map((v, i) => (
                        <div key={i} className="flex-1 rounded-t" style={{ height: `${v}%`, background: i === 0 ? '#81B29A' : '#E07A5F', opacity: 0.85 }} />
                    ))}
                </div>
            ) : (
                <svg viewBox="0 0 100 40" className="w-full h-full">
                    <polyline fill="none" stroke="#81B29A" strokeWidth="2"
                        points="0,32 20,28 40,22 60,18 80,12 100,8" />
                    <polyline fill="none" stroke="#E07A5F" strokeWidth="2" strokeDasharray="4,2"
                        points="0,35 20,32 40,30 60,26 80,22 100,20" />
                </svg>
            )}
        </div>
    );

    return (
        <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', height: 480 }}>
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)', background: '#0D1117' }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#E07A5F' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#F2CC8F' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#81B29A' }} />
                <span className="ml-2 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>BazzAI · Carton Manufacturer · Live Demo</span>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(129,178,154,0.15)', color: '#81B29A' }}>● DEMO</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                    <div className="text-center py-4">
                        <div className="text-2xl mb-2">🧠</div>
                        <p className="text-sm font-semibold mb-1" style={{ color: '#F4F1DE' }}>Hi, I&apos;m BazzAI.</p>
                        <p className="text-xs mb-4" style={{ color: '#718096' }}>Ask me anything about your factory — or try one of these:</p>
                        <div className="flex flex-col gap-2">
                            {demoQueries.map((dq, i) => (
                                <button key={i} onClick={() => sendQuery(dq.q, i)}
                                    className="text-left text-xs px-3 py-2 rounded-lg transition-all hover:scale-[1.02]"
                                    style={{ background: 'rgba(224,122,95,0.1)', color: '#E07A5F', border: '1px solid rgba(224,122,95,0.2)' }}>
                                    {dq.q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((m, i) => (
                    <div key={i} className={`chat-bubble-in flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {m.role === 'ai' && (
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-1"
                                style={{ background: 'rgba(224,122,95,0.2)' }}>🧠</div>
                        )}
                        <div className="max-w-[85%]">
                            <div className="rounded-xl px-3 py-2.5 text-xs"
                                style={{
                                    background: m.role === 'user' ? 'rgba(224,122,95,0.15)' : 'rgba(255,255,255,0.05)',
                                    color: m.role === 'user' ? '#E07A5F' : '#F4F1DE',
                                    border: `1px solid ${m.role === 'user' ? 'rgba(224,122,95,0.25)' : 'rgba(255,255,255,0.06)'}`,
                                }}>
                                {m.role === 'ai' ? renderAIText(m.text) : <p>{m.text}</p>}
                                {m.chart && <MiniChart type={m.chart} />}
                            </div>
                        </div>
                    </div>
                ))}

                {typing && (
                    <div className="flex items-start gap-2 chat-bubble-in">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                            style={{ background: 'rgba(224,122,95,0.2)' }}>🧠</div>
                        <div className="flex items-center gap-1 px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <span className="typing-dot" />
                            <span className="typing-dot" />
                            <span className="typing-dot" />
                        </div>
                    </div>
                )}

                {showUpgrade && (
                    <div className="rounded-xl p-4 text-center chat-bubble-in" style={{ background: 'rgba(242,204,143,0.08)', border: '1px solid rgba(242,204,143,0.2)' }}>
                        <p className="text-xs font-bold mb-1" style={{ color: '#F2CC8F' }}>Demo limit reached 🎯</p>
                        <p className="text-xs mb-3" style={{ color: '#A0AEC0' }}>This is mock data. Want to see it with your real factory data?</p>
                        <Link href="/register"
                            className="text-xs font-black px-4 py-2 rounded-lg text-white"
                            style={{ background: '#E07A5F' }}>
                            Start Your Free Pilot →
                        </Link>
                    </div>
                )}

                <div ref={endRef} />
            </div>

            {/* Input */}
            {!showUpgrade && (
                <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <form onSubmit={e => { e.preventDefault(); if (input.trim()) sendQuery(input); }}
                        className="flex gap-2">
                        <input value={input} onChange={e => setInput(e.target.value)}
                            placeholder="Ask about your factory..." disabled={typing}
                            className="flex-1 text-xs px-3 py-2 rounded-lg outline-none"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#F4F1DE' }} />
                        <button type="submit" disabled={typing || !input.trim()}
                            title="Send Query" aria-label="Send Query"
                            className="px-3 py-2 rounded-lg font-bold text-xs text-white disabled:opacity-40"
                            style={{ background: '#E07A5F' }}>
                            <ArrowRight size={14} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

/* ─── Dashboard Preview ─── */
function DashboardPreview() {
    const [activeTab, setActiveTab] = useState(0);
    const machines = [
        { name: 'Mixer-1', oee: 87, status: 'Running', alert: false, color: '#81B29A' },
        { name: 'Mixer-3', oee: 61, status: 'Warning', alert: true, color: '#D69E2E' },
        { name: 'Line-2', oee: 79, status: 'Running', alert: false, color: '#81B29A' },
        { name: 'Packager', oee: 92, status: 'Running', alert: false, color: '#81B29A' },
    ];
    const alerts = [
        { sev: 'critical', text: 'Mixer-3 bearing temp 87°C — schedule maintenance', time: '09:14' },
        { sev: 'warning', text: 'Maize flour stock below 14-day threshold', time: '11:32' },
        { sev: 'info', text: 'OEE improved +6.2% vs last month', time: '08:00' },
    ];
    const sevColor: Record<string, string> = { critical: '#E53E3E', warning: '#D69E2E', info: '#4299E1' };

    return (
        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.07)' }}>
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#111827' }}>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-black" style={{ color: '#E07A5F' }}>BazzAI</span>
                    <span className="text-xs px-2 py-0.5 rounded text-white" style={{ background: 'rgba(129,178,154,0.15)', color: '#81B29A' }}>Carton Manufacturer · Mauritius</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#81B29A' }} />
                    <span className="text-xs" style={{ color: '#718096' }}>Live · {new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}</span>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: '#E07A5F' }}>JF</div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-4 pt-3 pb-0">
                {['Overview', 'Machines', 'Alerts'].map((t, i) => (
                    <button key={t} onClick={() => setActiveTab(i)}
                        className="text-xs px-3 py-1.5 rounded-t-lg font-semibold transition-all"
                        style={{
                            background: activeTab === i ? 'rgba(224,122,95,0.12)' : 'transparent',
                            color: activeTab === i ? '#E07A5F' : '#718096',
                            borderBottom: activeTab === i ? '2px solid #E07A5F' : '2px solid transparent',
                        }}>{t}</button>
                ))}
            </div>

            <div className="p-4">
                {activeTab === 0 && (
                    <>
                        {/* Metrics row */}
                        <div className="grid grid-cols-5 gap-2 mb-4">
                            {[
                                { label: 'OEE', value: '67.6%', trend: '+9.2%', color: '#81B29A' },
                                { label: 'Downtime', value: '1.4h', trend: '-62%', color: '#E07A5F' },
                                { label: 'Output', value: '4,820', trend: '+11%', color: '#F2CC8F' },
                                { label: 'Margin', value: '38.4%', trend: '+2.1%', color: '#81B29A' },
                                { label: 'AI Score', value: '92/100', trend: '↑', color: '#4299E1' },
                            ].map((m, i) => (
                                <div key={i} className="rounded-lg p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <p className="text-[9px] mb-1 font-semibold uppercase tracking-wider" style={{ color: '#718096' }}>{m.label}</p>
                                    <p className="text-base font-black" style={{ color: m.color }}>{m.value}</p>
                                    <p className="text-[9px] font-bold mt-0.5" style={{ color: '#81B29A' }}>{m.trend}</p>
                                </div>
                            ))}
                        </div>
                        {/* Sparkline placeholder */}
                        <div className="rounded-lg p-3 mb-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: '#718096' }}>OEE — Last 7 days</p>
                            <svg viewBox="0 0 300 50" className="w-full h-10">
                                <defs>
                                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#81B29A" stopOpacity="0.4" />
                                        <stop offset="100%" stopColor="#81B29A" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path fill="url(#g1)" d="M0,38 L43,34 L86,28 L129,32 L172,22 L215,18 L258,14 L300,10 L300,50 L0,50 Z" />
                                <polyline fill="none" stroke="#81B29A" strokeWidth="2" points="0,38 43,34 86,28 129,32 172,22 215,18 258,14 300,10" />
                            </svg>
                        </div>
                        {/* Active alert */}
                        <div className="rounded-lg px-3 py-2 flex items-center gap-2" style={{ background: 'rgba(229,62,62,0.08)', border: '1px solid rgba(229,62,62,0.2)' }}>
                            <span className="text-xs">⚠️</span>
                            <p className="text-xs" style={{ color: '#FC8181' }}>Mixer-3 bearing temperature critical — AI recommends maintenance within 72h</p>
                        </div>
                    </>
                )}

                {activeTab === 1 && (
                    <div className="space-y-2">
                        {machines.map((m, i) => (
                            <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${m.alert ? 'rgba(214,158,46,0.3)' : 'rgba(255,255,255,0.06)'}` }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                                    <div>
                                        <p className="text-xs font-bold" style={{ color: '#F4F1DE' }}>{m.name}</p>
                                        <p className="text-[10px]" style={{ color: m.color }}>{m.status}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black" style={{ color: m.color }}>{m.oee}%</p>
                                    <p className="text-[9px]" style={{ color: '#718096' }}>OEE</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 2 && (
                    <div className="space-y-2">
                        {alerts.map((a, i) => (
                            <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-lg" style={{ background: `${sevColor[a.sev]}10`, border: `1px solid ${sevColor[a.sev]}30` }}>
                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: sevColor[a.sev] }} />
                                <div className="flex-1">
                                    <p className="text-xs" style={{ color: '#F4F1DE' }}>{a.text}</p>
                                    <p className="text-[9px] mt-0.5" style={{ color: '#718096' }}>{a.time}</p>
                                </div>
                                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded" style={{ background: `${sevColor[a.sev]}20`, color: sevColor[a.sev] }}>{a.sev}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─── Main Page ─── */
export default function HomePage() {
    const [activeTab, setActiveTab] = useState<number | null>(null);
    const revealRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.1 }
        );
        revealRefs.current.forEach(el => el && obs.observe(el));
        return () => obs.disconnect();
    }, []);

    const rev = (i: number) => (el: HTMLElement | null) => { revealRefs.current[i] = el; };

    return (
        <div className="flex min-h-screen flex-col overflow-x-hidden" style={{ background: '#0F1419', color: '#F4F1DE', fontFamily: 'var(--font-body)' }}>
            <Header />

            {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: '5rem' }}>
                {/* Grid bg */}
                <div className="absolute inset-0 grid-bg pointer-events-none" />
                {/* Gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(224,122,95,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(129,178,154,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center w-full">
                    {/* Left */}
                    <div className="fade-up">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6"
                            style={{ background: 'rgba(224,122,95,0.1)', border: '1px solid rgba(224,122,95,0.25)', color: '#E07A5F' }}>
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#E07A5F' }} />
                            AI Manufacturing Intelligence · Built for Africa
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6" style={{ fontFamily: 'var(--font-headline)', letterSpacing: '-0.03em' }}>
                            Your Factory&apos;s<br />
                            <span style={{ background: 'linear-gradient(135deg, #E07A5F, #F2CC8F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Brain</span>
                        </h1>

                        <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-lg" style={{ color: '#A0AEC0' }}>
                            Machine performance analytics, fault investigation, and production forecasting — powered by AI, built for African manufacturing.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Link href="/register"
                                className="px-8 py-4 rounded-xl font-black text-base text-white transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 pulse-glow"
                                style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}>
                                Start Your Free AI Pilot — 14 Days <ArrowRight size={18} />
                            </Link>
                            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                                className="px-8 py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2"
                                style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#F4F1DE' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                                <MessageSquare size={18} /> Watch 90-Second Demo
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm" style={{ color: '#718096' }}>
                            {['Hybrid RAG Architecture', 'Predictive Maintenance', 'Sales & HR Intelligence', 'Zero New Hardware'].map(item => (
                                <span key={item} className="flex items-center gap-1.5">
                                    <Check size={13} style={{ color: '#81B29A' }} /> {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right: AI Chat Demo */}
                    <div className="hidden lg:block fade-up" style={{ animationDelay: '0.2s' }}>
                        <AIDemoWidget />
                    </div>
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
                    <div className="w-px h-8 animate-pulse" style={{ background: '#E07A5F' }} />
                    <p className="text-xs" style={{ color: '#718096' }}>Scroll to explore</p>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════ */}
            <section className="py-12 px-6 border-y" style={{ background: '#1A1F2E', borderColor: '#2D3748' }}>
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { value: '67.6%', label: 'Average OEE Improvement', color: '#81B29A' },
                        { value: '72h', label: 'Advance Failure Warning', color: '#E07A5F' },
                        { value: '14-day', label: 'Free Pilot — Zero Risk', color: '#F2CC8F' },
                        { value: '99.9%', label: 'Platform Uptime SLA', color: '#4299E1' },
                    ].map((s, i) => (
                        <div key={i} className="reveal" ref={rev(i)}>
                            <p className="text-4xl md:text-5xl font-black mb-2" style={{ fontFamily: 'var(--font-headline)', color: s.color }}>{s.value}</p>
                            <p className="text-sm font-medium" style={{ color: '#718096' }}>{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════
          TRUST BAR — marquee
      ══════════════════════════════════════════════ */}
            <section className="py-5 overflow-hidden border-b" style={{ borderColor: '#2D3748' }}>
                <p className="text-center text-[10px] font-black uppercase tracking-widest mb-4 px-6" style={{ color: '#3D405B' }}>
                    The African Manufacturing Stack — natively integrated
                </p>
                <div className="overflow-hidden">
                    <div className="marquee-track">
                        {[
                            { name: 'n8n Workflows', e: '⚡' }, { name: 'PostgreSQL Datasets', e: '🗄️' },
                            { name: 'Pinecone Vector DB', e: '🌲' }, { name: 'OpenAI GPT-4o', e: '🤖' },
                            { name: 'Holt-Winters Forecasting', e: '📈' }, { name: 'Intent Classification', e: '🧠' },
                            { name: 'WhatsApp Business API', e: '💬' }, { name: 'React Node Dashboard', e: '📊' },
                            { name: 'n8n Workflows', e: '⚡' }, { name: 'PostgreSQL Datasets', e: '🗄️' },
                            { name: 'Pinecone Vector DB', e: '🌲' }, { name: 'OpenAI GPT-4o', e: '🤖' },
                            { name: 'Holt-Winters Forecasting', e: '📈' }, { name: 'Intent Classification', e: '🧠' },
                            { name: 'WhatsApp Business API', e: '💬' }, { name: 'React Node Dashboard', e: '📊' },
                        ].map((p, i) => (
                            <div key={i} className="flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-semibold flex-shrink-0"
                                style={{ background: 'rgba(255,255,255,0.03)', borderColor: '#2D3748', color: '#A0AEC0' }}>
                                <span>{p.e}</span> {p.name}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
          PAIN POINTS — before/after
      ══════════════════════════════════════════════ */}
            <section className="py-24 px-6" style={{ background: '#0F1419' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 reveal" ref={rev(10)}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5"
                            style={{ background: 'rgba(224,122,95,0.08)', border: '1px solid rgba(224,122,95,0.2)', color: '#E07A5F' }}>
                            The Manufacturing Reality
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-headline)', letterSpacing: '-0.02em' }}>
                            Every Day You Operate Blind,<br />
                            <span style={{ color: '#E07A5F' }}>You Leave Money on the Floor</span>
                        </h2>
                        <p className="text-lg max-w-2xl mx-auto" style={{ color: '#718096' }}>
                            These aren&apos;t edge cases. They&apos;re the Monday reality for manufacturers across East and West Africa.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {painPoints.map((p, i) => (
                            <div key={p.id} className="reveal rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                                ref={rev(11 + i)}
                                style={{ background: '#1A1F2E', border: '1px solid #2D3748' }}>
                                {/* Toggle tabs */}
                                <div className="flex border-b" style={{ borderColor: '#2D3748' }}>
                                    <button onClick={() => setActiveTab(activeTab === i * 2 ? null : i * 2)}
                                        className="flex-1 py-3 text-xs font-bold transition-all"
                                        style={{
                                            background: activeTab !== i * 2 + 1 ? 'rgba(229,62,62,0.08)' : 'transparent',
                                            color: activeTab !== i * 2 + 1 ? '#FC8181' : '#718096',
                                            borderRight: '1px solid #2D3748',
                                        }}>
                                        ✕ Without AI
                                    </button>
                                    <button onClick={() => setActiveTab(activeTab === i * 2 + 1 ? null : i * 2 + 1)}
                                        className="flex-1 py-3 text-xs font-bold transition-all"
                                        style={{
                                            background: activeTab === i * 2 + 1 ? 'rgba(129,178,154,0.08)' : 'transparent',
                                            color: activeTab === i * 2 + 1 ? '#81B29A' : '#718096',
                                        }}>
                                        ✓ With BazzAI
                                    </button>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <span className="text-3xl flex-shrink-0">{p.icon}</span>
                                        <div className="flex-1">
                                            <div className="flex items-baseline gap-3 mb-2">
                                                <span className="text-2xl font-black" style={{ fontFamily: 'var(--font-headline)', color: activeTab === i * 2 + 1 ? '#81B29A' : p.color }}>{p.stat}</span>
                                                <span className="text-xs" style={{ color: '#718096' }}>{p.statLabel}</span>
                                            </div>
                                            <h3 className="text-base font-bold mb-2" style={{ color: '#F4F1DE' }}>{p.title}</h3>
                                            <p className="text-sm leading-relaxed" style={{ color: '#A0AEC0' }}>
                                                {activeTab === i * 2 + 1 ? p.after : p.before}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
          LIVE DASHBOARD PREVIEW
      ══════════════════════════════════════════════ */}
            <section className="py-24 px-6" style={{ background: '#111827' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 reveal" ref={rev(20)}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
                            style={{ background: 'rgba(129,178,154,0.1)', border: '1px solid rgba(129,178,154,0.2)', color: '#81B29A' }}>
                            <Zap size={11} /> Live Dashboard Preview
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-headline)', letterSpacing: '-0.02em' }}>
                            One Screen. Every Answer.
                        </h2>
                        <p className="text-lg max-w-xl mx-auto" style={{ color: '#718096' }}>
                            Click the tabs below to explore how BazzAI surfaces intelligence from your factory floor in real time.
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto reveal" ref={rev(21)}>
                        <DashboardPreview />
                    </div>
                    <div className="text-center mt-8">
                        <button onClick={() => window.dispatchEvent(new Event('openBookingModal'))}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-105"
                            style={{ background: 'rgba(224,122,95,0.15)', border: '1px solid rgba(224,122,95,0.3)', color: '#E07A5F' }}>
                            See Live Dashboard with Your Data <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════ */}
            <section className="py-24 px-6" style={{ background: '#0F1419' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 reveal" ref={rev(25)}>
                        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4"
                            style={{ background: 'rgba(242,204,143,0.08)', border: '1px solid rgba(242,204,143,0.2)', color: '#F2CC8F' }}>
                            How the AI Brain Works
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-headline)', letterSpacing: '-0.02em' }}>
                            From Raw Data to<br />
                            <span style={{ color: '#F2CC8F' }}>Competitive Intelligence</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {howItWorks.map((step, i) => (
                            <div key={i} className="reveal relative" ref={rev(26 + i)}>
                                {i < 3 && (
                                    <div className="hidden lg:block absolute top-8 left-full w-full z-0 pointer-events-none">
                                        <div className="h-px w-full opacity-20" style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }} />
                                    </div>
                                )}
                                <div className="relative z-10 rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-2"
                                    style={{ background: '#1A1F2E', border: `1px solid ${step.color}30` }}>
                                    <div className="text-4xl mb-4">{step.icon}</div>
                                    <div className="font-mono text-sm font-bold mb-2" style={{ color: step.color }}>{step.step}</div>
                                    <h3 className="text-xl font-black mb-3" style={{ color: '#F4F1DE', fontFamily: 'var(--font-headline)' }}>{step.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: '#A0AEC0' }}>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
          AI DEMO — mobile version
      ══════════════════════════════════════════════ */}
            <section className="py-24 px-6 lg:hidden" style={{ background: '#111827' }}>
                <div className="max-w-lg mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-black mb-2" style={{ fontFamily: 'var(--font-headline)' }}>Ask Your Factory Anything</h2>
                        <p className="text-sm" style={{ color: '#718096' }}>Try the AI demo — powered by mock factory data</p>
                    </div>
                    <AIDemoWidget />
                </div>
            </section>



            {/* ══════════════════════════════════════════════
          TRUST & CREDIBILITY
      ══════════════════════════════════════════════ */}
            <section className="py-20 px-6 border-y" style={{ background: '#1A1F2E', borderColor: '#2D3748' }}>
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {[
                            { icon: <Shield size={28} />, label: 'Bank-Grade Security', sub: 'Audit Score A- (92/100)', color: '#81B29A' },
                            { icon: <Globe size={28} />, label: 'Data Stays in Africa', sub: 'Nairobi & Lagos servers. On-premise option.', color: '#4299E1' },
                            { icon: <Award size={28} />, label: 'Compliance Ready', sub: 'KRA ETR · KEBS · NDPR · POPIA', color: '#F2CC8F' },
                        ].map((b, i) => (
                            <div key={i} className="reveal flex flex-col items-center gap-3" ref={rev(42 + i)}>
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${b.color}15`, color: b.color }}>
                                    {b.icon}
                                </div>
                                <p className="font-bold text-sm" style={{ color: '#F4F1DE' }}>{b.label}</p>
                                <p className="text-xs" style={{ color: '#718096' }}>{b.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
          TESTIMONIALS — marquee
      ══════════════════════════════════════════════ */}
            <section className="py-24 border-b" style={{ background: '#0F1419', borderColor: '#2D3748' }}>
                <div className="max-w-7xl mx-auto px-6 mb-14">
                    <div className="text-center reveal" ref={rev(48)}>
                        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4"
                            style={{ background: 'rgba(242,204,143,0.08)', border: '1px solid rgba(242,204,143,0.2)', color: '#F2CC8F' }}>
                            From the Factory Floor
                        </div>
                        <h2 className="text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-headline)', letterSpacing: '-0.02em' }}>
                            Manufacturers Across Africa<br />Trust BazzAI
                        </h2>
                        <p className="text-sm" style={{ color: '#718096' }}>Real results from real factories — not generic tech testimonials.</p>
                    </div>
                </div>

                <div className="relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10"
                        style={{ background: 'linear-gradient(to right, #0F1419, transparent)' }} />
                    <div className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10"
                        style={{ background: 'linear-gradient(to left, #0F1419, transparent)' }} />
                    <div className="marquee-track px-4 py-4">
                        {testimonials.map((t, i) => (
                            <div key={i}
                                className="w-[340px] md:w-[420px] flex-shrink-0 whitespace-normal p-6 rounded-2xl flex flex-col"
                                style={{
                                    background: t.dark ? '#1A1F2E' : '#111827',
                                    border: `1px solid ${t.dark ? 'rgba(224,122,95,0.2)' : '#2D3748'}`,
                                }}>
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} fill="#F2CC8F" className="w-3.5 h-3.5" style={{ color: '#F2CC8F' }} />
                                    ))}
                                    <span className="ml-2 text-base">{t.country}</span>
                                </div>
                                <p className="text-sm leading-relaxed mb-5 flex-grow" style={{ color: '#A0AEC0' }}>
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-xs text-white flex-shrink-0"
                                        style={{ background: t.dark ? '#E07A5F' : '#3D405B' }}>
                                        {t.initials}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold" style={{ color: '#F4F1DE' }}>{t.role}</p>
                                        <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#718096' }}>{t.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════ */}
            <section className="py-32 px-6 relative overflow-hidden" style={{ background: '#0F1419' }}>
                <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(224,122,95,0.12) 0%, transparent 60%)' }} />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6"
                        style={{ background: 'rgba(224,122,95,0.1)', border: '1px solid rgba(224,122,95,0.2)', color: '#E07A5F' }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#E07A5F' }} />
                        Ready to give your factory a brain?
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-6" style={{ fontFamily: 'var(--font-headline)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                        14 Days to See<br />
                        <span style={{ background: 'linear-gradient(135deg, #E07A5F, #F2CC8F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>the Difference.</span>
                    </h2>
                    <p className="text-xl mb-10" style={{ color: '#718096', lineHeight: 1.7 }}>
                        Start your free pilot today. We&apos;ll configure BazzAI around your actual machines and data — no commitment, no setup fee, cancel anytime.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Link href="/register"
                            className="px-10 py-5 rounded-xl font-black text-lg text-white transition-all hover:scale-105 shadow-2xl flex items-center gap-2 justify-center pulse-glow"
                            style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}>
                            Start My Free 14-Day Pilot <ArrowRight size={20} />
                        </Link>
                        <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="px-10 py-5 rounded-xl font-bold text-lg transition-all flex items-center gap-2 justify-center"
                            style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#F4F1DE' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                            <MessageSquare size={20} /> Chat with a Specialist
                        </Link>
                    </div>
                    <p className="text-xs" style={{ color: '#3D405B' }}>
                        Serving manufacturers in Kenya · Nigeria · Uganda · Ghana · Tanzania
                    </p>
                </div>
            </section>

            <Footer />

            {/* Sticky mobile CTA */}
            <div className="sticky-mobile-cta slide-up border-t" style={{ borderColor: '#2D3748', background: '#0F1419' }}>
                <div className="flex gap-2 p-3">
                    <Link href="/register"
                        className="flex-1 py-3 rounded-xl text-white font-black text-xs text-center flex items-center justify-center gap-1 pulse-glow"
                        style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}>
                        🚀 Start Free Pilot
                    </Link>
                    <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                        className="flex-1 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-1"
                        style={{ background: '#1A1F2E', border: '1px solid #2D3748', color: '#F4F1DE' }}>
                        💬 Chat Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
