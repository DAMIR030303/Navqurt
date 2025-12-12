import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/');

    // Check if login page is displayed
    await expect(page.getByRole('heading', { name: /AI Boshqaruv/i })).toBeVisible();
  });

  test('should login successfully', async ({ page }) => {
    await page.goto('/');

    // Fill login form
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');

    // Click login button
    await page.click('button[type="submit"]');

    // Wait for dashboard to load
    await page.waitForURL('/', { timeout: 5000 });

    // Check if dashboard is displayed
    await expect(page.getByText('Boshqaruv paneli')).toBeVisible();
  });
});
