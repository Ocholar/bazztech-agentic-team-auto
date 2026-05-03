export const DEMO_ANSWERS: Record<string, any> = {
    'downtime': {
        answer: "Root Cause Analysis — Corrugator Stoppages (Yesterday)\n\nIdentified 3 unplanned stops between 09:14–16:42. AI confidence: 94%\n\n• Stop 1 (09:14, 22 min): Splicer tension fault. Correlated to paper roll batch tension.\n• Stop 2 (13:05, 41 min): Flute temperature drop. Heating element variance detected.\n• Stop 3 (16:42, 18 min): Electrical supply fluctuation — correlated with grid brownout.\n\nRecommendation: Schedule Corrugator bearing inspection within 72h. Avoided downtime value: KES 84,000.",
        citations: [{ source: "Line 2 Sensor Logs", date: "2026-04-29" }],
        confidence: 0.94
    },
    'margin': {
        answer: "Margin Intelligence — April 2026\n\nTop 3 SKUs by gross margin:\n\n• Double Wall Kraft: 45.2%\n• Single Face E-Flute: 32.4%\n• Custom Die-Cut Box: 29.2%\n\nDouble Wall Kraft is outperforming forecast by 18%. AI suggests accelerating next week's production run based on sales pipeline.",
        citations: [{ source: "ERP Reconciler", date: "2026-04-30" }],
        confidence: 0.88,
        chart: 'bar'
    },
    'inventory': {
        answer: "Inventory Forecast — Kraft Paper Roll\n\nCurrent stock: 4,200 tons | Daily consumption rate: 1,850 tons/day\n\nProjected depletion: Thursday 16:00 ⚠️\n\nAI Action Taken: Auto-drafted WhatsApp message to International Paper Suppliers requesting Wednesday delivery. Awaiting confirmation.",
        citations: [{ source: "Inventory Forecaster", date: "Real-time" }],
        confidence: 0.91
    },
    'fallback': {
        answer: "I am analyzing your factory data. For the purpose of this demo, I can answer questions about planned downtime, margin intelligence, and inventory forecasts.\n\nTry asking: 'Will we run out of Kraft paper roll before Friday?'",
        citations: [],
        confidence: 1.0
    }
};

export function classifyDemoQuery(query: string) {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('stop') || lowerQuery.includes('downtime')) {
        return DEMO_ANSWERS['downtime'];
    }

    if (lowerQuery.includes('margin') || lowerQuery.includes('sku')) {
        return DEMO_ANSWERS['margin'];
    }

    if (lowerQuery.includes('kraft') || lowerQuery.includes('run out')) {
        return DEMO_ANSWERS['inventory'];
    }

    return DEMO_ANSWERS['fallback'];
}
