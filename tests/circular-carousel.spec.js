import { expect, test } from '@playwright/test';

async function openCarousel(page) {
  await page.goto('/', { waitUntil: 'networkidle' });
  const section = page.getByRole('region', { name: 'Proyectos destacados', exact: true });
  await section.scrollIntoViewIfNeeded();
  const carousel = page.getByRole('region', { name: 'Proyectos del portfolio', exact: true });
  await expect(carousel).toHaveAttribute('data-ready', '');
  return { section, carousel };
}

test('project carousel loads on demand and renders all real screenshots', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('.circular-carousel')).toHaveCount(0);
  const { section, carousel } = await openCarousel(page);
  await expect(carousel.locator('[data-cc-index]')).toHaveCount(6);
  await expect.poll(() => carousel.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBeTruthy();
  await section.getByRole('button', { name: 'Pausar', exact: true }).click();
  await carousel.focus();
  await carousel.press('Home');
  await expect(carousel.locator('.circular-carousel__title')).toContainText('Avellaneda Oro');
  await page.waitForTimeout(1600);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  expect(errors).toEqual([]);
  await testInfo.attach('portfolio-carousel.png', { body: await section.screenshot(), contentType: 'image/png' });
});

test('keyboard and arrow controls keep the project details and links in sync', async ({ page }) => {
  const { section, carousel } = await openCarousel(page);
  await section.getByRole('button', { name: 'Pausar', exact: true }).click();
  await carousel.focus();
  await carousel.press('End');
  await expect(carousel.locator('.circular-carousel__title')).toContainText('MM Seguros');
  await expect(section.getByRole('link', { name: 'Ver demo: MM Seguros', exact: true })).toHaveAttribute('href', 'https://mmseguros.zuzudev.pro/');
  await expect(section.getByRole('link', { name: 'Repositorio: MM Seguros', exact: true })).toHaveAttribute('href', 'https://github.com/juansilva02/mmseguros');
  await section.getByRole('button', { name: 'Proyecto siguiente' }).click();
  await expect(carousel.locator('.circular-carousel__title')).toContainText('Avellaneda Oro');
  await section.getByRole('button', { name: 'Proyecto anterior' }).click();
  await expect(carousel.locator('.circular-carousel__title')).toContainText('MM Seguros');
  await expect(section.getByRole('button', { name: 'Reproducir', exact: true })).toBeVisible();
});

test('reduced motion keeps the ring idle and still allows navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const { section, carousel } = await openCarousel(page);
  await expect(section.getByRole('button', { name: 'Pausar', exact: true })).toHaveCount(0);
  await page.waitForTimeout(500);
  const ring = carousel.locator('.circular-carousel__ring');
  const initial = await ring.getAttribute('style');
  await page.waitForTimeout(500);
  expect(await ring.getAttribute('style')).toBe(initial);
  await section.getByRole('button', { name: 'Proyecto siguiente' }).click();
  await expect(carousel.locator('.circular-carousel__title')).toContainText('Los Eucaliptus');
});

test('carousel stops writing styles when outside the viewport', async ({ page }) => {
  const { carousel } = await openCarousel(page);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(500);
  const changes = await carousel.evaluate(element => new Promise(resolve => {
    let count = 0;
    const observer = new MutationObserver(records => { count += records.length; });
    observer.observe(element, { attributes: true, subtree: true, attributeFilter: ['style'] });
    setTimeout(() => { observer.disconnect(); resolve(count); }, 500);
  }));
  expect(changes).toBe(0);
});

test('dragging changes the project without opening a link', async ({ page }) => {
  const { section, carousel } = await openCarousel(page);
  await section.getByRole('button', { name: 'Pausar', exact: true }).click();
  await carousel.focus();
  await carousel.press('Home');
  await expect(carousel.locator('.circular-carousel__title')).toContainText('Avellaneda Oro');
  await page.waitForTimeout(1500);
  const ring = carousel.locator('.circular-carousel__ring');
  const initial = await ring.getAttribute('style');
  const box = await carousel.boundingBox();
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.5, { steps: 16 });
  await page.mouse.up();
  await expect.poll(() => ring.getAttribute('style')).not.toBe(initial);
  await expect(page).toHaveURL(/127\.0\.0\.1/);
  await expect(section.getByRole('button', { name: 'Reproducir', exact: true })).toBeVisible();
});
