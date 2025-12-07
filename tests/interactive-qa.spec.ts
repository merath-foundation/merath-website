import { test, expect } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1:4173';

test.describe('Merath interactive QA', () => {
  test('renders hero copy and CTAs', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('.foundation-room__label')).toContainText(/Foundation|المؤسسة/);
    await expect(page.locator('.foundation-room__actions .btn-primary')).toBeVisible();
    await expect(page.locator('.foundation-room__actions .btn-ghost')).toBeVisible();
  });

  test('ouroboros navigation toggles', async ({ page }) => {
    await page.goto(BASE_URL);
    const ouroborosButton = page.locator('.ouroboros-button');
    await expect(ouroborosButton).toBeVisible();

    await ouroborosButton.click();
    const sideNav = page.locator('.side-nav');
    await expect(sideNav).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(sideNav).toHaveCount(0);
  });

  test('living archive controls toggle state', async ({ page }) => {
    await page.goto(BASE_URL);
    const actionButton = page.locator('.logo-maze__action');
    await expect(actionButton).toBeVisible();

    const initialLabel = await actionButton.textContent();
    await actionButton.click();
    const toggledLabel = await actionButton.textContent();

    expect(initialLabel?.trim()).not.toEqual(toggledLabel?.trim());
  });

  test('project ledger lists featured entries', async ({ page }) => {
    await page.goto(BASE_URL);
    const ledgerRows = page.locator('.projects-room__card');
    await expect(ledgerRows.first()).toBeVisible();
    const rowCount = await ledgerRows.count();
    expect(rowCount).toBeGreaterThan(2);
  });

  test('RTL mode reflects in rooms and nav', async ({ page }) => {
    await page.goto(BASE_URL);
    const languageToggle = page.locator('[data-lang-toggle]');
    if (await languageToggle.count()) {
      await languageToggle.click();
    }
    await expect(page.locator('body[dir="rtl"]')).toBeVisible();

    const ouroborosButton = page.locator('.ouroboros-button');
    await ouroborosButton.click();
    const activeNavItem = page.locator('.side-nav__link[aria-current="page"]');
    await expect(activeNavItem).toBeVisible();
    await page.keyboard.press('Escape');
  });

  test('remembers language preference after reload', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.evaluate(() => window.localStorage.removeItem('merath-language'));
    await page.reload();
    await expect(page.locator('body[dir="ltr"]')).toBeVisible();

    const toggle = page.locator('[data-lang-toggle]');
    await toggle.click();
    await expect(page.locator('body[dir="rtl"]')).toBeVisible();

    await page.reload();
    await expect(page.locator('body[dir="rtl"]')).toBeVisible();
    await page.evaluate(() => window.localStorage.removeItem('merath-language'));
  });

  test('room selection syncs URL query', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('.ouroboros-button').click();
    await page.locator('.side-nav__link').nth(2).click();
    await page.waitForTimeout(400);
    await expect.poll(async () => page.evaluate(() => window.location.hash)).toContain('room=projectsLedger');
  });

  test('room query deep links to section', async ({ page }) => {
    await page.goto(`${BASE_URL}/#/?room=projectsLedger`);
    await page.waitForFunction(() => document.body.dataset.activeRoom === 'projectsLedger');
    const hash = await page.evaluate(() => window.location.hash);
    expect(hash).toContain('room=projectsLedger');
  });
});
