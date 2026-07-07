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
  const trackRef = useRef(null);
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

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const distance = track.scrollWidth - track.parentElement.clientWidth;
        if (distance <= 0) return;

        gsap.to(track, {
          x: () => -distance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + distance,
          },
        });

        return () => gsap.set(track, { clearProps: "transform" });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [lang] }
  );

  return (
    <section
      ref={sectionRef}
      id="layers"
      className="relative overflow-hidden bg-[#F8F7F3] px-6 py-28 lg:h-screen lg:px-12 lg:py-0"
    >
      <div className="mx-auto flex h-full max-w-7xl flex-col lg:justify-center">
        <div ref={headerRef} className="mb-10 lg:mb-14">
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

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:snap-none lg:overflow-visible lg:pb-0"
        >
          {services.map((s) => (
            <div
              key={s.id}
              className="layer-card w-[82vw] flex-shrink-0 snap-start rounded-2xl border border-neutral-200 bg-white p-8 sm:w-[420px] lg:w-[420px] lg:p-10"
            >
              <span className="mb-8 block text-xs font-semibold uppercase tracking-[0.25em] text-[#F3CC31]">
                {s.number}
              </span>
              <h3 className="mb-4 text-2xl font-bold tracking-[-0.02em] text-neutral-950 lg:text-3xl">
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
