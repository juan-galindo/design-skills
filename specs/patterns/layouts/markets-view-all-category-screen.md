---
id: layout-markets-view-all-category
name: Markets View All Category
category: product-layout
platform: mobile
tags: [list, markets, category, view-all]
aliases: [category list screen, asset list screen, markets view all]
status: draft
relationships:
  composes: [app-bar, header]
  applies_to: [xstocks, cripto, acciones, category-listing]
  conflicts_with: []
  requires: [app-bar, header]
  supersedes: []
---

## Agent summary

- **MUST** use this full-screen scrollable layout for a single markets category — "view all" entries from Markets home (xStocks, top movers, watchlist, search results, etc.). No bottom CTA.
- **Stack (top → bottom):** absolute `containerTop` (StatusBar + MDSAppBar with **back arrow** leading, no trailing) → `MDSHeader` `screenHeader` (no top border, with description, no tags, no trailing content) → `container` (vertical stack of `MDS CurrencyListItem` rows, gap `list-item/spacing/between-stack`).
- **MUST** position `containerTop` as **absolute** (`top=0`); root frame reserves `pt=104` clearance (StatusBar 48 + AppBar 56). Required on scrollable screens taller than 812.
- **MUST NOT** apply horizontal padding to `container` or root — the 16 horizontal inset is owned by each `MDS CurrencyListItem` row.
- **MUST NOT** inject any gap between `MDSHeader screenHeader` and `container` — the header brings its own bottom padding.
- **MUST** reserve `spacing/padding/base` (16) on root `paddingBottom` as bottom safe area.
- **MUST** route a tap on any `MDS CurrencyListItem` to that asset's **detail screen** — the row tap is the only action on this layout (no bottom CTA, no row trailing chevron).
- **Copy:** [`../../content/index.md`](../../content/index.md) · per-slot limits below.

## Overview

The full-screen recipe a user lands on when they tap "View all" from a Markets section. It names the category, optionally narrates what's in it, and lists every asset that qualifies — one `MDS CurrencyListItem` per row, vertically scrollable, deep-link friendly. The recipe exists so every "view all" surface (xStocks, top movers, watchlist, category-from-search) looks and behaves identically regardless of which Markets entry point produced it.

Use it whenever the list is **read-only navigation** (tap a row → asset detail). For selectable lists (radio, currency picker) use `bottomSheetListItemSlot` instead — this is a screen, not a picker.

## Anatomy

```
┌──────────────────────────────────────────┐
│ 1. containerTop (absolute, top=0)        │
│    ┌──────────────────────────────────┐  │
│    │ 1a. StatusBar                    │  │
│    │ 1b. MDSAppBar (back arrow leading)│ │
│    └──────────────────────────────────┘  │
│ ↕ root pt = 104 (clearance)              │
│                                          │
│ 2. MDSHeader · screenHeader              │
│    ┌──────────────────────────────────┐  │
│    │ header (category title)          │  │
│    │ description (one line) │  │
│    └──────────────────────────────────┘  │
│ ↕ 0 — header owns its bottom padding     │
│                                          │
│ 3. container (flex column)               │
│    ┌──────────────────────────────────┐  │
│    │ MDS CurrencyListItem             │  │
│    │ MDS CurrencyListItem             │  │
│    │ MDS CurrencyListItem             │  │
│    │ … (scrollable; pagination opt.)  │  │
│    └──────────────────────────────────┘  │
│   (rows stack flush — component owns vertical rhythm) │
│                                          │
│ ↕ spacing/padding/base (safe area)       │
└──────────────────────────────────────────┘
```

## Stack order

| # | Element | Host / slot | Spec | Required | Notes |
|---|---------|-------------|------|----------|-------|
| 1 | `containerTop` | wrapper frame, **absolute** `top=0` | — | Yes | Holds status bar + app bar; full bleed |
| 1a | StatusBar | platform | — | Yes | OS-themed; auto-adapts to background |
| 1b | App Bar | `MDSAppBar` `variant=default` | [app-bar](../../components/app-bar.md) | Yes | **Back arrow** in leading; **no** trailing icons |
| 2 | Header | `MDSHeader` `variant=screenHeader` | [header](../../components/header.md) | Yes | `hasTopBorder=false` · `hasDescription` true when narrative adds value · no tags · no trailing content |
| 3 | List container | flex column, no gap between rows | — | Yes | N × `MDS CurrencyListItem`; vertically scrollable; rows own horizontal 16 inset and vertical rhythm |

Root frame: `paddingTop=104` (StatusBar 48 + AppBar 56) · `paddingBottom=spacing/padding/base` (16) · `background=color/background/default`. Container 2 sits at `y=104`; container 3 sits at `y=212` (104 + screenHeader 108).

## Variants

| Variant | When to use | Stack delta vs default | Figma node |
|---------|-------------|------------------------|------------|
| `default` | Title + description + scrollable list | — | `8:13823` |
| No description | Category name is self-explanatory ("Favoritos", "Top 10") | Element 2: `hasDescription=false` | — |
| With tag in header | Category needs a status chip ("Nuevo", "Beta") | Element 2: `hasTag1=true` with plain `tag` (per memory: skip descriptor in `MDSHeader`) | — |
| Paginated | List is too long for one fetch | Element 3 appends a load-more sentinel; row count grows on scroll | — |
| With pull-to-refresh | Live data (prices, watchlist) | Host wraps element 3 in refresh control; no spec impact on stack | — |

## Usage & behavior

### When to use

- MUST use for any "View all" entry from a Markets home section (`xStocks`, `Top movers`, `Watchlist`, category-filtered results).
- MUST use when rows are **read-only navigation** — tap a row opens the asset detail screen.
- MUST use as a deep-link target (push notification → category list) — back arrow returns to Markets home, not to the previous screen on the stack.

### When NOT to use

- MUST NOT use as a **selectable picker** (radio / currency / segmented choice) — use `bottomSheetListItemSlot` from the [bottom-sheet](../../components/bottom-sheet.md) component.
- MUST NOT use for short curated lists (≤3 items) — render them inline on the parent surface as a section instead.
- MUST NOT use when filter / search input is the primary action on the screen — that needs a SearchField at the top (different layout, out of scope here).
- MUST NOT use for non-asset lists (transactions, notifications, news) — those have their own row components and gaps, not `MDS CurrencyListItem`.
- MUST NOT add a bottom CTA — the row tap **is** the action.

### Edge cases

- **Long category title** wraps to 2 lines inside the `screenHeader` — never truncate. Description still fits below.
- **Empty category** (zero matching assets): swap element 3 for an empty-state illustration + one-line copy explaining the empty result (e.g. "Aún no hay activos en esta categoría"). Stack 1 and 2 remain.
- **Loading first paint**: render skeleton rows in element 3 with the same row height (78), no gap between them; do **not** change stack 1 or 2.
- **Pagination**: append a load-more sentinel row at the bottom of element 3; the bottom safe area still sits below the sentinel.
- **Pull-to-refresh**: wrap element 3 in the platform refresh control; the AppBar in element 1b stays visible during pull (absolute positioning).

## States

| State | Trigger | Stack/slot changes | Copy source |
|-------|---------|--------------------|-------------|
| Default | Category loaded with ≥1 asset | Full stack as above | [content/index.md](../../content/index.md) |
| Loading | First fetch in flight | Element 3 = skeleton rows (same height + gap); 1 + 2 unchanged | — |
| Empty | Fetch returned zero matches | Element 3 = empty-state illustration + one-line copy; 1 + 2 unchanged | [content/index.md](../../content/index.md) |
| Error | Fetch failed | Element 3 = inline error block with retry; 1 + 2 unchanged | [content/index.md](../../content/index.md) |
| Refresh | User pull-to-refresh | Element 3 wrapped in refresh control; rest unchanged | — |

## Interactions

| Interaction | Behavior | Source of truth |
|-------------|----------|-----------------|
| AppBar leading back tap | Navigates to the **entry surface** (Markets home or search) — not necessarily the previous stack screen | [app-bar](../../components/app-bar.md) |
| Row tap | Navigates to the **asset detail screen** for the tapped asset — push transition; the category list remains in the stack so back returns here | per `MDS CurrencyListItem` |
| Vertical scroll | Standard; `containerTop` stays anchored at the top of the viewport | — |
| Pull-to-refresh (when wired) | Re-fetches the list; spinner inside refresh control; AppBar visible throughout | — |
| Pagination on scroll-end (when wired) | Appends next page of rows to element 3 | — |
| Hardware back (Android) | Equivalent to AppBar back | [app-bar](../../components/app-bar.md) |
| Swipe-back (iOS) | Default — equivalent to AppBar back | [app-bar](../../components/app-bar.md) |

## Accessibility

> **Mobile** — VoiceOver · TalkBack. Copy → [`../../content/guidelines/accessibility.md`](../../content/guidelines/accessibility.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | Header is the screen heading; list container is a list; each row is a button (tap → detail) |
| Focus & traversal | On open, focus lands on the header title; traversal: header → first row → next row → … → AppBar back |
| Labels & announcements | Row announcement order: ticker, asset name, price + currency, percentage with trend + period (e.g. "NVDAx, Nvidia Corp., 179,73 USD, up 1.94% over 24 hours"); trend arrow is decorative — described by the percentage label |
| Touch & gestures | Rows ≥ 44×44 pt (iOS) / 48×48 dp (Android); AppBar back same; markers/icons inside rows not independently focusable |

## Design intent

A category list is **navigation**, not selection. Removing the bottom CTA and centering all action on the row tap keeps the surface honest: every row is a destination. `containerTop` is absolute so the AppBar persists during scroll without redrawing the header, and the screenHeader sits flush against the list because the list **is** the page content — no decorative gap.

## Token bindings

> [`../../tokens/token-reference.md`](../../tokens/token-reference.md) — no raw hex or px in body.

| Role | Token path | Element # | Notes |
|------|------------|:---------:|-------|
| Screen background | `color/background/default` | root | White surface |
| Top padding (containerTop clearance) | StatusBar 48 + AppBar 56 = **104** | root pt | Composed from container heights — **no token exists** for this sum; bound to the heights of 1a + 1b, not a raw layout value |
| Bottom safe area | `spacing/padding/base` (16) | root pb | Always reserved — per memory: scrollable screens reserve 16 below |
| Gap between list rows | 0 — no gap | 3 | Each `MDS CurrencyListItem` owns its own vertical rhythm; do **not** inject any spacing token between rows |
| Horizontal row inset | `spacing/padding/base` (16) | each row in 3 | Owned by `MDS CurrencyListItem` — **not** by `container` or root (per memory: horizontal gutter ownership) |
| Header → list gap | 0 | between 2 and 3 | `screenHeader` owns its bottom padding — MUST NOT inject extra stack gap (per memory) |
| Title typography | `title/base` | 2 | Owned by `screenHeader` |
| Description typography | `body/base` | 2 | Owned by `MDSHeader` description slot |
| AppBar surface | per [app-bar](../../components/app-bar.md) | 1b | Owned by host |

**MUST NOT override** AppBar height, `screenHeader` internal padding, `CurrencyListItem` row padding, or the inter-row gap. This recipe owns only the **screen background**, the **top clearance** (= 1a + 1b heights), and the **bottom safe area**.

## Text slot rules

> Voice and locale → [`../../content/index.md`](../../content/index.md).

| Slot | Element # | Max chars | Grammar | Examples |
|------|:---------:|:---------:|---------|----------|
| Header title (category name) | 2 | 24 | Sentence case noun phrase — short, scannable | "xStocks" · "Top movers" · "Favoritos" |
| Header description | 2 | 80 | One factual sentence about what the category contains — no marketing | "Obtén acciones con la flexibilidad de cripto." |
| Tag in header (when used) | 2 | 12 | Plain `tag` (per memory: no descriptor in `MDSHeader`) — short status | "Nuevo" · "Beta" |
| Row copy | 3 | — | Owned by `MDS CurrencyListItem`; not specified here | — |
| Empty-state copy | 3 (empty) | 80 | One factual sentence; no apology, no CTA in the copy | "Aún no hay activos en esta categoría." |

## Do / Don't

| Do | Don't |
|----|-------|
| Anchor `containerTop` absolutely at `top=0` and reserve `pt=104` on the root | Stack the AppBar inline — the list scrolls under it, not past it |
| Let each `CurrencyListItem` own its 16 horizontal inset | Add `paddingHorizontal=16` to `container` or root |
| Keep gap between header and list at 0 | Inject `spacing/stack/*` between header and list |
| Keep inter-row gap at 0 — each `MDS CurrencyListItem` owns its own vertical rhythm | Inject any spacing token between rows |
| Reserve `spacing/padding/base` below the last row | Let the last row flush against the bottom edge |
| Use a back arrow only in the AppBar | Add a trailing Close or overflow icon — it isn't a flow |
| State what the category contains in the description | Use the description for promotion or CTA-style copy |
| Tap a row to open detail | Add a bottom CTA — the row tap is the action |

## Examples

| Scenario | Surface | Notes |
|----------|---------|-------|
| xStocks  | "View all" from Markets Cripto category → xStocks section | Header: "xStocks" · description: "Obtén acciones con la flexibilidad de cripto." · 10+ rows scrollable |
| Search results filtered by category | From global search → "View all" in a category bucket | Header = category name · rows are search matches; back returns to search |

## Verification

- [ ] Stack matches the **Stack order** table top → bottom — `containerTop` (absolute) → `screenHeader` → list container — nothing else.
- [ ] AppBar has the **back arrow** in leading and **no trailing** icons.
- [ ] `MDSHeader` is `variant=screenHeader` with `hasTopBorder=false`; description present only when it adds value.
- [ ] Inter-row gap in element 3 is **0** — do not inject any spacing token between `MDS CurrencyListItem` rows.
- [ ] Horizontal 16 inset is owned by each `MDS CurrencyListItem` — `container` and root have **no** horizontal padding.
- [ ] Header → list gap is **0** (no stack gap, no padding) — header brings its own bottom padding.
- [ ] Root `paddingTop` = 104 (StatusBar 48 + AppBar 56); `paddingBottom` = `spacing/padding/base` (16).
- [ ] Scroll behavior: `containerTop` stays pinned; list scrolls under it; pull-to-refresh wired when applicable.
- [ ] Focus on entry lands on the header title; row announcement matches the Accessibility table.
- [ ] Tapping a `MDS CurrencyListItem` navigates to the asset detail screen — wired on every row.

## Related specs

- [`../../components/app-bar.md`](../../components/app-bar.md) — `variant=default` with back arrow leading
- [`../../components/header.md`](../../components/header.md) — `screenHeader` with optional description and tag
- [`../../figma-catalog/mobile-components.md`](../../figma-catalog/mobile-components.md) — `MDS CurrencyListItem` (no component spec yet)
- [`../../content/index.md`](../../content/index.md)
- [`../../tokens/token-reference.md`](../../tokens/token-reference.md)

---
