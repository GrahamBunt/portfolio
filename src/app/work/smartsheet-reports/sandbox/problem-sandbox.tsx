/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

const problemCards = [
  {
    problem: "Problem one",
    audience: "Collaborator",
    badge: "Collaborator problem",
    title: "Rigid consumption",
    body: "Collaborators were stuck with the admin's setup, unable to filter, group, or sort the data for their own needs.",
    tone: "red",
    image: "/work/smartsheet-reports/problem-people/collaborator-optimized.jpg",
  },
  {
    problem: "Problem two",
    audience: "Creator",
    badge: "Creator problem",
    title: "Guidance and usability",
    body: "Defining which sheets, fields, and rows belonged in the report was complex, with clunky controls and little guidance.",
    tone: "amber",
    image: "/work/smartsheet-reports/problem-people/creator-optimized.jpg",
  },
];

const concepts = [
  {
    id: "scroll-badges",
    label: "Scroll Badges",
    description: "Problem labels appear once the cards settle into view.",
  },
  {
    id: "corner-flags",
    label: "Corner Flags",
    description: "Persistent but quiet colored flags clarify the two problems.",
  },
  {
    id: "diagnosis-bar",
    label: "Diagnosis Bar",
    description: "A slim problem statement band anchors each card.",
  },
  {
    id: "focus-wash",
    label: "Focus Wash",
    description: "A soft color wash and tiny label lift the cards on entry.",
  },
];

function ProblemCard({
  card,
  index,
  active,
  variant,
}: {
  card: (typeof problemCards)[number];
  index: number;
  active: boolean;
  variant: string;
}) {
  return (
    <article className={`problem-sandbox-card is-${card.tone} ${active ? "is-active" : ""}`}>
      <img src={card.image} alt="" />
      <div className="problem-sandbox-card-overlay" />
      {variant !== "scroll-badges" ? (
        <div className={`problem-sandbox-problem-label is-${variant}`}>
          <span>{card.problem}</span>
        </div>
      ) : null}
      {variant === "diagnosis-bar" ? (
        <div className="problem-sandbox-diagnosis font-sans-preview">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{card.audience} problem</p>
        </div>
      ) : null}
      <div className="problem-sandbox-card-copy font-sans-preview">
        {variant === "scroll-badges" ? (
          <p className={`problem-sandbox-inline-badge ${active ? "is-active" : ""}`}>
            <span>{card.badge}</span>
          </p>
        ) : (
          <p>{card.audience}</p>
        )}
        <h2>{card.title}</h2>
        <p>{card.body}</p>
      </div>
    </article>
  );
}

function ProblemCardsPreview({ variant }: { variant: string }) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(variant !== "scroll-badges" && variant !== "focus-wash");

  useEffect(() => {
    if (variant !== "scroll-badges" && variant !== "focus-wash") {
      return undefined;
    }

    const grid = gridRef.current;

    if (!grid) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.38);
      },
      {
        threshold: [0, 0.38, 0.62],
        rootMargin: "-12% 0px -18%",
      },
    );

    observer.observe(grid);

    return () => {
      observer.disconnect();
    };
  }, [variant]);

  return (
    <section className={`problem-sandbox-preview is-${variant}`}>
      <div className="problem-sandbox-context font-sans-preview">
        <p>Context</p>
        <div>
          <p>
            Smartsheet spent most of the early to mid 2020s rebuilding the core views within its primary asset, the sheet. Bringing those new views to the report was the natural next step.
          </p>
          <p>
            The transition into the problem space should feel visual and immediate: two cards, two audiences, two clear problems to solve.
          </p>
        </div>
      </div>

      <div ref={gridRef} className="problem-sandbox-card-grid">
        {problemCards.map((card, index) => (
          <ProblemCard
            key={card.title}
            card={card}
            index={index}
            active={active}
            variant={variant}
          />
        ))}
      </div>
    </section>
  );
}

export function SmartsheetProblemSandbox() {
  const [selectedConcept, setSelectedConcept] = useState(concepts[0].id);
  const activeConcept = concepts.find((concept) => concept.id === selectedConcept) ?? concepts[0];

  return (
    <main className="problem-sandbox-main">
      <aside className="problem-sandbox-panel font-sans-preview" aria-label="Problem card interaction versions">
        <div>
          <p>Problem Card Sandbox</p>
          <h1>Subtle ways to signal the two problems</h1>
        </div>
        <nav>
          {concepts.map((concept) => (
            <button
              key={concept.id}
              type="button"
              className={concept.id === selectedConcept ? "is-active" : ""}
              onClick={() => setSelectedConcept(concept.id)}
            >
              <span>{concept.label}</span>
              <span>{concept.description}</span>
            </button>
          ))}
        </nav>
      </aside>

      <section className="problem-sandbox-stage" aria-labelledby="problem-sandbox-title">
        <header className="problem-sandbox-stage-header font-sans-preview">
          <p>{activeConcept.label}</p>
          <h2 id="problem-sandbox-title">{activeConcept.description}</h2>
        </header>
        <ProblemCardsPreview key={selectedConcept} variant={selectedConcept} />
      </section>
    </main>
  );
}
