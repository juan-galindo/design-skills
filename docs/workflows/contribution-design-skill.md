# Contributing a Skill

This guide is specific to the [`bitso-labs/design-skills`](https://github.com/bitso-labs/design-skills) repo. For porting a skill to the org-wide bundle, see [`contribution-org-skills-plugin.md`](contribution-org-skills-plugin.md).

How to edit a skill in `.claude/skills/` and open a PR. Follow these steps whether you are a human working in Claude Code or an agent executing the workflow.

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
| `feat/` | New skill or major addition | `feat/design-visual-qa` |
| `fix/` | Bug or correction | `fix/scan-flexible-target-detection` |
| `chore/` | Cleanup or restructuring | `chore/remove-stale-eval-artifacts` |
| `refactor/` | Restructuring without behavior change | `refactor/simplify-key-naming-rules` |

Include the JIRA key when one exists: `feat/DS-123-design-visual-qa`.

---

## Step 1 — Make the changes

Read the skill files before editing. Skills live in `.claude/skills/<skill-name>/`:

```
.claude/skills/<skill-name>/
├── SKILL.md        # Trigger description and numbered steps
├── references/     # Context files loaded by the skill
├── scripts/        # Optional Figma plugin scripts or automation
└── assets/         # Optional templates or static resources
```

Apply changes to the relevant file:

- **Behavior change** → Edit `SKILL.md`. Keep steps numbered and in order. The `description:` field controls auto-triggering — keep it precise.
- **Reference file** → Edit the file under `references/`. If a file is added or removed, update the "Bundled resources" table in `SKILL.md`.
- **Script** → Edit the file under `scripts/`. If the interface changes (new parameters, different output shape), update the step in `SKILL.md` that calls it.

---

## Step 2 — Run evals

Use the skill creator to measure trigger accuracy and output quality. Run this inside a Claude Code session:

```
/skill-creator — run evals for <skill-name>
```

Fix any regressions before continuing.

---

## Step 3 — Commit and push

```bash
git add .claude/skills/<skill-name>/
git commit -m "feat(skill): <short description>"
git push -u origin $(git branch --show-current)
```

---

## Step 4 — Open a PR

```bash
gh pr create --draft \
  --title "feat(skill): <short description>" \
  --body "## What changed
- 

## Why
- 

## Eval results
- Trigger accuracy: 
- Output quality: "
```

All skill changes require 2 human approvals before merging.

---

## Step 5 — Request a review on Slack (optional)

To get faster feedback from the design team, post in `#design_pr_review`:

```
Hey guys,
Can you please review this PR? <GitHub Pull URL>
```
