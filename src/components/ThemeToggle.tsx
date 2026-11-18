"use client";

import { useSyncExternalStore } from "react";
import { getServerTheme, getTheme, subscribeTheme, toggleTheme } from "@/lib/theme";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      className="nav-item-pill nav-link-social nav-theme-toggle text-[var(--text-primary)]"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
    >
      <svg className="theme-icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42m0-14.14-1.42 1.42m-11.3 11.3-1.42 1.42" />
      </svg>
      <svg className="theme-icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.8 13.2A9 9 0 0 1 10.8 3.2 9 9 0 1 0 20.8 13.2Z" />
      </svg>
    </button>
  );
}
