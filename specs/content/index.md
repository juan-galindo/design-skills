# Content Index

Source of truth for all Bitso UX writing guidelines.
---

## How to Consume

```
Read specs/content/index.md → find the file for your topic → Read that file → apply guidelines
```

Skills embed file paths directly in their preload step. See the Skill Preload Map below.

---

## Skill Preload Map

| Skill | Always load | Load conditionally |
|---|---|---|
| `design-content-write` | `core/voice-tone.md`, `core/feel-framework.md`, `core/system-thinking.md`, `core/criteria.md`, `guidelines/ux-writing-principles.md`, `guidelines/cta-guidelines.md`, `localization/glossary.md` + **locale file for the target language** | `types/emails.md` + `types/push-notifications.md` (if email/push task) · `localization/compliance-mx.md` (if MX copy or regulatory review) |
| `design-content-review` | `core/voice-tone.md`, `core/feel-framework.md`, `core/criteria.md`, `guidelines/cta-guidelines.md`, `guidelines/ux-writing-principles.md`, `localization/glossary.md` + **locale file for the target language** | `localization/compliance-mx.md` (if legal/MX content) · `types/emails.md` + `types/push-notifications.md` (if reviewing email or push) |

---

## Tier 1 — Core

Universal principles that apply to all content types and locales.

| File | What it covers |
|---|---|
| `core/voice-tone.md` | Brand voice pillars (Confident, Inspiring, Fresh), content principles, MX-SP first rationale, FEEL applied to design, microcopy tone examples, issues to flag in review |
| `core/feel-framework.md` | FEEL tone decision flow (Functional, Emotional, Educational, Learning), tone combinations, locale application notes |
| `core/system-thinking.md` | UX writing methodology: 5 context questions, content chain model, terminology systems, emotional arc mapping, copy debt signals, 7 heuristics |
| `core/criteria.md` | Review criteria for written docs, UI copy, Bitso app copy, and visual designs; scoring guide |
| `core/prompts.md` | AI prompts for writing and localizing HC articles |

---

## Tier 2 — Guidelines

Rules for specific writing patterns, formatting, and component types.

| File | What it covers |
|---|---|
| `guidelines/ux-writing-principles.md` | Clarity, conciseness, consistency, error messages, empty states, CTAs, onboarding, notifications, loading states, placeholders |
| `guidelines/cta-guidelines.md` | CTA grammar by locale (infinitive for es/pt, base verb for en), approved vocabulary, capitalization, accessibility rules, patterns to flag |
| `guidelines/abbreviations.md` | Sentence case for abbreviations, period usage, accessibility warning |
| `guidelines/acronyms.md` | Acronym rules and usage |
| `guidelines/accessibility.md` | Inclusive content guidelines, screen reader rules, clear language principles |
| `guidelines/accessibility-ctas.md` | Accessible CTA writing: ableist verbs, sensory verbs |
| `guidelines/active-voice.md` | Active vs passive voice rules |
| `guidelines/bold.md` | Bold scannable standalone ideas; exception for labels, titles, section names |
| `guidelines/bullets.md` | When to use bullets; period rules for conjugated vs. infinitive bullets |
| `guidelines/capitalization.md` | Sentence case rule, proper nouns, section names, tickers/currency codes, post-number words |
| `guidelines/currency.md` | Currency formatting rules by locale |
| `guidelines/emojis.md` | Emoji usage rules in product copy |
| `guidelines/lateral-bar.md` | No spaces around /; capitalization rules; gender-inclusive forms; accessibility warning |
| `guidelines/pov.md` | Point of view guidelines |
| `guidelines/punctuation.md` | Punctuation rules: Colon, Comma, Dash, Ellipsis, Exclamation/Question marks, Hyphen, Parenthesis, Period, Semicolon, Slash |
| `guidelines/symbols.md` | Symbol usage rules: & and % |
| `guidelines/time.md` | Time and date formatting rules |
| `guidelines/verbs.md` | Verb usage: gerund, future tense, contracted forms |

---

## Tier 3 — Types

Rules and templates by content format (what you're producing).

### Help center

| File | What it covers |
|---|---|
| `types/help-center/index.md` | HC article structure, tone by article type, overview |
| `types/help-center/workflow.md` | HC creation and publication workflow |
| `types/help-center/content-strategy.md` | HC-specific content strategy guidance |
| `types/help-center/structure.md` | HC article structure rules |
| `types/help-center/templates.md` | HC article templates |
| `types/help-center/writing-guidelines.md` | HC writing guidelines |
| `types/help-center/checklist.md` | HC self-review checklist before publishing |

### Content strategy

| File | What it covers |
|---|---|
| `types/content-strategy/index.md` | Content strategy doc naming, ownership model, template link |
| `types/content-strategy/template.md` | Full content strategy template: overview, touchpoints, FEEL application, messaging pillars, terminology, GTM, compliance, roadmap, HC articles |

### Other types

| File | What it covers |
|---|---|
| `types/emails.md` | Transactional email structure (subject/title/body/table/footer), state-by-state patterns (deposits/withdrawals), FEEL checklist |
| `types/push-notifications.md` | Push notification rules, value-first structure, tone by context, FEEL checklist |
| `types/asset-bios.md` | Crypto/stock/ETF asset bio guidelines |

---

## Tier 4 — Localization

Language-specific rules. Load only the locale file relevant to the task. Always load `glossary.md` for shared term reference.

### Shared reference (all locales)

| File | What it covers |
|---|---|
| `localization/glossary.md` | Forbidden/restricted terms, brand terms, key term translations across all 5 locales, gender notes, CDS UI term decisions |

### Per-language files

| File | Locale | What it covers |
|---|---|---|
| `localization/mx.md` | SP-MX | Register, tú conjugations, error messages, number/currency formats, RFC/SPEI/CLABE rules, grammar (App=femenino), regulatory context |
| `localization/ar.md` | SP-AR | Vos conjugations (podés/tenés/hacés), imperative forms (andá/tocá), vocabulary differences from MX, Perdón for errors |
| `localization/co.md` | SP-CO | tú forms (same as MX), vocabulary differences (computador, NIT, departamento), Lo sentimos for errors |
| `localization/br.md` | PT-BR | Você conjugations, infinitive CTAs, number formats (reverse of es_MX: 1.000,25), vocabulary (aba, clicar, dinheiro), Pix rules |
| `localization/en.md` | EN-US | Base verb CTAs (Buy/Send), American English spelling, contractions, click vs. tap, date format MM/DD/YYYY |

### Compliance (MX only)

| File | What it covers |
|---|---|
| `localization/compliance-mx.md` | CNBV/CONDUSEF/Ley Fintech framework, prohibited copy patterns, required disclaimers, pre-publication checklist |
