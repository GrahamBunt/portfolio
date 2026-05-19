"use client";

import { Fragment, useEffect, useRef, type CSSProperties } from "react";

type ScrollRevealTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

const DIM_ALPHA = 0.12;
const BRIGHT_ALPHA = 0.96;

// The paragraph's reveal is driven by its scroll position. p = 0 when the
// paragraph's top enters near the bottom of the viewport; p = 1 once it has
// risen into the reading zone.
const REVEAL_ENTER = 0.95; // container top as a fraction of viewport height
const REVEAL_EXIT = 0.4;

// How much paragraph progress one word takes to brighten. Larger = softer
// leading edge (more words mid-transition at once).
const WORD_RAMP = 0.13;

function smoothstep(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

const wordStyle: CSSProperties = {
  display: "inline-block",
  color: `rgba(255, 255, 255, ${DIM_ALPHA})`,
  willChange: "color",
};

export function ScrollRevealText({ text, className, style }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = text.trim().split(/\s+/);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wordEls = Array.from(
      container.querySelectorAll<HTMLElement>("[data-reveal-word]"),
    );
    if (wordEls.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wordEls.forEach((el) => {
        el.style.color = `rgba(255, 255, 255, ${BRIGHT_ALPHA})`;
      });
      return;
    }

    const lastIndex = Math.max(1, wordEls.length - 1);
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const top = container.getBoundingClientRect().top;

      // Paragraph-level reveal progress, driven purely by scroll position.
      const enterPx = REVEAL_ENTER * viewportHeight;
      const exitPx = REVEAL_EXIT * viewportHeight;
      const p = (enterPx - top) / (enterPx - exitPx);

      wordEls.forEach((el, index) => {
        // Reading-order position of this word: 0 (first) .. 1 (last). DOM
        // order is reading order, so the playhead sweeps left-to-right then
        // line-by-line, exactly how the text is read.
        const r = index / lastIndex;
        const t = smoothstep((p - r) / WORD_RAMP);
        const alpha = DIM_ALPHA + (BRIGHT_ALPHA - DIM_ALPHA) * t;
        el.style.color = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    // Run once on mount so a mid-page refresh resolves to the correct state.
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [text]);

  return (
    <p ref={containerRef} className={className} style={style}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span data-reveal-word style={wordStyle}>
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}
