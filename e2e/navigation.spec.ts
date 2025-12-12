import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/');
    await page.click('button:has-text("Demo rejimida kirish")');
    await page.waitForSelector('text=Boshqaruv paneli', { timeout: 5000 });
  });

  test('should navigate between pages using sidebar', async ({ page }) => {
    // Navigate to employees
    await page.click('button:has-text("Xodimlar")');
    await expect(page.getByText(/xodimlar/i)).toBeVisible({ timeout: 3000 });

    // Navigate to tasks
    await page.click('button:has-text("Vazifalar")');
    await expect(page.getByText(/vazifalar/i)).toBeVisible({ timeout: 3000 });

    // Navigate to attendance
    await page.click('button:has-text("Davomat")');
    await expect(page.getByText(/davomat/i)).toBeVisible({ timeout: 3000 });

    // Navigate back to dashboard
    await page.click('button:has-text("Boshqaruv paneli")');
    await expect(page.getByText('Boshqaruv paneli')).toBeVisible({ timeout: 3000 });
  });

  test('should highlight active page in sidebar', async ({ page }) => {
    // Click on employees
    await page.click('button:has-text("Xodimlar")');
    await page.waitForSelector('text=Xodimlar', { timeout: 3000 });

    // Active page should be highlighted
    const employeesButton = page.getByRole('button', { name: /xodimlar/i });
    await expect(employeesButton).toHaveClass(/bg-gradient/);
  });

  test('should toggle sidebar on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Click menu button
    await page.click('button:has-text("Menyuni ochish")');

    // Sidebar should open
    await expect(page.getByText('AI Boshqaruv')).toBeVisible({ timeout: 2000 });

    // Click close button
    const closeButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    await closeButton.click();

    // Sidebar should close
    await expect(page.getByText('AI Boshqaruv')).not.toBeVisible({ timeout: 2000 });
  });

  test('should navigate to all main sections', async ({ page }) => {
    const sections = [
      { name: 'Boshqaruv paneli', text: 'Boshqaruv paneli' },
      { name: 'Xodimlar', text: 'Xodimlar' },
      { name: 'Smenalar', text: 'Smenalar' },
      { name: 'Vazifalar', text: 'Vazifalar' },
      { name: 'Davomat', text: 'Davomat' },
    ];

    for (const section of sections) {
      await page.click(`button:has-text("${section.name}")`);
      await expect(page.getByText(new RegExp(section.text, 'i'))).toBeVisible({ timeout: 3000 });
    }
  });

  test('should display breadcrumbs or page title', async ({ page }) => {
    // Navigate to a section
    await page.click('button:has-text("Xodimlar")');
    await page.waitForSelector('text=Xodimlar', { timeout: 3000 });

    // Should show page title
    await expect(page.getByText(/xodimlar/i)).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Focus on sidebar
    await page.keyboard.press('Tab');

    // Navigate with arrow keys (if implemented)
    // This is a basic test - actual implementation may vary
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // Should navigate to next item
  });
});

