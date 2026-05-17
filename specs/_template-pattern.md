# MDS pattern spec template

Copy to `specs/patterns/{id}.md` · Guide: [`patterns/CLAUDE.md`](patterns/CLAUDE.md)

Patterns describe **composition across components** — not a single Figma component. Align section names with [`_template.md`](_template.md) (components) for agent parity.

```yaml
---
id: pattern-id
name: Pattern Display Name
category: pattern
platform: mobile
tags: []
aliases: []
status: draft
figma node: ""
relationships:
  applies_to: []      # component ids where this pattern is used
  conflicts_with: []  # components or patterns that MUST NOT combine
  requires: []
---
```

## Agent summary

- <!-- 3–5 MUST rules; name host components/slots -->
- **Copy:** [`content/index.md`](content/index.md) when pattern includes text

## Overview

<!-- What the pattern is + why it exists (2 short paragraphs max) -->

## Structure

| Variant | Host component / slot | Surface |
|---------|----------------------|---------|
| | | |

<!-- Per-variant stack with links to component specs -->

## Usage & behavior

### When to use

- MUST …

### When NOT to use

- MUST NOT …

### Edge cases

- 

## Interactions

<!-- N/A — static pattern, or table like component template -->

## Accessibility

> **Mobile only** (iOS + Android) — VoiceOver, TalkBack. Copy → [`content/guidelines/accessibility.md`](content/guidelines/accessibility.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | |
| Focus & traversal | |
| Labels & announcements | |
| Touch & gestures | |

## Design intent

<!-- Principles only — do not repeat MUST NOT lists -->

## Token bindings

> [`tokens/token-reference.md`](tokens/token-reference.md) — no hex

| Role | Token path | Notes |
|------|------------|-------|
| | | |

## Text slot rules

<!-- N/A — no copy in pattern -->

| Slot | Rules |
|------|--------|
| | |

## Verification

- [ ] Usage & behavior MUST / MUST NOT
- [ ] Interactions (or `N/A` with reason)
- [ ] Accessibility (or `N/A` with reason)
- [ ] Tokens · host component rules

## Related specs

- 

---
