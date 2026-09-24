import { useLanguage } from "../../i18n/LanguageContext";

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2c2.7 0 3 .01 4 .06 1 .05 1.7.2 2.1.37.5.2.9.5 1.3.9.4.4.7.8.9 1.3.17.4.32 1.1.37 2.1.05 1 .06 1.3.06 4s-.01 3-.06 4c-.05 1-.2 1.7-.37 2.1-.2.5-.5.9-.9 1.3-.4.4-.8.7-1.3.9-.4.17-1.1.32-2.1.37-1 .05-1.3.06-4 .06s-3-.01-4-.06c-1-.05-1.7-.2-2.1-.37-.5-.2-.9-.5-1.3-.9-.4-.4-.7-.8-.9-1.3-.17-.4-.32-1.1-.37-2.1C2.01 15 2 14.7 2 12s.01-3 .06-4c.05-1 .2-1.7.37-2.1.2-.5.5-.9.9-1.3.4-.4.8-.7 1.3-.9.4-.17 1.1-.32 2.1-.37C9 2.01 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.8a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
    </svg>
  );
}

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
        <p className="mb-10 text-base leading-7 text-white/60">{t("direction.body")}</p>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-start sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <img src="/images/chefintel-icon.svg" alt="Chef Intel" className="h-9 w-9 shrink-0" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--blue)]">{t("direction.product.label")}</p>
              <p className="text-lg font-bold text-white">{t("direction.product.name")}</p>
            </div>
          </div>
          <p className="mb-4 text-sm leading-6 text-white/65">{t("direction.product.body")}</p>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">{t("direction.product.status")}</p>
          <a
            href="https://www.instagram.com/chef.intel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition hover:border-white/50"
          >
            <InstagramIcon width={16} height={16} />
            {t("direction.product.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Direction;
