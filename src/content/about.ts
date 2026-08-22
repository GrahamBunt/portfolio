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
    "I’ve always been drawn to things that take practice. As a kid, it started with skateboarding, then surfing and freestyle skiing, and eventually cooking in a Michelin-starred kitchen in New York. They’re all different, but the part I love is the same—try something, get it wrong, try again, slowly get better, and eventually bring your own style to it.",
    "Design feels a lot like that to me. Most ideas aren’t the right idea. You explore, pull on different threads, change your mind, and sometimes go too far before knowing when to pull something back. Eventually you find a direction that keeps going. Then it becomes about staying with it until everything feels just right—reaching a place where you’re proud of the work and possibly pushed the bar a little higher. When it reaches someone else, hopefully they feel the care and intention that went into making it.",
    "I’ve also come to appreciate the people you make things with. I like working elbow to elbow with a team, throwing ideas around, challenging each other, and shaping something none of us would have arrived at alone. The memories that tend to stick are of the relationships you build along the way. That matters a lot to me, and I try to be the kind of teammate people genuinely enjoy working with.",
    "When I’m not making things, my wife and I are raising two daughters and wrangling two goldens. I spend a lot of my free time running, strength training, mountain biking, and snowboarding. I’m also a land-locked surfer, so every summer we try to spend some time on the Jersey Shore—where I grew up and where I still love to surf.",
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
