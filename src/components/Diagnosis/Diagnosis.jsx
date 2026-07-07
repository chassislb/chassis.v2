import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, RotateCcw } from "lucide-react";
import { questions, nodes, getResultBand } from "../../data/diagnosis";
import MagneticButton from "../MagneticButton/MagneticButton";
import CursorGlow from "../CursorGlow/CursorGlow";
import DependencyMap from "../DependencyMap/DependencyMap";
import Starfield from "../Starfield/Starfield";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const nodeLabelByKey = Object.fromEntries(nodes.map((n) => [n.key, n.label]));

export default function Diagnosis() {
  const { t, lang, dir } = useLanguage();
  const isRTL = dir === "rtl";
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState("");

  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );
    },
    { scope: sectionRef }
  );

  const isNameStep = step === questions.length;
  const isResult = step > questions.length;
  const score = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const band = isResult ? getResultBand(score) : null;

  useEffect(() => {
    if (isResult) {
      // TODO: send lead to email/CRM
      console.log("Diagnosis lead captured:", { name, score, band: band?.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResult]);

  const selectAnswer = (value) => {
    const node = questions[step].node;
    setAnswers((prev) => ({ ...prev, [node]: value }));
    setStep((s) => s + 1);
  };

  const submitName = () => {
    if (!name.trim()) return;
    setStep((s) => s + 1);
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const restart = () => {
    setStep(0);
    setAnswers({});
    setName("");
  };

  const NextIcon = isRTL ? ArrowLeft : ArrowRight;
  const BackIcon = isRTL ? ArrowRight : ArrowLeft;
  const questionLabel = t("diagnosis.questionOf")
    .replace("{current}", step + 1)
    .replace("{total}", questions.length);

  return (
    <section
      ref={sectionRef}
      id="diagnosis"
      className="relative overflow-hidden bg-neutral-950 px-6 py-28 text-white lg:px-12"
    >
      <CursorGlow color="#F3CC31" />
      <Starfield seed={2} count={30} />

      <div className="absolute inset-0 opacity-[0.05]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div ref={headerRef} className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F3CC31]" />
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/40">
              {t("diagnosis.eyebrow")}
            </p>
          </div>

          <h2 className="text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {t("diagnosis.headline")}
          </h2>
          <p className="mt-5 text-base text-white/45">{t("diagnosis.sub")}</p>
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-10">
          {/* Quiz */}
          <div className="order-2 lg:order-1">
            <div className="mx-auto mb-8 flex max-w-md items-center gap-2">
              {questions.map((q, i) => (
                <span
                  key={q.id}
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    i < step || isResult
                      ? "bg-[#F3CC31]"
                      : i === step
                        ? "bg-white/50"
                        : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                {!isNameStep && !isResult ? (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: isRTL ? -24 : 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? 24 : -24 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#36C6F4]">
                      {questionLabel} · {nodeLabelByKey[questions[step].node][lang]}
                    </p>
                    <h3 className="mb-8 text-xl font-bold leading-snug tracking-[-0.01em]">
                      {questions[step].prompt[lang]}
                    </h3>

                    <div className="flex flex-col gap-3">
                      {questions[step].options.map((opt) => (
                        <button
                          key={opt.label.en}
                          onClick={() => selectAnswer(opt.score)}
                          className="group flex items-center justify-between rounded-2xl border border-white/10 px-5 py-3.5 text-start text-sm font-medium text-white/80 transition duration-200 hover:border-[#F3CC31]/50 hover:bg-[#F3CC31]/[0.06] hover:text-white"
                        >
                          {opt.label[lang]}
                          <NextIcon
                            size={15}
                            className="flex-shrink-0 text-white/20 transition group-hover:text-[#F3CC31] rtl:group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5"
                          />
                        </button>
                      ))}
                    </div>

                    {step > 0 && (
                      <button
                        onClick={goBack}
                        className="mt-7 flex items-center gap-2 text-sm font-medium text-white/40 transition hover:text-white"
                      >
                        <BackIcon size={14} />
                        {t("diagnosis.back")}
                      </button>
                    )}
                  </motion.div>
                ) : isNameStep ? (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, x: isRTL ? -24 : 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? 24 : -24 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#36C6F4]">
                      {t("diagnosis.nameStepLabel")}
                    </p>
                    <h3 className="mb-8 text-xl font-bold leading-snug tracking-[-0.01em]">
                      {t("diagnosis.namePrompt")}
                    </h3>

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && submitName()}
                      placeholder={t("diagnosis.namePlaceholder")}
                      required
                      className="mb-6 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-white placeholder:text-white/30 outline-none transition focus:border-[#F3CC31]/50"
                    />

                    <button
                      onClick={submitName}
                      disabled={!name.trim()}
                      className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#F3CC31] px-7 py-3.5 text-sm font-bold text-neutral-950 transition duration-200 hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      {t("diagnosis.nameContinue")}
                      <NextIcon
                        size={15}
                        className="transition rtl:group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5"
                      />
                    </button>

                    <button
                      onClick={goBack}
                      className="mt-7 flex items-center gap-2 text-sm font-medium text-white/40 transition hover:text-white"
                    >
                      <BackIcon size={14} />
                      {t("diagnosis.back")}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#36C6F4]">
                      {t("diagnosis.resultLabel").replace("{name}", name)}
                    </p>
                    <h3 className="mb-4 text-2xl font-extrabold leading-tight tracking-[-0.02em] text-[#F3CC31]">
                      {band.label[lang]}
                    </h3>
                    <p className="mb-8 text-base leading-7 text-white/70">
                      {band.summary[lang]}
                    </p>

                    <div className="flex flex-col gap-3">
                      <MagneticButton
                        href="https://calendly.com/chassis-lb/chassis-discovery-call"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#F3CC31] px-7 py-3.5 text-sm font-bold text-neutral-950 transition-colors duration-300 hover:bg-white"
                      >
                        {t("diagnosis.cta")}
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:scale-x-[-1]"
                        />
                      </MagneticButton>
                      <button
                        onClick={restart}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-bold text-white/60 transition duration-200 hover:border-white/40 hover:text-white"
                      >
                        <RotateCcw size={14} />
                        {t("diagnosis.retake")}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Live dependency map */}
          <div className="order-1 lg:order-2">
            <div className="mx-auto aspect-square w-full max-w-sm">
              <DependencyMap values={answers} size={420} lang={lang} />
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/35">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#F3CC31]" />
                {t("diagnosis.legendRoutes")}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#36C6F4]" />
                {t("diagnosis.legendIndependent")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
