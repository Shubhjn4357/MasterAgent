/**
 * Master Agent build and sync orchestrator.
 * Transforms and stages complete skills, worker agents, hooks, and CLI tools.
 */

import fs from 'node:fs';
import path from 'node:path';
import { ensureDir, copyAndTransformRecursive, transformContent } from './build-transformers.mjs';
import { getWindowsLauncherContent, getPosixLauncherContent } from './build-launchers.mjs';
import { getCliShimContent } from './build-cli.mjs';

const SRC_DIR = 'd:/Code/cinetrack/impeccable';
const DST_DIR = 'd:/Code/cinetrack/MasterAgent';

/**
 * Builds plugin manifests and hooks.
 */
function buildPluginManifests() {
  const pluginClaudeDir = path.join(DST_DIR, 'plugin', '.claude-plugin');
  const pluginGrokDir = path.join(DST_DIR, 'plugin', '.grok-plugin');
  const rootClaudeDir = path.join(DST_DIR, '.claude-plugin');
  const hooksDir = path.join(DST_DIR, 'plugin', 'hooks');
  const rootHooksDir = path.join(DST_DIR, 'hooks');

  ensureDir(pluginClaudeDir);
  ensureDir(pluginGrokDir);
  ensureDir(rootClaudeDir);
  ensureDir(hooksDir);
  ensureDir(rootHooksDir);

  const claudePluginManifest = {
    name: 'master-agent',
    description: 'Master Agent: Complete design intelligence, engineering, 24+ commands (/master-agent polish, audit, craft, critique), specialist subagents, and automated anti-pattern detection.',
    version: '4.8.0',
    author: {
      name: 'Master Agent Team'
    },
    homepage: 'https://github.com/Shubhjn4357/MasterAgent',
    repository: 'https://github.com/Shubhjn4357/MasterAgent',
    skills: './skills/'
  };

  const grokPluginManifest = {
    name: 'master-agent',
    description: 'Master Agent: Complete design intelligence, engineering, 24+ commands, specialist subagents, and automated anti-pattern detection.',
    version: '4.8.0',
    skills: './skills/'
  };

  const hooksManifest = {
    hooks: {
      SessionStart: [
        {
          hooks: [
            {
              type: 'command',
              command: '[ ! -f "${CLAUDE_PLUGIN_ROOT}/skills/master-agent/scripts/master-agent" ] || sh "${CLAUDE_PLUGIN_ROOT}/skills/master-agent/scripts/master-agent" hook',
              windows: 'cmd /c if exist ${CLAUDE_PLUGIN_ROOT}\\skills\\master-agent\\scripts\\master-agent.cmd ${CLAUDE_PLUGIN_ROOT}\\skills\\master-agent\\scripts\\master-agent.cmd hook',
              env: {
                MASTER_AGENT_HOOK_HARNESS: 'vscode'
              },
              timeout: 5,
              statusMessage: 'Preparing Master Agent session'
            }
          ]
        }
      ],
      PostToolUse: [
        {
          matcher: 'Edit|Write',
          hooks: [
            {
              type: 'command',
              command: '[ ! -f "${CLAUDE_PLUGIN_ROOT}/skills/master-agent/scripts/master-agent" ] || sh "${CLAUDE_PLUGIN_ROOT}/skills/master-agent/scripts/master-agent" hook',
              windows: 'cmd /c if exist ${CLAUDE_PLUGIN_ROOT}\\skills\\master-agent\\scripts\\master-agent.cmd ${CLAUDE_PLUGIN_ROOT}\\skills\\master-agent\\scripts\\master-agent.cmd hook',
              env: {
                MASTER_AGENT_HOOK_HARNESS: 'vscode'
              },
              timeout: 5,
              statusMessage: 'Checking UI changes for anti-patterns'
            }
          ]
        }
      ],
      Stop: [
        {
          hooks: [
            {
              type: 'command',
              command: '[ ! -f "${CLAUDE_PLUGIN_ROOT}/skills/master-agent/scripts/master-agent" ] || sh "${CLAUDE_PLUGIN_ROOT}/skills/master-agent/scripts/master-agent" hook',
              windows: 'cmd /c if exist ${CLAUDE_PLUGIN_ROOT}\\skills\\master-agent\\scripts\\master-agent.cmd ${CLAUDE_PLUGIN_ROOT}\\skills\\master-agent\\scripts\\master-agent.cmd hook',
              env: {
                MASTER_AGENT_HOOK_HARNESS: 'vscode'
              },
              timeout: 30,
              statusMessage: 'Master Agent design deep pass'
            }
          ]
        }
      ]
    }
  };

  fs.writeFileSync(path.join(pluginClaudeDir, 'plugin.json'), JSON.stringify(claudePluginManifest, null, 2) + '\n');
  fs.writeFileSync(path.join(pluginGrokDir, 'plugin.json'), JSON.stringify(grokPluginManifest, null, 2) + '\n');
  fs.writeFileSync(path.join(rootClaudeDir, 'plugin.json'), JSON.stringify(claudePluginManifest, null, 2) + '\n');
  fs.writeFileSync(path.join(rootClaudeDir, 'marketplace.json'), JSON.stringify(claudePluginManifest, null, 2) + '\n');
  fs.writeFileSync(path.join(hooksDir, 'hooks.json'), JSON.stringify(hooksManifest, null, 2) + '\n');
  fs.writeFileSync(path.join(rootHooksDir, 'hooks.json'), JSON.stringify(hooksManifest, null, 2) + '\n');
}

/**
 * Installs launchers into a scripts directory.
 */
function installLaunchers(scriptsDir) {
  ensureDir(scriptsDir);
  const winContent = getWindowsLauncherContent();
  const posixContent = getPosixLauncherContent();

  fs.writeFileSync(path.join(scriptsDir, 'master-agent.cmd'), winContent, { encoding: 'utf8' });
  fs.writeFileSync(path.join(scriptsDir, 'impeccable.cmd'), winContent, { encoding: 'utf8' });
  fs.writeFileSync(path.join(scriptsDir, 'master-agent'), posixContent, { encoding: 'utf8', mode: 0o755 });
  fs.writeFileSync(path.join(scriptsDir, 'impeccable'), posixContent, { encoding: 'utf8', mode: 0o755 });
}

/**
 * Main build execution.
 */
async function main() {
  console.log('Starting Master Agent build and migration...');

  // 1. Copy Skill files to plugin/skills/master-agent and skills/master-agent
  const srcSkillDir = path.join(SRC_DIR, 'plugin', 'skills', 'impeccable');
  const dstPluginSkillDir = path.join(DST_DIR, 'plugin', 'skills', 'master-agent');
  const dstSkillDir = path.join(DST_DIR, 'skills', 'master-agent');

  console.log('Copying skill reference, scripts, and documentation...');
  copyAndTransformRecursive(srcSkillDir, dstPluginSkillDir);
  copyAndTransformRecursive(srcSkillDir, dstSkillDir);

  // Install custom launchers
  installLaunchers(path.join(dstPluginSkillDir, 'scripts'));
  installLaunchers(path.join(dstSkillDir, 'scripts'));

  // 2. Copy and transform worker agents
  const srcAgentsDir = path.join(SRC_DIR, 'plugin', 'agents');
  const dstPluginAgentsDir = path.join(DST_DIR, 'plugin', 'agents');
  const dstAgentsDir = path.join(DST_DIR, 'agents');
  const dstSkillAgentsDir = path.join(dstSkillDir, 'agents');

  console.log('Staging specialist worker agents...');
  copyAndTransformRecursive(srcAgentsDir, dstPluginAgentsDir);
  copyAndTransformRecursive(srcAgentsDir, dstAgentsDir);
  copyAndTransformRecursive(srcAgentsDir, dstSkillAgentsDir);

  // 3. Build manifests and hooks
  console.log('Generating plugin manifests and hook definitions...');
  buildPluginManifests();

  // 4. Staging multi-agent provider harnesses (.gemini, .agents, .cursor-plugin)
  console.log('Staging multi-agent harnesses (.gemini, .agents, .cursor-plugin)...');
  const geminiSkillsDir = path.join(DST_DIR, '.gemini', 'skills', 'master-agent');
  copyAndTransformRecursive(dstSkillDir, geminiSkillsDir);
  fs.writeFileSync(path.join(DST_DIR, '.gemini', 'settings.json'), JSON.stringify({ "skills": ["master-agent"] }, null, 2) + '\n');

  const agentsSkillsDir = path.join(DST_DIR, '.agents', 'skills', 'master-agent');
  copyAndTransformRecursive(dstSkillDir, agentsSkillsDir);

  const cursorDir = path.join(DST_DIR, '.cursor-plugin');
  const cursorPluginDir = path.join(DST_DIR, 'cursor-plugin');
  ensureDir(cursorDir);
  ensureDir(cursorPluginDir);
  fs.writeFileSync(path.join(cursorDir, 'plugin.json'), JSON.stringify({ name: 'master-agent', version: '4.8.0' }, null, 2) + '\n');
  fs.writeFileSync(path.join(cursorPluginDir, 'package.json'), JSON.stringify({ name: 'master-agent-cursor', version: '4.8.0' }, null, 2) + '\n');

  // 5. CLI setup
  console.log('Configuring Master Agent CLI shim...');
  const cliBinDir = path.join(DST_DIR, 'cli', 'bin');
  ensureDir(cliBinDir);
  fs.writeFileSync(path.join(cliBinDir, 'cli.js'), getCliShimContent(), { encoding: 'utf8', mode: 0o755 });
  fs.writeFileSync(path.join(DST_DIR, 'cli', 'package.json'), JSON.stringify({
    name: 'master-agent-cli',
    version: '4.8.0',
    type: 'module',
    bin: { 'master-agent': 'bin/cli.js' }
  }, null, 2) + '\n');

  // 6. Root package.json
  console.log('Creating root package.json...');
  const rootPkg = {
    name: 'master-agent',
    version: '4.8.0',
    description: 'Master Agent: Enterprise AI engineering, website intelligence, Android intelligence, UI design system, anti-pattern detection, and specialist worker agents.',
    type: 'module',
    bin: {
      'master-agent': 'cli/bin/cli.js',
      'impeccable': 'cli/bin/cli.js'
    },
    scripts: {
      'build:master-agent': 'node scripts/build-master-agent.mjs',
      'detect': 'cli/bin/cli.js detect',
      'audit': 'cli/bin/cli.js detect',
      'help': 'cli/bin/cli.js help'
    },
    keywords: [
      'master-agent',
      'ai',
      'design-system',
      'frontend',
      'engineering',
      'android',
      'anti-patterns',
      'accessibility',
      'ux'
    ]
  };
  fs.writeFileSync(path.join(DST_DIR, 'package.json'), JSON.stringify(rootPkg, null, 2) + '\n');

  console.log('Master Agent build complete successfully!');
}

main().catch((err) => {
  console.error('Error during build:', err);
  process.exit(1);
});
