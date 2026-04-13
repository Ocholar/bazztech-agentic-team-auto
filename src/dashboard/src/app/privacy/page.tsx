import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy | BazzAI',
    description: 'Read the BazzAI Privacy Policy — how we collect, use, and protect your data in compliance with GDPR and the Kenya Data Protection Act 2019.',
};

export default function PrivacyPolicy() {
    const effective = '1 April 2026';
    return (
        <main className="flex min-h-screen flex-col items-center bg-white text-slate-900 pb-24">
            <div className="w-full bg-slate-900 text-white pt-32 pb-16 px-8">
                <div className="max-w-3xl mx-auto">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Legal</p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Privacy Policy</h1>
                    <p className="text-slate-400 font-medium">Effective date: {effective}</p>
                </div>
            </div>

            <article className="w-full max-w-3xl px-8 py-16">

                <p className="text-slate-600 text-lg leading-relaxed mb-10">
                    Bazztech Solutions (&quot;BazzAI&quot;, &quot;we&quot;, &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and share information when you use our platform and services. It applies to all users of <strong>bozztech.co.ke</strong> and associated subdomains.
                </p>

                <p className="text-slate-600 text-sm mb-10 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                    This policy is compliant with the <strong>EU General Data Protection Regulation (GDPR)</strong> and the <strong>Kenya Data Protection Act 2019 (DPA 2019)</strong>.
                </p>

                <hr className="border-slate-100 my-10" />

                <Section title="1. Data Controller">
                    <p><strong>Bazztech Solutions</strong><br />Nairobi, Kenya<br />Email: <a href="mailto:privacy@bazztech.co.ke" className="text-red-600 hover:underline">privacy@bazztech.co.ke</a></p>
                </Section>

                <Section title="2. What Data We Collect">
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Account Data:</strong> Name, email address, company name, job title, phone number provided during registration.</li>
                        <li><strong>Payment Data:</strong> Billing address and payment method details (processed by Stripe or M-Pesa; we do not store raw card data).</li>
                        <li><strong>Usage Data:</strong> Log files, IP address, browser type, pages visited, and interaction events (via Vercel Analytics).</li>
                        <li><strong>Client Operational Data:</strong> Data you connect to our pipelines (e.g., inventory records, invoices, CRM contacts) solely for processing agreed automation workflows.</li>
                        <li><strong>Communication Data:</strong> Emails, WhatsApp messages, and support tickets you send to us.</li>
                    </ul>
                </Section>

                <Section title="3. How We Use Your Data">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>To provide, operate, and improve our Services</li>
                        <li>To process payments and send invoices</li>
                        <li>To communicate updates, security notices, and service changes</li>
                        <li>To monitor performance, detect fraud, and ensure platform security</li>
                        <li>To comply with legal obligations under Kenyan law and GDPR</li>
                        <li>To send marketing communications (only with your explicit consent; opt-out available at any time)</li>
                    </ul>
                </Section>

                <Section title="4. Legal Basis for Processing (GDPR)">
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Contract:</strong> Processing necessary to deliver the Services you have contracted for.</li>
                        <li><strong>Legitimate Interests:</strong> Security monitoring, fraud prevention, and product improvement.</li>
                        <li><strong>Consent:</strong> Marketing emails and analytics cookies. You may withdraw consent at any time.</li>
                        <li><strong>Legal Obligation:</strong> Tax records, audit trails, and regulatory compliance.</li>
                    </ul>
                </Section>

                <Section title="5. LLM & AI Processing">
                    <p>Where we use third-party Large Language Models (e.g., OpenAI GPT-4o) to process your operational data:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-3">
                        <li>We operate under <strong>zero-retention agreements</strong> — your prompts and completions are not used to train third-party models.</li>
                        <li>For regulated industries, we offer <strong>self-hosted LLM deployment</strong> on your own VPC, meaning data never leaves your environment.</li>
                        <li>Embeddings stored in vector databases (e.g., Pinecone) are stored in your assigned namespace only and are never shared across tenants.</li>
                    </ul>
                </Section>

                <Section title="6. Data Sharing">
                    <p>We do not sell your personal data. We may share data with:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-3">
                        <li><strong>Service Providers:</strong> Stripe (payments), Pinecone (vector storage), Google Cloud (hosting), n8n (workflow orchestration) — bound by Data Processing Agreements.</li>
                        <li><strong>Legal Authorities:</strong> Where required by law, court order, or to protect the rights of BazzAI or its users.</li>
                    </ul>
                </Section>

                <Section title="7. Data Retention">
                    <p>We retain personal data for as long as your account is active or as needed to provide Services. Upon termination:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-3">
                        <li>Account data is deleted within 90 days of account closure.</li>
                        <li>Operational pipeline data is purged within 30 days upon written request.</li>
                        <li>Financial records are retained for 7 years per Kenyan tax law requirements.</li>
                    </ul>
                </Section>

                <Section title="8. Your Rights">
                    <p>Under GDPR and Kenya DPA 2019, you have the right to:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-3">
                        <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
                        <li><strong>Rectification</strong> — correct inaccurate or incomplete data</li>
                        <li><strong>Erasure</strong> — request deletion of your data (&quot;right to be forgotten&quot;)</li>
                        <li><strong>Portability</strong> — receive your data in a machine-readable format</li>
                        <li><strong>Objection</strong> — object to processing based on legitimate interests</li>
                        <li><strong>Restriction</strong> — request we limit processing while a dispute is resolved</li>
                    </ul>
                    <p className="mt-4">To exercise any of these rights, email <a href="mailto:privacy@bazztech.co.ke" className="text-red-600 hover:underline">privacy@bazztech.co.ke</a>. We will respond within 72 hours.</p>
                </Section>

                <Section title="9. Security">
                    <p>We implement industry-standard security controls including AES-256 encryption at rest, TLS 1.3 in transit, multi-tenant environment isolation, and regular penetration testing. See our <Link href="/security" className="text-red-600 hover:underline font-semibold">Security Page</Link> for full details.</p>
                </Section>

                <Section title="10. Cookies & Analytics">
                    <p>We use Vercel Analytics to collect anonymous usage data. No cookies are used for advertising or cross-site tracking. You may opt out of analytics tracking by enabling &quot;Do Not Track&quot; in your browser.</p>
                </Section>

                <Section title="11. International Transfers">
                    <p>If your data is transferred outside Kenya or the EEA, we ensure appropriate safeguards are in place (Standard Contractual Clauses or equivalent) in accordance with GDPR Article 46 and Kenya DPA Section 25.</p>
                </Section>

                <Section title="12. Changes to This Policy">
                    <p>We may update this Privacy Policy. Material changes will be communicated by email or in-platform notice at least 14 days before taking effect. Continued use of our Services constitutes acceptance.</p>
                </Section>

                <Section title="13. Contact & Complaints">
                    <p>For privacy questions: <a href="mailto:privacy@bazztech.co.ke" className="text-red-600 hover:underline">privacy@bazztech.co.ke</a></p>
                    <p className="mt-2">You also have the right to lodge a complaint with the <strong>Office of the Data Protection Commissioner</strong> (Kenya) at <a href="https://www.odpc.go.ke" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">odpc.go.ke</a>, or your local EU supervisory authority.</p>
                </Section>
            </article>
        </main>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mb-10">
            <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-100">{title}</h2>
            <div className="text-slate-600 leading-relaxed space-y-3">{children}</div>
        </section>
    );
}
