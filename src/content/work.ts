export type WorkItem = {
  title: string;
  displayTitle?: string;
  slug: string;
  tag: string;
  image: string;
  homepageImage?: string;
  upNextImage?: string;
  thumbnailImage?: string;
  heroImage?: string;
  featuredImage?: string;
  summary: string;
  cardMeta?: string;
  caseStudyMeta?: string;
  isComingSoon?: boolean;
  caseStudyLayout?: "deck";
  deckSlides?: CaseStudyPresentationSlide[];
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
      type: "editorialIntro";
      title: string;
      body: string[];
      width?: CaseStudyBlockWidth;
    }
  | {
      type: "editorialSplit";
      number: string;
      title: string;
      body: string[];
      media?: CaseStudyEditorialMedia | CaseStudyEditorialMedia[];
      width?: CaseStudyBlockWidth;
    }
  | {
      type: "editorialPullout";
      variant: "metric" | "quote" | "phrase";
      label?: string;
      value?: string;
      body?: string;
      items?: CaseStudyEditorialPulloutItem[];
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
      type: "presentationScroller";
      label?: string;
      title?: string;
      body?: string;
      slides: CaseStudyPresentationSlide[];
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
  description?: string;
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

export type CaseStudyEditorialPulloutItem = {
  value: string;
  label: string;
  body?: string;
};

export type CaseStudyEditorialMedia = {
  label: string;
  src: string;
  aspectRatio?: number;
  caption?: string;
};

export type CaseStudyShowcaseItem = {
  title: string;
  description: string;
  src: string;
  span?: "full" | "half";
};

export type CaseStudyPresentationSlide = {
  eyebrow?: string;
  title: string;
  description?: string;
  src?: string;
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
  homepageImage: "/work/smartsheet-reports/homepage-card.png",
  upNextImage: "/work/smartsheet-reports/up-next.png",
  heroImage: "/work/smartsheet-reports/hero-2x.jpg",
  thumbnailImage: "/work/smartsheet-reports/thumbnail.png",
  featuredImage: "/work/smartsheet-reports/orange-peak-final-card.jpg",
  summary: "Modernized one of Smartsheet's core platform capabilities while aligning three teams around its long-term direction.",
  cardMeta: "Smartsheet • Case Study • 2025–26",
  caseStudyMeta: "Case Study • Aug '25 – Feb '26",
  overview: {
    items: [
      { label: "Role", value: "Lead designer" },
      { label: "Team", value: "PM • Researcher • 4 Engineers" },
      { label: "Teams", value: "3 converging teams" },
      { label: "Duration", value: "8 months" },
    ],
    body: [
      "Smartsheet spent much of the early to mid-2020s rebuilding the core views within its primary asset, the sheet. Bringing those new views to reports, the surface that combines data across multiple sheets, was the next step in that platform strategy.",
      "I was responsible for modernizing reports, but the project quickly grew beyond a visual refresh. We rethought the aggregation experience, addressed years of customer feedback, and resolved long-standing usability issues.",
      "When the work began to overlap with adjacent platform capabilities, I stepped in to align three converging teams and help define the long-term role reports should play within Smartsheet.",
    ],
  },
  blocks: [
    {
      type: "comparison",
      width: "full",
      items: [
        {
          title: "Old table report",
          label: "Legacy report mockup placeholder",
          src: "/work/smartsheet-reports/legacy-table-report.png",
          watermark: "Old",
        },
        {
          title: "New table report",
          label: "New report mockup placeholder",
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
        "The legacy report bundled data aggregation and display controls into one admin-only configuration layer. Collaborators, anyone shared to the report below admin level, got a read-only view with no ability to explore the data themselves. At the same time, the creation experience felt cumbersome and unintuitive, creating unnecessary friction for report builders.",
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
          body: "The top customer request was giving collaborators control to filter, group, and sort reports for their own needs.",
          tone: "red",
          avatar: "/work/smartsheet-reports/problem-avatars/collaborator-card.jpg",
          image: "/work/smartsheet-reports/problem-people/collaborator-optimized.jpg",
        },
        {
          audience: "Creator",
          title: "Guidance & usability",
          body: "Defining which sheets, fields, and rows belonged in the report was complex, with clunky controls and little guidance.",
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
      type: "stepFlow",
      width: "full",
      label: "HOW IT WORKS",
      items: [
        {
          title: "Select sheets",
          description: "Choose the sheets that power the report.",
          image: "/work/smartsheet-reports/asset-picker.png",
          label: "Select sheets placeholder",
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
      type: "split",
      title: "Aligning with nascent capabilities",
      body: [
        "The sheet team was introducing a new way to save filters, groups, and sorts to views. This lent itself to the ability for admins to maintain curation of display controls while enabling collaborators to deviate.",
        "I worked with that team to keep sheets and reports consistent, since both used the same view primitives.",
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
        "Grouping and summary calculations were required for reports to reach parity with the legacy experience. Those features did not exist in the sheet, so we designed with the intention to extend back to the sheet.",
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
      label: "Spec samples",
      items: [
        {
          title: "Grouping interaction and menu logic",
          href: "https://hush-drawn-49113008.figma.site/",
          action: "Open prototype",
          kind: "prototype",
          image: "/work/smartsheet-reports/figma-make-prototype.png",
          video: "/work/smartsheet-reports/figma-make-blue-bg-loop.mp4",
        },
        {
          title: "Grouping and calculate spec excerpt",
          href: "https://www.figma.com/design/8eIcQsTHhBcBEFqeLdiNyz/Spec-Sample%E2%80%94Grouping---Calculate?node-id=4-154228&t=4yJ9LXBuoRZ3nhmm-1",
          action: "Open spec",
          kind: "spec",
          image: "/work/smartsheet-reports/figma-spec.png",
          video: "/work/smartsheet-reports/figma-spec-loop.mp4",
        },
      ],
    },
    {
      type: "spotlight",
      title: "Defending the report's right to exist",
      body: [
        "Before implementation, our CPO posed an existential question: should reports exist as a separate asset?",
        "The question was fair. Reports, sheets, and dynamic views had begun to overlap, leaving customers unsure which tool was right for the job.",
        "I aligned three teams around a strategy to keep reports separate, avoiding a costly migration of millions of legacy reports while clarifying its role within the platform and creating a shared direction for future investment.",
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
      label: "Reflection",
      statement: "The hardest part of this project wasn't redesigning the interface. It was defining the role reports should play within the platform and getting the team aligned. Once we had a shared direction, every downstream decision got easier, and the design work became an exercise in execution rather than existential debate.",
      outcomes: [],
      footnote: "Defining a clear strategy and aligning teams around it are often the most challenging aspects of product development. They're also where I've found design can have the greatest impact.",
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
    image: "/work/resource-management-integration/thumbnail.jpg",
    heroImage: "/work/resource-management-integration/thumbnail.jpg",
    thumbnailImage: "/work/resource-management-integration/thumbnail.jpg",
    summary: "Shaped the integration strategy for an acquired resource management platform inside Smartsheet.",
    overview: {
      items: [
        { label: "Role", value: "Product designer" },
        { label: "Company", value: "Smartsheet" },
        { label: "Focus", value: "Integration strategy" },
        { label: "Duration", value: "3 years" },
      ],
      body: [
        "Smartsheet acquired 10,000ft to bring resource management into the platform. My work sat in the messy middle: improving the standalone product, reducing integration friction, protecting revenue, and clarifying where the capability should live.",
      ],
    },
    blocks: [
      {
        type: "split",
        title: "Core question",
        body: [
          "The work kept returning to one question: where should Resource Management actually live?",
          "We could keep investing in it as a standalone product, reduce the friction between products, or rebuild its strongest capabilities natively inside Smartsheet.",
        ],
        media: {
          label: "Resource Management strategy placeholder",
        },
      },
      {
        type: "split",
        title: "Integration bets",
        body: [
          "We tried multiple paths instead of one linear roadmap: improving the standalone product, simplifying setup, unifying access, and surfacing workload planning inside Smartsheet.",
          "Those bets improved the experience, but they exposed the deeper issue: better access did not automatically create demand.",
        ],
        variant: "feature",
        media: {
          label: "Integration bets placeholder",
        },
      },
      {
        type: "split",
        title: "Business reality",
        body: [
          "Only 4.2% of Smartsheet customers were using Resource Management, so the integration needed to create demand, not just remove friction.",
          "While the broader strategy was still forming, I defined the direction for bringing Resource Management report data into Smartsheet sheets and coached a junior designer through delivery. That work protected about $850K ARR and influenced another $300K ARR.",
        ],
        media: {
          label: "Business reality placeholder",
        },
      },
      {
        type: "impact",
        width: "full",
        label: "Strategic takeaway",
        statement: "The project reframed acquisition integration as a product strategy problem, not a UX polish problem.",
        outcomes: [],
        footnote: "The middle ground was the trap. Resource Management either needed to be treated as a real standalone business or have its strongest capabilities rebuilt natively inside Smartsheet.",
      },
    ],
    gallery: [],
    notes: [],
  },
  {
    title: "American Modern Insurance",
    slug: "american-modern-insurance",
    tag: "KPMG • 2021–2022",
    image: "/masonry/amig.png",
    heroImage: "/work/american-modern-insurance/cs2-01.png",
    thumbnailImage: "/work/american-modern-insurance/thumbnail.png",
    summary: "Designed an insurance platform experience that simplified quoting, policy servicing, and operational handoff.",
    caseStudyLayout: "deck",
    deckSlides: [
      {
        title: "Opening slide",
        src: "/work/american-modern-insurance/cs2-01.png",
      },
      {
        title: "Discovery slide",
        src: "/work/american-modern-insurance/cs2-02.png",
      },
      {
        title: "Process slide",
        src: "/work/american-modern-insurance/cs2-03.png",
      },
      {
        title: "Experience slide",
        src: "/work/american-modern-insurance/cs2-04.png",
      },
      {
        title: "Final design slide",
        src: "/work/american-modern-insurance/cs2-05.png",
      },
      {
        title: "Slide 6",
        src: "/work/american-modern-insurance/cs2-06.png",
      },
      {
        title: "Slide 7",
        src: "/work/american-modern-insurance/cs2-07.png",
      },
      {
        title: "Slide 8",
        src: "/work/american-modern-insurance/cs2-08.png",
      },
      {
        title: "Slide 9",
        src: "/work/american-modern-insurance/cs2-09.png",
      },
      {
        title: "Slide 10",
        src: "/work/american-modern-insurance/cs2-10.png",
      },
      {
        title: "Slide 11",
        src: "/work/american-modern-insurance/cs2-11.png",
      },
      {
        title: "Slide 12",
        src: "/work/american-modern-insurance/cs2-12.png",
      },
      {
        title: "Slide 13",
        src: "/work/american-modern-insurance/cs2-13.png",
      },
      {
        title: "Slide 14",
        src: "/work/american-modern-insurance/cs2-14.png",
      },
      {
        title: "Final slide",
        src: "/work/american-modern-insurance/cs2-15.png",
      },
    ],
    gallery: [],
    notes: [],
  },
  {
    title: "MetLife Mexico",
    slug: "metlife-mexico",
    tag: "KPMG • 2021",
    image: "/work/metlife-mexico/thumbnail.png",
    homepageImage: "/work/metlife-mexico/homepage-card.png",
    upNextImage: "/work/metlife-mexico/up-next.png",
    thumbnailImage: "/work/metlife-mexico/metlife-grid-display.png",
    heroImage: "/work/metlife-mexico/hero-2x.jpg",
    featuredImage: "/work/metlife-mexico/home-dashboard.png",
    summary: "Built the foundation for MetLife Mexico's digital agent experience, unifying fragmented workflows into a single product.",
    cardMeta: "KPMG • Summary • 2021",
    caseStudyMeta: "Summary • 2021",
    overview: {
      items: [
        { label: "Role", value: "Lead designer" },
        { label: "Team", value: "2 Designers • 2 Researchers" },
        { label: "Duration", value: "4 months" },
        { label: "Deliverable", value: "Agent Portal MVP" },
      ],
      body: [
        "MetLife Mexico needed a centralized workspace where agents could manage client relationships, policy servicing, sales activity, and performance.",
        "I designed the MVP that unified those workflows into a single experience, laying the foundation for MetLife Mexico's digital agent experience.",
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
            src: "/work/metlife-mexico/dashboard-display-optimized.png",
            span: "full",
          },
          {
            title: "Client relationships",
            description: "Manage clients, policies, and communication from one place.",
            src: "/work/metlife-mexico/clients-display-optimized.png",
            span: "full",
          },
          {
            title: "Activities",
            description: "Track service requests, follow-ups, and daily sales work.",
            src: "/work/metlife-mexico/activities-display-optimized.png",
            span: "full",
          },
          {
            title: "Products + performance",
            description: "Connect product knowledge with portfolio performance.",
            src: "/work/metlife-mexico/performance-display-optimized.png",
            span: "full",
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
const locallyRouteableWork = process.env.NODE_ENV === "production" ? routeableWork : allWork;

const fallbackGallery = [
  "https://framerusercontent.com/images/GmLtgWMAItPR9A4q6e8dZ9MFUDo.png?width=3200&height=2400",
  "https://framerusercontent.com/images/f9iUhvbT4lerSn7WvgX7fZz9M.png?width=3200&height=2400",
  "https://framerusercontent.com/images/mMXRBILXNX0XeF5DQrx1eoAO4uo.png?width=3200&height=2400",
];

export function getCaseStudy(slug: string) {
  const project = locallyRouteableWork.find((item) => item.slug === slug);

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
