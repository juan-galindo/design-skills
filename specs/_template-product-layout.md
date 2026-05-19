# MDS product-layout (recipe) spec template

Copy to `specs/patterns/layouts/{id}.md` · Guide: [`patterns/CLAUDE.md`](patterns/CLAUDE.md) · Foundation: [`../plugin/references/foundations/composition-recipes.md`](../plugin/references/foundations/composition-recipes.md)

A **product layout** (a.k.a. recipe) names a repeatable way to combine MDS components for a specific content scenario. It composes **existing** components and patterns — never invents new behavior. If a recipe needs new behavior, that behavior belongs in a component or pattern spec.

This template is **maximal-prescription**: it asks for every detail an AI agent needs to reproduce the layout without guessing. Fill every section. Use `N/A — [reason]` only when a section genuinely does not apply.

```yaml
---
id: layout-id
name: Layout Display Name
category: product-layout
platform: mobile
tags: []
aliases: []
status: ready
relationships:
  composes: []        # component ids this recipe stacks (host + children)
  applies_to: []      # surface/flow types where this recipe is valid
  conflicts_with: []  # recipes that MUST NOT appear together on the same surface
  requires: []        # patterns or components that MUST be present
  supersedes: []      # older recipes this replaces
---
```

## Agent summary

- <!-- 3–5 MUST rules: host component, stack order, when to use, when NOT to use -->
- **Stack (top → bottom):** <!-- one-line summary, e.g. `MDSBottomSheet > sectionHeader > bullets > BottomCTAs` -->
- **Copy:** [`../../content/index.md`](../../content/index.md) · per-slot limits below

## Overview

<!-- What the recipe is + the scenario it solves (2 short paragraphs max). Name the user goal, not the implementation. -->

## Anatomy

<!-- ASCII or labeled-block diagram. Number each element so the stack table below can refer back. -->

```
┌─────────────────────────────┐
│ 1. Host component           │
│ ┌─────────────────────────┐ │
│ │ 2. Slot A               │ │
│ │ 3. Slot B               │ │
│ └─────────────────────────┘ │
│ 4. Footer / actions         │
└─────────────────────────────┘
```

## Stack order

> Numbered top → bottom. Every row names the host component, the slot, the spec link, and what fills it. Agents reproduce this list exactly.

| # | Element | Host / slot | Spec | Required | Notes |
|---|---------|-------------|------|----------|-------|
| 1 | | | | Yes / No | |
| 2 | | | | Yes / No | |
| 3 | | | | Yes / No | |

## Variants

> One row per variant. If only one variant exists, keep one row.

| Variant | When to use | Stack delta vs default | Figma node |
|---------|-------------|------------------------|------------|
| `default` | | — | |

## Usage & behavior

### When to use

- MUST …

### When NOT to use

- MUST NOT …

### Edge cases

- 

## States

> Required state coverage. Mark `N/A — [reason]` if a state cannot occur for this recipe.

| State | Trigger | Stack/slot changes | Copy source |
|-------|---------|--------------------|-------------|
| Default | | | |
| Loading | | | |
| Empty | | | |
| Error | | | |
| Success / confirmation | | | |

## Interactions

> Gestures, focus order, motion, dismissal. `N/A — static recipe` when nothing is interactive at the recipe level (host component interactions still apply).

| Interaction | Behavior | Source of truth |
|-------------|----------|-----------------|
| Primary action | | host component spec |
| Secondary action | | host component spec |
| Dismiss | | host component spec |

## Accessibility

> **Mobile only** (iOS + Android) — VoiceOver, TalkBack. Recipe-level rules only; per-component rules live in the host specs. Copy → [`../../content/guidelines/accessibility.md`](../../content/guidelines/accessibility.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | |
| Focus & traversal | |
| Labels & announcements | |
| Touch & gestures | |

## Token bindings

> [`../../tokens/token-reference.md`](../../tokens/token-reference.md) — no raw hex or px in this spec. Token paths only.

| Role | Token path | Element # | Notes |
|------|------------|:---------:|-------|
| Outer surface | | | |
| Stack gap (between slots) | | | |
| Slot-internal gap | | | |
| Title typography | | | |
| Body typography | | | |
| Primary action | | | per host component |
| Secondary action | | | per host component |

**MUST NOT override** spacing or padding that the host component owns. If a gap is not listed here, defer to the host spec.

## Text slot rules

> Voice and locale → [`../../content/index.md`](../../content/index.md). This table sets **slot limits** only.

| Slot | Element # | Max chars | Grammar | Examples |
|------|:---------:|:---------:|---------|----------|
| Title | | | | |
| Body | | | | |
| Primary action | | | infinitive verb | |
| Secondary action | | | | |

## Do / Don't

> Concrete pairs. Each row is a reproducible decision an agent will face.

| Do | Don't |
|----|-------|
| | |
| | |

## Examples

| Scenario | Surface | Notes |
|----------|---------|-------|
| | | |

## Verification

> Every item MUST be measurable (yes/no) — no subjective adjectives. An agent should be able to check each against a built screen or a Figma node.

- [ ] Stack order matches the table — no extra elements, no reordering
- [ ] All required slots from the host component are filled or explicitly omitted with a documented reason
- [ ] Token paths used for every gap, type, and surface role listed in **Token bindings**
- [ ] No raw hex, px, or dp values in the implementation
- [ ] Copy fits the **Text slot rules** char limits in every locale (es_MX, es_AR, es_CO, pt_BR, en_US)
- [ ] All applicable **States** rendered (default + at minimum: loading or empty where the recipe can show one)
- [ ] Interactions defer to the host component spec — no recipe-level reinvention
- [ ] Accessibility traversal order matches the **Stack order** table top → bottom
- [ ] No conflict with another recipe on the same surface (see `conflicts_with`)
- [ ] Figma node referenced in frontmatter resolves and matches this stack

## Related specs

- <!-- Every host component in `composes` -->
- <!-- Every pattern in `requires` -->
- <!-- Tokens + content links -->

---
