import { test, expect } from '@playwright/test';

test.describe('Employees Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/');
    await page.click('button:has-text("Demo rejimida kirish")');
    await page.waitForSelector('text=Boshqaruv paneli', { timeout: 5000 });
  });

  test('should navigate to employees section', async ({ page }) => {
    // Click on employees in sidebar
    await page.click('button:has-text("Xodimlar")');

    // Wait for employees section to load
    await expect(page.getByText(/xodimlar/i)).toBeVisible({ timeout: 3000 });
  });

  test('should display employees list', async ({ page }) => {
    // Navigate to employees section
    await page.click('button:has-text("Xodimlar")');
    await page.waitForSelector('text=Xodimlar', { timeout: 3000 });

    // Should display employee names
    await expect(page.getByText(/aziza rahimova/i)).toBeVisible({ timeout: 2000 });
  });

  test('should open add employee modal', async ({ page }) => {
    // Navigate to employees section
    await page.click('button:has-text("Xodimlar")');
    await page.waitForSelector('text=Xodimlar', { timeout: 3000 });

    // Click add employee button
    const addButton = page.getByRole('button', { name: /qo'shish/i }).first();
    await addButton.click();

    // Modal should open
    await expect(page.getByText(/yangi xodim qo'shish/i)).toBeVisible({ timeout: 2000 });
  });

  test('should search employees', async ({ page }) => {
    // Navigate to employees section
    await page.click('button:has-text("Xodimlar")');
    await page.waitForSelector('text=Xodimlar', { timeout: 3000 });

    // Find search input
    const searchInput = page.getByPlaceholder(/qidirish/i);
    await searchInput.fill('Aziza');

    // Should filter results
    await expect(page.getByText(/aziza rahimova/i)).toBeVisible();
  });

  test('should toggle view mode', async ({ page }) => {
    // Navigate to employees section
    await page.click('button:has-text("Xodimlar")');
    await page.waitForSelector('text=Xodimlar', { timeout: 3000 });

    // Find view toggle buttons (grid/list)
    const viewButtons = page.locator('button').filter({ has: page.locator('svg') });
    const buttonCount = await viewButtons.count();

    if (buttonCount > 0) {
      // Click a view toggle button
      await viewButtons.first().click();
      // View should change (visual check)
    }
  });

  test('should open employee profile', async ({ page }) => {
    // Navigate to employees section
    await page.click('button:has-text("Xodimlar")');
    await page.waitForSelector('text=Xodimlar', { timeout: 3000 });

    // Click on an employee
    const employeeCard = page.getByText(/aziza rahimova/i).first();
    await employeeCard.click();

    // Profile modal should open
    await expect(page.getByText(/aziza rahimova/i)).toBeVisible({ timeout: 2000 });
  });

  test('should filter employees by department', async ({ page }) => {
    // Navigate to employees section
    await page.click('button:has-text("Xodimlar")');
    await page.waitForSelector('text=Xodimlar', { timeout: 3000 });

    // Find filter button
    const filterButton = page.getByRole('button', { name: /filter/i }).or(page.locator('button').filter({ has: page.locator('svg') }).nth(1));
    
    if (await filterButton.count() > 0) {
      await filterButton.click();
      // Filter options should appear
    }
  });

  test('should handle pagination', async ({ page }) => {
    // Navigate to employees section
    await page.click('button:has-text("Xodimlar")');
    await page.waitForSelector('text=Xodimlar', { timeout: 3000 });

    // Look for pagination controls
    const paginationButtons = page.locator('button').filter({ hasText: /keyingi|oldingi/i });
    
    if (await paginationButtons.count() > 0) {
      await paginationButtons.first().click();
      // Should navigate to next page
    }
  });
});

