---
id: avatar
name: Avatar
category: component
platform: mobile
tags: [identity, profile, user, account]
status: ready
figma node: "35288:4568"
---

## What it is

Avatars represent a person, account, or entity in a compact visual way. They help users quickly recognize who or what they're interacting with.

## When to use

- You need a visual handle for a user or account.
- You want to make lists or feeds more scannable.
- You're showing ownership, authorship, or responsibility.
- You're helping users recognize themselves (e.g. profile, account switcher).

## When NOT to use

- Identity isn't important to the task.
- There's no meaningful data to represent (e.g. random system items).
- Space is extremely limited and an initial or icon wouldn't add clarity.

## Variants

### Image avatar

Displays a user or entity image. Cropped to fit the container (cover, centered). Supports transparent images.

**Use for:** personal profiles, known accounts with a stable image, brand or organization logos.

### Initials avatar

Displays one or two characters generated from the name string (e.g. "Alex Doe" → "AD"). Single letter for single-word names. Background color must be consistent and accessible.

**Use when:** no image is provided, image fails to load, or the user prefers not to upload a picture.

## States and behavior

### Loading

- Show a neutral skeleton placeholder that reserves the final avatar size.
- Don't show initials or fallback content until enough data is available.

### Error (image failed to load)

Fall back in this order: **Image → Initials → Fallback avatar**. Never show a broken image icon. Keep the transition subtle.

### Interactive vs. static

| Mode | Behavior |
|------|----------|
| Static | Purely decorative identity reference. |
| Interactive | Opens profile, menu, or detail view. Requires a focus ring for keyboard users and a minimum 44×44 px tap area. |

## Usage guidelines

**Do:**
- Use avatars consistently across the product.
- Keep sizing aligned with surrounding components (lists, menus, navbars).
- Prefer initials or fallback over leaving the space empty.
- Use badges only when they convey important, actionable information.

**Don't:**
- Overload avatars with text or multiple icons.
- Use an avatar as the only indicator of critical status — always pair with text or another icon.
- Animate avatars excessively — subtle, purposeful motion only.
- Reuse the same image for multiple different accounts.

## Related specs

- [`header.md`](./header.md)
