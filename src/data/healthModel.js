export const conditions = [
  {
    id: 1,
    number: "01",
    name: {
      en: "the business knows exactly what it sells",
      ar: "العمل يعرف بالضبط ماذا يبيع",
    },
    description: {
      en: "Offer, pricing, and scope are defined once and applied consistently — not reinvented in every client conversation.",
      ar: "العرض والتسعير ونطاق العمل مُحددة مرة واحدة وتُطبّق باستمرار — لا تُعاد صياغتها في كل محادثة مع عميل.",
    },
    example: {
      en: "A client asks for something slightly outside the usual scope. The team quotes it from a standard pricing logic in under five minutes — no call to the owner required.",
      ar: "يطلب عميل أمرًا خارج النطاق المعتاد قليلاً. يقدّم الفريق عرض سعر وفق منطق تسعير موحّد خلال أقل من خمس دقائق — من دون الحاجة لاتصال بالمالك.",
    },
  },
  {
    id: 2,
    number: "02",
    name: {
      en: "the business knows how decisions are made",
      ar: "العمل يعرف كيف تُتخذ القرارات",
    },
    description: {
      en: "There is a clear line between what gets decided on the spot and what requires escalation — and everyone knows which is which.",
      ar: "هناك خط واضح بين ما يُقرَّر فورًا وما يتطلب تصعيدًا — والجميع يعرف الفرق بينهما.",
    },
    example: {
      en: "A staff discount request comes in. The manager approves it on the spot, because the discount policy already defines the range they're allowed to authorize.",
      ar: "يصل طلب تخفيض لموظف. يوافق المدير عليه فورًا، لأن سياسة التخفيضات تحدد مسبقًا النطاق المسموح له بإقراره.",
    },
  },
  {
    id: 3,
    number: "03",
    name: {
      en: "people know who owns what",
      ar: "الجميع يعرف من يملك ماذا",
    },
    description: {
      en: "Every function has a single owner. Overlap and gaps are the two symptoms this condition is built to remove.",
      ar: "كل وظيفة لها مالك واحد. التداخل والفراغ هما العرضان اللذان يُصمَّم هذا الشرط لإزالتهما.",
    },
    example: {
      en: "A supplier delivery runs late. One person is already handling it before the owner even hears about it — because that relationship belongs to them, not to whoever picks up the phone.",
      ar: "يتأخر تسليم من أحد الموردين. شخص واحد يتعامل مع الأمر قبل أن يعلم المالك أصلاً — لأن تلك العلاقة تخصّه هو، لا أي شخص يرفع الهاتف.",
    },
  },
  {
    id: 4,
    number: "04",
    name: {
      en: "work moves through the business in a predictable way",
      ar: "العمل يتنقّل داخل الشركة بطريقة يمكن توقعها",
    },
    description: {
      en: "The path from request to delivery is the same regardless of who is handling it or what week it is.",
      ar: "المسار من الطلب إلى التسليم واحد، بغضّ النظر عمّن ينفذه أو في أي أسبوع.",
    },
    example: {
      en: "A new hire follows the same onboarding checklist their predecessor did — not a version explained verbally by whoever happened to train them.",
      ar: "يتبع الموظف الجديد قائمة التأهيل نفسها التي اتّبعها سابقه — لا نسخة يشرحها شفهيًا من تولّى تدريبه بالصدفة.",
    },
  },
  {
    id: 5,
    number: "05",
    name: {
      en: "information does not live only inside people's heads",
      ar: "المعلومات لا تعيش فقط في رؤوس الناس",
    },
    description: {
      en: "What someone knows is recorded somewhere the business can reach — not dependent on that person being available.",
      ar: "ما يعرفه أي شخص مُسجَّل في مكان يمكن للشركة الوصول إليه — لا يعتمد على تواجد ذلك الشخص.",
    },
    example: {
      en: "The one employee who 'knows how everything works' takes two weeks off. Nothing stalls, because the process is written down, not memorized.",
      ar: "يأخذ الموظف الذي 'يعرف كل شيء' إجازة أسبوعين. لا يتوقف شيء، لأن العملية مكتوبة وليست محفوظة في الذاكرة.",
    },
  },
  {
    id: 6,
    number: "06",
    name: {
      en: "the owner is not the bridge between every function",
      ar: "المالك ليس الجسر بين كل وظيفة وأخرى",
    },
    description: {
      en: "Departments can coordinate directly. The founder is not the connective tissue holding the org chart together.",
      ar: "يمكن للأقسام أن تنسّق مباشرة في ما بينها. المؤسس ليس النسيج الرابط الذي يُبقي الهيكل التنظيمي متماسكًا.",
    },
    example: {
      en: "Sales and operations resolve a scheduling conflict directly with each other. The owner reads about it in the weekly report — not in the moment.",
      ar: "يحل قسما المبيعات والعمليات تعارضًا في الجدولة مباشرة في ما بينهما. يقرأ المالك عن الأمر في التقرير الأسبوعي — لا في لحظة حدوثه.",
    },
  },
  {
    id: 7,
    number: "07",
    name: {
      en: "the business can produce the same outcome consistently",
      ar: "العمل قادر على تكرار النتيجة نفسها باستمرار",
    },
    description: {
      en: "Quality does not depend on which person handled it. The result is a property of the system, not of any individual.",
      ar: "الجودة لا تعتمد على من نفّذ العمل. النتيجة خاصية للنظام، لا لأي فرد بعينه.",
    },
    example: {
      en: "Two team members deliver the same service to two different clients. Neither client would be able to tell who handled which one.",
      ar: "يقدّم عضوان من الفريق الخدمة نفسها لعميلين مختلفين. لا يستطيع أي منهما تمييز من نفّذ خدمته.",
    },
  },
];
