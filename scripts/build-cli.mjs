/**
 * Node CLI shim generator for Master Agent.
 */

/**
 * Returns the Node CLI shim (cli/bin/cli.js) content.
 * @returns {string} JavaScript CLI shim content.
 */
export function getCliShimContent() {
  return `#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OS = { darwin: 'darwin', linux: 'linux', win32: 'windows' }[process.platform] || process.platform;
const ARCH = { arm64: 'arm64', x64: 'x64' }[process.arch] || process.arch;
const TARGET = \`\${OS}-\${ARCH}\`;
const EXE = OS === 'windows' ? 'master-agent.exe' : 'master-agent';
const FALLBACK_EXE = OS === 'windows' ? 'impeccable.exe' : 'impeccable';
const VERSION = '0.1.18';

const CACHE_ROOT = process.env.MASTER_AGENT_HOME || process.env.IMPECCABLE_HOME || path.join(os.homedir(), '.master-agent');
const CACHED = path.join(CACHE_ROOT, 'bin', VERSION, EXE);
const FALLBACK_CACHED = path.join(os.homedir(), '.impeccable', 'bin', VERSION, FALLBACK_EXE);

const BASE = (process.env.MASTER_AGENT_DOWNLOAD_BASE || 'https://github.com/pbakaus/impeccable/releases/download').replace(/\\/$/, '');
const ASSET = \`impeccable-\${TARGET}\${OS === 'windows' ? '.exe' : ''}\`;
const URL = \`\${BASE}/engine-v\${VERSION}/\${ASSET}\`;
const MANIFEST = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'skills', 'master-agent', 'scripts', 'engine-checksums.txt');
const STAMP = \`\${CACHED}.verified\`;

function exists(p) { try { return !!p && fs.statSync(p).isFile(); } catch { return false; } }

function locate() {
  const envBin = process.env.MASTER_AGENT_BIN || process.env.IMPECCABLE_BIN;
  if (exists(envBin)) return envBin;
  if (exists(CACHED)) return CACHED;
  if (exists(FALLBACK_CACHED)) return FALLBACK_CACHED;
  return null;
}

const bin = locate();
if (!bin) {
  process.stderr.write(\`master-agent: binary not found in \${CACHED} or \${FALLBACK_CACHED}.\\n\`);
  process.exit(127);
}

const res = spawnSync(bin, process.argv.slice(2), { stdio: 'inherit' });
process.exit(res.status ?? 0);
`;
}

