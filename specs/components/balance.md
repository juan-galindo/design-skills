---
id: balance
name: Balance
category: component
platform: mobile
tier: molecule
tags: [balance, wallet, privacy, pnl]
aliases: [MDSBalance, MDS balanceHome, BalanceWrapper, BalanceContainer]
status: draft
figma node: "42086:3564"
relationships:
  composes_with: [icon-button]
  conflicts_with: []
  substitutes: []
  requires: []
---

## Agent summary

- **MDSBalance** — primary account or asset balance for a screen; wallet total or single-currency amount.
- **MUST** appear **once per screen** — if multiple balances exist, show one as primary and list others in a different pattern (e.g. [`balanceBreakdown`](../figma-catalog/mobile-components.md) rows, ReadOnlyList).
- **MUST** support **shown** and **hidden** states via `isBalanceVisisble` (`true` | `false`); visibility toggle persists per device or session — **MUST NOT** auto-reveal without explicit user action.
- **PnL** — show only when balance is **not zero**; hide when balance is `0`. When hidden, PnL **percentage and period label stay visible** — only fiat amounts mask.
- **Copy:** [`../content/index.md`](../content/index.md) · slot limits below · use **saldo** (not "balance") in ES locales per glossary.

## Overview

MDSBalance displays a user's account balance in a clear, secure way. It represents either the total wallet balance (all asset classes combined) or the balance of a particular currency or asset on a detail screen.

The show/hide affordance lets users control financial privacy on shared or public devices. When hidden, numeric amounts obfuscate as a fixed-length mask while contextual labels, PnL percentage, and period text remain readable so the screen structure does not collapse.

## Structure

**Component set:** `MDSBalance` · [`42086:3564`](https://www.figma.com/design/W8vMoT1wMtnww2nJjP1rBx/-improvement--balance---carol?node-id=42086-3564)

| Property | Type | Default | Notes |
|----------|------|---------|-------|
| `isBalanceVisisble` | variant | `true` | **`true`** = shown · **`false`** = hidden. Figma prop name retains typo — map to `isBalanceVisible` in code. |
| `hasSaldoTotalLabel` | boolean | `true` | Localized label above amount (e.g. "Mi saldo total") |
| `hasEyeIcon` | boolean | `true` | **MDS IconButton** — `visibility-fill` when shown · `visibility_off-fill` when hidden |
| `hasInfoButton` | boolean | `true` | **MDS IconButton** — info icon; opens balance explanation sheet |
| `hasPnl` | boolean | `true` | Renders nested **MDS PnL2** below the amount row |

| Variant | Node ID | When |
|---------|---------|------|
| `isBalanceVisisble=true` | `42086:3561` | Balance and PnL fiat amounts fully visible |
| `isBalanceVisisble=false` | `42144:3079` | Amounts masked; label + PnL % + period remain |

**Layer tree:**

```
MDSBalance (col · gap stack/sm · px padding/base)
├── wrapper (row · items-end · gap inline/2xs)
│   ├── balanceWrapper (col · gap stack/sm · flex-1)
│   │   ├── label (text)                     ← hasSaldoTotalLabel
│   │   └── balanceIconWrapper (row · gap inline/base)
│   │       ├── mDSCurrencyPrice             ← amount + currency code
│   │       └── mDSIconButton                ← hasEyeIcon · visibility toggle
│   └── mDSIconButton                        ← hasInfoButton · info
└── mDSPnL2                                  ← hasPnl · summary row
```

| Part / slot | Required | Component | Notes |
|-------------|----------|-----------|-------|
| Label | No | Text (`body/small`) | e.g. "Mi saldo total" — visible in both shown and hidden states |
| Amount | Yes | **MDS currencyPrice** | `title/base` · amount + currency code on same row |
| Visibility toggle | No | **MDS IconButton** | `variant=background` · 32×32 · eye = tap to hide · eye-off = tap to show |
| Info button | No | **MDS IconButton** | Top-right of `wrapper` · aligned to amount baseline |
| PnL | No | **MDS PnL2** | `showTitle=false` · `showFiatAmount=true` · percentage + fiat + period |

**Hidden-state masking:**

| Slot | Shown | Hidden |
|------|-------|--------|
| Main amount | `625,343.09` + `MXN` | `********` — **no currency suffix** |
| PnL fiat amount | `34,267.89 MXN` | `********` |
| PnL percentage | `↑ 0.00%` | unchanged |
| PnL period | `(12 meses)` | unchanged |
| Label | visible | visible |

Use a **fixed-length mask** (`********`, 8 characters) — no shapes, variable-length bullets, or patterns that could hint at magnitude.

### Related library components (not MDSBalance)

| Component | Node ID | When |
|-----------|---------|------|
| `MDS balancePortfolio` | `45848:2959` | Portfolio tab — `Visibility=on\|off` · optional title / visibility / info icons |
| `MDS assetBalance` | `42267:597` | Asset-class breakdown list with text-button action — not a second Balance instance |
| `MDS balanceBreakdown` | `46952:6883` | Home per-asset-class rows — see [Home screen layout](../patterns/layouts/home-screen.md) |

## Usage & behavior

### When to use

- MUST use when showing the **primary balance** for an account, wallet, or asset on a screen.
- Use for total wallet balance (Home) or single-currency balance on detail screens.
- Use when users need a persistent show/hide control for financial privacy.

### When NOT to use

- MUST NOT use for **secondary or supporting values** (available balance, average price, allocation %) — use standard text, **MDS Tag**, or **MDS ReadOnlyList** rows instead.
- MUST NOT render **more than once per screen** — one Balance instance is the primary figure; additional amounts belong in breakdown rows, list items, or tags.
- MUST NOT auto-switch from hidden to shown without an explicit user tap on the visibility toggle.

### Edge cases

- **Zero balance:** Amount shows formatted zero (e.g. `0 MXN`); **PnL row is omitted** entirely.
- **Balance hidden:** Main amount and PnL fiat mask as `********`; label, info button, PnL percentage, and period label remain visible. Screen-level layouts that share the toggle (e.g. Home breakdown rows) MUST mask in sync.
- **Multiple balances on screen:** Promote one to MDSBalance; demote others to `balanceBreakdown`, `assetBalance`, or list rows — never duplicate Balance.

### PnL

- Show **MDS PnL2** only when the balance value is **not zero** (`hasPnl=true` and balance ≠ 0).
- When balance is `0`, omit the PnL row — do not show `0%` or empty PnL chrome.
- PnL row layout: **MDS priceChangePercentage** · divider · **MDS currencyPrice** (fiat gain) · period label (e.g. `(12 meses)`).
- PnL reflects portfolio or asset performance per screen context; it is not a substitute for market-price change on detail screens (those use **MDS currencyPrice** + market PnL in the price zone).

### Composition

| Surface | Component | Typical stack |
|---------|-----------|-----------------|
| Home | `MDSBalance` | Label → amount + eye + info → PnL (if non-zero) → optional `balanceBreakdown` below |
| Portfolio | `MDS balancePortfolio` or amount + eye row | First scroll element — see [Portfolio All layout](../patterns/layouts/portfolio-all-screen.md) |
| Asset detail | Position list / `assetBalance` | Primary total may use Balance; supporting rows use ReadOnlyList |

Horizontal padding is owned internally by `MDSBalance` (`px=spacing/padding/base`) — do not add duplicate `px` on the wrapper. See [Home screen layout](../patterns/layouts/home-screen.md).

## Interactions

| Interaction | Behavior | Notes |
|-------------|----------|-------|
| Visibility toggle tap | Switches `isBalanceVisisble` `true` ↔ `false` | Icon reflects **next** action — `visibility-fill` when shown (tap hides) · `visibility_off-fill` when hidden (tap shows) |
| Toggle persistence | Remember last preference per device or session | Applies to all amount surfaces tied to the same toggle on that screen |
| Info button tap | Opens balance info bottom sheet or modal | When `hasInfoButton=true` |
| Initial load | Respect persisted hidden state | **MUST NOT** auto-reveal on navigation or refresh |
| PnL row | Rendered only when balance ≠ 0 | No interaction on PnL itself within Balance |

## Accessibility

> **Mobile** — VoiceOver (iOS) · TalkBack (Android). Copy → [`../content/index.md`](../content/index.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | Amount: live region or adjustable value; visibility toggle: button with state (e.g. "Ocultar saldo" / "Mostrar saldo") |
| Focus & traversal | Label → amount → visibility toggle → info button (if present) → PnL; toggle announces masked vs visible state |
| Labels & announcements | Localized toggle labels — not icon-only; hidden state announces obfuscated value without speaking digits; PnL percentage + period announced when fiat is masked |
| Touch & gestures | Visibility and info buttons ≥ 44×44 pt (iOS) / 48×48 dp (Android) |

## Design intent

Balance is the **single authoritative money figure** on a screen — limiting it to one instance prevents competing hierarchies and reinforces trust. The show/hide control respects privacy without removing context: labels and performance direction stay so users still know *what* is hidden and whether they are up or down.

Obfuscation uses a flat fixed-length mask rather than length-varying placeholders so hidden amounts cannot be inferred. Persisting the toggle preference avoids nagging users who prefer privacy by default.

## Token bindings

> [`../tokens/token-reference.md`](../tokens/token-reference.md) — no hex

| Role | Token path | Notes |
|------|------------|-------|
| Label text | `body/small` · `color/onBackground/mediumEmphasis` | Caption above amount |
| Amount text | `title/base` · `typography/size/800` · `color/onSurface/highEmphasis` | Primary numeric hierarchy |
| Currency code | `title/base` · `color/onSurface/mediumEmphasis` | Same row as amount; hidden with amount |
| Hidden mask | Same typography slot as amount | `********` — fixed 8 characters |
| PnL percentage | `body/small-bold` · semantic buy/sell color | **MDS priceChangePercentage** |
| PnL fiat | `body/small-bold` · `color/onSurface/highEmphasis` | Nested **MDS currencyPrice** |
| PnL period | `body/small` · `color/onBackground/lowEmphasis` | e.g. `(12 meses)` |
| Icon button fill | `color/tertiary/default` | Eye + info buttons |
| Container padding | `spacing/padding/base` | Horizontal inset owned by component |
| Vertical gap | `spacing/stack/sm` | Between label, amount row, and PnL |
| Amount ↔ eye gap | `spacing/inline/base` | Inside `balanceIconWrapper` |

## Text slot rules

| Slot | Max length | Rules |
|------|------------|-------|
| Label | 24 chars | Localized — ES: "Mi saldo total" · EN: "Total balance"; sentence case |
| Amount | — | Formatted number + currency code; masked as `********` when hidden |
| Visibility toggle | — | Icon only — accessibility label required (see Accessibility) |
| Info button | — | Icon only — label e.g. "Información del saldo" |
| PnL period | 16 chars | Parenthetical timeframe — e.g. `(12 meses)` |

## Examples

| Scenario | Label | Amount (shown) | PnL |
|----------|-------|----------------|-----|
| Home — active user | Mi saldo total | `625,343.09 MXN` | `↑ 0.00% \| 34,267.89 MXN (12 meses)` |
| Home — zero balance | Mi saldo total | `0 MXN` | omitted |
| Home — hidden | Mi saldo total | `********` | `↑ 0.00% \| ******** (12 meses)` |
| Asset detail — BTC holdings | — | fiat + crypto tag | per position rules |

## Verification

- [ ] Usage & behavior: one Balance per screen; not used for secondary values; PnL hidden when balance is zero.
- [ ] States: `isBalanceVisisble=true\|false`; fixed `********` mask; label + PnL % + period remain in hidden state.
- [ ] Interactions: toggle persists; no auto-reveal; synced masking on related amount rows when applicable.
- [ ] Accessibility: toggle labels; live region / announcements on visibility change; touch targets.
- [ ] Tokens · text slots · related specs.

## Related specs

- [`../patterns/layouts/home-screen.md`](../patterns/layouts/home-screen.md) — `balanceRow` + `balanceBreakdownRow`
- [`../patterns/layouts/portfolio-all-screen.md`](../patterns/layouts/portfolio-all-screen.md) — balance row without section header
- [`../patterns/layouts/crypto-asset-detail.md`](../patterns/layouts/crypto-asset-detail.md) — position vs market price zones
- [`../content/index.md`](../content/index.md) · [`../content/localization/glossary.md`](../content/localization/glossary.md) — saldo terminology
- [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md) — `MDS PnL2`, `MDS currencyPrice`, `MDS IconButton`

## Figma & library

| Item | Reference |
|------|-----------|
| Improvement file | [`-improvement--balance---carol`](https://www.figma.com/design/W8vMoT1wMtnww2nJjP1rBx/-improvement--balance---carol?node-id=42086-3564) |
| Catalog (main library) | [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md) |
| Component set | `MDSBalance` · `42086:3564` |
| Portfolio variant | `MDS balancePortfolio` · `45848:2959` |
| Asset list (not Balance) | `MDS assetBalance` · `42267:597` · `MDS balanceBreakdown` · `46952:6883` |

---
