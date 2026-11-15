import { test as base, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

// Optional rendering-only validation for environments that cannot use localhost.
// Normal runs still exercise Vite over HTTP. Build before using offline mode.
export const test = base.extend({
  offlineAssets: [async ({ page }, use) => {
    if (process.env.PLAYWRIGHT_OFFLINE === '1') {
      const root = path.resolve('apps/web/dist');
      await page.route('**/*', async (route) => {
        const url = new URL(route.request().url());
        if (url.hostname !== '127.0.0.1') {
          return route.fulfill({ status: 200, body: '' });
        }
        const pathname = decodeURIComponent(url.pathname);
        const asset = pathname.startsWith('/assets/') || /\.[a-z0-9]+$/i.test(pathname);
        const file = path.resolve(root, asset ? `.${pathname}` : 'index.html');
        if (!file.startsWith(root + path.sep)) return route.fulfill({ status: 403 });
        try {
          const contentType = {
            '.js': 'application/javascript', '.css': 'text/css',
            '.webp': 'image/webp', '.png': 'image/png', '.ico': 'image/x-icon',
          }[path.extname(file)] || 'text/html';
          await route.fulfill({ status: 200, contentType, body: await readFile(file) });
        } catch {
          await route.fulfill({ status: 404 });
        }
      });
    }
    await use();
  }, { auto: true }],
});

export { expect };
