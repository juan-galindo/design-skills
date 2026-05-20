---
id: product-recommendation
name: ProductRecommendation
category: component
platform: mobile
tier: molecule
tags: [product discovery, promotions, feature awareness]
aliases: []
status: draft
figma node: "57016:46471"
relationships:
  composes_with: [illustration, icon-button]
  conflicts_with: []
  substitutes: []
  requires: []
---

## Agent summary

- MUST contain a headline, supporting line, and illustration
- MUST include a dismiss (close) button — the card is dismissible at any time
- MUST be used for product/feature discovery or promotional offers, NOT for behavioral activation requiring a specific CTA — use Nudge instead
- Whole card is typically the tap target; do NOT add a standalone CTA button inside the component
- **Copy:** [`content/index.md`](../content/index.md) · headline max 50 chars, supporting line max 80 chars

## Overview

ProductRecommendation surfaces contextual product recommendations, highlights new features, or presents targeted promotional offers at the right moment in the user's journey. A bold headline communicates the primary value proposition at a glance, while a concise supporting line explains the benefit or how the feature works, keeping cognitive load low.

Unlike Nudge, ProductRecommendation focuses on **discovery and awareness** — it presents an offer or feature the user may not know about yet. It does not require user-specific data signals (e.g., current holdings or activation state) to decide whether to show, and it does not carry an explicit action button; the card itself is the interaction surface.

## Structure

```
┌──────────────────────────────────────────────┐
│ [1] Headline                            [3] ✕ │
│ [2] Supporting line              [4] 🎨       │
└──────────────────────────────────────────────┘
```

| # | Part | Required | Component | Notes |
|---|------|----------|-----------|-------|
| 1 | Headline | Yes | Text (`body/base-medium`) | Bold; primary value proposition; top-left |
| 2 | Supporting line | Yes | Text (`body/small`) | Regular weight; benefit or how-it-works; below headline |
| 3 | Close button | Yes | MDS IconButton (`CloseSmall`) | Top-right corner; dismisses the card |
| 4 | Illustration | Yes | MDS Illustration | Right-aligned, decorative; contextual to the feature |

## Usage & behavior

### ProductRecommendation vs Nudge — decision rule

| Signal | ProductRecommendation | Nudge |
|--------|----------------------|-------|
| User trigger | Moment in journey (screen, session, offer window) | User data: holdings, eligibility, activation state |
| Primary goal | Awareness / discovery of a feature or offer | Activate a specific feature the user can do NOW |
| CTA pattern | Whole card is tappable (no explicit button) | Explicit CTA button (verb + noun, e.g. "Activar Earn") |
| Illustration role | Dominant right-side visual communicating the product | Supporting 48×48 icon reinforcing copy |
| Dismissal cooldown | Optional (depends on campaign rules) | MUST honor 24 h cooldown after close |
| Screen placement | Anywhere in feed, home screen, contextual banner slot | Within a named section of a detail/account screen |

### When to use

- MUST use to surface features or products the user hasn't discovered yet
- MUST use for in-the-moment promotional offers tied to the user's journey context (e.g., user is viewing crypto → show a collateral loan offer)
- Use when the value proposition can be conveyed in one bold headline + one short supporting line
- Use when an illustration communicates the product or outcome better than text alone

### When NOT to use

- MUST NOT use for behavioral activation tied to specific user data (holdings, APY, eligibility) — use Nudge instead
- MUST NOT use for error states, system alerts, or critical confirmations
- MUST NOT use when an explicit CTA label is required to complete the action — use Nudge or a modal CTA instead
- MUST NOT stack multiple ProductRecommendation cards vertically on the same screen; show one at a time
- MUST NOT use when the user is mid-flow (form submission, checkout) — do not interrupt focused tasks

### Edge cases

- If the illustration asset fails to load, the card MUST still render with headline + supporting line + close button; reserve the illustration slot with a transparent placeholder to prevent layout shift
- On very short copy (single-word headline), the illustration may dominate; verify visual balance and adjust illustration size per design review

### Composition

Horizontal layout: text block (headline + supporting line) on the left, illustration on the right, close button anchored to the top-right corner. The close button overlaps or abuts the illustration — do not push the illustration left to accommodate it.

## Interactions

| Interaction | Behavior | Notes |
|-------------|----------|-------|
| Card tap | Navigate to or open the feature/offer | Log impression + tap event before navigating |
| Close tap | Dismiss the card | Remove from view; apply campaign-level cooldown if configured |
| Appear | Fade or slide in (200–300 ms) | Subtle; does not interrupt ongoing page load |
| Disappear | Fade out on dismiss (200–300 ms) | Smooth exit; no abrupt removal or layout jump |

## Accessibility

| Concern | Requirement |
|---------|-------------|
| Role / semantics | Card container: `region` or `article` role; headline is a semantic heading; close button is an accessible button with `accessibilityLabel` ("Cerrar recomendación") |
| Focus & traversal | Focus order: headline → supporting line → close button; card body is a single focusable tap target |
| Labels & announcements | Headline and supporting line read as a single announcement on focus; close button label explicit, not "X" |
| Touch & gestures | Close button meets 44×44 pt (iOS) / 48×48 dp (Android); whole card tap target has no minimum constraint beyond OS defaults |

## Design intent

ProductRecommendation works through **contextual timing** rather than behavioral pressure — showing the right offer when the user is already in a related context increases relevance without requiring personal data triggers. Keeping the component to one headline and one supporting line forces the value proposition to be crisp, preventing copy bloat that undermines a quick glance read.

The illustration does the emotional work: it signals the product category instantly, reducing the cognitive effort needed to interpret the offer. The close button is always present to respect user autonomy and keep the interaction feel light and non-intrusive.

## Token bindings

| Role | Token path | Notes |
|------|------------|-------|
| Background | `color/background/secondary` | Subtle card surface, not harsh contrast |
| Headline text color | `color/text/primary` | Maximum legibility |
| Supporting line color | `color/text/secondary` | One hierarchy step below headline |
| Headline typography | `typography/size/400` · `typography/weight/medium` (`body/base-medium`) | |
| Supporting line typography | `typography/size/300` · `typography/weight/regular` (`body/small`) | |
| Close icon color | `color/icon/secondary` | Low prominence |
| Container padding | `spacing/padding/base` | All sides; 16 dp |
| Corner radius | `spacing/radius/md` | Soft, card-like appearance |

## Text slot rules

| Slot | Max length | Basic rules |
|------|------------|-------------|
| Headline | 50 characters | Bold benefit statement; no end punctuation; sentence case |
| Supporting line | 80 characters | Explain how the benefit is achieved; one sentence; conversational |

## Examples

| Scenario | Headline | Supporting line |
|----------|----------|-----------------|
| Collateral loan offer | "Efectivo sin vender tu cripto" | "Pon tu BTC como garantía y obtén efectivo al instante" |
| New Earn feature | "Haz rendir tu USDT" | "Activa Earn y empieza a recibir rendimientos cada lunes" |
| Staking promotion | "Más por tu ETH" | "Recibe hasta 5% anual haciendo staking en Bitso" |

## Verification

- [ ] Headline + supporting line + illustration + close button all present
- [ ] Close button meets touch-target minimums on iOS and Android
- [ ] Illustration loads and right-aligns without layout shift on failure
- [ ] Card tap logs impression and navigates correctly
- [ ] Dismissal applies campaign-level cooldown (or session dismiss if no cooldown configured)
- [ ] Token bindings verified — no hardcoded colors, sizes, or raw dp values
- [ ] Copy within character limits and follows content guidelines

## Related specs

- [`nudge.md`](nudge.md) — behavioral activation component; use when user data (holdings, eligibility) drives the trigger and an explicit CTA is required
- [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md) — `MDS ProductRecommendation` node ID · `MDS IconButton` (CloseSmall) node ID
- [`../content/index.md`](../content/index.md) — voice, tone, and promotional copy guidelines
- [`../tokens/token-reference.md`](../tokens/token-reference.md) — color, typography, spacing tokens

---
