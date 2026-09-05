import { useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { useModalBehavior } from "../../hooks/useModalBehavior";

function Panel({ open, onClose, labelledBy, children }) {
  const { t, dir } = useLanguage();
  const panelRef = useRef(null);

  useModalBehavior(open, panelRef, onClose);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-stretch justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            dir={dir}
            initial={{ x: dir === "rtl" ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: dir === "rtl" ? "-100%" : "100%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex h-full w-full flex-col overflow-y-auto bg-[var(--bg-raised)] text-[var(--text)] shadow-2xl sm:max-w-xl lg:max-w-2xl ${
              dir === "rtl" ? "sm:ms-auto" : "sm:ms-auto"
            }`}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[var(--bg-raised)]/95 px-6 py-4 backdrop-blur">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                {t("panel.escapeHint")}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label={t("work.closeLabel")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[var(--yellow)] hover:text-[var(--yellow)]"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 px-6 py-8 sm:px-10 sm:py-10">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default Panel;
