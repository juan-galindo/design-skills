# Cumplimiento regulatorio — Fintech, Crypto e Inversiones México (es_MX)

## Marco regulatorio relevante

| Entidad / Ley | Aplica a |
|---|---|
| **CNBV** (Comisión Nacional Bancaria y de Valores) | Bancos, casas de bolsa, SOFOMES reguladas |
| **CONDUSEF** | Protección al usuario de servicios financieros — quejas y derechos |
| **Ley Fintech (LFITF)** | ITF (Instituciones de Tecnología Financiera): IFPE y IFC |
| **Banxico** | Operaciones con activos virtuales (crypto) en ITF |
| **SAT** | Obligaciones fiscales sobre rendimientos e inversiones |
| **IPAB** | Seguro de depósito bancario (hasta 400,000 UDIs por persona por institución) |
| **PROFECO** | Publicidad y ofertas comerciales al consumidor |

---

## Términos PROHIBIDOS en copy de producto

Usar cualquiera de estos términos puede generar riesgo regulatorio, multas o acciones de CONDUSEF/CNBV.

### Rendimientos y ganancias

| ❌ Prohibido / riesgo alto | ✅ Alternativa segura |
|---|---|
| "Gana X% seguro" | "Rendimiento histórico de X%" + disclaimer |
| "Rendimiento garantizado" | "Rendimiento estimado" / "Tasa referencial" |
| "Tu dinero siempre crece" | "El valor de tus activos puede subir o bajar" |
| "Interés fijo garantizado" | "Tasa anualizada referencial" |
| "Retorno asegurado" | "Rendimiento sujeto a condiciones de mercado" |
| "Sin riesgo" | "Ver perfil de riesgo del instrumento" |
| "100% rentable" | — (no usar nunca) |

### Inversiones y crypto

| ❌ Prohibido / riesgo alto | ✅ Alternativa segura |
|---|---|
| "Invierte sin riesgo" | "Conoce los riesgos antes de invertir" |
| "Este token siempre sube" | "Los activos digitales son altamente volátiles" |
| "Crypto estable" (para no-stablecoins) | "Activo digital con volatilidad de mercado" |
| "Tu cripto está asegurada" | "Custodiado con medidas de seguridad [descripción]" |
| "Multiplica tu dinero" | — (no usar nunca) |
| "Oportunidad de inversión única" | — (no usar nunca) |

### Asesoría financiera

| ❌ Prohibido / riesgo alto | ✅ Alternativa segura |
|---|---|
| "Te recomendamos comprar X" | "Consulta con un asesor financiero" |
| "Ahora es buen momento para invertir en..." | — (no opinar sobre timing de mercado) |
| "Este activo va a subir" | — (no hacer predicciones de precios) |
| "Diversifica comprando X, Y, Z" | "Considera diversificar — consulta a un asesor" |

### Seguridad de fondos

| ❌ Prohibido / riesgo alto | ✅ Alternativa segura |
|---|---|
| "Tu dinero está 100% seguro" | "Fondos custodiados por [nombre de custodio]" |
| "Nunca perderás tu inversión" | — (no usar nunca) |
| "Protegido como cuenta bancaria" | Solo si aplica IPAB — especificar montos y condiciones |
| "IPAB protege tu crypto" | Falso — IPAB no cubre activos digitales |

---

## Disclaimers requeridos por contexto

### Pantallas de inversión / portafolio
Incluir visible o con enlace:
> "Invertir implica riesgos. El valor de tu portafolio puede subir o bajar. El rendimiento pasado no garantiza resultados futuros."

### Primera exposición a activos volátiles (crypto, acciones)
Mostrar antes o durante la compra:
> "Este activo tiene alta volatilidad. Puedes ganar o perder parte de tu inversión."

### Pantallas de rendimientos
Siempre acompañar cifras con:
> "Rendimiento histórico / estimado. No garantizado. Sujeto a condiciones de mercado."

### SPEI — tiempos de acreditación
- "En minutos" → solo si el SLA real lo soporta
- "Mismo día hábil" → para transferencias interbancarias estándar
- "1–2 días hábiles" → para transferencias interbancarias fuera de horario
- **Nunca**: "instantáneo" salvo que sea SPEI en tiempo real con confirmación técnica

### Crédito / préstamos
- Siempre mostrar CAT (Costo Anual Total) prominente.
- Nunca ocultar comisiones en texto pequeño del UI.
- Incluir enlace a tabla de comisiones en pantallas de contratación.

---

## Terminología correcta en español mexicano (fintech/crypto)

### Términos preferidos en es_MX

| Inglés / incorrecto | ✅ es_MX correcto |
|---|---|
| Wallet | Cartera / billetera (ambos válidos — elegir uno y ser consistente) |
| Portfolio / portafolio | Portafolio (anglicismo aceptado en fintech mx) |
| Token | Token (no traducir) |
| Blockchain | Blockchain (no traducir) |
| Exchange | Casa de cambio / exchange (en contexto crypto, "exchange" es ampliamente entendido) |
| Staking | Staking (no traducir — explicar en primera mención) |
| DeFi | DeFi (no traducir — explicar en onboarding) |
| NFT | NFT (no traducir) |
| Fiat | Dinero tradicional / moneda fiduciaria (nunca "fiat" en UI — es jargon) |
| KYC | Verificación de identidad (en UI); KYC en contexto interno/técnico |
| AML | Prevención de lavado de dinero (en UI si aplica) |
| Wire transfer | Transferencia bancaria / SPEI |
| Statement | Estado de cuenta |
| Dashboard | Panel principal / inicio (evitar "dashboard" en UI visible) |
| Top up / Add funds | Depositar / Agregar fondos |
| Withdraw | Retirar |
| Trade | Intercambiar / operar (según contexto) |

### Montos y formatos numéricos (es_MX)
- Peso mexicano: **$1,500.00 MXN** o **$1,500 MXN** o **MX$1,500**
- Separador de miles: coma → **$1,500**
- Separador decimal: punto → **$1,500.50**
- **No usar**: €1.500,00 ni 1 500,00 MXN (formato europeo)
- Porcentajes: **12.5%** (sin espacio entre número y signo)
- Fechas: **14 de marzo de 2025** (texto) o **14/03/2025** (numérico corto)

### Gramática es_MX para fintech

| Regla | Ejemplo |
|---|---|
| Tuteo consistente | "Deposita tu dinero", "Revisa tu saldo" — nunca mezclar con "usted" |
| App = femenino | "Abre **la** app", "Descarga **la** aplicación" |
| Género de términos técnicos | "**El** token", "**La** blockchain", "**El** wallet" o "**La** cartera" |
| Verbos de acción en imperativo | "Deposita", "Retira", "Confirma" — no "Por favor proceda a..." |
| Evitar falsos cognados | "Aplicar" ≠ "aplicar para un crédito" → "solicitar un crédito" |

---

## Patrones de copy de alto riesgo a evitar

### FOMO (Fear of Missing Out)
Generar urgencia artificial para que el usuario invierta es una práctica regulatoriamente riesgosa y daña la confianza.

❌ "¡Solo quedan 3 horas para esta oportunidad!"
❌ "Otros usuarios están ganando mientras tú no inviertes"
✅ Presentar información objetiva sin presión de tiempo artificial

### Testimoniales de rendimiento sin disclaimer
❌ "María ganó $50,000 con nuestra app"
✅ Si se usan testimoniales, siempre acompañar: "Resultados individuales. El rendimiento pasado no garantiza resultados futuros."

### Comparaciones engañosas
❌ "Mejor que un banco tradicional — gana 10x más"
✅ "Conoce cómo se comparan nuestras tasas — ver condiciones"

### Promesas de recuperación
❌ "Si pierdes, te devolvemos tu inversión"
✅ Solo incluir si hay un producto de garantía real con términos y condiciones

---

## Checklist pre-publicación para copy en fintech/crypto mx

- [ ] ¿Alguna frase promete rendimientos garantizados o sin riesgo?
- [ ] ¿Se menciona "seguro", "garantizado" o "protegido" sin especificar el instrumento y límites?
- [ ] ¿Hay predicciones de precio de activos?
- [ ] ¿Se usa "fiat", "DeFi", "staking" sin explicación en primera mención?
- [ ] ¿Los montos usan formato correcto para es_MX?
- [ ] ¿Los tiempos de SPEI son verificados con el equipo técnico?
- [ ] ¿Las pantallas de inversión tienen enlace o texto de disclaimer de riesgo?
- [ ] ¿Se usó tuteo consistentemente?
- [ ] ¿"App" y términos de género están en el género correcto en español?
- [ ] ¿Se requiere revisión legal por mencionar productos regulados (crédito, valores, seguros)?
