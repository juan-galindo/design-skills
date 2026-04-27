---
id: spacing-tokens
name: Spacing & Shape Tokens
category: token
platform: mobile
tags: [spacing, padding, margin, stack, border-radius, tokens]
status: ready
---

**Figma file key:** `W04HDig9ekFYng2jvkWhv2`

Use the lowest tier that applies: **Component → Semantic → Base**

---

## Collection: Base — spacing primitives

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

### border/width (base)

| Token | Value |
|-------|-------|
| `border/width/100` | 1px |
| `border/width/200` | 2px |

### border/radius (base)

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

### size (base)

| Group | Tokens |
|-------|--------|
| `size` | `100` `200` `300` `400` `500` `600` `700` `800` `900` `1200` `2100` `2800` `3500` |

---

## Collection: Semantic — aliased spacing

### spacing/stack — vertical rhythm between stacked elements

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

### spacing/padding — internal component padding

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

### spacing/inline — horizontal gap between inline elements

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

### border/radius (semantic)

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

## Collection: Component — input shape & spacing

| Token | Value |
|-------|-------|
| `input/border/radius` | 12px |
| `input/border/radius-round` | 1000px |
| `input/border/width-default` | 1px |
| `input/border/width-focus` | 2px (light) / 4px (dark) |
| `input/spacing/between-stack` | 24px |
| `input/spacing/between-inline` | 8px |

## Related specs

- [`token-reference.md`](token-reference.md)
- [`spacing.md`](../foundations/spacing.md)
- [`radius.md`](../foundations/radius.md)
