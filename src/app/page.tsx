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

function getProjectImage(project: (typeof allWork)[number]) {
  return project.homepageImage ?? project.image;
}

export default function Home() {
  const [fontsReady, setFontsReady] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
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

    const timeoutId = window.setTimeout(() => setCopiedEmail(false), 2600);
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
                src="/home-hero-portrait.jpg"
                alt=""
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
            <span>Graham Bunt is a product designer leaning into </span>
            <span>scale and complexity, shaping direction, and driving </span>
            <span>teams to bring ambitious ideas to life.</span>
          </p>
        </section>

        <section className="home-selected-work-section staged-work-rise"
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
                    unoptimized
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

        <section className="home-contact-band">
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
                  {copiedEmail ? <CheckIcon /> : <CopyIcon />}
                  {copiedEmail ? <CopyParticles /> : null}
                </button>
                <span className="home-email-copy-text" aria-live="polite">
                  {copiedEmail ? "Copied" : HOME_EMAIL}
                </span>
              </div>
            </div>
          </div>
          <footer className="work-footer home-footer">
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
