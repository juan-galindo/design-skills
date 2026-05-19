---
name: quality
description: Designer review lens — flags component misuse, severity escalation, and wrong-component-for-scenario choices that would be caught in a design review.
load: on-demand
source_of_truth: ../../../specs/components/, ../../../specs/patterns/
---

# Quality — foundation layer

Load this foundation when you want to **simulate a design review**. Implementation can be correct (passes `implementation.md`) while still being wrong by design review standards: the wrong component for the scenario, the wrong severity for the message, or a misuse of an otherwise valid pattern.

## What "quality" means here

Quality is about **scenario fit**, not visual polish (`taste.md`) or runtime correctness (`implementation.md`):

| Lens | Question | Foundation |
|------|----------|------------|
| Quality | Did we pick the right component / severity for this scenario? | This file |
| Implementation | Does the API contract hold? | `implementation.md` |
| Taste | Does it feel like a Bitso surface? | `taste.md` |

## Review checklist

Run this against any new screen, flow, or component implementation before handoff.

### 1. Right component for the content type

- Was a `BottomSheet` used where a `Modal` or full screen would fit better? (See `bottom-sheet.md` → Usage & behavior → When NOT to use.)
- Was a `Header` stacked under an `AppBar` correctly, or duplicated? (See `app-bar.md` + `header.md` Composition sections.)
- Was a generic `Card` used where a specialized component exists? (Search `specs/components/` before introducing a custom layout.)

### 2. Severity escalation

Severity should match the user's situation. Common mistakes:

- Using an **error** style for a recoverable warning
- Using a **warning** style for a non-blocking informational note
- Using a **success** confirmation for an action that isn't yet committed
- Modal / bottom-sheet for content that should be inline

### 3. Component misuse

- Patterns applied outside their `applies_to` host (e.g. arrow bullets in a sheet not in the pattern's allowed hosts)
- Tags or chips used as buttons (interactive affordance mismatch)
- Confirmation header used where a section header is enough
- Headers with vague rules ("use sparingly") implemented without checking the MUST condition

### 4. Scenario coverage

- Happy path is designed — but are there empty, error, loading, and edge states?
- Long-string and locale (es_MX, es_AR, es_CO, pt_BR, en_US) considered? Run text through `specs/content/`.
- Dark mode considered? Component tokens handle it; raw values do not.

### 5. Number & currency formatting

Numbers and currency are content with strict rules — they fail review faster than copy because the wrong format reads as broken software, not a typo. **Focus the audit on USD and MXN** — they are Bitso's primary fiat surfaces and the most common source of placeholder errors in Figma. Validate other locales (ARS, COP, BRL) when the screen explicitly targets them.

**Source of truth:** [`specs/content/guidelines/currency.md`](../../../specs/content/guidelines/currency.md).

#### USD and MXN — required format

| Rule | Format | Right | Wrong |
|------|--------|-------|-------|
| Thousand separator | comma | `10,000` | `10.000` |
| Decimal separator | period | `12.40` | `12,40` |
| Decimal places for currency | always 2 | `12.40`, `12.00` | `12.4`, `12` |
| Zero exception | no decimals | `0` | `0.00` |
| Percentages | minimum needed; drop trailing zero | `12.4%`, `12.45%` | `12.40%`, `12.450%` |
| Currency code | ISO, after the number, single space | `25,000.50 USD` · `25,000.50 MXN` | `$25,000.50` · `USD 25,000.50` · `25,000.50USD` · `25,000.50 usd` |
| Currency symbol | **never** use `$` — `$` is ambiguous across LATAM | `25,000.50 MXN` | `$25,000.50` |

#### Other rules to audit

- **Crypto amounts** use the ticker after the number with a space, e.g. `0.005 BTC` (not `BTC 0.005`, not `0.005 btc`)
- **Sign convention** for transactions: `+` / `−` prefix matches the direction, not just color
- **Skeleton / loading state** for amounts uses the documented placeholder, not a fake number
- **Placeholder amounts in Figma** are realistic — use values that exercise the longest string (e.g. `1,234,567.89 USD`), not `$1234`

This check is **especially critical for `figma-designer`**: placeholder text in Figma is easy to leave malformed, and the engineer will ship what you draw. Run this check at Step 8 (stakeholder review) and again at Step 11 (handoff). For `prototype-designer`, validate the formatted output in the running prototype, not just the source string.

## When to load this foundation

- Pre-handoff design audit (often pairs with the `design-handoff` skill)
- Code review when reviewing component selection, not just syntax
- Mentoring a junior designer / engineer on why a choice was wrong
- Auditing an existing surface against current MDS

## Red flags

- "It works" but a more specific component exists — pick the specific one
- Modal + bottom-sheet on the same flow without a documented reason
- Severity styling chosen for visual contrast rather than meaning
- No empty / error / loading state designed for an interactive surface
- Patterns mixed across `applies_to` boundaries (load the pattern spec)
- `$` symbol used anywhere for USD or MXN — always `25,000.50 USD` / `25,000.50 MXN`, never `$25,000.50`
- USD or MXN amounts using `.` for thousands or `,` for decimals — that's the AR / CO / BR format
- Currency amount missing the second decimal (`12.4` instead of `12.40`) — or zero shown as `0.00` instead of `0`
- ISO code attached without a space (`100USD`) or in lowercase (`100 usd`)
- Placeholder amounts in Figma left at unrealistic values — replace with longest-string examples before review
