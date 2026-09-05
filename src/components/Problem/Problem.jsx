import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";

function Problem() {
  const { t } = useLanguage();
  const statement = t("problem.statement");
  const patterns = t("problem.patterns");

  return (
    <section id="problem" className="border-t border-white/10 bg-[var(--bg)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="mb-16 grid gap-2 border-y border-white/10 py-10 text-center sm:grid-cols-3 sm:divide-x sm:divide-white/10 rtl:sm:divide-x-reverse">
          {statement.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`px-4 text-lg font-semibold leading-snug sm:text-xl ${i === 1 ? "text-[var(--yellow)]" : "text-white"}`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[var(--blue)]">{t("problem.eyebrow")}</p>
            <h2 className="mb-6 text-[clamp(1.7rem,3.4vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em]">
              {t("problem.lead")}
            </h2>
            <p className="mb-4 text-base leading-7 text-white/65">{t("problem.body")}</p>
            <p className="text-lg font-semibold text-white">{t("problem.emphasis")}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-1 border-b border-white/10 pb-5">
              <p className="text-sm font-bold text-white">{t("problem.patternsLabel")}</p>
              <p className="text-sm text-white/50">{t("problem.patternsNote")}</p>
            </div>
            <div className="flex flex-col divide-y divide-white/10">
              {patterns.map((pattern, i) => (
                <div key={pattern.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                  <span className="text-sm font-bold text-white/30">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="mb-1 font-bold text-white">{pattern.title}</h3>
                    <p className="text-sm leading-6 text-white/60">{pattern.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Problem;
