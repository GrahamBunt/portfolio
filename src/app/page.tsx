"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ContactSection } from "@/components/ContactSection";
import { SiteNav } from "@/components/SiteNav";
import { SOCIAL_LINKS, SocialIcon } from "@/components/SocialIcon";
import { projects } from "@/content/projects";

export default function Home() {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    document.fonts.ready
      .then(() => new Promise((r) => setTimeout(r, 350)))
      .then(() => setFontsReady(true));
  }, []);

  // Tight unified sequence (fontsReady = t0):
  // H1 spans: 0-950ms / 100-1050ms
  // Social links and masonry share the Select Work blur/wipe rise; middle column trails slightly.

  return (
    <main className={`flex min-h-screen flex-col items-center bg-black py-[120px] text-white ${fontsReady ? "sequence-ready" : ""}`}>
      <div className="canvas flex flex-col items-center gap-5">
        <SiteNav />

        <section
          data-section="intro"
          className="flex w-full max-w-[900px] flex-col items-center gap-[30px] overflow-hidden p-5 text-center"
        >
          <h1 className="w-full font-[family-name:var(--font-instrument-serif)] text-[38px] leading-[46px] tracking-[0] text-white min-[810px]:text-[58px] min-[810px]:leading-[66px]">
            <span className={fontsReady ? "animate-reveal" : "opacity-0"}>
              Graham Bunt is a <em className="italic">Product Designer</em>
            </span>
            <span
              className={fontsReady ? "animate-reveal" : "opacity-0"}
              style={fontsReady ? { animationDelay: "100ms" } : undefined}
            >
              based in Salt Lake City, Utah.
            </span>
          </h1>
          <div
            className={`social-links ${fontsReady ? "animate-social-reveal" : "opacity-0"}`}
            style={fontsReady ? ({
              "--rise-delay": "260ms",
              "--rise-duration": "0.84s",
            } as CSSProperties) : undefined}
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="social-icon-button"
                aria-label={link.label}
                target="_blank"
                rel="noreferrer"
              >
                <span className="social-icon-glyph">
                  <SocialIcon icon={link.icon} />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="flex w-full flex-col items-center gap-[60px] overflow-hidden px-5 py-[60px]">
          <div className="flex w-full max-w-[1680px] flex-col gap-[30px] min-[810px]:flex-row min-[810px]:items-start min-[810px]:gap-5">
            {[0, 1, 2].map((colIndex) => {
              // Outer columns (0, 2) rise together; middle (1) trails slightly.
              const isMiddle = colIndex === 1;
              const columnDelay = isMiddle ? "840ms" : "680ms";
              const columnDuration = isMiddle ? "1.46s" : "1.38s";
              const mobileColumnDelay = `${680 + colIndex * 80}ms`;

              return (
                <div
                  key={colIndex}
                  className="masonry-column staged-work-rise flex w-full flex-1 flex-col items-stretch gap-[30px]"
                  style={
                    {
                      "--rise-delay": columnDelay,
                      "--rise-duration": columnDuration,
                      "--rise-distance": "96px",
                      "--rise-animation": "work-rise-in-clean",
                      "--rise-blur": "0px",
                      "--mobile-rise-delay": mobileColumnDelay,
                    } as CSSProperties
                  }
                >
                  {projects.slice(colIndex * 4, colIndex * 4 + 4).map((project, projectIndex) => {
                    const globalIndex = colIndex * 4 + projectIndex;
                    const shouldLoadEarly = globalIndex < 6;

                    return (
                      <figure key={project.slug} className="flex flex-col gap-2.5">
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
                        <figcaption className="text-base font-normal text-white/65">
                          {project.title}
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </section>

        <ContactSection />

        <footer className="mt-[-20px] flex h-[148px] w-full items-start justify-center pt-20">
          <div className="font-sans-preview flex w-full max-w-[560px] items-start justify-between gap-5 p-5 text-lg font-normal leading-7 text-white/65">
            <span>Graham Bunt</span>
            <span>©2026</span>
          </div>
        </footer>
      </div>
      <div aria-hidden="true" className="viewport-bottom-blur" />
    </main>
  );
}
