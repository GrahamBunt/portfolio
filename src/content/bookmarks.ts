export type Bookmark = {
  date: string;
  title: string;
  source: string;
  href: string;
};

export const bookmarksPageContent = {
  title: "Bookmarks",
  description: "Saved ideas, references, and other useful internet finds.",
};

export const bookmarks: Bookmark[] = [
  {
    date: "2026-05-18",
    title: "Designing in Product Teams",
    source: "Placeholder",
    href: "https://example.com",
  },
  {
    date: "2026-05-11",
    title: "AI, Tools, and Slower Thought",
    source: "Placeholder",
    href: "https://example.com",
  },
  {
    date: "2026-04-29",
    title: "Interface Details Worth Remembering",
    source: "Placeholder",
    href: "https://example.com",
  },
  {
    date: "2026-04-12",
    title: "Systems for Better Product Judgment",
    source: "Placeholder",
    href: "https://example.com",
  },
  {
    date: "2026-03-24",
    title: "Building with Taste",
    source: "Placeholder",
    href: "https://example.com",
  },
];
