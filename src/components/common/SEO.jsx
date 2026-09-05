import { useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { buildLangPath } from "../../i18n/langPath";

const SITE = "https://www.chassislb.com";

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href, extraAttrs = {}) {
  const selector = `link[rel="${rel}"]${Object.entries(extraAttrs)
    .map(([k, v]) => `[${k}="${v}"]`)
    .join("")}`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    Object.entries(extraAttrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(list) {
  document.querySelectorAll("script[data-seo-jsonld]").forEach((el) => el.remove());
  (list || []).forEach((data, i) => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-seo-jsonld", String(i));
    el.textContent = JSON.stringify(data);
    document.head.appendChild(el);
  });
}

/** Injects per-page title, description, canonical/hreflang, OG/Twitter tags, and JSON-LD.
 * `path` is the language-neutral path ("/", "/terms", "/privacy"). */
function SEO({ path, title, description, jsonLd }) {
  const { lang } = useLanguage();

  useEffect(() => {
    const enUrl = `${SITE}${buildLangPath("en", path)}`;
    const arUrl = `${SITE}${buildLangPath("ar", path)}`;
    const currentUrl = lang === "ar" ? arUrl : enUrl;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertLink("canonical", currentUrl);
    upsertLink("alternate", enUrl, { hreflang: "en" });
    upsertLink("alternate", arUrl, { hreflang: "ar" });
    upsertLink("alternate", enUrl, { hreflang: "x-default" });

    upsertMeta("property", "og:url", currentUrl);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:locale", lang === "ar" ? "ar_LB" : "en_US");

    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    setJsonLd(jsonLd);
  }, [path, title, description, jsonLd, lang]);

  return null;
}

export default SEO;
