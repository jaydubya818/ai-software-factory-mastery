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

export function statusLabel(status: string) {
  return labels[status] ?? status.replaceAll("-", " ");
}

export function StatusBadge({ status, prefix = false }: { status: string; prefix?: boolean }) {
  return (
    <span className={`status-badge status-${status}`}>
      {prefix ? "Status: " : ""}{statusLabel(status)}
    </span>
  );
}
