import { preventTextOrphans } from "@/lib/typography";

type ProjectMetaProps = {
  value: string;
};

export function ProjectMeta({ value }: ProjectMetaProps) {
  const parts = value.split(" • ");

  if (parts.length === 1) {
    return <>{preventTextOrphans(value)}</>;
  }

  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {index > 0 ? <span className="project-meta-dot" aria-hidden="true" /> : null}
          {preventTextOrphans(part)}
        </span>
      ))}
    </>
  );
}
