export type ProjectItem = {
  title: string;
  slug: string;
  aspectRatio: number;
  type: "placeholder" | "image" | "gif";
  src?: string;
  href?: string;
};

// Aspect ratios mirror the live Framer image dimensions.
export const projects: ProjectItem[] = [
  { title: "AI Report Creation", slug: "smartassist", aspectRatio: 900 / 1120, type: "image", src: "/masonry/smartassist.png" },
  { title: "People Directory & Profile", slug: "people-directory", aspectRatio: 900 / 1120, type: "image", src: "/masonry/people-directory.png" },
  { title: "Oil & Gas", slug: "oil-and-gas-mobile", aspectRatio: 1, type: "image", src: "/masonry/og-mobile.png" },
  { title: "Biking in Park City", slug: "biking-parkcity", aspectRatio: 900 / 1120, type: "image", src: "/masonry/biking.png" },
  { title: "Workload Schedule", slug: "workload-schedule", aspectRatio: 1, type: "image", src: "/masonry/workload-schedule.png" },
  { title: "ARMS Landing", slug: "arms-landing", aspectRatio: 900 / 1120, type: "image", src: "/masonry/arms-landing.png" },
  { title: "American Modern Insurance", slug: "american-modern-insurance", aspectRatio: 900 / 1120, type: "image", src: "/masonry/amig.png" },
  { title: "KPMG App", slug: "kpmg-app", aspectRatio: 1, type: "image", src: "/masonry/kpmg-app.png" },
  { title: "MetLife Mexico", slug: "metlife-mexico", aspectRatio: 900 / 1120, type: "image", src: "/masonry/metlife.png" },
  { title: "Family in Steamboat", slug: "family-steamboat", aspectRatio: 900 / 1120, type: "image", src: "/masonry/family-steamboat.png" },
  { title: "Capacity View", slug: "capacity-view", aspectRatio: 900 / 1120, type: "image", src: "/masonry/capacity.png" },
  { title: "Oil & Gas", slug: "squaretest", aspectRatio: 900 / 1100, type: "image", src: "/masonry/squaretest.png" },
];
