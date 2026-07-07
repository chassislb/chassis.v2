import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import sophia from "../../assets/logo/sophia.webp";
import CursorGlow from "../CursorGlow/CursorGlow";
import Starfield from "../Starfield/Starfield";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-line", { yPercent: 110, stagger: 0.12, duration: 1.1 }, 0.2)
        .from(".hero-cue", { opacity: 0, y: 12, duration: 0.8 }, "-=0.3")
        .from(imageRef.current, { opacity: 0, y: 40, duration: 1.2, ease: "power2.out" }, 0.35);

      gsap.to(imageRef.current, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden bg-neutral-950 text-white">
      <CursorGlow color="#36C6F4" />
      <Starfield seed={1} count={40} />

      <div className="absolute inset-0 opacity-[0.06]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 px-6 py-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-12 lg:py-0">
        <div className="text-center lg:text-left">
          <h1 className="mx-auto max-w-2xl text-[clamp(2.6rem,6vw,4.75rem)] font-extrabold leading-[1.03] tracking-[-0.03em] lg:mx-0">
            <span className="block overflow-hidden">
              <span className="hero-line inline-block">{t("hero.line1")}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line inline-block">
                {t("hero.line2")} <span className="text-[#F3CC31]">{t("hero.accent")}</span>
              </span>
            </span>
          </h1>

          <a
            href="#diagnosis"
            className="hero-cue group mt-16 inline-flex flex-col items-center gap-3 text-white/40 transition hover:text-white lg:items-start"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.35em]">
              {t("hero.cue")}
            </span>
            <ArrowDown size={16} className="animate-[bob_1.8s_ease-in-out_infinite] transition group-hover:text-[#36C6F4]" />
          </a>
        </div>

        <div ref={imageRef} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
            <img
              src={sophia}
              alt="Sophia Ayoubi, founder of Chassis"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-5 start-5 rounded-2xl border border-white/10 bg-neutral-950/90 px-5 py-4 backdrop-blur-xl">
            <p className="text-sm font-bold text-white">{t("hero.founderName")}</p>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              {t("hero.founderTitle")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
