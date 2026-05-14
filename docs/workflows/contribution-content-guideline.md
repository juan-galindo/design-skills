# Contributing a Content Guideline

How to add or edit a UX writing guideline in `specs/content/`. Follow these steps whether you are a human working in Claude Code or an agent executing the workflow.

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
| `feat/` | New guideline | `feat/abbreviations-guideline` |
| `fix/` | Correction in an existing guideline | `fix/cta-guideline-typo` |
| `docs/` | Documentation update, no behavior change | `docs/clarify-punctuation-rules` |

Include the JIRA key when one exists: `feat/DS-123-abbreviations-guideline`.

---

## Step 1 — Locate or create the file

Read `specs/content/index.md` to find the right tier for the guideline topic.

```
specs/content/
├── core/          # Universal principles (voice, tone, FEEL framework)
├── guidelines/    # Specific rules (capitalization, CTAs, punctuation…)
├── types/         # Content-type rules (emails, push notifications)
└── localization/  # Locale rules and compliance (es_MX, pt_BR…)
```

- **Editing an existing guideline** → Read the file at `specs/content/<tier>/<slug>.md`.
- **Adding a new guideline** → Read `specs/content/guidelines/_template.md`, then Write a new file at `specs/content/<tier>/<slug>.md` with `status: draft` in the frontmatter.

---

## Step 2 — Generate a draft

Use the content writing skill to populate the file from the template. Run this inside a Claude Code session:

```
/design-content-write — Draft a guideline for [topic] following the template in specs/content/guidelines/_template.md. Save it to specs/content/<tier>/<slug>.md with status: draft.
```

---

## Step 3 — Review the draft

Use the content review skill to audit the generated draft. Run this inside a Claude Code session:

```
/design-content-review — Review specs/content/<tier>/<slug>.md against our voice and UX writing principles.
```

Before proceeding, verify:
- Rationale is specific to Bitso's product context — not generic.
- Every Do/Don't example is grounded in real product copy.
- Region column values are valid: `All`, `EN`, `SP-MX`, `SP-AR`, `SP-CO`, `PT-BR`.
- No rules were invented — every rule must be traceable to an existing design decision.
- `status: draft` is set in the frontmatter.

Fix any issues flagged before continuing.

---

## Step 4 — Update the index

Edit `specs/content/index.md` and add (or update) the row for the new file in the correct tier table. Omitting this entry means skills will never preload the guideline.

---

## Step 5 — Update README

If this is a **new content guideline**, no README entry is needed — guidelines are not individually listed.

If this is a **new workflow guide**, add a row to the Contributing table in `README.md`:

```markdown
| Add or edit a content guideline | [`docs/workflows/contribution-content-guideline.md`](docs/workflows/contribution-content-guideline.md) |
```

Also update `docs/workflows/contribution-index.md` with the same entry.

---

## Step 6 — Commit and push

```bash
git add specs/content/<tier>/<slug>.md specs/content/index.md
git commit -m "docs(content): <short description>"
git push -u origin $(git branch --show-current)
```

---

## Step 7 — Open a PR

```bash
gh pr create \
  --title "docs(content): <short description>" \
  --body "## What changed
- 

## Why
- "
```

Assign at least one content designer as reviewer. AI-authored PRs require 2 human approvals.

---

## Step 8 — Request a review on Slack (optional)

To get faster feedback from the design team, post in `#design_pr_review`:

```
Hey guys, can you please review this PR? <GitHub Pull URL>
```
