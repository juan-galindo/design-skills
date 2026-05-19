---
name: taste
description: Brand and product taste lens — hierarchy of information, density, whitespace, and overall visual expression that makes a surface feel like Bitso.
load: on-demand
source_of_truth: ../../../specs/components/, ../../../specs/tokens/typography-tokens.md
---

# Taste — foundation layer

Load this foundation when a surface is **functionally correct but doesn't feel right**. Taste covers the qualitative judgments that don't fit cleanly into spec rules: where the eye lands first, how dense the screen feels, whether the brand voice comes through visually.

## What "taste" means here

| Lens | Question |
|------|----------|
| Implementation | Does the code execute? |
| Quality | Did we pick the right component? |
| **Taste** | **Does this feel like a Bitso surface that a thoughtful designer made?** |

## Hierarchy of information

One screen should have one clear primary action and one clear primary message. If you can't point to either, the hierarchy is wrong.

- **Headers** — verify the header hierarchy step (see the 10-step process, step 6). Title weight, subtitle weight, and supporting text should descend in visual weight, never compete.
- **Primary action** — one per screen. Secondary actions should be visually lighter, not the same size + color as the primary.
- **Reading order** — scan from top-left to bottom-right (LTR locales). Headlines first, then content, then actions. Don't bury the primary action above the content it commits.

## Density

Density is the ratio of content to whitespace. Bitso surfaces tend to be **moderately dense** — not airy marketing, not packed data tables.

- If everything is the same size, the page is too dense.
- If the page scrolls more than 1.5 viewports on a single conceptual unit, it's too airy — combine related cards.
- Charts, balances, and transaction lists can run dense; onboarding, empty states, and confirmations should be airy.

## Whitespace

Whitespace is **active**, not leftover. Use it to:

- Separate unrelated sections (apply `spatial-rhythm.md` → 48px between unrelated, 24px with border, 12px when related)
- Frame the primary action so it reads as the destination
- Give numeric content (balances, amounts) room to breathe — amounts are content, not decoration

## Visual expression

- **Color** — use semantic / component tokens. Brand color is intentional, not a decoration; if everything is brand color, nothing is.
- **Typography** — pick from `specs/tokens/typography-tokens.md`. Resist the urge to add a "just slightly bigger" variant — there's a token for that.
- **Iconography** — icons reinforce the label, they don't replace it. If an icon needs a tooltip to be understood, use the label.
- **Motion** — motion confirms cause and effect. Decorative motion is a distraction; cut it.

## When to load this foundation

- Stakeholder review pass where the spec is fine but the screen feels off
- Pre-launch polish pass before handoff
- Mentoring on "why this design feels generic"
- Auditing a surface against Bitso brand expression

## Red flags

- Two equally-weighted primary actions on one screen
- Brand color used as a default fill across multiple elements
- All text at the same weight — no scannable hierarchy
- Whitespace applied uniformly with no relationship to content groupings
- Icon-only interactive elements without accessible labels
- Motion added for visual interest rather than to confirm a transition
