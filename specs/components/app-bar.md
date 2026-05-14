---
id: app-bar
name: App Bar
category: component
platform: mobile
tags: [navigation]
status: ready
figma node: "6701:44162"
---

## What it is

The App Bar is the primary navigation component on mobile. It always appears as the first element on every app screen, providing context about the current screen and actions to navigate between screens.

## When to use

- On every app screen, without exception.
- As the topmost element content begins immediately below it.
- To surface actions that directly support the main task of that screen.

## When NOT to use

- Inside bottom sheets or modals — the App Bar is a screen-level component only.

## Placement

The App Bar must always be the **top element** on every screen and must always be present. No other element may appear above it. Screen content starts directly below it with no gap.

## Exception — Title in App Bar

Only place the title inside the App Bar on the **Calculator screen** (conversion, buy/sell). No other screen qualifies for this exception.

On calculator screen:
- Display the action (e.g. Convertir) inside the App Bar.
- Optionally include a MDSIcon currency alongside the title when the selected asset needs to be identified at a glance.

## Actions

The App Bar can display actions that support the main tasks of the current screen. Keep them minimal only expose actions that are directly relevant to the screen's primary goal.

## Content guidelines

- Use sentence case for AppBar titles.
- Keep titles short — one to four words when possible.
- Do not duplicate the title in both the App Bar and the screen content.
- **Calculator screen exception:** use an infinitive verb. 12 characters maximum including the space.

| Mode | Formula | Example |
|---|---|---|
| Buy | Comprar [MDSIcon] | Comprar BTC |
| Sell | Vender [MDSIcon] | Vender ETH |
| Convert | Convertir | Convertir |

## Related specs

- [`header.md`](./header.md)
