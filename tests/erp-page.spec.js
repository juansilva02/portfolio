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

test('ASCII background animates only while visible', async ({ page }) => {
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
  expect(await page.evaluate(() => window.asciiDraws)).toBeGreaterThan(before);
  await page.locator('.erp-closing').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const stopped = await page.evaluate(() => window.asciiDraws);
  await page.waitForTimeout(600);
  expect(await page.evaluate(() => window.asciiDraws)).toBe(stopped);
});


test('ERP cards appear as they are discovered and remain visible', async ({ page }) => {
  await page.goto('/projects', { waitUntil: 'networkidle' });
  const cells = page.locator('.magic-bento__cell');
  await expect(cells.last()).not.toHaveAttribute('data-state', 'in');
  for (const cell of await cells.all()) {
    await cell.scrollIntoViewIfNeeded();
    await expect(cell).toHaveAttribute('data-state', 'in');
    await expect(cell).toHaveCSS('opacity', '1');
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  for (const cell of await cells.all()) await expect(cell).toHaveAttribute('data-state', 'in');
});

test('ERP and quote headings respect reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of ['/projects', '/cotizar']) {
    await page.goto(path, { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toHaveCSS('opacity', '1');
    await expect(page.locator('h1')).toHaveCSS('filter', 'blur(0px)');
  }
});
