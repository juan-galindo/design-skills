// Pass this script verbatim as the `code` argument of mcp__claude_ai_Figma__use_figma.
// It auto-detects whether to scan a page, section, or frame:
// - If targetNodeId is undefined → scan "Experience" page (default)
// - If targetNodeId is defined → fetch that node and determine its type:
//   - SECTION → scan all frames inside it
//   - FRAME → scan just that frame (wrapped as a single-frame result)
//
// Returns: { targetType, targetName, frameCount, totalTextNodes, frames }
// On error: { error, availablePages }

// If caller injected 'const targetNodeId = "...";' before this script,
// use that value. Otherwise, default to null (scan "Experience" page).
let nodeToScan = null;
try {
  if (typeof targetNodeId !== 'undefined') {
    nodeToScan = targetNodeId;
  }
} catch (e) {
  // targetNodeId not in scope, continue with null
}

let targetNode = null;
let targetType = 'page';
let pageName = 'Experience';

// If targetNodeId provided, fetch and determine its type
if (nodeToScan) {
  try {
    targetNode = figma.getNodeById(nodeToScan);
    if (!targetNode) {
      return {
        error: `Node with ID "${nodeToScan}" not found in this file.`,
        availablePages: figma.root.children.map(p => p.name)
      };
    }

    if (targetNode.type === 'SECTION') {
      targetType = 'section';
      // For sections, find the page it belongs to
      let parent = targetNode.parent;
      while (parent && parent.type !== 'PAGE') {
        parent = parent.parent;
      }
      pageName = parent ? parent.name : 'Unknown';
    } else if (targetNode.type === 'FRAME') {
      targetType = 'frame';
      // For frames, find the page it belongs to
      let parent = targetNode.parent;
      while (parent && parent.type !== 'PAGE') {
        parent = parent.parent;
      }
      pageName = parent ? parent.name : 'Unknown';
    } else {
      return {
        error: `Node "${nodeToScan}" is not a SECTION or FRAME (type: ${targetNode.type}).`,
        availablePages: figma.root.children.map(p => p.name)
      };
    }
  } catch (e) {
    return {
      error: `Failed to fetch node "${nodeToScan}": ${e.message}`,
      availablePages: figma.root.children.map(p => p.name)
    };
  }
} else {
  // No targetNodeId → use default "Experience" page
  const experiencePage = figma.root.children.find(
    p => p.type === 'PAGE' && p.name === 'Experience'
  );
  if (!experiencePage) {
    return {
      error: 'No page named "Experience" found in this file.',
      availablePages: figma.root.children.map(p => p.name)
    };
  }
  targetNode = experiencePage;
}

// Components whose text is dynamic data, not localizable copy
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
    chain.push({ id: cur.id, name: cur.name ?? '', type: cur.type });
    cur = cur.parent;
  }
  return chain; // closest ancestor first
}

const isInsideSkipped = chain =>
  chain.some(a => SKIP_COMPONENTS.some(s => a.name.includes(s)));

const isDataValue = text => {
  const digitCount = (text.match(/\d/g) || []).length;
  const hasLetters = /[a-zA-Z]/.test(text);
  return (!hasLetters && digitCount > 0) || digitCount > 2;
};

const isGlyphOnly = text => {
  const t = text.trim();
  return t.length <= 2 && !/[a-zA-Z]/.test(t);
};

const isCurrencyInConfirmationHeader = (layerName, chain) => {
  const isCurrencyLayer = layerName.toLowerCase() === 'currency';
  const isInConfirmationHeader = chain.some(a => a.name.includes('ConfirmationHeader'));
  return isCurrencyLayer && isInConfirmationHeader;
};

// Collect frames based on targetType
const frames = [];
let sectionNameForSingleFrame = null;

if (targetType === 'frame') {
  // Single frame: wrap as a single-frame result
  const frame = targetNode;
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
        ancestorChain: chain.map(a => ({ id: a.id, name: a.name }))
      });
    }
    if ('children' in n) stack.push(...n.children);
  }
  frames.push({
    frameId: frame.id,
    frameName: frame.name,
    sectionName: null,
    textNodeCount: textNodes.length,
    textNodes
  });
} else if (targetType === 'section') {
  // Section: scan all frames within it
  function collectFrames(node, sectionName) {
    for (const child of node.children) {
      if (child.type === 'SECTION') collectFrames(child, child.name);
      else if (child.type === 'FRAME') frames.push({ frame: child, sectionName });
    }
  }
  collectFrames(targetNode, targetNode.name);

  // Process frames
  const processedFrames = [];
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
          ancestorChain: chain.map(a => ({ id: a.id, name: a.name }))
        });
      }
      if ('children' in n) stack.push(...n.children);
    }
    processedFrames.push({
      frameId: frame.id,
      frameName: frame.name,
      sectionName,
      textNodeCount: textNodes.length,
      textNodes
    });
  }
  frames.length = 0;
  frames.push(...processedFrames);
} else {
  // Page: scan sections and frames (current "Experience" page behavior)
  function collectFrames(node, sectionName) {
    for (const child of node.children) {
      if (child.type === 'SECTION') collectFrames(child, child.name);
      else if (child.type === 'FRAME') frames.push({ frame: child, sectionName });
    }
  }
  collectFrames(targetNode, null);

  // Process frames
  const processedFrames = [];
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
          ancestorChain: chain.map(a => ({ id: a.id, name: a.name }))
        });
      }
      if ('children' in n) stack.push(...n.children);
    }
    processedFrames.push({
      frameId: frame.id,
      frameName: frame.name,
      sectionName,
      textNodeCount: textNodes.length,
      textNodes
    });
  }
  frames.length = 0;
  frames.push(...processedFrames);
}

return {
  targetType,
  targetName: targetNode ? targetNode.name : pageName,
  frameCount: frames.length,
  totalTextNodes: frames.reduce((s, r) => s + r.textNodeCount, 0),
  frames
};
