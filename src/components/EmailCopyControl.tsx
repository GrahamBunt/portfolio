"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

const DEFAULT_EMAIL = "gtbunt@gmail.com";
const COPIED_RESET_MS = 1250;

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="home-copy-email-check-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.18" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="19 7.15 10.15 16 5 10.85" />
    </svg>
  );
}

function CopyParticles() {
  const particles = [
    ["4px", "-20px", "11px", "-45px", "15px", "-58px", "70ms", "104deg"],
    ["17px", "-10px", "42px", "-32px", "55px", "-43px", "82ms", "138deg"],
    ["20px", "4px", "51px", "7px", "66px", "9px", "96ms", "184deg"],
    ["13px", "15px", "35px", "41px", "47px", "54px", "108ms", "230deg"],
    ["-3px", "20px", "-9px", "47px", "-12px", "61px", "90ms", "282deg"],
    ["-17px", "9px", "-43px", "25px", "-56px", "33px", "102ms", "332deg"],
    ["-12px", "-16px", "-32px", "-40px", "-43px", "-52px", "78ms", "46deg"],
  ];

  return (
    <span className="home-copy-email-particles" aria-hidden="true">
      {particles.map(([originX, originY, midX, midY, x, y, delay, angle], index) => (
        <span
          key={`${x}-${y}-${index}`}
          className="home-copy-email-particle"
          style={
            {
              "--particle-origin-x": originX,
              "--particle-origin-y": originY,
              "--particle-mid-x": midX,
              "--particle-mid-y": midY,
              "--particle-x": x,
              "--particle-y": y,
              "--particle-delay": delay,
              "--particle-angle": angle,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}

type EmailCopyControlProps = {
  email?: string;
};

export function EmailCopyControl({ email = DEFAULT_EMAIL }: EmailCopyControlProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copyBurstKey, setCopyBurstKey] = useState(0);

  useEffect(() => {
    if (!copiedEmail) return;

    const timeoutId = window.setTimeout(() => setCopiedEmail(false), COPIED_RESET_MS);
    return () => window.clearTimeout(timeoutId);
  }, [copiedEmail]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
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

    setCopyBurstKey((key) => key + 1);
    setCopiedEmail(true);
  };

  return (
    <div className="home-email-copy-row">
      <button
        type="button"
        className={`nav-item-pill home-copy-email-button ${copiedEmail ? "is-copied" : ""}`}
        onClick={copyEmail}
        aria-label={copiedEmail ? "Email copied" : "Copy email address"}
        aria-live="polite"
      >
        <span className="home-copy-email-icon-stack" aria-hidden="true">
          <span className="home-copy-email-icon-layer is-copy">
            <CopyIcon />
          </span>
          <span className="home-copy-email-icon-layer is-check">
            <CheckIcon />
          </span>
        </span>
        {copiedEmail ? <span key={`surface-${copyBurstKey}`} className="home-copy-email-surface" aria-hidden="true" /> : null}
        {copiedEmail ? <span key={`pulse-${copyBurstKey}`} className="home-copy-email-pulse" aria-hidden="true" /> : null}
        {copiedEmail ? <CopyParticles key={copyBurstKey} /> : null}
      </button>
      <span
        className={`home-email-copy-text ${copiedEmail ? "is-copied" : ""}`}
        aria-live="polite"
      >
        <span className="home-email-copy-text-layer is-email" aria-hidden={copiedEmail}>
          {email}
        </span>
        <span className="home-email-copy-text-layer is-copied" aria-hidden={!copiedEmail}>
          Copied
        </span>
        <span className="sr-only">{copiedEmail ? "Copied" : email}</span>
      </span>
    </div>
  );
}
