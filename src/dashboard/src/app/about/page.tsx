"use client";
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowRight, Factory, BarChart2, ShieldCheck, Code2,
    Network, Layers, Activity, Briefcase, BrainCircuit, Database
} from 'lucide-react';

const stats = [
    { val: '75+', label: 'ML Models Deployed' },
    { val: '3M+', label: 'Data Points Analyzed' },
    { val: '98%', label: 'Prediction Accuracy' },
    { val: '5', label: 'African Countries' },
];

const capabilities = [
    {
        icon: <BrainCircuit size={22} />,
        title: 'Deep Machine Learning',
        desc: 'Advanced neural networks and statistical models (Holt-Winters) that adapt to your factory’s specific rhythm. We predict machine failure before human operators can detect an anomaly.',
    },
    {
        icon: <Database size={22} />,
        title: 'Data Science & Analytics',
        desc: 'We transform unstructured operational noise into clean, structured data lakes. Our analytical engines process terabytes of telemetry to surface actionable business intelligence.',
    },
    {
        icon: <Network size={22} />,
        title: 'Domain-Aware Architecture',
        desc: 'Backed by robust scientific methods, Python data processing pipelines, and high-dimensional vector search logic tailored explicitly for complex manufacturing environments.',
    },
    {
        icon: <Activity size={22} />,
        title: 'Predictive Operations',
        desc: 'Moving from reactive maintenance to prescriptive forecasting. Our algorithms tell you what will happen, when it will happen, and exactly what parts you need to fix it.',
    },
];

const values = [
    { icon: <BarChart2 size={18} />, title: 'Scientific Precision', body: 'We don’t guess. Every decision BazzAI recommends is backed by rigorous statistical analysis and validated machine learning principles.' },
    { icon: <ShieldCheck size={18} />, title: 'Enterprise-Grade Security', body: 'Bank-grade encryption ensures your proprietary production data points remain isolated and entirely sovereign.' },
    { icon: <Code2 size={18} />, title: 'Engineering Excellence', body: 'Built by data scientists and systems architects who understand that software in a factory must be resilient, fault-tolerant, and relentlessly accurate.' },
];

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col items-center" style={{ background: '#0F1419', color: '#A0AEC0', fontFamily: 'Inter, sans-serif' }}>
            <Header />

            {/* ── HERO — Company Focus ── */}
            <section className="w-full relative pt-36 pb-28 px-8 overflow-hidden border-b border-slate-800" style={{ background: 'linear-gradient(135deg, #1A202C 0%, #0F1419 100%)' }}>
                <div className="absolute top-0 right-1/4 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-10" style={{ background: '#E07A5F' }} />
                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest mb-8"
                        style={{ border: '1px solid #2D3748', background: '#141A23', color: '#81B29A' }}>
                        <BrainCircuit size={14} /> The Science of Manufacturing
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Pioneering AI For<br />
                        <span style={{ color: '#E07A5F' }}>African Industry.</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-slate-400">
                        Bazztech is the leader in manufacturing AI solutions. We combine advanced machine learning, rigorous data science, and deep analytics to build the intelligent nervous system for modern African factories.
                    </p>
                </div>
            </section>

            {/* ── STAT BAR ── */}
            <section className="w-full py-12 px-8 border-b border-slate-800" style={{ background: '#141A23' }}>
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <div className="text-3xl md:text-4xl font-black text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.val}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#E07A5F] mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── MISSION ── */}
            <section className="w-full max-w-5xl px-8 py-24">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
                            style={{ background: '#1A202C', color: '#F2CC8F', border: '1px solid #2D3748' }}>
                            Our Methodology
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6 leading-tight text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Intelligence Backed By<br />Scientific Rigor.
                        </h2>
                        <p className="leading-relaxed mb-5 font-medium text-slate-400">
                            True AI is not just a buzzword; it is the application of disciplined scientific methods to chaotic data. African manufacturing floors generate millions of data points every day — from temperature fluctuations in agro-processing to micro-vibrations in FMCG packaging lines.
                        </p>
                        <p className="leading-relaxed mb-5 font-medium text-slate-400">
                            Bazztech’s engineering DNA is steeped in complex data science. By utilizing Python-driven analytical models, statistical forecasting algorithms, and robust machine learning principles, we translate that raw operational noise into deterministic foresight.
                        </p>
                        <p className="leading-relaxed font-medium text-slate-400">
                            We exist to give factory operators the same predictive power and technological leverage enjoyed by the world's most advanced technology firms.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {values.map((p) => (
                            <div key={p.title} className="flex gap-5 border rounded-3xl p-6 hover:shadow-lg transition-all" style={{ background: '#141A23', borderColor: '#2D3748' }}>
                                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)', color: 'white' }}>
                                    {p.icon}
                                </div>
                                <div>
                                    <p className="font-black text-sm mb-1.5 text-[#F4F1DE]">{p.title}</p>
                                    <p className="text-slate-400 text-[13px] leading-relaxed">{p.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CAPABILITIES ── */}
            <section className="w-full py-24 px-8 border-t border-slate-800" style={{ background: '#1A202C' }}>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Core Competencies</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto font-medium">The intersection of manufacturing operations and advanced computer science.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {capabilities.map((d) => (
                            <div key={d.title} className="bg-[#0F1419] border border-slate-800 rounded-[28px] p-8 hover:border-slate-600 transition-colors">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-[#0F1419]" style={{ background: '#81B29A' }}>
                                    {d.icon}
                                </div>
                                <h3 className="font-black text-lg mb-3 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{d.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{d.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FOUNDER ── */}
            <section className="w-full py-24 px-8 border-t border-slate-800">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                    <div className="relative w-48 h-48 rounded-[2rem] overflow-hidden border border-slate-700 shadow-2xl flex-shrink-0">
                        <Image src="/reagan.jpg" alt="Reagan Ochola" width={200} height={200}
                            className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3"
                            style={{ background: '#141A23', color: '#4299E1', border: '1px solid #2D3748' }}>
                            Leadership
                        </div>
                        <h3 className="text-3xl font-black mb-1 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Reagan Ochola</h3>
                        <p className="text-sm font-bold mb-5" style={{ color: '#E07A5F' }}>Founder & Chief Operations Architect</p>
                        <p className="text-slate-400 text-base leading-relaxed max-w-lg">
                            Reagan brings an uncompromising standard of data science to the industrial sector. With deep expertise spanning backend systems architecture, python analytics, and applied machine learning, he founded Bazztech to introduce authentic, scientificly-backed AI to the sprawling complexities of African manufacturing.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── JOIN US / CAREERS BANNER ── */}
            <section className="w-full py-16 px-8 border-t border-slate-800" style={{ background: '#1A202C' }}>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <Briefcase size={24} style={{ color: '#F2CC8F' }} />
                            <h3 className="text-2xl font-black text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Join the Lab</h3>
                        </div>
                        <p className="text-slate-400 text-base max-w-md leading-relaxed">
                            We are always looking for exceptional data scientists, ML engineers, and systems architects to help us build the definitive AI infrastructure for factories.
                        </p>
                    </div>
                    <Link href="/careers"
                        className="px-8 py-4 rounded-xl font-bold text-[#F4F1DE] transition-transform hover:scale-105 inline-flex items-center gap-2 flex-shrink-0 shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}>
                        View Open Roles <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="w-full py-24 px-8" style={{ background: '#0F1419' }}>
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-[40px] p-12 md:p-16 text-center shadow-2xl text-[#F4F1DE] relative overflow-hidden" style={{ background: '#141A23', border: '1px solid #2D3748' }}>
                        <div className="absolute top-0 left-0 w-full h-2" style={{ background: 'linear-gradient(90deg, #E07A5F, #F2CC8F, #81B29A)' }} />
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Talk Data With Us.
                        </h2>
                        <p className="mb-10 max-w-xl mx-auto font-medium text-lg leading-relaxed text-slate-400">
                            Schedule a technical briefing. We'll show you exactly how our machine learning models will intersect with your raw factory telemetry.
                        </p>
                        <Link href="/register"
                            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black transition-transform hover:scale-105 shadow-xl text-base"
                            style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)', color: '#F4F1DE' }}>
                            Request Technical Audit <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
