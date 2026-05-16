/* eslint-disable @next/next/no-img-element */
"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatedDescription } from "@/components/AnimatedDescription";
import { ProjectListSection } from "@/components/ProjectListSection";
import { SiteNav } from "@/components/SiteNav";
import type { WorkItem } from "@/content/work";

type CaseStudy = WorkItem;

type CaseStudyPageProps = {
  project: CaseStudy;
  related: WorkItem[];
};

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

  return (
    <div className={`case-study-page ${fontsReady ? "sequence-ready" : ""}`}>
      <SiteNav showBack />

      <main className="case-study-main">
        <section className="case-study-hero-section" aria-label={project.title}>
          <div className="case-study-top">
            <div
              className={`case-study-pill font-inter-display ${fontsReady ? "staged-work-rise" : "opacity-0"}`}
              style={fontsReady ? { "--rise-delay": "90ms", "--rise-duration": "0.86s", "--rise-distance": "12px", "--rise-blur": "0px", "--rise-animation": "work-rise-in-clean" } as CSSProperties : undefined}
            >
              {project.tag}
            </div>
            <header className="work-heading case-study-heading">
              <h1 className="font-[family-name:var(--font-instrument-serif)]">
                <span className={`work-title-reveal ${fontsReady ? "animate-reveal" : "opacity-0"}`}>
                  {project.title}
                </span>
              </h1>
              <AnimatedDescription ready={fontsReady} delay="260ms" text={project.summary} />
            </header>
          </div>

          <figure className={`case-study-hero ${fontsReady ? "case-study-hero-reveal" : "opacity-0"}`} style={heroStyle}>
            <img src={project.image} alt="" />
          </figure>
        </section>

        <section className="case-study-gallery staged-work-rise" style={galleryStyle} aria-label="Project details">
          {project.gallery.map((item, index) => (
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
