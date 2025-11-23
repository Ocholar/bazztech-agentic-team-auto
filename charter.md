# Project Charter: Bazztech Agentic Team

## Goal
Deploy a fully autonomous Sales & Marketing system for Airtel Kenya 5G ODU, targeting 400+ monthly gross adds. The system will consist of self-hosted n8n agents and a custom web dashboard.

## Target Stack
- **Orchestration**: n8n (Dockerized on Railway).
- **Dashboard**: Next.js (App Router, Tailwind CSS, tRPC) + PostgreSQL.
- **Infrastructure**: Railway (preferred for "Zero-to-Deploy" ease and n8n compatibility).
- **Integrations**: WhatsApp Business API, OpenAI/Gemini (LLM), Apify (Scraping).

## Core Features
1.  **Autonomous Pipelines (n8n)**:
    -   Lead Gen (Scraping LinkedIn/Maps).
    -   Qualification (AI Chat via WhatsApp).
    -   Submission (Auto-submit to Airtel Forms).
2.  **Command Center Dashboard**:
    -   Real-time KPI tracking (Leads, GAs, Conversion).
    -   Lead Management Table (Status, Logs).
    -   System Configuration & Manual Overrides.

## Acceptance Criteria
-   [ ] n8n instance deployed and workflows active.
-   [ ] Dashboard deployed and accessible via public URL.
-   [ ] Bi-directional sync between n8n and Dashboard (Webhooks/DB).
-   [ ] CI/CD pipelines active for Dashboard.

## Non-Functional Requirements
-   **Cost**: Minimize costs (Free tiers where possible).
-   **Security**: All secrets in environment variables; OAuth for Dashboard.
-   **Performance**: Lighthouse score > 90.

## Execution Plan
1.  **Bootstrap**: Setup Next.js repo and n8n deployment config.
2.  **Develop**: Build Dashboard UI and Database Schema.
3.  **Integrate**: Connect n8n workflows to the Dashboard Database.
4.  **Deploy**: Ship everything to Railway.
