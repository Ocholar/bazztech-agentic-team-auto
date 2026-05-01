// Static data for BazzAI AI Manufacturing Intelligence homepage

export const WHATSAPP_NUMBER = '15558219787';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const CALENDLY_URL = 'https://calendly.com/reagan-bazztech/30min';

export const painPoints = [
    {
        id: 'downtime',
        icon: '⚡',
        title: 'Unplanned Downtime',
        before: 'Machine breaks. 6 hours lost. $2,000 gone. No one knows why.',
        after: 'AI flags bearing degradation 72 hours early. Maintenance scheduled. Zero unplanned stops.',
        stat: '72h',
        statLabel: 'early warning',
        color: '#E53E3E',
        afterColor: '#81B29A',
    },
    {
        id: 'inventory',
        icon: '📦',
        title: 'Inventory Surprises',
        before: 'Raw materials run out mid-batch. Emergency orders at 3× cost.',
        after: 'AI forecasts inventory needs 14 days ahead. Supplier orders auto-triggered.',
        stat: '14d',
        statLabel: 'ahead forecast',
        color: '#D69E2E',
        afterColor: '#81B29A',
    },
    {
        id: 'decisions',
        icon: '📊',
        title: 'Blind Decision-Making',
        before: 'Board asks for margin analysis. Team spends 2 days in Excel.',
        after: 'Ask the AI. Get charts, insights, and recommendations in 8 seconds.',
        stat: '8s',
        statLabel: 'AI response time',
        color: '#4299E1',
        afterColor: '#81B29A',
    },
    {
        id: 'compliance',
        icon: '🗂️',
        title: 'Compliance Burden',
        before: 'KRA audit in 48 hours. Scrambling for invoices, batch records, delivery notes.',
        after: 'One click. Every document generated, filed, and auditable. AI flags discrepancies.',
        stat: '1-click',
        statLabel: 'audit ready',
        color: '#E07A5F',
        afterColor: '#81B29A',
    },
];

export const howItWorks = [
    {
        step: '01',
        title: 'Connect',
        desc: 'Plug into existing machines, ERP, WhatsApp orders, M-Pesa payments. No new hardware. No disruption.',
        icon: '🔌',
        color: '#E07A5F',
    },
    {
        step: '02',
        title: 'Learn',
        desc: 'AI ingests 90 days of your data. Builds your factory\'s unique knowledge graph. KRA, KEBS, NDPR ready.',
        icon: '🧠',
        color: '#F2CC8F',
    },
    {
        step: '03',
        title: 'Predict',
        desc: 'Anomaly detection spots failures 48–72 hours early. RAG answers any question about your floor instantly.',
        icon: '🔮',
        color: '#81B29A',
    },
    {
        step: '04',
        title: 'Improve',
        desc: 'Continuous learning. Every question you ask makes the AI smarter for your specific factory.',
        icon: '📈',
        color: '#4299E1',
    },
];

export const pricingTiers = [
    {
        name: 'Pilot',
        tagline: 'First factory, proof of concept',
        price: 'FREE',
        period: '14 days',
        note: 'No credit card needed. Ever.',
        cta: 'Start Free Pilot',
        featured: false,
        features: [
            'Basic AI chat assistant',
            '1 production line',
            '3 user accounts',
            'Real-time OEE dashboard',
            'KRA-ready invoicing',
            'WhatsApp + Email support',
        ],
    },
    {
        name: 'Growth',
        tagline: 'Scaling manufacturers',
        price: 'KES 35,000',
        priceUSD: '$250',
        period: '/month',
        note: 'Includes onboarding & workflow setup',
        cta: 'Start Free Pilot',
        featured: true,
        features: [
            'Full RAG AI system',
            'Predictive fault alerts (48–72h)',
            'Unlimited production lines',
            '10 user accounts',
            'Inventory forecasting (14-day)',
            'Margin & SKU intelligence',
            'M-Pesa reconciliation AI',
            'Priority support',
        ],
    },
    {
        name: 'Enterprise',
        tagline: 'Multi-site, enterprise scale',
        price: 'Custom',
        period: '',
        note: 'On-premise deployment available',
        cta: 'Talk to Our Team',
        featured: false,
        features: [
            'Dedicated AI model training',
            'On-premise deployment',
            'Unlimited users & lines',
            'White-glove onboarding',
            'SLA guarantee (99.9%)',
            'Data sovereignty — Africa-only',
            'Custom integrations',
        ],
    },
];

export const testimonials = [
    {
        initials: 'SM',
        role: 'Operations Manager',
        company: 'Nairobi Food Processing Plant',
        country: '🇰🇪',
        quote: 'BazzAI flagged a bearing issue on Line 3 before our team even noticed vibration changes. We scheduled maintenance, avoided 8 hours of downtime. The ROI on month one alone was undeniable.',
        dark: true,
    },
    {
        initials: 'AO',
        role: 'Finance Director',
        company: 'Lagos Snack Manufacturer',
        country: '🇳🇬',
        quote: 'I asked the AI "which SKU had the highest margin last quarter?" — it gave me a full breakdown with charts in seconds. My team used to spend two days pulling that from Excel.',
        dark: false,
    },
    {
        initials: 'FN',
        role: 'General Manager',
        company: 'Kampala Dairy Producer',
        country: '🇺🇬',
        quote: 'The inventory forecasting alone paid for the subscription three times over. We stopped emergency raw material orders completely in the second month.',
        dark: false,
    },
    {
        initials: 'BK',
        role: 'Managing Director',
        company: 'Accra Beverage Company',
        country: '🇬🇭',
        quote: 'KRA audit prep went from 3 days of chaos to one click. Every invoice, batch record, and delivery note — auditable, filed, flagged for discrepancies by the AI.',
        dark: true,
    },
    // duplicates for marquee loop
    {
        initials: 'SM', role: 'Operations Manager', company: 'Nairobi Food Processing Plant', country: '🇰🇪',
        quote: 'BazzAI flagged a bearing issue on Line 3 before our team even noticed vibration changes. Avoided 8 hours of downtime.',
        dark: true,
    },
    {
        initials: 'AO', role: 'Finance Director', company: 'Lagos Snack Manufacturer', country: '🇳🇬',
        quote: 'I asked the AI "which SKU had the highest margin last quarter?" — charts in seconds. My team used to spend two days on that.',
        dark: false,
    },
];

export const demoQueries = [
    {
        q: 'Why did the Corrugator Line stop 3 times yesterday?',
        a: `**Root Cause Analysis — Corrugator Stoppages (Yesterday)**\n\nIdentified **3 unplanned stops** between 09:14–16:42. AI confidence: **94%**\n\n• **Stop 1 (09:14, 22 min):** Splicer tension fault. Correlated to paper roll batch tension.\n• **Stop 2 (13:05, 41 min):** Flute temperature drop. Heating element variance detected.\n• **Stop 3 (16:42, 18 min):** Electrical supply fluctuation — correlated with grid brownout.\n\n**AI Recommendation:** Schedule Corrugator bearing inspection within 72h. Estimated cost: KES 8,400. Avoided downtime value: KES 84,000.`,
        chart: null,
    },
    {
        q: 'Which flute type and packaging variant has the highest margin this month?',
        a: `**Margin Intelligence — April 2026**\n\nTop 3 SKUs by gross margin:\n\n| Variant | Revenue | COGS | Margin |\n|-----|---------|------|--------|\n| Double Wall Kraft | KES 1.24M | KES 680K | **45.2%** |\n| Single Face E-Flute | KES 2.1M | KES 1.42M | 32.4% |\n| Custom Die-Cut Box | KES 890K | KES 630K | 29.2% |\n\n**Double Wall Kraft** is outperforming forecast by 18%. AI suggests accelerating next week's production run based on sales pipeline.`,
        chart: 'bar',
    },
    {
        q: 'Will we run out of Kraft paper roll before Friday?',
        a: `**Inventory Forecast — Kraft Paper Roll**\n\nCurrent stock: **4,200 tons** | Daily consumption rate: **1,850 tons/day**\n\nProjected depletion: **Thursday 16:00** ⚠️\n\nNext scheduled delivery: Friday 09:00 — **8-hour gap risk**\n\n**AI Action Taken:** Auto-drafted WhatsApp message to International Paper Suppliers requesting Wednesday delivery. Awaiting confirmation.\n\n**Recommendation:** Approve expedited order (KES 12,400 premium) or adjust Friday production schedule to single-face runs.`,
        chart: null,
    },
    {
        q: 'Predict my biggest maintenance risk this week.',
        a: `**Predictive Maintenance Report — Week of April 28**\n\n🔴 **CRITICAL — Corrugator Bearing (Line 2)**\nVibration signature anomaly detected. Probability of failure within 96h: **78%**. Recommended action: replace bearing assembly. Parts cost: KES 8,400.\n\n🟡 **MODERATE — Die-Cutter Belt (Line 4)**\nBelt tension degrading — 23% below nominal. Estimated 2 weeks before failure if unaddressed.\n\n🟢 **MONITOR — Folding Gluer (Line 1)**\nTemperature variance increasing. No immediate risk but schedule inspection next maintenance window.`,
        chart: null,
    },
    {
        q: 'Compare this month\'s OEE to last month.',
        a: `**OEE Comparison — March vs April 2026**\n\n| Metric | March | April | Change |\n|--------|-------|-------|--------|\n| Availability | 81.2% | 87.4% | +6.2% ✅ |\n| Performance | 74.8% | 79.1% | +4.3% ✅ |\n| Quality | 96.1% | 97.3% | +1.2% ✅ |\n| **OEE** | **58.4%** | **67.6%** | **+9.2%** 🚀 |\n\n**Key driver:** Predictive maintenance alerts reduced unplanned downtime by 3.2 hours/week. At your production rate, that\'s an estimated **KES 128,000 in recovered output** this month.`,
        chart: 'line',
    },
];
