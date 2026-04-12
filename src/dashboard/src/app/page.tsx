"use client";

import { useState } from 'react';
import {
    Bot, MessageSquare, Zap, FileText, ArrowRight, Check,
    Globe, Shield, Phone, Mail, MapPin, Menu, X, Star,
    TrendingUp, Users, Clock, Database, ChevronRight,
    Building2, Scale, Heart, Factory, Play, ExternalLink,
    Lock, Award, Info, ChevronDown, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

// Phase 1 & 2 Components
import CurrencyToggle from '@/components/CurrencyToggle';
import KenyaGrantBanner from '@/components/KenyaGrantBanner';
import ROICalculator from '@/components/ROICalculator';
import { logAnalyticsEvent } from '@/lib/analytics';
import TrustBadges from '@/components/TrustBadges';

export const dynamic = 'force-dynamic';

const WHATSAPP_NUMBER = '15558219787';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const AUDIT_URL = 'https://calendly.com/reagan-bazztech/30min';

const autonomyDefs: Record<number, { label: string; color: string; desc: string }> = {
    1: { label: 'Human-Assisted', color: 'bg-blue-100 text-blue-700 border-blue-200', desc: 'AI recommends, human approves every action.' },
    2: { label: 'Human-in-the-Loop', color: 'bg-purple-100 text-purple-700 border-purple-200', desc: 'AI performs tasks autonomously; human oversees and can intervene.' },
    3: { label: 'Conditional Autonomy', color: 'bg-orange-100 text-orange-700 border-orange-200', desc: 'AI operates within set parameters; escalates exceptions to humans.' },
    4: { label: 'Fully Autonomous', color: 'bg-green-100 text-green-700 border-green-200', desc: 'AI operates independently with self-correction. No human approval needed.' },
};

/* ─── Marquee Partners ──────────────────────────────────────────── */
const partners = [
    { name: 'OpenAI', color: '#10a37f', bg: '#f0fff8' },
    { name: 'n8n', color: '#ea4b71', bg: '#fff0f3' },
    { name: 'Stripe', color: '#635bff', bg: '#f5f4ff' },
    { name: 'WhatsApp API', color: '#25d366', bg: '#f0fff4' },
    { name: 'M-Pesa', color: '#00aa46', bg: '#f0fff5' },
    { name: 'Zoho', color: '#e42527', bg: '#fff0f0' },
    { name: 'OpenAI', color: '#10a37f', bg: '#f0fff8' },
    { name: 'n8n', color: '#ea4b71', bg: '#fff0f3' },
    { name: 'Stripe', color: '#635bff', bg: '#f5f4ff' },
    { name: 'WhatsApp API', color: '#25d366', bg: '#f0fff4' },
    { name: 'M-Pesa', color: '#00aa46', bg: '#f0fff5' },
    { name: 'Zoho', color: '#e42527', bg: '#fff0f0' },
];

/* ─── Products ──────────────────────────────────────────────────── */
const products = [
    {
        color: 'green',
        icon: <MessageSquare size={28} />,
        tag: 'Sales Automation',
        title: 'The 24/7 WhatsApp Sales Assistant',
        subtitle: 'Never miss a lead — day or night.',
        before: ['Leads wait hours for a reply', '10+ hours/week answering FAQs manually'],
        after: ['Instant AI-powered responses in < 1 second', 'Qualified leads flow directly into your CRM'],
        benefits: ['Auto-qualifies leads with smart questions', 'Answers product FAQs instantly', 'Escalates hot leads to your team', 'Runs 24/7 with zero staffing cost'],
        productId: 'BAZZ_CONNECT',
        autonomyLevel: 3,
    },
    {
        color: 'blue',
        icon: <Zap size={28} />,
        tag: 'Financial Automation',
        title: 'The Omni-Fintech Reconciliation Engine',
        subtitle: 'Close your books in minutes, not days.',
        before: ['2–3 days of manual reconciliation every month', 'Errors and missed transactions cost revenue'],
        after: ['Automated ledger sync across Stripe & M-Pesa', 'Anomalies flagged instantly before they become problems'],
        benefits: ['Cross-border payment reconciliation', 'Real-time liquidity dashboard', 'Anomaly detection & alerts', 'Automated monthly financial reports'],
        productId: 'BAZZ_FLOW',
        autonomyLevel: 2,
    },
    {
        color: 'purple',
        icon: <FileText size={28} />,
        tag: 'Document Automation',
        title: 'The Automated Invoice & Receipt Processor',
        subtitle: '99% reduction in manual data entry — guaranteed.',
        before: ['10 hours of manual invoice entry per week', 'Human errors cause costly billing disputes'],
        after: ['2 minutes of AI verification replaces hours of work', 'Data extracted, structured, and synced automatically'],
        benefits: ['AI reads any invoice format', 'Extracts amounts, dates, vendors automatically', 'Syncs to your accounting software', 'Handles bulk uploads in seconds'],
        productId: 'BAZZ_DOC',
        autonomyLevel: 2,
    },
    {
        color: 'orange',
        icon: <TrendingUp size={28} />,
        tag: 'Lead Generation',
        title: 'The AI-Powered Lead Nurturing System',
        subtitle: 'Turn social media followers into booked meetings.',
        before: ['Leads from social media fall through the cracks', 'Sales team spends 8+ hours/week on cold follow-ups'],
        after: ['Every lead captured and entered into a nurture sequence', 'Meetings booked automatically — zero back-and-forth'],
        benefits: ['Captures leads from LinkedIn, Facebook & Instagram', 'AI personalises follow-up messages', 'Auto-schedules discovery calls', 'Full pipeline visibility in real time'],
        productId: 'BAZZ_LEAD',
        autonomyLevel: 3,
    },
];

/* ─── Verticals ─────────────────────────────────────────────────── */
const verticals = [
    {
        icon: <Building2 size={32} />,
        color: 'from-blue-500 to-cyan-400',
        bg: 'bg-blue-50',
        industry: 'Real Estate',
        headline: 'More Deals. Less Admin.',
        points: ['Automated listing updates across all portals', 'AI lead nurturing from inquiry to viewing', 'Instant property FAQs via WhatsApp', 'Follow-up sequences for every prospect'],
        flagship: false,
    },
    {
        icon: <Scale size={32} />,
        color: 'from-slate-600 to-slate-400',
        bg: 'bg-slate-50',
        industry: 'Legal Services',
        headline: 'Spend Time on Cases. Not Paperwork.',
        points: ['AI-powered document intake & classification', 'Automated client onboarding workflows', 'Contract & invoice processing at scale', 'Secure, client-facing FAQ bots'],
        flagship: false,
    },
    {
        icon: <Heart size={32} />,
        color: 'from-rose-500 to-pink-400',
        bg: 'bg-rose-50',
        industry: 'Healthcare',
        headline: 'Better Patient Experience. Zero Extra Staff.',
        points: ['Appointment scheduling without a receptionist', 'Automated patient reminders & follow-ups', 'Insurance & referral form processing', '24/7 patient FAQ via WhatsApp'],
        flagship: false,
    },
    {
        icon: <Factory size={32} />,
        color: 'from-red-600 to-orange-500',
        bg: 'bg-red-50',
        industry: 'Manufacturing',
        headline: 'From Raw Data to Real-Time Intelligence.',
        points: ['Live OEE & machine fault monitoring via chat', 'Predictive inventory forecasting (99% accuracy)', 'Automated shift reports & anomaly alerts', 'Natural language access to production data'],
        flagship: true,
    },
];

/* ─── How It Works ───────────────────────────────────────────────── */
const steps = [
    { num: '01', icon: '🔍', title: 'Discovery', desc: 'We map every manual bottleneck and repetitive task in your operations — no jargon, just clarity.' },
    { num: '02', icon: '🎨', title: 'Design', desc: 'We architect a custom AI workflow tailored to your specific tools, team, and business goals.' },
    { num: '03', icon: '🚀', title: 'Deployment', desc: 'We integrate with your existing software. Zero downtime. Your team barely notices the transition.' },
    { num: '04', icon: '📈', title: 'Optimization', desc: 'We monitor performance continuously and tune workflows to deliver maximum ROI month after month.' },
];

/* ─── Stats ──────────────────────────────────────────────────────── */
const stats = [
    { value: '500+', label: 'Hours Saved Monthly' },
    { value: '99%', label: 'Data Entry Accuracy' },
    { value: '24/7', label: 'Uptime Guarantee' },
    { value: '50+', label: 'Workflows Deployed' },
];

const colorMap: Record<string, { icon: string; badge: string; border: string; btn: string }> = {
    green: { icon: 'bg-green-50 text-green-600', badge: 'bg-green-50 text-green-700 border-green-200', border: 'hover:border-green-200', btn: 'hover:bg-green-600' },
    blue: { icon: 'bg-blue-50 text-blue-600', badge: 'bg-blue-50 text-blue-700 border-blue-200', border: 'hover:border-blue-200', btn: 'hover:bg-blue-600' },
    purple: { icon: 'bg-purple-50 text-purple-600', badge: 'bg-purple-50 text-purple-700 border-purple-200', border: 'hover:border-purple-200', btn: 'hover:bg-purple-600' },
    orange: { icon: 'bg-orange-50 text-orange-600', badge: 'bg-orange-50 text-orange-700 border-orange-200', border: 'hover:border-orange-200', btn: 'hover:bg-orange-600' },
};

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [caseTab, setCaseTab] = useState<'exec' | 'tech'>('exec');
    const [emailModalOpen, setEmailModalOpen] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/leads/capture', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: emailValue,
                    type: 'case_study_request',
                    metadata: { page: 'homepage' }
                })
            });
            if (res.ok) {
                logAnalyticsEvent("lead_captured", { type: 'case_study_request', page: 'homepage' });
                setEmailSent(true);
                setTimeout(() => {
                    setEmailModalOpen(false);
                    setEmailSent(false);
                    setEmailValue('');
                    setLoading(false);
                }, 3000);
            }
        } catch (err) {
            console.error('Submission failed', err);
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-white text-slate-900 font-sans overflow-x-hidden">

            {/* ── GLOBAL CSS FOR MARQUEE + TOOLTIPS + DROPDOWN ── */}
            <style>{`
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .marquee-track { display: flex; gap: 1rem; animation: marquee 28s linear infinite; width: max-content; }
                .marquee-track:hover { animation-play-state: paused; }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
                .fade-up { animation: fadeInUp 0.6s ease both; }
                @keyframes floatPulse { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
                .float { animation: floatPulse 4s ease-in-out infinite; }
                .autonomy-tooltip { position: relative; display: inline-flex; }
                .autonomy-tooltip .tip { display: none; position: absolute; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%);
                    background: #1e293b; color: #fff; font-size: 11px; padding: 6px 10px; border-radius: 8px; white-space: nowrap; z-index: 99; max-width: 240px; white-space: normal; text-align: center; line-height: 1.4; }
                .autonomy-tooltip:hover .tip { display: block; }
                .solutions-dropdown { position: relative; }
                .solutions-dropdown-menu { display: none; position: absolute; top: calc(100% + 8px); left: -24px;
                    background: white; border: 1px solid #f1f5f9; border-radius: 16px; padding: 8px;
                    min-width: 240px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); z-index: 100; }
                .solutions-dropdown:hover .solutions-dropdown-menu { display: block; }
                .solutions-dropdown-menu a { display: block; padding: 10px 14px; border-radius: 10px; font-size: 13px; font-weight: 600;
                    color: #334155; transition: background 0.15s; text-decoration: none; }
                .solutions-dropdown-menu a:hover { background: #f8fafc; color: #dc2626; }
                .sticky-mobile-cta { position: fixed; bottom: 0; left: 0; right: 0; z-index: 60; display: none; }
                @media (max-width: 767px) { .sticky-mobile-cta { display: block; } }
                @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .slide-up { animation: slideUp 0.4s ease both; }
            `}</style>

            {/* ═══════════════════════════════════════════════════════════
                HEADER
            ═══════════════════════════════════════════════════════════ */}
            <header className="fixed top-0 w-full z-50 bg-white/96 backdrop-blur-sm border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white">
                            <Bot size={22} />
                        </div>
                        <span className="text-2xl font-black tracking-tight">
                            Bazz<span className="text-red-600">AI</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                        <div className="solutions-dropdown">
                            <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                                Solutions <ChevronDown size={14} />
                            </button>
                            <div className="solutions-dropdown-menu">
                                <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">By Role</div>
                                <a href="/solutions/for-ctos">🔧 For CTOs &amp; Engineering Leaders</a>
                                <a href="/solutions/for-coos">⚙️ For COOs &amp; Operations Leaders</a>
                                <a href="/solutions/for-cfos">📊 For CFOs &amp; Finance Leaders</a>
                                <div className="border-t border-slate-100 my-1" />
                                <a href="#products">All Solutions</a>
                            </div>
                        </div>
                        <Link href="#how-it-works" className="hover:text-red-600 transition-colors">How It Works</Link>
                        <Link href="#industries" className="hover:text-red-600 transition-colors">Industries</Link>
                        <Link href="#case-study" className="hover:text-red-600 transition-colors">Case Study</Link>
                        <Link href="/enterprise" className="hover:text-red-600 transition-colors">Enterprise</Link>
                        <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-full border-2 border-green-500 text-green-700 font-bold hover:bg-green-500 hover:text-white transition-all text-sm">
                            Chat with an Expert
                        </Link>
                        <button className="px-6 py-2.5 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-md shadow-red-100 text-sm" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            Book Assessment
                        </button>
                    </nav>

                    <button className="md:hidden text-slate-900 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden bg-white border-b border-slate-100 p-6 flex flex-col gap-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Solutions by Role</p>
                        <Link href="/solutions/for-ctos" onClick={() => setIsMenuOpen(false)} className="font-semibold text-slate-700 hover:text-red-600">🔧 For CTOs & Engineering Leaders</Link>
                        <Link href="/solutions/for-coos" onClick={() => setIsMenuOpen(false)} className="font-semibold text-slate-700 hover:text-red-600">⚙️ For COOs & Operations Leaders</Link>
                        <Link href="/solutions/for-cfos" onClick={() => setIsMenuOpen(false)} className="font-semibold text-slate-700 hover:text-red-600">📊 For CFOs & Finance Leaders</Link>
                        <div className="border-t border-slate-100" />
                        {['#products', '#how-it-works', '#industries', '#case-study'].map((href, i) => (
                            <Link key={i} href={href} onClick={() => setIsMenuOpen(false)}
                                className="font-semibold text-slate-700 capitalize">{href.replace('#', '').replace('-', ' ')}</Link>
                        ))}
                        <Link href="/enterprise" onClick={() => setIsMenuOpen(false)} className="font-semibold text-slate-700">Enterprise Playbook</Link>
                        <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="font-bold text-green-600">💬 Chat with an Expert</Link>
                        <button onClick={() => setIsMenuOpen(false)}
                            className="w-full py-3 rounded-xl bg-red-600 text-white font-bold text-center">
                            Book AI Opportunity Assessment
                        </button>
                    </div>
                )}
            </header>

            {/* ═══════════════════════════════════════════════════════════
                MODULE A: HERO
            ═══════════════════════════════════════════════════════════ */}
            <section className="pt-36 md:pt-48 pb-20 md:pb-32 px-6 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
                {/* Background blobs */}
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-50 rounded-full blur-[100px] opacity-50 pointer-events-none" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    <div className="flex flex-col items-start fade-up">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold mb-7">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            Already powering 50+ businesses across East Africa and beyond
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.07] mb-7">
                            Stop Revenue Leakage<br />
                            with{' '}<span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-pink-500 to-red-400">Autonomous</span><br />
                            AI Agents
                        </h1>

                        <p className="text-lg md:text-xl text-slate-500 mb-4 leading-relaxed max-w-lg">
                            We replace manual bottlenecks with intelligent workflows that work <strong className="text-slate-700">24/7</strong>.
                            Save <strong className="text-slate-700">20+ hours a week</strong> and eliminate the hidden cost of human error.
                        </p>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-8">
                            <AlertTriangle size={13} className="text-amber-500 flex-shrink-0" />
                            While your competitors automate, manual processes are costing you 15–30% in operational waste.
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-red-600 text-white font-black text-base md:text-lg hover:bg-red-700 shadow-2xl shadow-red-100 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                                Book a 15-Min AI Opportunity Assessment &amp; ROI Projection <ArrowRight size={20} />
                            </button>
                            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl border-2 border-green-400 text-green-700 font-bold text-base md:text-lg hover:bg-green-50 transition-all flex items-center justify-center gap-2">
                                <MessageSquare size={20} /> Chat with an Expert
                            </Link>
                        </div>

                        <p className="text-xs text-slate-400 mt-5 flex items-center gap-2 mb-8">
                            <Check size={14} className="text-green-500" /> No commitment, just clarity on your AI potential &nbsp;&middot;&nbsp;
                            <Check size={14} className="text-green-500" /> Results within 14 days
                        </p>

                        <div className="fade-up" style={{ animationDelay: '0.4s' }}>
                            <TrustBadges />
                        </div>
                    </div>

                    {/* Right: Dashboard visual (HTML/CSS) */}
                    <div className="hidden lg:flex justify-center">
                        <div className="float w-full max-w-md bg-slate-900 rounded-[28px] shadow-2xl shadow-slate-900/30 overflow-hidden border border-white/10">
                            {/* Window chrome */}
                            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="ml-3 text-[10px] text-white/30 font-mono">BazzAI Control Center · Live</span>
                            </div>
                            {/* Metric cards */}
                            <div className="p-5 grid grid-cols-2 gap-3">
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                    <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-1">Hours Saved / Week</p>
                                    <p className="text-4xl font-black text-white">20<span className="text-red-400">+</span></p>
                                    <p className="text-[10px] text-green-400 mt-1 flex items-center gap-1">
                                        <TrendingUp size={10} /> Up 34% vs last month
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                    <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-1">Active Workflows</p>
                                    <p className="text-4xl font-black text-white">12</p>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        {[1, 2, 3].map(n => (
                                            <span key={n} className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: `${n * 0.3}s` }} />
                                        ))}
                                        <span className="text-[10px] text-green-400">All running</span>
                                    </div>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                    <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-1">Leads Qualified Today</p>
                                    <p className="text-4xl font-black text-white">47</p>
                                    <p className="text-[10px] text-blue-400 mt-1">via WhatsApp AI</p>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                    <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-1">Invoices Processed</p>
                                    <p className="text-4xl font-black text-white">138</p>
                                    <p className="text-[10px] text-purple-400 mt-1">99% accuracy</p>
                                </div>
                            </div>
                            {/* Workflow flow strip */}
                            <div className="px-5 pb-5">
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Live Workflow</p>
                                    <div className="flex items-center justify-between gap-1">
                                        {['Trigger', 'AI Process', 'Verify', 'Sync', 'Done'].map((step, i) => (
                                            <div key={i} className="flex items-center gap-1">
                                                <div className={`px-2 py-1 rounded-md text-[9px] font-bold whitespace-nowrap ${i === 1 ? 'bg-red-600 text-white' : 'bg-white/10 text-white/50'}`}>
                                                    {step}
                                                </div>
                                                {i < 4 && <ChevronRight size={10} className="text-white/20 flex-shrink-0" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SECURITY & COMPLIANCE TRUST BAR (Module 1)
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-6 border-y border-slate-100 bg-slate-900">
                <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5 px-6">
                    Enterprise-Grade Security &amp; Compliance
                </p>
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: <Shield size={20} />, label: 'GDPR & Kenya DPA Compliant', sub: 'Full regulatory compliance', color: 'text-blue-400' },
                        { icon: <Lock size={20} />, label: 'Data Encrypted at Rest', sub: 'AES-256 & TLS 1.3', color: 'text-green-400' },
                        { icon: <Award size={20} />, label: 'Private LLM Options', sub: 'Your data never trains public models', color: 'text-purple-400' },
                        { icon: <Shield size={20} />, label: 'SOC 2 Ready Architecture', sub: 'Enterprise audit trail', color: 'text-red-400' },
                    ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                            <span className={badge.color}>{badge.icon}</span>
                            <div>
                                <p className="text-white text-xs font-bold leading-tight">{badge.label}</p>
                                <p className="text-slate-400 text-[10px] mt-0.5">{badge.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-center mt-4">
                    <Link href="/security" className="text-red-400 text-xs font-semibold hover:text-red-300 transition-colors underline underline-offset-2">
                        View full Security &amp; Data Governance page →
                    </Link>
                </p>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                STATS ROW
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-16 px-6 bg-gradient-to-r from-red-600 to-pink-600">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((s, i) => (
                        <div key={i}>
                            <p className="text-4xl md:text-5xl font-black text-white mb-2">{s.value}</p>
                            <p className="text-sm text-red-100 font-semibold">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                MODULE B: PRODUCTS (Re-engineered Bundles)
            ═══════════════════════════════════════════════════════════ */}
            <section id="products" className="py-28 px-6 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold mb-5">
                            Our AI Solutions
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4">
                            Automation Built for the{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-500">Job to be Done</span>
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">
                            Four ready-to-deploy AI systems, each designed to eliminate a specific category of manual work — and deliver measurable results from day one.
                        </p>
                        <div className="flex flex-col items-center gap-6">
                            <CurrencyToggle />
                            <div className="max-w-md w-full">
                                <KenyaGrantBanner />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {products.map((p, i) => {
                            const c = colorMap[p.color];
                            return (
                                <div key={i}
                                    className={`bg-white p-8 rounded-[28px] border-2 border-slate-100 ${c.border} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col`}>
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${c.icon}`}>
                                            {p.icon}
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${c.badge}`}>
                                            {p.tag}
                                        </span>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-black mb-1">{p.title}</h3>
                                    <p className="text-slate-500 text-sm mb-3">{p.subtitle}</p>

                                    {/* Autonomy Level Badge (Module 3) */}
                                    {p.autonomyLevel && (() => {
                                        const al = autonomyDefs[p.autonomyLevel];
                                        return (
                                            <div className="autonomy-tooltip mb-5">
                                                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border cursor-help ${al.color}`}>
                                                    <Info size={10} /> L{p.autonomyLevel} — {al.label}
                                                </span>
                                                <span className="tip">{al.desc}</span>
                                            </div>
                                        );
                                    })()}

                                    {/* Before vs After */}
                                    <div className="grid grid-cols-2 gap-3 mb-7 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Before</p>
                                            {p.before.map((b, j) => (
                                                <p key={j} className="text-xs text-slate-500 flex items-start gap-1.5 mb-1.5">
                                                    <span className="text-red-400 font-bold mt-0.5">✕</span> {b}
                                                </p>
                                            ))}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-green-600 mb-2">After</p>
                                            {p.after.map((a, j) => (
                                                <p key={j} className="text-xs text-slate-600 flex items-start gap-1.5 mb-1.5">
                                                    <span className="text-green-500 font-bold mt-0.5">✓</span> {a}
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Benefits */}
                                    <ul className="space-y-2.5 mb-8 flex-grow">
                                        {p.benefits.map((b, j) => (
                                            <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                                                <Check size={14} className="text-green-500 flex-shrink-0" /> {b}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href={`/register?product=${p.productId}`}
                                        className={`w-full py-3.5 rounded-xl bg-slate-900 text-white text-sm font-black text-center ${c.btn} transition-colors flex items-center justify-center gap-2`}>
                                        Get Started <ArrowRight size={16} />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                MODULE E: HOW IT WORKS
            ═══════════════════════════════════════════════════════════ */}
            <section id="how-it-works" className="py-28 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold mb-5">
                            Our Process
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4">From Idea to Automation in 4 Steps</h2>
                        <p className="text-slate-500 text-lg max-w-xl mx-auto">
                            We make automation simple. Here's exactly what happens after you book your free audit.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {steps.map((s, i) => (
                            <div key={i} className="relative">
                                {i < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 left-[calc(100%+0px)] w-full h-px border-t-2 border-dashed border-slate-200 z-0" />
                                )}
                                <div className="relative z-10 bg-white border-2 border-slate-100 rounded-[24px] p-7 hover:border-red-100 hover:shadow-lg transition-all h-full">
                                    <div className="flex items-center justify-between mb-5">
                                        <span className="text-4xl">{s.icon}</span>
                                        <span className="text-4xl font-black text-slate-100">{s.num}</span>
                                    </div>
                                    <h4 className="text-lg font-black mb-3">{s.title}</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-14">
                        <button className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-red-600 text-white font-black text-lg hover:bg-red-700 shadow-2xl shadow-red-100 transition-all hover:scale-105" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            Start Step 1 Today — It's Free <ArrowRight size={22} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                MODULE C: INDUSTRY VERTICALS
            ═══════════════════════════════════════════════════════════ */}
            <section id="industries" className="py-28 px-6 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold mb-5">
                            Industry Solutions
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4">
                            Your Industry. <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-500">Our Expertise.</span>
                        </h2>
                        <p className="text-slate-500 text-lg max-w-xl mx-auto">
                            We build sector-specific AI systems that understand your workflows, compliance needs, and growth goals.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {verticals.map((v, i) => (
                            <div key={i} className={`relative bg-white rounded-[28px] border-2 ${v.flagship ? 'border-red-200 shadow-xl shadow-red-50' : 'border-slate-100 hover:border-slate-200 hover:shadow-lg'} transition-all overflow-hidden group`}>
                                {v.flagship && (
                                    <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                        <Star size={10} fill="currentColor" /> Flagship Case Study
                                    </div>
                                )}
                                <div className="p-8">
                                    <div className={`w-14 h-14 rounded-2xl ${v.bg} flex items-center justify-center mb-5 bg-gradient-to-br ${v.color} text-white`}>
                                        {v.icon}
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{v.industry}</p>
                                    <h3 className="text-2xl font-black mb-5">{v.headline}</h3>
                                    <ul className="space-y-3 mb-8">
                                        {v.points.map((pt, j) => (
                                            <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600">
                                                <Check size={15} className="text-green-500 mt-0.5 flex-shrink-0" /> {pt}
                                            </li>
                                        ))}
                                    </ul>
                                    {v.flagship ? (
                                        <Link href="#case-study"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors">
                                            <Play size={14} fill="currentColor" /> See the Manufacturing Case Study
                                        </Link>
                                    ) : (
                                        <button className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-red-600 transition-colors group/link" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                                            Book a Free Audit <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                MODULE D: MANUFACTURING INTELLIGENCE CASE STUDY
            ═══════════════════════════════════════════════════════════ */}
            <section id="case-study" className="py-28 px-6 bg-slate-900 relative overflow-hidden">
                {/* BG decoration */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #ef4444 0%, transparent 50%), radial-gradient(circle at 80% 50%, #f43f5e 0%, transparent 50%)' }} />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold mb-6">
                            <Star size={10} fill="currentColor" /> Flagship Case Study
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                            Manufacturing Intelligence:<br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-pink-400 to-red-300">
                                Real-Time RAG & Predictive Forecasting
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            How we transformed raw factory telemetry into actionable production insights and <strong className="text-white">99% accurate inventory forecasting.</strong>
                        </p>
                    </div>

                    {/* Dual-Track Tab Nav (Module 5) */}
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex bg-white/10 rounded-2xl p-1.5 gap-1">
                            <button onClick={() => setCaseTab('exec')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${caseTab === 'exec' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
                                📊 Executive Summary
                            </button>
                            <button onClick={() => setCaseTab('tech')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${caseTab === 'tech' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
                                🔧 Technical Deep Dive
                            </button>
                        </div>
                    </div>

                    {caseTab === 'exec' && (
                        <div className="fade-up">
                            {/* ROI Metrics */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
                                {[
                                    { value: '40%', label: 'Reduction in Stockouts', sub: 'vs. pre-deployment baseline' },
                                    { value: '15%', label: 'OEE Improvement', sub: 'Overall Equipment Effectiveness' },
                                    { value: '2min', label: 'Query Response Time', sub: 'from hours of manual report pulling' },
                                    { value: '99%', label: 'Forecast Accuracy', sub: 'inventory planning model' },
                                ].map((m, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 rounded-[20px] p-5 text-center">
                                        <p className="text-3xl font-black text-white mb-1">{m.value}</p>
                                        <p className="text-xs font-bold text-red-400 mb-1">{m.label}</p>
                                        <p className="text-[10px] text-slate-500">{m.sub}</p>
                                    </div>
                                ))}
                            </div>
                            {/* Problem / Solution / Result */}
                            <div className="grid md:grid-cols-3 gap-6 mb-10">
                                {[
                                    { label: '🔴 Problem', color: 'border-red-500/30', heading: 'text-red-400', text: 'Factory managers spent 3–4 hours daily manually pulling shift reports, querying multiple disconnected systems, and chasing anomalies reactively — after production losses had already occurred.' },
                                    { label: '🟡 Solution', color: 'border-yellow-500/30', heading: 'text-yellow-400', text: 'BazzAI deployed a domain-aware RAG pipeline over factory telemetry, enabling natural language queries. An n8n orchestration layer paired with Holt-Winters forecasting automated inventory signals and anomaly alerts.' },
                                    { label: '🟢 Result', color: 'border-green-500/30', heading: 'text-green-400', text: 'Stockouts dropped 40%, OEE improved 15% within 90 days. Ops managers moved from reactive firefighting to proactive planning — saving 3+ hours/day and eliminating costly production pauses.' },
                                ].map((s, i) => (
                                    <div key={i} className={`bg-white/5 border ${s.color} rounded-[20px] p-6`}>
                                        <p className={`text-xs font-black uppercase tracking-widest mb-3 ${s.heading}`}>{s.label}</p>
                                        <p className="text-slate-300 text-sm leading-relaxed">{s.text}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center">
                                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-red-600 text-white font-black hover:bg-red-700 transition-all hover:scale-105" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                                    Get an ROI Projection for Your Factory <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    {caseTab === 'tech' && (
                        <div className="fade-up">
                            {/* Tech Stack */}
                            <div className="grid md:grid-cols-3 gap-6 mb-10">
                                {[
                                    { icon: '🧠', title: 'Domain-Aware RAG', desc: 'Instant natural-language access to OEE metrics, machine fault logs, and shift data. Ask "What caused the Line 3 shutdown?" — get an answer in seconds.' },
                                    { icon: '📦', title: 'Predictive Forecasting', desc: 'Automated inventory planning using Holt-Winters Triple Exponential Smoothing. Reduces stockouts and overstock waste by up to 40%.' },
                                    { icon: '⚡', title: 'Live Anomaly Monitoring', desc: 'Real-time telemetry ingestion flags production anomalies before they become line stoppages. Alerts sent directly to ops managers via WhatsApp.' },
                                ].map((f, i) => (
                                    <div key={i} className="bg-white/5 rounded-[24px] p-7 border border-white/10">
                                        <div className="text-3xl mb-4">{f.icon}</div>
                                        <h4 className="text-xl font-black text-white mb-3">{f.title}</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                                    </div>
                                ))}
                            </div>
                            {/* Tech Stack Chips */}
                            <div className="bg-white/5 rounded-[24px] border border-white/10 p-6 mb-8">
                                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Technology Stack</p>
                                <div className="flex flex-wrap gap-3">
                                    {['Pinecone (Vector DB)', 'n8n (Orchestration)', 'GPT-4o-mini (Reasoning)', 'Holt-Winters Forecasting', 'WhatsApp Business API', 'PostgreSQL', 'Python FastAPI'].map((t, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-white/10 text-slate-200 text-xs font-semibold rounded-full border border-white/10">{t}</span>
                                    ))}
                                </div>
                                {/* Autonomy Badge */}
                                <div className="mt-4 autonomy-tooltip">
                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border cursor-help bg-orange-100 text-orange-700 border-orange-200">
                                        <Info size={10} /> L3 — Conditional Autonomy
                                    </span>
                                    <span className="tip">AI operates within set parameters; escalates exceptions to human operators.</span>
                                </div>
                            </div>
                            {/* Architecture Diagram */}
                            <div className="bg-white/5 rounded-[28px] border border-white/10 p-8 md:p-10 mb-10">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-8 text-center">System Architecture</p>
                                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                                    {[
                                        { label: 'Factory Data', sub: 'Sensors & PLCs', icon: '🏭', color: 'bg-orange-500/20 border-orange-500/40 text-orange-300' },
                                        null,
                                        { label: 'n8n Orchestration', sub: 'Workflow Engine', icon: '⚙️', color: 'bg-pink-500/20 border-pink-500/40 text-pink-300' },
                                        null,
                                        { label: 'Pinecone Memory', sub: 'Vector Database', icon: '🗄️', color: 'bg-blue-500/20 border-blue-500/40 text-blue-300' },
                                        null,
                                        { label: 'GPT-4o Intelligence', sub: 'AI Reasoning', icon: '🤖', color: 'bg-green-500/20 border-green-500/40 text-green-300' },
                                        null,
                                        { label: 'Chat Interface', sub: 'User Queries', icon: '💬', color: 'bg-purple-500/20 border-purple-500/40 text-purple-300' },
                                    ].map((node, i) =>
                                        node === null ? (
                                            <div key={i} className="flex items-center">
                                                <div className="hidden md:flex items-center gap-1">
                                                    <div className="w-6 h-px bg-white/20" />
                                                    <ChevronRight size={14} className="text-white/30" />
                                                </div>
                                                <ArrowRight size={16} className="text-white/30 md:hidden" />
                                            </div>
                                        ) : (
                                            <div key={i} className={`flex flex-col items-center px-5 py-4 rounded-2xl border ${node.color} min-w-[110px] text-center`}>
                                                <span className="text-2xl mb-1">{node.icon}</span>
                                                <p className="text-sm font-black">{node.label}</p>
                                                <p className="text-[10px] opacity-60 mt-0.5">{node.sub}</p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="text-center">
                                <a href="https://github.com/Ocholar/manufacturing-rag-system" target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-slate-900 font-black text-base hover:bg-red-50 transition-all hover:scale-105 shadow-xl">
                                    View Full Source on GitHub <ExternalLink size={18} />
                                </a>
                                <p className="text-slate-500 text-sm mt-4">Opens in GitHub — full source, diagrams, and documentation available.</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                CLIENT SUCCESS STORIES (Placeholder)
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-block px-4 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-bold mb-5">
                        Client Results
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black mb-4">Stories That Speak for Themselves</h2>
                    <p className="text-slate-500 text-lg mb-16 max-w-xl mx-auto">Real businesses. Real outcomes. More case studies coming soon.</p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { industry: 'Real Estate Agency', result: '23 hours/week saved on lead follow-up', quote: '"We no longer miss a single inquiry. The WhatsApp AI handles everything — our team now focuses purely on closing." ', stars: 5 },
                            { industry: 'Healthcare Clinic', result: '90% reduction in missed appointments', quote: '"Appointment reminders went fully automated in one week. No-shows dropped dramatically and patient satisfaction went up."', stars: 5 },
                            { industry: 'Import/Export Company', result: '$3,000+ recovered in billing errors', quote: '"The reconciliation engine found mismatches we had been missing for months. ROI in the first week."', stars: 5 },
                        ].map((t, i) => (
                            <div key={i} className="bg-slate-50 rounded-[24px] p-8 border border-slate-100 text-left hover:shadow-lg transition-all">
                                <div className="flex gap-0.5 mb-4">
                                    {[...Array(t.stars)].map((_, j) => <Star key={j} size={14} className="text-yellow-400" fill="#facc15" />)}
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">{t.quote}</p>
                                <div className="border-t border-slate-200 pt-4">
                                    <p className="font-black text-sm">{t.industry}</p>
                                    <p className="text-xs text-green-600 font-bold mt-1">✓ {t.result}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                FINAL CTA BAND
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 bg-gradient-to-br from-red-600 via-red-700 to-pink-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, white, transparent 60%)' }} />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-5">
                        Ready to Reclaim 20+ Hours Every Week?
                    </h2>
                    <p className="text-red-100 text-lg mb-10">
                        Book a free 15-minute call. We'll map your biggest manual bottlenecks and show you exactly which workflows we'd automate first — no commitment, no jargon.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-10 py-4 rounded-2xl bg-white text-red-700 font-black text-lg hover:bg-red-50 transition-all hover:scale-105 shadow-2xl flex items-center gap-2" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                            Book My Free Audit <ArrowRight size={20} />
                        </button>
                        <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="px-10 py-4 rounded-2xl border-2 border-white/50 text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2">
                            <MessageSquare size={20} /> Chat with an Expert
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                FOOTER
            ═══════════════════════════════════════════════════════════ */}
            <footer className="bg-slate-900 text-white py-20 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="text-3xl font-black tracking-tight mb-4">
                            Bazz<span className="text-red-500">AI</span>
                        </div>
                        <p className="text-slate-400 max-w-sm mb-8 leading-relaxed text-sm">
                            Bazztech Networks helps businesses replace manual, repetitive work with intelligent AI workflows — so your team can focus on growth. Based in Nairobi. Serving the world.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all text-sm text-center" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                                Book a Free Audit
                            </button>
                            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                                className="px-6 py-3 border border-green-600 text-green-400 font-bold rounded-xl hover:bg-green-600 hover:text-white transition-all text-sm text-center">
                                💬 Chat with an Expert
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h5 className="text-red-500 font-black text-xs uppercase tracking-widest mb-6">Contact</h5>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li className="flex items-center gap-3">
                                <Phone size={15} className="text-red-500" />
                                <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-white transition-colors">+254 781 751 937</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={15} className="text-red-500" /> info@bazztech.co.ke
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin size={15} className="text-red-500" /> Nairobi, Kenya
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-red-500 font-black text-xs uppercase tracking-widest mb-6">Company</h5>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link href="#products" className="hover:text-white transition-colors">Solutions</Link></li>
                            <li><Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/enterprise" className="hover:text-white transition-colors">Enterprise Playbook</Link></li>
                            <li><Link href="/security" className="hover:text-white transition-colors">Security & Compliance</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">AI News &amp; Blog</Link></li>
                            <li>
                                <a href="https://github.com/Ocholar/manufacturing-rag-system" target="_blank" rel="noopener noreferrer"
                                    className="hover:text-white transition-colors flex items-center gap-1.5">
                                    Manufacturing RAG Case Study <ExternalLink size={11} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
                    <p>© 2026 Bazztech Networks. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </footer>

            {/* ─── STICKY MOBILE CTA BAR (Module 4) ─── */}
            <div className="sticky-mobile-cta slide-up border-t border-slate-200 bg-white shadow-2xl">
                <div className="flex gap-2 p-3">
                    <button className="flex-1 py-3 rounded-xl bg-red-600 text-white font-black text-xs text-center flex items-center justify-center gap-1" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                        📅 Book AI Assessment
                    </button>
                    <button onClick={() => setEmailModalOpen(true)}
                        className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center gap-1">
                        📧 Email Me Case Study
                    </button>
                </div>
            </div>

            {/* ─── EMAIL CAPTURE MODAL ─── */}
            {emailModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-[999] flex items-end sm:items-center justify-center p-4" onClick={() => setEmailModalOpen(false)}>
                    <div className="relative bg-white rounded-[24px] p-7 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setEmailModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
                            <X size={18} />
                        </button>
                        {emailSent ? (
                            <div className="text-center py-4">
                                <p className="text-4xl mb-3">🎉</p>
                                <p className="font-black text-lg">On its way!</p>
                                <p className="text-slate-500 text-sm mt-2">Check your inbox within a few minutes.</p>
                            </div>
                        ) : (
                            <>
                                <p className="font-black text-xl mb-1">Get the Case Study</p>
                                <p className="text-slate-500 text-sm mb-5">We'll email you the Manufacturing Intelligence case study with full ROI metrics and architecture diagrams.</p>
                                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
                                    <input
                                        type="email"
                                        required
                                        placeholder="your@company.com"
                                        value={emailValue}
                                        onChange={e => setEmailValue(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-400 text-sm"
                                    />
                                    <button type="submit"
                                        className="w-full py-3 rounded-xl bg-red-600 text-white font-black text-sm hover:bg-red-700 transition-colors">
                                        Send Me the Case Study →
                                    </button>
                                </form>
                                <p className="text-[10px] text-slate-400 text-center mt-3">No spam. One email, one case study.</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

