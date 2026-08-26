import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom robust DOM text splitter compatible with SplitText interface
export class SimpleSplitText {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  private originalHTML: string;
  private element: HTMLElement;

  constructor(target: string | HTMLElement | (string | HTMLElement)[], vars?: { type?: string; linesClass?: string; wordsClass?: string; charsClass?: string }) {
    let el: HTMLElement | null = null;
    if (typeof target === "string") {
      el = document.querySelector(target);
    } else if (target instanceof HTMLElement) {
      el = target;
    } else if (Array.isArray(target) && target.length > 0) {
      el = typeof target[0] === "string" ? document.querySelector(target[0]) : target[0];
    }

    if (!el) {
      this.element = document.createElement("div");
      this.originalHTML = "";
      return;
    }

    this.element = el;
    this.originalHTML = el.innerHTML;
    this.split(vars);
  }

  private split(vars?: { type?: string; linesClass?: string; wordsClass?: string; charsClass?: string }) {
    const text = this.element.textContent || "";
    const type = vars?.type || "chars,words,lines";
    const linesClass = vars?.linesClass || "split-line";

    this.element.innerHTML = "";
    const wordsArray = text.split(" ");
    
    wordsArray.forEach((wordText, wIdx) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = `split-word ${linesClass}`;
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      if (type.includes("chars")) {
        wordText.split("").forEach((char) => {
          const charSpan = document.createElement("span");
          charSpan.className = "split-char";
          charSpan.style.display = "inline-block";
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
          this.chars.push(charSpan);
        });
      } else {
        wordSpan.textContent = wordText;
      }

      this.words.push(wordSpan);
      this.element.appendChild(wordSpan);
      if (wIdx < wordsArray.length - 1) {
        this.element.appendChild(document.createTextNode(" "));
      }
    });

    this.lines = this.words;
  }

  revert() {
    if (this.element && this.originalHTML) {
      this.element.innerHTML = this.originalHTML;
    }
  }
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  const paras = document.querySelectorAll<HTMLElement>(".para");
  const titles = document.querySelectorAll<HTMLElement>(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para) => {
    para.classList.add("visible");
    const split = new SimpleSplitText(para, { type: "words,lines", linesClass: "split-line" });

    gsap.fromTo(
      split.words,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement || para,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title) => {
    const split = new SimpleSplitText(title, { type: "chars,lines", linesClass: "split-line" });
    gsap.fromTo(
      split.chars,
      { autoAlpha: 0, y: 60, rotate: 6 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement || title,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });
}
