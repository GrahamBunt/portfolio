/* eslint-disable @next/next/no-img-element */
"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { AnimatedDescription } from "@/components/AnimatedDescription";
import { ExploreSection } from "@/components/ExploreSection";
import { SiteNav } from "@/components/SiteNav";
import { aboutContent } from "@/content/about";
import { booklist2026 } from "@/content/books";
import { preventTextOrphans } from "@/lib/typography";

const BOOKLIST_TWEET_URL = "https://x.com/gtbunt/status/2053832719331701229";
const BOOKLIST_EXPLORE_LINKS = [
  aboutContent.explore.links[0],
  {
    title: "About",
    description: "Me and how I think.",
    href: "/about",
    image: "/explore-about.svg",
  },
  ...aboutContent.explore.links.filter((item) => item.href !== "/work" && item.href !== "/booklist"),
];

function Stars({ rating, pending = false }: { rating: number; pending?: boolean }) {
  return (
    <span className="book-rating" aria-label={pending ? "Rating pending" : `${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = !pending && index < rating;

        return (
          <svg
            key={index}
            className={filled ? "is-filled" : undefined}
            aria-hidden="true"
            viewBox="0 0 20 20"
            focusable="false"
          >
            <path d="M10 1.8 12.55 7l5.75.84-4.16 4.05.98 5.72L10 14.9l-5.12 2.71.98-5.72L1.7 7.84 7.45 7 10 1.8Z" />
          </svg>
        );
      })}
    </span>
  );
}

export default function BooklistPage() {
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

  const gridDelay = {
    "--rise-delay": "520ms",
    "--rise-duration": "0.88s",
    "--rise-blur": "0px",
    "--rise-animation": "work-rise-in-clean",
  } as CSSProperties;

  const tweetDelay = {
    "--rise-delay": "640ms",
    "--rise-duration": "0.84s",
    "--rise-blur": "0px",
    "--rise-animation": "work-rise-in-clean",
  } as CSSProperties;

  return (
    <div className={`booklist-page ${fontsReady ? "sequence-ready" : ""}`}>
      <SiteNav />

      <main className="booklist-main">
        <section className="booklist-section" aria-label="Booklist">
          <header className="work-heading booklist-heading">
            <h1 className="font-[family-name:var(--font-instrument-serif)]">
              <span className={`work-title-reveal ${fontsReady ? "animate-reveal" : "opacity-0"}`}>
                Booklist
              </span>
            </h1>
            <AnimatedDescription
              ready={fontsReady}
              delay="260ms"
              text="The world is designed to pull us away from slower, deliberate thought. Reading is my way of protecting it."
            />
          </header>

          <section className="book-year-section staged-work-rise" style={gridDelay} aria-labelledby="books-2026">
            <h2 id="books-2026" className="font-sans-preview">
              2026
            </h2>
            <div className="book-grid">
              {booklist2026.map((book) => (
                <article key={`${book.title}-${book.author}`} className="book-card">
                  <div className="book-cover-wrap">
                    <img className="book-cover-frame" src={book.cover} alt="" />
                    {book.status ? <span className="book-cover-sash">{book.status}</span> : null}
                  </div>
                  <div className="book-card-meta font-sans-preview">
                    <h3>{preventTextOrphans(book.title)}</h3>
                    <p>{preventTextOrphans(book.author)}</p>
                    <Stars rating={book.rating} pending={book.ratingPending} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="book-tweet-section staged-work-rise" style={tweetDelay} aria-label="Related tweet">
            <a className="book-tweet-card font-sans-preview" href={BOOKLIST_TWEET_URL} target="_blank" rel="noreferrer">
              <div className="book-tweet-header">
                <img src="/avatar.jpg" alt="" />
                <div>
                  <p>Graham Bunt</p>
                  <span>@gtbunt</span>
                </div>
              </div>
              <p className="book-tweet-copy">
                {preventTextOrphans("I shoulda bought a kindle for a loooong time ago. It’s so much better.")}
                <br />
                <br />
                {preventTextOrphans("Get a pop socket for it too.")}
              </p>
              <div className="book-tweet-media" aria-hidden="true">
                <img src="/booklist/kindle-pop-socket-back.jpg" alt="" />
                <img src="/booklist/kindle-pop-socket-front.jpg" alt="" />
              </div>
              <p className="book-tweet-date">9:40 AM · May 11, 2026</p>
            </a>
          </aside>

          <ExploreSection title="Explore" items={BOOKLIST_EXPLORE_LINKS} />
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
