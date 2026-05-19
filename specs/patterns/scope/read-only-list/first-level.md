---
id: pattern-read-only-list-first-level
name: Read-only list — First level
category: pattern
platform: mobile
tags: [list, read-only, key-value, confirmation, asset-detail]
aliases: [info list, summary list, key-value list]
status: ready
relationships:
  applies_to: []
  conflicts_with: []
  requires: []
---

## Agent summary

- Host: **`MDS ReadOnlyList`** with **`MDS ReadOnlyHorizontal`** rows — label left, value right, **non-interactive**.
- **First level = flat rows only.** No chevron, no expansion, no nested children. For expandable rows use the **[second-level](./second-level.md)** pattern.
- Allowed surfaces: **confirmation screens** and **asset detail**. MUST NOT use as a selectable list — that's `MDS ListItem` / sheet list slots.
- Row props in this variant: `hasIconButton={false}`, `hasTag={false}`. Values may use `ContentTypeMdsCurrencyPrice` or plain text.
- **Copy:** [`../../content/index.md`](../../content/index.md) — labels are nouns, values are data.

## Overview

A flat, scannable list of label → value pairs that summarizes information the user is reviewing but not editing. Used to confirm an action before commit (e.g. order review) and to surface key facts on an asset detail screen.

It is the **flat** counterpart to the **second-level** variant (chevron-expandable rows). Choose first level when every row is a single fact; switch to second level the moment any row needs to reveal child detail.

## Structure

| Variant | Host component / slot | Row | Surface |
|---------|----------------------|-----|---------|
| **First level (this spec)** | `MDS ReadOnlyList` | `MDS ReadOnlyHorizontal` (flat, no chevron) | Confirmation · Asset detail |
| Second level → [`./second-level.md`](./second-level.md) | `MDS ReadOnlyList` | Expandable row (chevron) | Same surfaces, when a row needs nested detail |

### Container stack

```
container (px = spacing/padding/base · pb = spacing/padding/lg)
└── MDS ReadOnlyList
    ├── MDS ReadOnlyHorizontal — label · value
    ├── MDS ReadOnlyHorizontal — label · value
    └── …
```

- Row count: agent-recommended **2–7** per block. Beyond 7, split with a `Header` (`sectionHeader`) into grouped blocks.
- Value content: plain text, `ContentTypeMdsCurrencyPrice`, or a string — never an action.

## Usage & behavior

### When to use

- MUST use on **confirmation screens** to summarize the action the user is about to commit (amounts, fees, rates, destination).
- MUST use on **asset detail** screens to display flat factual metrics (e.g. EBITDA, debt/equity, opening price).
- MUST keep every row read-only — rows are informational, not affordances.

### When NOT to use

- MUST NOT use when any row needs to reveal child detail — use [second-level](./second-level.md) instead.
- MUST NOT use for selectable options (radio, currency picker) — use sheet list slots / `MDS ListItem`.
- MUST NOT mix first-level and second-level rows in the same list — pick one variant per block.
- MUST NOT place inside a [bottom sheet](../../components/bottom-sheet.md) — sheets use their own list slots.

### Edge cases

- **Long values** wrap to a second line; label stays single-line and truncates only as a last resort.
- **Empty / pending value** — render placeholder text, never an empty cell.
- **Dynamic data** (currency, amount, rate) — bind via `ContentTypeMdsCurrencyPrice`; do not hardcode formatting.

## Interactions

N/A — static, read-only. Any tap target on a row promotes the block to the [second-level](./second-level.md) pattern.

## Accessibility

> **Mobile only** — VoiceOver · TalkBack. Copy → [`../../content/guidelines/accessibility.md`](../../content/guidelines/accessibility.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | Static list of label/value pairs — not buttons; rows MUST NOT expose `button` trait. |
| Focus & traversal | One focus stop per row, announcing `{label}, {value}` in order. |
| Labels & announcements | Label is the accessible name; value is the accessible value — do not concatenate into one string with punctuation. |
| Touch & gestures | No gestures. Rows MUST NOT respond to tap. |

## Design intent

Confirmation and asset-detail surfaces ask the user to **read and verify**, not to act. A flat read-only list keeps the row a single density beat — eyes scan left labels, right values — and reserves the chevron affordance for the second-level pattern, so an expandable row always signals "there is more here."

## Token bindings

> [`../../tokens/token-reference.md`](../../tokens/token-reference.md) — no raw hex / dp / pt.

| Role | Token path | Notes |
|------|------------|-------|
| Container horizontal inset | `spacing/padding/base` | 16 — applied by container, not the row |
| Container bottom padding | `spacing/padding/lg` | 24 below the list block |
| Gap above the list when preceded by `MDS ConfirmationHeader` | `spacing/padding/lg` | 24 — owned by the **bottom of `MDS ConfirmationHeader`**, not by a wrapper above the list. Stack gap between the two components is `0`. |
| Row internal spacing | Owned by `MDS ReadOnlyList` / `MDS ReadOnlyHorizontal` | Do not override at pattern level |
| Label typography | `body/small` | Host default |
| Value typography | `body/small-medium` (or `ContentTypeMdsCurrencyPrice` size `extra small`) | Per-row emphasis via nested variant swaps — see [Total emphasis](#total-emphasis) |

Horizontal gutter ownership: the **container** owns the 16 px inset — the rows MUST NOT add their own padding-x.

## Text slot rules

| Slot | Rules |
|------|--------|
| Label (left) | Noun phrase · sentence case · 1 line preferred · no terminal punctuation |
| Value (right) | Data or short phrase · numerals formatted via `ContentTypeMdsCurrencyPrice` for monetary/quantitative values |
| Tag / icon button | MUST be off in first-level (`hasIconButton={false}`, `hasTag={false}`) |

## Total emphasis

On confirmation screens the last row commonly summarizes the committing amount (e.g. **Total**). `MDS ReadOnlyList` does not expose a list-level "emphasis" or "divider" prop, and `MDS ReadOnlyHorizontal` does not expose a top-level emphasis prop either. Total emphasis is expressed by swapping the **two nested variants** inside the row:

| Sub-instance | Property | Value for Total | Default value |
|--------------|----------|-----------------|---------------|
| `Label` (left)  | `type` | `Bold / Total` (or `Medium / Total`) | `Default` |
| `ContentType` (right) | `Type` | `Total` | `Simple Text` |

Apply **both** swaps on the same row — Label alone or ContentType alone reads as inconsistent. After switching the Label variant, re-apply the label text override on the Bold/Total variant's text node (the variant exposes a different text node from `Default`, so the override does not carry across).

MUST NOT:
- Insert a manual divider sibling between rows to fake emphasis — rows are component-owned children of `MDS ReadOnlyList` and a non-component sibling cannot be placed between them.
- Use `Medium / Total` and `Bold / Total` on different rows in the same list — pick one weight and stay consistent.
- Emphasize more than one row per list block.

## Verification

- [ ] Host = `MDS ReadOnlyList` with `MDS ReadOnlyHorizontal` flat rows only.
- [ ] No chevron, no expand, no tap targets.
- [ ] Surface is confirmation or asset detail (or documented exception).
- [ ] Container owns the 16 px horizontal inset; rows don't double it.
- [ ] Currency / amounts bound via `ContentTypeMdsCurrencyPrice`, not hand-formatted.
- [ ] Tokens from `token-reference.md`; no raw values.
- [ ] If a Total row exists: `Label.type = Bold / Total` (or `Medium / Total`) AND `ContentType.Type = Total` — both swaps applied, label text re-overridden on the Bold/Total variant. At most one emphasized row per list block.
- [ ] No manual dividers between rows; row separation is owned by `MDS ReadOnlyList`.

## Related specs

- [`./second-level.md`](./second-level.md) — expandable sibling pattern (chevron rows)
- [`../../figma-catalog/mobile-components.md`](../../figma-catalog/mobile-components.md) — `ReadOnly` (`15014:78155`)
- [`../../tokens/token-reference.md`](../../tokens/token-reference.md)
- [`../../content/index.md`](../../content/index.md)
- Figma reference: [first-level recipe](https://www.figma.com/design/Ap5WSlaYdQxQe8vR4j3abx/Recipes?node-id=1-1942) (`1:1942`)

---
