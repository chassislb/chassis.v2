import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, MessageCircle, X } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { useAuditModal } from "../../context/AuditModalContext";
import { useModalBehavior } from "../../hooks/useModalBehavior";
import { AUDIT_QUESTIONS, AUDIT_SECTIONS, getVisibleQuestions } from "../../data/auditQuestions";
import { submitAuditEmail, buildWhatsAppUrl } from "../../utils/auditSubmit";
import AuditProgress from "./AuditProgress";
import AuditQuestion from "./AuditQuestion";

const STORAGE_KEY = "chassis-audit-progress-v1";
const AUTO_ADVANCE_TYPES = ["single_select", "scale"];

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

function ModalHeader({ showProgress, current, total, onClose }) {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[var(--bg)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
        <img src="/images/chassis-logo-white.png" alt="Chassis" className="h-6 w-auto" />
        <div className="flex items-center gap-3">
          <LangToggle />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("audit.ui.backHome")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/40"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      {showProgress && <AuditProgress current={current} total={total} />}
    </header>
  );
}

function validateAnswer(question, value) {
  if (!question.required) return null;
  switch (question.type) {
    case "short_text":
    case "long_text":
      return value && String(value).trim() ? null : "requiredError";
    case "email":
      if (!value || !String(value).trim()) return "requiredError";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim()) ? null : "emailError";
    case "phone":
      if (!value || !String(value).trim()) return "requiredError";
      return /^[+]?[\d\s-]{7,}$/.test(String(value).trim()) ? null : "phoneError";
    case "single_select":
      return value ? null : "requiredError";
    case "multi_select":
      return Array.isArray(value) && value.length > 0 ? null : "selectAtLeastOne";
    case "scale":
      return typeof value === "number" ? null : "requiredError";
    default:
      return null;
  }
}

export default function AuditModal() {
  const { t, lang, dir } = useLanguage();
  const { isOpen, closeAudit } = useAuditModal();
  const containerRef = useRef(null);

  const [stage, setStage] = useState("intro"); // intro | form | submitting | success
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorKey, setErrorKey] = useState(null);
  const [submitErrorKey, setSubmitErrorKey] = useState(null);
  const [autoAdvanceNonce, setAutoAdvanceNonce] = useState(0);
  const [whatsapp, setWhatsapp] = useState(null);
  const hydrated = useRef(false);

  useModalBehavior(isOpen, containerRef, closeAudit);

  const visibleQuestions = useMemo(() => getVisibleQuestions(answers), [answers]);
  const total = visibleQuestions.length;
  const safeIndex = Math.min(currentIndex, Math.max(total - 1, 0));
  const question = visibleQuestions[safeIndex];
  const dict = question ? t(`audit.questions.${question.id}`) : null;

  // Restore in-progress audit on first mount so an accidental refresh/close doesn't erase it.
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved && saved.answers && Object.keys(saved.answers).length > 0) {
        setAnswers(saved.answers);
        setCurrentIndex(saved.currentIndex || 0);
        setStage("form");
      }
    } catch {
      // ignore corrupted storage
    }
  }, []);

  // Persist progress while filling out the form.
  useEffect(() => {
    if (stage !== "form") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, currentIndex: safeIndex }));
    } catch {
      // storage unavailable — proceed without local persistence
    }
  }, [answers, safeIndex, stage]);

  function goNext(currentAnswers = answers) {
    const err = validateAnswer(question, currentAnswers[question.id]);
    if (err) {
      setErrorKey(err);
      return;
    }
    setErrorKey(null);
    if (safeIndex >= total - 1) {
      submitAudit(currentAnswers);
    } else {
      setCurrentIndex(safeIndex + 1);
    }
  }

  function goBack() {
    setErrorKey(null);
    if (safeIndex > 0) setCurrentIndex(safeIndex - 1);
  }

  function handleChange(value) {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    setErrorKey(null);
    if (AUTO_ADVANCE_TYPES.includes(question.type)) {
      setAutoAdvanceNonce((n) => n + 1);
    }
  }

  // Auto-advance for single-select/scale questions, using freshly-committed state.
  useEffect(() => {
    if (autoAdvanceNonce === 0) return undefined;
    const timer = setTimeout(() => {
      goNext(answers);
    }, 280);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoAdvanceNonce]);

  function buildStructuredPayload(finalAnswers) {
    const locationsDict = t("audit.questions.locations");
    const languageLabel = lang === "ar" ? "Arabic / العربية" : "English";
    const meta = {
      businessName: finalAnswers.business_name || "",
      contactName: finalAnswers.contact_name_role || "",
      email: finalAnswers.email || "",
      phone: finalAnswers.phone || "",
      locationsLabel: locationsDict?.options?.[finalAnswers.locations] || finalAnswers.locations || "",
      teamSize: finalAnswers.team_size || "",
      language: languageLabel,
      timestamp: new Date().toLocaleString("en-GB", { timeZone: "Asia/Beirut" }) + " (Beirut time)",
      topChallengeLabel: t("audit.questions.biggest_challenge")?.label,
      topChallenge: finalAnswers.biggest_challenge || "",
    };

    const sections = AUDIT_SECTIONS.map((sectionKey) => {
      const items = AUDIT_QUESTIONS.filter(
        (q) => q.section === sectionKey && (!q.conditional || q.conditional(finalAnswers))
      ).map((q) => {
        const qDict = t(`audit.questions.${q.id}`);
        let answerDisplay = finalAnswers[q.id];
        if (q.type === "single_select") {
          answerDisplay = qDict?.options?.[finalAnswers[q.id]] || finalAnswers[q.id] || "";
        } else if (q.type === "multi_select") {
          const arr = Array.isArray(finalAnswers[q.id]) ? finalAnswers[q.id] : [];
          answerDisplay = arr.map((v) => qDict?.options?.[v] || v).join(", ");
        } else if (q.type === "scale") {
          answerDisplay = finalAnswers[q.id] != null ? String(finalAnswers[q.id]) : "";
        }
        return { label: qDict?.label || q.id, answer: answerDisplay || "" };
      });
      return { title: t(`audit.sections.${sectionKey}`), items };
    }).filter((section) => section.items.length > 0);

    return { meta, sections };
  }

  async function submitAudit(finalAnswers) {
    setStage("submitting");
    setSubmitErrorKey(null);
    const structured = buildStructuredPayload(finalAnswers);
    try {
      await submitAuditEmail(structured);
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      const wa = buildWhatsAppUrl(structured, {
        header: "NEW CHASSIS BUSINESS AUDIT",
        emailedNotice: t("audit.ui.whatsappEmailedNotice"),
      });
      setWhatsapp(wa);
      setStage("success");
    } catch {
      setSubmitErrorKey("submitError");
      setStage("form");
    }
  }

  function startOver() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setAnswers({});
    setCurrentIndex(0);
    setErrorKey(null);
    setSubmitErrorKey(null);
    setStage("intro");
  }

  function handleClose() {
    // Closing mid-audit is non-destructive: progress is already saved to
    // localStorage and will be restored next time the modal opens.
    closeAudit();
    if (stage === "success") {
      // Reset so a future open starts fresh rather than showing a stale success screen.
      setStage("intro");
      setAnswers({});
      setCurrentIndex(0);
      setWhatsapp(null);
    }
  }

  if (!isOpen) return null;

  const NextIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

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
        {stage === "intro" && (
          <>
            <ModalHeader showProgress={false} onClose={handleClose} />
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
                onClick={() => setStage("form")}
                className="mx-auto inline-flex items-center gap-2 rounded-full bg-[var(--yellow)] px-8 py-4 text-sm font-bold text-neutral-950 transition hover:bg-white"
              >
                {t("audit.intro.cta")}
                <NextIcon size={16} />
              </button>
            </main>
          </>
        )}

        {(stage === "form" || stage === "submitting") && question && (
          <>
            <ModalHeader showProgress current={safeIndex + 1} total={total} onClose={handleClose} />
            <main className="mx-auto flex min-h-[calc(100vh-105px)] w-full max-w-2xl flex-col justify-center px-6 py-12">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <AuditQuestion
                  question={question}
                  dict={dict}
                  value={answers[question.id]}
                  onChange={handleChange}
                  onEnter={() => goNext(answers)}
                  error={errorKey ? t(`audit.ui.${errorKey}`) : null}
                />
              </motion.div>

              {submitErrorKey && (
                <p className="mt-6 rounded-xl border border-[#ff8080]/30 bg-[#ff8080]/10 p-4 text-sm text-[#ff8080]">
                  {t(`audit.ui.${submitErrorKey}`)}
                </p>
              )}

              <div className="mt-10 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={safeIndex === 0 || stage === "submitting"}
                  className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/70 transition hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-0"
                >
                  {t("audit.ui.back")}
                </button>

                <button
                  type="button"
                  onClick={() => goNext(answers)}
                  disabled={stage === "submitting"}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--yellow)] px-7 py-3 text-sm font-bold text-neutral-950 transition hover:bg-white disabled:opacity-60"
                >
                  {stage === "submitting"
                    ? t("audit.ui.submitting")
                    : safeIndex === total - 1
                      ? t("audit.ui.submit")
                      : t("audit.ui.next")}
                  {stage !== "submitting" && <NextIcon size={16} />}
                </button>
              </div>

              <button
                type="button"
                onClick={startOver}
                className="mx-auto mt-8 block text-xs font-semibold text-white/30 underline-offset-4 transition hover:text-white/60 hover:underline"
              >
                {t("audit.ui.startOver")}
              </button>
            </main>
          </>
        )}

        {stage === "success" && (
          <>
            <ModalHeader showProgress={false} onClose={handleClose} />
            <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-xl flex-col justify-center px-6 py-16 text-center">
              <h1 className="mb-6 text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold leading-[1.15] tracking-[-0.02em]">
                {t("audit.success.title")}
              </h1>
              <div className="mb-8 flex flex-col gap-4 text-start text-base leading-7 text-white/70">
                {t("audit.success.paragraphs").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mb-10 font-bold text-white">
                {t("audit.success.signoff")}
                <br />
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">{t("audit.success.brand")}</span>
              </p>

              {whatsapp && (
                <div>
                  <a
                    href={whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/50"
                  >
                    <MessageCircle size={16} />
                    {t("audit.ui.whatsappButton")}
                  </a>
                  <p className="mt-3 text-xs text-white/35">{t("audit.ui.whatsappNote")}</p>
                </div>
              )}
            </main>
          </>
        )}
      </motion.div>
    </div>,
    document.body
  );
}
