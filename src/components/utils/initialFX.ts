import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SimpleSplitText } from "./splitText";

export function initialFX() {
  document.body.style.overflowY = "auto";
  ScrollTrigger.refresh();
  const mainEl = document.getElementsByTagName("main")[0];

  if (mainEl) mainEl.classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#050810",
    duration: 0.5,
    delay: 1,
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

  const landingText2 = new SimpleSplitText(".landing-h2-info", { type: "chars" });
  const landingText3 = new SimpleSplitText(".landing-h2-info-1", { type: "chars" });
  const landingText4 = new SimpleSplitText(".landing-h2-1", { type: "chars" });
  const landingText5 = new SimpleSplitText(".landing-h2-2", { type: "chars" });

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function LoopText(Text1: SimpleSplitText, Text2: SimpleSplitText) {
  if (!Text1.chars.length || !Text2.chars.length) return;
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.05,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 60 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.05,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -60,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.05,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -60,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.05,
        delay: delay2,
      },
      1
    );
}
