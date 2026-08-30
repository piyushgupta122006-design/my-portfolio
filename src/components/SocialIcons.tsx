import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="disable" id="social">
        <a
          href="https://github.com/piyushgupta122006-design"
          target="_blank"
          rel="noreferrer"
          title="GitHub"
          className="social-icon-btn"
          data-cursor="disable"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/piyush-gupta-377694335/"
          target="_blank"
          rel="noreferrer"
          title="LinkedIn"
          className="social-icon-btn"
          data-cursor="disable"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="mailto:piyushgupta122006@gmail.com"
          title="Email"
          className="social-icon-btn"
          data-cursor="disable"
        >
          <FaEnvelope />
        </a>
      </div>
    </div>
  );
};

export default SocialIcons;

