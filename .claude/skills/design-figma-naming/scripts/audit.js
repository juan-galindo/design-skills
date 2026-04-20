/**
 * design-figma-naming — audit.js
 *
 * Paste this into Figma:use_figma to audit a section or page for naming violations.
 * Returns a JSON array of violations ready to feed into rename.js.
 *
 * Usage in Claude Code:
 *   Figma:use_figma({ fileKey, code: <this file's contents>, description: "Audit layers" })
 */

const issues = [];
const ROOT_NODE_ID = null; // Set to a specific section ID, or null for entire current page

function audit(node, depth = 0) {
  const name = node.name;

  // Skip system / library layers — never rename these
  if (
    name.startsWith("MDS") ||
    name.startsWith("[DOC") ||
    name.startsWith("System") ||
    name.startsWith("[LOCAL")
  ) return;

  if (node.type === "FRAME" || node.type === "GROUP") {
    const violations = [];

    // Rule 1: No emojis anywhere
    if (/[\u{1F300}-\u{1FFFF}]/u.test(name)) violations.push("HAS_EMOJI");

    const knownSuffixes = [
      "Wrapper", "Card", "Group", "Section", "Panel", "Bar", "Sheet"
    ];
    const isScreen    = /^\d{4}/.test(name);
    const isArchive   = name.startsWith("[Archive]");
    const isReference = name.startsWith("[Reference]");

    if (!isScreen && !isArchive && !isReference && depth > 0) {
      // Rule 2: Wrapper frames must end in a known suffix
      if (!knownSuffixes.some(s => name.endsWith(s))) {
        violations.push("MISSING_WRAPPER_SUFFIX");
      }
      // Rule 3: Must be PascalCase
      if (name[0] && name[0] !== name[0].toUpperCase() && name[0] !== "[") {
        violations.push("NOT_PASCAL_CASE");
      }
      // Rule 4: No spaces in wrapper frame names
      if (name.includes(" ") && !name.startsWith("[")) {
        violations.push("HAS_SPACES");
      }
      // Rule 5: No special characters
      if (/[+\/&]/.test(name)) {
        violations.push("HAS_SPECIAL_CHARS");
      }
    }

    // Rule 6: Auto-generated / UUID names (always bad)
    if (/^[0-9a-f]{8}-[0-9a-f]{4}/i.test(name)) violations.push("UUID_NAME");
    if (/^Frame \d+$/.test(name)) violations.push("GENERIC_FRAME_NAME");
    if (/^Group \d+$/.test(name)) violations.push("GENERIC_GROUP_NAME");
    if (/^Rectangle \d+$/.test(name)) violations.push("GENERIC_SHAPE_NAME");
    if (/^image \d+$/i.test(name)) violations.push("GENERIC_IMAGE_NAME");

    if (violations.length) {
      issues.push({
        id: node.id,
        name,
        type: node.type,
        depth,
        violations,
        parentName: node.parent?.name ?? "—"
      });
    }
  }

  // Rule 7: Text layers named after their value (Figma default)
  if (node.type === "TEXT" && depth > 0) {
    const isDefaultName = node.characters &&
      node.name === node.characters.substring(0, 100).trim();
    if (isDefaultName) {
      issues.push({
        id: node.id,
        name,
        type: "TEXT",
        depth,
        violations: ["TEXT_NAMED_AFTER_VALUE"],
        parentName: node.parent?.name ?? "—"
      });
    }
  }

  if ("children" in node && depth < 5) {
    for (const child of node.children) audit(child, depth + 1);
  }
}

const root = ROOT_NODE_ID
  ? figma.getNodeById(ROOT_NODE_ID)
  : figma.currentPage;

if (root) audit(root);

// Summary by violation type
const summary = {};
for (const issue of issues) {
  for (const v of issue.violations) {
    summary[v] = (summary[v] || 0) + 1;
  }
}

return JSON.stringify({ total: issues.length, summary, issues }, null, 2);
