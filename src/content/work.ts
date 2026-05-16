export type WorkItem = {
  title: string;
  slug: string;
  tag: string;
  image: string;
  summary: string;
  gallery: CaseStudyMedia[];
  notes: CaseStudyNote[];
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
  title: "MetLife Mexico",
  slug: "metlife-mexico",
  tag: "Web & Tablet",
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
};

export const otherWork: WorkItem[] = [
  {
    title: "Scenario Planning",
    slug: "scenario-planning",
    tag: "E-Commerce",
    image: "https://framerusercontent.com/images/M4zg6qfsk1D0olgL6pjgR084nI.jpg?scale-down-to=512&width=2160&height=1620",
    summary: "Scenario Planning",
    gallery: [],
    notes: [],
  },
  {
    title: "Portfolio Management",
    slug: "portfolio-management",
    tag: "E-Commerce",
    image: "https://framerusercontent.com/images/WsjEGmBC6idcXZcKsrO1Sn5UNg.jpg?scale-down-to=512&width=2160&height=1620",
    summary: "Portfolio Management",
    gallery: [],
    notes: [],
  },
  {
    title: "Smartsheet Reports",
    slug: "smartsheet-reports",
    tag: "E-Commerce",
    image: "https://framerusercontent.com/images/wYoiuVTRSJ0cIdLHzFk90nOF9E.jpg?scale-down-to=512&width=2160&height=1620",
    summary: "Smartsheet Reports",
    gallery: [],
    notes: [],
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
