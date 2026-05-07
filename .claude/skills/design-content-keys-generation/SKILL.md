---
name: design-content-keys-generation
author: juan.galindo@bitso.com
compatibility: >
  Requires the Figma MCP server (`mcp__claude_ai_Figma__use_figma`) for reading
  and renaming text nodes, and the Lokalise project-management MCP server
  (`mcp__lokalise_pm__*`) for the optional auto-upload step.
metadata:
  category: content
  tags: [lokalise, figma, content, keys, localization, i18n]
description: >
  Generates structured Lokalise content keys for every visible text node in a
  Figma target (page, section, or frame), renames the layers in Figma to those
  keys, exports a JSON file, and optionally uploads it to a Lokalise project.
  The skill auto-detects the target from the URL: file URL alone → "Experience"
  page; file URL + node-id → detects if section or frame. Use this skill
  whenever the user wants to "assign content keys", "sync to Lokalise",
  "generate key names", or shares a Figma URL together with any Lokalise /
  content-key intent — even when they don't explicitly say "Lokalise".
---

# design-content-keys-generation

This skill turns a Figma text layers into a clean Lokalise key set in three moves: read the target (page, section, or frame), rename each text layer in place to a structured key, and write a `{feature}-es_MX.json` file. From there the user can upload manually or, with `lokalise_pm` available, the skill can ship the file to Lokalise itself. The skill auto-detects the target from the Figma URL you receive — no configuration needed.

The keys follow the pattern `{feature}.{screenSlug}.{component}.{elementType}`. The full naming rules — abbreviation table, element-type derivation, collision handling — live in `references/key-naming.md`. Read that file before running Step 3.

## Bundled resources

| Path | Purpose |
|---|---|
| `scripts/scan-flexible.js` | The Figma plugin script for Step 2. Auto-detects whether to scan a page, section, or frame. Pass its contents verbatim as the `code` argument of `mcp__claude_ai_Figma__use_figma`, with optional `targetNodeId` parameter. |
| `scripts/rename-nodes.js` | The Figma plugin script for Step 4. Substitute `RENAMES_PLACEHOLDER` with the JSON-encoded list of `{id, key}` pairs before calling `use_figma`. |
| `references/key-naming.md` | Full key naming rules, abbreviation table, element-type rules, collision rules. |
| `references/lokalise-projects.md` | Project IDs and base languages for the upload step. |

## Step 1 — Get the target and initiative tag

Ask the user (or extract from earlier turns):

1. **Figma file URL** — `https://figma.com/design/:fileKey/:fileName?...` (with or without `node-id`). Extract `{fileKey}` from the path and optional `nodeId` from query params. For branch URLs (`/design/:fileKey/branch/:branchKey/...`), use `branchKey` as the file key — that's where the in-progress designs actually live.
2. **Initiative tag** — a short label (`warrants`, `rewards`) used both as the fallback for `feature` and as a Lokalise tag at upload time.

If either is missing, ask once and stop. Don't guess — a wrong tag pollutes the Lokalise project.

**Auto-detection:** The skill determines the scan target automatically:
- **File URL only** → scan the "Experience" page
- **File URL + node-id** → determine if it's a section or frame, and scan accordingly

### Workflow examples

Choose the scenario that matches your use case:

#### Scenario A: Whole "Experience" page (all sections and frames)

**When to use:** You want to generate keys for all production screens in the file at once.

**User provides:**
```
Figma URL: https://figma.com/design/abc123/My-Prototype?node-id=0%3A1
Initiative tag: warrants
```

**What happens:**
1. Skill extracts `fileKey = abc123`, sees no specific `nodeId` or only page reference → targets the "Experience" page
2. Scans all SECTIONs and FRAMEs on the page (e.g., "Warrants", "Rewards", "Holdings")
3. Returns frames grouped by section:
   ```js
   {
     targetType: 'page',
     targetName: 'Experience',
     frameCount: 12,
     totalTextNodes: 47,
     frames: [
       {
         frameId: '123:456',
         frameName: '1300 - Confirmation',
         sectionName: 'warrants',
         textNodes: [...]
       },
       ...
     ]
   }
   ```
4. In Step 3, each frame uses its own `sectionName` for the feature segment

**Output:** `warrants-es_MX.json`, `rewards-es_MX.json`, `holdings-es_MX.json` (one per section)

---

#### Scenario B: Single section (all frames in that section)

**When to use:** You've designed one feature area (e.g., "Warrants Approval Flow") with multiple screens, and want to generate keys for all of them.

**User provides:**
```
Figma URL: https://figma.com/design/abc123/My-Prototype?node-id=123:456
Initiative tag: warrants
```

**What happens:**
1. Skill extracts `fileKey = abc123`, `nodeId = 123:456`
2. Fetches the node → it's a SECTION named "Approval Flow"
3. Scans all FRAMEs inside that section (e.g., "1000 - Start", "1100 - Choose", "1200 - Confirm")
4. Returns frames grouped by their parent section:
   ```js
   {
     targetType: 'section',
     targetName: 'Approval Flow',
     frameCount: 3,
     totalTextNodes: 22,
     frames: [
       {
         frameId: '...',
         frameName: '1000 - Start',
         sectionName: 'Approval Flow',
         textNodes: [...]
       },
       ...
     ]
   }
   ```
5. In Step 3, all frames use `sectionName: 'Approval Flow'` for the feature segment (becomes `approvalFlow`)

**Output:** `approvalFlow-es_MX.json` (all screens in one file)

---

#### Scenario C: Single frame (just that one screen)

**When to use:** You're working on a single screen and want to generate keys for just that frame without touching anything else. Useful for in-progress or exploratory work.

**User provides:**
```
Figma URL: https://figma.com/design/abc123/My-Prototype?node-id=789:101112
Initiative tag: warrants
```

**What happens:**
1. Skill extracts `fileKey = abc123`, `nodeId = 789:101112`
2. Fetches the node → it's a FRAME named "1300 - Confirmation"
3. Scans only text inside that frame
4. Returns a single frame with no parent section:
   ```js
   {
     targetType: 'frame',
     targetName: '1300 - Confirmation',
     frameCount: 1,
     totalTextNodes: 8,
     frames: [
       {
         frameId: '789:101112',
         frameName: '1300 - Confirmation',
         sectionName: null,  // ← no parent section
         textNodes: [...]
       }
     ]
   }
   ```
5. In Step 3, because `sectionName` is `null`, the feature falls back to `initiativeTag` (`warrants`)

**Output:** `warrants-es_MX.json`

---

### Choosing your scenario

Ask yourself:

- **"I want to generate keys for every screen in this file right now"** → Scenario A (file URL only)
- **"I've designed a feature with multiple screens that should share a section name"** → Scenario B (URL + node-id of section)
- **"I'm working on just one screen; I don't want to affect other screens yet"** → Scenario C (URL + node-id of frame)

## Step 2 — Scan the target

Call `mcp__claude_ai_Figma__use_figma` with:

- `fileKey`: `{fileKey}` from Step 1
- `description`: `"Scan Figma target (page, section, or frame) for text nodes and ancestor chain"`
- `code`: the full contents of `scripts/scan-flexible.js`
- If `nodeId` was provided in Step 1, wrap the script in:
  ```js
  const targetNodeId = '{nodeId}';
  [rest of scan-flexible.js]
  ```

The script detects the target type and returns:

```js
{
  targetType: 'page' | 'section' | 'frame',
  targetName: string,
  frameCount: number,
  totalTextNodes: number,
  frames: [{
    frameId, frameName, sectionName,
    textNodes: [{ id, name, characters, ancestorChain }]
  }]
}
```

If scanning a frame, `frameCount` is 1 and `sectionName` will be `null` (use `{initiativeTag}` as fallback in Step 3). If scanning a section with no explicit section node (target is "Experience" page), `sectionName` is the section container name, else `null`.

**Error handling:** If the target cannot be found or determined, the script returns `{ error: 'message', availablePages: [...] }` — tell the user which pages exist and ask to clarify.

## Step 3 — Build the key map

Read `references/key-naming.md`. Then, for each text node in the payload, derive the four key segments:

1. **`feature`**: `frame.sectionName` if present and non-null, else `{initiativeTag}`. CamelCase, strip leading numbers and special chars. (Note: when scanning a single frame or section without an explicit section parent, `sectionName` is `null`; use the initiative tag instead.)
2. **`screenSlug`**: `frame.frameName` with leading number stripped (`1300 - Confirmation` → `confirmation`). CamelCase.
3. **`component`**: walk the `ancestorChain` from closest to outermost. The first ancestor whose name (lowercased, segment before `/` if any) appears in the abbreviation table wins. Unknown `MDS …` ancestors get a camelCased fallback and are flagged. No MDS ancestor → `wrapper`.
4. **`elementType`**: lowercase the text layer's own name and match against the element-type table. Special case: if the closest MDS ancestor is `MDS Button`, force `label`.
5. **`value`**: use `node.characters` as-is. Placeholders like `[%s]` pass through unchanged to Lokalise.

### Key derivation examples

Same frame, different scenarios:

| Frame | `sectionName` | Feature | Key (from "Heading" layer) |
|---|---|---|---|
| Scenario A: Whole page, frame in "Warrants" section | `"Warrants"` | `warrants` | `warrants.confirmation.header.title` |
| Scenario B: "Approval Flow" section scanned | `"Approval Flow"` | `approvalFlow` | `approvalFlow.confirmation.header.title` |
| Scenario C: Single frame, no parent section | `null` | `warrants` (from tag) | `warrants.confirmation.header.title` |

The frame and component layers are always the same; only the feature segment changes based on where the frame lives in the tree.

**Two collision passes.** First pass: count how many nodes map to each `feature.screenSlug.component.elementType`. Second pass: assign keys. When the count is 1, use the base. When greater than 1, every occurrence gets a numeric suffix attached directly to the element type — `title1`, `title2`. The first occurrence is `title1`, not `title`. Numbering both sides is what makes diffs reviewable later.

**Component duplicates on the same screen.** Before the suffix pass, detect cases where two distinct MDS instances of the same component appear on the same `(feature, screenSlug)`. Replace the `component` segment with `{component}{Descriptor}` for every node in those groups, where `Descriptor` is the camelCased name of the closest non-MDS ancestor (`CTAWrapper` → `wrapperCta`). This preserves designer intent in the key name and avoids noisy `btn1` / `btn2` keys.

The output is a `keyMap` array of `{ id, key, value, layerName, ancestorChain }` plus an `unmatchedIcu` warnings list.

## Step 4 — Show the proposal and ask for confirmation

Before touching Figma or writing any file, show the user a markdown table of the proposed keys and wait for explicit approval. The Figma rename in Step 5 cannot be cleanly undone from the agent side, and the JSON file becomes the upstream source for Lokalise — so a once-over by the designer is what catches a wrong section name, a layer that should have been hidden, or an MDS component this skill couldn't classify, before any of that propagates.

Group the table by frame so the designer can scan it the same way they scan the Figma. Example output:

```
### Warrants → 1300 - Confirmation  (8 keys)

| Layer | Component | Element | Key | Value |
|---|---|---|---|---|
| Heading | header | title | warrants.confirmation.header.title | ¡Listo! Compraste {asset} |
| Paragraph | header | body | warrants.confirmation.header.body | Agregaste {quantity} {asset}… |
| CTA Label | ctas | label | warrants.confirmation.ctas.label | Hacer otra operación |
| Success Icon | wrapper | icon | warrants.confirmation.wrapper.icon | ✓ |

### Warrants → 1400 - Summary  (5 keys)

| Layer | Component | Element | Key | Value |
|---|---|---|---|---|
| Title | header | title | warrants.summary.header.title | Operación completada |
| Detail | card | body | warrants.summary.card.body | Tu compra fue exitosa |
```

Below the tables, surface anything the designer should know before approving:

```
⚠️  Unknown MDS components → camelCased name used:
  - MDS NewThing → newThing  (4 nodes)

⚠️  Layer names without a known element-type → camelCased fallback:
  - "Disclaimer" → disclaimer  (2 nodes)

⚠️  Multiple identical components detected:
  - warrants.confirmation.button.label → using descriptor: warrants.confirmation.ctaButtonPrimary.label (1), warrants.confirmation.ctaButtonSecondary.label (2)
```

Then ask:

> **¿Confirmas estos nombres de keys?**
>
> - **Sí** — procedo a renombrar las capas en Figma y a guardar el JSON.
> - **Editar** — dime qué cambiar (por ejemplo: "el `feature` debería ser `warrants2`", "agrega `[%s]` → `{symbol}` para 'Tu saldo es [%s]'", "no incluyas el frame X").
> - **Cancelar** — descarto la propuesta y no toco Figma.

If the user asks for edits, apply them to the in-memory `keyMap` (or rerun Step 3 with the new inputs — e.g., a new ICU table row, a renamed initiative tag) and present the updated table again. Only proceed to Step 5 after an unambiguous "sí" / "ok" / "confirmo".

## Step 5 — Rename the text nodes in Figma

Read `scripts/rename-nodes.js`. Replace the `RENAMES_PLACEHOLDER` token with `JSON.stringify(keyMap.map(k => ({ id: k.id, key: k.key })))`, then call `mcp__claude_ai_Figma__use_figma` with the substituted script. The script returns `{ renamed, missing, errors }` — surface non-empty `missing` and `errors` to the user; they signal node IDs that disappeared between scan and rename (designer edits mid-flight).

## Step 6 — Write the JSON file

Build the key→value map and save it.

```bash
mkdir -p docs/content/project-keys
```

Write `docs/content/project-keys/{feature}-es_MX.json` with one entry per `keyMap` row:

```json
{
  "warrants.successful.header.title": "¡Listo! Compraste {asset}",
  "warrants.successful.header.body": "Agregaste {quantity} {asset} a tu portafolio, equivalente a {amount} {currency}.",
  "warrants.successful.ctas.label": "Hacer otra operación"
}
```

The file is saved before asking about upload because manual upload (Option A in Step 7) needs it on disk regardless of MCP availability — and a saved file is also the auditable artifact when something goes wrong with Lokalise.

## Step 7 — Report and ask about upload

Report the run:

```
✅ Keys generated: X
✅ Figma nodes renamed: X
✅ File saved: docs/content/project-keys/{feature}-es_MX.json

⚠️  Unknown MDS components (extend references/key-naming.md):
  - MDS NewThing → newThing

⚠️  Renames missing in Figma:
  - <node ids>
```

Then ask:

> **¿Qué quieres hacer con el archivo JSON?**
>
> **A** — Termina aquí. Sube el archivo manualmente en
> [app.lokalise.com](https://app.lokalise.com) → tu proyecto → Upload →
> selecciona `{feature}-es_MX.json` con idioma `es_MX`.
>
> **B** — Subir automáticamente vía MCP al proyecto Lokalise.

## Step 8 — Lokalise upload (only if user chose B)

**MCP availability check.** Verify `mcp__lokalise_pm__upload_file` is loaded in the session. If it isn't, tell the user the MCP isn't connected, repeat the manual-upload instructions from Option A, and stop. Do **not** try `lokalise_sd` — it's read-only and cannot upload.

**Pick the project.** Read `references/lokalise-projects.md` and present the numbered list to the user. Wait for their choice before uploading. The IDs change rarely, but verify the list is still current with `mcp__lokalise_pm__list_lokalise_projects` if a previous run reported a project not found.

**Upload.** Call `mcp__lokalise_pm__upload_file` with:

```
project_id: <selected>
filename: {feature}-es_MX.json
lang_iso: es_MX
data: <base64 of the JSON file contents>
replace_modified: true
distinguish_by_file: false
tags: ["{feature}", "{initiativeTag}"]
```

`lang_iso` is always `es_MX` — see `references/lokalise-projects.md` for why we keep it constant even for projects whose base language is `en`.

**Confirm.** The upload returns a `process_id`. Poll with `mcp__lokalise_pm__get_process_status` until status is `finished`, then report:

```
✅ Upload complete — {X} keys added/updated in project "{project_name}"
   Source language: es_MX
   Pending translation: en, es_AR, es_CO, pt_BR
```
