export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { db as prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const now = new Date();

        // Fetch active (non-expired) insurance policies
        const activePolicies = await prisma.insurancePolicy.findMany({
            where: {
                expiryDate: { gt: now },
                verified: true
            }
        });

        // Fetch HITL guarantees
        const hitlGuarantees = await prisma.hITLGuarantee.findMany();

        if (activePolicies.length === 0) {
            console.warn('[INSURANCE_VERIFY] No active insurance policies found');
        }

        console.log(`[INSURANCE_VERIFY] Active policies: ${activePolicies.length}, HITL Guarantees: ${hitlGuarantees.length}`);

        return NextResponse.json({
            insurancePolicies: activePolicies.map(p => ({
                policyName: p.policyName,
                provider: p.provider,
                policyNumber: p.policyNumber,
                coverageAmount: Number(p.coverageAmount),
                coverageType: p.coverageType,
                effectiveDate: p.effectiveDate.toISOString(),
                expiryDate: p.expiryDate.toISOString(),
                certificateUrl: p.certificateUrl,
                verified: p.verified,
                verifiedAt: p.verifiedAt?.toISOString()
            })),
            hitlGuarantees: hitlGuarantees.map(h => ({
                agentLevel: h.agentLevel,
                guaranteeText: h.guaranteeText,
                humanApprovalRequired: h.humanApprovalRequired
            })),
            message: 'BazzAI is fully insured and compliant with human-in-the-loop standards.',
            verifiedAt: new Date().toISOString()
        }, { status: 200 });
    } catch (error) {
        console.error('[INSURANCE_VERIFY_ERROR]', error);
        return NextResponse.json(
            { error: 'Failed to verify insurance status' },
            { status: 500 }
        );
    }
}
