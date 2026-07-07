import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function DependencyReveal() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const notLines = [t("reveal.not1"), t("reveal.not2"), t("reveal.not3")];

  useGSAP(
    () => {
      gsap.from(".reveal-not", {
        opacity: 0,
        y: 20,
        stagger: 0.18,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      gsap.fromTo(
        ".reveal-answer",
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: ".reveal-answer", start: "top 75%" },
        }
      );

      gsap.from(".reveal-footnote", {
        opacity: 0,
        y: 14,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".reveal-footnote", start: "top 85%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F8F7F3] px-6 py-32 text-center text-neutral-950 lg:px-12"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-10 text-xs font-bold uppercase tracking-[0.28em] text-neutral-400">
          {t("reveal.eyebrow")}
        </p>

        <div className="mb-4 space-y-2">
          {notLines.map((line) => (
            <p
              key={line}
              className="reveal-not text-2xl font-semibold leading-tight text-neutral-300 lg:text-3xl"
            >
              {line}
            </p>
          ))}
        </div>

        <p className="reveal-answer text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-[#F3CC31]">
          {t("reveal.answer")}
        </p>

        <p className="reveal-footnote mx-auto mt-10 max-w-xl text-lg leading-8 text-neutral-500">
          {t("reveal.footnote")}
        </p>
      </div>
    </section>
  );
}
