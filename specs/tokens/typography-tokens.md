---
id: typography-tokens
name: Typography Tokens & Text Styles
category: token
platform: mobile
tags: [typography, text-style, font, size, line-height, tokens]
status: ready
---

**Figma file key:** `W04HDig9ekFYng2jvkWhv2`
**Source:** `figma.getLocalTextStylesAsync()` on file `W04HDig9ekFYng2jvkWhv2`

All text layers must use a named text style from this file. Do not hardcode `fontSize`, `fontWeight`, or `lineHeight`.

---

## Collection: Base — typography primitives

| Group | Tokens |
|-------|--------|
| `typography/size` | `100` `200` `300` `400` `500` `600` `700` `800` `900` `1000` `1100` `1200` `1300` `1400` |
| `typography/weight` | `regular` `medium` `bold` |
| `typography/lineHeight` | `100` `150` `200` `300` `400` `500` `600` `700` `800` `900` `1000` `1100` `1200` `1300` |
| `typography/letterSpacing` | `0` `100` `200` `300` `400` |
| `typography/paragraphSpacing` | `0` `100` `200` `300` `400` |
| `typography/font-family` | `primary` → **PP Bitso Sans** · `secondary` → **Geist** |

---

## Text Styles

All sizes in pt (points). `letterSpacing: 0` and `textTransform: none` unless noted.

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

---

## Related specs

- [`token-reference.md`](token-reference.md)
