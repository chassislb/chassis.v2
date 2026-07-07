import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let ticker = null;
let onAnchorClick = null;

export function initLenis() {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  ticker = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);

  // Anchor links (navbar, hero CTAs, footer) must go through Lenis's own
  // scrollTo — a native/CSS smooth-scroll jump fights Lenis's RAF-driven
  // position and snaps back to wherever Lenis last settled.
  onAnchorClick = (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href");
    if (!id || id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -88, duration: 1.4 });
  };
  document.addEventListener("click", onAnchorClick);

  return lenis;
}

export function destroyLenis() {
  if (ticker) gsap.ticker.remove(ticker);
  if (onAnchorClick) document.removeEventListener("click", onAnchorClick);
  lenis?.destroy();
  lenis = null;
  ticker = null;
  onAnchorClick = null;
}

export function stopLenis() {
  lenis?.stop();
}

export function startLenis() {
  lenis?.start();
}
