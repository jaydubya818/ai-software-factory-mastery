import { MISSION_CONTROL_MATURITY_URL } from "../../lib/paths";

export function MissionControlStatusNotice() {
  return (
    <aside className="mission-control-status" aria-label="Current Mission Control implementation status">
      <strong>Implementation status · September 2026</strong>
      <p>
        Mission Control is an evolving reference implementation. Its qualified
        scope is a human-governed delivery kernel through verified pull request
        and acceptance. Production release and outcome learning, fleet
        operation, governed MCP, incident response, and enterprise authorization
        remain partial or unqualified.
      </p>
      <a href={MISSION_CONTROL_MATURITY_URL} rel="noreferrer" target="_blank">
        Check the current capability maturity ledger ↗
      </a>
    </aside>
  );
}
