// Language is encoded as a URL prefix ("/ar/...") rather than only a
// client-side toggle, so each language has a real, crawlable, canonical URL.
export function parseLangPath(pathname) {
  const isAr = pathname === "/ar" || pathname.startsWith("/ar/");
  if (!isAr) return { lang: "en", path: pathname };
  const rest = pathname.slice(3);
  return { lang: "ar", path: rest === "" ? "/" : rest };
}

export function buildLangPath(lang, path) {
  if (lang !== "ar") return path;
  return path === "/" ? "/ar" : `/ar${path}`;
}
