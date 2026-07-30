"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { preventTextOrphans } from "@/lib/typography";

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

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function renderTypographicNode(node: ReactNode) {
  return typeof node === "string" ? preventTextOrphans(node) : node;
}

export function ContactSection({
  title = "Get in touch",
  description = "I'm always excited to chat, collaborate on ideas, and discuss opportunities.",
  action = DEFAULT_EMAIL,
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
        <h2 className="display-serif-type w-full font-[family-name:var(--font-display-serif)] text-[44px] font-normal leading-[52px] text-white">
          {renderTypographicNode(title)}
        </h2>
        <p className="contact-description font-sans-preview w-full font-normal text-white/65">
          {renderTypographicNode(description)}
        </p>
      </header>
      <button
        type="button"
        onClick={handleCopy}
        aria-live="polite"
        className="nav-item-pill font-sans-preview relative inline-flex min-w-40 items-center justify-center px-7 text-base font-medium leading-6 text-white"
      >
        <span className="sr-only">{copied ? "Copied email address" : `Copy ${email}`}</span>
        <span aria-hidden="true" className="grid grid-cols-[18px_auto] items-center gap-2.5 opacity-0">
          <CopyIcon />
          {action}
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-7"
        >
          <span className="grid grid-cols-[18px_auto] items-center gap-2.5">
            <span className="relative block size-[18px]">
              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: copied ? 0 : 1,
                  transform: copied ? "scale(0.9)" : "scale(1)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: `${REVERT_MS}ms`,
                  transitionTimingFunction: REVERT_EASE,
                }}
              >
                <CopyIcon />
              </span>
            </span>
            <span className="relative block text-left">
              <span className="invisible">{action}</span>
              <span
                className="absolute inset-0"
                style={{
                  opacity: copied ? 0 : 1,
                  transitionProperty: "opacity",
                  transitionDuration: `${REVERT_MS}ms`,
                  transitionTimingFunction: REVERT_EASE,
                }}
              >
                {action}
              </span>
            </span>
          </span>
        </span>
        <span
          aria-hidden={!copied}
          className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2.5 px-7"
          style={{
            opacity: copied ? 1 : 0,
            transform: copied ? "scale(1)" : "scale(0.96)",
            transitionProperty: "opacity, transform",
            transitionDuration: copied ? "180ms" : `${REVERT_MS}ms`,
            transitionTimingFunction: REVERT_EASE,
          }}
        >
          <CheckIcon />
          Copied
        </span>
      </button>
    </section>
  );
}
