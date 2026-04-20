# Content Review Criteria

---

## Written Documents (READMEs, Docs, Blog Posts, Articles)

### Clarity & Readability
- Writing is clear and easy to understand on first read
- Sentences are concise — no unnecessary wordiness
- Jargon is either explained or avoided for the intended audience
- Reading level is appropriate for the target reader

### Structure & Organization
- Content has a logical, predictable flow
- Headings and sections are used effectively to aid scanning
- There is a clear beginning (context/purpose), middle (content), and end (next steps/conclusion)
- Transitions between sections are smooth

### Tone & Voice
- Tone is consistent throughout the piece
- Appropriate for the context (technical vs. accessible, formal vs. casual)
- Matches the brand, product, or persona if applicable
- Avoids passive-aggressive, condescending, or overly hedged language

### Completeness & Accuracy
- All necessary information is present — nothing critical is missing
- Claims are accurate and supported with evidence or examples
- Prerequisites, context, and assumptions are stated upfront
- Edge cases and caveats are addressed where relevant

### Grammar & Mechanics
- No spelling or grammar errors
- Punctuation is correct and consistent
- Capitalization and formatting are consistent throughout
- Lists and code blocks are formatted properly (for technical docs)

---

## UI Copy / Microcopy

### Clarity
- The message is understandable at a glance
- The user knows exactly what action to take or what happened
- No jargon, technical terms, or internal naming

### Brevity
- As short as possible without losing meaning
- No filler words ("Please be advised that…", "In order to…")
- Labels are 1–3 words; descriptions are 1–2 sentences max

### Tone
- Friendly and human without being overly casual
- Consistent with the product's voice and style guide
- Non-alarming for informational messages; appropriately urgent for errors

### Actionability
- CTAs are specific and describe the outcome ("Save changes", not "OK")
- Error messages explain: (1) what went wrong, (2) how to fix it
- Empty states explain what the section is for and what the user can do
- Confirmation dialogs are clear about the consequences of each action

### Consistency
- Same terminology used throughout the product (don't mix "Delete" and "Remove")
- Consistent capitalization style (sentence case vs. title case)
- Placeholders and helper text follow a consistent pattern

---

## Bitso App Copy

Use this section alongside the **UI Copy** criteria above when reviewing any Bitso in-app content (screens, flows, modals, empty states, error messages, onboarding). Always cross-reference [feel-framework.md](feel-framework.md) and [glossary.md](glossary.md).

### Tone–Context Match
- The FEEL tone matches the flow frequency: Functional for daily/recurring actions, Educational for infrequent or discovery flows
- The Emotional layer is present where appropriate (success, welcome, error recovery) — but never as the only tone
- Error messages are empathetic and accountable — use shared-accountability framing, not user-blaming language:
  - es_MX / es_CO: "Tuvimos un problema"
  - es_AR: "Tuvimos un problema" (vos form not needed here as subject is "we")
  - pt_BR: "Tivemos um problema"
  - en_US: "Something went wrong" / "We ran into an issue"
- Success states include positive reinforcement without being excessive

### Flow State Alignment
- **Confirmation / in-progress**: copy sets the right expectation, neutral and factual
- **Success**: warm and celebratory (exclamation appropriate in subject/title, not body)
- **Error / failed**: accountable and actionable — tells the user what to do next
- **Empty states**: explain what the section is for and what the user can do to get started
- **Onboarding / first-use**: educational tone, clear step progression, no assumed knowledge

### Voice & Phrasing
- Second person is consistent throughout the flow: "tú" (es_MX / es_CO), "vos" (es_AR), "você" (pt_BR), "you" (en_US)
- es_AR copy uses vos conjugations consistently — "podés", "tenés", "hacés" — never mixed with tú forms
- No passive voice or impersonal constructions in action-oriented copy
- CTAs use infinitive verbs for es/pt (Functional flows); base verb form for en_US — see [cta-guidelines.md](cta-guidelines.md)
- Copy does not talk down to the user or over-explain in Functional flows

### Regulatory & Terminology Safety *(Blocking issues — check these first)*
- No forbidden terms: "interest", "invest/investment", "savings", "profitability", "return" (financial), "view" (verb)
- No use of "fiat" in user-facing copy — use local currency name instead
- "Rewards" and earnings always specify crypto vs. fiat
- Brand names are untranslated and correctly cased

### Brand Voice Pillar Alignment
Check against [tone-of-voice.md](tone-of-voice.md) for the applicable pillar and context:
- **Confident yet Approachable**: no jargon, no condescension, no complexity-for-its-own-sake — default for in-app and trust-building moments
- **Inspiring but Down to Earth**: grounded optimism, no vague promises or empty hype — use for motivational CTAs, milestone copy, onboarding
- **Fresh with Purpose**: originality that serves clarity or emotion — dial DOWN for errors, security, financial confirmations; dial UP only for brand/campaign moments
- "Fresh" tone is never appropriate for error states, security alerts, or financial transaction confirmations
- Copy doesn't fall into the common mistakes listed per pillar (preachy, overhyped, forced creativity)

### Cognitive Load
- Functional flow copy is scannable: short sentences, clear labels, no filler phrases
- Educational flow copy doesn't overload with information — breaks complex concepts into digestible steps
- Numbers, amounts, and dates follow the locale format (not generic)

---

## Visual Designs / Figma / Images

When reviewing a visual design, use the Figma MCP tools:
- **Figma URL provided**: call `get_design_context` with the fileKey and nodeId
- **Screenshot or image**: use `Read` to view the image directly

### Visual Hierarchy
- The most important element is visually prominent
- Information is organized so the eye naturally follows the intended reading order
- Whitespace is used effectively to group related elements

### Copy Within the Design
- Apply all **UI Copy** criteria above to any text visible in the design
- Labels and headings match the actual functionality they represent
- Error and success states have appropriate copy

### Consistency
- Spacing, typography, and color are consistent across the design
- Components appear to follow a design system or style guide
- Icons and visual language are used consistently

### Accessibility
- Body text is a readable size (≥16px / 12pt equivalent)
- Sufficient contrast between text and background (WCAG AA minimum: 4.5:1 for normal text)
- Color is not the sole means of conveying information
- Interactive elements are clearly distinguishable from static ones

---

## Scoring Guide

| Score | Meaning |
|---|---|
| 5 / 5 | Excellent — publish-ready, no significant issues |
| 4 / 5 | Good — minor polish needed |
| 3 / 5 | Acceptable — several noticeable issues to address |
| 2 / 5 | Needs work — significant revisions required |
| 1 / 5 | Major rewrite needed |
