# Bazztech n8n Agentic Team - Workflow Files

This directory contains the n8n workflow JSON files for the Bazztech Agentic Team.

## Workflow Files

1. **01_lead_generation_agent.json** - Lead Generation Agent
   - Schedule: Every 6 hours (4 times daily)
   - Objective: Acquire 600+ leads/month from zero-cost channels
   - Sources: LinkedIn, Google Maps, WhatsApp, Facebook

2. **02_lead_qualification_agent.json** - Lead Qualification Agent
   - Schedule: Every 2 hours (12 times daily)
   - Objective: Qualify leads and aggressively upsell 30Mbps package
   - Method: LLM-powered conversational agent via WhatsApp

3. **03_form_submission_agent.json** - Form Submission Agent
   - Schedule: Every 4 hours (6 times daily)
   - Objective: Auto-submit qualified leads to Airtel Installation Request Form
   - Method: Reverse-engineered HTTP POST to Microsoft Forms API

4. **04_weekly_optimization_agent.json** - Weekly Optimization Agent
   - Schedule: Every Monday at 9:00 AM (Kenya time)
   - Objective: Generate automated performance reports and identify bottlenecks
   - Method: LLM-generated reports sent via Manus notification API

## How to Import

1. Log in to your n8n dashboard
2. Click "Workflows" → "+ New Workflow"
3. Click the three-dot menu (⋮) → "Import from File"
4. Upload the JSON file
5. Save and configure as per the Workflow Configuration Guide

## Configuration Required

Before activating the workflows, you must:

1. Update scraper API endpoints (LinkedIn, Google Maps, WhatsApp, Facebook)
2. Configure credentials for all external APIs
3. Verify dashboard API URLs
4. Set environment variables in Railway (MANUS_LLM_API_URL, MANUS_LLM_API_KEY)
5. Extract and update Microsoft Forms API endpoint and question IDs

Refer to `06_workflow_configuration_guide.md` for detailed instructions.

## Support

For issues or questions, refer to the troubleshooting section in the Workflow Configuration Guide.
