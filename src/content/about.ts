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
    "I’ve always loved the process of getting good at something. As a kid, it started with skateboarding, then surfing, freestyle skiing, and snowboarding. Before becoming a designer, I even spent a brief period cooking in a Michelin-starred kitchen in New York. The throughline is what I love—try something, get it wrong, try again, slowly get better, and eventually bring your own style to it.",
    "Design feels a lot like that to me. Most ideas aren’t the right idea. You explore, pull on different threads, change your mind, and sometimes go too far before knowing when to pull something back. Eventually you find a direction that keeps going. Then it becomes about staying with it until everything feels just right—where you’re proud of the work and pushed the bar a little higher. When it's experienced by someone else, I want them to feel the care and intention that went into making it.",
    "I’ve also come to appreciate working elbow to elbow with a team. Throwing ideas around, challenging each other, and shaping something none of us would have arrived at alone. The memories that tend to stick are of the relationships you build along the way. That matters a lot to me, and I try to be the kind of teammate people genuinely enjoy working with.",
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
