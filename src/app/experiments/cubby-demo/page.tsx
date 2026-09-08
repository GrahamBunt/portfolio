import type { Metadata } from 'next';
import { CaseStudyPage } from '@/components/CaseStudyPage';
import { CubbyDemoHero } from '@/components/cubby-demo/CubbyDemoHero';
import { getCaseStudy, routeableWork } from '@/content/work';

export const metadata: Metadata = {
  title: 'Cubby — Interactive hero preview',
  robots: { index: false, follow: false },
};

export default function CubbyDemoPreview() {
  const project = getCaseStudy('cubby')!;
  return <CaseStudyPage project={project}
    related={routeableWork.filter(item => item.slug !== 'cubby')}
    heroPreview={<CubbyDemoHero />} />;
}
