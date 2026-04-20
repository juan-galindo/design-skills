# Principios de UX Writing — Referencia (Fintech / Crypto / Inversiones — es_MX)

## 1. Claridad

**El principio más importante.** Si el usuario tiene que releer, fallaste.

### Reglas
- Una idea por oración.
- Empieza con el sujeto — no lo entierres después de una cláusula subordinada.
- Voz activa. La voz pasiva oculta al actor y diluye responsabilidad.
  - ❌ "Tu transferencia no pudo ser procesada."
  - ✅ "No pudimos procesar tu transferencia."
- Elimina adverbios. Si necesitas un adverbio para reforzar un verbo, busca un verbo más fuerte.
  - ❌ "Por favor revisa cuidadosamente tus datos."
  - ✅ "Revisa tus datos."
- Usa dígitos (1, 2, 3) en UI. Las palabras (uno, dos) ralentizan el escaneo.
- En fintech: nunca uses jerga interna ni términos técnicos de blockchain sin explicación previa.

---

## 2. Concisión

Cada palabra debe justificar su presencia. Los usuarios no leen — escanean.

### Cortes inmediatos
| Eliminar | Reemplazar con |
|---|---|
| "Por favor toma en cuenta que..." | (nada — dilo directo) |
| "Con el fin de..." | "Para..." |
| "En este momento" | "Ahora" |
| "Debido al hecho de que" | "Porque" |
| "Tiene la capacidad de" | "Puede" |
| "Asegúrate de" | (verbo directo) |
| "No dudes en" | (verbo directo) |
| "Estamos procesando tu solicitud en estos momentos" | "Procesando..." |

### Límites de longitud
- Tooltip: ≤ 1 oración
- Mensaje de error: ≤ 2 oraciones
- CTA: 2–4 palabras
- Descripción de pantalla: ≤ 40 palabras
- Pantalla de onboarding (cuerpo): ≤ 25 palabras

---

## 3. Consistencia

La terminología inconsistente rompe el modelo mental del usuario. Si "cartera" se vuelve "cuenta" en la siguiente pantalla, el usuario asume que son cosas distintas.

### Reglas de terminología (fintech/crypto mx)
- Elige una palabra por concepto y no la cambies nunca.
- Documenta tu glosario aunque sea mínimo.
- Refleja el lenguaje que usó el usuario para llegar a una pantalla. Si buscó "enviar dinero", la pantalla de resultado debe decir "enviar dinero", no "iniciar transferencia".
- Consulta [compliance-mx.md](compliance-mx.md) para términos aprobados vs. prohibidos.

### Consistencia gramatical (es_MX)
- Capitalización: elige una regla para botones (minúsculas con mayúscula inicial solamente) — nunca mezcles.
- Puntuación: sin punto al final de CTAs, tooltips ni labels cortos. Punto solo en oraciones completas (cuerpo, errores).
- Tiempo verbal: presente para UI ("Deposita"), pasado para confirmaciones ("Depósito completado").
- Género: "la app", "el token", "la cartera", "el portafolio" — ser consistente.

---

## 4. Mensajes de error — Reglas especiales

Los errores son el copy de mayor riesgo. El usuario ya está frustrado. Sé excepcionalmente claro.

### Fórmula: Qué pasó + Por qué (si ayuda) + Qué hacer

| Componente | Guía |
|---|---|
| **Qué pasó** | Nombra el problema concisamente. No lo escondas. |
| **Por qué** | Inclúyelo solo si la razón ayuda al usuario a actuar. Omite razones técnicas. |
| **Qué hacer** | Siempre termina con un siguiente paso claro. Si no hay acción posible, dilo. |

### Ejemplos en fintech mx
- ❌ "Error en la transacción. Código: TXN-403."
- ✅ "No pudimos completar tu transferencia SPEI. Revisa que tu CLABE sea correcta e intenta de nuevo."

- ❌ "Algo salió mal."
- ✅ "No pudimos cargar tu saldo. Verifica tu conexión y vuelve a intentarlo."

- ❌ "KYC fallido."
- ✅ "No pudimos verificar tu identidad con esa foto. Intenta con buena iluminación y que tu INE esté completamente visible."

- ❌ "Fondos insuficientes."
- ✅ "No tienes saldo suficiente para esta operación. Deposita fondos para continuar."

### Lo que NO hacer en errores
- No culpar al usuario: "Ingresaste un CLABE inválida" → "Esa CLABE no parece correcta."
- No disculparse en exceso: "Lamentamos mucho este inconveniente" ocupa espacio y no ayuda.
- Sin lenguaje técnico: "null pointer", "timeout 503", "error de servidor".
- Sin signos de exclamación en errores. Nunca.
- No prometer tiempos de recuperación que no puedes cumplir.

---

## 5. Estados vacíos

Los estados vacíos son oportunidades subutilizadas. No son fallas — son invitaciones.

### Tres tipos

| Tipo | Contexto | Objetivo |
|---|---|---|
| **Vacío de primera vez** | El usuario aún no ha hecho nada | Invitar a la acción, reducir ansiedad |
| **Vacío limpiado** | El usuario eliminó todos los elementos | Confirmar éxito, ofrecer camino |
| **Sin resultados** | Búsqueda / filtro no devolvió nada | Ayudar a refinar o reiniciar |

### Fórmula: Título + Cuerpo (opcional) + CTA

**Primera vez:**
```
Sin movimientos todavía
Deposita para empezar a operar.
[Depositar]
```

**Sin resultados:**
```
Sin resultados para "bixon"
Revisa la ortografía o intenta con otro término.
[Limpiar búsqueda]
```

**Primera inversión:**
```
Tu portafolio está listo
Elige un activo para hacer tu primera inversión.
[Ver activos]
```

---

## 6. CTAs — Reglas especiales fintech/crypto

Los botones son el copy más importante del producto. Los usuarios los leen al final y los tocan primero.

### Fórmula CTA
**[Verbo] + [Objeto]** — opcionalmente + **[calificador]**

| Patrón | Ejemplo |
|---|---|
| Verbo + Objeto | "Depositar", "Retirar fondos", "Comprar Bitcoin" |
| Verbo + Objeto + Calificador | "Enviar $500 a Ana", "Vender 0.05 BTC" |
| Verbo de confirmación | "Sí, eliminar", "Entendido", "Confirmar operación" |

### Evitar labels genéricos
| Genérico | Mejor |
|---|---|
| Aceptar | [verbo específico de la acción] |
| Ok | Entendido / Listo |
| Siguiente | Verificar identidad / Agregar tarjeta / Confirmar datos |
| Cancelar | Mantener inversión / Seguir editando |
| Sí | Sí, retirar / Sí, cancelar (nombrar la consecuencia) |

### CTAs destructivos en fintech
- Siempre nombrar la consecuencia: "Cancelar inversión" no solo "Cancelar".
- Emparejar con una salida menos comprometida: "Cancelar inversión" / "Mantener inversión".
- Pantallas de retiro urgente: advertir sobre posibles penalizaciones o pérdida de rendimiento.

---

## 7. Onboarding — Fintech/crypto en México

El onboarding en fintech tiene una carga extra: muchos usuarios tienen desconfianza de productos financieros digitales. El copy debe construir confianza, no solo informar.

### Principios
- **Una idea por pantalla.** Nunca explicar dos cosas a la vez.
- **Beneficio primero**, no característica.
  - ❌ "Habilitamos sincronización de saldo en tiempo real."
  - ✅ "Tu saldo se actualiza solo — sin tener que recargar."
- **El progreso importa.** "Paso 1 de 4" reduce el abandono.
- **Respetar la opcionalidad.** "Ahora no" es una ruta válida en pasos no críticos.
- **No vender en el onboarding.** El usuario ya se registró. Entrega valor, no marketing.
- **Desmitificar crypto desde el inicio.** Si el producto incluye activos digitales, explicar brevemente en onboarding qué significa la volatilidad — reduce el churn ante primera caída de precio.
- **KYC — hazlo humano.** La verificación de identidad genera ansiedad. Explica por qué es necesaria y qué pasa con los datos.

### Ejemplo: Pantalla de KYC
```
Título: Verificamos tu identidad por tu seguridad
Cuerpo: Solo tomará unos minutos. Necesitamos tu INE vigente
        y una selfie. Tus datos están cifrados y no se comparten.
CTA: Comenzar verificación
Link secundario: ¿Por qué necesitan esto?
```

---

## 8. Notificaciones y push — Fintech/crypto

### Estructura: Valor primero, contexto después
- ❌ "Se ha registrado una nueva operación en tu cuenta."
- ✅ "Recibiste $1,200 de Juan Pérez."

### Reglas
- Personalizar cuando sea posible: nombre del usuario, monto, tipo de activo.
- Ser específico sobre qué requiere acción vs. qué es informativo.
- En crypto: incluir precio referencial cuando sea relevante — "Tu BTC bajó 5% hoy. Precio actual: $42,300 USD."
- **Nunca** usar notificaciones para incitar a comprar/vender basado en movimientos de mercado — riesgo regulatorio.
- Para alertas de seguridad: tono serio, acción inmediata clara.

### Ejemplos
```
Depósito recibido: "Recibiste $5,000 MXN. Ya están en tu cartera."
Transferencia saliente: "Enviaste $2,000 a Ana García."
Alerta de precio: "Bitcoin bajó 8% en las últimas 24h. Precio actual: $41,200 USD."
Alerta de seguridad: "Detectamos un inicio de sesión desde un nuevo dispositivo. ¿Fuiste tú?"
```

---

## 9. Estados de carga y progreso

Cortos pero ignorados con frecuencia. Afectan la confianza.

### Reglas
- Ser específico: "Procesando tu transferencia SPEI..." no "Cargando..."
- Usar gerundio: "Enviando...", "Verificando...", "Configurando tu cuenta..."
- Para esperas largas (>3s): agregar una línea de tranquilidad: "Esto suele tomar unos segundos."
- En operaciones de crypto: "Confirmando en blockchain..." es válido — educa al usuario sobre el proceso.
- Nunca usar porcentaje falso. El progreso inventado destruye la confianza.

### Ejemplos fintech
```
"Procesando tu depósito SPEI..."
"Verificando tu identidad..."
"Conectando con tu banco..."
"Confirmando en blockchain... (puede tardar 1–2 min)"
"Calculando tu rendimiento..."
```

---

## 10. Texto placeholder

El placeholder desaparece cuando el usuario escribe. No pongas instrucciones críticas en él.

### Reglas
- Solo para ejemplos de formato: "ej. 18 dígitos sin espacios"
- Nunca usar placeholder como etiqueta. La etiqueta debe permanecer visible.
- Evitar "Ingresa tu [nombre del campo]" — es redundante si la etiqueta ya lo dice.

### Ejemplos fintech mx
```
Campo CLABE: "ej. 012345678901234567"
Campo monto: "ej. 500.00"
Campo RFC: "ej. GOMA810102H45"
Campo de búsqueda: "Bitcoin, Ethereum, USDT..."
```
