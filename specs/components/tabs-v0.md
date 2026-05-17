---
id: tabs-simple
name: Tabs (draft)
category: component
platform: mobile
tier: molecule
tags: [navigation, content, sections]
aliases: []
status: draft
superseded_by: tabs
figma node: "19118:118870"
relationships:
  composes_with: [app-bar, header]
  conflicts_with: [bottom-sheet]
  substitutes: []
  requires: []
---

## Agent summary

- **Draft** — canonical spec: [`tabs.md`](./tabs.md).
- **MDSTabs** — 2–5 peer sections; tap or swipe to switch; not filters, steppers, or bottom nav.

## Overview

Tabs organize related sections on one screen — one panel visible at a time. Each tab is a peer, not a sequential step.

## Structure

| `variant` | When |
|-----------|------|
| `fill` | Short labels; 2–3 tabs at equal width |
| `default` | Longer or variable labels; scrollable row; up to 5 tabs |

## Usage & behavior

### When to use

- **2–5** distinct, equally important sections on one screen.
- Primary in-content nav when [Header](./header.md) uses `sectionHeader` first.

### When NOT to use

- One section only; inside [bottom-sheet](./bottom-sheet.md); as filters (Chips); stacked tab rows; steppers; cross-tab comparison; Bottom Navigation.

### Composition

- MAY pin below [App Bar](./app-bar.md) or scroll with page content.

## Interactions

| Interaction | Behavior | Notes |
|-------------|----------|-------|
| Tap tab | Switch active panel | — |
| Swipe content | Switch panel horizontally | — |
| Tab row scroll | `default` variant scrolls; rubber-band at ends | — |

## Accessibility

> **Mobile** — see [`tabs.md`](./tabs.md).

| Concern | Requirement |
|---------|-------------|
| Role / semantics | Tab bar + selected state (iOS/Android) |
| Focus & traversal | VoiceOver / TalkBack: tab then panel on switch |
| Labels & announcements | Icon + text label — MUST NOT icon-only |
| Touch & gestures | Min touch targets; tap to switch (do not rely on swipe-only) |

## Design intent

N/A — see [`tabs.md`](./tabs.md).

## Token bindings

N/A — see [`tabs.md`](./tabs.md).

## Text slot rules

| Slot | Max length | Rules |
|------|------------|-------|
| `label` | 1–2 words | Sentence case; no truncate/wrap |

## Verification

- [ ] Superseded by [`tabs.md`](./tabs.md) for production use.

## Related specs

- [`tabs.md`](./tabs.md) · [`header.md`](./header.md) · [`app-bar.md`](./app-bar.md) · [`bottom-sheet.md`](./bottom-sheet.md)

---
