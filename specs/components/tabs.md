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

- When a screen has 2–5 distinct, equally important sections.
- To switch between views of related content within the same context.
- To replace a section header as the primary navigation when content is structured in parallel groups (see [Header](./header.md)).

## When NOT to use

- When there is only one section — show the content directly. Tabs require at least 2 items.
- As filters — use Chips instead.
- Stacked — never place one tab row inside another.
- To indicate progress or group sequential content — use a stepper instead.
- When users need to compare information across tabs — each tab panel must be self-contained.
- As primary app navigation — use BottomNavigation instead.

---

## Variants

### fill (fixed-width)

Use when labels are short and 2–3 tabs fit comfortably at equal width.

### default (intrinsic-width)

Avoid fill when localization may produce longer strings, use when labels vary in length or there are 5+ tabs. The row scrolls horizontally and the last visible tab snaps to the right edge when reached.

---

## Behavior

**Switching tabs:** users can tap an inactive tab or swipe the content area horizontally.

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