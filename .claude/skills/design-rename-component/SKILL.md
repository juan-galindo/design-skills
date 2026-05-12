---
name: design-rename-component
author: juan.galindo@bitso.com
compatibility: Designed for Claude Code
metadata:
  category: design-system
  tags:
    - naming
    - components
    - layers
    - figma
description: Rename layers and component properties in a Figma frame, section, or component following the MDS naming convention. Trigger when the user mentions renaming, layer cleanup, naming audit, layer structure, component variants, or wants to pick a component from the Web or Mobile MDS library. Also trigger when the user shares a Figma URL and mentions naming, layers, structure cleanup, or component variants.
---

Rename layers and component properties in a Figma frame, section, or component following the MDS naming convention.

---

## Step 0 — Ask for input source

If the user hasn't provided a Figma URL, ask:

> "Would you like to:
> 1. **Paste a Figma URL** — rename a specific frame or component directly
> 2. **Pick from the Web library** — browse MDS Web Core Components
> 3. **Pick from the Mobile library** — browse MDS Mobile Core Components"

**If option 1:** proceed to Step 1 with the URL.

**If option 2 or 3:**
- Read the matching index file:
  - Web → `specs/figma-catalog/web-components.md`
  - Mobile → `specs/figma-catalog/mobile-components.md`
- Extract every component entry (name + pageId, including nodeId if available) from the index.
- Present a numbered list and wait for the user to select one.
- Resolve `fileKey` from `figma.config.json` and the selected `pageId` (using `nodeId` only if provided), then proceed to Step 1.

---

## Step 1 — Fetch the full layer tree

Extract the `fileKey` and `nodeId` from the Figma URL (convert `-` to `:`, e.g. `node-id=1-2` → `1:2`). Run `use_figma` with the **actual node ID substituted**:

```js
// Substitute the real nodeId before running, e.g. '22440:2024'
const root = figma.getNodeById('ACTUAL_NODE_ID')
if (!root) return { error: 'Node not found — verify the nodeId.' }

function walk(node) {
  return {
    id: node.id,
    name: node.name,
    type: node.type,
    componentPropertyDefinitions: node.componentPropertyDefinitions ?? null,
    children: 'children' in node ? node.children.map(c => walk(c)) : []
  }
}

return walk(root)
```

---

## Step 2 — Propose layer renames (wait for confirmation)

Walk the entire layer tree in one pass. Apply the naming rules below to every eligible layer.

**Skip any layer that is a component instance, main component, or matches `MDS*`.**

For components with variants: process all variants' internal layers in the same pass — do not loop or fetch each variant separately.

Output a single flat table ordered depth-first (top to bottom, parent before children):

| Node type | Label |
|-----------|-------|
| FRAME | `frame` |
| GROUP | `group` |
| TEXT | `text` |
| RECTANGLE | `rectangle` |
| ELLIPSE | `ellipse` |
| LINE / VECTOR | `vector` |
| IMAGE | `image` |
| INSTANCE | `Component Instance` |
| COMPONENT | `◆ Component` |
| COMPONENT_SET | `◆◆ Component Set` |

Rows labeled `Component Instance`, `◆ Component`, or `◆◆ Component Set` show **"— skip —"** in the Proposed Name column.

| Variant | Layer Type | Current Name | Proposed Name |
|---------|------------|-------------|---------------|

Present this table and ask:
> "Does this look right? I'll apply the layer renames."

**Wait for explicit confirmation before applying.**

---

## Step 3 — Apply layer renames, then propose property renames

Apply confirmed layer renames in a single `use_figma` call:

```javascript
const layerRenames = [
  { id: "123:456", name: "Wrapper" },
];
for (const item of layerRenames) {
  const node = figma.getNodeById(item.id);
  if (node) node.name = item.name;
}
```

Then in a separate message, propose component property renames:

| Current Property Name | Proposed Name | Type |
|----------------------|---------------|------|

Ask:
> "Does this look right? I'll apply the property renames."

**Wait for explicit confirmation before applying.**

---

## Step 4 — Apply property renames, then propose variant value renames

Apply confirmed property renames:

```javascript
const propRenames = [
  { componentId: "123:100", oldName: "Paragraph", newName: "description" },
];
for (const item of propRenames) {
  const comp = figma.getNodeById(item.componentId);
  if (comp && (comp.type === 'COMPONENT' || comp.type === 'COMPONENT_SET')) {
    comp.editComponentProperty(item.oldName, { name: item.newName });
  }
}
```

Then propose variant property *value* renames (e.g. `default` → `Default`). Wait for confirmation, then apply.

---

## Naming Rules

**⚠️ CRITICAL: Never rename component instances or main components.**

All layer names must be in **camelCase**. Never leave Figma auto-generated names (`Frame 42`, `Group 7`, `Rectangle 3`).

### Standard Layer Vocabulary

Use this shared vocabulary across all components. **Most common** is the default when in doubt.

| Layer Role | Accepted names |
|------------|---------------
| Text content | `label`|
| Leading icon | `iconLeading` |
| Trailing icon | `iconTrailing` |
| Standalone icon | `icon` |
| Image | `image`|
| Badge / indicator | `badge`, `indicator` |
| Root container | Component name in camelCase |
| Layout wrappers | `row`, `column`, `container` |
| Interactive area | `pressable`, `touchArea` |

### Slot Layers

Any layer intended to be swapped by a different component instance must have a `slot` suffix:
`iconSlot`, `badgeSlot`, `illustrationSlot`

### Shapes (Rectangles & Ellipses)
- Full background fill → `background`
- Divider / separator line → `divider`
- Status indicator → `status`

---

## Component Property Names

All property names must be **camelCase**. Property values must be **camelCase or lowercase** matching the actual React prop values — never PascalCase or designer-centric labels.

### Variant properties

| Property | Name | Example values |
|----------|------|----------------|
| Interaction / activity state | `state` | `default`, `hover`, `pressed`, `disabled`, `loading` |
| Visual style | `variant` | `primary`, `secondary`, `ghost`, `danger` |
| Size | `size` | `sm`, `md`, `lg` |
| Feedback | `feedback` | `none`, `error`, `success`, `warning` |
| Color / theme | `color` | `default`, `onDark` |

### Text properties — camelCase matching code prop names
| Content | Name |
|---------|------|
| Primary heading | `header` |
| Supporting text | `description` |
| Short label | `label` |
| Button/action label | `callToAction` |

### States must be variant values — not boolean toggles

| ✅ Use | ❌ Avoid |
|--------|---------|
| `state` → `default, disabled, loading` | `isDisabled` → `true/false` |
| `variant` → `primary, danger` | `isDanger` → `true/false` |
| `size` → `sm, lg` | `isLarge` → `true/false` |

### Property order in the panel
1. `variant` / `size` — structural
2. `state` — disabled, loading, selected, error, etc.
3. Text content properties (`label`, `title`, etc.)
4. Slot controls (`iconLeading`, `iconTrailing`, instance swaps)

---

## Never Rename

- Component instances (purple icon in Figma)
- Main components
- Any layer starting with `MDS` or `WDS`