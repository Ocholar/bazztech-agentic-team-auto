"use client";

import { useEffect, useState } from 'react';
import { trackABVariantExposed, trackHeroCTAClick } from '@/lib/analytics';

type Variant = 'control' | 'variant_b';

const VARIANTS: Record<Variant, { headline: string; sub: string; cta: string }> = {
    control: {
        headline: 'Automate Your Operations Before Your Competitors Do — and reclaim 20+ hours/week',
        sub: 'BazzAI deploys custom AI pipelines for enterprise operations in 4–8 weeks, at a fraction of hiring cost.',
        cta: 'Book Assessment',
    },
    variant_b: {
        headline: 'Your Manual Workflows Are Costing You $100k+ a Year. We Can Prove It.',
        sub: 'BazzAI builds measurable, autonomous AI pipelines. Validated at 1,295% ROI with Dakri Cartons Manufacturing.',
        cta: 'See the ROI Calculator',
    },
};

/**
 * HeroABTest
 * Randomly assigns visitors to CONTROL or VARIANT_B on first visit.
 * Persists the assignment in localStorage so the same user always sees the same variant.
 * Fires Vercel Analytics events on mount (exposure) and on primary CTA click.
 */
export default function HeroABTest({ onBooking }: { onBooking: () => void }) {
    const [variant, setVariant] = useState<Variant>('control');

    useEffect(() => {
        const stored = localStorage.getItem('bazzai_hero_variant') as Variant | null;
        if (stored && (stored === 'control' || stored === 'variant_b')) {
            setVariant(stored);
            trackABVariantExposed(stored);
        } else {
            const assigned: Variant = Math.random() < 0.5 ? 'control' : 'variant_b';
            localStorage.setItem('bazzai_hero_variant', assigned);
            setVariant(assigned);
            trackABVariantExposed(assigned);
        }
    }, []);

    const v = VARIANTS[variant];

    const handleCTAClick = () => {
        trackHeroCTAClick(variant, v.cta);
        if (variant === 'variant_b') {
            // Scroll to ROI Calculator on pricing page
            window.location.href = '/pricing#roi-calculator';
        } else {
            onBooking();
        }
    };

    return (
        <div data-ab-variant={variant} data-testid="hero-ab-test">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.07] mb-7">
                {v.headline}
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-8 leading-relaxed max-w-lg">
                {v.sub}
            </p>
            <button
                id="hero-primary-cta"
                onClick={handleCTAClick}
                className="px-8 py-3 rounded-2xl bg-red-600 text-white font-black text-base hover:bg-red-700 shadow-2xl shadow-red-100 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
                {v.cta}
            </button>
        </div>
    );
}
