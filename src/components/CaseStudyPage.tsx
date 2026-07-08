/* eslint-disable @next/next/no-img-element */
"use client";

import type { CSSProperties, RefObject, SyntheticEvent } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ProjectListSection } from "@/components/ProjectListSection";
import { ProjectMeta } from "@/components/ProjectMeta";
import { ScrollRevealText } from "@/components/ScrollRevealText";
import { SiteNav } from "@/components/SiteNav";
import type { CaseStudyBlock, CaseStudyBlockWidth, CaseStudyOverview, WorkItem } from "@/content/work";

type CaseStudy = WorkItem;

type CaseStudyPageProps = {
  project: CaseStudy;
  related: WorkItem[];
};

type ProblemCardDials = {
  padding: number;
  titleWeight: number;
  subtitleWeight: number;
};

type ProblemCardDialStyle = CSSProperties & {
  "--problem-card-padding": string;
  "--problem-title-weight": number;
  "--problem-subtitle-weight": number;
};

const defaultProblemCardDials: ProblemCardDials = {
  padding: 42,
  titleWeight: 400,
  subtitleWeight: 500,
};

const overviewCopyStyle: CSSProperties = {
  color: "#ffffff",
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontSize: "clamp(25px, 2.25vw, 34px)",
  fontWeight: 400,
  lineHeight: 1.24,
  letterSpacing: "-0.01em",
  margin: 0,
};

const overviewLeadCopyStyle: CSSProperties = {
  ...overviewCopyStyle,
  fontSize: "clamp(32px, 3.55vw, 54px)",
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  textWrap: "balance",
};

const overviewSupportingCopyStyle: CSSProperties = {
  ...overviewCopyStyle,
  color: "rgba(255, 255, 255, 0.65)",
};

const hiddenMetadataLabelStyle: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
};

const overviewMetaPrimaryStyle: CSSProperties = {
  color: "#ffffff",
  fontSize: 20,
  fontWeight: 500,
  lineHeight: "28px",
  margin: 0,
};

const overviewMetaSecondaryStyle: CSSProperties = {
  color: "rgba(255, 255, 255, 0.65)",
  fontSize: 18,
  fontWeight: 500,
  lineHeight: "28px",
  margin: 0,
};

const narrativeParagraphSpeeds = [1, 1.25];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function smoothstep(value: number) {
  const clamped = clamp(value, 0, 1);
  return clamped * clamped * (3 - 2 * clamped);
}

function easeOutCubic(value: number) {
  const clamped = clamp(value, 0, 1);
  return 1 - (1 - clamped) ** 3;
}

function getCaseStudyPreloadImageSrcs(project: CaseStudy) {
  const srcs = new Set<string>();

  project.blocks?.forEach((block) => {
    if (block.type === "showcase") {
      block.items.forEach((item) => srcs.add(item.src));
    }

    if (block.type === "media" && block.src) {
      srcs.add(block.src);
    }

    if (block.type === "editorialSplit" && block.media) {
      const mediaItems = Array.isArray(block.media) ? block.media : [block.media];
      mediaItems.forEach((item) => {
        if (item.src) {
          srcs.add(item.src);
        }
      });
    }
  });

  return Array.from(srcs);
}

const staticOverviewCopyWrapStyle: CSSProperties = {
  display: "flex",
  width: "100%",
  flexDirection: "column",
  gap: 24,
};

const stepFlowStyle: CSSProperties = {
  display: "flex",
  width: "100%",
  maxWidth: 1680,
  flexDirection: "column",
  gap: 40,
};

const stepFlowGridStyle: CSSProperties = {
  display: "grid",
  width: "100%",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
  gap: 30,
};

const stepCardStyle: CSSProperties = {
  display: "flex",
  minWidth: 0,
  flexDirection: "column",
  gap: 20,
};

const stepMediaStyle: CSSProperties = {
  display: "flex",
  width: "100%",
  aspectRatio: "5 / 4",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  borderRadius: 10,
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04)), #171717",
  boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.14)",
  margin: 0,
};

const stepCopyStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "28px minmax(0, 1fr)",
  columnGap: 12,
  rowGap: 12,
  alignItems: "center",
};

const stepNumberStyle: CSSProperties = {
  display: "inline-flex",
  width: 28,
  height: 28,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 999,
  background: "#ffffff",
  color: "#000000",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: "28px",
};

const stepFlowHeaderStyle: CSSProperties = {
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  textAlign: "center",
};

const stepFlowTitleStyle: CSSProperties = {
  color: "#ffffff",
  fontFamily: "var(--font-instrument-serif), serif",
  fontSize: "clamp(38px, 4.4vw, 64px)",
  fontWeight: 400,
  lineHeight: 1,
  margin: 0,
};

const sectionLabelStyle: CSSProperties = {
  color: "rgba(255, 255, 255, 0.36)",
  fontSize: 16,
  fontWeight: 600,
  letterSpacing: "0.12em",
  lineHeight: "23px",
  margin: 0,
  textShadow: "0 -1px 0 rgba(255, 255, 255, 0.08), 0 1px 0 rgba(0, 0, 0, 0.95)",
};

const stepTitleStyle: CSSProperties = {
  color: "#ffffff",
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontSize: 20,
  fontWeight: 500,
  lineHeight: "28px",
  margin: 0,
};

const stepDescriptionStyle: CSSProperties = {
  color: "rgba(255, 255, 255, 0.65)",
  fontSize: 18,
  fontWeight: 500,
  lineHeight: "28px",
  margin: 0,
};

function getBlockWidthClass(width: CaseStudyBlockWidth = "content") {
  return `case-study-block-${width}`;
}

function CaseStudyMediaBlock({
  label,
  src,
  videoSrc,
  embedSrc,
  caption,
  aspectRatio,
  bentoItems,
  fill = false,
  width = "content",
}: {
  label: string;
  src?: string;
  videoSrc?: string;
  embedSrc?: string;
  caption?: string;
  aspectRatio?: number;
  bentoItems?: {
    label: string;
    src?: string;
    fit?: "cover" | "contain";
    span?: "large" | "small";
  }[];
  fill?: boolean;
  width?: CaseStudyBlockWidth;
}) {
  const isVideo = Boolean(videoSrc || embedSrc);

  return (
    <figure
      className={`case-study-placeholder case-study-block ${getBlockWidthClass(width)} ${bentoItems?.length ? "is-bento" : ""} ${isVideo ? "is-video" : ""}`}
      style={fill || isVideo ? undefined : { aspectRatio: aspectRatio ?? 4 / 3 }}
    >
      {bentoItems?.length ? (
        <div className="case-study-bento-placeholder" aria-label={label}>
          {bentoItems.map((item) => (
            <div
              key={item.src ?? item.label}
              className={`case-study-bento-tile ${item.span === "large" ? "is-large" : ""} ${item.src ? "has-image" : ""} ${item.fit === "contain" ? "is-contain" : ""}`}
            >
              {item.src ? <img src={item.src} alt="" /> : <span className="case-study-bento-tile-chip font-inter-display">{item.label}</span>}
            </div>
          ))}
        </div>
      ) : videoSrc || embedSrc ? (
        embedSrc ? (
          <iframe
            src={embedSrc}
            title={label}
            style={{ aspectRatio: aspectRatio ?? 16 / 9 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="case-study-video-frame" style={{ aspectRatio: aspectRatio ?? 16 / 9 }}>
            <video controls playsInline preload="metadata" aria-label={label}>
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        )
      ) : src ? (
        <img src={src} alt="" />
      ) : (
        <span className="font-inter-display">{label}</span>
      )}
      {caption && !isVideo ? <figcaption className="font-inter-display">{caption}</figcaption> : null}
    </figure>
  );
}

function CaseStudyViewGridBlock({ block }: { block: Extract<CaseStudyBlock, { type: "viewGrid" }> }) {
  return (
    <section className={`case-study-view-grid case-study-block ${getBlockWidthClass(block.width)}`} aria-label="Report views">
      {block.items.map((item) => (
        <article key={item.kind} className="case-study-view-card">
          <div className="case-study-view-card-heading">
            <span className="case-study-view-card-icon">
              <img src={item.icon} alt="" aria-hidden="true" />
            </span>
            <h2>{item.title}</h2>
          </div>
        </article>
      ))}
    </section>
  );
}

function CaseStudyComparisonBlock({ block }: { block: Extract<CaseStudyBlock, { type: "comparison" }> }) {
  return (
    <section
      className={`case-study-comparison case-study-block ${getBlockWidthClass(block.width ?? "full")}`}
      aria-label="Report experience comparison"
    >
      {block.items.map((item) => (
        <figure key={item.title} className={`case-study-comparison-panel ${item.src ? "has-image" : ""}`}>
          <div className="case-study-comparison-image-frame">
            {item.src ? <img src={item.src} alt="" /> : <span className="font-inter-display">{item.label}</span>}
            {item.watermark ? (
              <span className="case-study-comparison-watermark" aria-hidden="true">
                {item.title}
              </span>
            ) : null}
          </div>
        </figure>
      ))}
    </section>
  );
}

function CaseStudyProblemCardsBlock({ block }: { block: Extract<CaseStudyBlock, { type: "problemCards" }> }) {
  const dialStyle: ProblemCardDialStyle = {
    "--problem-card-padding": `${defaultProblemCardDials.padding}px`,
    "--problem-title-weight": defaultProblemCardDials.titleWeight,
    "--problem-subtitle-weight": defaultProblemCardDials.subtitleWeight,
  };

  return (
    <section
      className={`case-study-problem-section case-study-block ${getBlockWidthClass(block.width ?? "full")}`}
      aria-label={block.label}
      style={dialStyle}
    >
      <header className="case-study-problem-header">
        <p className="font-inter-display" style={sectionLabelStyle}>{block.label}</p>
      </header>
      <div className="case-study-problem-grid">
        {block.items.map((item) => (
          <article key={item.title} className={`case-study-problem-card is-${item.tone} ${item.image ? "has-image" : ""}`}>
            {item.image ? (
              <div className="case-study-problem-image" aria-hidden="true">
                <img src={item.image} alt="" loading="eager" decoding="async" fetchPriority="high" />
              </div>
            ) : null}
            <div className="case-study-problem-content">
              <div className="case-study-problem-heading">
                {!item.image ? (
                  <div className={`case-study-problem-avatar is-${item.tone}`} aria-hidden="true">
                    {item.avatar ? <img src={item.avatar} alt="" /> : item.audience.slice(0, 1)}
                  </div>
                ) : null}
                <p className="case-study-problem-audience font-inter-display">{item.audience}</p>
              </div>
              <h2>{item.title}</h2>
              <p className="case-study-problem-body font-inter-display">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CaseStudySpecSamplesBlock({ block }: { block: Extract<CaseStudyBlock, { type: "specSamples" }> }) {
  return (
    <section
      className={`case-study-spec-samples case-study-block ${getBlockWidthClass(block.width ?? "full")}`}
      aria-label={block.label}
    >
      <header className="case-study-spec-samples-header">
        <p className="font-inter-display" style={sectionLabelStyle}>{block.label}</p>
      </header>
      <div className="case-study-spec-samples-grid">
        {block.items.map((item) => (
          <a key={item.title} className="case-study-spec-sample-card" href={item.href} target="_blank" rel="noreferrer">
            <div className={`case-study-spec-sample-media is-${item.kind} ${item.image || item.video ? "has-image" : ""}`} aria-hidden="true">
              {item.video ? (
                <video src={item.video} autoPlay loop muted playsInline poster={item.image} />
              ) : item.image ? (
                <img src={item.image} alt="" />
              ) : (
                <div className="case-study-spec-sample-window">
                  <div className="case-study-spec-sample-window-bar">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="case-study-spec-sample-canvas">
                    {item.kind === "prototype" ? (
                      <>
                        <div className="case-study-spec-prototype-panel" />
                        <div className="case-study-spec-prototype-control" />
                      </>
                    ) : (
                      <>
                        <div className="case-study-spec-frame is-large" />
                        <div className="case-study-spec-frame" />
                        <div className="case-study-spec-frame is-tall" />
                        <div className="case-study-spec-frame" />
                        <div className="case-study-spec-frame is-wide" />
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="case-study-spec-sample-title-row">
              <div>
                <h3>{item.title}</h3>
                <p className="font-inter-display">{item.description}</p>
              </div>
              <span className="case-study-spec-sample-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M7.05 17.66a1 1 0 0 1 0-1.42l8.53-8.53H9.5a1 1 0 1 1 0-2h8.49a1 1 0 0 1 1 1v8.49a1 1 0 1 1-2 0V9.12l-8.53 8.54a1 1 0 0 1-1.41 0Z" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function CaseStudyImpactBlock({ block }: { block: Extract<CaseStudyBlock, { type: "impact" }> }) {
  const outcomeCountClass = block.outcomes.length === 4 ? "is-four-up" : "";

  return (
    <section className={`case-study-impact case-study-block ${getBlockWidthClass(block.width ?? "full")}`}>
      <div className="case-study-impact-heading">
        <div className="case-study-impact-label">
          <p className="font-inter-display">{block.label}</p>
        </div>
        <h2>{block.statement}</h2>
      </div>
      <div className={`case-study-impact-outcomes ${outcomeCountClass}`}>
        {block.outcomes.map((item) => (
          <article key={item.number}>
            <span className="font-inter-display">{item.number}</span>
            <div>
              <h3>{item.title}</h3>
              <p className="font-inter-display">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
      {block.footnote ? <p className="case-study-impact-footnote font-inter-display">{block.footnote}</p> : null}
    </section>
  );
}

function CaseStudyShowcaseBlock({ block }: { block: Extract<CaseStudyBlock, { type: "showcase" }> }) {
  const hasHeader = Boolean(block.label || block.title || block.body);

  return (
    <section className={`case-study-showcase case-study-block ${getBlockWidthClass(block.width ?? "full")}`}>
      {hasHeader ? (
        <header className="case-study-showcase-header">
          {block.label ? <p className="case-study-showcase-label font-inter-display">{block.label}</p> : null}
          <div>
            {block.title ? <h2>{block.title}</h2> : null}
            {block.body ? <p className="font-inter-display">{block.body}</p> : null}
          </div>
        </header>
      ) : null}
      <div className="case-study-showcase-grid">
        {block.items.map((item, index) => (
          <figure key={item.title} className={`case-study-showcase-item ${item.span === "half" ? "is-half" : "is-full"}`}>
            <figcaption>
              <h3>{item.title}</h3>
              <p className="font-inter-display">{item.description}</p>
            </figcaption>
            <div className="case-study-showcase-media">
              <img src={item.src} alt="" loading="eager" decoding="async" fetchPriority={index < 2 ? "high" : "auto"} />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}

function CaseStudyPresentationScrollerBlock({ block }: { block: Extract<CaseStudyBlock, { type: "presentationScroller" }> }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [motion, setMotion] = useState({
    shift: 0,
    firstSlideWidth: 1180,
  });

  useLayoutEffect(() => {
    let frame = 0;

    function measure() {
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track) {
        return;
      }

      const viewportWidth = window.innerWidth;
      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      const rawProgress = clamp(-rect.top / scrollableDistance, 0, 1);
      const scaleProgress = clamp(rawProgress / 0.22, 0, 1);
      const horizontalProgress = clamp((rawProgress - 0.18) / 0.82, 0, 1);
      const baseSlideWidth = Math.min(viewportWidth * 0.78, 1180);
      const firstSlideWidth = baseSlideWidth - baseSlideWidth * 0.36 * scaleProgress;
      const maxShift = Math.max(0, track.scrollWidth - viewportWidth + 40);

      setMotion({
        shift: maxShift * horizontalProgress,
        firstSlideWidth,
      });
    }

    function requestMeasure() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }

    requestMeasure();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
    };
  }, [block.slides.length]);

  const style = {
    "--presentation-scroll-height": `${Math.max(340, block.slides.length * 82)}vh`,
    "--presentation-shift": `${motion.shift * -1}px`,
    "--presentation-first-width": `${motion.firstSlideWidth}px`,
  } as CSSProperties;

  return (
    <section ref={sectionRef} className="case-study-presentation-scroll case-study-block case-study-block-full" style={style}>
      <div className="case-study-presentation-sticky">
        {block.label || block.title || block.body ? (
          <header className="case-study-presentation-header">
            {block.label ? <p className="case-study-showcase-label font-inter-display">{block.label}</p> : null}
            <div>
              {block.title ? <h2>{block.title}</h2> : null}
              {block.body ? <p className="font-inter-display">{block.body}</p> : null}
            </div>
          </header>
        ) : null}

        <div ref={trackRef} className="case-study-presentation-track">
          {block.slides.map((slide, index) => (
            <article key={`${slide.eyebrow ?? index}-${slide.title}`} className={`case-study-presentation-slide ${index === 0 ? "is-hero-slide" : ""}`}>
              {slide.src ? <img src={slide.src} alt="" /> : <div className="case-study-presentation-placeholder" aria-hidden="true" />}
              <div className="case-study-presentation-copy font-inter-display">
                {slide.eyebrow ? <span>{slide.eyebrow}</span> : null}
                <h3>{slide.title}</h3>
                {slide.description ? <p>{slide.description}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyDeckScroller({
  slides,
  imageRef,
  onHeroImageLoad,
  onHeroImageError,
}: {
  slides: NonNullable<WorkItem["deckSlides"]>;
  imageRef: RefObject<HTMLImageElement | null>;
  onHeroImageLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
  onHeroImageError: () => void;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const geometryRef = useRef<{
    viewportWidth: number;
    scrollableDistance: number;
    earlyActivationOffset: number;
    slideWidth: number;
    heroWidth: number;
    gap: number;
    targetFirstCenteredTransform: number;
  } | null>(null);

  useLayoutEffect(() => {
    let scrollFrame = 0;
    let resizeFrame = 0;

    function readGeometry() {
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track) {
        return;
      }

      const viewportWidth = window.innerWidth;
      const computedTrack = window.getComputedStyle(track);
      const gap = Number.parseFloat(computedTrack.columnGap || computedTrack.gap) || 0;
      const slideWidth = Math.min(viewportWidth * 0.76, 1180);
      const maxHeroWidth = Math.min(viewportWidth - 96, 1480);
      const heroWidth = Math.max(slideWidth, maxHeroWidth);

      geometryRef.current = {
        viewportWidth,
        scrollableDistance: Math.max(1, section.offsetHeight - window.innerHeight),
        earlyActivationOffset: Math.min(window.innerHeight * 0.9, 820),
        slideWidth,
        heroWidth,
        gap,
        targetFirstCenteredTransform: viewportWidth / 2 - slideWidth / 2,
      };
    }

    function measure() {
      const section = sectionRef.current;
      const geometry = geometryRef.current;

      if (!section || !geometry) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const progress = clamp(
        (geometry.earlyActivationOffset - rect.top) / (geometry.scrollableDistance + geometry.earlyActivationOffset),
        0,
        1,
      );
      const scaleProgress = easeOutCubic(progress / 0.27);
      const horizontalProgress = smoothstep((progress - 0.07) / 0.93);
      const firstSlideWidth = geometry.heroWidth - (geometry.heroWidth - geometry.slideWidth) * scaleProgress;
      const firstCenteredTransform = geometry.viewportWidth / 2 - firstSlideWidth / 2;
      const lastSlideCenter = slides.length > 1
        ? firstSlideWidth + geometry.gap + Math.max(0, slides.length - 2) * (geometry.slideWidth + geometry.gap) + geometry.slideWidth / 2
        : firstSlideWidth / 2;
      const lastCenteredTransform = geometry.viewportWidth / 2 - lastSlideCenter;
      const transform = firstCenteredTransform + (lastCenteredTransform - geometry.targetFirstCenteredTransform) * horizontalProgress;

      section.style.setProperty("--deck-track-transform", `${transform}px`);
      section.style.setProperty("--deck-first-width", `${firstSlideWidth}px`);
    }

    function requestMeasure() {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(measure);
    }

    function requestGeometryMeasure() {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        readGeometry();
        measure();
      });
    }

    readGeometry();
    measure();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestGeometryMeasure);

    return () => {
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestGeometryMeasure);
    };
  }, [slides.length]);

  useEffect(() => {
    const section = sectionRef.current;
    const timers: number[] = [];
    const idleCallbacks: number[] = [];
    const warmedImages: HTMLImageElement[] = [];
    const browserWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    let observer: IntersectionObserver | null = null;
    let remainingStarted = false;

    function schedule(callback: () => void, delay: number) {
      const timer = window.setTimeout(callback, delay);
      timers.push(timer);
    }

    function scheduleIdle(callback: () => void, timeout: number) {
      if (browserWindow.requestIdleCallback) {
        const handle = browserWindow.requestIdleCallback(callback, { timeout });
        idleCallbacks.push(handle);
        return;
      }

      schedule(callback, Math.min(timeout, 500));
    }

    function scheduleWarmImage(src: string, shouldDecode: boolean, delay: number, timeout: number, fetchPriority: "auto" | "low" = "auto") {
      schedule(() => {
        scheduleIdle(() => warmImage(src, shouldDecode, fetchPriority), timeout);
      }, delay);
    }

    function warmImage(src: string, shouldDecode = false, fetchPriority: "auto" | "low" = "auto") {
      const image = new window.Image();
      (image as HTMLImageElement & { fetchPriority?: "auto" | "low" }).fetchPriority = fetchPriority;
      image.decoding = "async";
      image.loading = "eager";
      image.src = src;
      warmedImages.push(image);

      if (shouldDecode) {
        image.decode?.().catch(() => undefined);
      }
    }

    schedule(() => {
      slides.slice(1, 4).forEach((slide, index) => {
        const src = slide.src;

        if (src) {
          scheduleWarmImage(src, true, index * 160, 900);
        }
      });
    }, 240);

    function warmRemainingSlides() {
      if (remainingStarted) {
        return;
      }

      remainingStarted = true;
      slides.slice(4).forEach((slide, index) => {
        const src = slide.src;

        if (src) {
          scheduleWarmImage(src, index < 2, index * 220, 1800 + index * 120, index < 2 ? "auto" : "low");
        }
      });
    }

    if (section && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            warmRemainingSlides();
            observer?.disconnect();
          }
        },
        { rootMargin: "1800px 0px" },
      );
      observer.observe(section);
    } else {
      schedule(warmRemainingSlides, 1200);
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      idleCallbacks.forEach((handle) => browserWindow.cancelIdleCallback?.(handle));
      warmedImages.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
      observer?.disconnect();
    };
  }, [slides]);

  const style = {
    "--deck-scroll-height": `${Math.max(620, slides.length * 142)}vh`,
  } as CSSProperties;

  if (!slides.length) {
    return null;
  }

  return (
    <section ref={sectionRef} className="case-study-deck-scroll" style={style} aria-label="American Modern slide deck">
      <div className="case-study-deck-sticky">
        <div ref={trackRef} className="case-study-deck-track">
          {slides.map((slide, index) => (
            <figure key={`${slide.title}-${index}`} className={`case-study-deck-slide ${index === 0 ? "is-hero-slide" : ""}`}>
              <div className="case-study-deck-slide-frame">
                {slide.src ? (
                  <img
                    ref={index === 0 ? imageRef : undefined}
                    src={slide.src}
                    alt=""
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index < 3 ? "high" : "auto"}
                    onLoad={index === 0 ? onHeroImageLoad : undefined}
                    onError={index === 0 ? onHeroImageError : undefined}
                  />
                ) : (
                  <div className="case-study-deck-placeholder" aria-hidden="true" />
                )}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudySpotlightBlock({ block }: { block: Extract<CaseStudyBlock, { type: "spotlight" }> }) {
  return (
    <section className="case-study-spotlight case-study-block" aria-labelledby="case-study-spotlight-title">
      <article className="case-study-text-section case-study-block case-study-block-content">
        <h2 id="case-study-spotlight-title">{block.title}</h2>
        <CaseStudySectionBody body={block.body} />
      </article>
      <CaseStudyMediaBlock
        label={block.media.label}
        src={block.media.src}
        videoSrc={block.media.videoSrc}
        embedSrc={block.media.embedSrc}
        caption={block.media.caption}
        aspectRatio={block.media.aspectRatio}
        width={block.media.width}
      />
    </section>
  );
}

function CaseStudyStepFlowBlock({ block }: { block: Extract<CaseStudyBlock, { type: "stepFlow" }> }) {
  const maxWidth = block.width === "content" ? 520 : block.width === "wide" ? 720 : 1680;

  return (
    <section
      className={`case-study-step-flow case-study-block ${getBlockWidthClass(block.width ?? "full")}`}
      style={{ ...stepFlowStyle, maxWidth }}
      aria-label="Core report definition steps"
    >
      {block.title || block.label ? (
        <header className="case-study-step-flow-header" style={stepFlowHeaderStyle}>
          {block.title ? <h2 style={stepFlowTitleStyle}>{block.title}</h2> : null}
          {block.label ? <p className="font-inter-display" style={sectionLabelStyle}>{block.label}</p> : null}
        </header>
      ) : null}
      <div className="case-study-step-flow-grid" style={stepFlowGridStyle}>
        {block.items.map((item, index) => (
          <article key={item.title} className="case-study-step-card" style={stepCardStyle}>
            <figure className="case-study-step-media" style={stepMediaStyle}>
              {item.image ? <img src={item.image} alt="" /> : <span className="font-inter-display">{item.label}</span>}
            </figure>
            <div
              className="case-study-step-copy"
              style={stepCopyStyle}
            >
              <span
                className="case-study-step-number font-inter-display"
                style={stepNumberStyle}
              >
                {index + 1}
              </span>
              <h2 style={stepTitleStyle}>{item.title}</h2>
              <p className="font-inter-display" style={{ ...stepDescriptionStyle, gridColumn: "1 / -1" }}>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CaseStudySectionBody({
  body,
  style,
  paragraphStyle,
}: {
  body: string[];
  style?: CSSProperties;
  paragraphStyle?: CSSProperties;
}) {
  return (
    <div className="case-study-section-body" style={style}>
      {body.map((paragraph) => (
        <p key={paragraph} className="font-inter-display" style={paragraphStyle}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function CaseStudyTextBlock({ block }: { block: Extract<CaseStudyBlock, { type: "text" }> }) {
  const isWideIntro = block.width === "full" && block.title;
  const textAlign = block.align === "center" ? "center" : undefined;
  const introRevealText = isWideIntro && block.title ? [block.title, ...block.body] : null;

  return (
    <article
      className={`case-study-text-section case-study-block ${getBlockWidthClass(block.width)} ${block.align === "center" ? "is-centered" : ""}`}
      style={block.align === "center" ? { alignItems: "center", textAlign } : undefined}
    >
      {block.eyebrow ? <p className="case-study-section-eyebrow font-inter-display">{block.eyebrow}</p> : null}
      {introRevealText ? (
        <div className="font-inter-display" style={{ ...staticOverviewCopyWrapStyle, maxWidth: 520, textAlign: "left" }}>
          {introRevealText.map((paragraph) => (
            <p key={paragraph} style={{ ...overviewCopyStyle, width: "100%", maxWidth: 520 }}>
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        <>
          {block.title ? <h2>{block.title}</h2> : null}
          <CaseStudySectionBody body={block.body} />
        </>
      )}
    </article>
  );
}

function CaseStudyEditorialIntroBlock({ block }: { block: Extract<CaseStudyBlock, { type: "editorialIntro" }> }) {
  return (
    <section className={`case-study-editorial-intro case-study-block ${getBlockWidthClass(block.width ?? "large")}`}>
      <h2>{block.title}</h2>
      <div className="case-study-editorial-intro-body">
        {block.body.map((paragraph) => (
          <p key={paragraph} className="font-inter-display">{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function CaseStudyEditorialArtifact({ artifact }: { artifact: NonNullable<Extract<CaseStudyBlock, { type: "editorialSplit" }>["artifact"]> }) {
  if (artifact.type === "metrics") {
    return (
      <div className="case-study-editorial-artifact is-metrics">
        {artifact.items.map((item) => (
          <div key={`${item.value}-${item.label}`} className="case-study-editorial-artifact-metric">
            <p className="case-study-editorial-artifact-value font-inter-display">{item.value}</p>
            <p className="case-study-editorial-artifact-label font-inter-display">{item.label}</p>
          </div>
        ))}
      </div>
    );
  }

  if (artifact.type === "cards") {
    return (
      <div className="case-study-editorial-artifact is-cards">
        {artifact.items.map((item) => (
          <article key={item.title} className="case-study-editorial-artifact-card">
            <h3>{item.title}</h3>
            <p className="font-inter-display">{item.body}</p>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className={`case-study-editorial-artifact is-${artifact.type}`}>
      <p className="case-study-editorial-artifact-value font-inter-display">{artifact.value}</p>
      {artifact.label ? <p className="case-study-editorial-artifact-label font-inter-display">{artifact.label}</p> : null}
      {artifact.type === "metric" && artifact.body ? (
        <p className="case-study-editorial-artifact-body font-inter-display">{artifact.body}</p>
      ) : null}
    </div>
  );
}

function CaseStudyEditorialMediaSlots({ media }: { media: NonNullable<Extract<CaseStudyBlock, { type: "editorialSplit" }>["media"]> }) {
  const items = Array.isArray(media) ? media : [media];

  return (
    <div className={`case-study-editorial-media-grid ${items.length > 1 ? "is-pair" : ""}`}>
      {items.map((item) => (
        <figure key={item.label} className={`case-study-editorial-media ${item.src ? "has-image" : "is-placeholder"}`}>
          {item.src ? (
            <img src={item.src} alt="" style={item.aspectRatio ? { aspectRatio: item.aspectRatio } : undefined} />
          ) : (
            <div className="case-study-editorial-placeholder" style={item.aspectRatio ? { aspectRatio: item.aspectRatio } : undefined}>
              <span className="font-inter-display">{item.label}</span>
            </div>
          )}
          {item.caption ? <figcaption className="font-inter-display">{item.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

function CaseStudyEditorialSplitBlock({ block }: { block: Extract<CaseStudyBlock, { type: "editorialSplit" }> }) {
  const artifact = block.artifact ? <CaseStudyEditorialArtifact artifact={block.artifact} /> : null;

  return (
    <section className={`case-study-editorial-split case-study-block ${getBlockWidthClass(block.width ?? "full")} is-${block.variant ?? "simple"}`}>
      <div className="case-study-editorial-heading">
        <p className="case-study-editorial-number font-inter-display">{block.number}</p>
        <h2>{block.title}</h2>
      </div>
      <div className="case-study-editorial-story">
        <div className="case-study-editorial-copy">
          {block.body.map((paragraph) => (
            <p key={paragraph} className="font-inter-display">{paragraph}</p>
          ))}
          {block.variant === "direction" ? artifact : null}
        </div>
        {block.variant !== "direction" ? artifact : null}
      </div>
      {block.media ? <CaseStudyEditorialMediaSlots media={block.media} /> : null}
    </section>
  );
}

function CaseStudyEditorialPulloutBlock({ block }: { block: Extract<CaseStudyBlock, { type: "editorialPullout" }> }) {
  if (block.variant === "quote") {
    return (
      <figure className={`case-study-editorial-pullout case-study-block ${getBlockWidthClass(block.width)} is-quote`}>
        <blockquote>
          <p>{block.body}</p>
        </blockquote>
      </figure>
    );
  }

  return (
    <aside className={`case-study-editorial-pullout case-study-block ${getBlockWidthClass(block.width)} is-${block.variant}`}>
      {block.items?.length ? (
        <div className="case-study-editorial-pullout-grid">
          {block.items.map((item) => (
            <div key={`${item.value}-${item.label}`} className="case-study-editorial-pullout-item">
              <p className="case-study-editorial-pullout-value font-inter-display">{item.value}</p>
              <p className="case-study-editorial-pullout-label font-inter-display">{item.label}</p>
              {item.body ? <p className="case-study-editorial-pullout-body font-inter-display">{item.body}</p> : null}
            </div>
          ))}
        </div>
      ) : (
        <div className="case-study-editorial-pullout-item">
          {block.value ? <p className="case-study-editorial-pullout-value font-inter-display">{block.value}</p> : null}
          {block.label ? <p className="case-study-editorial-pullout-label font-inter-display">{block.label}</p> : null}
          {block.body ? <p className="case-study-editorial-pullout-body font-inter-display">{block.body}</p> : null}
        </div>
      )}
    </aside>
  );
}

function CaseStudyEditorialCardsBlock({ block }: { block: Extract<CaseStudyBlock, { type: "editorialCards" }> }) {
  return (
    <section className={`case-study-editorial-cards case-study-block ${getBlockWidthClass(block.width ?? "wide")}`}>
      {block.items.map((item) => (
        <article key={item.title} className="case-study-editorial-card">
          <h3>{item.title}</h3>
          <p className="font-inter-display">{item.body}</p>
        </article>
      ))}
    </section>
  );
}

function CaseStudyNarrativeBlock({ block }: { block: Extract<CaseStudyBlock, { type: "narrative" }> }) {
  return (
    <section className={`case-study-narrative case-study-block ${getBlockWidthClass(block.width ?? "wide")} font-inter-display`}>
      <ScrollRevealText
        text={block.body}
        style={overviewCopyStyle}
        paragraphSpeeds={narrativeParagraphSpeeds}
      />
    </section>
  );
}

function CaseStudyOverviewBlock({ overview }: { overview: CaseStudyOverview }) {
  return (
    <section className="case-study-overview case-study-block font-inter-display">
      <aside className="case-study-overview-details">
        <dl className="case-study-overview-meta">
          {overview.items.map((item, index) => (
            <div key={item.label} className={index === 0 ? "is-primary" : undefined}>
              <dt style={hiddenMetadataLabelStyle}>{item.label}</dt>
              <dd style={index === 0 ? overviewMetaPrimaryStyle : overviewMetaSecondaryStyle}>
                <ProjectMeta value={item.value} />
              </dd>
            </div>
          ))}
        </dl>
        {overview.summary ? <p className="case-study-overview-summary">{overview.summary}</p> : null}
      </aside>
      <div className="case-study-overview-copy">
        <div style={staticOverviewCopyWrapStyle}>
          {overview.body.map((paragraph, index) => (
            <p key={paragraph} style={index === 0 ? overviewLeadCopyStyle : overviewSupportingCopyStyle}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyBlockView({ block }: { block: CaseStudyBlock }) {
  if (block.type === "metadata") {
    return (
      <dl className="case-study-meta case-study-block case-study-block-content font-inter-display">
        {block.items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              <ProjectMeta value={item.value} />
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  if (block.type === "overview") {
    return <CaseStudyOverviewBlock overview={block} />;
  }

  if (block.type === "text") {
    return <CaseStudyTextBlock block={block} />;
  }

  if (block.type === "editorialIntro") {
    return <CaseStudyEditorialIntroBlock block={block} />;
  }

  if (block.type === "editorialSplit") {
    return <CaseStudyEditorialSplitBlock block={block} />;
  }

  if (block.type === "editorialPullout") {
    return <CaseStudyEditorialPulloutBlock block={block} />;
  }

  if (block.type === "editorialCards") {
    return <CaseStudyEditorialCardsBlock block={block} />;
  }

  if (block.type === "narrative") {
    return <CaseStudyNarrativeBlock block={block} />;
  }

  if (block.type === "media") {
    return (
      <CaseStudyMediaBlock
        label={block.label}
        src={block.src}
        videoSrc={block.videoSrc}
        embedSrc={block.embedSrc}
        caption={block.caption}
        aspectRatio={block.aspectRatio}
        width={block.width}
      />
    );
  }

  if (block.type === "viewGrid") {
    return <CaseStudyViewGridBlock block={block} />;
  }

  if (block.type === "comparison") {
    return <CaseStudyComparisonBlock block={block} />;
  }

  if (block.type === "problemCards") {
    return <CaseStudyProblemCardsBlock block={block} />;
  }

  if (block.type === "specSamples") {
    return <CaseStudySpecSamplesBlock block={block} />;
  }

  if (block.type === "impact") {
    return <CaseStudyImpactBlock block={block} />;
  }

  if (block.type === "showcase") {
    return <CaseStudyShowcaseBlock block={block} />;
  }

  if (block.type === "presentationScroller") {
    return <CaseStudyPresentationScrollerBlock block={block} />;
  }

  if (block.type === "spotlight") {
    return <CaseStudySpotlightBlock block={block} />;
  }

  if (block.type === "stepFlow") {
    return <CaseStudyStepFlowBlock block={block} />;
  }

  const isFeatureSplit = block.variant === "feature";
  const media = (
    <CaseStudyMediaBlock
      label={block.media.label}
      src={block.media.src}
      caption={block.media.caption}
      aspectRatio={block.media.aspectRatio}
      bentoItems={block.media.bentoItems}
      fill={isFeatureSplit}
    />
  );

  return (
    <section
      className={`case-study-split case-study-block ${block.mediaSide === "left" ? "is-media-left" : ""} ${isFeatureSplit ? "is-feature" : ""}`}
    >
      {block.mediaSide === "left" ? media : null}
      <article className="case-study-text-section case-study-block case-study-block-content">
        {block.eyebrow ? <p className="case-study-section-eyebrow font-inter-display">{block.eyebrow}</p> : null}
        <h2>{block.title}</h2>
        <CaseStudySectionBody body={block.body} />
      </article>
      {block.mediaSide === "left" ? null : media}
    </section>
  );
}

export function CaseStudyPage({ project, related }: CaseStudyPageProps) {
  const [fontsReady, setFontsReady] = useState(false);
  const [heroImageReady, setHeroImageReady] = useState(false);
  const heroImageRef = useRef<HTMLImageElement | null>(null);
  const sequenceReady = fontsReady && heroImageReady;

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    document.fonts.ready
      .then(() => new Promise((resolve) => setTimeout(resolve, 350)))
      .then(() => setFontsReady(true));
  }, []);

  useEffect(() => {
    const image = heroImageRef.current;
    let frame = 0;

    if (!image?.complete) {
      return;
    }

    if (image.decode) {
      image.decode().catch(() => undefined).finally(() => setHeroImageReady(true));
      return;
    }

    frame = requestAnimationFrame(() => setHeroImageReady(true));

    return () => cancelAnimationFrame(frame);
  }, [project.heroImage, project.image]);

  useEffect(() => {
    const imageSrcs = getCaseStudyPreloadImageSrcs(project);

    if (!imageSrcs.length) {
      return;
    }

    const images = imageSrcs.map((src) => {
      const image = new window.Image();
      image.decoding = "async";
      image.loading = "eager";
      image.src = src;
      image.decode?.().catch(() => undefined);
      return image;
    });

    return () => {
      images.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [project]);

  function handleHeroImageLoad(event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;

    if (image.decode) {
      image.decode().catch(() => undefined).finally(() => setHeroImageReady(true));
      return;
    }

    setHeroImageReady(true);
  }

  const heroStyle = {
    "--rise-delay": "700ms",
    "--rise-duration": "1.72s",
    "--rise-distance": "80px",
  } as CSSProperties;

  const relatedStyle = {
    "--rise-delay": "1180ms",
    "--rise-duration": "1.08s",
    "--rise-blur": "0px",
    "--rise-animation": "work-rise-in-clean",
  } as CSSProperties;

  const legacyBlocks: CaseStudyBlock[] = [
    ...(project.metadata?.length ? [{ type: "metadata" as const, items: project.metadata }] : []),
    ...(project.sections?.flatMap((section) => [
      {
        type: "text" as const,
        eyebrow: section.eyebrow,
        title: section.title,
        body: section.body,
      },
      ...(section.media
        ? [
            {
              type: "media" as const,
              label: section.media.label,
              aspectRatio: section.media.aspectRatio,
            },
          ]
        : []),
    ]) ?? []),
  ];
  const authoredBlocks = project.blocks ?? legacyBlocks;
  const fallbackOverview = authoredBlocks.find((block) => block.type === "overview");
  const overview = project.overview ?? fallbackOverview;
  const caseStudyBlocks = authoredBlocks.filter((block) => block.type !== "overview");
  const hasCaseStudyBlocks = caseStudyBlocks.length > 0;
  const title = project.displayTitle ?? project.title;
  const isDeckCaseStudy = project.caseStudyLayout === "deck" && Boolean(project.deckSlides?.length);

  if (isDeckCaseStudy && project.deckSlides) {
    return (
      <div className={`case-study-page case-study-deck-page ${sequenceReady ? "sequence-ready" : ""}`}>
        <SiteNav showBack />

        <main className="case-study-main case-study-deck-main">
          <section className="case-study-hero-section case-study-deck-title-section" aria-label={title}>
            <div className="case-study-top">
              <header className="work-heading case-study-heading">
                <div
                  className={`case-study-top-meta font-inter-display ${sequenceReady ? "staged-work-rise" : "opacity-0"}`}
                  style={sequenceReady ? { "--rise-delay": "90ms", "--rise-duration": "0.86s", "--rise-distance": "12px", "--rise-blur": "0px", "--rise-animation": "work-rise-in-clean" } as CSSProperties : undefined}
                >
                  <ProjectMeta value={project.tag} />
                </div>
                <h1 className="font-[family-name:var(--font-instrument-serif)]">
                  <span className={`work-title-reveal ${sequenceReady ? "animate-reveal" : "opacity-0"}`}>
                    {title}
                  </span>
                </h1>
              </header>
            </div>

          </section>

          <CaseStudyDeckScroller
            slides={project.deckSlides}
            imageRef={heroImageRef}
            onHeroImageLoad={handleHeroImageLoad}
            onHeroImageError={() => setHeroImageReady(true)}
          />

          <section className="work-products case-study-related" aria-label="More case studies">
            <ProjectListSection
              title="All projects"
              items={related.map((item) => ({
                title: item.title,
                description: item.tag,
                href: item.isComingSoon ? undefined : `/work/${item.slug}`,
                image: item.thumbnailImage ?? item.featuredImage ?? item.heroImage ?? item.image,
                imagePosition: item.slug === "smartsheet-reports" ? "70% 18%" : undefined,
                statusLabel: item.isComingSoon ? "Coming soon" : undefined,
              }))}
              className="staged-work-rise"
              style={relatedStyle}
            />
          </section>
        </main>

        <footer className="work-footer">
          <div>
            <p>Graham Bunt</p>
            <p>©2026</p>
          </div>
        </footer>

        <div aria-hidden="true" className="viewport-bottom-blur" />
      </div>
    );
  }

  return (
    <div className={`case-study-page ${sequenceReady ? "sequence-ready" : ""}`}>
      <SiteNav showBack />

      <main className="case-study-main">
        <section className="case-study-hero-section" aria-label={title}>
          <div className="case-study-top">
            <header className="work-heading case-study-heading">
              <div
                className={`case-study-top-meta font-inter-display ${sequenceReady ? "staged-work-rise" : "opacity-0"}`}
                style={sequenceReady ? { "--rise-delay": "90ms", "--rise-duration": "0.86s", "--rise-distance": "12px", "--rise-blur": "0px", "--rise-animation": "work-rise-in-clean" } as CSSProperties : undefined}
              >
                <ProjectMeta value={project.tag} />
              </div>
              <h1 className="font-[family-name:var(--font-instrument-serif)]">
                <span className={`work-title-reveal ${sequenceReady ? "animate-reveal" : "opacity-0"}`}>
                  {title}
                </span>
              </h1>
            </header>
          </div>

          <figure className={`case-study-hero case-study-hero-full ${sequenceReady ? "case-study-hero-reveal" : "opacity-0"}`} style={heroStyle}>
            <img
              ref={heroImageRef}
              src={project.heroImage ?? project.image}
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority="high"
              onLoad={handleHeroImageLoad}
              onError={() => setHeroImageReady(true)}
            />
          </figure>
        </section>

        <section className="case-study-body" aria-label="Project details">
          {overview ? <CaseStudyOverviewBlock overview={overview} /> : null}
          {hasCaseStudyBlocks
            ? caseStudyBlocks.map((block, index) => (
                <CaseStudyBlockView key={`${block.type}-${index}`} block={block} />
              ))
            : project.gallery.map((item, index) => (
                <div key={`${item.caption}-${item.src}`} className="case-study-gallery-group">
                  <figure className="case-study-media-card">
                    <div className="case-study-media-shell">
                      <img src={item.src} alt="" style={item.aspectRatio ? { aspectRatio: item.aspectRatio } : undefined} />
                    </div>
                    <figcaption className="font-inter-display">{item.caption}</figcaption>
                  </figure>

                  {project.notes[index] ? (
                    <article className="case-study-note">
                      <h2>{project.notes[index].title}</h2>
                      <p className="font-inter-display">{project.notes[index].body}</p>
                    </article>
                  ) : null}
                </div>
              ))}
        </section>

        <section className="work-products case-study-related" aria-label="More case studies">
          <ProjectListSection
            title="All projects"
            items={related.map((item) => ({
              title: item.title,
              description: item.tag,
              href: item.isComingSoon ? undefined : `/work/${item.slug}`,
              image: item.thumbnailImage ?? item.featuredImage ?? item.heroImage ?? item.image,
              imagePosition: item.slug === "smartsheet-reports" ? "70% 18%" : undefined,
              statusLabel: item.isComingSoon ? "Coming soon" : undefined,
            }))}
            className="staged-work-rise"
            style={relatedStyle}
          />
        </section>
      </main>

      <footer className="work-footer">
        <div>
          <p>Graham Bunt</p>
          <p>©2026</p>
        </div>
      </footer>

      <div aria-hidden="true" className="viewport-bottom-blur" />
    </div>
  );
}
