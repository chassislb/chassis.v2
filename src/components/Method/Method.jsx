import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Method() {
  const { t } = useLanguage();
  const steps = t("method.steps");
  const section = useRef(null);
  const slider = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray(".panel");
        const distance = slider.current.scrollWidth - window.innerWidth;

        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            end: () => "+=" + distance,
            onUpdate: (self) =>
              setActive(Math.min(panels.length - 1, Math.round(self.progress * (panels.length - 1)))),
          },
        });

        return () => gsap.set(panels, { clearProps: "transform" });
      });

      return () => mm.revert();
    },
    { scope: section, dependencies: [steps] }
  );

  return (
    <section
      ref={section}
      id="method"
      className="relative overflow-hidden bg-neutral-950 text-white lg:h-screen"
    >
      <div ref={slider} className="flex flex-col lg:h-screen lg:flex-row">
        {steps.map((step, i) => (
          <div
            key={i}
            className="panel flex min-h-screen w-full flex-shrink-0 items-center justify-center px-8 py-24 lg:h-screen lg:w-screen lg:px-16 lg:py-0"
          >
            <div className="max-w-3xl">
              <p className="mb-8 text-sm font-semibold uppercase tracking-[0.35em] text-[#36C6F4]">
                {t("method.step").replace("{current}", i + 1).replace("{total}", steps.length)}
              </p>

              <h2 className="mb-8 text-[clamp(3.4rem,9vw,8rem)] font-extrabold leading-[0.85] tracking-[-0.04em]">
                {step.title}
              </h2>

              <p className="max-w-xl text-xl leading-9 text-white/65 lg:text-2xl lg:leading-10">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-3">
        {steps.map((step, i) => (
          <span
            key={step.title}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? "w-8 bg-[#F3CC31]" : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
