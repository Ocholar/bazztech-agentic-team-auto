import { Target, Users, Code, Building, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white text-slate-900 pb-24">

            {/* Header / Hero */}
            <div className="w-full bg-slate-50 border-b border-slate-200 pt-32 pb-20 px-8 text-center relative">
                <div className="max-w-3xl mx-auto relative z-10">
                    <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-6">
                        Bridging the Gap Between Data & <span className="text-blue-600">Business Intelligence</span>
                    </h1>
                    <p className="text-xl text-slate-600 font-medium">
                        We don't just store data. We actively trigger business growth through high-level machine learning and event-driven intelligence.
                    </p>
                </div>
            </div>

            {/* Founder Story */}
            <section className="w-full max-w-5xl px-8 py-24">
                <div className="grid md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-5 relative">
                        {/* 
                          The image relies on p1.jpg existing in the public folder. 
                          By default Next.js maps /p1.jpg to public/p1.jpg.
                        */}
                        <div className="w-full aspect-square bg-slate-200 rounded-3xl overflow-hidden relative shadow-xl">
                            <Image src="/p1.jpg" alt="Reagan Ochola, Founder of BazzAI" layout="fill" objectFit="cover" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                            <h4 className="font-black text-slate-900">Reagan Ochola</h4>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Founder & CEO</p>
                        </div>
                    </div>

                    <div className="md:col-span-7 space-y-6">
                        <h2 className="text-3xl font-black tracking-tight">The Founding Story</h2>

                        <div className="prose prose-lg text-slate-600">
                            <p>
                                Reagan Ochola is a Strategic Data Architect and the Founder of BazzAI, specializing in bridging the gap between raw data and mission-critical business intelligence. With a B.Sc. in Statistics and an M.Sc. in Project Management, Reagan has spent his career at the intersection of predictive analytics and operational efficiency.
                            </p>
                            <p>
                                His professional background is rooted in Data Science and Monitoring, Evaluation, and Learning (MEL), where he developed complex algorithmic models to analyze agricultural trends (such as the Maize Yield Insights project) and automated large-scale data workflows.
                            </p>
                            <p>
                                Seeing the immense value generated for international manufacturers like <strong>Dakri Cartons in Mauritius</strong>, Reagan founded BazzAI to democratize high-level machine learning and low-code automation. By leveraging tools like n8n and Google Cloud, he builds systems that don't just store data, but actively trigger business growth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company History & Milestones */}
            <section className="w-full max-w-5xl px-8 py-16 mb-16 bg-slate-900 rounded-[40px] text-white">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl font-black tracking-tight">Company Milestones</h2>
                    <p className="text-slate-400 mt-2 font-medium">From inception to high-value enterprise infrastructure.</p>
                </div>

                <div className="grid sm:grid-cols-3 gap-8">
                    <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                        <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                            <Building size={24} />
                        </div>
                        <h4 className="text-xl font-black mb-2">Execution Year: 2025</h4>
                        <p className="text-sm text-slate-400">Founded as an evolution of Bazztech Networks to focus entirely on high-value enterprise AI infrastructure.</p>
                    </div>

                    <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                        <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                            <Code size={24} />
                        </div>
                        <h4 className="text-xl font-black mb-2">Predictive Engines</h4>
                        <p className="text-sm text-slate-400">Launch of the "AgroDashboard" and "Maize Yield" predictive analytics projects. Architecture of multi-tenant educational platforms (cbcflow.co.ke).</p>
                    </div>

                    <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                        <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                            <Target size={24} />
                        </div>
                        <h4 className="text-xl font-black mb-2">Autonomous Operations</h4>
                        <p className="text-sm text-slate-400">Development of a 24/7 autonomous sales and lead generation engine, scaling through founder-led, high-value enterprise contracts.</p>
                    </div>
                </div>
            </section>

            {/* Trusted By / Certifications (Placeholder for Logo wall) */}
            <section className="w-full max-w-5xl px-8 pt-8 text-center">
                <div className="mb-8">
                    <h2 className="text-2xl font-black tracking-tight text-slate-900">Proven in Production</h2>
                    <p className="text-slate-500 font-medium">Powering autonomous decisions across manufacturing and software integrations.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 items-center select-none pointer-events-none mb-12">
                    {/* Dakri Cartons Highlight */}
                    <div className="px-8 py-4 bg-red-50 border border-red-100 rounded-2xl font-black text-red-600 tracking-widest text-xl shadow-lg">Dakri Cartons (Mauritius)</div>
                    <div className="px-6 py-3 bg-slate-100 rounded-xl font-black text-slate-400 tracking-widest text-lg">N8N</div>
                    <div className="px-6 py-3 bg-slate-100 rounded-xl font-black text-slate-400 tracking-widest text-lg">Salesforce</div>
                    <div className="px-6 py-3 bg-slate-100 rounded-xl font-black text-slate-400 tracking-widest text-lg">Stripe</div>
                    <div className="px-6 py-3 bg-slate-100 rounded-xl font-black text-slate-400 tracking-widest text-lg">M-Pesa</div>
                </div>
            </section>

        </main>
    )
}
