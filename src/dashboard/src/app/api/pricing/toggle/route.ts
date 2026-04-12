import { NextRequest, NextResponse } from 'next/server';
import { db as prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const targetCurrency = searchParams.get('currency') || 'USD';

    if (!['USD', 'KES'].includes(targetCurrency)) {
        return NextResponse.json(
            { error: 'Invalid currency. Use USD or KES.' },
            { status: 400 }
        );
    }

    try {
        const figures = await prisma.pricingFigure.findMany();

        let result = [];
        if (targetCurrency === 'KES') {
            const rateEntry = await prisma.exchangeRate.findFirst({
                where: {
                    fromCurrency: 'USD',
                    toCurrency: 'KES',
                    effectiveDate: { lte: new Date() }
                },
                orderBy: { effectiveDate: 'desc' }
            });

            const conversionRate = rateEntry ? Number(rateEntry.rate) : 100;
            result = figures.map(fig => ({
                featureId: fig.featureId,
                amount: Number(fig.usdAmount) * conversionRate,
                currency: 'KES',
                description: fig.description
            }));
        } else {
            result = figures.map(fig => ({
                featureId: fig.featureId,
                amount: Number(fig.usdAmount),
                currency: 'USD',
                description: fig.description
            }));
        }

        console.log(`[PRICING_TOGGLE] Currency: ${targetCurrency}, Figures: ${result.length}`);

        return NextResponse.json({
            currency: targetCurrency,
            figures: result,
            subsidyApplied: targetCurrency === 'KES'
        }, { status: 200 });
    } catch (error) {
        console.error('[PRICING_TOGGLE_ERROR]', error);
        return NextResponse.json(
            { error: 'Failed to fetch pricing' },
            { status: 500 }
        );
    }
}
