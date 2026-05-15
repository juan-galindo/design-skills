---
id: tabs
name: Tabs
category: component
platform: mobile
tags: [navigation, content, sections]
status: ready
figma node: "19118:118870"
---

## What it is

Tabs organize content into multiple related sections, showing one at a time and letting users navigate freely between them. Each tab is a peer to the others at the same hierarchical level — not a step in a sequence.

## When to use

- To switch between views of related content within the same context.
- When a screen has 2–5 distinct, equally important sections.
- To replace a section header as the primary navigation when content is structured in parallel groups (see [Header](./header.md)).

## When NOT to use

- As filters — use Chips instead.
- When there is only one section — show the content directly.
- Stacked — never place one tab row inside another.
- To indicate progress or group sequential content — use a stepper instead.
- When users need to compare information across tabs — each tab panel must be self-contained.
- As primary app navigation — use BottomNavigation instead.

---

## Variants

### fill (fixed-width)

All tabs must fit without scrolling; if any label overflows, switch to `default` (intrinsic-width).

### default (intrinsic-width)

The last tab snaps to the right edge when reached.

Use when labels need to be longer, when localization may expand text, or when a full-width stretch would look unbalanced.

---

## Minimum count

A tab component requires **at least 2 tabs**. A single tab is not a valid use case.

---

## Behavior

**Switching tabs:** users can tap an inactive tab or swipe the content area horizontally.

**Indicator animation:** the active indicator slides to the selected tab on switch.

**Rubber-band:** the row rubber-bands at either end to signal there are no more tabs.

**Pinning:** tabs can be pinned below the AppBar so content scrolls beneath them, or they can move with the page content and scroll under the header.

---

## Content guidelines

- Use short, scannable labels — 1–2 words maximum.
- Use sentence case: "All assets", not "All Assets".
- Never truncate or wrap labels — shorten the text or switch to the `default` (intrinsic-width) variant.
- Always pair icons with a text label — never use an icon alone.
- Use `hasPulsingDot` only to signal genuinely new or unread content, not as decoration.

---

## Related specs

- [`header.md`](./header.md)
- [`bottom-sheet.md`](./bottom-sheet.md)
- [`app-bar.md`](./app-bar.md)
