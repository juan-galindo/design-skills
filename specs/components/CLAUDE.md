# Component Spec — Agent Guide

> AI agents automatically apply this file when reading or writing under `specs/components/`.
> The canonical template is [`../_template.md`](../_template.md) (`category: component`).
> Reference implementations: [`app-bar.md`](./app-bar.md) · [`header.md`](./header.md).


## Product vs Figma sections

The template ([`../_template.md`](../_template.md)) has two blocks:

1. **Product spec (required)** — React, PM, content, any agent deciding *what* to build.
2. **Figma & library (optional)** — design-handoff, `use_figma`, assign-tokens. Use `N/A — React-only spec` for the whole block when the consumer never opens Figma.


### Section guide (slim template)

| Section | Product / React | Figma |
|---------|:---------------:|:-----:|
| Agent summary, Verification | **●** | ○ |
| Overview, Design intent | **●** | · |
| Structure | **●** | ○ |
| Usage & behavior | **●** | ○ |
| Interactions | **●** | ○ |
| Accessibility | **●** | ○ |
| Token bindings | **●** | **●** |
| Text slot rules | **●** | · |
| Examples | **○** optional | ○ |
| Figma block (end) | · | **●** |

**Usage & behavior** subsections (as needed): `When to use` · `When NOT to use` · `Edge cases` · `Composition`.

**Interactions** — states, gestures, focus order, motion, dismissal (`N/A` for static display-only).

**Accessibility** — **mobile only** (iOS/Android: VoiceOver, TalkBack, touch targets, platform traits). Not web keyboard specs (`N/A` only when the component has no interactive or semantic surface).

**Merged / removed as top-level sections:** Purpose + What it is → **Overview**; Anatomy → **Structure**; Behavioral / conditional / anti-patterns → **Usage & behavior** or **Design intent**; relationships table → **frontmatter only**.

**`figma node`:** authoritative value in YAML frontmatter only. The Figma block MAY cite the **catalog** `pageId` from [`figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md) — do not repeat the frontmatter node ID in prose.


## When to load what

| Task | Load |
|------|------|
| Component behavior, layout, relationships | `specs/components/{id}.md` |
| Figma node IDs, library index | `specs/figma-catalog/mobile-components.md` |
| Color, spacing, typography values | `specs/tokens/token-reference.md` (+ tier files as needed) |
| Voice, tone, locale, CTAs, compliance | `specs/content/index.md` (always for write/review copy tasks) |
| Multi-component layout patterns | `specs/patterns/{id}.md` + host `specs/components/{id}.md` (see [`patterns/CLAUDE.md`](../patterns/CLAUDE.md)) |
| App Bar + Header stacking | `app-bar.md` + `header.md` (Composition in both) |

## Reading order

1. YAML frontmatter — especially `relationships`, `status`, `superseded_by`
2. **Agent summary**
3. **Usage & behavior** (including Composition when present) → **Interactions** → **Accessibility** → **Design intent**
4. **Structure** (variants, slots)
5. **Token bindings**
6. **Text slot rules** + `specs/content/` when writing copy
7. **Verification** when auditing

## Priority when rules conflict

1. **Usage & behavior** (`MUST` / `MUST NOT`, composition)
2. **Interactions** and **Accessibility** (when present — `MUST` for interactive or modal surfaces)
3. **Token bindings** (never override with raw hex/px)
4. **Agent summary** (quick rules — must not contradict Usage, Interactions, or Accessibility)
5. **Design intent**
6. **Examples** (illustrative only)

## Skill → section map

| Skill | Primary sections |
|-------|------------------|
| `design-create-component` | Structure, Token bindings, Figma block |
| `design-assign-tokens` | Token bindings |
| `design-create-component-variant` | Structure (variants), Usage & behavior, Figma block |
| `design-figma-naming` | Structure, Figma block (layers) |
| `design-content-keys-generation` | Structure (slots) |
| `design-handoff` | Usage & behavior, Interactions, Accessibility, Verification, Token bindings |
| `design-content-write` / `design-content-review` | Text slot rules + `specs/content/` |

## Template compliance

Every component spec SHOULD include:

- Frontmatter: `id`, `name`, `category: component`, `platform`, `tier`, `status`, `figma node` (optional), `relationships`
- Body sections from [`specs/_template.md`](../_template.md): Agent summary, Overview, Structure, Usage & behavior, Interactions, Accessibility, Design intent, Token bindings, Text slot rules, Verification, Related specs
- **Examples** and **Figma block**: include when useful; otherwise `N/A — [reason]` under the heading (do not leave pilot specs inconsistent without reason)

### Red flags

- Duplicate authoritative `figma node` in body or Agent summary (catalog `pageId` in Figma block is OK)
- Vague rules ("use sparingly", "when appropriate") without a MUST/SHOULD condition
- Hex colors or raw `16px` in the spec body
- TSX, React, or implementation snippets
- Voice/tone/locale rules duplicated from `specs/content/` (belongs in **Text slot rules** only as slot limits + pointer)
- **Related specs** contradicts frontmatter `relationships`
- `status: ready` with empty Verification or empty Text slot rules on text-bearing components
- Interactive or modal components with empty **Interactions** or **Accessibility** (use `N/A — [reason]` only when truly non-interactive)
- **Design intent** repeats the full MUST NOT list from Usage & behavior
- Host sections duplicate a **pattern** spec in full — link to `specs/patterns/` and keep only host-specific stack/rules
- Accessibility or interaction rules only in **Agent summary** with no matching **Interactions** / **Accessibility** section

### Optional sections

Mark optional sections with `N/A — [reason]` rather than deleting the heading — keeps structure predictable for agents. **Examples** may be omitted when variant tables and Usage & behavior already cover scenarios (see `app-bar.md`).
