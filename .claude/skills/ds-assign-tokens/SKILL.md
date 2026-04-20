---
name: ds-assign-tokens
description: >
  Assigns MDS library text styles and semantic color tokens to an existing Figma component
  by connecting layers to the real library styles — never adding raw hex values or creating
  new styles. Use this skill whenever the user wants to "assign tokens", "connect styles",
  "link text styles", "apply semantic tokens", "tokenize a component", "implement text styles",
  or says a component is "missing tokens", "has hardcoded colors", "needs text styles",
  or "needs to be connected to the library". Also trigger when the user says "clean up styles",
  "fix styles on this component", or shares a Figma URL and asks to apply the design system.
---

# ds-assign-tokens

Connects an existing Figma component's layers to MDS library text styles and semantic color tokens.
**Connect only — never create new styles, never write raw hex.** If a matching style doesn't exist in the file, leave the layer untouched and report it.

---

## Step 1 — Get the target

Ask for (or extract from context):
1. **Figma file URL** — the file containing the component
2. **Which component or frame** to process — if not given, use the current selection

If the user hasn't selected anything or hasn't provided a node URL, ask them to select the component in Figma first.

---

## Step 2 — Discover available library styles and variables

Run a discovery call first. Never assume style names.

```js
const [paintStyles, textStyles, localVars, localCollections] = await Promise.all([
  figma.getLocalPaintStylesAsync(),
  figma.getLocalTextStylesAsync(),
  figma.variables.getLocalVariablesAsync(),
  figma.variables.getLocalCollectionsAsync()
]);

const mdsPaint = paintStyles.filter(s => s.name.includes("/"));
const mdsText  = textStyles.filter(s => s.name.includes("/"));
const semanticVars = localVars.filter(v => v.resolvedType === "COLOR" && v.name.includes("/"));

return {
  paintStyles: mdsPaint.map(s => ({ id: s.id, name: s.name })),
  textStyles:  mdsText.map(s => ({
    id: s.id, name: s.name,
    fontSize: s.fontSize,
    fontFamily: s.fontName?.family,
    fontStyle: s.fontName?.style,
    lineHeight: s.lineHeight
  })),
  colorVariables: semanticVars.map(v => ({ id: v.id, name: v.name, key: v.key })),
  collections: localCollections.map(c => ({ id: c.id, name: c.name }))
};
```

If color variables AND paint styles are both empty (`semanticVars.length === 0` and `mdsPaint.length === 0`), warn the user:
> "No MDS color tokens found. Enable the MDS Design Tokens library: Main menu → Libraries → search 'MDS Design Tokens' → toggle it on."
> Proceed with text style assignment only.
---

## Step 3 — Traverse and assign

Walk the **entire component tree** recursively and apply the best match to every node.

```js
function walk(node, fn) {
  fn(node);
  if ("children" in node) node.children.forEach(c => walk(c, fn));
}
const target = urlTarget ?? figma.currentPage.selection[0];
if (!target) return { error: 'No node selected — select a component first.' };
walk(target, assignTokens);
```

### Text nodes → text styles

For each TEXT node:
1. Read `fontSize`, `fontName.family`, `fontName.style`, `lineHeight`
2. Find the matching style in `mdsText` (from the discovery call)
3. If found, apply: `node.textStyleId = style.id`
4. If not found, leave untouched — add to the unmatched report with the closest style as a suggestion
5. Then assign a color token to the text fill (see color rules below)

**Matching priority:**
1. Exact match on `fontSize` + `fontFamily` + `fontStyle`
2. Closest match on `fontSize` alone when the font family is already Geist or PP Bitso Sans

### Color fills → semantic tokens

For each node with solid fills:

**Prefer variables over paint styles** — variables support Light/Dark Bitso modes.

1. Find a variable whose resolved value matches the fill's RGBA (tolerance: ±2 per channel out of 255 for RGB, ±0.02 for alpha)
2. If no variable match, try paint styles by the same color comparison
3. Apply:
   - Variable: iterate each solid paint in `node.fills`, call `figma.variables.setBoundVariableForPaint(paint, variable)`, update the paint in the array, and reassign `node.fills`
   - Paint style: `node.fillStyleId = style.id`

If no match is found, leave the fill untouched and add to the unmatched report with the closest token as a suggestion.

### Strokes → same logic as fills

For strokes, apply the same matching and binding logic:
- Paint style: `node.strokeStyleId = style.id`
- Variable: iterate each solid paint in `node.strokes`, call `figma.variables.setBoundVariableForPaint(paint, variable)`, update the paint in the array, and reassign `node.strokes`

### Skip these nodes:
- Image and gradient fills
- Nodes with `visible = false`
- Nodes already fully linked (`textStyleId` set AND `fillStyleId`/boundVariables set)

---

## Step 4 — Report results

```text
✅ Assigned:
  - "Label" → text style: body/base, fill: color/onBackground/highEmphasis
  - "Icon BG" → fill: color/surface/default

⚠️  Unmatched (left unchanged — suggested token):
  - "Title" → fontSize 24px Bold — closest text style: heading/base (not in file, enable MDS library)
  - "Divider" → fill: rgba(21,28,40,0.1) — closest: color/border/light (assign manually)
  - "Custom Text" → fontSize 13px — closest text style: tiny/base (12px, review before applying)
```

---

## Plugin API reference

```js
// Text style
node.textStyleId = textStyle.id;

// Paint style (color)
node.fillStyleId = paintStyle.id;
node.strokeStyleId = paintStyle.id;

// Color variable (preferred — supports modes)
const variable = await figma.variables.getVariableByIdAsync(variableId);
// For fills: iterate each solid paint and bind the variable
node.fills = node.fills.map(paint => {
  if (paint.type === "SOLID") {
    return figma.variables.setBoundVariableForPaint(paint, variable);
  }
  return paint;
});
// For strokes: iterate each solid paint and bind the variable
node.strokes = node.strokes.map(paint => {
  if (paint.type === "SOLID") {
    return figma.variables.setBoundVariableForPaint(paint, variable);
  }
  return paint;
});

// Color distance for closest-match suggestions (including alpha)
function colorDist(a, b) {
  return Math.sqrt(
    Math.pow((a.r - b.r) * 255, 2) +
    Math.pow((a.g - b.g) * 255, 2) +
    Math.pow((a.b - b.b) * 255, 2) +
    Math.pow((a.opacity - b.opacity) * 100, 2)
  );
}

// Exact match tolerance — per-channel ±2 (out of 255 for RGB), ±0.02 for alpha
function colorMatch(a, b, rgbTol = 2, alphaTol = 0.02) {
  return (
    Math.abs((a.r - b.r) * 255) <= rgbTol &&
    Math.abs((a.g - b.g) * 255) <= rgbTol &&
    Math.abs((a.b - b.b) * 255) <= rgbTol &&
    Math.abs((a.opacity - b.opacity)) <= alphaTol
  );
}
```

---

## Key constraints

- **Text styles**: connect only. If the style doesn't exist in the file, leave the layer untouched and report it with a suggestion.
- **Color tokens**: connect only. Never write raw hex as a fallback — unmatched fills stay untouched.
- **textStyleId overrides font properties** — once assigned, `fontSize`, `fontName`, `lineHeight` are controlled by the style.
- **fillStyleId and fills are mutually exclusive** — setting `fills = [...]` clears `fillStyleId`. Always use `fillStyleId` or `setBoundVariable`.
- **Variables beat paint styles** for colors — use paint styles only as fallback.