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

**Reference Materials:**

These content skills include comprehensive guidelines and frameworks:

**Available in `/design-content-write`:**
- Bitso Tone of Voice — Brand voice principles and personality guidelines
- FEEL Framework — Emotional, functional, and accessible writing principles
- Glossary — Approved financial and product terminology
- UX Writing Principles — Best practices for UI microcopy and user guidance
- CTA Guidelines — Call-to-action button copy standards
- Transactional Emails — Email templates and communication patterns
- System Thinking — Contextual approach to writing within product systems
- Evaluation Criteria — Quality metrics for assessing copy effectiveness

**Available in `/design-content-review`:**
- Compliance (Mexico) — Mexican financial regulations and copywriting requirements
- All references from `/design-content-write` (above)

**Example prompts:**
```
/design-content-write — Write an empty state for the Crypto portfolio screen when the user has no assets
/design-content-review — Review the copy on this onboarding flow [paste text or share Figma link]
```

---
### Product Design

| Skill | What it does | Owner |
|-------|-------------|-------|
| `/design-figma-naming` | Audit and fix layer naming conventions in Figma files according to design system guidelines. | Esmeralda Carreño |
| `/design-handoff` | Audit a Figma file against the Design Handoff Checklist before a handoff meeting with PM and Engineering. | Esmeralda Carreño |

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

## Engineering and cross-functional skills

These are not design-specific but may be useful when collaborating with your squad:

| Skill | What it does |
|-------|-------------|
| `/dev-pr-workflow` | Open, update, and manage pull requests via GitHub CLI |

---

## Project structure

```
.claude/
└── skills/
    └── <skill-name>/
        ├── SKILL.md          # Skill definition — instructions, trigger conditions, workflow
        ├── references/       # Context files loaded by the skill (guidelines, templates, frameworks)
        ├── scripts/          # Optional automation scripts (TypeScript or Python)
        └── assets/           # Optional templates, examples, or static resources
```

Skill naming follows a `<category>-<purpose>` convention:
- `design-*` — design-specific skills (Figma, UX writing, design system)
- `dev-*` — engineering and cross-functional skills

---

## Contributing a new design skill

1. **Create a feature branch** using the naming convention `feat/skill-name`
2. **Scaffold your skill** with the skill creator:
   ```
   /skill-creator
   ```
3. **Follow naming conventions** — see `.claude/design-skills-naming.md` for design skills, and the existing `dev-*` skills for engineering patterns
4. **Run evals** before opening a PR — the `/skill-creator` skill includes an evaluation workflow to measure trigger accuracy and output quality
5. **Open a PR** — all skills require human code review before merging

> New and modified skills require a human code review before merging. AI-authored PRs require 2 human approvals.
