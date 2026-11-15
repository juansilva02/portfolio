import { expect, test } from './fixtures.js';

const routes = [
  '/',
  '/about',
  '/skills',
  '/experience',
  '/projects',
  '/demo',
  '/cotizar',
  '/articles',
  '/education',
  '/certifications',
  '/contact',
  '/ruta-inexistente',
];

for (const route of routes) {
  test(`${route} renders without layout overflow`, async ({ page }, testInfo) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));

    const response = await page.goto(route, { waitUntil: 'networkidle' });
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('body')).toBeVisible();
    await page.waitForTimeout(1_500);

    const layout = await page.evaluate(() => ({
      title: document.title,
      bodyText: document.body.innerText.trim(),
      horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
      overflowingElements: [...document.querySelectorAll('body *')]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            tag: element.tagName.toLowerCase(),
            className: typeof element.className === 'string' ? element.className : '',
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
          };
        })
        .filter(({ left, right }) => left < -1 || right > window.innerWidth + 1)
        .slice(0, 10),
    }));

    expect(layout.title).not.toBe('');
    expect(layout.bodyText.length).toBeGreaterThan(20);
    expect(
      layout.horizontalOverflow,
      JSON.stringify(layout.overflowingElements, null, 2),
    ).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);

    await testInfo.attach(`smoke-${route === '/' ? 'home' : route.slice(1)}.png`, {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
}

test('desktop navigation reaches every primary route', async ({ page }, testInfo) => {
  test.skip(testInfo.project.metadata.formFactor === 'mobile', 'The mobile menu has its own interaction model.');
  await page.goto('/');

  const primaryRoutes = ['/projects', '/cotizar', '/articles', '/about', '/contact'];
  for (const route of primaryRoutes) {
    await page.locator(`header a[href="${route}"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`${route}$`));
  }
});

test('mobile menu opens and navigates', async ({ page }, testInfo) => {
  test.skip(testInfo.project.metadata.formFactor !== 'mobile', 'Only applies to mobile projects.');
  await page.goto('/');
  await page.locator('header button').first().click();
  await page.locator('header a[href="/projects"]').last().click();
  await expect(page).toHaveURL(/\/projects$/);
});
