---
id: crypto-asset-detail
name: Crypto Asset Detail
category: pattern
platform: mobile
tags: [layout, full-screen, asset-view]
aliases: [asset-detail, currency-detail]
variants: [no-holdings, with-holdings, with-holdings-yields, ponef]
status: draft
figma_nodes:
  - no-holdings: 56:8170
  - with-holdings: 57:7986
  - with-holdings-yields: 58:8246
  - ponef: 57:7403
relationships:
  applies_to: [screen]
  requires: [header, line-graph, read-only-list, bottom-ctas, accordion, tag, progress-bar, info-panel]
  conflicts_with: []
---

## Agent summary

- **Three variants**: no-holdings (market only) vs. with-holdings vs. with-holdings-yields
- MUST use fixed header (StatusBar + MDSAppBar) with back/star actions
- MUST position scrollable content with 16px inset and proper spacing zones
- MUST anchor fixed footer (FixedCTAs) with safe area padding
- MUST show "Tu posición" section in with-holdings and with-holdings-yields variants
- MUST show yields Nudge ONLY in with-holdings-yields variant (after position, before stats)
- MUST follow zone stacking: legal → header → market price → chart → [position] → [yields nudge] → stats → accordion
- MUST show MDSInfoPanel below AppBar (PONEF overlay) when a liquidity restriction or market suspension is active for the asset
- **Copy:** [`content/index.md`](../content/index.md) for all text elements

## Overview

The Crypto Asset Detail layout displays a single cryptocurrency's market information, price history, and statistics. It combines a fixed header bar for navigation, a scrollable content area with tiered information density, and fixed action buttons for primary user intents (buy, sell, send).

This pattern has three base variants plus one edge case overlay:
- **No holdings**: Market data only (price, chart, market statistics)
- **With holdings**: Market data + user's position details (balance, P&L, average prices, portfolio distribution)
- **With holdings + yields**: Market data + position + yield activation nudge (for eligible assets like BTC, USDC, ATOM)
- **PONEF** (overlay): Protection for Non-Enrolled Funds — injected info panel when a black swan event (liquidity restriction, market suspension) blocks transactions for the asset

This pattern serves as the primary deep-link destination for viewing a single asset from market lists, watchlists, search results, or portfolio views.

## Variants

| Variant | When to use | Position section | Yields nudge | Info panel |
|---------|-------------|------------------|-------------|------------|
| **No holdings** | User does not own the asset; browsing market data | Omitted | No | No |
| **With holdings** | User owns the asset; Earn not available for this asset | Included after chart | No | No |
| **With holdings + yields** | User owns asset eligible for Earn (e.g., BTC, USDC, ATOM); Earn inactive | Included after chart | Yes, after position | No |
| **PONEF** *(overlay)* | Black swan event blocks transactions (any base variant) | As per base variant | As per base variant | Yes — below AppBar |

## Structure

| Zone | Component | Surface | Purpose |
|------|-----------|---------|---------|
| Header | MDSAppBar | Fixed, top | Navigation (back, favorite star) |
| Content | Stack | Scrollable | Asset info, price, chart, stats, position |
| Footer | FixedCTAs | Fixed, bottom | Primary actions (buy/sell, send) |

### No holdings variant

1. **Legal banner** — MDSLegal (optional disclosure)
2. **Asset header** — MDSHeader with crypto icon, asset name
3. **Market price** — CurrencyPrice (current price) + PnL (market trend)
4. **Chart** — MDSLineGraph + Timeframes selector
5. **Statistics** — MDSHeader ("Estadísticas") + ReadOnlyList (market data)
6. **Additional info** — MDSAccordion (expandable sections)

### With holdings variant

1. **Legal banner** — MDSLegal (optional disclosure)
2. **Asset header** — MDSHeader with crypto icon, asset name
3. **Market price** — CurrencyPrice (current price) + PnL (market trend)
4. **Chart** — MDSLineGraph + Timeframes selector
5. **Position** — MDSHeader ("Tu posición") + ReadOnlyList:
   - Saldo total (fiat + crypto tag)
   - Saldo disponible (available fiat)
   - Ganancias y pérdidas (P&L + % tag)
   - Precio promedio de compra (average entry)
   - Precio promedio de venta (average exit)
   - Distribución en el portfolio (progress bar)
6. **Statistics** — MDSHeader ("Estadísticas") + ReadOnlyList (market data)
7. **Additional info** — MDSAccordion (expandable sections)

### With holdings + yields variant

1. **Legal banner** — MDSLegal (optional disclosure)
2. **Asset header** — MDSHeader with crypto icon, asset name
3. **Market price** — CurrencyPrice (current price) + PnL (market trend)
4. **Chart** — MDSLineGraph + Timeframes selector
5. **Position** — MDSHeader ("Tu posición") + ReadOnlyList (same as with-holdings variant)
6. **Yields nudge** — MDSNudge with:
   - Illustration (earnings/increase icon)
   - Message: "Obtén ganancias de hasta X% anual todos los lunes activando Earn para [ASSET]."
   - CTA: "Activar Earn"
   - Closeable: No
7. **Statistics** — MDSHeader ("Estadísticas") + ReadOnlyList (market data)
8. **Additional info** — MDSAccordion (expandable sections)

## Usage & behavior

### When to use

- MUST use when displaying a single cryptocurrency's overview
- MUST use for deep-link destinations from market lists, watchlists, search, or portfolio
- MUST include price, chart, and 5+ market statistics
- MUST provide quick transaction entry points (buy, sell, send)
- MUST show "Tu posición" section ONLY if user has active holdings in the asset
- MUST hide position section completely if user holds zero of the asset

### When NOT to use

- MUST NOT use for simple price tickers (insufficient detail)
- MUST NOT omit the chart — it is core to the asset detail experience
- MUST NOT use for portfolio comparison views (where multiple assets are listed with holdings)
- MUST NOT hide the chart to prioritize position data — market context is always visible

### Edge cases

- **No holdings**: Omit "Tu posición" section entirely — render only market price, chart, statistics
- **Zero available balance**: Still show position section with "Saldo disponible: 0"; do not hide
- **Small devices** (< 375px width): Ensure FixedCTAs buttons stack vertically if needed
- **Long statistics lists**: Use ReadOnlyList pagination or scroll within container
- **Very volatile assets**: Ensure PnL component reflects current timeframe selection
- **Missing data**: Chart or stats may be unavailable; hide accordion sections instead of breaking layout
- **Negative P&L**: Use red tag with downtrend icon; absolute value displayed
- **PONEF — Protection for Non-Enrolled Funds**: When a black swan event (liquidity restriction, market suspension) blocks transactions for the asset, inject MDSInfoPanel between AppBar and scrollable content. The panel reads: `"Las transacciones con [%s] no están disponibles por ahora. Ver más"` where `[%s]` is the asset name (e.g. "BTC"). "Ver más" opens a bottom sheet with the full restriction explanation. The rest of the screen layout (base variant) is unchanged.

## Interactions

| Interaction | Component | Behavior | Variant |
|-------------|-----------|----------|---------|
| Back navigation | MDSAppBar back button | Dismiss screen, return to previous | Both |
| Toggle favorite | MDSAppBar star icon | Save/unsave asset from watchlist | Both |
| Change timeframe | Timeframes selector | Update chart and market PnL (1H, 1S, 1M, 3M, 1A) | Both |
| Expand position | "Tu posición" section | Reveal or collapse position details (if initially collapsed) | With holdings |
| Expand section | MDSAccordion | Reveal additional context (e.g., "Sobre Bitcoin") | Both |
| Primary action | FixedCTAs buttons | Navigate to buy/sell or send flow | Both |

## Accessibility

> **Mobile only** (iOS + Android) — VoiceOver, TalkBack. Copy → [`content/guidelines/accessibility.md`](../content/guidelines/accessibility.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | Main landmark wraps scrollable content; fixed header/footer marked as regions. AppBar buttons labeled "Volver" (back), "Favorito" (favorite). |
| Focus & traversal | Linear order: back button → favorite → content → buy/sell button → send button. Skip repeated price/chart redraws when scrolling. |
| Labels & announcements | PnL component announces trend and percentage (e.g., "up 1.03% today"). Statistics list labels paired with values (ReadOnlyHorizontal role). |
| Touch & gestures | All buttons minimum 44px touch target. Horizontal scroll on Timeframes if needed. Scrollable content area distinct from fixed regions. |

## Design intent

- **Progressive disclosure**: Show price + chart first; statistics and details below the fold
- **Visual hierarchy**: Asset name + price as hero, chart in prominent position, stats as supporting detail
- **Action availability**: Key transactions immediately accessible via fixed footer
- **Data context**: Timeframes selector enables quick P&L comparison without navigation

## Token bindings

> [`tokens/token-reference.md`](../../tokens/token-reference.md) — no hex

| Role | Token path | Notes |
|------|------------|-------|
| Container background | `color/background/default` | Full-screen fill |
| Content inset | `spacing/padding/base` (16px) | Left/right margins for all scrollable zones |
| Zone gap | `spacing/stack/lg` (24px) | Between balance, chart, stats sections |
| Sub-gap | `spacing/stack/xs` (4px) | Between price and PnL in balance zone |
| Legal banner background | `color/surface/default` | Subtle accent for disclaimer |
| Status bar safe area | Platform-specific | iOS 44px, Android 24px |
| Bottom safe area | `spacing/padding/base` (16px) | Below FixedCTAs |

## Text slot rules

| Slot | Rules |
|------|--------|
| Asset name | Primary typography, no truncation — max 20 chars (e.g., "Bitcoin", "Ethereum") |
| Price | `CurrencyPrice` component handles currency symbol + formatting; always use `size: base` or `large` for emphasis |
| Market PnL | "Último día" or timeframe-specific (e.g., "1H", "3M") — trend badge with % |
| Position labels | "Tu posición", "Saldo total", "Saldo disponible", "Ganancias y pérdidas", "Precio promedio de compra", "Precio promedio de venta", "Distribución en el portfolio" |
| Position tags | **Saldo total**: Gray tag with crypto amount (e.g., "0.00037 BTC") · **Ganancias y pérdidas**: Green/Red tag with % and trend icon |
| Statistics labels | Short key names (e.g., "Ranking", "Market cap", "Volumen (24h)") — 2–3 words max |
| Accordion title | e.g., "Sobre Bitcoin" — optional custom intro for each asset |
| Action buttons | "Comprar/Vender" + "Enviar" — primary blue + secondary ghost |

## Verification

- [ ] Variants: Correct variant (no-holdings vs. with-holdings) selected based on user state
- [ ] Position section: Shown ONLY in with-holdings variant; omitted completely in no-holdings
- [ ] Usage & behavior: MUST / MUST NOT rules enforced per variant
- [ ] Interactions: Timeframes update chart; buttons navigate to flows; position expandable if applicable
- [ ] Accessibility: VoiceOver/TalkBack tested; focus order logical; position section labeled
- [ ] Tokens: No raw px/hex; all spacing/color from reference
- [ ] Layout: Fixed header + scrollable content + fixed footer; position after chart

## Related specs

- [`app-bar.md`](../../components/app-bar.md) — header navigation (back, favorite)
- [`bottom-ctas.md`](../../components/bottom-ctas.md) — fixed footer actions (buy/sell, send)
- [`header.md`](../../components/header.md) — section headers (asset name, "Tu posición", "Estadísticas")
- [`read-only-list.md`](../../components/read-only-list.md) — position & statistics display
- [`read-only-horizontal.md`](../../components/read-only-horizontal.md) — list item rows
- [`line-graph.md`](../../components/line-graph.md) — price chart & timeframes
- [`tag.md`](../../components/tag.md) — position badges (crypto amount, % trend)
- [`progress-bar.md`](../../components/progress-bar.md) — portfolio distribution (with-holdings only)
- [`accordion.md`](../../components/accordion.md) — expandable details
- [`currency-price.md`](../../components/currency-price.md) — price display
- [`nudge.md`](../../components/nudge.md) — yields activation nudge (with-holdings-yields variant only)
- [`content/index.md`](../../content/index.md) — UX writing guidelines

---
