import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export function LegalSection({ title, children }) {
  return (
    <div className="mb-14 last:mb-0">
      <p className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-[#36C6F4]">{title}</p>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

export function LegalItem({ number, title, children }) {
  return (
    <div>
      {number && (
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#F3CC31]">
          {number}
        </span>
      )}
      {title && <h3 className="mb-2 text-lg font-bold tracking-[-0.01em] text-neutral-950">{title}</h3>}
      <div className="text-base leading-7 text-neutral-600">{children}</div>
    </div>
  );
}

export function LegalList({ items }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-base leading-7 text-neutral-600">
          <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F3CC31]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function LegalPage({ eyebrow, title, subtitle, lastUpdated, intro, children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F7F3] px-6 py-32 text-neutral-950 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#36C6F4]" />
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-neutral-400">{eyebrow}</p>
          </div>

          <h1 className="mb-6 text-[clamp(2.2rem,4.5vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {title}
          </h1>
          <p className="mb-2 text-lg leading-8 text-neutral-500">{subtitle}</p>
          {lastUpdated && <p className="mb-8 text-sm font-medium text-neutral-400">{lastUpdated}</p>}
          <p className="mb-16 max-w-2xl text-base leading-7 text-neutral-600">{intro}</p>

          {children}

          <div className="mt-6 border-t border-neutral-200 pt-8">
            <a
              href="/"
              className="text-sm font-bold text-neutral-950 underline underline-offset-4 transition hover:text-[#36C6F4]"
            >
              ← back to chassis
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
