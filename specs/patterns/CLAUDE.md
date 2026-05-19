# Pattern Spec — Agent Guide

> AI agents apply this file when reading or writing under `specs/patterns/`.
> Template: [`../_template-pattern.md`](../_template-pattern.md) · Reference: [`composition/bullet-points.md`](./composition/bullet-points.md).
>
> Patterns are organized by **scope**:
> - **`composition/`** — slot-level rules that compose inside hosts (bullets, lists, stacks)
> - **`layouts/`** — full-screen layout recipes (product screens, modals, sheets)

## Patterns vs components

| | **Component** | **Pattern** |
|---|---------------|-------------|
| Defines | One MDS building block | How to combine blocks on a surface |
| Template | [`../_template.md`](../_template.md) | [`../_template-pattern.md`](../_template-pattern.md) |
| Frontmatter `relationships` | `composes_with` · `conflicts_with` · `requires` | `applies_to` (host components) · `conflicts_with` · `requires` |
| Figma | `figma node` on the component | Optional — may reference catalog only |

**Rule of thumb:** If it has a single library component name (`MDSBottomSheet`, `MDSTabs`), spec the **component**. If it rules markup across slots/surfaces (bullet markers, stacking), spec the **pattern** and link hosts.

## Section guide

Same section order as [component specs](../components/CLAUDE.md) for predictable agent reads:

| Section | Purpose |
|---------|---------|
| Agent summary | MUST rules + which components/slots implement the pattern |
| Overview | What + why |
| Structure | Variants table + per-host stack (link to component anchors) |
| Usage & behavior | When to use / NOT · shared rules · edge cases |
| Interactions | Gestures/motion, or `N/A` for static patterns |
| Accessibility | **Mobile only** — VoiceOver / TalkBack |
| Design intent | Principles — no duplicate MUST NOT lists |
| Token bindings | Spacing, type — token paths only |
| Text slot rules | Pointer to `specs/content/` for voice; slot limits here |
| Verification | Checklist |
| Related specs | Components, tokens, content |

## When to load what

| Task | Load |
|------|------|
| Pattern rules | `specs/patterns/{scope}/{id}.md` (`composition/` or `layouts/`) |
| Host component behavior | `specs/components/{id}.md` (e.g. bottom-sheet for dot bullets) |
| Copy / bullets punctuation | `specs/content/` |
| Tokens | `specs/tokens/token-reference.md` |

**Always load both** pattern + host component when implementing (e.g. sheet with bullets → `bullet-points.md` + `bottom-sheet.md`).

## Priority when rules conflict

1. **Host component** Usage & behavior (`MUST` / `MUST NOT` for the surface)
2. **Pattern** Usage & behavior (marker, count, surface constraints)
3. **Token bindings** (either file — no raw hex)
4. **Agent summary** (must not contradict 1–2)
5. **Design intent**

## Template compliance

Every pattern spec SHOULD include:

- Frontmatter: `id`, `name`, `category: pattern`, `platform`, `status`, `relationships.applies_to`
- Body sections from [`../_template-pattern.md`](../_template-pattern.md)
- **Related specs** links to every host in `applies_to` and any `requires` component/pattern

### Red flags

- Pattern rules duplicated in full inside a component spec (component should link + sheet-specific stack only)
- Arrow/dot (or equivalent) rules without naming the **host slot or component**
- Raw `8px` / hex in body — use **Token bindings**
- Web keyboard accessibility — patterns are **mobile** (see component a11y guide)
- `applies_to` empty while the pattern names a specific slot (e.g. `bottomSheetTextBulletsSlot`)

### Optional

Mark `N/A — [reason]` instead of deleting headings. **Examples** optional if Structure + Usage cover cases.
