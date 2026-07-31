/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { AnimatedDescription } from "@/components/AnimatedDescription";
import { SiteNav } from "@/components/SiteNav";
import { allWork } from "@/content/work";
import { preventTextOrphans } from "@/lib/typography";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z" />
    </svg>
  );
}

function getProjectImage(project: (typeof allWork)[number]) {
  return project.thumbnailImage ?? project.featuredImage ?? project.heroImage ?? project.image;
}

export default function WorkPage() {
  const [fontsReady, setFontsReady] = useState(false);
  const [featuredImageReady, setFeaturedImageReady] = useState(false);
  const sequenceReady = fontsReady && featuredImageReady;

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const firstProjectImage = getProjectImage(allWork[0]);
    const imagePreload = new window.Image();
    imagePreload.onload = () => setFeaturedImageReady(true);
    imagePreload.onerror = () => setFeaturedImageReady(true);
    imagePreload.src = firstProjectImage;

    document.fonts.ready
      .then(() => new Promise((resolve) => setTimeout(resolve, 120)))
      .then(() => setFontsReady(true));
  }, []);

  const allProjectsDelay = {
    "--rise-delay": "220ms",
    "--rise-duration": "0.58s",
    "--rise-distance": "8px",
    "--rise-blur": "0px",
    "--rise-animation": "quiet-rise-in",
  } as CSSProperties;

  return (
    <div className={`work-page ${sequenceReady ? "sequence-ready" : ""}`}>
      <SiteNav />

      <main className="work-main">
        <section className="work-products" aria-label="Projects">
          <header className="work-heading">
            <h1 className="display-serif-type font-[family-name:var(--font-display-serif)]">
              <span className={`work-title-reveal ${sequenceReady ? "animate-reveal" : "opacity-0"}`}>
                <span>Select</span> work
              </span>
            </h1>
            <AnimatedDescription
              ready={sequenceReady}
              delay="140ms"
              text="Product designs focused on simplicity, usefulness, and enterprise scale."
            />
          </header>

          <section className="work-project-card-section staged-work-rise" style={allProjectsDelay} aria-label="Projects">
            <div className="work-project-card-grid">
              {allWork.map((project) => {
                const href = project.isComingSoon ? undefined : `/work/${project.slug}`;
                const cardContent = (
                  <>
                    <figure className="case-study-next-up-media">
                      <img
                        src={getProjectImage(project)}
                        alt=""
                        loading={project.slug === allWork[0].slug ? "eager" : "lazy"}
                        decoding="async"
                        style={{
                          objectPosition: project.slug === "smartsheet-reports" ? "70% 18%" : undefined,
                        }}
                      />
                    </figure>
                    <div className="case-study-next-up-copy">
                      <div className="case-study-next-up-title-row">
                        <h3>{preventTextOrphans(project.title)}</h3>
                        {href ? (
                          <span className="case-study-next-up-arrow">
                            <ArrowIcon />
                          </span>
                        ) : null}
                      </div>
                      <p className="font-sans-preview">{preventTextOrphans(project.summary)}</p>
                    </div>
                  </>
                );

                if (!href) {
                  return (
                    <article key={project.slug} className="case-study-next-up-card work-project-card is-disabled">
                      {cardContent}
                    </article>
                  );
                }

                return (
                  <Link key={project.slug} href={href} className="case-study-next-up-card work-project-card">
                    {cardContent}
                  </Link>
                );
              })}
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
