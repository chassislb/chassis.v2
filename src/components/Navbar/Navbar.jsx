import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo/chassis-logo.webp";
import MagneticButton from "../MagneticButton/MagneticButton";
import { stopLenis, startLenis } from "../../lib/lenis";
import { useLanguage } from "../../i18n/LanguageContext";

const navKeys = ["diagnosis", "map", "method", "conditions", "cases", "layers"];

function LangToggle({ className = "" }) {
  const { lang, setLang } = useLanguage();
  return (
    <div className={`flex items-center overflow-hidden rounded-full border border-black/10 text-xs font-bold uppercase ${className}`}>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-3 py-1.5 transition ${lang === "en" ? "bg-neutral-950 text-white" : "text-neutral-500 hover:text-neutral-950"}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ar")}
        className={`px-3 py-1.5 transition ${lang === "ar" ? "bg-neutral-950 text-white" : "text-neutral-500 hover:text-neutral-950"}`}
      >
        AR
      </button>
    </div>
  );
}

function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) stopLenis();
    else startLenis();
    return () => {
      document.body.style.overflow = "";
      startLenis();
    };
  }, [open]);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full px-4 transition-[padding] duration-300 ${
        scrolled ? "py-2.5" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/10 bg-[#F8F7F3]/90 px-5 backdrop-blur-xl transition-[padding,box-shadow] duration-300 lg:px-6 ${
          scrolled ? "py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]" : "py-3 shadow-[0_1px_24px_rgba(0,0,0,0.06)]"
        }`}
      >
        <a href="#" className="flex items-center" onClick={() => setOpen(false)}>
          <img src={logo} alt="Chassis" className="h-7 w-auto lg:h-8" />
        </a>

        <div className="hidden items-center gap-5 text-sm font-medium text-neutral-700 lg:flex">
          {navKeys.map((key) => (
            <a key={key} href={`#${key}`} className="transition hover:text-neutral-950">
              {t(`nav.${key}`)}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LangToggle />
          <MagneticButton
            href="#contact"
            strength={0.3}
            className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#F3CC31] hover:text-neutral-950"
          >
            {t("nav.cta")}
          </MagneticButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LangToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "close menu" : "open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-950"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl border border-black/10 bg-[#F8F7F3]/95 p-6 shadow-lg backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1 text-base font-medium text-neutral-800">
            {navKeys.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 transition hover:bg-black/5"
              >
                {t(`nav.${key}`)}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-neutral-950 px-5 py-3.5 text-center text-sm font-bold text-white transition hover:bg-[#F3CC31] hover:text-neutral-950"
          >
            {t("nav.cta")}
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;
