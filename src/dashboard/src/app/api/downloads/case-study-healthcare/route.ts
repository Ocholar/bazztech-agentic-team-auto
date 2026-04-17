import { NextResponse } from 'next/server';

const content = `
BazzAI — Healthcare Case Study
================================
Client: Serena Medical Centers (Kenya, 4 locations)
Vertical: Healthcare / Outpatient Clinics
System: Bazz-Connect Patient Communication + Appointment Retention Engine

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXECUTIVE SUMMARY
─────────────────
The Challenge:
Serena Medical Centers was experiencing 34% appointment no-show rates across its 4 locations — each representing direct revenue loss from wasted clinical slots, nurse prep time, and consumables. Manual reminder calls by front-desk staff consumed 18 hrs/week and still weren't reducing no-shows below 30%.

The Solution:
BazzAI deployed a multi-stage Patient Retention Engine (via WhatsApp Business API) that:
  • Sends automated appointment confirmations 48 hrs before
  • Follows up with a personalized reminder 24 hrs before (including prep instructions)
  • Sends a same-day "we're ready for you" message 2 hrs before
  • Identifies high-risk no-show patients using historical data and escalates to human staff

The Result:
No-show rate dropped from 34% to 3.4% (90% reduction). Front-desk staff reclaimed 16 hrs/week for patient-facing duties.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FINANCIAL IMPACT
────────────────
Before BazzAI:
  • No-show rate:              34%
  • Monthly appointments:      2,400 (across 4 sites)
  • Wasted slots/month:        816
  • Avg slot value:            $45 (consultation + consumables)
  • Monthly revenue loss:      $36,720
  • Manual reminder labor:     18 hrs/week × $22/hr × 4 weeks = $1,584/month

After BazzAI (Month 2):
  • No-show rate:              3.4%
  • Wasted slots/month:        82 (down from 816)
  • Recovered monthly revenue: $33,030
  • Reminder labor:            2 hrs/week (16 hrs reclaimed)

Investment:
  Implementation fee:     $9,800
  Monthly retainer:       $950/month
  Year 1 total:           $21,200

Year 1 Financial Return:
  Revenue recovered:       $33,030/month × 12 = $396,360
  Labor savings:           $1,333/month × 12  = $15,996
  Total Year 1 Benefit:    $412,356
  Year 1 ROI:              1,845%
  Payback Period:          16 days

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KEY PERFORMANCE INDICATORS (Before → After)
───────────────────────────────────────────
  No-show rate:              34%    → 3.4%        (-90%)
  Wasted slots/month:        816    → 82          (-90%)
  Reminder labor (hrs/week): 18     → 2           (-89%)
  Patient satisfaction (NPS): 6.8  → 8.9
  System message open rate:  —      → 94.2%       (WhatsApp)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPLEMENTATION TIMELINE
───────────────────────
  Week 1–2:   Discovery (appointment workflow, EHR system mapping, WhatsApp Business API setup)
  Week 3–4:   Message sequence design + risk-scoring model training
  Week 5–6:   Staging (3-week parallel test across 1 pilot site)
  Week 7–8:   Production rollout to all 4 locations
  Week 9+:    No-show prediction refinement + NPS tracking integration

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT TESTIMONIAL
──────────────────
"The system sends better reminders than our staff ever could — and it
 never forgets, never has a bad day, and speaks to our patients in
 Swahili or English automatically. Our clinics are fuller and our
 nurses are less stressed."

  — CEO, Serena Medical Centers

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
            'Content-Disposition': 'attachment; filename="BazzAI_Healthcare_Case_Study.txt"',
            'Content-Length': bytes.length.toString(),
        },
    });
}
