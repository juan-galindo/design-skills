// Pass this script verbatim as the `code` argument of mcp__claude_ai_Figma__use_figma.
// It runs inside the Figma Plugin sandbox and returns a JSON payload describing
// every visible TEXT node on the "Experience" page, with its ancestor chain.
//
// Why this shape: the agent does all key-naming logic in its own context after
// receiving the payload, which keeps the plugin script small and avoids
// repeated round-trips for every text node.

// Pages are already accessible in this MCP context — do NOT call
// figma.root.loadAsync() or figma.loadAllPagesAsync(); both throw.
const experiencePage = figma.root.children.find(
  p => p.type === 'PAGE' && p.name === 'Experience'
);
if (!experiencePage) {
  return {
    error: 'No page named "Experience" found in this file.',
    availablePages: figma.root.children.map(p => p.name)
  };
}

// Frames are typically nested inside a SECTION at the page root, e.g.
// Experience > "Warrants" (SECTION) > "1300 - Confirmation" (FRAME).
// Walking through SECTIONs lets the section name flow through as `feature`.
const frames = [];
function collectFrames(node, sectionName) {
  for (const child of node.children) {
    if (child.type === 'SECTION') collectFrames(child, child.name);
    else if (child.type === 'FRAME') frames.push({ frame: child, sectionName });
  }
}
collectFrames(experiencePage, null);

// Components inside SKIP_COMPONENTS never produce keys. Doing the check during
// the walk (not in the ancestor lookup) means hidden / system / data-only
// layers never enter the pipeline at all.
//
// Two kinds of things land here:
//   1. System chrome the OS draws (StatusBar, NativeNavigation) — never copy.
//   2. MDS components whose text is dynamic data, not localizable copy
//      (charts, indicators, currency prices, switches, timeframes, icons).
//      Skipping them avoids generating keys for sample numbers like
//      "200 MXN", "0.84", or filler timeframe labels like "1D" / "6M".
const SKIP_COMPONENTS = [
  'StatusBar',
  'NativeNavigation',
  'MDSIllustrationFullScreen',
  'MDS Timeframes', 'Timeframes', 'Timeframe',
  'MDS Switch', 'Switch',
  'MDS SpinLoader', 'SpinLoader',
  'MDS PulsingDot', 'PulsingDot',
  'MDS StepIndicator', 'StepIndicator', 'ProgressStepper',
  'MDS ProgressBar', 'ProgressBar',
  'MDS Graph', 'Graph - Line', 'Graph - Bars', 'Graph - PieChart',
  'MDS Icon',
  'MDS CurrencyPrice', 'MDS currencyPrice', 'CurrencyPrice',
  'MDS PnL', 'MDS PnL2', 'PnL',
  'MDS priceChangePercentage', 'priceChangePercentage'
];

function ancestorChain(node, stopAtFrameId) {
  const chain = [];
  let cur = node.parent;
  while (cur && cur.id !== stopAtFrameId && cur.type !== 'PAGE') {
    chain.push({ name: cur.name ?? '', type: cur.type });
    cur = cur.parent;
  }
  return chain; // closest ancestor first
}
const isInsideSkipped = chain =>
  chain.some(a => SKIP_COMPONENTS.some(s => a.name.includes(s)));

// Text content that's pure data, not localizable copy:
// "200 MXN", "0.84", "-233M USD", "1.31x", "4.77" are skipped.
// But "1D", "6M", "Q4" (≤2 digits + text) are localizable and generate keys.
// Real copy uses [%s] for variables and never bakes literal numbers in.
const isDataValue = text => {
  const digitCount = (text.match(/\d/g) || []).length;
  const hasLetters = /[a-zA-Z]/.test(text);
  // Skip if: (no text and has any digits) or (more than 2 digits)
  return (!hasLetters && digitCount > 0) || digitCount > 2;
};

// Decorative glyphs / separators that survive the component skip list:
// "|", "↓", "↑", "·", "•", "—", "". Localizable labels are always at least
// a Latin word ("OK", "Sí"), so a short token with no letters is decoration.
const isGlyphOnly = text => {
  const t = text.trim();
  return t.length <= 2 && !/[a-zA-Z]/.test(t);
};

// Currency text layers inside ConfirmationHeader are dynamic data (e.g. "MXN", "USD")
const isCurrencyInConfirmationHeader = (layerName, chain) => {
  const isCurrencyLayer = layerName.toLowerCase() === 'currency';
  const isInConfirmationHeader = chain.some(a => a.name.includes('ConfirmationHeader'));
  return isCurrencyLayer && isInConfirmationHeader;
};

const results = [];
for (const { frame, sectionName } of frames) {
  const textNodes = [];
  const stack = [frame];
  while (stack.length) {
    const n = stack.pop();
    if (n.visible === false) continue;
    if (n.type === 'TEXT') {
      const chain = ancestorChain(n, frame.id);
      if (isInsideSkipped(chain)) continue;
      if (isDataValue(n.characters)) continue;
      if (isGlyphOnly(n.characters)) continue;
      if (isCurrencyInConfirmationHeader(n.name, chain)) continue;
      textNodes.push({
        id: n.id,
        name: n.name,
        characters: n.characters,
        ancestorChain: chain.map(a => a.name)
      });
    }
    if ('children' in n) stack.push(...n.children);
  }
  results.push({
    frameId: frame.id,
    frameName: frame.name,
    sectionName,
    textNodeCount: textNodes.length,
    textNodes
  });
}

return {
  frameCount: frames.length,
  totalTextNodes: results.reduce((s, r) => s + r.textNodeCount, 0),
  frames: results
};
