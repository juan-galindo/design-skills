---
name: design-content-review
author: juan.galindo@bitso.com
compatibility: Designed for Claude Code
metadata:
  category: content
  tags:
    - content
    - review
    - ux-writing
    - compliance
description: Review written content, documentation, UI copy, or visual designs for quality, clarity, and effectiveness. Use when the user asks to "review content", "check writing", "review documentation", "review a blog post", "review README", "review copy", "proofread", "review this text", "review design", "review UI copy", "review Figma", or wants feedback on any written or visual content. Also trigger when the user shares a screen, flow, or Figma URL alongside any Bitso-related content, or asks "is this copy correct?", "does this follow the guidelines?", "revisar copy", "revisar microcopy", "check this text against brand guidelines", "está bien escrito esto?".
---

# Content Review

Review the content at $ARGUMENTS for quality, clarity, and effectiveness.

## Step 0 — Identify Locale and Load References

**Always ask the user to confirm the target locale before evaluating.** Use the `AskUserQuestion` tool:

- Question: "Which locale should I validate this content against?"
- Header: "Locale"
- Options:
  - label: "Español México (es_MX)", description: "tú forms, pesos, RFC, SPEI, 'Lo sentimos'"
  - label: "Español Argentina (es_AR)", description: "vos forms, pesos, CUIT/CUIL, 'Perdón'"
  - label: "Español Colombia (es_CO)", description: "tú forms, pesos, NIT, 'Lo sentimos'"
  - label: "Português Brasil (pt_BR)", description: "você forms, reais, CPF, Pix, 'Desculpe'"
  - label: "English US (en_US)", description: "you, dollar, American spelling, 'We're sorry'"

Wait for the user's answer, then load the following with `Read`:

**Always load:**
- `specs/content/core/voice-tone.md` — brand pillars, detailed review checklists, issues to flag
- `specs/content/core/feel-framework.md` — FEEL decision flow
- `specs/content/core/criteria.md` — evaluation criteria by content type
- `specs/content/guidelines/cta-guidelines.md` — CTA grammar by locale, patterns to flag
- `specs/content/guidelines/ux-writing-principles.md` — clarity, conciseness, errors, empty states
- `specs/content/core/system-thinking.md` — 5 context questions, content chain, heuristics
- `specs/content/localization/glossary.md` — forbidden terms, approved terms, locale register

**Load the locale file matching the user's selection:**
- es_MX → `specs/content/localization/mx.md`
- es_AR → `specs/content/localization/ar.md`
- es_CO → `specs/content/localization/co.md`
- pt_BR → `specs/content/localization/br.md`
- en_US → `specs/content/localization/en.md`

**Load conditionally by content type:**
- If reviewing a transactional email → `specs/content/types/emails.md`
- If reviewing a push notification → `specs/content/types/push-notifications.md`
- If reviewing a Help Center article → `specs/content/types/help-center/index.md`, `specs/content/types/help-center/writing-guidelines.md`, `specs/content/types/help-center/checklist.md`
- If reviewing a content strategy document → `specs/content/types/content-strategy/index.md`, `specs/content/types/content-strategy/template.md`
- If content is legal/financial (inversiones, crypto, SPEI, rendimientos, KYC) → `specs/content/localization/compliance-mx.md`

**For mechanics/style checks**, granular guideline files are available in `specs/content/guidelines/`. Load the relevant one when you detect a specific issue to verify:
`capitalization.md`, `punctuation.md`, `bullets.md`, `verbs.md`, `active-voice.md`, `abbreviations.md`, `acronyms.md`, `bold.md`, `currency.md`, `emojis.md`, `pov.md`, `symbols.md`, `time.md`, `lateral-bar.md`, `accessibility.md`, `accessibility-ctas.md`

Use the selected locale as the authoritative target for all tone, grammar, terminology, and formatting checks. Do not infer or override the user's selection. Do not evaluate any content before loading all applicable files.

---

## Step 1 — Identify Content Type

Determine what is being reviewed, then use the matching approach:

| Content Type | How to Access | Criteria to Apply |
|---|---|---|
| Written file (README, docs, blog, article) | `Read` tool | `criteria.md` — Written Documents section |
| Generic UI copy (non-Bitso) | Read file, extract user-facing strings | `criteria.md` — UI Copy section |
| Bitso in-app UI copy / screens / flows | Read file or paste | `criteria.md` UI Copy + Bitso App Copy + `feel-framework.md` + `cta-guidelines.md` + `voice-tone.md` + `glossary.md` + locale file |
| Bitso transactional email | Read file or paste | `types/emails.md` + `voice-tone.md` + `glossary.md` + locale file |
| Bitso push notification | Read file or paste | `types/push-notifications.md` + `voice-tone.md` + `glossary.md` + locale file |
| Help Center article | Read file or paste | `types/help-center/writing-guidelines.md` + `types/help-center/checklist.md` + `voice-tone.md` + `glossary.md` + locale file |
| Content strategy document | Read file or paste | `types/content-strategy/template.md` + `voice-tone.md` + `glossary.md` |
| Figma design / screenshot (non-Bitso) | Figma URL → `get_design_context`; image → `Read` | `criteria.md` — Visual Designs; UI Copy criteria on all visible text |
| Figma design / screenshot (Bitso) | Figma URL → `get_design_context`; image → `Read` | `criteria.md` Visual Designs + UI Copy + Bitso App Copy + `feel-framework.md` + `cta-guidelines.md` + `voice-tone.md` + `glossary.md` + locale file |

---

## Step 2 — Evaluate

Apply criteria from `specs/content/core/criteria.md` for the content type identified above.

**For any Bitso content** (in-app UI, emails, push notifications, Figma screens), also run:

1. **Tone check** — Use the decision flow in `specs/content/core/feel-framework.md` to identify the correct FEEL tone for the context, then assess whether the content actually uses it.

2. **Brand voice check** — Identify which pillar(s) from `specs/content/core/voice-tone.md` apply to the content type and context (use the dial up/down guidance per pillar), then assess whether the copy reflects the correct pillar. Use the **Detailed Review Checklists** and **Issues to Flag in Review** table from that file for per-pillar severity patterns.

3. **Glossary check** — Flag any violation from `specs/content/localization/glossary.md`:
   - **Forbidden terms**: "interest", "invest/investment", "savings", "profitability", "return" (financial), "view" (verb in UI) — flag each and suggest the approved alternative
   - **Fiat references**: use local currency name ("pesos", "reais") — never use "fiat" in user-facing copy
   - **Brand names**: not translated, correctly cased
   - **Locale terms**: correct variant used — cross-check against the locale file loaded in Step 0
   - **Gender/grammar**: Bitso = feminine in es; "app" = FEM in es, MASC in pt

4. **UX writing principles check** — Apply rules from `specs/content/guidelines/ux-writing-principles.md`:
   - **Clarity**: active voice, one idea per sentence, no unexplained jargon
   - **Conciseness**: cut filler phrases, enforce length limits by element type
   - **Consistency**: uniform terminology within the flow, consistent punctuation and capitalization
   - **Errors**: formula What happened + Why + What to do; never blame user or use technical language
   - **CTAs**: [Verb] + [Object] structure, no generic labels ("Aceptar", "Ok", "Siguiente", "Submit")
   - **Empty states**: Título + Cuerpo + CTA structure; correct type (first-time / cleared / no results)
   - **Loading states**: specific gerund, not generic "Cargando..."

5. **Systemic thinking check** — Apply the 5 context questions from `specs/content/core/system-thinking.md`:
   - **Entry**: does the copy work if the user arrived cold or skipped a previous step?
   - **State**: is the copy appropriate for the system state (loading, error, success, empty)?
   - **Risk**: is formality and specificity proportional to the action's risk level?
   - **Frequency**: is the detail level appropriate for first-time vs. returning user?
   - **Exit**: does the CTA correctly name the next step or flow completion?

6. **Locale check** — Using the locale file loaded in Step 0, verify:
   - Correct pronoun and verb conjugations (tú / vos / você / you)
   - Correct number and currency format
   - Regional vocabulary (computadora vs. computador, regresar vs. volver, etc.)
   - Error message phrasing matches locale convention

7. **Help Center check** *(only if reviewing a Help Center article)* — Apply the self-review checklist from `specs/content/types/help-center/checklist.md` and the writing rules from `specs/content/types/help-center/writing-guidelines.md`:
   - Title format: descriptive, action-oriented, consistent with HC title patterns
   - Structure: intro → body → summary (per `structure.md`)
   - Tone: Confident yet Approachable + Educational — not marketing, not overly technical
   - Direct references: use correct patterns (not "click here", not "see above")
   - Bold usage: only for scannable key ideas, not decorative emphasis
   - Bullets: correct period rules for conjugated vs. infinitive items
   - Flag any section missing from the required baseline structure as 🟡 Recommended.

8. **Compliance check** *(only if content includes inversiones, crypto, SPEI, rendimientos, or KYC)* — Run the pre-publication checklist from `specs/content/localization/compliance-mx.md`:
   - ¿Alguna frase promete rendimientos garantizados, sin riesgo o seguros?
   - ¿Hay predicciones de precio de activos o recomendaciones de inversión?
   - ¿Los montos usan formato correcto ($1,500.00 MXN)?
   - ¿Las pantallas de inversión/rendimiento tienen disclaimer de riesgo?
   - ¿Los tiempos de SPEI son verificables ("en minutos" / "mismo día hábil")?
   - ¿Se usan patrones de FOMO o urgencia artificial?
   - Flag any violation as 🔴 **Blocking** — regulatory risk must fix before publishing.

---

## Step 3 — Output Structured Feedback

---

**Content type**: [what was reviewed]
**Audience**: [who this is for, if determinable]
**Locale**: [es_MX / es_AR / es_CO / pt_BR / en_US]

**Summary**
2–3 sentences covering overall strengths and the most important areas to improve.

**Strengths**
- Specific things that work well, with quoted examples where helpful.

---

### FEEL Tone & Brand Voice Assessment *(Bitso content only — omit for general content)*

| Dimension | Expected | Actual | Match? |
|---|---|---|---|
| Primary FEEL tone | [Functional / Educational — based on flow frequency] | [what the content uses] | ✓ / ✗ |
| Emotional layer | [Present / Not needed] | [what the content uses] | ✓ / ✗ |
| Flow context | [daily-recurring / infrequent-involved] | [what the content implies] | ✓ / ✗ |
| Brand voice pillar | [Confident / Inspiring / Fresh — based on content type and dial up/down] | [what the content projects] | ✓ / ✗ |

---

### Compliance & Systemic Thinking Assessment *(Bitso fintech/crypto content only — omit for general content)*

**Compliance flags** (from `specs/content/localization/compliance-mx.md`):

| # | Term / Pattern | Risk | Rewrite |
|---|---|---|---|
| 1 | [forbidden term or FOMO pattern found] | 🔴 Regulatory risk | ~~Original~~ → **"Safe alternative"** |

> If no compliance issues found, write: ✅ No compliance violations detected.

**Systemic thinking flags** (from `specs/content/core/system-thinking.md`):

| Context question | Assessment |
|---|---|
| Entrada (cold entry) | [copy works / copy assumes prior context — flag if risky] |
| Estado del sistema | [correct copy for the system state] |
| Nivel de riesgo | [formality and specificity match risk level] |
| Frecuencia | [detail level appropriate for first-time / returning user] |
| Salida | [CTA correctly names next step or flow completion] |

---

**Issues** (highest impact first)

| # | Severity | Location | Issue | Rewrite |
|---|---|---|---|---|
| 1 | 🔴 Blocking | [screen / element / line] | [what is wrong and why] | ~~Original~~ → **"Rewritten copy"** |
| 2 | 🟡 Recommended | [screen / element / line] | [what is wrong and why] | ~~Original~~ → **"Rewritten copy"** |
| 3 | 🟢 Polish | [screen / element / line] | [what is wrong and why] | [brief description of the change] |

> **Severity guide**:
> - 🔴 **Blocking** — Forbidden term, wrong brand name, regulatory risk, misleading claim. Must fix before publishing. Always include a rewrite.
> - 🟡 **Recommended** — Wrong FEEL tone, clarity issue, terminology inconsistency, missing emotional layer. Strong fix that improves experience. Always include a rewrite.
> - 🟢 **Polish** — Minor wording, style, or grammar tweak. Low risk if left as-is.

**Quick Wins**
Small, low-effort changes with outsized impact.

**Scores** *(general content only — skip for Bitso content)*

| Dimension | Score |
|---|---|
| Clarity | X / 5 |
| Structure | X / 5 |
| Tone | X / 5 |
| Completeness | X / 5 |
| Grammar / Mechanics | X / 5 |

> For **Bitso in-app UI copy and flows**, replace the scores above with the FEEL checklist from `specs/content/core/feel-framework.md`.
> For **Bitso transactional emails**, replace the scores above with the FEEL checklist from `specs/content/types/emails.md`.
> For **Bitso push notifications**, replace the scores above with the FEEL checklist from `specs/content/types/push-notifications.md`.

---

> If no $ARGUMENTS are provided, ask the user to paste the content or share a file path / Figma URL.
