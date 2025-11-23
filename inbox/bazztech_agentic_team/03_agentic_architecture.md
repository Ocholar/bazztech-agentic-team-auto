# Bazztech Networks Autonomous Agentic Sales & Marketing Architecture

This document outlines the detailed architecture and workflow strategy for the n8n-based Agentic Team, designed to achieve and sustain **400+ Monthly Gross Adds (GAs)** for Airtel Kenya 5G ODU within 90 days, while strictly adhering to the zero-cost tool constraint.

## 1. Agentic Team Structure and Tool Mapping

The team is structured into six specialized, autonomous agents coordinated within the n8n environment.

| Agent Role | Core Function | Zero-Cost Tools/n8n Nodes | Optimization Focus |
| :--- | :--- | :--- | :--- |
| **Chief Growth Strategist** | Defines 90-day growth plan, allocates resources (60/40 split), and runs weekly optimization sprints. | n8n Logic Nodes (IF/SWITCH), Google Sheets (for resource allocation data). | **400+ GA Tier** attainment, **30Mbps Package MRR Mix**. |
| **Marketing Automation** | Creates and distributes daily content (LinkedIn, WhatsApp, Email, Community Groups). | n8n HTTP Request (for LinkedIn/Community posting), Gmail/Zoho Mail Node, Canva Free/Bing Image Creator (external asset generation). | Engagement Rate Growth (+10% weekly), Message-to-Lead Conversion. |
| **Lead Generation** | Identifies and scrapes new leads (60% High-Value, 40% High-Volume). | n8n HTTP Request (for Google Maps/Facebook scraping), n8n Webhook (for inbound leads), n8n Community Nodes (for unofficial LinkedIn/WhatsApp scanning). | Lead Volume (Daily Target: 14-15 GAs equivalent leads). |
| **Lead Qualification & Sales Closer** | Engages leads via chat, collects required data, and executes the **aggressive upselling script** (30Mbps default). | n8n Webhook (Inbound/Outbound WhatsApp), n8n LLM Nodes (for conversational logic and data extraction). | Lead-to-Install Conversion (Target: ≥ 25%), Data Collection Accuracy. |
| **Form Prefill & Submission** | Parses collected data and automatically submits the Airtel Installation Request Form. | n8n HTTP Request Node (for POST submission), n8n Code Node (for payload construction and token scraping). | Form Submission Failure Rate (Target: < 3%), Sales Cycle (Target: ≤ 48 hours). |
| **Analytics & Optimization** | Builds and maintains performance dashboards, runs weekly analysis, and proposes improvements. | n8n Google Sheets Node, Google Looker Studio (for visualization), n8n Code Node (for weekly analysis logic). | **Average Commission per GA (ACpGA)**, Conversion Bottleneck Identification. |

## 2. Core Workflow Pipeline: Lead Acquisition to Gross Add (GA)

The primary workflow is a continuous loop of lead acquisition, qualification, and automated submission.

| Step | Agent(s) Involved | Description | Technical Implementation in n8n |
| :--- | :--- | :--- | :--- |
| **1. Lead Acquisition** | Marketing, Lead Generation | Outbound content generation and inbound lead capture from various zero-cost channels (WhatsApp, LinkedIn, Google Maps scraping). | Scheduled n8n workflows triggering HTTP requests or scraping logic. Inbound leads trigger a Webhook node. |
| **2. Lead Tagging & Routing** | Chief Growth Strategist, Lead Generation | New leads are tagged (High-Value/High-Volume) and routed to the appropriate conversational flow. | n8n Code Node or LLM Node for initial lead enrichment and tagging. n8n IF/SWITCH nodes for routing. |
| **3. Conversational Qualification** | Lead Qualification & Sales Closer | Automated chat (via unofficial WhatsApp API) using an LLM-driven script to collect all 15 required data fields. **Aggressive upselling** of the 30Mbps package is prioritized. | n8n Webhook (for WhatsApp) -> n8n LLM Node (for chat response) -> n8n Google Sheets (for data logging). |
| **4. Data Validation & JSON Creation** | Lead Qualification & Sales Closer | Once all data is collected, it is validated against the required data model (Section 5 of Master Prompt). | n8n Code Node for data validation and transformation into the final JSON object. |
| **5. Form Token Scraping** | Form Prefill & Submission | A preliminary HTTP GET request is made to the Microsoft Form URL to scrape the dynamic `X-Ms-Form-Token` and other required hidden fields. | Dedicated n8n HTTP Request Node + n8n Code Node (for regex/DOM parsing). |
| **6. Automated Submission** | Form Prefill & Submission | The final JSON payload is constructed and sent via an HTTP POST request to the undocumented Microsoft Forms API endpoint. | n8n HTTP Request Node with custom headers and the constructed JSON body. |
| **7. Confirmation & Logging** | Form Prefill & Submission, Analytics | The client receives a confirmation message, and the successful GA is logged to the central dashboard. | n8n Webhook (for WhatsApp confirmation) -> n8n Google Sheets Node (for logging). |

## 3. Continuous Improvement Loop (Every 72 Hours)

The Analytics & Optimization Agent drives the continuous improvement loop, ensuring the system relentlessly pursues the highest commission tier.

1.  **Data Ingestion:** The Analytics Agent pulls all raw data (Leads, Conversions, Submission Status, Package Mix) from the Google Sheets database via the n8n Google Sheets Node.
2.  **Performance Analysis:** The Agent runs a statistical analysis (using n8n Code Node with Python/JavaScript) focused on:
    *   **Conversion Bottlenecks:** Identifying the drop-off points in the funnel (e.g., Lead Gen -> Qualification, Qualification -> Submission).
    *   **MRR Mix:** Calculating the percentage of 30Mbps sales vs. 15Mbps sales to maximize **ACpGA**.
    *   **KPI Deviation:** Flagging any KPI (e.g., Lead-to-install < 25%, Submission Failure > 3%) that is off-target.
3.  **Strategy Proposal:** The Analytics Agent generates a structured JSON output containing proposed changes (e.g., "Increase Lead Gen allocation to SMEs by 10%", "Revise WhatsApp script to emphasize 30Mbps reliability").
4.  **Strategy Implementation:** The Chief Growth Strategist Agent receives the proposal and automatically updates the relevant n8n workflows (e.g., modifying the Lead Gen agent's routing logic, updating the LLM prompt for the Sales Closer agent).

This closed-loop system ensures full autonomy and constant optimization towards the **400+ GA** target and the maximum commission tier.

## 4. Next Steps

The next phase will focus on the practical implementation: setting up the n8n environment and implementing the core workflows, starting with the critical Form Token Scraping and Submission logic.
