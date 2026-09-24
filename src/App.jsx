import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Problem from "./components/Problem/Problem";
import Process from "./components/Process/Process";
import Services from "./components/Services/Services";
import Work from "./components/Work/Work";
import About from "./components/About/About";
import Direction from "./components/Direction/Direction";
import Testimonials from "./components/Testimonials/Testimonials";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AuditModal from "./components/Audit/AuditModal";
import SEO from "./components/common/SEO";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";
import { AuditModalProvider } from "./context/AuditModalContext";
import { parseLangPath } from "./i18n/langPath";
import { organizationSchema, serviceSchema, faqSchema } from "./seo/schema";

function HomePage() {
  const { t, lang } = useLanguage();
  const services = t("services.items");
  const faq = t("services.faq");

  return (
    <main className="min-h-screen bg-[var(--bg)] text-white">
      <SEO
        path="/"
        title={t("meta.title")}
        description={t("meta.description")}
        jsonLd={[organizationSchema(lang), ...services.map((item) => serviceSchema(item, lang)), faqSchema(faq)]}
      />
      <Navbar />
      <Hero />
      <Problem />
      <Process />
      <Services />
      <Work />
      <About />
      <Direction />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

function App() {
  // "/audit" has no dedicated page anymore. It's a popup available from any
  // page. Visiting the URL directly still lands you on a real page (the
  // homepage) and AuditModalProvider opens the popup on top of it.
  // Language lives as a "/ar" URL prefix, so strip it before matching pages.
  const { path } = parseLangPath(window.location.pathname);
  let page = <HomePage />;
  if (path === "/terms" || path === "/terms/") page = <Terms />;
  else if (path === "/privacy" || path === "/privacy/") page = <Privacy />;

  return (
    <LanguageProvider>
      <AuditModalProvider>
        {page}
        <AuditModal />
      </AuditModalProvider>
    </LanguageProvider>
  );
}

export default App;
