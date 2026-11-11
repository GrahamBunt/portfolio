"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CubbyProjectMedia } from "@/components/CubbyProjectMedia";
import { HomeProjectImage } from "@/components/HomeProjectImage";
import { ProjectVideo } from "@/components/ProjectVideo";
import { EmailCopyControl } from "@/components/EmailCopyControl";
import { ProjectMeta } from "@/components/ProjectMeta";
import { SiteNav } from "@/components/SiteNav";
import { publishedWork } from "@/content/work";
import { preventTextOrphans } from "@/lib/typography";
import type { HeroDescriptionTypography } from "@/components/HeroTypographyControls";

const featuredHomeProjectSlugs = ["paper-trades", "smartsheet-reports", "cubby", "resource-management-integration", "metlife-mexico"];
const homeFeaturedProjects = featuredHomeProjectSlugs
  .map((slug) => publishedWork.find((project) => project.slug === slug))
  .filter((project): project is (typeof publishedWork)[number] => Boolean(project));

const HOME_SUPPORT_TEXT =
  "Graham Bunt is a product designer making sense of complex systems, shaping product direction, and bringing ideas to life through design and code.";
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
  minSize: 54,
  viewportSize: 7.6,
  maxSize: 126,
  maxWidth: 1460,
  weight: 600,
};

const HeroTypographyControls = process.env.NODE_ENV === "development"
  ? dynamic(() => import("@/components/HeroTypographyControls"), { ssr: false })
  : null;

const HERO_TYPOGRAPHY_DEFAULTS = {
  size: 96,
  measure: 88,
  lineHeight: 0.935,
  position: { x: 0, y: 0 },
};

const HERO_SUBTEXT_DEFAULT_TYPE_DIALS: HeroSubtextTypeDials = {
  tracking: -0.014,
  lineHeight: 1.12,
  size: 33,
  maxWidth: 690,
  weight: 400,
};

const HERO_DESCRIPTION_DEFAULTS: HeroDescriptionTypography = {
  measure: HERO_SUBTEXT_DEFAULT_TYPE_DIALS.maxWidth,
  size: 100,
  lineHeight: HERO_SUBTEXT_DEFAULT_TYPE_DIALS.lineHeight,
  tracking: HERO_SUBTEXT_DEFAULT_TYPE_DIALS.tracking,
  fullWidth: false,
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z" />
    </svg>
  );
}

function getProjectImage(project: (typeof publishedWork)[number]) {
  return project.homepageImage ?? project.image;
}

export default function Home() {
  const router = useRouter();
  const [heroTypography, setHeroTypography] = useState(HERO_TYPOGRAPHY_DEFAULTS);
  const [heroDescription, setHeroDescription] = useState(HERO_DESCRIPTION_DEFAULTS);
  const [fontsReady, setFontsReady] = useState(false);
  const heroPortraitRef = useRef<HTMLSpanElement>(null);
  // Move both text blocks by the same responsive offset. The reveal animation
  // owns transform, so use translate to keep its motion independent.
  const heroTextTranslate = `${heroTypography.position?.x ?? 0}vw ${-(heroTypography.position?.y ?? 0)}vh`;

  const navigateFromCubbyCard = (href: string, event: MouseEvent<HTMLElement>) => {
    const clickedInteractiveElement = event.nativeEvent.composedPath().some((node) => {
      if (!(node instanceof Element)) return false;

      return node.matches("a, button, cubby-cozy-detailed");
    });

    if (!clickedInteractiveElement) {
      router.push(href);
    }
  };

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

  return (
    <main
      className={`home-page min-h-screen text-[var(--text-primary)] ${fontsReady ? "sequence-ready" : ""}`}
      style={
        {
          "--home-hero-subtext-tracking": `${heroDescription.tracking}em`,
          "--home-hero-subtext-line": heroDescription.lineHeight,
          "--home-hero-subtext-size": `${HERO_SUBTEXT_DEFAULT_TYPE_DIALS.size}px`,
          "--home-hero-subtext-max-width": `${HERO_SUBTEXT_DEFAULT_TYPE_DIALS.maxWidth}px`,
          "--home-hero-subtext-weight": HERO_SUBTEXT_DEFAULT_TYPE_DIALS.weight,
        } as CSSProperties
      }
    >
      {HeroTypographyControls ? (
        <HeroTypographyControls
          defaults={HERO_TYPOGRAPHY_DEFAULTS}
          onChange={setHeroTypography}
          descriptionDefaults={HERO_DESCRIPTION_DEFAULTS}
          onDescriptionChange={setHeroDescription}
        />
      ) : null}
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
                translate: heroTextTranslate,
                "--home-hero-h1-tracking": `${HERO_H1_DEFAULT_TYPE_DIALS.tracking}em`,
                "--home-hero-h1-line": heroTypography.lineHeight,
                "--home-hero-h1-size-scale": heroTypography.size / 100,
                "--home-hero-h1-mobile-line": 0.98 * heroTypography.lineHeight / HERO_H1_DEFAULT_TYPE_DIALS.lineHeight,
                "--home-hero-h1-min-size": `${HERO_H1_DEFAULT_TYPE_DIALS.minSize}px`,
                "--home-hero-h1-vw-size": `${HERO_H1_DEFAULT_TYPE_DIALS.viewportSize}vw`,
                "--home-hero-h1-max-size": `${HERO_H1_DEFAULT_TYPE_DIALS.maxSize}px`,
                "--home-hero-h1-max-width": `${heroTypography.measure}%`,
                "--home-hero-h1-weight": HERO_H1_DEFAULT_TYPE_DIALS.weight,
              } as CSSProperties
            }
          >
            <span className="home-hero-line home-hero-line-top">
              In pursuit of
            </span>{" "}
            <span className="home-hero-line home-hero-line-bottom">
              shipping products customers love.
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
                sizes="(max-width: 1024px) clamp(180px, 48vw, 300px), (max-width: 1545px) 22vw, 340px"
              />
            </span>
          </figure>
          <p
            className={`home-hero-value ${fontsReady ? "animate-reveal" : "opacity-0"}`}
            style={{
              translate: heroTextTranslate,
              gridColumn: heroDescription.fullWidth ? "1 / -1" : undefined,
              marginLeft: heroDescription.fullWidth ? 0 : undefined,
              width: `min(${heroDescription.measure}px, calc(100% - ${heroDescription.fullWidth ? "0px" : "var(--home-marker-offset)"}))`,
              maxWidth: "none",
              fontSize: `calc(var(--home-support-fluid-size) * ${heroDescription.size / 100})`,
            }}
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
            {homeFeaturedProjects.map((project, index) => {
              const href = `/work/${project.slug}`;
              const cardClassName = `case-study-next-up-card home-featured-work-card is-${project.slug}${project.isInProgress ? " is-in-progress" : ""}`;
              const cardCopy = (
                <div className="case-study-next-up-copy">
                  <div className="case-study-next-up-title-row">
                    <h3>{preventTextOrphans(project.title)}</h3>
                    {project.isInProgress || project.isComingSoon ? (
                      <span className="home-project-status">Work in progress</span>
                    ) : null}
                    {!project.isComingSoon ? (
                      <span className="case-study-next-up-arrow">
                        <ArrowIcon />
                      </span>
                    ) : null}
                  </div>
                  <p className="home-featured-work-summary font-sans-preview">{project.summary}</p>
                  {project.cardMeta ? (
                    <p className="case-study-next-up-meta font-sans-preview">
                      <ProjectMeta value={project.cardMeta} />
                    </p>
                  ) : null}
                </div>
              );

              if (project.isComingSoon) {
                return (
                  <article key={project.slug} className={`${cardClassName} is-disabled`}>
                    <span className="home-featured-work-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {project.homepageImage ? (
                      <figure className="case-study-next-up-media">
                        <HomeProjectImage slug={project.slug} fallbackSrc={project.homepageImage} />
                      </figure>
                    ) : null}
                    {cardCopy}
                  </article>
                );
              }

              if (project.slug === "cubby") {
                return (
                  <article key={project.slug} className={cardClassName} onClick={(event) => navigateFromCubbyCard(href, event)}>
                    <span className="home-featured-work-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <CubbyProjectMedia showMenuBar wallpaper={{ src: "/work/cubby/wallpapers/alpine-stillness.webp", zoom: 125 }} onMediaNavigate={() => router.push(href)} />
                    <Link href={href} className="cubby-project-copy-link" aria-label="View Cubby project">
                      {cardCopy}
                    </Link>
                  </article>
                );
              }

              return (
                <Link key={project.slug} href={href} className={cardClassName}>
                  <span className="home-featured-work-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <figure className="case-study-next-up-media">
                    {project.homepageVideo ? (
                      <ProjectVideo src={project.homepageVideo} poster={getProjectImage(project)} label={`${project.title} preview`} decorative />
                    ) : (
                      <HomeProjectImage slug={project.slug} fallbackSrc={getProjectImage(project)} />
                    )}
                  </figure>
                  {cardCopy}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="home-contact-band" data-nosnippet>
          <div className="home-contact-content">
            <div className="home-contact-copy-stack">
              <p className="home-contact-copy">
                {"I'd love to hear from you—let's chat, collaborate on ideas, or discuss opportunities."}
              </p>
              <EmailCopyControl />
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
