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
  warmImageAssets?: string[];
  warmVideoAssets?: string[];
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
      poster?: string;
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
        poster?: string;
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

// Pulled from Framer /work page. Featured project gets the hero treatment;
// the rest render as compact list items.
export const featuredWork: WorkItem = {
  title: "Smartsheet Reports",
  slug: "smartsheet-reports",
  tag: "Smartsheet • 2025–2026",
  image: "/work/smartsheet-reports/homepage-card-fast.webp",
  homepageImage: "/work/smartsheet-reports/homepage-card-fast.webp",
  upNextImage: "/work/smartsheet-reports/up-next-fast.webp",
  heroImage: "/work/smartsheet-reports/hero-fast.webp",
  warmImageAssets: [
    "/work/smartsheet-reports/legacy-report-fast.webp",
    "/work/smartsheet-reports/paradigm-1-fast.webp",
    "/work/smartsheet-reports/bento-top-left-fast.webp",
    "/work/smartsheet-reports/bento-top-right-fast.webp",
    "/work/smartsheet-reports/bento-bottom-left-fast.webp",
    "/work/smartsheet-reports/bento-bottom-middle-fast.webp",
    "/work/smartsheet-reports/bento-bottom-right-fast.webp",
    "/work/smartsheet-reports/grouping-levels-fast.webp",
    "/work/smartsheet-reports/figma-make-prototype-fast.webp",
    "/work/smartsheet-reports/figma-spec-fast.webp",
    "/work/smartsheet-reports/smartassist-fast.webp",
    "/work/smartsheet-reports/cross-team-walkthrough-poster.jpg",
  ],
  warmVideoAssets: [
    "/work/smartsheet-reports/figma-make-blue-bg-loop.mp4",
    "/work/smartsheet-reports/figma-spec-loop.mp4",
  ],
  summary: "Modernized one of Smartsheet's core platform capabilities while aligning three teams around its long-term direction.",
  cardMeta: "Smartsheet • Case Study",
  caseStudyMeta: "Case Study • Aug '25 – Mar '26",
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
          image: "/work/smartsheet-reports/figma-make-prototype-fast.webp",
          video: "/work/smartsheet-reports/figma-make-blue-bg-loop.mp4",
        },
        {
          title: "Grouping and calculate spec excerpt",
          href: "https://www.figma.com/design/8eIcQsTHhBcBEFqeLdiNyz/Spec-Sample%E2%80%94Grouping---Calculate?node-id=4-154228&t=4yJ9LXBuoRZ3nhmm-1",
          action: "Open spec",
          kind: "spec",
          image: "/work/smartsheet-reports/figma-spec-fast.webp",
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
        videoSrc: "/work/smartsheet-reports/cross-team-walkthrough-fast.mp4",
        poster: "/work/smartsheet-reports/cross-team-walkthrough-poster.jpg",
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
      footnote: "Defining a clear strategy and aligning teams around it can be one of the biggest challenges in product development. It's also where I've found design can have the greatest impact.",
    },
  ],
};

export const otherWork: WorkItem[] = [
  {
    ...featuredWork,
    title: "Resource Management Integration",
    slug: "resource-management-integration",
    displayTitle: "Resource Management Integration",
    image: "/work/resource-management-integration/hero-updated.png",
    homepageImage: "/work/resource-management-integration/homepage-card-fast.webp",
    upNextImage: "/work/resource-management-integration/up-next-fast.webp",
    heroImage: "/work/resource-management-integration/hero-updated.png",
    summary: "Shaped the future of a declining $35M ARR acquisition while integrating its core capabilities into Smartsheet.",
    cardMeta: "Smartsheet • Case Study",
    caseStudyMeta: "Case Study • Mar ‘22 - Jan ‘25",
    overview: {
      items: [],
      body: [
        "Smartsheet acquired 10,000ft to bring resource management capabilities into the platform. By the time I joined the team, 10,000ft had been renamed Resource Management and the focus was on integrating the two products.",
        "Resource Management was a declining $35M ARR business unit without a clear long-term direction. I worked across a series of initiatives that balanced customer needs, business priorities, and the broader question of how Resource Management could become a sustainable part of the Smartsheet platform.",
      ],
    },
    blocks: [
      {
        type: "text",
        title: "Creating demand",
        body: [
          "Only 4.2% of Smartsheet customers were using Resource Management, so we brought its strongest capabilities into Smartsheet to create demand for the premium product.",
          "I replaced an error-prone 20+ click onboarding process with a simple column mapping experience that connected sheets to Resource Management projects. We also brought Resource Management's core workload schedule directly into the sheet. The experience improved, but we hadn't addressed the sales-assisted path required to become a paying customer, limiting our ability to materially move adoption.",
        ],
      },
      {
        type: "text",
        title: "Customer retention",
        body: [
          "As we continued searching for a sustainable path to growth, our attention shifted to immediate customer retention. Several high-value renewals depended on tighter integration, including sending Resource Management report data into sheets and keeping it automatically synced.",
          "I defined the direction for that integration using Smartsheet’s Data Shuttle, while acting as a player-coach for a junior designer through delivery. The release immediately protected roughly $850K ARR in renewals and influenced another $300K ARR shortly thereafter.",
        ],
      },
      {
        type: "text",
        title: "Inherited strategy",
        body: [
          "Everything changed when an engineer on the team embedded the standalone Resource Management product into Smartsheet's global navigation as part of a hackathon project. The concept gained traction with leadership and became the direction the team rallied behind.",
          "It wasn't a strategy our team had intentionally chosen, but that became an important lesson for me. If a product team doesn't define a clear and compelling strategy, it will eventually inherit one.",
        ],
      },
      {
        type: "text",
        title: "Visibility and vision",
        body: [
          "With Resource Management in the global navigation, existing customers could access the product directly from Smartsheet. For everyone else, the new entry point led to an upsell page and the same sales-assisted motion we had relied on before. For the first time, we could see how many customers were discovering and showing interest in Resource Management, which became especially important as Smartsheet approached a private equity takeover.",
          "From there, the focus was both fixing the path into Resource Management and giving customers new reasons to use it. I defined a self-serve experience that let customers select sheets in bulk, map their data to Resource Management, and start with projects, people, and workload data already in place. In parallel, I joined a sales and product tiger team to define Scenario Planning, a new tool for exploring staffing changes before committing them to a resource plan.",
          "The self-serve vision became part of the plan to get the existing business healthy, while Scenario Planning brought new excitement and momentum to the product. Together, they became the vision I helped define for Resource Management and the foundation for a multi-year roadmap.",
        ],
      },
      {
        type: "impact",
        label: "Perspective",
        statement: "Resource Management taught me to think about product design through the lens of the business. We were constantly balancing customer needs, experience improvements, and long-term product bets with the realities of a declining business unit.",
        outcomes: [],
        footnote: "Some well-intentioned investments failed to move the needle, others directly protected revenue, and the vision we ultimately defined became a multi-year roadmap that endured through Smartsheet's private equity takeover.",
      },
    ],
  },
  {
    title: "MetLife Mexico",
    slug: "metlife-mexico",
    tag: "KPMG • 2021",
    image: "/work/metlife-mexico/homepage-card-fast.webp",
    homepageImage: "/work/metlife-mexico/homepage-card-fast.webp",
    upNextImage: "/work/metlife-mexico/up-next-fast.webp",
    heroImage: "/work/metlife-mexico/hero-fast.webp",
    warmImageAssets: [
      "/work/metlife-mexico/dashboard-display-fast.webp",
      "/work/metlife-mexico/clients-display-fast.webp",
      "/work/metlife-mexico/activities-display-fast.webp",
      "/work/metlife-mexico/performance-display-fast.webp",
    ],
    summary: "Built the foundation for MetLife Mexico's digital agent experience, unifying fragmented workflows into a single product.",
    cardMeta: "KPMG",
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
            src: "/work/metlife-mexico/dashboard-display-fast.webp",
            span: "full",
          },
          {
            title: "Client relationships",
            description: "Manage clients, policies, and communication from one place.",
            src: "/work/metlife-mexico/clients-display-fast.webp",
            span: "full",
          },
          {
            title: "Activities",
            description: "Track service requests, follow-ups, and daily sales work.",
            src: "/work/metlife-mexico/activities-display-fast.webp",
            span: "full",
          },
          {
            title: "Products + performance",
            description: "Connect product knowledge with portfolio performance.",
            src: "/work/metlife-mexico/performance-display-fast.webp",
            span: "full",
          },
        ],
      },
    ],
  },
];

export const allWork = [featuredWork, ...otherWork];
export const routeableWork = allWork.filter((item) => ["smartsheet-reports", "resource-management-integration", "metlife-mexico"].includes(item.slug));
const locallyRouteableWork = routeableWork;

export function getCaseStudy(slug: string) {
  const project = locallyRouteableWork.find((item) => item.slug === slug);

  if (!project) return undefined;

  return project;
}
