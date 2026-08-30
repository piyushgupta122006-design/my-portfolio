import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="what-heading">
          W<span className="hat-h2">HAT</span>
          <div className="what-line-2">
            I<span className="do-h2"> DO ✦</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div
            className="what-content what-card-pink what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-content-in">
              <div className="what-top-badge">
                <span>🤖 AI &amp; AUTOMATION</span>
              </div>
              <h3>AI &amp; VIBE CODING</h3>
              <h4>Modern AI Tooling &amp; Automation</h4>
              <p>
                Leveraging state-of-the-art AI APIs (Gemini, OpenAI), prompt architecture,
                and Python workflows to build smart, automated software that solves real user pain points.
              </p>
              <h5>SKILLSET &amp; TOOLS</h5>
              <div className="what-content-flex">
                <div className="what-tags">Gemini API</div>
                <div className="what-tags">Prompt Architecture</div>
                <div className="what-tags">Python Automation</div>
                <div className="what-tags">Vibe Coding</div>
                <div className="what-tags">Rapid Tooling</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-card-blue what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-content-in">
              <div className="what-top-badge">
                <span>⚡ FULL-STACK ARCHITECTURE</span>
              </div>
              <h3>FULL-STACK WEB</h3>
              <h4>Production Web Systems &amp; Portals</h4>
              <p>
                Engineering end-to-end web apps: reactive frontends, Firebase serverless
                databases, authentication, and high-performance client utilities.
              </p>
              <h5>SKILLSET &amp; TOOLS</h5>
              <div className="what-content-flex">
                <div className="what-tags">React.js</div>
                <div className="what-tags">JavaScript (ES6+)</div>
                <div className="what-tags">Firebase Auth &amp; Firestore</div>
                <div className="what-tags">REST APIs</div>
                <div className="what-tags">Vite &amp; Node.js</div>
                <div className="what-tags">Responsive UI</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);
    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
