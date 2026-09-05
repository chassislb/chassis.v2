// Runs after `vite build`. Boots the built dist/ as a static SPA (mirroring
// vercel.json's catch-all rewrite), visits each real route in a headless
// browser, waits for React + the per-page SEO effect to finish, and writes
// the fully rendered HTML back to disk. This is what lets crawlers that
// don't execute JavaScript (most AI answer-engine bots, some social
// scrapers) see real content instead of an empty <div id="root">.
//
// Vercel serves matching static files before falling back to the rewrite,
// so these generated files are picked up automatically — no vercel.json
// change needed.
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

// Vercel's build environment blocks puppeteer's postinstall Chromium
// download (npm's allow-scripts policy), so on Vercel we launch a
// prebuilt Linux Chromium via puppeteer-core + @sparticuz/chromium
// instead — no postinstall script involved. Locally (Windows/macOS dev
// machines), @sparticuz/chromium's binary isn't usable, so we fall back
// to the full `puppeteer` package and its own downloaded browser.
async function launchBrowser() {
  if (process.env.VERCEL) {
    const [{ default: puppeteerCore }, { default: chromium }] = await Promise.all([
      import("puppeteer-core"),
      import("@sparticuz/chromium"),
    ]);
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }
  const { default: puppeteer } = await import("puppeteer");
  return puppeteer.launch({ headless: true });
}

const DIST = path.resolve(process.cwd(), "dist");
const PORT = 4571;

const ROUTES = [
  "/",
  "/terms",
  "/privacy",
  "/ar",
  "/ar/terms",
  "/ar/privacy",
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

function startServer() {
  const server = createServer(async (req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const candidates = urlPath === "/" ? ["/index.html"] : [urlPath, `${urlPath}/index.html`, `${urlPath}.html`];

    for (const candidate of candidates) {
      const filePath = path.join(DIST, candidate);
      if (existsSync(filePath) && filePath.startsWith(DIST)) {
        const ext = path.extname(filePath);
        try {
          const data = await readFile(filePath);
          res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
          res.end(data);
          return;
        } catch {
          // fall through to SPA fallback
        }
      }
    }

    // SPA fallback, same as vercel.json's rewrite.
    const fallback = await readFile(path.join(DIST, "index.html"));
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(fallback);
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0" });

  // The SEO component runs in a useEffect, and the hero's Framer Motion
  // fade-up (longest: 0.7s duration + up to 0.4s stagger delay) needs to
  // finish before snapshotting, or the prerendered <h1> gets frozen at
  // opacity: 0 (real visitors still see it fine once JS re-renders, but a
  // crawler that never runs JS would see an invisible-by-CSS heading).
  await page.waitForSelector("title");
  await new Promise((r) => setTimeout(r, 1600));

  const html = await page.content();
  await page.close();

  const outFile = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route.slice(1), "index.html");
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, html);
  console.log(`  prerendered ${route} -> ${path.relative(DIST, outFile)}`);
}

async function main() {
  console.log("Prerendering routes for crawlers (Google, GPTBot, ClaudeBot, PerplexityBot, ...)");
  const server = await startServer();
  const browser = await launchBrowser();

  try {
    for (const route of ROUTES) {
      await prerenderRoute(browser, route);
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log("Prerendering done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
