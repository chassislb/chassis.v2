import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import { useAuditModal } from "../../context/AuditModalContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Hero() {
  const { t } = useLanguage();
  const { openAudit } = useAuditModal();
  const ticker = t("hero.ticker");

  return (
    <section id="top" className="relative flex min-h-[92vh] items-center overflow-hidden bg-[var(--bg)] pt-28 text-white sm:pt-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>
      <div
        className="pointer-events-none absolute -top-40 start-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--blue), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-16 text-center lg:px-12">
        <motion.p
          initial="hidden"
          animate="show"
          custom={0}
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-white/70"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--yellow)]" />
          {t("hero.eyebrow")}
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="show"
          custom={1}
          variants={fadeUp}
          className="mx-auto max-w-4xl text-[clamp(2.3rem,5.4vw,4.25rem)] font-extrabold leading-[1.08] tracking-[-0.03em]"
        >
          {t("hero.headlineA")} <span className="text-[var(--yellow)]">{t("hero.headlineEmphasis")}</span>{" "}
          {t("hero.headlineB")}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          custom={2}
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65"
        >
          {t("hero.subhead")}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          custom={3}
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="https://calendly.com/chassis-lb/chassis-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-[var(--yellow)] px-7 py-3.5 text-sm font-bold text-neutral-950 transition hover:bg-white sm:w-auto"
          >
            {t("hero.ctaPrimary")}
          </a>
          <a
            href="#process"
            className="w-full rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/50 sm:w-auto"
          >
            {t("hero.ctaSecondary")}
          </a>
        </motion.div>

        <motion.p
          initial="hidden"
          animate="show"
          custom={4}
          variants={fadeUp}
          className="mt-6 text-sm text-white/40"
        >
          {t("audit.homeCtaLead")}{" "}
          <button
            type="button"
            onClick={openAudit}
            className="font-semibold text-[var(--blue)] underline underline-offset-4 transition hover:text-white"
          >
            {t("audit.homeCtaLink")}
          </button>
        </motion.p>
      </div>

      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/10 bg-white/[0.03] py-4">
        <div className="flex w-max animate-[ticker_28s_linear_infinite] gap-10 whitespace-nowrap motion-reduce:animate-none">
          {[...ticker, ...ticker, ...ticker].map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
              {item}
              <span className="text-[var(--blue)]">—</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        [dir="rtl"] .animate-\\[ticker_28s_linear_infinite\\] {
          animation-direction: reverse;
        }
      `}</style>
    </section>
  );
}

export default Hero;
