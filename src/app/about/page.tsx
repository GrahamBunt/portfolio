"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EmailCopyControl } from "@/components/EmailCopyControl";
import { SiteNav } from "@/components/SiteNav";
import { aboutContent } from "@/content/about";
import { preventTextOrphans } from "@/lib/typography";

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

export default function AboutPage() {
  const [fontsReady, setFontsReady] = useState(false);
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
      <SiteNav />

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
                      alt={image.label}
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

        <section className="home-contact-band" data-nosnippet>
          <div className="home-contact-content">
            <div className="home-contact-copy-stack">
              <p className="home-contact-copy">{aboutContent.contact.description}</p>
              <EmailCopyControl email={aboutContent.contact.action} />
            </div>
          </div>
          <footer className="work-footer home-footer" data-nosnippet>
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
