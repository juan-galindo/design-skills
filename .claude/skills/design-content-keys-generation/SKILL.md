---
name: design-content-keys-generation
compatibility: >
  Requires the Figma MCP server (`mcp__claude_ai_Figma__use_figma`) for reading
  and renaming text nodes, and the Lokalise project-management MCP server
  (`mcp__lokalise_pm__*`) for the optional auto-upload step.
metadata:
  author: juan.galindo@bitso.com
  category: content
  tags: [lokalise, figma, content, keys, localization, i18n]
description: >
  Generates structured Lokalise content keys for every visible text node in a
  Figma target (page, section, or frame), renames the layers in Figma to those
  keys, writes a structured JSON file, and optionally uploads it to a Lokalise
  project. Use this skill whenever the user wants to "assign content keys",
  "generate key names", "rename layers as content keys", "sync to Lokalise",
  "subir keys a Lokalise", "asignar keys de contenido", "generar nombres para
  Lokalise", "renombrar capas con keys", or "sincronizar con Lokalise" — even
  when they don't explicitly say "Lokalise" but share a Figma URL together
  with any content-key intent. For general Figma layer-name cleanup against
  MDS naming conventions (not Lokalise content keys), use `design-figma-naming`
  instead.
---

# design-content-keys-generation

This skill turns a Figma text layers into a clean Lokalise key set in three moves: read the target (page, section, or frame), rename each text layer in place to a structured key, and write a `{flow}-es_MX.json` file. From there the user can upload manually or, with `lokalise_pm` available, the skill can ship the file to Lokalise itself. The skill auto-detects the target from the Figma URL you receive — no configuration needed.

The keys follow the pattern `{flow}.{screenSlug}.{component}.{elementType}`. The full naming rules — abbreviation table, element-type derivation, collision handling — live in `references/key-naming.md`. Read that file before running Step 3.

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
2. **Initiative tag** — a short label (`warrants`, `rewards`) used both as the fallback for `flow` and as a Lokalise tag at upload time.

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
4. In Step 3, each frame uses its own `sectionName` for the flow segment

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
5. In Step 3, all frames use `sectionName: 'Approval Flow'` for the flow segment (becomes `approvalFlow`)

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
5. In Step 3, because `sectionName` is `null`, the flow falls back to `initiativeTag` (`warrants`)

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

**Error handling:** If the target cannot be found or determined, the script returns `{ error: 'message', availablePages: [...] }`. The most common case is that the file has no `Experience` page — show the user the `availablePages` list and ask which page to scan. Pass that page's node-id back through Step 2 as `targetNodeId` so the script targets it directly instead of looking for `Experience`.

## Step 3 — Build the key map

Read `references/key-naming.md`. Then, for each text node in the payload, derive the four key segments:

1. **`flow`**: `frame.sectionName` if present and non-null, else `{initiativeTag}`. CamelCase, strip leading numbers and special chars. (Note: when scanning a single frame or section without an explicit section parent, `sectionName` is `null`; use the initiative tag instead.)
2. **`screenSlug`**: `frame.frameName` with leading number stripped (`1300 - Confirmation` → `confirmation`). CamelCase.
3. **`component`**: walk the `ancestorChain` from closest to outermost. The first ancestor whose name (lowercased, segment before `/` if any) appears in the abbreviation table wins. Unknown `MDS …` ancestors get a camelCased fallback and are flagged. No MDS ancestor → `wrapper`.
4. **`elementType`**: lowercase the text layer's own name and match against the element-type table. Special case: if the closest MDS ancestor is `MDS Button`, force `label`.
5. **`value`**: use `node.characters` as-is. Placeholders like `[%s]` pass through unchanged to Lokalise.

### Key derivation examples

Same frame, different scenarios:

| Frame | `sectionName` | Flow | Key (from "Heading" layer) |
|---|---|---|---|
| Scenario A: Whole page, frame in "Warrants" section | `"Warrants"` | `warrants` | `warrants.confirmation.header.title` |
| Scenario B: "Approval Flow" section scanned | `"Approval Flow"` | `approvalFlow` | `approvalFlow.confirmation.header.title` |
| Scenario C: Single frame, no parent section | `null` | `warrants` (from tag) | `warrants.confirmation.header.title` |

The frame and component layers are always the same; only the flow segment changes based on where the frame lives in the tree.

**Two collision passes.** First pass: count how many nodes map to each `flow.screenSlug.component.elementType`. Second pass: assign keys. When the count is 1, use the base. When greater than 1, every occurrence gets a numeric suffix attached directly to the element type — `title1`, `title2`. The first occurrence is `title1`, not `title`. Numbering both sides is what makes diffs reviewable later.

**Component duplicates on the same screen.** Before the suffix pass, detect cases where two distinct MDS instances of the same component appear on the same `(flow, screenSlug)`. Replace the `component` segment with `{component}{Descriptor}` for every node in those groups, where `Descriptor` is the camelCased name of the closest non-MDS ancestor (`CTAWrapper` → `wrapperCta`). This preserves designer intent in the key name and avoids noisy `btn1` / `btn2` keys.

The output is a `keyMap` array of `{ id, key, value, layerName, ancestorChain }`, plus a `warnings` list collecting unknown MDS components, layers without a known element-type, and any duplicate-component descriptor decisions. These warnings drive the report block in Step 4.

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
> - **Editar** — dime qué cambiar (por ejemplo: "el `flow` debería ser `warrants2`", "agrega `[%s]` → `{symbol}` para 'Tu saldo es [%s]'", "no incluyas el frame X").
> - **Cancelar** — descarto la propuesta y no toco Figma.

If the user asks for edits, apply them to the in-memory `keyMap` (or rerun Step 3 with the new inputs — e.g., a renamed initiative tag, a flow override, or an excluded frame) and present the updated table again. Only proceed to Step 5 after an unambiguous "sí" / "ok" / "confirmo".

## Step 5 — Rename the text nodes in Figma

1. Use the Read tool to load the contents of `scripts/rename-nodes.js` into memory.
2. Build the renames payload: `JSON.stringify(keyMap.map(k => ({ id: k.id, key: k.key })))`.
3. Substitute the `RENAMES_PLACEHOLDER` token in the script with that JSON literal (plain string replace).
4. Call `mcp__claude_ai_Figma__use_figma` with the substituted script as `code` and the same `fileKey` from Step 1.

The script returns `{ renamed, missing, errors }`. Surface any non-empty `missing` and `errors` to the user — they signal node IDs that disappeared between scan and rename (typically a designer editing the file mid-flight). Do not retry blindly; show the failed IDs and let the designer reconcile.

## Step 6 — Write the JSON file

Build the key map and save it.

```bash
mkdir -p docs/content/project-keys
```

Write `docs/content/project-keys/{flow}-es_MX.json` using Lokalise's **structured JSON** format — each key is an object with `value`, a `platforms` array set to all four platforms, and `is_reviewed: false`. This way the keys land in Lokalise already marked as supported on iOS, Android, Web and Other, and explicitly *not* yet reviewed; no manual UI cleanup needed afterwards.

```json
{
  "warrants.successful.header.title": {
    "value": "¡Listo! Compraste {asset}",
    "platforms": ["ios", "android", "web", "other"],
    "is_reviewed": false
  },
  "warrants.successful.header.body": {
    "value": "Agregaste {quantity} {asset} a tu portafolio, equivalente a {amount} {currency}.",
    "platforms": ["ios", "android", "web", "other"],
    "is_reviewed": false
  },
  "warrants.successful.ctas.label": {
    "value": "Hacer otra operación",
    "platforms": ["ios", "android", "web", "other"],
    "is_reviewed": false
  }
}
```

Always emit `platforms: ["ios", "android", "web", "other"]` and `is_reviewed: false` for every key. The design system is cross-platform, so content keys default to supporting all four; and the JSON is source material taken directly from Figma, so it should land in Lokalise unverified — a content designer reviews and marks it verified later. Encoding this per-key in the JSON is how we express the intent, since the `upload_file` MCP doesn't expose a `mark_verified` parameter.

The file is saved before asking about upload because manual upload (Option A in Step 7) needs it on disk regardless of MCP availability — and a saved file is also the auditable artifact when something goes wrong with Lokalise.

## Step 7 — Report and ask about upload

Report the run:

```
✅ Keys generated: X
✅ Figma nodes renamed: X
✅ File saved: docs/content/project-keys/{flow}-es_MX.json

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
> selecciona `{flow}-es_MX.json` con idioma `es_MX`.
>
> **B** — Subir automáticamente vía MCP al proyecto Lokalise.

## Step 8 — Lokalise upload (only if user chose B)

Lokalise uses a **two-stage upload**: first reserve an upload URL from their File Storage Service (FSS) and PUT the file bytes to it, then tell Lokalise to ingest that staged file into the project. Treat each substep below as its own tool call — don't try to collapse them.

**8.1 — MCP availability check.** Verify `mcp__lokalise_pm__get_file_upload_url` and `mcp__lokalise_pm__upload_file` are both loaded in the session. If either is missing, tell the user the MCP isn't connected, repeat the manual-upload instructions from Option A, and stop. Do **not** try `lokalise_sd` — it's read-only and cannot upload.

**8.2 — Pick the project.** Read `references/lokalise-projects.md` and present the numbered list to the user. Wait for their choice before uploading. The IDs change rarely, but verify the list is still current with `mcp__lokalise_pm__list_lokalise_projects` if a previous run reported a project not found.

**8.3 — Reserve an upload URL.** Call `mcp__lokalise_pm__get_file_upload_url` with:

```
project_id: <selected>
filename: {flow}-es_MX.json
```

Filenames must match `^[a-zA-Z0-9._-]+$` — underscores and dots are fine, but anything else (spaces, accents, slashes) will be rejected. The response includes `upload_url` (a pre-signed FSS URL, no auth needed) and `file_id` (the handle you pass to the next step).

**8.4 — PUT the file bytes to FSS.** Use Bash to upload the JSON file directly to `upload_url`:

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  --data-binary @docs/content/project-keys/{flow}-es_MX.json \
  "<upload_url from 8.3>"
```

The URL is pre-signed, so no auth headers. `--data-binary` (not `-d`) preserves the JSON byte-for-byte. A successful PUT returns 200 with no body; anything else means the FSS rejected the upload and you should stop and report the curl output.

**8.5 — Trigger the import.** Call `mcp__lokalise_pm__upload_file` with:

```
project_id: <selected>
upload_id: <file_id from 8.3>
lang_iso: es_MX
replace_modified: true
distinguish_by_file: false
detect_icu_plurals: true
tags: ["{initiativeTag}", "Claude"]
```

Notes on the parameters:
- `lang_iso` is always `es_MX` — see `references/lokalise-projects.md` for why we keep it constant even for projects whose base language is `en`.
- `replace_modified: true` — designers regenerating keys for an updated screen should overwrite the previous values, not append duplicates.
- `distinguish_by_file: false` — Lokalise should de-duplicate by key name, not by which upload introduced the key, so re-runs from this skill stay clean.
- `detect_icu_plurals: true` — values containing ICU plural syntax (`{count, plural, ...}`) get parsed as plural forms instead of literal strings.
- Do not pass `filename`, `data`, or `mark_verified` — they aren't part of the schema and the call will fail.

**8.6 — Confirm.** The import returns a `process_id`. Poll with `mcp__lokalise_pm__get_process_status` until status is `finished`, then report:

```
✅ Upload complete — {X} keys added/updated in project "{project_name}"
   Source language: es_MX
   Pending translation: en, es_AR, es_CO, pt_BR
   Tags applied: {initiativeTag}, Claude
```

If the process ends in `failed` or `cancelled`, surface the `message` field from the status response — the JSON file on disk is still the auditable artifact, and the user can fall back to manual upload (Option A) without re-running the skill.
