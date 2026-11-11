export function WorkInProgressOverlay() {
  return (
    <span className="project-wip-overlay">
      <span className="project-wip-frame">
        <span className="project-wip-guide is-top" aria-hidden="true" />
        <span className="project-wip-guide is-bottom" aria-hidden="true" />
        <span className="project-wip-guide is-left" aria-hidden="true" />
        <span className="project-wip-guide is-right" aria-hidden="true" />
        <span className="project-wip-chip">Work in progress</span>
      </span>
    </span>
  );
}
