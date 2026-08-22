"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectMeta } from "@/components/ProjectMeta";
import { SiteNav } from "@/components/SiteNav";
import { WavingHandIcon } from "@/components/WavingHandIcon";
import { allWork } from "@/content/work";
import { preventTextOrphans } from "@/lib/typography";

const featuredHomeProjectSlugs = ["smartsheet-reports", "resource-management-integration", "metlife-mexico"];
const homeFeaturedProjects = featuredHomeProjectSlugs
  .map((slug) => allWork.find((project) => project.slug === slug))
  .filter((project): project is (typeof allWork)[number] => Boolean(project));

const HOME_EMAIL = "gtbunt@gmail.com";
const HERO_H1_TRACKING_STORAGE_KEY = "homeHeroH1Tracking";
const HERO_H1_TYPE_DIALS_STORAGE_KEY = "homeHeroH1TypeDialsV4";
const HERO_SUBTEXT_TYPE_DIALS_STORAGE_KEY = "homeHeroSubtextTypeDialsV2";

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
  lineHeight: 0.925,
  minSize: 60,
  viewportSize: 8.7,
  maxSize: 144,
  maxWidth: 1460,
  weight: 600,
};

const HERO_SUBTEXT_DEFAULT_TYPE_DIALS: HeroSubtextTypeDials = {
  tracking: -0.014,
  lineHeight: 1.045,
  size: 35,
  maxWidth: 760,
  weight: 400,
};

function parseStoredHeroH1TypeDials() {
  const storedDials = window.localStorage.getItem(HERO_H1_TYPE_DIALS_STORAGE_KEY);

  if (storedDials) {
    try {
      const parsed = JSON.parse(storedDials) as Partial<HeroH1TypeDials>;
      return {
        ...HERO_H1_DEFAULT_TYPE_DIALS,
        ...Object.fromEntries(
          Object.entries(parsed).filter(([, value]) => Number.isFinite(value)),
        ),
      };
    } catch {
      return HERO_H1_DEFAULT_TYPE_DIALS;
    }
  }

  const storedTracking = window.localStorage.getItem(HERO_H1_TRACKING_STORAGE_KEY);
  if (storedTracking) {
    const parsedTracking = Number(storedTracking);
    if (Number.isFinite(parsedTracking)) {
      return {
        ...HERO_H1_DEFAULT_TYPE_DIALS,
        tracking: parsedTracking,
      };
    }
  }

  return HERO_H1_DEFAULT_TYPE_DIALS;
}

function parseStoredHeroSubtextTypeDials() {
  const storedDials = window.localStorage.getItem(HERO_SUBTEXT_TYPE_DIALS_STORAGE_KEY);

  if (!storedDials) {
    return HERO_SUBTEXT_DEFAULT_TYPE_DIALS;
  }

  try {
    const parsed = JSON.parse(storedDials) as Partial<HeroSubtextTypeDials>;
    return {
      ...HERO_SUBTEXT_DEFAULT_TYPE_DIALS,
      ...Object.fromEntries(
        Object.entries(parsed).filter(([, value]) => Number.isFinite(value)),
      ),
    };
  } catch {
    return HERO_SUBTEXT_DEFAULT_TYPE_DIALS;
  }
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z" />
    </svg>
  );
}

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

function getProjectImage(project: (typeof allWork)[number]) {
  return project.homepageImage ?? project.image;
}

export default function Home() {
  const [fontsReady, setFontsReady] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [tuneMode, setTuneMode] = useState(false);
  const [heroH1TypeDials, setHeroH1TypeDials] = useState<HeroH1TypeDials>(HERO_H1_DEFAULT_TYPE_DIALS);
  const [heroSubtextTypeDials, setHeroSubtextTypeDials] = useState<HeroSubtextTypeDials>(HERO_SUBTEXT_DEFAULT_TYPE_DIALS);
  const heroPortraitRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    document.fonts.ready
      .then(() => new Promise((r) => setTimeout(r, 140)))
      .then(() => setFontsReady(true));

    const tuneModeTimer = window.setTimeout(() => {
      setTuneMode(
        process.env.NODE_ENV === "development" &&
          new URLSearchParams(window.location.search).get("tune") === "1",
      );

      setHeroH1TypeDials(parseStoredHeroH1TypeDials());
      setHeroSubtextTypeDials(parseStoredHeroSubtextTypeDials());
    }, 0);

    return () => window.clearTimeout(tuneModeTimer);
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

  const updateHeroH1TypeDial = (key: keyof HeroH1TypeDials, value: number) => {
    setHeroH1TypeDials((current) => {
      const next = { ...current, [key]: value };
      window.localStorage.setItem(HERO_H1_TYPE_DIALS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetHeroH1TypeDials = () => {
    setHeroH1TypeDials(HERO_H1_DEFAULT_TYPE_DIALS);
    window.localStorage.removeItem(HERO_H1_TYPE_DIALS_STORAGE_KEY);
    window.localStorage.removeItem(HERO_H1_TRACKING_STORAGE_KEY);
  };

  const updateHeroSubtextTypeDial = (key: keyof HeroSubtextTypeDials, value: number) => {
    setHeroSubtextTypeDials((current) => {
      const next = { ...current, [key]: value };
      window.localStorage.setItem(HERO_SUBTEXT_TYPE_DIALS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetHeroSubtextTypeDials = () => {
    setHeroSubtextTypeDials(HERO_SUBTEXT_DEFAULT_TYPE_DIALS);
    window.localStorage.removeItem(HERO_SUBTEXT_TYPE_DIALS_STORAGE_KEY);
  };

  return (
    <main
      className={`home-page min-h-screen text-white ${fontsReady ? "sequence-ready" : ""}`}
      style={
        {
          "--home-hero-subtext-tracking": `${heroSubtextTypeDials.tracking}em`,
          "--home-hero-subtext-line": heroSubtextTypeDials.lineHeight,
          "--home-hero-subtext-size": `${heroSubtextTypeDials.size}px`,
          "--home-hero-subtext-max-width": `${heroSubtextTypeDials.maxWidth}px`,
          "--home-hero-subtext-weight": heroSubtextTypeDials.weight,
        } as CSSProperties
      }
    >
      <div className="home-page-shell">
        <SiteNav />

        {tuneMode ? (
          <div className="home-type-tune-panels font-sans-preview" role="region" aria-label="Hero typography tuning controls">
            <div className="tune-panel home-hero-tune-panel">
              <div className="home-hero-tune-header">
                <span>H1</span>
                <button type="button" onClick={resetHeroH1TypeDials}>Reset</button>
              </div>
              <label>
                <span>Tracking</span>
                <input type="range" min="-0.08" max="0.02" step="0.001" value={heroH1TypeDials.tracking} onChange={(event) => updateHeroH1TypeDial("tracking", Number(event.currentTarget.value))} />
                <span>{heroH1TypeDials.tracking.toFixed(3)}em</span>
              </label>
              <label>
                <span>Line height</span>
                <input type="range" min="0.86" max="1.12" step="0.005" value={heroH1TypeDials.lineHeight} onChange={(event) => updateHeroH1TypeDial("lineHeight", Number(event.currentTarget.value))} />
                <span>{heroH1TypeDials.lineHeight.toFixed(3)}</span>
              </label>
              <label>
                <span>Min size</span>
                <input type="range" min="44" max="92" step="1" value={heroH1TypeDials.minSize} onChange={(event) => updateHeroH1TypeDial("minSize", Number(event.currentTarget.value))} />
                <span>{heroH1TypeDials.minSize}px</span>
              </label>
              <label>
                <span>Fluid size</span>
                <input type="range" min="5.5" max="10" step="0.1" value={heroH1TypeDials.viewportSize} onChange={(event) => updateHeroH1TypeDial("viewportSize", Number(event.currentTarget.value))} />
                <span>{heroH1TypeDials.viewportSize.toFixed(1)}vw</span>
              </label>
              <label>
                <span>Max size</span>
                <input type="range" min="108" max="188" step="1" value={heroH1TypeDials.maxSize} onChange={(event) => updateHeroH1TypeDial("maxSize", Number(event.currentTarget.value))} />
                <span>{heroH1TypeDials.maxSize}px</span>
              </label>
              <label>
                <span>Measure</span>
                <input type="range" min="820" max="1720" step="10" value={heroH1TypeDials.maxWidth} onChange={(event) => updateHeroH1TypeDial("maxWidth", Number(event.currentTarget.value))} />
                <span>{heroH1TypeDials.maxWidth}px</span>
              </label>
              <label>
                <span>Weight</span>
                <input type="range" min="400" max="700" step="25" value={heroH1TypeDials.weight} onChange={(event) => updateHeroH1TypeDial("weight", Number(event.currentTarget.value))} />
                <span>{heroH1TypeDials.weight}</span>
              </label>
            </div>
            <div className="tune-panel home-hero-tune-panel">
              <div className="home-hero-tune-header">
                <span>Support text / footer</span>
                <button type="button" onClick={resetHeroSubtextTypeDials}>Reset</button>
              </div>
              <label>
                <span>Tracking</span>
                <input type="range" min="-0.04" max="0.04" step="0.001" value={heroSubtextTypeDials.tracking} onChange={(event) => updateHeroSubtextTypeDial("tracking", Number(event.currentTarget.value))} />
                <span>{heroSubtextTypeDials.tracking.toFixed(3)}em</span>
              </label>
              <label>
                <span>Line height</span>
                <input type="range" min="1" max="1.42" step="0.005" value={heroSubtextTypeDials.lineHeight} onChange={(event) => updateHeroSubtextTypeDial("lineHeight", Number(event.currentTarget.value))} />
                <span>{heroSubtextTypeDials.lineHeight.toFixed(3)}</span>
              </label>
              <label>
                <span>Size</span>
                <input type="range" min="20" max="44" step="1" value={heroSubtextTypeDials.size} onChange={(event) => updateHeroSubtextTypeDial("size", Number(event.currentTarget.value))} />
                <span>{heroSubtextTypeDials.size}px</span>
              </label>
              <label>
                <span>Measure</span>
                <input type="range" min="620" max="1280" step="10" value={heroSubtextTypeDials.maxWidth} onChange={(event) => updateHeroSubtextTypeDial("maxWidth", Number(event.currentTarget.value))} />
                <span>{heroSubtextTypeDials.maxWidth}px</span>
              </label>
              <label>
                <span>Weight</span>
                <input type="range" min="300" max="600" step="25" value={heroSubtextTypeDials.weight} onChange={(event) => updateHeroSubtextTypeDial("weight", Number(event.currentTarget.value))} />
                <span>{heroSubtextTypeDials.weight}</span>
              </label>
            </div>
          </div>
        ) : null}

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
                "--home-hero-h1-tracking": `${heroH1TypeDials.tracking}em`,
                "--home-hero-h1-line": heroH1TypeDials.lineHeight,
                "--home-hero-h1-min-size": `${heroH1TypeDials.minSize}px`,
                "--home-hero-h1-vw-size": `${heroH1TypeDials.viewportSize}vw`,
                "--home-hero-h1-max-size": `${heroH1TypeDials.maxSize}px`,
                "--home-hero-h1-max-width": `${heroH1TypeDials.maxWidth}px`,
                "--home-hero-h1-weight": heroH1TypeDials.weight,
              } as CSSProperties
            }
          >
            In pursuit of making things well.
          </h1>
          <figure
            className={`home-hero-portrait ${fontsReady ? "animate-reveal" : "opacity-0"}`}
            aria-hidden="true"
          >
            <span ref={heroPortraitRef} className="home-hero-portrait-parallax">
              <Image
                src="/home-hero-portrait-mono.jpg"
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
            Graham Bunt is a Product Designer imagining possibilities, moving teams forward, and pouring care and intention into the craft.
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
            {homeFeaturedProjects.map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`} className="case-study-next-up-card home-featured-work-card">
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
            <p className="home-section-label">Get in touch</p>
            <div className="home-contact-copy-stack">
              <WavingHandIcon />
              <p className="home-contact-copy">
                {"I'd love to hear from you—always excited to chat, collaborate on ideas, and discuss opportunities."}
              </p>
              <button
                type="button"
                className="nav-item-pill home-copy-email-button"
                onClick={copyEmail}
                aria-live="polite"
              >
                {copiedEmail ? <CheckIcon /> : <CopyIcon />}
                {copiedEmail ? "Copied" : HOME_EMAIL}
              </button>
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
