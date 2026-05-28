export type AboutExploreLink = {
  title: string;
  description: string;
  href: string;
  image: string;
};

export type AboutContent = {
  hero: {
    titleItalic: string;
    titleRest: string;
    description: string;
  };
  bio: string;
  social: Array<{
    label: string;
    href: string;
    icon: "x" | "linkedin" | "github";
  }>;
  explore: {
    title: string;
    description: string;
    links: AboutExploreLink[];
  };
  contact: {
    title: string;
    description: string;
    action: string;
  };
  footer: {
    name: string;
    year: string;
  };
};

export const aboutContent: AboutContent = {
  hero: {
    titleItalic: "Hey there",
    titleRest: "—I'm Graham.",
    description:
      "I'm a generalist at heart. I lean in wherever necessary to shape quality experiences and help move teams forward.",
  },
  bio: "Software is ephemeral, but the relationships and the shared experience of pursuing excellence is what remains.",
  social: [
    {
      label: "Twitter",
      href: "https://x.com/gtbunt",
      icon: "x",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/grahambunt/",
      icon: "linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/GrahamBunt",
      icon: "github",
    },
  ],
  explore: {
    title: "Explore",
    description:
      "A few places to learn more about my work, thinking, and curiousity.",
    links: [
      {
        title: "Work",
        description: "Select work from products I've helped shape.",
        href: "/work",
        image:
          "https://framerusercontent.com/images/GVAsfqwYw2uFROcE6bLZSJSaZik.png?width=240&height=240",
      },
      {
        title: "Tech stack",
        description: "The tools I'm currently using.",
        href: "/tech-stack",
        image:
          "https://framerusercontent.com/images/sKCj51P5Pbroc1slvmbJ4edE2A.png?width=240&height=240",
      },
      {
        title: "Booklist",
        description: "What's pulling my curiousity lately.",
        href: "/booklist",
        image: "/explore-booklist.svg",
      },
      {
        title: "Bookmarks",
        description: "Saved ideas, references, and other finds.",
        href: "/bookmarks",
        image: "/explore-bookmarks.svg",
      },
    ],
  },
  contact: {
    title: "Contact",
    description:
      "I’m always excited to meet new people, collaborate on ideas, and discuss opportunities.",
    action: "Copy Email",
  },
  footer: {
    name: "Graham Bunt",
    year: "©2026",
  },
};
