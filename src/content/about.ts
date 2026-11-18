export type AboutContent = {
  hero: {
    titleItalic: string;
    titleRest: string;
    description: string;
  };
  intro: string[];
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
  intro: [
    "I'm currently a Senior Product Designer at Smartsheet. I enjoy making sense of messy systems, figuring out where products should go, and getting into the smallest interaction and visual details. I care deeply about craft and designing experiences that feel intentional and just flat-out good to use.",
    "I've spent the last several years working on everything from integrating acquired products to rethinking core parts of Smartsheet's platform. More recently, I've been getting hands-on with code, using AI to build and ship frontend experiences.",
    "Outside of work, I recently moved back home to the Jersey Shore with my wife, two daughters, and two goldens. I love being outside, staying active, and I'm looking forward to surfing more now that I'm back near the ocean.",
  ],
  bio: [
    "I’ve always loved the process of getting good at something. For me, that started with action sports. Skateboarding, surfing, freestyle skiing, and in recent years snowboarding. Professionally, I've tried my hand at a few different things, including a couple years cooking at a Michelin-starred restaurant in NYC. The throughline of all my different pursuits is what I love... try something, get it wrong, try again, slowly get better, and eventually bring your own style to it.",
    "Design feels a lot like that to me. Most ideas aren’t the right idea. You explore, pull on different threads, change your mind, and sometimes go too far before knowing when to pull something back. Eventually the right direction reveals itself and the iterations flow until everything feels just right. Over time, you learn when to follow convention, when to deviate, and where to bring your own style and point of view.",
    "As much as I love the craft itself, I really love building things with other people. Throwing ideas around, challenging each other, and shaping something none of us would have arrived at alone. When I think about the work I'm most proud of, I think about the people I was building with and how much fun we had in the process. That matters to me, and I try to be the kind of teammate people genuinely enjoy working with.",
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
