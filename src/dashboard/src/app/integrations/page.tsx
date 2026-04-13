import { ArrowRight, ExternalLink, Zap } from 'lucide-react';

const integrations = [
    {
        category: 'Payment & Fintech',
        color: 'bg-blue-600',
        items: [
            { name: 'M-Pesa', logo: '💳', desc: 'Automated STK push, C2B/B2C reconciliation, and real-time settlement alerts via webhook.', docUrl: '#', status: 'live' },
            { name: 'Stripe', logo: '💳', desc: 'Live payment event ingestion, failed payment workflows, and automated Stripe-to-ledger sync via n8n.', docUrl: '#', status: 'live' },
            { name: 'PayPal', logo: '💰', desc: 'Cross-border payment capture with automated FX reconciliation and dispute flagging.', docUrl: '#', status: 'live' },
        ],
    },
    {
        category: 'Communication',
        color: 'bg-emerald-600',
        items: [
            { name: 'WhatsApp Business API', logo: '💬', desc: 'Outbound templated messages, inbound webhook routing, and AI qualifier flows via 360dialog or MetaAPI.', docUrl: '#', status: 'live' },
            { name: 'Slack', logo: '📢', desc: 'Anomaly alerts, approval workflows, and daily digest bots delivered directly to your team channels.', docUrl: '#', status: 'live' },
            { name: 'Gmail / Outlook', logo: '📧', desc: 'Email trigger pipelines for invoice processing, lead capture, and automated reply sequences.', docUrl: '#', status: 'live' },
        ],
    },
    {
        category: 'CRM & Sales',
        color: 'bg-purple-600',
        items: [
            { name: 'Salesforce', logo: '☁️', desc: 'Bidirectional sync for lead status, opportunity stages, and automated activity logging from AI agent decisions.', docUrl: '#', status: 'live' },
            { name: 'Zoho CRM', logo: '🔵', desc: 'Lead scoring updates, auto-create contacts from WhatsApp qualifier flows, and deal pipeline automation.', docUrl: '#', status: 'live' },
            { name: 'HubSpot', logo: '🟠', desc: 'Contact enrichment, automated deal creation, and follow-up sequence triggers from AI lead qualifications.', docUrl: '#', status: 'coming-soon' },
        ],
    },
    {
        category: 'Data & Intelligence',
        color: 'bg-red-600',
        items: [
            { name: 'Pinecone', logo: '🗄️', desc: 'Primary vector store for RAG pipelines. We handle namespace management, upserts, and semantic query optimization.', docUrl: '#', status: 'live' },
            { name: 'Google Sheets', logo: '📊', desc: 'Automated report generation, data ingestion from live sheets, and trigger-based workflow firing on cell changes.', docUrl: '#', status: 'live' },
            { name: 'PostgreSQL', logo: '🐘', desc: 'Core transactional database for audit trails, client data, and workflow state management.', docUrl: '#', status: 'live' },
        ],
    },
    {
        category: 'Cloud & Infrastructure',
        color: 'bg-slate-700',
        items: [
            { name: 'Google Cloud Platform', logo: '☁️', desc: 'Primary cloud provider for all compute, Cloud Run deployments, and BigQuery analytics pipelines.', docUrl: '#', status: 'live' },
            { name: 'n8n (Self-hosted)', logo: '⚙️', desc: 'Core workflow orchestration engine. We manage upgrades, queue management, and horizontal scaling.', docUrl: '#', status: 'live' },
            { name: 'AWS / Azure', logo: '🌐', desc: 'Available for clients with existing infrastructure commitments. We adapt to your cloud of choice.', docUrl: '#', status: 'live' },
        ],
    },
];

export default function IntegrationsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-slate-50 text-slate-900 pb-24">

            {/* Hero */}
            <div className="w-full bg-slate-900 text-white pt-32 pb-20 px-8 relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-slate-300 text-[10px] font-black uppercase tracking-widest mb-6">
                        <Zap size={12} /> Integration Guides
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Connects With Everything You Already Use</h1>
                    <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                        BazzAI plugs into your existing stack — no data migration, no infrastructure overhaul. Just intelligent automation layered on top of what works.
                    </p>
                </div>
            </div>

            {/* Integration Categories */}
            <section className="w-full max-w-6xl px-8 py-20 space-y-16">
                {integrations.map((cat, ci) => (
                    <div key={ci}>
                        <div className="flex items-center gap-3 mb-8">
                            <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                            <h2 className="text-2xl font-black">{cat.category}</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {cat.items.map((item, ii) => (
                                <div key={ii} className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">{item.logo}</span>
                                            <h3 className="font-black text-slate-900">{item.name}</h3>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${item.status === 'live' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                                            {item.status === 'live' ? 'Live' : 'Soon'}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-5">{item.desc}</p>
                                    <a href={item.docUrl} className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-black transition-colors">
                                        Integration Docs <ExternalLink size={12} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* Custom Integration CTA */}
            <section className="w-full max-w-4xl px-8">
                <div className="bg-slate-900 text-white rounded-[32px] p-12 text-center shadow-xl">
                    <h2 className="text-2xl font-black mb-3">Don't See Your Tool?</h2>
                    <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm font-medium">
                        If it has an API, we can automate it. Book a quick call and we will map the integration architecture before you commit to anything.
                    </p>
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl transition-all shadow-lg" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}>
                        Request a Custom Integration <ArrowRight size={18} />
                    </button>
                </div>
            </section>
        </main>
    );
}
