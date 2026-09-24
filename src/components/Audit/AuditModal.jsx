import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Check, MessageCircle, X } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { useAuditModal } from "../../context/AuditModalContext";
import { useModalBehavior } from "../../hooks/useModalBehavior";
import { DIAGNOSTIC_QUESTIONS, getScoreBand, getCategoryBreakdown, recommendService } from "../../data/diagnosticQuestions";
import { submitDiagnosticEmail, buildWhatsAppUrl } from "../../utils/auditSubmit";

function LangToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center overflow-hidden rounded-full border border-white/15 text-xs font-bold uppercase">
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-3 py-1.5 transition ${lang === "en" ? "bg-white text-neutral-950" : "text-white/60 hover:text-white"}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
        className={`px-3 py-1.5 transition ${lang === "ar" ? "bg-white text-neutral-950" : "text-white/60 hover:text-white"}`}
      >
        AR
      </button>
    </div>
  );
}

function ModalHeader({ onClose, closeLabel }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[var(--bg)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
        <img src="/images/chassis-logo-white.png" alt="Chassis" className="h-6 w-auto" />
        <div className="flex items-center gap-3">
          <LangToggle />
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/40"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

function ChecklistItem({ label, checked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      className="flex w-full items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-start transition hover:border-white/25"
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition ${
          checked ? "border-[var(--yellow)] bg-[var(--yellow)]" : "border-white/25"
        }`}
      >
        {checked && <Check size={16} className="text-neutral-950" strokeWidth={3} />}
      </span>
      <span className="text-base leading-6 text-white/85">{label}</span>
    </button>
  );
}

function CategoryBar({ name, gaps, total }) {
  const pct = total ? Math.round((gaps / total) * 100) : 0;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-semibold text-white">{name}</span>
        <span className="text-white/40">
          {gaps}/{total}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[var(--yellow)]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function AuditModal() {
  const { t, lang, dir } = useLanguage();
  const { isOpen, closeAudit } = useAuditModal();
  const containerRef = useRef(null);

  const [stage, setStage] = useState("intro"); // intro | checklist | results
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: "", email: "", businessName: "", phone: "" });
  const [contactErrorKey, setContactErrorKey] = useState(null);
  const [sendState, setSendState] = useState("idle"); // idle | sending | sent | error

  useModalBehavior(isOpen, containerRef, closeAudit);

  const uncheckedCount = DIAGNOSTIC_QUESTIONS.length - Object.values(answers).filter(Boolean).length;
  const band = useMemo(() => getScoreBand(uncheckedCount), [uncheckedCount]);
  const breakdown = useMemo(() => getCategoryBreakdown(answers), [answers]);
  const recommendationKey = useMemo(() => recommendService(breakdown), [breakdown]);

  const bandCopy = t(`audit.results.bands.${band}`);
  const recommendationCopy = t(`audit.results.recommendations.${recommendationKey}`);
  const recommendedService = t("services.items").find((item) => item.id === recommendationKey);
  const categories = t("audit.categories");
  const questionResults = DIAGNOSTIC_QUESTIONS.map((q) => ({
    label: t(`audit.questions.${q.id}`),
    checked: Boolean(answers[q.id]),
  }));

  function toggleAnswer(id) {
    setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleClose() {
    closeAudit();
    setStage("intro");
    setAnswers({});
    setSendState("idle");
  }

  function startOver() {
    setAnswers({});
    setSendState("idle");
    setStage("checklist");
  }

  async function sendResults() {
    if (!contact.name.trim() || !contact.email.trim()) {
      setContactErrorKey("requiredError");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
      setContactErrorKey("emailError");
      return;
    }
    setContactErrorKey(null);
    setSendState("sending");
    try {
      await submitDiagnosticEmail({
        meta: {
          name: contact.name,
          email: contact.email,
          businessName: contact.businessName,
          phone: contact.phone,
          language: lang === "ar" ? "Arabic / العربية" : "English",
          timestamp: new Date().toLocaleString("en-GB", { timeZone: "Asia/Beirut" }) + " (Beirut time)",
        },
        questionResults,
        resultTitle: bandCopy.title,
        resultBody: bandCopy.body,
        recommendationTitle: recommendationCopy.title,
        recommendationBody: recommendationCopy.body,
        recommendationPrice: recommendedService?.price,
        recommendationDeliverables: recommendedService?.deliverables || [],
      });
      setSendState("sent");
    } catch {
      setSendState("error");
    }
  }

  if (!isOpen) return null;

  const whatsappUrl = buildWhatsAppUrl(
    {
      meta: { name: contact.name, email: contact.email, businessName: contact.businessName, phone: contact.phone },
      questionResults,
      resultTitle: bandCopy.title,
      resultBody: bandCopy.body,
      recommendationTitle: recommendationCopy.title,
      recommendationBody: recommendationCopy.body,
      recommendationPrice: recommendedService?.price,
      recommendationDeliverables: recommendedService?.deliverables || [],
    },
    "NEW CHASSIS BUSINESS DIAGNOSTIC"
  );

  return createPortal(
    <div className="fixed inset-0 z-[200]">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} aria-hidden="true" />
      <motion.div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("audit.metaTitle")}
        tabIndex={-1}
        dir={dir}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-full w-full flex-col overflow-y-auto bg-[var(--bg)] text-white"
      >
        <ModalHeader onClose={handleClose} closeLabel={t("audit.ui.backHome")} />

        {stage === "intro" && (
          <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-2xl flex-col justify-center px-6 py-16 text-center">
            <p className="mb-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-[var(--blue)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--blue)]" />
              {t("audit.intro.eyebrow")}
            </p>
            <h1 className="mb-5 text-[clamp(2rem,5vw,3rem)] font-extrabold uppercase leading-[1.1] tracking-[-0.02em]">
              {t("audit.intro.title")}
            </h1>
            <p className="mb-8 text-lg font-medium leading-8 text-white/80">{t("audit.intro.lead")}</p>
            <div className="mb-8 flex flex-col gap-4 text-start text-base leading-7 text-white/65">
              {t("audit.intro.paragraphs").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="font-semibold text-white">{t("audit.intro.reviewNote")}</p>
              <p className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/55">
                {t("audit.intro.disclaimer")}
              </p>
            </div>
            <p className="mb-8 text-sm font-semibold uppercase tracking-[0.15em] text-white/40">{t("audit.intro.time")}</p>
            <button
              type="button"
              onClick={() => setStage("checklist")}
              className="mx-auto inline-flex items-center gap-2 rounded-full bg-[var(--yellow)] px-8 py-4 text-sm font-bold text-neutral-950 transition hover:bg-white"
            >
              {t("audit.intro.cta")}
            </button>
          </main>
        )}

        {stage === "checklist" && (
          <main className="mx-auto w-full max-w-2xl px-6 py-12">
            <h2 className="mb-6 text-center text-xl font-bold leading-snug sm:text-2xl">{t("audit.checklist.heading")}</h2>
            <div className="flex flex-col gap-3">
              {DIAGNOSTIC_QUESTIONS.map((q) => (
                <ChecklistItem
                  key={q.id}
                  label={t(`audit.questions.${q.id}`)}
                  checked={Boolean(answers[q.id])}
                  onToggle={() => toggleAnswer(q.id)}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStage("results")}
              className="mx-auto mt-8 flex items-center gap-2 rounded-full bg-[var(--yellow)] px-8 py-4 text-sm font-bold text-neutral-950 transition hover:bg-white"
            >
              {t("audit.checklist.seeResults")}
            </button>
          </main>
        )}

        {stage === "results" && (
          <main className="mx-auto w-full max-w-2xl px-6 py-12">
            <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.28em] text-[var(--blue)]">
              {t("audit.results.scoreLabel")}
            </p>
            <h1 className="mb-3 text-center text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold leading-[1.15] tracking-[-0.02em]">
              {bandCopy.title}
            </h1>
            <p className="mb-10 text-center text-base leading-7 text-white/65">{bandCopy.body}</p>

            <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.15em] text-white/40">
                {t("audit.results.categoryHeading")}
              </h3>
              <div className="flex flex-col gap-5">
                <CategoryBar name={categories.foundation} gaps={breakdown.gaps.foundation} total={breakdown.totals.foundation} />
                <CategoryBar name={categories.operations} gaps={breakdown.gaps.operations} total={breakdown.totals.operations} />
                <CategoryBar name={categories.systems} gaps={breakdown.gaps.systems} total={breakdown.totals.systems} />
                <CategoryBar name={categories.execution} gaps={breakdown.gaps.execution} total={breakdown.totals.execution} />
              </div>
            </div>

            <div className="mb-10 rounded-2xl border border-[var(--blue)]/30 bg-[var(--blue)]/[0.06] p-6 sm:p-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--blue)]">
                {t("audit.results.recommendationLabel")}
              </p>
              <h3 className="mb-3 text-xl font-bold leading-snug">{recommendationCopy.title}</h3>
              <p className="text-sm leading-6 text-white/70">{recommendationCopy.body}</p>
            </div>

            <p className="mb-4 text-center text-sm text-white/50">{t("audit.results.ctaLead")}</p>
            <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://calendly.com/chassis-lb/chassis-discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-full bg-[var(--yellow)] px-7 py-3.5 text-center text-sm font-bold text-neutral-950 transition hover:bg-white sm:w-auto"
              >
                {t("audit.ui.bookCallButton")}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/50 sm:w-auto"
              >
                <MessageCircle size={16} />
                {t("audit.ui.whatsappButton")}
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <h3 className="mb-1 text-base font-bold">{t("audit.ui.contactHeading")}</h3>
              <p className="mb-5 text-sm leading-6 text-white/55">{t("audit.ui.contactLead")}</p>

              {sendState === "sent" ? (
                <p className="text-sm font-semibold text-white">{t("audit.ui.resultsSent")}</p>
              ) : (
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    value={contact.name}
                    onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                    placeholder={t("audit.ui.namePlaceholder")}
                    className="w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--blue)] focus:outline-none"
                  />
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                    placeholder={t("audit.ui.emailPlaceholder")}
                    className="w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--blue)] focus:outline-none"
                  />
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                    placeholder={t("audit.ui.phonePlaceholder")}
                    className="w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--blue)] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={contact.businessName}
                    onChange={(e) => setContact((c) => ({ ...c, businessName: e.target.value }))}
                    placeholder={t("audit.ui.businessPlaceholder")}
                    className="w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--blue)] focus:outline-none"
                  />

                  {contactErrorKey && <p className="text-sm text-[#ff8080]">{t(`audit.ui.${contactErrorKey}`)}</p>}
                  {sendState === "error" && <p className="text-sm text-[#ff8080]">{t("audit.ui.submitError")}</p>}

                  <button
                    type="button"
                    onClick={sendResults}
                    disabled={sendState === "sending"}
                    className="mt-1 rounded-full bg-white px-6 py-3 text-sm font-bold text-neutral-950 transition hover:bg-white/85 disabled:opacity-60"
                  >
                    {sendState === "sending" ? t("audit.ui.submitting") : t("audit.ui.sendResults")}
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={startOver}
              className="mx-auto mt-8 block text-xs font-semibold text-white/30 underline-offset-4 transition hover:text-white/60 hover:underline"
            >
              {t("audit.ui.startOver")}
            </button>
          </main>
        )}
      </motion.div>
    </div>,
    document.body
  );
}
