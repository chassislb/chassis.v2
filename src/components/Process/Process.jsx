import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import SectionHeading from "../common/SectionHeading";
import Panel from "../Panel/Panel";

function Process() {
  const { t } = useLanguage();
  const stages = t("process.stages");
  const [activeIndex, setActiveIndex] = useState(null);
  const active = activeIndex === null ? null : stages[activeIndex];

  return (
    <section id="process" className="border-t border-white/10 bg-[var(--bg)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <SectionHeading eyebrow={t("process.eyebrow")} heading={t("process.heading")} note={t("process.note")} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, i) => (
            <button
              key={stage.index}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="group flex flex-col items-start rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-start transition hover:border-[var(--yellow)]/50 hover:bg-white/[0.05]"
            >
              <span className="mb-4 text-sm font-bold text-white/30">{stage.index}</span>
              <h3 className="mb-2 text-lg font-bold text-white transition group-hover:text-[var(--yellow)]">{stage.name}</h3>
              <p className="text-sm leading-6 text-white/60">{stage.summary}</p>
            </button>
          ))}
        </div>
      </div>

      <Panel open={activeIndex !== null} onClose={() => setActiveIndex(null)} labelledBy="process-panel-title">
        {active && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <span className="mb-3 block text-sm font-bold text-[var(--yellow)]">{active.index}</span>
            <h2 id="process-panel-title" className="mb-5 text-3xl font-bold tracking-[-0.02em]">
              {active.name}
            </h2>
            <p className="mb-4 text-lg font-medium leading-8 text-white/85">{active.summary}</p>
            <p className="text-base leading-7 text-white/60">{active.detail}</p>
          </motion.div>
        )}
      </Panel>
    </section>
  );
}

export default Process;
