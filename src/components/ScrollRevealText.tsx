"use client";

import { Fragment, useEffect, useMemo, useRef, type CSSProperties } from "react";

type ScrollRevealTextProps = {
  text: string | string[];
  className?: string;
  style?: CSSProperties;
  paragraphGap?: number;
  // Per-paragraph reveal speed multiplier. 1 = default, 2 = twice as fast
  // (words packed into half the scroll budget), 0.5 = half as fast.
  paragraphSpeeds?: number[];
};

const DIM_ALPHA = 0.42;
const BRIGHT_ALPHA = 0.96;

// Paragraph-level reveal progress is driven by scroll position.
// p = 0 when the container's top enters near the bottom of the viewport;
// p = 1 once it has had enough time in the reading zone. The window is tuned
// to feel paced without forcing the text too far up the viewport.
const REVEAL_ENTER = 0.95;
const REVEAL_EXIT = 0.63;
const CONTAINER_HEIGHT_FACTOR = 0.58;

// How much paragraph progress one word takes to brighten. Larger = softer
// leading edge (more words mid-transition at once).
const WORD_RAMP = 0.12;

function smoothstep(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

const wordStyle: CSSProperties = {
  display: "inline-block",
  color: `rgba(255, 255, 255, ${DIM_ALPHA})`,
  willChange: "color",
};

export function ScrollRevealText({
  text,
  className,
  style,
  paragraphGap = 24,
  paragraphSpeeds,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphs = Array.isArray(text) ? text : [text];
  const wordsByParagraph = paragraphs.map((paragraph) => paragraph.trim().split(/\s+/));

  // Per-word reading-order position (r ∈ [0, 1]). Each paragraph's words
  // get weight 1/speed — higher speed = lighter weight = words packed
  // closer together in r-space → that paragraph reveals faster in scroll.
  const rValues = useMemo(() => {
    const weights: number[] = [];
    wordsByParagraph.forEach((words, pIdx) => {
      const speed = paragraphSpeeds?.[pIdx] ?? 1;
      const weight = 1 / Math.max(0.0001, speed);
      words.forEach(() => weights.push(weight));
    });
    if (weights.length === 0) return [];
    const before: number[] = [];
    let acc = 0;
    weights.forEach((w) => {
      before.push(acc);
      acc += w;
    });
    const denom = before[before.length - 1] || 1;
    return before.map((c) => c / denom);
  }, [paragraphSpeeds, wordsByParagraph]);

  // Stable dependencies for the effect when text/speeds change.
  const textKey = paragraphs.join(" ");
  const speedsKey = (paragraphSpeeds ?? []).join(",");

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

    let frame = 0;

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const rect = container.getBoundingClientRect();

      // Keep a little height sensitivity so multi-line paragraphs still reveal
      // continuously, without making tall text blocks feel sluggish.
      const enterPx = REVEAL_ENTER * viewportHeight;
      const exitPx = REVEAL_EXIT * viewportHeight;
      const totalDistance = enterPx - exitPx + rect.height * CONTAINER_HEIGHT_FACTOR;
      const p = (enterPx - rect.top) / totalDistance;

      wordEls.forEach((el, index) => {
        const r = rValues[index] ?? 0;
        const t = smoothstep((p - r) / WORD_RAMP);
        const alpha = DIM_ALPHA + (BRIGHT_ALPHA - DIM_ALPHA) * t;
        el.style.color = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [rValues, textKey, speedsKey]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: paragraphGap }}
    >
      {wordsByParagraph.map((words, paragraphIndex) => (
        <p key={paragraphIndex} style={style}>
          {words.map((word, wordIndex) => (
            <Fragment key={`${paragraphIndex}-${wordIndex}`}>
              <span data-reveal-word style={wordStyle}>
                {word}
              </span>
              {wordIndex < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}
