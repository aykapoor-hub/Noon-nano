// Injects @font-face rules for noon's proprietary "Noontree" typeface.
//
// Drop the font files into `public/fonts/` named exactly:
//   Noontree-Regular.woff2   (400)
//   Noontree-Medium.woff2    (500)
//   Noontree-SemiBold.woff2  (600)
//   Noontree-Bold.woff2      (700)
//   Noontree-ExtraBold.woff2 (800)
// (.ttf also accepted as a fallback for any weight.)
//
// Injected at runtime (not in static CSS) so the src can respect Vite's
// BASE_URL — paths resolve correctly both in dev (/) and on GitHub Pages
// (/Noon-nano/). If a file is missing the browser silently falls back to
// Figtree, so the build never breaks while the files aren't there yet.
const BASE = import.meta.env.BASE_URL

const WEIGHTS: [number, string][] = [
  [400, 'Regular'],
  [500, 'Medium'],
  [600, 'SemiBold'],
  [700, 'Bold'],
  [800, 'ExtraBold'],
]

const css = WEIGHTS.map(
  ([weight, name]) => `@font-face{
  font-family:'Noontree';
  font-style:normal;
  font-weight:${weight};
  font-display:swap;
  src:url('${BASE}fonts/Noontree-${name}.woff2') format('woff2'),
      url('${BASE}fonts/Noontree-${name}.ttf') format('truetype');
}`,
).join('\n')

const style = document.createElement('style')
style.id = 'noontree-faces'
style.textContent = css
document.head.appendChild(style)
