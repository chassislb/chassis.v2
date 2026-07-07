import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Outcomes() {
  const { t } = useLanguage();
  const items = t("outcomes.items");
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

      const cards = gsap.utils.toArray(".outcome-card", sectionRef.current);
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
    { scope: sectionRef, dependencies: [items] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-950 px-6 py-32 text-white lg:px-12"
    >
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div ref={headerRef} className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#36C6F4]" />
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/40">
              {t("outcomes.eyebrow")}
            </p>
          </div>
          <h2 className="text-[clamp(1.8rem,3.6vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.03em]">
            {t("outcomes.headline")}
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {items.map((item, i) => (
            <div key={item.title} className="outcome-card bg-neutral-950 p-8 lg:p-10">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.25em] text-[#F3CC31]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-3 text-xl font-bold tracking-[-0.01em] text-white lg:text-2xl">
                {item.title}
              </h3>
              <p className="text-base leading-7 text-white/60">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
