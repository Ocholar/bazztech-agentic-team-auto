import { test, expect } from '@playwright/test';

test.describe('Critical User Journey', () => {
    test('Homepage to Registration', async ({ page }) => {
        // 1. Visit Hero
        await page.goto('/');
        await expect(page).toHaveTitle(/BazzAI/);

        // 2. Interact with AI Demo
        const aiInput = page.getByPlaceholder('Ask about your factory...');
        await aiInput.fill('Why did we have downtime?');
        await page.keyboard.press('Enter');
        await expect(page.getByText('Root Cause Analysis')).toBeVisible({ timeout: 10000 });

        // 3. Navigate to Pricing & ROI
        await page.goto('/pricing');
        await expect(page.getByText('ROI Calculator')).toBeVisible();

        // 4. Test Registration Click
        await page.getByRole('link', { name: /Start Your Pilot/i }).first().click();
        await expect(page).toHaveURL(/\/register/);
        await expect(page.getByText(/Activate Your Free Pilot/i)).toBeVisible();
    });

    test('FAQ Search and Filter', async ({ page }) => {
        await page.goto('/faq');
        const searchInput = page.getByPlaceholder(/Search keywords/i);
        await searchInput.fill('Security');
        await expect(page.getByText('Deployment & Setup')).not.toBeVisible();
        await expect(page.getByText('Security & Pricing')).toBeVisible();
    });
});
