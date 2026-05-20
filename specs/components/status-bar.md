---
id: status-bar
name: Status Bar
category: component
platform: mobile
tier: atom
tags: [os-native, ios, android]
aliases: [MDSStatusBar]
status: ready
figma node: "1668:901"
relationships:
  composes_with: []
  conflicts_with: []
  substitutes: []
  requires: []
---

## Agent summary

- **OS-native** reference component — system-rendered on all screens. 48px height includes safe area.
- **Do NOT customize:** System controls all colors, text (time), icons, and styling.
- **Content below:** Respects safe area inset; [App Bar](./app-bar.md) sits directly below with no gap.
- **Blank center space:** Intentional; do not place content there.

## Overview

System-level status bar displayed at the top of every mobile screen. Driven entirely by the OS — time, signal strength, wifi, battery, and location indicators are automatically managed by iOS and Android. This component is a **native reference** for understanding the screen's reserved top space; it is not typically part of design system components but appears in every screen mock.

## Structure

N/A — OS-native component. System renders all elements (time, signal, wifi, battery). No custom anatomy or layout.

## Usage & behavior

### When to use

- Every mobile screen — automatically rendered by the OS.

### When NOT to use

- MUST NOT hide or suppress the status bar (except full-screen immersive experiences like camera or video).

### Edge cases

- **Notch / Dynamic Island (iOS):** Status bar resizes; keep content below the safe area.
- **Android pill notch:** Status bar height remains constant; content below respects system inset.
- **Landscape orientation:** Status bar may compress on tablets; assume portrait layouts in mobile design.

### Composition

Status bar sits **above** [App Bar](./app-bar.md). No gap between them.

```
[Status Bar] ← system-rendered
[App Bar]    ← MDSAppBar
[Content]
```

## Interactions

N/A — OS-native element. User cannot interact with individual icons; tapping status area opens device control panel (iOS Control Center, Android Quick Settings) depending on the OS implementation.

## Accessibility

N/A — system responsibility. OS provides native accessibility labels for signal, wifi, battery, and time.

## Design intent

Reserve top safe area for system chrome (time, indicators). Status bar appears on all screens unless explicitly hidden for immersive full-screen experiences (camera, video, games).

## Token bindings

N/A — OS-native styling. Status bar colors, typography, and layout are system-managed (not customizable in app design).

## Text slot rules

N/A — time and all text are system-rendered. No customizable text slots.

## Examples

N/A — system-rendered. No design customization or variants.

## Verification

- [ ] Status bar appears above [App Bar](./app-bar.md) — no gap.
- [ ] Content respects top safe area inset (status bar height).
- [ ] Not hidden unless full-screen immersive experience.
- [ ] iOS notch / Dynamic Island safe area respected in mockups.
- [ ] Android system inset respected.

## Related specs

- [`app-bar.md`](./app-bar.md) — sits directly below status bar; composition rules.
- [`../figma-catalog/mobile-components.md`](../figma-catalog/mobile-components.md) — OS component reference.

---
