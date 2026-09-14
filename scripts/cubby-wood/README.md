# Approved Cubby wood

Source: `GrahamBunt/cubby`, commit `80ed6b9`, `tools/wood-studio/`.
This is the approved **web exploration** material, not the current native app wood.
Seed: **30597**. Coordinate system: **360 × 480**.

`approved-recipe.json` is an unchanged copy of `native-export/example-recipe.json`.
Its values, colors, and all 165 grain paths were checked against `makeWood(BASE)`
from that commit's `src/wood.js`. `render.mjs` follows `src/Wood.jsx` exactly:
base stops, path geometry, individual sRGB blur filters and bounds, then finish.
The SVG is rendered ahead of time and cached as one shared image. No DialKit,
presets, playground UI, generator, or randomization ships to the browser.

Regenerate from the portfolio root:

```sh
node scripts/cubby-wood/render.mjs
```

The output is `public/work/cubby/wood/approved-30597.svg`. All Cubby media inherit
the same material variables from `.cubby-project-mascot-media` in `globals.css`.
Home, Up Next, the hero, and the standalone interactive preview scale the full
360 × 480 material with the app; the header never gets a separately stretched crop.

## Chrome preservation

`card-chrome.png` is the existing 6× native chrome export with only its outer
`WoodBackground(style: selectedWoodStyle)` replaced by `Color.clear`. It was
rendered from the original inert portfolio export sources in the Cubby reference's
`.context/cubby-app-frame/native-export/`, copied to the portfolio's `.context`
before modification. The original vector tab glyphs remain in `study-frame.js`.
The native tab materials, panel, bevel, outer rim, and kebab remain intact.

`demo-chrome.png` is the existing 4× export from
`scripts/cubby-demo/ExportNativeAssets.swift`, using the same substitution for
`WoodBackground(style: .honeyPine)` and keeping all other rendering unchanged.
The demo's CSS tab treatments and interaction code are unchanged. Opaque paper
pixels were verified identical to the previous exports in both variants.

The Cubby reference workspace is read-only; all exports were run in this portfolio.

## Rollback

Replace the three material variables in `.cubby-project-mascot-media` with:

```css
--cubby-wood: none;
--cubby-card-chrome: url('/work/cubby/wood/previous-card-chrome.png');
--cubby-demo-chrome: url('/work/cubby/demo/native-chrome.png');
```

`previous-card-chrome.png` is the byte-for-byte PNG previously embedded in
`study-frame.js`. The original demo chrome is retained at its existing path.
The previous implementation is also available at portfolio commit `18315ec9`.
No content, wallpaper, mascot, layout, or interactions need to change for rollback.
