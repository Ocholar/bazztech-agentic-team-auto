import { ArrowRight, BookOpen, Calendar, Clock, Share2, Tag } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function BlogHome() {
    const posts = [
        {
            id: 1,
            title: "How BazzAI is Revolutionizing MSMEs in Kenya",
            excerpt: "Discover how specialized AI agents are helping local businesses save over 40 hours a week on customer service and payments.",
            date: "Mar 23, 2026",
            readTime: "5 min read",
            category: "Case Study",
            image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "Understanding Jenga API: Automated Accounting",
            excerpt: "A deep dive into how Bazz-Flow integrates with Equity Bank to reconcile your bank statement with 100% accuracy.",
            date: "Mar 20, 2026",
            readTime: "8 min read",
            category: "Technical",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "The Rise of Agentic AI: Why Chatbots are Dead",
            excerpt: "Moving beyond simple Q&A. Why autonomous agents are the next big frontier for business efficiency in Africa.",
            date: "Mar 15, 2026",
            readTime: "6 min read",
            category: "Insights",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            {/* Blog Header */}
            <header className="border-b border-slate-100 py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-2 mb-4 text-red-600 font-bold uppercase tracking-widest text-xs">
                        <BookOpen size={16} /> Bazztech AI Insights
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                        The Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Business Automation.</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl">
                        Deep dives, case studies, and the latest updates on the AI Agentic revolution in Kenya.
                    </p>
                </div>
            </header>

            {/* Main Feed */}
            <main className="py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid gap-16">
                        {posts.map((post) => (
                            <article key={post.id} className="group grid md:grid-cols-2 gap-8 items-center cursor-pointer">
                                <div className="overflow-hidden rounded-3xl aspect-video bg-slate-100 border border-slate-200 shadow-sm transition-all group-hover:shadow-xl group-hover:border-red-100">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4">
                                        <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 uppercase tracking-wider">{post.category}</span>
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-red-600 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-slate-500 leading-relaxed mb-6">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 text-red-600 font-bold group-hover:translate-x-2 transition-transform">
                                        Read Story <ArrowRight size={18} />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Newsletter Section */}
                    <div className="mt-24 p-12 rounded-[40px] bg-slate-900 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Share2 size={120} />
                        </div>
                        <div className="relative z-10 max-w-xl">
                            <h3 className="text-3xl font-bold mb-4">Get the weekly digest.</h3>
                            <p className="text-slate-400 mb-8">Join 500+ forward-thinking business owners getting AI insights delivered straight to their inbox.</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="name@business.com"
                                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-red-500 transition-colors"
                                />
                                <button className="px-6 py-3 bg-red-600 rounded-xl font-bold hover:bg-red-700 transition-all">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-100">
                <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
                    <div className="text-2xl font-black tracking-tighter">
                        Bazz<span className="text-red-600">AI</span>
                    </div>
                    <Link href="https://bazztech.co.ke" className="text-sm font-bold text-slate-400 hover:text-red-600 transition-colors">
                        Back to Home
                    </Link>
                </div>
            </footer>
        </div>
    );
}
