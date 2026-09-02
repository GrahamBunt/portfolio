"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectMeta } from "@/components/ProjectMeta";
import { SiteNav } from "@/components/SiteNav";
import { allWork } from "@/content/work";
import { preventTextOrphans } from "@/lib/typography";

const featuredHomeProjectSlugs = ["smartsheet-reports", "resource-management-integration", "metlife-mexico"];
const homeFeaturedProjects = featuredHomeProjectSlugs
  .map((slug) => allWork.find((project) => project.slug === slug))
  .filter((project): project is (typeof allWork)[number] => Boolean(project));

const HOME_EMAIL = "gtbunt@gmail.com";
const HOME_SUPPORT_TEXT =
  "Graham Bunt is a product designer leaning into scale and complexity, shaping direction, and helping teams bring ambitious ideas to life.";
const HOME_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://grahambunt.com/#person",
      name: "Graham Bunt",
      jobTitle: "Product Designer",
      url: "https://grahambunt.com",
      email: "mailto:gtbunt@gmail.com",
      image: "https://grahambunt.com/home-hero-portrait.jpg",
      sameAs: ["https://www.linkedin.com/in/grahambunt/"],
      description: HOME_SUPPORT_TEXT,
    },
    {
      "@type": "WebSite",
      "@id": "https://grahambunt.com/#website",
      name: "Graham Bunt",
      url: "https://grahambunt.com",
      publisher: {
        "@id": "https://grahambunt.com/#person",
      },
      description: HOME_SUPPORT_TEXT,
    },
  ],
};

type HeroH1TypeDials = {
  tracking: number;
  lineHeight: number;
  minSize: number;
  viewportSize: number;
  maxSize: number;
  maxWidth: number;
  weight: number;
};

type HeroSubtextTypeDials = {
  tracking: number;
  lineHeight: number;
  size: number;
  maxWidth: number;
  weight: number;
};

const HERO_H1_DEFAULT_TYPE_DIALS: HeroH1TypeDials = {
  tracking: -0.022,
  lineHeight: 0.845,
  minSize: 60,
  viewportSize: 8.7,
  maxSize: 144,
  maxWidth: 1460,
  weight: 600,
};

const HERO_SUBTEXT_DEFAULT_TYPE_DIALS: HeroSubtextTypeDials = {
  tracking: -0.014,
  lineHeight: 1.12,
  size: 33,
  maxWidth: 760,
  weight: 400,
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z" />
    </svg>
  );
}

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

function getProjectImage(project: (typeof allWork)[number]) {
  return project.homepageImage ?? project.image;
}

export default function Home() {
  const [fontsReady, setFontsReady] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copyBurstKey, setCopyBurstKey] = useState(0);
  const heroPortraitRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    document.fonts.ready
      .then(() => new Promise((r) => setTimeout(r, 140)))
      .then(() => setFontsReady(true));
  }, []);

  useEffect(() => {
    if (!copiedEmail) return;

    const timeoutId = window.setTimeout(() => setCopiedEmail(false), 1250);
    return () => window.clearTimeout(timeoutId);
  }, [copiedEmail]);

  useEffect(() => {
    const portrait = heroPortraitRef.current;
    if (!portrait) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updatePortraitParallax = () => {
      frame = 0;

      if (reduceMotion.matches) {
        portrait.style.setProperty("--home-hero-portrait-parallax", "0px");
        return;
      }

      const distance = Math.min(72, Math.max(0, window.scrollY * 0.12));
      portrait.style.setProperty("--home-hero-portrait-parallax", `${distance.toFixed(2)}px`);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updatePortraitParallax);
    };

    updatePortraitParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reduceMotion.addEventListener("change", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reduceMotion.removeEventListener("change", requestUpdate);
    };
  }, []);

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

    setCopyBurstKey((key) => key + 1);
    setCopiedEmail(true);
  };

  return (
    <main
      className={`home-page min-h-screen text-white ${fontsReady ? "sequence-ready" : ""}`}
      style={
        {
          "--home-hero-subtext-tracking": `${HERO_SUBTEXT_DEFAULT_TYPE_DIALS.tracking}em`,
          "--home-hero-subtext-line": HERO_SUBTEXT_DEFAULT_TYPE_DIALS.lineHeight,
          "--home-hero-subtext-size": `${HERO_SUBTEXT_DEFAULT_TYPE_DIALS.size}px`,
          "--home-hero-subtext-max-width": `${HERO_SUBTEXT_DEFAULT_TYPE_DIALS.maxWidth}px`,
          "--home-hero-subtext-weight": HERO_SUBTEXT_DEFAULT_TYPE_DIALS.weight,
        } as CSSProperties
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_STRUCTURED_DATA) }}
      />
      <div className="home-page-shell">
        <SiteNav />

        <section
          data-section="intro"
          className="home-hero-v2"
          aria-labelledby="home-identity-title"
        >
          <h1
            id="home-identity-title"
            className={`home-hero-name ${fontsReady ? "animate-reveal" : "opacity-0"}`}
            style={
              {
                "--home-hero-h1-tracking": `${HERO_H1_DEFAULT_TYPE_DIALS.tracking}em`,
                "--home-hero-h1-line": HERO_H1_DEFAULT_TYPE_DIALS.lineHeight,
                "--home-hero-h1-min-size": `${HERO_H1_DEFAULT_TYPE_DIALS.minSize}px`,
                "--home-hero-h1-vw-size": `${HERO_H1_DEFAULT_TYPE_DIALS.viewportSize}vw`,
                "--home-hero-h1-max-size": `${HERO_H1_DEFAULT_TYPE_DIALS.maxSize}px`,
                "--home-hero-h1-max-width": `${HERO_H1_DEFAULT_TYPE_DIALS.maxWidth}px`,
                "--home-hero-h1-weight": HERO_H1_DEFAULT_TYPE_DIALS.weight,
              } as CSSProperties
            }
          >
            <span className="home-hero-line home-hero-line-top">
              In pursuit of
            </span>{" "}
            <span className="home-hero-line home-hero-line-bottom">
              shipping great work.
            </span>
          </h1>
          <figure
            className={`home-hero-portrait ${fontsReady ? "animate-reveal" : "opacity-0"}`}
            aria-hidden="true"
          >
            <span ref={heroPortraitRef} className="home-hero-portrait-parallax">
              <Image
                src="/home-hero-portrait-mono.jpg"
                alt="Graham Bunt, product designer"
                width={1000}
                height={978}
                priority
                sizes="(max-width: 760px) calc(100vw - 40px), 28vw"
              />
            </span>
          </figure>
          <p
            className={`home-hero-value ${fontsReady ? "animate-reveal" : "opacity-0"}`}
          >
            {HOME_SUPPORT_TEXT}
          </p>
        </section>

        <section className="home-selected-work-section staged-work-rise"
          data-nosnippet
          style={
            {
              "--rise-delay": "220ms",
              "--rise-duration": "0.62s",
              "--rise-distance": "8px",
              "--rise-animation": "quiet-rise-in",
              "--rise-blur": "0px",
            } as CSSProperties
          }
        >
          <p className="home-section-label">Select work</p>
          <div
            className="home-featured-work-grid"
          >
            {homeFeaturedProjects.map((project, index) => (
              <Link key={project.slug} href={`/work/${project.slug}`} className="case-study-next-up-card home-featured-work-card">
                <span className="home-featured-work-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <figure className="case-study-next-up-media">
                  <Image
                    src={getProjectImage(project)}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1180px) calc(100vw - 520px), 960px"
                    loading={project.slug === "smartsheet-reports" ? "eager" : "lazy"}
                    preload={project.slug === "smartsheet-reports"}
                    fetchPriority={project.slug === "smartsheet-reports" ? "high" : "auto"}
                    quality={92}
                    style={{
                      objectPosition: project.slug === "smartsheet-reports" || project.slug === "resource-management-integration" ? "70% 18%" : "50% 50%",
                    }}
                  />
                </figure>
                <div className="case-study-next-up-copy">
                  <div className="case-study-next-up-title-row">
                    <h3>{preventTextOrphans(project.title)}</h3>
                    <span className="case-study-next-up-arrow">
                      <ArrowIcon />
                    </span>
                  </div>
                  <p className="home-featured-work-summary font-sans-preview">{project.summary}</p>
                  {project.cardMeta ? (
                    <p className="case-study-next-up-meta font-sans-preview">
                      <ProjectMeta value={project.cardMeta} />
                    </p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-contact-band" data-nosnippet>
          <div className="home-contact-content">
            <div className="home-contact-copy-stack">
              <p className="home-contact-copy">
                {"I'd love to hear from you—let's chat, collaborate on ideas, or discuss opportunities."}
              </p>
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
                    {HOME_EMAIL}
                  </span>
                  <span className="home-email-copy-text-layer is-copied" aria-hidden={!copiedEmail}>
                    Copied
                  </span>
                  <span className="sr-only">{copiedEmail ? "Copied" : HOME_EMAIL}</span>
                </span>
              </div>
            </div>
          </div>
          <footer className="work-footer home-footer" data-nosnippet>
            <div>
              <p>Graham Bunt</p>
              <p>©2026</p>
            </div>
          </footer>
        </section>

      </div>
      <div aria-hidden="true" className="viewport-bottom-blur" />
    </main>
  );
}
