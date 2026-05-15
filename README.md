# Design Skills

This repository is the source of truth for AI skills used by the Bitso Product Design team built to run inside Claude Code. Each skill is a focused assistant that knows how to handle a specific design task: writing UX copy, auditing a Figma file, generating a PRD, reviewing content, and more.

Think of each skill as a trained assistant that already knows Bitso's tone of voice, design system conventions, and product context — so you don't have to explain them every time.


**Learn more about skills:**
- [How to create custom skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)
- [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)


---

## Prerequisites

| Tool | Purpose | Install |
|------|---------|---------|
| Claude Code CLI or Desktop | Required to run design skills | [Guide for non-coders](https://bitsomx.atlassian.net/wiki/spaces/Design/pages/6133514286/1.1+Set+up+Claude+Code+CLI+for+non-coders) |
| GitHub | Required to download or interate skills | [Guide for non-coders](https://bitsomx.atlassian.net/wiki/spaces/Design/pages/6131580942/3.+Set+up+your+GitHub+access) |
| Figma account | Required to edit Figma by design system skills | Must have full design seat |

---

## Quick Start

1. **Clone this repository**
2. **Start a Claude Code session**
3. **Invoke your first skill** — try writing some UX copy:
   ```
   /design-content-write — Write an error message for a failed bank transfer
   ```

Skills are automatically available once you open a session in this directory. No installation or configuration required.

---

## How skills work

```
/design-content-write  → write UX copy for a screen
/design-content-review → review copy or a design for quality
/design-handoff        → audit a Figma file before dev handoff
```

When you invoke a skill, the AI loads the skill's instructions automatically and walks you through the task step by step.

---

## Design Skills

### Content Design

| Skill | What it does | Owner |
|-------|-------------|-------|
| `/design-content-write` | Write or improve UX copy: titles, CTAs, error messages, empty states, onboarding flows, tooltips, push notifications, and transactional emails. Specialized for Mexican Spanish (es_MX) fintech. | Emilia Alegre |
| `/design-content-review` | Review any content — UI copy, documentation, emails, or a Figma design — against Bitso's tone of voice, FEEL framework, glossary, and UX writing principles. Supports es_MX, es_AR, es_CO, pt_BR, and en_US. | Emilia Alegre |
| `/design-content-keys-generation` | Generate structured Lokalise content keys from Figma text nodes (page, section, or frame), rename layers automatically, write a structured JSON file, and optionally upload directly to a Lokalise project via MCP. Auto-detects scan target from the URL. | Juan Galindo |
| `/design-content-translation-review` | Connect to a Lokalise project, fetch automatically translated strings for a target locale, and review them against Bitso's content guidelines (glossary, locale rules, voice & tone, UX writing principles). Outputs a prioritized issues table. | Marina Meireles |

**Example prompts:**
```
/design-content-write — Write an empty state for the Crypto portfolio screen when the user has no assets
/design-content-review — Review the copy on this onboarding flow [paste text or share Figma link]
/design-content-keys-generation — Generate Lokalise keys for the Warrants feature: https://figma.com/design/abc123/...?node-id=123:456
/design-content-translation-review — Review auto-translated strings for pt_BR in the Onboarding Lokalise project
```

---
### Product Design

| Skill | What it does | Owner |
|-------|-------------|-------|
| `/design-prd-to-use-cases` | Transform a PRD into Jobs To Be Done (JTBD), structured use case scenarios, and MLP prioritization by revenue and frequency. | Juan Galindo |
| `/design-figma-naming` | Audit and fix layer naming conventions in Figma files according to design system guidelines. | Esmeralda Carreño |
| `/design-handoff` | Audit a Figma file against the Design Handoff Checklist before a handoff meeting with PM and Engineering. | Esmeralda Carreño |
| `/design-visual-qa` | Run a Visual QA audit comparing implemented screens against Figma designs, producing a structured table report per screen focused on spacing, padding, font styles, and horizontal insets. | Juan Galindo |

### Design System

| Skill | What it does | Owner |
|-------|-------------|-------|
| `/design-create-component` | Create new MDS Mobile components directly in Figma following naming conventions and design system standards. | Juan Galindo |
| `/design-create-component-variant` | Create, expand, or audit component variant structures in Figma following MDS naming conventions. | Juan Galindo |
| `/design-assign-tokens` | Assign MDS text styles and semantic color tokens to an existing Figma component — connects layers to real library styles without adding raw hex values. | Juan Galindo |
| `/design-rename-component` | Rename layers and component properties in Figma following the MDS naming convention. | Juan Galindo |

**Example prompts:**
```
/design-create-component-variant — Add size variants (S, M, L) to this button component
/design-assign-tokens — Connect text styles and colors to this component
/design-figma-naming — Audit and fix layer names in this file: [Figma URL]
/design-handoff — Run the checklist on this file before Thursday's handoff: [Figma URL]
```

---

## Tooling skills

| Skill | What it does | Owner |
|-------|-------------|-------|
| `/skill-creator` | Create new skills, modify and improve existing ones, run evals, and benchmark skill performance. | Juan Galindo |
| `/dev-pr-workflow` | Open, update, and manage pull requests via GitHub CLI | Juan Galindo |

---

## Spec Library

Reference specs used by skills at runtime. Organized by type inside `specs/`.

### Component specs

| Spec | Description |
|------|-------------|
| [`app-bar.md`](specs/components/app-bar.md) | App bar structure and behavior |
| [`bottom-ctas.md`](specs/components/bottom-ctas.md) | Bottom CTA button patterns |
| [`bottom-sheet.md`](specs/components/bottom-sheet.md) | Bottom sheet variants and usage |
| [`header.md`](specs/components/header.md) | Screen header patterns |
| [`tabs.md`](specs/components/tabs.md) | Tabs variants, behavior, and content guidelines |

### Content index

All UX writing guidelines live in `specs/content/`. The entry point is [`specs/content/index.md`](specs/content/index.md) — read it first to find the right file for any content task.

| Tier | Folder | What it covers |
|------|--------|---------------|
| **Core** | `specs/content/core/` | Voice & tone, FEEL framework, system thinking, review criteria |
| **Guidelines** | `specs/content/guidelines/` | UX writing principles, CTAs, punctuation, capitalization, accessibility, and more |
| **Types** | `specs/content/types/` | Emails, push notifications, help center articles, content strategy |
| **Localization** | `specs/content/localization/` | Per-locale rules (es_MX, es_AR, es_CO, pt_BR, en_US), glossary, MX compliance |

Skills (`design-content-write`, `design-content-review`) load files from this index automatically at runtime.

### Pattern specs

| Spec | Description |
|------|-------------|
| [`bullet-points.md`](specs/patterns/bullet-points.md) | Bullet point layout and composition rules |

### Token specs

| Spec | Description |
|------|-------------|
| [`token-reference.md`](specs/tokens/token-reference.md) | Authoritative token list (source of truth) |
| [`color-tokens.md`](specs/tokens/color-tokens.md) | Color token reference |
| [`spacing-tokens.md`](specs/tokens/spacing-tokens.md) | Spacing token reference |
| [`typography-tokens.md`](specs/tokens/typography-tokens.md) | Typography token reference |

---

## Project structure

```
design-skills/
├── .claude/
│   ├── figma.config.json     # Figma file keys and node IDs
│   ├── settings.json         # Claude Code permissions and hooks
│   └── skills/
│       └── <skill-name>/
│           ├── SKILL.md      # Skill definition — instructions, trigger conditions, workflow
│           ├── scripts/      # Optional automation scripts (TypeScript or Python)
│           └── assets/       # Optional templates, examples, or static resources
├── docs/
│   ├── content/              # Exported content artifacts (e.g. Lokalise project keys)
│   └── workflows/            # Contribution guides for skills, content, and org plugin
├── specs/
│   ├── _template.md          # Blank spec template — copy to start a new spec
│   ├── components/           # MDS component specs (atoms, molecules, organisms)
│   ├── content/              # UX writing guidelines, localization rules, content types
│   ├── figma-catalog/        # Figma file keys and node IDs for MDS libraries and assets
│   ├── patterns/             # Layout and composition rules
│   └── tokens/               # Token reference — authoritative token list
├── CLAUDE.md                 # Agent instructions for this repo
└── README.md
```

Skill naming follows a `<category>-<purpose>` convention:
- `design-*` — design-specific skills (Figma, UX writing, design system)
- `dev-*` — engineering and cross-functional skills

---

## Contributing

| Task | Guide |
|---|---|
| Add or edit a UX writing guideline | [`docs/workflows/contribution-content-guideline.md`](docs/workflows/contribution-content-guideline.md) |
| Add or edit a skill | [`docs/workflows/contribution-design-skill.md`](docs/workflows/contribution-design-skill.md) |
| Port a skill to the Bitso org bundle | [`docs/workflows/contribution-org-skills-plugin.md`](docs/workflows/contribution-org-skills-plugin.md) |

All PRs in bitsoex requires at least CodeRabbit validation and one human approval to merge.
