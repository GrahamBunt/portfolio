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
  image: "/work/smartsheet-reports/homepage-card.png",
  homepageImage: "/work/smartsheet-reports/homepage-card.png",
  upNextImage: "/work/smartsheet-reports/up-next.png",
  heroImage: "/work/smartsheet-reports/hero-2x.jpg",
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
      type: "text",
      title: "More than a reskin",
      body: [],
    },
    {
      type: "problemCards",
      width: "full",
      label: "TWO BIG PROBLEMS",
      items: [],
    },
    {
      type: "split",
      title: "Pulling the configuration model apart",
      body: [],
      variant: "feature",
      media: {
        label: "Configuration model",
      },
      mediaSide: "right",
    },
    {
      type: "split",
      title: "Aligning with nascent capabilities",
      body: [],
      variant: "feature",
      media: {
        label: "Custom Views",
      },
      mediaSide: "left",
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
    title: "MetLife Mexico",
    slug: "metlife-mexico",
    tag: "KPMG • 2021",
    image: "/work/metlife-mexico/homepage-card.png",
    homepageImage: "/work/metlife-mexico/homepage-card.png",
    upNextImage: "/work/metlife-mexico/up-next.png",
    heroImage: "/work/metlife-mexico/hero-2x.jpg",
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
export const routeableWork = allWork.filter((item) => ["smartsheet-reports", "metlife-mexico"].includes(item.slug));
const locallyRouteableWork = routeableWork;

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
