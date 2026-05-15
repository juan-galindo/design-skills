# Claude Code Agent Instructions

## Design Skills Repo — Agent Guide

This repo is a knowledge base and skill library for Claude Code agents working on Bitso's design.

---

## Spec Library

All UX pattern specs live in `specs/`. Load them as reference context before making design decisions.

### Folder structure

| Folder | Contains |
|--------|---------|
| `specs/figma-catalog/` | Figma lookup tables — `mobile-components.md`, `web-components.md`, `assets/` |
| `specs/tokens/` | Token reference — authoritative token list |
| `specs/components/` | All MDS components (atoms, molecules, organisms merged) |
| `specs/patterns/` | Layout and composition rules |
| `specs/content/` | UX writing guidelines, localization rules — entry point: `specs/content/index.md` |

### Loading specs in a skill step

```markdown
## Step 1 — Load relevant spec
Read `specs/patterns/bullet-points.md` to get pattern rules before proceeding.
```

To load an entire tier: `Glob specs/components/*.md → Read each file → apply rules`

### Token source of truth

Always read `specs/tokens/token-reference.md` for the authoritative token list.
**Never hardcode hex values or raw dp/pt numbers.**

Token hierarchy (use the lowest tier that applies):

1. **Component** — supports Light/Dark automatically
2. **Semantic** — when no component token exists
3. **Base** — primitives only, never use directly in components

---

## Skills

All skills live in `.claude/skills/`. Each skill has a `SKILL.md` with numbered, step-by-step instructions.

---

## New spec files

Copy `specs/_template.md` to the appropriate folder and fill in each section.
Set `status: draft` until the spec has been reviewed.
