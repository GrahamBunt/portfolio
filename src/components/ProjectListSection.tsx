/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ProjectMeta } from "@/components/ProjectMeta";

export type ProjectListItem = {
  title: string;
  description: string;
  href: string;
  image: string;
};

type ProjectListSectionProps = {
  title: ReactNode;
  description?: ReactNode;
  items: ProjectListItem[];
  className?: string;
  style?: CSSProperties;
  titleClassName?: string;
  descriptionClassName?: string;
  disableLinks?: boolean;
  rowRef?: (node: HTMLAnchorElement | null, index: number) => void;
  renderTitle?: (item: ProjectListItem, index: number) => ReactNode;
  renderDescription?: (item: ProjectListItem, index: number) => ReactNode;
};

export function ProjectListSection({
  title,
  description,
  items,
  className,
  style,
  titleClassName,
  descriptionClassName,
  disableLinks = false,
  rowRef,
  renderTitle,
  renderDescription,
}: ProjectListSectionProps) {
  const rowStyle = rowRef ? undefined : ({ "--project-scroll-x": "0px" } as CSSProperties);

  return (
    <section className={`work-all-projects ${className ?? ""}`} style={style}>
      <h3 className={titleClassName}>{title}</h3>
      {description ? <p className={descriptionClassName}>{description}</p> : null}
      <div className="work-project-list">
        {items.map((item, index) => {
          const rowContent = (
            <>
              <div className="work-project-row-bg" aria-hidden="true" />
              <div className="work-project-row-content">
                <img src={item.image} alt="" />
                <div>
                  <p>{renderTitle ? renderTitle(item, index) : item.title}</p>
                  <p>{renderDescription ? renderDescription(item, index) : <ProjectMeta value={item.description} />}</p>
                </div>
              </div>
            </>
          );

          if (disableLinks) {
            return (
              <div key={item.href} className="work-project-row is-disabled" style={rowStyle}>
                {rowContent}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              ref={rowRef ? (node) => rowRef(node, index) : undefined}
              href={item.href}
              className="work-project-row"
              style={rowStyle}
            >
              {rowContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
