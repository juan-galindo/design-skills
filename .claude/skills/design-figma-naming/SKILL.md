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
| Never | Emojis · UUIDs · spaces · camelCase · generic names (`Frame 123`) |

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
| Emoji | Remove immediately |
| `Frame 1234567` or `Group 1` | Rename to describe content |
| Screen frame missing sequence number | Apply `{sequence} - {flow} - {state}` |
| Wrong sequence prefix | Re-read section label from canvas |
| `[Archive]` with real content | Assign sequence number |
| Sub-flow in parent flow prefix | Give sub-flow its own thousands prefix |
| Sub-flow using parent section name | Use sub-section label name |
| Bottom sheet with sequence number | Remove number, PascalCase only |

---

## Reference files

- `.claude/skills/design-figma-naming/references/layer-rules.md` — Complete layer type rules with examples
- `.claude/skills/design-figma-naming/references/common-renames.md` — Universal bad→good rename patterns
- `.claude/skills/design-figma-naming/scripts/audit.js` — Runnable audit script for `Figma:use_figma`
- `.claude/skills/design-figma-naming/scripts/rename.js` — Runnable rename script for `Figma:use_figma`
