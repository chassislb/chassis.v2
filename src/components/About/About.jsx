import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedinIn } from "react-icons/fa6";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useLanguage();
  const stats = t("about.stats");
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
    },
    { scope: sectionRef, dependencies: [stats] }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-neutral-950 px-6 py-32 text-white lg:px-12"
    >
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div ref={headerRef} className="relative mx-auto max-w-6xl">
        <div className="mb-14 grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F3CC31]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/40">
                {t("about.eyebrow")}
              </p>
            </div>
            <h2 className="text-[clamp(2.2rem,4.6vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              {t("about.headline")}
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8 lg:border-t-0 lg:pt-0">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="mb-1 text-3xl font-extrabold tracking-[-0.02em] text-[#F3CC31] lg:text-4xl">
                  {stat.number}
                </p>
                <p className="text-xs leading-5 text-white/45">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl">
          <p className="mb-5 text-lg leading-8 text-white/70">{t("about.bio")}</p>
          <p className="mb-8 text-lg leading-8 text-white/70">{t("about.closing")}</p>

          <a
            href="https://www.linkedin.com/in/sophia-ayoubi-74a45099"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-white/70 transition duration-200 hover:border-white/40 hover:text-white"
          >
            <FaLinkedinIn size={15} />
            {t("about.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
