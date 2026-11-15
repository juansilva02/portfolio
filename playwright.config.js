import { defineConfig, devices } from '@playwright/test';

const desktopViewport = { width: 1440, height: 900 };
const mobileViewport = { width: 390, height: 844 };
const port = Number(process.env.PLAYWRIGHT_PORT || 4173);

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['line'],
    ['html', { open: 'never' }],
  ],
  outputDir: 'test-results',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  webServer: process.env.PLAYWRIGHT_OFFLINE === '1' ? undefined : {
    command: `node ../../node_modules/vite/bin/vite.js build && node ../../node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port ${port} --strictPort`,
    cwd: './apps/web',
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'], viewport: desktopViewport },
      metadata: { formFactor: 'desktop' },
    },
    {
      name: 'chromium-mobile',
      use: { ...devices['Pixel 7'], viewport: mobileViewport },
      metadata: { formFactor: 'mobile' },
    },
    {
      name: 'chromium-low-end',
      grep: /@performance/,
      use: { ...devices['Desktop Chrome'], viewport: desktopViewport },
      metadata: { cpuThrottlingRate: 4, performanceTier: 'low-end', formFactor: 'desktop' },
    },
    {
      name: 'firefox-desktop',
      use: { ...devices['Desktop Firefox'], viewport: desktopViewport },
      metadata: { formFactor: 'desktop' },
    },
    {
      name: 'firefox-mobile',
      use: {
        browserName: 'firefox',
        viewport: mobileViewport,
        hasTouch: true,
      },
      metadata: { formFactor: 'mobile' },
    },
    {
      name: 'webkit-desktop',
      use: { ...devices['Desktop Safari'], viewport: desktopViewport },
      metadata: { formFactor: 'desktop' },
    },
    {
      name: 'webkit-mobile',
      use: { ...devices['iPhone 13'], viewport: mobileViewport },
      metadata: { formFactor: 'mobile' },
    },
  ],
});
