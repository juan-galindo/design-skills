---
id: layout-confirmation-screen
name: Confirmation Screen
category: pattern
platform: mobile
tags: [confirmation, transaction, buy, sell, convert, send, withdraw, deposit]
aliases: [confirmation screen, buy confirmation, sell confirmation, pre-commit confirmation]
status: ready
relationships:
  composes: [app-bar, confirmation-header, read-only-list, bottom-ctas]
  applies_to: [buy-flow, sell-flow, convert-flow, send-flow, withdraw-flow, deposit-flow]
  conflicts_with: [bottom-sheet]
  requires: [app-bar, bottom-ctas]
  supersedes: []
---

## Agent summary

- **MUST** use this full-screen layout as the pre-commit confirmation step in any transaction flow (buy, sell, convert, send, withdraw, deposit) — the step that shows the price breakdown and asks the user to commit.
- **MUST NOT** use a bottom sheet for this step. Bottom sheets are for **forced informational interruptions** (e.g. pattern day trader warning, regulatory notice, risk disclosure) that gate entry but carry no price breakdown and no commit action. See [bottom-sheet.md](../../components/bottom-sheet.md).
- **Stack (top → bottom):** `topContainer` (StatusBar + MDSAppBar with **leading dismiss icon**) → `Container` (`MDS ConfirmationHeader` → `RowReadOnlyList` → `MDS ReadOnlyList`) → `MDS BottomCTAs` (primary commit + "Cancelar" TextButton) → `spacing/padding/base` safe area.
- **MUST** use `MDS ConfirmationHeader` for the asset + amount summary — never a custom header, `screenHeader`, or plain text.
- **MUST** use `RowReadOnlyList` (16 px horizontal inset wrapper) → `MDS ReadOnlyList` for the price breakdown — never raw text rows.
- **MUST** apply `Bold / Total` on the Label instance + `ContentType.Type = Total` on the final ReadOnlyList row; re-apply the label text override after the variant change.
- **Copy:** [`../../content/index.md`](../../content/index.md) · per-slot limits below.

## Overview

The screen between the calculator (or entry form) and the success screen. It presents the full transaction summary — asset, amount, fee, total — and asks for explicit user commit. It is a **navigation screen pushed onto the stack**, not a modal overlay.

### Bottom sheet vs. confirmation screen — the boundary

| | Bottom sheet | Confirmation screen |
|---|---|---|
| **When** | Forced informational interruption *before* the user can proceed — PDT rule, regulatory notice, risk disclosure | Pre-commit step *within* the flow — shows price breakdown, asks user to commit |
| **Content** | Short informational copy ± bullets; no price breakdown | `MDS ConfirmationHeader` + `MDS ReadOnlyList` (price, fee, total) |
| **Primary action** | "Entendido" / "Continuar" (acknowledge and proceed) | Flow-specific commit verb — "Comprar", "Vender", "Enviar" |
| **Cancel** | Dismisses the sheet (scrim tap / drag handle) | "Cancelar" TextButton in BottomCTAs |
| **Layout** | `MDSBottomSheet` overlay on parent screen | Full-screen navigation push |

## Structure

```
┌──────────────────────────────────────────┐
│ 1. topContainer                          │
│    ┌──────────────────────────────────┐  │
│    │ 1a. StatusBar                    │  │
│    │ 1b. MDSAppBar (dismiss leading)  │  │
│    └──────────────────────────────────┘  │
│                                          │
│ 2. Container (flex 1)                    │
│    ┌──────────────────────────────────┐  │
│    │ 2a. MDS ConfirmationHeader       │  │
│    │     main amount · asset          │  │
│    │     "Con" · secondary amount     │  │
│    └──────────────────────────────────┘  │
│    ┌──────────────────────────────────┐  │
│    │ 2b. RowReadOnlyList (16px inset) │  │
│    │     └ MDS ReadOnlyList           │  │
│    │       row 1: Precio de mercado   │  │
│    │       row 2: Comisión            │  │
│    │       row n: Total (Bold/Total)  │  │
│    └──────────────────────────────────┘  │
│                                          │
│ 3. MDS BottomCTAs                        │
│    ┌──────────────────────────────────┐  │
│    │ [ Primary — commit verb ]        │  │
│    │   TextButton "Cancelar"          │  │
│    └──────────────────────────────────┘  │
│ ↕ spacing/padding/base (safe area)       │
└──────────────────────────────────────────┘
```

## Stack order

| # | Element | Host / slot | Spec | Required | Notes |
|---|---------|-------------|------|----------|-------|
| 1 | `topContainer` | wrapper frame | — | Yes | Holds StatusBar + AppBar |
| 1a | StatusBar | platform | — | Yes | OS-themed |
| 1b | App Bar | `MDSAppBar` `variant=default` | [app-bar](../../components/app-bar.md) | Yes | Dismiss icon leading; no trailing icons; no title |
| 2 | `Container` | flex column `flex: 1 0 0` | — | Yes | Holds header + list; grows to fill |
| 2a | Confirmation header | `MDS ConfirmationHeader` | — | Yes | Full width; owns its horizontal padding |
| 2b | ReadOnly list row | `RowReadOnlyList` (16px H inset) → `MDS ReadOnlyList` | — | Yes | Wrapper owns inset; last row **Bold / Total** |
| 3 | Bottom CTAs | `MDS BottomCTAs` | [bottom-ctas](../../components/bottom-ctas.md) | Yes | Primary commit + TextButton "Cancelar"; `hasAltText=false` |
| — | Safe area | `spacing/padding/base` (16) | — | Yes | Below BottomCTAs; shell-owned |

## Usage & behavior

### When to use

- MUST use for every pre-commit step in a transaction flow that has **fully resolved pricing** (amount, fee, total known).
- MUST use as the screen between the calculator / entry form and the success screen.

### When NOT to use

- **MUST NOT** use a bottom sheet for this step — the price breakdown + commit action require a full navigation screen.
- **DO** use a bottom sheet before this screen when a forced informational interruption is required (PDT rule, regulatory notice) — the sheet acknowledges the warning; the confirmation screen closes the transaction.
- MUST NOT show this screen while pricing is still loading — show a loading state in the prior screen.
- MUST NOT use for non-transactional confirmations (e.g. "Delete account?") — use the appropriate modal or sheet.
- MUST NOT route here after the action has already committed — use [Successful Action](./successful-action-screen.md).

### Edge cases

- **Bottom sheet interruption before this screen:** the sheet gates entry; tapping "Continuar" in the sheet pushes this confirmation screen. The sheet and this screen are sequential, not alternatives.
- **Long asset names** in ConfirmationHeader: allow natural wrap; never truncate the amount.
- **Zero fee row** (Comisión: $0.00): keep it — removing it breaks the consistent price breakdown pattern.
- **Dismiss tapped before confirming:** returns the user to the entry form with the amount intact.

## Interactions

| Interaction | Behavior | Source of truth |
|-------------|----------|-----------------|
| AppBar dismiss tap | Returns to entry form | [app-bar](../../components/app-bar.md) |
| Primary CTA tap | Commits transaction → [Successful Action](./successful-action-screen.md) | [bottom-ctas](../../components/bottom-ctas.md) |
| TextButton "Cancelar" | Same as dismiss — returns to entry form | [bottom-ctas](../../components/bottom-ctas.md) |
| Edit icon (ConfirmationHeader) | Returns to calculator with amount pre-filled | MDS ConfirmationHeader |
| Hardware back (Android) | Same as dismiss | [app-bar](../../components/app-bar.md) |

## Accessibility

> **Mobile** — VoiceOver · TalkBack. Copy → [`../../content/guidelines/accessibility.md`](../../content/guidelines/accessibility.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | Navigation screen (not modal) — no `accessibilityViewIsModal`; dismiss is a button |
| Focus & traversal | On open, focus lands on ConfirmationHeader amount; traversal: amount → secondary → list rows → primary CTA → Cancelar → AppBar |
| Labels & announcements | Announce on entry ("Confirmar compra" or equivalent); list rows read as label + value pairs |
| Touch & gestures | CTAs ≥ 44×44 pt / 48×48 dp; edit icon ≥ 44 pt touch target |

## Design intent

The confirmation screen is the last moment of informed consent before money moves. Full-screen treatment signals weight; the price breakdown creates a paper-receipt analogy that builds trust. Forced informational interruptions (regulatory / risk) belong on the sheet that precedes this screen — not on the confirmation screen itself, which must stay focused on the commit decision.

## Token bindings

> [`../../tokens/token-reference.md`](../../tokens/token-reference.md) — no raw hex or px.

| Role | Token path | Element # | Notes |
|------|------------|:---------:|-------|
| Screen background | `color/background/default` | root | |
| ReadOnlyList horizontal inset | `spacing/padding/base` (16) | 2b wrapper | Wrapper owns inset — component must not add additional |
| Bottom safe area | `spacing/padding/base` (16) | below 3 | Shell-owned |

## Text slot rules

> Voice and locale → [`../../content/index.md`](../../content/index.md).

| Slot | Element # | Max chars | Grammar | Examples |
|------|:---------:|:---------:|---------|---------|
| ConfirmationHeader main amount | 2a | 12 | Number only | "0.56" · "1,234.00" |
| ConfirmationHeader main currency | 2a | 8 | Asset ticker | "NVDAx" · "BTC" |
| ConfirmationHeader secondary label | 2a | 5 | Short connector | "Con" |
| ConfirmationHeader secondary amount | 2a | 12 | Currency + symbol | "$125.34" |
| ReadOnlyList label | 2b | 24 | Sentence case noun | "Precio de mercado" · "Comisión" · "Total" |
| ReadOnlyList amount | 2b | 16 | Currency value | "$224.18" · "$0.00" |
| Primary CTA | 3 | 20 | Flow-specific infinitive | "Comprar" · "Vender" · "Enviar" |
| TextButton cancel | 3 | 12 | Single word | "Cancelar" |

## Verification

- [ ] Layout is full-screen — no `MDSBottomSheet` or `BottomSheetView` wrapper
- [ ] Stack matches the **Stack order** table top → bottom
- [ ] `topContainer` height hugs StatusBar + AppBar (≥ 44 px) — `primaryAxisSizingMode = AUTO`
- [ ] AppBar has leading dismiss icon; no trailing icons; no title text
- [ ] ConfirmationHeader shows main amount · currency · "Con" · secondary amount · secondary currency
- [ ] ReadOnlyList has ≥ 3 rows: price · fee · Total; Total row is `Bold / Total` + `ContentType.Type = Total`
- [ ] `RowReadOnlyList` wrapper owns 16 px inset; `MDS ReadOnlyList` has no additional inset
- [ ] BottomCTAs: primary = flow-specific verb; TextButton = "Cancelar"; `hasAltText = false`
- [ ] Safe area `spacing/padding/base` (16) reserved below BottomCTAs
- [ ] No raw hex, px, or dp values in the frame

## Related specs

- [`../../components/app-bar.md`](../../components/app-bar.md)
- [`../../components/bottom-ctas.md`](../../components/bottom-ctas.md)
- [`../../components/bottom-sheet.md`](../../components/bottom-sheet.md) — for informational interruptions that precede this screen
- [`./successful-action-screen.md`](./successful-action-screen.md) — the screen after a successful commit
- [`../../content/index.md`](../../content/index.md)
- [`../../tokens/token-reference.md`](../../tokens/token-reference.md)

---
