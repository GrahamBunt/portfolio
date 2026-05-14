"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/content/projects";

const NAV_LINKS = [
  { label: "Projects", href: "/work" },
  { label: "About", href: "/about" },
];

const MISC_LINKS = [
  { label: "Tech stack", href: "/tech-stack" },
  { label: "Booklist", href: "/booklist" },
  { label: "Bookmarks", href: "/bookmarks" },
];

const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com/grahambunt", icon: "x" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/grahambunt", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/grahambunt", icon: "github" },
] as const;

function SocialIcon({ icon }: { icon: (typeof SOCIAL_LINKS)[number]["icon"] }) {
  if (icon === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.965 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="social-icon-github" aria-hidden="true">
      <path fill="currentColor" d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.18c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18A10.95 10.95 0 0 1 12 6.03c.98 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.42-2.69 5.39-5.25 5.68.41.36.77 1.06.77 2.14v3.19c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export default function Home() {
  const [fontsReady, setFontsReady] = useState(false);
  const [miscOpen, setMiscOpen] = useState(false);
  const miscRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    document.fonts.ready
      .then(() => new Promise((r) => setTimeout(r, 350)))
      .then(() => setFontsReady(true));
  }, []);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!miscRef.current?.contains(event.target as Node)) {
        setMiscOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMiscOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Tight unified sequence (fontsReady = t0):
  // H1 spans: 0-950ms / 100-1050ms
  // Social links follow; outer cols start as the H1 settles; middle trails by 120ms.

  return (
    <main className={`flex min-h-screen flex-col items-center bg-black py-[120px] text-white ${fontsReady ? "sequence-ready" : ""}`}>
      <div className="canvas flex flex-col items-center gap-5">
        <nav className="fixed top-0 left-0 right-0 z-10 flex w-full items-center justify-between p-5">
          <Link href="/" aria-label="Home" className="group relative block h-10 w-10 overflow-hidden rounded-full">
            <div
              className="h-full w-full rounded-full bg-cover bg-center transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.12]"
              style={{ backgroundImage: "url(/avatar.jpg)" }}
            />
          </Link>
          <div
            className="font-inter-display flex items-center gap-2.5 text-base font-medium leading-6"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-item-pill text-white"
                aria-label={link.label}
              >
                {link.label}
              </Link>
            ))}
            <div ref={miscRef} className="nav-menu">
              <button
                type="button"
                className="nav-item-pill nav-menu-trigger text-white"
                aria-expanded={miscOpen}
                aria-haspopup="menu"
                onClick={() => setMiscOpen((open) => !open)}
              >
                Misc
                <span className={`nav-chevron ${miscOpen ? "is-open" : ""}`} aria-hidden="true" />
              </button>
              <div className={`nav-menu-panel ${miscOpen ? "is-open" : ""}`} role="menu" aria-hidden={!miscOpen}>
                {MISC_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="nav-menu-item"
                    role="menuitem"
                    tabIndex={miscOpen ? 0 : -1}
                    onClick={() => setMiscOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

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
          <div className="social-links">
            {SOCIAL_LINKS.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className={`social-icon-button ${fontsReady ? "animate-reveal-compact" : "opacity-0"}`}
                style={fontsReady ? { animationDelay: `${520 + index * 50}ms` } : undefined}
                aria-label={link.label}
                target="_blank"
                rel="noreferrer"
              >
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </section>

        <section className="flex w-full flex-col items-center gap-[60px] overflow-hidden px-5 py-[60px]">
          <div className="flex w-full max-w-[1680px] flex-col gap-[30px] min-[810px]:flex-row min-[810px]:items-start min-[810px]:gap-5">
            {[0, 1, 2].map((colIndex) => {
              // Outer columns (0, 2) rise together; middle (1) trails slightly.
              const isMiddle = colIndex === 1;
              const columnDelay = isMiddle ? "1030ms" : "900ms";
              const columnDuration = isMiddle ? "1.05s" : "1.0s";
              const mobileColumnDelay = `${900 + colIndex * 90}ms`;

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
            className="nav-item-pill font-inter-display inline-flex w-40 items-center justify-center gap-2.5 text-base font-medium leading-6 text-white"
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
