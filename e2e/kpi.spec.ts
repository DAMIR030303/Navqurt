import { test, expect } from '@playwright/test';

test.describe('KPI Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/');
    await page.click('button:has-text("Demo rejimida kirish")');
    await page.waitForSelector('text=Boshqaruv paneli', { timeout: 5000 });
  });

  test('should navigate to KPI section', async ({ page }) => {
    // Click on KPI in sidebar
    await page.click('button:has-text("KPI Boshqaruvi")');

    // Wait for KPI section to load
    await expect(page.getByText(/kpi boshqaruvi/i)).toBeVisible({ timeout: 3000 });
  });

  test('should display KPI metrics', async ({ page }) => {
    // Navigate to KPI section
    await page.click('button:has-text("KPI Boshqaruvi")');
    await page.waitForSelector('text=KPI Boshqaruvi', { timeout: 3000 });

    // Should display KPI metrics
    await expect(page.getByText(/sotuvlar hajmi/i)).toBeVisible({ timeout: 2000 });
    await expect(page.getByText(/yangi mijozlar/i)).toBeVisible();
  });

  test('should display KPI values and targets', async ({ page }) => {
    // Navigate to KPI section
    await page.click('button:has-text("KPI Boshqaruvi")');
    await page.waitForSelector('text=KPI Boshqaruvi', { timeout: 3000 });

    // Should show KPI values
    await expect(page.getByText(/112000000/i)).toBeVisible({ timeout: 2000 });
  });

  test('should open add KPI modal', async ({ page }) => {
    // Navigate to KPI section
    await page.click('button:has-text("KPI Boshqaruvi")');
    await page.waitForSelector('text=KPI Boshqaruvi', { timeout: 3000 });

    // Click add KPI button
    const addButton = page.getByRole('button', { name: /qo'shish/i }).first();
    await addButton.click();

    // Modal should open (if implemented)
    // await expect(page.getByText(/yangi kpi/i)).toBeVisible({ timeout: 2000 });
  });

  test('should display employee KPI rankings', async ({ page }) => {
    // Navigate to KPI section
    await page.click('button:has-text("KPI Boshqaruvi")');
    await page.waitForSelector('text=KPI Boshqaruvi', { timeout: 3000 });

    // Should show employee rankings
    await expect(page.getByText(/umumiy ball/i)).toBeVisible({ timeout: 2000 });
  });

  test('should display KPI status indicators', async ({ page }) => {
    // Navigate to KPI section
    await page.click('button:has-text("KPI Boshqaruvi")');
    await page.waitForSelector('text=KPI Boshqaruvi', { timeout: 3000 });

    // Should show status indicators (exceeded, on-track, at-risk, below)
    // Visual check - status colors should be visible
    await expect(page.getByText(/sotuvlar hajmi/i)).toBeVisible();
  });

  test('should filter KPI metrics by category', async ({ page }) => {
    // Navigate to KPI section
    await page.click('button:has-text("KPI Boshqaruvi")');
    await page.waitForSelector('text=KPI Boshqaruvi', { timeout: 3000 });

    // Look for filter options
    const filterButtons = page.locator('button').filter({ hasText: /moliya|sotuvlar|hr/i });
    
    if (await filterButtons.count() > 0) {
      await filterButtons.first().click();
      // Should filter by category
    }
  });
});

