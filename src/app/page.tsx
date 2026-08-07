"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContactSection } from "@/components/ContactSection";
import { ProjectMeta } from "@/components/ProjectMeta";
import { SiteNav } from "@/components/SiteNav";
import { allWork } from "@/content/work";
import { preventTextOrphans } from "@/lib/typography";

const featuredHomeProjectSlugs = ["smartsheet-reports", "metlife-mexico"];
const homeFeaturedProjects = featuredHomeProjectSlugs
  .map((slug) => allWork.find((project) => project.slug === slug))
  .filter((project): project is (typeof allWork)[number] => Boolean(project));

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z" />
    </svg>
  );
}

function getProjectImage(project: (typeof allWork)[number]) {
  return project.homepageImage ?? project.thumbnailImage ?? project.featuredImage ?? project.heroImage ?? project.image;
}

export default function Home() {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    document.fonts.ready
      .then(() => new Promise((r) => setTimeout(r, 140)))
      .then(() => setFontsReady(true));
  }, []);

  return (
    <main className={`home-page flex min-h-screen flex-col items-center bg-black pt-[120px] text-white ${fontsReady ? "sequence-ready" : ""}`}>
      <div className="canvas flex flex-col items-center gap-5">
        <SiteNav />

        <section
          data-section="intro"
          className="flex w-full max-w-[900px] flex-col items-center gap-[30px] overflow-hidden p-5 text-center"
        >
          <h1 className="home-hero-title display-serif-type w-full font-[family-name:var(--font-display-serif)] text-[36px] font-normal leading-[44px] tracking-[0] text-white min-[810px]:text-[54px] min-[810px]:leading-[62px]">
            <span className={fontsReady ? "animate-reveal" : "opacity-0"}>
              Graham Bunt is a <em className="home-hero-emphasis">Product Designer</em>
            </span>
            <span
              className={fontsReady ? "animate-reveal" : "opacity-0"}
              style={fontsReady ? { animationDelay: "100ms" } : undefined}
            >
              based in Salt Lake City, Utah.
            </span>
          </h1>
        </section>

        <section className="flex w-full flex-col items-center gap-[60px] overflow-hidden px-5 py-[60px]">
          <div
            className="home-featured-work-grid staged-work-rise"
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
            {homeFeaturedProjects.map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`} className="case-study-next-up-card home-featured-work-card">
                <figure className="case-study-next-up-media">
                  <Image
                    src={getProjectImage(project)}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 809px) calc(100vw - 40px), (max-width: 1720px) calc((100vw - 60px) / 2), 830px"
                    loading={project.slug === "smartsheet-reports" ? "eager" : "lazy"}
                    fetchPriority={project.slug === "smartsheet-reports" ? "high" : "auto"}
                    quality={92}
                    style={{
                      objectPosition: project.slug === "smartsheet-reports" ? "70% 18%" : "50% 50%",
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
                  <p className="font-sans-preview">{preventTextOrphans(project.summary)}</p>
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

        <ContactSection />

        <footer className="work-footer">
          <div>
            <p>Graham Bunt</p>
            <p>©2026</p>
          </div>
        </footer>
      </div>
      <div aria-hidden="true" className="viewport-bottom-blur" />
    </main>
  );
}
