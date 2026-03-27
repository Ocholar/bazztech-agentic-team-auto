// FILE: src/app/api/leads/route.ts
// PURPOSE: Fetch all leads for the authenticated internal API caller (n8n Bazz-Lead)
// Called by: Bazz_Lead_Master n8n workflow every hour

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;

export async function GET(req: NextRequest) {
    // Auth guard — only n8n internal caller allowed
    const apiKey = req.headers.get("x-api-key");
    if (!INTERNAL_API_KEY || apiKey !== INTERNAL_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Fetch all leads grouped by stage, joined with user info
        const leads = await db.lead.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        companyName: true,
                    },
                },
            },
        });

        // Group by stage for the AI agent
        const grouped = {
            LEAD: leads.filter((l: any) => l.stage === "LEAD"),
            CONTACTED: leads.filter((l: any) => l.stage === "CONTACTED"),
            PROSPECTIVE: leads.filter((l: any) => l.stage === "PROSPECTIVE"),
            SALE: leads.filter((l: any) => l.stage === "SALE"),
        };

        return NextResponse.json({
            success: true,
            leads: grouped,
            total: leads.length,
        });
    } catch (error) {
        console.error("[/api/leads] Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch leads", details: String(error) },
            { status: 500 }
        );
    }
}
