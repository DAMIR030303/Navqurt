import AxeBuilder from '@axe-core/playwright';
import { test } from '@playwright/test';

test.describe('Accessibility Audit', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have no accessibility violations on login page', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have no accessibility violations on dashboard', async ({ page }) => {
    // Login first
    await page.click('button:has-text("Demo rejimida kirish")');
    await page.waitForSelector('text=Boshqaruv paneli', { timeout: 5000 });

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have no accessibility violations on employees page', async ({ page }) => {
    // Login and navigate
    await page.click('button:has-text("Demo rejimida kirish")');
    await page.waitForSelector('text=Boshqaruv paneli', { timeout: 5000 });
    await page.click('button:has-text("Xodimlar")');
    await page.waitForSelector('text=Xodimlar', { timeout: 3000 });

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have no accessibility violations on attendance page', async ({ page }) => {
    // Login and navigate
    await page.click('button:has-text("Demo rejimida kirish")');
    await page.waitForSelector('text=Boshqaruv paneli', { timeout: 5000 });
    await page.click('button:has-text("Davomat")');
    await page.waitForSelector('text=Davomat', { timeout: 3000 });

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have no accessibility violations on KPI page', async ({ page }) => {
    // Login and navigate
    await page.click('button:has-text("Demo rejimida kirish")');
    await page.waitForSelector('text=Boshqaruv paneli', { timeout: 5000 });
    await page.click('button:has-text("KPI Boshqaruvi")');
    await page.waitForSelector('text=KPI Boshqaruvi', { timeout: 3000 });

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

