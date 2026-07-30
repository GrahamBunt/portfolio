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

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z" />
    </svg>
  );
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
                  <span className="work-project-thumb">
                    <img
                      src={item.image}
                      alt=""
                      style={{
                        objectFit: item.imageFit,
                        objectPosition: item.imagePosition,
                      }}
                    />
                  </span>
                )}
                <div className="work-project-copy">
                  <div className="work-project-title-row">
                    <p className="work-project-title">{renderTitle ? renderTypographicNode(renderTitle(item, index)) : preventTextOrphans(item.title)}</p>
                    {!isDisabled ? (
                      <span className="work-inline-arrow">
                        <ArrowIcon />
                      </span>
                    ) : null}
                  </div>
                  <p className="work-project-description">{renderDescription ? renderTypographicNode(renderDescription(item, index)) : <ProjectMeta value={item.description} />}</p>
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
