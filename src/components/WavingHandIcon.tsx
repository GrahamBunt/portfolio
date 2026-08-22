"use client";

import { useEffect, useRef, useState } from "react";

export function WavingHandIcon() {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.65 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={wrapperRef}
      className={`footer-wave-icon ${isVisible ? "is-visible" : ""}`}
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
