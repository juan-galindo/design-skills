# Content Review Criteria

Use this file to evaluate any Bitso content: UI copy, Help Center articles, emails, push notifications, or visual designs.

Always load alongside:
- `core/voice-tone.md` — voice pillars and Do/Don't examples
- `core/feel-framework.md` — tone selection and combinations
- `localization/glossary.md` — approved and forbidden terms
- Locale file for the target language (`localization/mx.md`, `localization/ar.md`, etc.)

---

## Severity Levels

Use these to prioritize feedback and decide what blocks publish.

| Level | When to use | Blocks publish? |
|---|---|---|
| **Blocking** | Regulatory violation, forbidden term, wrong locale, accessibility failure, factually incorrect | Yes |
| **Revision** | Clarity problem, tone mismatch, inconsistent terminology, missing locale format | Yes |
| **Polish** | Optional tightening — shorter phrasing, stronger verb, smoother flow | No |

---

## UI Copy and Microcopy

### Check these first — Blocking issues

- No forbidden terms: "interest", "invest/investment", "savings", "profitability", "return" (financial sense), "view" (as a verb), "fiat"
- No passive voice in action-oriented copy — see `guidelines/active-voice.md`
- No exclamation marks in error states
- No technical language exposed to users: error codes, stack traces, internal IDs (unless explicitly needed)
- Brand names are untranslated and correctly cased

### Clarity

- The message is clear on first read — user knows what happened or what to do
- Active voice: subject acts, not is acted upon
- One idea per sentence; one action per CTA
- No filler phrases — see `guidelines/ux-writing-principles.md` for the cut list

### Brevity

| Component | Limit |
|---|---|
| Tooltip | ≤ 1 sentence |
| Error message | ≤ 2 sentences |
| CTA | 2–4 words |
| Screen description | ≤ 40 words |
| Onboarding body | ≤ 25 words |

### Tone — FEEL alignment

Cross-reference `core/feel-framework.md` before marking a tone issue.

- Functional flow (daily transactions, balance checks): short, action-oriented, neutral — no emotional flourish
- Success states: Functional + Emotional layer — warm and celebratory, not excessive
- Error states: Functional + Emotional layer — empathetic and accountable, not apologetic
- Educational flows (onboarding, feature discovery): more narrative, contextual, friendly

**Error framing — shared accountability, not user blame:**

| Locale | Pattern |
|---|---|
| es_MX / es_CO | "Tuvimos un problema" / "No pudimos completar…" |
| es_AR | "Tuvimos un problema" |
| pt_BR | "Tivemos um problema" |
| en_US | "Something went wrong" / "We ran into an issue" |

### Voice pillar alignment

Cross-reference `core/voice-tone.md` for full Do/Don't examples per pillar.

- **Confident yet Approachable** — no jargon, no condescension. Default for in-app and trust moments
- **Inspiring but Down to Earth** — grounded optimism, no vague promises. Use for milestones, onboarding
- **Fresh with Purpose** — dial down for errors, security, and financial confirmations. Dial up only for brand moments

### CTAs

- Formula: **[Verb] + [Object]** — optionally + **[qualifier]**: "Retirar fondos", "Comprar Bitcoin", "Confirmar operación"
- No generic labels: "Aceptar", "Ok", "Siguiente" — name the action
- Destructive CTAs name the consequence: "Cancelar inversión", not just "Cancelar"
- Locale verb form: infinitive for es/pt Functional flows; base verb for en_US — see `guidelines/cta-guidelines.md`

### Consistency

- Same term for the same concept across the entire flow
- Capitalization: sentence case throughout — see `guidelines/capitalization.md`
- Punctuation: no period after CTAs, tooltips, or short labels. Period only in complete sentences
- Point of view is consistent: tú (es_MX / es_CO), vos (es_AR), você (pt_BR), you (en_US)
- es_AR uses vos conjugations throughout — "podés", "tenés", "hacés" — never mixed with tú

---

## Written Content

Use for Help Center articles, emails, content strategy docs, and internal documentation.

### Clarity and structure

- One idea per sentence; one topic per section
- Clear beginning (context/purpose), middle (content), end (next step or conclusion)
- Headings aid scanning — do not use them as decoration
- No assumed knowledge — prerequisites are stated upfront

### Tone

- Matches the content type: HC articles use Educational tone; emails balance Functional + Emotional
- Consistent throughout — no sudden shifts in register
- No passive-aggressive, condescending, or overly hedged language
- Matches the applicable voice pillar — see `core/voice-tone.md`

### Completeness

- All necessary information is present
- Claims are accurate and supported
- Edge cases and caveats are addressed where relevant
- For HC articles: cross-reference `types/help-center/checklist.md` before marking complete

### Mechanics

- No spelling or grammar errors
- Punctuation and capitalization are consistent — see `guidelines/punctuation.md` and `guidelines/capitalization.md`
- Locale-specific formatting for numbers, dates, and currency — see the relevant locale file and `guidelines/currency.md`