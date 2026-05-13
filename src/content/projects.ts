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
  { title: "Smartsheet AI", slug: "smartsheet-ai", aspectRatio: 900 / 1120, type: "placeholder" },
  { title: "People Directory & Profile", slug: "people-directory", aspectRatio: 900 / 1120, type: "placeholder" },
  { title: "Oil & Gas", slug: "oil-and-gas", aspectRatio: 1, type: "placeholder" },
  { title: "Biking in Park City", slug: "biking-parkcity", aspectRatio: 900 / 1120, type: "placeholder" },
  { title: "Workload Schedule", slug: "workload-schedule", aspectRatio: 1, type: "placeholder" },
  { title: "PQL Capture", slug: "pql-capture", aspectRatio: 900 / 1120, type: "placeholder" },
  { title: "American Modern Insurance", slug: "american-modern-insurance", aspectRatio: 900 / 1120, type: "placeholder" },
  { title: "KPMG App", slug: "kpmg-app", aspectRatio: 1, type: "placeholder" },
  { title: "MetLife Mexico", slug: "metlife-mexico", aspectRatio: 900 / 1120, type: "placeholder" },
  { title: "Family in Steamboat", slug: "family-steamboat", aspectRatio: 900 / 1120, type: "placeholder" },
  { title: "Capacity View", slug: "capacity-view", aspectRatio: 900 / 1120, type: "placeholder" },
  { title: "Oil & Gas", slug: "oil-and-gas-2", aspectRatio: 900 / 1100, type: "placeholder" },
];
