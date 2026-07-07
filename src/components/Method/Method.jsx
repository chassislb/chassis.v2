import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Method() {
  const { t } = useLanguage();
  const steps = t("method.steps");
  const section = useRef(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray(".panel", section.current);
      panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 75%" },
          }
        );
      });
    },
    { scope: section, dependencies: [steps] }
  );

  return (
    <section ref={section} id="method" className="relative overflow-hidden bg-neutral-950 text-white">
      <div className="flex flex-col divide-y divide-white/10">
        {steps.map((step, i) => (
          <div
            key={i}
            className="panel flex min-h-[70vh] w-full items-center justify-center px-8 py-24 lg:px-16"
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
    </section>
  );
}
