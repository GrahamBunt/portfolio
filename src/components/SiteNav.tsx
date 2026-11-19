"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useSyncExternalStore, type RefObject } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SocialIcon } from "@/components/SocialIcon";
import { NavHomeIcon } from "@/components/NavHomeIcon";
import { getNavAvatarStage, setNavAvatarStage, subscribeNavAvatar, type NavAvatarStage } from "@/lib/nav-avatar";

/* ANIMATION STORYBOARD
 * Trigger: the homepage portrait leaves the viewport above the page.
 *   0ms   home icon fades out, scale 1 → 0.98 (420ms)
 *   0ms   portrait opens from a center circle, radius 0% → 72% (680ms)
 * Matches motion study 6, Circle reveal.
 * Reverse when the portrait returns. Other pages retain the current stage.
 */
const TIMING = {
  outgoing: 420, // softly fade or close the outgoing symbol
  incoming: 680, // gently reveal the incoming symbol
};
const AVATAR = {
  hiddenOpacity: 0,
  visibleOpacity: 1,
  hiddenScale: 0.98,
  visibleScale: 1,
  portraitHiddenClip: "circle(0% at 50% 50%)",
  portraitVisibleClip: "circle(72% at 50% 50%)",
  iconSize: 18,
  ease: [0.22, 1, 0.36, 1] as const,
};

const NAV_LINKS = [
  { label: "About", href: "/about" },
];

export function SiteNav({ homePortraitRef }: { homePortraitRef?: RefObject<HTMLElement | null> }) {
  const initialStage: NavAvatarStage = homePortraitRef ? 0 : 1;
  const stage = useSyncExternalStore(
    subscribeNavAvatar,
    () => getNavAvatarStage(initialStage),
    () => initialStage,
  );
  const reducedMotion = useReducedMotion();
  const showPortrait = stage >= 1;

  useEffect(() => {
    const portrait = homePortraitRef?.current;
    if (!portrait) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Being below the viewport is not the same as having scrolled past it.
      const hasScrolledPast = !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
      setNavAvatarStage(hasScrolledPast ? 1 : 0);
    });
    observer.observe(portrait);
    return () => observer.disconnect();
  }, [homePortraitRef]);

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
          data-nav-avatar={showPortrait ? "portrait" : "home"}
        >
          <motion.span
            className="site-nav-avatar-layer site-nav-home-icon"
            aria-hidden="true"
            initial={false}
            animate={{
              opacity: showPortrait ? AVATAR.hiddenOpacity : AVATAR.visibleOpacity,
              scale: showPortrait ? AVATAR.hiddenScale : AVATAR.visibleScale,
            }}
            transition={{
              duration: reducedMotion ? 0 : (showPortrait ? TIMING.outgoing : TIMING.incoming) / 1000,
              ease: AVATAR.ease,
            }}
          >
            <NavHomeIcon size={AVATAR.iconSize} />
          </motion.span>
          <motion.span
            className="site-nav-avatar-layer"
            aria-hidden="true"
            initial={false}
            animate={{
              clipPath: showPortrait ? AVATAR.portraitVisibleClip : AVATAR.portraitHiddenClip,
            }}
            transition={{
              duration: reducedMotion ? 0 : (showPortrait ? TIMING.incoming : TIMING.outgoing) / 1000,
              ease: AVATAR.ease,
            }}
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
          </motion.span>
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
          href="/graham-bunt-resume.pdf"
          className="nav-item-pill text-[var(--text-primary)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
        <a
          href="https://www.linkedin.com/in/grahambunt/"
          className="nav-item-pill nav-link-social text-[var(--text-primary)]"
          aria-label="LinkedIn"
          target="_blank"
          rel="noreferrer"
        >
          <span className="nav-social-icon">
            <SocialIcon icon="linkedin" />
          </span>
        </a>
        <a
          href="https://github.com/GrahamBunt"
          className="nav-item-pill nav-link-social text-[var(--text-primary)]"
          aria-label="GitHub"
          target="_blank"
          rel="noreferrer"
        >
          <span className="nav-social-icon">
            <SocialIcon icon="github" />
          </span>
        </a>
      </div>
    </nav>
  );
}
