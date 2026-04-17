import { NextResponse } from 'next/server';

const content = `
BazzAI — Legal Services Case Study
====================================
Client: Apex Commercial Law (Nairobi)
Vertical: Legal Services
System: Bazz-Doc + Bazz-Connect Client Intake Automation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXECUTIVE SUMMARY
─────────────────
The Challenge:
Apex Commercial Law was processing 180+ new client intake forms monthly. Paralegals spent 4.2 hours per case manually reviewing intake PDFs, extracting matter type, jurisdiction, urgency flags, and billing info. Errors in intake led to billing disputes and matter mis-classification.

The Solution:
BazzAI deployed a document-aware intake pipeline (Bazz-Doc) that:
  • Accepts intake forms via WhatsApp, email, or web upload
  • Extracts structured data from PDFs/scans using OCR + RAG
  • Auto-classifies matter type and jurisdiction
  • Routes to the correct practice group automatically
  • Generates a pre-populated matter file for partner review

The Result:
Matter intake time dropped from 4.2 hours per file to 22 minutes. Billing dispute rate caused by intake errors fell by 91%.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FINANCIAL IMPACT
────────────────
Before BazzAI:
  • Time per intake:          4.2 hrs × $65/hr (paralegal) = $273/intake
  • Monthly intake volume:    180 cases = $49,140/month in labor
  • Billing disputes (intake error): 14/month × $400 avg write-off = $5,600/month

After BazzAI (Month 3):
  • Time per intake:          22 min = $23.83/intake (savings: $249/case)
  • Disputes caused by intake: 1.3/month (drop of 91%)

Investment:
  Implementation fee:     $18,500
  Monthly retainer:       $1,800/month
  Year 1 total:           $40,100

Year 1 Financial Return:
  Labor savings:          $249/case × 180 cases/mo × 12 months = $537,840
  Dispute reduction:      $5,600 → $520/month savings = $61,440/year
  Total Year 1 Benefit:   $599,280
  Year 1 ROI:             1,394%
  Payback Period:         0.8 months

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KEY PERFORMANCE INDICATORS (Before → After)
───────────────────────────────────────────
  Intake processing time:    4.2 hrs → 22 min      (-91%)
  Intake error rate:         7.8%    → 0.7%         (-91%)
  Billing disputes/month:    14      → 1.3          (-91%)
  Paralegal capacity freed:  756 hrs/yr (equivalent to 0.5 FTE)
  System accuracy:           —       → 98.6%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPLEMENTATION TIMELINE
───────────────────────
  Week 1–2:   Discovery & intake form mapping
  Week 3–4:   Bazz-Doc OCR pipeline configuration & practice group routing logic
  Week 5–6:   Staging + parallel test (AI vs. manual, 30 test cases)
  Week 7–8:   Production rollout & paralegal training
  Week 9+:    Billing reconciliation module added

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT TESTIMONIAL
──────────────────
"The accuracy of the extraction surprised us. It reads our intake forms
 better than a first-year associate. Partners now review files that
 are already 80% complete on arrival."

  — Managing Partner, Apex Commercial Law

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
            'Content-Disposition': 'attachment; filename="BazzAI_Legal_Case_Study.txt"',
            'Content-Length': bytes.length.toString(),
        },
    });
}
