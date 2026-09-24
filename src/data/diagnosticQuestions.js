// The 10-question self-scored Chassis Business Diagnostic. Order matches the
// original approved checklist verbatim; each question is tagged with which
// of the four positioning categories it signals (Foundation, Operations,
// Systems, Execution), used to compute the category breakdown and the
// service recommendation on the results screen.
export const DIAGNOSTIC_QUESTIONS = [
  { id: "disappear_week", category: "execution" },
  { id: "pricing_clear", category: "foundation" },
  { id: "new_hire_speed", category: "operations" },
  { id: "money_leaking", category: "systems" },
  { id: "decisions_through_me", category: "operations" },
  { id: "systems_consistent", category: "systems" },
  { id: "grow_no_rebuild", category: "execution" },
  { id: "team_knows", category: "operations" },
  { id: "handoff_no_collapse", category: "execution" },
  { id: "one_priority", category: "execution" },
];

// An unchecked box is a gap. Count of gaps (0-10) maps to a score band.
export function getScoreBand(uncheckedCount) {
  if (uncheckedCount <= 2) return "structured";
  if (uncheckedCount <= 5) return "building";
  if (uncheckedCount <= 8) return "memory";
  return "you";
}

export function getCategoryBreakdown(answers) {
  const gaps = { foundation: 0, operations: 0, systems: 0, execution: 0 };
  const totals = { foundation: 0, operations: 0, systems: 0, execution: 0 };

  DIAGNOSTIC_QUESTIONS.forEach((q) => {
    totals[q.category] += 1;
    if (!answers[q.id]) gaps[q.category] += 1;
  });

  return { gaps, totals };
}

// Routes to one of the three paid services based on where the gaps are
// concentrated. Foundation gaps point to Business Foundation. Operations and
// Systems gaps (now one merged service) point to Operations & Systems.
// Broad, business-wide pressure (high execution gaps alongside everything
// else) points to Business Build, the end-to-end flagship.
export function recommendService({ gaps, totals }) {
  const rate = (cat) => (totals[cat] ? gaps[cat] / totals[cat] : 0);
  const foundationRate = rate("foundation");
  const opsSystemsRate = (gaps.operations + gaps.systems) / (totals.operations + totals.systems);
  const executionRate = rate("execution");

  if (foundationRate >= opsSystemsRate && foundationRate >= executionRate) return "business-foundation";
  if (executionRate > opsSystemsRate && executionRate >= 0.75) return "business-build";
  return "operations-systems";
}
