---
name: composition-recipes
description: Reusable composition recipes that define how UI structures should be assembled. Recipes appear consistently across product surfaces and reduce per-screen invention.
load: on-demand
source_of_truth: ../../../specs/patterns/layouts/
---

# Composition recipes — foundation layer

Load this foundation when assembling a surface from multiple components. A **recipe** is a named, repeatable way to combine MDS components for a specific content scenario. Recipes reduce per-screen invention and keep surfaces consistent.

## Source of truth

Recipes live in [`specs/patterns/layouts/`](../../../specs/patterns/layouts/). Each recipe is a spec file that names the host components, their stacking order, and the rules that govern the composition. Read the recipe first; load each referenced component and pattern spec as needed.

## Recipes vs patterns vs components

| Layer | Defines | Lives in |
|-------|---------|----------|
| **Component** | One MDS building block (`MDSAppBar`, `MDSBottomSheet`) | `specs/components/` |
| **Pattern** | Markup rules across slots / surfaces (bullet markers, stacking) | `specs/patterns/` |
| **Recipe (product layout)** | A common combination of components for a specific scenario (e.g. confirmation sheet with bullets, transaction list with header) | `specs/patterns/layouts/` |

A recipe always **composes existing components and patterns**. If a recipe needs new behavior, that behavior belongs in a component or pattern spec, not the recipe.

## Canonical recipes

### Confirmation bottom sheet

**Use when:** a **forced informational interruption** must gate a transaction before the user can proceed — e.g. pattern day trader (PDT) warning, regulatory notice, risk disclosure. The sheet informs; the user acknowledges; the actual commit happens on the confirmation screen that follows.

**MUST NOT use** for the transaction confirmation step itself (buy / sell / convert / send / withdraw / deposit). When the surface needs `MDS ConfirmationHeader` + `MDS ReadOnlyList` (price, fee, total) and a commit action, use the full-screen **[Confirmation Screen](../../../specs/patterns/layouts/confirmation-screen.md)** instead.

- `MDSBottomSheet` `bottomSheetTextDefault` (host) — see `specs/components/bottom-sheet.md`
- Title slot — short statement of the rule or warning (`"Control de operador diario"`)
- Body slot — bullets via the `bullet-points` pattern (`specs/patterns/composition/bullet-points.md`) explaining the constraint
- Primary action — acknowledgment verb: `"Entendido"` / `"Continuar"` (not a commit action)
- Secondary action — `"Cancelar"` (dismisses and returns to entry form)

Spatial rhythm: bullets use 12px related-content spacing; actions use the component's built-in padding. Don't override either.

### App Bar + Header stack

**Use when:** a screen needs both navigation context (app bar) and a content title (header).

- `MDSAppBar` (top) — minimal: back, title, optional trailing icon. See `specs/components/app-bar.md`.
- `MDSHeader` (below) — page-level title + subtitle. See `specs/components/header.md`.

Don't duplicate the title between AppBar and Header. AppBar shows navigational context (where you are); Header shows content title (what you're doing here). When in doubt, the Header wins for content and AppBar shows the section name.

### Tabbed surface

**Use when:** a screen has 2–5 peer views of related content.

- `MDSTabs` (top of content area) — see `specs/components/tabs.md`
- Tab content area below — each tab can independently host any other recipe

If you have 1 tab, you don't need tabs. If you have 6+, reconsider — that's usually a list or a filter, not tabs.

### Search-on-list

**Use when:** a list grows long enough that visual scanning is slow.

- `MDSSearchField` at the top of the list — see `specs/components/search-field.md`
- List content below — empty state when no results

Don't combine search with tabs unless each tab has its own list — searching across tabs is confusing.

## How to add a recipe

A recipe is worth documenting when:

- It appears on 2+ live surfaces
- It would otherwise be re-invented from scratch each time
- Its components compose in a non-obvious way (stacking, sizing, ordering)

Don't promote one-off combinations to recipes. If a recipe only appears once, it's a screen, not a recipe.

## When to load this foundation

- Step 5 of the design process — choosing the layout for a new surface
- Reviewing a screen to see if it should be a recipe
- Mentoring on "how do we usually do X"
- Refactoring multiple inconsistent surfaces toward one shared composition

## Red flags

- Custom composition where a named recipe exists
- A "recipe" that uses only one component (that's a component, not a recipe)
- A recipe with rules that contradict the host component spec (the host always wins — see `specs/patterns/CLAUDE.md` priority order)
- Reinventing layout from scratch on every screen
