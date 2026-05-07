// Pass this script as the `code` argument of mcp__claude_ai_Figma__use_figma.
// Before calling, replace the RENAMES_PLACEHOLDER token with the JSON literal
// produced from your keyMap, e.g.:
//   JSON.stringify(keyMap.map(k => ({ id: k.id, key: k.key })))
//
// Why a JSON literal (not a variable reference): the script runs in a fresh
// Plugin sandbox and has no access to the agent's variables. Embedding the
// data as a literal is the only way to ship it across.

const renames = RENAMES_PLACEHOLDER;

const results = { renamed: 0, missing: [], errors: [] };
for (const { id, key } of renames) {
  const node = await figma.getNodeByIdAsync(id);
  if (!node) { results.missing.push(id); continue; }
  try {
    node.name = key;
    results.renamed++;
  } catch (e) {
    results.errors.push({ id, error: String(e) });
  }
}
return results;
