---
id: app-bar
name: App Bar
category: component
platform: mobile
tags: [navigation, screen, header]
status: ready
figma node: "6701:44162"
---

## What it is

The App Bar is the primary navigation component on mobile. It always appears as the first element on every app screen, providing context about the current screen and actions to navigate between screens.

## When to use

- On every app screen, without exception.
- As the topmost element — content begins immediately below it.

## When NOT to use

- Inside bottom sheets or modals — the App Bar is a screen-level component only.

## Placement

The App Bar must always be the top element on a screen and must always be present. Content starts directly after it.

## Title placement

### Default — Title on screen

Always prefer placing the title within the screen content, not inside the App Bar.

This approach:
- Maintains clear visual hierarchy
- Allows the title to scroll with the content
- Gives more flexibility for title styling and size
- Provides better context within the page layout

### Exception — Title in App Bar

Only place the title inside the App Bar when putting it in the screen content would negatively affect the hierarchy.

Use when:
- The screen has multiple nested contexts or states
- The screen has a Tabs component as its first element
- The content flow would be disrupted by an in-screen title

Examples: Calculator screen (conversion, buy/sell), Activity screen, Límites transaccionales

## Content guidelines


## Examples

| Pattern | Screens |
|---------|---------|
| Title on screen | Seguridad (back arrow only in bar, "Seguridad" as H1 in content); Referral screen (back arrow only in bar, headline in content) |
| Title in App Bar | "Comprar SOL" with mode chip (Ahora); "Límites transaccionales" with Tabs (Dinero / Cripto) |

## Related specs

- [`../patterns/`](../patterns/)
