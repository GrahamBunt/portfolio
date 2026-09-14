// SVG rendering contract from GrahamBunt/cubby@80ed6b9, tools/wood-studio/src/Wood.jsx.
// The exported recipe already contains makeWood(BASE)'s exact colors and geometry.
// No random generation, React runtime, or playground dependencies are needed here.
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export function renderWood(wood) {
  if (wood.format !== 'cubby-wood-geometry' || wood.version !== 1 || wood.width !== 360 || wood.height !== 480) {
    throw new Error('Expected Cubby wood geometry v1 in 360 × 480 coordinates');
  }
  const filters = wood.items.map((p, i) => {
    if (!p.blur) return '';
    const ys = p.points.map(([, y]) => y);
    const pad = p.blur * 4 + p.width * 2;
    const lo = Math.min(...ys) - pad;
    const hi = Math.max(...ys) + pad;
    return `<filter id="b${i}" filterUnits="userSpaceOnUse" x="-30" y="${lo}" width="420" height="${Math.max(1, hi - lo)}" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="${p.blur}"/></filter>`;
  }).join('');
  const paths = wood.items.map((p, i) => `<path d="${p.points.map(([x, y], j) => (j ? 'L' : 'M') + x + ' ' + y).join('')}" fill="none" stroke="${p.color}" stroke-width="${p.width}" stroke-linecap="round" stroke-linejoin="round" opacity="${p.opacity}"${p.blur > 0 ? ` filter="url(#b${i})"` : ''}/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 480" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="base" x1="0" y1="0" x2="0" y2="480" gradientUnits="userSpaceOnUse">${wood.gradient.map((c, i) => `<stop offset="${i / 3}" stop-color="${c}"/>`).join('')}</linearGradient><linearGradient id="finish" x1="0" y1="0" x2="0" y2="480" gradientUnits="userSpaceOnUse"><stop stop-color="#ffffff" stop-opacity="${wood.sheen}"/><stop offset=".5" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#4a250b" stop-opacity="${wood.edgeShade}"/></linearGradient>${filters}</defs><path d="M0 0H360V480H0Z" fill="url(#base)"/>${paths}<path d="M0 0H360V480H0Z" fill="url(#finish)"/></svg>\n`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const recipe = JSON.parse(await readFile(new URL('./approved-recipe.json', import.meta.url), 'utf8'));
  await writeFile(new URL('../../public/work/cubby/wood/approved-30597.svg', import.meta.url), renderWood(recipe));
  console.log(`Rendered approved Cubby wood: seed ${recipe.values.seed}, ${recipe.items.length} grain paths`);
}
