/**
 * Installer logic for Master Agent (Global & Project scopes).
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { locateOrFetchEngine } from './engine.js';

function copyDirRecursive(src, dst) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

/**
 * Handles the 'install' CLI command.
 * @param {string[]} args - Command arguments.
 */
export async function runInstall(args) {
  const isGlobal = args.includes('--global') || args.includes('-g') || args.includes('--user') || args.includes('--scope=global');
  const pkgRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

  const srcSkills = path.join(pkgRoot, 'skills');
  const srcAgents = path.join(pkgRoot, 'agents');
  const srcHooks = path.join(pkgRoot, 'hooks');

  console.log(`\n📦 Master Agent Installer (Scope: ${isGlobal ? 'Global' : 'Project'})`);

  if (isGlobal) {
    const home = os.homedir();
    // 1. Antigravity Global
    const geminiSkills = path.join(home, '.gemini', 'config', 'skills');
    const geminiAgents = path.join(home, '.gemini', 'config', 'agents');
    copyDirRecursive(path.join(srcSkills, 'master-agent'), path.join(geminiSkills, 'master-agent'));
    copyDirRecursive(path.join(srcSkills, 'website-engineering'), path.join(geminiSkills, 'website-engineering'));
    copyDirRecursive(path.join(srcSkills, 'app-engineering'), path.join(geminiSkills, 'app-engineering'));
    copyDirRecursive(srcAgents, geminiAgents);
    console.log('  ✓ Antigravity global skills and agents installed (~/.gemini/config/)');

    // 2. Agents / Codex Global
    const agentsDir = path.join(home, '.agents', 'skills', 'master-agent');
    copyDirRecursive(path.join(srcSkills, 'master-agent'), agentsDir);
    console.log('  ✓ Standard Agents skills installed (~/.agents/skills/)');

    // 3. Claude Code Global
    const claudeDir = path.join(home, '.claude', 'skills', 'master-agent');
    copyDirRecursive(path.join(srcSkills, 'master-agent'), claudeDir);
    console.log('  ✓ Claude Code global skills installed (~/.claude/skills/)');

    // 4. Cursor Global
    const cursorDir = path.join(home, '.cursor', 'skills', 'master-agent');
    copyDirRecursive(path.join(srcSkills, 'master-agent'), cursorDir);
    console.log('  ✓ Cursor global skills installed (~/.cursor/skills/)');
  } else {
    const cwd = process.cwd();
    // 1. Project-level .agents
    copyDirRecursive(path.join(srcSkills, 'master-agent'), path.join(cwd, '.agents', 'skills', 'master-agent'));
    // 2. Project-level .gemini
    copyDirRecursive(path.join(srcSkills, 'master-agent'), path.join(cwd, '.gemini', 'skills', 'master-agent'));
    // 3. Project-level .claude-plugin
    copyDirRecursive(path.join(pkgRoot, 'plugin', '.claude-plugin'), path.join(cwd, '.claude-plugin'));
    // 4. Project-level hooks
    copyDirRecursive(srcHooks, path.join(cwd, 'hooks'));
    console.log(`  ✓ Project harnesses & skills installed in ${cwd}`);
  }

  // Pre-fetch or verify engine binary
  try {
    const binPath = await locateOrFetchEngine();
    console.log(`  ✓ Anti-pattern engine verified (${binPath})`);
  } catch (err) {
    console.warn(`  ⚠️ Engine check skipped: ${err.message}`);
  }

  console.log('\n✨ Master Agent installation complete! Ready to use.\n');
}

