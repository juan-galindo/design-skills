# Design Skills

AI skills for the Bitso Product Design team, built to run inside Claude Code. Each skill is a focused assistant that already knows Bitso's tone of voice, design system conventions, and product context — so you don't have to explain them every time.

---

## Prerequisites

| Tool | Purpose | Install |
|------|---------|---------|
| Claude Code CLI or Desktop | Required to run design skills | [Guide for non-coders](https://bitsomx.atlassian.net/wiki/spaces/Design/pages/6133514286/1.1+Set+up+Claude+Code+CLI+for+non-coders) |
| GitHub | Required to download or iterate skills | [Guide for non-coders](https://bitsomx.atlassian.net/wiki/spaces/Design/pages/6131580942/3.+Set+up+your+GitHub+access) |
| Figma account | Required by design system skills that edit Figma | Must have full design seat |

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

## Design Skills

### Content Design

| Skill | What it does |
|-------|-------------|
| `/design-content-write` | Write or improve UX copy: titles, CTAs, error messages, empty states, onboarding flows, tooltips, push notifications, and transactional emails. Specialized for Mexican Spanish (es_MX) fintech. |
| `/design-content-review` | Review any content — UI copy, documentation, emails, or a Figma design — against Bitso's tone of voice, FEEL framework, glossary, and UX writing principles. Supports es_MX, es_AR, es_CO, pt_BR, and en_US. |
| `/design-content-keys-generation` | Generate structured Lokalise content keys from Figma text nodes (page, section, or frame), rename layers automatically, write a structured JSON file, and optionally upload directly to a Lokalise project via MCP. Auto-detects scan target from the URL. |
| `/design-content-translation-review` | Connect to a Lokalise project, fetch automatically translated strings for a target locale, and review them against Bitso's content guidelines (glossary, locale rules, voice & tone, UX writing principles). Outputs a prioritized issues table. |

**Example prompts:**
```
/design-content-write — Write an empty state for the Crypto portfolio screen when the user has no assets
/design-content-review — Review the copy on this onboarding flow [paste text or share Figma link]
/design-content-keys-generation — Generate Lokalise keys for the Warrants feature: https://figma.com/design/abc123/...?node-id=123:456
/design-content-translation-review — Review auto-translated strings for pt_BR in the Onboarding Lokalise project
```

---

### Product Design

| Skill | What it does |
|-------|-------------|
| `/design-prd-to-use-cases` | Transform a PRD into Jobs To Be Done (JTBD), structured use case scenarios, and MLP prioritization by revenue and frequency. |
| `/design-figma-naming` | Audit and fix layer naming conventions in Figma files according to design system guidelines. |
| `/design-handoff` | Audit a Figma file against the Design Handoff Checklist before a handoff meeting with PM and Engineering. |
| `/design-visual-qa` | Run a Visual QA audit comparing implemented screens against Figma designs, producing a structured table report per screen focused on spacing, padding, font styles, and horizontal insets. |
| `/design-prototype-to-figma` | Convert a working Claude Code prototype into a structured Figma design file — exploding interaction flows into separate frames, applying design system components, and annotating interactions for async review. |

**Example prompts:**
```
/design-prd-to-use-cases — Extract use cases and JTBD from this PRD [paste or share link]
/design-figma-naming — Audit and fix layer names in this file: [Figma URL]
/design-handoff — Run the checklist on this file before Thursday's handoff: [Figma URL]
/design-visual-qa — Compare these implemented screens against the Figma: [Figma URL]
/design-prototype-to-figma — Turn this prototype into Figma frames for async design review
```

---

### Design System

| Skill | What it does |
|-------|-------------|
| `/design-create-component` | Create new MDS Mobile components directly in Figma following naming conventions and design system standards. |
| `/design-create-component-variant` | Create, expand, or audit component variant structures in Figma following MDS naming conventions. |
| `/design-assign-tokens` | Assign MDS text styles and semantic color tokens to an existing Figma component — connects layers to real library styles without adding raw hex values. |
| `/design-rename-component` | Rename layers and component properties in Figma following the MDS naming convention. |

**Example prompts:**
```
/design-create-component-variant — Add size variants (S, M, L) to this button component
/design-assign-tokens — Connect text styles and colors to this component
/design-rename-component — Clean up layer names in this component: [Figma URL]
```

---

## Tooling Skills

| Skill | What it does |
|-------|-------------|
| `/skill-creator` | Create new skills, modify and improve existing ones, run evals, and benchmark skill performance. |
| `/dev-pr-workflow` | Open, update, and manage pull requests via GitHub CLI. |

---

## Spec Library

Reference specs used by skills at runtime. See [`specs/README.md`](specs/README.md) for folder structure and templates.

---

## Project structure

```
design-skills/
├── .claude/skills/   # One folder per skill, each with a SKILL.md
├── docs/             # Produced artifacts (content, decisions, features, workflows)
├── specs/            # Reference specs used by skills at runtime
├── CLAUDE.md         # Agent instructions
└── README.md
```

Skill naming follows a `<category>-<purpose>` convention: `design-*` for design skills, `dev-*` for engineering and cross-functional.

---

## Contributing

| Task | Guide |
|---|---|
| Add or edit a UX writing guideline | [`docs/workflows/contribution-content-guideline.md`](docs/workflows/contribution-content-guideline.md) |
| Add or edit a skill | [`docs/workflows/contribution-design-skill.md`](docs/workflows/contribution-design-skill.md) |
| Port a skill to the Bitso org bundle | [`docs/workflows/contribution-org-skills-plugin.md`](docs/workflows/contribution-org-skills-plugin.md) |

All PRs require at least CodeRabbit validation and one human approval to merge.
