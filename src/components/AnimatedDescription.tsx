"use client";

import type { CSSProperties } from "react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

type AnimatedDescriptionProps = {
  text: string;
  ready: boolean;
  delay?: string;
  className?: string;
};

type MeasuredLine = {
  id: string;
  text: string;
};

function splitWords(text: string) {
  return text.trim().split(/\s+/);
}

export function AnimatedDescription({
  text,
  ready,
  delay = "260ms",
  className = "",
}: AnimatedDescriptionProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<MeasuredLine[]>([]);
  const words = useMemo(() => splitWords(text), [text]);

  useLayoutEffect(() => {
    const paragraph = paragraphRef.current;
    const measure = measureRef.current;
    if (!paragraph || !measure) return;

    const measureLines = () => {
      const wordNodes = Array.from(measure.querySelectorAll<HTMLElement>("[data-word]"));
      const grouped = new Map<number, string[]>();

      wordNodes.forEach((node, index) => {
        const top = Math.round(node.offsetTop);
        const current = grouped.get(top) ?? [];
        current.push(words[index]);
        grouped.set(top, current);
      });

      setLines(
        Array.from(grouped.entries()).map(([top, lineWords]) => ({
          id: `${top}-${lineWords.join("-")}`,
          text: lineWords.join(" "),
        })),
      );
    };

    measureLines();

    const resizeObserver = new ResizeObserver(measureLines);
    resizeObserver.observe(paragraph);

    return () => resizeObserver.disconnect();
  }, [text, words]);

  return (
    <p
      ref={paragraphRef}
      className={`animated-description font-inter-display ${ready ? "is-ready" : "opacity-0"} ${className}`}
      style={ready ? ({ "--description-delay": delay } as CSSProperties) : undefined}
      aria-label={text}
    >
      <span ref={measureRef} className="animated-description-measure" aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} data-word>
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
      <span className="animated-description-lines" aria-hidden="true">
        {(lines.length ? lines : [{ id: "fallback", text }]).map((line, index) => (
          <span
            key={line.id}
            className="animated-description-line"
            style={{ "--line-delay": `${index * 90}ms` } as CSSProperties}
          >
            {line.text}
          </span>
        ))}
      </span>
    </p>
  );
}
