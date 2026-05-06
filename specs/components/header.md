---
id: header
name: Header
category: component
platform: mobile
tags: [hierarchy, title]
status: ready
figma node: "12437:32260"
---

## What it is

Headers create hierarchy and help people scan and understand content quickly. They group information, set expectations, and guide navigation across a page or flow.

## When to use

- To introduce a page, feature, or key area.
- To separate content into clear sections.
- To nest information within a section in a structured way.
- To help people scan and jump to what matters most.

## When NOT to use

- To style regular text just to make it larger or bolder.
- For inline emphasis within body text.
- For interactive controls (use buttons, links, or tabs instead).

## Variants

### Main header

The primary title of a page or experience. Appears **once per page**, positioned just below the App Bar with no spacing.

**Use it to:**
- Name the page or main view.
- Communicate the main goal of the screen.
- Anchor global actions and key context.

Examples: "Account overview", "Send crypto", "Security"

> **Always prefer placing the title within the screen content rather than in the AppBar.** See [AppBar guidelines](./app-bar.md) for when the title belongs in the bar.

**Behavior:**
- Appears once per page only.
- Positioned just below the App Bar — no spacing between them.
- Should not be used inside cards, side panels, or modals.

---

### Section header

Separates content into meaningful themes or tasks under the main header.

**Use it to:**
- Label key areas under the main header.
- Split content into meaningful themes or tasks.
- Help people scan and jump between sections.

Examples: "Balances", "Recent activity", "Sign-in", "Devices"

**Behavior:**
- Multiple section headers can appear on a page.
- Always comes under a main header — never as the only header on the page.
- Exception: a section header can serve as the first/main header when the page is structured with the Tabs component.

---

### Sub-section header

Organizes content nested inside a section.

**Use it to:**
- Group related content within a section.
- Create a clear reading order in complex layouts.
- Label repeated patterns, lists, or sub-groups.

Examples: "Two-factor authentication", "Recovery options", "Email alerts"

**Behavior:**
- Always nested under a section header.
- Do not skip levels — never place directly under a main header.
- Can repeat for lists of similar items.

## Hierarchy and structure

- Always start with **one main header** per screen.
- Use **section headers** to split major content areas.
- Use **sub-section headers** inside those sections as needed.
- Never jump from main header directly to sub-section header.
- Never use a header level only for visual styling.

## Spacing

- Keep enough space above headers to signal a new group.
- Avoid stacking multiple headers with no content between them.
- Each header level must have a clear visual distinction (size, weight, spacing) and a clear content purpose.

## Content guidelines

- Use sentence case for all header text.
- Keep titles short, clear, and specific.
- Every header must reflect the content that follows — a user scanning only headers should still understand the page.
- Add descriptions only when they reduce confusion, not to repeat the obvious.

## Related specs

- [`app-bar.md`](./app-bar.md)
- [`accordion.md`](./accordion.md)
