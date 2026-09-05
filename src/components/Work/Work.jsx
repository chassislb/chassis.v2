import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import SectionHeading from "../common/SectionHeading";
import Panel from "../Panel/Panel";

function Work() {
  const { t } = useLanguage();
  const featured = t("work.featured");
  const items = t("work.items");
  const closing = t("work.closing");

  const [featuredOpen, setFeaturedOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const active = items.find((item) => item.id === activeId) || null;

  return (
    <section id="work" className="border-t border-white/10 bg-[var(--bg)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <SectionHeading eyebrow={t("work.eyebrow")} heading={t("work.heading")} note={t("work.intro")} />

        <button
          type="button"
          onClick={() => setFeaturedOpen(true)}
          className="group mb-6 grid w-full gap-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-start transition hover:border-[var(--yellow)]/40 sm:grid-cols-[1fr_1.3fr] sm:p-8"
        >
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white/5">
            <img
              src="/images/case-studies/chef-michel.jpg"
              alt={featured.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-3 flex flex-wrap gap-2">
              {featured.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/60">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="mb-2 text-2xl font-bold text-white transition group-hover:text-[var(--yellow)]">
              {featured.name}
            </h3>
            <p className="mb-4 text-sm leading-6 text-white/60">{featured.summary}</p>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--blue)]">
              {t("work.viewAll")} <span className="rtl:rotate-180">→</span>
            </span>
          </div>
        </button>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-start transition hover:border-[var(--yellow)]/40 hover:bg-white/[0.05]"
            >
              <div className="mb-3 flex flex-wrap gap-1.5">
                {item.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white/50">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mb-1.5 font-bold text-white transition group-hover:text-[var(--yellow)]">{item.name}</h3>
              <p className="text-sm leading-6 text-white/60">{item.summary}</p>
            </button>
          ))}
        </div>

        <div className="mt-16 max-w-2xl">
          <h3 className="mb-3 text-xl font-bold leading-snug">{closing.heading}</h3>
          <p className="text-sm leading-7 text-white/60">{closing.body}</p>
        </div>
      </div>

      <Panel open={featuredOpen} onClose={() => setFeaturedOpen(false)} labelledBy="featured-panel-title">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="mb-6 aspect-video overflow-hidden rounded-2xl bg-white/5">
            <img src="/images/case-studies/chef-michel.jpg" alt={featured.name} className="h-full w-full object-cover" />
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            {featured.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/60">
                {tag}
              </span>
            ))}
          </div>
          <h2 id="featured-panel-title" className="mb-1 text-3xl font-bold tracking-[-0.02em]">
            {featured.name}
          </h2>
          <p className="mb-6 text-sm font-semibold text-white/50">{featured.role}</p>
          <p className="mb-8 text-lg font-medium leading-8 text-white/85">{featured.overview}</p>

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-white/40">{t("work.problemLabel")}</h3>
            <p className="text-sm leading-7 text-white/70">{featured.problem}</p>
          </div>
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-white/40">{t("work.involvementLabel")}</h3>
            <p className="text-sm leading-7 text-white/70">{featured.involvement}</p>
          </div>
          <div className="mb-8">
            <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-white/40">{t("work.changedLabel")}</h3>
            <p className="text-sm leading-7 text-white/70">{featured.changed}</p>
          </div>

          <blockquote className="mb-8 rounded-xl border-s-2 border-[var(--yellow)] bg-white/[0.03] p-5">
            <p className="mb-3 text-sm italic leading-7 text-white/80">&ldquo;{featured.quote}&rdquo;</p>
            <cite className="text-xs font-semibold not-italic text-white/50">{featured.quoteAuthor}</cite>
          </blockquote>

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

      <Panel open={!!active} onClose={() => setActiveId(null)} labelledBy="work-panel-title">
        {active && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="mb-4 flex flex-wrap gap-2">
              {active.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/60">
                  {tag}
                </span>
              ))}
            </div>
            <h2 id="work-panel-title" className="mb-6 text-3xl font-bold tracking-[-0.02em]">
              {active.name}
            </h2>

            <div className="mb-6">
              <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-white/40">{t("work.problemLabel")}</h3>
              <p className="text-sm leading-7 text-white/70">{active.problem}</p>
            </div>
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-white/40">{t("work.involvementLabel")}</h3>
              <p className="text-sm leading-7 text-white/70">{active.involvement}</p>
            </div>
            <div className="mb-8">
              <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-white/40">{t("work.changedLabel")}</h3>
              <p className="text-sm leading-7 text-white/70">{active.changed}</p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-white/40">{t("work.scopeLabel")}</h3>
              <ul className="flex flex-col gap-2">
                {active.scope.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm leading-6 text-white/70">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--yellow)]" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </Panel>
    </section>
  );
}

export default Work;
