import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import SEO from "../components/common/SEO";
import { useLanguage } from "../i18n/LanguageContext";
import { buildLangPath } from "../i18n/langPath";
import { organizationSchema } from "../seo/schema";

export default function LegalPage({ contentKey, path }) {
  const { t, lang } = useLanguage();
  const content = t(contentKey);

  return (
    <>
      <SEO
        path={path}
        title={`Chassis: ${content.heading.replace(/\.$/, "")}`}
        description={content.intro}
        jsonLd={[organizationSchema(lang)]}
      />
      <Navbar />
      <main className="min-h-screen bg-[var(--bg)] px-6 pb-24 pt-32 text-white lg:px-12 lg:pt-36">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--blue)]" />
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/40">{content.title}</p>
          </div>

          <h1 className="mb-6 text-[clamp(2rem,4.2vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.02em]">
            {content.heading}
          </h1>
          <p className="mb-2 text-sm font-medium text-white/40">{content.updated}</p>
          <p className="mb-14 max-w-2xl text-base leading-7 text-white/65">{content.intro}</p>

          <div className="flex flex-col gap-10">
            {content.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="mb-2 text-lg font-bold text-white">{section.heading}</h2>
                <p className="text-base leading-7 text-white/60">{section.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm font-semibold leading-6 text-white/80">
            {content.commitment}
          </p>

          <p className="mt-8 text-sm leading-6 text-white/60">
            {content.contactLabel}{" "}
            <a href="mailto:chassis.lb@gmail.com" className="font-bold text-white underline underline-offset-4 transition hover:text-[var(--yellow)]">
              chassis.lb@gmail.com
            </a>
          </p>

          <div className="mt-14 border-t border-white/10 pt-8">
            <a
              href={buildLangPath(lang, "/")}
              className="text-sm font-bold text-white underline underline-offset-4 transition hover:text-[var(--yellow)]"
            >
              ← {t("legal.backHome")}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
