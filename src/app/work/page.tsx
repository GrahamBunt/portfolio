/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatedDescription } from "@/components/AnimatedDescription";
import { ProjectListSection } from "@/components/ProjectListSection";
import { ProjectMeta } from "@/components/ProjectMeta";
import { SiteNav } from "@/components/SiteNav";
import { featuredWork, otherWork } from "@/content/work";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z" />
    </svg>
  );
}

export default function WorkPage() {
  const [fontsReady, setFontsReady] = useState(false);
  const projectRowRefs = useRef<Array<HTMLAnchorElement | null>>([]);

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
    const rows = projectRowRefs.current;
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

  const featuredDelay = {
    "--rise-delay": "700ms",
    "--rise-duration": "1.62s",
    "--rise-blur": "0px",
    "--rise-animation": "work-rise-in-clean",
  } as CSSProperties;

  const allProjectsDelay = {
    "--rise-delay": "940ms",
    "--rise-duration": "1.08s",
    "--rise-blur": "0px",
    "--rise-animation": "work-rise-in-clean",
  } as CSSProperties;

  return (
    <div className={`work-page ${fontsReady ? "sequence-ready" : ""}`}>
      <SiteNav />

      <main className="work-main">
        <section className="work-products" aria-label="Projects">
          <header className="work-heading">
            <h1 className="font-[family-name:var(--font-instrument-serif)]">
              <span className={`work-title-reveal ${fontsReady ? "animate-reveal" : "opacity-0"}`}>
                <em>Select</em> work
              </span>
            </h1>
            <AnimatedDescription
              ready={fontsReady}
              delay="260ms"
              text="Product design focused on clarity, usefulness, and scale."
            />
          </header>

          <Link
            href={`/work/${featuredWork.slug}`}
            className="work-featured staged-work-rise"
            style={featuredDelay}
          >
            <div className="work-featured-media">
              <img src={featuredWork.image} alt="" />
            </div>
            <div className="work-featured-title">
              <div>
                <h2>{featuredWork.title}</h2>
                <p>
                  <ProjectMeta value={featuredWork.tag} />
                </p>
              </div>
              <span className="work-featured-arrow">
                <ArrowIcon />
              </span>
            </div>
          </Link>

          <ProjectListSection
            title="All Projects"
            items={otherWork.map((project) => ({
              title: project.title,
              description: project.tag,
              href: `/work/${project.slug}`,
              image: project.image,
            }))}
            className="staged-work-rise"
            style={allProjectsDelay}
            rowRef={(node, index) => {
              projectRowRefs.current[index] = node;
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
