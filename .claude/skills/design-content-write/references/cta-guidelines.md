# CTA Guidelines — Bitso Product Buttons

---

## Core Principles

1. **Describe the action, not just the screen** — The button label must tell the user exactly what will happen when they tap it. Avoid labels that name the concept without describing the outcome.

2. **Connect title to CTA** — If a user only reads the screen title and the button, they should understand what the screen is about and what to do. These two elements must work as a pair.
   - Good: Title "Confirma tu compra" → CTA "Comprar BTC"
   - Bad: Title "Confirma tu compra" → CTA "Continuar"

3. **2–3 words max** — Keep labels as short as possible. If you need more words, the action is probably too complex or the screen title is doing too little work.

4. **Active voice** — The label describes what the action does, not what the user has to do.

---

## Grammar by Locale

| Locale | Form | Rule | Example |
|---|---|---|---|
| es_MX | Infinitive | Use infinitive for buttons inside the product. Do NOT use imperative. | "Comprar", "Enviar", "Continuar" ✓ / "Compra", "Envía" ✗ |
| es_AR | Infinitive | Same rule. Vos imperative ("Comprá") is not used in buttons. | "Comprar", "Enviar" ✓ / "Comprá", "Enviá" ✗ |
| es_CO | Infinitive | Same rule as es_MX. | "Comprar", "Enviar" ✓ |
| pt_BR | Infinitive | Use infinitive, not imperative. | "Comprar", "Enviar", "Continuar" ✓ / "Compre", "Envie" ✗ |
| en_US | Verb (base form) | Use the base form of the verb — no "to". Active, imperative mood is correct for English. | "Buy", "Send", "Continue" ✓ |

---

## Approved Vocabulary — Use These, Not Those

| Use | Not | Why |
|---|---|---|
| Continue / Continuar | Next / Siguiente | Consistency |
| Change / Cambiar | Modify / Modificar | More objective, less technical |
| Send / Enviar | Withdraw / Retirar | More universal and less alarming |
| Select / Seleccionar | View / Ver, Touch / Tocar | Accessibility — "ver" and "tocar" are device-dependent and not screen-reader-friendly |
| Confirm / Confirmar | Submit / Enviar (for forms) | More transparent about the action |
| Try again / Intentar de nuevo | Retry / Reintentar | More natural and less technical |

> **Note**: "Enviar" is the approved term for sending money/transfers. Do NOT confuse with "Enviar" used in form submit — use "Confirmar" for form submission.

---

## Capitalization

- **Capitalize the first word only.** Do not title-case every word.
  - ✓ "Comprar BTC"
  - ✗ "Comprar Btc" / "COMPRAR BTC"
- **Product names are always capitalized** regardless of position: "Abrir Bitso Card", "Ir a Bitso Alpha"
- **Acronyms keep their case**: "Agregar 2FA", "Ver en DeFi"

---

## Accessibility Rules

- **Avoid device-dependent verbs**: "ver", "tocar", "click", "tap" — these exclude users on screen readers or non-touch devices.
- **Approved replacement**: "Seleccionar" (es) / "Selecionar" (pt) / "Select" (en) for interactive elements.
- **Avoid "Ver"** as a standalone CTA or as the primary action verb. Replace with a descriptive action: "Mostrar detalles" instead of "Ver" / "Ver más".

---

## Patterns to Flag in Review

| Pattern | Severity | Why | Suggested Fix |
|---|---|---|---|
| Generic label: "OK", "Sí", "No", "Submit" | 🔴 Blocking | Tells user nothing about what will happen | Rewrite with a verb that describes the outcome |
| CTA disconnected from title | 🟡 Recommended | User must read the full screen to understand the flow | Align title and CTA so they form a meaningful pair |
| Imperative verb in es/pt buttons ("Compra", "Comprá", "Envie") | 🟡 Recommended | Breaks grammar convention for Bitso buttons | Switch to infinitive |
| More than 3 words | 🟡 Recommended | Labels should be scannable at a glance | Trim or rewrite; offload detail to title or body |
| "Ver" as a standalone CTA | 🟡 Recommended | Accessibility issue | Replace with "Mostrar [noun]" or a descriptive action |
| "Modificar" instead of "Cambiar" | 🟢 Polish | Inconsistent with approved vocabulary | Replace with "Cambiar" / "Change" |
| "Siguiente" instead of "Continuar" | 🟢 Polish | Inconsistent with approved vocabulary | Replace with "Continuar" / "Continue" |
| Title-case label ("Comprar Cripto") | 🟢 Polish | Only first word should be capitalized | "Comprar cripto" |

---

## CTA Review Checklist

- [ ] Label describes the action — not the screen name, not the concept
- [ ] Title and CTA can be read together and tell the user what to do
- [ ] 2–3 words max
- [ ] Infinitive form used for es and pt buttons
- [ ] No generic labels (OK, Submit, Yes, No, Next, Continue without context)
- [ ] "Continuar" used instead of "Siguiente"; "Cambiar" instead of "Modificar"; "Enviar" instead of "Retirar"
- [ ] No device-dependent verbs ("ver", "tocar", "click")
- [ ] First word capitalized only (product names always capitalized)
- [ ] Locale-consistent: vos forms not in es_AR buttons; correct language per locale
