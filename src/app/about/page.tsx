"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatedDescription } from "@/components/AnimatedDescription";
import { SiteNav } from "@/components/SiteNav";
import { SocialIcon } from "@/components/SocialIcon";
import { aboutContent, type AboutContent } from "@/content/about";
import { preventTextOrphans } from "@/lib/typography";

const ABOUT_IMAGE =
  "/about-portrait.webp";
const HOME_EMAIL = "gtbunt@gmail.com";

function cloneContent() {
  return JSON.parse(JSON.stringify(aboutContent)) as AboutContent;
}

function EditableText({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || document.activeElement === element) return;
    if (element.textContent !== value) {
      element.textContent = value;
    }
  }, [value]);

  return (
    <span
      ref={elementRef}
      className={`tune-editable ${className ?? ""}`}
      contentEditable
      dir="ltr"
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={(event) => onChange(event.currentTarget.textContent ?? "")}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.blur();
        }
      }}
      onPaste={(event) => {
        event.preventDefault();
        const text = event.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
      }}
    >
      {value}
    </span>
  );
}

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function AboutPage() {
  const [fontsReady, setFontsReady] = useState(false);
  const [tuneMode, setTuneMode] = useState(false);
  const [draft, setDraft] = useState<AboutContent>(() => cloneContent());
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const sequenceReady = fontsReady;

  useEffect(() => {
    if (!copiedEmail) return;

    const timeoutId = window.setTimeout(() => setCopiedEmail(false), 2600);
    return () => window.clearTimeout(timeoutId);
  }, [copiedEmail]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(HOME_EMAIL);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = HOME_EMAIL;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
      } finally {
        document.body.removeChild(textarea);
      }
    }

    setCopiedEmail(true);
  };

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    document.fonts.ready
      .then(() => new Promise((resolve) => setTimeout(resolve, 120)))
      .then(() => setFontsReady(true));

    const tuneModeTimer = window.setTimeout(() => {
      setTuneMode(
        process.env.NODE_ENV === "development" &&
          new URLSearchParams(window.location.search).get("tune") === "1",
      );
    }, 0);

    return () => window.clearTimeout(tuneModeTimer);
  }, []);

  const portraitDelay = {
    "--rise-delay": "220ms",
    "--rise-duration": "0.58s",
    "--rise-distance": "8px",
    "--rise-blur": "0px",
    "--rise-animation": "quiet-rise-in",
  } as CSSProperties;

  const bioDelay = {
    "--rise-delay": "260ms",
    "--rise-duration": "0.58s",
    "--rise-distance": "6px",
    "--rise-blur": "0px",
    "--rise-animation": "quiet-rise-in",
  } as CSSProperties;

  const updateDraft = (updater: (content: AboutContent) => void) => {
    setSaveStatus("idle");
    setDraft((current) => {
      const next = JSON.parse(JSON.stringify(current)) as AboutContent;
      updater(next);
      return next;
    });
  };

  const saveContent = async () => {
    setSaveStatus("saving");
    const response = await fetch("/api/tune/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });

    setSaveStatus(response.ok ? "saved" : "error");
  };

  const resetContent = () => {
    setDraft(cloneContent());
    setSaveStatus("idle");
  };

  return (
    <div className={`about-page ${sequenceReady ? "sequence-ready" : ""}`}>
      <SiteNav showBack />

      {tuneMode ? (
        <div className="tune-panel font-sans-preview" role="region" aria-label="About tuning controls">
          <span>{saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved" : saveStatus === "error" ? "Save failed" : "Tune mode"}</span>
          <button type="button" onClick={saveContent} disabled={saveStatus === "saving"}>
            Save
          </button>
          <button type="button" onClick={resetContent}>
            Reset
          </button>
        </div>
      ) : null}

      <main className="about-main">
        <section className="about-section" aria-label="About">
          <header className="work-heading about-heading">
            <h1>
              <span className={`work-title-reveal ${sequenceReady ? "animate-reveal" : "opacity-0"}`}>
                {tuneMode ? (
                  <>
                    <span>
                      <EditableText
                        value={draft.hero.titleItalic}
                        onChange={(value) => updateDraft((content) => {
                          content.hero.titleItalic = value;
                        })}
                      />
                    </span>
                    <EditableText
                      value={draft.hero.titleRest}
                      onChange={(value) => updateDraft((content) => {
                        content.hero.titleRest = value;
                      })}
                    />
                  </>
                ) : (
                  <>
                    {draft.hero.titleItalic ? <span>{draft.hero.titleItalic}</span> : null}
                    {draft.hero.titleRest}
                  </>
                )}
              </span>
            </h1>
            {tuneMode ? (
              <p className="about-heading-description font-sans-preview">
                <EditableText
                  value={draft.hero.description}
                  onChange={(value) => updateDraft((content) => {
                    content.hero.description = value;
                  })}
                />
              </p>
            ) : draft.hero.description ? (
              <AnimatedDescription
                ready={sequenceReady}
                delay="140ms"
                text={draft.hero.description}
                className="about-heading-description"
              />
            ) : null}
          </header>

          <div className="about-portrait staged-work-rise" style={portraitDelay}>
            <Image
              src={ABOUT_IMAGE}
              alt=""
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), 560px"
              quality={95}
              priority
            />
          </div>

          <div className="about-bio staged-work-rise" style={bioDelay}>
            <div className="about-copy">
              {draft.bio.map((paragraph, index) => (
                <p key={index}>
                  {tuneMode ? (
                    <EditableText
                      value={paragraph}
                      onChange={(value) => updateDraft((content) => {
                        content.bio[index] = value;
                      })}
                    />
                  ) : (
                    preventTextOrphans(paragraph)
                  )}
                </p>
              ))}
            </div>
            {draft.social.length ? (
              <div className="about-social">
                {draft.social.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="nav-item-pill about-social-link font-sans-preview text-base font-medium leading-6 text-white"
                    target="_blank"
                    rel="noreferrer"
                    onClick={tuneMode ? (event) => event.preventDefault() : undefined}
                  >
                    <span className="about-social-icon">
                      <SocialIcon icon={item.icon} />
                    </span>
                    {tuneMode ? (
                      <EditableText
                        value={item.label}
                        onChange={(value) => updateDraft((content) => {
                          content.social[index].label = value;
                        })}
                      />
                    ) : (
                      preventTextOrphans(item.label)
                    )}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="home-contact-band">
          <div className="home-contact-content">
            <p className="home-section-label">
              {tuneMode ? (
                <EditableText
                  value={draft.contact.title}
                  onChange={(value) => updateDraft((content) => {
                    content.contact.title = value;
                  })}
                />
              ) : (
                preventTextOrphans(draft.contact.title)
              )}
            </p>
            <div className="home-contact-copy-stack">
              <p className="home-contact-copy">
                {tuneMode ? (
                  <EditableText
                    value={draft.contact.description}
                    onChange={(value) => updateDraft((content) => {
                      content.contact.description = value;
                    })}
                  />
                ) : (
                  preventTextOrphans(draft.contact.description)
                )}
              </p>
              <button
                type="button"
                className="nav-item-pill home-copy-email-button"
                onClick={copyEmail}
                aria-live="polite"
              >
                {copiedEmail ? <CheckIcon /> : <CopyIcon />}
                {copiedEmail ? "Copied" : tuneMode ? (
                  <EditableText
                    value={draft.contact.action}
                    onChange={(value) => updateDraft((content) => {
                      content.contact.action = value;
                    })}
                  />
                ) : (
                  draft.contact.action
                )}
              </button>
            </div>
          </div>
          <footer className="work-footer home-footer">
            <div>
              <p>
                {tuneMode ? (
                  <EditableText
                    value={draft.footer.name}
                    onChange={(value) => updateDraft((content) => {
                      content.footer.name = value;
                    })}
                  />
                ) : (
                  preventTextOrphans(draft.footer.name)
                )}
              </p>
              <p>
                {tuneMode ? (
                  <EditableText
                    value={draft.footer.year}
                    onChange={(value) => updateDraft((content) => {
                      content.footer.year = value;
                    })}
                  />
                ) : (
                  draft.footer.year
                )}
              </p>
            </div>
          </footer>
        </section>
      </main>

      <div aria-hidden="true" className="viewport-bottom-blur" />
    </div>
  );
}
