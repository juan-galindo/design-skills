---
name: figma-build
description: How to author a screen in Figma efficiently in one `use_figma` pass — resolve the build from the repo specs, use prefix-matched Plugin API property names, force-write text overrides, and verify via data (not screenshots).
load: on-demand
source_of_truth: ../../../specs/patterns/layouts/
---

# figma-build — foundation layer

Load this foundation **before any `use_figma` call that writes a screen or component**. It exists because the Figma Plugin API and the Code Connect React output diverge in property names, and because component instances preserve nested overrides that `setProperties` does not touch. Both are silent failure modes — they don't error, they just render the wrong thing.

The goal is **one build pass + one verify pass**, no screenshots in the loop.

## The four rules

1. **Resolve the build from the repo, not from a live Figma node.** Read the layout spec in `specs/patterns/layouts/` → each composed component spec in `specs/components/` → the catalog at `specs/figma-catalog/mobile-components.md`. The repo gives you the component keys, the slot/prop names, and the composition rules. Do not fish for a "canonical recipe instance" in Figma.
2. **Force-write text nodes alongside `setProperties`.** Instance text overrides survive component property updates. Walk every text node in the instance and overwrite by layer name.
3. **Return a verification block, not a screenshot.** Walk text nodes, dimensions, and INSTANCE_SWAP values into the tool result so the next call can assert against data.
4. **Batch the build.** One `use_figma` call should: load fonts, import all components by key, build the frame, set all properties, force-write all text, and return the verification block.

## Step 1 — Resolve the build from the repo

Available layout specs (load the matching one before building):

| Spec | id |
|------|----|
| [Confirmation Screen](../../../specs/patterns/layouts/confirmation-screen.md) | `layout-confirmation-screen` |
| [Markets Crypto](../../../specs/patterns/layouts/markets-crypto-screen.md) | `layout-markets-crypto` |
| [Markets View All Category](../../../specs/patterns/layouts/markets-view-all-category-screen.md) | `layout-markets-view-all-category` |
| [Portfolio All](../../../specs/patterns/layouts/portfolio-all-screen.md) | `layout-portfolio-all` |
| [Successful Action](../../../specs/patterns/layouts/successful-action-screen.md) | `layout-successful-action` |

Available composition pattern specs (load when a layout uses one of these patterns):

| Spec | id |
|------|----|
| [Bullet Points](../../../specs/patterns/composition/bullet-points.md) | `pattern-bullet-points` |
| [Read-only List — First Level](../../../specs/patterns/composition/read-only-list/first-level.md) | `pattern-read-only-list-first-level` |
| [Search Global](../../../specs/patterns/composition/search-global.md) | `pattern-search-global` |

1. **Layout** — read the layout spec in `specs/patterns/layouts/`. The spec defines the stack, the slot rules, the variants, and which components compose the screen.
2. **Components** — for each composed component, read its spec in `specs/components/{id}.md`. The frontmatter `figma node` is the canonical main-component key; the body lists the prop names in shorthand (e.g. `variant`, `hasIconLeading`, `heading`).
3. **Catalog** — confirm the component key against `specs/figma-catalog/mobile-components.md` and use it for `importComponentByKeyAsync`. For illustrations, import `MDSIllustrationFullScreen` (listed in `mobile-components.md`) — it is the only illustration component. To pick a specific illustration, load `specs/figma-catalog/assets/illustrations.md`, find the illustration's node ID, import that node's main component, and pass it as the INSTANCE_SWAP value on the inner illustration property of `MDSIllustrationFullScreen`.
4. **Prop names at write time** — after you instantiate, the Plugin API returns suffixed names like `heading#10994:12`. Match by prefix (`pname.startsWith('heading')`) when calling `setProperties`, so the GUID doesn't pin you to one library snapshot. Never copy prop names from a React snippet — they diverge from the Plugin API.

## Step 2 — Force-write text nodes

`setProperties({ heading: '...' })` updates the property but **does not override a text node that already carries a manual character override** inside the instance. Always walk and overwrite:

```js
function walkText(node, fn) {
  if (node.type === 'TEXT') fn(node);
  if ('children' in node && node.children) for (const c of node.children) walkText(c, fn);
}

const COPY = {
  Heading: '¡Listo! Vendiste TSLAx',
  Paragraph: 'Recibiste $1.234.567,89 ARS en tu cuenta.',
};

walkText(root, async (t) => {
  if (COPY[t.name]) {
    await figma.loadFontAsync(t.fontName);
    t.characters = COPY[t.name];
  }
});
```

Key by **layer name** (`t.name`), not by current characters — characters drift across locales, names don't.

## Step 3 — Verify via data, not screenshots

End the build call by returning a verification block. The next call asserts against it; only on assertion failure do you patch:

```js
const checks = { text: [], dims: {}, swaps: [] };

walkText(root, t => checks.text.push({ name: t.name, chars: t.characters }));

checks.dims.root = { w: root.width, h: root.height };
checks.dims.topContainer = topContainer.height;  // must equal StatusBar + MDSAppBar, never 10

function walkInstances(n, fn) {
  if (n.type === 'INSTANCE') fn(n);
  if ('children' in n && n.children) for (const c of n.children) walkInstances(c, fn);
}
walkInstances(root, inst => {
  if (inst.visible === false) return;
  for (const [p, def] of Object.entries(inst.componentProperties || {})) {
    if (def.type === 'INSTANCE_SWAP') checks.swaps.push({ host: inst.name, prop: p, value: def.value });
  }
});

return { createdNodeId: root.id, checks };
```

**Assertions to run on the returned `checks`:**

- Every entry in `checks.text` matches the spec's text-slot rules (no leftover "Heading" / "This is a paragraph!" placeholders).
- `checks.dims.topContainer` matches the sum of `StatusBar + MDSAppBar` — if the wrapper has children but reports a tiny height, its `primaryAxisSizingMode` is still `FIXED` and needs `AUTO`. See the screen shell in [`composition-recipes.md`](./composition-recipes.md).
- Every entry in `checks.swaps` resolves to the expected component (e.g. AppBar trailing icon must equal the imported Close icon id).
- **Frame contract** (see below): root frame `fills` is bound to `color/background/default`; every non-zero padding on every auto-layout frame has a `boundVariables` entry; side-by-side children of any container are named `row*`.

If all three pass, the build is correct **without ever rendering pixels**. Only render a screenshot when a human is reviewing taste — not when the agent is verifying contract.

## The screen shell

Every product screen sits inside the same outer wrapper: `topContainer` (StatusBar + MDSAppBar) → `container` (flex 1) → optional bottom-anchored region (BottomCTAs / footer / nav) → `spacing/padding/base` safe area. The shell is defined once in [`composition-recipes.md`](./composition-recipes.md) → "Screen shell"; recipe specs under `specs/patterns/layouts/` describe only the `container` content and the bottom region on top of it.

When you build, instantiate the shell first, then fill `container` from the recipe — do not invent a per-screen top wrapper.

## Frame contract (every frame you create)

Every frame you author must satisfy these three rules. Verify them in the `checks` block before returning.

### 1. Background = `color/background/default` (token-bound)

Bind the root screen frame's `fills` to the `color/background/default` variable — never a raw hex, never an unbound solid white. Without this, light/dark themes break silently.

```js
const collections = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
const bgVar = await figma.importVariableByKeyAsync(
  /* key for color/background/default — read from teamLibrary collection */
);
root.fills = [figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r: 1, g: 1, b: 1 } },
  'color',
  bgVar
)];
```

Apply the same rule to any wrapper frame inside the screen that needs a fill — never paint a frame with a literal color.

### 2. Padding must be token-bound, never a literal

`paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`, `itemSpacing` on any auto-layout frame must be bound to a spacing variable. Hardcoded values (`32`, `24`, `16`) are forbidden — they break when tokens shift and they're invisible in code-connect output.

Token mapping:

| Use | Token | Value |
|-----|-------|-------|
| Horizontal screen inset | `spacing/padding/base` | 16 |
| Bottom safe area (below BottomCTAs) | `spacing/padding/base` | 16 |
| Section top/bottom (24) | `spacing/padding/lg` or `spacing/stack/lg` | 24 |
| Larger section break (32) | `spacing/stack/xl` | 32 |
| Major section break (48) | `spacing/stack/3xl` | 48 |
| Header-to-header gap | `spacing/stack/xs` | 4 |

Bind via:

```js
frame.setBoundVariable('paddingTop', spacingLgVar);
frame.setBoundVariable('itemSpacing', stackXsVar);
```

In the verification block, walk every auto-layout frame and assert that each non-zero padding has a `boundVariables.paddingTop` (etc.) entry — fail loud if any literal slips through.

### 3. Frame naming — `row` wrapper only for components without a horizontal-padding guideline

Components that **own** their horizontal padding (AppBar, MDSHeader / screenHeader, ConfirmationHeader, BottomCTAs, StatusBar, `MDSIllustrationFullScreen`) drop directly into the container with their semantic name — **no `row` wrapper**. To select a specific illustration: import `MDSIllustrationFullScreen` from `mobile-components.md`, then look up the target illustration's node ID in [`specs/figma-catalog/assets/illustrations.md`](../../../specs/figma-catalog/assets/illustrations.md) and pass it as an INSTANCE_SWAP on the inner illustration variant property.

Components that **do not** own their horizontal padding (ReadOnlyList, InfoPanel, raw lists, free-floating tags / chips, anything that ships edge-to-edge by default) must be wrapped in a `row*` frame that owns the 16px screen inset (`spacing/padding/base`). This is the "Horizontal gutter ownership" rule — inset owned by the wrapper OR the component, never both.

Naming the wrapper:

- `rowReadOnlyList`, `rowInfoPanel`, `rowTags` — descriptor matches the component it wraps.
- The wrapper sets `paddingLeft = paddingRight = spacing/padding/base` (token-bound) and `paddingTop = paddingBottom = 0` unless the section requires vertical breathing.

Pattern:

```
screen (root)
├── topContainer
│   ├── StatusBar              ← owns its own insets
│   └── MDSAppBar              ← owns its own insets
├── container
│   ├── MDSHeader              ← owns its own insets
│   ├── rowReadOnlyList        ← wrapper, owns the 16px gutter
│   │   └── MDSReadOnlyList
│   └── spacer
└── MDSBottomCTAs              ← owns its own insets
```

This keeps `row*` meaningful — it always signals "this is the wrapper that owns the gutter" — instead of decorating every stripe in the layout.

## Common build gotchas

- **`topContainer.height === 10`** after appending StatusBar + AppBar → `primaryAxisSizingMode` got coerced to FIXED by a `resize()` call after `appendChild`. Set it to `AUTO` after appending children, never before.
- **`layoutSizingHorizontal = 'FILL'` errors** → must be set **after** `parent.appendChild(child)`, never before. Wrap in try/catch only at the boundary, not as a habit.
- **Library variables return zero from `getLocalVariablesAsync()`** → linked-library files have no local vars. Use `figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()` + `importVariableByKeyAsync()`.
- **`setCurrentPageAsync(page)`** before `page.loadAsync()` then `targetPage.appendChild(root)` — required for cross-page authoring.
- **AppBar trailing icon defaults to the library default** (often a list/document glyph), not Close. Always import the desired icon by key and `setProperties({ 'Icon#...': closeIcon.id })` on every visible `MDSIcon` inside the AppBar.

## When to load this foundation

- **Step 4 (Happy path)** — before the first `use_figma` write call on a screen.
- **Step 5 (Component selection)** — before instantiating any MDS component for the first time in a build.
- **Step 9 (Implement feedback)** — when patches to an existing build need to survive verification.

## Red flags

- Reading a screenshot to "see if the text changed" — that's a contract miss; assert via `checks.text`.
- More than two `use_figma` calls for a single screen build — inspect once, build once, verify once.
- Property names copied from a React snippet or sibling library instead of prefix-matched against the instance's own `componentProperties` after instantiation.
- `setProperties` followed by no text-node walk — heading/title overrides will silently persist.
- A wrapper frame with FIXED primary-axis sizing wrapping children that should be hugged.
