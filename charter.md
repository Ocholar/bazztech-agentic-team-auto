# Project Charter: Bazz AI Agentic Team SaaS Platform

## Goal

To transform Bazztech from a legacy web connectivity provider into a **Productized AI Automation Service**. We are building a centrally-hosted multi-tenant SaaS platform where Kenyan MSMEs can purchase, access, and self-configure readymade AI agents (built on n8n workflows).

## Target Stack

- **Orchestration**: Self-hosted n8n (Dockerized on Railway).
- **Dashboard**: Next.js App Router (Tailwind CSS, tRPC) + PostgreSQL.
- **Infrastructure**: Railway (for full-stack deployment of Next.js and n8n).
- **Payment Gateway**: IntaSend (for seamless Visa & M-Pesa automated subscription handling).
- **AI Intelligence**: OpenAI API.

## Core Multi-Tenant Architecture

Instead of deploying a separate n8n instance for every client, we are implementing a **Dynamic Prompting / Webhook Integration Strategy**:

1. 1 Central n8n Instance processes incoming webhooks (e.g., from WhatsApp).
2. The webhook looks up the specific client ID.
3. The n8n workflow queries the Next.js API for that client's specific `Business Description`, `Custom Knowledge Base`, and `User Prompt`.
4. The Master workflow injects that data into the AI Node's System Prompt dynamically.

## The 4 Core Product Bundles

1. **Bazz-Connect**: WhatsApp AI FrontDesk.
2. **Bazz-Flow**: M-Pesa & System Automation Sync.
3. **Bazz-Doc**: Document Processing & OCR Workflows.
4. **Bazz-Lead**: CRM and Outreach follow-ups.

## Acceptance Criteria

- [ ] Next.js dashboard features client authentication (Sign Up / Sign In).
- [ ] Integrated IntaSend checkout flow for purchasing bundles.
- [ ] Users have a self-serve UI to update their specific Knowledge Base and Prompts.
- [ ] Autonomous Sales Agent built to handle inbound leads and progress them from `Lead` -> `Contacted` -> `Prospective` -> `Sale`.

## Execution Plan

1. **Pivot Next.js Dashboard**: Convert the `airtel-submitter` tracking app into an authenticated multi-tenant SaaS portal.
2. **Schema Refactor**: Change the Prisma DB to track Users, Subscriptions, and AI Config JSON.
3. **Build n8n Masters**: Develop the master workflow templates that pull in dynamic client DB info.
4. **Integrate Payments**: Hook up IntaSend webhooks to flag `Product` subscriptions as active.
