const labels: Record<string, string> = {
  "canonical-navigation": "Canonical navigation",
  "canonical-overview": "Canonical overview",
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
  "canonical-navigation": "Canonical guide navigation or terminology.",
  "canonical-overview": "Canonical guide overview.",
  "current-assessment": "A point-in-time assessment tied to the sources and dates named in the chapter.",
  "current-case-study": "A current, scoped implementation case study; not proof of the complete factory.",
  "draft-for-study": "Useful working material awaiting full technical and editorial review.",
  "draft-for-review": "Prepared for focused review but not yet review ready.",
  "execution-blocked": "The exercise cannot currently produce its required evidence; inspect the documented blocker.",
  "historical-assessment": "A retained point-in-time assessment that must not be treated as current implementation truth.",
  "review-ready": "Complete enough for external scrutiny; this does not prove an implementation is operational.",
  validated: "Defined review and evidence checks are complete for the stated scope.",
  "operationally-proven": "Repeatable evidence exists for an exact implementation and operating scope.",
  active: "An actively maintained navigation, journal, or operating record.",
  reference: "Reference material supporting the guide.",
};

export function statusLabel(status: string) {
  return labels[status] ?? status.replaceAll("-", " ");
}

export function StatusBadge({ status, prefix = false }: { status: string; prefix?: boolean }) {
  return (
    <span className={`status-badge status-${status}`} title={definitions[status] ?? "Guide status; separate from implementation maturity and evidence."}>
      {prefix ? "Status: " : ""}{statusLabel(status)}
    </span>
  );
}
