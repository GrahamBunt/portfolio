export type WorkItem = {
  title: string;
  slug: string;
  tag: string;
  image: string;
};

// Pulled from Framer /work page. Featured project gets the hero treatment;
// the rest render as compact list items.
export const featuredWork: WorkItem = {
  title: "MetLife Mexico",
  slug: "metlife-mexico",
  tag: "Web & Tablet",
  image: "https://framerusercontent.com/images/kc6IsF2GDXNWwJQSk7F77a91hb8.png?scale-down-to=1024&width=5472&height=3648",
};

export const otherWork: WorkItem[] = [
  {
    title: "Scenario Planning",
    slug: "scenario-planning",
    tag: "E-Commerce",
    image: "https://framerusercontent.com/images/M4zg6qfsk1D0olgL6pjgR084nI.jpg?scale-down-to=512&width=2160&height=1620",
  },
  {
    title: "Portfolio Management",
    slug: "portfolio-management",
    tag: "E-Commerce",
    image: "https://framerusercontent.com/images/WsjEGmBC6idcXZcKsrO1Sn5UNg.jpg?scale-down-to=512&width=2160&height=1620",
  },
  {
    title: "Smartsheet Reports",
    slug: "smartsheet-reports",
    tag: "E-Commerce",
    image: "https://framerusercontent.com/images/wYoiuVTRSJ0cIdLHzFk90nOF9E.jpg?scale-down-to=512&width=2160&height=1620",
  },
];
