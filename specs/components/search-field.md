---
id: search-field
name: Search Field
category: component
platform: mobile
tier: molecule
tags: [input, search, discovery, assets]
aliases: [MDSSearchField, search bar, search input]
status: draft
figma node: "7059:44171"
relationships:
  composes_with: [app-bar, bottom-sheet]
  conflicts_with: []
  substitutes: []
  requires: []
---

## Agent summary

- **MDSSearchField** — **assets-wide discovery** (crypto, stocks, and other tradable assets) via **global search**; secondary **`list`** variant for scoped filtering in sheets.
- **Global search** — [App Bar](./app-bar.md) `global` → tap → **`globalSearch`** screen; SearchField variants **`global`** then **`activeFocusEmpty`** only in this flow.
- **`global`:** read-only affordance in App Bar `global` center — tap **pushes the `globalSearch` screen** (never type in-place).
- **`activeFocusEmpty`:** **globalSearch only** — on the pushed screen with App Bar `globalSearch`: focused field, **keyboard open**, empty query; home discovery sections below (not part of the field node).
- **`list`:** separate flow — sheet/long-list filter (no `activeFocusEmpty`, no pushed global search screen).
- **Home · `global` placeholder:** static **Buscar** + animated suffix **activos** → **acciones** (vertical slide up) · **300ms** · **linear** — see **Interactions**.
- **Copy:** [`../content/index.md`](../content/index.md) · Text slot rules below.

## Overview

**MDSSearchField** is an entry point for **assets-wide discovery** — finding and opening crypto, stocks, and related assets across the app from home, portfolio, and markets. That flow is **global search**: **`global`** in App Bar `global`, then **`activeFocusEmpty`** on the pushed **`globalSearch`** screen (keyboard open, empty query, discovery sections or results below).

A secondary **`list`** variant filters a fixed option set in context (e.g. bottom sheets) — not full catalog discovery.

## Structure

Properties: `variant` · `background` (`default` | `accent`) · `value` (query string) · `placeholder`.

| Part / slot | `global` | `activeFocusEmpty` | `list` |
|-------------|----------|-------------------|--------|
| Leading | `search` icon (in field) | — (back is [App Bar](./app-bar.md) leading on search screen) | `search` icon |
| Text area | Placeholder only — **Buscar** + animated suffix (home) | Editable · caret visible · `body/base` | Editable · `body/base` |
| Trailing | — | — (empty query) · **clear** when `value` non-empty | **Clear** when `value` non-empty |
| Container | Pill in bar center · full width of center slot | Same pill in bar center on search screen | Full width under `sectionHeader` in sheet |
| Keyboard | Hidden | **Open** (system) | Open when focused |

| `variant` | Flow | When | Host |
|-----------|------|------|------|
| `global` | **Global search** | Discovery entry | Parent screen · App Bar `global` center |
| `global` + `accent` | **Global search** | Same on accent bar | `global` + `background=accent` |
| `activeFocusEmpty` | **Global search** | App Bar `globalSearch` · no query yet | Pushed global search screen · App Bar `globalSearch` center |
| `list` | List search | Searchable option list | Bottom sheet `bottomSheetItemListSearch` · other long lists |

**Height:** **global search** field fits App Bar center (**64px**) on both `global` and `globalSearch` screens. **`list`** uses standard field height in sheet content (library `7059:44171`).

**`globalSearch` pairing:** App Bar **`globalSearch`** and SearchField **`activeFocusEmpty`** always appear together on the pushed global search screen — keyboard open, empty query. Not used with **`list`**.

## Usage & behavior

### When to use

- **Assets-wide discovery:** **`global`** on App Bar `global` (home, portfolio, markets); **`activeFocusEmpty`** on the pushed App Bar **`globalSearch`** screen — search crypto, stocks, and assets app-wide (home reference below).
- **Scoped list filter:** **`list`** when a bottom sheet or screen presents a long, searchable list (`bottomSheetItemListSearch`) — filter options only, not catalog discovery.

### When NOT to use

- **MUST NOT** use **`global`** as a free-standing screen title or primary CTA.
- **MUST NOT** use **`activeFocusEmpty`** outside App Bar **`globalSearch`** (not in sheets, not on feed screens).
- **MUST NOT** use **`global`** / **`activeFocusEmpty`** inside [bottom-sheet](./bottom-sheet.md) (use **`list`**).
- **MUST NOT** use for single-field forms (amount, CLABE, etc.) — use **TextField** (`specs/figma-catalog/mobile-components.md`).

### Edge cases

- **No results** (query non-empty, zero matches): search screen body — title + hint + optional **Limpiar búsqueda**; see [`../content/guidelines/ux-writing-principles.md`](../content/guidelines/ux-writing-principles.md) (no-results empty).
- **Accent bar:** `background=accent` only on parent screen `global` + App Bar `accent` — search screen uses default bar/field tokens unless specified in library.

### Composition

**Global search** (App Bar `global` → `globalSearch`):

| Step | Screen | App Bar | SearchField |
|------|--------|---------|-------------|
| 1 · Discovery | Home / portfolio / markets | `global` | `global` (center) |
| 2 · `globalSearch` | Pushed global search screen | `globalSearch` | `activeFocusEmpty` + keyboard |
| 3 · Typing / results | Same `globalSearch` screen | `globalSearch` | field updates when user types; body = sections or results |

**List search** (separate — no `globalSearch` screen):

| Flow | Stack |
|------|-------|
| Sheet pick-list | `sectionHeader` → **`list`** → filtered `bottomSheetListItemSlot` |

On **`globalSearch`:** leading = `arrow_back`; center = **MDSSearchField** `activeFocusEmpty`; trailing bar slots unused — clear on field when `value` is non-empty.

**Home · `globalSearch` + `activeFocusEmpty`:** below the bar, **Cripto** (top 3) and **Acciones** (top 3 stocks) — each with **Ver todas**. Screen content, not part of the field node.

## Interactions

### Home · `global` — animated placeholder

On **home** (App Bar `global`), the affordance placeholder is **not** a single static string. Only the suffix **after** **Buscar** animates:

| Part | Content | Motion |
|------|---------|--------|
| Prefix | **Buscar** (fixed) | None |
| Suffix 1 | **activos** | Exits **upward** (moves off top) |
| Suffix 2 | **acciones** | Enters from below into place |

- **Order:** **activos** → **acciones** → loop.
- **Duration:** **300ms**
- **Curve:** **linear**
- **Scope:** home · **`global`** affordance only — stops on tap (navigation to `globalSearch`). **`activeFocusEmpty`** uses a static placeholder (no rotation).

### Global search & list

| Interaction | Behavior | Notes |
|-------------|----------|-------|
| Tap **`global`** | Enter **global search** — push screen · App Bar `globalSearch` · field `activeFocusEmpty` | Animation stops · not in-place on feed |
| Land on **`globalSearch`** | `activeFocusEmpty` · autofocus · keyboard open | Global search only |
| Type on **`globalSearch`** | `value` updates · clear on field · body = results | Stays on `globalSearch` screen |
| Trailing clear · `globalSearch` | Clears `value` · back to `activeFocusEmpty` body (crypto/stocks sections) | Keyboard stays open |
| Back · `globalSearch` | Pop screen · App Bar `global` parent | Default: clear query |
| **`list`** | Filter list in sheet · keyboard per focus | No `globalSearch` screen |
| Empty · home · `globalSearch` | Crypto + stocks + **Ver todas** | With `activeFocusEmpty` only |

## Accessibility

> **Mobile** — VoiceOver (iOS) · TalkBack (Android). Copy → [`../content/index.md`](../content/index.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | `global`: button or search affordance — announces **Buscar** + current suffix (activos / acciones); respect **Reduce motion** (show static suffix); **`activeFocusEmpty`** / **`list`**: search field / text field |
| Focus & traversal | On search screen open: focus in field immediately; back → field → clear (when visible) |
| Labels & announcements | Localized label (e.g. Buscar) + placeholder; clear: **Borrar búsqueda** / **Clear search**; announce result count when list filters |
| Touch & gestures | Clear ≥ 44×44 pt (iOS) / 48×48 dp (Android); `global` tap target spans full center slot |

## Design intent

**Assets-wide discovery** needs a calm feed (`global`) and a focused **`globalSearch`** mode (`activeFocusEmpty`) with keyboard and catalog results. **`list`** is for narrowing a known set in place — not replacing global asset search.

## Token bindings

> [`../tokens/token-reference.md`](../tokens/token-reference.md)

| Role | Token path | Notes |
|------|------------|-------|
| Query text | Search field / `body/base` | Typed value |
| Placeholder | Search field / placeholder (semantic on-surface) | `global`, `activeFocusEmpty`, `list` |
| Field surface | Search field / background `default` \| `accent` | `accent` on parent `global` only |
| Icons | Semantic · `search` leading · trailing clear | On-accent on parent `global` + accent |
| Caret / focus | Search field focus tokens | `activeFocusEmpty` · **globalSearch** only |

## Text slot rules

| Slot | Max | Rules |
|------|-----|-------|
| Placeholder prefix · home `global` | 6 chars | **Buscar** — fixed; never animates |
| Placeholder suffix · home `global` | 8 chars each | **activos** (1st) · **acciones** (2nd) — animated after prefix only |
| Placeholder · `globalSearch` / `activeFocusEmpty` | Static | Full placeholder string until user types — no suffix rotation |
| Placeholder · `list` / sheet | Contextual | Per [`../content/guidelines/ux-writing-principles.md`](../content/guidelines/ux-writing-principles.md) |
| Section title (empty home) | per Header | **Cripto** · **Acciones** |
| **Ver todas** | 12 chars | Per section on search screen |

MUST NOT use placeholder as the only visible label on **`activeFocusEmpty`** / **`list`**.

## Examples

| Scenario | Reference |
|----------|-----------|
| Home · `global` → search screen · `activeFocusEmpty` | [DS Workstream — Home search](https://www.figma.com/design/bDZOPFXzS3um5eLqyPWoe8/-Juan--DS-Workstream?node-id=7421-46443) |
| App Bar on search screen | [`app-bar.md`](./app-bar.md) — `globalSearch` |
| Sheet list search | [`bottom-sheet.md`](./bottom-sheet.md) — `bottomSheetItemListSearch` |

## Verification

- [ ] Global search: `global` on App Bar `global`; `activeFocusEmpty` only with App Bar `globalSearch`; not in sheets.
- [ ] Home placeholder: **Buscar** fixed · suffix **activos** → **acciones** · slide up · 300ms linear; stops on tap.
- [ ] Interactions: tap → `globalSearch` screen + keyboard; empty home sections; clear; back pops to `global`.
- [ ] Accessibility: affordance vs text field; clear label; touch targets.
- [ ] Tokens · placeholders · App Bar `globalSearch` pairing.

## Related specs

- [`app-bar.md`](./app-bar.md) · [`bottom-sheet.md`](./bottom-sheet.md)
- [`../content/index.md`](../content/index.md) · [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md)

---

## Figma & library (optional)

- Catalog: SearchField `7059:44171` — **`activeFocusEmpty`** in **globalSearch** context (keyboard open, empty query)
- Workstream: [Home search case](https://www.figma.com/design/bDZOPFXzS3um5eLqyPWoe8/-Juan--DS-Workstream?node-id=7421-46443) — `global` → App Bar `globalSearch` + `activeFocusEmpty`
