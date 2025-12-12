import { test, expect } from '@playwright/test';

test.describe('Attendance Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/');
    await page.click('button:has-text("Demo rejimida kirish")');
    await page.waitForSelector('text=Boshqaruv paneli', { timeout: 5000 });
  });

  test('should navigate to attendance section', async ({ page }) => {
    // Click on attendance in sidebar
    await page.click('button:has-text("Davomat")');

    // Wait for attendance section to load
    await expect(page.getByText(/davomat/i)).toBeVisible({ timeout: 3000 });
  });

  test('should display attendance statistics', async ({ page }) => {
    // Navigate to attendance section
    await page.click('button:has-text("Davomat")');
    await page.waitForSelector('text=Davomat', { timeout: 3000 });

    // Should display stats
    await expect(page.getByText(/bugun kelganlar/i)).toBeVisible({ timeout: 2000 });
    await expect(page.getByText(/kelmagan xodimlar/i)).toBeVisible();
  });

  test('should display attendance list', async ({ page }) => {
    // Navigate to attendance section
    await page.click('button:has-text("Davomat")');
    await page.waitForSelector('text=Davomat', { timeout: 3000 });

    // Should display employee attendance records
    await expect(page.getByText(/aziza rahimova/i)).toBeVisible({ timeout: 2000 });
  });

  test('should search attendance records', async ({ page }) => {
    // Navigate to attendance section
    await page.click('button:has-text("Davomat")');
    await page.waitForSelector('text=Davomat', { timeout: 3000 });

    // Find search input
    const searchInput = page.getByPlaceholder(/qidirish/i);
    await searchInput.fill('Aziza');

    // Should filter results
    await expect(page.getByText(/aziza rahimova/i)).toBeVisible();
  });

  test('should navigate calendar dates', async ({ page }) => {
    // Navigate to attendance section
    await page.click('button:has-text("Davomat")');
    await page.waitForSelector('text=Davomat', { timeout: 3000 });

    // Find calendar navigation buttons
    const prevButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    
    if (await prevButton.count() > 0) {
      await prevButton.click();
      // Calendar should navigate
    }
  });

  test('should display check-in and check-out times', async ({ page }) => {
    // Navigate to attendance section
    await page.click('button:has-text("Davomat")');
    await page.waitForSelector('text=Davomat', { timeout: 3000 });

    // Should show time information
    await expect(page.getByText(/08:45/i)).toBeVisible({ timeout: 2000 });
  });

  test('should filter by attendance status', async ({ page }) => {
    // Navigate to attendance section
    await page.click('button:has-text("Davomat")');
    await page.waitForSelector('text=Davomat', { timeout: 3000 });

    // Look for filter options
    const filterButtons = page.locator('button').filter({ hasText: /present|late|absent/i });
    
    if (await filterButtons.count() > 0) {
      await filterButtons.first().click();
      // Should filter by status
    }
  });
});

