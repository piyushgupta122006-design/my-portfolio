import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

const Navbar = () => {
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>(".header ul a");
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
          <li className="navbar-resume-item">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="navbar-resume-btn"
              data-cursor="disable"
              title="View & Download Resume"
            >
              <span>RESUME</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V8H8" />
              </svg>
            </a>
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
