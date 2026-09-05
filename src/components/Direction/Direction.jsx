import { useLanguage } from "../../i18n/LanguageContext";

function Direction() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-white/10 bg-[var(--bg)] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
        <p className="mb-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-[var(--blue)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--blue)]" />
          {t("direction.eyebrow")}
        </p>
        <h2 className="mb-5 text-2xl font-bold leading-snug tracking-[-0.01em] sm:text-3xl">{t("direction.heading")}</h2>
        <p className="text-base leading-7 text-white/60">{t("direction.body")}</p>
      </div>
    </section>
  );
}

export default Direction;
