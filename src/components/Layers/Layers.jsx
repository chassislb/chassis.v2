import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../../data/services";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Layers() {
  const { t, lang } = useLanguage();
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

      const cards = gsap.utils.toArray(".layer-card", sectionRef.current);
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: cards[0], start: "top 85%" },
        }
      );
    },
    { scope: sectionRef, dependencies: [lang] }
  );

  return (
    <section
      ref={sectionRef}
      id="layers"
      className="relative overflow-hidden bg-[#F8F7F3] px-6 py-28 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div ref={headerRef} className="mb-14 lg:mb-16">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#36C6F4]" />
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-neutral-400">
              {t("layers.eyebrow")}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <h2 className="text-balance text-[clamp(2.4rem,5.5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-neutral-950">
              {t("layers.headline")}
            </h2>
            <p className="max-w-lg text-lg leading-8 text-neutral-500">
              {t("layers.sub")}
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.id}
              className="layer-card rounded-2xl border border-neutral-200 bg-white p-8 lg:p-10"
            >
              <span className="mb-8 block text-xs font-semibold uppercase tracking-[0.25em] text-[#F3CC31]">
                {s.number}
              </span>
              <h3 className="mb-4 text-2xl font-bold tracking-[-0.02em] text-neutral-950">
                {s.name[lang]}
              </h3>
              <p className="text-base leading-7 text-neutral-500">
                {s.description[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
