---
id: balance
name: Balance
category: component
platform: mobile
tags: [wallet, account]
status: ready
figma node: "16607:92112"
---

## What it is

The Balance component displays a user's account balance in a clear, secure way. It can represent the balance of the user's wallet or the balance of a particular currency.

## When to use

- To show the primary balance for an account, wallet, or asset.

## When NOT to use

- For secondary or supporting values — use standard text or value components instead.
- More than once per screen — only one Balance instance is allowed per screen.

## PnL

PnL should only be shown when the balance is not 0.

## Behavior

- **Single instance** — only one Balance component per screen. If multiple balances exist, show one as primary and list others using a different pattern.
- **Toggle persists** — remember the user's last show/hide preference per device or session.
- **No auto-reveal** — never automatically switch from hidden to shown without an explicit user action.

## Related specs

- [`bottom-ctas.md`](./bottom-ctas.md)
