import { Star } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import SectionHeading from "../common/SectionHeading";

function Testimonials() {
  const { t } = useLanguage();
  const items = t("testimonials.items");

  return (
    <section className="border-t border-white/10 bg-[var(--bg)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <SectionHeading eyebrow={t("testimonials.eyebrow")} heading={t("testimonials.heading")} note={t("testimonials.note")} />

        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <figure key={item.name} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="mb-4 flex gap-1 text-[var(--yellow)]" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mb-6 flex-1 text-base leading-7 text-white/80">&ldquo;{item.quote}&rdquo;</blockquote>
              <figcaption>
                <p className="font-bold text-white">{item.name}</p>
                <p className="text-sm text-white/50">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
