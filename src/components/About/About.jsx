import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import Panel from "../Panel/Panel";

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16} {...props}>
      <path d="M6.94 6.5A1.94 1.94 0 115 4.56 1.94 1.94 0 016.94 6.5zM5 8h3.9v12H5zm7 0h3.7v1.7h.05c.5-.9 1.8-1.8 3.7-1.8 4 0 4.7 2.6 4.7 6v6.1H20v-5.4c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V20H12z" />
    </svg>
  );
}

export default function About() {
  const { t } = useLanguage();
  const stats = t("about.stats");
  const modelSteps = t("about.modelSteps");
  const goodFit = t("about.goodFit");
  const notFit = t("about.notFit");
  const [open, setOpen] = useState(false);

  return (
    <section id="about" className="border-t border-white/10 bg-[var(--bg)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
          <div className="mx-auto w-full max-w-sm lg:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
              <img
                src="/images/sophia.jpg"
                alt="Sophia Ayoubi, founder of Chassis"
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>

          <div>
            <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-[var(--blue)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--blue)]" />
              {t("about.eyebrow")}
            </p>
            <h2 className="mb-6 text-[clamp(1.9rem,3.8vw,2.9rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              {t("about.heading")} <span className="text-[var(--yellow)]">{t("about.headingEmphasis")}</span>
            </h2>
            <p className="mb-8 max-w-xl text-base leading-7 text-white/65">{t("about.shortBio")}</p>

            <div className="mb-8 grid grid-cols-3 gap-4 border-y border-white/10 py-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-[var(--yellow)] sm:text-3xl">{stat.number}</p>
                  <p className="mt-1 text-xs leading-5 text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:border-[var(--yellow)] hover:text-[var(--yellow)]"
              >
                {t("about.openLabel")}
              </button>
              <a
                href="https://www.linkedin.com/in/sophia-ayoubi-74a45099"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-white/60 transition hover:text-white"
              >
                <LinkedinIcon /> {t("about.linkedin")}
              </a>
            </div>
          </div>
        </div>
      </div>

      <Panel open={open} onClose={() => setOpen(false)} labelledBy="about-panel-title">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h2 id="about-panel-title" className="mb-1 text-3xl font-bold tracking-[-0.02em]">
            Sophia Ayoubi
          </h2>
          <p className="mb-6 text-sm font-semibold text-white/50">{t("about.founderTitle")}</p>

          <div className="mb-8 flex flex-col gap-4">
            {t("about.bio").map((paragraph, i) => (
              <p key={i} className="text-sm leading-7 text-white/70">
                {paragraph}
              </p>
            ))}
            <p className="text-base font-semibold leading-7 text-white">{t("about.bioEmphasis")}</p>
          </div>

          <div className="mb-10">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-white/40">{t("about.modelHeading")}</h3>
            <div className="flex flex-col gap-5">
              {modelSteps.map((step) => (
                <div key={step.index} className="flex gap-4">
                  <span className="text-sm font-bold text-white/30">{step.index}</span>
                  <div>
                    <h4 className="mb-1 font-bold text-white">{step.name}</h4>
                    <p className="text-sm leading-6 text-white/60">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-bold text-white">{t("about.goodFitLabel")}</p>
              <ul className="flex flex-col gap-2">
                {goodFit.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-white/70">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--yellow)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-bold text-white/50">{t("about.notFitLabel")}</p>
              <ul className="flex flex-col gap-2">
                {notFit.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-white/45">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/25" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            href="https://calendly.com/chassis-lb/chassis-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--yellow)] px-6 py-3.5 text-sm font-bold text-neutral-950 transition hover:bg-white sm:w-auto"
          >
            {t("hero.ctaPrimary")}
          </a>
        </motion.div>
      </Panel>
    </section>
  );
}
