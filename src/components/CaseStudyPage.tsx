/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, ReactNode, RefObject, SyntheticEvent } from "react";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ProjectMeta } from "@/components/ProjectMeta";
import { ScrollRevealText } from "@/components/ScrollRevealText";
import { SiteNav } from "@/components/SiteNav";
import type { CaseStudyBlock, CaseStudyBlockWidth, CaseStudyOverview, WorkItem } from "@/content/work";
import { preventTextOrphans } from "@/lib/typography";

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
  titleWeight: 500,
  subtitleWeight: 500,
};

const overviewCopyStyle: CSSProperties = {
  color: "#ffffff",
  fontFamily: 'var(--font-sans-preview), sans-serif',
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

const smartsheetOverviewCopyStyle: CSSProperties = {
  color: "#ffffff",
  fontFamily: 'var(--font-sans-preview), sans-serif',
  fontSize: 21,
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: 0,
  margin: 0,
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
  fontWeight: 400,
  lineHeight: "28px",
  margin: 0,
};

const overviewMetaSecondaryStyle: CSSProperties = {
  color: "rgba(255, 255, 255, 0.65)",
  fontSize: 18,
  fontWeight: 400,
  lineHeight: "28px",
  margin: 0,
};

const specSampleMediaStyle: CSSProperties = {
  position: "relative",
};

const specSampleChipStyle: CSSProperties = {
  position: "absolute",
  left: 8,
  bottom: 8,
  zIndex: 3,
  display: "inline-flex",
  maxWidth: "calc(100% - 16px)",
  alignItems: "center",
  gap: 0,
  borderRadius: 4,
  background: "rgba(0, 0, 0, 0.84)",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: 0,
  lineHeight: "16px",
  padding: "5px 8px 5px 9px",
  pointerEvents: "none",
  textTransform: "none",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
};

const specSampleChipTextStyle: CSSProperties = {
  minWidth: 0,
};

const specSampleChipArrowStyle: CSSProperties = {
  display: "inline-flex",
  width: 14,
  height: 14,
  flex: "0 0 auto",
  alignItems: "center",
  justifyContent: "center",
  color: "currentColor",
  marginLeft: 5,
  opacity: 1,
  overflow: "hidden",
  transform: "translate(0, 0) scale(1)",
};

const narrativeParagraphSpeeds = [1, 1.25];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z" />
    </svg>
  );
}

function UpRightArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      focusable="false"
      style={{ display: "block", width: 14, height: 14 }}
    >
      <path
        d="M7 17L17 7M9 7h8v8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.25"
      />
    </svg>
  );
}

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
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04)), var(--color-charcoal)",
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
  fontWeight: 500,
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
  fontFamily: "var(--font-display-serif), serif",
  fontSize: "clamp(38px, 4.4vw, 64px)",
  fontWeight: 400,
  lineHeight: 1,
  margin: 0,
};

const sectionLabelStyle: CSSProperties = {
  color: "rgba(255, 255, 255, 0.36)",
  fontSize: 16,
  fontWeight: 500,
  letterSpacing: "0.12em",
  lineHeight: "23px",
  margin: 0,
  textShadow: "0 -1px 0 rgba(255, 255, 255, 0.08), 0 1px 0 rgba(0, 0, 0, 0.95)",
};

const stepTitleStyle: CSSProperties = {
  color: "#ffffff",
  fontFamily: 'var(--font-sans-preview), sans-serif',
  fontSize: 21,
  fontWeight: 400,
  lineHeight: 1.5,
  margin: 0,
};

const stepDescriptionStyle: CSSProperties = {
  color: "rgba(255, 255, 255, 0.65)",
  fontSize: 18,
  fontWeight: 400,
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
  poster,
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
  poster?: string;
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
              {item.src ? <img src={item.src} alt="" loading="lazy" decoding="async" /> : <span className="case-study-bento-tile-chip font-sans-preview">{item.label}</span>}
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
            {videoSrc ? <CaseStudyLazyVideo src={videoSrc} poster={poster} controls ariaLabel={label} rootMargin="2200px 0px" /> : null}
          </div>
        )
      ) : src ? (
        <img src={src} alt="" loading="lazy" decoding="async" />
      ) : (
        <span className="font-sans-preview">{label}</span>
      )}
      {caption && !isVideo ? <figcaption className="font-sans-preview">{caption}</figcaption> : null}
    </figure>
  );
}

function CaseStudyViewGridBlock({ block }: { block: Extract<CaseStudyBlock, { type: "viewGrid" }> }) {
  return (
    <section className={`case-study-view-grid case-study-block ${getBlockWidthClass(block.width)}`} aria-label="report views">
      {block.items.map((item) => (
        <article key={item.kind} className="case-study-view-card">
          <div className="case-study-view-card-heading">
            <span className="case-study-view-card-icon">
              <img src={item.icon} alt="" aria-hidden="true" />
            </span>
            <h2>{preventTextOrphans(item.title)}</h2>
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
      aria-label="report experience comparison"
    >
      {block.items.map((item) => (
        <figure key={item.title} className={`case-study-comparison-panel ${item.src ? "has-image" : ""}`}>
          <div className="case-study-comparison-image-frame">
            {item.src ? <img src={item.src} alt="" loading="lazy" decoding="async" /> : <span className="font-sans-preview">{item.label}</span>}
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

function CaseStudyProblemCardsBlock({
  block,
  showHeader = true,
  useProblemBadges = false,
}: {
  block: Extract<CaseStudyBlock, { type: "problemCards" }>;
  showHeader?: boolean;
  useProblemBadges?: boolean;
}) {
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
      {showHeader ? (
        <header className="case-study-problem-header">
          <p className="font-sans-preview" style={sectionLabelStyle}>{block.label}</p>
        </header>
      ) : null}
      <div className="case-study-problem-grid">
        {block.items.map((item) => (
          <article key={item.title} className={`case-study-problem-card is-${item.tone} ${item.image ? "has-image" : ""} ${useProblemBadges ? "has-problem-badge" : ""}`}>
            {item.image ? (
              <div className="case-study-problem-image" aria-hidden="true">
                <img src={item.image} alt="" loading="lazy" decoding="async" />
              </div>
            ) : null}
            <div className="case-study-problem-content">
              <div className="case-study-problem-heading">
                {!item.image ? (
                  <div className={`case-study-problem-avatar is-${item.tone}`} aria-hidden="true">
                    {item.avatar ? <img src={item.avatar} alt="" /> : item.audience.slice(0, 1)}
                  </div>
                ) : null}
                <p className="case-study-problem-audience font-sans-preview">
                  {useProblemBadges ? `${item.audience} problem` : item.audience}
                </p>
              </div>
              <h2>{preventTextOrphans(item.title)}</h2>
              <p className="case-study-problem-body font-sans-preview">{preventTextOrphans(item.body)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CaseStudyLazyVideo({
  ariaHidden = false,
  ariaLabel,
  autoPlay = false,
  controls = false,
  loop = false,
  muted = false,
  poster,
  rootMargin = "640px 0px",
  src,
}: {
  ariaHidden?: boolean;
  ariaLabel?: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  rootMargin?: string;
  src: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [readyVideoSrc, setReadyVideoSrc] = useState<string | null>(null);
  const isVideoReady = readyVideoSrc === src;

  useEffect(() => {
    const node = videoRef.current;

    if (!node) {
      return undefined;
    }

    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setShouldLoad(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }

    const node = videoRef.current;

    if (!node) {
      return;
    }

    node.load();

    if (!autoPlay) {
      return;
    }

    node.muted = true;
    const frame = requestAnimationFrame(() => {
      node.play().catch(() => undefined);
    });

    return () => cancelAnimationFrame(frame);
  }, [autoPlay, shouldLoad, src]);

  function handleAutoplayReady() {
    setReadyVideoSrc(src);

    if (!autoPlay) {
      return;
    }

    videoRef.current?.play().catch(() => undefined);
  }

  return (
    <span className={`case-study-lazy-video-shell ${poster ? "has-poster" : ""} ${isVideoReady ? "is-ready" : ""}`}>
      {poster ? <img className="case-study-lazy-video-poster" src={poster} alt="" loading="eager" decoding="async" aria-hidden="true" /> : null}
      <video
        ref={videoRef}
        className="case-study-lazy-video"
        src={shouldLoad ? src : undefined}
        autoPlay={autoPlay && shouldLoad}
        controls={controls}
        loop={loop}
        muted={muted}
        playsInline
        poster={poster}
        preload={shouldLoad ? (autoPlay ? "auto" : controls ? "metadata" : "none") : "none"}
        onLoadedData={handleAutoplayReady}
        onCanPlay={handleAutoplayReady}
        aria-hidden={ariaHidden ? true : undefined}
        aria-label={ariaLabel}
      />
    </span>
  );
}

function CaseStudySpecSamplesBlock({
  block,
  showHeader = true,
}: {
  block: Extract<CaseStudyBlock, { type: "specSamples" }>;
  showHeader?: boolean;
}) {
  return (
    <section
      className={`case-study-spec-samples case-study-block ${getBlockWidthClass(block.width ?? "full")}`}
      aria-label={block.label}
    >
      {showHeader ? (
        <header className="case-study-spec-samples-header">
          <p className="font-sans-preview" style={sectionLabelStyle}>{block.label}</p>
        </header>
      ) : null}
      <div className="case-study-spec-samples-grid">
        {block.items.map((item) => (
          <a
            key={item.title}
            className="case-study-spec-sample-card"
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${item.title}: ${item.action}`}
          >
            <div
              className={`case-study-spec-sample-media is-${item.kind} ${item.image || item.video ? "has-image" : ""}`}
              style={specSampleMediaStyle}
            >
              {item.video ? (
                <CaseStudyLazyVideo src={item.video} poster={item.image} autoPlay loop muted ariaHidden rootMargin="6400px 0px" />
              ) : item.image ? (
                <img src={item.image} alt="" loading="lazy" decoding="async" aria-hidden="true" />
              ) : (
                <div className="case-study-spec-sample-window" aria-hidden="true">
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
              <span className="case-study-spec-sample-chip font-sans-preview" style={specSampleChipStyle} aria-hidden="true">
                <span style={specSampleChipTextStyle}>{preventTextOrphans(item.title)}</span>
                <span className="case-study-spec-sample-chip-arrow" style={specSampleChipArrowStyle}>
                  <UpRightArrowIcon />
                </span>
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
          <p className="font-sans-preview">{block.label}</p>
        </div>
        <h2>{preventTextOrphans(block.statement)}</h2>
      </div>
      <div className={`case-study-impact-outcomes ${outcomeCountClass}`}>
        {block.outcomes.map((item) => (
          <article key={item.number}>
            <span className="font-sans-preview">{item.number}</span>
            <div>
              <h3>{preventTextOrphans(item.title)}</h3>
              <p className="font-sans-preview">{preventTextOrphans(item.body)}</p>
            </div>
          </article>
        ))}
      </div>
      {block.footnote ? <p className="case-study-impact-footnote font-sans-preview">{preventTextOrphans(block.footnote)}</p> : null}
    </section>
  );
}

function CaseStudyShowcaseBlock({ block }: { block: Extract<CaseStudyBlock, { type: "showcase" }> }) {
  const hasHeader = Boolean(block.label || block.title || block.body);

  return (
    <section className={`case-study-showcase case-study-block ${getBlockWidthClass(block.width ?? "full")}`}>
      {hasHeader ? (
        <header className="case-study-showcase-header">
          {block.label ? <p className="case-study-showcase-label font-sans-preview">{block.label}</p> : null}
          <div>
            {block.title ? <h2>{preventTextOrphans(block.title)}</h2> : null}
            {block.body ? <p className="font-sans-preview">{preventTextOrphans(block.body)}</p> : null}
          </div>
        </header>
      ) : null}
      <div className="case-study-showcase-grid">
        {block.items.map((item) => (
          <figure key={item.title} className={`case-study-showcase-item ${item.span === "half" ? "is-half" : "is-full"}`}>
            <figcaption>
              <h3>{preventTextOrphans(item.title)}</h3>
              <p className="font-sans-preview">{preventTextOrphans(item.description)}</p>
            </figcaption>
            <div className="case-study-showcase-media">
              <img src={item.src} alt="" loading="lazy" decoding="async" />
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
            {block.label ? <p className="case-study-showcase-label font-sans-preview">{block.label}</p> : null}
            <div>
              {block.title ? <h2>{preventTextOrphans(block.title)}</h2> : null}
              {block.body ? <p className="font-sans-preview">{preventTextOrphans(block.body)}</p> : null}
            </div>
          </header>
        ) : null}

        <div ref={trackRef} className="case-study-presentation-track">
          {block.slides.map((slide, index) => (
            <article key={`${slide.eyebrow ?? index}-${slide.title}`} className={`case-study-presentation-slide ${index === 0 ? "is-hero-slide" : ""}`}>
              {slide.src ? <img src={slide.src} alt="" loading="lazy" decoding="async" /> : <div className="case-study-presentation-placeholder" aria-hidden="true" />}
              <div className="case-study-presentation-copy font-sans-preview">
                {slide.eyebrow ? <span>{slide.eyebrow}</span> : null}
                <h3>{preventTextOrphans(slide.title)}</h3>
                {slide.description ? <p>{preventTextOrphans(slide.description)}</p> : null}
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
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index === 0 ? "high" : "auto"}
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
        <h2 id="case-study-spotlight-title">{preventTextOrphans(block.title)}</h2>
        <CaseStudySectionBody body={block.body} />
      </article>
      <CaseStudyMediaBlock
        label={block.media.label}
        src={block.media.src}
        videoSrc={block.media.videoSrc}
        embedSrc={block.media.embedSrc}
        poster={block.media.poster}
        caption={block.media.caption}
        aspectRatio={block.media.aspectRatio}
        width={block.media.width}
      />
    </section>
  );
}

function CaseStudyStepFlowBlock({
  block,
  showHeader = true,
  hideItemCopy = false,
}: {
  block: Extract<CaseStudyBlock, { type: "stepFlow" }>;
  showHeader?: boolean;
  hideItemCopy?: boolean;
}) {
  const maxWidth = block.width === "content" ? 520 : block.width === "wide" ? 720 : 1680;
  const gridStyle = hideItemCopy ? undefined : stepFlowGridStyle;
  const cardStyle = hideItemCopy ? undefined : stepCardStyle;
  const mediaStyle = hideItemCopy ? undefined : stepMediaStyle;

  return (
    <section
      className={`case-study-step-flow case-study-block ${hideItemCopy ? "is-media-only" : ""} ${getBlockWidthClass(block.width ?? "full")}`}
      style={{ ...stepFlowStyle, maxWidth }}
      aria-label="Core report definition steps"
    >
      {showHeader && (block.title || block.label) ? (
        <header className="case-study-step-flow-header" style={stepFlowHeaderStyle}>
          {block.title ? <h2 style={stepFlowTitleStyle}>{preventTextOrphans(block.title)}</h2> : null}
          {block.label ? <p className="font-sans-preview" style={sectionLabelStyle}>{block.label}</p> : null}
        </header>
      ) : null}
      <div className="case-study-step-flow-grid" style={gridStyle}>
        {block.items.map((item, index) => (
          <article key={item.title} className="case-study-step-card" style={cardStyle}>
            <figure className="case-study-step-media" style={mediaStyle}>
              {item.image ? <img src={item.image} alt="" loading="lazy" decoding="async" /> : <span className="font-sans-preview">{item.label}</span>}
            </figure>
            {hideItemCopy ? null : (
              <div
                className="case-study-step-copy"
                style={stepCopyStyle}
              >
                <span
                  className="case-study-step-number font-sans-preview"
                  style={stepNumberStyle}
                >
                  {index + 1}
                </span>
                <h2 style={stepTitleStyle}>{preventTextOrphans(item.title)}</h2>
                <p className="font-sans-preview" style={{ ...stepDescriptionStyle, gridColumn: "1 / -1" }}>
                  {preventTextOrphans(item.description)}
                </p>
              </div>
            )}
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
        <p key={paragraph} className="font-sans-preview" style={paragraphStyle}>
          {preventTextOrphans(paragraph)}
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
      {block.eyebrow ? <p className="case-study-section-eyebrow font-sans-preview">{block.eyebrow}</p> : null}
      {introRevealText ? (
        <div className="font-sans-preview" style={{ ...staticOverviewCopyWrapStyle, maxWidth: 520, textAlign: "left" }}>
          {introRevealText.map((paragraph) => (
            <p key={paragraph} style={{ ...overviewCopyStyle, width: "100%", maxWidth: 520 }}>
              {preventTextOrphans(paragraph)}
            </p>
          ))}
        </div>
      ) : (
        <>
          {block.title ? <h2>{preventTextOrphans(block.title)}</h2> : null}
          <CaseStudySectionBody body={block.body} />
        </>
      )}
    </article>
  );
}

function CaseStudyEditorialIntroBlock({ block }: { block: Extract<CaseStudyBlock, { type: "editorialIntro" }> }) {
  return (
    <section className={`case-study-editorial-intro case-study-block ${getBlockWidthClass(block.width ?? "large")}`}>
      <h2>{preventTextOrphans(block.title)}</h2>
      <div className="case-study-editorial-intro-body">
        {block.body.map((paragraph) => (
          <p key={paragraph} className="font-sans-preview">{preventTextOrphans(paragraph)}</p>
        ))}
      </div>
    </section>
  );
}

function renderEditorialInline(text: string) {
  return preventTextOrphans(text).split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${index}`} className="case-study-editorial-emphasis">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

function CaseStudyEditorialMedia({ media }: { media: NonNullable<Extract<CaseStudyBlock, { type: "editorialSplit" }>["media"]> }) {
  const items = Array.isArray(media) ? media : [media];

  return (
    <div className={`case-study-editorial-media-grid ${items.length > 1 ? "is-pair" : ""}`}>
      {items.map((item) => (
        <figure key={`${item.label}-${item.src}`} className="case-study-editorial-media">
          <img src={item.src} alt="" loading="lazy" decoding="async" style={item.aspectRatio ? { aspectRatio: item.aspectRatio } : undefined} />
          {item.caption ? <figcaption className="font-sans-preview">{preventTextOrphans(item.caption)}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

function CaseStudyEditorialSplitBlock({ block }: { block: Extract<CaseStudyBlock, { type: "editorialSplit" }> }) {
  return (
    <section className={`case-study-editorial-split case-study-block ${getBlockWidthClass(block.width ?? "full")}`}>
      <div className="case-study-editorial-rail">
        <h2>{preventTextOrphans(block.title)}</h2>
      </div>
      <div className="case-study-editorial-main">
        <div className="case-study-editorial-copy">
          {block.body.map((paragraph) => (
            <p key={paragraph} className="font-sans-preview">{renderEditorialInline(paragraph)}</p>
          ))}
        </div>
        {block.media ? <CaseStudyEditorialMedia media={block.media} /> : null}
      </div>
    </section>
  );
}

function CaseStudyEditorialPulloutBlock({ block }: { block: Extract<CaseStudyBlock, { type: "editorialPullout" }> }) {
  if (block.variant === "quote") {
    return (
      <figure className={`case-study-editorial-pullout case-study-block ${getBlockWidthClass(block.width)} is-quote`}>
        <blockquote>
          {block.body ? <p>{preventTextOrphans(block.body)}</p> : null}
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
              <p className="case-study-editorial-pullout-value font-sans-preview">{item.value}</p>
              <p className="case-study-editorial-pullout-label font-sans-preview">{item.label}</p>
              {item.body ? <p className="case-study-editorial-pullout-body font-sans-preview">{preventTextOrphans(item.body)}</p> : null}
            </div>
          ))}
        </div>
      ) : (
        <div className="case-study-editorial-pullout-item">
          {block.value ? <p className="case-study-editorial-pullout-value font-sans-preview">{block.value}</p> : null}
          {block.label ? <p className="case-study-editorial-pullout-label font-sans-preview">{block.label}</p> : null}
          {block.body ? <p className="case-study-editorial-pullout-body font-sans-preview">{preventTextOrphans(block.body)}</p> : null}
        </div>
      )}
    </aside>
  );
}

function CaseStudyNarrativeBlock({ block }: { block: Extract<CaseStudyBlock, { type: "narrative" }> }) {
  return (
    <section className={`case-study-narrative case-study-block ${getBlockWidthClass(block.width ?? "wide")} font-sans-preview`}>
      <ScrollRevealText
        text={block.body}
        style={overviewCopyStyle}
        paragraphSpeeds={narrativeParagraphSpeeds}
      />
    </section>
  );
}

function CaseStudyOverviewBlock({
  overview,
  subtleCopy = false,
  hideDetails = false,
}: {
  overview: CaseStudyOverview;
  subtleCopy?: boolean;
  hideDetails?: boolean;
}) {
  return (
    <section className={`case-study-overview case-study-block font-sans-preview ${hideDetails ? "is-copy-only" : ""}`}>
      {hideDetails ? null : (
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
          {overview.summary ? <p className="case-study-overview-summary">{preventTextOrphans(overview.summary)}</p> : null}
        </aside>
      )}
      <div className="case-study-overview-copy">
        <div style={staticOverviewCopyWrapStyle}>
          {overview.body.map((paragraph, index) => (
            <p key={paragraph} style={subtleCopy ? smartsheetOverviewCopyStyle : index === 0 ? overviewLeadCopyStyle : overviewSupportingCopyStyle}>
              {preventTextOrphans(paragraph)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudySmartsheetSpineSection({
  label,
  children,
  contentClassName = "",
}: {
  label: string;
  children: ReactNode;
  contentClassName?: string;
}) {
  return (
    <section className="case-study-spine-section case-study-block" aria-label={label}>
      <div className="case-study-spine-rail">
        <p className="font-sans-preview">{label}</p>
      </div>
      <div className={`case-study-spine-content ${contentClassName}`}>
        {children}
      </div>
    </section>
  );
}

function CaseStudySmartsheetProse({
  body,
  bullets,
  title,
}: {
  body: string[];
  bullets?: string[];
  title?: string;
}) {
  return (
    <div className="case-study-spine-prose font-sans-preview">
      {title ? <h2>{preventTextOrphans(title)}</h2> : null}
      {body.map((paragraph) => (
        <p key={paragraph}>{preventTextOrphans(paragraph)}</p>
      ))}
      {bullets?.length ? (
        <ul>
          {bullets.map((item) => (
            <li key={item}>{preventTextOrphans(item)}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

const smartsheetExplorationCopy = [
  "The main challenge was giving collaborators access to the toolbar while preserving admin control over what data belonged in the report and how it was aggregated.",
  "The final solution separated source data controls from display controls. Source data answered which sheets, fields, and rows belonged in the report and how the data was aggregated. The rest of the toolbar controls could then let collaborators explore the data within those bounds.",
];

const smartsheetViewPrimitiveCopy = [
  "With the strategy in place, we modernized reports through a series of releases:",
];

const smartsheetViewPrimitiveBullets = [
  "Introduced the modern view with refreshed grouping and calculations, so customers could switch from legacy with their reports intact.",
  "Added source data, opening the toolbar to collaborators while preserving admin control.",
  "Launched a new first-time experience making the modern view the default starting place.",
];

function CaseStudySmartsheetFullMedia({
  label,
  src,
  srcSet,
  sizes,
  placeholder = false,
  className,
}: {
  label: string;
  src?: string;
  srcSet?: string;
  sizes?: string;
  placeholder?: boolean;
  className?: string;
}) {
  const figureClassName = [
    "case-study-smartsheet-full-media",
    "case-study-block",
    placeholder ? "is-placeholder" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={figureClassName} aria-label={label}>
      {src && !placeholder ? (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="low"
        />
      ) : null}
    </figure>
  );
}

const resourceManagementArmsFrames = [
  {
    label: "Resource Management profile view",
    src: "/work/resource-management-integration/arms-profile-ui.png",
    src2x: "/work/resource-management-integration/arms-profile-ui-2x.png",
  },
  {
    label: "Resource Management reports view",
    src: "/work/resource-management-integration/arms-reports-ui.png",
    src2x: "/work/resource-management-integration/arms-reports-ui-2x.png",
  },
  {
    label: "Resource Management schedule view",
    src: "/work/resource-management-integration/arms-schedule-ui.png",
    src2x: "/work/resource-management-integration/arms-schedule-ui-2x.png",
  },
  {
    label: "Resource Management capacity view",
    src: "/work/resource-management-integration/arms-capacity-ui.png",
    src2x: "/work/resource-management-integration/arms-capacity-ui-2x.png",
  },
  {
    label: "Resource Management time and fees view",
    src: "/work/resource-management-integration/arms-time-and-fees-ui.png",
    src2x: "/work/resource-management-integration/arms-time-and-fees-ui-2x.png",
  },
];

function CaseStudySmartsheetImageSequence({
  label,
  frames,
  intervalMs = 1200,
}: {
  label: string;
  frames: typeof resourceManagementArmsFrames;
  intervalMs?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSequenceReady, setIsSequenceReady] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const preloadFrames = async () => {
      await Promise.all(
        frames.map(async (frame) => {
          const source = window.devicePixelRatio > 1.25 && frame.src2x ? frame.src2x : frame.src;
          const image = new window.Image();
          image.src = source;

          if (image.decode) {
            try {
              await image.decode();
              return;
            } catch {
              return;
            }
          }

          await new Promise<void>((resolve) => {
            image.onload = () => resolve();
            image.onerror = () => resolve();
          });
        }),
      );

      if (!isCancelled) {
        setIsSequenceReady(true);
        setShouldAnimate(!prefersReducedMotion);
      }
    };

    preloadFrames();

    return () => {
      isCancelled = true;
    };
  }, [frames]);

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % frames.length);
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [frames.length, intervalMs, shouldAnimate]);

  return (
    <figure
      className={`case-study-smartsheet-full-media is-image-sequence ${isSequenceReady ? "is-ready" : ""} case-study-block`}
      aria-label={label}
      style={{ backgroundColor: "#E8E4DC" }}
    >
      {frames.map((frame, index) => (
        <div
          key={frame.src}
          className={`case-study-image-sequence-frame ${index === activeIndex ? "is-active" : ""}`}
          aria-hidden={index !== activeIndex}
          style={{ width: "min(1060px, calc(100% - 40px))" }}
        >
          <img
            src={frame.src}
            srcSet={frame.src2x ? `${frame.src} 1x, ${frame.src2x} 2x` : undefined}
            alt={index === activeIndex ? frame.label : ""}
            loading="eager"
            decoding="async"
            fetchPriority={index === 0 ? "high" : "low"}
          />
        </div>
      ))}
    </figure>
  );
}

const resourceManagementPeopleImages = [
  {
    className: "is-dinner",
    label: "Resource Management team dinner",
    src: "/work/resource-management-integration/team-1.jpg",
  },
  {
    className: "is-offsite",
    label: "Resource Management team offsite",
    src: "/work/resource-management-integration/team-2.jpg",
  },
  {
    className: "is-toast",
    label: "Resource Management teammates at dinner",
    src: "/work/resource-management-integration/team-3.jpg",
  },
  {
    className: "is-group",
    label: "Resource Management team gathering",
    src: "/work/resource-management-integration/team-4.jpg",
  },
];

function CaseStudyResourceManagementPeopleBento() {
  const dinnerImage = resourceManagementPeopleImages[0];
  const offsiteImage = resourceManagementPeopleImages[1];
  const toastImage = resourceManagementPeopleImages[2];
  const groupImage = resourceManagementPeopleImages[3];

  return (
    <section className="case-study-rm-people case-study-block" aria-label="Resource Management team">
      <div className="case-study-rm-people-grid">
        <figure className={`case-study-rm-people-tile ${dinnerImage.className}`} aria-label={dinnerImage.label}>
          <img src={dinnerImage.src} alt="" loading="lazy" decoding="async" />
        </figure>
        <figure className={`case-study-rm-people-tile ${offsiteImage.className}`} aria-label={offsiteImage.label}>
          <img src={offsiteImage.src} alt="" loading="lazy" decoding="async" />
        </figure>
        <div className="case-study-rm-people-note">
          <p className="case-study-rm-people-note-copy is-desktop">
            <span>Nearly three years of</span>
            <span>Resource Management,</span>
            <span>with some pretty great</span>
            <span>people along the way.</span>
          </p>
          <p className="case-study-rm-people-note-copy is-mobile">
            Nearly three years of Resource Management, with some pretty great people along the way.
          </p>
        </div>
        <figure className={`case-study-rm-people-tile ${groupImage.className}`} aria-label={groupImage.label}>
          <img src={groupImage.src} alt="" loading="lazy" decoding="async" />
        </figure>
        <figure className={`case-study-rm-people-tile ${toastImage.className}`} aria-label={toastImage.label}>
          <img src={toastImage.src} alt="" loading="lazy" decoding="async" />
        </figure>
      </div>
    </section>
  );
}

function CaseStudySmartsheetExplorationMedia() {
  const optionItems = [
    {
      title: "Creation-first",
      body: "Optimize setup, but leave ownership unclear after the report exists.",
    },
    {
      title: "Single surface",
      body: "Expose every control together, but make the experience harder to reason about.",
    },
    {
      title: "Data boundaries + display controls",
      body: "Protect source boundaries while giving collaborators room to shape the data inside them.",
      selected: true,
    },
  ];

  return (
    <div className="case-study-smartsheet-exploration-media">
      <div className="case-study-smartsheet-ai-explorations">
        <figure aria-label="AI-assisted report creation exploration placeholder" />
        <figure aria-label="Guided report draft exploration">
          <img src="/work/smartsheet-reports/smartassist-fast.webp" alt="" loading="eager" decoding="async" fetchPriority="low" />
        </figure>
      </div>

      <div className="case-study-smartsheet-option-map" aria-label="Configuration model options">
        {optionItems.map((item) => (
          <article key={item.title} className={item.selected ? "is-selected" : undefined}>
            <span className="font-sans-preview">{item.selected ? "Selected model" : "Option"}</span>
            <h3 className="font-sans-preview">{preventTextOrphans(item.title)}</h3>
            <p className="font-sans-preview">{preventTextOrphans(item.body)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function CaseStudySmartsheetViewBento() {
  const tiles = [
    {
      label: "Custom views menu",
      className: "is-custom-views",
      src: "/work/smartsheet-reports/bento-top-left-fast.webp",
    },
    {
      label: "Grouping surface",
      className: "is-grouping-surface",
      src: "/work/smartsheet-reports/bento-top-right-fast.webp",
    },
    {
      label: "Summary calculations",
      className: "is-summary-calculations",
      src: "/work/smartsheet-reports/bento-bottom-left-fast.webp",
    },
    {
      label: "Calculate menu",
      className: "is-calculate-menu",
      src: "/work/smartsheet-reports/bento-bottom-middle-fast.webp",
    },
    {
      label: "Three-level grouping logic",
      className: "is-grouping-logic",
      src: "/work/smartsheet-reports/bento-bottom-right-fast.webp",
    },
  ];

  return (
    <div className="case-study-smartsheet-view-bento">
      {tiles.map((tile) => (
        <figure
          key={tile.label}
          className={`case-study-smartsheet-view-bento-tile ${tile.className}`}
          aria-label={tile.label}
        >
          <img src={tile.src} alt="" loading="eager" decoding="async" fetchPriority="low" />
        </figure>
      ))}
    </div>
  );
}

function CaseStudySmartsheetPullingSection({
  block,
  stepFlow,
  label,
  body,
  mediaItems,
  mediaMode = "source",
  mediaCount = 1,
}: {
  block: Extract<CaseStudyBlock, { type: "split" }>;
  stepFlow?: Extract<CaseStudyBlock, { type: "stepFlow" }>;
  label?: string;
  body?: string[];
  mediaItems?: Array<{
    label: string;
    src?: string;
    placeholder?: boolean;
  }>;
  mediaMode?: "source" | "placeholder" | "exploration";
  mediaCount?: number;
}) {
  const sectionLabel = label ?? block.title;
  const sectionBody = body ?? block.body;
  const showPlaceholders = mediaMode === "placeholder";
  const showExplorationMedia = mediaMode === "exploration";

  return (
    <section className="case-study-smartsheet-pulling-section case-study-block" aria-label={sectionLabel}>
      <CaseStudySmartsheetSpineSection label={sectionLabel}>
        <CaseStudySmartsheetProse body={sectionBody} />
      </CaseStudySmartsheetSpineSection>
      <div className="case-study-smartsheet-solution-media">
        {showExplorationMedia ? (
          <CaseStudySmartsheetExplorationMedia />
        ) : mediaItems?.length
          ? mediaItems.map((item) => (
              <CaseStudySmartsheetFullMedia
                key={item.label}
                label={item.label}
                src={item.src}
                placeholder={item.placeholder ?? !item.src}
              />
            ))
          : showPlaceholders
          ? Array.from({ length: mediaCount }).map((_, index) => (
              <CaseStudySmartsheetFullMedia
                key={`${sectionLabel}-placeholder-${index + 1}`}
                label={`${sectionLabel} placeholder ${index + 1}`}
                placeholder
              />
            ))
          : <CaseStudySmartsheetFullMedia label={block.media.label} src={block.media.src} />}
        {!showPlaceholders && stepFlow ? <CaseStudyStepFlowBlock block={stepFlow} showHeader={false} hideItemCopy /> : null}
      </div>
    </section>
  );
}

function CaseStudySmartsheetViewPrimitiveSection({
  specSamplesBlock,
  usePlaceholderOnly = false,
}: {
  specSamplesBlock?: Extract<CaseStudyBlock, { type: "specSamples" }>;
  usePlaceholderOnly?: boolean;
}) {
  return (
    <section className="case-study-smartsheet-pulling-section case-study-smartsheet-view-parity-section case-study-block" aria-label="Execution">
      <CaseStudySmartsheetSpineSection label="Execution">
        <CaseStudySmartsheetProse body={smartsheetViewPrimitiveCopy} bullets={smartsheetViewPrimitiveBullets} />
      </CaseStudySmartsheetSpineSection>
      <div className="case-study-smartsheet-solution-media">
        {usePlaceholderOnly ? (
          <CaseStudySmartsheetFullMedia label="Execution placeholder" placeholder />
        ) : (
          <>
            <CaseStudySmartsheetViewBento />
            <CaseStudySmartsheetFullMedia
              label="Grouping levels"
              src="/work/smartsheet-reports/grouping-levels-fast.webp"
              className="is-grouping-levels"
            />
          </>
        )}
        {!usePlaceholderOnly && specSamplesBlock ? (
          <div className="case-study-smartsheet-spec-band">
            <div className="case-study-smartsheet-spec-band-inner">
              <CaseStudySpecSamplesBlock block={specSamplesBlock} showHeader={false} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function getSmartsheetSpineLabel(block: CaseStudyBlock) {
  if (block.type === "split") {
    if (block.title === "Pulling the configuration model apart") {
      return "Pulling the configuration model apart";
    }

    if (block.title === "Aligning with nascent capabilities") {
      return "Views become personal";
    }

    if (block.title === "Contributing new features") {
      return "Extending the sheet";
    }
  }

  if (block.type === "stepFlow") {
    return "The source model";
  }

  if (block.type === "specSamples") {
    return "Prototype and spec";
  }

  if (block.type === "spotlight") {
    return "Ambiguity";
  }

  if (block.type === "impact") {
    return block.label;
  }

  if (block.type === "text" && block.title === "Carrying the work forward") {
    return "Carrying it forward";
  }

  return null;
}

function CaseStudySmartsheetSplitBlock({ block }: { block: Extract<CaseStudyBlock, { type: "split" }> }) {
  return (
    <div className="case-study-spine-stack">
      <CaseStudySmartsheetProse body={block.body} />
      <CaseStudyMediaBlock
        label={block.media.label}
        src={block.media.src}
        caption={block.media.caption}
        aspectRatio={block.media.aspectRatio}
        bentoItems={block.media.bentoItems}
        fill={block.variant === "feature"}
        width="full"
      />
    </div>
  );
}

function CaseStudySmartsheetPivotSpotlightSection({ block }: { block: Extract<CaseStudyBlock, { type: "spotlight" }> }) {
  return (
    <section className="case-study-smartsheet-pivot-spotlight case-study-block" aria-label={block.title}>
      <CaseStudySmartsheetSpineSection label="Ambiguity">
        <CaseStudySmartsheetProse body={block.body} />
      </CaseStudySmartsheetSpineSection>
      <div className="case-study-smartsheet-pivot-media">
        <CaseStudyMediaBlock
          label={block.media.label}
          src={block.media.src}
          videoSrc={block.media.videoSrc}
          embedSrc={block.media.embedSrc}
          poster={block.media.poster}
          caption={block.media.caption}
          aspectRatio={block.media.aspectRatio}
          width={block.media.width}
        />
      </div>
    </section>
  );
}

function CaseStudySmartsheetImpactBlock({ block }: { block: Extract<CaseStudyBlock, { type: "impact" }> }) {
  return (
    <div className="case-study-spine-impact font-sans-preview">
      <p className="case-study-spine-impact-statement">{preventTextOrphans(block.statement)}</p>
      {block.outcomes.length ? (
        <ul className="case-study-spine-impact-outcomes">
          {block.outcomes.map((item) => (
            <li key={item.title}>
              <span className="case-study-spine-impact-number">{item.number}</span>
              <p>{preventTextOrphans(`${item.title} — ${item.body}`)}</p>
            </li>
          ))}
        </ul>
      ) : null}
      {block.footnote ? <p>{preventTextOrphans(block.footnote)}</p> : null}
    </div>
  );
}

function CaseStudySmartsheetBlocks({
  overview,
  blocks,
  useResourceManagementScaffold = false,
}: {
  overview?: CaseStudyOverview;
  blocks: CaseStudyBlock[];
  useResourceManagementScaffold?: boolean;
}) {
  const spotlightBlock = blocks.find(
    (block): block is Extract<CaseStudyBlock, { type: "spotlight" }> => block.type === "spotlight",
  );
  const impactBlock = blocks.find(
    (block): block is Extract<CaseStudyBlock, { type: "impact" }> => block.type === "impact",
  );
  const specSamplesBlock = blocks.find(
    (block): block is Extract<CaseStudyBlock, { type: "specSamples" }> => block.type === "specSamples",
  );

  function renderPivotBand() {
    if (useResourceManagementScaffold || !spotlightBlock) {
      return null;
    }

    return (
      <section key="smartsheet-pivot-band" className="case-study-smartsheet-pivot-band" aria-label="Ambiguity">
        <CaseStudySmartsheetPivotSpotlightSection block={spotlightBlock} />
      </section>
    );
  }

  function renderImpactSection() {
    if (!impactBlock) {
      return null;
    }

    return (
      <CaseStudySmartsheetSpineSection key="smartsheet-reflection" label={impactBlock.label}>
        <CaseStudySmartsheetImpactBlock block={impactBlock} />
      </CaseStudySmartsheetSpineSection>
    );
  }

  if (useResourceManagementScaffold) {
    return (
      <>
        {overview ? (
          <>
            <CaseStudySmartsheetSpineSection label="Context">
              <CaseStudyOverviewBlock overview={overview} subtleCopy hideDetails />
            </CaseStudySmartsheetSpineSection>
            <CaseStudyResourceManagementPeopleBento />
          </>
        ) : null}

        {blocks.map((block, index) => {
          if (block.type === "text") {
            if (block.title === "Creating demand") {
              return (
                <section key={`${block.title}-${index}`} className="case-study-rm-demand-band case-study-block" aria-label={block.title}>
                  <CaseStudySmartsheetSpineSection label={block.title}>
                    <CaseStudySmartsheetProse body={block.body} />
                  </CaseStudySmartsheetSpineSection>
                  <div className="case-study-structured-media case-study-rm-video-media case-study-block">
                    <CaseStudyMediaBlock
                      label="Resource Management workload schedule walkthrough"
                      embedSrc="https://www.youtube.com/embed/cxlCmjKvVC8"
                      width="large"
                    />
                  </div>
                </section>
              );
            }

            return (
              <Fragment key={`${block.title}-${index}`}>
                <CaseStudySmartsheetSpineSection label={block.title ?? "Section"}>
                  <CaseStudySmartsheetProse body={block.body} />
                </CaseStudySmartsheetSpineSection>
                {block.title === "Customer retention" ? (
                  <div className="case-study-structured-media case-study-block">
                    <CaseStudySmartsheetFullMedia
                      label="Resource Management advanced report integration"
                      src="/work/resource-management-integration/advanced-report.jpg"
                      srcSet="/work/resource-management-integration/advanced-report.jpg 2400w, /work/resource-management-integration/advanced-report-2x.jpg 3360w"
                      sizes="(max-width: 1720px) calc(100vw - 40px), 1680px"
                    />
                  </div>
                ) : block.title === "Inherited strategy" ? (
                  <div className="case-study-structured-media case-study-block">
                    <CaseStudySmartsheetImageSequence
                      label="Resource Management in Smartsheet global navigation"
                      frames={resourceManagementArmsFrames}
                    />
                  </div>
                ) : block.title === "Visibility and vision" ? (
                  <div className="case-study-structured-media case-study-block">
                    <CaseStudySmartsheetFullMedia
                      label="Resource Management upsell experience"
                      src="/work/resource-management-integration/arms-upsell.jpg"
                      srcSet="/work/resource-management-integration/arms-upsell.jpg 2400w, /work/resource-management-integration/arms-upsell-2x.jpg 3360w"
                      sizes="(max-width: 1720px) calc(100vw - 40px), 1680px"
                    />
                    <CaseStudySmartsheetFullMedia
                      label="Resource Management self-serve setup experience"
                      src="/work/resource-management-integration/self-serve.jpg"
                      srcSet="/work/resource-management-integration/self-serve.jpg 2400w, /work/resource-management-integration/self-serve-2x.jpg 3360w"
                      sizes="(max-width: 1720px) calc(100vw - 40px), 1680px"
                    />
                    <CaseStudySmartsheetFullMedia
                      label="Resource Management scenario planning experience"
                      src="/work/resource-management-integration/scenario-planning.jpg"
                      srcSet="/work/resource-management-integration/scenario-planning.jpg 2400w, /work/resource-management-integration/scenario-planning-2x.jpg 3360w"
                      sizes="(max-width: 1720px) calc(100vw - 40px), 1680px"
                    />
                  </div>
                ) : (
                  <div className="case-study-structured-media case-study-block">
                    <CaseStudySmartsheetFullMedia label={`${block.title ?? "Section"} placeholder`} placeholder />
                  </div>
                )}
              </Fragment>
            );
          }

          if (block.type === "impact") {
            return (
              <CaseStudySmartsheetSpineSection key={`${block.label}-${index}`} label={block.label}>
                <CaseStudySmartsheetImpactBlock block={block} />
              </CaseStudySmartsheetSpineSection>
            );
          }

          return null;
        })}
      </>
    );
  }

  return (
    <>
      {overview ? (
        <CaseStudySmartsheetSpineSection label="Context">
          <CaseStudyOverviewBlock overview={overview} subtleCopy hideDetails />
        </CaseStudySmartsheetSpineSection>
      ) : null}
      {overview ? useResourceManagementScaffold ? (
        <div className="case-study-structured-media case-study-block">
          <CaseStudySmartsheetFullMedia label="Resource Management context placeholder" placeholder />
        </div>
      ) : (
        <section className="case-study-smartsheet-legacy-band case-study-block" aria-label="Legacy report">
          <div className="case-study-smartsheet-legacy-media">
            <CaseStudySmartsheetFullMedia
              label="Legacy report toolbar limitation"
              src="/work/smartsheet-reports/legacy-report-fast.webp"
              className="is-legacy-report-ui"
            />
            <p className="case-study-smartsheet-legacy-statement font-sans-preview">
              {preventTextOrphans("Only admins could edit the toolbar in the legacy report, while collaborators were completely shut out.")}
            </p>
          </div>
        </section>
      ) : null}

      {blocks.map((block, index) => {
        const previousBlock = blocks[index - 1];
        if (block.type === "comparison") {
          return null;
        }

        const nextBlock = blocks[index + 1];

        if (block.type === "text" && block.title === "More than a reskin" && nextBlock?.type === "problemCards") {
          return null;
        }

        if (block.type === "problemCards" && previousBlock?.type === "text" && previousBlock.title === "More than a reskin") {
          const pullingBlock = blocks.find(
            (candidate): candidate is Extract<CaseStudyBlock, { type: "split" }> =>
              candidate.type === "split" && candidate.title === "Pulling the configuration model apart",
          );

          return pullingBlock ? (
            <Fragment key="smartsheet-paradigm-and-platform-ambiguity">
              <CaseStudySmartsheetPullingSection
                block={pullingBlock}
                label="New paradigm"
                body={smartsheetExplorationCopy}
                mediaMode="placeholder"
                mediaItems={useResourceManagementScaffold ? undefined : [
                  {
                    label: "Source data controls and display controls",
                    src: "/work/smartsheet-reports/paradigm-1-fast.webp",
                  },
                ]}
              />
              {renderPivotBand()}
            </Fragment>
          ) : null;
        }

        if (block.type === "split" && block.title === "Pulling the configuration model apart") {
          return null;
        }

        if (block.type === "stepFlow" && previousBlock?.type === "split" && previousBlock.title === "Pulling the configuration model apart") {
          return null;
        }

        if (block.type === "split" && block.title === "Aligning with nascent capabilities") {
          return (
            <Fragment key={`${block.title}-${index}`}>
              <CaseStudySmartsheetViewPrimitiveSection
                specSamplesBlock={specSamplesBlock}
                usePlaceholderOnly={useResourceManagementScaffold}
              />
              {renderImpactSection()}
            </Fragment>
          );
        }

        if (block.type === "split" && block.title === "Contributing new features") {
          return null;
        }

        if (
          block.type === "specSamples" ||
          block.type === "spotlight" ||
          block.type === "impact"
        ) {
          return null;
        }

        const label = getSmartsheetSpineLabel(block);

        if (!label) {
          return <CaseStudyBlockView key={`${block.type}-${index}`} block={block} />;
        }

        if (block.type === "split") {
          return (
            <CaseStudySmartsheetSpineSection key={`${block.title}-${index}`} label={label} contentClassName="is-media">
              <CaseStudySmartsheetSplitBlock block={block} />
            </CaseStudySmartsheetSpineSection>
          );
        }

        if (block.type === "stepFlow") {
          return (
            <CaseStudySmartsheetSpineSection key={`${block.type}-${index}`} label={label} contentClassName="is-wide">
              <CaseStudyStepFlowBlock block={block} showHeader={false} />
            </CaseStudySmartsheetSpineSection>
          );
        }

        if (block.type === "text") {
          return (
            <CaseStudySmartsheetSpineSection key={`${block.title}-${index}`} label={label}>
              <CaseStudySmartsheetProse body={block.body} />
            </CaseStudySmartsheetSpineSection>
          );
        }

        return <CaseStudyBlockView key={`${block.type}-${index}`} block={block} />;
      })}
    </>
  );
}

function CaseStudyStructuredShowcaseGrid({
  block,
  showTitles = true,
}: {
  block: Extract<CaseStudyBlock, { type: "showcase" }>;
  showTitles?: boolean;
}) {
  return (
    <div className="case-study-structured-image-grid">
      {block.items.map((item, index) => (
        <figure key={`${item.title}-${item.src}`} className="case-study-structured-image-card">
          <div className="case-study-structured-image-media">
            <img
              src={item.src}
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority={index < 2 ? "auto" : "low"}
            />
          </div>
          <figcaption className={showTitles ? undefined : "is-description-only"}>
            {showTitles ? <h3>{preventTextOrphans(item.title)}</h3> : null}
            <p className={`${showTitles ? "" : "case-study-heading-summary "}font-sans-preview`}>{preventTextOrphans(item.description)}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function CaseStudyMetLifeSnapshotBlocks({
  overview,
  blocks,
}: {
  overview?: CaseStudyOverview;
  blocks: CaseStudyBlock[];
}) {
  const showcaseBlock = blocks.find((block): block is Extract<CaseStudyBlock, { type: "showcase" }> => block.type === "showcase");

  return overview ? (
    <CaseStudySmartsheetSpineSection label="Context" contentClassName="case-study-metlife-snapshot-spine">
      <div className="case-study-metlife-snapshot-content">
        <CaseStudyOverviewBlock overview={overview} subtleCopy hideDetails />
        {showcaseBlock ? <CaseStudyStructuredShowcaseGrid block={showcaseBlock} showTitles={false} /> : null}
      </div>
    </CaseStudySmartsheetSpineSection>
  ) : null;
}

function CaseStudyBlockView({ block }: { block: CaseStudyBlock }) {
  if (block.type === "metadata") {
    return (
      <dl className="case-study-meta case-study-block case-study-block-content font-sans-preview">
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
        {block.eyebrow ? <p className="case-study-section-eyebrow font-sans-preview">{block.eyebrow}</p> : null}
        <h2>{preventTextOrphans(block.title)}</h2>
        <CaseStudySectionBody body={block.body} />
      </article>
      {block.mediaSide === "left" ? null : media}
    </section>
  );
}

function CaseStudyNextUpSection({
  related,
  style,
}: {
  related: WorkItem[];
  style?: CSSProperties;
}) {
  const routeableItems = related.filter((item) => !item.isComingSoon);
  const fallbackItems = related.filter((item) => item.isComingSoon);
  const nextItems = [...routeableItems, ...fallbackItems].slice(0, 2);

  if (!nextItems.length) {
    return null;
  }

  return (
    <section className="case-study-next-up case-study-block staged-work-rise" style={style} aria-label="Up next">
      <div className="case-study-next-up-rail">
        <h2 className="font-sans-preview">Up next</h2>
      </div>
      <div className="case-study-next-up-grid">
        {nextItems.map((item) => {
          const href = item.isComingSoon ? undefined : `/work/${item.slug}`;
          const cardClassName = `case-study-next-up-card is-${item.slug}`;
          const cardContent = (
            <>
              <figure className="case-study-next-up-media">
                <img
                  src={item.upNextImage ?? item.thumbnailImage ?? item.featuredImage ?? item.heroImage ?? item.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{
                    objectPosition: item.slug === "smartsheet-reports" || item.slug === "resource-management-integration" ? "70% 18%" : undefined,
                  }}
                />
              </figure>
              <div className="case-study-next-up-copy">
                <div className="case-study-next-up-title-row">
                  <h3>{preventTextOrphans(item.title)}</h3>
                  {href ? (
                    <span className="case-study-next-up-arrow">
                      <ArrowIcon />
                    </span>
                  ) : null}
                </div>
                <p className="font-sans-preview">{preventTextOrphans(item.summary)}</p>
                {item.cardMeta ? (
                  <p className="case-study-next-up-meta font-sans-preview">
                    <ProjectMeta value={item.cardMeta} />
                  </p>
                ) : null}
              </div>
            </>
          );

          if (!href) {
            return (
              <article key={item.slug} className={`${cardClassName} is-disabled`}>
                {cardContent}
              </article>
            );
          }

          return (
            <Link key={item.slug} href={href} className={cardClassName}>
              {cardContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function CaseStudyPage({ project, related }: CaseStudyPageProps) {
  const isSmartsheetReportsCaseStudy = project.slug === "smartsheet-reports";
  const isResourceManagementCaseStudy = project.slug === "resource-management-integration";
  const isMetLifeMexicoCaseStudy = project.slug === "metlife-mexico";
  const usesSmartsheetTemplate = isSmartsheetReportsCaseStudy || isResourceManagementCaseStudy;
  const isStructuredCaseStudy = usesSmartsheetTemplate || isMetLifeMexicoCaseStudy;
  const usesPlaceholderHero = false;
  const [fontsReady, setFontsReady] = useState(false);
  const heroImageRef = useRef<HTMLImageElement | null>(null);
  const sequenceReady = fontsReady;

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
    const warmImageAssets = project.warmImageAssets ?? [];
    const warmVideoAssets = project.warmVideoAssets ?? [];

    if (!warmImageAssets.length && !warmVideoAssets.length) {
      return undefined;
    }

    const timers: number[] = [];
    const warmedImages: HTMLImageElement[] = [];
    const warmedLinks: HTMLLinkElement[] = [];

    function schedule(callback: () => void, delay: number) {
      const timer = window.setTimeout(callback, delay);
      timers.push(timer);
    }

    function warmImage(src: string, fetchPriority: "auto" | "low") {
      const image = new window.Image();
      (image as HTMLImageElement & { fetchPriority?: "auto" | "low" }).fetchPriority = fetchPriority;
      image.decoding = "async";
      image.loading = "eager";
      image.src = src;
      warmedImages.push(image);
      image.decode?.().catch(() => undefined);
    }

    function warmVideo(src: string) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.type = "video/mp4";
      link.href = src;
      document.head.appendChild(link);
      warmedLinks.push(link);
    }

    warmImageAssets.forEach((src, index) => {
      schedule(() => warmImage(src, index < 2 ? "auto" : "low"), 520 + index * 90);
    });

    warmVideoAssets.forEach((src, index) => {
      schedule(() => warmVideo(src), 900 + index * 220);
    });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      warmedImages.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
      warmedLinks.forEach((link) => link.remove());
    };
  }, [project.warmImageAssets, project.warmVideoAssets]);

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
  const projectTagParts = project.tag.split(" • ");
  const structuredHeaderDate = projectTagParts[projectTagParts.length - 1] ?? project.tag;
  const headerMeta = project.caseStudyMeta ?? project.cardMeta ?? project.tag;
  const structuredHeaderMeta = project.caseStudyMeta ?? project.cardMeta ?? structuredHeaderDate;

  if (isDeckCaseStudy && project.deckSlides) {
    return (
      <div className={`case-study-page case-study-deck-page ${sequenceReady ? "sequence-ready" : ""}`}>
        <SiteNav showBack />

        <main className="case-study-main case-study-deck-main">
          <section className="case-study-hero-section case-study-deck-title-section" aria-label={title}>
            <div className="case-study-top">
              <header className="work-heading case-study-heading">
                <div
                  className={`case-study-top-meta font-sans-preview ${sequenceReady ? "staged-work-rise" : "opacity-0"}`}
                  style={sequenceReady ? { "--rise-delay": "90ms", "--rise-duration": "0.86s", "--rise-distance": "12px", "--rise-blur": "0px", "--rise-animation": "work-rise-in-clean" } as CSSProperties : undefined}
                >
                  <ProjectMeta value={headerMeta} />
                </div>
                <h1>
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
            onHeroImageLoad={() => undefined}
            onHeroImageError={() => undefined}
          />

          <CaseStudyNextUpSection related={related} style={relatedStyle} />
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
    <div className={`case-study-page ${isStructuredCaseStudy ? "is-structured-case-study" : ""} ${usesSmartsheetTemplate ? "is-smartsheet-reports" : ""} ${isResourceManagementCaseStudy ? "is-resource-management-integration" : ""} ${isMetLifeMexicoCaseStudy ? "is-metlife-mexico" : ""} ${sequenceReady ? "sequence-ready" : ""}`}>
      <SiteNav showBack />

      <main className="case-study-main">
        <section className="case-study-hero-section" aria-label={title}>
          <div className="case-study-top">
            <header className="work-heading case-study-heading">
              <div
                className={`case-study-top-meta font-sans-preview ${sequenceReady ? "staged-work-rise" : "opacity-0"}`}
                style={sequenceReady ? { "--rise-delay": "90ms", "--rise-duration": "0.86s", "--rise-distance": "12px", "--rise-blur": "0px", "--rise-animation": "work-rise-in-clean" } as CSSProperties : undefined}
              >
                {isStructuredCaseStudy ? (
                  <span className="case-study-header-eyebrow">
                    <ProjectMeta value={structuredHeaderMeta} />
                  </span>
                ) : (
                  <ProjectMeta value={headerMeta} />
                )}
              </div>
              <h1>
                <span className={`work-title-reveal ${sequenceReady ? "animate-reveal" : "opacity-0"}`}>
                  {title}
                </span>
              </h1>
            </header>
          </div>

          <figure
            className={`case-study-hero case-study-hero-full ${usesPlaceholderHero ? "is-placeholder" : ""} ${sequenceReady ? "case-study-hero-reveal" : "opacity-0"}`}
            style={heroStyle}
            aria-label={usesPlaceholderHero ? "Resource Management hero placeholder" : undefined}
          >
            {usesPlaceholderHero ? null : (
              <Image
                ref={heroImageRef}
                src={project.heroImage ?? project.image}
                alt=""
                fill
                preload
                sizes="(max-width: 1720px) calc(100vw - 40px), 1680px"
                quality={isResourceManagementCaseStudy ? 95 : 82}
                unoptimized={(project.heroImage ?? project.image).endsWith(".webp")}
              />
            )}
          </figure>
        </section>

        <section className="case-study-body" aria-label="Project details">
          {usesSmartsheetTemplate ? (
            <CaseStudySmartsheetBlocks
              overview={overview}
              blocks={caseStudyBlocks}
              useResourceManagementScaffold={isResourceManagementCaseStudy}
            />
          ) : isMetLifeMexicoCaseStudy ? (
            <CaseStudyMetLifeSnapshotBlocks overview={overview} blocks={caseStudyBlocks} />
          ) : (
            <>
              {overview ? (
                <CaseStudyOverviewBlock
                  overview={overview}
                />
              ) : null}
              {hasCaseStudyBlocks ? caseStudyBlocks.map((block, index) => (
                <CaseStudyBlockView key={`${block.type}-${index}`} block={block} />
              )) : null}
            </>
          )}
        </section>

        <CaseStudyNextUpSection related={related} style={relatedStyle} />
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
