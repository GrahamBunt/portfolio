"use client";

import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "@/components/SocialIcon";

const NAV_LINKS = [
  { label: "About", href: "/about" },
];

export function SiteNav() {
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
          <Image
            src="/avatar-thumb.webp"
            alt=""
            width={160}
            height={160}
            sizes="40px"
            priority
            className="site-nav-avatar-image h-full w-full rounded-full bg-cover bg-center"
          />
        </Link>
      </div>
      <div className="site-nav-links font-sans-preview flex items-center gap-2.5 text-base font-medium leading-6">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="nav-item-pill nav-link-about text-[var(--text-primary)]"
            aria-label={link.label}
          >
            {link.label}
          </Link>
        ))}
        <a
          href="https://www.linkedin.com/in/grahambunt/"
          className="nav-item-pill nav-link-linkedin text-[var(--text-primary)]"
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
