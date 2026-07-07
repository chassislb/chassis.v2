import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DependencyMap from "../DependencyMap/DependencyMap";
import CursorGlow from "../CursorGlow/CursorGlow";
import Starfield from "../Starfield/Starfield";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function OperatingMap() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef(null);
  const brokenRef = useRef(null);
  const repairedRef = useRef(null);
  const brokenLabelRef = useRef(null);
  const repairedLabelRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      tl.to(brokenRef.current, { opacity: 0, duration: 1 }, 0)
        .to(repairedRef.current, { opacity: 1, duration: 1 }, 0)
        .to(brokenLabelRef.current, { opacity: 0, y: -16, duration: 0.4 }, 0)
        .to(repairedLabelRef.current, { opacity: 1, y: 0, duration: 0.4 }, 0.6);
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="map"
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-950 px-6 py-32 text-center text-white lg:px-12"
    >
      <CursorGlow color="#36C6F4" />
      <Starfield seed={3} count={30} />

      <div className="absolute inset-0 opacity-[0.05]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <p className="mb-8 text-xs font-bold uppercase tracking-[0.28em] text-white/40">
          {t("map.eyebrow")}
        </p>

        <div className="relative mb-4 h-[2.6em] lg:h-[1.4em]">
          <h2
            ref={brokenLabelRef}
            className="absolute inset-0 text-[clamp(1.8rem,4.4vw,3rem)] font-extrabold leading-tight tracking-[-0.02em]"
          >
            {t("map.brokenLabel")}
          </h2>
          <h2
            ref={repairedLabelRef}
            className="absolute inset-0 text-[clamp(1.8rem,4.4vw,3rem)] font-extrabold leading-tight tracking-[-0.02em] text-[#36C6F4] opacity-0"
          >
            {t("map.repairedLabel")}
          </h2>
        </div>
      </div>

      <div className="relative mx-auto mt-16 aspect-square w-full max-w-lg">
        <div ref={brokenRef} className="absolute inset-0">
          <DependencyMap forceState="broken" size={480} lang={lang} />
        </div>
        <div ref={repairedRef} className="absolute inset-0 opacity-0">
          <DependencyMap forceState="repaired" size={480} lang={lang} />
        </div>
      </div>

      <p className="relative mx-auto mt-14 max-w-lg text-base leading-7 text-white/45">
        {t("map.footnote")}
      </p>
    </section>
  );
}
