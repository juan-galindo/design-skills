# Design Review — Template

**Format:** Written doc (shared async before the session) + optional slides for walkthrough
**Audience:** Squad (Design, PM, Eng)
**Cadence:** Per deliverable or milestone
**Owner:** Designer owning the work

> See [writing principles](../index.md#writing-principles) before filling in.

---

## Purpose

A design review doc serves two jobs:
1. **Before the session** — gives reviewers context so the sync focuses on decisions, not discovery
2. **After the session** — becomes the decision log

---

## Structure

### Context

**Project:** [Name]
**Feature / flow:** [Name]
**Platform:** iOS / Android / Web
**Design phase:** Exploration / Concept / Detailed / Ready for dev

**Links:**
- Figma: [url]
- PRD / brief: [url]
- Previous review: [url] (if applicable)

---

### What we're reviewing

One paragraph. What is this design solving, and for whom?
Use SCR if there's a story to tell:
- Situation: [current state]
- Complication: [the problem]
- Resolution: [what this design proposes]

---

### Design decisions

The choices made and why. One section per key decision.
Use action framing: "We chose X because Y" not "Option A vs Option B."

**Decision:** [What was decided]
**Rationale:** [Why — constraint, user need, or principle]
**Alternatives considered:** [What was rejected and why]

---

### What we need feedback on

Be explicit. Name what you want reviewers to react to.
Label each question with who should answer it.

| # | Question | For |
|---|---|---|
| 1 | [Specific question] | PM / Eng / Design |
| 2 | [Specific question] | PM / Eng / Design |
| 3 | [Specific question] | PM / Eng / Design |

Max 3 questions. More than 3 means the design isn't ready for review.

---

### Edge cases and states

What is already covered. Reviewers won't need to raise these.

- [ ] Empty state
- [ ] Error state
- [ ] Loading state
- [ ] Offline state
- [ ] Accessibility (contrast, touch targets, VoiceOver labels)
- [ ] Localization (text expansion, RTL if applicable)

---

### Open items

What is NOT yet resolved. Be honest — this builds trust.

| Item | Owner | Due |
|---|---|---|
| [Unresolved item] | [Name] | [Date] |

---

### Decision log

Fill in after the session.

| Decision | Made by | Date |
|---|---|---|
| [What was agreed] | [Who] | [Date] |
