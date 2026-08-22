"use client";

import Link from "next/link";
import { SocialIcon } from "@/components/SocialIcon";

const NAV_LINKS = [
  { label: "About", href: "/about" },
];

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m12 5-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteNav({ showBack = false }: { showBack?: boolean }) {
  const onAvatarClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/") {
      event.preventDefault();
      window.location.reload();
    }
  };

  return (
    <nav className="site-nav fixed top-0 left-0 right-0 z-10 flex w-full items-center justify-between p-5">
      <div className="site-nav-left">
        <Link
          href="/"
          aria-label="Home"
          className="site-nav-avatar group relative block overflow-hidden rounded-full"
          onClick={onAvatarClick}
        >
          <div
            className="h-full w-full rounded-full bg-cover bg-center transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.12]"
            style={{ backgroundImage: "url(/avatar-thumb-mono.jpg)" }}
          />
        </Link>
        {showBack ? (
          <Link href="/" aria-label="Back home" className="nav-item-pill nav-back-pill font-sans-preview font-medium text-white">
            <span className="nav-back-icon">
              <BackIcon />
            </span>
            Back
          </Link>
        ) : null}
      </div>
      <div className="site-nav-links font-sans-preview flex items-center gap-2.5 text-base font-medium leading-6">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="nav-item-pill nav-link-about text-white"
            aria-label={link.label}
          >
            {link.label}
          </Link>
        ))}
        <a
          href="https://www.linkedin.com/in/grahambunt/"
          className="nav-item-pill nav-link-linkedin text-white"
          aria-label="LinkedIn"
          target="_blank"
          rel="noreferrer"
        >
          <span className="nav-linkedin-icon">
            <SocialIcon icon="linkedin" />
          </span>
        </a>
      </div>
    </nav>
  );
}
