import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 bg-[var(--bg)] px-6 py-24 text-white sm:py-32 lg:px-12">
      <div
        className="pointer-events-none absolute -bottom-32 start-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--yellow), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--blue)]" />
          {t("finalCta.eyebrow")}
        </p>

        <h2 className="mb-6 text-balance text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.12] tracking-[-0.02em]">
          {t("finalCta.heading")}
        </h2>

        <p className="mx-auto mb-10 max-w-xl text-base leading-7 text-white/60">{t("finalCta.body")}</p>

        <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://calendly.com/chassis-lb/chassis-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--yellow)] px-8 py-4 text-sm font-bold text-neutral-950 transition hover:bg-white sm:w-auto"
          >
            {t("finalCta.ctaPrimary")}
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:scale-x-[-1]" />
          </a>
          <a
            href="https://wa.me/96171085824"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-bold text-white transition hover:border-white/50 sm:w-auto"
          >
            <MessageCircle size={16} />
            {t("finalCta.ctaSecondary")}
          </a>
        </div>

        <a
          href="mailto:chassis.lb@gmail.com"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition hover:text-white"
        >
          <Mail size={14} /> chassis.lb@gmail.com
        </a>

        <p className="mt-10 text-sm font-medium text-white/35">{t("finalCta.closing")}</p>
      </div>
    </section>
  );
}
