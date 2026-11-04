# Master Agent

> **Enterprise-Grade AI Architecture, Full-Stack Engineering, Native Android Intelligence & Out-of-Distribution Design Craft**

Master Agent is a unified intelligence system designed for production AI coding agents and human engineers. It unites three major pillars:
1. **Website Intelligence & Reconstruction Engineering** (`/skills/website-engineering`)
2. **Android Intelligence & Mobile Engineering** (`/skills/app-engineering`)
3. **Master Agent Design Intelligence & Craft** (`/skills/master-agent` & `/plugin`)

---

## 1. Pillars of Master Agent

```
MasterAgent/
├── plugin/                          # Production-ready cross-provider plugin bundle
│   ├── .claude-plugin/              # Claude Code plugin manifest
│   ├── .grok-plugin/                # Grok Build plugin manifest
│   ├── agents/                      # Specialist worker subagents
│   ├── hooks/                       # PreToolUse, PostToolUse, and Stop hooks
│   └── skills/master-agent/         # Complete design skill with all 37+ reference guides
├── skills/
│   ├── website-engineering/         # Reverse-engineering, DOM/CSS/JS inspection & Next.js
│   ├── app-engineering/             # Kotlin, Jetpack Compose, Material 3 Expressive & Android APK
│   └── master-agent/                # Design intelligence, 24+ commands, live tools & rules
├── agents/                          # Standalone specialist worker subagents
│   ├── master-agent-asset-producer.md
│   ├── master-agent-documenter.md
│   ├── master-agent-finish-reviewer.md
│   └── master-agent-manual-edit-applier.md
├── cli/                             # Universal CLI runner & platform binaries shim
└── hooks/                           # Project-level design protection hooks
```

---

## 2. Design Intelligence & Steering Commands

Master Agent provides 24+ specialized steering subcommands under `/master-agent` (or `master-agent <command>`):

| Command | Category | Description | Primary Reference |
|---|---|---|---|
| `/master-agent craft [feature]` | Build | Comprehensive new UI creation or radical redesign | `reference/craft.md` |
| `/master-agent shape [feature]` | Build | Pre-code UX/UI planning, discovery interviews & design briefs | `reference/shape.md` |
| `/master-agent init` | Build | Capture durable product context in `PRODUCT.md` | `reference/init.md` |
| `/master-agent document` | Build | Generate `DESIGN.md` design system from existing code | `reference/document.md` |
| `/master-agent extract [target]` | Build | Pull reusable tokens and components into a cohesive system | `reference/extract.md` |
| `/master-agent critique [target]` | Evaluate | UX review with heuristic scoring and persona simulation | `reference/critique.md` |
| `/master-agent audit [target]` | Evaluate | Technical quality review: a11y, performance, responsive, anti-patterns | `reference/audit.md` |
| `/master-agent polish [target]` | Refine | Pixel-precision final quality pass before shipping | `reference/polish.md` |
| `/master-agent bolder [target]` | Refine | Turn up contrast, drama, visual weight, and personality | `reference/bolder.md` |
| `/master-agent quieter [target]` | Refine | Tone down aggressive, loud, or overstimulating designs | `reference/quieter.md` |
| `/master-agent distill [target]` | Refine | Strip clutter to essence; remove unnecessary noise | `reference/distill.md` |
| `/master-agent harden [target]` | Refine | Production readiness: edge cases, error states, i18n, overflow | `reference/harden.md` |
| `/master-agent onboard [target]` | Refine | Design first-run flows, empty states, and activation | `reference/onboard.md` |
| `/master-agent animate [target]` | Enhance | Purposeful micro-interactions, spring physics, and motion | `reference/animate.md` |
| `/master-agent colorize [target]` | Enhance | Strategic color hierarchies, palette expansion, warmth | `reference/colorize.md` |
| `/master-agent typeset [target]` | Enhance | Typography rhythm, font pairings, leading, and tracking | `reference/typeset.md` |
| `/master-agent layout [target]` | Enhance | Grid compositions, intentional asymmetry, and visual flow | `reference/layout.md` |
| `/master-agent delight [target]` | Enhance | Memorable moments, crafted details, and micro-delights | `reference/delight.md` |
| `/master-agent overdrive [target]`| Frontier | Shaders, OffscreenCanvas, Web Workers, advanced physics | `reference/overdrive.md` |
| `/master-agent clarify [target]` | Content | Improve UX microcopy, labels, instructions, and error text | `reference/clarify.md` |
| `/master-agent adapt [target]` | Multi-device | Viewport adaptation, container queries, touch targets | `reference/adapt.md` |
| `/master-agent live` | Live Tool | Hot-swapped AI variant generation directly in the browser | `reference/live.md` |
| `/master-agent generate [prompt]`| Live Tool | Automated live element mutation and variant generation | `reference/generate.md` |
| `/master-agent doctor` | Diagnostics | Health check project design tokens, config, and system drift | `reference/doctor.md` |

---

## 3. Specialist Worker Subagents

Master Agent ships 4 autonomous worker subagents designed for multi-agent delegation:

1. **`master-agent-asset-producer`**:
   Generates clean, reusable raster plates, SVG illustrations, and iconography from design comps without altering the core art direction.
2. **`master-agent-documenter`**:
   Scans codebases and generates structured `DESIGN.md` tokens, component inventories, and typography/color contracts.
3. **`master-agent-finish-reviewer`**:
   Independent visual auditor operating outside the builder thread's attention context. Inspects multi-viewport captures, checks contracts, verifies quality ceilings, and flags floor violations.
4. **`master-agent-manual-edit-applier`**:
   Surgically applies precision DOM and CSS updates without introducing structural regressions or side effects.

---

## 4. 60-Rule Deterministic Anti-Pattern Detector

The Master Agent engine scans HTML, JSX, TSX, Vue, Svelte, CSS, and live rendered URLs for 60 common AI design anti-patterns:

- **Hierarchy & Typography**: `flat-type-hierarchy`, `overused-font`, `tight-leading`, `extreme-negative-tracking`, `wide-tracking`, `all-caps-body`, `unbalanced-heading`, `skipped-heading`, `straggler`
- **Color & Palette**: `ai-color-palette`, `cream-palette`, `gradient-text`, `gray-on-color`, `low-contrast`, `repeating-stripes-gradient`
- **Layout & Structure**: `nested-cards`, `monotonous-spacing`, `edge-flush-cards`, `cramped-padding`, `first-viewport-column-overflow`, `text-occlusion`, `clipped-overflow-container`
- **Decorative Clichés**: `border-accent-on-rounded`, `hard-offset-shadow`, `dark-glow`, `radial-halo`, `radial-spotlight-glow`, `side-tab`, `pulsing-dot`, `blinking-cursor`, `bounce-easing`, `organic-clip-path`, `marquee`, `icon-tile-stack`, `hero-eyebrow-chip`, `kicker-above-heading`
- **Prose & AI Tells**: `em-dash-overuse`, `marketing-buzzword`, `aphoristic-cadence`, `theater-slop-phrase`
- **Integrity**: `broken-image`, `script-error`, `buried-raster`, `content-hidden-at-rest`

### Running the Detector

```bash
# Scan a folder or file
npm run detect src/

# Scan with JSON output
npm run detect -- --json src/

# List all detector rules
npm run detect -- --list-rules --quiet

# Scan a live website via headless browser
npm run detect https://your-site.com
```

---

## 5. Harness Integrations & Installation

### Claude Code Plugin
Master Agent ships ready-to-run inside `plugin/`:
```bash
# Install as a Claude plugin
claude plugin add ./plugin
```
Includes automatic hooks (`SessionStart`, `PostToolUse` for edit checks, and `Stop` for deep review passes).

### Gemini & Antigravity
Configured in `.gemini/`:
- Skills located in `.gemini/skills/master-agent`
- Global settings configured in `.gemini/settings.json`

### Cursor
Integrated under `.cursor-plugin/` and `cursor-plugin/` for instant rule resolution and contextual steering.

### OpenAI / Codex / Standalone Agents
Installed in `.agents/skills/master-agent/` following universal agent standards.

---

## 6. Development & Verification

Run the Master Agent test and verification commands:

```bash
# Verify anti-pattern detector rules
npm run detect -- --list-rules --quiet

# Run Master Agent build pipeline
npm run build:master-agent
```
