// Same dimensions and visible RGBA pixels; retain the native PNGs as sources.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

for (const name of ['card-chrome', 'demo-chrome']) {
  const source = new URL(`../../public/work/cubby/wood/${name}.png`, import.meta.url);
  const png = await readFile(source);
  const webp = await sharp(png).webp({ lossless: true, effort: 6 }).toBuffer();
  const original = await sharp(png).ensureAlpha().raw().toBuffer();
  const decoded = await sharp(webp).ensureAlpha().raw().toBuffer();
  if (original.length !== decoded.length) throw new Error(`${name}: dimensions changed`);
  for (let i = 0; i < original.length; i += 4) {
    // WebP discards invisible RGB beneath fully transparent pixels.
    if (original[i + 3] !== decoded[i + 3]
      || (original[i + 3] && !original.subarray(i, i + 3).equals(decoded.subarray(i, i + 3)))) {
      throw new Error(`${name}: visible pixels changed`);
    }
  }
  await writeFile(new URL(`../../public/work/cubby/wood/${name}.webp`, import.meta.url), webp);
  console.log(`${name}: ${png.length} → ${webp.length} bytes; visible pixels identical`);
}
