import Link from 'next/link';

export const metadata = {
    title: 'Terms of Service | BazzAI',
    description: 'Read the Terms of Service for BazzAI — the enterprise AI automation platform by Bazztech Solutions.',
};

export default function TermsOfService() {
    const effective = '1 April 2026';
    return (
        <main className="flex min-h-screen flex-col items-center bg-white text-slate-900 pb-24">
            <div className="w-full bg-slate-900 text-white pt-32 pb-16 px-8">
                <div className="max-w-3xl mx-auto">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Legal</p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Terms of Service</h1>
                    <p className="text-slate-400 font-medium">Effective date: {effective}</p>
                </div>
            </div>

            <article className="w-full max-w-3xl px-8 py-16 prose prose-slate max-w-none">

                <p className="text-slate-600 text-lg leading-relaxed">
                    These Terms of Service (&quot;Terms&quot;) govern your access to and use of the BazzAI platform, products, and services (&quot;Services&quot;) provided by Bazztech Solutions (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By accessing or using our Services, you agree to be bound by these Terms.
                </p>

                <hr className="border-slate-100 my-10" />

                <Section title="1. Acceptance of Terms">
                    <p>By registering for, accessing, or using any BazzAI product or service, you represent that you are at least 18 years of age, have authority to bind your organization to these Terms, and agree to comply with all applicable laws. If you do not agree to these Terms, do not access our Services.</p>
                </Section>

                <Section title="2. Services">
                    <p>BazzAI provides enterprise AI automation software including, but not limited to: WhatsApp sales automation (Bazz-Connect), financial reconciliation (Bazz-Flow), document processing (Bazz-Doc), lead nurturing (Bazz-Lead), and bespoke RAG pipeline architecture and managed retainers. Services are subject to change at our discretion with reasonable notice.</p>
                </Section>

                <Section title="3. Subscriptions & Payment">
                    <p><strong>Standard SaaS:</strong> Monthly subscription fees (starting at $499/month per module) are billed in advance and are non-refundable unless otherwise stated in your order form.</p>
                    <p><strong>Enterprise:</strong> Implementation fees and managed retainer pricing are governed by a separately executed Statement of Work (SOW) and/or Master Services Agreement (MSA).</p>
                    <p><strong>Late Payments:</strong> Overdue balances accrue interest at 1.5% per month. Services may be suspended after 14 days of non-payment.</p>
                </Section>

                <Section title="4. Client Responsibilities">
                    <p>You are responsible for providing accurate and complete information during onboarding, maintaining the security of your API credentials and access tokens, complying with applicable laws (including data protection laws) when using our Services, and ensuring all data shared with BazzAI is lawfully obtained and appropriately licensed for processing.</p>
                </Section>

                <Section title="5. Intellectual Property">
                    <p>BazzAI and all associated branding, software, and methodologies are the exclusive property of Bazztech Solutions. You are granted a limited, non-exclusive, non-transferable license to use our platform during the subscription term.</p>
                    <p>Client data remains the property of the client. Upon termination, we will provide a full export of your workflow configurations and data within 30 days of written request.</p>
                </Section>

                <Section title="6. Confidentiality">
                    <p>Both parties agree to keep the other party's non-public information confidential. This obligation survives termination of Services for a period of three (3) years.</p>
                </Section>

                <Section title="7. Data Processing">
                    <p>Our processing of your personal data and client data is governed by our <Link href="/privacy" className="text-red-600 hover:underline font-semibold">Privacy Policy</Link> and, where applicable, a separately executed Data Processing Agreement (DPA). We process data solely to provide the agreed Services.</p>
                </Section>

                <Section title="8. Limitation of Liability">
                    <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, BAZZTECH SOLUTIONS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE FEES PAID IN THE THREE (3) MONTHS PRECEDING THE CLAIM.</p>
                </Section>

                <Section title="9. Warranty Disclaimer">
                    <p>THE SERVICES ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND. WE DO NOT WARRANT THAT THE SERVICES WILL BE ERROR-FREE, UNINTERRUPTED, OR FREE FROM SECURITY VULNERABILITIES.</p>
                </Section>

                <Section title="10. Termination">
                    <p><strong>By Client:</strong> Standard tier clients may terminate with 30 days' written notice. Enterprise clients are subject to the notice periods in their MSA.</p>
                    <p><strong>By BazzAI:</strong> We may suspend or terminate Services immediately for material breach, non-payment, or unlawful use.</p>
                </Section>

                <Section title="11. Governing Law">
                    <p>These Terms are governed by the laws of the Republic of Kenya. Any disputes shall be subject to the exclusive jurisdiction of the courts of Nairobi, Kenya, except where the client&apos;s jurisdiction requires otherwise.</p>
                </Section>

                <Section title="12. Changes to Terms">
                    <p>We may update these Terms from time to time. We will notify you of material changes by email or in-product notice at least 14 days before the changes take effect. Continued use of the Services after the effective date constitutes acceptance.</p>
                </Section>

                <Section title="13. Contact">
                    <p>For questions about these Terms, contact us at: <a href="mailto:legal@bazztech.co.ke" className="text-red-600 hover:underline">legal@bazztech.co.ke</a></p>
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
