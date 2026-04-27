---
name: design-create-component
author: juan.galindo@bitso.com
compatibility: Designed for Claude Code
metadata:
  category: design-system
  tags:
    - components
    - figma
    - design-system
description: >
  Creates new MDS Mobile components directly in a Figma file using the Plugin API (use_figma).
  Use this skill whenever the user wants to create, build, or design a new component for the Bitso
  design system — even if they just say "create a component", "add a new component to Figma",
  "design this for mobile", or share a screenshot and ask to turn it into a Figma component.
  Handles both draft Figma files (no library links) and library-linked files that have embedded
  tokens and text styles. Always enforces MDS token usage and naming conventions.
---

# ds-create-component

Creates a new MDS Mobile component in a target Figma file, from a text description or a screenshot reference.

---

## Step 1 — Gather inputs

Ask the user for the following (can be collected in one message if not already provided):

1. **Component name** — e.g., "Transaction Row", "Balance Card"
2. **Category** — choose from Android component categories:
   - Navigation (Top App Bar, Bottom Nav, Navigation Drawer, Tab Bar)
   - Layout (Card, List Item, Divider, Grid Cell)
   - Input (Button, Text Field, Chip, Switch, Checkbox, Radio, Slider, FAB, Segmented Button)
   - Selection (Menu, Dialog, Bottom Sheet, Date Picker)
   - Display (Badge, Progress, Snackbar/Toast, Tooltip, Banner, Carousel, Avatar)
   - Data (Table Row, Stat Block, Price Display)
3. **Description or screenshot** — describe the component visually, or paste/upload a screenshot reference
4. **Target Figma URL** — the file where the component should be created

---

## Step 2 — Plan the component structure

Use the token quick-reference at the bottom of this skill for spacing, radius, and color values. Plan the layer structure before writing any code:

- Break the component into a hierarchy: frame → rows/columns → text + icon + image layers
- Use Auto Layout on all frames — never absolute positioning
- Padding and gap: use `spacing/padding/*` for inner padding, `spacing/stack/*` for vertical gaps, `spacing/inline/*` for horizontal gaps
- Corner radius: use `border/radius/*` semantic tokens (values in quick-reference)
- Text layers: always assign a text style from the MDS text style list below
- Colors: always bind a color variable — never use raw hex

### MDS Text Styles (from `specs/tokens/token-reference.md`)

All sizes in px. `letterSpacing: 0` and `textCase: ORIGINAL` unless noted.

| Style | Font | Weight | Size | Line Height | Use for |
|-------|------|--------|------|-------------|---------|
| `display/extraLarge` | PP Bitso Sans | Medium | 96 | 96 | Hero, splash |
| `display/large` | PP Bitso Sans | Medium | 64 | 68 | Large display |
| `display/base` | PP Bitso Sans | Medium | 56 | 56 | Display numbers |
| `display/small` | PP Bitso Sans | Medium | 48 | 52 | Large numerics |
| `title/large` | PP Bitso Sans | Medium | 40 | 44 | Page title |
| `title/medium` | PP Bitso Sans | Medium | 32 | 40 | Section title |
| `title/base` | PP Bitso Sans | Medium | 28 | 32 | Card title |
| `heading/base` | PP Bitso Sans | Medium | 24 | 28 | Section heading |
| `subheading/base` | PP Bitso Sans | Medium | 20 | 24 | Subheading |
| `subheading/small` | PP Bitso Sans | Medium | 16 | 20 | Label, nav item |
| `subheading/extra-small` | PP Bitso Sans | Medium | 14 | 18 | Small label |
| `action/base` | PP Bitso Sans | Bold | 16 | 24 | Button text |
| `action/small` | PP Bitso Sans | Bold | 14 | 18 | Small button |
| `body/large` | Geist | Regular | 18 | 24 | Primary body |
| `body/large-medium` | Geist | Medium | 18 | 24 | Emphasized body |
| `body/large-bold` | Geist | Bold | 18 | 24 | Strong body |
| `body/base` | Geist | Regular | 16 | 20 | Standard body |
| `body/base-medium` | Geist | Medium | 16 | 20 | Inputs, forms |
| `body/base-bold` | Geist | Bold | 16 | 20 | Highlighted |
| `body/small` | Geist | Regular | 14 | 20 | Secondary text |
| `body/small-medium` | Geist | Medium | 14 | 20 | Secondary label |
| `body/small-bold` | Geist | Bold | 14 | 20 | Tag, badge |
| `tiny/base` | Geist | Regular | 12 | 16 | Hint, caption |
| `tiny/base-medium` | Geist | Medium | 12 | 16 | Small metadata |
| `tiny/base-bold` | Geist | Bold | 12 | 16 | Legal, footnote |
| `eyebrow/base` | Geist | Bold | 14 | 20 | Uppercase label (letterSpacing: 1.5px) |
| `eyebrow/small` | Geist | Bold | 12 | 14 | Uppercase small (letterSpacing: 0.7px) |

---

## Step 4 — Generate the component via use_figma

### How MDS tokens are accessed

**`getLocalPaintStylesAsync()` and `getLocalTextStylesAsync()` return 0 results in linked-library files.** Do not use them. Instead, import directly from the MDS tokens source file using keys:

- **Text styles** → `figma.importStyleByKeyAsync(key)` → `node.textStyleId = style.id`
- **Color variables** → `figma.variables.importVariableByKeyAsync(key)` → `setBoundVariableForPaint` → `node.fills = [paint]`
- **Spacing variables** (scope: `GAP`) → `figma.variables.importVariableByKeyAsync(key)` → `frame.setBoundVariable('paddingTop', var)` — works for all padding fields and `itemSpacing`

### Step 4a — Get keys from MDS tokens file

Run a `use_figma` call on **fileKey `W04HDig9ekFYng2jvkWhv2`** to get the keys you need:

```js
const vars = await figma.variables.getLocalVariablesAsync();
const styles = await figma.getLocalTextStylesAsync();
const neededVars = ['color/background/default', 'spacing/padding/base', /* etc. */];
const neededStyles = ['body/small', 'subheading/small', /* etc. */];
const varKeys = {}, styleKeys = {};
for (const v of vars) if (neededVars.includes(v.name)) varKeys[v.name] = v.key;
for (const s of styles) if (neededStyles.includes(s.name)) styleKeys[s.name] = s.key;
return { varKeys, styleKeys };
```

**Important:** always load all fonts before calling `textStyleId`. The style's actual font family may differ from the text style table — for example, `eyebrow/small` uses PP Bitso Sans Bold, not Geist Bold.

### Step 4b — Create the component

```js
// 1. Load all fonts upfront
await figma.loadFontAsync({ family: "PP Bitso Sans", style: "Medium" });
await figma.loadFontAsync({ family: "PP Bitso Sans", style: "Bold" });
await figma.loadFontAsync({ family: "Geist", style: "Regular" });
await figma.loadFontAsync({ family: "Geist", style: "Medium" });
await figma.loadFontAsync({ family: "Geist", style: "Bold" });

// 2. Import text styles (from tokens file keys)
const S = {};
for (const [name, key] of Object.entries(styleKeys)) {
  S[name] = await figma.importStyleByKeyAsync(key);
}

// 3. Import variables (color + spacing)
const V = {};
for (const [name, key] of Object.entries(varKeys)) {
  V[name] = await figma.variables.importVariableByKeyAsync(key);
}

// 4. Helpers
function cFill(variable) {
  return [figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: .5, g: .5, b: .5 } }, 'color', variable
  )];
}
function applyText(node, styleName, content, colorVar) {
  node.textStyleId = S[styleName].id;  // sets font, size, weight, line-height
  node.characters = content;
  node.fills = cFill(colorVar);
}

// 5. Component — set resize() BEFORE sizing modes
const comp = figma.createComponent();
comp.resize(335, 10);
comp.layoutMode = "VERTICAL";
comp.primaryAxisSizingMode = "AUTO";   // hug height
comp.counterAxisSizingMode = "FIXED";  // fixed width
// Bind padding to spacing variables
comp.paddingTop = 16; comp.paddingBottom = 16;
comp.paddingLeft = 16; comp.paddingRight = 16;
['paddingTop','paddingBottom','paddingLeft','paddingRight']
  .forEach(f => comp.setBoundVariable(f, V['spacing/padding/base']));
comp.itemSpacing = 12;
comp.setBoundVariable('itemSpacing', V['spacing/padding/sm']);
comp.cornerRadius = 12;  // border/radius/lg — 12px
comp.fills = cFill(V['color/background/default']);
comp.strokes = cFill(V['color/border/light']);
comp.strokeWeight = 1; comp.strokeAlign = "INSIDE";
comp.name = "[Local] MDS ComponentName";

// 6. Child frames — set layoutSizingHorizontal = "FILL" AFTER appendChild
const row = figma.createFrame();
row.resize(10, 10);
row.layoutMode = "HORIZONTAL";
row.primaryAxisSizingMode = "FIXED";
row.counterAxisSizingMode = "AUTO";
row.primaryAxisAlignItems = "SPACE_BETWEEN";
row.counterAxisAlignItems = "CENTER";
row.fills = [];
comp.appendChild(row);
row.layoutSizingHorizontal = "FILL";  // ← AFTER appendChild

// 7. Text nodes
const title = figma.createText();
title.name = "Title";
row.appendChild(title);
applyText(title, "subheading/small", "Component Title", V['color/onBackground/highEmphasis']);

// 8. Dividers — rectangle with FILL sizing
const divider = figma.createRectangle();
divider.resize(10, 1);
divider.fills = cFill(V['color/border/light']);
divider.name = "Divider";
comp.appendChild(divider);
divider.layoutSizingHorizontal = "FILL";

comp.x = 100; comp.y = 100;
return { createdNodeIds: [comp.id], name: comp.name, size: { width: comp.width, height: comp.height } };
```

**Critical rules:**
- `textStyleId = style.id` — never set `fontSize`, `fontName`, `lineHeight` individually after this
- `node.fills = cFill(variable)` — the only way to bind color variables; do NOT use `fillStyleId` for variables
- `setBoundVariable('paddingTop', var)` — spacing variables (scope `GAP`) bind to all padding fields and `itemSpacing`
- `layoutSizingHorizontal/Vertical = "FILL"` must be set **after** `parent.appendChild(child)`
- `primaryAxisSizingMode` / `counterAxisSizingMode` use `"AUTO"` (not `"HUG"`)

---

## Step 5 — Confirm and hand off

After creating the component:
- Report the component name, category, and which page it was placed on
- Note which tokens were applied (text styles, spacing, colors)
- If any styles were not found in the file, note which tokens fell back to hardcoded values

---

## Token quick-reference

For the full token list, always read `specs/tokens/token-reference.md` (single source of truth). The values below cover the handful of tokens used in nearly every component — kept here to avoid a file read for simple cases.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `color/background/default` | `#ffffff` | `#090c11` | Screen/page background |
| `color/surface/default` | `#f7f8fb` | `#151c28` | Card, sheet background |
| `color/onBackground/highEmphasis` | `#090c11` | `#ffffff` | Primary text |
| `color/onBackground/mediumEmphasis` | `#2a3546` | `#eef1f6` | Secondary text |
| `color/onBackground/lowEmphasis` | `#506077` | `#c6cfdc` | Placeholder, hint |
| `color/primary/default` | `#5463ff` | `#899cff` | Primary action / CTA |
| `color/onPrimary/default` | `#ffffff` | `#090c11` | Text on primary |
| `color/border/default` | `#151c28` | `#c6cfdc` | Divider, border |
| `color/border/light` | `#eef1f6` | `#151c28` | Subtle border |

| Token | Value | — |
|-------|-------|---|
| `spacing/padding/xs` | 8px | `spacing/padding/sm` → 12px |
| `spacing/padding/base` | 16px | `spacing/padding/lg` → 24px |
| `spacing/stack/xs` | 4px | `spacing/stack/sm` → 8px |
| `spacing/stack/base` | 16px | `spacing/inline/base` → 16px |
| `border/radius/base` | 8px | `border/radius/lg` → 12px · `border/radius/xl` → 16px · `border/radius/full` → 1000px |

For anything not in this table — status colors, buy/sell, input tokens, opacity, full spacing scale — read `specs/tokens/token-reference.md`.
