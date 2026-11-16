import { expect, test } from '@playwright/test';

test('home content is visible while the decorative terminal types', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h1')).toContainText('Software serio');
  const opacity = await page.locator('h1').evaluate(element => {
    let opacity = 1;
    for (let node = element; node; node = node.parentElement) opacity *= Number(getComputedStyle(node).opacity);
    return opacity;
  });
  expect(opacity).toBe(1);
});

test('home has no perpetual decoration and its assembly stays visible', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const perpetual = await page.evaluate(() => document.getAnimations().filter(animation =>
    animation.playState === 'running' && animation.effect.getTiming().iterations === Infinity,
  ).length);
  expect(perpetual).toBe(0);
  const bricks = page.locator('.assembly-brick');
  await expect(bricks).toHaveCount(7);
  for (const brick of await bricks.all()) await expect(brick).toHaveCSS('opacity', '1');
});
