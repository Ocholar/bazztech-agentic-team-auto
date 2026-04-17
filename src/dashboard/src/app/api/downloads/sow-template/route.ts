import { NextResponse } from 'next/server';

const sowContent = `
BazzAI - Statement of Work (SOW) Template
==========================================

STATEMENT OF WORK
Between: Bazztech Networks Ltd ("Service Provider")
And: [CLIENT COMPANY NAME] ("Client")
Date: [DATE]
Project: AI Workflow Automation Implementation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. PROJECT OVERVIEW
───────────────────
This Statement of Work defines the scope, deliverables, timeline, and financial terms for the implementation of AI-powered workflow automation for [CLIENT COMPANY NAME].

BazzAI will deliver a custom, production-ready AI automation system designed to eliminate the following manual workflows:
  • [Workflow 1 - e.g., Invoice Processing]
  • [Workflow 2 - e.g., Lead Nurturing]
  • [Workflow 3 - e.g., Appointment Reminders]

Expected Business Outcomes:
  • [X]% reduction in manual processing time
  • [Y] hours/week reclaimed by operational staff
  • Payback period: [Z] months

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2. SCOPE OF WORK
────────────────
PHASE 1: Discovery & Architecture (Weeks 1-2)
  ✓ Current state process mapping workshop (half-day, remote or on-site)
  ✓ Data source audit and quality assessment
  ✓ Custom technical architecture design
  ✓ Stakeholder interviews (max 3 stakeholders)
  Deliverable: Signed Implementation Roadmap + Technical Specification

PHASE 2: Design & Integration (Weeks 3-4)
  ✓ Custom AI workflow development
  ✓ API integration to existing systems ([System Names])
  ✓ Security hardening (data encryption, role-based access)
  ✓ Staging environment setup and acceptance test plan
  Deliverable: UAT-ready system in staging environment

PHASE 3: Deployment & Pilot (Weeks 5-8)
  ✓ 2-week parallel pilot (AI + manual simultaneous)
  ✓ Production deployment (zero-downtime)
  ✓ Staff training (2 live sessions + recorded video)
  ✓ 15-minute rollback plan execution test
  Deliverable: Live, production system with monitoring dashboard

PHASE 4: Optimization (Ongoing, Month 3+)
  ✓ Monthly performance reports
  ✓ Quarterly business reviews
  ✓ Continuous model tuning and threshold optimization

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3. EXCLUSIONS FROM SCOPE
────────────────────────
The following are NOT included in this SOW:
  ✗ Hardware procurement or infrastructure setup
  ✗ Custom mobile app development
  ✗ Ongoing content creation or copywriting
  ✗ Integration with systems not listed in Section 2

Any work outside this scope requires a written Change Request and approval from both parties.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4. FINANCIAL TERMS
─────────────────
Implementation Fee: USD [AMOUNT]
  • 50% due upon SOW signature
  • 50% due upon Phase 3 go-live

Monthly Retainer (Post-Launch): USD [AMOUNT]/month
  • Covers monitoring, optimization, and priority support
  • 30-day cancellation notice required

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5. TIMELINE
───────────
Signed SOW:              [DATE]
Phase 1 Complete:        [DATE + 2 weeks]
Phase 2 Complete:        [DATE + 4 weeks]
Phase 3 Go-Live:         [DATE + 8 weeks]
Phase 4 (Ongoing):       [DATE + 8 weeks onwards]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6. CLIENT RESPONSIBILITIES
──────────────────────────
Client agrees to:
  • Provide access to relevant data systems within 5 business days of SOW signing
  • Assign one internal Project Owner with decision-making authority
  • Review and approve technical deliverables within 3 business days
  • Make payment per the schedule in Section 4

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7. INTELLECTUAL PROPERTY
────────────────────────
All custom workflow logic, n8n workflow configurations, and automation scripts created specifically for Client under this SOW are owned by Client upon full payment.

BazzAI retains ownership of all proprietary frameworks, methodologies, and re-usable AI components built prior to this engagement.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

8. CONFIDENTIALITY
──────────────────
Both parties agree to keep all shared information confidential for a period of 3 years from the date of this SOW. BazzAI operates with zero-retention LLM policies — client data is never used to train third-party AI models.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

9. SIGNATURES
─────────────

CLIENT:
Name:  ___________________________
Title: ___________________________
Date:  ___________________________
Signature: _______________________

SERVICE PROVIDER (Bazztech Networks Ltd):
Name:  Reagan Ochola
Title: Founder & Lead AI Architect
Date:  ___________________________
Signature: _______________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bazztech Networks Ltd | Nairobi, Kenya
info@bazztech.co.ke | +254 781 751 937 | bazztech.co.ke
`;

export async function GET() {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(sowContent);

    return new NextResponse(bytes, {
        status: 200,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename="BazzAI_SOW_Template.txt"',
            'Content-Length': bytes.length.toString(),
        },
    });
}
