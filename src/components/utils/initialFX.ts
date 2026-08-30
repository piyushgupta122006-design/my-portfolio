import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SimpleSplitText } from "./splitText";

export function initialFX() {
  document.body.style.overflowY = "auto";
  ScrollTrigger.refresh();
  const mainEl = document.getElementsByTagName("main")[0];

  if (mainEl) mainEl.classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#FFE875",
    duration: 0.5,
    delay: 0.5,
  });

  const introH2 = new SimpleSplitText(".landing-intro h2", { type: "chars" });
  const introH1 = new SimpleSplitText(".landing-intro h1", { type: "chars" });
  const infoH3 = new SimpleSplitText(".landing-info h3", { type: "chars" });

  const allChars = [...introH2.chars, ...introH1.chars, ...infoH3.chars];
  if (allChars.length > 0) {
    gsap.fromTo(
      allChars,
      { opacity: 0, y: 60, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.02,
        delay: 0.3,
      }
    );
  }

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );
}

