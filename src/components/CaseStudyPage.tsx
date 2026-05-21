/* eslint-disable @next/next/no-img-element */
"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
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

const overviewCopyStyle: CSSProperties = {
  color: "#ffffff",
  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
  fontSize: "clamp(24px, 2.2vw, 32px)",
  fontWeight: 400,
  lineHeight: 1.28,
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

const overviewParagraphSpeeds = [1, 1.18];
const narrativeParagraphSpeeds = [1, 1.25];

function getBlockWidthClass(width: CaseStudyBlockWidth = "content") {
  return `case-study-block-${width}`;
}

function CaseStudyMediaBlock({
  label,
  src,
  caption,
  aspectRatio,
  fill = false,
  width = "content",
}: {
  label: string;
  src?: string;
  caption?: string;
  aspectRatio?: number;
  fill?: boolean;
  width?: CaseStudyBlockWidth;
}) {
  return (
    <figure
      className={`case-study-placeholder case-study-block ${getBlockWidthClass(width)}`}
      style={fill ? undefined : { aspectRatio: aspectRatio ?? 4 / 3 }}
    >
      {src ? <img src={src} alt="" /> : <span className="font-inter-display">{label}</span>}
      {caption ? <figcaption className="font-inter-display">{caption}</figcaption> : null}
    </figure>
  );
}

function CaseStudyViewGridBlock({ block }: { block: Extract<CaseStudyBlock, { type: "viewGrid" }> }) {
  return (
    <section className={`case-study-view-grid case-study-block ${getBlockWidthClass(block.width)}`} aria-label="Report views">
      {block.items.map((item) => (
        <article key={item.kind} className="case-study-view-card">
          <div className={`case-study-view-card-visual is-${item.kind}`} aria-hidden="true">
            {Array.from({ length: 6 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
          <p className="font-inter-display">{item.title}</p>
        </article>
      ))}
    </section>
  );
}

function CaseStudySectionBody({ body }: { body: string[] }) {
  return (
    <div className="case-study-section-body">
      {body.map((paragraph) => (
        <p key={paragraph} className="font-inter-display">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function CaseStudyTextBlock({ block }: { block: Extract<CaseStudyBlock, { type: "text" }> }) {
  return (
    <article className={`case-study-text-section case-study-block ${getBlockWidthClass(block.width)}`}>
      {block.eyebrow ? <p className="case-study-section-eyebrow font-inter-display">{block.eyebrow}</p> : null}
      {block.title ? <h2>{block.title}</h2> : null}
      <CaseStudySectionBody body={block.body} />
    </article>
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
      <div className="case-study-overview-copy">
        <ScrollRevealText
          text={overview.body}
          style={overviewCopyStyle}
          paragraphSpeeds={overviewParagraphSpeeds}
        />
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

  if (block.type === "narrative") {
    return <CaseStudyNarrativeBlock block={block} />;
  }

  if (block.type === "media") {
    return (
      <CaseStudyMediaBlock
        label={block.label}
        src={block.src}
        caption={block.caption}
        aspectRatio={block.aspectRatio}
        width={block.width}
      />
    );
  }

  if (block.type === "viewGrid") {
    return <CaseStudyViewGridBlock block={block} />;
  }

  const isFeatureSplit = block.variant === "feature";
  const media = (
    <CaseStudyMediaBlock
      label={block.media.label}
      src={block.media.src}
      caption={block.media.caption}
      aspectRatio={block.media.aspectRatio}
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
  const relatedRowRefs = useRef<Array<HTMLAnchorElement | null>>([]);

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
    const rows = relatedRowRefs.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const updateRows = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const start = viewportHeight * 0.98;
      const end = viewportHeight * 0.72;

      rows.forEach((row) => {
        if (!row) return;

        if (prefersReducedMotion) {
          row.style.setProperty("--project-scroll-x", "0px");
          return;
        }

        const rect = row.getBoundingClientRect();
        const rawProgress = (start - rect.top) / (start - end);
        const progress = Math.min(1, Math.max(0, rawProgress));
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const offset = (1 - easedProgress) * 24;

        row.style.setProperty("--project-scroll-x", `${offset.toFixed(2)}px`);
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateRows);
    };

    updateRows();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const heroStyle = {
    "--rise-delay": "700ms",
    "--rise-duration": "1.72s",
    "--rise-distance": "80px",
  } as CSSProperties;

  const galleryStyle = {
    "--rise-delay": "1080ms",
    "--rise-duration": "1.08s",
    "--rise-distance": "40px",
    "--rise-blur": "0px",
    "--rise-animation": "work-rise-in-clean",
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

  return (
    <div className={`case-study-page ${fontsReady ? "sequence-ready" : ""}`}>
      <SiteNav showBack />

      <main className="case-study-main">
        <section className="case-study-hero-section" aria-label={title}>
          <div className="case-study-top">
            <header className="work-heading case-study-heading">
              <div
                className={`case-study-top-meta font-inter-display ${fontsReady ? "staged-work-rise" : "opacity-0"}`}
                style={fontsReady ? { "--rise-delay": "90ms", "--rise-duration": "0.86s", "--rise-distance": "12px", "--rise-blur": "0px", "--rise-animation": "work-rise-in-clean" } as CSSProperties : undefined}
              >
                <ProjectMeta value={project.tag} />
              </div>
              <h1 className="font-[family-name:var(--font-instrument-serif)]">
                <span className={`work-title-reveal ${fontsReady ? "animate-reveal" : "opacity-0"}`}>
                  {title}
                </span>
              </h1>
            </header>
          </div>

          <figure className={`case-study-hero case-study-hero-full ${fontsReady ? "case-study-hero-reveal" : "opacity-0"}`} style={heroStyle}>
            <img src={project.image} alt="" />
          </figure>
        </section>

        <section className="case-study-body staged-work-rise" style={galleryStyle} aria-label="Project details">
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
              href: `/work/${item.slug}`,
              image: item.image,
            }))}
            className="staged-work-rise"
            style={relatedStyle}
            rowRef={(node, index) => {
              relatedRowRefs.current[index] = node;
            }}
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
