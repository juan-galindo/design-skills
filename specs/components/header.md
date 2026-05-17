---
id: header
name: Header
category: component
platform: mobile
tier: molecule
tags: [hierarchy, title, typography]
aliases: [MDSHeader, screenHeader, sectionHeader, subSection]
status: ready
figma node: "12437:37208"
relationships:
  composes_with: [app-bar, tabs, bottom-sheet]
  conflicts_with: []
  substitutes: []
  requires: []
---

## Agent summary

- **MDSHeader** — `variant`: `screenHeader` · `sectionHeader` · `subSection` · `background` (`default` | `accent`, **`screenHeader` only**).
- **`screenHeader`:** one per screen, flush below [App Bar](./app-bar.md), no gap — screen title. **MUST** on `backButton`; **MUST NOT** on `global` + `accent` or in [bottom-sheet](./bottom-sheet.md).
- **`sectionHeader` / `subSection`:** MAY use in bottom sheets (section first); hierarchy `screenHeader` → `sectionHeader` → `subSection` — no skipped levels.
- **`hasIcon`:** only on asset detail (crypto, stablecoin, fiat, stock). **`hasTag1` / `hasTag2`:** `screenHeader` only — nested **MDS Tag** labels.
- **`hasTrailingContent`:** `sectionHeader` only — nested **`trailingContent`** `type`: `dropdown` · `textButton`.
- **Copy:** [`../content/index.md`](../content/index.md) · Text slot rules below.

## Overview

**MDSHeader** labels pages and content groups for scanning — not decorative text, CTAs, or inline emphasis.

## Structure

**MDSHeader** properties (component set `12437:37208`):

| Property | Type | Values / notes |
|----------|------|----------------|
| `variant` | variant | `screenHeader` · `sectionHeader` · `subSection` |
| `background` | variant | `default` · `accent` — **`screenHeader` only** |
| `header` | text | Title for all variants |
| `description` | text | Body copy when `hasDescription=true` |
| `hasDescription` | boolean | Shows `description` layer |
| `hasIcon` | boolean | Leading icon — **`screenHeader` only** |
| `hasTag1` | boolean | First tag — **`screenHeader` only** |
| `hasTag2` | boolean | Second tag — **`screenHeader` only**; use with `hasTag1` |
| `hasArrow` | boolean | Chevron on title row — **`sectionHeader`** · **`subSection`** |
| `hasTopBorder` | boolean | Top divider — **`sectionHeader` only** |
| `hasTrailingContent` | boolean | Trailing slot — **`sectionHeader` only** |

**Nested `trailingContent`** (instance, `41675:31040` — visible when `hasTrailingContent=true`):

| Property | Type | Values |
|----------|------|--------|
| `type` | variant | `dropdown` · `textButton` |

Tag copy is set on nested **MDS Tag** instances (not top-level `MDSHeader` text props).

| `variant` | When | Enable when needed | ~height |
|-----------|------|-------------------|---------|
| `screenHeader` | Screen title under App Bar | `hasIcon` (asset detail) · `hasTag1` · `hasTag2` · `hasDescription` | 108px |
| `screenHeader` + `accent` | Library only — **MUST NOT** on `global` + `accent` screens | same | 108px |
| `sectionHeader` | Major blocks; first header in sheets | `hasTopBorder` · `hasArrow` · `hasTrailingContent` · `hasDescription` | 96px |
| `subSection` | Nested under section | `hasArrow` · `hasDescription` | 60px |

**Hierarchy:** `screenHeader` → `sectionHeader` → `subSection`. Exception: first header MAY be `sectionHeader` when [Tabs](./tabs.md) replace a visible screen title.

## Usage & behavior

### When to use

- Label a screen (`screenHeader`), a major block (`sectionHeader`), or a nested group (`subSection`).
- First header in a [bottom-sheet](./bottom-sheet.md) MAY be `sectionHeader` (no `screenHeader`).

### When NOT to use

- Header styles for body text, inline emphasis, or primary CTAs.
- **`subSection`** directly under **`screenHeader`** (use **`sectionHeader`** between).
- Stacked headers with no content between them.

### Composition

| App Bar | `screenHeader` |
|---------|----------------|
| `backButton` | Yes |
| `global` + `accent` | No |
| `global` / home | Typically no |
| `default` | Yes if screen needs a title |

**MDSAppBar** → **`screenHeader`**? → content. Sheets: **`sectionHeader`** → content (no App Bar, no `screenHeader`).

## Interactions

| Interaction | Behavior | Notes |
|-------------|----------|-------|
| `hasArrow` | Row is tappable — navigates to detail / drill-down | `sectionHeader` · `subSection` |
| `hasTrailingContent` + `dropdown` | Opens filter/sort/scope menu | `sectionHeader` only |
| `hasTrailingContent` + `textButton` | Secondary row action | `sectionHeader` only |
| `hasIcon` | Asset detail screens only | Crypto, stablecoin, fiat, stock |
| Static display | `header` + optional `description` | No interaction when arrow/trailing off |

## Accessibility

> **Mobile** — VoiceOver · TalkBack · Dynamic Type. Copy → [`../content/guidelines/accessibility.md`](../content/guidelines/accessibility.md) · [`../content/index.md`](../content/index.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | `screenHeader` → header trait (iOS) / heading (Android); `sectionHeader` / `subSection` → nested headers — no skipped levels |
| Focus & traversal | Tappable rows (`hasArrow`, trailing) in natural reading order; double-tap activates |
| Labels & announcements | `header` = label; `description` = hint/value — MUST NOT repeat `header` verbatim; trailing controls have distinct labels |
| Touch & gestures | Tappable row + trailing hit areas ≥ 44×44 pt / 48×48 dp; `hasArrow` rows announce as navigable (button/link trait) |

## Design intent

App Bar navigates; **`screenHeader`** names the screen. Section levels structure content. Chevron implies drill-down on a tappable row — not a button in the title slot.

## Token bindings

> [`../tokens/token-reference.md`](../tokens/token-reference.md)

| Role | Token path | `variant` |
|------|------------|-----------|
| Screen title | `title/base` | `screenHeader` · `header` |
| Screen description | `body/base` | `screenHeader` · `description` |
| Section title | `subheading/base` | `sectionHeader` · `header` |
| Section description / trailing label | `body/base` / `tiny/base-bold` | `sectionHeader` |
| Sub-section title / description | `body/base-medium` / `body/small` | `subSection` |
| Accent text | on-accent semantic | `screenHeader` + `accent` |

## Text slot rules

> Voice, tone, locale → [`../content/index.md`](../content/index.md).

| Slot | Max length | Rules |
|------|------------|-------|
| `header` · `screenHeader` | 1–4 words | Sentence case |
| `header` · section levels | Short phrase | Sentence case; labels content below |
| `description` | ~80 chars | Only if `hasDescription`; MUST NOT repeat `header` |
| MDS Tag labels | Short each | `hasTag1` / `hasTag2` on `screenHeader` — distinct context per tag |

MUST NOT duplicate screen title in App Bar and **`screenHeader`**.

## Verification

- [ ] Usage & behavior: variant/context; hierarchy; not stacked without content between.
- [ ] All **MDSHeader** props match Figma: `header` · `description` · `hasDescription` · `hasIcon` · `hasTag1` · `hasTag2` · `hasArrow` · `hasTopBorder` · `hasTrailingContent` · `variant` · `background`.
- [ ] `hasTrailingContent` → nested `trailingContent` `type` is `dropdown` or `textButton` only.
- [ ] Interactions: arrow/trailing only on `sectionHeader` where specified; `hasIcon` asset-detail only.
- [ ] Accessibility: heading levels; no duplicate title with App Bar.
- [ ] Tokens · text slots · library not detached.

## Related specs

- [`app-bar.md`](./app-bar.md) · [`tabs.md`](./tabs.md) · [`bottom-sheet.md`](./bottom-sheet.md)
- [`../content/index.md`](../content/index.md) · [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md)

---
