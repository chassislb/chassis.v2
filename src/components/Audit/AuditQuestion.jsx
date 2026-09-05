import { Check } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

function OptionCard({ label, selected, onClick, multi }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-5 py-4 text-start text-base font-medium transition ${
        selected
          ? "border-[var(--yellow)] bg-[var(--yellow)]/10 text-white"
          : "border-white/12 bg-white/[0.02] text-white/80 hover:border-white/30 hover:bg-white/[0.05]"
      }`}
    >
      <span>{label}</span>
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center border text-neutral-950 ${
          multi ? "rounded-md" : "rounded-full"
        } ${selected ? "border-[var(--yellow)] bg-[var(--yellow)]" : "border-white/25 bg-transparent"}`}
      >
        {selected && <Check size={13} strokeWidth={3} />}
      </span>
    </button>
  );
}

function AuditQuestion({ question, dict, value, onChange, onEnter, error }) {
  const { t } = useLanguage();
  const placeholder = dict?.placeholder || t("audit.ui.textPlaceholder");

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onEnter?.();
    }
  }

  return (
    <div className="w-full">
      <h2 className="mb-6 text-[clamp(1.4rem,3.2vw,2rem)] font-bold leading-snug tracking-[-0.01em]">
        {dict?.label}
      </h2>

      {question.type === "short_text" && (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus
          className="w-full border-b-2 border-white/15 bg-transparent pb-3 text-lg text-white placeholder:text-white/30 focus:border-[var(--yellow)] focus:outline-none"
        />
      )}

      {question.type === "email" && (
        <input
          type="email"
          dir="ltr"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus
          className="w-full border-b-2 border-white/15 bg-transparent pb-3 text-start text-lg text-white placeholder:text-white/30 focus:border-[var(--yellow)] focus:outline-none"
        />
      )}

      {question.type === "phone" && (
        <input
          type="tel"
          dir="ltr"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus
          className="w-full border-b-2 border-white/15 bg-transparent pb-3 text-start text-lg text-white placeholder:text-white/30 focus:border-[var(--yellow)] focus:outline-none"
        />
      )}

      {question.type === "long_text" && (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={5}
          autoFocus
          className="w-full resize-none rounded-xl border border-white/15 bg-white/[0.02] p-4 text-base leading-7 text-white placeholder:text-white/30 focus:border-[var(--yellow)] focus:outline-none"
        />
      )}

      {question.type === "single_select" && (
        <div className="flex flex-col gap-3">
          {question.options.map((optValue) => (
            <OptionCard
              key={optValue}
              label={dict?.options?.[optValue] || optValue}
              selected={value === optValue}
              onClick={() => onChange(optValue)}
            />
          ))}
        </div>
      )}

      {question.type === "multi_select" && (
        <div className="flex flex-col gap-3">
          {question.options.map((optValue) => {
            const arr = Array.isArray(value) ? value : [];
            const selected = arr.includes(optValue);
            return (
              <OptionCard
                key={optValue}
                multi
                label={dict?.options?.[optValue] || optValue}
                selected={selected}
                onClick={() => {
                  const next = selected ? arr.filter((v) => v !== optValue) : [...arr, optValue];
                  onChange(next);
                }}
              />
            );
          })}
        </div>
      )}

      {question.type === "scale" && (
        <div>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {Array.from({ length: question.scaleMax - question.scaleMin + 1 }, (_, i) => i + question.scaleMin).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onChange(n)}
                aria-pressed={value === n}
                className={`flex h-12 items-center justify-center rounded-lg border text-sm font-bold transition ${
                  value === n
                    ? "border-[var(--yellow)] bg-[var(--yellow)] text-neutral-950"
                    : "border-white/15 bg-white/[0.02] text-white/70 hover:border-white/30"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-xs text-white/40">
            <span>{dict?.scaleLowLabel}</span>
            <span>{dict?.scaleHighLabel}</span>
          </div>
        </div>
      )}

      {error && <p className="mt-3 text-sm font-semibold text-[#ff8080]">{error}</p>}
    </div>
  );
}

export default AuditQuestion;
