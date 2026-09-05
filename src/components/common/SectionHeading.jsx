function SectionHeading({ eyebrow, heading, note, align = "start" }) {
  return (
    <div className={`mb-10 flex flex-col gap-3 sm:mb-14 ${align === "center" ? "items-center text-center" : ""}`}>
      {eyebrow && (
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-[var(--blue)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--blue)]" />
          {eyebrow}
        </p>
      )}
      {heading && (
        <h2 className="max-w-3xl text-[clamp(1.7rem,3.6vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.02em]">
          {heading}
        </h2>
      )}
      {note && <p className="max-w-xl text-base leading-7 text-white/60">{note}</p>}
    </div>
  );
}

export default SectionHeading;
