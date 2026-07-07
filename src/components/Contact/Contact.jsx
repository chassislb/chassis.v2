import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaWhatsapp, FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa6";
import MagneticButton from "../MagneticButton/MagneticButton";
import CursorGlow from "../CursorGlow/CursorGlow";
import Starfield from "../Starfield/Starfield";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  {
    label: "email",
    href: "mailto:chassis.lb@gmail.com",
    icon: Mail,
    display: "chassis.lb@gmail.com",
    color: "#F3CC31",
  },
  {
    label: "whatsapp",
    href: "https://wa.me/96171085824",
    icon: FaWhatsapp,
    display: "+961 71 085 824",
    color: "#25D366",
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/company/109408069/",
    icon: FaLinkedinIn,
    display: "linkedin/chassis",
    color: "#0A66C2",
  },
  {
    label: "instagram",
    href: "https://www.instagram.com/chassis.lb/",
    icon: FaInstagram,
    display: "instagram/chassis.lb",
    color: "#E1306C",
  },
  {
    label: "facebook",
    href: "https://www.facebook.com/chassis.lb",
    icon: FaFacebookF,
    display: "facebook/chassis.lb",
    color: "#1877F2",
  },
];

export default function Contact() {
  const { t, dir } = useLanguage();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-neutral-950 px-6 py-40 text-white lg:px-12"
    >
      <CursorGlow color="#36C6F4" />
      <Starfield seed={4} count={36} />

      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div ref={contentRef} className="relative mx-auto max-w-4xl text-center">

        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#36C6F4]" />
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/40">
            {t("contact.eyebrow")}
          </p>
        </div>

        <h2 className="mb-14 text-balance text-[clamp(2.2rem,5.2vw,4.5rem)] font-extrabold leading-[1.1] tracking-[-0.02em]">
          {t("contact.headline1")} {t("contact.headline2")}{" "}
          <span className="text-[#F3CC31]">{t("contact.headlineAccent")}</span>
        </h2>

        <MagneticButton
          href="https://calendly.com/chassis-lb/chassis-discovery-call"
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-16 inline-flex items-center gap-3 rounded-full bg-[#F3CC31] px-10 py-5 text-sm font-bold text-neutral-950 transition-colors duration-300 hover:bg-white"
        >
          {t("contact.cta")}
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:scale-x-[-1]"
          />
        </MagneticButton>

        <div className="flex items-center justify-center gap-4">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.display}
                title={link.display}
                target={link.label !== "email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{ "--hover-color": link.color }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/50 transition duration-200 hover:border-[var(--hover-color)] hover:bg-[var(--hover-color)]/10 hover:text-[var(--hover-color)]"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
