# MDS Design Tokens Index

**Library:** MDS Design Tokens
**File key:** `W04HDig9ekFYng2jvkWhv2`
**Figma:** https://www.figma.com/design/W04HDig9ekFYng2jvkWhv2/-New-DS--Design-Tokens


## Token Hierarchy

Always use the lowest tier that applies:

1. **Component** — use first; supports Light/Dark Bitso modes
2. **Semantic** — use when no component token exists
3. **Base** — never use directly in components; primitives only

To get live resolved values, use Figma plugin discovery calls:
`figma.getLocalPaintStylesAsync()`, `figma.getLocalTextStylesAsync()`,
`figma.variables.getLocalVariablesAsync()`, and `figma.variables.getLocalCollectionsAsync()`.

---

## Collection: Base
**pageId:** `0:1` | **Modes:** Bitso
**Description:** Primitive tokens. Do not use directly in components.

### color/gray

| Token | Value |
|-------|-------|
| `color/gray/0` | `#ffffff` |
| `color/gray/50` | `#f7f8fb` |
| `color/gray/100` | `#eef1f6` |
| `color/gray/200` | `#e4e9f1` |
| `color/gray/300` | `#c6cfdc` |
| `color/gray/400` | `#90a3bb` |
| `color/gray/500` | `#627893` |
| `color/gray/600` | `#506077` |
| `color/gray/700` | `#404e63` |
| `color/gray/800` | `#2a3546` |
| `color/gray/900` | `#151c28` |
| `color/gray/950` | `#090c11` |

### color/yellow

| Token | Value |
|-------|-------|
| `color/yellow/50` | `#fff9da` |
| `color/yellow/100` | `#ffefa5` |
| `color/yellow/200` | `#ffe250` |
| `color/yellow/300` | `#8a6e00` |
| `color/yellow/400` | `#543c00` |

### color/green

| Token | Value |
|-------|-------|
| `color/green/50` | `#bafddc` |
| `color/green/100` | `#00e5a0` |
| `color/green/200` | `#03bd7f` |
| `color/green/300` | `#07875c` |
| `color/green/400` | `#023c1f` |

### color/blue

| Token | Value |
|-------|-------|
| `color/blue/50` | `#dfe6ff` |
| `color/blue/100` | `#899cff` |
| `color/blue/200` | `#5463ff` |
| `color/blue/300` | `#4c59e9` |
| `color/blue/400` | `#192067` |

### color/red

| Token | Value |
|-------|-------|
| `color/red/50` | `#ffe6e6` |
| `color/red/100` | `#ff6d98` |
| `color/red/200` | `#ff3d74` |
| `color/red/300` | `#bd003c` |
| `color/red/400` | `#5d0017` |

### color/neon

| Token | Value |
|-------|-------|
| `color/neon/50` | `#f9ffdc` |
| `color/neon/100` | `#f2ffb9` |
| `color/neon/200` | `#dfff50` |
| `color/neon/300` | `#cff330` |
| `color/neon/400` | `#b2ce36` |

### spacing

| Token | Value |
|-------|-------|
| `spacing/025` | 2px |
| `spacing/050` | 4px |
| `spacing/100` | 8px |
| `spacing/150` | 12px |
| `spacing/200` | 16px |
| `spacing/300` | 24px |
| `spacing/400` | 32px |
| `spacing/500` | 40px |
| `spacing/600` | 48px |
| `spacing/700` | 56px |
| `spacing/800` | 64px |
| `spacing/1000` | 80px |
| `spacing/1200` | 96px |
| `spacing/1400` | 112px |

### border/width

| Token | Value |
|-------|-------|
| `border/width/100` | 1px |
| `border/width/200` | 2px |

### border/radius

| Token | Value |
|-------|-------|
| `border/radius/0` | 0px |
| `border/radius/100` | 2px |
| `border/radius/200` | 4px |
| `border/radius/300` | 6px |
| `border/radius/400` | 8px |
| `border/radius/500` | 12px |
| `border/radius/600` | 16px |
| `border/radius/700` | 24px |
| `border/radius/800` | 1000px (full) |

### opacity

| Token | Value |
|-------|-------|
| `opacity/0` | 0% |
| `opacity/100` | 20% |
| `opacity/200` | 50% |
| `opacity/300` | 80% |

### Other base tokens

| Group | Tokens |
|-------|--------|
| typography/size | `100` `200` `300` `400` `500` `600` `700` `800` `900` `1000` `1100` `1200` `1300` `1400` |
| typography/weight | `regular` `medium` `bold` |
| typography/lineHeight | `100` `150` `200` `300` `400` `500` `600` `700` `800` `900` `1000` `1100` `1200` `1300` |
| typography/letterSpacing | `0` `100` `200` `300` `400` |
| typography/paragraphSpacing | `0` `100` `200` `300` `400` |
| typography/font-family | `primary` → **PP Bitso Sans** · `secondary` → **Geist** |
| size | `100` `200` `300` `400` `500` `600` `700` `800` `900` `1200` `2100` `2800` `3500` |

---

## Collection: Semantic
**pageId:** `1:2` | **Modes:** Bitso
**Description:** Alias tokens with semantic meaning. Use in component design and code when no Component token exists.

### color/brand → blue

| Token | Alias | Value |
|-------|-------|-------|
| `color/brand/softer` | `color/blue/50` | `#dfe6ff` |
| `color/brand/soft` | `color/blue/100` | `#899cff` |
| `color/brand/base` | `color/blue/200` | `#5463ff` |
| `color/brand/strong` | `color/blue/300` | `#4c59e9` |
| `color/brand/stronger` | `color/blue/400` | `#192067` |

### color/accent → neon

| Token | Alias | Value |
|-------|-------|-------|
| `color/accent/softer` | `color/neon/50` | `#f9ffdc` |
| `color/accent/soft` | `color/neon/100` | `#f2ffb9` |
| `color/accent/base` | `color/neon/200` | `#dfff50` |
| `color/accent/strong` | `color/neon/300` | `#cff330` |
| `color/accent/stronger` | `color/neon/400` | `#b2ce36` |

### color/error → red

| Token | Alias | Value |
|-------|-------|-------|
| `color/error/softer` | `color/red/50` | `#ffe6e6` |
| `color/error/soft` | `color/red/100` | `#ff6d98` |
| `color/error/base` | `color/red/200` | `#ff3d74` |
| `color/error/strong` | `color/red/300` | `#bd003c` |
| `color/error/stronger` | `color/red/400` | `#5d0017` |

### color/warning → yellow

| Token | Alias | Value |
|-------|-------|-------|
| `color/warning/softer` | `color/yellow/50` | `#fff9da` |
| `color/warning/soft` | `color/yellow/100` | `#ffefa5` |
| `color/warning/base` | `color/yellow/200` | `#ffe250` |
| `color/warning/strong` | `color/yellow/300` | `#8a6e00` |
| `color/warning/stronger` | `color/yellow/400` | `#543c00` |

### color/success → green

| Token | Alias | Value |
|-------|-------|-------|
| `color/success/softer` | `color/green/50` | `#bafddc` |
| `color/success/soft` | `color/green/100` | `#00e5a0` |
| `color/success/base` | `color/green/200` | `#03bd7f` |
| `color/success/strong` | `color/green/300` | `#07875c` |
| `color/success/stronger` | `color/green/400` | `#023c1f` |

### color/info → blue

| Token | Alias | Value |
|-------|-------|-------|
| `color/info/softer` | `color/blue/50` | `#dfe6ff` |
| `color/info/soft` | `color/blue/100` | `#899cff` |
| `color/info/base` | `color/blue/200` | `#5463ff` |
| `color/info/strong` | `color/blue/300` | `#4c59e9` |
| `color/info/stronger` | `color/blue/400` | `#192067` |

### color/interactive → gray

| Token | Alias | Value |
|-------|-------|-------|
| `color/interactive/softest` | `color/gray/50` | `#f7f8fb` |
| `color/interactive/softer` | `color/gray/100` | `#eef1f6` |
| `color/interactive/soft` | `color/gray/200` | `#e4e9f1` |
| `color/interactive/base` | `color/gray/300` | `#c6cfdc` |
| `color/interactive/strong` | `color/gray/600` | `#506077` |
| `color/interactive/stronger` | `color/gray/700` | `#404e63` |
| `color/interactive/strongest` | `color/gray/900` | `#151c28` |

### color/non-interactive → gray

| Token | Alias | Value |
|-------|-------|-------|
| `color/non-interactive/softest` | `color/gray/0` | `#ffffff` |
| `color/non-interactive/softer` | `color/gray/100` | `#eef1f6` |
| `color/non-interactive/soft` | `color/gray/300` | `#c6cfdc` |
| `color/non-interactive/base` | `color/gray/500` | `#627893` |
| `color/non-interactive/strong` | `color/gray/600` | `#506077` |
| `color/non-interactive/stronger` | `color/gray/800` | `#2a3546` |
| `color/non-interactive/strongest` | `color/gray/950` | `#090c11` |

### spacing/stack

| Token | Alias | Value |
|-------|-------|-------|
| `spacing/stack/2xs` | `spacing/025` | 2px |
| `spacing/stack/xs` | `spacing/050` | 4px |
| `spacing/stack/sm` | `spacing/100` | 8px |
| `spacing/stack/base` | `spacing/200` | 16px |
| `spacing/stack/lg` | `spacing/300` | 24px |
| `spacing/stack/xl` | `spacing/400` | 32px |
| `spacing/stack/2xl` | `spacing/500` | 40px |
| `spacing/stack/3xl` | `spacing/600` | 48px |
| `spacing/stack/4xl` | `spacing/1000` | 80px |

### spacing/padding

| Token | Alias | Value |
|-------|-------|-------|
| `spacing/padding/3xs` | `spacing/025` | 2px |
| `spacing/padding/2xs` | `spacing/050` | 4px |
| `spacing/padding/xs` | `spacing/100` | 8px |
| `spacing/padding/sm` | `spacing/150` | 12px |
| `spacing/padding/base` | `spacing/200` | 16px |
| `spacing/padding/lg` | `spacing/300` | 24px |
| `spacing/padding/xl` | `spacing/400` | 32px |
| `spacing/padding/2xl` | `spacing/500` | 40px |

### spacing/inline

| Token | Alias | Value |
|-------|-------|-------|
| `spacing/inline/2xs` | `spacing/050` | 4px |
| `spacing/inline/xs` | `spacing/100` | 8px |
| `spacing/inline/sm` | `spacing/150` | 12px |
| `spacing/inline/base` | `spacing/200` | 16px |
| `spacing/inline/lg` | `spacing/300` | 24px |
| `spacing/inline/xl` | `spacing/400` | 32px |
| `spacing/inline/2xl` | `spacing/500` | 40px |
| `spacing/inline/3xl` | `spacing/600` | 48px |

### spacing/margin

| Token | Alias | Value |
|-------|-------|-------|
| `spacing/margin/base` | `spacing/200` | 16px |

### opacity

| Token | Alias | Value |
|-------|-------|-------|
| `opacity/none` | `opacity/0` | 0% |
| `opacity/low` | `opacity/100` | 20% |
| `opacity/medium` | `opacity/200` | 50% |
| `opacity/high` | `opacity/300` | 80% |

### border/radius

| Token | Alias | Value |
|-------|-------|-------|
| `border/radius/none` | `border/radius/0` | 0px |
| `border/radius/2xs` | `border/radius/100` | 2px |
| `border/radius/xs` | `border/radius/200` | 4px |
| `border/radius/sm` | `border/radius/300` | 6px |
| `border/radius/base` | `border/radius/400` | 8px |
| `border/radius/lg` | `border/radius/500` | 12px |
| `border/radius/xl` | `border/radius/600` | 16px |
| `border/radius/2xl` | `border/radius/700` | 24px |
| `border/radius/full` | `border/radius/800` | 1000px |

---

## Collection: Component
**pageId:** `1:3` | **Modes:** Light Bitso / Dark Bitso
**Description:** Component-level tokens. Always prefer these for implementation. Light/dark mode is handled automatically.

### color/primary

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `color/primary/default` | `#5463ff` | `#899cff` |
| `color/primary/selected` | `#5463ff` | `#5463ff` |
| `color/primary/disabled` | `#eef1f6` | `#2a3546 / 50%` |

### color/onPrimary

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `color/onPrimary/default` | `#ffffff` | `#090c11` |
| `color/onPrimary/disabled` | `#c6cfdc` | `#c6cfdc / 20%` |

### color/secondary

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `color/secondary/default` | `#dfe6ff` | `#192067` |
| `color/secondary/disabled` | `#eef1f6` | `#2a3546 / 50%` |

### color/onSecondary

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `color/onSecondary/default` | `#192067` | `#dfe6ff` |
| `color/onSecondary/disabled` | `#c6cfdc` | `#c6cfdc / 20%` |

### color/tertiary

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `color/tertiary/default` | `#5463ff` | `#899cff` |
| `color/tertiary/disabled` | `#c6cfdc` | `#2a3546` |

### color/background

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `color/background/default` | `#ffffff` | `#090c11` |
| `color/background/blurred` | `#ffffff / 50%` | `#2a3546 / 50%` |

### color/onBackground

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `color/onBackground/highEmphasis` | `#090c11` | `#ffffff` |
| `color/onBackground/mediumEmphasis` | `#2a3546` | `#eef1f6` |
| `color/onBackground/lowEmphasis` | `#506077` | `#c6cfdc` |
| `color/onBackground/disabled` | `#c6cfdc` | `#506077` |
| `color/onBackground/error` | `#bd003c` | `#ff6d98` |
| `color/onBackground/accent` | `#ffffff` | `#ffffff` |

### color/surface

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `color/surface/default` | `#f7f8fb` | `#151c28` |
| `color/surface/selected` | `#eef1f6` | `#404e63` |
| `color/surface/disabled` | `#eef1f6` | `#2a3546` |

### color/onSurface

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `color/onSurface/highEmphasis` | `#090c11` | `#ffffff` |
| `color/onSurface/mediumEmphasis` | `#2a3546` | `#eef1f6` |
| `color/onSurface/lowEmphasis` | `#506077` | `#c6cfdc` |
| `color/onSurface/disabled` | `#627893 / 20%` | `#627893 / 20%` |

### color/status

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `color/status/info` | `#dfe6ff` | `#192067` |
| `color/status/success` | `#bafddc` | `#023c1f` |
| `color/status/error` | `#ffe6e6` | `#5d0017` |
| `color/status/warning` | `#ffefa5` | `#543c00` |
| `color/status/neutral` | `#c6cfdc` | `#404e63` |
| `color/status/accent` | `#dfff50` | `#cff330` |
| `color/status/disabled` | `#eef1f6` | `#2a3546 / 50%` |
| `color/status/neutral-light` | `#e4e9f1` | `#2a3546` |

### color/onStatus

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `color/onStatus/default` | `#090c11` | `#ffffff` |
| `color/onStatus/accent` | `#090c11` | `#090c11` |
| `color/onStatus/disabled` | `#627893 / 50%` | `#506077 / 50%` |

### color/border

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `color/border/default` | `#151c28` | `#c6cfdc` |
| `color/border/light` | `#eef1f6` | `#151c28` |
| `color/border/focus` | `#5463ff` | `#899cff` |
| `color/border/disabled` | `#eef1f6` | `#2a3546` |
| `color/border/error` | `#bd003c` | `#ff6d98` |
| `color/border/warning` | `#8a6e00` | `#ffefa5` |
| `color/border/success` | `#07875c` | `#00e5a0` |

### color/buy & color/sell

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `color/buy/default` | `#07875c` | `#00e5a0` |
| `color/buy/alternative` | `#07875c / 20%` | `#00e5a0 / 20%` |
| `color/sell/default` | `#bd003c` | `#ff3d74` |
| `color/sell/alternative` | `#bd003c / 20%` | `#ff3d74 / 20%` |

### color/highContrast & color/onHighContrast

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `color/highContrast/default` | `#151c28` | `#f7f8fb` |
| `color/highContrast/selected` | `#151c28` | `#f7f8fb` |
| `color/highContrast/disabled` | `#eef1f6` | `#2a3546` |
| `color/onHighContrast/default` | `#ffffff` | `#090c11` |
| `color/onHighContrast/disabled` | `#627893 / 50%` | `#c6cfdc` |
| `color/onHighContrast/action` | `#899cff` | `#5463ff` |

### color/overlay

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `color/overlay/scrim` | `#090c11 / 80%` | `#2a3546 / 80%` |
| `color/overlay/pressedState` | `#506077 / 50%` | `#506077 / 50%` |
| `color/overlay/hoverState` | `#c6cfdc / 50%` | `#627893 / 20%` |

### color/skeleton & color/link

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `color/skeleton/default` | `#f7f8fb` | `#151c28` |
| `color/skeleton/active` | `#c6cfdc` | `#404e63` |
| `color/link/default` | `#5463ff` | `#899cff` |
| `color/link/visited` | `#192067` | `#dfe6ff` |

### input

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `input/border/radius` | 12px | 12px |
| `input/border/radius-round` | 1000px | 1000px |
| `input/border/width-default` | 1px | 1px |
| `input/border/width-focus` | 2px | 4px |
| `input/spacing/between-stack` | 24px | 24px |
| `input/spacing/between-inline` | 8px | 8px |
| `input/color/background/default` | `#ffffff` | `#090c11` |
| `input/color/background/disabled` | `#f7f8fb` | `#151c28` |
| `input/color/text/default` | `#090c11` | `#ffffff` |
| `input/color/text/placeholder` | `#506077` | `#c6cfdc` |
| `input/color/text/disabled` | `#627893 / 50%` | `#2a3546` |

### inline-notification/color

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `inline-notification/color/success` | `#07875c` | `#00e5a0` |
| `inline-notification/color/warning` | `#8a6e00` | `#ffefa5` |
| `inline-notification/color/error` | `#bd003c` | `#ff6d98` |

### list-item

| Token | Light Bitso | Dark Bitso |
|-------|-------------|------------|
| `list-item/background-color/default` | `#ffffff` | `#090c11` |
| `list-item/background-color/disabled` | `#ffffff` | `#090c11` |

---

## Text Styles

**Source:** `figma.getLocalTextStylesAsync()` on file `W04HDig9ekFYng2jvkWhv2`


All sizes in px. `letterSpacing: 0` and `textCase: ORIGINAL` unless noted.

### Display — PP Bitso Sans / Medium

| Style | Size | Line Height |
|-------|------|-------------|
| `display/extraLarge` | 96 | 96 |
| `display/large` | 64 | 68 |
| `display/base` | 56 | 56 |
| `display/small` | 48 | 52 |

### Title — PP Bitso Sans / Medium

| Style | Size | Line Height |
|-------|------|-------------|
| `title/large` | 40 | 44 |
| `title/medium` | 32 | 40 |
| `title/base` | 28 | 32 |

### Heading — PP Bitso Sans / Medium

| Style | Size | Line Height |
|-------|------|-------------|
| `heading/base` | 24 | 28 |

### Subheading — PP Bitso Sans / Medium

| Style | Size | Line Height |
|-------|------|-------------|
| `subheading/base` | 20 | 24 |
| `subheading/small` | 16 | 20 |
| `subheading/extra-small` | 14 | 18 |

### Body — Geist

| Style | Weight | Size | Line Height | Paragraph Spacing |
|-------|--------|------|-------------|-------------------|
| `body/large` | Regular | 18 | 24 | 28 |
| `body/large-medium` | Medium | 18 | 24 | 28 |
| `body/large-bold` | Bold | 18 | 24 | 28 |
| `body/base` | Regular | 16 | 20 | 16 |
| `body/base-medium` | Medium | 16 | 20 | 16 |
| `body/base-bold` | Bold | 16 | 20 | 16 |
| `body/small` | Regular | 14 | 20 | 14 |
| `body/small-medium` | Medium | 14 | 20 | 14 |
| `body/small-bold` | Bold | 14 | 20 | 14 |

### Tiny — Geist

| Style | Weight | Size | Line Height | Paragraph Spacing |
|-------|--------|------|-------------|-------------------|
| `tiny/base` | Regular | 12 | 16 | 14 |
| `tiny/base-medium` | Medium | 12 | 16 | 14 |
| `tiny/base-bold` | Bold | 12 | 16 | 14 |

### Action — PP Bitso Sans / Bold

| Style | Size | Line Height |
|-------|------|-------------|
| `action/base` | 16 | 24 |
| `action/small` | 14 | 18 |

### Eyebrow — Geist / Bold / UPPERCASE

| Style | Size | Line Height | Letter Spacing |
|-------|------|-------------|----------------|
| `eyebrow/base` | 14 | 20 | 1.5px |
| `eyebrow/small` | 12 | 14 | 0.7px |
