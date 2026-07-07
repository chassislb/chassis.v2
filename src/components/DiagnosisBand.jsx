import { ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton/MagneticButton";
import { useLanguage } from "../i18n/LanguageContext";

export default function DiagnosisBand() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-neutral-950 px-6 py-16 text-white lg:px-12 lg:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:text-start">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#F3CC31]">
            {t("band.eyebrow")}
          </p>
          <h2 className="mb-3 text-[clamp(1.6rem,3.2vw,2.25rem)] font-bold leading-tight tracking-[-0.02em]">
            {t("band.headline")}
          </h2>
          <p className="max-w-xl text-base leading-7 text-white/50">
            {t("band.sub")}
          </p>
        </div>

        <MagneticButton
          href="https://calendly.com/chassis-lb/chassis-discovery-call"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-[48px] w-full flex-shrink-0 items-center justify-center gap-2 rounded-full bg-[#F3CC31] px-8 py-4 text-sm font-bold text-neutral-950 transition-colors duration-300 hover:bg-white lg:w-auto"
        >
          {t("band.cta")}
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:scale-x-[-1]"
          />
        </MagneticButton>
      </div>
    </section>
  );
}
