export type WorkItem = {
  title: string;
  displayTitle?: string;
  slug: string;
  tag: string;
  image: string;
  heroImage?: string;
  featuredImage?: string;
  summary: string;
  isComingSoon?: boolean;
  overview?: CaseStudyOverview;
  blocks?: CaseStudyBlock[];
  metadata?: CaseStudyMetadata[];
  sections?: CaseStudySection[];
  gallery: CaseStudyMedia[];
  notes: CaseStudyNote[];
};

export type CaseStudyMetadata = {
  label: string;
  value: string;
};

export type CaseStudyOverview = {
  items: CaseStudyMetadata[];
  summary?: string;
  body: string[];
};

export type CaseStudySection = {
  eyebrow: string;
  title: string;
  body: string[];
  media?: {
    label: string;
    aspectRatio?: number;
  };
};

export type CaseStudyBlock =
  | {
      type: "metadata";
      items: CaseStudyMetadata[];
    }
  | {
      type: "overview";
      items: CaseStudyMetadata[];
      summary?: string;
      body: string[];
    }
  | {
      type: "text";
      eyebrow?: string;
      title?: string;
      body: string[];
      align?: "left" | "center";
      width?: CaseStudyBlockWidth;
    }
  | {
      type: "narrative";
      body: string[];
      width?: CaseStudyBlockWidth;
    }
  | {
      type: "media";
      label: string;
      src?: string;
      videoSrc?: string;
      embedSrc?: string;
      caption?: string;
      aspectRatio?: number;
      width?: CaseStudyBlockWidth;
    }
  | {
      type: "viewGrid";
      items: CaseStudyViewCard[];
      width?: CaseStudyBlockWidth;
    }
  | {
      type: "stepFlow";
      title?: string;
      label?: string;
      items: CaseStudyStep[];
      width?: CaseStudyBlockWidth;
    }
  | {
      type: "comparison";
      items: CaseStudyComparisonPanel[];
      width?: CaseStudyBlockWidth;
    }
  | {
      type: "problemCards";
      label: string;
      items: CaseStudyProblemCard[];
      width?: CaseStudyBlockWidth;
    }
  | {
      type: "specSamples";
      label: string;
      items: CaseStudySpecSample[];
      width?: CaseStudyBlockWidth;
    }
  | {
      type: "impact";
      label: string;
      statement: string;
      outcomes: CaseStudyImpactOutcome[];
      footnote?: string;
      width?: CaseStudyBlockWidth;
    }
  | {
      type: "showcase";
      label?: string;
      title?: string;
      body?: string;
      items: CaseStudyShowcaseItem[];
      width?: CaseStudyBlockWidth;
    }
  | {
      type: "spotlight";
      title: string;
      body: string[];
      media: {
        label: string;
        src?: string;
        videoSrc?: string;
        embedSrc?: string;
        caption?: string;
        aspectRatio?: number;
        width?: CaseStudyBlockWidth;
      };
    }
  | {
      type: "split";
      eyebrow?: string;
      title: string;
      body: string[];
      variant?: "default" | "feature";
      media: {
        label: string;
        src?: string;
        caption?: string;
        aspectRatio?: number;
        bentoItems?: {
          label: string;
          src?: string;
          fit?: "cover" | "contain";
          span?: "large" | "small";
        }[];
      };
      mediaSide?: "left" | "right";
    };

export type CaseStudyBlockWidth = "content" | "wide" | "large" | "full";

export type CaseStudyViewCard = {
  title: string;
  description: string;
  icon: string;
  kind: "table" | "timeline" | "gantt" | "board";
};

export type CaseStudyStep = {
  title: string;
  description: string;
  image?: string;
  label: string;
};

export type CaseStudyComparisonPanel = {
  title: string;
  label: string;
  src?: string;
  watermark?: string;
};

export type CaseStudyProblemCard = {
  audience: string;
  title: string;
  body: string;
  tone: "red" | "amber";
  avatar?: string;
  image?: string;
};

export type CaseStudySpecSample = {
  title: string;
  description: string;
  href: string;
  action: string;
  kind: "prototype" | "spec";
  image?: string;
  video?: string;
};

export type CaseStudyImpactOutcome = {
  number: string;
  title: string;
  body: string;
};

export type CaseStudyShowcaseItem = {
  title: string;
  description: string;
  src: string;
  span?: "full" | "half";
};

export type CaseStudyMedia = {
  src: string;
  caption: string;
  aspectRatio?: number;
};

export type CaseStudyNote = {
  title: string;
  body: string;
};

// Pulled from Framer /work page. Featured project gets the hero treatment;
// the rest render as compact list items.
export const featuredWork: WorkItem = {
  title: "Smartsheet Reports",
  slug: "smartsheet-reports",
  tag: "Smartsheet • 2025–2026",
  image: "/work/smartsheet-reports/empty-mock-hero.jpg",
  heroImage: "/work/smartsheet-reports/empty-mock-hero.jpg",
  featuredImage: "/work/smartsheet-reports/orange-peak-final-card.jpg",
  summary: "Led the design effort for modernizing and positioning Smartsheet's primary data aggregation surface.",
  overview: {
    items: [
      { label: "Role", value: "Lead designer" },
      { label: "Team", value: "PM • Researcher • 4 Engineers" },
      { label: "Teams", value: "3 converging teams" },
      { label: "Duration", value: "8 months" },
    ],
    body: [
      "The Report asset in Smartsheet combines data across multiple Sheets.",
      "I led the effort to modernize the experience and help leadership decide how Reports should fit alongside adjacent platform capabilities.",
    ],
  },
  blocks: [
    {
      type: "stepFlow",
      width: "full",
      label: "HOW IT WORKS",
      items: [
        {
          title: "Select Sheets",
          description: "Choose the Sheets that power the Report.",
          image: "/work/smartsheet-reports/asset-picker.png",
          label: "Select Sheets placeholder",
        },
        {
          title: "Manage fields",
          description: "Choose columns or summary fields to include.",
          image: "/work/smartsheet-reports/manage-fields.png",
          label: "Manage fields placeholder",
        },
        {
          title: "Define rows",
          description: "Choose which rows are included.",
          image: "/work/smartsheet-reports/define-rows.png",
          label: "Define rows placeholder",
        },
      ],
    },
    {
      type: "text",
      title: "Smartsheet spent much of the 2020s rebuilding the core views within its primary asset, the Sheet.",
      align: "center",
      width: "full",
      body: [
        "Bringing those new views to the Report was the natural next step.",
      ],
    },
    {
      type: "viewGrid",
      width: "wide",
      items: [
        {
          title: "Table",
          description: "Organize work in a table with rows and customizable columns.",
          icon: "/work/smartsheet-reports/view-icons/table.svg",
          kind: "table",
        },
        {
          title: "Board",
          description: "Manage agile work with cards on a Kanban board.",
          icon: "/work/smartsheet-reports/view-icons/board.svg",
          kind: "board",
        },
        {
          title: "Timeline",
          description: "Visualize related tasks and milestones across time.",
          icon: "/work/smartsheet-reports/view-icons/timeline.svg",
          kind: "timeline",
        },
      ],
    },
    {
      type: "comparison",
      width: "full",
      items: [
        {
          title: "Old table report",
          label: "Legacy Report mockup placeholder",
          src: "/work/smartsheet-reports/legacy-table-report.png",
          watermark: "Old",
        },
        {
          title: "New table report",
          label: "New Report mockup placeholder",
          src: "/work/smartsheet-reports/new-table-report.png",
          watermark: "New",
        },
      ],
    },
    {
      type: "text",
      title: "More than a reskin",
      body: [
        "Early explorations made it clear there were fundamental issues preventing people from getting the most out of the tool.",
        "The legacy Report bundled data aggregation and display controls into one admin-only configuration layer. Collaborators, anyone shared to the Report below admin level, got a read-only view with no ability to explore the data themselves. At the same time, the creation experience felt cumbersome and unintuitive, creating unnecessary friction for report builders.",
      ],
    },
    {
      type: "problemCards",
      width: "full",
      label: "TWO BIG PROBLEMS",
      items: [
        {
          audience: "Collaborator",
          title: "Rigid consumption",
          body: "Collabs are stuck with the admin’s setup, unable to filter, group, or sort the data for their own needs.",
          tone: "red",
          avatar: "/work/smartsheet-reports/problem-avatars/collaborator-card.jpg",
          image: "/work/smartsheet-reports/problem-people/collaborator-optimized.jpg",
        },
        {
          audience: "Creator",
          title: "Guidance & usability",
          body: "Defining which Sheets, fields, and rows belonged in the Report was complex, with clunky controls and little guidance.",
          tone: "amber",
          avatar: "/work/smartsheet-reports/problem-avatars/creator-card.jpg",
          image: "/work/smartsheet-reports/problem-people/creator-optimized.jpg",
        },
      ],
    },
    {
      type: "split",
      title: "Pulling the configuration model apart",
      body: [
        "The core insight was that some admin controls were essential to defining what data was included and how it was aggregated, while other controls were purely for changing the display of data.",
        "We consolidated source data to three steps and isolated them from the display controls in the toolbar.",
      ],
      variant: "feature",
      media: {
        label: "Configuration model",
        src: "/work/smartsheet-reports/orange-peak-final-card.jpg",
      },
      mediaSide: "right",
    },
    {
      type: "split",
      title: "Aligning with nascent capabilities",
      body: [
        "The Sheet team was introducing a new way to save filters, groups, and sorts to views. This lent itself to the ability for admins to maintain curation of display controls while enabling collaborators to deviate.",
        "I worked with that team to keep Sheets and Reports consistent, since both used the same view primitives.",
      ],
      variant: "feature",
      media: {
        label: "Custom Views",
        src: "/work/smartsheet-reports/custom-views-side.jpg",
      },
      mediaSide: "left",
    },
    {
      type: "split",
      title: "Contributing new features",
      body: [
        "Reports needed grouping and summary calculations to reach parity with the legacy experience. Those features did not exist in the Sheet, so we designed with the intention to extend back to the Sheet.",
      ],
      variant: "feature",
      media: {
        label: "Grouping and summaries placeholder",
        bentoItems: [
          {
            label: "Summary calculations",
            src: "/work/smartsheet-reports/summary-calculation.jpg",
            span: "large",
          },
          {
            label: "Calculate",
            src: "/work/smartsheet-reports/calculate.jpg",
          },
          {
            label: "Grouping control",
            src: "/work/smartsheet-reports/grouping-control-final.png",
          },
        ],
      },
      mediaSide: "right",
    },
    {
      type: "specSamples",
      width: "full",
      label: "SPEC SAMPLES",
      items: [
        {
          title: "Figma Make",
          description: "Prototype of grouping interaction and menu logic.",
          href: "https://hush-drawn-49113008.figma.site/",
          action: "Open prototype",
          kind: "prototype",
          image: "/work/smartsheet-reports/figma-make-prototype.png",
          video: "/work/smartsheet-reports/figma-make-blue-bg.mp4",
        },
        {
          title: "Figma Spec",
          description: "Complete details for grouping and summary calculations.",
          href: "https://www.figma.com/design/8eIcQsTHhBcBEFqeLdiNyz/Spec-Sample%E2%80%94Grouping---Calculate?node-id=4-154228&t=4yJ9LXBuoRZ3nhmm-1",
          action: "Open spec",
          kind: "spec",
          image: "/work/smartsheet-reports/figma-spec.png",
          video: "/work/smartsheet-reports/figma-spec-loop-3.mp4",
        },
      ],
    },
    {
      type: "spotlight",
      title: "Defending the Report's right to exist",
      body: [
        "Halfway through the project, our CPO asked whether Reports needed to exist at all. The question was fair: Smartsheet had several tools built on the table primitive, and customers were confused which tool was right for their job.",
        "Reports, Custom Views, and Dynamic View all touched the same problem space, but no one owned the overlap strategy. I stepped in to lead the alignment across teams, map tradeoffs, and drive the group toward a clear path forward.",
      ],
      media: {
        label: "Cross-team alignment walkthrough",
        videoSrc: "/work/smartsheet-reports/cross-team-walkthrough.mp4",
        aspectRatio: 16 / 9,
        width: "large",
      },
    },
    {
      type: "impact",
      width: "full",
      label: "Leadership impact",
      statement: "I turned cross-team ambiguity into a clear direction people could build toward.",
      outcomes: [
        {
          number: "01",
          title: "Reports stayed separate",
          body: "Avoid a risky and expensive migration path for millions of existing Reports.",
        },
        {
          number: "02",
          title: "Sheet gained parity",
          body: "Extend grouping and summaries into Sheets to reduce Report dependency.",
        },
        {
          number: "03",
          title: "Reports got clearer framing",
          body: "Explore naming around Reports’ real value: combining Sheet data into one view.",
        },
      ],
    },
    {
      type: "text",
      title: "Carrying the work forward",
      body: [
        "A company reorg moved me to another team before all planned releases were complete. I partnered with the incoming designer and PM to transfer the work and shape future releases, including Report rebranding and Smart Assist (AI) integration.",
        "This project clarified the kind of impact I want to have: stepping into ambiguity, connecting teams, and turning competing directions into a product strategy people can build toward.",
      ],
    },
  ],
  gallery: [],
  notes: [],
};

export const otherWork: WorkItem[] = [
  {
    title: "Resource Management Integration",
    slug: "resource-management-integration",
    tag: "Smartsheet • 2023–2025",
    image: "https://framerusercontent.com/images/M4zg6qfsk1D0olgL6pjgR084nI.jpg?scale-down-to=512&width=2160&height=1620",
    summary: "Resource Management Integration",
    isComingSoon: true,
    gallery: [],
    notes: [],
  },
  {
    title: "American Modern Insurance",
    slug: "american-modern-insurance",
    tag: "KPMG • 2021–2022",
    image: "/masonry/amig.png",
    heroImage: "/masonry/amig.png",
    summary: "A concise case study placeholder for the American Modern Insurance experience design work.",
    isComingSoon: true,
    overview: {
      items: [
        { label: "Role", value: "Product designer" },
        { label: "Team", value: "KPMG Studio, client stakeholders, engineering partners" },
        { label: "Client", value: "American Modern Insurance" },
        { label: "Duration", value: "2021–2022" },
      ],
      body: [
        "American Modern Insurance needed a clearer digital experience for quoting, product discovery, and policyholder workflows.",
        "I helped shape a more focused interface direction that made complex insurance choices easier to understand and easier to act on.",
      ],
    },
    blocks: [
      {
        type: "text",
        title: "Simplifying a complex product surface",
        body: [
          "The work centered on making insurance tasks feel less fragmented. Customers and internal teams needed clearer pathways through product information, quoting moments, and supporting details that usually lived across separate touchpoints.",
          "The design direction prioritized plain hierarchy, decisive calls to action, and page structures that could scale across product lines without making every page feel custom-built from scratch.",
        ],
      },
      {
        type: "media",
        width: "wide",
        label: "American Modern interface direction",
        src: "/masonry/amig.png",
        aspectRatio: 900 / 1120,
      },
      {
        type: "text",
        title: "Designing for trust and momentum",
        body: [
          "The core interaction challenge was balancing confidence with speed. Insurance users need enough information to trust what they are selecting, but too much explanation slows the flow and makes every decision feel heavier than it needs to be.",
          "I used compact content patterns, progressive detail, and consistent action placement to help the experience feel guided without becoming rigid.",
        ],
      },
      {
        type: "media",
        width: "wide",
        label: "AMIG supporting screen placeholder",
        src: "/masonry/kpmg-app.png",
        aspectRatio: 1,
      },
      {
        type: "impact",
        width: "full",
        label: "Project impact",
        statement: "The work gave the client a clearer digital product direction for a complicated insurance experience.",
        outcomes: [
          {
            number: "01",
            title: "Clearer paths",
            body: "Organized product and quote flows around the decisions users actually needed to make.",
          },
          {
            number: "02",
            title: "Reusable patterns",
            body: "Established page and component patterns that could scale across related insurance journeys.",
          },
          {
            number: "03",
            title: "Stakeholder alignment",
            body: "Created a tangible direction for client, design, and implementation conversations.",
          },
        ],
      },
    ],
    gallery: [],
    notes: [],
  },
  {
    title: "MetLife Mexico",
    slug: "metlife-mexico",
    tag: "KPMG • 2021",
    image: "/masonry/metlife.png",
    heroImage: "/work/metlife-mexico/metlife-grid-display.png",
    featuredImage: "/work/metlife-mexico/home-dashboard.png",
    summary: "A concise case study for a MetLife Mexico agent portal designed to centralize portfolio management, client service, and sales activity.",
    overview: {
      items: [
        { label: "Role", value: "Lead designer" },
        { label: "Team", value: "2 Designers • 2 Researchers" },
        { label: "Duration", value: "4 months" },
        { label: "Deliverable", value: "Agent Portal MVP" },
      ],
      body: [
        "MetLife Mexico needed a centralized workspace where agents could manage their business from one place.",
      ],
    },
    blocks: [
      {
        type: "showcase",
        width: "large",
        items: [
          {
            title: "Home dashboard",
            description: "A unified home for priorities, performance, and daily work.",
            src: "/work/metlife-mexico/dashboard-display.png",
            span: "full",
          },
          {
            title: "Client relationships",
            description: "Manage clients, policies, and communication from one place.",
            src: "/work/metlife-mexico/clients-display.png",
            span: "full",
          },
          {
            title: "Activities",
            description: "Track service requests, follow-ups, and daily sales work.",
            src: "/work/metlife-mexico/activities-display.png",
            span: "full",
          },
          {
            title: "Products + performance",
            description: "Connect product knowledge with portfolio performance.",
            src: "/work/metlife-mexico/performance-display.png",
            span: "full",
          },
        ],
      },
      {
        type: "impact",
        width: "full",
        label: "Business impact",
        statement: "The MVP established a shared vision for MetLife Mexico's future agent platform.",
        outcomes: [
          {
            number: "01",
            title: "Unified workflows",
            body: "Combined sales, servicing, and performance into one workspace.",
          },
          {
            number: "02",
            title: "Validated with agents",
            body: "20 interviews shaped the MVP before implementation.",
          },
          {
            number: "03",
            title: "Clear implementation path",
            body: "Delivered build-ready flows and prototypes.",
          },
          {
            number: "04",
            title: "Executive alignment",
            body: "Created a shared vision for the future agent experience.",
          },
        ],
      },
    ],
    gallery: [],
    notes: [],
  },
];

export const allWork = [featuredWork, ...otherWork];
export const routeableWork = allWork.filter((item) => !item.isComingSoon);

const fallbackGallery = [
  "https://framerusercontent.com/images/GmLtgWMAItPR9A4q6e8dZ9MFUDo.png?width=3200&height=2400",
  "https://framerusercontent.com/images/f9iUhvbT4lerSn7WvgX7fZz9M.png?width=3200&height=2400",
  "https://framerusercontent.com/images/mMXRBILXNX0XeF5DQrx1eoAO4uo.png?width=3200&height=2400",
];

export function getCaseStudy(slug: string) {
  const project = routeableWork.find((item) => item.slug === slug);

  if (!project) return undefined;

  return {
    ...project,
    gallery: project.gallery.length
      ? project.gallery
      : fallbackGallery.map((src, index) => ({
          src,
          caption: ["Exploration", "Interaction Detail", "System Direction"][index],
        })),
    notes: project.notes.length
      ? project.notes
      : [
          {
            title: "Context",
            body: "A placeholder space for the project background, customer problem, and product constraints that shaped the work.",
          },
          {
            title: "Process",
            body: "Use this section to capture the design decisions, prototypes, tradeoffs, and moments that moved the project forward.",
          },
        ],
  };
}
