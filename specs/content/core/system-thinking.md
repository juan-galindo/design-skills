# System Thinking for UX Writing

Reference for Fintech / Crypto / Investments — es_MX

---

## What Is System Thinking in Content?

System thinking means understanding that no copy exists in isolation. Every word is part of:

1. **A flow** — the sequence of screens before and after
2. **A mental model** — the user's beliefs about how the product works
3. **A terminology system** — the vocabulary the product uses consistently
4. **An emotional arc** — the user's feelings as they move through the experience
5. **A platform context** — mobile vs. web, push vs. in-app, real-time vs. asynchronous
6. **A regulatory framework** — what can and cannot be said in financial products in Mexico

Writing without this context produces technically correct copy that fails in practice.

---

## The 5 Context Questions

Answer these before writing:

### 1. Entry: How did the user get here?
- Tapped a push notification? (probably distracted, may not have full context)
- Completed a previous step? (has context, is in a flow)
- Searched for something? (has intent, looking for something specific)
- Arrived cold? (no prior context, needs more guidance)
- Responded to a price or market alert? (may be anxious)

**Copy implication**: Cold entries need more anchoring. Mid-flow states can be more terse.

---

### 2. State: What is the current system state?
- Loaded state? (data ready)
- Loading state? (processing)
- Empty state? (no data)
- Error state? (something failed)
- Success state? (action completed)
- Partial state? (some data, some missing)
- Volatility state? (asset price changed significantly)

**Copy implication**: Each system state requires different tone and copy structure. Never use the same copy for a loading state and an error state.

---

### 3. Risk: What is the consequence of this action?

| Level | Fintech/crypto examples |
|---|---|
| **Low** | Changing visual theme, adjusting notifications |
| **Medium** | Viewing transfer status, checking performance |
| **High** | Sending money, buying/selling crypto, signing up for a product |
| **Critical** | Canceling an investment at a loss, deleting account, authorizing third-party access |

**Copy implication**: Increase formality and specificity with risk level. High-risk moments need explicit consequence statements, not just labels.

---

### 4. Frequency: Is this the first time or the nth?
- **First time**: The user needs guidance. More explanation is appropriate. Introduce terms.
- **Recurring user**: Knows the flow. Extra explanation is friction. Be brief.
- **Error recovery**: The user already saw the happy path. Focus on what's different.
- **First exposure to crypto/investments**: Requires basic education on volatility and risk before the action.

**Copy implication**: Design for the first experience but don't penalize the recurring user with verbosity. Use progressive disclosure: more detail on first encounter, less on subsequent ones.

---

### 5. Exit: Where does the user go from here?
- Continues to the next step in the same flow?
- Leaves the product (external link, native OS, email)?
- Ends the flow (completed, cancelled)?
- Can they return?
- Is the action reversible or irreversible?

**Copy implication**: If the user continues in the flow, the CTA must name the next step. If the flow ends, the CTA must acknowledge completion. Irreversible actions (selling at a loss, canceling an investment) need explicit confirmation copy.

---

## The Content Chain Model

Every piece of UI copy is part of a **content chain** — a sequence of connected messages that together tell a coherent story.

```
[Entry point / trigger]
↓
[Screen title — orients]
↓
[Body / description — informs or instructs]
↓
[CTA — commits]
↓
[Confirmation / success — closes the loop]
↓
[Notification or next step — continues the chain]
```

A break at any point in this chain creates confusion. System thinking means auditing all nodes, not just the one you're writing.

### Example: Bitcoin Purchase Flow — Content Chain

| Step | Copy | Notes |
|---|---|---|
| Entry (push) | "Bitcoin bajó 5%. ¿Quieres comprar más?" | Specific value, no artificial urgency |
| Screen title | "Comprar Bitcoin" | Present, direct action |
| Body | "Precio actual: $42,300 USD · Volátil por naturaleza" | Price context + risk reminder |
| Input | "Monto en MXN" / "0.00 BTC equivalente" | Real-time conversion |
| Warning | "El precio puede cambiar antes de confirmar." | Honest, non-alarming |
| Primary CTA | "Confirmar compra" | Specific, not "Next" |
| Processing state | "Procesando tu compra..." | Gerund, specific |
| Confirmation | "Compraste 0.0023 BTC" | Exact amount, past tense |
| Detail | "A $42,315 USD · Comisión: $25 MXN" | Full transparency |
| Follow-on | "Tu portafolio aumentó 12%. Ver detalle →" | Forward-looking, not a promise |

Each line is simple. Together they form a coherent arc.

---

## Terminology Systems in Fintech/Crypto MX

### Why Terminology Matters
If the product uses "cartera" on one screen and "cuenta" on the next, users think they're different things. Inconsistent terminology:
- Creates confusion and support tickets
- Erodes trust
- Signals internal disorganization to the user
- In crypto especially: novice users are already confused — don't add more ambiguity

### Minimum Terminology Map

| Category | Questions to answer |
|---|---|
| Core nouns | What is the main object the user works with? (cartera, cuenta, portafolio, posición) |
| Core verbs | What does the user do? (depositar, retirar, comprar, vender, enviar, recibir, intercambiar) |
| State terms | How do you describe states? (pendiente, completado, fallido, cancelado, en proceso) |
| Person terms | How do you refer to the user? (tú, tu cuenta) To third parties? (destinatario, contacto) |
| Error vocabulary | What words are used in error states? (no pudimos, falló, no disponible) |
| Asset terms | Bitcoin or BTC, Ethereum or ETH — choose the formality level and be consistent |

**Rule**: Introduce a term once with full context. Use it exactly the same way every time after.

---

## Emotional Arc Mapping in Fintech/Crypto

Users are not in a neutral state. Their emotional context changes throughout a flow. Your tone must track it.

### Example Emotional Arc: First Deposit and First Crypto Purchase

```
Curious → Interested → Anxious (KYC) → Relieved → Excited → Nervous (first purchase) → Satisfied
```

| Stage | Emotional state | Tone guide |
|---|---|---|
| Curious | Neutral | Motivating, benefit first |
| Interested | Engaged | Clear, informative, no pressure |
| Anxious (KYC) | Distrustful | Transparent, explain the why, protective |
| Relieved (KYC approved) | Relaxed | Warm, celebratory but measured |
| Excited (first deposit) | Optimistic | Efficient, respect their momentum |
| Nervous (first crypto purchase) | Cautious | Informative, no alarmism, no pressure |
| Satisfied | Content | Warm, forward-looking, no over-sell |

**Never** apply a flat, neutral tone to an anxious or frustrated moment. The user feels something; your copy must acknowledge it, not ignore it.

---

## Multi-Surface Consistency

The same user interacts with your product across multiple surfaces. Copy must be coherent across all of them.

| Surface | Character | Constraints |
|---|---|---|
| Mobile app (in-app) | Primary experience | Full context, can be longer |
| Push notification | Interruption | 1 sentence max, value first, no artificial FOMO |
| Transactional email | Follow-up / record | More formal, complete information, risk disclaimer |
| Web app | Desktop context | Same voice, can be more detailed |
| SMS / OTP | Pure utility | Ultra short, functional, no unnecessary branding |
| Error page (404/500) | Recovery state | Calm, helpful, no panic |

**Rule**: Same voice, adapted register. The product must sound like one person speaking across all channels — not like several departments.

---

## Copy Debt in Fintech

**Copy debt** accumulates when:
- Terms change but old screens aren't updated
- Different writers use different words for the same concept
- Edge states (empty, error, loading) are written reactively without reviewing the flow
- Marketing copy leaks into product UI (aspirational tone in functional moments)
- Localization is done by translation without UX writer review (correct grammar, wrong experience)
- Risk disclaimers are added ad-hoc without integration into the flow

### Signs of Copy Debt in Fintech/Crypto
- Users contact support to "translate" the copy ("what does 'liquidity' mean here?")
- A/B tests show a variant wins mainly because users understand it
- New team members can't identify the "official" term for a product concept
- Error messages reference technical system states
- The same asset is called "Bitcoin", "BTC" and "bitcoin" in different parts of the product

---

## Heuristics for Systemic Copy in Fintech

1. **The stranger test**: Would someone who never used the product understand this message without seeing what came before? If not, add context or reduce dependence on prior context.

2. **The broken flow test**: What if the user skipped the previous step? Does the current step still make sense? Write copy that survives partial flows.

3. **The 6-month test**: Will this copy still be accurate in 6 months? Avoid references to temporary states ("new", "just launched") in permanent UI.

4. **The localization test**: Does this copy depend on Spanish word order, an idiom, or a wordplay? If so, it will fail in other language variants.

5. **The error-first test**: Write the error state before the happy path. If you can't write a clear error message, the feature probably isn't well-designed yet.

6. **The regulatory test**: Does any phrase promise returns, guarantee results, or give investment advice? If yes, rewrite. Consult `localization/compliance-mx.md`.

7. **The volatility test**: Does the copy assume the price/value will be stable? In crypto, the value can change while the user is reading the screen. Copy must be timeless or dynamic.
