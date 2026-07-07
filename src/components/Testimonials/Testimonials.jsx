import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
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

      const cards = gsap.utils.toArray(".testimonial-card", sectionRef.current);
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: cards[0], start: "top 85%" },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-950 px-6 py-32 text-white lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={headerRef} className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F3CC31]" />
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/40">
              {t("testimonials.eyebrow")}
            </p>
          </div>
          <h2 className="text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {t("testimonials.headline")}
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="testimonial-card rounded-3xl border border-white/10 bg-white/[0.03] p-8 lg:p-10"
            >
              <div className="mb-5 flex items-center justify-between">
                <Quote size={20} className="text-[#F3CC31] rtl:scale-x-[-1]" />
                <div className="flex gap-0.5 text-[#F3CC31]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
              </div>
              <p className="mb-6 text-lg leading-8 text-white/75">"{item.quote[lang]}"</p>
              <p className="text-sm font-bold text-white">
                {item.name}
                <span className="font-medium text-white/40"> — {item.title[lang]}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
