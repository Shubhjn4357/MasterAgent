/**
 * Engine locator and downloader for Master Agent.
 */

import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OS = { darwin: 'darwin', linux: 'linux', win32: 'windows' }[process.platform] || process.platform;
const ARCH = { arm64: 'arm64', x64: 'x64' }[process.arch] || process.arch;
const TARGET = `${OS}-${ARCH}`;
const EXE = OS === 'windows' ? 'master-agent.exe' : 'master-agent';
const FALLBACK_EXE = OS === 'windows' ? 'impeccable.exe' : 'impeccable';
export const VERSION = '0.1.18';

export const CACHE_ROOT = process.env.MASTER_AGENT_HOME || process.env.IMPECCABLE_HOME || path.join(os.homedir(), '.master-agent');
export const CACHED = path.join(CACHE_ROOT, 'bin', VERSION, EXE);
const FALLBACK_CACHED = path.join(os.homedir(), '.impeccable', 'bin', VERSION, FALLBACK_EXE);

const BASE = (process.env.MASTER_AGENT_DOWNLOAD_BASE || 'https://github.com/pbakaus/impeccable/releases/download').replace(/\/$/, '');
const ASSET = `impeccable-${TARGET}${OS === 'windows' ? '.exe' : ''}`;
const URL = `${BASE}/engine-v${VERSION}/${ASSET}`;

function getManifestPath() {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const pkgManifest = path.resolve(currentDir, '..', '..', 'skills', 'master-agent', 'scripts', 'engine-checksums.txt');
  if (fs.existsSync(pkgManifest)) return pkgManifest;
  return path.resolve(currentDir, 'engine-checksums.txt');
}

function exists(p) {
  try { return !!p && fs.statSync(p).isFile(); } catch { return false; }
}

function expectedDigest() {
  const manifest = getManifestPath();
  try {
    for (const line of fs.readFileSync(manifest, 'utf8').split(/\r?\n/)) {
      const [ver, asset, sum] = line.trim().split(/\s+/);
      if (ver === VERSION && asset === ASSET) return (sum || '').toLowerCase();
    }
  } catch { /* no manifest */ }
  return '';
}

/**
 * Downloads the precompiled platform engine binary if not present.
 */
export async function downloadEngine() {
  const expected = expectedDigest();
  if (!expected) {
    throw new Error(`Checksum for engine ${VERSION} (${ASSET}) not found.`);
  }

  process.stdout.write(`Downloading Master Agent engine (${VERSION})...\n`);
  const res = await fetch(URL, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`Failed to download engine from ${URL}: ${res.statusText}`);
  }

  const buf = Buffer.from(await res.arrayBuffer());
  const actual = createHash('sha256').update(buf).digest('hex');
  if (actual !== expected) {
    throw new Error(`Checksum mismatch downloading ${URL}`);
  }

  fs.mkdirSync(path.dirname(CACHED), { recursive: true });
  fs.writeFileSync(CACHED, buf, { mode: 0o755 });
  fs.writeFileSync(`${CACHED}.verified`, `${expected} ${buf.length}\n`);
  return CACHED;
}

/**
 * Locates the engine binary or downloads it.
 */
export async function locateOrFetchEngine() {
  const envBin = process.env.MASTER_AGENT_BIN || process.env.IMPECCABLE_BIN;
  if (exists(envBin)) return envBin;
  if (exists(CACHED)) return CACHED;
  if (exists(FALLBACK_CACHED)) return FALLBACK_CACHED;

  return await downloadEngine();
}
