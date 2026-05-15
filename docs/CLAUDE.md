# Docs — Agent Guide

> AI agents automatically detect this file when working inside `docs/`.
> It provides an overview of the folder structure and directs agents to the right subfolder for each task.

This folder stores **produced artifacts** — documents created as outputs of design and content work. It is distinct from `specs/`, which stores reference guidelines used as inputs.

---

## Folder map

| Folder | What it stores | Agent instructions |
|--------|---------------|-------------------|
| `content/` | Help center articles and Lokalise key exports | See `content/CLAUDE.md` for rules. |
| `decisions/` | Design decision records (DR) and alignment docs (DA) | Read `decisions/CLAUDE.md` for review rules and template compliance criteria. |
| `features/` | Feature specifications and architecture docs | Read `features/CLAUDE.md` for review rules, user story format, and technology-agnostic enforcement. |
| `workflows/` | Contribution guides for skills, content, and the org plugin | Human-authored guides. No agent review rules apply — treat as reference only. |

---

## General rules for agents working in `docs/`

- Every artifact under `decisions/` and `features/` must have a YAML frontmatter block. See the subfolder `CLAUDE.md` for required fields.
- When in doubt about writing style or formatting for any content artifact, load `specs/content/index.md` first.
