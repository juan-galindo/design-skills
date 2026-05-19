---
id: layout-portfolio-all
name: Portfolio All
category: product-layout
platform: mobile
tags: [portfolio]
aliases: [portafolio todo, portfolio screen, portfolio all tab]
status: draft
relationships:
  applies_to: [portfolio-tab]
  conflicts_with: []
  requires: [app-bar, tabs, header, accordion]
---

## Agent summary

- **MUST** use this layout for the Portfolio "Todo" tab — the full portfolio view showing balance, chart, scheduled transactions, assets, and movements.
- **Shell:** absolute `containerTop` (StatusBar + `MDSAppBar` `variant=global, background=accent` + `MDSTabs` 4 tabs) h=164 + absolute `navigationApp` bottom bar. Root: `pt=164` · `pb=110`.
- **Balance row** MUST be the first scroll element: `MDS CurrencyPrice` (large) + `MDS IconButton` (visibility toggle). No `sectionHeader` above it.
- **MUST NOT** render a `screenHeader` — `MDSTabs` establishes screen identity; `sectionHeader` is the correct header variant throughout.
- **"Tus activos" sectionHeader** MUST have `hasTopBorder=true` and `hasTrailingContent=true` with `MDS Dropdown` (sorts the list — e.g. by Patrimonio).
- **"Movimientos" sectionHeader** has `hasTopBorder=false`. Shows exactly **3 most recent** movements filtered by active tab.
- **Both "Tus activos" and "Movimientos"** filter their content by the active `MDSTabs` selection — same layout instance for all 4 tabs.
- **Asset rows** MUST use `TransactionalListItem` + trailing `chevron_down`; tapping expands an `AssetAdditionalData` card inline.
- **Stablecoin baskets** (MXN, USD) MUST render as a parent row + nested `BFF NestedTransactionalListItem` sub-rows for each underlying token.
- **Copy:** [`../../content/index.md`](../../content/index.md)

## Overview

Portfolio All is the primary wealth overview screen. It combines a real-time balance, a multi-mode performance chart, scheduled transactions, an expandable asset list, and recent movements in one scrollable surface. `MDSTabs` lets users filter to specific asset classes (cash, crypto, stocks/ETFs) without leaving the portfolio context.

Asset rows expand inline to reveal gain/loss, allocation, and price detail plus buy/sell CTAs. Stablecoins group under a parent fiat currency row (MXN basket, USD basket) with nested sub-rows for each token.

## Anatomy

```
┌──────────────────────────────────────────────┐
│ containerTop (absolute, top=0, h=164)        │
│   StatusBar                            h=48  │
│   MDSAppBar variant=global/accent      h=64  │
│   MDSTabs 4 tabs (default)             h=52  │
├──────────────────────────────────────────────┤
│ ↕ pt=164 · pb=110 (nav clearance)            │
│                                              │
│ 1. Balance row                               │
│    MDS CurrencyPrice (large) + IconButton    │
│    pt=24 · px=16 · gap=12                    │
│                                              │
│ 2. MDSPortfolioChart                         │
│    pt=24                                     │
│    chart tabs · line chart · timeframe row   │
│                                              │
│ 3. Scheduled transactions accordion          │
│    pt=24 · MDS Accordion (collapsed)         │
│                                              │
│ 4. Assets section                            │
│    sectionHeader "Tus activos" + Dropdown    │
│    expandable TransactionalListItem rows     │
│    ↳ expanded: AssetAdditionalData card      │
│    ↳ baskets: BFF NestedTransactionalListItem│
│                                              │
│ 5. Movements section                         │
│    sectionHeader "Movimientos"               │
│    card: TransactionalListItem × N + TextBtn │
│                                              │
├──────────────────────────────────────────────┤
│ navigationApp (absolute, bottom, h=110)      │
│   MDS BottomNavigation + FAB button          │
└──────────────────────────────────────────────┘
```

## Structure

### 1 — Balance row

| Element | Component | Config |
|---------|-----------|--------|
| Total portfolio value | `MDS CurrencyPrice` | `size=large` · `emphasis=high` · currency=MXN |
| Visibility toggle | `MDS IconButton` | eye icon; toggles masked/unmasked state for all amounts |

Container: `pt=spacing/padding/lg` (24) · `px=spacing/padding/base` (16) · `gap=spacing/inline/sm` (12)

### 2 — MDSPortfolioChart

| Slot | Content | Config |
|------|---------|--------|
| Chart tabs | "Desempeño total" · "G&P" · "Ingresos" · "Distribución" | Horizontal row · `px=spacing/padding/base` (16); active tab `bg=color/surface/default` · top corners `border/radius/500` (12) |
| Chart card | PnL row + line chart + timeframe selector | `bg` gradient surface/default → accent · bottom corners `card/border/radius` (16) · w=343 |
| PnL row | Gain amount + `PriceChangePercentage` + info `IconButton` | `pt=spacing/padding/sm` (12) · `pb=spacing/100` (8) · `px=spacing/padding/base` (16) |
| Line chart | `MDSLineGraph` | h=156 · full-width inside card |
| Timeframe row | 1S · 1M · 6M · 1A · **Total** (selected) | `pt=spacing/padding/base` (16) · `pb=spacing/padding/base` (16) · `px=spacing/padding/base` (16); selected chip: `bg=color/ontertiary/default` · text `color/ontertiary/selected` |

Container: `pt=spacing/padding/lg` (24)

### 3 — Scheduled transactions accordion

| Element | Component | Config |
|---------|-----------|--------|
| Accordion row | `MDS Accordion` | label "Transacciones programadas" · `chevron_down` trailing · **collapsed** by default |

Wrapper: `pt=spacing/padding/lg` (24). Accordion internal: `pl=spacing/padding/base` (16) · `pr=spacing/padding/sm` (12) · `py=spacing/padding/lg` (24) · top and bottom border lines.

### 4 — Assets section

**Section header:**

`MDSHeader` `variant=sectionHeader` · `hasTopBorder=true` · `hasTrailingContent=true` (trailing: `MDS Dropdown` "Patrimonio" + `chevron_down`)

The Dropdown **sorts / organizes** the asset list (e.g. by Patrimonio = portfolio value). It does not filter by asset type — that is the responsibility of `MDSTabs`. AssetsWrapper content is always **filtered by the active tab** (Todo = all · Efectivo = cash · Criptos = crypto · Acciones y ETFs = stocks/ETFs); the Dropdown determines the ordering within that filtered set.

**Standard asset rows:**

| Prop | Value |
|------|-------|
| Component | `TransactionalListItem` |
| `hasBorder` | `false` |
| `hasEstimatedAmount` | `true` — shows quantity (e.g. "1.09 acciones", "0.32 BTC") |
| `hasPrefixIcon` | `true` — stock or crypto icon |
| Trailing | `MDS Icon` `chevron_down` · wrapper `pr=spacing/padding/sm` (12) |

**Expanded asset detail card (`AssetAdditionalData`):**

Renders inline below the tapped row · `bg=color/surface/default` · `borderRadius=card/border/radius` (16) · `p=spacing/padding/base` (16) · w=343

Three data groups (each after the first has `pt=spacing/padding/lg` (24)):

| Group | Eyebrow label | Data rows |
|-------|---------------|-----------|
| Ganancias | uppercase · `eyebrow/small` · `letterSpacing/200` | Totales [amount · %] · Hoy [amount · %] |
| Portafolio | same | Distribución [%] |
| Precio | same | Promedio base · Promedio de compra · Actual · Total |

Data row layout: `gap=list-item/spacing/inline` (16) · label `flex-1` · value right-aligned. Gain/loss values: amount + percentage with trend color inline. Rows within a group: `gap=spacing/stack/xs` (4).

CTA row (bottom of card): `MDS ButtonSecondary` "Comprar" + `MDS ButtonSecondary` "Vender" · full-width split · `gap=spacing/inline/xs` (8) · `pt=spacing/padding/lg` (24).

**Stablecoin basket rows:**

Parent row: `TransactionalListItem` with fiat icon · `hasEstimatedAmount=false` · no trailing chevron.

Nested sub-rows: `BFF NestedTransactionalListItem` · `pl=spacing/padding/base` (16) · `pr=52` · tree-line icon on left.

| Basket | Parent ticker | Nested tokens | Notes |
|--------|---------------|---------------|-------|
| MXN | "MXN" / Pesos mexicanos | MXN · MXNB | Legal disclaimer below MXNB row |
| USD | "USD" / Dólares | USDC · USDT | Nested token amount shown in both MXN and token units |

MXN legal disclaimer: `tiny/base` · `color/onbackground/lowemphasis` · `pl=96` · `pr=52` · `pb=spacing/padding/base` (16).

### 5 — Movements section

**Section header:** `MDSHeader` `variant=sectionHeader` · `hasTopBorder=false` · `hasDescription=false` · no trailing content

**MovementsWrapper card:** `bg=color/surface/default` · `borderRadius=card/border/radius` (16) · `pb=spacing/padding/2xs` (4) · no top padding (rows start flush at top of card) · w=343 · `mx=spacing/padding/base` (16)

Content: exactly **3 most recent** `TransactionalListItem` rows, filtered by the active tab (Todo = all asset types; Efectivo = cash; Criptos = crypto; Acciones y ETFs = stocks/ETFs). Transactions can carry `MDS Tag` (e.g. "Dividendo", "Earn"). Rows stack flush — no gap between them. Last element: `MDS TextButton` "Revisar todo →" · no external spacing — placed flush after the last row.

## Usage & behavior

### When to use

- MUST use for the Portfolio "Todo" tab — the all-assets portfolio view.
- MUST render the balance row and chart before any section headers.
- MUST use `MDSTabs` (4 tabs) pinned inside `containerTop`.

### When NOT to use

- MUST NOT use a separate layout for filtered tabs ("Efectivo", "Criptos", "Acciones y ETFs") — all tabs use this same layout; both `AssetsWrapper` and `MovementsWrapper` filter their content by the active tab.
- MUST NOT place the balance row inside a `sectionHeader` — it is not a section.
- MUST NOT add a standalone full-screen bottom CTA — actions ("Comprar", "Vender") live inside the expanded asset card.

### Edge cases

- **Balance hidden**: Replace all amounts on screen with "••••••" when visibility is toggled off. Chart PnL values also mask.
- **Zero assets**: Show `MDS emptyState` inside AssetsWrapper. Section header "Tus activos" + Dropdown remain visible.
- **Single USD stablecoin**: Display as a single `TransactionalListItem` row — no parent basket, no nesting. (Figma dev annotation.)
- **MXN basket pending feature**: May render without nesting until savings team builds full functionality. (Figma dev annotation.)
- **Accordion expanded**: "Transacciones programadas" grows in place; rest of scroll stack shifts down.
- **Asset row expanded**: `AssetAdditionalData` card renders inline below the tapped row; `chevron_down` rotates 180°.
- **Empty movements (active tab)**: Hide MovementsWrapper card and "Movimientos" section header — do not render an empty shell. If movements exist in other tabs but not the current one, the section is still hidden for that tab.
- **Tab switch**: Content filters to selected asset class; `containerTop` stays pinned; scroll resets to top.

## Interactions

| Interaction | Behavior |
|-------------|----------|
| Vertical scroll | Content scrolls; `containerTop` pinned |
| Balance visibility tap | Toggles all amounts masked/unmasked on screen |
| Chart tab tap | Switches chart mode (Desempeño total / G&P / Ingresos / Distribución) |
| Timeframe chip tap | Re-renders chart for selected period; chip updates selection state |
| Accordion tap | Expands / collapses "Transacciones programadas" inline |
| Asset row tap | Toggles `AssetAdditionalData` inline expansion; chevron rotates |
| "Comprar" / "Vender" tap | Opens buy/sell flow for that asset |
| `MDS Dropdown` tap ("Patrimonio") | Opens sort sheet; changes ordering of asset rows within the active tab |
| "Revisar todo →" tap | Navigates to full movements history |
| `MDSTabs` tap | Filters to asset class; resets scroll |
| Bottom nav tap | Navigates to selected top-level tab |
| FAB tap | Opens quick trade / swap flow |

## Accessibility

> **Mobile** — VoiceOver · TalkBack. Copy → [`../../content/guidelines/accessibility.md`](../../content/guidelines/accessibility.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | Balance value: live region (updates on toggle); accordion: button role; asset rows: buttons (expandable); chart: labeled landmark |
| Focus & traversal | On open, focus lands on balance row; order: balance → chart → accordion → first asset row → movements |
| Labels & announcements | Visibility toggle reads "Mostrar saldo" / "Ocultar saldo"; asset row reads ticker, name, amount; expanded card reads data groups in order; transaction reads action, amount, date |
| Touch & gestures | All targets ≥ 44×44 pt / 48×48 dp; FAB and bottom nav always reachable regardless of scroll position |

## Design intent

Portfolio All is a **wealth dashboard**, not a transaction log. Balance + chart occupy the top to establish context before any content hierarchy. The accordion keeps scheduled transactions collapsed by default — present but not intrusive. Asset rows are expandable so rich detail (gains, price basis, allocation) is available on demand without cluttering the list. The stablecoin basket pattern groups tokens under a fiat identity because users think in currencies, not underlying assets.

`MDSAppBar` uses `variant=global, background=accent` — Portfolio is a top-level tab, same shell as Home and Markets.

## Token bindings

> [`../../tokens/token-reference.md`](../../tokens/token-reference.md) — no raw hex or px.

| Role | Token path | Notes |
|------|------------|-------|
| Screen background | `color/background/default` | Root |
| `containerTop` clearance | 48 + 64 + 52 = **164** | Composed from component heights; bind `pt` |
| Bottom nav clearance | **110** | `pb` on root; matches `navigationApp` height |
| Balance row top padding | `spacing/padding/lg` (24) | `pt` |
| Balance row horizontal padding | `spacing/padding/base` (16) | `px` |
| Balance row gap | `spacing/inline/sm` (12) | Between price and icon button |
| Chart top padding | `spacing/padding/lg` (24) | `pt` on chart section |
| Chart card width | 343 | 375 − 2 × `spacing/padding/base` (16) |
| Chart card bottom radius | `card/border/radius` (16) | Bottom corners only |
| Chart tab top radius | `border/radius/500` (12) | Top corners only |
| Active timeframe chip bg | `color/ontertiary/default` | |
| Active timeframe chip text | `color/ontertiary/selected` | |
| Accordion top padding | `spacing/padding/lg` (24) | `pt` on wrapper |
| Accordion internal padding | `pl=spacing/padding/base` · `pr=spacing/padding/sm` · `py=spacing/padding/lg` | Owned by `MDS Accordion` |
| Asset trailing chevron padding | `spacing/padding/sm` (12) | `pr` on each row wrapper |
| Asset detail card background | `color/surface/default` | |
| Asset detail card radius | `card/border/radius` (16) | |
| Asset detail card padding | `spacing/padding/base` (16) | All sides |
| Data group separator | `spacing/padding/lg` (24) | `pt` on 2nd and 3rd groups |
| Data row label→value gap | `list-item/spacing/inline` (16) | |
| Data rows internal gap | `spacing/stack/xs` (4) | Rows within a group |
| CTA gap | `spacing/inline/xs` (8) | "Comprar" ↔ "Vender" |
| CTA top padding | `spacing/padding/lg` (24) | `pt` on CTA row within card |
| MXN disclaimer indent | `pl=96` · `pr=52` | Aligns under nested row text |
| MXN disclaimer bottom | `spacing/padding/base` (16) | `pb` |
| Movements card background | `color/surface/default` | |
| Movements card radius | `card/border/radius` (16) | |
| Movements card bottom padding | `spacing/padding/2xs` (4) | `pb` only — no top padding; rows start flush |
| Movements card inset | `spacing/padding/base` (16) | `mx` on wrapper |
| Eyebrow label tracking | `typography/letterSpacing/200` | Data group labels — uppercase |

## Text slot rules

> Voice and locale → [`../../content/index.md`](../../content/index.md).

| Slot | Max chars | Grammar |
|------|:---------:|---------|
| Balance amount | — | Formatted number + currency; masked as "••••••" when hidden |
| Chart tab labels | 20 | Short noun phrase; sentence case |
| Timeframe chips | 5 | Abbreviated: 1S · 1M · 6M · 1A · Total |
| Accordion label | 28 | Noun phrase; sentence case |
| Section header titles | 20 | Sentence case noun phrase |
| Dropdown label | 16 | Noun phrase (current sort mode) |
| Asset ticker | 6 | Uppercase ticker |
| Asset description | 28 | Full asset name |
| Estimated quantity | 24 | Numeric + ticker symbol |
| Data group eyebrow | 16 | Uppercase (Ganancias · Portafolio · Precio) |
| CTA labels | 10 | Verb; sentence case ("Comprar" · "Vender") |
| Movements TextButton | 20 | Verb phrase ("Revisar todo →") |

## Verification

- [ ] `containerTop` absolute `top=0` h=164; root `pt=164` · `pb=110`
- [ ] `MDSAppBar` `variant=global, background=accent` — hamburger · SearchField · gifts · notifications
- [ ] `MDSTabs` has **4 tabs**: Todo · Efectivo · Criptos · Acciones y ETFs
- [ ] Balance row is **first in scroll**: `MDS CurrencyPrice` (large) + `MDS IconButton` — no section header above
- [ ] Chart section uses gradient card (w=343) with chart tabs on top, timeframe row at bottom
- [ ] Accordion "Transacciones programadas" is **collapsed** by default
- [ ] "Tus activos" header: `hasTopBorder=true` · `hasTrailingContent=true` with `MDS Dropdown`
- [ ] Each asset row wrapper has `pr=spacing/padding/sm` (12) for trailing chevron
- [ ] Expanded card: `bg=color/surface/default` · `borderRadius=card/border/radius` · `p=spacing/padding/base` · three data groups + CTA row
- [ ] Stablecoin baskets (MXN, USD) render as parent + `BFF NestedTransactionalListItem` sub-rows
- [ ] MXN basket includes legal disclaimer text below MXNB sub-row
- [ ] "Movimientos" header: `hasTopBorder=false` · no trailing content
- [ ] Movements card (w=343) shows **exactly 3** most recent rows, filtered by active tab, and ends with `MDS TextButton` "Revisar todo →"
- [ ] `navigationApp` includes FAB button

## Related specs

- [`../../components/app-bar.md`](../../components/app-bar.md) — `variant=global, background=accent`
- [`../../components/header.md`](../../components/header.md) — `variant=sectionHeader`
- [`../../components/accordion.md`](../../components/accordion.md) — `MDS Accordion` collapsed default
- [`../../figma-catalog/mobile-components.md`](../../figma-catalog/mobile-components.md) — `TransactionalListItem`, `BFF NestedTransactionalListItem`, `MDSPortfolioChart`, `MDS Dropdown`
- [`../../content/index.md`](../../content/index.md)
- [`../../tokens/token-reference.md`](../../tokens/token-reference.md)

---
