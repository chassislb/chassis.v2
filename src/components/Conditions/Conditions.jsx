import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";
import { conditions } from "../../data/healthModel";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

function ConditionRow({ c, lang, t, isOpen, onToggle }) {
  return (
    <div className="condition-row">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 px-8 py-7 text-start transition duration-200 hover:bg-black/[0.03] lg:px-10"
        aria-expanded={isOpen}
      >
        <div className="flex items-baseline gap-6">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#F3CC31]">
            {c.number}
          </span>
          <h3 className="text-lg font-bold tracking-[-0.01em] text-neutral-950 lg:text-xl">
            {c.name[lang]}
          </h3>
        </div>
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition duration-200 hover:border-neutral-950 hover:text-neutral-950">
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: "hidden" }}
          >
            <div className="grid gap-px border-t border-neutral-200 bg-neutral-200 lg:grid-cols-2">
              <div className="bg-[#F8F7F3] px-8 py-7 lg:px-10">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">
                  {t("conditions.whatItMeans")}
                </p>
                <p className="text-base leading-7 text-neutral-600">{c.description[lang]}</p>
              </div>
              <div className="bg-[#F8F7F3] px-8 py-7 lg:px-10">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#36C6F4]">
                  {t("conditions.forExample")}
                </p>
                <p className="text-base leading-7 text-neutral-600">{c.example[lang]}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Conditions() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(1);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      const rows = gsap.utils.toArray(".condition-row");
      gsap.fromTo(
        rows,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: rows[0], start: "top 85%" },
        }
      );
    },
    { scope: sectionRef }
  );

  const toggle = (id) => setOpen((prev) => (prev === id ? null : id));

  return (
    <section ref={sectionRef} id="conditions" className="bg-[#F8F7F3] px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-5xl">

        <div ref={headerRef}>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F3CC31]" />
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-neutral-400">
              {t("conditions.eyebrow")}
            </p>
          </div>

          <div className="mb-16 grid gap-10 lg:grid-cols-2 lg:items-end">
            <h2 className="text-[clamp(2.8rem,5.5vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-neutral-950">
              {t("conditions.headline1")}
              <br />
              {t("conditions.headline2")}
            </h2>
            <p className="max-w-lg text-lg leading-8 text-neutral-500">
              {t("conditions.sub")}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-200">
          <div className="flex flex-col divide-y divide-neutral-200">
            {conditions.map((c) => (
              <ConditionRow
                key={c.id}
                c={c}
                lang={lang}
                t={t}
                isOpen={open === c.id}
                onToggle={() => toggle(c.id)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
