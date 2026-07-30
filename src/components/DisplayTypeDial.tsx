"use client";

import { useEffect, useState } from "react";

const TRACKING_STORAGE_KEY = "portfolio-display-letter-spacing";
const H1_LINE_HEIGHT_STORAGE_KEY = "portfolio-home-h1-line-height";
const DEFAULT_TRACKING_VALUE = -0.018;
const MIN_TRACKING_VALUE = -0.08;
const MAX_TRACKING_VALUE = 0.02;
const TRACKING_STEP = 0.001;
const DEFAULT_H1_LINE_HEIGHT_VALUE = 1.04;
const MIN_H1_LINE_HEIGHT_VALUE = 0.9;
const MAX_H1_LINE_HEIGHT_VALUE = 1.3;
const H1_LINE_HEIGHT_STEP = 0.005;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function parseTrackingValue(value: string | null) {
  if (!value) return null;

  const parsed = Number(value.replace("em", ""));
  return Number.isFinite(parsed) ? clamp(parsed, MIN_TRACKING_VALUE, MAX_TRACKING_VALUE) : null;
}

function parseLineHeightValue(value: string | null) {
  if (!value) return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? clamp(parsed, MIN_H1_LINE_HEIGHT_VALUE, MAX_H1_LINE_HEIGHT_VALUE) : null;
}

function formatTrackingValue(value: number) {
  return `${value.toFixed(3)}em`;
}

function formatLineHeightValue(value: number) {
  return value.toFixed(3);
}

export function DisplayTypeDial() {
  const [isVisible, setIsVisible] = useState(false);
  const [trackingValue, setTrackingValue] = useState(DEFAULT_TRACKING_VALUE);
  const [h1LineHeightValue, setH1LineHeightValue] = useState(DEFAULT_H1_LINE_HEIGHT_VALUE);
  const [copiedValue, setCopiedValue] = useState<"tracking" | "h1" | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const shouldShow =
        params.has("dialkit") ||
        params.has("typeDial") ||
        params.has("letterDial") ||
        params.has("h1Dial");

      setIsVisible(shouldShow);

      const queryTrackingValue =
        parseTrackingValue(params.get("ls")) ??
        parseTrackingValue(params.get("letterSpacing")) ??
        (shouldShow ? parseTrackingValue(window.localStorage.getItem(TRACKING_STORAGE_KEY)) : null);

      const queryLineHeightValue =
        parseLineHeightValue(params.get("lh")) ??
        parseLineHeightValue(params.get("h1LineHeight")) ??
        (shouldShow ? parseLineHeightValue(window.localStorage.getItem(H1_LINE_HEIGHT_STORAGE_KEY)) : null);

      if (queryTrackingValue !== null) {
        setTrackingValue(queryTrackingValue);
      }

      if (queryLineHeightValue !== null) {
        setH1LineHeightValue(queryLineHeightValue);
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--display-letter-spacing", formatTrackingValue(trackingValue));

    if (isVisible) {
      window.localStorage.setItem(TRACKING_STORAGE_KEY, formatTrackingValue(trackingValue));
    }
  }, [isVisible, trackingValue]);

  useEffect(() => {
    document.documentElement.style.setProperty("--home-h1-line-height", formatLineHeightValue(h1LineHeightValue));

    if (isVisible) {
      window.localStorage.setItem(H1_LINE_HEIGHT_STORAGE_KEY, formatLineHeightValue(h1LineHeightValue));
    }
  }, [h1LineHeightValue, isVisible]);

  if (!isVisible) {
    return null;
  }

  const displayTrackingValue = formatTrackingValue(trackingValue);
  const displayH1LineHeightValue = formatLineHeightValue(h1LineHeightValue);

  const copyValue = async (kind: "tracking" | "h1", value: string) => {
    await navigator.clipboard?.writeText(value);
    setCopiedValue(kind);
    window.setTimeout(() => setCopiedValue(null), 1200);
  };

  return (
    <aside className="display-type-dial font-sans-preview" aria-label="Right Serif type dial">
      <div className="display-type-dial-group">
        <div className="display-type-dial-header">
          <span>Right Serif tracking</span>
          <code>{displayTrackingValue}</code>
        </div>
        <input
          aria-label="Right Serif letter spacing"
          type="range"
          min={MIN_TRACKING_VALUE}
          max={MAX_TRACKING_VALUE}
          step={TRACKING_STEP}
          value={trackingValue}
          onChange={(event) => setTrackingValue(clamp(Number(event.target.value), MIN_TRACKING_VALUE, MAX_TRACKING_VALUE))}
        />
        <div className="display-type-dial-row">
          <input
            aria-label="Exact letter spacing value"
            type="number"
            min={MIN_TRACKING_VALUE}
            max={MAX_TRACKING_VALUE}
            step={TRACKING_STEP}
            value={trackingValue.toFixed(3)}
            onChange={(event) => setTrackingValue(clamp(Number(event.target.value), MIN_TRACKING_VALUE, MAX_TRACKING_VALUE))}
          />
          <button type="button" onClick={() => setTrackingValue(DEFAULT_TRACKING_VALUE)}>
            Reset
          </button>
          <button type="button" onClick={() => copyValue("tracking", displayTrackingValue)}>
            {copiedValue === "tracking" ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="display-type-dial-group">
        <div className="display-type-dial-header">
          <span>Home H1 line height</span>
          <code>{displayH1LineHeightValue}</code>
        </div>
        <input
          aria-label="Home H1 line height"
          type="range"
          min={MIN_H1_LINE_HEIGHT_VALUE}
          max={MAX_H1_LINE_HEIGHT_VALUE}
          step={H1_LINE_HEIGHT_STEP}
          value={h1LineHeightValue}
          onChange={(event) => setH1LineHeightValue(clamp(Number(event.target.value), MIN_H1_LINE_HEIGHT_VALUE, MAX_H1_LINE_HEIGHT_VALUE))}
        />
        <div className="display-type-dial-row">
          <input
            aria-label="Exact home H1 line height value"
            type="number"
            min={MIN_H1_LINE_HEIGHT_VALUE}
            max={MAX_H1_LINE_HEIGHT_VALUE}
            step={H1_LINE_HEIGHT_STEP}
            value={h1LineHeightValue.toFixed(3)}
            onChange={(event) => setH1LineHeightValue(clamp(Number(event.target.value), MIN_H1_LINE_HEIGHT_VALUE, MAX_H1_LINE_HEIGHT_VALUE))}
          />
          <button type="button" onClick={() => setH1LineHeightValue(DEFAULT_H1_LINE_HEIGHT_VALUE)}>
            Reset
          </button>
          <button type="button" onClick={() => copyValue("h1", displayH1LineHeightValue)}>
            {copiedValue === "h1" ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </aside>
  );
}
