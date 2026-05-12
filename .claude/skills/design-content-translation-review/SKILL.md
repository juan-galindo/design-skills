---
name: design-content-translation-review
author: marina@bitso.com
compatibility: >
  Requires the Lokalise MCP server (`mcp__lokalise_pm__*` or `mcp__lokalise_sd__*`)
  for reading projects and translations.
metadata:
  category: content
  tags: [lokalise, translation, review, localization, qa, i18n]
description: >
  Connects to a Lokalise project, fetches automatically translated strings for a
  target locale, and reviews them against Bitso's content guidelines (glossary,
  locale rules, voice & tone, UX writing principles). Use when the user asks to
  "review translations", "check Lokalise translations", "QA auto-translated
  content", "revisar traducciones automáticas", "revisar traducciones de Lokalise",
  or wants to audit a specific locale in Lokalise.
---

# design-content-translation-review

This skill pulls translated strings from a Lokalise project and runs them through Bitso's content quality criteria: glossary compliance, locale grammar, brand voice, UX writing principles, and placeholder integrity. The output is a prioritised issues table the content team can act on immediately.

## Step 0 — Confirm project, locale, and scope

Use the `AskUserQuestion` tool to collect three things in one pass:

**Question 1 — Lokalise project**

Describe the 6 available projects and ask the user to pick one:

| # | Name | Base language | Typical audience |
|---|---|---|---|
| 1 | Alpha (mobile) | en | Mobile beta features |
| 2 | Backend | en | Internal / API strings |
| 3 | Email templates | es_MX | Transactional emails |
| 4 | Help Center Articles | en | Self-service support |
| 5 | Retail (mobile) | en | Main mobile app |
| 6 | Retail (web) | en | Web trading platform |

If the user already named a project earlier in the conversation, skip this question and use that selection.

**Question 2 — Target locale to review**

Options:
- `en` — English US
- `es_AR` — Español Argentina (vos forms)
- `es_CO` — Español Colombia (tú forms, Colombian vocabulary)
- `pt_BR` — Português Brasil (você forms, reais, Pix)

**Question 3 — Scope filter (optional)**

Ask: "Do you want to filter by a specific feature tag (e.g. `rewards`, `warrants`) or filename? Leave blank to review all keys in the project."

If blank, the skill will paginate through the full project (warn the user if the project has >500 keys that the review may take several calls).

---

## Step 1 — Load content guidelines

Before fetching any keys, load all reference files needed for evaluation. This must happen before Step 2 so the review can be applied immediately.

**Always load:**
- `specs/content/core/voice-tone.md`
- `specs/content/core/feel-framework.md`
- `specs/content/guidelines/ux-writing-principles.md`
- `specs/content/localization/glossary.md`

**Load the locale file matching the user's selection:**
- `en` → `specs/content/localization/en.md`
- `es_AR` → `specs/content/localization/ar.md`
- `es_CO` → `specs/content/localization/co.md`
- `pt_BR` → `specs/content/localization/br.md`

**Load conditionally by project:**
- Email templates project → `specs/content/types/emails.md`
- Help Center Articles project → `specs/content/types/help-center/writing-guidelines.md`

---

## Step 2 — Fetch translated keys from Lokalise

Use `mcp__lokalise_sd__list_lokalise_keys` (read-only — never modifies the project).

Look up the `project_id` from `references/lokalise-projects.md`.

Call parameters:
```
project_id: <selected>
include_translations: 1
limit: 500
```

If the user provided a tag filter, add:
```
filter_tags: <tag>
```

If the user provided a filename filter, add:
```
filter_filenames: <filename>
```

**Pagination:** If the response indicates more keys exist (total > 500), repeat the call incrementing `page` until all keys are retrieved. Inform the user of progress: "Fetching page 2 of N…"

**Extract the target locale translations.** From each key's `translations` array, pick the entry whose `language_iso` matches the selected locale. If a key has no translation for the target locale, record it as **Untranslated** (severity 🟡).

Build a working list:
```
[
  {
    key_name: string,
    source_value: string,   // es_MX or base language value
    target_value: string,   // translated value (empty if untranslated)
    tags: string[],
    is_reviewed: boolean,   // from translation.is_reviewed
    word_count: number
  },
  ...
]
```

---

## Step 3 — Review each translation

For each item in the working list, run all applicable checks in order. Assign a severity to every issue found.

### 3.1 — Glossary check (all locales)

Using `specs/content/localization/glossary.md`:

| Check | Rule | Severity |
|---|---|---|
| Forbidden financial terms | "interest", "invest/investment", "savings", "profitability", "return" — flag each and suggest approved alternative | 🔴 Blocking |
| Fiat references | Never "fiat" in user-facing copy — use local currency name ("pesos", "reais", "dollars") | 🔴 Blocking |
| Brand names | Not translated, correctly cased (Bitso, SPEI, Pix) | 🟡 Recommended |
| Locale terms | Correct regional variant used (computadora vs computador, regresar vs volver) | 🟡 Recommended |

### 3.2 — Locale grammar check

Using the locale file loaded in Step 1:

| Locale | Key checks |
|---|---|
| `en` | No Spanish/Portuguese leakage; American spelling; no literalism ("do click" instead of "click") |
| `es_AR` | `vos` + verb conjugation (`tenés`, `podés`, `hacé`); no `tú` forms; Argentine vocabulary |
| `es_CO` | `tú` + conjugation (`tienes`, `puedes`); Colombian vocabulary; no Argentine forms |
| `pt_BR` | `você` forms; Brazilian spelling (não `Portugal`); accents correct; Pix capitalised |

Severity: 🔴 Blocking for wrong pronoun register; 🟡 Recommended for vocabulary; 🟢 Polish for accent or spelling.

### 3.3 — Placeholder integrity

Placeholders (`{variable}`, `%s`, `%d`, `{{key}}`) must:
- Be present in the translation if they appear in the source
- Not be translated (the token itself must be verbatim)
- Have the same count as in the source

Severity: 🔴 Blocking if a placeholder is missing, altered, or duplicated.

### 3.4 — UX writing principles (from `specs/content/guidelines/ux-writing-principles.md`)

Apply only where the string's context can be inferred from the key name:

| Pattern | Check |
|---|---|
| CTA labels (key ends in `.ctas.label`, `.button.label`, etc.) | Must be `[Verb] + [Object]`; no "Aceptar", "Ok", "Submit", "Next" without an object |
| Error messages | Must follow What happened + Why + What to do formula; no user blame |
| Empty states | If title + body detected: structure must have CTA |
| Length | Translate must not exceed 1.5× the source string length (MT often bloats strings) |

Severity: 🟡 Recommended for structure; 🟢 Polish for length.

### 3.5 — Brand voice spot-check (sample only)

Select up to 10 keys that contain full sentences (word_count > 5). For each, apply the FEEL decision flow from `specs/content/core/feel-framework.md`:

- Identify the likely FEEL tone from the key name context (functional daily vs. educational involved)
- Flag if the translation sounds overly formal, robotic, or loses the warm/fresh tone of the source

Severity: 🟡 Recommended.

---

## Step 4 — Output structured report

---

**Project**: [project name]
**Locale reviewed**: [locale ISO + full name]
**Keys fetched**: N total | N translated | N untranslated | N already reviewed
**Scope filter**: [tag or filename if applied, else "all keys"]

**Summary**
2–3 sentences: overall translation quality, most common issue type, and whether blocking issues require immediate attention.

---

### Blocking issues 🔴

| # | Key | Source (es_MX) | Translation | Issue | Suggested fix |
|---|---|---|---|---|---|
| 1 | `feature.screen.component.element` | "source text" | "translated text" | [what rule was violated] | "corrected translation" |

> If none: ✅ No blocking issues found.

---

### Recommended fixes 🟡

| # | Key | Source | Translation | Issue | Suggested fix |
|---|---|---|---|---|---|
| 1 | … | … | … | … | … |

> If none: ✅ No recommended fixes.

---

### Polish 🟢

| # | Key | Issue | Suggested fix |
|---|---|---|---|
| 1 | … | … | … |

---

### Untranslated keys

| Key | Source value | Tags |
|---|---|---|
| … | … | … |

> If none: ✅ All fetched keys have translations for this locale.

---

**Score summary**

| Dimension | Issues found |
|---|---|
| Glossary compliance | N blocking, N recommended |
| Locale grammar | N blocking, N recommended |
| Placeholder integrity | N blocking |
| UX writing principles | N recommended, N polish |
| Brand voice | N recommended |

---

## Step 5 — Ask about next steps

After delivering the report, ask:

> **What would you like to do next?**
>
> **A** — Export this report as a CSV or markdown file for the content team.
>
> **B** — Open specific keys in Lokalise to fix them manually. I can give you direct deep-link URLs to each blocking key.
>
> **C** — Re-run with a different locale or scope filter.
>
> **D** — Done.

If the user picks **B**, format deep-link URLs using:
```
https://app.lokalise.com/project/{project_id}/?view=multi#/filter/key_name/{key_name}
```

If the user picks **A**, write the report to `docs/content/translation-review/{project_slug}-{locale}-{date}.md`.
