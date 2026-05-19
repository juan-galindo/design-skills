---
id: layout-markets-crypto
name: Markets Crypto
category: product-layout
platform: mobile
tags: [markets, discovery]
aliases: [markets screen, markets cripto, mercados, markets hub]
status: ready
relationships:
  applies_to: [markets-tab]
  conflicts_with: []
  requires: [app-bar, tabs, header]
---

## Agent summary

- **MUST** use this layout for the Markets top-level screen — the tab-driven discovery hub showing themed asset sections.
- **Shell:** absolute `containerTop` (StatusBar + `MDSAppBar` `variant=global, background=accent` + `MDSTabs`) h=164 + scrollable content + fixed `navigationApp` bottom bar.
- **MUST** position `containerTop` as absolute `top=0`; scrollable content reserves `pt=164` clearance.
- **Section pattern:** each section = `MDSHeader` `variant=sectionHeader` + content block + `pb=spacing/padding/lg` (24). No inter-section gap — each section owns its bottom padding.
- **Top border rule:** `hasTopBorder=false` on the first two section headers ("Nuevas en Bitso", "Favoritas") and on any section header that directly follows a section ending with a full-width button ("Líderes"). `hasTopBorder=true` on all other `sectionHeader` instances.
- **MUST NOT** inject gap between any `sectionHeader` and the content block below it — the header owns its bottom padding.
- **Legal disclaimer** MUST appear as the first element in scrollable content, before all section headers.
- **Copy:** [`../../content/index.md`](../../content/index.md)

## Overview

Markets Crypto is the primary entry point for asset discovery on Bitso. It organizes content into themed sections (new listings, favorites, categories, leaders by market cap, top movers, yields), each independently scrollable. `MDSTabs` switches between content tabs ("Cripto", "Acciones") while the AppBar and tab row stay pinned as content scrolls beneath.

The screen is designed for continuous vertical scanning — users browse sections, dip into horizontal strips, and tap through to asset details or category views. There is no bottom CTA; all actions are contextual within sections.

## Anatomy

```
┌──────────────────────────────────────────────┐
│ 1. containerTop (absolute, top=0, h=164)     │
│    1a. StatusBar                       h=48  │
│    1b. MDSAppBar variant=global/accent h=64  │
│    1c. MDSTabs variant=default         h=52  │
├──────────────────────────────────────────────┤
│ ↕ pt=164 (containerTop clearance)            │
│                                              │
│ 2. Legal disclaimer                          │
│    tiny/base · lowEmphasis · pt=24 · px=16   │
│                                              │
│ ── section (× N) ────────────────────────── │
│  MDSHeader sectionHeader  (topBorder varies) │
│  content block            (type-specific)    │
│  pb=spacing/padding/lg (24)                  │
│ ─────────────────────────────────────────── │
│                                              │
│ 3a. Nuevas en Bitso  — h-scroll strip        │
│ 3b. Favoritas        — empty state / strip   │
│ 3c. Explora por categoría — h-scroll + btn   │
│ 3d. Líderes          — h-scroll featured     │
│ 3e. Dinámicas        — segmented grid        │
│ 3f. Rendimientos     — v-list in surface card│
│                                              │
│ ↕ pb = navigation bar height + spacing/padding/base │
├──────────────────────────────────────────────┤
│ navigationApp (fixed bottom, h=110)          │
└──────────────────────────────────────────────┘
```

## Structure

### Section anatomy (shared)

| Slot | Component | Config |
|------|-----------|--------|
| Header | `MDSHeader` `variant=sectionHeader` | `hasTopBorder` — see rule in Agent summary |
| Content | Section-specific (see tables below) | Full-width; padding owned per section |
| Spacing | `pb` on section wrapper | `spacing/padding/lg` (24) |

### 3a — Nuevas en Bitso (horizontal strip)

| # | Element | Config |
|---|---------|--------|
| Header | `MDSHeader` `sectionHeader` | `hasTopBorder=false` · `hasDescription=true` |
| Strip | `MDS Stackable Asset` × N | horizontal scroll · `px=spacing/padding/base` (16) · `gap=spacing/inline/xs` (8) |

### 3b — Favoritas (empty state / populated)

| # | Element | Config |
|---|---------|--------|
| Header | `MDSHeader` `sectionHeader` | `hasTopBorder=false` · `hasDescription=false` |
| Empty state | `MDS emptyState` | `px=spacing/padding/base` (16) · star icon + title + description + `MDS TextButton` "Agregar criptos" |
| Populated | `MDS Stackable Asset` × N | same strip pattern as 3a |

### 3c — Explora por categoría (category cards + button)

| # | Element | Config |
|---|---------|--------|
| Header | `MDSHeader` `sectionHeader` | `hasTopBorder=true` · `hasDescription=true` |
| Cards row | `categoryContainer` × N | horizontal scroll · `px=spacing/padding/base` (16) · `gap=spacing/inline/xs` (8) · card w=324 |
| Card interior | `MDSHeader` `variant=subSection` `hasArrow=true` + 3× `MDS CurrencyListItem` | card `bg=color/surface/default` · `borderRadius=16` · `pt=spacing/padding/base` (16) · `pb=spacing/padding/xs` (8) · no list gap (0) |
| Button | `MDSButtonSecondary` full-width | `mx=spacing/padding/base` (16) · label "Explorar todas" → full category browser |

### 3d — Líderes (featured asset cards)

| # | Element | Config |
|---|---------|--------|
| Header | `MDSHeader` `sectionHeader` | `hasTopBorder=false` · `hasDescription=true` |
| Strip | `MDSfeaturedAsset` × N in card | horizontal scroll · `px=spacing/padding/base` (16) · `gap=spacing/inline/xs` (8) · card `bg=color/surface/default` · `borderRadius=16` · `hasFavIcon=true` · `hasChart=true` |

`hasTopBorder=false` because this section directly follows a section (3c) that ends with a full-width button.

### 3e — Dinámicas (segmented grid)

| # | Element | Config |
|---|---------|--------|
| Header | `MDSHeader` `sectionHeader` | `hasTopBorder=false` · `hasDescription=true` |
| Controls | `MDS SegmentedButtons` | centered · `pt=spacing/stack/sm` (16) · filters grid by time period |
| Grid | `MDS Stackable Asset` 3 × 2 | `px=spacing/padding/base` (16) · 3 columns · col gap ~15 · row gap `spacing/stack/sm` (16) |

### 3f — Rendimientos (yields list)

| # | Element | Config |
|---|---------|--------|
| Header | `MDSHeader` `sectionHeader` | `hasTopBorder=false` · `hasDescription=true` · `hasArrow=true` → full yields list |
| List | `MDS CurrencyListItem` × 3 in surface card | `px=spacing/padding/base` (16) · card `bg=color/surface/default` · `borderRadius=16` · gap `list-item/spacing/between-stack` (4) · **do not force CurrencyListItem to fill width** |

## Usage & behavior

### When to use

- MUST use for the Markets top-level screen (all content tabs).
- MUST keep `MDSTabs` inside the absolute `containerTop` so it stays pinned during scroll.
- MUST include the legal disclaimer as the first element in scrollable content when regulatory context is required.

### When NOT to use

- MUST NOT use for a category "View all" screen — use [`layout-markets-view-all-category`](./markets-view-all-category-screen.md) instead.
- MUST NOT use for asset detail screens.
- MUST NOT add a bottom CTA bar — all actions are inline within sections.
- MUST NOT render a `screenHeader` — the first `sectionHeader` acts as the de-facto page header because the screen uses `MDSTabs`.

### Edge cases

- **Favorites populated**: Replace `MDS emptyState` with a horizontal `MDS Stackable Asset` strip. Section header and spacing unchanged.
- **Server-driven section not available**: Hide the entire section (header + content + spacing) — do not show an empty shell.
- **Section loading**: Replace the content block with skeletons of equal height; section header remains visible.
- **Tab switch (Cripto ↔ Acciones)**: Scrollable content replaces; `containerTop` stays pinned; scroll position resets to top.
- **Long section description**: Wraps to 2 lines inside `sectionHeader` — never truncate.

## Interactions

| Interaction | Behavior |
|-------------|----------|
| Vertical scroll | Content scrolls; `containerTop` stays pinned at `top=0` |
| Horizontal scroll (strips, cards) | Swipes within the section strip only; does not affect vertical scroll |
| Tab tap (`MDSTabs`) | Switches content tab; resets scroll to top |
| `MDS Stackable Asset` tap | Navigates to asset detail screen |
| `MDSfeaturedAsset` card tap | Navigates to asset detail screen |
| `MDSfeaturedAsset` star tap | Toggles watchlist membership |
| Category card header arrow tap | Navigates to `layout-markets-view-all-category` for that category |
| "Explorar todas" button tap | Navigates to full category browser |
| "Rendimientos" header arrow tap | Navigates to full yields list |
| `MDS CurrencyListItem` tap (Rendimientos) | Navigates to asset detail screen |
| Hamburger icon tap (AppBar) | Opens side menu / navigation drawer |
| Search field tap (AppBar) | Opens search flow |
| Notifications icon tap (AppBar) | Opens notifications |

## Accessibility

> **Mobile** — VoiceOver · TalkBack. Copy → [`../../content/guidelines/accessibility.md`](../../content/guidelines/accessibility.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | Tab bar landmark; each section grouped under its heading; horizontal strips: scrollable horizontal list |
| Focus & traversal | On open, focus lands on the first section heading; traversal follows visual order top → bottom, left → right within strips |
| Labels & announcements | Section headers: heading role; asset cards read ticker, name, price, percentage + trend; star icon reads "Agregar a favoritos" / "Quitar de favoritos" |
| Touch & gestures | All tappable targets ≥ 44×44 pt (iOS) / 48×48 dp (Android); horizontal strip swipe handled by scroll container, not individual cards |

## Design intent

Markets Crypto is a **discovery feed**, not a dashboard. Sections are curated editorial slots — each has a name, optional narration, and a distinct content type. The `MDSTabs` pinned at the top gives users a macro filter without losing scroll position. Sections are self-contained units: each owns its bottom spacing so the feed reads as a coherent vertical rhythm regardless of which sections the server populates.

`MDSAppBar` uses `variant=global, background=accent` — the same shell as Home and Portfolio — because Markets is a top-level tab, not a sub-screen. The first section uses `sectionHeader` (not `screenHeader`) because `MDSTabs` already establishes screen identity.

## Token bindings

> [`../../tokens/token-reference.md`](../../tokens/token-reference.md) — no raw hex or px.

| Role | Token path | Notes |
|------|------------|-------|
| Screen background | `color/background/default` | Root + all section wrappers |
| `containerTop` clearance | StatusBar 48 + AppBar 64 + Tabs 52 = **164** | No single token — composed from component heights; bind `pt` to this sum |
| Section bottom padding | `spacing/padding/lg` (24) | Every section wrapper `pb` |
| Strip horizontal padding | `spacing/padding/base` (16) | Horizontal scroll strips (3a, 3d) and categories row (3c) `px` |
| Strip / card item gap | `spacing/inline/xs` (8) | Gap between Stackable Asset cards, featured cards, and category cards |
| Legal text color | `color/onbackground/lowemphasis` | Disclaimer only |
| Legal text type | `tiny/base` | 12px / Regular |
| Legal top padding | `spacing/padding/lg` (24) | Disclaimer `pt` |
| Legal horizontal padding | `spacing/padding/base` (16) | Disclaimer `px` |
| Category / surface card background | `color/surface/default` | Explora cards (3c) and Rendimientos card (3f) |
| Category card top padding | `spacing/padding/base` (16) | `pt` inside each category card |
| Category card bottom padding | `spacing/padding/xs` (8) | `pb` inside each category card |
| Rendimientos card horizontal padding | `spacing/padding/base` (16) | Outer wrapper `px` around surface card |
| Rendimientos list gap | `list-item/spacing/between-stack` (4) | gap inside Rendimientos surface card |
| Dinámicas grid horizontal padding | `spacing/padding/base` (16) | Outer wrapper `px` |
| Dinámicas controls top padding | `spacing/stack/sm` (16) | `MDS SegmentedButtons` `pt` |
| Bottom safe area | `spacing/padding/base` (16) + navigation bar height | Scrollable content `pb` |
| AppBar surface | per [app-bar](../../components/app-bar.md) `variant=global, background=accent` | Owned by `MDSAppBar` |

## Text slot rules

> Voice and locale → [`../../content/index.md`](../../content/index.md).

| Slot | Section | Max chars | Grammar |
|------|---------|:---------:|---------|
| Section header title | all | 28 | Sentence case noun phrase — short, scannable |
| Section description | all | 80 | One factual sentence about what the section contains |
| Legal disclaimer | 2 | 120 | Full legal sentence; low-emphasis style |
| Empty state title | 3b | 40 | Actionable noun phrase |
| Empty state description | 3b | 100 | One sentence; benefit-focused; no apology |
| CTA button label | 3c | 20 | Verb phrase; sentence case |

## Verification

- [ ] `containerTop` is **absolute** `top=0`, h=164; scrollable content reserves `pt=164`
- [ ] `MDSAppBar` is `variant=global, background=accent` — hamburger leading, SearchField, trailing: gifts + notifications
- [ ] `MDSTabs` is **inside** `containerTop`, not inline in the scroll
- [ ] Legal disclaimer is the **first** element in scrollable content, before any section header
- [ ] Every section ends with `pb=spacing/padding/lg` (24); no extra gap between sections
- [ ] `hasTopBorder=false` on "Nuevas en Bitso" (first), "Favoritas" (second), "Líderes" (follows button), "Dinámicas", and "Rendimientos"; `hasTopBorder=true` on "Explora"
- [ ] Horizontal strips use `px=spacing/padding/base` (16) and `gap=spacing/inline/xs` (8)
- [ ] Category, Featured Asset (Líderes), and Rendimientos cards use `bg=color/surface/default` and `borderRadius=16`
- [ ] Favorites shows `MDS emptyState` when empty; horizontal strip when populated
- [ ] Rendimientos `sectionHeader` has `hasArrow=true` wired to full yields list
- [ ] No bottom CTA bar present
- [ ] Bottom of scrollable content reserves navigation bar clearance + `spacing/padding/base`

## Related specs

- [`../../components/app-bar.md`](../../components/app-bar.md) — `variant=global, background=accent`
- [`../../components/header.md`](../../components/header.md) — `variant=sectionHeader` rules
- [`./markets-view-all-category-screen.md`](./markets-view-all-category-screen.md) — destination when user taps "view all" from any section
- [`../../figma-catalog/mobile-components.md`](../../figma-catalog/mobile-components.md) — `MDS Stackable Asset`, `MDSfeaturedAsset`, `MDS CurrencyListItem`, `MDS SegmentedButtons`, `MDS emptyState`
- [`../../content/index.md`](../../content/index.md)
- [`../../tokens/token-reference.md`](../../tokens/token-reference.md)

---
