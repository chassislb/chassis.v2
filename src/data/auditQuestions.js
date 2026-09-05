// Stable internal ids/values for the Chassis Business Audit.
// Display labels live in the locale files under the "audit" namespace,
// keyed by the same ids so EN/AR stay structurally in sync.

export const AUDIT_SECTIONS = [
  "aboutBusiness",
  "ownerDependency",
  "operationsSystems",
  "teamAccountability",
  "multiLocation",
  "numbersVisibility",
  "growth",
  "final",
];

export const AUDIT_QUESTIONS = [
  // SECTION 1 — ABOUT THE BUSINESS
  { id: "business_name", section: "aboutBusiness", type: "short_text", required: true },
  { id: "contact_name_role", section: "aboutBusiness", type: "short_text", required: true },
  { id: "email", section: "aboutBusiness", type: "email", required: true },
  { id: "phone", section: "aboutBusiness", type: "phone", required: true },
  {
    id: "locations",
    section: "aboutBusiness",
    type: "single_select",
    required: true,
    options: ["one", "two_three", "four_six", "seven_plus"],
  },
  { id: "team_size", section: "aboutBusiness", type: "short_text", required: true },
  { id: "biggest_challenge", section: "aboutBusiness", type: "long_text", required: true },

  // SECTION 2 — OWNER DEPENDENCY
  {
    id: "step_away_month",
    section: "ownerDependency",
    type: "single_select",
    required: true,
    options: ["continues_normally", "mostly_continues_some_wait", "several_areas_problems", "heavily_dependent", "dont_know"],
  },
  {
    id: "decisions_through_you",
    section: "ownerDependency",
    type: "multi_select",
    required: true,
    options: [
      "daily_operational",
      "staff_problems",
      "purchasing_suppliers",
      "financial",
      "customer_complaints",
      "hiring_firing",
      "pricing",
      "marketing",
      "quality_control",
      "expansion",
      "almost_everything",
      "other",
    ],
  },
  { id: "time_consuming_area", section: "ownerDependency", type: "long_text", required: true },

  // SECTION 3 — OPERATIONS & SYSTEMS
  {
    id: "processes_documented",
    section: "operationsSystems",
    type: "single_select",
    required: true,
    options: ["clearly_documented", "some_documented", "mostly_in_heads", "very_little", "nothing_documented"],
  },
  {
    id: "employee_leaves_coverage",
    section: "operationsSystems",
    type: "single_select",
    required: true,
    options: ["yes", "mostly", "difficult", "no"],
  },
  {
    id: "tasks_assigned",
    section: "operationsSystems",
    type: "single_select",
    required: true,
    options: ["clearly_defined", "generally_understood", "roles_overlap", "handle_whatever_comes_up"],
  },
  { id: "mistakes_delays_where", section: "operationsSystems", type: "long_text", required: true },

  // SECTION 4 — TEAM & ACCOUNTABILITY
  {
    id: "employee_clarity",
    section: "teamAccountability",
    type: "single_select",
    required: true,
    options: ["yes", "mostly", "some_employees", "not_really"],
  },
  {
    id: "identify_process_failure",
    section: "teamAccountability",
    type: "single_select",
    required: true,
    options: ["yes_quickly", "usually", "sometimes", "rarely"],
  },
  {
    id: "team_issues",
    section: "teamAccountability",
    type: "multi_select",
    required: true,
    options: ["communication", "accountability", "training", "staff_turnover", "performance", "management", "hiring", "discipline", "other"],
  },

  // SECTION 5 — MULTI-LOCATION CONSISTENCY (conditional: only if locations !== "one")
  {
    id: "same_standards",
    section: "multiLocation",
    type: "single_select",
    required: true,
    conditional: (answers) => answers.locations && answers.locations !== "one",
    options: ["yes", "mostly", "somewhat", "each_different"],
  },
  {
    id: "customer_experience_confidence",
    section: "multiLocation",
    type: "scale",
    required: true,
    conditional: (answers) => answers.locations && answers.locations !== "one",
    scaleMin: 1,
    scaleMax: 10,
  },
  {
    id: "hardest_to_keep_consistent",
    section: "multiLocation",
    type: "multi_select",
    required: true,
    conditional: (answers) => answers.locations && answers.locations !== "one",
    options: [
      "product_quality",
      "speed_of_service",
      "customer_experience",
      "staff_performance",
      "management",
      "inventory",
      "cost_control",
      "cleanliness_standards",
      "communication",
      "reporting",
      "other",
    ],
  },
  {
    id: "how_know_performing",
    section: "multiLocation",
    type: "long_text",
    required: true,
    conditional: (answers) => answers.locations && answers.locations !== "one",
  },

  // SECTION 6 — NUMBERS & VISIBILITY
  {
    id: "info_access_speed",
    section: "numbersVisibility",
    type: "single_select",
    required: true,
    options: ["real_time", "daily", "weekly", "monthly", "takes_time", "no_clear_view"],
  },
  {
    id: "numbers_tracked",
    section: "numbersVisibility",
    type: "multi_select",
    required: true,
    options: [
      "revenue",
      "profit",
      "product_cost",
      "labor_cost",
      "waste",
      "inventory",
      "sales_by_product",
      "sales_by_location",
      "customer_complaints",
      "staff_performance",
      "other",
    ],
  },
  { id: "wish_clearer_info", section: "numbersVisibility", type: "long_text", required: true },

  // SECTION 7 — GROWTH
  { id: "growth_goals_12_24", section: "growth", type: "long_text", required: true },
  { id: "growth_blockers", section: "growth", type: "long_text", required: true },
  { id: "fix_one_thing", section: "growth", type: "long_text", required: true },

  // FINAL DIAGNOSTIC QUESTION
  { id: "not_working_no_time", section: "final", type: "long_text", required: true },
];

export function getVisibleQuestions(answers) {
  return AUDIT_QUESTIONS.filter((q) => !q.conditional || q.conditional(answers));
}
