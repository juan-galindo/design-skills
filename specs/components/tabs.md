---
id: tabs
name: Tabs
category: component
platform: mobile
tags: [navigation, content, sections]
status: ready
figma node: "19118:118865"
---

## What it is

Tabs organize content into multiple related sections, showing one at a time and letting users navigate freely between them. Each tab is a peer to the others at the same hierarchical level — not a step in a sequence.

## Principles

- **Navigational** — users move back and forth between groups of related content.
- **Related but distinct** — content is related under a larger organizing principle, but each tab shows a different view. Only one tab can be active at a time.
- **Peers of equal hierarchy** — tabs are siblings, not steps. No tab is "before" or "after" another.
- **Scalable** — tabs can scroll horizontally to handle overflow and localization.

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

### Default (fixed-width)

Tabs fill the full container width equally. Width = container ÷ number of tabs. Use a maximum of **4 tabs** on mobile. All tabs must fit without scrolling; if any label overflows, switch to Left (intrinsic-width).

Minimum horizontal padding per tab item: **16dp**.

### Left (intrinsic-width)

Each tab's width = label length + 16dp padding on each side. Tabs align to the left with natural widths. When the total width exceeds the viewport, the row scrolls horizontally independently from the content. The last tab snaps to the right edge when reached.

Use when labels need to be longer, when localization may expand text, or when a full-width stretch would look unbalanced.

---

## Minimum count

A tab component requires **at least 2 tabs**. A single tab is not a valid use case.

---

## Tab item states

| State | Description |
|-------|-------------|
| `Active` | The currently selected tab. Bold label + 2px active indicator. |
| `Default` | An unselected tab. Regular label + 1px divider. |
| `Pressed` | Visual feedback on tap. |
| `Disabled` | Tab is present but not interactive. |

---

## Anatomy

Each tab item contains, in order:

1. **Icon** (optional) — `MDSIcon`, 16×16, shown before the label.
2. **Label** — text string. Never wraps or truncates.
3. **Pulsing dot** (optional) — `MDS PulsingDot`, 8×8, shown after the label to signal new or unread content.

The container has a full-width bottom border. A highlighted underline indicator marks the active tab and animates to the newly selected tab on switch.

---

## Behavior

**Switching tabs:** users can tap an inactive tab or swipe the content area horizontally.

**Indicator animation:** the active indicator slides to the selected tab on switch.

**Rubber-band:** the row rubber-bands at either end to signal there are no more tabs.

**Pinning:** tabs can be pinned below the AppBar so content scrolls beneath them, or they can move with the page content and scroll under the header.

---

## Tokens

### Typography

| Element | Token |
|---------|-------|
| Label — Default | `typography/font-family/secondary` + `typography/weight/regular` + `typography/size/300` + `typography/lineheight/300` + `typography/letterspacing/0` |
| Label — Active | `typography/font-family/secondary` + `typography/weight/medium` + `typography/size/300` + `typography/lineheight/300` + `typography/letterspacing/0` |

### Color

| Element | Token |
|---------|-------|
| Label — Default | `color/onsurface/lowemphasis` |
| Label — Active | `color/ontertiary/default` |
| Indicator — Active | `color/tertiary/selected` |
| Divider — Default | `color/border/light` |

### Border

| Element | Token |
|---------|-------|
| Active indicator width | `border/width/200` (2px) |
| Default divider width | `border/width/100` (1px) |

### Spacing

| Element | Token |
|---------|-------|
| Vertical padding (top + bottom) | `spacing/stack/sm` (8px) |
| Gap between icon / label / dot | `spacing/inline/2xs` (4px) |

---

## Content guidelines

- Use short, scannable labels — 1–2 words maximum.
- Use sentence case: "All assets", not "All Assets".
- Labels must be parallel in structure ("Favorites", "Recent", "Popular" — not "Favorites", "Recently viewed", "Most popular").
- Never truncate or wrap labels — shorten the text or switch to Left (intrinsic-width) variant.
- Always pair icons with a text label — never use an icon alone.
- Use `hasPulsingDot` only to signal genuinely new or unread content, not as decoration.

---

## Accessibility

### VoiceOver (iOS)

| Property | Value |
|----------|-------|
| Label | `[Tab label]` |
| Value | `Selected, [#] of [#]` (active) / `[#] of [#]` (inactive) |
| Trait | Tab |
| Hint | n/a |

Example: *"Selected, Today, Tab, 1 of 3."*

### TalkBack (Android)

| Property | Value |
|----------|-------|
| ContentDescription | `[Tab label]` |
| Value / StateDescription | `Selected, [#] of [#]` (active) / `[#] of [#]` (inactive) |
| Role | Action bar tab |
| Action | Double-tap to activate (inactive tabs only) |

Example: *"Tab, This week, new items, 2 of 3, Double-tap to activate."*
Double-tapping a selected tab voices "Selected".

---

## Related specs

- [`header.md`](./header.md)
- [`bottom-sheet.md`](./bottom-sheet.md)
- [`app-bar.md`](./app-bar.md)
