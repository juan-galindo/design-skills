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
  composes_with: [header]
  conflicts_with: [app-bar, tabs, search-field]
  substitutes: []
  requires: [pattern-bullet-points]
---

## Agent summary

- **MDSBottomSheet** — modal surface for **one focused task**; parent screen stays visible; **not** a full flow or non-dismissible gate (use a screen instead).
- **MUST** show a **handle**; dismiss + motion → **Interactions** · focus + AT → **Accessibility**.
- **MUST NOT** stack sheets; **MUST NOT** put [App Bar](./app-bar.md), [Tabs](./tabs.md), [Search Field](./search-field.md), or `screenHeader` inside — use [Header](./header.md) `sectionHeader` / `subSection` only.
- **`BottomSheetView`:** scrim `color/overlay/scrim` + blur — see **Interactions** · **Token bindings**.
- **`hasButtons`** on **`MDSBottomSheet`** — `true` for text / confirm sheets · **`false`** for **`bottomSheetItemList`** (row tap selects).
- **`bottomSheetListItemSlot`** — nested **`list`** `variant` + optional **`hasInfoPanel`** — see [Structure](#structure) · [Props to avoid](#props-to-avoid).
- Multi-point copy in sheets → **`bottomSheetTextBullets`** + [`bottomSheetTextBulletsSlot`](#bullet-lists-bottomsheettextbulletsslot) — **dot bullets only** per [Bullet points pattern](../patterns/composition/bullet-points.md) (max 5 items).
- **Copy:** [`../content/index.md`](../content/index.md) · slot content rules below.

## Overview

Presents non-immersive content or a short task without leaving the current screen. Shown inside **`BottomSheetView`**: dimmed parent + sheet anchored to the bottom. Sheet height follows content up to **max ~719px** (~85% viewport); overflow scrolls in **`slot`**.

## Structure

**`BottomSheetView`** (screen wrapper): full-bleed **scrim** + **`MDSBottomSheet`** (anchored bottom, centered horizontally).

**`MDSBottomSheet`** properties:

| Property | Type | Values / notes |
|----------|------|----------------|
| `hasButtons` | boolean | **`true`** — **MDS BottomCTAs** in footer (`bottomSheetTextDefault` · `bottomSheetText` · `bottomSheetTextBullets`) · **`false`** — `bottomSheetItemList` (row tap completes; Figma hides footer CTAs) |
| `slot` | instance | Scrollable content — [slot components](#slot-components-content) · **handle** + **NativeNavigation** are fixed chrome |

| Layer | Required | Notes |
|-------|----------|-------|
| **Scrim** | yes | Full viewport · `color/overlay/scrim` + **`backdrop-filter: blur(10px)`** on parent content; tappable to dismiss |
| **`MDSBottomSheet`** | yes | White surface · top radius · max-height · slides from bottom |
| `handle` | yes | 48×5px pill — drag + visual dismiss affordance |
| `slot` | yes | Scrollable when content exceeds max height |
| Bottom CTAs | optional | `hasButtons` |

**Layout:** sheet `color/background/default` · top corners `card/border/radius` · anchored bottom. [Header](./header.md) **`sectionHeader`** / **`subSection`** in `slot` only — not `screenHeader`.

Reference: [BottomSheet [References]](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=61304-26920) — [BottomSheetView + scrim](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=61344-1775) (`61344:1775`, child of references).

### Slot components (content)

| Slot component | Use |
|----------------|-----|
| `bottomSheetIconSlot` | Icon-led message |
| `bottomSheetTextBulletsSlot` | Non-interactive **dot bullet** list — see [Bullet lists](#bullet-lists-bottomsheettextbulletsslot) |
| `bottomSheetListItemSlot` | Selectable lists — [properties](#bottomsheetlistitemslot-properties) |
| Custom | Illustration, inputs, etc. in `slot` |

### `bottomSheetListItemSlot` properties

Canonical slot: [`bottomSheetListItemSlot`](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=16796-78595) (`16796:78595`).

| Property | Type | Values / notes |
|----------|------|----------------|
| `hasInfoPanel` | boolean | **`false`** (default) — optional **MDSInfoPanel** (warning) stacked above the list · **`true`** only for substantive status / disclaimer copy |

**Nested `list`** (component set `16971:115344` — [variant grid](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=16971-115344)):

| `variant` | Row component | When |
|-----------|---------------|------|
| `default` | Standard list rows | Generic selectable options |
| `transactional` | Transaction-style rows | Movements, receipts, activity history |
| `radio` | **MDS RadioListItem** | Single-select among labeled options (no asset chrome) |
| `currency` | **MDS CurrencyListItem** | Asset / currency picker (ticker, price, change) |

### Props to avoid

| Prop / combination | MUST NOT |
|--------------------|----------|
| `hasButtons=true` | On **`bottomSheetItemList`** — selection is row tap; footer CTAs duplicate the task or steal scroll space |
| `hasButtons=false` | On **`bottomSheetTextDefault`** · **`bottomSheetText`** · **`bottomSheetTextBullets`** when the flow needs explicit primary / secondary actions |
| `hasInfoPanel=true` | For decoration, marketing, or redundant body copy — warning / info panel only |
| `list` `variant=currency` | Rows without asset semantics (no ticker / price / change) |
| `list` `variant=radio` | Multi-select · asset pickers (use `currency`) |
| `list` `variant=transactional` | Static settings lists · asset pickers |
| Any `list` `variant` + search | [Search Field](./search-field.md) in `slot` — use parent-screen **global search** instead |
| Wrong row template | Mixing row types inside one `list` instance — pick one `variant` per sheet |

### Bullet lists (`bottomSheetTextBulletsSlot`)

MUST follow [Bullet points pattern](../patterns/composition/bullet-points.md) (dot bullets variant). Sheet-specific stack only:

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
- [App Bar](./app-bar.md), **MDSTabs** (any variant), **`screenHeader`**, or **[Search Field](./search-field.md)** / search bar inside the sheet.
- Long lists that need search → **`bottomSheetItemList`** with scroll only, or dismiss and open **global search** on the parent screen — **MUST NOT** embed a search field in the sheet.
- **Transaction confirmation steps** (buy, sell, convert, send, withdraw, deposit) that show a price breakdown (`MDS ConfirmationHeader` + `MDS ReadOnlyList`) and ask the user to commit — use the full-screen [Confirmation Screen](../patterns/layouts/confirmation-screen.md) instead. Bottom sheets are appropriate for **forced informational interruptions** that precede the confirmation (e.g. pattern day trader warning, regulatory notice, risk disclosure) — not for the commit step itself.

If the user **cannot** dismiss, **MUST NOT** use a bottom sheet.

### Reference patterns

Canonical Figma board: **[BottomSheet [References]](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=61304-26920)** (`61304:26920`).

| Pattern | Typical `slot` stack | When | Figma instance |
|---------|----------------------|------|----------------|
| **`bottomSheetTextDefault`** | **No illustration** — `sectionHeader` → body copy → Bottom CTAs | **Confirm actions** (approve, cancel, acknowledge) · **help / informational** copy | Spec-only — omit illustration from [`bottomSheetText`](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=61304-21219) · `hasButtons=true` |
| [`bottomSheetText`](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=61304-21219) | Illustration → `sectionHeader` → body copy → Bottom CTAs | Marketing, education, or emotional context that needs visual support | `61304:21219` · `hasButtons=true` |
| [`bottomSheetTextBullets`](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=61304-19586) | Illustration → `sectionHeader` → `bottomSheetTextBulletsSlot` → Bottom CTAs | Multi-point explanations — [dot bullets pattern](../patterns/composition/bullet-points.md) | `61304:19586` · `hasButtons=true` |
| [`bottomSheetItemList`](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=61304-25287) | `sectionHeader` (optional) → `bottomSheetListItemSlot` (scroll in `slot`) | Pick one option · long lists · **no** [Search Field](./search-field.md) | `61304:25287` · `hasButtons=false` · `list` `variant` per task · `61304:4913` (header + list — legacy name `bottomSheetItemListSearch`, **no search field**) |

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
| Bullet lists | Per [pattern — Accessibility](../patterns/composition/bullet-points.md#accessibility) |

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

Bullet spacing → [bullet-points pattern](../patterns/composition/bullet-points.md#token-bindings).

## Text slot rules

> Voice, tone, locale → [`../content/index.md`](../content/index.md).

| Slot | Rules |
|------|--------|
| Sheet title | In `sectionHeader` (or sheet chrome) — sentence case; short |
| Body (plain) | Short paragraphs — `bottomSheetTextDefault` / `bottomSheetText` |
| Bullet items (`bottomSheetTextBulletsSlot`) | [pattern](../patterns/composition/bullet-points.md#text-slot-rules) + [`bullets.md`](../content/guidelines/bullets.md) |
| CTA labels | Per button / Bottom CTAs spec |

## Verification

- [ ] Usage & behavior: correct pattern; not dismiss-locked; no App Bar / Tabs / Search Field / `screenHeader` in sheet; not stacked.
- [ ] Interactions: scrim + blur; iOS slide/fade; dismiss via handle, scrim, or CTA; scroll in `slot`.
- [ ] Accessibility: role, focus trap, handle labeled.
- [ ] Bullet sheets: dot markers only · ≤5 items · pattern spacing; not arrow list in sheet.
- [ ] Props match Figma: `hasButtons` per pattern · `bottomSheetListItemSlot` `hasInfoPanel` only when needed · one `list` `variant` per sheet ([Props to avoid](#props-to-avoid)).
- [ ] Tokens · library not detached.

## Related specs

- [`app-bar.md`](./app-bar.md) · [`header.md`](./header.md) · [`tabs.md`](./tabs.md)
- [`../patterns/composition/bullet-points.md`](../patterns/composition/bullet-points.md) — dot bullets in sheets
- [`../content/index.md`](../content/index.md) · [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md)

---

## Figma & library (optional)

- **File:** [Juan — MDS BottomSheet](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet)
- **Reference patterns (canonical):** [BottomSheet [References]](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=61304-26920) (`61304:26920`) — see [Reference patterns](#reference-patterns) for per-instance nodes
- **BottomSheetView + scrim:** [BottomSheetScreen](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=61344-1775) (`61344:1775`, inside references board)
- **`bottomSheetListItemSlot`:** [`16796:78595`](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=16796-78595) — `hasInfoPanel` · nested **`list`**
- **`list` variants:** [`16971:115344`](https://www.figma.com/design/kV7w4lzYz6xDsJkl1Ro6CW/-Juan----MDSBottomSheet?node-id=16971-115344) — `default` · `transactional` · `radio` · `currency`
- **Catalog:** BottomSheet `11381:30960` in [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md)
- **Component (`figma node` in frontmatter):** `MDSBottomSheet` `10994:23790`
