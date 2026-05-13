"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
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
  // Buttons (0.75s, 30px): start 450ms
  // Outer cols (1.0s, 100px): start 700ms
  // Middle col (1.05s, 100px): start 820ms — 120ms trail, almost cohesive with outer
  const buttonRevealStyle = {
    "--rise-delay": "450ms",
    "--rise-duration": "0.75s",
  } as CSSProperties;

  return (
    <main className={`flex min-h-screen flex-col items-center bg-black py-[120px] text-white ${fontsReady ? "sequence-ready" : ""}`}>
      <div className="canvas flex flex-col items-center gap-5">
        <nav className="fixed top-0 left-0 right-0 z-10 flex w-full items-center justify-between p-5">
          <Link href="/" aria-label="Home" className="group relative block h-11 w-11 overflow-hidden rounded-full">
            <div
              className="h-full w-full rounded-full bg-cover bg-center transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.12]"
              style={{ backgroundImage: "url(/avatar.jpg)" }}
            />
          </Link>
          <Link
            href="/contact"
            className="font-inter-display rounded-full bg-[#262626] px-5 py-2.5 text-base font-medium leading-6 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]"
          >
            Get in Touch
          </Link>
        </nav>

        <section
          data-section="intro"
          className="flex w-full max-w-[720px] flex-col items-center gap-[30px] overflow-hidden p-5 text-center"
        >
          <h1 className="w-full font-[family-name:var(--font-instrument-serif)] text-[32px] leading-[40px] tracking-[0] text-white min-[810px]:text-[48px] min-[810px]:leading-[56px]">
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
            data-section="actions"
            className="staged-rise flex w-min flex-row items-center justify-center gap-2.5"
            style={buttonRevealStyle}
          >
            <Link
              href="/work"
              className="font-inter-display inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#f50] px-5 py-2.5 text-base font-medium leading-6 text-black"
            >
              See projects
            </Link>
            <Link
              href="/about"
              className="font-inter-display inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#262626] px-5 py-2.5 text-base font-medium leading-6 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]"
            >
              About me
            </Link>
          </div>
        </section>

        <section className="flex w-full flex-col items-center gap-[60px] overflow-hidden px-5 py-[60px]">
          <div className="flex w-full max-w-[1680px] flex-col gap-[30px] min-[810px]:flex-row min-[810px]:items-start min-[810px]:gap-5">
            {[0, 1, 2].map((colIndex) => {
              // Outer columns (0, 2) rise together; middle (1) trails 200ms and moves slightly slower.
              const isMiddle = colIndex === 1;
              const columnDelay = isMiddle ? "820ms" : "700ms";
              const columnDuration = isMiddle ? "1.05s" : "1.0s";
              const mobileColumnDelay = `${700 + colIndex * 90}ms`;

              return (
                <div
                  key={colIndex}
                  className="masonry-column staged-rise-far flex w-full flex-1 flex-col items-stretch gap-[30px]"
                  style={
                    {
                      "--rise-delay": columnDelay,
                      "--rise-duration": columnDuration,
                      "--mobile-rise-delay": mobileColumnDelay,
                    } as CSSProperties
                  }
                >
                  {projects.slice(colIndex * 4, colIndex * 4 + 4).map((project) => (
                    <figure key={project.slug} className="flex flex-col gap-2.5">
                      <div
                        className="overflow-hidden rounded-[10px] border border-white/15 bg-white/10"
                        style={{ aspectRatio: project.aspectRatio }}
                      />
                      <figcaption className="text-base font-medium text-white/65">
                        {project.title}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              );
            })}
          </div>
        </section>

        <section data-section="contact" className="flex w-full max-w-[560px] flex-col items-center gap-[30px] p-5 text-center">
          <header className="flex w-full flex-col items-center gap-2.5">
            <h2 className="w-full font-[family-name:var(--font-instrument-serif)] text-[48px] leading-[56px] text-white">
              Contact
            </h2>
            <p className="font-inter-display w-full text-2xl font-medium leading-8 text-white/65">
              I&apos;m always excited to meet new people, collaborate on ideas, and discuss opportunities.
            </p>
          </header>
          <button
            type="button"
            className="font-inter-display inline-flex h-11 w-40 items-center justify-center gap-2.5 rounded-[100px] bg-[#262626] px-5 py-2.5 text-base font-medium leading-6 text-white"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy Email
          </button>
        </section>

        <footer className="mt-[-20px] flex h-[148px] w-full items-start justify-center pt-20">
          <div className="font-inter-display flex w-full max-w-[560px] items-start justify-between gap-5 p-5 text-lg font-medium leading-7 text-white/65">
            <span>Graham Bunt</span>
            <span>©2026</span>
          </div>
        </footer>
      </div>
      <div aria-hidden="true" className="viewport-bottom-blur" />
    </main>
  );
}
