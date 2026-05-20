---
id: layout-successful-action
name: Successful Action
category: product-layout
platform: mobile
tags: [success]
aliases: [success screen, post-transaction success]
status: ready
relationships:
  composes: [app-bar, header, illustration-full-screen, button, text-button, bottom-ctas]
  applies_to: [buy-flow, sell-flow, convert-flow, send-flow, withdraw-flow, deposit-flow]
  conflicts_with: []
  requires: [app-bar, header, bottom-ctas]
  supersedes: []
---

## Agent summary

- **MUST** use this full-screen layout (not a sheet) as the terminal step after a committed action — buy, sell, convert, send, withdraw, deposit.
- **Stack (top → bottom):** `topContainer` (StatusBar + MDSAppBar with **Close** trailing) → `Container` (MDSIllustrationFullScreen → MDSHeader `screenHeader` with description) → MDS BottomCTAs (primary "next action" + TextButton feedback link).
- **MUST NOT** put a back arrow on the AppBar — the user cannot return to the in-flight flow; only a trailing **Close** dismisses to the entry surface.
- **MUST** use `MDSIllustrationFullScreen` success illustration centered in its row with `spacing/padding/base` horizontal insets — never a custom hero.
- **MUST** reserve `spacing/padding/base` (16) as the bottom safe-area below BottomCTAs.
- **Copy:** [`../../content/index.md`](../../content/index.md) · per-slot limits below.

## Overview

The screen the user lands on the moment an action commits successfully — the visual full-stop of a flow. It confirms what happened, names the resulting state (e.g. balance updated, asset received), and offers one forward action plus a lightweight feedback link. The recipe exists so every "success" across buy / sell / convert / send / withdraw / deposit looks and behaves identically.

Use it only when the action has fully committed server-side. If commit is still pending, use a loading state in the originating sheet or screen — not this recipe.

## Anatomy

```
┌──────────────────────────────────────────┐
│ 1. topContainer                          │
│    ┌──────────────────────────────────┐  │
│    │ 1a. StatusBar                    │  │
│    │ 1b. MDSAppBar (Close in trailing)│  │
│    └──────────────────────────────────┘  │
│                                          │
│ 2. Container (flex 1)                    │
│    ┌──────────────────────────────────┐  │
│    │ 2a. row — MDSIllustrationFullScreen │
│    │     (success illustration, centered)│
│    └──────────────────────────────────┘  │
│    ┌──────────────────────────────────┐  │
│    │ 2b. row — MDSHeader              │  │
│    │     screenHeader · hasTopBorder  │  │
│    │     header (title)               │  │
│    │     description (one line)       │  │
│    │     trailing content (optional)  │  │
│    └──────────────────────────────────┘  │
│                                          │
│ 3. MDS BottomCTAs                        │
│    ┌──────────────────────────────────┐  │
│    │ [ Primary — next action ]        │  │
│    │   TextButton (icon + label)      │  │
│    └──────────────────────────────────┘  │
│ ↕ spacing/padding/base (safe area)       │
└──────────────────────────────────────────┘
```

## Stack order

| # | Element | Host / slot | Spec | Required | Notes |
|---|---------|-------------|------|----------|-------|
| 1 | `topContainer` | wrapper frame | — | Yes | Holds status bar + app bar; full bleed |
| 1a | StatusBar | platform | — | Yes | OS-themed; auto-adapts to background |
| 1b | App Bar | `MDSAppBar` `variant=default` | [app-bar](../../components/app-bar.md) | Yes | **Close** in `iconTrailing1`; **no** leading back arrow; no T2 |
| 2 | `Container` | flex column, `flex: 1 0 0` | — | Yes | Holds illustration + header; centered horizontally |
| 2a | Illustration row | `MDSIllustrationFullScreen` (success) | — | Yes | Centered in row; `spacing/padding/base` horizontal insets; row height ≈ 184 |
| 2b | Header row | `MDSHeader` `variant=screenHeader` | [header](../../components/header.md) | Yes | `hasTopBorder=true` · `hasDescription=true` · `hasTrailingContent` optional |
| 3 | Bottom CTAs | `MDS BottomCTAs` | [bottom-ctas](../../components/bottom-ctas.md) | Yes | Primary `layoutAdaptive` button + TextButton with `thumb_up` prefix icon; `pb = spacing/padding/base` |

## Variants

| Variant | When to use | Stack delta vs default | Figma node |
|---------|-------------|------------------------|------------|
| `default` | Most success screens — primary forward action + feedback link | — | `8:13842` |
| No feedback link | Flows where post-action feedback is not yet wired | Element 3 drops the TextButton; `hasTextButton=false` | — |
| Trailing content in header | Show resulting amount/asset chip next to the title | Element 2b: `hasTrailingContent=true` | — |
| Alt text in CTAs | Legal / disclaimer required below primary | Element 3: `hasAltText=true`, `altText` filled | — |

## Usage & behavior

### When to use

- MUST use when an action has **fully committed** server-side (buy filled, transfer broadcast, conversion settled).
- MUST use as the terminal screen of a flow that started from a calculator, send/receive form, or confirmation sheet.
- MUST use when the user needs an obvious "what's next" exit (start another action, view portfolio, open detail).

### When NOT to use

- MUST NOT use while the commit is pending — show a loading state in the prior surface instead.
- MUST NOT use for partial success (e.g. limit order placed but unfilled) — that's an order-status screen, not a success terminal.
- MUST NOT use for failures — use the in-sheet error state from the [confirmation recipe](./confirmation-bottom-sheet.md) or a dedicated error screen.
- MUST NOT use as a generic info screen — this recipe requires a success outcome.

### Edge cases

- **Long asset names / amounts** in the description: per [content guidelines](../../content/index.md), truncate the asset name, never the amount.
- **No follow-up action available** (rare): drop the primary CTA and keep only the feedback TextButton with explicit "Close" wording. Audit-only — prefer keeping a primary.
- **User dismisses via Close** before tapping primary: returns to the **entry surface of the flow**, not the previous screen in the navigation stack.
- **Feedback link tapped:** opens an external feedback surface (sheet or NPS) — MUST NOT navigate the user away from the success screen unrecoverably.

## States

| State | Trigger | Stack/slot changes | Copy source |
|-------|---------|--------------------|-------------|
| Default | Action just committed | Full stack as above | [content/index.md](../../content/index.md) |
| Loading | N/A — recipe is only entered after commit resolves | `N/A — never loading at recipe level` | — |
| Empty | N/A — recipe always opens with a known outcome | `N/A — never empty` | — |
| Error | N/A — failures use a different recipe | `N/A — not this recipe` | — |
| Success / confirmation | This recipe **is** the success state | — | — |

## Interactions

| Interaction | Behavior | Source of truth |
|-------------|----------|-----------------|
| AppBar trailing Close tap | Dismisses to flow entry surface (not previous stack screen) | [app-bar](../../components/app-bar.md) |
| Primary CTA tap | Navigates to the "next action" the label promises (start another op, open portfolio, etc.) | [bottom-ctas](../../components/bottom-ctas.md) |
| TextButton (feedback) tap | Opens feedback surface; success screen remains in stack | [bottom-ctas](../../components/bottom-ctas.md) |
| Hardware back (Android) | Equivalent to AppBar Close | [app-bar](../../components/app-bar.md) |
| Swipe-back (iOS) | Disabled — user MUST use Close | [app-bar](../../components/app-bar.md) |

## Accessibility

> **Mobile** — VoiceOver · TalkBack. Copy → [`../../content/guidelines/accessibility.md`](../../content/guidelines/accessibility.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | Illustration is decorative — marked `accessibilityElementsHidden` / `importantForAccessibility=no`; header is a heading; CTAs are buttons |
| Focus & traversal | On open, focus jumps to the header title; traversal: header title → description → primary → text button → AppBar Close |
| Labels & announcements | Title text MUST state the outcome (e.g. "Listo, compraste NVDAx") — not "Success"; AppBar trailing labeled "Close" (localized); announce success on screen entry |
| Touch & gestures | CTAs ≥ 44×44 pt (iOS) / 48×48 dp (Android); swipe-back disabled (see Interactions); hardware back behaves as Close on Android |

## Token bindings

> [`../../tokens/token-reference.md`](../../tokens/token-reference.md) — no raw hex or px.

| Role | Token path | Element # | Notes |
|------|------------|:---------:|-------|
| Screen background | `color/background/default` | root | White surface |
| Bottom safe area (below CTAs) | `spacing/padding/base` (16) | 3 | Always reserved — per memory: bottom CTAs always reserve 16 below |
| Illustration row horizontal insets | `spacing/padding/base` (16) | 2a | Illustration is **centered** in row |
| Title typography | `title/base` | 2b | Owned by `screenHeader` |
| Description typography | `body/base` | 2b | Owned by `MDSHeader` description slot |
| Primary CTA | per [bottom-ctas](../../components/bottom-ctas.md) `MDS Button/layoutAdaptive` | 3 | Owned by host |
| TextButton (feedback) | per [bottom-ctas](../../components/bottom-ctas.md) `MDS TextButton` | 3 | Prefix icon `thumb_up` at `icon/size/base` |
| Stack gap between illustration row and header row | per row auto layout (no extra gap) | 2a→2b | MUST NOT inject custom spacing |
| AppBar surface | per [app-bar](../../components/app-bar.md) | 1b | Owned by host |

**MUST NOT override** AppBar height, Header `screenHeader` internal padding, or BottomCTAs footer padding. This recipe owns only the **screen background**, the **bottom safe area**, and the **illustration row insets**.

## Text slot rules

> Voice and locale → [`../../content/index.md`](../../content/index.md).

| Slot | Element # | Max chars | Grammar | Examples |
|------|:---------:|:---------:|---------|----------|
| AppBar trailing label (a11y only) | 1b | — | Localized "Close" | "Cerrar" · "Close" |
| Header title | 2b | 40 | Outcome statement — past tense or "Listo" + verb; sentence case | "¡Listo! Compraste NVDAx" · "Enviaste 0.05 BTC" |
| Header description | 2b | 80 | One factual sentence stating the resulting state | "Recibiste 0.56 NVDAx en tu portafolio." |
| Primary CTA | 3 | 24 | Infinitive verb naming the next action — NOT "Continue" or "OK" | "Hacer otra operación" · "Ver portafolio" |
| TextButton (feedback) | 3 | 36 | Question or short prompt — invites reflection, not action; uses `thumb_up` prefix icon | "¿Qué te pareció este flujo?" · "¿Qué te pareció este proceso?" |
| Alt text (when used) | 3 | 120 | Legal / disclaimer; no marketing | per content team |

## Do / Don't

| Do | Don't |
|----|-------|
| Put **Close** in the AppBar trailing slot | Add a back arrow leading — there's no flow to return to |
| Use a forward, specific primary CTA ("Hacer otra operación", "Ver portafolio") | Use generic "Continue" / "OK" / "Done" |
| Center the illustration in its row with `spacing/padding/base` horizontal insets | Stretch the illustration full-bleed or left-align it |
| Reserve `spacing/padding/base` below the BottomCTAs as bottom safe area | Let CTAs flush against the safe-area edge |
| State the outcome literally ("Compraste 0.56 NVDAx") | Celebrate without facts ("Yay! Success!") |
| Use the feedback TextButton when feedback infra is wired | Add the feedback link if tapping it leads nowhere |
| Disable iOS swipe-back / route Android back to Close | Allow gesture back into the just-committed flow |

## Examples

| Scenario | Surface | Notes |
|----------|---------|-------|
| Bought NVDAx (stocks) | After calculator + confirmation | Header: "¡Listo! Compraste NVDAx" · description: "Recibiste 0.56 NVDAx en tu portafolio." · primary: "Hacer otra operación" · feedback link |
| Sent crypto | After send confirmation sheet | Primary: "Ver detalle" — opens tx detail; close returns to home |
| Converted asset | After convert flow | Description states resulting balance in the destination asset |
| Withdrawn fiat | After withdraw flow | Description states settlement window ("Llega en 1–3 días hábiles") |

## Verification

- [ ] Stack matches the **Stack order** table top → bottom — no extra elements, no reordering
- [ ] AppBar has **Close** in trailing and **no** leading back arrow
- [ ] Illustration is `MDSIllustrationFullScreen`, centered in its row, with `spacing/padding/base` horizontal insets
- [ ] Header is `variant=screenHeader` with `hasTopBorder=true` and a description ≤ 80 chars
- [ ] Primary CTA is `MDS Button/layoutAdaptive` with a forward verb (never "Continue", "OK", "Done")
- [ ] TextButton uses the `thumb_up` prefix icon at `icon/size/base` when present
- [ ] Bottom safe area equals `spacing/padding/base` (16) — measured, not visual
- [ ] No raw hex, px, or dp values; all spacing and type via tokens
- [ ] Copy fits the **Text slot rules** char limits in every locale (es_MX, es_AR, es_CO, pt_BR, en_US)
- [ ] Title is an outcome statement, not a generic "Success" / "Done"
- [ ] iOS swipe-back disabled · Android hardware back routes to Close
- [ ] Focus on entry lands on the header title; traversal matches the Accessibility table

## Related specs

- [`../../components/app-bar.md`](../../components/app-bar.md) — `variant=default` with trailing Close
- [`../../components/header.md`](../../components/header.md) — `screenHeader` with description + optional trailing content
- [`../../components/bottom-ctas.md`](../../components/bottom-ctas.md) — primary `layoutAdaptive` + TextButton
- [`../../content/index.md`](../../content/index.md)
- [`../../tokens/token-reference.md`](../../tokens/token-reference.md)
- [`../../../plugin/references/foundations/composition-recipes.md`](../../../plugin/references/foundations/composition-recipes.md) — foundation that points here

---
