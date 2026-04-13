import { track } from '@vercel/analytics';

/**
 * Logs a custom event to Vercel Analytics with an optional payload.
 */
export const logAnalyticsEvent = (eventName: string, eventData?: Record<string, string | number | boolean | null>) => {
    try {
        if (typeof window !== 'undefined') {
            track(eventName, eventData);
        }
    } catch (error) {
        console.error('Failed to log analytics event:', error);
    }
};

// ─── BOOKING FUNNEL ────────────────────────────────────────────────────────────
/** Fired when the global booking modal opens from any trigger */
export const trackBookingModalOpen = (source: string) =>
    logAnalyticsEvent('booking_modal_open', { source });

/** Fired when a booking is confirmed via the calendar embed */
export const trackBookingConfirmed = (source: string) =>
    logAnalyticsEvent('booking_confirmed', { source });

// ─── PRICING PAGE ──────────────────────────────────────────────────────────────
/** Fired when a user interacts with the ROI calculator */
export const trackROICalculatorUsed = (monthSavings: number) =>
    logAnalyticsEvent('roi_calculator_used', { monthly_savings_usd: monthSavings });

/** Fired when a user clicks "Select" on an SMB product */
export const trackSMBProductSelected = (product: string) =>
    logAnalyticsEvent('smb_product_selected', { product });

/** Fired when a user clicks "View Enterprise Playbook" */
export const trackEnterpriseInterest = () =>
    logAnalyticsEvent('enterprise_interest_clicked');

// ─── CASE STUDIES ──────────────────────────────────────────────────────────────
/** Fired when a user lands on the Dakri Cartons case study page */
export const trackCaseStudyView = (slug: string) =>
    logAnalyticsEvent('case_study_view', { slug });

/** Fired when a user clicks a GitHub architecture link */
export const trackGitHubLinkClick = (repo: string) =>
    logAnalyticsEvent('github_link_click', { repo });

// ─── ROLE PAGES ────────────────────────────────────────────────────────────────
/** Fired when a role-based landing page is visited */
export const trackRolePageView = (role: 'cto' | 'coo' | 'cfo') =>
    logAnalyticsEvent('role_page_view', { role });

// ─── BLOG & THOUGHT LEADERSHIP ─────────────────────────────────────────────────
/** Fired when a blog article link is clicked */
export const trackBlogArticleClick = (slug: string) =>
    logAnalyticsEvent('blog_article_click', { slug });

/** Fired when a newsletter subscription is submitted */
export const trackNewsletterSubscribe = () =>
    logAnalyticsEvent('newsletter_subscribe');

// ─── LEAD CAPTURE ──────────────────────────────────────────────────────────────
/** Fired when any lead capture form is submitted */
export const trackLeadCapture = (type: string, page: string) =>
    logAnalyticsEvent('lead_captured', { type, page });

// ─── A/B TESTING ───────────────────────────────────────────────────────────────
/** Fired on hero section mount to record which variant was shown */
export const trackABVariantExposed = (variant: 'control' | 'variant_b') =>
    logAnalyticsEvent('ab_hero_variant_exposed', { variant });

/** Fired when the primary CTA in the hero is clicked */
export const trackHeroCTAClick = (variant: 'control' | 'variant_b', cta: string) =>
    logAnalyticsEvent('ab_hero_cta_click', { variant, cta });
