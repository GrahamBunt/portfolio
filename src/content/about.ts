export type AboutContent = {
  hero: {
    titleItalic: string;
    titleRest: string;
    description: string;
  };
  bio: string[];
  social: Array<{
    label: string;
    href: string;
    icon: "x" | "linkedin" | "github";
  }>;
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
    titleItalic: "",
    titleRest: "Making things well takes practice.",
    description: "",
  },
  bio: [
    "I'm a product designer who loves making things, whether that's figuring out a complicated product problem, exploring new ideas, or obsessing over visual and interaction details.",
    "Lately, I've been getting more hands-on with building things myself. AI coding tools have opened up a whole new world, letting me learn and create more than I ever thought possible. It's been a lot of fun.",
    "Outside of work, I'm moving back home to the Jersey Shore with my wife, two daughters, and two goldens. I love being outside, staying active, and I'm looking forward to surfing more once we're back.",
  ],
  social: [],
  contact: {
    title: "Get in touch",
    description:
      "I'd love to hear from you—let's chat, collaborate on ideas, or discuss opportunities.",
    action: "gtbunt@gmail.com",
  },
  footer: {
    name: "Graham Bunt",
    year: "©2026",
  },
};
