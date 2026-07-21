"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { AnimatedDescription } from "@/components/AnimatedDescription";
import { ExploreSection } from "@/components/ExploreSection";
import { SiteNav } from "@/components/SiteNav";
import { aboutContent } from "@/content/about";
import { bookmarks, bookmarksPageContent } from "@/content/bookmarks";

const BOOKMARKS_EXPLORE_LINKS = [
  aboutContent.explore.links[0],
  {
    title: "About",
    description: "Me and how I think.",
    href: "/about",
    image: "/explore-about.svg",
  },
  ...aboutContent.explore.links.filter((item) => item.href !== "/work" && item.href !== "/bookmarks"),
];

function formatBookmarkDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function BookmarksPage() {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    document.fonts.ready
      .then(() => new Promise((resolve) => setTimeout(resolve, 250)))
      .then(() => setFontsReady(true));
  }, []);

  const listDelay = {
    "--rise-delay": "520ms",
    "--rise-duration": "0.88s",
    "--rise-blur": "0px",
    "--rise-animation": "work-rise-in-clean",
  } as CSSProperties;

  return (
    <div className={`bookmarks-page ${fontsReady ? "sequence-ready" : ""}`}>
      <SiteNav />

      <main className="bookmarks-main">
        <section className="bookmarks-section" aria-label="Bookmarks">
          <header className="work-heading bookmarks-heading">
            <h1 className="font-[family-name:var(--font-display-serif)]">
              <span className={`work-title-reveal ${fontsReady ? "animate-reveal" : "opacity-0"}`}>
                {bookmarksPageContent.title}
              </span>
            </h1>
            <AnimatedDescription ready={fontsReady} delay="260ms" text={bookmarksPageContent.description} />
          </header>

          <section className="bookmarks-list-section staged-work-rise" style={listDelay} aria-label="Saved links">
            <div className="bookmarks-list">
              {bookmarks.map((bookmark) => (
                <a
                  key={`${bookmark.date}-${bookmark.title}`}
                  className="bookmark-row font-sans-preview"
                  href={bookmark.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="bookmark-row-copy">
                    <span className="bookmark-row-title">
                      <span className="bookmark-row-title-text">{bookmark.title}</span>
                    </span>
                    <span className="bookmark-row-source">{bookmark.source}</span>
                  </span>
                  <time dateTime={bookmark.date}>{formatBookmarkDate(bookmark.date)}</time>
                </a>
              ))}
            </div>
          </section>

        </section>

        <ExploreSection title="Explore" items={BOOKMARKS_EXPLORE_LINKS} />
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
