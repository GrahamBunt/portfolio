/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ProjectMeta } from "@/components/ProjectMeta";
import { preventTextOrphans } from "@/lib/typography";

export type ProjectListItem = {
  title: string;
  description: string;
  href?: string;
  image: string;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  statusLabel?: string;
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

function renderTypographicNode(node: ReactNode) {
  return typeof node === "string" ? preventTextOrphans(node) : node;
}

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
      <h3 className={titleClassName}>{renderTypographicNode(title)}</h3>
      {description ? <p className={descriptionClassName}>{renderTypographicNode(description)}</p> : null}
      <div className="work-project-list">
        {items.map((item, index) => {
          const href = item.href;
          const isDisabled = disableLinks || !href;
          const shouldShowPlaceholder = !item.image;
          const rowContent = (
            <>
              <div className="work-project-row-bg" aria-hidden="true" />
              <div className="work-project-row-content">
                {shouldShowPlaceholder ? (
                  <div className="work-project-thinking-thumb" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <circle cx="12" cy="12" r="8" />
                      <path d="M12 7.75v4.65l3.1 1.85" />
                    </svg>
                  </div>
                ) : (
                  <img
                    src={item.image}
                    alt=""
                    style={{
                      objectFit: item.imageFit,
                      objectPosition: item.imagePosition,
                    }}
                  />
                )}
                <div className="work-project-copy">
                  <p>{renderTitle ? renderTypographicNode(renderTitle(item, index)) : preventTextOrphans(item.title)}</p>
                  <p>{renderDescription ? renderTypographicNode(renderDescription(item, index)) : <ProjectMeta value={item.description} />}</p>
                </div>
                {item.statusLabel ? <span className="work-project-status font-sans-preview">{item.statusLabel}</span> : null}
              </div>
            </>
          );

          if (isDisabled) {
            return (
              <div key={`${item.title}-${item.description}`} className="work-project-row is-disabled" style={rowStyle} aria-disabled="true">
                {rowContent}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              ref={rowRef ? (node) => rowRef(node, index) : undefined}
              href={href}
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
