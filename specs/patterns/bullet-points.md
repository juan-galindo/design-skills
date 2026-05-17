---
id: pattern-bullet-points
name: Bullet Points
category: pattern
platform: mobile
tags: [list, arrow, dot, bullet]
aliases: [bullet list, dot bullets, arrow list]
status: ready
figma node: "2255:3032"
relationships:
  applies_to: [bottom-sheet]
  conflicts_with: []
  requires: []
---

## Agent summary

- Two **non-interactive** list markers on mobile — **never mix** in one list.
- **Dot bullets (`•`):** [bottom-sheet](../components/bottom-sheet.md) only — slot **`bottomSheetTextBulletsSlot`** · sheet pattern **`bottomSheetTextBullets`**.
- **Arrow list (`→`):** full-screen only — **`MDS ListItem`** ReadOnly + prefix icon · **MUST NOT** in sheets/modals.
- Max **5** items · 1–2 lines each · markers **never tappable**.
- **Copy:** [`../content/guidelines/bullets.md`](../content/guidelines/bullets.md) · Text slot rules below.

## Overview

Scannable, informational lists where items are peers — not navigation, filters, or [bottom-sheet list picks](../components/bottom-sheet.md#list-variant-bottomsheetlistitemslot--list). Marker choice signals **surface**: constrained modal/sheet → dots; full screen → arrows.

## Structure

| Variant | Marker | Host | Surface |
|---------|--------|------|---------|
| **Dot bullets** | Typographic `•` inline with body | `bottomSheetTextBulletsSlot` in **MDSBottomSheet** | Bottom sheets · modals |
| **Arrow list** | `arrow_forward` (or equivalent) prefix on **MDS ListItem** | ReadOnly / Default list row | Full-screen layouts |

**Not this pattern:** `bottomSheetListItemSlot` — selectable rows (`radio`, `currency`, etc.) — see [bottom-sheet](../components/bottom-sheet.md).

### Dot bullets — sheet stack

Per [bottom-sheet — Bullet lists](../components/bottom-sheet.md#bullet-lists-bottomsheettextbulletsslot):

`bottomSheetTextBullets` → optional illustration → [Header](../components/header.md) `sectionHeader` → **`bottomSheetTextBulletsSlot`** → optional Bottom CTAs.

### Arrow list — screen stack

Typically below [App Bar](../components/app-bar.md) / [Header](../components/header.md): informational rows with arrow prefix + optional screen CTA. Rows are **not** sheet list picks.

## Usage & behavior

### Dot bullets — When to use

- Restrictions, disclaimers, feature limits, or **3+** parallel facts in a [bottom-sheet](../components/bottom-sheet.md).
- Non-tappable copy inside sheets/modals.

### Dot bullets — When NOT to use

- Full-screen layouts or navigation — use **arrow list** or tappable **ListItem** instead.
- More than **5** items — restructure (subheadings, body copy, or multiple blocks).
- Tappable / selectable options — use `bottomSheetListItemSlot`, not this pattern.
- Inside sheets when a single short paragraph suffices — prefer **`bottomSheetTextDefault`**.

### Arrow list — When to use

- Sequential steps, onboarding, or feature discovery on **full-screen** layouts.
- Paired with a clear primary CTA that continues the flow.

### Arrow list — When NOT to use

- Inside [bottom-sheet](../components/bottom-sheet.md) or modals — arrows read as tappable in constrained surfaces.
- Unordered facts, restrictions, disclaimers — use **dot bullets** instead.
- Selectable lists — use interactive **ListItem** / sheet list slot.

### Shared rules (both variants)

| Rule | Requirement |
|------|-------------|
| One marker per list | MUST NOT mix `•` and `→` in the same list |
| Markers | Decorative only — MUST NOT be separate touch targets |
| Line wrap | Marker at **cap-height of first line** — not vertically centered on multi-line blocks |
| Items | One complete idea each; consistent grammar across items |
| Length | 1–2 lines per item; max **5** items |

## Interactions

N/A — static informational lists. If a row must be tappable, use **MDS ListItem** (arrow or default) or `bottomSheetListItemSlot` — not dot bullets.

## Accessibility

> **Mobile** — VoiceOver · TalkBack. Copy → [`../content/guidelines/accessibility.md`](../content/guidelines/accessibility.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | Static list — not buttons; dot variant: items are list text, not separate controls |
| Focus & traversal | One focus stop per item (full row text); marker not independently focusable |
| Labels & announcements | Item text = label; no “button” or “link” trait on non-interactive bullets |
| Touch & gestures | No touch handling on markers; arrow/dot rows MUST NOT look like sheet **list picks** unless using list-item component |

## Design intent

Dots avoid false affordance in tight sheet surfaces. Arrows suggest forward flow on full screens where rows may still be read-only. Selectable sheet content uses list-item slots, not bullet markers.

## Token bindings

> [`../tokens/token-reference.md`](../tokens/token-reference.md) — no raw hex in specs.

| Role | Token path | Variant |
|------|------------|---------|
| Gap between items | `spacing/stack/sm` | both |
| Block margin (list ↔ surrounding content) | `spacing/padding/base` | both |
| Body text | `body/base` (or slot typography from host component) | dot bullets in sheet |

## Text slot rules

> Period and phrasing → [`../content/guidelines/bullets.md`](../content/guidelines/bullets.md) · voice → [`../content/index.md`](../content/index.md).

| Slot | Rules |
|------|--------|
| Bullet item | 1–2 lines · max 5 items · same grammatical pattern across items |
| Punctuation | Period when item is a complete sentence with conjugated verb; omit for phrases / infinitives |

## Verification

- [ ] Correct variant for surface (dots in sheet · arrows on screen only).
- [ ] ≤5 items; single marker type; markers not tappable.
- [ ] Cap-height alignment on wrap; token spacing applied.
- [ ] Not confused with `bottomSheetListItemSlot` selectable lists.

## Related specs

- [`../components/bottom-sheet.md`](../components/bottom-sheet.md) — `bottomSheetTextBulletsSlot` · sheet patterns
- [`../components/header.md`](../components/header.md) — `sectionHeader` above bullet block in sheets
- [`../content/guidelines/bullets.md`](../content/guidelines/bullets.md)
- [`../tokens/spacing-tokens.md`](../tokens/spacing-tokens.md) · [`../tokens/typography-tokens.md`](../tokens/typography-tokens.md)
- [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md) — List Item

---
