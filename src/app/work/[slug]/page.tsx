import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/CaseStudyPage";
import { getCaseStudy, routeableWork } from "@/content/work";

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
      title: "Graham Bunt — Project not found",
    };
  }

  return {
    title: `Graham Bunt — ${project.title}`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) notFound();

  const related = routeableWork.filter((item) => item.slug !== project.slug);

  return <CaseStudyPage project={project} related={related} />;
}
