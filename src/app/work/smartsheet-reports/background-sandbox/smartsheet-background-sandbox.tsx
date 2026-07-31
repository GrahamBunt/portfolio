"use client";

import { useState } from "react";
import { CaseStudyPage } from "@/components/CaseStudyPage";
import { allWork, featuredWork } from "@/content/work";

const mvpCaseStudySlugs = ["smartsheet-reports", "metlife-mexico"];

const variants = [
  {
    id: "opening-band",
    label: "Opening band",
  },
  {
    id: "problem-solution-band",
    label: "Problem to solution",
  },
  {
    id: "three-act-bands",
    label: "Three act bands",
  },
] as const;

type VariantId = (typeof variants)[number]["id"];

export function SmartsheetBackgroundSandbox() {
  const [activeVariant, setActiveVariant] = useState<VariantId>("opening-band");
  const related = allWork.filter((item) => mvpCaseStudySlugs.includes(item.slug) && item.slug !== featuredWork.slug);

  return (
    <div className={`case-study-background-sandbox is-${activeVariant}`}>
      <div className="background-sandbox-tabs font-sans-preview" aria-label="Background treatments">
        {variants.map((variant) => (
          <button
            key={variant.id}
            className={variant.id === activeVariant ? "is-active" : ""}
            type="button"
            aria-pressed={variant.id === activeVariant}
            onClick={() => setActiveVariant(variant.id)}
          >
            {variant.label}
          </button>
        ))}
      </div>

      <CaseStudyPage project={featuredWork} related={related} />
    </div>
  );
}
