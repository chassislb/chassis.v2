import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import DiagnosisBand from "./components/DiagnosisBand";
import Diagnosis from "./components/Diagnosis/Diagnosis";
import DependencyReveal from "./components/DependencyReveal/DependencyReveal";
import OperatingMap from "./components/OperatingMap/OperatingMap";
import Method from "./components/Method/Method";
import Conditions from "./components/Conditions/Conditions";
import About from "./components/About/About";
import CaseFiles from "./components/CaseFiles/CaseFiles";
import Testimonials from "./components/Testimonials/Testimonials";
import Layers from "./components/Layers/Layers";
import Outcomes from "./components/Outcomes/Outcomes";
import BuildWithAI from "./components/BuildWithAI/BuildWithAI";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import { initLenis, destroyLenis } from "./lib/lenis";
import { LanguageProvider } from "./i18n/LanguageContext";

function HomePage() {
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F7F3] text-neutral-950">
      <Navbar />
      <Hero />
      <DiagnosisBand />
      <Diagnosis />
      <DependencyReveal />
      <OperatingMap />
      <Method />
      <Conditions />
      <About />
      <CaseFiles />
      <Testimonials />
      <Layers />
      <Outcomes />
      <BuildWithAI />
      <Contact />
      <Footer />
    </main>
  );
}

function App() {
  const path = window.location.pathname;
  let page = <HomePage />;
  if (path === "/terms" || path === "/terms/") page = <Terms />;
  else if (path === "/privacy" || path === "/privacy/") page = <Privacy />;

  return <LanguageProvider>{page}</LanguageProvider>;
}

export default App;
