import { chromium } from "playwright";

const shotDir = "C:\\Users\\sophi\\AppData\\Local\\Temp\\claude\\c--Users-sophi-OneDrive-Desktop-chassis-website-v2\\8a16d871-a69b-4033-b834-6e4c0514925d\\scratchpad";
const port = process.argv[2] || "5176";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});

await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

const totalHeight = await page.evaluate(() => document.body.scrollHeight);
console.log("document.body.scrollHeight:", totalHeight);

const steps = 24;
for (let i = 0; i <= steps; i++) {
  const y = Math.round((totalHeight * i) / steps);
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(650); // let scroll-triggered animations settle
  await page.screenshot({ path: `${shotDir}/scroll-${String(i).padStart(2, "0")}-y${y}.png` });
}

console.log("errors:", JSON.stringify(errors, null, 2));
await browser.close();
