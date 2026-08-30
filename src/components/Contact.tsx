import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <div className="contact-badge-top">
          <span>📬 GET IN TOUCH</span>
        </div>
        <h2 className="contact-main-heading">
          LET'S BUILD SOMETHING <span className="contact-highlight">EPIC ✦</span>
        </h2>

        <div className="contact-neo-window">
          <div className="neo-card-topbar">
            <div className="neo-window-dots">
              <span className="neo-dot red"></span>
              <span className="neo-dot yellow"></span>
              <span className="neo-dot green"></span>
            </div>
            <span className="neo-card-filename">CONTACT_TERMINAL.SH ✦</span>
          </div>

          <div className="contact-flex">
            <div className="contact-box">
              <h4>DIRECT CONNECT</h4>
              <p>
                <a
                  href="https://www.linkedin.com/in/piyush-gupta-377694335/"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                  className="contact-inline-link"
                >
                  LinkedIn — piyush-gupta ↗
                </a>
              </p>
              <h4>ACADEMICS</h4>
              <p>
                Bachelor of Science in Computer Science (BSc CS)
                <br />
                <span className="contact-college">BNN College, Bhiwandi — 2025–2028 (SYCS)</span>
              </p>
            </div>

            <div className="contact-box">
              <h4>SOCIAL LINKS</h4>
              <div className="contact-social-pills">
                <a
                  href="https://github.com/piyushgupta122006-design"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                  className="contact-social-pill pill-pink"
                >
                  GitHub <MdArrowOutward />
                </a>
                <a
                  href="https://www.linkedin.com/in/piyush-gupta-377694335/"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                  className="contact-social-pill pill-blue"
                >
                  LinkedIn <MdArrowOutward />
                </a>
                <a
                  href="mailto:piyushgupta122006@gmail.com"
                  data-cursor="disable"
                  className="contact-social-pill pill-green"
                >
                  Email <MdArrowOutward />
                </a>
              </div>
            </div>

            <div className="contact-box contact-box-right">
              <h2>
                DESIGNED &amp; DEVELOPED <br /> BY <span>PIYUSH GUPTA</span>
              </h2>
              <div className="copyright-pill">
                <MdCopyright /> 2026 PIYUSH GUPTA • ALL RIGHTS RESERVED
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

