"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ContactSection } from "@/components/ContactSection";
import { SiteNav } from "@/components/SiteNav";
import { projects } from "@/content/projects";

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
          <div className="flex w-full max-w-[1680px] flex-col gap-[30px] min-[810px]:flex-row min-[810px]:items-start min-[810px]:gap-5">
            {[0, 1, 2].map((colIndex) => {
              const isMiddle = colIndex === 1;
              const columnDelay = isMiddle ? "300ms" : "240ms";
              const columnDuration = isMiddle ? "0.68s" : "0.64s";
              const mobileColumnDelay = `${240 + colIndex * 40}ms`;

              return (
                <div
                  key={colIndex}
                  className="masonry-column staged-work-rise flex w-full flex-1 flex-col items-stretch gap-[30px]"
                  style={
                    {
                      "--rise-delay": columnDelay,
                      "--rise-duration": columnDuration,
                      "--rise-distance": "10px",
                      "--rise-animation": "quiet-rise-in",
                      "--rise-blur": "0px",
                      "--mobile-rise-delay": mobileColumnDelay,
                    } as CSSProperties
                  }
                >
                  {projects.slice(colIndex * 4, colIndex * 4 + 4).map((project, projectIndex) => {
                    const globalIndex = colIndex * 4 + projectIndex;
                    const shouldLoadEarly = globalIndex < 6;

                    return (
                      <figure key={project.slug} className="flex flex-col">
                        <div
                          className="relative overflow-hidden rounded-[10px] bg-white/10"
                          style={{
                            aspectRatio: project.aspectRatio,
                          }}
                        >
                          {project.src ? (
                            <Image
                              src={project.src}
                              alt=""
                              fill
                              className="object-cover object-center"
                              sizes="(max-width: 809px) calc(100vw - 40px), (max-width: 1720px) calc((100vw - 80px) / 3), 547px"
                              loading={shouldLoadEarly ? "eager" : "lazy"}
                              fetchPriority={globalIndex < 3 ? "high" : "auto"}
                              quality={92}
                            />
                          ) : null}
                        </div>
                      </figure>
                    );
                  })}
                </div>
              );
            })}
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
