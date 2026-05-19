type ProjectMetaProps = {
  value: string;
};

export function ProjectMeta({ value }: ProjectMetaProps) {
  const [company, year] = value.split(" • ");

  if (!year) {
    return <>{value}</>;
  }

  return (
    <>
      {company}
      <span className="project-meta-dot" aria-hidden="true" />
      {year}
    </>
  );
}
