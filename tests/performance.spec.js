import { expect, test } from '@playwright/test';

const criticalRoutes = ['/', '/projects', '/about', '/experience', '/contact'];
const enforceBudgets = process.env.PERF_ENFORCE === '1';

const budgets = {
  standard: { averageFps: 55, p95FrameMs: 22 },
  'low-end': { averageFps: 45, p95FrameMs: 28 },
};

const percentile = (values, fraction) => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * fraction) - 1)];
};

async function enableCpuThrottling(page, rate) {
  if (!rate) return null;
  const session = await page.context().newCDPSession(page);
  await session.send('Emulation.setCPUThrottlingRate', { rate });
  return session;
}

async function measureControlledScroll(page) {
  return page.evaluate(async () => {
    window.scrollTo(0, 0);
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const frameDurations = [];
    let previousFrame;
    let animationFrame;
    const sampleFrame = (now) => {
      if (previousFrame !== undefined) frameDurations.push(now - previousFrame);
      previousFrame = now;
      animationFrame = requestAnimationFrame(sampleFrame);
    };

    animationFrame = requestAnimationFrame(sampleFrame);
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const duration = 4_000;
    const startedAt = performance.now();

    await new Promise((resolve) => {
      const step = (now) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        window.scrollTo(0, maxScroll * eased);
        if (progress < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });

    await new Promise((resolve) => setTimeout(resolve, 250));
    cancelAnimationFrame(animationFrame);

    return {
      frameDurations,
      activeAnimations: document.getAnimations().filter(
        (animation) => animation.playState === 'running',
      ).length,
      scrollHeight: document.documentElement.scrollHeight,
    };
  });
}

function summarize(route, raw) {
  const totalDuration = raw.frameDurations.reduce((sum, value) => sum + value, 0);
  return {
    route,
    averageFps: totalDuration ? (raw.frameDurations.length * 1000) / totalDuration : 0,
    p50FrameMs: percentile(raw.frameDurations, 0.5),
    p95FrameMs: percentile(raw.frameDurations, 0.95),
    p99FrameMs: percentile(raw.frameDurations, 0.99),
    framesOver33Ms: raw.frameDurations.filter((value) => value > 33).length,
    framesOver50Ms: raw.frameDurations.filter((value) => value > 50).length,
    maxFrameMs: Math.max(0, ...raw.frameDurations),
    sampledFrames: raw.frameDurations.length,
    activeAnimations: raw.activeAnimations,
    scrollHeight: raw.scrollHeight,
  };
}

test.describe('@performance controlled scroll', () => {
  for (const route of criticalRoutes) {
    test(`${route} records frame and animation metrics`, async ({ page }, testInfo) => {
      const rate = testInfo.project.metadata.cpuThrottlingRate;
      const cdpSession = await enableCpuThrottling(page, rate);

      await page.goto(route, { waitUntil: 'networkidle' });
      const metrics = summarize(route, await measureControlledScroll(page));
      console.log(`[perf:${testInfo.project.name}] ${JSON.stringify(metrics)}`);
      await testInfo.attach(`metrics-${route === '/' ? 'home' : route.slice(1)}.json`, {
        body: Buffer.from(JSON.stringify(metrics, null, 2)),
        contentType: 'application/json',
      });

      expect(metrics.sampledFrames).toBeGreaterThan(5);
      expect(metrics.scrollHeight).toBeGreaterThan(0);

      if (enforceBudgets) {
        const tier = testInfo.project.metadata.performanceTier ?? 'standard';
        const budget = budgets[tier];
        expect(metrics.averageFps, JSON.stringify(metrics)).toBeGreaterThanOrEqual(budget.averageFps);
        expect(metrics.p95FrameMs, JSON.stringify(metrics)).toBeLessThanOrEqual(budget.p95FrameMs);
        expect(metrics.maxFrameMs, JSON.stringify(metrics)).toBeLessThanOrEqual(100);
      }

      if (cdpSession) {
        await cdpSession.send('Emulation.setCPUThrottlingRate', { rate: 1 });
        await cdpSession.detach();
      }
    });
  }
});

test('@performance repeated navigation does not accumulate animations', async ({ page }, testInfo) => {
  const counts = [];
  await page.goto('/', { waitUntil: 'networkidle' });

  for (let cycle = 0; cycle < 3; cycle += 1) {
    for (const route of criticalRoutes) {
      await page.goto(route, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      counts.push({
        cycle,
        route,
        running: await page.evaluate(
          () => document.getAnimations().filter((animation) => animation.playState === 'running').length,
        ),
      });
    }
  }

  await testInfo.attach('animation-stability.json', {
    body: Buffer.from(JSON.stringify(counts, null, 2)),
    contentType: 'application/json',
  });

  for (const route of criticalRoutes) {
    const routeCounts = counts.filter((sample) => sample.route === route).map((sample) => sample.running);
    const growth = routeCounts.at(-1) - routeCounts[0];
    expect(routeCounts).toHaveLength(3);
    if (enforceBudgets) {
      expect(growth, `${route}: ${routeCounts.join(' -> ')}`).toBeLessThanOrEqual(1);
    }
  }
});
