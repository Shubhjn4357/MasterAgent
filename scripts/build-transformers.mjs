/**
 * Text transformation helpers for porting Impeccable to Master Agent.
 */

import fs from 'node:fs';
import path from 'node:path';

/**
 * Ensures that the target directory exists.
 * @param {string} dirPath - Absolute or relative directory path.
 */
export function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Transforms file contents, replacing all occurrences of impeccable identifiers
 * with Master Agent equivalents while keeping compatibility where needed.
 * @param {string} text - Source content.
 * @returns {string} Transformed content.
 */
export function transformContent(text) {
  let res = text;

  // Specific agent names in YAML and references
  res = res.replaceAll('impeccable-asset-producer', 'master-agent-asset-producer');
  res = res.replaceAll('impeccable_asset_producer', 'master_agent_asset_producer');
  res = res.replaceAll('impeccable-documenter', 'master-agent-documenter');
  res = res.replaceAll('impeccable_documenter', 'master_agent_documenter');
  res = res.replaceAll('impeccable-finish-reviewer', 'master-agent-finish-reviewer');
  res = res.replaceAll('impeccable_finish_reviewer', 'master_agent_finish_reviewer');
  res = res.replaceAll('impeccable-manual-edit-applier', 'master-agent-manual-edit-applier');
  res = res.replaceAll('impeccable_manual_edit_applier', 'master_agent_manual_edit_applier');

  // Skill frontmatter and commands
  res = res.replaceAll('name: impeccable', 'name: master-agent');
  res = res.replaceAll('/impeccable', '/master-agent');

  // Script and path references
  res = res.replaceAll('skills/impeccable', 'skills/master-agent');
  res = res.replaceAll('scripts/impeccable.cmd', 'scripts/master-agent.cmd');
  res = res.replaceAll('scripts/impeccable', 'scripts/master-agent');
  res = res.replaceAll('"impeccable" hook', '"master-agent" hook');
  res = res.replaceAll('impeccable.cmd hook', 'master-agent.cmd hook');

  // Environment variables and directories
  res = res.replaceAll('IMPECCABLE_HOOK_HARNESS', 'MASTER_AGENT_HOOK_HARNESS');
  res = res.replaceAll('.impeccable', '.master-agent');

  // Brand / Title references
  res = res.replaceAll('Impeccable Asset Producer', 'Master Agent Asset Producer');
  res = res.replaceAll('Impeccable Documenter', 'Master Agent Documenter');
  res = res.replaceAll('Impeccable Finish Reviewer', 'Master Agent Finish Reviewer');
  res = res.replaceAll('Impeccable Manual Edit Applier', 'Master Agent Manual Edit Applier');
  res = res.replaceAll('Impeccable build', 'Master Agent build');
  res = res.replaceAll('Impeccable craft', 'Master Agent craft');
  res = res.replaceAll('Impeccable design', 'Master Agent design');
  res = res.replaceAll('Impeccable live mode', 'Master Agent live mode');
  res = res.replaceAll('Impeccable skill', 'Master Agent skill');
  res = res.replaceAll('Impeccable', 'Master Agent');

  return res;
}

/**
 * Copies and transforms a directory recursively.
 * @param {string} src - Source folder path.
 * @param {string} dst - Destination folder path.
 */
export function copyAndTransformRecursive(src, dst) {
  ensureDir(dst);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    let dstName = entry.name;

    if (dstName.startsWith('impeccable-')) {
      dstName = dstName.replace('impeccable-', 'master-agent-');
    }

    const dstPath = path.join(dst, dstName);

    if (entry.isDirectory()) {
      copyAndTransformRecursive(srcPath, dstPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.md', '.json', '.js', '.yaml', '.yml'].includes(ext) || entry.name === 'VERSION') {
        const content = fs.readFileSync(srcPath, 'utf8');
        const transformed = transformContent(content);
        fs.writeFileSync(dstPath, transformed, 'utf8');
      } else {
        fs.copyFileSync(srcPath, dstPath);
      }
    }
  }
}
