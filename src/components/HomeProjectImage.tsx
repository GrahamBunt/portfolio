import Image from "next/image";
import { preload } from "react-dom";
import cardImages from "@/content/homepage-card-images.json";

export function HomeProjectImage({ slug, fallbackSrc }: { slug: string; fallbackSrc: string }) {
  // Match the homepage's 1-column / 61% / 57% grid, including its gutters.
  // Reserve pixels for the largest hover scale (MetLife is already cropped at 1.12×).
  const scale = slug === "metlife-mexico" ? 1.14 : 1.045;
  const sizes = `(max-width: 760px) calc(${100 * scale}vw - ${40 * scale}px), (max-width: 1180px) calc(${61 * scale}vw - ${36.6 * scale}px), calc(${57 * scale}vw - ${34.2 * scale}px)`;
  const isFirst = slug === "smartsheet-reports";
  const objectPosition = slug === "metlife-mexico" ? "50% 50%" : "70% 18%";

  if (!Object.hasOwn(cardImages.sources, slug)) {
    return <Image src={fallbackSrc} alt="" fill sizes={sizes} quality={92} style={{ objectFit: "cover", objectPosition }} />;
  }

  const src = `/work/${slug}/homepage/1920.webp`;
  const srcSet = cardImages.widths.map(width => `/work/${slug}/homepage/${width}.webp ${width}w`).join(", ");
  if (isFirst) preload(src, { as: "image", imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: "high" });

  // Native srcSet preserves the pre-sized lossless exports without another lossy encode.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} srcSet={srcSet} sizes={sizes} alt="" width={3320} height={2212}
    loading={isFirst ? "eager" : "lazy"} fetchPriority={isFirst ? "high" : "auto"} decoding="async"
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition }} />;
}
