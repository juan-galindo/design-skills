# Design Skills

AI-ready design knowledge for Product Design teams. This repository contains:

- Local Claude Code skills in `.claude/skills/`
- An installable Claude Code plugin in `plugin/`
- Product design specs in `specs/`
- Workflow docs and design decision records in `docs/`
- Communication templates and filled examples in `comms/`

The goal is to give design agents the same context every time: voice and tone, Design System component rules, token usage, layout patterns, Figma catalog references, and product design workflow.

---

## Prerequisites

| Tool | Purpose |
|------|---------|
| Claude Code CLI or Desktop | Run local skills and plugin agents |
| GitHub | Clone, update, or contribute to this repo |
| Figma account | Required by Figma design and design system workflows |
| API tokens | Required only for MCP-backed integrations |

---

## Quick Start

1. Clone this repository.
2. Open a Claude Code session from the repository root.
3. Use a specialized skill or an orchestrator agent.

Specialized skill example:

```text
/design-content-write — Write an error message for a failed bank transfer
```

Plugin agent example:

```text
Use the figma-designer agent to create the happy path for this PRD in Figma: [paste PRD or link]
```

Local slash-command skills are available when Claude Code is opened in this repo. The plugin marketplace entry lives in `.claude-plugin/marketplace.json`, and the plugin manifest lives in `plugin/.claude-plugin/plugin.json`.

---

## Plugin

The `figma-agent` plugin adds design orchestrators backed by foundation references and the canonical `specs/` library.

| Agent | Use it for | Output |
|-------|------------|--------|
| `figma-designer` | Design screens, layouts, and components in Figma | Figma file |
| `figma-content-designer` | Review existing Figma text layers, propose copy, and apply approved edits | Updated Figma text layers |
| `prototype-designer` | Build interactive React prototypes in the design prototyping playground | React prototype |

The orchestrators sequence work across the design process. They do not replace the focused `design-*` skills for single-step tasks.

Plugin foundations live in `plugin/references/foundations/`:

| Foundation | Purpose |
|------------|---------|
| `tokens.md` | Valid token values across the system |
| `implementation.md` | API contracts, runtime resolution, and code feasibility |
| `quality.md` | Component fit, severity checks, and review quality |
| `taste.md` | Hierarchy, density, whitespace, and product feel |
| `composition-recipes.md` | Layout specs and scope pattern recipes |
| `figma-build.md` | One-pass Figma build guidance and verification |
| `spatial-rhythm.md` | 48 / 24 / 12 spacing rhythm |

See [`plugin/README.md`](plugin/README.md) for the full plugin contract.

---

## Local Skills

### Content Design

| Skill | What it does |
|-------|-------------|
| `/design-content-write` | Write or improve UX copy: titles, CTAs, error messages, empty states, onboarding flows, tooltips, push notifications, and transactional emails. Specialized for Mexican Spanish (es_MX) fintech. |
| `/design-content-review` | Review UI copy, documentation, emails, or Figma text against tone of voice, FEEL framework, glossary, and UX writing principles. Supports es_MX, es_AR, es_CO, pt_BR, and en_US. |
| `/design-content-keys-generation` | Generate structured Lokalise content keys from Figma text nodes, rename layers, write JSON, and optionally upload to Lokalise via MCP. |
| `/design-content-translation-review` | Fetch auto-translated Lokalise strings for a target locale and review them against content guidelines. |

### Product Design

| Skill | What it does |
|-------|-------------|
| `/design-prd-to-use-cases` | Transform a PRD into Jobs To Be Done, structured use cases, and MLP prioritization by revenue and frequency. |
| `/design-figma-naming` | Audit and fix Figma layer naming conventions. |
| `/design-handoff` | Audit a Figma file against the Design Handoff Checklist before handoff. |
| `/design-visual-qa` | Compare implemented screens against Figma and report spacing, padding, font, and inset issues. |
| `/design-prototype-to-figma` | Convert a working Claude Code prototype into structured Figma frames with interaction annotations. |

### Design System

| Skill | What it does |
|-------|-------------|
| `/design-create-component` | Create new MDS Mobile components in Figma following design system standards. |
| `/design-create-component-variant` | Create, expand, or audit component variant structures. |
| `/design-assign-tokens` | Assign MDS text styles and semantic color tokens to existing Figma components. |
| `/design-rename-component` | Rename layers and component properties following MDS conventions. |

---

## Spec Library

Reference specs used by local skills and plugin agents at runtime. See [`specs/README.md`](specs/README.md) for contribution details.

| Area | Contents |
|------|----------|
| [`specs/tokens/`](specs/tokens/) | Color, spacing, typography, and token reference docs |
| [`specs/components/`](specs/components/) | MDS component specs including app bar, header, tabs, bottom sheet, bottom navigation, status bar, search field, balance, nudge, and product recommendation |
| [`specs/patterns/layouts/`](specs/patterns/layouts/) | Full-screen recipes including home, portfolio all, markets crypto, markets category view-all, crypto asset detail, confirmation, and successful action |
| [`specs/patterns/scope/`](specs/patterns/scope/) | Slot-level and scoped composition rules including bullet points, global search, and read-only list first level |
| [`specs/content/`](specs/content/) | Voice, tone, localization, UX writing guidelines, content types, and help-center guidance |
| [`specs/figma-catalog/`](specs/figma-catalog/) | Mobile, web, OS component lookup tables and asset catalogs |

Specs are the source of truth. Plugin foundations should point to specs, not duplicate canonical component or token contracts.

### Content Specs

Content specs are organized by tier. Start with [`specs/content/index.md`](specs/content/index.md), then load the files relevant to the locale, channel, and content type.

| Tier | Folder | Covers |
|------|--------|--------|
| Core | [`specs/content/core/`](specs/content/core/) | Voice and tone, FEEL framework, system thinking, review criteria, and reusable AI prompts |
| Guidelines | [`specs/content/guidelines/`](specs/content/guidelines/) | UX writing principles, CTA rules, accessibility, capitalization, punctuation, currency, time, verbs, bullets, acronyms, symbols, emoji, and formatting rules |
| Types | [`specs/content/types/`](specs/content/types/) | Emails, push notifications, asset bios, help-center articles, and content strategy docs |
| Localization | [`specs/content/localization/`](specs/content/localization/) | Locale rules for MX, AR, CO, BR, and EN, plus glossary and MX compliance guidance |

Key content spec entry points:

| Need | Spec |
|------|------|
| Review or write product copy | [`core/voice-tone.md`](specs/content/core/voice-tone.md), [`core/feel-framework.md`](specs/content/core/feel-framework.md), [`guidelines/ux-writing-principles.md`](specs/content/guidelines/ux-writing-principles.md), [`guidelines/cta-guidelines.md`](specs/content/guidelines/cta-guidelines.md) |
| Apply locale rules | [`localization/glossary.md`](specs/content/localization/glossary.md), then the target locale file: [`mx.md`](specs/content/localization/mx.md), [`ar.md`](specs/content/localization/ar.md), [`co.md`](specs/content/localization/co.md), [`br.md`](specs/content/localization/br.md), or [`en.md`](specs/content/localization/en.md) |
| Check compliance-sensitive copy | [`localization/compliance-mx.md`](specs/content/localization/compliance-mx.md) |
| Write channel-specific content | [`types/emails.md`](specs/content/types/emails.md), [`types/push-notifications.md`](specs/content/types/push-notifications.md), or [`types/asset-bios.md`](specs/content/types/asset-bios.md) |
| Create help-center content | [`types/help-center/index.md`](specs/content/types/help-center/index.md), [`types/help-center/templates.md`](specs/content/types/help-center/templates.md), [`types/help-center/checklist.md`](specs/content/types/help-center/checklist.md) |
| Create content strategy docs | [`types/content-strategy/index.md`](specs/content/types/content-strategy/index.md), [`types/content-strategy/template.md`](specs/content/types/content-strategy/template.md) |

---

## Documentation

`docs/` stores repo workflows, feature specs, decision records, and produced documentation artifacts. Use this area for process documentation and project-specific records, while `specs/` remains the source of truth for reusable design system, content, token, and pattern rules.

| Area | Purpose | Entry point |
|------|---------|-------------|
| [`docs/workflows/`](docs/workflows/) | Contribution workflows for specs, skills, content guidelines, and org plugin publishing | [`contribution-index.md`](docs/workflows/contribution-index.md) |
| [`docs/features/`](docs/features/) | Product feature specs and the feature spec template | [`template/spec.md`](docs/features/template/spec.md) |
| [`docs/decisions/`](docs/decisions/) | Decision records and design decision alignment docs | [`design-decision-record.md`](docs/decisions/design-decision-record.md) |
| [`docs/content/`](docs/content/) | Produced content docs and content-specific working areas | [`docs/content/`](docs/content/) |

Current documented examples include:

| Document | Type |
|----------|------|
| [`docs/features/F-001-ipo-access/spec.md`](docs/features/F-001-ipo-access/spec.md) | Feature spec |
| [`docs/decisions/DA-001-design-role-evolution/design-decision-alignment.md`](docs/decisions/DA-001-design-role-evolution/design-decision-alignment.md) | Design decision alignment |
| [`docs/decisions/DA-002-zeroheight-sunset/design-decision-alignment.md`](docs/decisions/DA-002-zeroheight-sunset/design-decision-alignment.md) | Design decision alignment |

---

## Communications

`comms/` stores reusable design-team communication formats and filled records.

| Folder | Purpose |
|--------|---------|
| [`comms/templates/`](comms/templates/) | Communication templates such as Design Quality Session |
| [`comms/design-quality-session/`](comms/design-quality-session/) | Filled Design Quality Session records |
| [`comms/index.md`](comms/index.md) | Index, naming conventions, and writing principles |

---

## Project Structure

```text
design-skills/
├── .claude/
│   ├── skills/                 # Local slash-command skills
│   ├── figma.config.json       # Figma-related local config
│   └── settings.json
├── .claude-plugin/
│   └── marketplace.json        # Local marketplace entry for plugin installation
├── comms/                      # Communication templates and records
├── docs/                       # Workflows, feature specs, decisions, produced artifacts
├── plugin/
│   ├── .claude-plugin/
│   │   └── plugin.json         # Plugin manifest
│   ├── agents/                 # figma-designer, figma-content-designer, prototype-designer
│   ├── references/foundations/ # Foundation lenses used by plugin agents
│   └── README.md
├── specs/                      # Canonical design, content, token, pattern, and catalog specs
├── CLAUDE.md                   # Repo-level agent instructions
└── README.md
```

Skill naming follows a `<category>-<purpose>` convention: `design-*` for design skills, `dev-*` for engineering and cross-functional workflows.

---

## Contributing

Start with [`docs/workflows/contribution-index.md`](docs/workflows/contribution-index.md), then choose the guide that matches your change.

| Task | Guide |
|---|---|
| Add or edit a UX writing guideline | [`docs/workflows/contribution-content-guideline.md`](docs/workflows/contribution-content-guideline.md) |
| Add or edit a skill | [`docs/workflows/contribution-design-skill.md`](docs/workflows/contribution-design-skill.md) |
| Add or edit a component spec | [`docs/workflows/contribution-component-spec.md`](docs/workflows/contribution-component-spec.md) |
| Port a skill to org bundle | [`docs/workflows/contribution-org-skills-plugin.md`](docs/workflows/contribution-org-skills-plugin.md) |

All PRs require CodeRabbit validation and one human approval to merge.
