---
id: tabs
name: Tabs
category: component
platform: mobile
tier: molecule
tags: [navigation, content, sections]
aliases: [MDSTabs, tab bar]
status: ready
figma node: "58590:525"
relationships:
  composes_with: [app-bar, header]
  conflicts_with: [bottom-sheet]
  substitutes: []
  requires: []
---

## Agent summary

- **MDSTabs** — **2–5** peer sections (not a stepper); one active panel; tap tab or swipe content to switch.
- **`variant`:** **Markets** + `global` → `fill` · **Portfolio** + `global` → `default` · **other screens** + `backButton` → `default`.
- **Tab `state`:** `focus` = selected (one only) · `default` = inactive · `disabled` = unavailable.
- **MUST NOT** use **MDSTabs** (any `variant`: `fill` or `default`) inside [bottom-sheet](./bottom-sheet.md) — screen-level only.
- **MUST NOT** use as filters (Chips), app nav (Bottom Navigation), or stacked tab rows.
- Tab: icon + label (`hasIconLeading`); `hasPulsingDot` only for new/unread.
- **Copy:** [`../content/index.md`](../content/index.md) · Text slot rules below.

## Overview

**MDSTabs** switches between related sections on one screen. Tabs are peers at the same level — not sequential steps. Each panel is self-contained.

## Structure

**MDSTabs** properties: `variant` (`fill` | `default`) · `hasTab3` · `hasTab4` · `hasTab5` (show 3rd–5th tab slots).

**`tab`** item properties: `label` · `state` · `hasIconLeading` · `hasPulsingDot`.

| `variant` | Layout | When |
|-----------|--------|------|
| `fill` | Equal width per tab (`flex` fill) | **Markets** screen; short labels; **2–3** tabs |
| `default` | Intrinsic width; scroll; `gap` `inline/lg` (24px) | **Portfolio**; any **`backButton`** screen with tabs; up to **5** tabs |

Row height: **36px**. Rubber-band at scroll ends on `default`.

| `tab` `state` | Visual |
|---------------|--------|
| `focus` | Selected — `body/small-medium`, tertiary underline (2px) |
| `default` | Inactive — `body/small`, light border (1px) |
| `disabled` | Unavailable — non-interactive |

Only one tab MAY be `focus` at a time.

## Usage & behavior

### When to use

- **2–5** equally important sections on one screen.
- MAY be primary in-content nav when [Header](./header.md) uses `sectionHeader` first (parallel groups).
- MAY pin below [App Bar](./app-bar.md) (content scrolls under tabs) or scroll with page.

### When NOT to use

- One section; **any tabs in a bottom sheet** (`fill` or `default`); filters (Chips); steppers; comparing across tabs; Bottom Navigation; nested tab rows.

### Composition

| Screen | App Bar | **MDSTabs** `variant` | Stack |
|--------|---------|------------------------|--------|
| Markets | `global` | **`fill`** | App Bar → Tabs → panel |
| Portfolio | `global` | **`default`** | App Bar → Tabs → panel |
| Other tabbed screens | `backButton` | **`default`** | App Bar → Tabs → panel |

**MUST NOT** use **`fill`** on `backButton` screens. **MUST NOT** place **MDSTabs** in a bottom sheet — use [Header](./header.md) `sectionHeader` / `subSection` instead ([bottom-sheet](./bottom-sheet.md)).

## Interactions

| Interaction | Behavior | Notes |
|-------------|----------|-------|
| Tap tab | Activates inactive tab; updates panel | Exactly one `focus` tab |
| Swipe content | Horizontal swipe switches panel | Peer sections — not a stepper |
| Tab row · `default` | Horizontal scroll; rubber-band at ends | Intrinsic tab widths |
| Tab row · `fill` | Equal-width tabs — no scroll | 2–3 short labels |
| `disabled` tab | Non-interactive | Unavailable section |
| Pinning | MAY pin below App Bar or scroll with page | Content scrolls under pinned row |

## Accessibility

> **Mobile** — VoiceOver · TalkBack. Copy → [`../content/guidelines/accessibility.md`](../content/guidelines/accessibility.md) · [`../content/index.md`](../content/index.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | Tab bar + tab items — selected tab: selected trait/state; panel content associated with active tab |
| Focus & traversal | Swipe between tabs with VoiceOver / TalkBack; focus moves to new panel content on selection |
| Labels & announcements | Tab `label` + icon (combined label) — MUST NOT icon-only; `disabled` → unavailable; `hasPulsingDot` → new/unread only |
| Touch & gestures | Tab targets ≥ 44×44 pt / 48×48 dp; content swipe is optional — tab tap MUST work for TalkBack users who do not use horizontal swipe |

## Design intent

`fill` keeps equal scan width for few short labels. `default` avoids truncation when copy length or tab count grows.

## Token bindings

> [`../tokens/token-reference.md`](../tokens/token-reference.md)

| Role | Token path | `tab` `state` |
|------|------------|---------------|
| Label | `body/small-medium` | `focus` |
| Label | `body/small` | `default` |
| Label color | `color/tertiary/selected` | `focus` |
| Active underline color | `color/tertiary/selected` | `focus` |
| Active underline width | `border/width/200` | `focus` |
| Inactive divider color | `color/border/light` | `default` |
| Inactive divider width | `border/width/100` | `default` |
| Row divider (`default` variant) | `color/border/light` · `border/width/100` | `MDSTabs` `variant=default` |
| Icon | `MDSIcon` `small` size | optional `hasIconLeading` |

## Text slot rules

> Voice, tone, locale → [`../content/index.md`](../content/index.md).

| Slot | Max length | Rules |
|------|------------|-------|
| `label` | 1–2 words | Sentence case — e.g. "All assets" |
| Icon | with label | `hasIconLeading` — MUST NOT icon-only |

MUST NOT truncate or wrap — shorten copy or use `variant=default`.

`hasPulsingDot`: new/unread only.   

## Verification

- [ ] Usage & behavior: 2–5 tabs; not in sheets; not nested; correct `variant` per screen.
- [ ] Interactions: one `focus`; tap/swipe; `default` scroll + rubber-band.
- [ ] Accessibility: icon + label; `disabled` / pulsing dot meaningful.
- [ ] Tokens · text slots · library not detached.

## Related specs

- [`app-bar.md`](./app-bar.md) · [`header.md`](./header.md) · [`bottom-sheet.md`](./bottom-sheet.md)
- [`../content/index.md`](../content/index.md) · [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md)

---
