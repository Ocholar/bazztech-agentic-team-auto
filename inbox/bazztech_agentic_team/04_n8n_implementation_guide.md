# Bazztech n8n Agentic Team - Implementation Guide

## Executive Summary

This document provides a complete implementation guide for the **Bazztech n8n Agentic Team**, a fully autonomous Sales & Marketing system designed to achieve and sustain **400+ monthly Gross Adds** for Airtel Kenya 5G ODU within 90 days, using only zero-cost tools.

The system prioritizes the sale of the **higher-MRR 30Mbps package** to maximize commission revenue and operates without human intervention, reporting performance, bottlenecks, and insights weekly.

---

## System Architecture

### Three-Pipeline Agentic Team

The system is organized into three autonomous pipelines, each running independently in n8n:

#### **Pipeline 1: Lead Generation Agent**
- **Objective**: Acquire 600+ leads/month from zero-cost channels
- **Allocation**: 60% High-Value (LinkedIn, Google Maps), 40% High-Volume (WhatsApp, Facebook)
- **Sources**:
  - **LinkedIn**: Target business owners, IT managers in Nairobi/Mombasa
  - **Google Maps**: Scrape businesses in coverage areas
  - **WhatsApp Business API**: Community groups, business networks
  - **Facebook**: Local business groups, marketplace listings
- **Output**: Raw leads stored in database with `status: "new"` and appropriate `tag`

#### **Pipeline 2: Lead Qualification & Upselling Agent**
- **Objective**: Qualify leads, collect required data, aggressively upsell 30Mbps
- **Method**: LLM-powered conversational agent (via Manus built-in LLM API)
- **Workflow**:
  1. Contact lead via WhatsApp/SMS
  2. Engage in natural conversation to collect:
     - Customer Name
     - Airtel Number
     - Alternative Number
     - Email Address
     - Installation Town
     - Delivery Location (nearest landmark)
     - Preferred Installation Date & Time
  3. **Aggressive 30Mbps Upselling**:
     - Emphasize speed, reliability, future-proofing
     - Offer limited-time incentives
     - Frame 15Mbps as "basic" option
  4. Update lead status to `"qualified"` when all data collected
- **Output**: Qualified leads ready for submission

#### **Pipeline 3: Form Submission & Tracking Agent**
- **Objective**: Auto-submit qualified leads to Airtel Installation Request Form
- **Method**: Reverse-engineered HTTP POST to Microsoft Forms API
- **Workflow**:
  1. Fetch qualified leads (`status: "qualified"`)
  2. For each lead:
     - Construct form payload with all required fields
     - Submit via HTTP POST to `https://forms.office.com/formapi/api/...`
     - Track response and update submission record
     - Update lead status to `"submitted"` on success, `"failed"` on error
     - Implement retry logic (max 3 attempts with exponential backoff)
  3. Log all submissions to `submissions` table
- **Output**: Submitted leads tracked in database

---

## n8n Workflow Configurations

### Workflow 1: Lead Generation (Runs every 6 hours)

**Trigger**: Schedule (cron: `0 */6 * * *`)

**Nodes**:
1. **Schedule Trigger** → Every 6 hours
2. **HTTP Request: LinkedIn Scraper** → Scrape LinkedIn profiles (use free tools like PhantomBuster alternatives)
3. **HTTP Request: Google Maps Scraper** → Extract business listings in coverage areas
4. **Set Node: Tag High-Value** → Tag LinkedIn/Google Maps leads as `high_value`
5. **HTTP Request: WhatsApp/Facebook** → Fetch leads from community groups
6. **Set Node: Tag High-Volume** → Tag WhatsApp/Facebook leads as `high_volume`
7. **Merge Node** → Combine all leads
8. **HTTP Request: Store Leads** → POST to your dashboard API (`/api/trpc/leads.create`)

**Configuration**:
- Use free proxies or rotating IPs to avoid rate limits
- Implement deduplication logic (check if lead already exists by phone/email)
- Target: 20+ leads per run (120+ leads/day)

---

### Workflow 2: Lead Qualification (Runs every 2 hours)

**Trigger**: Schedule (cron: `0 */2 * * *`)

**Nodes**:
1. **Schedule Trigger** → Every 2 hours
2. **HTTP Request: Fetch New Leads** → GET `/api/trpc/leads.getByStatus?status=new`
3. **Loop Node** → Iterate through each lead
4. **HTTP Request: Send WhatsApp Message** → Use free WhatsApp Business API or Twilio free tier
5. **LLM Node (Manus Built-in)** → Conversational agent with prompt:
   ```
   You are a sales agent for Airtel Kenya 5G ODU. Your goal is to:
   1. Collect: Customer Name, Airtel Number, Email, Installation Town, Delivery Location, Preferred Date/Time
   2. AGGRESSIVELY upsell the 30Mbps package (KES 3,500/month) over 15Mbps (KES 2,500/month)
   3. Emphasize: Speed, reliability, future-proofing, limited-time offer
   4. Frame 15Mbps as "basic" option for light users only
   5. Be conversational, friendly, but persistent
   ```
6. **Set Node: Extract Data** → Parse LLM response and extract collected fields
7. **HTTP Request: Update Lead** → POST to `/api/trpc/leads.update` with collected data and `status: "qualified"`
8. **End Node**

**Configuration**:
- Use Manus built-in LLM API (invokeLLM) for zero-cost conversational AI
- Implement conversation state tracking (store in `conversationHistory` field)
- Target: 50+ qualified leads/day

---

### Workflow 3: Form Submission (Runs every 4 hours)

**Trigger**: Schedule (cron: `0 */4 * * *`)

**Nodes**:
1. **Schedule Trigger** → Every 4 hours
2. **HTTP Request: Fetch Qualified Leads** → GET `/api/trpc/leads.getByStatus?status=qualified`
3. **Loop Node** → Iterate through each lead
4. **Function Node: Construct Payload** → Build Microsoft Forms submission payload:
   ```javascript
   const payload = {
     "responses": [
       { "questionId": "r1", "answer": "Enterprise" }, // Agent Type
       { "questionId": "r2", "answer": "BAZZTECH NETWORKS" }, // Enterprise CP
       { "questionId": "r3", "answer": "Reagan Ochola" }, // Agent Name
       { "questionId": "r4", "answer": "254781751937" }, // Agent Mobile
       { "questionId": "r5", "answer": "Confirmed" }, // Type of Lead
       { "questionId": "r6", "answer": "SmartConnect (5G ODU)" }, // Type of Connection
       { "questionId": "r7", "answer": item.customerName }, // Customer Name
       { "questionId": "r8", "answer": item.customerAirtelNumber }, // Airtel Number
       { "questionId": "r9", "answer": item.customerAlternateNumber }, // Alt Number
       { "questionId": "r10", "answer": item.customerEmail }, // Email
       { "questionId": "r11", "answer": item.preferredPackage }, // Package
       { "questionId": "r12", "answer": item.installationTown }, // Town
       { "questionId": "r13", "answer": item.deliveryLocation }, // Location
       { "questionId": "r14", "answer": item.installationDate }, // Date
       { "questionId": "r15", "answer": item.installationTime }, // Time
     ]
   };
   return payload;
   ```
5. **HTTP Request: Submit Form** → POST to Microsoft Forms API endpoint
   - URL: `https://forms.office.com/formapi/api/...` (extract from browser network tab)
   - Headers: `Content-Type: application/json`
   - Body: Payload from previous node
6. **IF Node: Check Response** → If status code 200-299, success; else, failed
7. **HTTP Request: Create Submission Record** → POST to `/api/trpc/submissions.create`
8. **HTTP Request: Update Lead Status** → POST to `/api/trpc/leads.update` with `status: "submitted"` or `status: "failed"`
9. **End Node**

**Configuration**:
- Implement retry logic: If submission fails, retry up to 3 times with 5-minute delays
- Log all responses to `submissions` table for debugging
- Target: 100% submission success rate (>97%)

---

## Zero-Cost Tool Stack

| Component | Tool | Cost |
|-----------|------|------|
| **Workflow Automation** | n8n (self-hosted) | Free |
| **Database** | MySQL/TiDB (Manus built-in) | Free |
| **LLM** | Manus built-in LLM API | Free |
| **WhatsApp Messaging** | WhatsApp Business API (free tier) or Twilio free tier | Free |
| **Lead Scraping** | PhantomBuster alternatives, Apify free tier | Free |
| **Dashboard Hosting** | Manus deployment | Free |
| **Analytics** | Built-in dashboard | Free |

---

## Weekly Optimization Loop

### Automated Weekly Report (Runs every Monday at 9 AM)

**Trigger**: Schedule (cron: `0 9 * * 1`)

**Workflow**:
1. **Fetch Analytics** → GET `/api/trpc/analytics.getRecent?days=7`
2. **Calculate KPIs**:
   - Total GAs (target: 100+/week)
   - Conversion Rate (Lead → GA)
   - 30Mbps Package Mix (target: >70%)
   - Avg Commission per GA
   - Submission Success Rate (target: >97%)
3. **Identify Bottlenecks**:
   - If GAs < 100/week → Increase lead gen frequency
   - If Conversion Rate < 20% → Improve qualification script
   - If 30Mbps Mix < 70% → Strengthen upselling tactics
   - If Submission Success Rate < 97% → Debug form submission logic
4. **Generate Report** → Use LLM to create natural language summary
5. **Send Notification** → POST to `/api/trpc/system.notifyOwner` with report

**Optimization Actions**:
- **Low GAs**: Increase lead gen to every 4 hours, expand to new channels
- **Low Conversion**: A/B test qualification prompts, add urgency triggers
- **Low 30Mbps Mix**: Increase price gap emphasis, add limited-time offers
- **Low Submission Success**: Add retry logic, improve payload validation

---

## Critical Success Factors

### 1. **30Mbps Upselling Strategy**
- **Commission Difference**: 30Mbps earns significantly higher commission than 15Mbps
- **Tactics**:
  - Emphasize speed difference: "30Mbps = 4K streaming, video calls, gaming; 15Mbps = basic browsing"
  - Limited-time offer: "30Mbps at special rate for first 3 months"
  - Future-proofing: "Your business will grow, 30Mbps ensures you're ready"
  - Social proof: "90% of our business customers choose 30Mbps"

### 2. **Lead Quality Over Quantity**
- **High-Value Leads** (60% allocation):
  - LinkedIn: Business owners, IT managers
  - Google Maps: Established businesses in coverage areas
  - Characteristics: Higher budget, faster decision-making, prefer premium packages
- **High-Volume Leads** (40% allocation):
  - WhatsApp: Community groups, referrals
  - Facebook: Marketplace, local groups
  - Characteristics: Price-sensitive, require more nurturing

### 3. **Form Submission Reliability**
- **Target**: >97% success rate
- **Strategies**:
  - Validate all fields before submission
  - Implement exponential backoff retry logic
  - Log all errors for debugging
  - Monitor Microsoft Forms API changes

### 4. **Continuous Optimization**
- **Weekly**: Review KPIs, identify bottlenecks, adjust workflows
- **Monthly**: A/B test qualification scripts, expand lead sources
- **Quarterly**: Evaluate commission tier progress, set new targets

---

## Implementation Timeline

### Week 1-2: Setup & Testing
- Set up n8n instance (self-hosted or cloud)
- Configure all three workflows
- Test with dummy data
- Verify form submission logic

### Week 3-4: Lead Gen Ramp-Up
- Activate lead generation workflows
- Monitor lead quality and volume
- Adjust source allocation (60/40 split)

### Week 5-8: Qualification Optimization
- Fine-tune LLM prompts for qualification
- A/B test upselling tactics
- Target: 70%+ 30Mbps mix

### Week 9-12: Scale to 400+ GAs
- Increase lead gen frequency
- Optimize conversion funnel
- Monitor weekly reports
- Achieve 400+ GAs/month target

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| **Microsoft Forms API changes** | Monitor form structure weekly, implement fallback manual submission alert |
| **Low lead quality** | Implement lead scoring, prioritize high-value sources |
| **Low 30Mbps conversion** | A/B test upselling scripts, add incentives |
| **WhatsApp rate limits** | Use multiple accounts, implement message throttling |
| **n8n downtime** | Set up monitoring, implement auto-restart |

---

## Next Steps

1. **Set up n8n instance**: Deploy on free tier (Railway, Render, or self-hosted)
2. **Configure workflows**: Import workflow JSONs (to be created)
3. **Test form submission**: Validate Microsoft Forms API endpoint
4. **Launch lead gen**: Start with LinkedIn + Google Maps
5. **Monitor weekly reports**: Review KPIs every Monday
6. **Optimize relentlessly**: Adjust workflows based on performance data

---

## Conclusion

The Bazztech n8n Agentic Team is designed to operate autonomously, achieving 400+ monthly Gross Adds through intelligent lead generation, aggressive 30Mbps upselling, and reliable form submission. By leveraging zero-cost tools and continuous optimization, the system maximizes commission revenue while minimizing operational overhead.

**Target Metrics (90 days)**:
- **400+ Gross Adds/month**
- **70%+ 30Mbps Package Mix**
- **>97% Form Submission Success Rate**
- **20%+ Lead-to-Install Conversion Rate**
- **KES 2,500+ Avg Commission per GA**

---

**Document Version**: 1.0  
**Last Updated**: November 20, 2025  
**Author**: Bazztech Networks Agentic Team
