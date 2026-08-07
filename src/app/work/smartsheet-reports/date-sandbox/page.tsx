import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { preventTextOrphans } from "@/lib/typography";

export const metadata: Metadata = {
  title: "Smartsheet Reports Date Sandbox - Graham Bunt",
  description: "Date format and styling explorations for the Smartsheet Reports case study header.",
};

const dateFormats = [
  {
    label: "Compact abbreviated",
    value: "Aug 2025–Apr 2026",
  },
  {
    label: "Spaced abbreviated",
    value: "Aug 2025 – Apr 2026",
  },
  {
    label: "Full month compact",
    value: "August 2025–April 2026",
  },
  {
    label: "Full month spaced",
    value: "August 2025 – April 2026",
  },
  {
    label: "Plain language",
    value: "August 2025 to April 2026",
  },
  {
    label: "Abbreviated with periods",
    value: "Aug. 2025–Apr. 2026",
  },
  {
    label: "Short year",
    value: "Aug '25–Apr '26",
  },
  {
    label: "Slash separated",
    value: "Aug 2025 / Apr 2026",
  },
  {
    label: "Numeric month",
    value: "08.2025–04.2026",
  },
  {
    label: "Duration plus range",
    value: "8 months · Aug 2025–Apr 2026",
  },
];

const styleVariants = [
  {
    id: "face-eyebrow",
    label: "Face-card eyebrow",
  },
  {
    id: "muted-description",
    label: "Muted description",
  },
  {
    id: "compact-meta",
    label: "Compact meta",
  },
  {
    id: "white-meta",
    label: "White meta",
  },
  {
    id: "serif-note",
    label: "Serif note",
  },
  {
    id: "quiet-rule",
    label: "Quiet rule",
  },
];

const title = "Smartsheet Reports";
const summary = "Modernized one of Smartsheet's core platform capabilities while aligning three teams around its long-term direction.";

export default function SmartsheetReportsDateSandboxPage() {
  return (
    <div className="date-sandbox-page">
      <SiteNav showBack />
      <main className="date-sandbox-main">
        <header className="date-sandbox-intro font-sans-preview">
          <p>Date Formatting Sandbox</p>
          <h1>Smartsheet Reports header date treatments</h1>
          <p>
            Each row keeps the same header context and changes only the date string and presentation.
          </p>
        </header>

        <div className="date-format-list">
          {dateFormats.map((format, formatIndex) => (
            <section key={format.value} className="date-format-section" aria-labelledby={`date-format-${formatIndex}`}>
              <div className="date-format-label font-sans-preview">
                <span>{String(formatIndex + 1).padStart(2, "0")}</span>
                <h2 id={`date-format-${formatIndex}`}>{format.label}</h2>
                <p>{format.value}</p>
              </div>

              <div className="date-style-grid">
                {styleVariants.map((variant) => (
                  <article key={`${format.value}-${variant.id}`} className={`date-style-preview is-${variant.id}`}>
                    <div className="date-style-label font-sans-preview">{variant.label}</div>
                    <div className="date-header-context">
                      <p className="date-header-meta font-sans-preview">{preventTextOrphans(format.value)}</p>
                      <h3>{title}</h3>
                      <p className="date-header-summary font-sans-preview">{preventTextOrphans(summary)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
