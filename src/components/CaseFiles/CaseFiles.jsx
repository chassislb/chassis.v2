import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus, Quote } from "lucide-react";
import { cases } from "../../data/cases";
import Starfield from "../Starfield/Starfield";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

function FileCard({ c, index, lang, t, isOpen, onToggle }) {
  return (
    <div className="case-file">
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-8 px-8 py-8 text-start transition duration-200 hover:bg-white/[0.03] lg:px-10 lg:py-10"
        aria-expanded={isOpen}
      >
        <div className="pe-8">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
            {t("cases.file")} — {String(index + 1).padStart(2, "0")} &nbsp;·&nbsp; {c.name ? c.name[lang] : c.context[lang]}
          </p>
          <h3 className="text-2xl font-bold tracking-[-0.03em] text-white lg:text-3xl">
            {c.headline[lang]}
          </h3>
        </div>
        <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-white/50 transition duration-200 hover:border-white hover:text-white">
          {isOpen ? <Minus size={15} /> : <Plus size={15} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: "hidden" }}
          >
            <div className="grid gap-px border-t border-white/10 bg-white/10 lg:grid-cols-2">
              <div className="bg-neutral-950 px-8 py-8 lg:px-10 lg:py-10">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-white/35">
                  {t("cases.theProblem")}
                </p>
                <p className="text-base leading-7 text-white/65">{c.problem[lang]}</p>
              </div>
              <div className="bg-neutral-950 px-8 py-8 lg:px-10 lg:py-10">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#36C6F4]">
                  {t("cases.whatWeFound")}
                </p>
                <p className="text-base leading-7 text-white/65">{c.finding[lang]}</p>
              </div>
              <div className="bg-neutral-950 px-8 py-8 lg:px-10 lg:py-10">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-white/35">
                  {t("cases.whatChanged")}
                </p>
                <p className="text-base leading-7 text-white/65">{c.structuring[lang]}</p>
              </div>
              <div className="bg-[#F3CC31]/[0.07] px-8 py-8 lg:px-10 lg:py-10">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#F3CC31]">
                  {t("cases.theOutcome")}
                </p>
                <p className="text-base leading-7 text-white/85">{c.outcome[lang]}</p>
              </div>
            </div>

            {c.testimonial && (
              <div className="border-t border-white/10 px-8 py-8 lg:px-10 lg:py-10">
                <Quote size={20} className="mb-4 text-[#F3CC31] rtl:scale-x-[-1]" />
                <p className="mb-4 max-w-2xl text-lg leading-8 text-white/75">
                  "{c.testimonial.quote[lang]}"
                </p>
                <p className="mb-3 text-sm font-bold text-white">
                  {c.testimonial.name}
                  <span className="font-medium text-white/40"> — {c.testimonial.title[lang]}</span>
                </p>
                {/* TODO: replace with real Google review URL */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#36C6F4] transition hover:text-white"
                >
                  {t("cases.googleReview")}
                </a>
              </div>
            )}

            <div className="flex flex-wrap gap-2 px-8 py-6 lg:px-10">
              {c.tags[lang].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CaseFiles() {
  const { t, lang } = useLanguage();
  const [expanded, setExpanded] = useState(null);
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
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );

      const cards = gsap.utils.toArray(".case-file", sectionRef.current);
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: cards[0], start: "top 80%" },
        }
      );
    },
    { scope: sectionRef }
  );

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <section
      ref={sectionRef}
      id="cases"
      className="relative overflow-hidden bg-neutral-950 px-6 py-32 text-white lg:px-12"
    >
      <Starfield seed={5} count={30} />

      <div className="relative mx-auto max-w-7xl">

        <div ref={headerRef}>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#36C6F4]" />
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/35">
              {t("cases.eyebrow")}
            </p>
          </div>

          <div className="mb-20 grid gap-10 lg:grid-cols-2 lg:items-end">
            <h2 className="text-[clamp(2.8rem,5.5vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
              {t("cases.headline1")}
              <br />
              {t("cases.headline2")}
            </h2>
            <p className="max-w-lg text-lg leading-8 text-white/45">
              {t("cases.sub")}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="flex flex-col divide-y divide-white/10">
            {cases.map((c, i) => (
              <FileCard
                key={c.id}
                c={c}
                index={i}
                lang={lang}
                t={t}
                isOpen={expanded === c.id}
                onToggle={() => toggle(c.id)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
