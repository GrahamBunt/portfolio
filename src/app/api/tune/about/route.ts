import { writeFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import type { AboutContent } from "@/content/about";

export const runtime = "nodejs";

const CONTENT_PATH = path.join(process.cwd(), "src/content/about.ts");

function isString(value: unknown, maxLength = 500) {
  return typeof value === "string" && value.length <= maxLength;
}

function isValidContent(value: unknown): value is AboutContent {
  if (!value || typeof value !== "object") return false;
  const content = value as AboutContent;

  return (
    !!content.hero &&
    isString(content.hero.titleItalic, 80) &&
    isString(content.hero.titleRest, 120) &&
    isString(content.hero.description, 500) &&
    isString(content.bio, 500) &&
    Array.isArray(content.social) &&
    content.social.every(
      (item) =>
        isString(item.label, 80) &&
        isString(item.href, 300) &&
        (item.icon === "x" || item.icon === "linkedin" || item.icon === "github"),
    ) &&
    !!content.explore &&
    isString(content.explore.title, 80) &&
    isString(content.explore.description, 500) &&
    Array.isArray(content.explore.links) &&
    content.explore.links.every(
      (item) =>
        isString(item.title, 80) &&
        isString(item.description, 300) &&
        isString(item.href, 300) &&
        isString(item.image, 500),
    ) &&
    !!content.contact &&
    isString(content.contact.title, 80) &&
    isString(content.contact.description, 500) &&
    isString(content.contact.action, 80) &&
    !!content.footer &&
    isString(content.footer.name, 80) &&
    isString(content.footer.year, 80)
  );
}

function renderAboutContent(content: AboutContent) {
  return `export type AboutExploreLink = {
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

export const aboutContent: AboutContent = ${JSON.stringify(content, null, 2)};
`;
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Tuning is only available in development." }, { status: 404 });
  }

  const host = request.headers.get("host") ?? "";
  if (!host.startsWith("localhost:") && !host.startsWith("127.0.0.1:")) {
    return NextResponse.json({ error: "Tuning is only available on localhost." }, { status: 403 });
  }

  const content = await request.json();
  if (!isValidContent(content)) {
    return NextResponse.json({ error: "Invalid About content payload." }, { status: 400 });
  }

  await writeFile(CONTENT_PATH, renderAboutContent(content), "utf8");
  return NextResponse.json({ ok: true });
}
