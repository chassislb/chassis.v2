import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { useAuditModal } from "../../context/AuditModalContext";

function LangToggle({ className = "" }) {
  const { lang, setLang } = useLanguage();
  return (
    <div className={`flex items-center overflow-hidden rounded-full border border-white/15 text-xs font-bold uppercase ${className}`}>
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

// "Free Audit" opens the popup instead of navigating; every other nav item
// is a plain in-page/route link.
function NavLink({ link, className, onNavigate }) {
  const { openAudit } = useAuditModal();

  if (link.href === "/audit") {
    return (
      <button
        type="button"
        onClick={() => {
          openAudit();
          onNavigate?.();
        }}
        className={className}
      >
        {link.label}
      </button>
    );
  }

  return (
    <a href={link.href} className={className} onClick={onNavigate}>
      {link.label}
    </a>
  );
}

function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = t("nav.links");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full px-4 transition-[padding] duration-300 ${
        scrolled ? "py-2.5" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#0a0a0a]/85 px-5 backdrop-blur-xl transition-[padding,box-shadow] duration-300 lg:px-6 ${
          scrolled ? "py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.3)]" : "py-3 shadow-[0_1px_24px_rgba(0,0,0,0.2)]"
        }`}
      >
        <a href="#top" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src="/images/chassis-logo-white.png" alt="Chassis" className="h-6 w-auto lg:h-7" />
        </a>

        <div className="hidden items-center gap-6 text-sm font-medium text-white/80 lg:flex">
          {links.map((link) => (
            <NavLink key={link.href} link={link} className="transition hover:text-white" />
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LangToggle />
          <a
            href="https://calendly.com/chassis-lb/chassis-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[var(--yellow)] px-5 py-2.5 text-sm font-bold text-neutral-950 transition-colors duration-300 hover:bg-white"
          >
            {t("nav.cta")}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LangToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "close menu" : "open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl border border-white/10 bg-[#0a0a0a]/97 p-6 shadow-lg backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1 text-base font-medium text-white/85">
            {links.map((link) => (
              <NavLink
                key={link.href}
                link={link}
                className="rounded-xl px-3 py-3 text-start transition hover:bg-white/5"
                onNavigate={() => setOpen(false)}
              />
            ))}
          </div>
          <a
            href="https://calendly.com/chassis-lb/chassis-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-[var(--yellow)] px-5 py-3.5 text-center text-sm font-bold text-neutral-950 transition hover:bg-white"
          >
            {t("nav.cta")}
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;
