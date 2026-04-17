import { NextResponse } from 'next/server';

const content = `
BazzAI — Real Estate Case Study
================================
Client: Meridian Property Group (East Africa)
Vertical: Commercial Real Estate
System: Bazz-Connect Lead Qualification + Viewing Scheduler

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXECUTIVE SUMMARY
─────────────────
The Challenge:
Meridian Property Group was managing 250+ inbound property inquiries weekly across WhatsApp, email, and phone. Sales agents spent 23 hours/week doing repetitive qualification (budget, location, timeline), 40% of which resulted in unqualified leads. Viewing appointments were booked manually with frequent double-bookings.

The Solution:
BazzAI deployed an Agentic Lead Engine on WhatsApp Business that:
  • Qualifies leads 24/7 via intelligent conversation (budget, timeline, geography)
  • Books or declines viewings automatically against live agent calendars
  • Scores lead quality (1–10) and routes only qualified leads to senior agents
  • Sends automated reminders and follow-ups

The Result:
In 90 days, agent time on lead qualification dropped from 23hrs to under 2hrs/week while qualified viewing rates increased by 62%.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FINANCIAL IMPACT
────────────────
Before BazzAI:
  • Agent hours on qualification:  23 hrs/week × $45/hr = $1,035/week ($53,820/yr)
  • Unqualified viewing rate:       40% (wasted showings)
  • Leads requiring follow-up:      60% handled manually

After BazzAI (Month 3):
  • Agent hours on qualification:  1.8 hrs/week = savings of $1,008/week
  • Unqualified viewing rate:       12% (drop by 28 percentage points)
  • Deal close rate increase:       +18% (due to faster response time)

Investment:
  Implementation fee:     $12,500
  Monthly retainer:       $1,200/month
  Year 1 total:           $26,900

Year 1 Financial Return:
  Labor savings:          $52,416
  Incremental deals:      Estimated 4 additional closings @ $3,200 commission = $12,800
  Total Year 1 Benefit:   $65,216
  Year 1 ROI:             243%
  Payback Period:         5.2 months

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KEY PERFORMANCE INDICATORS (Before → After)
───────────────────────────────────────────
  Lead response time:       4.2 hrs → 90 seconds  (-97%)
  Qualification hours/week: 23 hrs  → 1.8 hrs     (-92%)
  Unqualified viewings:     40%     → 12%          (-70%)
  Viewing booking errors:   8/week  → 0/week       (-100%)
  Agent satisfaction (NPS): 6.2     → 9.1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPLEMENTATION TIMELINE
───────────────────────
  Week 1–2:   Discovery & API mapping (CRM, WhatsApp Business, Calendar)
  Week 3–4:   Qualification flow design & integration development
  Week 5–6:   Staging deployment & parallel pilot
  Week 7–8:   Production launch & agent training
  Week 9+:    Optimization & NPS monitoring

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT TESTIMONIAL
──────────────────
"Within 30 days, my senior agents stopped wasting time on tire-kickers.
 The AI handles the first conversation better than most junior agents.
 We're closing more deals with the same headcount."

  — Head of Residential Sales, Meridian Property Group

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
            'Content-Disposition': 'attachment; filename="BazzAI_Real_Estate_Case_Study.txt"',
            'Content-Length': bytes.length.toString(),
        },
    });
}
