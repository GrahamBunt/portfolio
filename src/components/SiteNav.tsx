"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Projects", href: "/work" },
  { label: "About", href: "/about" },
];

const MISC_LINKS = [
  { label: "Tech stack", href: "/tech-stack" },
  { label: "Booklist", href: "/booklist" },
  { label: "Bookmarks", href: "/bookmarks" },
];

export function SiteNav() {
  const [miscOpen, setMiscOpen] = useState(false);
  const miscRef = useRef<HTMLDivElement>(null);

  const onAvatarClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/") {
      event.preventDefault();
      window.location.reload();
    }
  };

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

  return (
    <nav className="site-nav fixed top-0 left-0 right-0 z-10 flex w-full items-center justify-between p-5">
      <Link
        href="/"
        aria-label="Home"
        className="site-nav-avatar group relative block h-10 w-10 overflow-hidden rounded-full"
        onClick={onAvatarClick}
      >
        <div
          className="h-full w-full rounded-full bg-cover bg-center transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.12]"
          style={{ backgroundImage: "url(/avatar.jpg)" }}
        />
      </Link>
      <div className="site-nav-links font-inter-display flex items-center gap-2.5 text-base font-medium leading-6">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-item-pill text-white ${link.label === "Projects" ? "nav-link-projects" : "nav-link-about"}`}
            aria-label={link.label}
          >
            {link.label}
          </Link>
        ))}
        <div ref={miscRef} className="nav-menu">
          <button
            type="button"
            className="nav-item-pill nav-menu-trigger nav-link-misc text-white"
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
  );
}
