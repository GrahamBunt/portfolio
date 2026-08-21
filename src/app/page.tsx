"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectMeta } from "@/components/ProjectMeta";
import { SiteNav } from "@/components/SiteNav";
import { allWork } from "@/content/work";
import { preventTextOrphans } from "@/lib/typography";

const featuredHomeProjectSlugs = ["smartsheet-reports", "resource-management-integration"];
const homeFeaturedProjects = featuredHomeProjectSlugs
  .map((slug) => allWork.find((project) => project.slug === slug))
  .filter((project): project is (typeof allWork)[number] => Boolean(project));

const HOME_EMAIL = "gtbunt@gmail.com";
const HERO_DESCRIPTORS = [
  "AI Enthusiast",
  "Girl Dad x2",
  "Land-locked Surfer",
  "Salt Lake City, Utah",
];
const HERO_DESCRIPTOR_CHAR_STEP_MS = 14;
const HERO_DESCRIPTOR_SLOT_SECONDS = 2.5;

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

function ElbowArrowIcon() {
  return (
    <svg className="home-hero-descriptor-arrow" viewBox="0 0 28 18" fill="none" aria-hidden="true" focusable="false">
      <path d="M3 2V11H22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M18 7L22 11L18 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

function getProjectImage(project: (typeof allWork)[number]) {
  return project.homepageImage ?? project.image;
}

function HeroDescriptorCycle() {
  return (
    <span className="home-hero-descriptor-cycle" aria-hidden="true">
      {HERO_DESCRIPTORS.map((descriptor, wordIndex) => (
        <span
          key={descriptor}
          className="home-hero-descriptor-word"
          style={{ "--word-delay": `${wordIndex * HERO_DESCRIPTOR_SLOT_SECONDS}s` } as CSSProperties}
        >
          {Array.from(descriptor).map((character, characterIndex) => (
            <span
              key={`${descriptor}-${characterIndex}`}
              className={`home-hero-descriptor-char ${character === " " ? "is-space" : ""}`}
              style={{ "--char-delay": `${characterIndex * HERO_DESCRIPTOR_CHAR_STEP_MS}ms` } as CSSProperties}
            >
              {character === " " ? "\u00A0" : character}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const [fontsReady, setFontsReady] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

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
    <main className={`home-page min-h-screen text-white ${fontsReady ? "sequence-ready" : ""}`}>
      <div className="home-page-shell">
        <SiteNav />

        <section
          data-section="intro"
          className="home-hero-v2"
          aria-labelledby="home-identity-title"
        >
          <p
            className={`home-hero-meta ${fontsReady ? "animate-reveal" : "opacity-0"}`}
            aria-label={`Product Designer, ${HERO_DESCRIPTORS.join(", ")}`}
          >
            <span className="home-hero-meta-fixed">Product Designer</span>
            <span className="home-hero-descriptor-support">
              <ElbowArrowIcon />
              <HeroDescriptorCycle />
            </span>
          </p>
          <h1
            id="home-identity-title"
            className={`home-hero-name ${fontsReady ? "animate-reveal" : "opacity-0"}`}
          >
            Graham Bunt
          </h1>
          <p
            className={`home-hero-value ${fontsReady ? "animate-reveal" : "opacity-0"}`}
          >
            I work across the full spectrum of product design, from shaping product direction to designing interfaces with intent and driving quality through delivery.
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
          <p className="home-section-label">Recent work</p>
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
