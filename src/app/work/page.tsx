"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { AnimatedDescription } from "@/components/AnimatedDescription";
import { ProjectListSection } from "@/components/ProjectListSection";
import { ProjectMeta } from "@/components/ProjectMeta";
import { SiteNav } from "@/components/SiteNav";
import { featuredWork, otherWork } from "@/content/work";
import { preventTextOrphans } from "@/lib/typography";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z" />
    </svg>
  );
}

function getWorkListingMeta(tag: string) {
  return tag;
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

    const caseStudyHero = featuredWork.heroImage ?? featuredWork.image;
    const heroPreload = new window.Image();
    heroPreload.src = caseStudyHero;

    document.fonts.ready
      .then(() => new Promise((resolve) => setTimeout(resolve, 250)))
      .then(() => setFontsReady(true));
  }, []);

  const featuredDelay = {
    "--rise-delay": "520ms",
    "--rise-duration": "1.08s",
    "--rise-blur": "0px",
    "--rise-animation": "work-rise-in-clean",
  } as CSSProperties;

  const allProjectsDelay = {
    "--rise-delay": "640ms",
    "--rise-duration": "0.88s",
    "--rise-blur": "0px",
    "--rise-animation": "work-rise-in-clean",
  } as CSSProperties;

  return (
    <div className={`work-page ${sequenceReady ? "sequence-ready" : ""}`}>
      <SiteNav />

      <main className="work-main">
        <section className="work-products" aria-label="Projects">
          <header className="work-heading">
            <h1 className="font-[family-name:var(--font-display-serif)]">
              <span className={`work-title-reveal ${fontsReady ? "animate-reveal" : "opacity-0"}`}>
                <span>Select</span> work
              </span>
            </h1>
            <AnimatedDescription
              ready={fontsReady}
              delay="260ms"
              text="Product designs focused on simplicity, usefulness, and scale."
            />
          </header>

          <Link
            href={`/work/${featuredWork.slug}`}
            className="work-featured staged-work-rise"
            style={featuredDelay}
          >
            <div className="work-featured-media">
              <Image
                src={featuredWork.featuredImage ?? featuredWork.image}
                alt=""
                fill
                priority
                sizes="(max-width: 640px) calc(100vw - 40px), 560px"
                quality={92}
                onLoad={() => setFeaturedImageReady(true)}
                onError={() => setFeaturedImageReady(true)}
              />
            </div>
            <div className="work-featured-title">
              <div>
                <h2>{preventTextOrphans(featuredWork.title)}</h2>
                <p>
                  <ProjectMeta value={getWorkListingMeta(featuredWork.tag)} />
                </p>
              </div>
              <span className="work-featured-arrow">
                <ArrowIcon />
              </span>
            </div>
          </Link>

          <ProjectListSection
            title="All projects"
            items={otherWork.map((project) => ({
              title: project.title,
              description: getWorkListingMeta(project.tag),
              href: project.isComingSoon ? undefined : `/work/${project.slug}`,
              image: project.thumbnailImage ?? project.featuredImage ?? project.heroImage ?? project.image,
              imagePosition: project.slug === "smartsheet-reports" ? "70% 18%" : undefined,
              statusLabel: project.isComingSoon ? "Coming soon" : undefined,
            }))}
            className="staged-work-rise"
            style={allProjectsDelay}
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
