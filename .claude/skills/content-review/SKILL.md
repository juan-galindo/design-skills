---
name: content-review
description: Review written content, documentation, UI copy, or visual designs for quality, clarity, and effectiveness. Use when the user asks to "review content", "check writing", "review documentation", "review a blog post", "review README", "review copy", "proofread", "review this text", "review design", "review UI copy", "review Figma", or wants feedback on any written or visual content.
---

# Content Review

Review the content at $ARGUMENTS for quality, clarity, and effectiveness.

## Contexto de referencia — leer al activar

Al iniciar esta habilidad, lee los siguientes archivos de referencia con el tool `Read` antes de evaluar cualquier contenido:

Todas las referencias viven en `~/.claude/skills/content-write/references/`:

1. `criteria.md` — Criterios de evaluación por tipo de contenido.
2. `feel-framework.md` — Decision flow para identificar el tono FEEL correcto.
3. `glossary.md` — Términos prohibidos, aprobados y reglas de localización.
4. `cta-guidelines.md` — Reglas para CTAs y botones.
5. `bitso-tone-of-voice.md` — Los tres pilares de voz de Bitso, ejemplos de microcopy por pilar y patrones a marcar en revisión.
6. `ux-writing-principles.md` — Principios de claridad, concisión, consistencia, errores, empty states, CTAs, onboarding y notificaciones en es_MX fintech.
7. `system-thinking.md` — Framework de pensamiento sistémico: cadenas de contenido, arcos emocionales y heurísticas.

**Solo si el contenido es Bitso fintech/crypto** (inversiones, crypto, SPEI, rendimientos, KYC), leer también desde `~/.claude/skills/content-review/references/`:
- `compliance-mx.md` — Términos prohibidos, disclaimers requeridos, terminología correcta y checklist pre-publicación para fintech/crypto en México.

**Solo si el usuario especifica que está revisando un email o push notification**, leer también:
- `transactional-emails.md` — Criterios específicos para emails transaccionales y push notifications.

No evalúes contenido antes de haber cargado los archivos que apliquen.

---

## Step 0 — Identify Locale

**Always ask the user to confirm the target locale before evaluating.** Use the `AskUserQuestion` tool with the following question and options:

- Question: "Which locale should I validate this content against?"
- Header: "Locale"
- Options:
  - label: "Español México (es_MX)", description: "tú forms, pesos, RFC, SPEI, 'Lo sentimos'"
  - label: "Español Argentina (es_AR)", description: "vos forms, pesos, CUIT/CUIL, 'Perdón'"
  - label: "Español Colombia (es_CO)", description: "tú forms, pesos, NIT, 'Lo sentimos'"
  - label: "Português Brasil (pt_BR)", description: "você forms, reais, CPF, Pix, 'Desculpe'"
  - label: "English US (en_US)", description: "you, dollar, American spelling, 'We're sorry'"

Wait for the user's answer before proceeding. Use the selected locale as the authoritative target for all tone, grammar, terminology, and formatting checks throughout the review. Do not infer or override the user's selection.

## Step 1 — Identify Content Type

Determine what is being reviewed, then use the matching approach:

| Content Type | How to Access | Criteria to Apply |
|---|---|---|
| Written file (README, docs, blog, article) | Read with the `Read` tool | criteria.md — Written Documents |
| Generic UI copy in code (non-Bitso) | Read file and extract user-facing strings | criteria.md — UI Copy |
| Bitso in-app UI copy / screens / flows | Read file or paste | criteria.md — UI Copy + Bitso App Copy + feel-framework.md + cta-guidelines.md + tone-of-voice.md + glossary.md |
| Bitso transactional email or push notification | Read file or paste | transactional-emails.md *(load only for this type)* + bitso-tone-of-voice.md + glossary.md |
| Figma design / screenshot (non-Bitso) | Figma URL → `get_design_context`; image file → `Read` | criteria.md — Visual Designs; apply UI Copy criteria to all visible text |
| Figma design / screenshot (Bitso) | Figma URL → `get_design_context`; image file → `Read` | criteria.md — Visual Designs + UI Copy + Bitso App Copy + feel-framework.md + cta-guidelines.md + tone-of-voice.md + glossary.md |

## Step 2 — Evaluate

Apply criteria from [references/criteria.md](references/criteria.md) for the content type identified above.

**For any Bitso content** (in-app UI, emails, push notifications, Figma screens), also do:

1. **Tone check** — Use the decision flow in [references/feel-framework.md](references/feel-framework.md) to identify the correct FEEL tone for the context, then assess whether the content actually uses it.
2. **Brand voice check** — Identify which pillar(s) from `bitso-tone-of-voice.md` apply to the content type and context (dial up/down guidance), then assess whether the copy reflects the correct pillar and doesn't fall into the listed common mistakes. Use the **Issues to Flag in Review** table for pre-classified severity patterns.
3. **Glossary check** — Flag any violation from [references/glossary.md](references/glossary.md):
   - **Forbidden terms**: "interest", "invest/investment", "savings", "profitability", "return" (financial), "view" (verb in UI) — flag each and suggest the approved alternative
   - **Fiat references**: use local currency name ("pesos", "reais") — never use the word "fiat" in user-facing copy
   - **Brand names**: not translated, correctly cased
   - **Locale terms**: correct variant used (es_MX / es_AR / es_CO / pt_BR / en_US)
   - **Gender/grammar**: Bitso = feminine in es; "app" = FEM in es, MASC in pt
4. **UX writing principles check** — Apply rules from `ux-writing-principles.md` for the content type:
   - **Clarity**: voz activa, una idea por oración, sin jerga técnica sin explicación
   - **Concisión**: cortes de frases innecesarias, límites de longitud por tipo de elemento
   - **Consistencia**: terminología uniforme dentro del flujo, puntuación y capitalización coherentes
   - **Errores**: fórmula Qué pasó + Por qué + Qué hacer; nunca culpar al usuario ni usar lenguaje técnico
   - **CTAs**: estructura [Verbo] + [Objeto], sin labels genéricos ("Aceptar", "Ok", "Siguiente")
   - **Estados vacíos**: estructura Título + Cuerpo + CTA; tipo correcto (primera vez / limpiado / sin resultados)
   - **Estados de carga**: gerundio específico, no "Cargando..." genérico
5. **Systemic thinking check** — Apply the 5 context questions from `system-thinking.md` to UI copy and flows:
   - Entrada: ¿el copy funciona si el usuario llegó en frío o saltó un paso previo?
   - Estado: ¿el copy es apropiado para el estado del sistema (carga, error, éxito, vacío)?
   - Riesgo: ¿la formalidad y especificidad son proporcionales al nivel de riesgo de la acción?
   - Frecuencia: ¿el nivel de detalle es apropiado para primera vez vs. usuario recurrente?
   - Salida: ¿el CTA nombra correctamente el siguiente paso o la finalización del flujo?
6. **Compliance check (es_MX fintech/crypto)** *(solo si el contenido incluye inversiones, crypto, SPEI, rendimientos o KYC)* — Run the pre-publication checklist from `compliance-mx.md`:
   - ¿Alguna frase promete rendimientos garantizados, sin riesgo o seguros?
   - ¿Hay predicciones de precio de activos o recomendaciones de inversión?
   - ¿Los montos usan formato correcto ($1,500.00 MXN)?
   - ¿Las pantallas de inversión/rendimiento tienen disclaimer de riesgo?
   - ¿Los tiempos de SPEI son verificables ("en minutos" / "mismo día hábil")?
   - ¿Se usan patrones de FOMO o urgencia artificial?
   - Flag any violation as 🔴 **Blocking** — regulatory risk must fix before publishing.

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

**Compliance flags** (from `compliance-mx.md`):

| # | Term / Pattern | Risk | Rewrite |
|---|---|---|---|
| 1 | [forbidden term or FOMO pattern found] | 🔴 Regulatory risk | ~~Original~~ → **"Safe alternative"** |

> If no compliance issues found, write: ✅ No compliance violations detected.

**Systemic thinking flags** (from `system-thinking.md`):

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
| 3 | 🟢 Polish | [screen / element / line] | [what is wrong and why] | [brief description of the change is sufficient] |

> **Severity guide**:
> - 🔴 **Blocking** — Forbidden term, wrong brand name, regulatory risk, misleading claim, or content that could harm the user's decision. Must fix before publishing. **Always include a rewrite.**
> - 🟡 **Recommended** — Wrong FEEL tone for the context, clarity issue, terminology inconsistency, missing emotional layer. Strong fix that improves experience. **Always include a rewrite.**
> - 🟢 **Polish** — Minor wording, style, or grammar tweak. Low risk if left as-is. A brief description of the change is enough.

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

> For **Bitso in-app UI copy and flows**, replace the scores above with the FEEL checklist from [references/feel-framework.md](references/feel-framework.md).
> For **Bitso transactional emails and push notifications**, replace the scores above with the FEEL checklist from [references/transactional-emails.md](references/transactional-emails.md).

---

> If no $ARGUMENTS are provided, ask the user to paste the content or share a file path / Figma URL.
