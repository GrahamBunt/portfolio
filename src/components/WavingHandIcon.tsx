"use client";

import { useEffect, useRef } from "react";

export function WavingHandIcon() {
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return undefined;

    let frame = 0;

    const updateHandRotation = () => {
      frame = 0;
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight;
      const triggerDistance = Math.min(360, window.innerHeight * 0.34);
      const distanceFromBottom = pageBottom - scrollBottom;
      const progress = Math.min(1, Math.max(0, 1 - distanceFromBottom / triggerDistance));
      const rotation = 90 - progress * 90;

      element.style.setProperty("--footer-hand-rotation", `${rotation.toFixed(2)}deg`);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHandRotation);
    };

    updateHandRotation();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <span
      ref={wrapperRef}
      className="footer-wave-icon"
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" focusable="false">
        <path
          className="footer-wave-accent is-left"
          d="M16 16c-3 2.8-4.8 6.2-5.4 10.2"
        />
        <path
          className="footer-wave-accent is-right"
          d="M46.5 10.5c4.1 1.5 7.1 4.1 9 7.8"
        />
        <g className="footer-wave-hand">
          <path
            d="M23.4 32.2V16.8c0-2.4 1.7-4.1 3.9-4.1s3.8 1.7 3.8 4.1v12.6"
          />
          <path
            d="M31.1 29.4V12.1c0-2.4 1.7-4.1 3.9-4.1s3.8 1.7 3.8 4.1v18"
          />
          <path
            d="M38.8 30.1V15.8c0-2.3 1.7-4 3.8-4s3.7 1.7 3.7 4v18.7"
          />
          <path
            d="M46.3 34.5v-9.8c0-2.3 1.6-3.9 3.7-3.9s3.7 1.6 3.7 3.9v14.8c0 9.2-6.4 15.5-15.4 15.5h-6.6c-5.1 0-9.4-2-12.6-5.8L10.9 39.3c-1.5-1.8-1.3-4.2.5-5.7 1.7-1.4 4.1-1.2 5.7.6l6.3 7.3"
          />
        </g>
      </svg>
    </span>
  );
}
