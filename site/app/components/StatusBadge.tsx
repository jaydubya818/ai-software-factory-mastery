const labels: Record<string, string> = {
  "canonical-navigation": "Canonical",
  "canonical-overview": "Canonical",
  "current-assessment": "Current assessment",
  "current-case-study": "Current case study",
  "draft-for-study": "Draft for study",
  "draft-for-review": "Draft for review",
  "execution-blocked": "Execution blocked",
  "historical-assessment": "Historical",
  "operationally-proven": "Operationally proven",
  "review-ready": "Review ready",
  active: "Active",
  reference: "Reference",
  validated: "Validated",
};

const definitions: Record<string, string> = {
  "canonical-navigation": "Canonical curriculum navigation or terminology.",
  "canonical-overview": "Canonical curriculum overview.",
  "draft-for-study": "Useful working material awaiting full technical and editorial review.",
  "draft-for-review": "Prepared for focused review but not yet review ready.",
  "review-ready": "Complete enough for external scrutiny; this does not prove an implementation is operational.",
  validated: "Defined review and evidence checks are complete for the stated scope.",
  "operationally-proven": "Repeatable evidence exists for an exact implementation and operating scope.",
  reference: "Reference material supporting the curriculum.",
};

export function statusLabel(status: string) {
  return labels[status] ?? status.replaceAll("-", " ");
}

export function StatusBadge({ status, prefix = false }: { status: string; prefix?: boolean }) {
  return (
    <span className={`status-badge status-${status}`} title={definitions[status] ?? "Curriculum status; separate from implementation maturity and evidence."}>
      {prefix ? "Status: " : ""}{statusLabel(status)}
    </span>
  );
}
