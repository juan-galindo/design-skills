---
id: bottom-ctas
name: Bottom CTAs
category: component
platform: mobile
tags: [action, button, fixed]
status: ready
figma node: "15709:78021"
---

## What it is

BottomCTAs is a fixed action area anchored at the bottom of a screen. It ensures the primary call to action is always reachable without scrolling, and communicates loading state during async operations.

## When to use

- There is one clear primary action for the screen (confirm, submit, continue).
- A secondary escape or alternative action is needed alongside it.
- The action must always be visible regardless of scroll position.

## When NOT to use

- Actions are contextual to specific list items or cards — place buttons inside those sections instead.
- There are more than two actions — consider a bottom sheet or a different layout.
- In the middle of a screen — this component is always anchored to the bottom.


### AltContent (optional)

A single line of supporting text shown above the buttons. Accepts HTML or attributed text, so it can include inline links.

**Use it for:**
- Short disclaimers, fee notices, or totals (e.g. "No fees applied", "Total: $12.50").
- Inline links to terms, policies, or contextual detail (e.g. "By continuing you agree to our Terms of Service").

**Guidelines:**
- Keep it to one line.
- Only include content that directly reduces hesitation before the action — not general screen description.
- Only add a link when the destination is genuinely useful at that moment in the flow.


## Related specs

- [`bottom-sheet.md`](./bottom-sheet.md)
