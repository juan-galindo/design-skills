# MDS component spec template

Copy to `specs/components/{id}.md` · Guide: [`components/CLAUDE.md`](components/CLAUDE.md)

```yaml
---
id: component-id
name: Component Display Name
category: component
platform: mobile
tier: atom | molecule | organism
tags: []
aliases: []
status: draft
figma node: ""
relationships:
  composes_with: []
  conflicts_with: []
  substitutes: []
  requires: []
---
```

## Agent summary

- <!-- 3–5 MUST rules -->
- **Copy:** [`content/index.md`](content/index.md) · slot limits below

## Overview

<!-- Why it exists + what it is (2 short paragraphs max) -->

## Structure

| Part / slot | Required | Notes |
|-------------|----------|-------|
| | | |

## Usage & behavior

### When to use

- MUST …

### When NOT to use

- MUST NOT …

### Edge cases

- 

### Composition

<!-- N/A — not a layout/composition component -->

## Interactions

> States, gestures, focus order, motion, dismissal. Mark `N/A — [reason]` for static, non-interactive display only.

| Interaction | Behavior | Notes |
|-------------|----------|-------|
| | | |

## Accessibility

> **Mobile only** (iOS + Android) — VoiceOver, TalkBack, Switch Control, Dynamic Type. Not web/desktop keyboard specs. Copy rules → [`content/guidelines/accessibility.md`](content/guidelines/accessibility.md) · [`content/index.md`](content/index.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | iOS accessibility traits · Android roles / `contentDescription` |
| Focus & traversal | VoiceOver / TalkBack focus order when shown, updated, or dismissed |
| Labels & announcements | `accessibilityLabel` · hints · live / post announcements on state change |
| Touch & gestures | Min touch target (44×44 pt iOS · 48×48 dp Android); gesture alternatives where AT cannot use swipe-only flows |

## Design intent

<!-- Principles + tradeoffs only — do not repeat MUST NOT lists -->

## Token bindings

> [`tokens/token-reference.md`](tokens/token-reference.md) — no hex

| Role | Token path | Notes |
|------|------------|-------|
| | | |

## Text slot rules

<!-- N/A — no text slots -->

| Slot | Max length | Basic rules |
|------|------------|-------------|
| | | |

## Examples

| Scenario | Reference |
|----------|-----------|
| | |

## Verification

- [ ] Usage & behavior MUST / MUST NOT
- [ ] Interactions (or `N/A` with reason)
- [ ] Accessibility (or `N/A` with reason)
- [ ] Tokens · text slots · related specs

## Related specs

- 

---
