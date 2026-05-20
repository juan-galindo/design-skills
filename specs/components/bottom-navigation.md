---
id: bottom-navigation
name: Bottom Navigation
category: component
platform: mobile
tier: organism
tags: [navigation, tabs, global]
aliases: [BottomNavigation, MDS BottomNavigation, tab bar, bottom tab bar]
status: draft
figma node: "2:115"
relationships:
  composes_with: [app-bar, fab-button]
  conflicts_with: [bottom-sheet]
  substitutes: []
  requires: []
---

## Agent summary

- One **BottomNavigation** per screen; only on global root destinations (Home, Portfolio, Markets, Agent).
- `activeTab` MUST match the currently visible screen — `Home` | `Portfolio` | `Markets` | `Agent`.
- Always paired with [`app-bar`](./app-bar.md) `global` variant at the top; pinned at the bottom above the device safe area.
- The FAB (swap_horiz) is **always present** in every variant — never hide it or change its position.
- Tab items and their order are fixed — do not add, remove, or reorder.
- **Copy:** [`../content/index.md`](../content/index.md) · slot limits below. Tab labels are always localized.

## Overview

MDS BottomNavigation anchors the four main app destinations at the bottom of every global-context screen. It gives users one-tap access to Home, Portfolio, and Markets tabs — and an always-visible FAB for the swap/trade flow — without leaving the current navigation level.

The `Agent` state is a fourth destination: no standard tab item is highlighted, indicating the user is in a non-tab context (launched from elsewhere), while the bar remains present and the FAB stays accessible.

## Structure

**Prop:** `activeTab` — `"Home"` | `"Portfolio"` | `"Markets"` | `"Agent"`

| Part | Required | Notes |
|------|----------|-------|
| Tab — Home | Yes | `HomeFill` icon + localized label; active pill when `activeTab=Home` |
| Tab — Portfolio | Yes | `PieFilled` icon + localized label; active pill when `activeTab=Portfolio` |
| Tab — Markets | Yes | `Public` icon + localized label; active pill when `activeTab=Markets` |
| FAB — Swap | Yes | `SwapHoriz` icon via `MdsFabButton`; always rightmost, no label |

**Active pill:** the active tab wraps its icon + label in a filled rounded chip. All other tabs render the icon + label without a chip. `activeTab=Agent` means no tab shows an active pill.

## Usage & behavior

### When to use

- MUST be present on every root-level global destination screen (Home, Portfolio, Markets, Agent).
- MUST set `activeTab` to the destination currently shown on screen.

### When NOT to use

- MUST NOT appear on sub-screens pushed from a global tab — those use [`app-bar`](./app-bar.md) `backButton` or `default`.
- MUST NOT be shown inside a [`bottom-sheet`](./bottom-sheet.md) or modal overlay.
- MUST NOT render a custom or reordered tab list — the four items are fixed by the design system.

### Composition

| Layer | Position |
|-------|----------|
| App Bar (`global`) | Top — same screens only |
| Screen content | Middle (scrollable) |
| Bottom Navigation | Pinned to bottom |
| Device safe area | Below — owned by the shell, not this component |

The shell owns the `paddingBottom` for the device home-indicator safe area (bind to `spacing/padding/base`). Bottom Navigation does not add its own safe-area spacing.

## Interactions

| Interaction | Behavior | Notes |
|-------------|----------|-------|
| Tap inactive tab | Navigate to destination; `activeTab` updates | Root-level switch, no push animation |
| Tap active tab | Scroll content back to top | Standard tab-bar convention |
| Tap FAB | Launch the swap / trade flow | Does not change `activeTab` |
| Active pill | Appears on the current `activeTab` item; absent when `activeTab=Agent` | Filled chip behind icon + label |

## Accessibility

> **Mobile** — VoiceOver (iOS) · TalkBack (Android). Copy → [`../content/index.md`](../content/index.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | iOS: `UITabBar` with `.tabBar` trait per item; Android: `NavigationBar` composable with individual `tab` roles |
| Focus & traversal | VoiceOver / TalkBack traverse left-to-right: Home → Portfolio → Markets → FAB; active item announced first on screen load |
| Labels & announcements | Each tab: localized `accessibilityLabel` + selected state (e.g., "Inicio, pestaña 1 de 3, seleccionada"); FAB: localized label (e.g., "Intercambiar"); tab switch announces new destination |
| Touch & gestures | Each tap target ≥ 44×44 pt (iOS) / 48×48 dp (Android) |

## Design intent

Three persistent root destinations plus a trade shortcut visible at all times. Separating the FAB from the tab items makes the distinction clear: tabs switch context, the FAB starts a task within any context. The `Agent` active state lets the system correctly render the bar (no active tab highlighted) when the user is in a non-tab destination without breaking the persistent shell.

## Token bindings

> [`../tokens/token-reference.md`](../tokens/token-reference.md) — no hex

| Role | Token path | Notes |
|------|------------|-------|
| Bar background | `color/background/default` | Full-width bottom bar surface |
| Active tab chip fill | `color/secondary/default` | Rounded pill behind active icon + label |
| Active tab icon + label | `color/onSecondary/default` | On chip fill |
| Inactive tab icon + label | `color/onBackground/lowEmphasis` | Unselected state |
| Active label text style | `tiny/base-medium` | 12pt Medium — active tab only |
| Inactive label text style | `tiny/base` | 12pt Regular — unselected tabs |
| FAB background | `color/primary/default` | Circular button; see `MdsFabButton` |
| FAB icon | `color/onPrimary/default` | swap_horiz on primary fill |

## Text slot rules

| Slot | Max length | Rules |
|------|------------|-------|
| Home label | 10 chars | Localized — ES: "Inicio" · EN: "Home" |
| Portfolio label | 12 chars | Localized — ES: "Portafolio" · EN: "Portfolio" |
| Markets label | 10 chars | Localized — ES: "Mercados" · EN: "Markets" |
| FAB | — | Icon only — no label text |

## Verification

- [ ] Usage & behavior: `activeTab` matches screen; not on sub-stacks; not inside bottom sheet; tabs fixed.
- [ ] Composition: paired with `app-bar` `global`; shell owns safe-area padding below.
- [ ] Interactions: tab tap → destination switch; active-tab tap → scroll to top; FAB → swap flow; pill absent on `Agent`.
- [ ] Accessibility: tab semantics + selected state; localized labels; FAB label; ≥ 44×44 pt targets.
- [ ] Tokens · text slots · related specs.

## Related specs

- [`app-bar.md`](./app-bar.md)
- [`../content/index.md`](../content/index.md) · [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md)

---
