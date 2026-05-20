---
id: layout-home
name: Home Screen
category: product-layout
platform: mobile
tags: [home, balance, nudge, markets]
aliases: [home tab, inicio, pantalla de inicio]
status: draft
relationships:
  applies_to: [balance, bottom-navigation, app-bar, header]
  conflicts_with: []
  requires: [app-bar, bottom-navigation, header]
---

## Agent summary

- **MUST** use this layout for the Home top-level tab — the primary entry point showing greeting, balance, balance breakdown, product discovery, and market previews.
- **Shell:** absolute `topContainer` (StatusBar + `MDSAppBar` `variant=global, background=accent` + `MDSHeader` `variant=screenHeader, background=accent`) h=192 + absolute `navBottomContainer` `bottom=16`. Root: `pt=192` · `pb=110`.
- **Vertical rhythm uses per-row `pt: spacing/300` (24px) — no stack gap on the parent container.** Conditional rows (e.g. `signalRow`) are safe to add or remove without adjusting adjacent spacing.
- **Horizontal gutter (16px) is always owned by either the component or its direct wrapper — never both.** `MDSHeader`, `MDSBalance`, and `MDS balanceBreakdown` own their inset internally; explicit `px=spacing/margin/base` is added only on wrappers for components that do not own their own padding.
- **Copy:** [`../../content/index.md`](../../content/index.md)

## Overview

Home is the default landing screen. It opens with a personalized greeting, surfaces total balance with PnL, a breakdown by asset class, and optionally a product recommendation nudge. Below the balance area, product discovery cards and market previews (crypto, stocks) let users jump to key investment flows.

The nudge (`signalRow`) is transient — when dismissed or inactive it is not rendered, and the balance row's own `pt` maintains consistent vertical rhythm without any layout adjustment.

## Anatomy

```
┌──────────────────────────────────────────────┐
│ topContainer (absolute, top=0, h=192)        │
│   StatusBar (Android)                  h=48  │
│   MDSAppBar variant=global/accent      h=64  │
│   MDSHeader variant=screenHeader/accent h=80 │
│   "Hola, Carol"                              │
├──────────────────────────────────────────────┤
│ ↕ pt=192 · pb=110 (nav clearance)            │
│                                              │
│ 1. signalRow          [conditional]          │
│    MDS ProductRecommendation                 │
│    pt=spacing/300 (24) · px=spacing/margin/base (16) │
│                                              │
│ 2. balanceRow                                │
│    MDSBalance                                │
│    pt=spacing/300 (24) · px: component-owned │
│                                              │
│ 3. balanceBreakdownRow                       │
│    MDS balanceBreakdown                      │
│    pt=spacing/padding/lg (24)                │
│    pb=spacing/300 (24)                       │
│    px: component-owned                       │
│                                              │
│ 4. productsContainer                         │
│    sectionHeader "Fortalece tu portafolio"   │
│    list: 4 × MDS Product Entry Point         │
│    pb=spacing/padding/lg (24)                │
│    list px=spacing/margin/base (16)          │
│    list gap=spacing/inline/xs (8)            │
│                                              │
│ 5. topCryptoContainer                        │
│    sectionHeader "Mercado cripto" + Dropdown │
│    leadsContainer: 3 × MDSfeaturedAsset      │
│    pb=spacing/padding/lg (24)                │
│    leadsContainer px=spacing/padding/base (16)│
│    leadsContainer gap=spacing/inline/xs (8)  │
│                                              │
│ 6. topStockContainer                         │
│    sectionHeader "Mercado de acciones" + Dropdown │
│    leadsContainer: 3 × MDSfeaturedAsset      │
│    pb=spacing/padding/lg (24)                │
│    leadsContainer px=spacing/padding/base (16)│
│    leadsContainer gap=spacing/inline/xs (8)  │
│                                              │
├──────────────────────────────────────────────┤
│ navBottomContainer (absolute, bottom=16)     │
│   pb=spacing/padding/base (16)               │
│   px=spacing/padding/base (16)               │
│   MDS BottomNavigation showFourthTab=true    │
│   activeTab=Home + FAB (swap_horiz)          │
└──────────────────────────────────────────────┘
```

## Structure

### topContainer

| Layer | Component | Config |
|-------|-----------|--------|
| Status bar | `StatusBar` | `os=android` |
| App bar | `MDSAppBar` | `variant=global` · `background=accent` · hamburger `menu` · `SearchField` (On Accent) · gifts icon · notifications icon |
| Screen header | `MDSHeader` | `variant=screenHeader` · `background=accent` · `hasArrow=true` · `hasTrailingContent=true` · `hasIcon=false` · title "Hola, {name}" |
| ↳ Trailing | `MDSIconButton` | eye/hide icon · toggles balance visibility across `balanceRow` and `balanceBreakdownRow` |

`MDSHeader variant=screenHeader` sits flush below `MDSAppBar` — no gap between them (header brings its own `pt` internally).

### 1 — signalRow (conditional)

| Element | Component | Config |
|---------|-----------|--------|
| Nudge card | `MDS ProductRecommendation` | `hasCloseIconButton=true` · illustration varies per campaign |

Container: `pt=spacing/300` (24) · `px=spacing/margin/base` (16). Entire row is conditionally rendered — not an empty wrapper. When absent, `balanceRow` becomes the first scroll element with no adjustment needed.

### 2 — balanceRow

| Element | Component | Config |
|---------|-----------|--------|
| Balance | `MDSBalance` | `isBalanceVisisble=true` · `hasPnl=true` · `hasInfoButton=true` · `hasSaldoTotalLabel=true` · `hasEyeIcon=true` |

Nested slots (do not instantiate separately): **MDS currencyPrice** (`title/base`) · **MDS IconButton** (eye + info) · **MDS PnL2** (`showTitle=false` · `showFiatAmount=true`). See [`balance.md`](../../components/balance.md).

Container: `pt=spacing/300` (24). Horizontal padding is owned internally by `MDSBalance` — do not add `px` on the wrapper.

### 3 — balanceBreakdownRow

Three asset-class rows, always rendered (shows "0 MXN" when empty):

| Asset class | Icon |
|-------------|------|
| Efectivo | `attach_money` |
| Cripto | `currency_bitcoin` |
| Acciones | `candlestick_chart` |

Each row: icon + `MDSCurrencyPrice` (xs, high emphasis) + `MDSIconButton` `chevron_forward`. Container: `pt=spacing/padding/lg` (24) · `pb=spacing/300` (24). Horizontal padding owned by `MDS balanceBreakdown`.

### 4 — productsContainer

| Element | Component | Config |
|---------|-----------|--------|
| Section header | `MDSHeader` | `variant=sectionHeader` · `hasTopBorder=true` · no trailing content · "Fortalece tu portafolio" |
| Product list | `MDS Product Entry Point` × 4 | `hasAnimatedBorder=false` · `hasTag=false` · `state=Default` |

Products in order: Cripto · Acciones · Efectivo · Ingresos adicionales.

List wrapper: `px=spacing/margin/base` (16) · `gap=spacing/inline/xs` (8). Container `pb=spacing/padding/lg` (24).

### 5 — topCryptoContainer

| Element | Component | Config |
|---------|-----------|--------|
| Section header | `MDSHeader` | `variant=sectionHeader` · `hasTopBorder=true` · `hasTrailingContent=true` · "Mercado cripto" |
| Dropdown | `MDS Dropdown` | trailing · label "En alza" · `keyboard_arrow_down` |
| Featured assets | `MDSfeaturedAsset` × 3 | `hasFavIcon=true` · `hasChart=true` · `state=Default` |

`leadsContainer`: `px=spacing/padding/base` (16) · `gap=spacing/inline/xs` (8). Container `pb=spacing/padding/lg` (24).

### 6 — topStockContainer

| Element | Component | Config |
|---------|-----------|--------|
| Section header | `MDSHeader` | `variant=sectionHeader` · `hasTopBorder=true` · `hasTrailingContent=true` · "Mercado de acciones" |
| Dropdown | `MDS Dropdown` | trailing · label "Líderes" · `keyboard_arrow_down` |
| Featured assets | `MDSfeaturedAsset` × 3 | `hasFavIcon=true` · `hasChart=true` · `state=Default` |

`leadsContainer`: `px=spacing/padding/base` (16) · `gap=spacing/inline/xs` (8). Container `pb=spacing/padding/lg` (24).

## Usage & behavior

### When to use

- MUST use for the Home top-level tab.
- MUST render `balanceRow` as the first visible scroll element when `signalRow` is absent.
- MUST use `MDSAppBar variant=global, background=accent` — Home is a top-level tab.

### When NOT to use

- MUST NOT add a stack `gap` on the scroll container — all vertical spacing is owned per row via `pt`.
- MUST NOT apply `px` on wrappers for components that already own their horizontal inset (`MDSBalance`, `MDS balanceBreakdown`, `MDSHeader`).
- MUST NOT use `screenHeader` below the `topContainer` — greeting header lives in the fixed shell, not in the scroll area.

### Edge cases

- **Nudge absent:** `signalRow` is not rendered. `balanceRow`'s `pt=spacing/300` provides the same 24px gap from `topContainer` that would otherwise be the gap below the nudge card. No layout adjustment needed.
- **Nudge present:** `signalRow` `pt=spacing/300` → nudge card → `balanceRow` `pt=spacing/300` → balance. The nudge inserts without changing downstream spacing.
- **Balance hidden:** All amounts in `balanceRow` and `balanceBreakdownRow` mask as `********` per [`balance.md`](../../components/balance.md); PnL percentage and period label remain visible.
- **Zero balance (asset class):** Shows "0 MXN" — all three breakdown rows always render.

## Interactions

| Interaction | Behavior |
|-------------|----------|
| Nudge close tap | Dismisses `signalRow`; `balanceRow` takes 24px gap from `topContainer` |
| Nudge card tap | Opens promoted feature or product flow |
| Balance visibility tap | Toggles all amounts masked/unmasked |
| Info button tap | Opens balance info sheet |
| Breakdown row chevron tap | Navigates to asset class detail |
| Product Entry Point tap | Opens product onboarding or detail flow |
| Featured asset card tap | Opens asset detail screen |
| Dropdown tap | Filters featured assets list (e.g. "En alza", "Líderes") |
| Bottom nav tap | Navigates to selected top-level tab |
| FAB tap | Opens quick trade / swap flow |

## Accessibility

> **Mobile** — VoiceOver · TalkBack. Copy → [`../../content/guidelines/accessibility.md`](../../content/guidelines/accessibility.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | Balance value: live region (updates on toggle); nudge: dismissible region |
| Focus & traversal | On open, focus lands on balance; nudge (when present) is announced before balance |
| Labels & announcements | Eye toggle reads "Mostrar saldo" / "Ocultar saldo"; nudge close reads "Cerrar" |
| Touch & gestures | All targets ≥ 44×44 pt / 48×48 dp |

## Design intent

**Vertical rhythm:** Each content row carries its own `pt` — there is no stack gap on the parent. This lets conditional rows (nudge, future banners) appear or disappear without cascading spacing changes. When the nudge is absent, the balance sits exactly where it would if the nudge had never existed.

**Horizontal gutter:** The 16px screen inset is always owned once — either by the component or by its wrapper row. This prevents double-insets when components are replaced or reordered.

## Token bindings

> [`../../tokens/token-reference.md`](../../tokens/token-reference.md) — no raw hex or px.

| Role | Token path | Notes |
|------|------------|-------|
| Screen background | `color/background/default` | Root |
| `topContainer` clearance | 48 + 64 + 80 = **192** | StatusBar + AppBar + screenHeader; bind as `pt` on root |
| Bottom clearance | **110** | `pb` on root — matches floating `navBottomContainer` footprint |
| signalRow top padding | `spacing/300` (24) | `pt` · conditional row owns its own top gap |
| signalRow horizontal padding | `spacing/margin/base` (16) | `px` on wrapper — `ProductRecommendation` does not own inset |
| balanceRow top padding | `spacing/300` (24) | `pt` · same token whether nudge is above or not |
| balanceBreakdownRow top padding | `spacing/padding/lg` (24) | `pt` |
| balanceBreakdownRow bottom padding | `spacing/300` (24) | `pb` |
| productsContainer bottom padding | `spacing/padding/lg` (24) | `pb` |
| products list horizontal padding | `spacing/margin/base` (16) | `px` on list wrapper |
| products list gap | `spacing/inline/xs` (8) | Between `Product Entry Point` cards |
| leadsContainer horizontal padding | `spacing/padding/base` (16) | `px` on featured assets row |
| leadsContainer gap | `spacing/inline/xs` (8) | Between `MDSfeaturedAsset` cards |
| topCryptoContainer bottom padding | `spacing/padding/lg` (24) | `pb` |
| topStockContainer bottom padding | `spacing/padding/lg` (24) | `pb` |
| navBottomContainer bottom offset | 16 | `bottom` — floats above screen edge |
| navBottomContainer padding | `spacing/padding/base` (16) | `pb` and `px` |

## Text slot rules

> Voice and locale → [`../../content/index.md`](../../content/index.md).

| Slot | Max chars | Grammar |
|------|:---------:|---------|
| Greeting title | 20 | "Hola, {name}" — sentence case |
| Balance amount | — | Formatted number + currency; masked as `********` when hidden |
| Nudge title | 32 | Sentence case noun phrase |
| Nudge description | 60 | Short sentence |
| Breakdown asset label | 12 | Noun ("Efectivo", "Cripto", "Acciones") |
| Products section header | 28 | Sentence case ("Fortalece tu portafolio") |
| Product entry title | 16 | Noun ("Cripto", "Acciones", "Efectivo", "Ingresos adicionales") |
| Product entry description | 60 | Short sentence |
| Market section header | 24 | Sentence case ("Mercado cripto", "Mercado de acciones") |
| Dropdown label | 10 | Noun phrase ("En alza", "Líderes") |

## Verification

- [ ] `topContainer` absolute `top=0` h=192; root `pt=192` · `pb=110`
- [ ] `MDSAppBar` `variant=global, background=accent` — hamburger · SearchField (On Accent) · gifts · notifications
- [ ] `MDSHeader` `variant=screenHeader, background=accent` flush below AppBar — "Hola, {name}" · `hasArrow=true` · `hasTrailingContent=true`
- [ ] `signalRow` is **not rendered** when no nudge is active — `balanceRow` becomes first scroll element with no layout change
- [ ] `signalRow` uses `pt=spacing/300` · `px=spacing/margin/base` · **no parent stack gap**
- [ ] `balanceRow` uses `pt=spacing/300` — same token whether above nudge or above topContainer
- [ ] `MDSBalance` has `isBalanceVisisble=true` · `hasPnl=true` · `hasInfoButton=true` · `hasSaldoTotalLabel=true` · `hasEyeIcon=true`
- [ ] `balanceBreakdownRow` renders all three asset classes · `pt=spacing/padding/lg` · `pb=spacing/300` · no `px` on wrapper
- [ ] `productsContainer` sectionHeader `hasTopBorder=true` · list `px=spacing/margin/base` · `gap=spacing/inline/xs` · 4 Product Entry Points in order
- [ ] `topCryptoContainer` sectionHeader + Dropdown "En alza" · `leadsContainer` `px=spacing/padding/base` · `gap=spacing/inline/xs` · 3 featured assets
- [ ] `topStockContainer` sectionHeader + Dropdown "Líderes" · same `leadsContainer` rules as crypto
- [ ] 16px horizontal inset applied **once** — either by component or wrapper, not both
- [ ] `navBottomContainer` `absolute bottom=16` · `pb/px=spacing/padding/base` · `MDS BottomNavigation` `activeTab=Home` · FAB `swap_horiz`

## Related specs

- [`../../components/app-bar.md`](../../components/app-bar.md) — `variant=global, background=accent`
- [`../../components/header.md`](../../components/header.md) — `variant=screenHeader/accent` and `variant=sectionHeader`
- [`../../components/bottom-navigation.md`](../../components/bottom-navigation.md) — `activeTab=Home` · FAB embedded
- [`../../components/product-recommendation.md`](../../components/product-recommendation.md) — `signalRow` conditional nudge card
- [`../../components/balance.md`](../../components/balance.md) — `MDSBalance` · show/hide · PnL rules
- [`../../figma-catalog/mobile-components.md`](../../figma-catalog/mobile-components.md) — `MDS ProductRecommendation`, `MDSBalance`, `MDS PnL2`, `MDS balanceBreakdown`, `MDS Product Entry Point`, `MDSfeaturedAsset`, `MDS Dropdown`
- [`../../content/index.md`](../../content/index.md)
- [`../../tokens/token-reference.md`](../../tokens/token-reference.md)

---
