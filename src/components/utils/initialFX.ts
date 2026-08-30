import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initialFX() {
  document.body.style.overflowY = "auto";
  ScrollTrigger.refresh();
  const mainEl = document.getElementsByTagName("main")[0];

  if (mainEl) mainEl.classList.add("main-active");

  document.body.style.backgroundColor = "#FFE875";

  // Instant, crisp reveal with 0 lag and 0 blur
  gsap.fromTo(
    [".header", ".icons-section", ".landing-intro", ".landing-info"],
    { opacity: 0, y: 15 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.08,
    }
  );
}
