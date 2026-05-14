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

## Variants

### default

Shows a leading `arrow_back` icon. Trailing icon slots are optional. The screen title lives in the content below, not in the bar.

Use when the screen has a clear back-stack but no need to show a back button — for example, a root-level tab screen.

### backButton

Shows a leading `arrow_back` icon. Trailing icon slots are optional. `iconTrailing1` is commonly a `close` icon when the screen needs an explicit dismiss action alongside the back navigation.

Use on any screen the user navigated into and needs to return from. This is the most common variant for sub-screens.

### calculator

Shows a leading `arrow_back` icon, a centered action title (e.g. "Comprar BTC") with an optional currency icon `hasIconCurrency`, and a trailing MDS Dropdown for **order type selection**.

Order type options vary by asset class:

| Asset class | Options |
|---|---|
| Crypto, Stablecoins, Fiat | Ahora, Diaria, Semanal, Mensual, Precio deseado |
| Stocks | Mercado, Límite |

Use only on the Calculator screen (buy, sell, convert). See the Calculator screen exception in the Title placement section.

### global

Shows a permanent leading `menu` icon, a full-width MDSSearchField, and up to two trailing icon slots.

Use only on the main home screen. Do not use on sub-screens.

### globalSearch

Shows a leading `arrow_back` icon and a full-width MDSSearchField in its active/focused state (visible cursor, focus border).

Use when the user has tapped the MDSSearchField on the `global` variant and the keyboard is open.

### progressBar

Shows a leading `arrow_back` icon, a centered progress indicator with a step counter (e.g. "1/4"), and a single optional trailing `close` icon

Use on multi-step flows with a minimum of 3 steps where the user needs to know how far along they are and must be able to exit.

---

## Trailing icon behavior

The trailing container holds up to two icon buttons, stacked right-to-left. Both slots hold **secondary or complementary actions** — never primary actions.

Typical actions per slot:

| Slot | Position | Common actions |
|---|---|---|
| `iconTrailing1` | Right | `close` (dismiss flow), `notifications`, `filter` |
| `iconTrailing2` | Left | `rewards`, `favorites` (`fav`), complementary screen action |

**global variant specifically:** `iconTrailing2` = rewards, `iconTrailing1` = notifications.

**Rules:**
- Never show `hasIconTrailing2` without `hasIconTrailing1`.
- The `progressBar` variant supports only one trailing icon (`close`). Do not enable `hasIconTrailing2` on it.
- Both slots are for secondary actions only — never place a primary CTA in the trailing area.

---

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
