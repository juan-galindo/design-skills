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

- **OS-native** component — time on leading edge, status icons (signal, wifi, battery) on trailing.
- **Height:** 48px (includes safe area); **no padding override** — uses system defaults per platform.
- **Background:** Transparent (system-controlled); blurred in dark UI contexts on iOS.
- **Spacing:** Blank space center is intentional — no content placed there.

## Overview

System-level status bar displayed at the top of every mobile screen. Driven entirely by the OS — time, signal strength, wifi, battery, and location indicators are automatically managed by iOS and Android. This component is a **native reference** for understanding the screen's reserved top space; it is not typically part of design system components but appears in every screen mock.

## Structure

| Part / slot | Required | Notes |
|---|---|---|
| Leading area | Yes | Device time (HH:MM format) |
| Center area | No | Blank space — intentionally not used |
| Trailing area | Yes | Status icons: signal strength · wifi · battery · location (conditional) |

**Height:** 48px total (iOS 44pt + safe area; Android 24dp + system inset).

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

| Role | Token path | Notes |
|---|---|---|
| Background | OS transparent | System-controlled; not bound to design tokens |
| Text color | OS system gray · OS system white | Platform-specific; depends on light/dark mode |
| Blur effect (iOS) | `blur/system-bars` (optional) | Applied in dark contexts; system-managed |

## Text slot rules

| Slot | Max | Rules |
|---|---|---|
| Time | HH:MM | Displayed in device's time format (12h / 24h per locale settings) |

## Examples

| Scenario | Reference |
|---|---|
| Light background | Time + icons in dark gray; clear visibility |
| Dark background | Time + icons in white; optional blur backdrop |
| Landscape mode | Status bar height constant; safe area respects device notch |

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
