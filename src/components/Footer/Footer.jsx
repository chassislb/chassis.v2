import { useLanguage } from "../../i18n/LanguageContext";
import { buildLangPath } from "../../i18n/langPath";

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2c2.7 0 3 .01 4 .06 1 .05 1.7.2 2.1.37.5.2.9.5 1.3.9.4.4.7.8.9 1.3.17.4.32 1.1.37 2.1.05 1 .06 1.3.06 4s-.01 3-.06 4c-.05 1-.2 1.7-.37 2.1-.2.5-.5.9-.9 1.3-.4.4-.8.7-1.3.9-.4.17-1.1.32-2.1.37-1 .05-1.3.06-4 .06s-3-.01-4-.06c-1-.05-1.7-.2-2.1-.37-.5-.2-.9-.5-1.3-.9-.4-.4-.7-.8-.9-1.3-.17-.4-.32-1.1-.37-2.1C2.01 15 2 14.7 2 12s.01-3 .06-4c.05-1 .2-1.7.37-2.1.2-.5.5-.9.9-1.3.4-.4.8-.7 1.3-.9.4-.17 1.1-.32 2.1-.37C9 2.01 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.8a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 6.5A1.94 1.94 0 115 4.56 1.94 1.94 0 016.94 6.5zM5 8h3.9v12H5zm7 0h3.7v1.7h.05c.5-.9 1.8-1.8 3.7-1.8 4 0 4.7 2.6 4.7 6v6.1H20v-5.4c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V20H12z" />
    </svg>
  );
}

const socialLinks = [
  { href: "https://www.facebook.com/chassis.lb", label: "Facebook", Icon: FacebookIcon },
  { href: "https://www.instagram.com/chassis.lb/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.linkedin.com/company/109408069/", label: "LinkedIn", Icon: LinkedinIcon },
];

export default function Footer() {
  const { t, lang } = useLanguage();
  const links = t("nav.links");

  return (
    <footer className="border-t border-white/10 bg-[var(--bg)] px-6 py-14 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <img src="/images/chassis-logo-white.png" alt="Chassis" loading="lazy" className="mb-4 h-7 w-auto" />
            <p className="max-w-xs text-sm leading-6 text-white/35">
              {t("footer.tagline")}
              <br />
              {t("footer.taglineLine2")}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-4" aria-label={t("footer.navLabel")}>
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-white/50 transition hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4" aria-label="Social links">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-[var(--yellow)] hover:text-[var(--yellow)]"
              >
                <Icon width={16} height={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">{t("footer.copyright")}</p>
          <div className="flex items-center gap-6">
            <a href={buildLangPath(lang, "/terms")} className="text-xs text-white/50 transition hover:text-white">
              {t("footer.terms")}
            </a>
            <a href={buildLangPath(lang, "/privacy")} className="text-xs text-white/50 transition hover:text-white">
              {t("footer.privacy")}
            </a>
          </div>
          <p className="text-xs text-white/25">{t("footer.credit")}</p>
        </div>
      </div>
    </footer>
  );
}
