// FILE: src/app/api/leads/stage/route.ts
// PURPOSE: Update a lead's CRM stage (called by Bazz_Lead_Master n8n agent tool)
// Method: POST
// Auth: x-api-key header (INTERNAL_API_KEY)

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;

// Valid stage values matching the DB enum
const VALID_STAGES = ["LEAD", "CONTACTED", "PROSPECTIVE", "SALE"] as const;
type LeadStage = (typeof VALID_STAGES)[number];

export async function POST(req: NextRequest) {
    // Auth guard
    const apiKey = req.headers.get("x-api-key");
    if (!INTERNAL_API_KEY || apiKey !== INTERNAL_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { leadId, stage } = body as { leadId: string; stage: LeadStage };

        if (!leadId || !stage) {
            return NextResponse.json(
                { error: "Missing required fields: leadId, stage" },
                { status: 400 }
            );
        }

        if (!VALID_STAGES.includes(stage)) {
            return NextResponse.json(
                { error: `Invalid stage. Must be one of: ${VALID_STAGES.join(", ")}` },
                { status: 400 }
            );
        }

        // Verify lead exists
        const existing = await db.lead.findUnique({ where: { id: leadId } });
        if (!existing) {
            return NextResponse.json({ error: "Lead not found" }, { status: 404 });
        }

        // Update the stage
        const updated = await db.lead.update({
            where: { id: leadId },
            data: {
                stage,
                lastMessage: `Stage updated to ${stage} by AI agent at ${new Date().toISOString()}`,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            lead: {
                id: updated.id,
                stage: updated.stage,
                updatedAt: updated.updatedAt,
            },
        });
    } catch (error) {
        console.error("[/api/leads/stage] Error:", error);
        return NextResponse.json(
            { error: "Failed to update lead stage", details: String(error) },
            { status: 500 }
        );
    }
}
