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
- **Three pushed bodies** under shared `globalSearch` chrome — see [Search screens](#search-screens). Tab affordance **MUST** use **fade animation** (in · out) — not slide · not optional. **Explorar todas** → stack **push** only.
- **On type:** debounce → **`loading`** → results · [no results](#query-results) · [connection error](#query-results).
- **MUST NOT** in forms (**TextField**) or inside [bottom-sheet](./bottom-sheet.md) — any variant.

## Overview

Users tap the App Bar affordance on **home** · **markets** · **portfolio** — **MUST** transition with **fade animation** (required · not slide). Back to the tab **MUST** use the same fade animation. **Explorar todas** uses stack **push** only. Copy → [`../content/index.md`](../content/index.md).

## Search screens

Shared chrome ([`app-bar.md`](./app-bar.md) `globalSearch` · 56px): `arrow_back` · field **`activeFocusEmpty`** on entry · **Busca activos** · keyboard · `CloseSmall` + in-field clear when typing.

| Screen | Entry | Transition | Empty body (`activeFocusEmpty`) |
|--------|-------|------------|--------------------------------|
| **Global search** | Tab search affordance | **Fade animation** (in · out) · **required** | Top 3 cryptos + top 3 stocks · **Ver todas** each → **catalog browse** |
| **Catalog browse** | **Ver todas** on global search | Stack push | **Chips** (**Criptos** · **Acciones**) + full **CurrencyListItem** list |
| **Markets category search** | **Explorar todas** on category card | Stack push | One `sectionHeader` + full **CurrencyListItem** list (fixed category) |
| **Markets category** | — | — | Not a search screen — preview card only (**B1**) |

### Global search · top 3

No `screenHeader`. Two blocks:

1. **`sectionHeader`** **Criptos populares** + **TextButton** **Ver todas** → `topCryptos` card (`color/surface/default` · `border/radius/500`) · 3 × **StackableAsset** (horizontal).
2. Same for **Acciones populares** / `topStocks`.

**StackableAsset:** extra-large icon · ticker · optional **PriceChangePercentage** (small). Tap → asset detail. **Ver todas** → **catalog browse** with matching chip.

### Catalog browse

**MDS Chips** row + `sectionHeader` (active chip) + vertical **CurrencyListItem** list. Chip tap swaps list; query filters within active chip.

### Markets category search

`sectionHeader` (category name only) + vertical **CurrencyListItem** list. **MUST NOT** show top 3 blocks or chips. **B1** (preview): `screenHeader` · **Tabs** · card with 3 items + **Explorar todas** (`Secondary`).

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

## Flows

### Shared · pushed search (**S1–S4**)

| Step | Behavior |
|------|----------|
| **S1–S3** | Push · `globalSearch` · `activeFocusEmpty` · **Busca activos** · keyboard |
| **S4** | `filled` + clear when query present |
| Back | Pop · clear query (default) |

### Query results

Applies when typing on pushed search screens only.

| Phase | Field | Body |
|-------|-------|------|
| Fetching | **`loading`** (query visible) | Loading / prior body hidden |
| Matches | `filled` | **CurrencyListItem** (scoped by screen/chip/category) |
| Zero matches | `filled` | **No results** — see below |
| Failure | `filled` | **Connection error** — see below |

**No results** (request succeeded · zero matches):

| Element | Component | Spec |
|---------|-----------|------|
| Icon | **MDS Icon** · `icon=error` | `size=extra large` · centered · decorative (title carries meaning) |
| Title | `heading/base` | **No encontramos resultados para** `{query}` |
| Hint | `body/base` · medium emphasis | **Quizás quisiste decir:** |
| Suggestions | **MDS Tag** row (`status` accent) | API-driven tickers |

**MDS Icon** `size` on mobile: `extra small` · `small` · `base` · `large` · **`extra large`**. **MUST** use **`extra large`** for no-results empty state (48×48 container) — do not hardcode dimensions. Glyph: [`error`](../figma-catalog/assets/icons.md). Component: [`Icon`](../figma-catalog/mobile-components.md).

Tap **Tag** → new query + **loading**. No suggestions → hide hint + **Tag** row.

**Connection error** (no icon — text + action only):

| Element | Component | Copy |
|---------|-----------|------|
| Message | `heading/base` | **Por el momento no pudimos conectarnos con los servidores de Bitso, por favor intenta otra vez.** |
| Action | **MDS Button** · primary | **Intentar de nuevo** |

**Clear** restores prior `activeFocusEmpty` body. Debounce before **loading** to avoid flash.

### Flow A · tabs → global path

| Step | UI |
|------|-----|
| **A1** | Tab · `global` affordance (`accent` on home) |
| **A1a** | **Home** only: suffix **activos** → **acciones** → **cripto** · 300ms linear · infinite |
| **A1b** | Tap → **fade animation** (required) → **S1–S3** |
| **A3** | Empty → [top 3](#global-search--top-3) |
| **A3v** / **A3v′** | **Ver todas** → **catalog browse** (pre-selected chip) |
| **A3b–d** | [Catalog browse](#catalog-browse) · back → **A3** |
| **A4** | Type → **Query results** |
| **A5** | Clear → **A3** or **A3b** |
| **A6** | Back → **fade animation** (required) to tab |

### Flow B · Markets category → scoped search

> Tab search affordance = Flow **A**, not **B**.

| Step | UI |
|------|-----|
| **B1** | [Markets category](#markets-category-search) preview |
| **B2** | **Explorar todas** → **push** → **S1–S3** |
| **B3** | Empty → [Markets category search](#markets-category-search) body |
| **B4–B5** | **Query results** (category scope) · clear → **B3** |
| **B6** | Back → **B1** |

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

Navigation, chips, tags, and retry behaviors → [Flows](#flows).

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

> [`../tokens/token-reference.md`](../tokens/token-reference.md) · Figma `7421:46443` ([`MDSSearchField`](https://www.figma.com/design/bDZOPFXzS3um5eLqyPWoe8/-Juan--DS-Workstream?node-id=7421-46443)). Chrome = **`searchbar/background-color/*`** · copy = **`input/color/text/*`** (or **`color/onbackground/accent`** on `variant=accent`) — **MUST NOT** `input/color/background/*` · `color/background/blurred`.

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

**Parts:** leading **MDSIcon** 16×16 (non-interactive) · trailing **MDS IconButton** 32×32 + `icon-button/spacing/padding` when clearable · **MDS SpinLoader** `primary` `small` + `icon/size/base` when `loading`.

**Discovery body (not chrome):** top 3 card — `color/surface/default` · `border/radius/500`. Motion — suffix **A1a** 300ms linear · tab ↔ global search cross-fade **A1b**/**A6** (required; not slide).

## Text slot rules

| Slot | Copy |
|------|------|
| Placeholder (tab + pushed) | **Busca activos** |
| Home suffix | **activos** / **acciones** / **cripto** (animated) |
| Top 3 sections | **Criptos populares** · **Acciones populares** |
| Links | **Ver todas** · **Explorar todas** |
| Chips | **Criptos** · **Acciones** |
| No results | **No encontramos resultados para** `{query}` · **Quizás quisiste decir:** |
| Connection error | **Por el momento no pudimos conectarnos…** · **Intentar de nuevo** |

MUST NOT use placeholder-only **Buscar** / **Search**.

## Verification

- [ ] Not in forms; **not** in [bottom-sheet](./bottom-sheet.md).
- [ ] Tab ↔ global search: **fade animation** required on enter and back — **MUST NOT** slide; **Explorar todas** / **Ver todas** → stack push only.
- [ ] **S1–S4** · **Busca activos** · type → **`loading`** → results / no results / connection error.
- [ ] **No results:** **MDS Icon** `error` · `size=extra large` · suggestions optional.
- [ ] Top 3 · catalog browse · Markets bodies match [Search screens](#search-screens).
- [ ] [Token bindings](#token-bindings) — `searchbar/*` shell · no `input/color/background/*`.
- [ ] a11y · content locales.

## Related specs

- [`app-bar.md`](./app-bar.md) · [`header.md`](./header.md) · [`bottom-sheet.md`](./bottom-sheet.md) (conflicts — no search in sheet)
- [`../content/index.md`](../content/index.md) · [`../tokens/token-reference.md`](../tokens/token-reference.md) · [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md) · [`../figma-catalog/assets/icons.md`](../figma-catalog/assets/icons.md)

---
