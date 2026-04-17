import { NextResponse } from 'next/server';

const content = `
BazzAI — Manufacturing Case Study
================================
Client: Dakri Cartons (Mauritius)
Vertical: Manufacturing / Corrugated Packaging
System: Domain-Aware RAG + Holt-Winters Predictive Inventory

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXECUTIVE SUMMARY
─────────────────
The Challenge:
Dakri Cartons was spending 3–4 hours per day manually compiling shift reports across various disconnected systems (telemetry, SCADA, ERP), often spotting stockouts and machine anomalies reactively rather than proactively. 

The Solution:
BazzAI deployed a custom RAG (Retrieval-Augmented Generation) pipeline over the factory's telemetry. Utilizing n8n orchestration, a Chroma Vector database, and Claude APIs, managers can now query operations data in plain English. Triple Exponential Smoothing (Holt-Winters) added autonomous stock forecasting.

The Result:
A 40% reduction in stockouts and a 15% improvement in OEE (Overall Equipment Effectiveness). Payback was reached in just 35 days.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FINANCIAL IMPACT
────────────────
Before BazzAI:
  • Stockouts:                 40/month (~$2,500 cost each)
  • OEE:                       65% utilization
  • Manual Reporting:          15 hours/week

After BazzAI (Month 1):
  • Stockouts:                 24/month
  • Monthly Stockout Savings:  $40,000/month
  • OEE:                       75%
  • Avoided Downtime Value:    ~$60,000/month
  • Manual Reporting:          3 hours/week (12 hrs freed)

Investment:
  • Total Implementation:      $35,000
  • Total Year 1 Cost:         $83,000

Year 1 Financial Return:
  • Year 1 Net Savings:        $1,076,200
  • Year 1 ROI:                1,295%
  • Payback Period:            1.2 months (35 days)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TECHNICAL ARCHITECTURE
──────────────────────
  • Domain-Aware RAG: Queries to Pinecone Vector DB via GPT-4o-mini return actionable insights from SCADA logs in 60ms.
  • Forecasting Engine: Holt-Winters (Triple Exponential Smoothing) via n8n automatically tracks seasonal variations.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BazzAI by Bazztech Networks | bazztech.co.ke | info@bazztech.co.ke
`;

export async function GET() {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(content);
    return new NextResponse(bytes, {
        status: 200,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename="BazzAI_Manufacturing_Case_Study_Dakri_Cartons.txt"',
            'Content-Length': bytes.length.toString(),
        },
    });
}
