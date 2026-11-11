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
    "I’ve always loved the process of getting good at something. For me, that started with action sports. Skateboarding, surfing, freestyle skiing, and in recent years snowboarding. Professionally, I've tried my hand at a few things, including a couple years cooking at a Michelin-starred restaurant in NYC. The throughline of all my different pursuits is what I love—try something, get it wrong, try again, slowly get better, and eventually bring your own style to it.",
    "Design feels a lot like that to me. Most ideas aren’t the right idea. You explore, pull on different threads, change your mind, and sometimes go too far before knowing when to pull something back. Eventually the right direction reveals itself and the iterations keep flowing until everything feels just right. Over time, you learn when to follow convention, when to deviate, and where to bring your own style and point of view.",
    "As much as I love the craft itself, I really love building things with other people. Throwing ideas around, challenging each other, and shaping something none of us would have arrived at alone. When I think about the work I'm most proud of, I think just as much about the people I was building with and how much fun we had. That matters to me, and I try to be the kind of teammate people genuinely enjoy working with.",
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
