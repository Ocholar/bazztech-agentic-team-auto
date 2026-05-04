import { getBySlug } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronLeft, Globe, Zap, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default async function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
    const cs = getBySlug('case-studies', params.slug);

    if (!cs) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#0F1117] text-white">
            <Header />

            <article className="max-w-4xl mx-auto px-4 py-24">
                <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-12 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Back to Case Studies
                </Link>

                <div className="mb-12">
                    <div className="flex items-center gap-3 text-[#81B29A] font-bold text-sm uppercase tracking-widest mb-4">
                        <Globe className="w-4 h-4" /> {cs.meta.location} · {cs.meta.industry}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight" style={{ fontFamily: 'var(--font-headline)' }}>
                        {cs.meta.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 mb-8">
                        <div className="bg-[#1A1D25] border border-white/5 rounded-xl px-5 py-4 flex-1 min-w-[200px]">
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Key Result</p>
                            <p className="text-2xl font-black text-[#E07A5F]">{cs.meta.roi}</p>
                        </div>
                        <div className="bg-[#1A1D25] border border-white/5 rounded-xl px-5 py-4 flex-1 min-w-[200px]">
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Client</p>
                            <p className="text-2xl font-black text-white">{cs.meta.client}</p>
                        </div>
                    </div>
                </div>

                <div className="prose prose-invert prose-orange max-w-none prose-headings:font-bold prose-p:text-gray-400 prose-p:leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html: cs.content.split('\n').map(l => {
                            if (l.startsWith('## ')) return `<h2 class="text-2xl font-bold mt-12 mb-6 text-white">${l.replace('## ', '')}</h2>`;
                            if (l.startsWith('**') && l.endsWith('**')) return `<strong class="text-[#81B29A]">${l.replace(/\*\*/g, '')}</strong>`;
                            if (!l.trim()) return '<br/>';
                            return `<p class="mb-4">${l}</p>`;
                        }).join('')
                    }} />

                <div className="mt-24 p-8 rounded-3xl bg-gradient-to-br from-[#E07A5F] to-[#CE5A3E] text-center shadow-2xl">
                    <Zap className="w-12 h-12 text-white mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to achieve similar results?</h3>
                    <p className="text-white/80 mb-8 max-w-lg mx-auto">
                        Join 100+ manufacturers across Africa using BazzAI to dominate their markets through data.
                    </p>
                    <Link href="/register" className="inline-block bg-[#0F1117] text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl">
                        Start Your Free Pilot →
                    </Link>
                </div>
            </article>

            <Footer />
        </div>
    );
}
