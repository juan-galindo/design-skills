# UX Writing Principles

Reference for Fintech / Crypto / Investments — es_MX

---

## 1. Clarity

**The most important principle.** If the user has to re-read, you failed.

### Rules
- One idea per sentence.
- Start with the subject — don't bury it after a subordinate clause.
- Active voice. Passive voice hides the actor and dilutes responsibility.
- "Tu transferencia no pudo ser procesada."
- "No pudimos procesar tu transferencia."
- Eliminate adverbs. If you need an adverb to reinforce a verb, find a stronger verb.
- "Por favor revisa cuidadosamente tus datos."
- "Revisa tus datos."
- Use digits (1, 2, 3) in UI. Words (uno, dos) slow scanning.
- In fintech: never use internal jargon or blockchain technical terms without prior explanation.

---

## 2. Conciseness

Every word must justify its presence. Users don't read — they scan.

### Immediate cuts
| Remove | Replace with |
|---|---|
| "Por favor toma en cuenta que..." | (nothing — say it directly) |
| "Con el fin de..." | "Para..." |
| "En este momento" | "Ahora" |
| "Debido al hecho de que" | "Porque" |
| "Tiene la capacidad de" | "Puede" |
| "Asegúrate de" | (direct verb) |
| "No dudes en" | (direct verb) |
| "Estamos procesando tu solicitud en estos momentos" | "Procesando..." |

### Length limits
- Tooltip: ≤ 1 sentence
- Error message: ≤ 2 sentences
- CTA: 2–4 words
- Screen description: ≤ 40 words
- Onboarding screen (body): ≤ 25 words

---

## 3. Consistency

Inconsistent terminology breaks the user's mental model. If "cartera" becomes "cuenta" on the next screen, the user assumes they're different things.

### Terminology rules (fintech/crypto mx)
- Choose one word per concept and never change it.
- Document your glossary even if minimal.
- Mirror the language the user used to arrive at a screen. If they searched "enviar dinero", the results screen must say "enviar dinero", not "iniciar transferencia".
- Consult `localization/compliance-mx.md` for approved vs. prohibited terms.

### Grammar consistency (es_MX)
- Capitalization: choose one rule for buttons (lowercase with initial capital only) — never mix.
- Punctuation: no period at the end of CTAs, tooltips, or short labels. Period only in complete sentences (body, errors).
- Verb tense: present for UI ("Deposita"), past for confirmations ("Depósito completado").
- Gender: "la app", "el token", "la cartera", "el portafolio" — be consistent.

---

## 4. Error Messages — Special Rules

Errors are the highest-risk copy. The user is already frustrated. Be exceptionally clear.

### Formula: What happened + Why (if it helps) + What to do

| Component | Guide |
|---|---|
| **What happened** | Name the problem concisely. Don't hide it. |
| **Why** | Include it only if the reason helps the user act. Omit technical reasons. |
| **What to do** | Always end with a clear next step. If no action is possible, say so. |

### Examples in fintech mx
- "Error en la transacción. Código: TXN-403."
- "No pudimos completar tu transferencia SPEI. Revisa que tu CLABE sea correcta e intenta de nuevo."

- "Algo salió mal."
- "No pudimos cargar tu saldo. Verifica tu conexión y vuelve a intentarlo."

- "KYC fallido."
- "No pudimos verificar tu identidad con esa foto. Intenta con buena iluminación y que tu INE esté completamente visible."

- "Fondos insuficientes."
- "No tienes saldo suficiente para esta operación. Deposita fondos para continuar."

### What NOT to do in errors
- Don't blame the user: "Ingresaste un CLABE inválida" → "Esa CLABE no parece correcta."
- Don't over-apologize: "Lamentamos mucho este inconveniente" takes up space and doesn't help.
- No technical language: "null pointer", "timeout 503", "server error".
- No exclamation marks in errors. Ever.
- Don't promise recovery times you can't keep.

---

## 5. Empty States

Empty states are underused opportunities. They're not failures — they're invitations.

### Three types

| Type | Context | Goal |
|---|---|---|
| **First-time empty** | User hasn't done anything yet | Invite action, reduce anxiety |
| **Cleared empty** | User deleted all items | Confirm success, offer a path |
| **No results** | Search / filter returned nothing | Help refine or restart |

### Formula: Title + Body (optional) + CTA

**First time:**
```
Sin movimientos todavía
Deposita para empezar a operar.
[Depositar]
```

**No results:**
```
Sin resultados para "bixon"
Revisa la ortografía o intenta con otro término.
[Limpiar búsqueda]
```

**First investment:**
```
Tu portafolio está listo
Elige un activo para hacer tu primera inversión.
[Ver activos]
```

---

## 6. CTAs — Special Rules for Fintech/Crypto

Buttons are the most important copy in the product. Users read them last and tap them first.

### CTA Formula
**[Verb] + [Object]** — optionally + **[qualifier]**

| Pattern | Example |
|---|---|
| Verb + Object | "Depositar", "Retirar fondos", "Comprar Bitcoin" |
| Verb + Object + Qualifier | "Enviar $500 a Ana", "Vender 0.05 BTC" |
| Confirmation verb | "Sí, eliminar", "Entendido", "Confirmar operación" |

### Avoid generic labels
| Generic | Better |
|---|---|
| Aceptar | [specific action verb] |
| Ok | Entendido / Listo |
| Siguiente | Verificar identidad / Agregar tarjeta / Confirmar datos |
| Cancelar | Mantener inversión / Seguir editando |
| Sí | Sí, retirar / Sí, cancelar (name the consequence) |

### Destructive CTAs in fintech
- Always name the consequence: "Cancelar inversión" not just "Cancelar".
- Pair with a less committed exit: "Cancelar inversión" / "Mantener inversión".
- Urgent withdrawal screens: warn about potential penalties or yield loss.

---

## 7. Onboarding — Fintech/Crypto in Mexico

Onboarding in fintech carries extra weight: many users distrust digital financial products. Copy must build trust, not just inform.

### Principles
- **One idea per screen.** Never explain two things at once.
- **Benefit first**, not feature.
- "Habilitamos sincronización de saldo en tiempo real."
- "Tu saldo se actualiza solo — sin tener que recargar."
- **Progress matters.** "Paso 1 de 4" reduces abandonment.
- **Respect optionality.** "Ahora no" is a valid route in non-critical steps.
- **Don't sell during onboarding.** The user already signed up. Deliver value, not marketing.
- **Demystify crypto from the start.** If the product includes digital assets, briefly explain volatility in onboarding — reduces churn on first price drop.
- **KYC — make it human.** Identity verification creates anxiety. Explain why it's needed and what happens to the data.

### Example: KYC Screen
```
Título: Verificamos tu identidad por tu seguridad
Cuerpo: Solo tomará unos minutos. Necesitamos tu INE vigente
y una selfie. Tus datos están cifrados y no se comparten.
CTA: Comenzar verificación
Link secundario: ¿Por qué necesitan esto?
```

---

## 8. Notifications and Push — Fintech/Crypto

### Structure: Value first, context after
- "Se ha registrado una nueva operación en tu cuenta."
- "Recibiste $1,200 de Juan Pérez."

### Rules
- Personalize when possible: user name, amount, asset type.
- Be specific about what requires action vs. what is informational.
- In crypto: include a reference price when relevant — "Tu BTC bajó 5% hoy. Precio actual: $42,300 USD."
- **Never** use notifications to incite buying/selling based on market movements — regulatory risk.
- For security alerts: serious tone, clear immediate action.

### Examples
```
Received deposit: "Recibiste $5,000 MXN. Ya están en tu cartera."
Outgoing transfer: "Enviaste $2,000 a Ana García."
Price alert: "Bitcoin bajó 8% en las últimas 24h. Precio actual: $41,200 USD."
Security alert: "Detectamos un inicio de sesión desde un nuevo dispositivo. ¿Fuiste tú?"
```

---

## 9. Loading and Progress States

Short but frequently ignored. They affect trust.

### Rules
- Be specific: "Procesando tu transferencia SPEI..." not "Cargando..."
- Use gerund: "Enviando...", "Verificando...", "Configurando tu cuenta..."
- For long waits (>3s): add a reassurance line: "Esto suele tomar unos segundos."
- In crypto operations: "Confirmando en blockchain..." is valid — it educates the user about the process.
- Never use fake percentage. Invented progress destroys trust.

### Fintech examples
```
"Procesando tu depósito SPEI..."
"Verificando tu identidad..."
"Conectando con tu banco..."
"Confirmando en blockchain... (puede tardar 1–2 min)"
"Calculando tu rendimiento..."
```

---

## 10. Placeholder Text

The placeholder disappears when the user types. Don't put critical instructions in it.

### Rules
- Only for format examples: "ej. 18 dígitos sin espacios"
- Never use placeholder as a label. The label must remain visible.
- Avoid "Ingresa tu [field name]" — redundant if the label already says it.

### Fintech mx examples
```
CLABE field: "ej. 012345678901234567"
Amount field: "ej. 500.00"
RFC field: "ej. GOMA810102H45"
Search field: "Bitcoin, Ethereum, USDT..."
```
