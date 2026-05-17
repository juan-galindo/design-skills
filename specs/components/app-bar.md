---
id: app-bar
name: App Bar
category: component
platform: mobile
tier: organism
tags: [navigation, search]
aliases: [top app bar, top navigation bar, MDSAppBar]
status: ready
figma node: "39425:3265"
relationships:
  composes_with: [header, tabs, search-field]
  conflicts_with: [bottom-sheet]
  substitutes: []
  requires: []
---

## Agent summary

- One **MDSAppBar** per screen (`variant` + `background`); topmost (status bar only above); **no gap** below.
- **`global` / `accent`:** home, portfolio, markets only — T1 notifications · T2 rewards.
- **Other variants:** trailing = close, filter, or favorite — never notifications/rewards.
- **`progressBar`:** ≥3 steps only; T1 close only; no T2.
- **Title:** [Header](./header.md) in content — **not** on `global` + `accent`. `calculator` center = action label only (not screen title).
- **Copy:** [`../content/index.md`](../content/index.md) · Text slot rules below.

## Overview

Primary mobile navigation — first UI element every screen. Leading control + center (search, progress, calculator action) + optional trailing. **64px** (`global`) · **56px** (others).

## Structure

Properties: `variant` · `background` (`default` | `accent`, `global` only) · `hasIconLeading` · `hasIconTrailing1` · `hasIconTrailing2` · `hasIconCurrency` (`calculator` only).

| Variant | When | Leading | Center | Trailing |
|---------|------|---------|--------|----------|
| `global` | Home, portfolio, markets | Menu | Search | T2 rewards · T1 notifications |
| `global` + `accent` | Same on accent surface | Menu | Search (on-accent) | Same as `global` |
| `default` | Root tab (bottom nav primary) | `arrow_back` | — | close · filter · favorite |
| `backButton` | Pushed sub-screen | `arrow_back` | — | close (common) · filter · favorite |
| `calculator` | Buy / sell / convert | `arrow_back` | Action + currency icon | Order-type dropdown |
| `globalSearch` | Search from `global`, keyboard up | `arrow_back` | Focused search | Clear on field |
| `progressBar` | Flow ≥3 steps | `arrow_back` | Progress + step (e.g. `1/4`) | Close on T1 only |

**`default` vs `backButton`:** root tab vs forward navigation into a sub-screen.

**Trailing:** `iconTrailing1` rightmost · `iconTrailing2` left of T1. Max 2 slots (1 on `progressBar`). No T2 without T1. Secondary only — no primary CTA.

## Usage & behavior

### When to use

- One **MDSAppBar** as the primary top navigation anchor on every mobile screen (variant per screen type).

### When NOT to use

- Inside [bottom-sheet](./bottom-sheet.md) or modals; detached instance.

### Composition

| Variant | Stack | [Header](./header.md) |
|---------|-------|----------------------|
| `global` + `accent` | App Bar → content | No |
| `backButton` | App Bar → Header → content | Yes |
| `global` | App Bar → feed / [Tabs](./tabs.md) | Typically no |
| `globalSearch` | Pushed search bodies → [Search Field](./search-field.md) `activeFocusEmpty` + body (**global search** · **catalog browse** · **Markets category search**) | No |
| `default` | App Bar → Header → content/tabs | If needed |
| `calculator` | App Bar → form | Optional |

Header MUST NOT sit above the App Bar.

## Interactions

| Interaction | Behavior | Notes |
|-------------|----------|-------|
| Leading · `global` | Opens menu (drawer) | Not back — menu affordance |
| Leading · other variants | `arrow_back` navigates up / back | Stack exit |
| Trailing icons | Secondary actions (close, filter, favorite, notifications, rewards) | Max 2 slots; rules per variant |
| Search · `global` | Tap affordance → **fade animation** (required) to **global search** · back same (Flow **A**) | [Search Field](./search-field.md) |
| Search · `globalSearch` | Shared chrome · body varies by entry ([Search Field](./search-field.md)) · `activeFocusEmpty` · 56px bar | **S1–S4** |
| Calculator center | Action label + currency icon | Order-type dropdown on trailing |
| Calculator orders | Crypto/stable/fiat → Ahora, Diaria, Semanal, Mensual, Precio deseado | Stocks → Mercado, Límite |
| `progressBar` | Step indicator (e.g. `1/4`) | Close on T1 only; ≥3 steps |

## Accessibility

> **Mobile** — VoiceOver (iOS) · TalkBack (Android). Copy → [`../content/index.md`](../content/index.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | Navigation bar — leading: **menu** (`global`) or **back** (stack); trailing icons as buttons |
| Focus & traversal | VoiceOver / TalkBack reach all icons and search; logical left-to-right order (leading → center → trailing) |
| Labels & announcements | Each icon: localized `accessibilityLabel` (notifications, rewards, close, filter, favorite, clear); search field label when focused |
| Touch & gestures | Icon hit areas ≥ 44×44 pt (iOS) / 48×48 dp (Android); `progressBar` announces step + total (e.g. step 1 of 4); calculator action label MUST differ from [Header](./header.md) screen title |

## Design intent

One nav anchor per screen: discovery (`global`) vs stack (`backButton`) vs task modes (calculator, search, progress). Bar navigates; Header names the screen except calculator action in the bar.

## Token bindings

> [`../tokens/token-reference.md`](../tokens/token-reference.md)

| Role | Token path |
|------|------------|
| Bar surface | AppBar · `background` default \| accent |
| Search | [Search Field](./search-field.md) — token bindings |
| Calculator action / dropdown | `body/base-medium` / `tiny/base-bold` |
| Progress label | `body/small` |
| Icons | Semantic · on-accent for `global`+`accent` |

## Text slot rules

| Slot | Max | Rules |
|------|-----|-------|
| Screen title | per [header](./header.md) | In content — not in bar |
| Search placeholder | [Search Field](./search-field.md) | Home: **Busca activos** + animated suffix · pushed search: **Busca activos** |
| Calculator action | 12 chars | Infinitive + optional icon — Comprar/Vender/Convertir |

MUST NOT duplicate calculator action string and screen title.

## Verification

- [ ] Usage & behavior: variant + `global` scope; composition + Header rules; not detached.
- [ ] Interactions: leading/trailing per variant; search screen + `activeFocusEmpty` empty state; calculator orders; `progressBar` ≥3 steps.
- [ ] Accessibility: menu vs back semantics; icon labels; progress step announcement.
- [ ] Tokens · text slots · related specs.

## Related specs

- [`header.md`](./header.md) · [`tabs.md`](./tabs.md) · [`search-field.md`](./search-field.md)
- [`../content/index.md`](../content/index.md) · [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md)

---
