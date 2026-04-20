---
name: design-create-component-variant
author: juan.galindo@bitso.com
compatibility: Designed for Claude Code
metadata:
  category: design-system
  tags:
    - components
    - variants
    - figma
    - design-system
description: Create, expand, or audit component variant structures in Figma following MDS naming conventions. Use when the user asks to create variants, add states to a component, define component properties, organize a variant grid, audit naming consistency, or says things like "I need button variants", "add size variants to the Card", "standardize variant naming in Input".
---

Create, expand, or audit component variant structures in Figma following MDS naming conventions.

---

## Step 1 — Gather Requirements

Before designing variants, clarify:
- **Component type**: What UI element? (button, input, card, icon, etc.)
- **Variant dimensions**: What axes of variation? (size, state, style, theme, etc.)
- **States needed**: Default, hover, focus, active, disabled, loading, error, success?
- **Design tokens**: Reference semantic tokens from `index/tokens.md` (Semantic collection). Use Component tokens first if available, fall back to Semantic — never use Base tokens directly.
- **Text styles**: All text layers must use a named text style from the `## Text Styles` section of `index/tokens.md`. Do not invent arbitrary font sizes, weights, or line heights.
- **Existing components**: Extending an existing component or creating from scratch?
- **Naming conventions**: Does the project have established naming patterns?
- **Target Figma URL**: The file where the ComponentSet should be created.

If the user's request already answers these, proceed directly without asking.

---

## Step 2 — Design the Variant Architecture

**Naming Conventions** (from `ds-rename-components`):
- PascalCase for component names: `Button`, `InputField`, `CardTile`
- Variant property names — lowercase single words: `state`, `size`, `color`
- Boolean property names — camelCase with `has` prefix: `hasIcon`, `hasLabel`, `hasMedia`
- Property values — PascalCase with spaces: `Default`, `Small`, `On Dark`, `Extra Large`
- `true`/`false` boolean values stay lowercase as-is
- No abbreviations unless universally understood

**Variant Dimensions (recommended property order):**
1. `color` — visual style (Primary, Secondary, Ghost, Outline)
2. `size` — scale (Extra Small, Small, Medium, Large, Extra Large)
3. `state` — interactivity (Default, Hover, Focus, Active, Disabled, Loading)
4. Boolean toggles — `hasIcon`, `hasLabel` (True/False)

**Boolean vs. Enum:**
- Boolean for binary toggles (icon presence, label visibility)
- Enum for mutually exclusive options (size, state, color)
- Keep enum lists to 8 or fewer values

---

## Step 3 — Output the Variant Specification

**Component Name**: [Name]

**Variant Dimensions**:

| Property | Type | Values | Default |
|----------|------|--------|---------|

**Total Variant Count**: [N]

**Naming Pattern**: `ComponentName / color / size / state`

**Figma Setup Steps**:
1. [Step-by-step instructions for creating in Figma]

**Auto Layout Config**: [Padding, gap, direction, alignment per variant group]

**Notes & Recommendations**: [Edge cases, accessibility notes, token references]

---

## Step 4 — Variant Grid Organization

When laying out variants in Figma:
- Rows = State, Columns = Type/Variant (recommended)
- 16px or 24px gaps between variants
- Add annotations or a legend frame for documentation
- Group the variant set in a clearly labeled frame or section

---

## Step 5 — Generate the ComponentSet via use_figma

### Step 5a — Get token keys from the MDS tokens file

Run a `use_figma` call on **fileKey `W04HDig9ekFYng2jvkWhv2`** to collect the keys for every token the variants need:

```js
const vars = await figma.variables.getLocalVariablesAsync();
const styles = await figma.getLocalTextStylesAsync();
const neededVars = ['color/primary/default', 'color/surface/default', /* etc. */];
const neededStyles = ['action/base', 'action/small', /* etc. */];
const varKeys = {}, styleKeys = {};
for (const v of vars) if (neededVars.includes(v.name)) varKeys[v.name] = v.key;
for (const s of styles) if (neededStyles.includes(s.name)) styleKeys[s.name] = s.key;
return { varKeys, styleKeys };
```

### Step 5b — Create the ComponentSet on the target file

```js
// 1. Load all fonts upfront
await figma.loadFontAsync({ family: "PP Bitso Sans", style: "Medium" });
await figma.loadFontAsync({ family: "PP Bitso Sans", style: "Bold" });
await figma.loadFontAsync({ family: "Geist", style: "Regular" });
await figma.loadFontAsync({ family: "Geist", style: "Medium" });
await figma.loadFontAsync({ family: "Geist", style: "Bold" });

// 2. Import styles and variables
const S = {};
for (const [name, key] of Object.entries(styleKeys))
  S[name] = await figma.importStyleByKeyAsync(key);

const V = {};
for (const [name, key] of Object.entries(varKeys))
  V[name] = await figma.variables.importVariableByKeyAsync(key);

// 3. Helpers (same pattern as design-create-component)
function cFill(variable) {
  return [figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: .5, g: .5, b: .5 } }, 'color', variable
  )];
}
function applyText(node, styleName, content, colorVar) {
  node.textStyleId = S[styleName].id;
  node.characters = content;
  node.fills = cFill(colorVar);
}

// 4. Factory — creates one component variant; props drive tokens and opacity
function makeVariant({ color, size, state }) {
  const comp = figma.createComponent();
  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "AUTO";
  comp.counterAxisSizingMode = "AUTO";
  comp.primaryAxisAlignItems = "CENTER";
  comp.counterAxisAlignItems = "CENTER";

  // Size-driven padding
  const pad = size === 'Small' ? 8 : size === 'Large' ? 20 : 14;
  comp.paddingLeft = comp.paddingRight = pad * 2;
  comp.paddingTop = comp.paddingBottom = pad;
  comp.cornerRadius = 8;

  // Color-driven fills
  const isPrimary = color === 'Primary';
  comp.fills = cFill(isPrimary ? V['color/primary/default'] : V['color/surface/default']);
  comp.opacity = state === 'Disabled' ? 0.38 : 1;

  // Label
  const label = figma.createText();
  comp.appendChild(label);
  const textStyle = size === 'Small' ? 'action/small' : 'action/base';
  const textColor = isPrimary ? V['color/onPrimary/default'] : V['color/onBackground/highEmphasis'];
  applyText(label, textStyle, 'Label', textColor);

  // Variant name — Figma reads `property=Value` pairs to build component properties
  comp.name = `color=${color}, size=${size}, state=${state}`;
  return comp;
}

// 5. Generate all variants from the spec (replace arrays with the values from Step 3)
const colors = ['Primary', 'Secondary', 'Ghost'];
const sizes  = ['Small', 'Medium', 'Large'];
const states = ['Default', 'Hover', 'Focus', 'Active', 'Disabled'];

const components = [];
for (const color of colors)
  for (const size of sizes)
    for (const state of states)
      components.push(makeVariant({ color, size, state }));

// 6. Combine into a ComponentSet — all components must already be on the page
const set = figma.combineAsVariants(components, figma.currentPage);
set.name = "Button";  // becomes the component name shown in the Figma panel

// 7. Grid layout: rows = state, columns = color × size
set.layoutMode = "HORIZONTAL";
set.itemSpacing = 16;
set.counterAxisSpacing = 16;
set.paddingTop = set.paddingBottom = set.paddingLeft = set.paddingRight = 24;

set.x = 100; set.y = 100;
return { createdNodeIds: [set.id], name: set.name, variantCount: components.length };
```

**Critical rules:**
- Variant name format: `prop1=Value1, prop2=Value2` — Figma parses these into component properties automatically
- `figma.combineAsVariants(components, figma.currentPage)` — all components must be on the same page before combining; the ComponentSet name is set afterward via `set.name`
- `textStyleId = style.id` — never set `fontSize`, `fontName`, `lineHeight` individually after this
- `node.fills = cFill(variable)` — the only way to bind color variables
- `layoutSizingHorizontal/Vertical = "FILL"` must be set **after** `parent.appendChild(child)`

---

## Quality Checks

- [ ] All text layers use a named style from `index/tokens.md ## Text Styles` — no arbitrary sizes
- [ ] No duplicate variant combinations
- [ ] All states represented for each type/size combination
- [ ] Naming is consistent and follows MDS conventions
- [ ] Boolean properties don't duplicate what enums already cover
- [ ] Total variant count < 200 (flag if higher)
- [ ] Accessibility states (focus, disabled) are included
- [ ] Dark mode variants included if the product uses dark mode

---

## Edge Cases

- **Too many variants**: Suggest splitting into multiple components or using component properties more efficiently
- **Inconsistent existing patterns**: Flag the inconsistency, propose a migration path, proceed with the recommended standard
- **Ambiguous requirements**: Ask one focused clarifying question — don't block on multiple unknowns
- **Platform-specific needs**: Adapt for web, iOS, Android, or cross-platform as specified