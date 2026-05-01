"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Briefcase, ArrowRight, Clock, Globe } from 'lucide-react';

const openRoles = [
    {
        title: 'Full-Stack AI Engineer',
        team: 'Engineering',
        location: 'Nairobi / Remote',
        type: 'Full-time',
        description: 'Build and ship core BazzAI features — n8n orchestration, vector database integrations, and real-time dashboard analytics. You will own features end-to-end in a Next.js + Postgres + Pinecone stack.',
    },
    {
        title: 'Deployment Strategist',
        team: 'Operations',
        location: 'Nairobi',
        type: 'Full-time',
        description: 'Work directly with factory managers to map their machine sensors, configure BazzAI predictive models, and ensure successful pilot execution on the factory floor.',
    },
    {
        title: 'AI Solutions Architect',
        team: 'Product',
        location: 'Remote',
        type: 'Contract',
        description: 'Design robust data ingestion pipelines and prompt architectures that make BazzAI highly accurate for complex manufacturing queries and Holt-Winters forecasting.',
    },
];

export default function CareersPage() {
    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#0F1419', color: '#A0AEC0', fontFamily: 'Inter, sans-serif' }}>
            <Header />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 50%, #E07A5F, transparent 60%)' }} />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest mb-6"
                        style={{ border: '1px solid rgba(224,122,95,0.3)', background: 'rgba(224,122,95,0.1)', color: '#E07A5F' }}>
                        <Briefcase size={14} /> Careers at BazzAI
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Build the Future of<br />
                        <span style={{ color: '#E07A5F' }}>African Manufacturing.</span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        We're an elite team building the intelligence layer for African factories. Join us to deploy high-impact AI into real-world operations.
                    </p>
                </div>
            </section>

            {/* Why Join */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <Globe size={24} />, title: 'Pan-African Impact', desc: 'Your code directly predicts machine failures and optimizes inventory in factories across Kenya, Nigeria, Uganda, and Ghana.' },
                        { icon: <Clock size={24} />, title: 'Ship Neural Nets Weekly', desc: 'We deploy to production fast. No bureaucracy, no 6-month roadmaps. You ship features that factory managers use the next day.' },
                        { icon: <Briefcase size={24} />, title: 'Ownership & Growth', desc: 'Early team members shape the product, the models, and the company direction. We hire builders, not seat-warmers.' },
                    ].map((item, i) => (
                        <div key={i} className="p-8 rounded-2xl border shadow-sm transition-all hover:-translate-y-1" style={{ background: '#1A202C', borderColor: '#2D3748' }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-[#0F1419]" style={{ background: '#81B29A' }}>{item.icon}</div>
                            <h3 className="font-black text-lg mb-3 text-[#F4F1DE]">{item.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Open Roles */}
            <section className="py-24 px-6 border-t border-slate-800" style={{ background: '#141A23' }}>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black mb-4 text-[#F4F1DE]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Open Roles</h2>
                        <p className="text-slate-400">Don't see a fit? Email <a href="mailto:careers@bazztech.co.ke" className="font-bold underline" style={{ color: '#E07A5F' }}>careers@bazztech.co.ke</a> with what you'd bring.</p>
                    </div>
                    <div className="space-y-6">
                        {openRoles.map((role, i) => (
                            <div key={i} className="border rounded-2xl p-8 hover:shadow-lg transition-all" style={{ background: '#1A202C', borderColor: '#2D3748' }}>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl font-black text-[#F4F1DE]">{role.title}</h3>
                                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-bold text-slate-400">
                                            <span className="px-3 py-1 rounded-full text-[#81B29A]" style={{ background: 'rgba(129,178,154,0.1)' }}>{role.team}</span>
                                            <span className="flex items-center gap-1"><MapPin size={12} />{role.location}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} />{role.type}</span>
                                        </div>
                                    </div>
                                    <a href={`mailto:careers@bazztech.co.ke?subject=Application: ${role.title}`}
                                        className="px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 inline-flex items-center gap-2 flex-shrink-0 shadow-lg"
                                        style={{ background: 'linear-gradient(135deg, #E07A5F, #C5654A)' }}>
                                        Apply <ArrowRight size={16} />
                                    </a>
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed">{role.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6 border-t text-center border-slate-800" style={{ background: '#0F1419' }}>
                <p className="text-slate-400 mb-4 text-sm">Know someone who'd be a great fit?</p>
                <p className="font-bold text-sm text-[#F4F1DE]">Share this page or send them to <a href="mailto:careers@bazztech.co.ke" className="underline" style={{ color: '#E07A5F' }}>careers@bazztech.co.ke</a></p>
            </section>

            <Footer />
        </div>
    );
}
