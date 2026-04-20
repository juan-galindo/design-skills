/**
 * design-figma-naming — rename.js
 *
 * Paste this into Figma:use_figma (with the renames array filled in)
 * to execute a batch rename. Claude Code generates the renames array
 * from the audit output + the naming rules.
 *
 * Usage in Claude Code:
 *   1. Run audit.js to get violations
 *   2. Claude generates the renames array below based on the rules
 *   3. Run this script via Figma:use_figma
 */

// ── Fill in renames before running ────────────────────────────────────────────
// Format: { id: "NODE_ID", name: "Correct Name" }
// Pass 1 → screen frames:  "1000 - Flow Name - Screen state"
// Pass 2 → wrapper layers: "PascalCaseWrapper"
// Pass 3 → text/media:     "WhatItRepresents" / "SubjectImage"
const renames = [
  // { id: "2002:14636", name: "ContentWrapper" },
];
// ──────────────────────────────────────────────────────────────────────────────

let renamed = 0;
const failed = [];
const skipped = [];

for (const { id, name } of renames) {
  const node = await figma.getNodeByIdAsync(id);
  if (!node) {
    failed.push(id);
    continue;
  }
  // Safety: never rename component instances or library components
  if (node.type === "INSTANCE") {
    skipped.push({ id, name: node.name, reason: "INSTANCE" });
    continue;
  }
  node.name = name;
  renamed++;
}

return JSON.stringify({
  renamed,
  failed: failed.length,
  skipped: skipped.length,
  failedIds: failed,
  skippedNodes: skipped
}, null, 2);
