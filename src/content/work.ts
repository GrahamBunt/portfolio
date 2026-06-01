export type WorkItem = {
  title: string;
  displayTitle?: string;
  slug: string;
  tag: string;
  image: string;
  summary: string;
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
      body: string[];
    }
  | {
      type: "text";
      eyebrow?: string;
      title?: string;
      body: string[];
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
      };
      mediaSide?: "left" | "right";
    };

export type CaseStudyBlockWidth = "content" | "wide" | "full";

export type CaseStudyViewCard = {
  title: string;
  kind: "table" | "timeline" | "gantt" | "card";
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
  image: "https://framerusercontent.com/images/wYoiuVTRSJ0cIdLHzFk90nOF9E.jpg?scale-down-to=1024&width=2160&height=1620",
  summary: "Led the design effort for modernizing and positioning Smartsheet's primary data aggregation surface.",
  overview: {
    items: [
      { label: "Role", value: "Sole designer" },
      { label: "Team", value: "PM, Researcher, 4 Engineers" },
      { label: "Scope", value: "Surface modernization, multi-team convergence" },
    ],
    body: [
      "The Report asset in Smartsheet is the surface teams use to combine data across multiple sheets.",
      "I led the design effort to modernize the experience and help leadership decide how reports should fit alongside adjacent platform capabilities.",
    ],
  },
  blocks: [
    {
      type: "media",
      label: "Hero workflow placeholder",
      aspectRatio: 4 / 3,
      width: "wide",
    },
    {
      type: "text",
      title: "Introducing new views to the report asset",
      body: [
        "In the early 2020s Smartsheet set out on a multi-year effort to rebuild the core views in the sheet, its primary asset.",
        "Reports, the second most-used asset, used to combine data from multiple sheets, still ran on the legacy view system. Bringing new views to reports was the natural next step.",
      ],
    },
    {
      type: "viewGrid",
      items: [
        { title: "Table", kind: "table" },
        { title: "Timeline", kind: "timeline" },
        { title: "Gantt", kind: "gantt" },
        { title: "Card", kind: "card" },
      ],
    },
    {
      type: "text",
      title: "More than a reskin",
      body: [
        "Early explorations made it clear there were fundamental issues preventing people from getting the most out of the tool.",
        "The legacy report bundled data configuration and display controls into one admin-only layer. Collaborators, anyone shared to the report below admin level, got a read-only view with no ability to explore the data themselves. The top request from customers was to give more control to collaborators.",
      ],
    },
    {
      type: "media",
      label: "Legacy report constraints placeholder",
      aspectRatio: 4 / 3,
      width: "content",
    },
    {
      type: "text",
      title: "Pulling the configuration model apart",
      body: [
        "The insight was that some admin controls were essential to defining what data was included and how it was aggregated while other controls were purely for changing the display of data. The core tension was how to reserve the definition controls for admins while opening up the display controls for collaborators.",
      ],
    },
    {
      type: "split",
      title: "Admin definition, collaborator lens",
      body: [
        "Report definition consolidated into three steps: select sources, choose columns, and define rows.",
        "Everything else would open up to collaborators.",
      ],
      variant: "feature",
      media: { label: "Configuration model placeholder" },
      mediaSide: "right",
    },
    {
      type: "text",
      title: "Defending the report's right to exist",
      body: [
        "Halfway through the project, our CPO asked a hard question. Do we need a report at all?",
        "The question had weight. Recent research had documented an overlap problem across Smartsheet. Too many tools built on the same table-like primitive. Customers got confused about which one to reach for.",
        "Three teams converged on the problem. Reports, custom views, and Dynamic View. Three PMs, three designers, no official leader. I stepped in to coordinate. Not because I was asked to, but because the conversation needed someone to lead it.",
        "I mapped the tradeoffs for each capability and made the case to keep reports as a separate asset. Millions of legacy reports already lived in customer accounts. Folding reports into the sheet meant deprecating all of them or supporting two parallel models forever. And multi-sheet aggregation is a power-user job. Giving it a distinct home actually helps people find it.",
        "Leadership aligned. Reports stayed.",
      ],
    },
    {
      type: "media",
      label: "Cross-team alignment placeholder",
      aspectRatio: 4 / 3,
      width: "full",
    },
    {
      type: "text",
      title: "Designing the details across teams and systems",
      body: [
        "With the strategy settled, I went deep on the design specs for each definition step. Select sources required a new pattern in the universal asset picker. Choose columns meant working with the portfolios team to make the manage fields experience work in their context. Define rows led to an advanced filter pattern that I shaped with three other designers for consistency across the platform.",
        "Alongside this, I kept engineering fed with incremental work. The report team was releasing new views next to legacy views, so visual parity milestones mattered. I designed the new grouping experience early and handed it off quickly. Strategic work on one track, shipping craft on another.",
        "I published a full UX review of the core report experience and handed off complete specs to engineering. Then the reorg hit. I was moved to the wayfinding team and another designer took over the final stretch.",
      ],
    },
    {
      type: "media",
      label: "Definition step specs placeholder",
      aspectRatio: 4 / 3,
      width: "wide",
    },
    {
      type: "text",
      title: "What ambiguity taught me about leadership",
      body: [
        "I'm proud of a few things from this project. I stepped up when three teams converged and no one was in charge. I balanced strategic ambiguity with heads-down craft. I worked through a messy moment and set the report on stable footing for whoever carried it forward.",
        "The bigger takeaway is about leadership. I stopped waiting for permission. When the path got unclear, I leaned in and shaped the question the team needed to answer. That's the work I want more of.",
      ],
    },
  ],
  gallery: [],
  notes: [],
};

export const otherWork: WorkItem[] = [
  {
    title: "Project and Portfolio Management",
    slug: "project-and-portfolio-management",
    tag: "Smartsheet • 2025",
    image: "https://framerusercontent.com/images/WsjEGmBC6idcXZcKsrO1Sn5UNg.jpg?scale-down-to=512&width=2160&height=1620",
    summary: "Project and Portfolio Management",
    gallery: [],
    notes: [],
  },
  {
    title: "Scenario Planning",
    slug: "scenario-planning",
    tag: "Smartsheet • 2024–2025",
    image: "https://framerusercontent.com/images/M4zg6qfsk1D0olgL6pjgR084nI.jpg?scale-down-to=512&width=2160&height=1620",
    summary: "Scenario Planning",
    gallery: [],
    notes: [],
  },
  {
    title: "Resource Management Integration",
    slug: "resource-management-integration",
    tag: "Smartsheet • 2023–2024",
    image: "https://framerusercontent.com/images/M4zg6qfsk1D0olgL6pjgR084nI.jpg?scale-down-to=512&width=2160&height=1620",
    summary: "Resource Management Integration",
    gallery: [],
    notes: [],
  },
  {
    title: "American Modern Insurance",
    slug: "american-modern-insurance",
    tag: "KPMG • 2021–2022",
    image: "https://framerusercontent.com/images/aNzcXn8YsE4sy8K8Aoq3YSlYZU.png?scale-down-to=512&width=3200&height=2400",
    summary: "American Modern Insurance",
    gallery: [],
    notes: [],
  },
  {
    title: "MetLife Mexico",
    slug: "metlife-mexico",
    tag: "KPMG • 2021",
    image: "https://framerusercontent.com/images/kc6IsF2GDXNWwJQSk7F77a91hb8.png?scale-down-to=1024&width=5472&height=3648",
    summary: "MetLife Mexico",
    gallery: [
      {
        src: "https://framerusercontent.com/images/GmLtgWMAItPR9A4q6e8dZ9MFUDo.png?width=3200&height=2400",
        caption: "Main Screens",
      },
      {
        src: "https://framerusercontent.com/images/f9iUhvbT4lerSn7WvgX7fZz9M.png?width=3200&height=2400",
        caption: "Logo Animation",
      },
      {
        src: "https://framerusercontent.com/images/mMXRBILXNX0XeF5DQrx1eoAO4uo.png?width=3200&height=2400",
        caption: "For You Page",
      },
      {
        src: "https://framerusercontent.com/images/aNzcXn8YsE4sy8K8Aoq3YSlYZU.png?width=3200&height=2400",
        caption: "Product Landing Page",
      },
    ],
    notes: [
      {
        title: "Context",
        body: "A focused case study shell for documenting the problem space, product decisions, and interaction details behind the project.",
      },
      {
        title: "Process",
        body: "Use this section to describe how the work moved from early exploration into sharper product definition, visual systems, and final execution.",
      },
    ],
  },
];

export const allWork = [featuredWork, ...otherWork];

const fallbackGallery = [
  "https://framerusercontent.com/images/GmLtgWMAItPR9A4q6e8dZ9MFUDo.png?width=3200&height=2400",
  "https://framerusercontent.com/images/f9iUhvbT4lerSn7WvgX7fZz9M.png?width=3200&height=2400",
  "https://framerusercontent.com/images/mMXRBILXNX0XeF5DQrx1eoAO4uo.png?width=3200&height=2400",
];

export function getCaseStudy(slug: string) {
  const project = allWork.find((item) => item.slug === slug);

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
