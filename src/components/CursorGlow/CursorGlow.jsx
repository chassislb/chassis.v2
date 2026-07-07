import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function CursorGlow({ color = "#F3CC31" }) {
  const glowRef = useRef(null);

  useGSAP(() => {
    const glow = glowRef.current;
    const parent = glow?.parentElement;
    if (!glow || !parent) return;

    const xTo = gsap.quickTo(glow, "x", { duration: 0.9, ease: "power3.out" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.9, ease: "power3.out" });

    const onMove = (e) => {
      const rect = parent.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    };

    parent.addEventListener("mousemove", onMove);
    return () => parent.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 -z-0 h-[46vw] w-[46vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.10] blur-[110px]"
      style={{ background: color }}
    />
  );
}
