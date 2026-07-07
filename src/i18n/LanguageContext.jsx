import { createContext, useContext, useEffect, useState } from "react";
import en from "./locales/en";
import ar from "./locales/ar";

const dictionaries = { en, ar };
const LanguageContext = createContext(null);

function getInitialLang() {
  if (typeof window === "undefined") return "en";
  return localStorage.getItem("chassis-lang") === "ar" ? "ar" : "en";
}

function readPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem("chassis-lang", lang);
  }, [lang, dir]);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "ar" : "en"));

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
