# Contributing a Component Specification

How to add or edit a component spec in `specs/components/`. Follow these steps whether you are a human working in Claude Code or an agent executing the workflow.

---

## Step 0 — Create a branch

Before making any change, verify the current branch. If on `main`, stop and create a branch.

```bash
git branch --show-current
git fetch --all
git checkout main && git pull origin main
git checkout -b {type}/{description}
```

| Type | When | Example |
|---|---|---|
| `spec/` | New spec or meaningful rule addition | `spec/add-bottom-sheet-behavior` |
| `fix/` | Correction in an existing spec | `fix/header-spacing-typo` |
| `docs/` | Clarification, no behavior change | `docs/clarify-accordion-tap-target` |
| `chore/` | Metadata or formatting cleanup | `chore/update-figma-node-ids` |

---

## Step 1 — Locate or create the file

Component specs live in `specs/components/`. Each file follows the shared template at `specs/_template.md`.

```
specs/
├── _template.md          # Canonical template — always copy from here
├── components/           # One file per MDS component
├── patterns/             # Layout and composition rules
└── tokens/               # Token reference (read-only — do not edit directly)
```

- **Editing an existing spec** → Read the file at `specs/components/<component>.md`.
- **Adding a new spec** → Copy `specs/_template.md` to `specs/components/<component>.md`. Set `status: draft` in the frontmatter.

---

## Step 2 — Understand what may be changed

Component specs describe **design intent and token usage only**. Before writing, know the boundaries:

| Allowed | Not allowed |
|---|---|
| When to use / when not to use rules | TSX, code snippets, or implementation details |
| Variant behavior and interaction rules | Hex values or raw dp/pt numbers |
| Spacing rules with MDS token names | Rules invented without a traceable design decision |
| Content guidelines for the component | Figma Storybook or dev-handoff notes |

Always use token names, never raw values. Read `specs/tokens/token-reference.md` for the authoritative list.

Token hierarchy (use the lowest tier that applies):

1. **Component token** — supports Light/Dark automatically.
2. **Semantic token** — when no component token exists.
3. **Base token** — primitives only, never use directly in components.

---

## Step 3 — Apply the change

### Editing an existing rule

1. Read the full spec file before making any edit.
2. Locate the relevant section (variant, behavior, spacing, content guidelines).
3. Add or update the rule. Keep bullet points parallel and specific.
4. If the change affects spacing, add (or update) a bullet in the **Spacing** section as well, so the rule appears in both places.

### Adding a new spec

1. Copy `specs/_template.md` to `specs/components/<component>.md`.
2. Fill in all frontmatter fields. Set `status: draft`.
3. Complete every required section: **What it is**, **When to use**, **When NOT to use**, **Content guidelines**, **Related specs**.
4. Add optional sections only when they apply: **Variants**, **Spacing**, **Behavior**, **Hierarchy and structure**.

### Frontmatter reference

```yaml
---
id: component-id           # kebab-case, matches filename
name: Component Display Name
category: component        # token | component | pattern
platform: mobile
tags: [tag1, tag2]
status: draft              # draft until reviewed; then: ready
figma node: "XXXXX:XXXXX"  # node ID from the MDS Figma file
---
```

To find the Figma node ID, look up the component in `specs/figma-catalog/mobile-components.md`.

---

## Step 4 — Self-review checklist

Before committing, verify:

- [ ] No hex values or raw dp/pt numbers — token names only.
- [ ] No TSX, code, or Storybook references.
- [ ] Every new rule is traceable to an existing design decision (not invented).
- [ ] Spacing rules appear in both the variant **Behavior** block and the **Spacing** section.
- [ ] New specs have `status: draft` in frontmatter.
- [ ] Edited specs preserve `status: ready` only if the change is non-breaking.
- [ ] `Related specs` links are valid relative paths.

---

## Step 5 — Update README

If this change is a **new spec**, no README entry is needed — specs are not individually listed.

If this change is a **new workflow guide**, add a row to the Contributing table in `README.md`:

```markdown
| Add or edit a component specification | [`docs/workflows/contribution-component-spec.md`](docs/workflows/contribution-component-spec.md) |
```

Also update `docs/workflows/contribution-index.md` with the same entry.

---

## Step 6 — Commit and push

```bash
git add specs/components/<component>.md
git commit -m "spec(<component>): <short description>"
git push -u origin $(git branch --show-current)
```

---

## Step 7 — Open a PR

```bash
gh pr create \
  --title "spec(<component>): <short description>" \
  --body "## What changed
- 
```

Assign at least one senior designer as reviewer. AI-authored PRs require 2 human approvals before merging.

---

## Step 8 — Request a review on Slack (optional)

To get faster feedback from the design team, post in `#design_pr_review`:

```
Hey guys, can you please review this PR? <GitHub Pull URL>
```
