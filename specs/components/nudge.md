---
id: nudge
name: Nudge
category: component
platform: mobile
tier: molecule
tags: [product activation]
aliases: []
status: draft
figma node: "53580:3588"
relationships:
  composes_with: [illustration, text-button, icon]
  conflicts_with: []
  substitutes: []
  requires: []
---

## Agent summary

- MUST contain an illustration, headline text, and at least one CTA button
- MUST be contextual and timely — not generic messaging
- MUST support optional close button for dismissal
- **Copy:** [`content/index.md`](../content/index.md) · activation voice; headline max 50 characters, body max 100 characters

## Overview

A nudge catches users at the right moment and guides them toward a relevant action. Timely and contextual, not generic, nudges are used in product activation flows to encourage specific behaviors (upsells, feature adoption, onboarding completions).

Nudges appear **below context information** (e.g., asset details, account summary) as a secondary, optional call-to-action. Unlike alerts or modals, they feel lightweight and don't interrupt the primary flow. They combine a compact illustration with compelling copy to make the action feel immediately relevant to what the user is viewing.

### Screen context — Crypto Asset Detail (3 states + PONEF edge case)

Three base variants depending on user holdings and Earn eligibility, plus one edge case overlay:

```
                 No holdings          Holdings             Holdings + Earn
                 1000 - Crypto Detail 1040 Holdings        1040 Holdings Earn
                 ─────────────────    ──────────────────   ─────────────────
 fixed top       StatusBar            StatusBar            StatusBar
                 MDSAppBar            MDSAppBar            MDSAppBar
                 ─────────────────    ──────────────────   ─────────────────
 info panel      —                    —                    —
                 ─────────────────    ──────────────────   ─────────────────
 scroll          MDSLegal             MDSHeader            MDSHeader
                 MDSHeader            BalanceWrapper       BalanceWrapper
                 BalanceContainer       CurrencyPrice        CurrencyPrice
                   CurrencyPrice        PnL                  PnL
                   PnL                  LineGraph            LineGraph
                 LineChartContainer     Timeframes           Timeframes
                   LineGraph          ──────────────────   ──────────────────
                   Timeframes         Position summary     Position summary
                 ─────────────────      MDSHeader            MDSHeader
                 PositionContainer      ReadOnlyList         ReadOnlyList
                   (hidden)           ──────────────────   ──────────────────
                 ─────────────────    Statistics           ▶ Nudge section
                 Statistics             MDSHeader            MDSHeader
                   MDSHeader            ReadOnlyList         MDS Nudge ◀
                   ReadOnlyList       ──────────────────   ──────────────────
                 MDS Accordion        MDS Accordion        Statistics
                 ─────────────────    ──────────────────     MDSHeader
 fixed bottom    MDS FixedCTAs        MDS FixedCTAs          ReadOnlyList
                                                           MDS Accordion
                                                           ──────────────────
                                                           MDS FixedCTAs
```

**Key difference:** In "Holdings + Earn", the nudge gets its **own dedicated section** (with its own MDSHeader) placed between PositionContainer and the market Statistics section. In "Holdings" (Earn not eligible for this asset), that section is absent entirely.

## Structure

```
┌─────────────────────────────────────────┐
│ [4] Close (optional)                  ✕ │
│                                         │
│  ┌──────┐  [2] Message text             │
│  │ [1]  │  Obtén ganancias de hasta     │
│  │ Ilus │  9.57% anual activando        │
│  │      │  Earn para tu 0.00037 BTC.    │
│  └──────┘                               │
│           [3] CTA button                │
│               Activar Earn              │
└─────────────────────────────────────────┘
```

| # | Part | Required | Component | Notes |
|---|------|----------|-----------|-------|
| 1 | Illustration | Yes | MDS Illustration / Icon | 48×48 dp, left-aligned; contextual to feature (e.g. `Increase` for Earn) |
| 2 | Message | Yes | Body text | Single paragraph, max 140 chars; combines context + benefit + dynamic values |
| 3 | CTA button | Yes | MDS TextButton | Primary action; verb + noun (e.g. "Activar Earn") |
| 4 | Close button | No | MDS Icon (close) | Top-right; dismisses without action; omit when dismissal is handled externally |

## Usage & behavior

### When to show (activation criteria)

Show the nudge when ALL of these conditions are met:

- User is viewing relevant context (e.g., asset detail page, account section)
- User hasn't yet activated the target feature (e.g., Earn not enabled for BTC)
- The feature directly benefits what the user is currently viewing
- (Optional) A time or data signal suggests high receptiveness (e.g., recurring opportunity, new feature, user behavior pattern)

**Example — Earn nudge:**
- Show on detail page for: BTC, ETH, USDC, USDT, and other Earn-eligible assets
- Show ONLY if Earn is not already active for that asset
- Hide if user has dismissed nudge in last 24h
- Recurring signal: Show every Monday (highest earning day) for unused accounts

### Variant selection logic (Earn nudge)

**Placement:** Below the "Tu posición" section on the asset detail screen. The nudge has access to all position data already loaded on the page.

**"Tu posición" data model (all 6 rows):**

| Row | Label | Value type | Required | Notes |
|-----|-------|-----------|----------|-------|
| 1 | Saldo total | Fiat amount + crypto tag | Yes | Tag shows crypto balance (e.g. `0.00037 BTC`) |
| 2 | Saldo disponible | Fiat amount | Yes | Available (unlocked) balance |
| 3 | Ganancias y pérdidas | Fiat amount + % tag | Yes | Tag is green/red with directional icon |
| 4 | Precio promedio de compra | Fiat amount | No | Omitted if no buy history |
| 5 | Precio promedio de venta | Fiat amount | No | Omitted if no sell history |
| 6 | Distribución en el portafolio | Progress bar + % | Yes | % of total portfolio in this asset |

**Required inputs for nudge:**

| Input | Source | Position row | Value example |
|-------|--------|--------------|---------------|
| Asset symbol | Route param | — | `"BTC"` |
| Total balance (crypto) | Row 1 tag | `saldo_total.crypto` | `0.00037 BTC` |
| Total balance (fiat) | Row 1 | `saldo_total.fiat` | `507,050.65 MXN` |
| Gains & losses % | Row 3 tag | `ganancias_perdidas.pct` | `+6.25%` |
| Earn active flag | Earn API | — | `earn["BTC"].isActive` |
| Earn-eligible list | Feature config | — | `["BTC", "ETH", ...]` |
| Current APY | Earn API | — | `9.57` |
| Dismissal timestamp | Local storage | — | `nudge.earn.btc.dismissedAt` |

**Decision tree:**
1. Get `ASSET` from page context
2. Check `ASSET ∈ earn-eligible-list` → if no, **don't show**
3. Check `saldo_total.crypto > 0` → if no (user doesn't hold), **don't show**
4. Check `earn[ASSET].isActive === false` → if already active, **don't show**
5. Check `nudge.earn[ASSET].dismissedAt < now - 24h` → if dismissed recently, **don't show**
6. Fetch `earn[ASSET].apy`
7. Compose message using `saldo_total.crypto` and `apy`:
   - "Obtén ganancias de hasta [APY]% anual todos los lunes activando Earn para tu [BALANCE] [ASSET]."
8. CTA label: "Activar Earn"

**Fallback:** If `apy` unavailable → "Activa Earn y obtén rendimientos en tu [ASSET]."
**Fallback:** If `balance` unavailable → omit balance from message, use generic APY-only copy.

### When to use

- MUST use when guiding users to activate or unlock a feature during product onboarding
- MUST use for timely, contextual upsell moments (e.g., showing earnings opportunity for a held asset)
- MUST use when the action is optional and reversible (not critical confirmations)
- Use when the trigger (user behavior, timing, or data signal) is clear and narrow
- Use when illustration strongly reinforces the message

### When NOT to use

- MUST NOT use for critical confirmations or irreversible actions (use modal/alert)
- MUST NOT use for error states (use banner/toast)
- MUST NOT use for generic, always-on messaging (context matters)
- MUST NOT use when the user is in a focused flow (checkout, form submission) that requires uninterrupted attention
- MUST NOT stack multiple nudges vertically on the same screen — show only the single highest-priority nudge at a time
- MUST NOT use for feature discovery or promotional offers that don't require user-specific data (holdings, eligibility) — use [`product-recommendation.md`](product-recommendation.md) instead; see its decision table for the full rule

### Edge cases

- If no illustration is available, use a simple icon + colored background instead of blocking the nudge
- Nudges should respect user dismissal (honor close button) and not reappear immediately
- When stacking multiple nudges, show only the highest-priority one at a time

### Composition

Horizontal layout: illustration (48×48 dp, left) + message text (right) + CTA button below. Optional close button in top-right. Container has soft corner radius, padding (16px), and secondary background color. On narrow screens, may stack to vertical (illustration top, text + CTA below).

## Interactions

| Interaction | Behavior | Notes |
|-------------|----------|-------|
| CTA tap | Navigate to or trigger action | Confirm/log user intent before navigating |
| Close tap | Dismiss nudge + optionally hide for session | Do not auto-show same nudge again for 24h |
| Appear | Fade/slide in animation | Keep motion subtle (200–300ms) |
| Disappear | Fade out or slide down on dismiss | Smooth exit, no abrupt removal |

## Accessibility

| Concern | Requirement |
|---------|-------------|
| Role / semantics | Container: `alert` or `region` role; headline is semantic heading (h2/h3); button is accessible button with clear label |
| Focus & traversal | Focus order: headline → body → CTA → close button; close button skip-able via screen reader if not essential |
| Labels & announcements | Headline should announce on appear; CTA button label should be explicit ("Unlock discount", not "Learn more") |
| Touch & gestures | CTA + close buttons meet 44×44 pt (iOS) / 48×48 dp (Android) minimum; no swipe-only dismissal |

## Design intent

Nudges work through **contextual relevance** — showing the right offer at the right time reduces cognitive load and increases conversion. The illustration anchors the message visually, while copy focuses on user benefit rather than product features.

Dismissal is always easy (no friction) to respect user autonomy, even though the goal is adoption. This builds trust and makes the nudge feel helpful rather than invasive.

## Token bindings

| Role | Token path | Notes |
|------|------------|-------|
| Background | `color/background/secondary` | Subtle tint, not harsh contrast |
| Illustration background | `color/background/tertiary` | Optional backdrop behind illustration |
| Headline text | `typography/size/400` · `typography/weight/bold` | Action-oriented emphasis |
| Body text | `typography/size/300` · `typography/weight/regular` | Secondary hierarchy |
| CTA button | Color tokens per button variant (contained/text) | Use primary contained for main activation |
| Close button | `color/icon/secondary` or `color/icon/tertiary` | Low prominence |
| Container padding | `spacing/padding/lg` (16px) | Top/sides; bottom may be less if CTA has inset padding |
| Corner radius | `spacing/radius/md` | Soft, card-like appearance |

## Text slot rules

| Slot | Max length | Basic rules |
|------|------------|-------------|
| Headline | 50 characters | Action verb + benefit; no period |
| Body | 100 characters | Why now? What's the benefit?; conversational tone |
| CTA label | 20 characters | Verb + noun or short phrase; "Unlock savings", not "OK" |

## Examples

### Earn nudge (product activation)

**Asset eligibility:** BTC, ETH, USDC, USDT, XRP, LINK, SOL, and other approved Earn assets

| Asset | Shown on | Show condition | Message |
|-------|----------|---|---|
| BTC | Asset detail page | Earn inactive + user holds BTC | "Obtén ganancias de hasta 9.57% anual todos los lunes activando Earn para BTC." |
| ETH | Asset detail page | Earn inactive + user holds ETH | "Obtén ganancias de hasta 8.2% anual activando Earn para ETH." |
| USDC/USDT | Asset detail page | Earn inactive + user holds stablecoins | "Obtén ganancias estables activando Earn." |

### Other nudge types

| Scenario | Reference |
|----------|-----------|
| Feature upsell | Illustration: bar chart · Message: "Seize the opportunity! Enjoy lower prices and cut down your purchase costs." · CTA: "See discounts" |
| Re-engagement | Illustration: gift icon · Message: "Your rewards await" · CTA: "Claim now" |

## Verification

- [ ] Illustration + headline + body + CTA all present
- [ ] Copy is contextual, action-oriented, and respectful of character limits
- [ ] Close button dismisses without logging as a primary action
- [ ] Motion is subtle and doesn't distract from content
- [ ] Accessibility roles and focus order verified on iOS + Android
- [ ] Token bindings avoid hardcoded colors/sizes
- [ ] Related specs (button, illustration) linked and consistent

## Related specs

- [`product-recommendation.md`](product-recommendation.md) — use instead for discovery/promotional surfaces; contains the full ProductRecommendation vs Nudge decision table
- [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md) — `MDS Nudge` node ID · `MDS TextButton` node ID
- [`../content/index.md`](../content/index.md) — activation voice and tone guidelines
- [`../tokens/token-reference.md`](../tokens/token-reference.md) — color, typography, spacing tokens

---
