"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Briefcase, ArrowRight, Clock, Globe } from 'lucide-react';
import Link from 'next/link';

const openRoles = [
    {
        title: 'Full-Stack Engineer',
        team: 'Engineering',
        location: 'Nairobi / Remote',
        type: 'Full-time',
        description: 'Build and ship core BazzAI features — WhatsApp integrations, real-time dashboards, and M-Pesa payment pipelines. You will own features end-to-end in a Next.js + Postgres stack.',
    },
    {
        title: 'Solutions Engineer',
        team: 'Operations',
        location: 'Nairobi',
        type: 'Full-time',
        description: 'Work directly with factory managers to map their workflows, configure BazzAI for their operations, and ensure successful onboarding and pilot execution.',
    },
    {
        title: 'Technical Writer',
        team: 'Product',
        location: 'Remote',
        type: 'Contract',
        description: 'Create clear onboarding guides, developer documentation, and help center articles that make BazzAI accessible to factory teams with zero technical background.',
    },
];

export default function CareersPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'var(--font-body)' }}>
            <Header />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a52 0%, #0f2439 100%)' }}>
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 50%, #ff6b35, transparent 60%)' }} />
                <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest mb-6"
                        style={{ border: '1px solid rgba(255,107,53,0.3)', background: 'rgba(255,107,53,0.1)', color: '#ff6b35' }}>
                        <Briefcase size={14} /> Careers at Bazztech
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight" style={{ fontFamily: 'var(--font-headline)' }}>
                        Build the Future of<br />
                        <span style={{ color: '#ff6b35' }}>African Manufacturing.</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        We're a small, high-impact team turning WhatsApp chaos into connected factory operations across the continent. Join us.
                    </p>
                </div>
            </section>

            {/* Why Join */}
            <section className="py-20 px-6" style={{ background: 'var(--color-bg-light)' }}>
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <Globe size={24} />, title: 'Pan-African Impact', desc: 'Your work directly improves how factories operate in Kenya, Nigeria, Uganda, Ghana, and beyond.' },
                        { icon: <Clock size={24} />, title: 'Move Fast, Ship Real', desc: 'We deploy to production weekly. No bureaucracy, no 6-month roadmaps. You ship features that factory managers use the next day.' },
                        { icon: <Briefcase size={24} />, title: 'Ownership & Growth', desc: 'Early team members shape the product, the culture, and the company direction. We hire builders, not seat-warmers.' },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl border shadow-sm" style={{ borderColor: '#e8eef4' }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white" style={{ background: 'var(--color-action)' }}>{item.icon}</div>
                            <h3 className="font-black text-base mb-3" style={{ color: 'var(--color-primary)' }}>{item.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Open Roles */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-headline)' }}>Open Roles</h2>
                        <p className="text-slate-500">Don't see a fit? Email <a href="mailto:careers@bazztech.co.ke" className="font-bold underline" style={{ color: 'var(--color-action)' }}>careers@bazztech.co.ke</a> with what you'd bring.</p>
                    </div>
                    <div className="space-y-6">
                        {openRoles.map((role, i) => (
                            <div key={i} className="border rounded-2xl p-8 hover:shadow-lg transition-all" style={{ borderColor: '#e8eef4' }}>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl font-black" style={{ color: 'var(--color-primary)' }}>{role.title}</h3>
                                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-bold text-slate-400">
                                            <span className="px-3 py-1 rounded-full bg-slate-100">{role.team}</span>
                                            <span className="flex items-center gap-1"><MapPin size={12} />{role.location}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} />{role.type}</span>
                                        </div>
                                    </div>
                                    <a href={`mailto:careers@bazztech.co.ke?subject=Application: ${role.title}`}
                                        className="px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 inline-flex items-center gap-2 flex-shrink-0"
                                        style={{ background: 'var(--color-action)' }}>
                                        Apply <ArrowRight size={16} />
                                    </a>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed">{role.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6 border-t text-center" style={{ borderColor: '#e8eef4' }}>
                <p className="text-slate-500 mb-4 text-sm">Know someone who'd be a great fit?</p>
                <p className="font-bold text-sm" style={{ color: 'var(--color-primary)' }}>Share this page or send them to <a href="mailto:careers@bazztech.co.ke" className="underline" style={{ color: 'var(--color-action)' }}>careers@bazztech.co.ke</a></p>
            </section>

            <Footer />
        </div>
    );
}
