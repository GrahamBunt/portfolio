"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type ContactSectionProps = {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: "center" | "left";
  email?: string;
};

const DEFAULT_EMAIL = "gtbunt@gmail.com";
const COPIED_RESET_MS = 2600;
const REVERT_EASE = "cubic-bezier(0.25, 0.1, 0.25, 1)";
const REVERT_MS = 420;

export function ContactSection({
  title = "Contact",
  description = "I’m always excited to meet new people, collaborate on ideas, and discuss opportunities.",
  action = "Copy Email",
  align = "center",
  email = DEFAULT_EMAIL,
}: ContactSectionProps) {
  const isLeft = align === "left";
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for older browsers or insecure contexts
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
      } finally {
        document.body.removeChild(textarea);
      }
    }

    setCopied(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
  };

  return (
    <section
      data-section="contact"
      className={`flex w-full max-w-[560px] flex-col gap-[30px] p-5 ${isLeft ? "items-start text-left" : "items-center text-center"}`}
    >
      <header className={`flex w-full flex-col gap-2.5 ${isLeft ? "items-start" : "items-center"}`}>
        <h2 className="w-full font-[family-name:var(--font-instrument-serif)] text-[48px] leading-[56px] text-white">
          {title}
        </h2>
        <p className="font-inter-display w-full text-2xl font-medium leading-8 text-white/65">
          {description}
        </p>
      </header>
      <button
        type="button"
        onClick={handleCopy}
        aria-live="polite"
        className="nav-item-pill font-inter-display relative inline-flex w-40 items-center justify-center text-base font-medium leading-6 text-white"
      >
        <span
          className="flex items-center gap-2.5"
          style={{
            opacity: copied ? 0 : 1,
            transform: copied ? "translateY(3px)" : "translateY(0)",
            transitionProperty: "opacity, transform",
            transitionDuration: copied ? "0ms" : `${REVERT_MS}ms`,
            transitionDelay: copied ? "0ms" : "80ms",
            transitionTimingFunction: REVERT_EASE,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {action}
        </span>
        <span
          aria-hidden={!copied}
          className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2.5"
          style={{
            opacity: copied ? 1 : 0,
            transform: copied ? "translateY(0)" : "translateY(-3px)",
            transitionProperty: "opacity, transform",
            transitionDuration: copied ? "0ms" : `${REVERT_MS}ms`,
            transitionTimingFunction: REVERT_EASE,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied
        </span>
      </button>
    </section>
  );
}
