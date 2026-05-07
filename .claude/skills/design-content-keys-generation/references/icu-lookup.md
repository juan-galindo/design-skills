# ICU placeholder lookup table

Figma prototypes use `[%s]` as a placeholder for dynamic values. Lokalise expects ICU named variables like `{asset}` or `{amount}`. This table maps a recognizable substring of the source text to the ICU variable that should replace each `[%s]` in it, position by position.

When a text node contains `[%s]`, the agent looks for the **longest** context string in this table that is a substring of the node text *and* whose own placeholder count matches the node's. If nothing matches, each `[%s]` is replaced with a generic `{param1}`, `{param2}`, … and the case is added to the unmatched-ICU report so the designer can extend this table.

## Why named variables matter

Translators and engineers downstream need to know what each placeholder means. `Compraste {asset}` is unambiguous; `Compraste {param1}` forces the translator to guess and the engineer to invent a name later. Keeping this table accurate is how we keep that quality gate.

## Current entries

| Context string (substring match) | Position | ICU variable |
|---|---|---|
| `Compraste [%s]` | 1 | `{asset}` |
| `[%s] [%s] a tu portafolio` | 1 | `{quantity}` |
| `[%s] [%s] a tu portafolio` | 2 | `{asset}` |
| `equivalente a [%s] [%s]` | 1 | `{amount}` |
| `equivalente a [%s] [%s]` | 2 | `{currency}` |
| `Enviaste [%s]` | 1 | `{amount}` |
| `Recibiste [%s]` | 1 | `{amount}` |
| `[%s] disponibles` | 1 | `{count}` |
| `Hola, [%s]` | 1 | `{name}` |

## Adding new entries

Add a row for any new dynamic string before running the skill on a screen that introduces it. Keep contexts as specific as possible — short generic strings (e.g. `[%s]` alone) cause false matches against unrelated text.
