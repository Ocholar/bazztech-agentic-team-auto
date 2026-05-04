import { getAll } from '@/lib/markdown';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Globe, ArrowRight, Award } from 'lucide-react';

export default function CaseStudiesPage() {
    const cases = getAll('case-studies');

    return (
        <div className="min-h-screen bg-[#0F1117] text-white">
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
                        Proof of <span style={{ color: 'var(--color-action)' }}>ROI</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        See how manufacturers across the continent are using BazzAI to eliminate downtime, optimize stock, and pass audits with 100% accuracy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cases.map((cs) => (
                        <Link
                            key={cs.slug}
                            href={`/case-studies/${cs.slug}`}
                            className="group block bg-[#1A1D25] border border-white/5 rounded-2xl overflow-hidden hover:border-[#E07A5F]/30 transition-all shadow-xl"
                        >
                            <div className="h-48 bg-slate-800 relative overflow-hidden">
                                {cs.meta.hero_image ? (
                                    <img src={cs.meta.hero_image} alt={cs.meta.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A1D25] to-[#0F1117]">
                                        <Award className="w-12 h-12 text-[#E07A5F] opacity-20" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#E07A5F] text-xs font-bold shadow-lg">
                                    {cs.meta.roi}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-2 text-xs font-bold text-[#81B29A] mb-3 uppercase tracking-widest">
                                    <Globe className="w-3 h-3" /> {cs.meta.location}
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-[#E07A5F] transition-colors">{cs.meta.title}</h3>
                                <p className="text-sm text-gray-400 mb-6 line-clamp-3">{cs.meta.summary}</p>

                                <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:gap-4 transition-all">
                                    Read Case Study <ArrowRight className="w-4 h-4 text-[#E07A5F]" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
