import { spawnSync } from 'node:child_process';

const result = spawnSync(process.execPath, [
  'node_modules/@playwright/test/cli.js', 'test', 'tests/performance.spec.js',
  ...process.argv.slice(2),
], {
  stdio: 'inherit',
  env: { ...process.env, PERF_ENFORCE: '1' },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
