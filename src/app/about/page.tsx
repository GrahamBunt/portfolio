/* eslint-disable @next/next/no-img-element */
"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatedDescription } from "@/components/AnimatedDescription";
import { ContactSection } from "@/components/ContactSection";
import { SiteNav } from "@/components/SiteNav";
import { SocialIcon } from "@/components/SocialIcon";
import { aboutContent, type AboutContent } from "@/content/about";
import { preventTextOrphans } from "@/lib/typography";

const ABOUT_IMAGE =
  "https://framerusercontent.com/images/0Qe7tP8xBjkqUS3NHrAj3ZRvZ60.png?width=900&height=1120";

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

export default function AboutPage() {
  const [fontsReady, setFontsReady] = useState(false);
  const [tuneMode, setTuneMode] = useState(false);
  const [draft, setDraft] = useState<AboutContent>(() => cloneContent());
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    document.fonts.ready
      .then(() => new Promise((resolve) => setTimeout(resolve, 250)))
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
    "--rise-delay": "520ms",
    "--rise-duration": "1.08s",
    "--rise-blur": "0px",
    "--rise-animation": "work-rise-in-clean",
  } as CSSProperties;

  const bioDelay = {
    "--rise-delay": "640ms",
    "--rise-duration": "0.88s",
    "--rise-blur": "0px",
    "--rise-animation": "work-rise-in-clean",
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
    <div className={`about-page ${fontsReady ? "sequence-ready" : ""}`}>
      <SiteNav />

      {tuneMode ? (
        <div className="tune-panel font-inter-display" role="region" aria-label="About tuning controls">
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
            <h1 className="font-[family-name:var(--font-instrument-serif)]">
              <span className={`work-title-reveal ${fontsReady ? "animate-reveal" : "opacity-0"}`}>
                {tuneMode ? (
                  <>
                    <em>
                      <EditableText
                        value={draft.hero.titleItalic}
                        onChange={(value) => updateDraft((content) => {
                          content.hero.titleItalic = value;
                        })}
                      />
                    </em>
                    <EditableText
                      value={draft.hero.titleRest}
                      onChange={(value) => updateDraft((content) => {
                        content.hero.titleRest = value;
                      })}
                    />
                  </>
                ) : (
                  <>
                    <em>{draft.hero.titleItalic}</em>
                    {draft.hero.titleRest}
                  </>
                )}
              </span>
            </h1>
            {tuneMode ? (
              <p className="font-inter-display">
                <EditableText
                  value={draft.hero.description}
                  onChange={(value) => updateDraft((content) => {
                    content.hero.description = value;
                  })}
                />
              </p>
            ) : (
              <AnimatedDescription ready={fontsReady} delay="260ms" text={draft.hero.description} />
            )}
          </header>

          <div className="about-portrait staged-work-rise" style={portraitDelay}>
            <img src={ABOUT_IMAGE} alt="" />
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
            <div className="about-social">
              {draft.social.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-item-pill about-social-link font-inter-display text-base font-medium leading-6 text-white"
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
          </div>
        </section>

        <ContactSection
          align="left"
          title={
            tuneMode ? (
              <EditableText
                value={draft.contact.title}
                onChange={(value) => updateDraft((content) => {
                  content.contact.title = value;
                })}
              />
            ) : (
              preventTextOrphans(draft.contact.title)
            )
          }
          description={
            tuneMode ? (
              <EditableText
                value={draft.contact.description}
                onChange={(value) => updateDraft((content) => {
                  content.contact.description = value;
                })}
              />
            ) : (
              preventTextOrphans(draft.contact.description)
            )
          }
          action={
            tuneMode ? (
              <EditableText
                value={draft.contact.action}
                onChange={(value) => updateDraft((content) => {
                  content.contact.action = value;
                })}
              />
            ) : (
              draft.contact.action
            )
          }
        />
      </main>

      <footer className="work-footer">
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

      <div aria-hidden="true" className="viewport-bottom-blur" />
    </div>
  );
}
