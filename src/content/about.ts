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
      "I consider myself a generalist, leaning in wherever is necessary to shape quality experiences and help teams move forward.",
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
      "Design is my passion, and I’m always working on something new. Here are my latest creations:",
    links: [
      {
        title: "Work",
        description: "Minimal aesthetics and meaningful user experiences.",
        href: "/work",
        image:
          "https://framerusercontent.com/images/GVAsfqwYw2uFROcE6bLZSJSaZik.png?width=240&height=240",
      },
      {
        title: "Blog",
        description: "Thoughts on minimalism, web design, and more.",
        href: "/booklist",
        image:
          "https://framerusercontent.com/images/52cupkvbRnaQ0ZdpaZnex7SJdsk.png?width=240&height=240",
      },
      {
        title: "Tech Stack",
        description: "From concept to creation - tools that I use daily.",
        href: "/tech-stack",
        image:
          "https://framerusercontent.com/images/sKCj51P5Pbroc1slvmbJ4edE2A.png?width=240&height=240",
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
