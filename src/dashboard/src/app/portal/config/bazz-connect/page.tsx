import { auth } from '../../../../../auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui-card";
import { MessageSquare, Webhook, CheckCircle2, Zap, AlertCircle, PlusCircle } from "lucide-react";
import { saveProductConfig, createPendingSubscription, saveApiKeys } from '../actions';
import { revalidatePath } from 'next/cache';
import { PaymentVerification } from '@/components/payment-verification';
import { TestAgentButton } from '@/components/test-agent-button';

export default async function BazzConnectConfig() {
    const session = await auth();
    if (!session || !session.user) redirect('/login');

    const user = await db.user.findUnique({ where: { id: session.user.id } });
    const isAdmin = (session.user as any)?.role === 'ADMIN' || user?.role === 'ADMIN' || session.user.email === 'reaochola@gmail.com';

    const sub = await db.subscription.findFirst({
        where: { userId: session.user.id, productType: 'BAZZ_CONNECT' }
    });

    const config = await db.productConfig.findFirst({
        where: { userId: session.user.id, productType: 'BAZZ_CONNECT' }
    });

    const isActive = isAdmin || sub?.status === 'ACTIVE';
    const amount = sub?.oneTimeFee || 4999;

    return (
        <main className="flex min-h-screen flex-col p-8 bg-gray-50">
            <div className="mb-8 flex items-center justify-between border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                        <MessageSquare className="text-green-600" size={32} />
                        Bazz-Connect Subscription
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {isActive
                            ? "Fine-tune your autonomous WhatsApp FrontDesk Agent"
                            : "Activate your AI Digital Employee via Equity Bank Jenga API"}
                    </p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* --- PAYMENT VERIFICATION --- */}
                {!isActive && sub ? (
                    <div className="md:col-span-1 lg:col-span-1 space-y-4">
                        <PaymentVerification
                            subscriptionId={sub.id}
                            productName="Bazz-Connect"
                            amount={amount}
                            status={sub.status as any}
                            expiresAt={sub.expiresAt?.toISOString()}
                        />
                    </div>
                ) : !isActive ? (
                    <div className="md:col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-2 text-sm font-medium text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-200">
                            <AlertCircle size={16} />
                            No Subscription Found. Return to Hub to subscribe.
                        </div>
                    </div>
                ) : (
                    <></>
                )}

                {/* --- CONFIGURATION PORTAL --- */}
                {isActive && (
                    <div className="md:col-span-2 lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>1. Persona & Memory</CardTitle>
                                <CardDescription>How should your AI represent your company on WhatsApp?</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form action={saveProductConfig} className="space-y-4">
                                    <input type="hidden" name="configId" value={config?.id || ""} />
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">System Prompt (FAQ Automation & Order Status)</label>
                                        <textarea
                                            name="systemPrompt"
                                            rows={4}
                                            className="flex w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-green-600"
                                            placeholder="e.g. You are the digital receptionist. Answer FAQs, qualify leads, and check Order Status..."
                                            defaultValue={config?.systemPrompt || "You are the BazzAI Global Orchestrator—a sophisticated, results-oriented AI executive. Your mission is to educate high-growth enterprises on the power of Agentic Swarms. You are concise, professional, and world-class. You help clients understand how BazzAI (Connect, Flow, Doc, Lead) works together as a unified team. If a client shows high interest, your goal is to book a Strategy Call."}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Knowledge Base (CRM Backup Data)</label>
                                        <textarea
                                            name="knowledgeBase"
                                            rows={4}
                                            className="flex w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-green-600"
                                            placeholder="Paste FAQs, pricing sheets, and unstructured CRM backup data here..."
                                            defaultValue={config?.knowledgeBase || `=== BAZZAI ENTERPRISE INTELLIGENCE KNOWLEDGE BASE ===

--- COMPANY PROFILE ---
BazzAI builds high-authority Enterprise AI Architectures and Agentic Swarms. We do not sell off-the-shelf chatbots. We eliminate 20+ hours of weekly operational friction through deeply integrated AI pipelines. We work with high-growth enterprises, manufacturers, financial institutions, and government-adjacent organizations across Africa and globally.

--- WHAT WE DO (Core Belief) ---
After the initial Architecture Audit and Data Mapping, BazzAI can automate virtually every operational function in an enterprise: customer communication, finance reconciliation, document processing, inventory and supply chain, HR operations, lead generation, compliance reporting, and internal knowledge management. We build a custom Agentic Swarm tailored to your exact data environment. No two deployments are the same.

--- AGENTIC SWARM MODULES (what we build) ---
These are our core product families. Enterprise clients can combine all of them or get bespoke modules:

1. Bazz-Connect (Omnichannel AI FrontDesk):
   - Automates WhatsApp, SMS, email, and web chat for 24/7 customer communication.
   - Handles FAQ automation, lead qualification, order status, booking, and escalation routing.
   - Integrates with Meta Business API, Twilio, and any CRM.
   - Use cases: Customer support, sales follow-up, appointment scheduling, multilingual front desk.

2. Bazz-Flow (Operational Workflow Automation):
   - Built on n8n orchestration for complex, multi-step business logic.
   - Connects ERPs, Google Sheets, M-Pesa/PayPal/Stripe, Salesforce, SAP, and more.
   - Use cases: Inventory management, order-to-cash automation, accounts payable, supply chain alerts, predictive restocking, shift reporting, anomaly detection.
   - Replaces 3-5 FTE operational roles through autonomous pipeline execution.

3. Bazz-Doc (AI Document Intelligence):
   - Advanced OCR using OpenAI Vision and custom models to extract data from invoices, PDFs, ledgers, receipts, delivery notes, and scanned images.
   - Outputs clean, structured JSON to any database, ERP, or spreadsheet.
   - Handles legacy formats, handwriting, and multi-language documents.
   - Use cases: Invoice processing, KYC document handling, contract extraction, financial reconciliation, payroll data capture.

4. Bazz-Lead (Autonomous Sales CRM Agent):
   - 24/7 lead qualification, scoring, and automated CRM routing.
   - Tracks LinkedIn, website forms, WhatsApp, and email inbound leads.
   - Routes hot leads to sales reps instantly. Nurtures cold leads autonomously.
   - Integrates with HubSpot, Salesforce, Zoho, Notion, and custom CRMs.
   - Use cases: B2B pipeline management, demo booking automation, follow-up sequences, lead scoring dashboards.

5. ENTERPRISE BESPOKE AGENTS (beyond core modules):
   - HR Automation: Onboarding workflows, payroll verification, leave management, performance review automation.
   - Compliance & Reporting: Auto-generate regulatory reports, flag anomalies for human review, maintain crypto-audit trails for full regulatory compliance.
   - Supply Chain Intelligence: Predict stockouts 2 weeks in advance, automate supplier purchase orders, reconcile delivery notes vs. invoices.
   - Knowledge Management: Internal RAG (Retrieval Augmented Generation) pipeline so staff can query company policies, SOPs, and documents in natural language.
   - Financial Intelligence: Real-time ledger sync, M-Pesa/PayPal/bank statement reconciliation, accounts receivable aging automation.
   - Customer Sentiment Analysis: Monitor reviews, tickets, and chat transcripts. Escalate negative sentiment to management instantly.
   - IT Helpdesk AI: Route and resolve Tier 1/2 IT tickets autonomously. Escalate complex cases to engineers.

--- PRICING MODEL ---
1. STANDARD SAAS (for growing businesses):
   - Price: $499 One-off payment per module.
   - Modules available: Bazz-Connect, Bazz-Flow, Bazz-Doc, Bazz-Lead.
   - Bundle discount: 15% off when you buy 2 or more modules together.
   - Self-service: Clients configure their own AI agent via the BazzAI portal dashboard.
   - Best for: SMEs, startups, and teams that need standard automation quickly.

2. ENTERPRISE ARCHITECTURE (custom-built for large organizations):
   - Starter Tier: $5,000 – $20,000. Single AI pipeline, fixed scope SOW, 3-month support, standard SLA.
   - Growth Tier: $25,000 – $60,000. 2–4 pipelines, integration SOW, 6-month SLA, monthly reviews. (Most popular)
   - Enterprise Tier: $75,000 – $200,000+. Custom scope SOW, private LLM option, 12-month retainer, dedicated Customer Success Manager.
   - Custom pricing based on scope of work (SOW). No generic quotes. Every engagement starts with a free technical audit.
   - Includes: Custom VPC hosting, bespoke integrations (M-Pesa, Salesforce, SAP, Google Workspace), dedicated support, and full IP transfer.

--- HOW IT WORKS (Deployment Methodology) ---
BazzAI uses a proven 4-phase, 90-day deployment process. We do not do endless consulting. We execute.

Phase 1 – Architecture Audit & Data Mapping (Weeks 1-2):
   - Identify high-impact, low-risk operational bottlenecks.
   - Map existing data sources, APIs, and legacy databases.
   - Define strict ROI KPIs. Draft SOC 2 compliant architecture blueprint.
   - We only need a few hours from your IT team to provide API keys or DB read access.

Phase 2 – Pipeline Engineering (Weeks 3-5):
   - Provision dedicated cloud instances matching data residency rules.
   - Build n8n orchestration layer and connect external endpoints.
   - Train or prompt-engineer isolated LLMs for your specific data context.
   - Set up zero-retention policies and secure vector stores.

Phase 3 – Silent Testing & Validation (Weeks 6-8):
   - Run the AI pipeline alongside manual human operations.
   - Compare automated outputs against human baselines for accuracy.
   - Refine edge cases, hallucinations, and boundary exceptions.
   - Finalize UI/UX dashboards for operations staff.

Phase 4 – Live Production Deployment (Weeks 9-12):
   - Full API switchover and go-live.
   - Comprehensive handover documentation and staff training.
   - Transfer workflow ownership or initiate BazzAI managed maintenance.
   - Begin measuring 90-day ROI against Phase 1 KPIs.

ACCELERATED: For urgent cases, our 14-Day Velocity Standard delivers:
   - Day 2: Audit & Map (technical workshop).
   - Day 5: Architect (pipeline design and HITL gate setup).
   - Day 10: Verify (secure sandbox pilot with real historical data).
   - Day 14: Scale (live production release and team training).

--- LEGACY SYSTEM SUPPORT ---
We specialize in bridging legacy systems to modern AI. We build custom DB adapters, use secure SFTP drops, or deploy OCR pipelines to read unstructured PDF outputs from legacy systems. No modern API? Not a problem.

--- SECURITY & COMPLIANCE ---
- GDPR Compliant (EU General Data Protection Regulation).
- Kenya Data Protection Act 2019 compliant.
- Zero-Retention LLM Policy: Client data is NEVER used to train public models (OpenAI, Anthropic, Google). We sign zero-retention agreements.
- AES-256 encryption at rest. TLS 1.3 encryption in transit.
- SOC 2 Type II architectural readiness. All deployments meet these standards by default.
- Multi-tenant data isolation: Your data never mixes with another client's.
- Private LLM option: For extreme compliance, we self-host LLMs on your own cloud infrastructure (AWS Bedrock, Azure OpenAI).
- Crypto-Audit Trails: Every model decision is logged with non-repudiable timestamps for full regulatory compliance.
- HITL (Human-in-the-Loop) Gates: For financial data, agents flag anomalies for human review instead of auto-correcting. All agent actions are logged.
- Data Residency: Kenya-based clients can process data in-region. We support private cloud on AWS Africa (Cape Town) or any client-specified region.
- n8n sandboxing: AI agents operate within strict orchestrated sandboxes. Code execution is restricted to authorized scripts only.

--- ARCHITECTURE (Technical) ---
- Reasoning Layer is separated from Data Layer. Sensitive records never touch public model training sets.
- Stack: Python, FastAPI, PostgreSQL, n8n (orchestration), Pinecone/pgvector (vector store), OpenAI/Anthropic APIs (zero-retention).
- Zero infrastructure lock-in: Systems are built on open-source tools. Clients can take the system fully in-house with frictionless transition.
- 99.9% uptime via n8n enterprise-grade API orchestration.
- Standard SLA: 99.5% uptime for hosted workflows. P1 incident response: 2 hours. P2: 8 hours.
- Enterprise SLA: Custom uptime targets, dedicated support channels, quarterly business reviews.

--- WHY BAZZAI ---
- We do not sell generic SaaS. Every enterprise deployment is bespoke, scoped, and signed off with a legal SOW.
- We build a financial model BEFORE taking on any engagement. If the payback period exceeds 18 months, we do not build it.
- We replace reactive decision-making with real-time, autonomous intelligence pipelines.
- Manual bottlenecks cost 15–30% of operational capacity. BazzAI eliminates them.
- We don't do lock-in. We use standard open-source tools and give clients full IP ownership.

--- PROVEN ROI (Case Study: Dakri Cartons, Mauritius) ---
- Problem: Manual inventory, shift reports, and reconciliation across a large carton manufacturer.
- Solution: BazzAI Bazz-Flow pipeline with predictive inventory and automated ledger sync.
- Results:
   * 40% reduction in stockouts.
   * 15% OEE (Overall Equipment Effectiveness) improvement in 90 days.
   * 35-day payback period.
   * Year 1 Net ROI: 1,295% ($1.16M in savings vs. $83k total investment).
- Stockouts went from reactive (discovered after production halts) to predictive (signals 2 weeks in advance).
- Shift reporting went from 3+ hours/day manual to 60-second natural language queries.
- Reconciliation went from 2–3 days/month to continuous and fully automated.

--- TARGET PERSONAS & VALUE PROPOSITION ---
FOR CTOs & ENGINEERING LEADERS:
   - We ship secure, domain-aware RAG pipelines in weeks, not months.
   - No need to hire a full-time ML Engineer for vector indexing. We handle semantic chunking, embedding generation, and vector retrieval architecture.
   - We bypass brittle custom Python scripts using n8n for 99.9% uptime API orchestration.
   - Your proprietary data never trains public LLMs. Zero-retention policies enforced.
   - Zero infrastructure lock-in. Built on Python, FastAPI, Postgres — fully transferable.

FOR COOs & OPERATIONS LEADERS:
   - We replace firefighting with forecasting.
   - Every manual bottleneck costs 15–30% of operational capacity. We eliminate them.
   - Predictive inventory, autonomous shift reporting, real-time anomaly alerts, continuous ledger sync.

FOR CFOs & FINANCE LEADERS:
   - AI automation is not a cost center. It is the most defensible OpEx line item on your P&L.
   - OpEx model, not CapEx. No $500k platform license. BazzAI runs on your existing cloud infrastructure.
   - 3–6 month payback period, validated by real deployments.
   - We guarantee: if the payback math doesn't work, we don't take the engagement.

--- PROCUREMENT DETAILS ---
- Fixed-price SOW contracts for most deployments ($5k–$60k). Larger enterprise retainers are monthly T&M with a cap.
- Modular architecture: Start with one high-ROI workflow, validate results, then expand to 3–5 workflows over 6–12 months.
- Clients can request a Sample SOW Template and Enterprise Playbook (architecture whitepaper, SLA documentation).

--- CALL TO ACTION ---
When a client shows serious interest, ask about their specific operational pain point and direct them to book a FREE Enterprise AI Assessment (Technical Audit) at bazztech.co.ke — click "Book AI Assessment" or "Book Technical Audit."

Booking link: https://calendly.com/reagan-bazztech/30min

Do NOT quote prices without first understanding their scope. For enterprise, always say pricing is custom and based on a free scoping call.`}
                                        />
                                    </div>
                                    <div className="flex justify-end pt-4 border-t">
                                        <button className="bg-green-600 text-white px-8 py-2 rounded-md font-bold hover:bg-green-700 transition flex items-center gap-2">
                                            <Zap size={16} /> Save AI Configuration
                                        </button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>2. WhatsApp Connectivity</CardTitle>
                                <CardDescription>Connect your Meta WhatsApp Business API</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form action={saveApiKeys} className="space-y-4">
                                    <input type="hidden" name="configId" value={config?.id || ""} />
                                    
                                    <div className="space-y-2 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                        <label className="text-sm font-bold text-blue-900 flex items-center gap-2">
                                            <Webhook size={16} /> n8n Webhook Path (ID)
                                        </label>
                                        <input 
                                            type="text" 
                                            name="webhookId" 
                                            defaultValue={config?.webhookId || "bazz-connect-master"} 
                                            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 font-mono" 
                                            placeholder="e.g. bazz-connect-master" 
                                        />
                                        <p className="text-[10px] text-blue-600 font-medium italic">Crucial: Must match your n8n webhook node path exactly.</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Meta Phone Number ID</label>
                                        <input type="text" name="whatsappPhoneId" defaultValue={config?.whatsappPhoneId || ""} className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="e.g. 1029384756..." />
                                        <p className="text-[11px] text-gray-500">Find this in your <a href="https://developers.facebook.com/apps/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Meta App Dashboard &rarr; WhatsApp &rarr; API Setup</a>.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Permanent Access Token</label>
                                        <input type="password" name="whatsappToken" defaultValue={config?.whatsappToken || ""} className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="EAAGm..." />
                                        <p className="text-[11px] text-gray-500">Generate a permanent token via <a href="https://business.facebook.com/settings/system-users" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Meta Business Settings &rarr; System Users</a>.</p>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t">
                                        <button className="bg-slate-900 text-white px-8 py-2 rounded-md font-bold hover:bg-slate-800 transition">Save API Keys & Webhook</button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* --- ACTIVE WEBHOOK CONNECTION CARD --- */}
                {isActive && (
                    <div className="md:col-span-1 lg:col-span-1 space-y-6">
                        <Card className="bg-slate-900 border-none text-white shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Webhook size={20} className="text-green-400" />
                                    1. Webhook Setup
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Incoming WhatsApp Gateway
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Permanent Gateway URL</p>
                                    <code className="block w-full bg-slate-950 text-green-400 p-3 rounded font-mono text-[10px] break-all">
                                        https://www.bazztech.co.ke/api/webhook/whatsapp
                                    </code>
                                    <p className="text-[10px] text-slate-400 mt-2">
                                        Paste this URL into your Meta App's Webhook Configuration.
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-slate-800">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">n8n Webhook ID (Path)</p>
                                    <code className="block w-full bg-slate-950 text-blue-400 p-3 rounded font-mono text-[10px] break-all">
                                        {config?.webhookId || "bazz-connect-master"}
                                    </code>
                                    <p className="text-[10px] text-slate-400 mt-2 text-blue-300">
                                        Your n8n Webhook node &quot;Path&quot; <b>MUST</b> match this exactly.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold">2. Test Connection</CardTitle>
                                <CardDescription>Verify your AI agent is alive.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <TestAgentButton />
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </main>
    );
}
