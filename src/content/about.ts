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
    titleRest: "I'm Graham.",
    description: "",
  },
  bio: [
    "I’ve spent the last several years working on products where the path forward wasn’t always obvious. My work has spanned new products, major redesigns, platform integrations, and evolving existing products as customer and business needs change. Along the way, I’ve learned to think beyond the interface and consider the broader systems, teams, and business behind the product.",
    "I’m comfortable moving between the big picture and the little details. I like inspiring people around a clear direction, working closely with product and engineering, and getting deep into the craft to make experiences feel intuitive, thoughtful, and visually refined.",
    "Outside of work, my wife and I are raising two daughters and wrangling two golden retrievers. I spend the rest of my time exercising, mountain biking, and snowboarding. I'm also a land-locked surfer, so every summer we try to spend some time on the Jersey Shore—where I grew up and where I still love to surf.",
  ],
  social: [],
  contact: {
    title: "Get in touch",
    description:
      "I'd love to hear from you—always excited to chat, collaborate on ideas, and discuss opportunities.",
    action: "gtbunt@gmail.com",
  },
  footer: {
    name: "Graham Bunt",
    year: "©2026",
  },
};
