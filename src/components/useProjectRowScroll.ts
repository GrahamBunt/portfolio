"use client";

import { useEffect, useRef } from "react";

export function useProjectRowScroll() {
  const rowRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const rows = rowRefs.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const updateRows = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const start = viewportHeight * 0.98;
      const end = viewportHeight * 0.72;

      rows.forEach((row) => {
        if (!row) return;

        if (prefersReducedMotion) {
          row.style.setProperty("--project-scroll-x", "0px");
          return;
        }

        const rect = row.getBoundingClientRect();
        const rawProgress = (start - rect.top) / (start - end);
        const progress = Math.min(1, Math.max(0, rawProgress));
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const offset = (1 - easedProgress) * 24;

        row.style.setProperty("--project-scroll-x", `${offset.toFixed(2)}px`);
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateRows);
    };

    updateRows();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (node: HTMLAnchorElement | null, index: number) => {
    rowRefs.current[index] = node;
  };
}
