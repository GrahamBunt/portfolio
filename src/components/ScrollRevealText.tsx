"use client";

import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { preventTextOrphans, splitTypographicWords } from "@/lib/typography";

type ScrollRevealTextProps = {
  text: string | string[];
  className?: string;
  style?: CSSProperties;
  paragraphGap?: number;
  // Per-paragraph reveal speed multiplier. 1 = default, 2 = twice as fast
  // (lines packed into half the scroll budget), 0.5 = half as fast.
  paragraphSpeeds?: number[];
  // Stretches the scroll distance needed for the full reveal. Larger = slower.
  revealDistanceScale?: number;
};

const DIM_ALPHA = 0.42;

// Paragraph-level reveal progress is driven by scroll position.
// p = 0 when the container's top enters near the bottom of the viewport;
// p = 1 once it has had enough time in the reading zone. The window is tuned
// to feel paced without forcing the text too far up the viewport.
const REVEAL_ENTER = 0.95;
const REVEAL_EXIT = 0.63;
const CONTAINER_HEIGHT_FACTOR = 0.58;

// How much paragraph progress one word takes to brighten. Larger = softer
// leading edge (more words mid-transition at once).
const LINE_RAMP = 0.24;

function smoothstep(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

const wordStyle: CSSProperties = {
  display: "inline",
  color: `rgba(255, 255, 255, ${DIM_ALPHA})`,
  willChange: "color",
};

const measurementStyle: CSSProperties = {
  visibility: "hidden",
  pointerEvents: "none",
};

const overlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  pointerEvents: "none",
};

function serializeLines(lines: string[][][]) {
  return lines.map((paragraph) => paragraph.map((line) => line.join(" ")).join("\n")).join("\n\n");
}

export function ScrollRevealText({
  text,
  className,
  style,
  paragraphGap = 24,
  paragraphSpeeds,
  revealDistanceScale = 1,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesKeyRef = useRef("");
  const [linesByParagraph, setLinesByParagraph] = useState<string[][][] | null>(null);
  const textKey = Array.isArray(text) ? text.join(" ") : text;
  const paragraphs = useMemo(() => (Array.isArray(text) ? text : [text]).map(preventTextOrphans), [text]);
  const wordsByParagraph = useMemo(
    () => paragraphs.map(splitTypographicWords),
    [paragraphs],
  );

  // Per-line reading-order position (r ∈ [0, 1]). Each paragraph's lines
  // get weight 1/speed — higher speed = lighter weight = lines packed
  // closer together in r-space → that paragraph reveals faster in scroll.
  const lineRValues = useMemo(() => {
    if (!linesByParagraph) return [];

    const weights: number[] = [];
    linesByParagraph.forEach((lines, pIdx) => {
      const speed = paragraphSpeeds?.[pIdx] ?? 1;
      const weight = 1 / Math.max(0.0001, speed);
      lines.forEach(() => weights.push(weight));
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
  }, [linesByParagraph, paragraphSpeeds]);

  const speedsKey = (paragraphSpeeds ?? []).join(",");

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;
    let cancelled = false;

    const measure = () => {
      frame = 0;
      if (cancelled) return;

      const paragraphEls = Array.from(
        container.querySelectorAll<HTMLElement>("[data-reveal-measure-paragraph]"),
      );

      const nextLines = paragraphEls.map((paragraphEl, paragraphIndex) => {
        const wordEls = Array.from(
          paragraphEl.querySelectorAll<HTMLElement>("[data-reveal-measure-word]"),
        );
        const paragraphLines: string[][] = [];
        let currentTop: number | null = null;

        wordEls.forEach((wordEl, wordIndex) => {
          const rect = wordEl.getBoundingClientRect();
          const top = rect.top;

          if (currentTop === null || Math.abs(top - currentTop) > 2) {
            paragraphLines.push([]);
            currentTop = top;
          }

          paragraphLines[paragraphLines.length - 1].push(
            wordsByParagraph[paragraphIndex]?.[wordIndex] ?? wordEl.textContent ?? "",
          );
        });

        return paragraphLines;
      });

      const nextKey = serializeLines(nextLines);
      if (nextKey !== linesKeyRef.current) {
        linesKeyRef.current = nextKey;
        setLinesByParagraph(nextLines);
      }
    };

    const requestMeasure = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(measure);
    };

    measure();

    const resizeObserver = new ResizeObserver(requestMeasure);
    resizeObserver.observe(container);
    document.fonts?.ready.then(requestMeasure).catch(() => undefined);

    return () => {
      cancelled = true;
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [textKey, wordsByParagraph]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lineEls = Array.from(
      container.querySelectorAll<HTMLElement>("[data-reveal-line]"),
    );
    if (lineEls.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lineEls.forEach((el) => {
        el.style.setProperty("--line-fill", "100%");
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
      const totalDistance = (enterPx - exitPx + rect.height * CONTAINER_HEIGHT_FACTOR) * Math.max(0.0001, revealDistanceScale);
      const p = (enterPx - rect.top) / totalDistance;

      const maxLineIndex = Math.max(1, lineEls.length - 1);
      lineEls.forEach((el, index) => {
        const r = lineRValues[index] ?? index / maxLineIndex;
        const t = smoothstep((p - r) / LINE_RAMP);
        el.style.setProperty("--line-fill", `${(t * 100).toFixed(2)}%`);
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
  }, [linesByParagraph, lineRValues, textKey, speedsKey, revealDistanceScale]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative" }}
    >
      <div
        aria-hidden="true"
        style={{ ...measurementStyle, display: "flex", flexDirection: "column", gap: paragraphGap }}
      >
        {wordsByParagraph.map((words, paragraphIndex) => (
          <p key={paragraphIndex} data-reveal-measure-paragraph style={style}>
            {words.map((word, wordIndex) => (
              <Fragment key={`${paragraphIndex}-${wordIndex}`}>
                <span data-reveal-measure-word style={wordStyle}>
                  {word}
                </span>
                {wordIndex < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </p>
        ))}
      </div>

      {linesByParagraph ? (
        <div style={{ ...overlayStyle, gap: paragraphGap }}>
          {linesByParagraph.map((paragraphLines, paragraphIndex) => (
            <p key={paragraphIndex} style={style}>
              {paragraphLines.map((lineWords, lineIndex) => (
                <span key={`${paragraphIndex}-${lineIndex}`} className="scroll-reveal-line" data-reveal-line>
                  {lineWords.join(" ")}
                </span>
              ))}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
