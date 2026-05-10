# Locale: SP-MX — Mexican Spanish

Sources: glossary.md, feel-framework.md, voice-tone.md, cta-guidelines.md, help-center.md, ux-writing-principles.md, compliance-mx.md

---

## Register

- **Pronoun**: "tú" (informal) — never "usted" in app copy
- **Tone**: Warm, direct. Casual register is standard for fintech apps.
- **Contractions**: Not applicable in Spanish; use natural, flowing sentences.

---

## Verb Conjugations

| Form | Rule | Example |
|---|---|---|
| CTAs / buttons | **Infinitive** — never imperative | "Comprar", "Enviar", "Continuar" / "Compra", "Envía" |
| Body copy / instructions | Imperative tú form | "Deposita tu dinero", "Revisa tu saldo" |
| Educational content | Rhetorical questions | "¿Sabías que puedes programar compras recurrentes?" |
| Success states | Exclamation with past tense | "¡Listo! Compraste 0.000025 BTC." |

---

## FEEL Tone Patterns

| Tone | Pattern |
|---|---|
| Functional | Short, direct. "Ingresa el monto." |
| Emotional | Warm exclamations: "¡Listo!" |
| Educational | Rhetorical questions: "¿Sabías que…?" |

---

## Error Messages

- Shared accountability framing: **"Tuvimos un problema"**
- Apology: **"Lo sentimos"** (standard across MX)
- Never blame the user: "Ingresaste un CLABE inválida" → "Esa CLABE no parece correcta."

---

## CTA Grammar

- Use infinitive: "Comprar", "Enviar", "Continuar"
- Do NOT use imperative: "Compra" , "Envía" 
- Capitalize first word only: "Comprar BTC" / "Comprar Btc" 

---

## Number & Currency Formats

| Format | Rule | Example |
|---|---|---|
| Peso mexicano | MXN, $ prefix | $1,500.00 MXN or $1,500 MXN or MX$1,500 |
| Thousands separator | Comma | $1,500 |
| Decimal separator | Period | $1,500.50 |
| Percentages | No space | 12.5% |
| Dates (text) | Full written | 14 de marzo de 2025 |
| Dates (numeric) | DD/MM/YYYY | 14/03/2025 |
| **Do NOT use** | European format | ~~€1.500,00~~ / ~~1 500,00 MXN~~ |

---

## Key Vocabulary

| English | es_MX |
|---|---|
| Cash / efectivo | efectivo (covers both fiat AND stablecoins) |
| Go back | regresar |
| Got it | entendido |
| Next | siguiente |
| Sign up | registrarse |
| Withdraw | retirar |
| Exchange rate | tipo de cambio |
| Settings | ajustes |
| Tax ID | RFC |
| Payment system | SPEI |
| Bank account number | CLABE |
| Zip code | código postal |
| Phone | celular |
| Fiat | pesos (never "fiat" in UI) |
| Help Center | Centro de Ayuda |
| Support | equipo de asistencia |

---

## Grammar Rules

| Rule | Example |
|---|---|
| App = femenino | "Abre **la** app", "Descarga **la** aplicación" |
| Token = masculino | "**El** token" |
| Blockchain = femenino | "**La** blockchain" |
| Wallet | "**El** wallet" o "**La** cartera" (choose one, be consistent) |
| Avoid gendered user references | Prefer "personas que usan…", "quienes usan…", "comunidad" |
| Avoid false cognates | "aplicar para un crédito" → "solicitar un crédito" |
| Internet | Capital "I" — "Internet" |

---

## Regulatory Context

See `localization/compliance-mx.md` for the full regulatory framework (CNBV, CONDUSEF, Ley Fintech) and prohibited copy patterns.

**Key rules:**
- Never promise guaranteed returns or "sin riesgo"
- Screens with crypto/investment content require risk disclaimers
- SPEI timing claims must be verified with the technical team
- "Fiat" is jargon — always use the currency name ("pesos")
- KYC = "Verificación de identidad" in UI copy

---

## Future Tense

Use the conjugated future tense.

Do: Tus fondos estarán disponibles pronto.

---

## Verb Rules

- **Gerund in titles**: Avoid. Use infinitive instead. "Cómo crear tu cuenta en Bitso" / "Creando tu cuenta en Bitso"
- **Gerund post-action**: Avoid for sequential actions. "Creaste tu cuenta y se generó una billetera" / "Creaste tu cuenta, generando una billetera"

---

## Accessibility

- Toggle controls: **Activar / Desactivar** — never "Habilitar / Deshabilitar"
- Sensory verbs: avoid "ver" — use "revisar" as neutral alternative
- Emojis: never in product copy; marketing only

---

## SPEI Timing Rules

- "En minutos" → only if the real SLA supports it
- "Mismo día hábil" → standard interbank transfers
- "1–2 días hábiles" → out-of-hours interbank transfers
- **Never** "instantáneo" unless it's real-time SPEI with technical confirmation
