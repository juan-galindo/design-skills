# Pensamiento sistémico para UX Writing — Referencia (Fintech / Crypto / Inversiones — es_MX)

## ¿Qué es el pensamiento sistémico en contenido?

El pensamiento sistémico significa entender que ningún copy existe de manera aislada. Cada palabra es parte de:

1. **Un flujo** — la secuencia de pantallas antes y después
2. **Un modelo mental** — las creencias del usuario sobre cómo funciona el producto
3. **Un sistema de terminología** — el vocabulario que el producto usa de manera consistente
4. **Un arco emocional** — los sentimientos del usuario mientras avanza en la experiencia
5. **Un contexto de plataforma** — móvil vs. web, push vs. in-app, tiempo real vs. asíncrono
6. **Un marco regulatorio** — lo que se puede y no se puede decir en productos financieros en México

Escribir sin este contexto produce copy técnicamente correcto que falla en la práctica.

---

## Las 5 preguntas de contexto

Antes de escribir, responde estas:

### 1. Entrada: ¿Cómo llegó el usuario aquí?
- ¿Tocó una notificación push? (probablemente distraído, puede no tener contexto completo)
- ¿Completó un paso anterior? (tiene contexto, está en un flujo)
- ¿Buscó algo? (tiene intención, busca algo específico)
- ¿Llegó en frío? (sin contexto previo, necesita más orientación)
- ¿Respondió a una alerta de precio o movimiento de mercado? (puede estar ansioso)

**Implicación para el copy**: Las entradas en frío necesitan más anclaje. Los estados en medio de un flujo pueden ser más tersos.

---

### 2. Estado: ¿Cuál es el estado actual del sistema?
- ¿Estado cargado? (datos listos)
- ¿Estado de carga? (procesando)
- ¿Estado vacío? (sin datos)
- ¿Estado de error? (algo falló)
- ¿Estado de éxito? (acción completada)
- ¿Estado parcial? (algunos datos, algunos faltantes)
- ¿Estado de volatilidad? (precio del activo cambió significativamente)

**Implicación para el copy**: Cada estado del sistema requiere diferente tono y estructura de copy. Nunca uses el mismo copy para un estado de carga y uno de error.

---

### 3. Riesgo: ¿Cuál es la consecuencia de esta acción?

| Nivel | Ejemplos en fintech/crypto |
|---|---|
| **Bajo** | Cambiar tema visual, ajustar notificaciones |
| **Medio** | Ver estado de una transferencia, consultar rendimiento |
| **Alto** | Enviar dinero, comprar/vender crypto, contratar un producto |
| **Crítico** | Cancelar inversión a pérdida, eliminar cuenta, autorizar acceso a terceros |

**Implicación para el copy**: Aumenta la formalidad y la especificidad con el nivel de riesgo. Los momentos de alto riesgo necesitan declaraciones explícitas de consecuencia, no solo labels.

---

### 4. Frecuencia: ¿Es la primera vez o la enésima?
- **Primera vez**: El usuario necesita orientación. Más explicación es apropiada. Introduce términos.
- **Usuario recurrente**: Conoce el flujo. La explicación extra es fricción. Sé breve.
- **Recuperación de error**: El usuario ya vio la ruta feliz. Enfócate en qué es diferente.
- **Primera exposición a crypto/inversiones**: Requiere educación básica sobre volatilidad y riesgo antes de la acción.

**Implicación para el copy**: Diseña para la primera experiencia pero no penalices al usuario recurrente con verbosidad. Usa revelación progresiva: más detalle en el primer encuentro, menos en los posteriores.

---

### 5. Salida: ¿A dónde va el usuario desde aquí?
- ¿Continúa al siguiente paso en el mismo flujo?
- ¿Sale del producto (liga externa, OS nativo, email)?
- ¿Termina el flujo (completado, cancelado)?
- ¿Puede regresar?
- ¿La acción es reversible o irreversible?

**Implicación para el copy**: Si el usuario continúa en el flujo, el CTA debe nombrar el siguiente paso. Si el flujo termina, el CTA debe reconocer la finalización. Las acciones irreversibles (venta a pérdida, cancelación de inversión) necesitan copy de confirmación explícito.

---

## El modelo de cadena de contenido

Cada pieza de copy de UI es parte de una **cadena de contenido** — una secuencia de mensajes conectados que juntos cuentan una historia coherente.

```
[Punto de entrada / disparador]
        ↓
[Título de pantalla — orienta]
        ↓
[Cuerpo / descripción — informa o instruye]
        ↓
[CTA — compromete]
        ↓
[Confirmación / éxito — cierra el loop]
        ↓
[Notificación o siguiente paso — continúa la cadena]
```

Una ruptura en cualquier punto de esta cadena genera confusión. El pensamiento sistémico significa auditar todos los nodos, no solo el que estás escribiendo.

### Ejemplo: Flujo de compra de Bitcoin — Cadena de contenido

| Paso | Copy | Notas |
|---|---|---|
| Entrada (push) | "Bitcoin bajó 5%. ¿Quieres comprar más?" | Valor específico, no urgencia artificial |
| Título de pantalla | "Comprar Bitcoin" | Presente, acción directa |
| Cuerpo | "Precio actual: $42,300 USD · Volátil por naturaleza" | Contexto de precio + recordatorio de riesgo |
| Input | "Monto en MXN" / "0.00 BTC equivalente" | Conversión en tiempo real |
| Advertencia | "El precio puede cambiar antes de confirmar." | Honesto, sin alarmar |
| CTA principal | "Confirmar compra" | Específico, no "Siguiente" |
| Estado de procesamiento | "Procesando tu compra..." | Gerundio, específico |
| Confirmación | "Compraste 0.0023 BTC" | Cantidad exacta, pasado |
| Detalle | "A $42,315 USD · Comisión: $25 MXN" | Transparencia total |
| Follow-on | "Tu portafolio aumentó 12%. Ver detalle →" | Forward-looking, no promesa |

Cada línea es simple. Juntas forman un arco coherente.

---

## Sistemas de terminología en fintech/crypto mx

### Por qué importa la terminología
Si el producto usa "cartera" en una pantalla y "cuenta" en la siguiente, los usuarios piensan que son cosas distintas. La terminología inconsistente:
- Genera confusión y tickets de soporte
- Erosiona la confianza
- Es señal de desorganización interna para el usuario
- En crypto especialmente: los usuarios novatos ya están confundidos — no añadas más ambigüedad

### Mapa de terminología mínimo

| Categoría | Preguntas a responder |
|---|---|
| Sustantivos core | ¿Cuál es el objeto principal con el que trabaja el usuario? (cartera, cuenta, portafolio, posición) |
| Verbos core | ¿Qué hace el usuario? (depositar, retirar, comprar, vender, enviar, recibir, intercambiar) |
| Términos de estado | ¿Cómo describes los estados? (pendiente, completado, fallido, cancelado, en proceso) |
| Términos de persona | ¿Cómo te refieres al usuario? (tú, tu cuenta) ¿A terceros? (destinatario, contacto) |
| Vocabulario de errores | ¿Qué palabras se usan en estados de error? (no pudimos, falló, no disponible) |
| Términos de activos | Bitcoin o BTC, Ethereum o ETH — elegir el nivel de formalidad y ser consistente |

**Regla**: Introduce un término una vez con contexto completo. Úsalo exactamente igual todas las veces después.

---

## Mapeo del arco emocional en fintech/crypto

Los usuarios no están en un estado neutral. Su contexto emocional cambia a lo largo de un flujo. Tu tono debe rastrearlo.

### Arco emocional ejemplo: Primer depósito y primera compra de crypto

```
Curioso → Interesado → Ansioso (KYC) → Aliviado → Emocionado → Nervioso (primera compra) → Satisfecho
```

| Etapa | Estado emocional | Guía de tono |
|---|---|---|
| Curioso | Neutral | Motivador, beneficio primero |
| Interesado | Comprometido | Claro, informativo, sin presión |
| Ansioso (KYC) | Desconfiado | Transparente, explica el porqué, protector |
| Aliviado (KYC aprobado) | Relajado | Cálido, celebratorio pero mesurado |
| Emocionado (primer depósito) | Optimista | Eficiente, respeta su momentum |
| Nervioso (primera compra crypto) | Cauteloso | Informativo, sin alarmismo, sin presión |
| Satisfecho | Contento | Cálido, forward-looking, sin over-sell |

**Nunca** apliques un tono plano y neutral a un momento ansioso o frustrado. El usuario siente algo; tu copy debe reconocerlo, no ignorarlo.

---

## Consistencia multi-superficie

El mismo usuario interactúa con tu producto en múltiples superficies. El copy debe ser coherente en todas.

| Superficie | Carácter | Restricciones |
|---|---|---|
| App móvil (in-app) | Experiencia principal | Contexto completo, puede ser más largo |
| Push notification | Interrupción | 1 oración máx, valor primero, sin FOMO artificial |
| Email transaccional | Seguimiento / registro | Más formal, información completa, disclaimer de riesgo |
| Web app | Contexto de escritorio | Misma voz, puede ser más detallado |
| SMS / OTP | Utilidad pura | Ultra corto, funcional, sin branding innecesario |
| Página de error (404/500) | Estado de recuperación | Calmado, útil, sin panic |

**Regla**: Misma voz, registro adaptado. El producto debe sonar como una sola persona hablando en todos los canales — no como varios departamentos.

---

## Deuda de copy en fintech

**La deuda de copy** se acumula cuando:
- Los términos cambian pero las pantallas antiguas no se actualizan
- Diferentes escritores usan diferentes palabras para el mismo concepto
- Los estados de borde (vacío, error, carga) se escriben reactivamente sin revisar el flujo
- El copy de marketing se filtra a la UI del producto (tono aspiracional en momentos funcionales)
- La localización la hace traducción sin revisión de UX writer (gramática correcta, experiencia incorrecta)
- Los disclaimers de riesgo se agregan ad-hoc sin integración en el flujo

### Señales de deuda de copy en fintech/crypto
- Los usuarios contactan soporte para "traducir" el copy ("¿qué significa 'liquidez' aquí?")
- Tests A/B muestran que una variante gana principalmente porque los usuarios la entienden
- Nuevos integrantes del equipo no pueden identificar el término "oficial" para un concepto de producto
- Los mensajes de error referencian estados técnicos del sistema
- El mismo activo se llama "Bitcoin", "BTC" y "bitcoin" en diferentes partes del producto

---

## Heurísticas para copy sistémico en fintech

1. **El test del extraño**: ¿Alguien que nunca usó el producto entendería este mensaje sin ver lo que vino antes? Si no, agrega contexto o reduce la dependencia de contexto.

2. **El test de flujo roto**: ¿Qué pasa si el usuario saltó el paso anterior? ¿El paso actual sigue teniendo sentido? Escribe copy que sobreviva flujos parciales.

3. **El test de 6 meses**: ¿Seguirá siendo exacto este copy en 6 meses? Evita referencias a estados temporales ("nuevo", "recién lanzado") en UI permanente.

4. **El test de localización**: ¿Este copy depende del orden de palabras en español, un modismo o un juego de palabras? Si es así, fallará en otras variantes del idioma.

5. **El test del error primero**: Escribe el estado de error antes que la ruta feliz. Si no puedes escribir un mensaje de error claro, quizás la función no está bien diseñada todavía.

6. **El test regulatorio**: ¿Alguna frase promete rendimientos, garantiza resultados o da asesoría de inversión? Si sí, reescribe. Consulta [compliance-mx.md](compliance-mx.md).

7. **El test de volatilidad**: ¿El copy asume que el precio/valor estará estable? En crypto, el valor puede cambiar mientras el usuario lee la pantalla. El copy debe ser atemporal o dinámico.
