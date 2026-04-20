---
name: ds-create-variants
description: Create, expand, or audit component variant structures in Figma following MDS naming conventions. Use when the user asks to create variants, add states to a component, define component properties, organize a variant grid, audit naming consistency, or says things like "I need button variants", "add size variants to the Card", "standardize variant naming in Input".
---

Create, expand, or audit component variant structures in Figma following MDS naming conventions.

---

## Step 1 — Gather Requirements

Before designing variants, clarify:
- **Component type**: What UI element? (button, input, card, icon, etc.)
- **Variant dimensions**: What axes of variation? (size, state, style, theme, etc.)
- **States needed**: Default, hover, focus, active, disabled, loading, error, success?
- **Design tokens**: Reference semantic tokens from `index/tokens.md` (Semantic collection). Use Component tokens first if available, fall back to Semantic — never use Base tokens directly.
- **Text styles**: All text layers must use a named text style from the `## Text Styles` section of `index/tokens.md`. Do not invent arbitrary font sizes, weights, or line heights.
- **Existing components**: Extending an existing component or creating from scratch?
- **Naming conventions**: Does the project have established naming patterns?

If the user's request already answers these, proceed directly without asking.

---

## Step 2 — Design the Variant Architecture

**Naming Conventions** (from `ds-rename-components`):
- PascalCase for component names: `Button`, `InputField`, `CardTile`
- Variant property names — lowercase single words: `state`, `size`, `color`
- Boolean property names — camelCase with `has` prefix: `hasIcon`, `hasLabel`, `hasMedia`
- Property values — PascalCase with spaces: `Default`, `Small`, `On Dark`, `Extra Large`
- `true`/`false` boolean values stay lowercase as-is
- No abbreviations unless universally understood

**Variant Dimensions (recommended property order):**
1. `color` — visual style (Primary, Secondary, Ghost, Outline)
2. `size` — scale (Extra Small, Small, Medium, Large, Extra Large)
3. `state` — interactivity (Default, Hover, Focus, Active, Disabled, Loading)
4. Boolean toggles — `hasIcon`, `hasLabel` (True/False)

**Boolean vs. Enum:**
- Boolean for binary toggles (icon presence, label visibility)
- Enum for mutually exclusive options (size, state, color)
- Keep enum lists to 8 or fewer values

---

## Step 3 — Output the Variant Specification

**Component Name**: [Name]

**Variant Dimensions**:

| Property | Type | Values | Default |
|----------|------|--------|---------|

**Total Variant Count**: [N]

**Naming Pattern**: `ComponentName / color / size / state`

**Figma Setup Steps**:
1. [Step-by-step instructions for creating in Figma]

**Auto Layout Config**: [Padding, gap, direction, alignment per variant group]

**Notes & Recommendations**: [Edge cases, accessibility notes, token references]

---

## Step 4 — Variant Grid Organization

When laying out variants in Figma:
- Rows = State, Columns = Type/Variant (recommended)
- 16px or 24px gaps between variants
- Add annotations or a legend frame for documentation
- Group the variant set in a clearly labeled frame or section

---

## Quality Checks

- [ ] All text layers use a named style from `index/tokens.md ## Text Styles` — no arbitrary sizes
- [ ] No duplicate variant combinations
- [ ] All states represented for each type/size combination
- [ ] Naming is consistent and follows MDS conventions
- [ ] Boolean properties don't duplicate what enums already cover
- [ ] Total variant count < 200 (flag if higher)
- [ ] Accessibility states (focus, disabled) are included
- [ ] Dark mode variants included if the product uses dark mode

---

## Edge Cases

- **Too many variants**: Suggest splitting into multiple components or using component properties more efficiently
- **Inconsistent existing patterns**: Flag the inconsistency, propose a migration path, proceed with the recommended standard
- **Ambiguous requirements**: Ask one focused clarifying question — don't block on multiple unknowns
- **Platform-specific needs**: Adapt for web, iOS, Android, or cross-platform as specified