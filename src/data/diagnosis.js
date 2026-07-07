export const nodes = [
  { key: "decisions", label: { en: "decisions", ar: "القرارات" } },
  { key: "team", label: { en: "team", ar: "الفريق" } },
  { key: "clients", label: { en: "clients", ar: "العملاء" } },
  { key: "suppliers", label: { en: "suppliers", ar: "الموردون" } },
  { key: "money", label: { en: "money", ar: "المال" } },
  { key: "information", label: { en: "information", ar: "المعلومات" } },
];

export const questions = [
  {
    id: "decisions",
    node: "decisions",
    prompt: {
      en: "When a decision falls outside the routine, who actually makes the call?",
      ar: "عندما يخرج قرار عن الروتين المعتاد، من يتخذه فعليًا؟",
    },
    options: [
      { score: 1, label: { en: "It always comes back to me", ar: "يعود إليّ دائمًا" } },
      { score: 2, label: { en: "Someone checks with me first", ar: "أحدهم يراجعني أولاً" } },
      { score: 3, label: { en: "Someone decides, then tells me after", ar: "أحدهم يقرر ثم يخبرني لاحقًا" } },
      { score: 4, label: { en: "Someone decides using a rule I never have to touch", ar: "أحدهم يقرر وفق قاعدة لا أتدخل فيها إطلاقًا" } },
    ],
  },
  {
    id: "team",
    node: "team",
    prompt: {
      en: "If a team member hit a real problem today, could they solve it without reaching you?",
      ar: "لو واجه أحد أعضاء الفريق مشكلة حقيقية اليوم، هل يستطيع حلها من دون الرجوع إليك؟",
    },
    options: [
      { score: 1, label: { en: "No — they'd wait for me", ar: "لا — سينتظرونني" } },
      { score: 2, label: { en: "They'd try, then escalate quickly", ar: "يحاولون، ثم يصعّدون الأمر سريعًا" } },
      { score: 3, label: { en: "Usually, yes", ar: "غالبًا، نعم" } },
      { score: 4, label: { en: "Yes — that's simply how it works", ar: "نعم — هكذا يعمل الفريق ببساطة" } },
    ],
  },
  {
    id: "clients",
    node: "clients",
    prompt: {
      en: "Do your clients expect you personally, or would they accept someone else on your team?",
      ar: "هل يتوقع عملاؤك التعامل معك شخصيًا، أم يتقبلون شخصًا آخر من فريقك؟",
    },
    options: [
      { score: 1, label: { en: "They expect me. Only me.", ar: "يتوقعونني أنا. أنا فقط." } },
      { score: 2, label: { en: "They'd tolerate someone else, reluctantly", ar: "يتقبلون شخصًا آخر، لكن بتردد" } },
      { score: 3, label: { en: "Most would be fine with the team", ar: "معظمهم مرتاحون للتعامل مع الفريق" } },
      { score: 4, label: { en: "They deal with the business, not with me specifically", ar: "يتعاملون مع الشركة، لا معي تحديدًا" } },
    ],
  },
  {
    id: "suppliers",
    node: "suppliers",
    prompt: {
      en: "If a supplier had an issue tomorrow morning, whose phone would ring?",
      ar: "لو واجه أحد الموردين مشكلة صباح الغد، هاتف من سيرن؟",
    },
    options: [
      { score: 1, label: { en: "Mine, every time", ar: "هاتفي، دائمًا" } },
      { score: 2, label: { en: "Mine, unless I'm unreachable", ar: "هاتفي، إلا إذا تعذّر الوصول إليّ" } },
      { score: 3, label: { en: "Whoever owns that relationship", ar: "من يملك تلك العلاقة تحديدًا" } },
      { score: 4, label: { en: "Whoever owns that relationship — always", ar: "من يملك تلك العلاقة — دائمًا" } },
    ],
  },
  {
    id: "money",
    node: "money",
    prompt: {
      en: "Do you personally approve most spending and pricing decisions?",
      ar: "هل توافق شخصيًا على معظم قرارات الإنفاق والتسعير؟",
    },
    options: [
      { score: 1, label: { en: "Yes — all of them", ar: "نعم — كلها" } },
      { score: 2, label: { en: "Yes, above a certain size", ar: "نعم، إذا تجاوزت حدًا معينًا" } },
      { score: 3, label: { en: "Only the exceptions", ar: "الاستثناءات فقط" } },
      { score: 4, label: { en: "No — that's delegated, with limits", ar: "لا — هذا مفوّض، ضمن حدود معينة" } },
    ],
  },
  {
    id: "information",
    node: "information",
    prompt: {
      en: "If you disappeared for a month, would anything critical disappear with you?",
      ar: "لو اختفيت لمدة شهر، هل ستختفي معك أي معلومة أساسية؟",
    },
    options: [
      { score: 1, label: { en: "Almost everything I know is undocumented", ar: "كل ما أعرفه تقريبًا غير مُوثّق" } },
      { score: 2, label: { en: "Some of it — the important parts aren't written down", ar: "بعضه — الأجزاء المهمة غير مكتوبة" } },
      { score: 3, label: { en: "Most of it is recorded somewhere", ar: "معظمه مُسجّل في مكان ما" } },
      { score: 4, label: { en: "No — it's all reachable without me", ar: "لا — كل شيء متاح من دوني" } },
    ],
  },
];

export const resultBands = [
  {
    id: "dependent",
    min: 6,
    max: 13,
    label: { en: "founder-dependent", ar: "معتمد على المؤسس" },
    summary: {
      en: "The business runs on you, not on structure. Most decisions, exceptions, and knowledge still route through one person — which means growth is capped by your availability.",
      ar: "عملك يعمل بك، لا بهيكلية واضحة. معظم القرارات والاستثناءات والمعرفة ما زالت تمر عبر شخص واحد — ما يعني أن نموّه محكوم بمدى تفرغك.",
    },
  },
  {
    id: "transitional",
    min: 14,
    max: 19,
    label: { en: "partially structured", ar: "منظم جزئيًا" },
    summary: {
      en: "Some structure exists, but it's inconsistent. A few functions can operate without you; others still can't. The gaps are specific and findable.",
      ar: "هناك بعض الهيكلية، لكنها غير ثابتة. بعض الوظائف تعمل من دونك، وأخرى لا تزال عاجزة عن ذلك. الفجوات محددة ويمكن تحديدها.",
    },
  },
  {
    id: "structured",
    min: 20,
    max: 24,
    label: { en: "structurally independent", ar: "مستقل هيكليًا" },
    summary: {
      en: "The business shows real signs of operating on its own logic rather than your presence. The next gains come from tightening what's already there, not rebuilding it.",
      ar: "يُظهر عملك مؤشرات حقيقية على أنه يعمل وفق منطقه الخاص لا بحضورك الشخصي. المكاسب القادمة تأتي من تحسين ما هو قائم، لا من إعادة بنائه.",
    },
  },
];

export function getResultBand(score) {
  return (
    resultBands.find((band) => score >= band.min && score <= band.max) ||
    resultBands[0]
  );
}
