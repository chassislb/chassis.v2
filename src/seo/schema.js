const SITE = "https://www.chassislb.com";

// Physically based in Lebanon; service area now also covers the GCC.
const AREA_SERVED = [
  { "@type": "Country", name: "Lebanon" },
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "Country", name: "Saudi Arabia" },
  { "@type": "Country", name: "Qatar" },
  { "@type": "Country", name: "Kuwait" },
  { "@type": "Country", name: "Bahrain" },
  { "@type": "Country", name: "Oman" },
];

export function organizationSchema(lang) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE}/#organization`,
    name: "Chassis",
    url: SITE,
    logo: `${SITE}/images/chassis-logo-white.png`,
    image: `${SITE}/og-image.jpg`,
    email: "chassis.lb@gmail.com",
    areaServed: AREA_SERVED,
    address: { "@type": "PostalAddress", addressCountry: "LB" },
    founder: {
      "@type": "Person",
      name: "Sophia Ayoubi",
      sameAs: ["https://www.linkedin.com/in/sophia-ayoubi-74a45099"],
    },
    sameAs: ["https://www.linkedin.com/company/109408069/", "https://www.linkedin.com/in/sophia-ayoubi-74a45099"],
    inLanguage: lang === "ar" ? "ar" : "en",
  };
}

export function serviceSchema(item, lang) {
  const priceMatch = /\$([\d,]+)/.exec(item.price || "");
  const price = priceMatch ? Number(priceMatch[1].replace(/,/g, "")) : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}/#${item.id}`,
    name: item.name,
    description: item.summary,
    provider: { "@id": `${SITE}/#organization` },
    areaServed: AREA_SERVED,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      ...(price !== undefined ? { price } : {}),
      description: item.price,
      url: `${SITE}/#services`,
    },
    inLanguage: lang === "ar" ? "ar" : "en",
  };
}

export function faqSchema(faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
