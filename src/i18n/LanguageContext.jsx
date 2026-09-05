import { createContext, useContext, useEffect, useState } from "react";
import en from "./locales/en";
import ar from "./locales/ar";
import { parseLangPath, buildLangPath } from "./langPath";

const dictionaries = { en, ar };
const LanguageContext = createContext(null);

// The URL is the source of truth for language (needed for correct hreflang
// and for prerendered snapshots, which have no localStorage). A returning
// visitor with a saved Arabic preference landing on an English URL gets
// bounced to the Arabic URL synchronously, before first paint, so there's
// no flash of the wrong language.
function getInitialLang() {
  if (typeof window === "undefined") return "en";
  const { lang: urlLang, path } = parseLangPath(window.location.pathname);
  if (urlLang === "en" && localStorage.getItem("chassis-lang") === "ar") {
    const nextPath = buildLangPath("ar", path);
    window.history.replaceState({}, "", nextPath + window.location.search + window.location.hash);
    return "ar";
  }
  return urlLang;
}

function readPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem("chassis-lang", lang);
  }, [lang, dir]);

  useEffect(() => {
    const onPopState = () => setLangState(parseLangPath(window.location.pathname).lang);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const setLang = (nextLang) => {
    setLangState((prev) => {
      if (nextLang === prev) return prev;
      const { path } = parseLangPath(window.location.pathname);
      const nextPathname = buildLangPath(nextLang, path);
      window.history.pushState({}, "", nextPathname + window.location.search + window.location.hash);
      return nextLang;
    });
  };

  const toggleLang = () => setLang(lang === "en" ? "ar" : "en");

  const t = (key) => {
    const value = readPath(dictionaries[lang], key);
    if (value !== undefined) return value;
    const fallback = readPath(dictionaries.en, key);
    return fallback !== undefined ? fallback : key;
  };

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
