"use client";

import { useEffect, useRef } from "react";

export function ProjectVideo({ src, poster, label, decorative = false }: {
  src: string;
  poster: string;
  label: string;
  decorative?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    video.muted = true;

    const updatePlayback = () => {
      if (visible && !reducedMotion.matches) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(video);
    reducedMotion.addEventListener("change", updatePlayback);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", updatePlayback);
      video.pause();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="project-video"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label}
    />
  );
}
