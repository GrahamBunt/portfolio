// Rebuild lossless responsive cards from the original, uncropped PNG compositions.
// Run: node scripts/generate-homepage-cards.mjs
import { execFileSync } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';
import manifest from '../src/content/homepage-card-images.json' with { type: 'json' };

for (const [slug, source] of Object.entries(manifest.sources)) {
  const original = execFileSync('git', ['show', source], { maxBuffer: 20 * 1024 * 1024 });
  const directory = `public/work/${slug}/homepage`;
  await mkdir(directory, { recursive: true });
  for (const width of manifest.widths) {
    const result = await sharp(original)
      .resize({ width, withoutEnlargement: true, kernel: 'lanczos3' })
      .webp({ lossless: true, effort: 6 })
      .toFile(`${directory}/${width}.webp`);
    if (result.width !== width) throw new Error(`Original too small: ${slug} at ${width}px`);
    console.log(`${slug}: ${width} × ${result.height}, ${Math.round(result.size / 1024)} KB`);
  }
}
