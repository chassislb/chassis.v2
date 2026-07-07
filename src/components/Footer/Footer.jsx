import logoWhite from "../../assets/logo/chassis-logo-white.webp";
import { useLanguage } from "../../i18n/LanguageContext";

const navKeys = ["diagnosis", "map", "method", "conditions", "about", "cases", "layers", "contact"];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-neutral-950 px-6 py-14 lg:px-12">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <img
              src={logoWhite}
              alt="Chassis"
              loading="lazy"
              className="mb-4 h-7 w-auto"
            />
            <p className="max-w-xs text-sm leading-6 text-white/35">
              {t("footer.tagline1")}
              <br />
              {t("footer.tagline2")}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-4">
            {navKeys.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="text-sm font-medium text-white/40 transition duration-200 hover:text-white"
              >
                {t(`nav.${key}`)}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/25">
            © {year} Chassis. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6">
            <a href="/terms" className="text-xs text-white/40 transition duration-200 hover:text-white">
              {t("footer.terms")}
            </a>
            <a href="/privacy" className="text-xs text-white/40 transition duration-200 hover:text-white">
              {t("footer.privacy")}
            </a>
          </div>
          <p className="text-xs text-white/20">
            {t("footer.strapline")}
          </p>
        </div>

      </div>
    </footer>
  );
}
