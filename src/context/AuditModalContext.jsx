import { createContext, useContext, useEffect, useState } from "react";
import { parseLangPath } from "../i18n/langPath";

const AuditModalContext = createContext(null);

export function AuditModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  // Support direct links to /audit (and /ar/audit) — open the popup on top of whatever page loads.
  useEffect(() => {
    const { path } = parseLangPath(window.location.pathname);
    if (path.replace(/\/$/, "") === "/audit") {
      setIsOpen(true);
    }
  }, []);

  const openAudit = () => setIsOpen(true);
  const closeAudit = () => setIsOpen(false);

  return (
    <AuditModalContext.Provider value={{ isOpen, openAudit, closeAudit }}>
      {children}
    </AuditModalContext.Provider>
  );
}

export function useAuditModal() {
  const ctx = useContext(AuditModalContext);
  if (!ctx) throw new Error("useAuditModal must be used within AuditModalProvider");
  return ctx;
}
