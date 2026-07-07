import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "../MagneticButton/MagneticButton";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function BuildWithAI() {
  const { t } = useLanguage();
  const tiers = t("buildWithAI.tiers");
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

      const cards = gsap.utils.toArray(".tier-card", sectionRef.current);
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
    { scope: sectionRef, dependencies: [tiers] }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F8F7F3] px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div ref={headerRef} className="mb-16 grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F3CC31]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-neutral-400">
                {t("buildWithAI.eyebrow")}
              </p>
            </div>
            <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-neutral-950">
              {t("buildWithAI.headline")}
            </h2>
          </div>
          <p className="max-w-lg text-lg leading-8 text-neutral-500">{t("buildWithAI.body")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="tier-card flex flex-col rounded-2xl border border-neutral-200 bg-white p-8 lg:p-10"
            >
              <span className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#F3CC31]">
                {tier.name}
              </span>
              <p className="mb-4 text-3xl font-extrabold tracking-[-0.02em] text-neutral-950">
                {tier.price}
              </p>
              <p className="text-base leading-7 text-neutral-500">{tier.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <MagneticButton
            href="https://calendly.com/chassis-lb/chassis-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-neutral-950 px-8 py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#F3CC31] hover:text-neutral-950"
          >
            {t("buildWithAI.cta")}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:scale-x-[-1]"
            />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
