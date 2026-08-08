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
    titleItalic: "Hey there",
    titleRest: "—I'm Graham.",
    description: "A strategic designer who blends systems thinking with craft to deliver quality digital experiences.",
  },
  bio: [
    "I'm currently at Smartsheet, where I design enterprise products that help teams manage work. I enjoy bringing clarity to ambiguous spaces and making complex systems easier to use. I care deeply about craft and believe the best products feel intuitive, thoughtful, and visually refined.",
    "Outside of work, my wife and I are raising two daughters and wrangling two golden retrievers. I spend any remaining free time running, mountain biking, and snowboarding. I'm also a land-locked surfer, so every summer we try to get back to the Jersey Shore, where I grew up and still my favorite place to surf.",
  ],
  social: [],
  contact: {
    title: "Get in touch",
    description:
      "I'm always excited to chat, collaborate on ideas, and discuss opportunities.",
    action: "gtbunt@gmail.com",
  },
  footer: {
    name: "Graham Bunt",
    year: "©2026",
  },
};
