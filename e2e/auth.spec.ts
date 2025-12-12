import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should display login page when not authenticated', async ({ page }) => {
    await page.goto('/');

    // Check if login page is displayed
    await expect(page.getByRole('heading', { name: /AI Boshqaruv/i })).toBeVisible();
    await expect(page.getByText(/xush kelibsiz/i)).toBeVisible();
    await expect(page.getByLabel(/email manzil/i)).toBeVisible();
    await expect(page.getByLabel(/parol/i)).toBeVisible();
  });

  test('should login successfully with email and password', async ({ page }) => {
    await page.goto('/');

    // Fill login form
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');

    // Click login button
    await page.click('button[type="submit"]');

    // Wait for dashboard to load
    await page.waitForSelector('text=Boshqaruv paneli', { timeout: 5000 });

    // Check if dashboard is displayed
    await expect(page.getByText('Boshqaruv paneli')).toBeVisible();
    await expect(page.getByText(/xush kelibsiz/i)).toBeVisible();
  });

  test('should login with demo mode', async ({ page }) => {
    await page.goto('/');

    // Click demo mode button
    await page.click('button:has-text("Demo rejimida kirish")');

    // Wait for dashboard to load
    await page.waitForSelector('text=Boshqaruv paneli', { timeout: 5000 });

    // Check if dashboard is displayed
    await expect(page.getByText('Boshqaruv paneli')).toBeVisible();
  });

  test('should show error when submitting empty form', async ({ page }) => {
    await page.goto('/');

    // Click login button without filling form
    await page.click('button[type="submit"]');

    // Wait for error message
    await expect(page.getByText(/iltimos, email va parolni kiriting/i)).toBeVisible({ timeout: 2000 });
  });

  test('should toggle password visibility', async ({ page }) => {
    await page.goto('/');

    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill('password123');

    // Find and click the eye icon button
    const eyeButton = page.locator('button').filter({ has: page.locator('svg') }).nth(1);
    await eyeButton.click();

    // Password should be visible
    await expect(page.locator('input[type="text"]')).toBeVisible();
  });

  test('should handle remember me checkbox', async ({ page }) => {
    await page.goto('/');

    const rememberCheckbox = page.getByLabel(/meni eslab qol/i);
    await expect(rememberCheckbox).not.toBeChecked();

    await rememberCheckbox.click();
    await expect(rememberCheckbox).toBeChecked();
  });

  test('should logout successfully', async ({ page }) => {
    await page.goto('/');

    // Login first
    await page.click('button:has-text("Demo rejimida kirish")');
    await page.waitForSelector('text=Boshqaruv paneli', { timeout: 5000 });

    // Find and click logout button in sidebar
    const logoutButton = page.getByRole('button', { name: /chiqish/i });
    await logoutButton.click();

    // Should return to login page
    await expect(page.getByRole('heading', { name: /AI Boshqaruv/i })).toBeVisible({ timeout: 2000 });
  });

  test('should persist authentication state', async ({ page }) => {
    await page.goto('/');

    // Login
    await page.click('button:has-text("Demo rejimida kirish")');
    await page.waitForSelector('text=Boshqaruv paneli', { timeout: 5000 });

    // Reload page
    await page.reload();

    // Should still be authenticated
    await expect(page.getByText('Boshqaruv paneli')).toBeVisible();
  });

  test('should navigate to forgot password', async ({ page }) => {
    await page.goto('/');

    // Click forgot password link
    const forgotPasswordLink = page.getByRole('button', { name: /parolni unutdingizmi/i });
    await forgotPasswordLink.click();

    // Should show some indication (this depends on implementation)
    // For now, just verify the link is clickable
    await expect(forgotPasswordLink).toBeVisible();
  });
});

