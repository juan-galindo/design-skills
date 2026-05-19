---
id: search-field
name: Search Field
category: component
platform: mobile
tier: molecule
tags: [input, search, discovery, assets]
aliases: [MDSSearchField, search bar, search input]
status: draft
figma node: "7421:46443"
relationships:
  composes_with: [app-bar, header, chips, text-button, tag, button, icon]
  conflicts_with: [bottom-sheet]
  substitutes: [text-field]
  requires: []
---

## Agent summary

- Discovery without navigation — filter in place on **pushed search screens** only.
- **Variants:** `default` · `accent` (tab affordance). **States:** `default` · `pressed` · `activeFocus` · **`activeFocusEmpty`** · `filled` · **`loading`** · `disabled`.
- Non-interactive search icon · **clear** when `value` ≠ empty · placeholder **Busca activos** (not lone **Buscar**).
- Tab affordance **MUST** use **fade animation** (in · out) — not slide · not optional. **Explorar todas** → stack **push** only.
- **On type:** debounce → **`loading`** → results · no results · connection error — body layouts → [`../patterns/composition/search-global.md`](../patterns/composition/search-global.md).
- **MUST NOT** in forms (**TextField**) or inside [bottom-sheet](./bottom-sheet.md) — any variant.

## Overview

Users tap the App Bar affordance on **home** · **markets** · **portfolio** — **MUST** transition with **fade animation** (required · not slide). Back to the tab **MUST** use the same fade animation. **Explorar todas** uses stack **push** only. Copy → [`../content/index.md`](../content/index.md).

Body layouts for the three pushed search screens (global search, catalog browse, Markets category search) → [`../patterns/composition/search-global.md`](../patterns/composition/search-global.md).

## Structure

| Part | Notes |
|------|-------|
| Search icon (leading) | Non-interactive · standard search/zoom icon |
| Placeholder | Guides what is searchable — see [Text slots](#text-slot-rules) |
| Input | Pill · tokens below |
| Clear (trailing) | When `value` ≠ empty · does not dismiss screen |

Tab affordance is read-only until push. **Sizing:** small only on mobile; large = web catalog.

| Host | `variant` | Typical `state` |
|------|-----------|-----------------|
| Tab App Bar center | `accent` (home) / `default` | `default` (+ suffix animation on **home**) |
| Pushed search | `default` | `activeFocusEmpty` → `filled` / **`loading`** |


## Usage & behavior

### When to use

- Tab affordance → **global search** / **catalog browse** (Flow **A**).
- **Explorar todas** → **Markets category search** (Flow **B**).

### When NOT to use

- Forms — **TextField**.
- `activeFocusEmpty` outside pushed search chrome.
- **Any** use inside [bottom-sheet](./bottom-sheet.md) — long lists use scroll-only `bottomSheetItemList`; open **global search** from the parent screen if the user needs to search.

### Motion (tab entry)

- **MUST** use **fade animation** between tab (`global` affordance) and **global search** — enter and exit (**A1b** · **A6**).
- **MUST NOT** use slide, push, or instant cut for that transition.
- **Catalog browse** and **Markets category search** use stack **push** / pop — fade applies only to tab ↔ **global search**.

## Interactions

| `state` | When |
|---------|------|
| `default` | Tab affordance |
| `pressed` | Touch down (mobile) |
| `activeFocus` / **`activeFocusEmpty`** | Focused · empty shows discovery body |
| `filled` | Query entered |
| **`loading`** | Fetch in flight (**A4** / **B4**) |
| `disabled` | Feature unavailable |

Navigation, chips, tags, and retry behaviors → [`../patterns/composition/search-global.md`](../patterns/composition/search-global.md).

## Accessibility

> [`../content/index.md`](../content/index.md)

| Concern | Requirement |
|---------|-------------|
| Role | Affordance vs search field · announce suffix on home |
| Focus | **S3:** back → field → clear |
| Labels | **Ver todas** · **Explorar todas** · **Borrar búsqueda** · chip/tag tickers |
| Live regions | **loading** · no-results count · connection error |
| No-results icon | Decorative · **`extra large`** `error` | Meaning in title |
| Touch | ≥ 44×44 pt / 48×48 dp |

## Design intent

One search chrome, three discovery bodies: cross-catalog tease (top 3), full catalog with chips, or single Markets category. Typing always scoped to the current body; failures stay in-flow with recovery (suggestions or retry).

## Token bindings

> [`../tokens/token-reference.md`](../tokens/token-reference.md)

| Token path | Applies when |
|------------|----------------|
| `searchbar/background-color/default` | `variant=default` (all states) |
| `searchbar/background-color/onaccent` | `variant=accent` |
| `color/surface/disabled` | `state=disabled` (shell) |
| `input/color/text/placeholder` | `variant=default` · placeholder visible |
| `color/onbackground/accent` | `variant=accent` · placeholder visible |
| `input/color/text/default` | value in field · `activeFocus*` · `loading` |
| `input/color/text/disabled` | `state=disabled` |
| `color/border/focus` + `border/width/200` | `activeFocus` · `activeFocusEmpty` · `loading` |
| `color/overlay/pressedstate` | `state=pressed` (multiply overlay) |
| `input/border/radius-round` · `spacing/padding/xs` · `spacing/padding/2xs` · `spacing/inline/2xs` | shell · 36px height (`small`) |
| `body/small` · `typography/size/400` (caret only) | field copy · focus caret |

**Parts:** leading **MDSIcon** `size=small` (16×16, non-interactive) · trailing **MDS IconButton** `size=large` (32×32) + `icon-button/spacing/padding` when clearable · **MDS SpinLoader** `primary` `small` + **MDSIcon** `size=base` (24×24) when `loading`.

**Discovery body (not chrome):** top 3 card — `color/surface/default` · `border/radius/500`. Motion — suffix **A1a** 300ms linear · tab ↔ global search cross-fade **A1b**/**A6** (required; not slide).

## Text slot rules

| Slot | Copy |
|------|------|
| Placeholder (tab + pushed) | **Busca activos** |
| Home suffix | **activos** / **acciones** / **cripto** (animated) |

MUST NOT use placeholder-only **Buscar** / **Search**. Body copy (section headers, chips, links, no-results, error) → [`../patterns/composition/search-global.md`](../patterns/composition/search-global.md).

## Verification

- [ ] Not in forms; **not** in [bottom-sheet](./bottom-sheet.md).
- [ ] Tab ↔ global search: **fade animation** required on enter and back — **MUST NOT** slide; **Explorar todas** / **Ver todas** → stack push only.
- [ ] Field states: `activeFocusEmpty` on entry · `filled` + clear when query present · `loading` on fetch.
- [ ] Token bindings — `searchbar/*` shell · no `input/color/background/*`.
- [ ] Body layouts and flows → [`../patterns/composition/search-global.md`](../patterns/composition/search-global.md).

## Related specs

- [`app-bar.md`](./app-bar.md) · [`header.md`](./header.md) (conflicts — no search in sheet)
- [`../patterns/composition/search-global.md`](../patterns/composition/search-global.md) — body layouts, flows, query result states
- [`../content/index.md`](../content/index.md) · [`../tokens/token-reference.md`](../tokens/token-reference.md) · [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md) · [`../figma-catalog/assets/icons.md`](../figma-catalog/assets/icons.md)

---
