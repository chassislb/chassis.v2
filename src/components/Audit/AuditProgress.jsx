import { useLanguage } from "../../i18n/LanguageContext";

function AuditProgress({ current, total }) {
  const { t } = useLanguage();
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="mx-auto w-full max-w-2xl px-6 pt-6 sm:px-0">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
        <span>
          {t("audit.ui.questionWord")} {current} {t("audit.ui.ofWord")} {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[var(--yellow)] transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default AuditProgress;
