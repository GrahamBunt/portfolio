"use client";

import { createElement, type CSSProperties, type MouseEvent, useEffect, useRef, useState } from "react";
import Script from "next/script";

type CubbyProjectMediaProps = {
  onMediaNavigate?: () => void;
  showMenuBar?: boolean;
  variant?: "card" | "hero";
  wallpaper?: { src: string; zoom?: number };
};

function LiveMenuClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      clearTimeout(timer);
      setNow(new Date());
      timer = setTimeout(update, 60_000 - (Date.now() % 60_000));
    };
    // Read the viewer's local time after hydration, then on each minute boundary.
    timer = setTimeout(update, 0);
    document.addEventListener("visibilitychange", update);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <time className="cubby-project-menu-clock" dateTime={now?.toISOString()}>
      <span className="cubby-project-menu-date">
        {now?.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }).replaceAll(",", "")}{" "}
      </span>
      {now?.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
    </time>
  );
}

function CubbyMenuBar() {
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = itemsRef.current;
    if (!items) return;
    const launcher = items.querySelector<HTMLElement>(".cubby-project-menu-launcher")!;
    const clock = items.querySelector<HTMLElement>(".cubby-project-menu-clock")!;
    const icons = Array.from(items.querySelectorAll<SVGElement>("svg"))
      .sort((a, b) => Number(a.dataset.priority) - Number(b.dataset.priority));

    const fitItems = () => {
      const available = items.getBoundingClientRect().width;
      const minimumGap = Number.parseFloat(getComputedStyle(items).fontSize) * 0.8;
      let occupied = launcher.getBoundingClientRect().width + clock.getBoundingClientRect().width;
      let gaps = 1;

      // Reserve the centered launcher and full date/time first. Optional status
      // icons fill the remaining space in priority order.
      for (const icon of icons) {
        const width = Number.parseFloat(getComputedStyle(icon).width);
        const fits = occupied + width + minimumGap * (gaps + 1) <= available;
        icon.style.display = fits ? "block" : "none";
        if (fits) {
          occupied += width;
          gaps += 1;
        }
      }
      items.style.gap = `${Math.max(0, (available - occupied) / gaps)}px`;
    };

    const observer = new ResizeObserver(fitItems);
    observer.observe(items);
    observer.observe(clock);
    fitItems();
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cubby-project-menu-plane" aria-hidden="true">
      <div className="cubby-project-menu-strip">
        <div className="cubby-project-menu-items" ref={itemsRef}>
          <span className="cubby-project-menu-launcher" />
          <svg viewBox="0 0 24 24" className="cubby-project-menu-display" data-priority="7" focusable="false">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
          <svg viewBox="0 0 24 24" className="cubby-project-menu-focus" data-priority="6" focusable="false">
            <path d="M20.5 14.5A9 9 0 0 1 9.5 3.5a9 9 0 1 0 11 11Z" fill="currentColor" stroke="none" />
          </svg>
          <svg viewBox="0 0 24 24" className="cubby-project-menu-volume" data-priority="5" focusable="false">
            <path d="M3 9h4l5-4v14l-5-4H3Z" fill="currentColor" stroke="none" />
            <path d="M15.5 8a6 6 0 0 1 0 8M18.5 5a10 10 0 0 1 0 14" />
          </svg>
          <svg viewBox="0 0 24 24" className="cubby-project-menu-wifi" data-priority="1" focusable="false">
            <path d="M2.2 8.3a15.3 15.3 0 0 1 19.6 0M5.6 12a10.1 10.1 0 0 1 12.8 0M9 15.7a4.7 4.7 0 0 1 6 0" strokeWidth="2.6" />
            <circle cx="12" cy="19" r="1.4" fill="currentColor" stroke="none" />
          </svg>
          <svg viewBox="0 0 16 24" className="cubby-project-menu-bluetooth" data-priority="8" focusable="false">
            <path d="m3 6 10 11-5 4V3l5 4L3 18" />
          </svg>
          <svg viewBox="0 0 30 16" className="cubby-project-menu-battery" data-priority="2" focusable="false">
            <rect x="1" y="1" width="25" height="14" rx="3.5" strokeOpacity=".5" strokeWidth="1.5" />
            <rect x="3.4" y="3.4" width="17" height="9.2" rx="1.4" fill="currentColor" stroke="none" />
            <path d="M28 5.5v5" strokeOpacity=".5" strokeWidth="2" />
          </svg>
          <svg viewBox="0 0 24 24" className="cubby-project-menu-search" data-priority="4" focusable="false">
            <circle cx="10.5" cy="10.5" r="7" /><path d="m16 16 5 5" />
          </svg>
          <svg viewBox="0 0 24 24" className="cubby-project-menu-controls" data-priority="3" focusable="false">
            <rect x="3" y="3.5" width="18" height="7" rx="3.5" />
            <circle cx="7" cy="7" r="1.6" fill="currentColor" stroke="none" />
            <rect x="3" y="13.5" width="18" height="7" rx="3.5" fill="currentColor" stroke="none" />
            <circle cx="17" cy="17" r="1.6" fill="#eee2c7" stroke="none" />
          </svg>
          <LiveMenuClock />
        </div>
      </div>
    </div>
  );
}

export function CubbyProjectMedia({ onMediaNavigate, showMenuBar = false, wallpaper, variant = "card" }: CubbyProjectMediaProps) {
  const handleMediaClick = (event: MouseEvent<HTMLElement>) => {
    const clickedInteractiveElement = event.nativeEvent.composedPath().some((node) => {
      if (!(node instanceof Element)) return false;

      return node.matches("a, button, cubby-grizzly");
    });

    if (!clickedInteractiveElement) {
      event.stopPropagation();
      onMediaNavigate?.();
    }
  };

  const MediaTag = variant === "hero" ? "div" : "figure";

  return (
    <MediaTag className={`case-study-next-up-media cubby-project-mascot-media ${variant === "hero" ? "cubby-project-hero-media" : ""}`} aria-label="Cubby app preview with animated mascot" onClick={handleMediaClick}
      style={wallpaper ? {
        "--cubby-wallpaper": `url("${wallpaper.src}")`,
        "--cubby-wallpaper-zoom": `${wallpaper.zoom ?? 155}%`,
      } as CSSProperties : undefined}
    >
      <Script src="/work/cubby/cubby-grizzly.js" strategy="afterInteractive" />
      <Script src="/work/cubby/study-frame.js?v=unified-zoom" strategy="afterInteractive" />
      {showMenuBar ? <CubbyMenuBar /> : null}
      <div className="cubby-project-zoom-layer">
        <div className="cubby-project-frame-shell">
          {createElement(
            "grizzly-study-frame",
            { className: "cubby-project-app-frame", "sample-feed": "" },
            createElement("cubby-grizzly", { className: "cubby-project-mascot" }),
          )}
        </div>
      </div>
    </MediaTag>
  );
}
