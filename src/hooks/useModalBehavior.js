import { useEffect, useRef } from "react";

// Scroll-lock + focus trap + Escape-to-close, shared by every full-screen
// overlay on the site (service/case/about panels, the audit modal).
export function useModalBehavior(active, containerRef, onClose) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!active) return undefined;

    scrollYRef.current = window.scrollY;
    document.body.classList.add("no-scroll");
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    const previouslyFocused = document.activeElement;
    containerRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("no-scroll");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollYRef.current);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [active, containerRef, onClose]);
}
