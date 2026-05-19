---
name: implementation
description: Validates whether a design will actually hold up against the MDS contract — that variants, slots, tokens, and compositions used in Figma are real, ready, and used within their documented limits.
load: on-demand
source_of_truth: ../../../specs/components/
---

# Implementation — foundation layer

Load this foundation when you need to verify that a **design will hold up** against the MDS contract. This is the "are the pieces real" layer, not the "is it pretty" layer (that's `taste.md`) or the "is it the right component for the scenario" layer (that's `quality.md`).

This lens is for **designers working in Figma**, not for engineers reviewing code. The question it answers is: *if I hand this design off, will the system actually support what I've drawn?*

## Source of truth

Per-component contracts live in [`specs/components/`](../../../specs/components/). Each spec has a **Structure** section (variants, slots), a **Token bindings** section (which tokens are valid where), and a **Text slot rules** section (slot-level character limits and content type rules).

Reading order for any implementation check:

1. Frontmatter — confirm `status` is `ready` (not `draft` or `deprecated` / `superseded_by`)
2. **Agent summary** — quick MUST / MUST NOT rules
3. **Structure** — verify the variant + slot combo you used exists
4. **Token bindings** — verify the token applied to that slot is allowed
5. **Text slot rules** — verify character limits, line counts, allowed content types

## What to validate in the design

| Concern | Check against |
|---------|---------------|
| Variant exists in the library | `specs/components/{id}.md` → Structure → variants table |
| Slot accepts the content type you placed in it | Structure → slots, plus Text slot rules |
| Token applied is valid for that slot | Token bindings table |
| Composition with adjacent components is allowed | Usage & behavior → Composition + `relationships.composes_with` in frontmatter |
| State / interaction is documented | Interactions section (MUST be filled for interactive components) |
| Mobile accessibility is documented for the component | Accessibility section (VoiceOver / TalkBack) |
| Component is shippable | Frontmatter `status: ready` — not `draft`, not `deprecated`, no `superseded_by` |

## Component relationships

Every component and pattern spec declares its relationships in YAML frontmatter. Use this table to pick the right relationship type when authoring a new spec, or to validate the relationships on an existing one.

| Relationship | Declared in | Direction | Means | When to declare | Example |
|--------------|-------------|-----------|-------|-----------------|---------|
| `composes_with` | components | Component → Component | The two components are documented to stack, nest, or sit adjacent on a surface | When a visual or behavioral stacking is part of the supported usage | `MDSAppBar` `composes_with` `MDSHeader` |
| `requires` | components, patterns | Spec → Spec | The host cannot be used without the referenced spec being present | When the host's rules depend on another spec to function | `bullet-points` `requires` `MDSBottomSheet` in its slot host |
| `conflicts_with` | components, patterns | Spec → Spec | The two should not co-exist on the same surface | When two specs solve the same problem or fight for the same visual role | Two primary CTAs on one screen `conflict_with` each other |
| `applies_to` | patterns only | Pattern → Component(s) | Lists the host components the pattern is valid for | Always declare for a pattern — scopes where the pattern's rules apply | `bullet-points` `applies_to` `MDSBottomSheet`, `MDSCard` |
| `superseded_by` | components, patterns (frontmatter status block) | Old → New | This spec is replaced by a newer one and should not be used in new work | Pair with `status: deprecated` whenever a successor ships | `tabs-v0` `superseded_by` `tabs` |

### Rules for declaring relationships

- **Be explicit, not generous.** Only declare a relationship that is intentionally supported. A relationship in frontmatter is a promise the system will honor it.
- **Symmetry matters for `composes_with`.** If A composes with B, B's spec should also list A. If only one side declares it, fix the missing side.
- **`conflicts_with` overrides `composes_with`.** If both appear, the conflict wins — flag and resolve before shipping the spec.
- **Patterns must declare `applies_to`.** A pattern with no `applies_to` is unscoped — it cannot be validated against any surface.
- **`superseded_by` is final.** Once a spec is superseded, do not place new uses of it. The orchestrator and handoff skills will reject `status: deprecated` components in fresh work.

## Contract behavior

- A component spec is **the contract**. If a variant, slot, or property is not documented, **it does not exist** — do not detach and modify, do not invent a new variant in the file.
- Component tokens auto-resolve Light / Dark. Semantic tokens follow theme. Base tokens are static — using them breaks theming for whoever implements the design.
- Patterns (`specs/patterns/`) layer rules on top of host components. Always load both the pattern spec and the host component spec when designing the surface.
- Slot limits (character count, line count, allowed content types) are not suggestions — they are what the engineer will enforce. Designing past them creates rework.

## When to load this foundation

- Mid-design check before stakeholder review (Step 8)
- Pre-handoff audit (Step 11) — pairs with the `design-handoff` skill
- When detaching an MDS component is tempting — load this first and find the right variant instead
- When a new screen pulls in a component you haven't used before
- When inheriting a Figma file from another designer and validating MDS compliance

## Red flags

- Detached MDS instances with manual overrides where a documented variant would fit
- Slots filled with content types the spec doesn't allow (e.g. an icon in a text-only slot)
- Token-bound layers swapped to raw fills / styles to match a Figma reference
- A `status: draft` or `status: deprecated` component placed in a flow heading to handoff
- A pattern applied to a host component not in its `applies_to` list
- Interactive component used without the corresponding Interactions / Accessibility section being populated in its spec — escalate before shipping
- Text in a slot exceeds the documented character limit at the longest supported locale (es_MX, es_AR, es_CO, pt_BR, en_US)
