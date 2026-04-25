# MDS Design Tokens — Index

**Library:** MDS Design Tokens
**File key:** `W04HDig9ekFYng2jvkWhv2`
**Figma:** https://www.figma.com/design/W04HDig9ekFYng2jvkWhv2/-New-DS--Design-Tokens

---

## Token hierarchy

Always use the lowest tier that applies:

1. **Component** — use first; supports Light/Dark Bitso modes automatically
2. **Semantic** — use when no component token exists
3. **Base** — never use directly in components; raw primitives only

To get live resolved values from Figma:
`figma.getLocalPaintStylesAsync()`, `figma.getLocalTextStylesAsync()`,
`figma.variables.getLocalVariablesAsync()`, `figma.variables.getLocalCollectionsAsync()`

---

## Token files — load only what you need

| File | What's inside |
|------|---------------|
| [`color-tokens.md`](color-tokens.md) | All color scales (Base → Semantic → Component), opacity, buy/sell, list-item, input/color |
| [`spacing-tokens.md`](spacing-tokens.md) | Spacing scale, stack/padding/inline aliases, border/radius, border/width, input shape/spacing |
| [`typography-tokens.md`](typography-tokens.md) | Base typography primitives + all named text styles (Display → Eyebrow) |
| [`elevation-tokens.md`](elevation-tokens.md) | Shadow / elevation (stub — not yet defined in MDS) |
| [`motion-tokens.md`](motion-tokens.md) | Easing, duration (stub — not yet defined in MDS) |

---

## Quick-pick guide

| Task | Load |
|------|------|
| Writing or checking component colors | `color-tokens.md` |
| Layout, padding, gap, border-radius | `spacing-tokens.md` |
| Font size, weight, line-height, text style names | `typography-tokens.md` |
| Validating a full component spec | all three above |
