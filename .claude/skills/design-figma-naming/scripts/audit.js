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

// Covers: Misc Symbols (2600–26FF), Dingbats (2700–27BF), Symbols & Pictographs
// (1F300–1F5FF), Emoticons (1F600–1F64F), Transport (1F680–1F6FF), Misc Symbols
// & Pictographs Extended (1F900–1F9FF), Symbols and Pictographs Extended-A
// (1FA70–1FAFF), regional indicators (1F1E6–1F1FF), variation selector FE0F.
const EMOJI_RE = /[⌀-⏿☀-➿️\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FAFF}]/u;

function hasForbiddenSpace(name) {
  // Bracketed annotations may contain spaces: [Archive], [DOC_ONLY], [Reference],
  // [token], [role], [prop], [condition], [a11y]. Strip bracket segments before
  // checking for spaces.
  const stripped = name.replace(/\[[^\]]*\]/g, "").trim();
  return stripped.includes(" ");
}

function audit(node, depth = 0) {
  const name = node.name;

  // Never descend into instances — their layer names are inherited from the
  // master, and renaming them creates per-instance overrides.
  if (node.type === "INSTANCE") return;

  // Skip system / library / plugin-managed subtrees (cleanly named). Malformed
  // names like "MDS Foo" still flow through so we can flag them.
  const isCleanLibraryName =
    (name.startsWith("MDS") || name.startsWith("WDS")) && !name.includes(" ");
  if (
    isCleanLibraryName ||
    name.startsWith("[DOC") ||
    name.startsWith("_[Doc") ||
    name.startsWith("System") ||
    name.startsWith("[LOCAL") ||
    name === "Spectral"
  ) return;

  const auditableType =
    node.type === "FRAME" ||
    node.type === "GROUP" ||
    node.type === "COMPONENT" ||
    node.type === "COMPONENT_SET";

  if (auditableType) {
    const violations = [];

    // Universal rules — apply to every auditable node
    if (EMOJI_RE.test(name)) violations.push("HAS_EMOJI");
    if (hasForbiddenSpace(name)) violations.push("HAS_SPACES");
    if (name !== name.trim()) violations.push("HAS_LEADING_OR_TRAILING_SPACE");

    const knownSuffixes = [
      "Wrapper", "Card", "Group", "Section", "Panel", "Bar", "Sheet"
    ];
    const isScreen    = /^\d{4}/.test(name);
    const isArchive   = name.startsWith("[Archive]");
    const isReference = name.startsWith("[Reference]");
    const isComponentLike =
      node.type === "COMPONENT" || node.type === "COMPONENT_SET";

    if (!isScreen && !isArchive && !isReference && !isComponentLike && depth > 0) {
      // Wrapper-only rules
      if (!knownSuffixes.some(s => name.endsWith(s))) {
        violations.push("MISSING_WRAPPER_SUFFIX");
      }
      if (name[0] && name[0] !== name[0].toUpperCase() && name[0] !== "[") {
        violations.push("NOT_PASCAL_CASE");
      }
      if (/[+\/&]/.test(name)) {
        violations.push("HAS_SPECIAL_CHARS");
      }
    }

    // Auto-generated / UUID names (always bad, any type)
    if (/^[0-9a-f]{8}-[0-9a-f]{4}/i.test(name)) violations.push("UUID_NAME");
    if (/^Frame$/.test(name)) violations.push("GENERIC_FRAME_NAME");
    if (/^Frame \d+$/.test(name)) violations.push("GENERIC_FRAME_NAME");
    if (/^Group$/.test(name)) violations.push("GENERIC_GROUP_NAME");
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

  // Text layers: flag emoji + Figma-default name (named after value)
  if (node.type === "TEXT" && depth > 0) {
    const textViolations = [];
    if (EMOJI_RE.test(name)) textViolations.push("HAS_EMOJI");
    const isDefaultName = node.characters &&
      node.name === node.characters.substring(0, 100).trim();
    if (isDefaultName) textViolations.push("TEXT_NAMED_AFTER_VALUE");
    if (textViolations.length) {
      issues.push({
        id: node.id,
        name,
        type: "TEXT",
        depth,
        violations: textViolations,
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
