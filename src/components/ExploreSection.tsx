"use client";

import type { CSSProperties, ReactNode } from "react";
import { ProjectListSection, type ProjectListItem } from "@/components/ProjectListSection";
import { useProjectRowScroll } from "@/components/useProjectRowScroll";

type ExploreSectionProps = {
  title: ReactNode;
  items: ProjectListItem[];
  className?: string;
  style?: CSSProperties;
  titleClassName?: string;
  disableLinks?: boolean;
  renderTitle?: (item: ProjectListItem, index: number) => ReactNode;
  renderDescription?: (item: ProjectListItem, index: number) => ReactNode;
};

export function ExploreSection({
  title,
  items,
  className,
  style,
  titleClassName = "about-explore-title",
  disableLinks = false,
  renderTitle,
  renderDescription,
}: ExploreSectionProps) {
  const setRowRef = useProjectRowScroll();

  return (
    <section className={`work-products about-list-shell ${className ?? ""}`} aria-label="Explore">
      <ProjectListSection
        rowRef={(node, index) => {
          setRowRef(node, index);
        }}
        title={title}
        items={items}
        className={className}
        style={style}
        titleClassName={titleClassName}
        disableLinks={disableLinks}
        renderTitle={renderTitle}
        renderDescription={renderDescription}
      />
    </section>
  );
}
