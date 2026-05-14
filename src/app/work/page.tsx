/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    document.fonts.ready
      .then(() => new Promise((resolve) => setTimeout(resolve, 350)))
      .then(() => setFontsReady(true));
  }, []);

  const featuredDelay = {
    "--rise-delay": "520ms",
    "--rise-duration": "0.78s",
  } as CSSProperties;

  const allProjectsDelay = {
    "--rise-delay": "700ms",
    "--rise-duration": "0.72s",
  } as CSSProperties;

  return (
    <div className={`work-page ${fontsReady ? "sequence-ready" : ""}`}>
      <SiteNav />

      <main className="work-main">
        <section className="work-products" aria-label="Projects">
          <header className="work-heading">
            <h1 className="font-[family-name:var(--font-instrument-serif)]">
              <span className={fontsReady ? "animate-reveal" : "opacity-0"}>
                <em>Select</em> Work
              </span>
            </h1>
            <p
              className={`font-inter-display ${fontsReady ? "animate-reveal-compact" : "opacity-0"}`}
              style={fontsReady ? { animationDelay: "160ms" } : undefined}
            >
              Explore my portfolio — focused on minimal aesthetics and meaningful user experiences.
            </p>
          </header>

          <Link
            href={`/work/${featuredWork.slug}`}
            className="work-featured staged-rise"
            style={featuredDelay}
          >
            <div className="work-featured-media">
              <img src={featuredWork.image} alt="" />
            </div>
            <div className="work-featured-title">
              <div>
                <h2>{featuredWork.title}</h2>
                <p>{featuredWork.tag}</p>
              </div>
              <span className="work-featured-arrow">
                <ArrowIcon />
              </span>
            </div>
          </Link>

          <section className="work-all-projects staged-rise" style={allProjectsDelay}>
            <h3>All Projects</h3>
            <div className="work-project-list">
              {otherWork.map((project) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="work-project-row"
                >
                  <div className="work-project-row-bg" aria-hidden="true" />
                  <div className="work-project-row-content">
                    <img src={project.image} alt="" />
                    <div>
                      <p>{project.title}</p>
                      <p>{project.tag}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
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
