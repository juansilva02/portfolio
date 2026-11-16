import { expect, test } from '@playwright/test';

test('ERP replaces the projects catalog and its demo links work', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/projects', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ventas, stock y caja');
  await expect(page.locator('.magic-bento__card')).toHaveCount(6);
  await expect(page.getByText('Avellaneda Oro', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Probalo Gratis', exact: true })).toHaveAttribute('href', 'https://demo.zuzudev.pro/');
  await expect(page.getByRole('link', { name: 'Crear mi demo', exact: true })).toHaveAttribute('href', 'https://demo.zuzudev.pro/');
  await page.waitForTimeout(1500);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  expect(errors).toEqual([]);
  await testInfo.attach('erp-page.png', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
});

test('ASCII background stops drawing after its static render', async ({ page }) => {
  await page.addInitScript(() => {
    window.asciiDraws = 0;
    const draw = WebGL2RenderingContext.prototype.drawArrays;
    WebGL2RenderingContext.prototype.drawArrays = function (...args) { window.asciiDraws++; return draw.apply(this, args); };
  });
  await page.goto('/projects', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  const before = await page.evaluate(() => window.asciiDraws);
  expect(before).toBeGreaterThan(0);
  await page.waitForTimeout(600);
  expect(await page.evaluate(() => window.asciiDraws)).toBe(before);
});
