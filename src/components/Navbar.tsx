import { useEffect, useRef, useState } from "react";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

const Navbar = () => {
  const [showResumeMenu, setShowResumeMenu] = useState(false);
  const resumeMenuRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>(".header ul a[data-href]");
    links.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        e.preventDefault();
        const sectionId = elem.getAttribute("data-href");
        if (sectionId) {
          const target = document.querySelector(sectionId);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (resumeMenuRef.current && !resumeMenuRef.current.contains(event.target as Node)) {
        setShowResumeMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="header" id="navbar">
        <a href="/#" className="navbar-title" data-cursor="disable">
          PG
        </a>
        <a
          href="https://www.linkedin.com/in/piyush-gupta-377694335/"
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/piyush-gupta
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
          <li className="navbar-resume-item" ref={resumeMenuRef}>
            <button
              type="button"
              className="navbar-resume-btn"
              data-cursor="disable"
              onClick={() => setShowResumeMenu((prev) => !prev)}
              aria-expanded={showResumeMenu}
              aria-haspopup="true"
            >
              <span>RESUME</span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: showResumeMenu ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {showResumeMenu && (
              <div className="resume-dropdown-menu">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="resume-dropdown-item"
                  data-cursor="disable"
                  onClick={() => setShowResumeMenu(false)}
                >
                  <span className="dropdown-item-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    View Resume
                  </span>
                  <span className="dropdown-item-arrow">↗</span>
                </a>
                <a
                  href="/resume.pdf"
                  download="Piyush_Gupta_Resume.pdf"
                  className="resume-dropdown-item dropdown-item-download"
                  data-cursor="disable"
                  onClick={() => setShowResumeMenu(false)}
                >
                  <span className="dropdown-item-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download
                  </span>
                  <span className="dropdown-item-arrow">↓</span>
                </a>
              </div>
            )}
          </li>
        </ul>
      </header>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
