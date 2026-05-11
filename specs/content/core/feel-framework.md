# FEEL Framework — Bitso Content Tone

Source: FeelFramework.pdf (Bitso, Q2 2025 revamp)

---

## Purpose

The FEEL (Function, Emotion, Education & Learning) framework guides content creation across the Bitso app by ensuring every touchpoint addresses three pillars: **functionality**, **emotion**, and **education**.

Goal: make every interaction meaningful — whether guiding users toward a financial decision, delighting them with micro-interactions, or teaching them about cryptocurrency.

---

## Tone Combinations at a Glance

The Emotional tone is **never standalone** — it always layers over a primary tone. There are only two valid combinations:

| Primary tone | + Emotional layer | Result | Typical context |
|---|---|---|---|
| Functional | Optional | Neutral + warm | Daily transactions, balance checks, CTAs |
| Functional | Required | Neutral + celebratory | Success states, confirmations |
| Functional | Required | Neutral + empathetic | Error states, failed transactions |
| Educational | Optional | Contextual + friendly | Feature discovery, onboarding, FAQs |

> There is no "pure Emotional" content in the Bitso app. If a piece of copy only has warmth and no function or education, it's missing its primary purpose.

---

## The Three Tones

### Functional Tone

**Goal**: Efficiency and clarity. Help users complete tasks quickly and accurately.

**When to use**: Daily or very frequent flows — recurrent transactions, checking balances, reviewing transaction status.

**Characteristics**:
- Simple, short, action-oriented copy
- Infinitive verbs
- Neutral tone
- Instructional approach
- Microcopy guidance

**Examples**:
- Action confirmation: "Vas a comprar 0.000025 BTC"
- Balance display: "Saldo disponible: $1,250.75"
- Transaction history: "Ver detalles de la transacción"
- Input field label: "Ingresa el monto a enviar"

---

### Emotional Tone

**Goal**: Build trust and rapport. Make users feel supported and understood. Create small but memorable moments that encourage return engagement.

**When to use**: Not a standalone tone — it's a **layer** applied on top of Functional or Educational content to add a human touch.

**Characteristics**:
- Friendly and approachable language
- Empathetic phrasing, especially in error or confirmation messages
- Positive reinforcement

**Examples**:
- Welcome message: "¡Hola! Qué bueno verte por aquí."
- Success confirmation: "¡Listo! Compraste 0.000025 BTC."
- Encouragement: "¡Sigue así! Estás avanzando en tus metas."

---

### Educational Tone

**Goal**: Empower users with knowledge and confidence to make informed decisions. Foster long-term learning.

**When to use**: Flows where the user is seeking information or performing a less common / more involved action.

**Characteristics**:
- More narrative and contextual copy
- Questions to engage the user
- Supportive language
- Guidance and explanations

**Examples**:
- Feature explanation: "¿Sabías que puedes programar compras recurrentes de cripto? Es una forma fácil de invertir poco a poco."
- Onboarding: "Primero, verifica tu identidad. Esto nos ayuda a mantener tu cuenta segura."
- Investment tips: "¿Te gustaría diversificar tu portafolio? Aquí te damos algunas ideas."
- FAQ section: "¿Cómo enviar dinero? Te explicamos paso a paso."

---

## Decision Flow

Use this sequence to determine the right tone:

1. **Is the flow performed on a daily / very frequent basis?**
- Yes → **Functional** (+ Emotional layer): simple, short, action-oriented copy with infinitive verbs, neutral tone, microcopy guidance.
- No → Go to step 2.

2. **Is it a recurrent transaction action (status check, balance review)?**
- Yes → **Functional** (+ Emotional layer).
- No → Go to step 3.

3. **Is the flow aimed to solve specific needs on a less recurrent basis?**
- Yes → Is the user performing a more informed/custom action?
- Yes → **Educational** (+ Emotional layer): narrative and contextual copy, questions, supportive language, longer details.
- No → Default to **Functional**.

> The Emotional tone is always a layer — never standalone. It adds warmth to whichever primary tone is used.

---

## Locale Application Notes

The FEEL tones apply across all locales, but phrasing and register shift per market:

| Locale | Functional tone | Emotional tone | Educational tone |
|---|---|---|---|
| es_MX | Short, direct. "Ingresa el monto." | Warm exclamations: "¡Listo!" | Rhetorical questions: "¿Sabías que…?" |
| es_AR | Same structure, **vos conjugations**: "Ingresá el monto." | "¡Listo! Compraste…" — same energy, vos verb forms | "¿Sabías que podés programar…?" |
| es_CO | Same as es_MX structure. "Ingresa el monto." | "¡Listo!" — same; slightly less exclamation-heavy | Same rhetorical pattern as es_MX |
| pt_BR | More connected phrasing. "Insira o valor." | "Pronto! Você comprou…" | "Sabia que você pode…?" |
| en_US | Imperative, concise. "Enter the amount." | Warm but understated: "Done! You bought…" | Direct questions: "Did you know you can…?" |

> When reviewing es_AR content, always check that **vos conjugations** are used consistently throughout. Mixing "tú" and "vos" forms in the same flow is a Recommended issue.

---

## Common Mistakes to Flag

| Mistake | Why it's wrong | What to suggest |
|---|---|---|
| Educational tone in a daily flow (e.g., long explanation before a simple send action) | Adds friction — user knows this flow; they want speed | Trim to Functional: short, action-oriented copy |
| Functional tone in a first-use or discovery flow (e.g., no explanation on a complex feature screen) | User doesn't have context yet; functional copy alone leaves them confused | Add Educational layer: a brief contextual sentence or question |
| Pure Emotional copy with no function or education (e.g., only "¡Genial! Estás a punto de algo increíble") | Feels hollow, doesn't help the user do anything | Ground it: lead with what's happening, then add the emotional touch |
| Error message that blames the user ("Tu acción no pudo completarse") | Damages trust; user feels at fault | Reframe with shared accountability: "Tuvimos un problema" |
| Using a forbidden term (interest, savings, invest) | Regulatory risk | Replace with approved alternative from `localization/glossary.md` |
| Standalone "Ver" as a CTA | Accessibility issue | Replace with "Mostrar" or a more descriptive action |
| Mixing Functional and Educational copy in the same short UI element | Cognitively overloaded | Pick one primary tone; Emotional can layer, but two primary tones compete |
| Exclamation marks in processing / in-progress states | Creates false excitement before outcome is confirmed | Reserve exclamations for confirmed success states only |

---

## FEEL Checklist for In-App Content

**Functional**
- [ ] Copy is short and action-oriented
- [ ] Infinitive verbs used for CTAs and labels
- [ ] Tone is neutral and instructional
- [ ] User can complete the task without ambiguity

**Emotional**
- [ ] A human touch is present (not robotic or overly formal)
- [ ] Error messages are empathetic, not alarming or blame-shifting
- [ ] Positive reinforcement used where appropriate (success states, milestones)

**Educational**
- [ ] Less-common flows include contextual explanation
- [ ] User knows what to expect next
- [ ] Questions or prompts are used to engage where appropriate

**Learning**
- [ ] Content helps the user build confidence for future interactions
- [ ] Onboarding or first-use moments are clearly guided
- [ ] Users are empowered to act without needing support
