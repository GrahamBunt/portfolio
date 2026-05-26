/* eslint-disable @next/next/no-img-element */
"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { AnimatedDescription } from "@/components/AnimatedDescription";
import { SiteNav } from "@/components/SiteNav";
import { booklist2026 } from "@/content/books";

const BOOKLIST_TWEET_URL = "https://x.com/gtbunt/status/2053832719331701229";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="book-rating" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={index < rating ? "is-filled" : undefined} aria-hidden="true">
          ★
        </span>
      ))}
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
      .then(() => new Promise((resolve) => setTimeout(resolve, 350)))
      .then(() => setFontsReady(true));
  }, []);

  const gridDelay = {
    "--rise-delay": "700ms",
    "--rise-duration": "1.18s",
    "--rise-blur": "0px",
    "--rise-animation": "work-rise-in-clean",
  } as CSSProperties;

  const tweetDelay = {
    "--rise-delay": "860ms",
    "--rise-duration": "1.08s",
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
              text="Books I’m reading since I started tracking in 2026."
            />
          </header>

          <section className="book-year-section staged-work-rise" style={gridDelay} aria-labelledby="books-2026">
            <h2 id="books-2026" className="font-inter-display">
              2026
            </h2>
            <div className="book-grid">
              {booklist2026.map((book) => (
                <article key={`${book.title}-${book.author}`} className="book-card">
                  <img className="book-cover-frame" src={book.cover} alt="" />
                  <div className="book-card-meta font-inter-display">
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <Stars rating={book.rating} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="book-tweet-section staged-work-rise" style={tweetDelay} aria-label="Related tweet">
            <a className="book-tweet-card font-inter-display" href={BOOKLIST_TWEET_URL} target="_blank" rel="noreferrer">
              <div className="book-tweet-header">
                <img src="/avatar.jpg" alt="" />
                <div>
                  <p>Graham Bunt</p>
                  <span>@gtbunt</span>
                </div>
              </div>
              <p className="book-tweet-copy">
                I shoulda bought a kindle for a loooong time ago. It’s so much better.
                <br />
                <br />
                Get a pop socket for it too.
              </p>
              <div className="book-tweet-media" aria-hidden="true">
                <img src="/booklist/kindle-pop-socket-back.jpg" alt="" />
                <img src="/booklist/kindle-pop-socket-front.jpg" alt="" />
              </div>
              <p className="book-tweet-date">9:40 AM · May 11, 2026</p>
            </a>
          </aside>
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
