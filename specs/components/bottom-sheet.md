---
id: bottom-sheet
name: Bottom Sheet
category: component
platform: mobile
tags: [modal, overlay]
status: ready
figma node: "11381:30960"
---

## What it is

Bottom Sheets are modal elements used to present non-immersive content or enable simple tasks within a flow.

## When to use

- For simple, short, and narrowly focused tasks.
- When content or an action needs surface area without navigating away from the current screen.

## When NOT to use

- For entire flows — a bottom sheet handles one focused task, not a multi-step sequence.
- Stacked on top of another bottom sheet.

## Dismissal

A sheet must always be dismissible. There are three ways:

1. **Dragging down** on the handle.
2. **Tapping outside** the sheet.
3. **Clicking a CTA** within the sheet.

## Height and scrolling

The bottom sheet adapts its height to its content. It must not exceed **85% of the screen height**. When content surpasses that limit, the content area becomes scrollable.

## Content

The bottom sheet supports any content inside it.

## Related specs

- [`bottom-ctas.md`](./bottom-ctas.md)
