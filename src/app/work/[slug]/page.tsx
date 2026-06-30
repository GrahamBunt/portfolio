import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/CaseStudyPage";
import { allWork, getCaseStudy, routeableWork } from "@/content/work";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return routeableWork.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) {
    return {
      title: "Project not found — Graham Bunt",
    };
  }

  return {
    title: `${project.title} — Graham Bunt`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) notFound();

  const related = allWork.filter((item) => item.slug !== project.slug);

  return <CaseStudyPage project={project} related={related} />;
}
