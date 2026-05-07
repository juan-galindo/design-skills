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
  Generates structured Lokalise content keys for every visible text node on the
  "Experience" page of a Figma file, renames the layers in Figma to those keys,
  exports a JSON file, and optionally uploads it to a Lokalise project. Use this
  skill whenever the user wants to "assign content keys", "connect keys to
  Figma", "sync to Lokalise", "generate key names", "extract copy", "prepare a
  Figma file for localization", or shares a Figma URL together with any
  Lokalise / i18n / content-key intent — even when they don't explicitly say
  "Lokalise".
---

# design-content-keys-generation

This skill turns a Figma prototype's text layers into a clean Lokalise key set in three moves: read the Experience page, rename each text layer in place to a structured key, and write a `{feature}-es_MX.json` file. From there the user can upload manually or, with `lokalise_pm` available, the skill can ship the file to Lokalise itself.

The keys follow the pattern `{feature}.{screenSlug}.{component}.{elementType}`. The full naming rules — abbreviation table, element-type derivation, collision handling — live in `references/key-naming.md`. Read that file before running Step 3.

## Bundled resources

| Path | Purpose |
|---|---|
| `scripts/scan-experience.js` | The Figma plugin script for Step 2. Pass its contents verbatim as the `code` argument of `mcp__claude_ai_Figma__use_figma`. |
| `scripts/rename-nodes.js` | The Figma plugin script for Step 4. Substitute `RENAMES_PLACEHOLDER` with the JSON-encoded list of `{id, key}` pairs before calling `use_figma`. |
| `references/key-naming.md` | Full key naming rules, abbreviation table, element-type rules, collision rules. |
| `references/icu-lookup.md` | Lookup table that maps `[%s]` placeholders to ICU named variables. |
| `references/lokalise-projects.md` | Project IDs and base languages for the upload step. |

## Step 1 — Get the target

Ask the user (or extract from earlier turns):

1. **Figma file URL** — `https://figma.com/design/:fileKey/:fileName?...`. Extract `{fileKey}` from the path. For branch URLs (`/design/:fileKey/branch/:branchKey/...`), use `branchKey` as the file key — that's where the in-progress designs actually live.
2. **Initiative tag** — a short label (`warrants`, `rewards`) used both as the fallback for `feature` (when the Figma file has no SECTION on the Experience page) and as a Lokalise tag at upload time.

If either is missing, ask once and stop. Don't guess — a wrong tag pollutes the Lokalise project.

## Step 2 — Scan the Experience page

Call `mcp__claude_ai_Figma__use_figma` with:

- `fileKey`: `{fileKey}` from Step 1
- `description`: `"Scan Experience page for text nodes and ancestor chain"`
- `code`: the full contents of `scripts/scan-experience.js`

The script returns:

```js
{
  frameCount: number,
  totalTextNodes: number,
  frames: [{
    frameId, frameName, sectionName,
    textNodes: [{ id, name, characters, ancestorChain }]
  }]
}
```

If the response contains `error: 'No page named "Experience"...'`, stop and tell the user which pages do exist (the script returns `availablePages`). The skill is hard-scoped to a page literally named `Experience` because that convention is how the design team separates production-ready prototypes from exploration; running on other pages would generate keys for sketches.

## Step 3 — Build the key map

Read `references/key-naming.md` and `references/icu-lookup.md`. Then, for each text node in the payload, derive the four key segments and the ICU-resolved value:

1. **`feature`**: `frame.sectionName` if present, else `{initiativeTag}`. CamelCase, strip leading numbers and special chars.
2. **`screenSlug`**: `frame.frameName` with leading number stripped (`1300 - Confirmation` → `confirmation`). CamelCase.
3. **`component`**: walk the `ancestorChain` from closest to outermost. The first ancestor whose name (lowercased, segment before `/` if any) appears in the abbreviation table wins. Unknown `MDS …` ancestors get a camelCased fallback and are flagged. No MDS ancestor → `wrapper`.
4. **`elementType`**: lowercase the text layer's own name and match against the element-type table. Special case: if the closest MDS ancestor is `MDS Button`, force `label`.
5. **`value`**: replace each `[%s]` in `node.characters` using the ICU lookup. Match the **longest** context substring whose own placeholder count equals the node's; otherwise fall back to `{param1}`, `{param2}`, … and add to the unmatched-ICU warning list.

**Two collision passes.** First pass: count how many nodes map to each `feature.screenSlug.component.elementType`. Second pass: assign keys. When the count is 1, use the base. When greater than 1, every occurrence gets a numeric suffix attached directly to the element type — `title1`, `title2`. The first occurrence is `title1`, not `title`. Numbering both sides is what makes diffs reviewable later.

**Component duplicates on the same screen.** Before the suffix pass, detect cases where two distinct MDS instances of the same component appear on the same `(feature, screenSlug)`. Replace the `component` segment with `{component}{Descriptor}` for every node in those groups, where `Descriptor` is the camelCased name of the closest non-MDS ancestor (`CTAWrapper` → `wrapperCta`). This preserves designer intent in the key name and avoids noisy `btn1` / `btn2` keys.

The output is a `keyMap` array of `{ id, key, value, layerName, ancestorChain }` plus an `unmatchedIcu` warnings list.

## Step 4 — Show the proposal and ask for confirmation

Before touching Figma or writing any file, show the user a markdown table of the proposed keys and wait for explicit approval. The Figma rename in Step 5 cannot be cleanly undone from the agent side, and the JSON file becomes the upstream source for Lokalise — so a once-over by the designer is what catches a wrong section name, a layer that should have been hidden, or an MDS component this skill couldn't classify, before any of that propagates.

Group the table by frame so the designer can scan it the same way they scan the prototype:

```
### {sectionName} → {frameName}  ({N} keys)

| Layer | Component | Element | Key | Value |
|---|---|---|---|---|
| Heading | header | title | warrants.successful.header.title | ¡Listo! Compraste {asset} |
| Paragraph | header | body | warrants.successful.header.body | Agregaste {quantity} {asset}… |
| Label | ctas | label | warrants.successful.ctas.label | Hacer otra operación |
```

Below the tables, surface anything the designer should know before approving:

```
⚠️  Unmatched ICU placeholders → fall back to {param1}, {param2}:
  - "Tu saldo es [%s] [%s]"

⚠️  Unknown MDS components → camelCased name used:
  - MDS NewThing → newThing  (4 nodes)

⚠️  Layer names without a known element-type → camelCased fallback:
  - "Disclaimer" → disclaimer  (2 nodes)
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

⚠️  Unmatched ICU placeholders (update references/icu-lookup.md):
  - "Tu saldo es [%s] [%s]" → replaced with {param1}, {param2}

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
tags: ["sdd-prototype", "{feature}", "{initiativeTag}"]
```

`lang_iso` is always `es_MX` — see `references/lokalise-projects.md` for why we keep it constant even for projects whose base language is `en`.

**Confirm.** The upload returns a `process_id`. Poll with `mcp__lokalise_pm__get_process_status` until status is `finished`, then report:

```
✅ Upload complete — {X} keys added/updated in project "{project_name}"
   Source language: es_MX
   Pending translation: en, es_AR, es_CO, pt_BR
```
