---
id: bottom-sheet
name: Bottom Sheet
category: component
platform: mobile
tier: organism
tags: [modal, overlay, sheet]
aliases: [MDSBottomSheet, bottom sheet]
status: ready
figma node: "10994:23790"
relationships:
  composes_with: [header, search-field]
  conflicts_with: [app-bar, tabs]
  substitutes: []
  requires: [pattern-bullet-points]
---

## Agent summary

- **MDSBottomSheet** — modal surface for **one focused task**; parent screen stays visible; **not** a full flow or non-dismissible gate (use a screen instead).
- **MUST** show a **handle**; dismiss + motion → **Interactions** · focus + AT → **Accessibility**.
- **MUST NOT** stack sheets; **MUST NOT** put [App Bar](./app-bar.md), [Tabs](./tabs.md), or `screenHeader` inside — use [Header](./header.md) `sectionHeader` / `subSection` only.
- **`BottomSheetView`:** scrim `color/overlay/scrim` + blur — see **Interactions** · **Token bindings**.
- Optional **`hasButtons`** → **MDS BottomCTAs** footer in library.
- Multi-point copy in sheets → **`bottomSheetTextBullets`** + [`bottomSheetTextBulletsSlot`](#bullet-lists-bottomsheettextbulletsslot) — **dot bullets only** per [Bullet points pattern](../patterns/bullet-points.md) (max 5 items).
- **Copy:** [`../content/index.md`](../content/index.md) · slot content rules below.

## Overview

Presents non-immersive content or a short task without leaving the current screen. Shown inside **`BottomSheetView`**: dimmed parent + sheet anchored to the bottom. Sheet height follows content up to **max ~719px** (~85% viewport); overflow scrolls in **`slot`**.

## Structure

**`BottomSheetView`** (screen wrapper): full-bleed **scrim** + **`MDSBottomSheet`** (anchored bottom, centered horizontally).

**`MDSBottomSheet`** properties: `hasButtons` · **`slot`** · **handle** · optional **MDS BottomCTAs** · **NativeNavigation**.

| Layer | Required | Notes |
|-------|----------|-------|
| **Scrim** | yes | Full viewport · `color/overlay/scrim` + **`backdrop-filter: blur(10px)`** on parent content; tappable to dismiss |
| **`MDSBottomSheet`** | yes | White surface · top radius · max-height · slides from bottom |
| `handle` | yes | 48×5px pill — drag + visual dismiss affordance |
| `slot` | yes | Scrollable when content exceeds max height |
| Bottom CTAs | optional | `hasButtons` |

**Layout:** sheet `color/background/default` · top corners `card/border/radius` · anchored bottom. [Header](./header.md) **`sectionHeader`** / **`subSection`** in `slot` only — not `screenHeader`.

Reference: [BottomSheetView with scrim](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=61344-1775) (`61344:1775`).

### Slot components (content)

| Slot component | Use |
|----------------|-----|
| `bottomSheetIconSlot` | Icon-led message |
| `bottomSheetTextBulletsSlot` | Non-interactive **dot bullet** list — see [Bullet lists](#bullet-lists-bottomsheettextbulletsslot) |
| `bottomSheetListItemSlot` | Selectable lists — see **list `variant`** |
| Custom | Illustration, inputs, etc. in `slot` |

### List `variant` (`bottomSheetListItemSlot` / `list`)

| `variant` | When |
|-----------|------|
| `default` | Standard list rows |
| `transactional` | Transaction-style rows |
| `radio` | Single-select options |
| `currency` | Currency / asset picker rows |

### Bullet lists (`bottomSheetTextBulletsSlot`)

MUST follow [Bullet points pattern](../patterns/bullet-points.md) (dot bullets variant). Sheet-specific stack only:

| | |
|--|--|
| Sheet pattern | **`bottomSheetTextBullets`** — optional illustration → `sectionHeader` → **`bottomSheetTextBulletsSlot`** → Bottom CTAs |
| vs list picks | Informational bullets only — selectable rows use **`bottomSheetListItemSlot`**, not this slot |
| vs plain body | 3+ parallel facts, restrictions, disclaimers → bullets; short copy → **`bottomSheetTextDefault`** |

Marker, count, spacing, copy, and a11y rules live in the **pattern** — do not duplicate here.

## Usage & behavior

### When to use

- One **simple, narrow** task or decision on the current screen.
- **Confirm actions** or **help / info** — prefer **`bottomSheetTextDefault`** (no illustration).
- **Multi-point explanations** (restrictions, disclaimers, 3+ parallel facts) — **`bottomSheetTextBullets`** + [`bottomSheetTextBulletsSlot`](#bullet-lists-bottomsheettextbulletsslot).
- Extra surface without a full navigation push.

### When NOT to use

- Multi-step flows, entire features, or **blocking** tasks the user cannot dismiss — use a **screen**.
- Stacked bottom sheets.
- [App Bar](./app-bar.md), **MDSTabs** (any variant), or **`screenHeader`** inside the sheet.

If the user **cannot** dismiss, **MUST NOT** use a bottom sheet.

### Reference patterns

> [Use cases](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=61304-26920)

| Pattern | Typical `slot` stack | When |
|---------|----------------------|------|
| **`bottomSheetTextDefault`** | **No illustration** — `sectionHeader` → body copy → Bottom CTAs | **Confirm actions** (approve, cancel, acknowledge) · **help / informational** copy |
| `bottomSheetText` | Illustration → `sectionHeader` → body copy → Bottom CTAs | Marketing, education, or emotional context that needs visual support |
| `bottomSheetTextBullets` | Illustration → `sectionHeader` → `bottomSheetTextBulletsSlot` → Bottom CTAs | Multi-point explanations — [dot bullets pattern](../patterns/bullet-points.md) |
| `bottomSheetItemList` | `bottomSheetListItemSlot` (list variant per task) | Pick one option from a list |
| `bottomSheetItemListSearch` | `sectionHeader` → [Search Field](./search-field.md) `list` → `bottomSheetListItemSlot` | Long or searchable lists |

**`bottomSheetTextDefault`** is the default text sheet in product: text-forward, no hero illustration — prefer it for confirmations and help unless an illustration is required.

## Interactions

| Interaction | Behavior | Notes |
|-------------|----------|-------|
| **Open** | Scrim fades in + `blur(10px)`; sheet slides up from bottom | iOS-style spring — not instant |
| **Close** | Scrim fades out; sheet slides down | Interruptible mid-animation |
| **Drag handle** | Sheet tracks finger; scrim fades with offset; release past threshold → dismiss | Handle always visible |
| **Tap scrim** | Dismisses sheet | Required |
| **CTA close** | Completes task and dismisses | When applicable |
| **Scroll** | Vertical scroll inside **`slot`** when content exceeds max height | Parent screen stays mounted |
| **Dismissal rule** | User MUST be able to dismiss via handle, scrim, or close CTA | If not dismissible → use a screen |

Prefer system-consistent spring timing/easing (UIKit sheet curve) — see [`../tokens/motion-tokens.md`](../tokens/motion-tokens.md) when defined.

## Accessibility

> **Mobile** — VoiceOver · TalkBack. Copy → [`../content/guidelines/accessibility.md`](../content/guidelines/accessibility.md) · [`../content/index.md`](../content/index.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | Modal sheet — iOS `accessibilityViewIsModal` / Android blocks accessibility focus behind sheet |
| Focus & traversal | On open: VoiceOver / TalkBack land in sheet first; focus stays in sheet until dismiss; background not traversable |
| Labels & announcements | Post-announce sheet on open (e.g. bottom sheet); handle has dismiss label + hint; primary CTA labeled |
| Touch & gestures | Handle + scrim + close CTA meet min touch targets; provide accessibility custom action or equivalent for dismiss if drag-only path exists |
| Bullet lists | Per [pattern — Accessibility](../patterns/bullet-points.md#accessibility) |

## Design intent

Sheets keep context on the parent screen while focusing one decision. The handle signals modularity and escape; max height + internal scroll prevent taking over the full viewport unless content truly needs it.

## Token bindings

> [`../tokens/token-reference.md`](../tokens/token-reference.md)

| Role | Token path |
|------|------------|
| Scrim fill | `color/overlay/scrim` |
| Scrim backdrop | `backdrop-filter: blur(10px)` — blurs content behind scrim |
| Sheet surface | `color/background/default` |
| Top radius | `card/border/radius` |
| Handle | `color/border/default` · 48×5 · full pill radius |
| Handle row padding | `padding/xs` top · `padding/base` horizontal · `padding/lg` bottom |
| Slot area | Component / scroll container tokens |
| Max height | ~719px (library) — ~85% viewport cap |

Bullet spacing → [bullet-points pattern](../patterns/bullet-points.md#token-bindings).

## Text slot rules

> Voice, tone, locale → [`../content/index.md`](../content/index.md).

| Slot | Rules |
|------|--------|
| Sheet title | In `sectionHeader` (or sheet chrome) — sentence case; short |
| Body (plain) | Short paragraphs — `bottomSheetTextDefault` / `bottomSheetText` |
| Bullet items (`bottomSheetTextBulletsSlot`) | [pattern](../patterns/bullet-points.md#text-slot-rules) + [`bullets.md`](../content/guidelines/bullets.md) |
| CTA labels | Per button / Bottom CTAs spec |

## Verification

- [ ] Usage & behavior: correct pattern; not dismiss-locked; no App Bar / Tabs / `screenHeader` in sheet; not stacked.
- [ ] Interactions: scrim + blur; iOS slide/fade; dismiss via handle, scrim, or CTA; scroll in `slot`.
- [ ] Accessibility: role, focus trap, handle labeled.
- [ ] Bullet sheets: dot markers only · ≤5 items · pattern spacing; not arrow list in sheet.
- [ ] Tokens · list `variant` · `hasButtons` · library not detached.

## Related specs

- [`app-bar.md`](./app-bar.md) · [`header.md`](./header.md) · [`tabs.md`](./tabs.md)
- [`../patterns/bullet-points.md`](../patterns/bullet-points.md) — dot bullets in sheets
- [`../content/index.md`](../content/index.md) · [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md)

---

## Figma & library (optional)

- Catalog: BottomSheet `11381:30960` in [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md)
- Workstream: [Juan MDS BottomSheet](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=15726-83880) — `MDSBottomSheet` `10994:23790` in frontmatter
- References: [BottomSheetView + scrim](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=61344-1775) · [use cases](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=61304-26920) · list `16971:115344`
