---
name: design-figma-naming
author: esmeralda.carcano@bitso.com
compatibility: Designed for Claude Code
metadata:
  category: handoff
  tags:
    - naming
    - conventions
    - figma
    - layers
    - audit
description: >
  Audit and fix layer naming conventions in Figma files according to the Bitso Design System
  contribution guidelines. Use this skill whenever the user asks to: rename Figma layers, fix
  layer names, audit a Figma file for naming issues, apply naming conventions, clean up a Figma
  file before design system review, or standardize layer names. Also triggers when the user
  says things like "fix the names", "rename the layers", "apply the guidelines to this file",
  or "clean up this Figma file". Always use this skill before touching any Figma layer names —
  it contains the full ruleset, detection logic, and rename execution patterns.
---

# Figma Naming Conventions Skill

Apply the Bitso Design System naming conventions to any Figma file by auditing and renaming
layers in three passes: screen frames → wrapper layers → text & media layers.

> **The naming rules are fully stored in this skill's reference files — do NOT ask the user
> to share the Way of Working Figma file or the zeroheight cheat sheet. Read the rules
> directly from `references/layer-rules.md` and `references/common-renames.md`.**

---

## Environment detection — Claude.ai vs Claude Code

This skill works in both environments. The core rules are identical; only the
**tool names and execution method** differ.

| | Claude.ai | Claude Code |
|---|---|---|
| Read file structure | `Figma:get_metadata` | `Figma:get_metadata` |
| Run JS in Figma | `Figma:use_figma` (via claude.ai plugin) | `Figma:use_figma` (via Figma MCP) |
| Audit script | Inline in message | Load from `scripts/audit.js` |
| Rename script | Inline in message | Load from `scripts/rename.js` |

**In Claude Code**, always load the scripts from the `scripts/` folder rather than
writing inline JS. This keeps operations reproducible and auditable.

---

## Step 0 — Gather inputs

The only thing you need from the user is:

1. **The Figma file URL** — extract `fileKey` and `nodeId`
2. **Section/sub-section labels** — read from the file using `Figma:get_metadata`
   on the target section node; no need to ask the user

Do not ask for the Way of Working file or the cheat sheet — rules are in this skill.

---

## Step 1 — Rules (self-contained)

Full rules → `references/layer-rules.md` | Common renames → `references/common-renames.md`

### Screen frame naming — `{sequence} - {flow} - {state}`

```
{sequence}  →  From the SECTION or SUB-SECTION label on canvas
               "1. MXN withdrawal"                          →  1000
               "1.2 Save new account [Saved accounts flow]" →  2000 (separate flow)
               "2. Loan Offer"                              →  2000 (or next available)

{flow}      →  The section/sub-section label name — NOT the file name
               "1. MXN withdrawal"                          →  "MXN Withdrawal"
               "1.2 Save new account [Saved accounts flow]" →  "Save New Account"

{state}     →  What the screen represents ("Home", "Calculator empty", etc.)
```

**Numbering:** `1000` = new flow · `1100` = new screen · `1110` = state of same screen

> ⚠️ Always read the section label from the canvas first — never guess the prefix.
> Sub-sections with their own label = separate flow with next available thousands prefix.

### Layer rules summary

| Layer type | Rule |
|---|---|
| Wrapper (Frame/Group) | `PascalCase` + `Wrapper` suffix |
| Text layer | Name = what it *represents* (not its value) |
| Media layer | Characteristic + type suffix (`CEPImage`, `AccentBackground`) |
| Component-internal layer | `camelCase`, standard vocabulary (`label`, `iconLeading`, `iconTrailing`, `pressable`, `container`, `row`, `mdsButton`) |
| Slot layer | `camelCase` + `Slot` suffix (e.g. `leadingSlot`, `trailingSlot`, `contentSlot`) |
| Never | Emojis · UUIDs · spaces · generic names (`Frame 123`) · camelCase **outside** of components |

> **Casing rule of thumb:** flows, screens, sections and wrappers use **PascalCase**.
> Layers **inside** MDS/WDS components use **camelCase**. See `references/layer-rules.md`.

### Page naming — `Category/MDSComponentName`

Library page tabs follow this structure so components are grouped predictably.

```
Foundation/Color
Form/Input
Form/Checkbox
Navigation/AppBar
_deprecated/Toggle           ← legacy component, kept for back-compat
_wip/Stepper                 ← work in progress, not yet released
```

**Rules:**
- **Category** is **singular** + **PascalCase** (`Form`, not `Forms`; `Navigation`, not `navigation`).
- One slash separates category from component: `Category/ComponentName`.
- **Prefixes:**
  - `_deprecated/` → component is on its way out; do **not** use for new work.
  - `_wip/` → component is being designed/built; do **not** publish to consumers.
- **Version suffixes** belong on the component, never the category:
  - ✅ `Form/InputV2`
  - ❌ `Form V2/Input`

### Component naming — `MDS{Name}` / `WDS{Name}`

Every component in the library is prefixed with the platform token:

| Prefix | Library |
|---|---|
| `MDS` | Mobile Design System |
| `WDS` | Web Design System |

**Rules:**
- Prefix is **mandatory** — no unprefixed component names ship.
- **PascalCase**, **no spaces**, no separators between prefix and name:
  - ✅ `MDSButton`, `MDSInputText`, `WDSAppBar`
  - ❌ `MDS Button`, `mds-button`, `Mds_Button`, `Button` (no prefix)
- **Variant property names** → `camelCase` (`size`, `state`, `iconPosition`, `hasIcon`).
- **Variant values** → `camelCase` or `lowercase`. Pick one per property and stay consistent.
  - ✅ `size = small | medium | large`
  - ✅ `state = default | hover | pressed | disabled`
  - ✅ `iconPosition = leading | trailing | none`
  - ❌ `Size = Small | Medium | Large` (PascalCase values)
  - ❌ `state = Default | hover | PRESSED` (mixed casing)

### Properties panel

Variant properties are how a component is configured in the panel. Two rules:

1. **States are variant values, never booleans.**
   - ✅ `state = default | hover | pressed | disabled | focus`
   - ❌ `isHover = true/false`, `isPressed = true/false`, `isDisabled = true/false`
   - Booleans are reserved for **toggles** that are genuinely independent (`hasIcon`, `showLabel`).

2. **Property order in the panel:**
   ```
   structural  →  size, density, layout, orientation
   content     →  label, helperText, placeholder, hasIcon
   slots       →  leadingSlot, trailingSlot, contentSlot
   state       →  state (default | hover | pressed | disabled | focus)
   ```
   This ordering makes the panel scannable: shape first, what's in it second, where extras plug in third, current state last.

### Annotations — bracketed tags

Annotations are inline tags added to layer or component names to communicate
intent that isn't visible from the design alone. Use the brackets exactly as shown.

| Tag | Use for | Example |
|---|---|---|
| `[token]`     | Layer is bound to a specific design token | `Background [token]` |
| `[role]`      | Semantic role of the layer in the flow / a11y role | `Header [role]` |
| `[prop]`      | Layer is driven by a component property | `Label [prop]` |
| `[condition]` | Layer only renders under a condition | `ErrorMessage [condition]` |
| `[a11y]`      | Accessibility-related layer (focus ring, screen-reader-only text) | `FocusRing [a11y]` |

> Annotations are **suffixes**: keep the layer name first, tag last, single space between them.
> Multiple tags allowed: `Label [prop] [a11y]`.

---

## Step 2 — Audit the file

### Claude.ai
Run the audit inline using `Figma:use_figma` with the JS from `scripts/audit.js`.

### Claude Code
```bash
# Read the audit script
cat .claude/skills/design-figma-naming/scripts/audit.js
```
Then call `Figma:use_figma` with the script contents and the target `fileKey`.

```javascript
// In Figma:use_figma — set the section node ID before running
const ROOT_NODE_ID = "2002:14545"; // or null for entire page
// ... (rest of design-figma-naming/scripts/audit.js)
```

The audit returns:
```json
{
  "total": 42,
  "summary": { "NOT_PASCAL_CASE": 15, "MISSING_WRAPPER_SUFFIX": 20, ... },
  "issues": [{ "id": "2002:14636", "name": "wrapper", "violations": [...] }]
}
```

### Before renaming: scan section labels
1. **Section frames** → thousands prefix
2. **Sub-section banners** (`[DOC_ONLY] Flow Tag` etc.) → separate flow, new thousands prefix
3. **`[Archive]` frames** → inspect content; real flow screens get sequence numbers

---

## Step 3 — Execute renames in 3 passes

Always in this order: **Pass 1 → Pass 2 → Pass 3**

### Claude Code execution pattern

```bash
# Read the rename script template
cat .claude/skills/design-figma-naming/scripts/rename.js
```

Fill in the `renames` array, then call `Figma:use_figma` with the completed script.
Run once per pass (screen frames, then wrappers, then text/media) for clarity.

### Pass 1 — Screen-level frames

**Prefix decision tree:**
```
Top-level section label?       → number × 1000  ("1. Feature" → 1000)
Sub-section label?             → next available thousands, sub-section name as {flow}
[Archive] frame with content?  → assign sequence number, remove [Archive]
Bottom sheet / overlay?        → NO sequence number, PascalCase name only
```

### Pass 2 — Wrapper layers

- Only rename **local** frames/groups — plain numeric IDs like `"2002:14636"`
- **Never rename** component instances (IDs starting with `I`, type = `INSTANCE`)
- Rule: `PascalCase` + `Wrapper` suffix
- Reference: `references/common-renames.md`

### Pass 3 — Text & media layers

- Text: name = what it represents, not its value
- Media: characteristic + type suffix
- Remove all UUID names and emoji

---

## Step 4 — Report results

```
✅ Pass 1 — Screen frames:   XX renamed
✅ Pass 2 — Wrapper layers:  XX renamed
✅ Pass 3 — Text/media:      XX renamed
──────────────────────────────────────
   Total:                    XX layers renamed
```

---

## Quick-reference: violation checklist

| Check | Fix |
|---|---|
| Lowercase first letter | PascalCase |
| Spaces or special chars (`+`, `/`, `&`) | Remove, PascalCase |
| Missing `Wrapper` suffix | Add it |
| `camelCase` frame name | `PascalCase` |
| Typos (`criptoCards`, `topItens`, `InfoPannel`) | Fix typo |
| UUID or auto-generated name | Rename semantically |
| Emoji anywhere in a layer/component name | Remove immediately — covers all Unicode emoji ranges (☑️, ⚠️, 🎨, 🚀, 🏳️, etc.) |
| Forbidden space inside an identifier | Remove — applies to wrappers, components, component sets, and component property names (`MDS Button`, `Helper text`, `MDS CurrencyField ` with trailing space). Bracketed annotations (`[Archive]`, `[Reference]`, `[DOC_ONLY]`, `[token]`, `[role]`, `[prop]`, `[condition]`, `[a11y]`) are exempt; section labels and page tabs may contain spaces as defined by their own rules. |
| Leading or trailing whitespace | Trim — silently breaks pattern matching and exports |
| `Frame 1234567` or `Group 1` | Rename to describe content |
| Screen frame missing sequence number | Apply `{sequence} - {flow} - {state}` |
| Wrong sequence prefix | Re-read section label from canvas |
| `[Archive]` with real content | Assign sequence number |
| Sub-flow in parent flow prefix | Give sub-flow its own thousands prefix |
| Sub-flow using parent section name | Use sub-section label name |
| Bottom sheet with sequence number | Remove number, PascalCase only |
| Page tab not in `Category/Component` form | Restructure to `Form/Input`, `Navigation/AppBar`, etc. |
| Plural category (`Forms/`, `Buttons/`) | Singular PascalCase (`Form/`, `Button/`) |
| Deprecated/WIP component on a normal page | Move under `_deprecated/` or `_wip/` |
| Version suffix on the category (`Form V2/Input`) | Move suffix to component (`Form/InputV2`) |
| Component without `MDS`/`WDS` prefix | Add the platform prefix (`MDSButton`, `WDSAppBar`) |
| Space or separator inside component name | Remove (`MDS Button` → `MDSButton`) |
| Variant property in PascalCase | camelCase (`Size` → `size`) |
| Mixed-casing variant values | One casing per property (`camelCase` or `lowercase`) |
| State exposed as boolean (`isHover`) | Convert to `state` variant value |
| Layer inside an MDS/WDS component in PascalCase | camelCase using standard vocab (`label`, `iconLeading`, …) |
| Slot layer missing `Slot` suffix | Add it (`leading` → `leadingSlot`) |
| Property panel order ≠ structural → content → slots → state | Reorder to match the convention |
| Annotation without brackets or wrong tag | Use `[token]`, `[role]`, `[prop]`, `[condition]`, `[a11y]` |

---

## Reference files

- `.claude/skills/design-figma-naming/references/layer-rules.md` — Complete layer type rules with examples
- `.claude/skills/design-figma-naming/references/common-renames.md` — Universal bad→good rename patterns
- `.claude/skills/design-figma-naming/scripts/audit.js` — Runnable audit script for `Figma:use_figma`
- `.claude/skills/design-figma-naming/scripts/rename.js` — Runnable rename script for `Figma:use_figma`
