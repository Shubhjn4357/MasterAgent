import fs from 'node:fs';

const filePath = 'd:/Code/cinetrack/MasterAgent/AGENTS.md';
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `- ALWAYS read and strictly follow both the Website Development and Android Development from /skills/app-engineering,skills/website-engineering \`SKILL.md\` files before starting any task; treat them as mandatory engineering and implementation standards.
- Automatically identify the project type (Web or Android), apply the corresponding skill throughout planning, coding, testing, and review, and never bypass its rules without explicit approval.
## Absolute restrictions`;

const normalizedTarget = targetStr.replace(/\r?\n/g, '\r\n');

const replacementStr = `- ALWAYS read and strictly follow the corresponding skills before starting any task:
  1. Website Engineering & Reconstruction: \`/skills/website-engineering/SKILL.md\`
  2. Android Intelligence & Engineering: \`/skills/app-engineering/skill.md\`
  3. Master Agent Design Intelligence & Craft: \`/skills/master-agent/SKILL.md\`
- Automatically identify the project type (Web, Android, or Design System/Review), apply the corresponding skill throughout planning, coding, testing, and review, and never bypass its rules without explicit approval.
- For all UI design, shaping, critique, and polish tasks, use \`/master-agent <subcommand>\` and enforce the Master Agent 60-rule anti-pattern detector (\`npm run detect\` or \`master-agent.cmd detect\`).
- When specialized asset production, documentation, finish review, or surgical edits are required, delegate to the dedicated worker subagents:
  - \`master-agent-asset-producer\`: Clean raster asset generation and plate cleanup.
  - \`master-agent-documenter\`: DESIGN.md system capture and documentation.
  - \`master-agent-finish-reviewer\`: Independent visual review against design contracts and quality ceiling.
  - \`master-agent-manual-edit-applier\`: Precision DOM/CSS edits without regressions.

## Absolute restrictions`.replace(/\r?\n/g, '\r\n');

if (content.includes(normalizedTarget)) {
  content = content.replace(normalizedTarget, replacementStr);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated AGENTS.md');
} else {
  console.error('Target not found in AGENTS.md');
  process.exit(1);
}

