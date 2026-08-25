"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SiteNav } from "@/components/SiteNav";
import { aboutContent } from "@/content/about";
import { preventTextOrphans } from "@/lib/typography";

const HOME_EMAIL = "gtbunt@gmail.com";
const LABEL_EXIT_DURATION = 460;
const ABOUT_HOVER_LABELS_ENABLED = true;
const SHARED_SUPPORT_TYPE = {
  tracking: -0.014,
  lineHeight: 1.12,
  size: 33,
  maxWidth: 760,
  weight: 400,
};

type AboutMedia =
  | {
      type: "image";
      src: string;
      width: number;
      height: number;
    }
  | {
      type: "video";
      src: string;
      width: number;
      height: number;
    };

type AboutImageItem = {
  label: string;
  placement: string;
  parallax: number;
  media?: AboutMedia;
};

const aboutImages: AboutImageItem[] = [
  {
    label: "Family in Steamboat",
    placement: "is-family",
    parallax: 14,
    media: {
      type: "image",
      src: "/about/family-v2.jpg",
      width: 1800,
      height: 2600,
    },
  },
  {
    label: "Maverick + Bodhi",
    placement: "is-dogs",
    parallax: -10,
    media: {
      type: "image",
      src: "/about/maverick-bodhi.jpg",
      width: 4032,
      height: 3024,
    },
  },
  {
    label: "\"big bike\"",
    placement: "is-shore",
    parallax: 12,
    media: {
      type: "image",
      src: "/about/biking-family.jpg",
      width: 1800,
      height: 1350,
    },
  },
  {
    label: "Rory + Mara",
    placement: "is-snowboarder",
    parallax: -8,
    media: {
      type: "image",
      src: "/about/rory-mara.jpg",
      width: 1800,
      height: 1350,
    },
  },
];

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
    <svg className="home-copy-email-check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CopyParticles() {
  const particles = [
    ["0px", "-62px", "0ms"],
    ["46px", "-50px", "18ms"],
    ["64px", "-4px", "32ms"],
    ["47px", "48px", "46ms"],
    ["2px", "64px", "16ms"],
    ["-50px", "46px", "38ms"],
    ["-64px", "-2px", "24ms"],
    ["-44px", "-52px", "8ms"],
    ["24px", "-70px", "54ms"],
    ["68px", "26px", "4ms"],
    ["-26px", "68px", "58ms"],
    ["-70px", "-22px", "42ms"],
  ];

  return (
    <span className="home-copy-email-particles" aria-hidden="true">
      {particles.map(([x, y, delay], index) => (
        <span
          key={`${x}-${y}-${index}`}
          className="home-copy-email-particle"
          style={{ "--particle-x": x, "--particle-y": y, "--particle-delay": delay } as CSSProperties}
        />
      ))}
    </span>
  );
}

export default function AboutPage() {
  const [fontsReady, setFontsReady] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [labelStates, setLabelStates] = useState<Record<number, "active" | "exiting">>({});
  const labelExitTimeouts = useRef<Record<number, number>>({});
  const collageFrameRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    document.fonts.ready
      .then(() => new Promise((resolve) => setTimeout(resolve, 120)))
      .then(() => setFontsReady(true));
  }, []);

  useEffect(() => {
    if (!copiedEmail) return;

    const timeoutId = window.setTimeout(() => setCopiedEmail(false), 2600);
    return () => window.clearTimeout(timeoutId);
  }, [copiedEmail]);

  useEffect(() => {
    const timeouts = labelExitTimeouts.current;

    return () => {
      Object.values(timeouts).forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    const clearTransforms = () => {
      collageFrameRefs.current.forEach((frame) => {
        if (!frame) return;
        frame.style.transform = "translate3d(0, 0, 0)";
      });
    };

    const updateParallax = () => {
      frameId = 0;

      if (reduceMotion.matches || window.innerWidth <= 760) {
        clearTransforms();
        return;
      }

      const viewportHeight = window.innerHeight || 1;
      const viewportCenter = viewportHeight / 2;

      collageFrameRefs.current.forEach((frame, index) => {
        if (!frame) return;

        const item = frame.closest(".about-collage-item");
        if (!item) return;

        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distanceFromCenter = (itemCenter - viewportCenter) / viewportHeight;
        const depth = aboutImages[index]?.parallax ?? 0;
        const y = Math.max(-20, Math.min(20, distanceFromCenter * depth));

        frame.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      });
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reduceMotion.addEventListener("change", requestUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reduceMotion.removeEventListener("change", requestUpdate);
    };
  }, []);

  const showLabel = (index: number) => {
    window.clearTimeout(labelExitTimeouts.current[index]);
    setLabelStates((current) => ({ ...current, [index]: "active" }));
  };

  const hideLabel = (index: number) => {
    window.clearTimeout(labelExitTimeouts.current[index]);
    setLabelStates((current) => {
      if (!current[index]) return current;
      return { ...current, [index]: "exiting" };
    });

    labelExitTimeouts.current[index] = window.setTimeout(() => {
      setLabelStates((current) => {
        if (current[index] !== "exiting") return current;
        const next = { ...current };
        delete next[index];
        return next;
      });
    }, LABEL_EXIT_DURATION);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(HOME_EMAIL);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = HOME_EMAIL;
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

    setCopiedEmail(true);
  };

  return (
    <div
      className={`about-page ${ABOUT_HOVER_LABELS_ENABLED ? "is-about-hover-labels-enabled" : ""} ${fontsReady ? "sequence-ready" : ""}`}
      style={
        {
          "--home-hero-subtext-tracking": `${SHARED_SUPPORT_TYPE.tracking}em`,
          "--home-hero-subtext-line": SHARED_SUPPORT_TYPE.lineHeight,
          "--home-hero-subtext-size": `${SHARED_SUPPORT_TYPE.size}px`,
          "--home-hero-subtext-max-width": `${SHARED_SUPPORT_TYPE.maxWidth}px`,
          "--home-hero-subtext-weight": SHARED_SUPPORT_TYPE.weight,
        } as CSSProperties
      }
    >
      <SiteNav showBack />

      <main className="about-main">
        <section className="about-act-one" aria-label="Personal">
          <div className={`about-orientation ${fontsReady ? "animate-reveal" : "opacity-0"}`}>
            <h1 className="about-orientation-title">Graham Bunt</h1>
            <p className="about-orientation-block">
              Born and raised on the Jersey Shore. Now living in Salt Lake City with my wife, daughters, and two goldens. I like being outside, staying active, and getting back to the ocean whenever I can.
            </p>
          </div>

          <div className="about-image-canvas" aria-label="Personal photographs">
            {aboutImages.map((image, index) => (
              <figure
                key={`${image.label}-${index}`}
                className={`about-collage-item ${image.placement} ${
                  ABOUT_HOVER_LABELS_ENABLED && labelStates[index] === "active" ? "is-label-active" : ""
                } ${ABOUT_HOVER_LABELS_ENABLED && labelStates[index] === "exiting" ? "is-label-exiting" : ""} staged-work-rise`}
                style={{ "--rise-delay": `${180 + index * 80}ms` } as CSSProperties}
                tabIndex={ABOUT_HOVER_LABELS_ENABLED ? 0 : undefined}
                onPointerEnter={ABOUT_HOVER_LABELS_ENABLED ? () => showLabel(index) : undefined}
                onPointerLeave={ABOUT_HOVER_LABELS_ENABLED ? () => hideLabel(index) : undefined}
                onFocus={ABOUT_HOVER_LABELS_ENABLED ? () => showLabel(index) : undefined}
                onBlur={ABOUT_HOVER_LABELS_ENABLED ? () => hideLabel(index) : undefined}
              >
                <span
                  className={`about-collage-frame ${image.media ? "has-media" : ""}`}
                  aria-hidden="true"
                  ref={(element) => {
                    collageFrameRefs.current[index] = element;
                  }}
                >
                  {image.media?.type === "video" ? (
                    <video
                      src={image.media.src}
                      width={image.media.width}
                      height={image.media.height}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : image.media?.type === "image" ? (
                    <Image
                      src={image.media.src}
                      alt=""
                      width={image.media.width}
                      height={image.media.height}
                      sizes="(max-width: 760px) 90vw, 38vw"
                    />
                  ) : null}
                </span>
                <figcaption className="about-collage-label" aria-hidden="true">
                  {image.label.split("\n").map((line, lineIndex) => (
                    <span
                      key={`${image.label}-${line}-${lineIndex}`}
                      className="about-hover-label-line-mask"
                      style={{ "--line-index": lineIndex } as CSSProperties}
                    >
                      <span className="about-hover-label-line-words">
                        {line.split(" ").map((word, wordIndex) => (
                          <span
                            key={`${image.label}-${line}-${word}-${wordIndex}`}
                            className="about-hover-label-word"
                            style={{ "--word-index": wordIndex } as CSSProperties}
                          >
                            {Array.from(word).map((character, characterIndex) => (
                              <span
                                key={`${image.label}-${line}-${word}-${character}-${characterIndex}`}
                                className="about-hover-label-character"
                                style={{ "--character-index": characterIndex } as CSSProperties}
                              >
                                {character}
                              </span>
                            ))}
                          </span>
                        ))}
                      </span>
                    </span>
                  ))}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="about-act-two" aria-label="Reflection">
          <div className="about-text-section">
            <div className="about-act-two-content">
              <h1 className="about-practice-statement">
                {["Practice.", "Failure.", "Repetition.", "Competence.", "Style."].map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </h1>

              <div className="about-copy">
                {aboutContent.bio.slice(0, 3).map((paragraph, index) => (
                  <p key={index}>{preventTextOrphans(paragraph)}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="home-contact-band">
          <div className="home-contact-content">
            <div className="home-contact-copy-stack">
              <p className="home-contact-copy">{aboutContent.contact.description}</p>
              <div className="home-email-copy-row">
                <button
                  type="button"
                  className={`nav-item-pill home-copy-email-button ${copiedEmail ? "is-copied" : ""}`}
                  onClick={copyEmail}
                  aria-label={copiedEmail ? "Email copied" : "Copy email address"}
                  aria-live="polite"
                >
                  {copiedEmail ? <CheckIcon /> : <CopyIcon />}
                  {copiedEmail ? <CopyParticles /> : null}
                </button>
                <span className="home-email-copy-text" aria-live="polite">
                  {copiedEmail ? "Copied" : aboutContent.contact.action}
                </span>
              </div>
            </div>
          </div>
          <footer className="work-footer home-footer">
            <div>
              <p>{preventTextOrphans(aboutContent.footer.name)}</p>
              <p>{aboutContent.footer.year}</p>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
