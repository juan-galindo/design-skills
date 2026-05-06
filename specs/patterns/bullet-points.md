---
id: pattern-bullet-points
name: Bullet Points
category: pattern
platform: mobile
tags: [list, arrow, dot, bullet]
status: ready
figma node: "2255:3032"
---

## What it is

Two patterns for presenting non-interactive, scannable lists on mobile. Each uses a distinct marker type that signals context and surface:

| Pattern | Marker | Surface |
|---------|--------|---------|
| Arrow list | `→` icon | Full-screen layouts |
| Dot bullets | `•` | Bottom sheets / modals |

---

## Arrow list

### When to use

- Sequential steps, onboarding flows, or feature discovery on full-screen layouts
- Paired with a clear CTA button that continues the flow

### When NOT to use

- Inside bottom sheets or modals — arrows read as tappable in constrained surfaces
- For unordered facts, restrictions, or disclaimers — use dot bullets instead

### Component

Use `MDS ListItem` (Default / ReadOnly state) with a prefix icon set to the arrow icon (`arrow_forward` or equivalent directional arrow from MDS icon set).

## Dot bullets

### When to use

- Restrictions, disclaimers, or feature limitations in constrained surfaces
- Non-tappable informational lists inside bottom sheets or modals
- Short items (1–2 lines maximum per bullet)

### When NOT to use

- On full-screen layouts or navigation lists — use arrow list instead
- When items exceed 5 — restructure the content instead

### Component

Rendered inside `MDS BottomSheet`. The dot marker is a typographic bullet (`•`) inline with body text, not a separate icon component.

## Good practices (both patterns)

### One marker type per list
Never mix dots and arrows within the same list. Each list must use a single marker type. Mixing implies a hierarchy or item-type difference that doesn't exist.

### Markers are never tappable
Markers are decorative. They must never be wrapped in a touchable area or respond to taps independently. If a row needs to be tappable, the entire row is the touch target.

### Marker aligns to the cap-height of the first line
When an item wraps to multiple lines, the marker sits at the cap-height of the first line — never vertically centered to the full text block.

### Keep lists short (max 5 items)
More than 5 items signals the content needs restructuring. Group under subheadings or split into separate sections if more items are genuinely needed.

### Each item is self-contained
One complete idea per item. If an item needs a follow-up explanation, it belongs in body text — not as a sub-item or continuation.

### Use consistent grammatical structure
All items must follow the same grammatical pattern (e.g., all start with a verb, or all are noun phrases). Inconsistent structure makes lists harder to scan.

### Spacing — the half-rule
| Gap | Token | Light Bitso | Dark Bitso | Source |
|-----|-------|-------------|------------|--------|
| Between list items | `spacing/stack/sm` | 8px | 8px | [spacing-tokens](../tokens/spacing-tokens.md) |
| Between list block and surrounding elements | `spacing/padding/base` | 16px | 16px | [spacing-tokens](../tokens/spacing-tokens.md) |

---

## Related specs

- [`specs/components/list-item.md`](../components/list-item.md)
- [`specs/components/bottom-sheet.md`](../components/bottom-sheet.md)
- [`specs/tokens/spacing-tokens.md`](../tokens/spacing-tokens.md)
- [`specs/tokens/typography-tokens.md`](../tokens/typography-tokens.md)
