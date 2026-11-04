#!/usr/bin/env node

/**
 * Master Agent Universal CLI entry point.
 */

import { spawnSync } from 'node:child_process';
import { locateOrFetchEngine } from './engine.js';
import { runInstall } from './installer.js';

async function main() {
  const args = process.argv.slice(2);

  if (args[0] === 'install') {
    await runInstall(args);
    return;
  }

  const bin = await locateOrFetchEngine();
  if (!bin) {
    process.stderr.write('master-agent: engine binary could not be found or downloaded.\n');
    process.exit(127);
  }

  const res = spawnSync(bin, args, { stdio: 'inherit' });
  process.exit(res.status ?? 0);
}

main().catch((err) => {
  process.stderr.write(`master-agent: ${err.message}\n`);
  process.exit(1);
});
