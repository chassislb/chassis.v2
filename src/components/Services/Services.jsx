import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import SectionHeading from "../common/SectionHeading";

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-start"
      >
        <span className="font-semibold text-white">{q}</span>
        <ChevronDown size={18} className={`shrink-0 text-white/50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="mt-3 text-sm leading-6 text-white/60">{a}</p>}
    </div>
  );
}

function ServiceBlock({ item, t }) {
  return (
    <article className="py-10 sm:py-12">
      <div className="mb-5 flex items-baseline gap-4">
        <span className="text-sm font-bold text-white/30">{item.index}</span>
        <h3 className="text-2xl font-bold tracking-[-0.01em] text-white sm:text-[1.75rem]">{item.name}</h3>
      </div>

      {/* 2. One-line description */}
      <p className="mb-5 max-w-3xl text-lg font-medium leading-8 text-white/85">{item.summary}</p>

      {/* 3. Deeper explanation */}
      <p className="mb-2 max-w-3xl text-base leading-7 text-white/70">{item.lead}</p>
      <p className="mb-5 max-w-3xl text-base leading-7 text-white/60">{item.body}</p>

      {/* 4. Outcome: flowing sentence, not a boxed callout */}
      <p className="mb-8 max-w-3xl text-base leading-7 text-white/75">
        <span className="font-bold text-white">{t("services.outcomeLabel")} </span>
        {item.outcome}
      </p>

      {/* 5 & 6. Who it's for / who it's not for */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 sm:gap-10">
        <div>
          <h4 className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-white/40">{t("services.bestForLabel")}</h4>
          <p className="text-sm leading-6 text-white/70">{item.bestFor}</p>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-white/40">{t("services.notForLabel")}</h4>
          <p className="text-sm leading-6 text-white/50">{item.notFor}</p>
        </div>
      </div>

      {/* 7. What's included */}
      <div className="mb-8">
        <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-white/40">{t("services.getLabel")}</h4>
        <ul className="flex flex-col gap-2">
          {item.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-2.5 text-sm leading-6 text-white/70">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--yellow)]" />
              {d}
            </li>
          ))}
        </ul>
      </div>

      {/* 8. Investment: stated flat, inline */}
      <div>
        <h4 className="mb-1 text-sm font-bold uppercase tracking-[0.15em] text-white/40">{t("services.investmentLabel")}</h4>
        <p className="mb-1 text-2xl font-bold text-[var(--yellow)]">{item.price}</p>
        <p className="max-w-2xl text-sm leading-6 text-white/60">{t("services.priceNoteDefault")}</p>
      </div>
    </article>
  );
}

function OngoingPartner({ t }) {
  const partner = t("services.ongoingPartner");
  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--blue)]">{partner.eyebrow}</p>
      <h3 className="mb-3 text-xl font-bold leading-snug">{partner.name}</h3>
      <p className="mb-4 text-sm leading-6 text-white/60">{partner.body}</p>
      <p className="text-sm font-bold text-white">{partner.price}</p>
    </div>
  );
}

function Services() {
  const { t } = useLanguage();
  const items = t("services.items");
  const faq = t("services.faq");

  return (
    <section id="services" className="border-t border-white/10 bg-[var(--bg)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <SectionHeading eyebrow={t("services.eyebrow")} heading={t("services.heading")} note={t("services.intro")} />

        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {items.map((item) => (
            <ServiceBlock key={item.id} item={item} t={t} />
          ))}
        </div>

        <OngoingPartner t={t} />

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--blue)]">
            {t("services.pricingNote.eyebrow")}
          </p>
          <h3 className="mb-3 text-xl font-bold leading-snug">{t("services.pricingNote.heading")}</h3>
          <p className="text-sm leading-6 text-white/60">{t("services.pricingNote.body")}</p>
        </div>

        <div className="mt-16">
          <h3 className="mb-4 text-lg font-bold">{t("services.faqLabel")}</h3>
          <div>
            {faq.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
