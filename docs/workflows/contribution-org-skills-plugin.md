# Contributing to the Bitso Org Bundle

How to port a skill from this repo into `bitsoex/ai-skills` and make it available org-wide. Follow these steps whether you are a human working in Claude Code or an agent executing the workflow.

**Prerequisite:** the skill must be merged to `main` in this repo before porting.

---

## About the bundle

The org bundle repo is at `bitsoex/ai-skills`. Skills can be added as standalone entries or bundled inside a plugin.

Available plugins:

| Plugin | Path | Purpose |
|---|---|---|
| `product-design` | `plugins/product-design/` | Product design skills |
| `bitso-canvas` | `plugins/bitso-canvas/` | Bitso Canvas feature skills for mobile and BFF |

Add the skill to whichever plugin you want to iterate on. If none fits, add it as a standalone skill under `skills/design/<skill-name>/`.

---

## Step 1 — Create a branch

Before making any change, verify the current branch. If on `main`, stop and create a branch.


## Step 2 — Copy the skill into the target plugin

Ask Claude to handle it and make sure all required files are updated.

## Step 3 — Check the frontmatter

Read `schemas/skill.schema.json` in the bundle repo.

---

## Step 4 — Validate

```bash
node scripts/validate.mjs
```

Fix every error. Do not push with validation errors.

---

## Step 5 — Commit and push

```bash
git add plugins/<plugin-name>/skills/<skill-name>/
git commit -m "[skills/design] <skill-name>: add initial version"
git push -u origin $(git branch --show-current)
```

---

## Step 6 — Open a draft PR

```bash
gh pr create --draft \
  --title "[skills/design] <skill-name>: <short summary>" \
  --body "## What the skill does
- 

## When it triggers
- 

## Test evidence
- Example invocation: 
- Expected output: "
```

CI runs `validate.mjs` automatically.

---

## Step 7 — Address CodeRabbit suggestions

Wait for CodeRabbit to post its review. Apply valid suggestions and dismiss the rest with a reply explaining why.

```bash
git add .
git commit -m "fix: address CodeRabbit suggestions"
git push
```

---

## Step 8 — Mark as ready for review

```bash
gh pr ready
```

Two approvals from CODEOWNERS are required to merge.

---

## Step 9 — Request review on Slack

Post in one of these channels:

- `#engineering_pr_review` — broad engineering audience
- `#squad_platform_ai_enablement` — smaller, focused audience (preferred)

```
Hey guys,
Can you please review this PR? <GitHub Pull URL>
```

---

## Step 10 — Verify after merge

```bash
./scripts/install-skill.sh design/<skill-name>
```

Confirm the skill appears in `/help` and auto-triggers correctly in a new Claude Code session.
