---
id: pattern-search-global
name: Search Global
category: pattern
platform: mobile
tags: [search, discovery, assets]
aliases: [global search body, catalog browse, markets category search, search screen]
status: draft
relationships:
  applies_to: [search-field]
  conflicts_with: [bottom-sheet]
  requires: [search-field, app-bar, header, chips]
---

## Agent summary

- Three body variants hosted inside the **`globalSearch`** `MDSAppBar` chrome — one body active at a time; never shown outside that chrome.
- **Global search** → top-3 popular assets (2 `sectionHeader` + `StackableAsset` card blocks); **Catalog browse** → `Chips` + `sectionHeader` + `CurrencyListItem` list; **Markets category search** → `sectionHeader` + `CurrencyListItem` list (no chips, no top-3).
- **Entry transitions:** tab affordance → global search = **fade animation** (required); **Ver todas** / **Explorar todas** → stack push.
- **On type:** debounce → `loading` → results · no results · connection error — always scoped to active body.
- **MUST NOT** show top-3 blocks or chips in Markets category search body.
- **Copy:** [`../../content/index.md`](../../content/index.md) · Text slot rules below.

## Overview

The three search bodies share the same `globalSearch` chrome ([`app-bar.md`](../../components/app-bar.md) · 56px · `arrow_back` · `MDSSearchField activeFocusEmpty`) but serve different discovery intents: cross-catalog tease (top 3), full catalog with chip filters, and single-category asset list. Typing always scopes to the current body; clear restores the `activeFocusEmpty` body for the active screen.

## Structure

| Body | Entry | Transition | `activeFocusEmpty` content |
|------|-------|------------|---------------------------|
| **Global search** | Tab search affordance | **Fade animation** in · out (required) | Top-3 cryptos + top-3 stocks → **Ver todas** each |
| **Catalog browse** | **Ver todas** on global search | Stack push | **Chips** (Criptos · Acciones) + full `CurrencyListItem` list |
| **Markets category search** | **Explorar todas** on category card | Stack push | One `sectionHeader` + full `CurrencyListItem` list (fixed category) |

### Global search — top-3 stack

No `screenHeader`. Two blocks:

1. `sectionHeader` **Criptos populares** + `TextButton` **Ver todas** → `topCryptos` card (`color/surface/default` · `border/radius/500`) · 3 × `StackableAsset` (horizontal).
2. Same for **Acciones populares** / `topStocks`.

**StackableAsset:** extra-large icon · ticker · optional `PriceChangePercentage` (small). Tap → asset detail. **Ver todas** → catalog browse with matching chip pre-selected.

### Catalog browse — stack

`MDS Chips` row + `sectionHeader` (active chip label) + vertical `CurrencyListItem` list. Chip tap swaps list content; query filters within the active chip.

### Markets category search — stack

`sectionHeader` (category name only) + vertical `CurrencyListItem` list. **MUST NOT** show top-3 blocks or chips — body is fixed to one category.

### Query result states (all bodies)

| Phase | Field state | Body |
|-------|-------------|------|
| Fetching | `loading` (query visible) | Loading / prior body hidden |
| Matches | `filled` | `CurrencyListItem` list (scoped by body / chip / category) |
| Zero matches | `filled` | No results (see below) |
| Failure | `filled` | Connection error (see below) |

**No results** (request succeeded · zero matches):

| Element | Component | Spec |
|---------|-----------|------|
| Icon | `MDS Icon` · `icon=error` | `size=extra large` · centered · decorative |
| Title | `heading/base` | **No encontramos resultados para** `{query}` |
| Hint | `body/base` · medium emphasis | **Quizás quisiste decir:** |
| Suggestions | `MDS Tag` row (`status` accent) | API-driven tickers; hide hint + row when empty |

Tap **Tag** → new query + **loading**.

**Connection error** (no icon — text + action only):

| Element | Component | Copy |
|---------|-----------|------|
| Message | `heading/base` | **Por el momento no pudimos conectarnos con los servidores de Bitso, por favor intenta otra vez.** |
| Action | `MDS Button` · primary | **Intentar de nuevo** |

## Usage & behavior

### When to use

- Global search body: tab affordance entry only.
- Catalog browse: **Ver todas** from global search only.
- Markets category search: **Explorar todas** from a category card only.

### When NOT to use

- **MUST NOT** show any search body outside the `globalSearch` chrome.
- **MUST NOT** show top-3 or chips in the Markets category search body.
- **MUST NOT** open a search body inside a [bottom-sheet](../../components/bottom-sheet.md).

### Flows

#### Flow A — tab → global search

| Step | UI |
|------|----|
| A1 | Tab · `global` affordance (`accent` on home) |
| A1a | **Home only:** suffix **activos** → **acciones** → **cripto** · 300ms linear · infinite |
| A1b | Tap → **fade animation** (required) → `globalSearch` · `activeFocusEmpty` · keyboard |
| A3 | Empty body → top-3 |
| A3v / A3v′ | **Ver todas** → catalog browse (pre-selected chip) |
| A3b–d | Catalog browse · back → A3 |
| A4 | Type → query results |
| A5 | Clear → A3 or A3b |
| A6 | Back → **fade animation** (required) to tab |

#### Flow B — Markets category → scoped search

| Step | UI |
|------|----|
| B1 | Markets category preview (`screenHeader` · Tabs · card + **Explorar todas**) |
| B2 | **Explorar todas** → stack push → `globalSearch` · `activeFocusEmpty` · keyboard |
| B3 | Empty body → Markets category search |
| B4–B5 | Query results (category scope) · clear → B3 |
| B6 | Back → B1 |

## Interactions

- Debounce before `loading` to avoid flash.
- Tap **Tag** suggestion → new query + **loading**.
- **Clear** → restores `activeFocusEmpty` body for the active screen.
- `MDS Icon` `size=extra large` (48×48 container) for no-results empty state — MUST NOT hardcode dimensions.

## Accessibility

> **Mobile** — VoiceOver · TalkBack. Copy → [`../../content/guidelines/accessibility.md`](../../content/guidelines/accessibility.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | `sectionHeader` announces section label; `StackableAsset` rows read as ticker + price |
| Focus & traversal | On entry: field focused · keyboard up · body below; chip tap: list updates + announces new section label |
| Labels & announcements | **Ver todas** / **Explorar todas** include destination context; no-results icon is decorative — meaning in title; `loading` announced via live region |
| Touch & gestures | Tag suggestions ≥ 44×44 pt / 48×48 dp · **Intentar de nuevo** button ≥ 44×44 pt |

## Design intent

One chrome, three discovery intents. The body always matches the entry point — never substitute one body for another based on available data or query state.

## Token bindings

> [`../../tokens/token-reference.md`](../../tokens/token-reference.md) — no raw hex or px.

| Role | Token path | Element |
|------|------------|---------|
| Top-3 card background | `color/surface/default` | `topCryptos` · `topStocks` card |
| Top-3 card radius | `border/radius/500` | card shell |
| Home suffix timing | 300ms linear | A1a suffix animation — no spacing token; timing only |

## Text slot rules

> Voice, locale → [`../../content/index.md`](../../content/index.md).

| Slot | Copy |
|------|------|
| Top-3 section headers | **Criptos populares** · **Acciones populares** |
| Ver todas links | **Ver todas** |
| Explorar todas | **Explorar todas** |
| Chips | **Criptos** · **Acciones** |
| No results title | **No encontramos resultados para** `{query}` |
| No results hint | **Quizás quisiste decir:** |
| Connection error message | **Por el momento no pudimos conectarnos con los servidores de Bitso, por favor intenta otra vez.** |
| Connection error action | **Intentar de nuevo** |

## Verification

- [ ] Body matches entry point: tab → global search · Ver todas → catalog browse · Explorar todas → category search.
- [ ] Fade animation on tab ↔ global search (enter + back); Ver todas / Explorar todas → stack push only.
- [ ] MUST NOT show top-3 or chips in Markets category search body.
- [ ] Query results: loading → results / no results / connection error — scoped to active body.
- [ ] No-results icon `size=extra large`; connection error has no icon.
- [ ] Token bindings — top-3 card `color/surface/default` · `border/radius/500`.
- [ ] Text slots match spec exactly.

## Related specs

- [`../../components/search-field.md`](../../components/search-field.md) — host component (field shell, states, token bindings)
- [`../../components/app-bar.md`](../../components/app-bar.md) — `globalSearch` variant (56px chrome)
- [`../../components/header.md`](../../components/header.md) — `sectionHeader` inside bodies
- [`../../content/index.md`](../../content/index.md) · [`../../tokens/token-reference.md`](../../tokens/token-reference.md)
- [`../../figma-catalog/mobile-components.md`](../../figma-catalog/mobile-components.md) · [`../../figma-catalog/assets/icons.md`](../../figma-catalog/assets/icons.md)

---
