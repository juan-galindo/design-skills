# Specs

Reference library used by skills at runtime. All design decisions, copy, and token usage should be grounded in these files.

## Folder structure

| Folder | Contents |
|--------|---------|
| `figma-catalog/` | Figma lookup tables — `mobile-components.md`, `web-components.md`, `assets/` |
| `tokens/` | Authoritative token list — always read `token-reference.md` first |
| `components/` | MDS component specs — template: [`_template.md`](_template.md), agent guide: [`components/CLAUDE.md`](components/CLAUDE.md) |
| `patterns/` | Composition rules across components — template: [`_template-pattern.md`](_template-pattern.md), guide: [`patterns/CLAUDE.md`](patterns/CLAUDE.md) |
| `content/` | UX writing guidelines, localization rules — entry point: [`content/index.md`](content/index.md) |

## Adding a new spec

| Type | How to start |
|------|----------------|
| **Component** | Copy [`_template.md`](_template.md) → `components/{id}.md`. Set `category: component`, `status: draft`. See [`components/CLAUDE.md`](components/CLAUDE.md). Pilot: [`components/app-bar.md`](components/app-bar.md). |
| **Pattern** | Copy [`_template-pattern.md`](_template-pattern.md) → `patterns/{scope}/{id}.md` where `{scope}` is `scope/` (slot-level rules) or `layouts/` (full-screen recipes). Set `category: pattern`, `relationships.applies_to`. See [`patterns/CLAUDE.md`](patterns/CLAUDE.md). Pilot: [`patterns/scope/bullet-points.md`](patterns/scope/bullet-points.md). |
| **Token** | New file in `tokens/` or extend [`tokens/token-reference.md`](tokens/token-reference.md) per existing token docs. |
