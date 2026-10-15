const releasesUrl = 'https://github.com/GrahamBunt/cubby-releases/releases/latest';
const assetPrefix = 'https://github.com/GrahamBunt/cubby-releases/releases/download/';

type Release = {
  draft?: boolean;
  prerelease?: boolean;
  assets?: { name: string; browser_download_url: string }[];
};

export async function GET() {
  let destination = releasesUrl;
  try {
    // Release filenames contain the version, so resolve the latest stable DMG.
    // Cache metadata on the server, but never cache the redirect in the browser.
    const response = await fetch('https://api.github.com/repos/GrahamBunt/cubby-releases/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error('Release lookup failed');
    const release: Release = await response.json();
    const installer = !release.draft && !release.prerelease
      ? release.assets?.find(asset => /^Cubby-[\d.]+-macOS\.dmg$/.test(asset.name)
          && asset.browser_download_url.startsWith(assetPrefix))
      : undefined;
    if (installer) destination = installer.browser_download_url;
  } catch {
    // GitHub outages/rate limits still leave visitors a working release page.
  }
  return new Response(null, {
    status: 307,
    headers: { Location: destination, 'Cache-Control': 'no-store' },
  });
}
