---
name: spatial-rhythm
description: Vertical spacing logic between stacked elements — maps relationships (tight, related, bordered, unrelated, major-section) to the spacing/stack/* semantic tokens.
load: on-demand
source_of_truth: ../../../specs/tokens/spacing-tokens.md
---

# Spatial rhythm — foundation layer

Load this foundation when deciding **how much vertical space to put between two stacked elements**. Spacing is meaning: tight space says "these belong together," wide space says "these are separate." Inconsistent rhythm makes a screen feel sloppy even if every component is correct.

## Core rule — three relationships

Pick the spacing based on the **relationship** between the two elements, then resolve to a token. Never write raw `px` / `dp`.

| Relationship | Token | Value | When |
|--------------|-------|-------|------|
| **Unrelated sections** | `spacing/stack/3xl` | 48px | Two distinct conceptual sections on the same screen (e.g. "Your balance" → "Recent activity") |
| **Bordered component** | `spacing/stack/lg` | 24px | A component with its own border / surround separated from the next block (card, sheet, container) |
| **Related content** | `spacing/padding/sm` | 12px | Content with a direct relationship — heading + paragraph, label + value, related cards in a series |

All three values reference [`specs/tokens/spacing-tokens.md`](../../../specs/tokens/spacing-tokens.md). Use the token name, not the raw number, in Figma and in any spec body.

> **Note on the 12px tier.** The `spacing/stack/*` semantic scale jumps 8 → 16 → 24, so 12 is not a stack token. Reference `spacing/padding/sm` (12px) for the related-content tier above — it is the canonical 12px value in the system. The base equivalent is `spacing/150`, but base tokens should not be used directly.

## Decision flow

1. **Are these the same conceptual group with a direct relationship?** → `spacing/padding/sm` (12px)
2. **Does either element have its own visual container (border, background, card)?** → `spacing/stack/lg` (24px)
3. **Are these two separate conceptual sections?** → `spacing/stack/3xl` (48px)

If you can't decide between 12 and 24, the element probably needs a border. If you can't decide between 24 and 48, the two blocks probably belong in one container.

## Extended `spacing/stack/*` scale

For nuance beyond the three core tiers, the full vertical-stack semantic scale (from [`specs/tokens/spacing-tokens.md`](../../../specs/tokens/spacing-tokens.md)):

| Token | Value | Use for |
|-------|-------|---------|
| `spacing/stack/2xs` | 2px | Elements that read as one unit (label glued to amount) |
| `spacing/stack/xs` | 4px | Tight related stack (eyebrow over title) |
| `spacing/stack/sm` | 8px | Related content inside a row or card |
| `spacing/stack/base` | 16px | Items in the same conceptual group |
| `spacing/stack/lg` | 24px | **Bordered component** (core rule) |
| `spacing/stack/xl` | 32px | — |
| `spacing/stack/2xl` | 40px | — |
| `spacing/stack/3xl` | 48px | **Unrelated sections** (core rule) |
| `spacing/stack/4xl` | 80px | Major page-section breaks on long detail screens |

Reach for the extended values only when the three core tiers can't express the relationship. Default to 48 / 24 / 12.

## Component-provided spacing wins

Many MDS components define their own internal and external spacing in their `Token bindings` section. **Always check the component spec first** — if the component documents its spacing, use that and do not wrap it in extra padding.

Examples documented in `specs/`:

- `MDSBottomSheet` defines its own internal padding — see [`specs/components/bottom-sheet.md`](../../../specs/components/bottom-sheet.md)
- `MDSHeader` documents bottom margin to the next content block — see [`specs/components/header.md`](../../../specs/components/header.md)
- `MDSTabs` defines content-area top inset — see [`specs/components/tabs.md`](../../../specs/components/tabs.md)
- `bullet-points` pattern uses `spacing/stack/sm` (8px) between items — see [`specs/patterns/composition/bullet-points.md`](../../../specs/patterns/composition/bullet-points.md)

## Vertical padding

The stack tokens above cover **gaps between siblings**. The rules below cover **padding inside containers** (top/bottom).

### Section root containers

A "section" is a top-level frame on a screen (e.g. `topAssetsContainer`, `exploreCategoryContainer`). Each section:

- **`pt: 0`** — the first child is always a header (`screenHeader` or `sectionHeader`). The header owns its top whitespace; the section must not add `pt`.
- **`pb: spacing/padding/lg` (24px)** — standard bottom padding for a section, so adjacent sections sit flush and the rhythm comes from each section's own internal padding.

### Inner cards / surfaces

Any container with its own background, border, or corner radius (e.g. a `categoryContainer` with `bg-color/surface/default` + `rounded-[border/radius/600]`):

- **Vertical padding must be symmetric** — top equals bottom.
- Default: `spacing/padding/base` (16) both sides. Use `spacing/padding/lg` (24) for roomier cards.
- Asymmetric vertical padding on a card (e.g. `pt-[16px]` with no `pb-*`) is a bug — the last child will touch the bottom edge.

### Header → next content gap

| What follows the header | Gap | Token |
|---|---|---|
| Another MDSHeader (stacked headers, e.g. screenHeader → sectionHeader) | 4px | `spacing/stack/xs` |
| Any non-header content (list, card, grid, illustration, button) | 0 | — (header owns it) |
| `MDS ConfirmationHeader` → `MDS ReadOnlyList` row | 0 (gap is owned by ConfirmationHeader's 24px bottom) | `spacing/padding/lg` |

MDSHeader (all variants) ships its own bottom whitespace internally. Adding a stack gap below a header that's followed by non-header content double-counts the rhythm. Two stacked headers are the only case that needs an explicit 4px gap, so they read as two distinct titles instead of one ambiguous block.

**ConfirmationHeader → ReadOnlyList.** On confirmation screens, `MDS ConfirmationHeader` ships **24px (`spacing/padding/lg`)** of bottom whitespace before the `MDS ReadOnlyList` row that follows. The `MDS ReadOnlyList` row sits inside a wrapper with **16px (`spacing/padding/base`)** horizontal insets (the row does not own its gutter — see [Who owns the gutter](#who-owns-the-gutter)). The stack gap between the two components is **0** — the 24px is the header's internal bottom padding, not an external sibling gap. Do not add a wrapper `pt-*` or a stack gap below `MDS ConfirmationHeader`; that double-counts the rhythm.

### Content groupings inside a section

| Relationship | Token | Value |
|---|---|---|
| Between distinct content blocks in the same section (e.g. `SegmentedButton` → grid) | `spacing/stack/lg` | 24px |
| Rows inside a grid | `spacing/stack/base` | 16px |
| Items inside a list (`MDS CurrencyListItem`, `MDS TransactionalListItem`) | **0** — component owns vertical rhythm | none |
| Items inside a surface card **with accent/yield tags** (e.g. Rendimientos) | `list-item/spacing/between-stack` | 4px |
| Stacked headers (see above) | `spacing/stack/xs` | 4px |

### Bottom safe area below sticky CTAs

When a screen has bottom-anchored CTAs (e.g. `BottomCTAs`), reserve a **16px safe area** (`spacing/padding/base`) below the CTAs at the root of the screen. This is independent of OS safe-area insets — it's the design-system gutter between the last interactive element and the bottom edge.

## Horizontal rhythm

The table above is **vertical only**. Horizontal uses different scales:

- **Inline gaps between elements** → `spacing/inline/*` (4 / 8 / 12 / 16 / 24 / 32 / 40 / 48)
- **Internal component padding** → `spacing/padding/*` (2 / 4 / 8 / 12 / 16 / 24 / 32 / 40)
- **Screen horizontal inset (gutter)** → always `spacing/padding/base` (16px), consistent across the screen — never vary inset per section

### Who owns the gutter

The 16px screen edge inset can be owned by **the component itself** or by **a wrapper around it**, but never both (that would double to 32px). Match the component to the right pattern:

| Pattern | Components | How to render |
|---|---|---|
| **Component owns the gutter** (ships its own 16px horizontal padding) | `MDSAppBar`, `MDSHeader` (screenHeader & sectionHeader), `CurrencyListItem`, `BottomCTAs` | Place directly in the screen root — **do not** wrap in `px-*` |
| **Container owns the gutter** (component has no horizontal padding) | `MDS ReadOnlyList` and other card surfaces, `MDSIllustrationFullScreen` rows, raw lists | Wrap in a container with `px-[spacing/padding/base]` |

Both patterns produce the same visible 16px gutter on each edge — the difference is which layer declares it. The rule of thumb: if the component has a background, border, or any internal layout, it usually owns its gutter. If it's a layout-neutral content block (a card body, an image), the screen wraps it.

**Why this matters:** the two layers must agree on the same token (`spacing/padding/base`), so that header text and card edges sit on the same vertical line on each side of the screen. If they drift (e.g. component uses 16, wrapper uses 24), the eye sees the misalignment as a jog between sections even when each individual element looks fine.

### Horizontal collections (rows, scrollers, grids)

Any row of sibling items laid out horizontally — horizontal scrollers (featured assets, category cards), grids, segmented button rows — must declare its rhythm with **flex tokens**, never with positional offsets:

```
flex
px-[spacing/padding/base]   → 16  (screen edge inset)
gap-[spacing/inline/*]      → inter-item gap (xs / base / etc.)
```

Do **not** lay out items by their `x` coordinate (e.g. `x=16`, `x=122`, `x=236`). Positional placement:

- Has no token to grep for, so it disappears from audits
- Breaks the moment the screen width isn't 375
- Makes the rhythm emergent (an auditor seeing `x=16` can't tell if it's the gutter, an offset, or a bug)
- Won't survive a refactor to a real flex / list layout

Standard inline gaps for collections:

| Collection | Token | Value |
|---|---|---|
| Full-bleed scrollers (cards that fill most of the viewport, e.g. category cards) | `spacing/inline/xs` | 8px |
| Featured / stackable asset rows | `spacing/inline/xs` | 8px |
| Multi-column grids (3-col asset grid) | `spacing/inline/base` | 16px |

If a screen has multiple horizontal collections, **all of them must use the same pattern**. Mixing tokenized (`px-base` + `gap-inline/xs`) with positional (`x=16, x=122…`) on the same screen is the most common source of "rhythm jog" between sections.

## When to load this foundation

- Step 7 of the design process — adding vertical padding between sections
- Visual QA — checking spacing in an implementation against design intent
- Reviewing a screen that "feels off" without an obvious component issue
- Auditing a new component before promoting it from draft to ready

## Red flags

- Raw `px` / `dp` values in code or in Figma overrides — resolve to the token (`spacing/stack/3xl`, `spacing/stack/lg`, `spacing/padding/sm`)
- Same spacing value used for every gap on a screen — no rhythm
- Custom padding wrapped around a component that documents its own spacing
- `spacing/stack/lg` (24px) applied between two unrelated sections (should be `spacing/stack/3xl` / 48px) — makes them feel like one group
- `spacing/stack/3xl` (48px) applied inside one conceptual group — breaks the group apart
- Horizontal screen inset that changes between sections of the same screen
- Mixing the semantic `spacing/stack/*` scale with raw `spacing/{050,100,...}` base tokens — use the semantic tier
- Doubled gutter — a component that owns its horizontal padding wrapped in another `px-*` container (visible as 32px inset where the rest of the screen is 16px)
- Missing gutter — a card / list / illustration sitting flush to the screen edge because no wrapper provided `px-[spacing/padding/base]`
- Hardcoded `pt-[16px]` / `pb-[24px]` etc. on containers — resolve to `spacing/padding/*` tokens
- Asymmetric vertical padding on a card / surface (top ≠ bottom) — the last child will touch the bottom edge
- Section root with a non-zero `pt` — the first child should be a header that owns its top whitespace
- Non-zero stack gap below a header followed by non-header content — the layout is re-adding spacing the header already provides
- `gap` or `spacing/stack/*` token between `MDS CurrencyListItem` or `MDS TransactionalListItem` rows — these components own their vertical rhythm; external gap = 0 (exception: surface card + accent/yield tags → `list-item/spacing/between-stack` 4px)
- 0 gap between two stacked headers — they'll visually merge; should be `spacing/stack/xs` (4px)
- Wrapper that injects vertical padding only present in one section of a screen — usually means the buffer belongs inside the component, not the wrapper
- Horizontal collection laid out by `x` coordinate instead of `flex` + `px-[spacing/padding/base]` + `gap-[spacing/inline/*]` — positional placement is invisible to audits and breaks at any non-375 width
- Two horizontal collections on the same screen using different patterns (one tokenized, one positional) — pick one and apply it everywhere
