---
name: tokens
description: Authoritative list of valid token values across spacing, color, typography, breakpoints, radius, shadows, and motion. Auto-relevant when editing TypeScript or TSX files.
load: auto
globs: ["**/*.tsx", "**/*.ts"]
source_of_truth: ../../../specs/tokens/
---

# Tokens — foundation layer

This file is **auto-loaded** when working on `**/*.ts` or `**/*.tsx`. It defines which token values are valid across the system. **Never hardcode hex, rem, dp, or pt values** — always resolve to a token.

## Source of truth

The canonical token list lives in [`specs/tokens/`](../../../specs/tokens/). Read it before assigning or validating any token.

| Tier file | Use for |
|-----------|---------|
| [`specs/tokens/token-reference.md`](../../../specs/tokens/token-reference.md) | Authoritative index — read first |
| [`specs/tokens/color-tokens.md`](../../../specs/tokens/color-tokens.md) | All semantic + component color tokens |
| [`specs/tokens/spacing-tokens.md`](../../../specs/tokens/spacing-tokens.md) | Spacing scale (use with `spatial-rhythm.md`) |
| [`specs/tokens/typography-tokens.md`](../../../specs/tokens/typography-tokens.md) | Text styles, font weights, line heights |

## Token tier — choose the lowest that applies

1. **Component tokens** — supports Light/Dark automatically (e.g. `buttonBackgroundPrimary`)
2. **Semantic tokens** — when no component token exists (e.g. `backgroundPrimary`, `textPrimary`)
3. **Base tokens** — primitives only. **Never use directly** in components.

## When to consult this foundation

- Validating that a value used in code maps to a real token
- Assigning tokens to a Figma component (see `design-assign-tokens` skill)
- Reviewing a PR for raw hex / px values
- Generating new components and selecting fill, text, or spacing values

## Red flags

- `#FFFFFF`, `#000`, `rgba(...)` literals in component files
- Raw `16px`, `24dp`, `1rem` instead of a spacing token
- Base tokens imported directly into product code
- Hardcoded values "to match Figma" — open the Figma file and read the token binding instead
