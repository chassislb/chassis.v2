import { ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, Download, FileText, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import SEO from "../components/common/SEO";
import { useLanguage } from "../i18n/LanguageContext";
import { buildLangPath } from "../i18n/langPath";

const PREVIEW_URL = "https://drive.google.com/file/d/1OZZR8_96LnyrIuHnD55Es4z243R17ySh/view?usp=drivesdk";
const CONTACT_EMAIL = "chassis.lb@gmail.com";
const orderLink = (lang) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Order request - Built From Lebanon")}&body=${encodeURIComponent(lang === "ar" ? "مرحبا، بدي اطلب دليل Built From Lebanon بسعر الإطلاق 150 دولار. فيكن تبعتولي طرق الدفع وخطوات الاستلام؟\n\nالاسم: \nالبلد: " : "Hello, I'd like to order Built From Lebanon at the $150 launch price. Please send me the available payment options and delivery instructions.\n\nName: \nCountry: ")}`;
const licenceLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Built From Lebanon - group licence inquiry")}&body=${encodeURIComponent("Hello, I'd like to discuss a group licence for Built From Lebanon.\n\nOrganization:\nApproximate participants:\nCountry:\n")}`;

const copy = {
  en: {
    back: "Back to Chassis", navInside: "What's inside", navMethod: "The method", navFaq: "Questions", navOrder: "Order the manual",
    eyebrow: "THE INDEPENDENT BUSINESS MANUAL · EDITION 01",
    hero1: "You've got the experience.", hero2: "Now what do you build with it?",
    heroDescription: "A working manual for people building a business on their own, from Lebanon. Find an opportunity worth testing, build the right offer, set up your tools, and learn how to run what you've started.",
    offerNote: "Digital manual · English edition", priceLabel: "Launch price", price: "$150", normal: "$200 regular price", order: "Order via email", preview: "View the actual manual", checklist: "Get the free 7-decision checklist", immediate: "Email opens with your order request. We'll reply with payment and delivery instructions; this is not an instant online checkout.",
    stats: [{n:"98",l:"pages"},{n:"40",l:"chapters"},{n:"7",l:"stages"},{n:"12",l:"months of edition updates*"}],
    problemTag: "THE REAL STARTING POINT", problemTitle: "A logo is easy. Knowing what to sell is harder.", problemIntro: "You can spend weeks choosing a name, building a website, or learning new tools and still not have a business anyone is ready to pay for.",
    problemPoints: ["You have skills, but haven't settled on an offer.","You have an idea, but no evidence that people will pay for it.","You want to sell online from Lebanon, but payments and tools are confusing.","You keep researching instead of making decisions."],
    problemClosing: "This manual is designed to help you work through those decisions in order, instead of guessing your way through them.",
    methodTag: "ONE METHOD. SEVEN STAGES.", methodTitle: "Know the next decision before you spend another dollar.",
    phases: [
      {num:"01",name:"Discover",desc:"Find realistic opportunities based on what you know and what the market needs.",deliver:"A shortlist worth testing"},
      {num:"02",name:"Validate",desc:"Check whether a specific customer will actually pay before you build.",deliver:"Evidence, not encouragement"},
      {num:"03",name:"Structure",desc:"Work out your offer, pricing, costs, workflow, and risks.",deliver:"A one-page operating model"},
      {num:"04",name:"Build",desc:"Create only the tools and assets your business truly needs.",deliver:"A way to find you and pay you"},
      {num:"05",name:"Launch",desc:"Plan your first outreach, conversations, and sales.",deliver:"First customers or clear learning"},
      {num:"06",name:"Operate",desc:"Set up delivery, money tracking, routines, and simple systems.",deliver:"A business you can manage"},
      {num:"07",name:"Improve",desc:"Review what's working, what isn't, and what to change next.",deliver:"Decisions based on results"},
    ],
    insideTag:"WHAT YOU'RE ACTUALLY BUYING", insideTitle:"Not 98 pages of motivation. A working process.",
    includes: [
      {title:"Chapter-by-chapter actions",text:"Each chapter ends with a checkpoint, so you know whether you're ready to move on."},
      {title:"A Decision Record",text:"Track the decisions you've made, the evidence behind them, and what still needs testing."},
      {title:"Worked examples",text:"See how decisions play out across different kinds of businesses, not just one idealized startup."},
      {title:"AI as a working tool",text:"Learn what to ask AI at each stage and, importantly, what to verify yourself."},
      {title:"Lebanon-specific realities",text:"Think through payment options, platform limitations, and operating from Lebanon."},
      {title:"Updates for 12 months",text:"Get updated digital editions if new editions are released during the first 12 months after purchase."},
    ],
    honestTag:"WHO THIS IS FOR", honestTitle:"For the person doing the work themselves.",
    yesTitle:"This may be right for you if…", yes:["You have experience or a skill and want to build something independent.","You're starting while working another job or managing a tight budget.","You want a structure to follow instead of scattered online advice.","You're willing to test assumptions and do the exercises."],
    noTitle:"It isn't the right purchase if…", no:["You want a guaranteed income or instant clients.","You expect someone to build or run the business for you.","You need personalized legal, tax, or financial advice.","You're looking for a live course or one-to-one consulting."],
    freeTag:"START HERE — FREE", freeTitle:"Before you spend money on your idea, answer these seven questions.",
    freeDescription:"A two-page worksheet adapted from the manual's approach. It helps you spot what you know, what you're assuming, and what you still need to test. No email wall or account required.",
    freeButton:"Download the free worksheet", freeSecondary:"Then explore the full manual", freeSmall:"Free PDF · Printable · No signup required",
    authorTag:"FROM THE PERSON WHO BUILT IT", authorTitle:"I wrote the manual I wish more people had access to.",
    authorText:"I'm Sophia Ayoubi, founder of Chassis. My background is in operations, project management, restructuring, business development, and building digital tools. I put this together for people who want to start from where they are, with the resources they actually have. You don't need another promise that everything will work out. You need a method for deciding what to do next.",
    authorCredit:"Sophia Ayoubi · Founder, Chassis",
    offerTag:"GET THE FULL MANUAL", offerTitle:"Start with a plan you can actually work through.",
    whatYouGet:["98-page digital manual, in English", "40 chapters across 7 stages", "Exercises, examples, checkpoints, and AI guidance", "Access to updated digital editions released within 12 months*"],
    previewLink:"Read the preview", buyLink:"Request your copy — $150", payments:"Payment options and digital delivery are confirmed by email before purchase. No automatic card checkout is set up on this page.",
    group:"Running an entrepreneurship program?", groupText:"Ask about a group licence for universities, incubators, or entrepreneurship cohorts.", groupCta:"Discuss a group licence",
    faqTag:"BEFORE YOU BUY", faqTitle:"A few things worth knowing.",
    faqs:[
      {q:"Is this a course or consulting service?",a:"Neither. It's a self-guided digital manual. You'll work through it independently at your own pace; personalized consulting is not included."},
      {q:"What language is the manual in?",a:"The current Premium Edition is in English. This page is available in Arabic for convenience, but the manual itself is not an Arabic edition."},
      {q:"How do I pay and receive it?",a:"Click 'Request your copy' to email Chassis. We'll confirm the payment methods available to you and provide the delivery steps. There is no instant online card checkout on this page."},
      {q:"Will it make my business successful?",a:"No manual can guarantee customers or income. This one gives you a structured way to research, decide, build, and review your progress. The work is yours."},
      {q:"What do the 12 months of updates include?",a:"If updated digital editions are released within 12 months of your purchase, you'll receive access to them. There is no fixed update schedule, and no personal support is included."},
      {q:"Can I share the PDF with a friend or my students?",a:"An individual purchase is licensed for your own use. For classes, teams, or groups, contact us about a group licence."},
    ],
    footnote:"*Updates are provided only when new editions are released within 12 months; they are not guaranteed on a fixed schedule. Individual-use licence. Educational resource, not legal, tax, or financial advice.",
    footerTitle:"Built From Lebanon",footerLine:"A Chassis publication. Built for independent thinkers working from Lebanon.",footerHome:"Chassis home",footerTerms:"Terms",footerPrivacy:"Privacy",footerContact:"Email Chassis"
  },
  ar: {
    back: "الرجوع لـ Chassis",navInside: "شو جوّا الدليل",navMethod:"المراحل",navFaq:"أسئلة شائعة",navOrder:"اطلب الدليل",
    eyebrow:"دليل لتأسيس business مستقل · الإصدار الأول",
    hero1:"عندك خبرة وskills.",hero2:"بس شو رح تبني فيهن؟",
    heroDescription:"دليل عملي لأي شخص بدّه يبلّش business لحاله من لبنان. من اختيار فكرة تستاهل التجربة، لتحديد العرض والسعر، وبناء الأدوات، وصولاً لطريقة تشغيل المشروع بعد الإطلاق.",
    offerNote:"دليل رقمي · النسخة بالإنجليزي",priceLabel:"سعر الإطلاق",price:"$150",normal:"السعر العادي $200",order:"اطلب الدليل بالإيميل",preview:"تصفّح عيّنة من الدليل",checklist:"حمّل checklist مجانية",immediate:"زر الطلب بيفتح الإيميل مع رسالة جاهزة. منرجع منبعتلك طرق الدفع والتسليم. ما في دفع مباشر بالبطاقة بهالصفحة.",
    stats:[{n:"98",l:"صفحة"},{n:"40",l:"فصل"},{n:"7",l:"مراحل"},{n:"12",l:"شهر تحديثات*"}],
    problemTag:"من وين بتبلّش؟",problemTitle:"الـ logo سهل. تعرف شو بدك تبيع أصعب.",problemIntro:"فِيك تقضي أسابيع عم تختار اسم، وتجهّز website، وتتعلّم tools… وبالآخر ما تعرف إذا في حدا مستعد يدفع على فكرتك.",
    problemPoints:["عندك skills بس بعدك مش عارف شو الـ offer اللي بدك تقدّمه.","عندك فكرة، بس ما جرّبت إذا الناس مستعدة تدفع عليها.","بدك تبيع أونلاين من لبنان، بس موضوع الدفع والـ platforms معقّد.","كل يوم عم تعمل research، بس القرارات بعدها معلّقة."],
    problemClosing:"الدليل بيساعدك تمشي بهالقرارات بالترتيب، بدل ما تضلّ تجرّب عالعمياني.",
    methodTag:"طريقة وحدة · 7 مراحل",methodTitle:"اعرف شو القرار الجايي قبل ما تصرف مصاري.",
    phases:[
      {num:"01",name:"Discover",desc:"حدّد فرص واقعية بناءً على خبرتك وحاجة السوق.",deliver:"أفكار بتستاهل التجربة"},
      {num:"02",name:"Validate",desc:"تأكّد إذا في client فعلاً مستعد يدفع قبل ما تبني.",deliver:"أدلة بدل التشجيع"},
      {num:"03",name:"Structure",desc:"وضّح الـ offer، السعر، التكاليف، وطريقة الشغل.",deliver:"Operating Model واضح"},
      {num:"04",name:"Build",desc:"ابنِ بس الأدوات والأشياء اللي مشروعك بحاجة إلها.",deliver:"طريقة ليلاقوك ويدفعولك"},
      {num:"05",name:"Launch",desc:"خطّط للتواصل مع أول clients وبلّش تبيع.",deliver:"أول زباين أو درس واضح"},
      {num:"06",name:"Operate",desc:"نظّم التسليم، المصاري، والروتين اليومي.",deliver:"شغل فيك تديره"},
      {num:"07",name:"Improve",desc:"راجع النتائج واعرف شو لازم تغيّر.",deliver:"قرارات مبنية على نتائج"},
    ],
    insideTag:"شو عم تشتري فعلياً؟",insideTitle:"مش 98 صفحة تحفيز. طريقة عمل.",
    includes:[
      {title:"خطوات بنهاية كل فصل",text:"كل فصل فيه checkpoint بتعرف منه إذا جاهز تنتقل للخطوة اللي بعدها."},
      {title:"Decision Record",text:"وثّق قراراتك، الأدلة اللي بنيتها عليها، والشغلات اللي بعدك بدك تتأكّد منها."},
      {title:"أمثلة عملية",text:"شوف كيف القرارات بتختلف بين أنواع مشاريع مختلفة، مش بس startup مثالي."},
      {title:"استخدام الـ AI",text:"شو تطلب من الـ AI بكل مرحلة، وشو لازم تتأكّد منه بنفسك."},
      {title:"واقع الشغل من لبنان",text:"فكّر بطرق الدفع، قيود الـ platforms، وتشغيل مشروع من هون."},
      {title:"تحديثات لمدة 12 شهر",text:"إذا نزلت نسخ رقمية محدّثة خلال أول 12 شهر من الشراء، بيكون عندك حق الوصول إلها."},
    ],
    honestTag:"لمين هالدليل؟",honestTitle:"للشخص اللي رح يشتغل على مشروعه بنفسه.",
    yesTitle:"ممكن يناسبك إذا…",yes:["عندك خبرة أو skill وبدك تبني شغل مستقل.","عم تبلّش جنب شغلك الحالي أو بميزانية محدودة.","بدك خطوات واضحة بدل نصائح مبعثرة.","مستعد تجرّب أفكارك وتعمل التمارين."],
    noTitle:"مش مناسب إذا…",no:["بدك ضمانة للربح أو clients بسرعة.","ناطر حدا يبني المشروع عنك.","بحاجة لاستشارة قانونية أو ضريبية خاصة فيك.","عم تفتّش على course مباشر أو consulting شخصي."],
    freeTag:"بلّش من هون — مجاناً",freeTitle:"قبل ما تصرف عفكرتك، جاوب عن هالـ 7 أسئلة.",
    freeDescription:"Worksheet من صفحتين، مستوحاة من طريقة الدليل. بتساعدك تشوف شو بتعرف، شو عم تفترض، وشو لازم تجرّب بعد. من دون تسجيل أو إيميل.",freeButton:"حمّل الـ worksheet المجانية",freeSecondary:"وشوف الدليل الكامل",freeSmall:"PDF مجاني · فيك تطبعه · بلا تسجيل",
    authorTag:"من اللي كتبته",authorTitle:"كتبت الدليل اللي بتمنّى ناس أكتر كان عندها فرصة تستفيد منه.",
    authorText:"أنا صوفيا أيوبي، مؤسسة Chassis. اشتغلت بالـ operations، project management، إعادة الهيكلة، business development، وبناء digital tools. عملت هالدليل للأشخاص اللي بدها تبلّش من مطرحها وبالإمكانيات اللي عندها. مش بحاجة حدا يوعدك إنو كل شي رح ينجح. بحاجة لطريقة تساعدك تقرّر شو تعمل بعدين.",
    authorCredit:"صوفيا أيوبي · مؤسسة Chassis",
    offerTag:"الدليل الكامل",offerTitle:"بلّش بخطوات فيك تمشي فيها فعلاً.",
    whatYouGet:["دليل رقمي 98 صفحة باللغة الإنجليزية","40 فصل على 7 مراحل","تمارين وأمثلة وcheckpoints وإرشادات AI","حق الوصول لتحديثات رقمية تصدر خلال 12 شهر*"],
    previewLink:"شوف الـ preview",buyLink:"اطلب نسختك — $150",payments:"منأكد طرق الدفع والتسليم عبر الإيميل قبل الشراء. ما في checkout مباشر بالبطاقة على هالصفحة.",
    group:"عندك برنامج لريادة الأعمال؟",groupText:"تواصل معنا لنعمل group licence لجامعات، حاضنات أعمال، أو مجموعات تدريب.",groupCta:"اسأل عن group licence",
    faqTag:"قبل ما تشتري",faqTitle:"كم شغلة لازم تعرفها.",
    faqs:[
      {q:"هيدا course أو consulting؟",a:"لأ. هيدا دليل رقمي بتشتغل عليه لحالك وبالسرعة اللي بتناسبك. ما بيشمل consulting شخصي."},
      {q:"بأي لغة الدليل؟",a:"النسخة الحالية من الدليل باللغة الإنجليزية. فيك تقرأ هالصفحة بالعربي، بس ملف الدليل مش نسخة عربية."},
      {q:"كيف بدفع وبستلم؟",a:"اكبس «اطلب نسختك» لتفتح رسالة إيميل جاهزة لـ Chassis. منبعتلك طرق الدفع المتاحة وخطوات تسليم الملف. ما في دفع مباشر بالبطاقة هون."},
      {q:"هالدليل بيضمن إنو مشروعي ينجح؟",a:"لأ. ما في دليل بيضمن clients أو مصاري. بيعطيك طريقة منظّمة للبحث، اتخاذ القرار، البناء، ومراجعة النتائج."},
      {q:"شو بتشمل تحديثات الـ 12 شهر؟",a:"إذا صدر إصدار رقمي محدّث خلال 12 شهر من شرائك، بيكون عندك حق الوصول إله. ما في جدول ثابت للتحديثات أو متابعة شخصية."},
      {q:"فيني شارك الملف مع رفقاتي أو طلابي؟",a:"النسخة الفردية للاستعمال الشخصي فقط. للطلاب أو المجموعات، فيك تتواصل معنا لنتفق على licence للمجموعة."},
    ],
    footnote:"*التحديثات بتنرسل إذا صدرت نسخ جديدة خلال 12 شهر، من دون جدول ثابت. الترخيص للاستعمال الشخصي. هيدا دليل تعليمي، مش استشارة قانونية أو ضريبية أو مالية.",
    footerTitle:"Built From Lebanon",footerLine:"إصدار من Chassis، للناس اللي بدها تبني شغل مستقل من لبنان.",footerHome:"الصفحة الرئيسية",footerTerms:"الشروط",footerPrivacy:"الخصوصية",footerContact:"راسل Chassis"
  }
};

function ProductCover() {
  return (
    <div className="relative mx-auto w-[min(100%,360px)] max-w-sm select-none">
      <div className="absolute -inset-7 rounded-full bg-[#36c6f4]/10 blur-3xl" />
      <div className="relative rotate-[-5deg] overflow-hidden border border-white/20 bg-[#f6f5f0] p-6 text-[#101010] shadow-[22px_28px_80px_rgba(0,0,0,0.55)] sm:p-8" style={{ aspectRatio: "0.735" }} aria-label="Stylized representation of the Built From Lebanon manual cover">
        <div className="flex h-full flex-col justify-between border-t-2 border-black pt-5" dir="ltr">
          <div>
            <div className="text-[9px] font-extrabold uppercase tracking-[0.26em] sm:text-[10px]">Premium edition · 01</div>
            <div className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] sm:mt-12">The independent business manual</div>
            <div className="mt-7 text-[clamp(2.4rem,6vw,3.45rem)] font-black leading-[0.99] tracking-[-0.07em]">BUILT<br />FROM<br />LEBANON<span className="text-[#36c6f4]">.</span></div>
            <p className="mt-6 max-w-[240px] text-[12px] font-medium leading-5">Discover. Validate. Structure. Build. Launch. Operate. Improve.</p>
          </div>
          <div className="border-t border-black/30 pt-4 text-[10px] font-bold uppercase tracking-wider">Sophia Ayoubi <span className="opacity-40">·</span> Founder, Chassis</div>
        </div>
      </div>
      <div className="absolute -bottom-7 -right-7 rotate-[8deg] rounded-xl border border-white/15 bg-[#151515] px-5 py-4 shadow-xl" dir="ltr">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">A method, not a shortcut.</p>
        <p className="mt-1 text-lg font-extrabold text-[var(--yellow)]">7 STAGES / 40 CHAPTERS</p>
      </div>
    </div>
  );
}

function Btn({ href, children, secondary = false, external = false, className = "" }) {
  return <a href={href} {...(external ? {target:"_blank",rel:"noopener noreferrer"} : {})} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#36c6f4] ${secondary ? "border border-white/20 bg-white/[0.04] text-white hover:border-white/50 hover:bg-white/[0.08]" : "bg-[var(--yellow)] text-[#0b0b0b] hover:bg-white"} ${className}`}>{children}</a>;
}

function SectionTitle({ eyebrow, title, intro }) {return <div className="mb-12 max-w-3xl"><div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.23em] text-[#36c6f4]"><span className="h-1.5 w-1.5 rounded-full bg-[var(--yellow)]"/>{eyebrow}</div><h2 className="text-[clamp(2rem,4.3vw,3.6rem)] font-extrabold leading-[1.1] tracking-[-0.045em]">{title}</h2>{intro && <p className="mt-6 text-base leading-8 text-white/60 sm:text-lg">{intro}</p>}</div>}

function FAQ({ faqs }) {const [active,setActive]=useState(0);return <div className="divide-y divide-white/10 border-y border-white/10">{faqs.map((item,i)=><div key={item.q}><button type="button" aria-expanded={active===i} onClick={()=>setActive(active===i?-1:i)} className="flex w-full items-center justify-between gap-8 py-5 text-start text-base font-bold text-white sm:text-lg"><span>{item.q}</span><ChevronDown size={20} className={`shrink-0 text-[var(--yellow)] transition-transform ${active===i?"rotate-180":""}`}/></button>{active===i&&<div className="pb-6 pe-10 text-sm leading-7 text-white/60 sm:text-base">{item.a}</div>}</div>)}</div>}

export default function BuiltFromLebanon(){
  const { lang,setLang } = useLanguage();
  const c=copy[lang];
  const root=buildLangPath(lang,"/");
  const buy=orderLink(lang);
  const base="/built-from-lebanon";
  const schema={"@context":"https://schema.org","@type":"Book",name:"Built From Lebanon: The Independent Business Manual",author:{"@type":"Person",name:"Sophia Ayoubi"},publisher:{"@type":"Organization",name:"Chassis"},inLanguage:"en",bookFormat:"https://schema.org/EBook",numberOfPages:98,description:"A self-guided seven-stage method for discovering, validating, structuring, building, launching, operating and improving an independent business from Lebanon.",offers:{"@type":"Offer",price:"150",priceCurrency:"USD",availability:"https://schema.org/InStock",url:`https://www.chassislb.com${base}`}};
  return <main id="top" className="min-h-screen bg-[#0a0a0a] text-white">
    <SEO path={base} title={lang==="ar"?"Built From Lebanon | دليل لتأسيس مشروعك من لبنان | Chassis":"Built From Lebanon | Independent Business Manual | Chassis"} description={lang==="ar"?"دليل عملي من 98 صفحة على 7 مراحل لتبني business مستقل من لبنان. شوف الـ preview أو اطلب نسختك.":"A practical 98-page, seven-stage manual for building an independent business from Lebanon. Explore the preview and get your copy."} jsonLd={[schema]}/>

    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 lg:px-10">
        <a href={root} className="inline-flex items-center gap-3" aria-label={c.back}><img src="/images/chassis-logo-white.png" alt="Chassis" className="h-6 w-auto"/><span className="hidden border-s border-white/25 ps-3 text-xs text-white/50 sm:inline">Built From Lebanon</span></a>
        <nav className="hidden items-center gap-6 text-xs font-semibold text-white/65 md:flex" aria-label="On this page"><a href="#inside" className="hover:text-white">{c.navInside}</a><a href="#method" className="hover:text-white">{c.navMethod}</a><a href="#faq" className="hover:text-white">{c.navFaq}</a></nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex rounded-full border border-white/15 p-1 text-[11px] font-bold" aria-label="Language"><button type="button" aria-pressed={lang==="en"} onClick={()=>setLang("en")} className={`rounded-full px-2.5 py-1.5 ${lang==="en"?"bg-white text-black":"text-white/65 hover:text-white"}`}>EN</button><button type="button" aria-pressed={lang==="ar"} onClick={()=>setLang("ar")} className={`rounded-full px-2.5 py-1.5 ${lang==="ar"?"bg-white text-black":"text-white/65 hover:text-white"}`}>AR</button></div>
          <a href="#order" className="rounded-full bg-[var(--yellow)] px-4 py-2 text-xs font-extrabold text-black transition hover:bg-white">{c.navOrder}</a>
        </div>
      </div>
    </header>

    <section className="relative overflow-hidden border-b border-white/10 px-5 pb-24 pt-20 lg:px-10 lg:pb-32 lg:pt-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.075]" style={{backgroundImage:"linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)",backgroundSize:"70px 70px"}}/>
      <div className="pointer-events-none absolute start-[-12%] top-[-200px] h-[650px] w-[650px] rounded-full bg-[#36c6f4]/10 blur-[130px]"/>
      <div className="relative mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-[1.13fr_0.87fr]">
        <div>
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.03] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70"><span className="h-1.5 w-1.5 rounded-full bg-[var(--yellow)]"/>{c.eyebrow}</div>
          <h1 className="max-w-4xl text-[clamp(2.65rem,5.8vw,5.4rem)] font-extrabold leading-[1.05] tracking-[-0.06em]">{c.hero1}<br/><span className="text-[var(--yellow)]">{c.hero2}</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">{c.heroDescription}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3"><Btn href="#order">{c.order}<ArrowUpRight size={17}/></Btn><Btn href={PREVIEW_URL} secondary external>{c.preview}<ArrowUpRight size={16}/></Btn></div>
          <a href="#free" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#36c6f4] underline underline-offset-4 hover:text-white"><Download size={15}/>{c.checklist}</a>
          <p className="mt-8 text-xs leading-6 text-white/40">{c.offerNote}</p>
        </div>
        <div className="relative flex min-h-[440px] items-center justify-center pb-10 pt-8 lg:min-h-[560px]"><ProductCover/></div>
      </div>
      <div className="relative mx-auto mt-20 grid max-w-7xl grid-cols-2 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-4">{c.stats.map(s=><div key={s.l} className="border-e border-white/10 px-3 text-center last:border-e-0 sm:px-6"><div className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl" dir="ltr">{s.n}</div><div className="mt-1 text-xs text-white/45">{s.l}</div></div>)}</div>
    </section>

    <section className="px-5 py-24 lg:px-10 lg:py-32"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-24"><div><SectionTitle eyebrow={c.problemTag} title={c.problemTitle} intro={c.problemIntro}/><p className="max-w-lg text-base leading-8 text-white/60">{c.problemClosing}</p></div><div className="space-y-3">{c.problemPoints.map((p,i)=><div key={p} className="flex gap-5 rounded-xl border border-white/10 bg-[#111] p-6"><span className="text-sm font-extrabold text-[var(--yellow)]">0{i+1}</span><p className="text-base leading-7 text-white/80">{p}</p></div>)}</div></div></section>

    <section id="method" className="scroll-mt-20 border-y border-white/10 bg-[#101010] px-5 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow={c.methodTag} title={c.methodTitle}/><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{c.phases.map((p,i)=><div key={p.name} className={`min-h-[245px] rounded-2xl border p-6 ${i===0?"border-[#F3CC31]/60 bg-[#F3CC31]/[0.06]":"border-white/10 bg-white/[0.025]"}`}><div className="flex items-center justify-between"><span className="text-sm font-bold text-[#36c6f4]">{p.num}</span><span className="h-2 w-2 rounded-full bg-[var(--yellow)]"/></div><h3 className="mt-7 text-2xl font-extrabold tracking-tight" dir="ltr">{p.name}</h3><p className="mt-3 text-sm leading-6 text-white/60">{p.desc}</p><div className="mt-6 border-t border-white/10 pt-3 text-xs font-semibold text-white/50">{p.deliver}</div></div>)}</div></div></section>

    <section id="inside" className="scroll-mt-20 px-5 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow={c.insideTag} title={c.insideTitle}/><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{c.includes.map((item,i)=><div key={item.title} className="rounded-2xl border border-white/10 bg-[#141414] p-7"><div className="mb-7 flex h-10 w-10 items-center justify-center rounded-xl border border-[#36c6f4]/30 bg-[#36c6f4]/10 text-[#36c6f4]">{i===0?<Check size={19}/>:i===1?<FileText size={19}/>:i===2?<BookOpen size={19}/>:i===3?<Sparkles size={19}/>:i===4?<ShieldCheck size={19}/>:<Download size={19}/>}</div><h3 className="text-lg font-bold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-white/55">{item.text}</p></div>)}</div></div></section>

    <section className="border-y border-white/10 bg-[#111] px-5 py-24 lg:px-10"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow={c.honestTag} title={c.honestTitle}/><div className="grid gap-4 md:grid-cols-2"><div className="rounded-2xl border border-[#36c6f4]/30 bg-[#36c6f4]/[0.035] p-7 sm:p-9"><h3 className="mb-7 text-xl font-extrabold">{c.yesTitle}</h3><ul className="space-y-5">{c.yes.map(s=><li key={s} className="flex items-start gap-3 text-sm leading-7 text-white/75"><Check size={18} className="mt-1 shrink-0 text-[#36c6f4]"/>{s}</li>)}</ul></div><div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-9"><h3 className="mb-7 text-xl font-extrabold">{c.noTitle}</h3><ul className="space-y-5">{c.no.map(s=><li key={s} className="flex items-start gap-3 text-sm leading-7 text-white/65"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white/30"/>{s}</li>)}</ul></div></div></div></section>

    <section id="free" className="scroll-mt-24 px-5 py-24 lg:px-10 lg:py-28"><div className="mx-auto grid max-w-7xl items-center gap-10 rounded-3xl border border-[#f3cc31]/30 bg-[radial-gradient(ellipse_at_top_right,rgba(243,204,49,0.1),transparent_55%),#151515] p-7 sm:p-12 lg:grid-cols-[1fr_0.75fr] lg:p-16"><div><div className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--yellow)]">{c.freeTag}</div><h2 className="max-w-2xl text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[1.12] tracking-[-0.04em]">{c.freeTitle}</h2><p className="mt-5 max-w-xl text-base leading-8 text-white/65">{c.freeDescription}</p><div className="mt-8 flex flex-wrap gap-3"><Btn href="/downloads/built-from-lebanon-7-decisions.pdf"><Download size={18}/>{c.freeButton}</Btn><Btn secondary href={PREVIEW_URL} external>{c.freeSecondary}<ArrowUpRight size={16}/></Btn></div><p className="mt-5 text-xs text-white/45">{c.freeSmall}</p></div><div className="relative mx-auto w-full max-w-[340px] rotate-[3deg] rounded-xl bg-[#f6f5f0] p-7 text-black shadow-[18px_20px_50px_rgba(0,0,0,.3)]" dir="ltr"><div className="border-t-4 border-black pt-5 text-[10px] font-extrabold uppercase tracking-widest">Built From Lebanon · free worksheet</div><div className="mt-9 text-3xl font-black leading-tight tracking-[-0.05em]">7 DECISIONS<br/>BEFORE YOU<br/>SPEND.</div><div className="mt-8 space-y-3">{["Who will pay?","What problem?","What proof?","What price?"].map((s,i)=><div key={s} className="flex items-center gap-3 border-b border-black/15 pb-2 text-sm"><span className="font-black text-black/40">0{i+1}</span>{s}</div>)}</div><div className="mt-8 text-[10px] font-bold uppercase tracking-widest">A two-page starting point</div></div></div></section>

    <section className="border-y border-white/10 bg-[#101010] px-5 py-24 lg:px-10"><div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[280px_1fr] lg:gap-20"><div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#222] p-3"><img src="/images/sophia.jpg" alt="Sophia Ayoubi, founder of Chassis" loading="lazy" className="aspect-[4/5] w-full rounded-xl object-cover"/></div><div><div className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#36c6f4]">{c.authorTag}</div><h2 className="max-w-3xl text-[clamp(2rem,3.6vw,3.2rem)] font-extrabold leading-[1.14] tracking-[-0.04em]">{c.authorTitle}</h2><p className="mt-7 max-w-3xl text-base leading-8 text-white/65">{c.authorText}</p><p className="mt-6 text-sm font-bold text-white">{c.authorCredit}</p></div></div></section>

    <section id="order" className="scroll-mt-24 px-5 py-24 lg:px-10 lg:py-32"><div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-24"><div><SectionTitle eyebrow={c.offerTag} title={c.offerTitle}/><ul className="space-y-5">{c.whatYouGet.map(s=><li key={s} className="flex items-start gap-3 text-base leading-7 text-white/80"><Check className="mt-1 shrink-0 text-[#36c6f4]" size={20}/>{s}</li>)}</ul></div><div className="rounded-3xl border border-[#F3CC31]/35 bg-[#141414] p-7 sm:p-10"><div className="text-sm font-semibold text-white/60">{c.priceLabel}</div><div className="mt-3 flex items-baseline gap-4" dir="ltr"><div className="text-6xl font-extrabold tracking-[-0.07em] text-[var(--yellow)]">{c.price}</div><div className="text-sm text-white/35 line-through">{c.normal}</div></div><div className="my-7 h-px bg-white/15"/><Btn href={buy} className="w-full">{c.buyLink}<Mail size={18}/></Btn><Btn secondary external href={PREVIEW_URL} className="mt-3 w-full">{c.previewLink}<ArrowUpRight size={16}/></Btn><p className="mt-6 text-xs leading-6 text-white/45">{c.payments}</p></div></div><div className="mx-auto mt-14 flex max-w-7xl flex-col gap-4 rounded-2xl border border-white/10 bg-[#111] p-7 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="text-lg font-bold">{c.group}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">{c.groupText}</p></div><Btn secondary href={licenceLink}>{c.groupCta}<ArrowRight size={16}/></Btn></div></section>

    <section id="faq" className="scroll-mt-24 border-t border-white/10 bg-[#111] px-5 py-24 lg:px-10 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.65fr_1fr]"><SectionTitle eyebrow={c.faqTag} title={c.faqTitle}/><FAQ faqs={c.faqs}/></div></section>

    <footer className="border-t border-white/10 px-5 py-10 lg:px-10"><div className="mx-auto max-w-7xl"><div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><a href={root}><img src="/images/chassis-logo-white.png" alt="Chassis" className="h-6 w-auto"/></a><p className="mt-3 max-w-md text-xs leading-6 text-white/40">{c.footerLine}</p></div><div className="flex flex-wrap gap-5 text-xs font-semibold text-white/55"><a href={root} className="hover:text-white">{c.footerHome}</a><a href={buildLangPath(lang,"/terms")} className="hover:text-white">{c.footerTerms}</a><a href={buildLangPath(lang,"/privacy")} className="hover:text-white">{c.footerPrivacy}</a><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">{c.footerContact}</a></div></div><div className="mt-8 border-t border-white/10 pt-6 text-xs leading-6 text-white/35">{c.footnote}</div></div></footer>
  </main>;
}
